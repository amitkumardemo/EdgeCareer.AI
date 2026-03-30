"use server";

import prisma from "@/lib/prisma";
import { getFirebaseUser } from "@/lib/auth-utils";

async function requireAuth() {
  const firebaseUser = await getFirebaseUser();
  if (!firebaseUser) throw new Error("Unauthorized");
  return prisma.user.findUnique({ where: { uid: firebaseUser.uid } });
}

export async function getStudentPerformance(applicationId = null) {
  const user = await requireAuth();

  let where = { userId: user.id, status: "SELECTED" };
  
  // If admin specifies an applicationId, allow they view it
  if (applicationId && user.role === "ADMIN") {
    where = { id: applicationId };
  }

  // Find the selected/active application
  const application = await prisma.internshipApplication.findFirst({
    where,
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
      progress: true,
      evaluation: true
    },
    orderBy: { appliedAt: "desc" },
  });

  if (!application) {
    return { success: false, message: "No active internship found." };
  }

  if (!application.evaluation || !application.evaluation.publishedAt) {
    return { 
      success: false, 
      message: "Your performance evaluation has not been issued by your manager yet.", 
      ongoing: true, 
      batch: application.batch 
    };
  }

  // Generate 'AI' Insights based on the score matrix
  const metrics = [
    { name: "Technical Skills", val: application.evaluation.technicalSkills },
    { name: "Practical Implementation", val: application.evaluation.practicalImplementation },
    { name: "Communication", val: application.evaluation.communication },
    { name: "Teamwork", val: application.evaluation.teamwork },
    { name: "Time Management", val: application.evaluation.timeManagement },
    { name: "Learning Ability", val: application.evaluation.learningAbility },
    { name: "Initiative", val: application.evaluation.initiative },
    { name: "Professional Ethics", val: application.evaluation.professionalEthics },
  ];

  const strengths = metrics.filter(m => m.val === "Strongly Agree").map(m => m.name);
  const improvements = metrics.filter(m => m.val === "Disagree").map(m => m.name);
  const neutral = metrics.filter(m => m.val === "Agree").map(m => m.name);

  let generatedFeedback = {
    strengthsText: "",
    improvementsText: ""
  };

  if (strengths.length > 0) {
    generatedFeedback.strengthsText = `The candidate has demonstrated exceptional proficiency in ${strengths.join(", ")}. Their ability to excel in these areas has significantly contributed to the project's success.`;
  } else {
    generatedFeedback.strengthsText = `The candidate has shown a solid baseline across general responsibilities, maintaining consistent involvement.`;
  }

  if (improvements.length > 0) {
    generatedFeedback.improvementsText = `There is room for targeted growth in ${improvements.join(", ")}. Focusing on these attributes will elevate their professional readiness.`;
  } else if (neutral.length > 0) {
    generatedFeedback.improvementsText = `While performing well generally, continuing to refine and take proactive leadership in ${neutral.slice(0, 2).join(" and ")} will accelerate their career trajectory.`;
  } else {
    generatedFeedback.improvementsText = `The candidate operates at a highly capable level across the board, leaving very few technical blindspots.`;
  }

  // Calculate radar data
  const valMap = { "Strongly Agree": 100, "Agree": 75, "Disagree": 40 };
  const radarData = metrics.map(m => ({
    subject: m.name.split(" ")[0], // Shorter name for radar chart
    fullSubject: m.name,
    score: valMap[m.val] || 0,
    fullMark: 100,
  }));

  const overallScore = Math.round(radarData.reduce((acc, curr) => acc + curr.score, 0) / 8);
  let performanceBadge = "Satisfactory";
  if (overallScore >= 90) performanceBadge = "Outstanding Performer";
  else if (overallScore >= 75) performanceBadge = "Strong Performer";
  else if (overallScore >= 60) performanceBadge = "Average Performer";
  else performanceBadge = "Needs Improvement";

  return {
    success: true,
    data: {
      applicationId: application.id,
      studentData: {
        name: application.user.name,
        email: application.user.email,
        college: application.user.college?.name || application.user.collegeName || "N/A"
      },
      batchData: {
        name: application.batch.name,
        domain: application.batch.program.domain,
        duration: application.batch.program.duration,
        startDate: application.batch.startDate,
        endDate: application.batch.endDate
      },
      progress: application.progress,
      evaluation: application.evaluation,
      radarData,
      overallScore,
      performanceBadge,
      aiFeedback: generatedFeedback
    }
  };
}
