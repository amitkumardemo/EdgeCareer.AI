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

// ── Modules ──────────────────────────────────────────────────────────────────

export async function createModule(batchId, data) {
  await requireAdmin();
  const newModule = await prisma.internshipModule.create({
    data: {
      batchId,
      title: data.title,
      description: data.description,
      order: data.order || 0,
    },
  });
  revalidatePath(`/internship/admin/batches/${batchId}`);
  return newModule;
}

export async function getModules(batchId) {
  return prisma.internshipModule.findMany({
    where: { batchId },
    include: {
      videos: {
        orderBy: { order: "asc" }
      }
    },
    orderBy: { order: "asc" },
  });
}

export async function deleteModule(moduleId) {
  await requireAdmin();
  const mod = await prisma.internshipModule.findUnique({ where: { id: moduleId } });
  if (!mod) throw new Error("Module not found");

  await prisma.internshipModule.delete({ where: { id: moduleId } });
  revalidatePath(`/internship/admin/batches/${mod.batchId}`);
  return { success: true };
}

// ── Videos ───────────────────────────────────────────────────────────────────

export async function addVideo(moduleId, data) {
  await requireAdmin();
  let youtubeId = null;
  const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = data.videoUrl.match(ytRegex);
  if (match && match[1]) {
    youtubeId = match[1];
  }

  let finalTitle = data.title;
  let finalDuration = data.duration || null;
  let thumbnail = youtubeId ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` : null;

  // Auto Fetch Details via YOUTUBE API
  if (youtubeId && process.env.YOUTUBE_API_KEY) {
    try {
      const ytResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${youtubeId}&key=${process.env.YOUTUBE_API_KEY}`);
      if (ytResponse.ok) {
        const ytData = await ytResponse.json();
        if (ytData.items && ytData.items.length > 0) {
          const item = ytData.items[0];
          if (!data.title || data.title.trim() === "") {
             finalTitle = item.snippet.title;
          }
          // Convert ISO 8601 duration (PT1H20M30S) to readable (1h 20m 30s)
          const isoDuration = item.contentDetails.duration;
          const matchTime = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
          if (matchTime) {
            let h = matchTime[1] || "";
            let m = matchTime[2] || "";
            let s = matchTime[3] || "";
            let timeStr = "";
            if(h) timeStr += `${h}h `;
            if(m) timeStr += `${m}m `;
            if(s) timeStr += `${s}s`;
            finalDuration = timeStr.trim();
          }
        }
      }
    } catch(err) {
      console.warn("Failed to fetch Youtube context", err);
    }
  }

  const newVideo = await prisma.internshipVideo.create({
    data: {
      moduleId,
      title: finalTitle || "Untitled Video",
      videoUrl: data.videoUrl,
      youtubeId,
      thumbnail,
      duration: finalDuration,
      order: data.order || 0,
      resources: data.resources || "[]"
    },
  });

  const mod = await prisma.internshipModule.findUnique({ where: { id: moduleId } });
  if (mod) revalidatePath(`/internship/admin/batches/${mod.batchId}`);
  
  return newVideo;
}

export async function deleteVideo(videoId) {
  await requireAdmin();
  const video = await prisma.internshipVideo.findUnique({
    where: { id: videoId },
    include: { module: true },
  });
  if (!video) throw new Error("Video not found");

  await prisma.internshipVideo.delete({ where: { id: videoId } });
  if (video.module) revalidatePath(`/internship/admin/batches/${video.module.batchId}`);
  
  return { success: true };
}

// ── Student / Completions ─────────────────────────────────────────────────────

export async function markVideoComplete(applicationId, videoId) {
  // We can let the user or admin mark it
  const record = await prisma.videoCompletion.upsert({
    where: {
      applicationId_videoId: { applicationId, videoId }
    },
    create: { applicationId, videoId },
    update: {},
  });

  // Calculate progress
  // total videos in batch
  const app = await prisma.internshipApplication.findUnique({
    where: { id: applicationId },
    select: { batchId: true, progress: true }
  });

  if (app) {
    const totalVideos = await prisma.internshipVideo.count({
      where: { module: { batchId: app.batchId } }
    });

    const completedCount = await prisma.videoCompletion.count({
      where: { applicationId }
    });

    // We can merge this with task progress or keep separate. 
    // In our plan we showed progress bar for videos. We can update an existing progress field or just use dynamic calculation.
    // For now we just return the count and we can dynamically calculate in UI.
  }

  revalidatePath(`/dashboard/internships/${app?.batchId}/lms`);
  return record;
}

export async function getStudentLmsProgress(applicationId) {
  const app = await prisma.internshipApplication.findUnique({
    where: { id: applicationId },
    select: { batchId: true }
  });
  
  if (!app) return { completedIds: [], total: 0 };

  const [completions, totalVideos] = await Promise.all([
    prisma.videoCompletion.findMany({
      where: { applicationId },
      select: { videoId: true }
    }),
    prisma.internshipVideo.count({
      where: { module: { batchId: app.batchId } }
    })
  ]);

  return {
    completedIds: completions.map(c => c.videoId),
    totalVideos,
    completedVideos: completions.length,
    progressPct: totalVideos > 0 ? Math.round((completions.length / totalVideos) * 100) : 0
  };
}
