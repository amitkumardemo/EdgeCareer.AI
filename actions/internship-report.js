"use server";

import prisma from "@/lib/prisma";
import { getFirebaseUser } from "@/lib/auth-utils";

async function requireAuth() {
  const firebaseUser = await getFirebaseUser();
  if (!firebaseUser) throw new Error("Unauthorized");
  return prisma.user.findUnique({ where: { uid: firebaseUser.uid } });
}

export async function getReportData(applicationId) {
  const user = await requireAuth();
  
  // Find the application and ensure the user owns it or is an admin
  const application = await prisma.internshipApplication.findUnique({
    where: { id: applicationId },
    include: {
      user: {
        include: { college: true }
      },
      batch: {
        include: {
          program: true,
          mentor: {
            select: { name: true }
          }
        }
      },
      progress: {
        include: {
          certificate: true,
          report: true
        }
      },
      attendance: {
        orderBy: { date: "asc" }
      },
      submissions: {
        include: {
          task: true
        },
        orderBy: {
          task: { dueDate: "asc" }
        }
      },
      evaluation: true
    }
  });

  if (!application) throw new Error("Application not found");
  
  // Security check: Only the student themselves or an Admin can view the report
  if (user.role !== "ADMIN" && application.userId !== user.id) {
    throw new Error("Access denied");
  }

  // Calculate some insights for the report
  const totalTasks = application.batch.tasks?.length || application.progress?.totalTasks || 0;
  const presentDays = application.attendance.filter(a => a.present).length;
  const totalDays = application.attendance.length;

  return {
    student: {
      name: application.user.name,
      email: application.user.email,
      college: application.user.college?.name || application.user.collegeName || "N/A",
      department: application.user.department || "N/A",
      branch: application.user.branch || "N/A",
      year: application.user.year || "N/A",
      linkedin: application.user.linkedinLink,
      github: application.user.githubUsername,
      portfolio: application.user.portfolioLink,
    },
    internship: {
      programName: application.batch.program.title,
      domain: application.batch.program.domain,
      duration: application.batch.program.duration,
      batchName: application.batch.name,
      startDate: application.batch.startDate,
      endDate: application.batch.endDate,
      mentorName: application.batch.mentor?.name || "TechieHelp Mentor",
      description: application.batch.program.description,
    },
    performance: {
      attendancePct: application.progress?.attendancePct || 0,
      presentDays,
      totalDays,
      tasksCompleted: application.progress?.tasksCompleted || 0,
      totalTasks,
      performScore: application.progress?.performScore || 0,
      completionDate: application.progress?.completedAt,
    },
    tasks: application.submissions.map(s => ({
      title: s.task.title,
      dueDate: s.task.dueDate,
      status: s.status,
      score: s.score,
      maxScore: s.task.maxScore,
      submittedAt: s.submittedAt,
    })),
    certificate: {
      serialNo: application.progress?.certificate?.serialNo,
      issuedAt: application.progress?.certificate?.issuedAt,
    },
    report: application.progress?.report,
    evaluation: application.evaluation
  };
}

export async function updateReportPdfUrl(reportId, pdfUrl) {
  const user = await requireAuth();
  if (user.role !== "ADMIN") throw new Error("Admin access required");

  return prisma.internshipReport.update({
    where: { id: reportId },
    data: { pdfUrl }
  });
}
