"use server";

import prisma from "@/lib/prisma";
import { getFirebaseUser } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";
import { sendNotificationEmail, sendBulkNotificationEmails } from "@/lib/email-service";

async function requireAdmin() {
  const firebaseUser = await getFirebaseUser();
  if (!firebaseUser) throw new Error("Unauthorized");
  const user = await prisma.user.findUnique({ where: { uid: firebaseUser.uid } });
  if (!user || user.role !== "ADMIN") throw new Error("Admin access required");
  return user;
}

// ── Parse / Serialize metadata stored in resources field ──────────────────────
function parseMeta(resources) {
  if (!resources) return { priority: "MEDIUM", links: [], closed: false };
  try {
    const parsed = JSON.parse(resources);
    if (typeof parsed === "object" && !Array.isArray(parsed) && parsed !== null) {
      return {
        priority: parsed.priority || "MEDIUM",
        links: Array.isArray(parsed.links) ? parsed.links : [],
        closed: !!parsed.closed,
      };
    }
    // Legacy: plain URL string or URL array
    if (Array.isArray(parsed)) return { priority: "MEDIUM", links: parsed, closed: false };
    return { priority: "MEDIUM", links: resources ? [resources] : [], closed: false };
  } catch {
    return { priority: "MEDIUM", links: resources ? [resources] : [], closed: false };
  }
}

function serializeMeta(meta) {
  return JSON.stringify(meta);
}

// ── Compute derived task status ───────────────────────────────────────────────
function computeStatus(task, meta) {
  if (meta.closed) return "CLOSED";
  const totalInterns = task.batch?.applications?.length ?? 0;
  const approved = (task.submissions || []).filter((s) => s.status === "APPROVED").length;
  if (totalInterns > 0 && approved >= totalInterns) return "COMPLETED";
  if (new Date(task.dueDate) < new Date()) return "OVERDUE";
  return "ACTIVE";
}

