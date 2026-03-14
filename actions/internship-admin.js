"use server";

import prisma from "@/lib/prisma";
import { getFirebaseUser } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const firebaseUser = await getFirebaseUser();
  if (!firebaseUser) throw new Error("Unauthorized");
  const user = await prisma.user.findUnique({ where: { uid: firebaseUser.uid } });
  if (!user || user.role !== "ADMIN") throw new Error("Admin access required");
  return user;
}

// ── Programs ──────────────────────────────────────────────────────────────────

export async function createInternshipProgram(data) {
  await requireAdmin();
  const program = await prisma.internshipProgram.create({
    data: {
      title: data.title,
      description: data.description,
      domain: data.domain,
      duration: parseInt(data.duration),
      stipend: data.stipend ? parseFloat(data.stipend) : null,
    },
  });
  revalidatePath("/internship/admin/batches");
  return program;
}

export async function getInternshipPrograms() {
  return prisma.internshipProgram.findMany({
    where: { isActive: true },
    include: { batches: { select: { id: true, status: true } } },
    orderBy: { createdAt: "desc" },
  });
}

// ── Batches ───────────────────────────────────────────────────────────────────

export async function createBatch(data) {
  await requireAdmin();
  const batch = await prisma.internshipBatch.create({
    data: {
      programId: data.programId,
      name: data.name,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      maxStudents: parseInt(data.maxStudents) || 100,
      description: data.description,
      status: "UPCOMING",
    },
  });
  revalidatePath("/internship/admin/batches");
  return batch;
}

