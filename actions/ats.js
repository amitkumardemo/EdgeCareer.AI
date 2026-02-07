"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { randomBytes } from "crypto";

/**
 * Create a new ATS analysis record
 */
export async function createATSAnalysis(data) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Generate unique share token
    const shareToken = randomBytes(16).toString("hex");

    // Determine score category
    const scoreCategory = getScoreCategory(data.atsScore);

    // Create the analysis
    const analysis = await db.aTSAnalysis.create({
      data: {
        userId: user.id,
        resumeFileName: data.resumeFileName,
        atsScore: data.atsScore,
        scoreCategory,
        keywordMatchScore: data.keywordMatchScore || 0,
        skillsScore: data.skillsScore || 0,
        formattingScore: data.formattingScore || 0,
        experienceScore: data.experienceScore || 0,
        projectScore: data.projectScore || 0,
        atsCompatibleScore: data.atsCompatibleScore || 0,
        matchedKeywords: JSON.stringify(data.matchedKeywords || []),
        missingKeywords: JSON.stringify(data.missingKeywords || []),
        suggestions: JSON.stringify(data.suggestions || []),
        strengths: JSON.stringify(data.strengths || []),
        weaknesses: JSON.stringify(data.weaknesses || []),
        improvementTip: data.improvementTip,
        shareToken,
      },
    });

    // Update user stats
    const previousBest = user.bestAtsScore || 0;
    await db.user.update({
      where: { id: user.id },
      data: {
        totalResumesAnalyzed: { increment: 1 },
        lastAtsScore: data.atsScore,
        bestAtsScore: Math.max(previousBest, data.atsScore),
      },
    });

    return { success: true, analysisId: analysis.id, shareToken };
  } catch (error) {
    console.error("Error creating ATS analysis:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Get all ATS analyses for the current user
 */
export async function getUserATSAnalyses() {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      return [];
    }

    const analyses = await db.aTSAnalysis.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return analyses.map((analysis) => ({
      ...analysis,
      matchedKeywords: JSON.parse(analysis.matchedKeywords),
      missingKeywords: JSON.parse(analysis.missingKeywords),
      suggestions: JSON.parse(analysis.suggestions),
      strengths: JSON.parse(analysis.strengths),
      weaknesses: JSON.parse(analysis.weaknesses),
    }));
  } catch (error) {
    console.error("Error fetching ATS analyses:", error);
    return [];
  }
}

/**
 * Get a single ATS analysis by ID
 */
export async function getATSAnalysisById(id) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const analysis = await db.aTSAnalysis.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!analysis) {
      return null;
    }

    return {
      ...analysis,
      matchedKeywords: JSON.parse(analysis.matchedKeywords),
      missingKeywords: JSON.parse(analysis.missingKeywords),
      suggestions: JSON.parse(analysis.suggestions),
      strengths: JSON.parse(analysis.strengths),
      weaknesses: JSON.parse(analysis.weaknesses),
    };
  } catch (error) {
    console.error("Error fetching ATS analysis:", error);
    return null;
  }
}

/**
 * Get ATS analysis by share token (public access)
 */
export async function getATSAnalysisByToken(token) {
  try {
    const analysis = await db.aTSAnalysis.findUnique({
      where: {
        shareToken: token,
        isPublic: true,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!analysis) {
      return null;
    }

    return {
      ...analysis,
      matchedKeywords: JSON.parse(analysis.matchedKeywords),
      missingKeywords: JSON.parse(analysis.missingKeywords),
      suggestions: JSON.parse(analysis.suggestions),
      strengths: JSON.parse(analysis.strengths),
      weaknesses: JSON.parse(analysis.weaknesses),
    };
  } catch (error) {
    console.error("Error fetching ATS analysis by token:", error);
    return null;
  }
}

/**
 * Toggle public sharing for an analysis
 */
export async function toggleATSAnalysisSharing(id, isPublic) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const analysis = await db.aTSAnalysis.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!analysis) {
      throw new Error("Analysis not found");
    }

    await db.aTSAnalysis.update({
      where: { id },
      data: { isPublic },
    });

    return { success: true };
  } catch (error) {
    console.error("Error toggling ATS analysis sharing:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Get ATS analytics data for dashboard
 */
export async function getATSAnalytics() {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      return null;
    }

    const analyses = await db.aTSAnalysis.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "asc" },
    });

    // Calculate analytics
    const totalAnalyses = analyses.length;
    const averageScore =
      totalAnalyses > 0
        ? analyses.reduce((sum, a) => sum + a.atsScore, 0) / totalAnalyses
        : 0;

    // Score distribution
    const scoreDistribution = {
      poor: analyses.filter((a) => a.scoreCategory === "Poor").length,
      average: analyses.filter((a) => a.scoreCategory === "Average").length,
      good: analyses.filter((a) => a.scoreCategory === "Good").length,
      excellent: analyses.filter((a) => a.scoreCategory === "Excellent").length,
    };

    // Trend data (last 10 analyses)
    const trendData = analyses.slice(-10).map((a) => ({
      date: a.createdAt,
      score: a.atsScore,
    }));

    // Improvement percentage
    let improvementPercentage = 0;
    if (analyses.length >= 2) {
      const firstScore = analyses[0].atsScore;
      const lastScore = analyses[analyses.length - 1].atsScore;
      improvementPercentage = ((lastScore - firstScore) / firstScore) * 100;
    }

    return {
      totalAnalyses,
      averageScore: parseFloat(averageScore.toFixed(2)),
      bestScore: user.bestAtsScore || 0,
      lastScore: user.lastAtsScore || 0,
      improvementPercentage: parseFloat(improvementPercentage.toFixed(2)),
      scoreDistribution,
      trendData,
    };
  } catch (error) {
    console.error("Error fetching ATS analytics:", error);
    return null;
  }
}

/**
 * Get ATS insights for chat view
 */
export async function getATSInsights() {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      return [];
    }

    const analyses = await db.aTSAnalysis.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    // Generate insights
    const insights = analyses.map((analysis, index) => {
      const previousAnalysis = analyses[index + 1];
      let comparisonText = "";

      if (previousAnalysis) {
        const scoreDiff = analysis.atsScore - previousAnalysis.atsScore;
        if (scoreDiff > 0) {
          comparisonText = `Improved by ${scoreDiff.toFixed(1)} points from your last analysis.`;
        } else if (scoreDiff < 0) {
          comparisonText = `Decreased by ${Math.abs(scoreDiff).toFixed(
            1
          )} points from your last analysis.`;
        } else {
          comparisonText = "Score remained the same as your last analysis.";
        }
      }

      return {
        id: analysis.id,
        resumeFileName: analysis.resumeFileName,
        atsScore: analysis.atsScore,
        scoreCategory: analysis.scoreCategory,
        createdAt: analysis.createdAt,
        comparisonText,
        improvementTip: analysis.improvementTip,
      };
    });

    return insights;
  } catch (error) {
    console.error("Error fetching ATS insights:", error);
    return [];
  }
}

/**
 * Delete an ATS analysis
 */
export async function deleteATSAnalysis(id) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const analysis = await db.aTSAnalysis.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!analysis) {
      throw new Error("Analysis not found");
    }

    await db.aTSAnalysis.delete({
      where: { id },
    });

    // Update user stats
    await db.user.update({
      where: { id: user.id },
      data: {
        totalResumesAnalyzed: { decrement: 1 },
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting ATS analysis:", error);
    return { success: false, error: error.message };
  }
}

// Helper function to determine score category
function getScoreCategory(score) {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 50) return "Average";
  return "Poor";
}