// ── Get all tasks with enriched stats ─────────────────────────────────────────
export async function getAllTasksWithStats() {
  const tasks = await prisma.internshipTask.findMany({
    include: {
      batch: {
        include: {
          program: { select: { title: true, domain: true } },
          applications: {
            where: { status: "SELECTED" },
            select: { id: true },
          },
        },
      },
      submissions: {
        select: { id: true, status: true, submittedAt: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return tasks.map((task) => {
    const meta = parseMeta(task.resources);
    const status = computeStatus(task, meta);
    const totalInterns = task.batch?.applications?.length ?? 0;
    const submissionCount = task.submissions?.length ?? 0;
    const approvedCount = task.submissions?.filter((s) => s.status === "APPROVED").length ?? 0;

    return {
      ...task,
      priority: meta.priority,
      links: meta.links,
      meta,
      status,
      totalInterns,
      submissionCount,
      approvedCount,
      role: task.batch?.program?.title || "General",
    };
  });
}

// ── Create task (extended with priority + links) ──────────────────────────────
export async function createTaskExtended(data) {
  const admin = await requireAdmin();
  if (!data.batchId) throw new Error("Batch is required");

  const meta = {
    priority: data.priority || "MEDIUM",
    links: data.resources
      ? data.resources.split("\n").map((l) => l.trim()).filter(Boolean)
      : [],
    closed: false,
    createdBy: admin.id,
  };

  const task = await prisma.internshipTask.create({
    data: {
      batchId: data.batchId,
      title: data.title,
      description: data.description,
      dueDate: new Date(data.dueDate),
      maxScore: parseFloat(data.maxScore) || 100,
      resources: serializeMeta(meta),
    },
  });

  // Update totalTasks on all active progress records for this batch
  const batchApplications = await prisma.internshipApplication.findMany({
    where: { batchId: data.batchId, status: "SELECTED" },
    select: { id: true },
  });

  const totalTasks = await prisma.internshipTask.count({
    where: { batchId: data.batchId },
  });

  for (const app of batchApplications) {
    const progress = await prisma.internProgress.findUnique({
      where: { applicationId: app.id },
    });
    if (progress) {
      await prisma.internProgress.update({
        where: { applicationId: app.id },
        data: { totalTasks },
      });
    }
  }

  // Auto-create announcement
  try {
    await prisma.announcement.create({
      data: {
        title: `New Task: ${data.title}`,
        body: `A new task "${data.title}" has been assigned. Deadline: ${new Date(data.dueDate).toLocaleDateString("en-IN")}. Priority: ${data.priority || "MEDIUM"}.`,
        isGlobal: false,
        batchId: data.batchId,
        createdBy: admin.id,
      },
    });
  } catch {
    // Non-critical – ignore announcement failures
  }

  try {
    const apps = await prisma.internshipApplication.findMany({
      where: { batchId: data.batchId, status: "SELECTED" },
      include: { user: { select: { email: true, name: true } } },
    });
    
    const usersArray = apps.map(app => app.user).filter(u => u && u.email);
    await sendBulkNotificationEmails(
      usersArray,
      "📌 New Task Assigned - TechieHelp",
      (user) => `You have been assigned a new task: <strong>${data.title}</strong>.<br/><br/>Please review the instructions and complete it before the deadline: <strong>${new Date(data.dueDate).toLocaleDateString("en-IN")}</strong>.`,
      "View Task"
    );
  } catch (e) {}

  revalidatePath("/internship/admin/tasks");
  return task;
}

// ── Update task ───────────────────────────────────────────────────────────────
export async function updateTaskExtended(taskId, data) {
  await requireAdmin();
  const existing = await prisma.internshipTask.findUnique({ where: { id: taskId } });
  if (!existing) throw new Error("Task not found");

  const existingMeta = parseMeta(existing.resources);
  const meta = {
    ...existingMeta,
    priority: data.priority || existingMeta.priority,
    links: data.resources
      ? data.resources.split("\n").map((l) => l.trim()).filter(Boolean)
      : existingMeta.links,
  };

  await prisma.internshipTask.update({
    where: { id: taskId },
    data: {
      title: data.title,
      description: data.description,
      dueDate: new Date(data.dueDate),
      maxScore: parseFloat(data.maxScore) || existing.maxScore,
      resources: serializeMeta(meta),
    },
  });

  revalidatePath("/internship/admin/tasks");
}

// ── Delete task ───────────────────────────────────────────────────────────────
export async function deleteTaskById(taskId) {
  await requireAdmin();
  await prisma.internshipTask.delete({ where: { id: taskId } });
  revalidatePath("/internship/admin/tasks");
}

// ── Close task (soft close via metadata) ─────────────────────────────────────
export async function closeTaskById(taskId) {
  await requireAdmin();
  const existing = await prisma.internshipTask.findUnique({ where: { id: taskId } });
  if (!existing) throw new Error("Task not found");
  const meta = parseMeta(existing.resources);
  meta.closed = true;
  await prisma.internshipTask.update({
    where: { id: taskId },
    data: { resources: serializeMeta(meta) },
  });
  revalidatePath("/internship/admin/tasks");
}

// ── Extend deadline ───────────────────────────────────────────────────────────
export async function extendTaskDeadline(taskId, newDueDate) {
  await requireAdmin();
  await prisma.internshipTask.update({
    where: { id: taskId },
    data: { dueDate: new Date(newDueDate) },
  });
  revalidatePath("/internship/admin/tasks");
}

// ── Get task with full submission details ─────────────────────────────────────
export async function getTaskWithSubmissions(taskId) {
  const task = await prisma.internshipTask.findUnique({
    where: { id: taskId },
    include: {
      batch: {
        include: {
          program: { select: { title: true, domain: true } },
          applications: {
            where: { status: "SELECTED" },
            include: {
              user: {
                select: { id: true, name: true, email: true, imageUrl: true, branch: true },
              },
              progress: {
                select: { progressPct: true, tasksCompleted: true, attendancePct: true },
              },
            },
          },
        },
      },
      submissions: {
        include: {
          application: {
            include: {
              user: {
                select: { id: true, name: true, email: true, imageUrl: true },
              },
            },
          },
        },
        orderBy: { submittedAt: "desc" },
      },
    },
  });

  if (!task) return null;

  const meta = parseMeta(task.resources);
  const status = computeStatus(task, meta);
  const totalInterns = task.batch?.applications?.length ?? 0;
  const submissionCount = task.submissions?.length ?? 0;
  const approvedCount = task.submissions?.filter((s) => s.status === "APPROVED").length ?? 0;

  // Build intern list with submission status merged
  const internList = (task.batch?.applications || []).map((app) => {
    const submission = task.submissions?.find((s) => s.applicationId === app.id) || null;
    const isOverdue = new Date(task.dueDate) < new Date() && !submission;
    return {
      applicationId: app.id,
      user: app.user,
      progress: app.progress,
      submission,
      isOverdue,
    };
  });

  return {
    ...task,
    priority: meta.priority,
    links: meta.links,
    meta,
    status,
    totalInterns,
    submissionCount,
    approvedCount,
    internList,
    role: task.batch?.program?.title || "General",
  };
}

// ── Evaluate a submission (approve / reject / request changes) ───────────────
export async function evaluateTaskSubmission(submissionId, status, score, feedback) {
  await requireAdmin();
  const sub = await prisma.taskSubmission.update({
    where: { id: submissionId },
    data: {
      status,
      score: score ? parseFloat(score) : null,
      feedback: feedback || null,
      evaluatedAt: new Date(),
    },
    include: {
      application: {
        include: {
          user: true,
          progress: true,
          attendance: { orderBy: { date: "desc" }, take: 1 },
        },
      },
      task: { select: { batchId: true, title: true } },
    },
  });

  // Recalculate performance score
  if (sub.application?.progress) {
    const allSubs = await prisma.taskSubmission.findMany({
      where: { applicationId: sub.applicationId, score: { not: null } },
    });
    const avgScore = allSubs.reduce((a, b) => a + (b.score || 0), 0) / (allSubs.length || 1);
    const completedTasks = await prisma.taskSubmission.count({
      where: { applicationId: sub.applicationId, status: "APPROVED" },
    });
    const totalTasks = sub.application.progress.totalTasks || 1;
    await prisma.internProgress.update({
      where: { applicationId: sub.applicationId },
      data: {
        performScore: Math.round(avgScore * 10) / 10,
        tasksCompleted: completedTasks,
        progressPct: Math.round((completedTasks / totalTasks) * 100),
      },
    });
  }

  // Auto-mark attendance based on review status
  const today = sub.submittedAt
    ? new Date(sub.submittedAt).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0];

  let attendanceStatus = null;
  if (status === "APPROVED") attendanceStatus = "PRESENT";
  else if (status === "REJECTED") attendanceStatus = "ABSENT";

  if (attendanceStatus) {
    try {
      const present = attendanceStatus === "PRESENT";
      await prisma.attendanceRecord.upsert({
        where: {
          applicationId_date: {
            applicationId: sub.applicationId,
            date: new Date(today),
          },
        },
        create: {
          applicationId: sub.applicationId,
          date: new Date(today),
          present,
          note: attendanceStatus,
        },
        update: { present, note: attendanceStatus },
      });

      // Recalculate attendance %
      const [total, presentCount] = await Promise.all([
        prisma.attendanceRecord.count({ where: { applicationId: sub.applicationId } }),
        prisma.attendanceRecord.count({ where: { applicationId: sub.applicationId, present: true } }),
      ]);
      const progress = await prisma.internProgress.findUnique({
        where: { applicationId: sub.applicationId },
      });
      if (progress) {
        await prisma.internProgress.update({
          where: { applicationId: sub.applicationId },
          data: {
            attendancePct: total ? Math.round((presentCount / total) * 100) : 0,
          },
        });
      }
    } catch {
      // Non-critical
    }
  }

  try {
    if (sub.application?.user?.email) {
      await sendNotificationEmail({
        to: sub.application.user.email,
        subject: "📝 Task Submission Evaluated",
        username: sub.application.user.name,
        message: `Your recent submission for <strong>${sub.task?.title || "a task"}</strong> has been evaluated.<br/><br/><strong>Status:</strong> ${status}<br/><strong>Score:</strong> ${score || "N/A"} / ${sub.task?.maxScore || 100}<br/><strong>Feedback:</strong> ${feedback || "No additional feedback."}<br/><br/>Please log in to your dashboard to view the details.`,
      });
    }
  } catch(e) {}

  revalidatePath("/internship/admin/tasks");
  return sub;
}

// ── Task analytics summary ────────────────────────────────────────────────────
export async function getTaskAnalyticsSummary() {
  const tasks = await prisma.internshipTask.findMany({
    include: {
      batch: {
        include: {
          applications: {
            where: { status: "SELECTED" },
            select: { id: true },
          },
        },
      },
      submissions: { select: { id: true, status: true } },
    },
  });

  const now = new Date();
  let active = 0;
  let overdue = 0;
  let completed = 0;
  let closed = 0;
  let totalPossible = 0;
  let totalApproved = 0;

  for (const task of tasks) {
    const meta = parseMeta(task.resources);
    const status = computeStatus(task, meta);
    if (status === "ACTIVE") active++;
    else if (status === "OVERDUE") overdue++;
    else if (status === "COMPLETED") completed++;
    else if (status === "CLOSED") closed++;

    const internCount = task.batch?.applications?.length ?? 0;
    totalPossible += internCount;
    totalApproved += task.submissions?.filter((s) => s.status === "APPROVED").length ?? 0;
  }

  const submissionRate =
    totalPossible > 0 ? Math.round((totalApproved / totalPossible) * 100) : 0;

  return {
    total: tasks.length,
    active,
    overdue,
    completed,
    closed,
    submissionRate,
  };
}
