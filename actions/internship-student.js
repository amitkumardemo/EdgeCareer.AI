"use server";

import prisma from "@/lib/prisma";
import { getFirebaseUser } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";

async function getStudentApp() {
  const firebaseUser = await getFirebaseUser();
  if (!firebaseUser) throw new Error("Unauthorized");

  const { uid, email, name, picture } = firebaseUser;

  // Auto-create DB record on first sign-in (same as checkUser.js)
  const user = await prisma.user.upsert({
    where: { uid },
    create: {
      uid,
      email: email || "",
      name: name || email?.split("@")[0] || "User",
      imageUrl: picture || null,
      role: "STUDENT",
    },
    update: {}, // no overwrites on subsequent calls
  });

  return user;
}

export async function applyToInternship(batchId, coverNote = "", resumeUrl = "") {
  const user = await getStudentApp();
  const existing = await prisma.internshipApplication.findUnique({
    where: { userId_batchId: { userId: user.id, batchId } },
  });
  if (existing) throw new Error("Already applied to this batch");

  const batch = await prisma.internshipBatch.findUnique({ where: { id: batchId } });
  if (!batch || batch.status === "COMPLETED" || batch.status === "CANCELLED") {
    throw new Error("This batch is not accepting applications");
  }
  const count = await prisma.internshipApplication.count({ where: { batchId } });
  if (count >= batch.maxStudents) throw new Error("Batch is full");

  const application = await prisma.internshipApplication.create({
    data: { userId: user.id, batchId, coverNote, resumeUrl, status: "APPLIED" },
  });
  revalidatePath("/internship/student/status");
  return application;
}

export async function getMyApplications() {
  const user = await getStudentApp();
  return prisma.internshipApplication.findMany({
    where: { userId: user.id },
    include: {
      batch: {
        include: {
          program: { select: { title: true, domain: true, duration: true } },
        },
      },
      progress: { include: { certificate: true } },
      offerLetter: true,
    },
    orderBy: { appliedAt: "desc" },
  });
}

export async function getMyTasks(applicationId) {
  const user = await getStudentApp();
  const app = await prisma.internshipApplication.findFirst({
    where: { id: applicationId, userId: user.id },
  });
  if (!app) throw new Error("Application not found");

  const tasks = await prisma.internshipTask.findMany({
    where: { batchId: app.batchId },
    include: {
      submissions: { where: { applicationId }, take: 1 },
    },
    orderBy: { dueDate: "asc" },
  });
  return tasks;
}

export async function submitTask(applicationId, taskId, fileUrl, notes) {
  const user = await getStudentApp();
  const app = await prisma.internshipApplication.findFirst({
    where: { id: applicationId, userId: user.id, status: "SELECTED" },
  });
  if (!app) throw new Error("Not authorized or not selected");

  const submission = await prisma.taskSubmission.upsert({
    where: { applicationId_taskId: { applicationId, taskId } },
    create: { applicationId, taskId, fileUrl, notes, status: "PENDING" },
    update: { fileUrl, notes, status: "PENDING", submittedAt: new Date() },
  });
  revalidatePath("/internship/student/tasks");
  return submission;
}

export async function getMyAttendance(applicationId) {
  const user = await getStudentApp();
  const app = await prisma.internshipApplication.findFirst({
    where: { id: applicationId, userId: user.id },
  });
  if (!app) throw new Error("Not authorized");
  return prisma.attendanceRecord.findMany({
    where: { applicationId },
    orderBy: { date: "desc" },
  });
}

// Rich attendance data for the student attendance dashboard
export async function getMyAttendanceFull() {
  const user = await getStudentApp();
  // Find the active (SELECTED) application with full batch + attendance info
  const application = await prisma.internshipApplication.findFirst({
    where: { userId: user.id, status: "SELECTED" },
    include: {
      batch: {
        include: {
          program: { select: { title: true, duration: true } },
        },
      },
      attendance: { orderBy: { date: "asc" } }, // asc for calendar rendering
      progress: { select: { attendancePct: true } },
    },
    orderBy: { appliedAt: "desc" },
  });
  return application;
}

export async function getLeaderboard(batchId) {
  return prisma.internProgress.findMany({
    where: {
      application: { batchId, status: "SELECTED" },
    },
    include: {
      application: {
        include: {
          user: { select: { id: true, name: true, imageUrl: true, branch: true } },
        },
      },
    },
    orderBy: { performScore: "desc" },
    take: 50,
  });
}

export async function getOpenBatches() {
  return prisma.internshipBatch.findMany({
    where: { status: { in: ["UPCOMING", "ACTIVE"] } },
    include: {
      program: { select: { title: true, domain: true, duration: true, stipend: true } },
      _count: { select: { applications: true } },
    },
    orderBy: { startDate: "asc" },
  });
}

export async function getMyNotifications(userId) {
  const user = await getStudentApp();
  const myBatchIds = (
    await prisma.internshipApplication.findMany({
      where: { userId: user.id },
      select: { batchId: true },
    })
  ).map((a) => a.batchId);

  return prisma.announcement.findMany({
    where: {
      OR: [{ isGlobal: true }, { batchId: { in: myBatchIds } }],
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
}
