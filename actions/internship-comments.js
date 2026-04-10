"use server";

import prisma from "@/lib/prisma";
import { getFirebaseUser } from "@/lib/auth-utils";

export async function getVideoComments(videoId) {
  // Fetch comments + user relation, order by newest
  return prisma.videoComment.findMany({
    where: { videoId },
    include: {
      user: {
        select: { name: true, imageUrl: true, role: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });
}

export async function postVideoComment(videoId, text) {
  const firebaseUser = await getFirebaseUser();
  if (!firebaseUser) throw new Error("Unauthorized");
  
  const user = await prisma.user.findUnique({ where: { uid: firebaseUser.uid } });
  if (!user) throw new Error("User not found");

  const comment = await prisma.videoComment.create({
    data: {
      videoId,
      userId: user.id,
      text
    },
    include: {
      user: {
        select: { name: true, imageUrl: true, role: true }
      }
    }
  });

  return comment;
}

export async function getBatchLmsComments(batchId) {
  return prisma.videoComment.findMany({
    where: {
      video: {
        module: {
          batchId
        }
      }
    },
    include: {
      user: {
        select: { name: true, imageUrl: true, role: true }
      },
      video: {
        select: { title: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });
}
