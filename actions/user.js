"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { generateAIInsights } from "./dashboard";

export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    // Convert arrays to JSON strings for SQLite
    const processedData = {
      ...data,
      skills: JSON.stringify(data.skills || []),
    };

    // Check if industry exists outside transaction
    let industryInsight = await db.industryInsight.findUnique({
      where: {
        industry: data.industry,
      },
    });

    // If industry doesn't exist, create it with default values
    if (!industryInsight) {
      const insights = await generateAIInsights(data.industry);

      industryInsight = await db.industryInsight.create({
        data: {
          industry: data.industry,
          ...insights,
          nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });
    }

    // Now update the user
    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        industry: processedData.industry,
        experience: processedData.experience,
        bio: processedData.bio,
        skills: processedData.skills,
      },
    });

    const result = { updatedUser, industryInsight };

    revalidatePath("/");
    return { success: true, user: result.updatedUser };
  } catch (error) {
    console.error("Error updating user and industry:", error.message);
    throw new Error("Failed to update profile");
  }
}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    let user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    // If user doesn't exist, create them with a unique email
    if (!user) {
      const clerkUser = await auth();
      const email = clerkUser.user?.primaryEmailAddress?.emailAddress || `temp-${userId}@example.com`;
      const name = clerkUser.user?.firstName + " " + clerkUser.user?.lastName || "User";

      user = await db.user.create({
        data: {
          clerkUserId: userId,
          email: email,
          name: name,
        },
      });
    }

    return {
      isOnboarded: !!user?.industry,
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status");
  }
}

export async function getUserData() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: {
        name: true,
        industry: true,
        experience: true,
        bio: true,
        skills: true,
      },
    });

    if (!user) throw new Error("User not found");

    return user;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Failed to fetch user data");
  }
}
