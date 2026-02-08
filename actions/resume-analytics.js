"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

/**
 * Get all resumes for the current user
 */
export async function getUserResumes() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const resumes = await db.resume.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return resumes;
}

/**
 * Get resume analytics for the current user
 */
export async function getResumeAnalytics() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: {
      id: true,
      totalResumesCreated: true,
      totalResumesSaved: true,
      totalResumesDownloaded: true,
      totalResumesShared: true,
    },
  });

  if (!user) throw new Error("User not found");

  // Get mode-based counts
  const resumes = await db.resume.findMany({
    where: { userId: user.id },
    select: { mode: true },
  });

  const manualCount = resumes.filter(r => r.mode === 'manual').length;
  const aiCount = resumes.filter(r => r.mode === 'ai').length;

  return {
    ...user,
    manualResumesCount: manualCount,
    aiResumesCount: aiCount,
  };
}

/**
 * Create a new resume
 */
export async function createResume(name, content) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const resume = await db.resume.create({
    data: {
      userId: user.id,
      name: name || "My Resume",
      content,
      status: "draft",
    },
  });

  // Update user analytics
  await db.user.update({
    where: { id: user.id },
    data: {
      totalResumesCreated: {
        increment: 1,
      },
    },
  });

  revalidatePath("/resume");
  revalidatePath("/dashboard");
  return resume;
}

/**
 * Update an existing resume
 */
export async function updateResume(resumeId, content, name) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const resume = await db.resume.update({
    where: {
      id: resumeId,
      userId: user.id,
    },
    data: {
      content,
      ...(name && { name }),
      status: "saved",
    },
  });

  // Update user analytics
  await db.user.update({
    where: { id: user.id },
    data: {
      totalResumesSaved: {
        increment: 1,
      },
    },
  });

  revalidatePath("/resume");
  revalidatePath("/dashboard");
  return resume;
}

/**
 * Track resume download
 */
export async function trackResumeDownload(resumeId) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  await db.resume.update({
    where: {
      id: resumeId,
      userId: user.id,
    },
    data: {
      downloadCount: {
        increment: 1,
      },
      status: "downloaded",
    },
  });

  // Update user analytics
  await db.user.update({
    where: { id: user.id },
    data: {
      totalResumesDownloaded: {
        increment: 1,
      },
    },
  });

  revalidatePath("/resume");
  revalidatePath("/dashboard");
}

/**
 * Generate share token and track share
 */
export async function shareResume(resumeId) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  // Check if resume exists and belongs to user
  const existingResume = await db.resume.findFirst({
    where: {
      id: resumeId,
      userId: user.id,
    },
  });

  if (!existingResume) throw new Error("Resume not found");

  // Generate branded share token based on user's name
  // Format: username_hash (e.g., amitkumar_a3f2e1)
  const crypto = await import("crypto");
  const cleanName = (user.name || user.email)
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  
  const hash = crypto
    .createHash('md5')
    .update(`${cleanName}-${resumeId}-${Date.now()}`)
    .digest('hex')
    .substring(0, 6);
  
  const shareToken = `${cleanName}_${hash}`;

  const resume = await db.resume.update({
    where: {
      id: resumeId,
      userId: user.id,
    },
    data: {
      shareToken,
      isPublic: true,
      shareCount: {
        increment: 1,
      },
    },
  });

  // Update user analytics
  await db.user.update({
    where: { id: user.id },
    data: {
      totalResumesShared: {
        increment: 1,
      },
    },
  });

  console.log(`✅ Share link generated for resume ${resumeId} by user ${user.id}: ${shareToken}`);

  revalidatePath("/resume");
  revalidatePath("/dashboard");
  
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const shareUrl = `${baseUrl}/resume/share/${shareToken}`;
  
  // For production: resume_{username}.techiehelpinstituteofai.in
  const brandedUrl = `resume_${shareToken}.techiehelpinstituteofai.in`;

  return {
    shareToken,
    shareUrl,
    brandedUrl,
    message: "Resume shared successfully!",
  };
}

/**
 * Get shared resume by token
 */
export async function getSharedResume(shareToken) {
  const resume = await db.resume.findUnique({
    where: {
      shareToken,
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

  if (!resume) throw new Error("Resume not found or not public");

  return resume;
}

/**
 * Delete a resume
 */
export async function deleteResume(resumeId) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  await db.resume.delete({
    where: {
      id: resumeId,
      userId: user.id,
    },
  });

  revalidatePath("/resume");
  revalidatePath("/dashboard");
}

/**
 * Get resume creation timeline (for charts)
 */
export async function getResumeTimeline() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const resumes = await db.resume.findMany({
    where: {
      userId: user.id,
    },
    select: {
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // Group by date
  const timeline = {};
  resumes.forEach((resume) => {
    const date = resume.createdAt.toISOString().split("T")[0];
    timeline[date] = (timeline[date] || 0) + 1;
  });

  return Object.entries(timeline).map(([date, count]) => ({
    date,
    count,
  }));
}

/**
 * Get resume status distribution (for pie chart)
 */
export async function getResumeStatusDistribution() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const resumes = await db.resume.findMany({
    where: {
      userId: user.id,
    },
    select: {
      status: true,
    },
  });

  const distribution = {
    draft: 0,
    saved: 0,
    downloaded: 0,
  };

  resumes.forEach((resume) => {
    distribution[resume.status] = (distribution[resume.status] || 0) + 1;
  });

  return Object.entries(distribution).map(([status, count]) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: count,
  }));
}

/**
 * Get recent resume activity
 */
export async function getRecentResumeActivity() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const resumes = await db.resume.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      name: true,
      status: true,
      updatedAt: true,
      downloadCount: true,
      shareCount: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: 5,
  });

  return resumes;
}