export async function getBatches() {
  return prisma.internshipBatch.findMany({
    include: {
      program: { select: { title: true, domain: true } },
      _count: { select: { applications: true, tasks: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getBatchDetail(batchId) {
  return prisma.internshipBatch.findUnique({
    where: { id: batchId },
    include: {
      program: true,
      tasks: { orderBy: { dueDate: "asc" } },
      announcements: { orderBy: { createdAt: "desc" } },
      applications: {
        include: {
          user: { select: { id: true, name: true, email: true, imageUrl: true, branch: true, rollNumber: true } },
          progress: true,
        },
        orderBy: { appliedAt: "desc" },
      },
    },
  });
}

export async function updateBatchStatus(batchId, status) {
  await requireAdmin();
  await prisma.internshipBatch.update({ where: { id: batchId }, data: { status } });
  revalidatePath("/internship/admin/batches");
}

// ── Applications ──────────────────────────────────────────────────────────────

export async function getAllApplications(filters = {}) {
  const where = {};
  if (filters.status) where.status = filters.status;
  if (filters.batchId) where.batchId = filters.batchId;

  return prisma.internshipApplication.findMany({
    where,
    include: {
      user: { select: { id: true, name: true, email: true, imageUrl: true, branch: true, college: { select: { name: true } } } },
      batch: { include: { program: { select: { title: true } } } },
      progress: true,
    },
    orderBy: { appliedAt: "desc" },
  });
}

export async function reviewApplication(applicationId, status, notes = "") {
  const admin = await requireAdmin();
  const application = await prisma.internshipApplication.update({
    where: { id: applicationId },
    data: { status, reviewedAt: new Date(), reviewNotes: notes },
    include: { user: true, batch: { include: { program: true } } },
  });

  // Auto-create progress record & offer letter on selection
  if (status === "SELECTED") {
    const totalTasks = await prisma.internshipTask.count({ where: { batchId: application.batchId } });
    await prisma.internProgress.upsert({
      where: { applicationId },
      create: { applicationId, totalTasks },
      update: { totalTasks },
    });
    await prisma.offerLetter.upsert({
      where: { applicationId },
      create: { applicationId, validUntil: application.batch.endDate },
      update: {},
    });
  }

  revalidatePath("/internship/admin/applications");
  return application;
}

// ── Tasks ─────────────────────────────────────────────────────────────────────

export async function createTask(data) {
  await requireAdmin();
  const task = await prisma.internshipTask.create({
    data: {
      batchId: data.batchId,
      title: data.title,
      description: data.description,
      dueDate: new Date(data.dueDate),
      maxScore: parseFloat(data.maxScore) || 100,
      resources: data.resources || null,
    },
  });
  // Update totalTasks on all active progress records for this batch
  await prisma.$executeRaw`
    UPDATE "InternProgress" ip
    SET "totalTasks" = (SELECT COUNT(*) FROM "InternshipTask" WHERE "batchId" = ${data.batchId})
    FROM "InternshipApplication" ia
    WHERE ip."applicationId" = ia.id AND ia."batchId" = ${data.batchId}
  `;
  revalidatePath(`/internship/admin/batches/${data.batchId}`);
  return task;
}

export async function evaluateSubmission(submissionId, score, feedback, status) {
  await requireAdmin();
  const sub = await prisma.taskSubmission.update({
    where: { id: submissionId },
    data: { score: parseFloat(score), feedback, status, evaluatedAt: new Date() },
    include: { application: { include: { progress: true } } },
  });

  // Recalculate performance score
  if (sub.application.progress) {
    const allSubs = await prisma.taskSubmission.findMany({
      where: { applicationId: sub.applicationId, score: { not: null } },
    });
    const avgScore = allSubs.reduce((a, b) => a + (b.score || 0), 0) / (allSubs.length || 1);
    const completedTasks = allSubs.filter((s) => s.status === "APPROVED").length;
    await prisma.internProgress.update({
      where: { applicationId: sub.applicationId },
      data: {
        performScore: Math.round(avgScore * 10) / 10,
        tasksCompleted: completedTasks,
        progressPct: Math.round((completedTasks / (sub.application.progress.totalTasks || 1)) * 100),
      },
    });
  }
  revalidatePath("/internship/admin/applications");
  return sub;
}

// ── Attendance ────────────────────────────────────────────────────────────────

export async function markAttendance(applicationId, date, present) {
  await requireAdmin();
  const record = await prisma.attendanceRecord.upsert({
    where: { applicationId_date: { applicationId, date: new Date(date) } },
    create: { applicationId, date: new Date(date), present },
    update: { present },
  });
  // Recalculate attendance %
  const [total, presentCount] = await Promise.all([
    prisma.attendanceRecord.count({ where: { applicationId } }),
    prisma.attendanceRecord.count({ where: { applicationId, present: true } }),
  ]);
  await prisma.internProgress.update({
    where: { applicationId },
    data: { attendancePct: total ? Math.round((presentCount / total) * 100) : 0 },
  });
  return record;
}

export async function bulkMarkAttendance(batchId, date, presentIds) {
  await requireAdmin();
  const applications = await prisma.internshipApplication.findMany({
    where: { batchId, status: "SELECTED" },
    select: { id: true },
  });
  for (const app of applications) {
    await markAttendance(app.id, date, presentIds.includes(app.id));
  }
  revalidatePath("/internship/admin/attendance");
}

// ── Announcements ─────────────────────────────────────────────────────────────

export async function createAnnouncement(data) {
  const admin = await requireAdmin();
  const ann = await prisma.announcement.create({
    data: {
      title: data.title,
      body: data.body,
      isGlobal: !!data.isGlobal,
      batchId: data.batchId || null,
      createdBy: admin.id,
    },
  });
  revalidatePath("/internship/admin/announcements");
  return ann;
}

// ── Certificates ──────────────────────────────────────────────────────────────

export async function markInternshipComplete(applicationId) {
  await requireAdmin();
  const progress = await prisma.internProgress.update({
    where: { applicationId },
    data: { completed: true, completedAt: new Date() },
  });
  await prisma.internshipCertificate.upsert({
    where: { progressId: progress.id },
    create: { progressId: progress.id },
    update: {},
  });
  revalidatePath("/internship/admin/certificates");
  return progress;
}

// ── Attendance (Extended) ─────────────────────────────────────────────────────

// Returns all SELECTED applications in a batch with their attendance for the given date
export async function getBatchAttendanceForDate(batchId, date) {
  await requireAdmin();
  const parsedDate = new Date(date); // "YYYY-MM-DD" → Date (Prisma handles @db.Date)
  return prisma.internshipApplication.findMany({
    where: { batchId, status: "SELECTED" },
    include: {
      user: { select: { id: true, name: true, email: true, imageUrl: true, branch: true } },
      batch: { include: { program: { select: { title: true } } } },
      attendance: { where: { date: parsedDate } },
      progress: { select: { attendancePct: true } },
    },
    orderBy: { appliedAt: "asc" },
  });
}

// Mark attendance with extended status: PRESENT | ABSENT | LEAVE | LATE
// PRESENT + LATE count as present=true; ABSENT + LEAVE count as present=false
export async function markAttendanceWithStatus(applicationId, date, status) {
  await requireAdmin();
  const present = status === "PRESENT" || status === "LATE";
  const parsedDate = new Date(date);

  const record = await prisma.attendanceRecord.upsert({
    where: { applicationId_date: { applicationId, date: parsedDate } },
    create: { applicationId, date: parsedDate, present, note: status },
    update: { present, note: status },
  });

  // Recalculate overall attendance percentage
  const [total, presentCount] = await Promise.all([
    prisma.attendanceRecord.count({ where: { applicationId } }),
    prisma.attendanceRecord.count({ where: { applicationId, present: true } }),
  ]);

  const progressExists = await prisma.internProgress.findUnique({ where: { applicationId } });
  if (progressExists) {
    await prisma.internProgress.update({
      where: { applicationId },
      data: { attendancePct: total ? Math.round((presentCount / total) * 100) : 0 },
    });
  }

  revalidatePath("/internship/admin/attendance");
  return record;
}

// Bulk mark all selected students in a batch with a single status
export async function bulkMarkStatusAttendance(batchId, date, status) {
  await requireAdmin();
  const applications = await prisma.internshipApplication.findMany({
    where: { batchId, status: "SELECTED" },
    select: { id: true },
  });
  for (const app of applications) {
    await markAttendanceWithStatus(app.id, date, status);
  }
  revalidatePath("/internship/admin/attendance");
}

// Full attendance history for a student (sorted newest first)
export async function getStudentAttendanceHistory(applicationId) {
  await requireAdmin();
  return prisma.attendanceRecord.findMany({
    where: { applicationId },
    orderBy: { date: "desc" },
  });
}

// ── Students Management ───────────────────────────────────────────────────────

export async function getStudentsForAdmin() {
  return prisma.internshipApplication.findMany({
    where: { status: { in: ["SELECTED", "REJECTED"] } },
    include: {
      user: {
        select: {
          id: true, name: true, email: true, imageUrl: true,
          branch: true, role: true,
          college: { select: { name: true } },
        },
      },
      batch: { include: { program: { select: { title: true, domain: true } } } },
      progress: true,
    },
    orderBy: { appliedAt: "desc" },
  });
}

export async function deactivateStudent(applicationId) {
  await requireAdmin();
  await prisma.internshipApplication.update({
    where: { id: applicationId },
    data: { status: "REJECTED" },
  });
  revalidatePath("/internship/admin/students");
}

export async function removeStudentApplication(applicationId) {
  await requireAdmin();
  const progress = await prisma.internProgress.findUnique({ where: { applicationId } });
  if (progress) {
    await prisma.internshipCertificate.deleteMany({ where: { progressId: progress.id } });
    await prisma.internProgress.delete({ where: { applicationId } });
  }
  await prisma.attendanceRecord.deleteMany({ where: { applicationId } });
  await prisma.taskSubmission.deleteMany({ where: { applicationId } });
  await prisma.offerLetter.deleteMany({ where: { applicationId } });
  await prisma.internshipApplication.delete({ where: { id: applicationId } });
  revalidatePath("/internship/admin/students");
}

export async function updateStudentNotes(applicationId, notes) {
  await requireAdmin();
  await prisma.internshipApplication.update({
    where: { id: applicationId },
    data: { reviewNotes: notes },
  });
  revalidatePath("/internship/admin/students");
}

// ── Full Dashboard Aggregation ────────────────────────────────────────────────

export async function getDashboardData() {
  const today = new Date();
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  const [
    statsRaw,
    pendingApps,
    batches,
    todayAttendance,
    topProgress,
    recentAnnouncements,
    certIssued,
    recentStudents,
    appsThisMonth,
    recentSubmissions,
    recentApplications,
    recentCompletions,
    rawTasks,
    selectedFull,
  ] = await Promise.all([
    // ① Stats
    (async () => {
      const [totalApplications, selected, activeBatches, completed, colleges] = await Promise.all([
        prisma.internshipApplication.count(),
        prisma.internshipApplication.count({ where: { status: "SELECTED" } }),
        prisma.internshipBatch.count({ where: { status: "ACTIVE" } }),
        prisma.internProgress.count({ where: { completed: true } }),
        prisma.college.count(),
      ]);
      return { totalApplications, selected, activeBatches, completed, colleges };
    })(),
    // ② Pending applications
    prisma.internshipApplication.findMany({
      where: { status: { in: ["APPLIED", "UNDER_REVIEW"] } },
      include: {
        user: {
          select: {
            id: true, name: true, email: true, imageUrl: true,
            branch: true, college: { select: { name: true } },
          },
        },
        batch: { include: { program: { select: { title: true } } } },
      },
      orderBy: { appliedAt: "desc" },
      take: 6,
    }),
    // ③ All batches
    prisma.internshipBatch.findMany({
      include: {
        program: { select: { title: true, domain: true } },
        _count: { select: { applications: { where: { status: "SELECTED" } }, tasks: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    // ④ Today's attendance records
    prisma.attendanceRecord.findMany({
      where: { date: todayDate },
      select: { present: true, note: true },
    }),
    // ⑤ Top performers
    prisma.internProgress.findMany({
      orderBy: [{ performScore: "desc" }, { attendancePct: "desc" }],
      take: 5,
      include: {
        application: {
          include: {
            user: { select: { name: true, email: true } },
            batch: { include: { program: { select: { title: true } } } },
          },
        },
      },
    }),
    // ⑥ Recent announcements
    prisma.announcement.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { batch: { select: { name: true } } },
    }),
    // ⑦ Certs issued
    prisma.internshipCertificate.count(),
    // ⑧ Recent students (recently selected)
    prisma.internshipApplication.findMany({
      where: { status: "SELECTED" },
      orderBy: { reviewedAt: "desc" },
      take: 5,
      include: {
        user: { select: { name: true, email: true, branch: true, college: { select: { name: true } } } },
        batch: { include: { program: { select: { title: true } } } },
      },
    }),
    // ⑨ Apps this month
    prisma.internshipApplication.count({ where: { appliedAt: { gte: monthStart } } }),
    // ⑩ Recent task submissions (activity)
    prisma.taskSubmission.findMany({
      take: 5,
      orderBy: { submittedAt: "desc" },
      include: {
        application: { include: { user: { select: { name: true } } } },
        task: { select: { title: true } },
      },
    }),
    // ⑪ Recent applications (activity)
    prisma.internshipApplication.findMany({
      take: 4,
      orderBy: { appliedAt: "desc" },
      include: { user: { select: { name: true } } },
    }),
    // ⑫ Recent completions (activity)
    prisma.internProgress.findMany({
      where: { completed: true },
      take: 3,
      orderBy: { completedAt: "desc" },
      include: { application: { include: { user: { select: { name: true } } } } },
    }),
    // ⑬ Raw tasks for task stats
    prisma.internshipTask.findMany({
      include: {
        batch: { include: { applications: { where: { status: "SELECTED" }, select: { id: true } } } },
        submissions: { select: { id: true, status: true } },
      },
    }),
    // ⑭ Selected students for insights
    prisma.internshipApplication.findMany({
      where: { status: "SELECTED" },
      select: {
        user: { select: { college: { select: { name: true } } } },
        batch: { include: { program: { select: { title: true } } } },
      },
    }),
  ]);

  // ── Task stats ──────────────────────────────────────────────────────────────
  const now = new Date();
  let taskActive = 0, taskOverdue = 0, taskCompleted = 0;
  let totalPossible = 0, totalApproved = 0, pendingSubs = 0;
  for (const task of rawTasks) {
    let meta = { closed: false };
    try { meta = JSON.parse(task.resources || "{}"); } catch {}
    const internCount = task.batch?.applications?.length ?? 0;
    const approved = task.submissions?.filter((s) => s.status === "APPROVED").length ?? 0;
    const status = meta.closed
      ? "CLOSED"
      : internCount > 0 && approved >= internCount
      ? "COMPLETED"
      : new Date(task.dueDate) < now
      ? "OVERDUE"
      : "ACTIVE";
    if (status === "ACTIVE") taskActive++;
    else if (status === "OVERDUE") taskOverdue++;
    else if (status === "COMPLETED") taskCompleted++;
    totalPossible += internCount;
    totalApproved += approved;
    pendingSubs += task.submissions?.filter((s) => s.status === "PENDING").length ?? 0;
  }

  // ── Insights ────────────────────────────────────────────────────────────────
  const collegeCounts = {};
  const roleCounts = {};
  for (const app of selectedFull) {
    const c = app.user?.college?.name || "Unknown";
    const r = app.batch?.program?.title || "General";
    collegeCounts[c] = (collegeCounts[c] || 0) + 1;
    roleCounts[r] = (roleCounts[r] || 0) + 1;
  }
  const topCollege = Object.entries(collegeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";
  const topRole = Object.entries(roleCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";
  const completionRate =
    statsRaw.selected > 0 ? Math.round((statsRaw.completed / statsRaw.selected) * 100) : 0;

  // ── Activity feed ────────────────────────────────────────────────────────────
  const activity = [
    ...recentSubmissions.map((s) => ({
      type: "submission",
      text: `${s.application?.user?.name || "An intern"} submitted "${s.task?.title || "a task"}"`,
      time: s.submittedAt,
    })),
    ...recentApplications.map((a) => ({
      type: "application",
      text: `${a.user?.name || "Someone"} applied for internship`,
      time: a.appliedAt,
    })),
    ...recentCompletions.map((p) => ({
      type: "completion",
      text: `${p.application?.user?.name || "An intern"} completed their internship`,
      time: p.completedAt,
    })),
  ]
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .slice(0, 10);

  // ── Today's attendance ───────────────────────────────────────────────────────
  const attPresent = todayAttendance.filter((r) => r.present).length;
  const attLate = todayAttendance.filter((r) => r.note === "LATE").length;
  const attLeave = todayAttendance.filter((r) => r.note === "LEAVE").length;
  const attAbsent = todayAttendance.filter((r) => !r.present && r.note !== "LEAVE").length;
  const attTotal = todayAttendance.length;
  const attPct = attTotal > 0 ? Math.round(((attPresent + attLate) / attTotal) * 100) : 0;

  return {
    stats: statsRaw,
    pendingApps,
    activeBatches: batches.filter((b) => b.status === "ACTIVE"),
    allBatches: batches,
    attendance: { total: attTotal, present: attPresent, absent: attAbsent, late: attLate, leave: attLeave, pct: attPct },
    taskStats: { total: rawTasks.length, active: taskActive, overdue: taskOverdue, completed: taskCompleted, pendingSubs },
    topPerformers: topProgress,
    announcements: recentAnnouncements,
    certStats: { issued: certIssued, eligible: statsRaw.completed, pending: Math.max(0, statsRaw.completed - certIssued) },
    recentStudents,
    activity,
    insights: { appsThisMonth, topCollege, topRole, completionRate },
  };
}

// ── Dashboard Stats ───────────────────────────────────────────────────────────

export async function getAdminStats() {
  const [totalStudents, activeBatches, totalApplications, selected, completed, colleges] = await Promise.all([
    prisma.internshipApplication.count(),
    prisma.internshipBatch.count({ where: { status: "ACTIVE" } }),
    prisma.internshipApplication.count(),
    prisma.internshipApplication.count({ where: { status: "SELECTED" } }),
    prisma.internProgress.count({ where: { completed: true } }),
    prisma.college.count(),
  ]);
  return { totalStudents, activeBatches, totalApplications, selected, completed, colleges };
}
