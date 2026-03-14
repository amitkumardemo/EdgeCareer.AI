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
