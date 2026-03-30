"use server";

import prisma from "@/lib/prisma";
import { getFirebaseUser } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";
import { sendNotificationEmail } from "@/lib/email-service";

async function requireAdmin() {
  const firebaseUser = await getFirebaseUser();
  if (!firebaseUser) throw new Error("Unauthorized");
  const user = await prisma.user.findUnique({ where: { uid: firebaseUser.uid } });
  if (!user || user.role !== "ADMIN") throw new Error("Admin access required");
  return user;
}

// ── Evaluations ───────────────────────────────────────────────────────────────

export async function submitEvaluation(applicationId, data, sendEmail = false) {
  await requireAdmin();

  const evaluation = await prisma.internshipEvaluation.upsert({
    where: { applicationId },
    create: {
      applicationId,
      technicalSkills: data.technicalSkills,
      practicalImplementation: data.practicalImplementation,
      communication: data.communication,
      teamwork: data.teamwork,
      timeManagement: data.timeManagement,
      learningAbility: data.learningAbility,
      initiative: data.initiative,
      professionalEthics: data.professionalEthics,
      technicalComments: data.technicalComments,
      practicalComments: data.practicalComments,
      communicationComments: data.communicationComments,
      teamworkComments: data.teamworkComments,
      disciplineComments: data.disciplineComments,
      strengths: data.strengths,
      growthAreas: data.growthAreas,
      comments: data.comments,
      summary: data.summary,
      publishedAt: sendEmail ? new Date() : null,
    },
    update: {
      technicalSkills: data.technicalSkills,
      practicalImplementation: data.practicalImplementation,
      communication: data.communication,
      teamwork: data.teamwork,
      timeManagement: data.timeManagement,
      learningAbility: data.learningAbility,
      initiative: data.initiative,
      professionalEthics: data.professionalEthics,
      technicalComments: data.technicalComments || null,
      practicalComments: data.practicalComments || null,
      communicationComments: data.communicationComments || null,
      teamworkComments: data.teamworkComments || null,
      disciplineComments: data.disciplineComments || null,
      strengths: data.strengths || null,
      growthAreas: data.growthAreas || null,
      comments: data.comments,
      summary: data.summary,
      // Only set if explicitly emailing or if already published
      publishedAt: sendEmail ? new Date() : undefined,
    },
  });

  // Fetch the user to send a notification and email
  const app = await prisma.internshipApplication.findUnique({
    where: { id: applicationId },
    include: { 
      user: { select: { id: true, email: true, name: true } },
      batch: { select: { name: true } }
    }
  });

  if (app?.user?.id) {
    await prisma.notification.create({
      data: {
        userId: app.user.id,
        title: "Evaluation Published",
        message: `Your performance evaluation for ${app.batch?.name || "the internship"} is now available.`,
        type: "EVALUATION_PUBLISHED",
      }
    });

    if (sendEmail && app.user.email) {
      const emailSent = await sendNotificationEmail({
        to: app.user.email,
        subject: "🎖️ Internship Performance Evaluation Published",
        username: app.user.name || "Student",
        message: `Congratulations! Your performance evaluation for <b>${app.batch?.name || "your internship"}</b> has been officially issued by your mentor. You can now view your detailed competency breakdown and download the official report from your dashboard.`,
        buttonText: "View My Performance",
        buttonLink: "https://techiehelpinstituteofai.in/internship/student/evaluation"
      });

      if (!emailSent) {
        throw new Error("Evaluation saved, but notification email could not be sent. Please check SMTP settings.");
      }
    }
  }

  revalidatePath(`/internship/admin/applications/${applicationId}`);
  return evaluation;
}

export async function issueExistingEvaluation(evaluationId) {
  await requireAdmin();

  const evalData = await prisma.internshipEvaluation.findUnique({
    where: { id: evaluationId },
    include: {
      application: {
        include: {
          user: { select: { id: true, email: true, name: true } },
          batch: { select: { name: true } }
        }
      }
    }
  });

  if (!evalData) throw new Error("Evaluation not found");

  // Update published timestamp
  await prisma.internshipEvaluation.update({
    where: { id: evaluationId },
    data: { publishedAt: new Date() }
  });

  const app = evalData.application;
  
  if (app?.user?.id) {
    await prisma.notification.create({
      data: {
        userId: app.user.id,
        title: "Evaluation Officially Issued",
        message: `Your final performance evaluation for ${app.batch?.name || "the internship"} has been officially issued and emailed.`,
        type: "EVALUATION_PUBLISHED",
      }
    });

    if (app.user.email) {
      const emailSent = await sendNotificationEmail({
        to: app.user.email,
        subject: "🎖️ Official Internship Performance Report Issued",
        username: app.user.name || "Student",
        message: `Your final performance evaluation for <b>${app.batch?.name || "your internship"}</b> is now officially issued. You have completed all requirements, and your supervisor has finalized your report. You can now view and download it from the portal.`,
        buttonText: "View Final Report",
        buttonLink: "https://techiehelpinstituteofai.in/internship/student/evaluation"
      });

      if (!emailSent) {
        throw new Error("Evaluation saved, but email could not be sent. Please check SMTP settings.");
      }
    }
  }

  revalidatePath("/internship/admin/evaluations");
  return { success: true };
}

export async function getEvaluation(applicationId) {
  return prisma.internshipEvaluation.findUnique({
    where: { applicationId }
  });
}

// ── Notifications ─────────────────────────────────────────────────────────────

export async function getUnreadNotifications() {
  const firebaseUser = await getFirebaseUser();
  if (!firebaseUser) return [];

  const user = await prisma.user.findUnique({ where: { uid: firebaseUser.uid } });
  if (!user) return [];

  return prisma.notification.findMany({
    where: { userId: user.id, isRead: false },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
}

export async function markNotificationRead(notificationId) {
  const firebaseUser = await getFirebaseUser();
  if (!firebaseUser) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ where: { uid: firebaseUser.uid } });
  if (!user) throw new Error("User not found");

  const notif = await prisma.notification.findUnique({ where: { id: notificationId } });
  if (notif && notif.userId === user.id) {
    await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true }
    });
  }

  revalidatePath(`/dashboard`);
  return { success: true };
}
