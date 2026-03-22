"use server";

import db from "@/lib/prisma";
import { getFirebaseUser } from "@/lib/auth-utils";
import { checkUser } from "@/lib/checkUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { generateAIInsights } from "./dashboard";

export async function updateUser(data) {
  const firebaseUser = await getFirebaseUser();
  if (!firebaseUser) redirect("/sign-in");
  const userId = firebaseUser.uid;

  let user = await db.user.findUnique({
    where: { uid: userId },
  });

  if (!user) {
    user = await checkUser();
  }

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
  const firebaseUser = await getFirebaseUser();
  if (!firebaseUser) redirect("/sign-in");
  const userId = firebaseUser.uid;

  try {
    let user = await db.user.findUnique({
      where: { uid: userId },
    });

    // If user doesn't exist, create them
    if (!user) {
      user = await db.user.create({
        data: {
          uid: userId,
          email: firebaseUser.email,
          name: firebaseUser.name || "User",
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
  const firebaseUser = await getFirebaseUser();
  if (!firebaseUser) redirect("/sign-in");
  const userId = firebaseUser.uid;

  try {
    let user = await db.user.findUnique({
      where: { uid: userId },
      include: {
        college: true,
      },
    });

    if (!user) {
      await checkUser();
      user = await db.user.findUnique({
        where: { uid: userId },
        select: {
          name: true,
          industry: true,
          experience: true,
          bio: true,
          skills: true,
          collegeId: true,
          college: { select: { name: true } },
          collegeName: true,
          department: true,
          branch: true,
          year: true,
          resumeLink: true,
          cvLink: true,
          portfolioLink: true,
          githubUsername: true,
          leetcodeLink: true,
          linkedinLink: true,
          techieId: true,
        },
      });
    }

    if (!user) throw new Error("User not found");

    return user;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Failed to fetch user data");
  }
}
