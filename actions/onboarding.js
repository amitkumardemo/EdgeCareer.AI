"use server";

import prisma from "@/lib/prisma";
import { getFirebaseUser } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";

export async function saveOnboardingData(data) {
  const firebaseUser = await getFirebaseUser();
  if (!firebaseUser) throw new Error("Unauthorized");

  const { uid } = firebaseUser;
  const combinedIndustry = `${data.industry}-${data.subIndustry.toLowerCase().replace(/ /g, "-")}`;

  try {
    // 1. Ensure IndustryInsight exists to satisfy foreign key constraint
    const existingInsight = await prisma.industryInsight.findUnique({
      where: { industry: combinedIndustry }
    });

    if (!existingInsight) {
      // Create default insight if it doesn't exist
      await prisma.industryInsight.create({
        data: {
          industry: combinedIndustry,
          salaryRanges: JSON.stringify([
            { role: "Entry Level", min: 400000, max: 700000, median: 550000, location: "India" },
            { role: "Junior Professional", min: 600000, max: 1000000, median: 800000, location: "India" },
            { role: "Senior Professional", min: 1200000, max: 2500000, median: 1800000, location: "India" },
            { role: "Expert/Manager", min: 2500000, max: 5000000, median: 3500000, location: "India" }
          ]),
          growthRate: 10,
          demandLevel: "Medium",
          topSkills: JSON.stringify(data.skills.split(",").map(s => s.trim()).filter(Boolean)),
          marketOutlook: "Positive",
          keyTrends: JSON.stringify(["Digital Transformation", "AI Integration"]),
          recommendedSkills: JSON.stringify(["Problem Solving", "Continuous Learning"]),
          nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        }
      });
    }

    // 2. Prepare data for user update
    const skillsArray = data.skills ? data.skills.split(",").map(s => s.trim()).filter(Boolean) : [];
    
    const updateData = {
      name: data.fullName,
      college: data.collegeId && data.collegeId !== "other" 
        ? { connect: { id: data.collegeId } } 
        : { disconnect: true },
      collegeName: data.collegeId === "other" ? data.collegeName : null,
      branch: data.branch,
      year: parseInt(data.year) || null,
      department: data.department,
      industryInsight: { connect: { industry: combinedIndustry } },
      experience: parseInt(data.experience) || 0,
      skills: JSON.stringify(skillsArray),
      bio: data.bio,
      resumeLink: data.resumeLink || null,
      cvLink: data.cvLink || null,
      portfolioLink: data.portfolioLink || null,
      githubUsername: data.githubUsername || null,
      leetcodeLink: data.leetcodeLink || null,
      linkedinLink: data.linkedinLink || null,
      onboardingCompleted: true,
    };

    const updatedUser = await prisma.user.update({
      where: { uid },
      data: updateData
    });

    revalidatePath("/");
    revalidatePath("/dashboard");
    revalidatePath("/(internship)/internship/student/dashboard");
    return updatedUser;
  } catch (error) {
    console.error("Onboarding Save Error:", error);
    throw new Error(error.message || "Failed to save onboarding data");
  }
}

export async function getColleges() {
  return prisma.college.findMany({
    orderBy: { name: "asc" }
  });
}
