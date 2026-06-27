"use server";

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { jobSchema, JobFormValues } from "@/lib/validations/job";
import { getFirebaseUser } from "@/lib/auth-utils";

const prisma = new PrismaClient();

// Ensure the user is an admin or recruiter
const checkAdmin = async () => {
  const user = await getFirebaseUser();
  if (!user || user.email !== "techiehelp57@gmail.com") {
    throw new Error("Unauthorized");
  }
  return user;
};

export async function createJob(data: JobFormValues) {
  try {
    const user = await checkAdmin();

    const parsedData = jobSchema.parse(data);

    // Create or find company
    let company = await prisma.company.findFirst({ 
      where: { name: { equals: parsedData.companyName, mode: "insensitive" } } 
    });
    
    const companySlug = parsedData.companyName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    
    if (!company) {
      company = await prisma.company.create({
        data: {
          name: parsedData.companyName,
          slug: companySlug,
          logoUrl: parsedData.companyLogoUrl || null,
        }
      });
    } else if (parsedData.companyLogoUrl && !company.logoUrl) {
      // Update logo if company exists but has no logo
      company = await prisma.company.update({
        where: { id: company.id },
        data: { logoUrl: parsedData.companyLogoUrl }
      });
    }

    // Create a unique slug from title
    const slug = parsedData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();

    const job = await prisma.job.create({
      data: {
        title: parsedData.title,
        slug,
        companyId: company.id,
        categoryId: parsedData.categoryId,
        locationId: parsedData.locationId,
        salary: parsedData.salary,
        experience: parsedData.experience,
        employmentType: parsedData.employmentType,
        department: parsedData.department,
        workMode: parsedData.workMode,
        openPositions: parsedData.openPositions,
        description: parsedData.description,
        requirements: parsedData.requirements,
        responsibilities: parsedData.responsibilities,
        benefits: parsedData.benefits,
        selectionProcess: parsedData.selectionProcess,
        skills: parsedData.skills || "[]",
        applyLink: parsedData.applyLink,
        applicationEmail: parsedData.applicationEmail,
        thumbnailUrl: parsedData.thumbnailUrl,
        bannerUrl: parsedData.bannerUrl,
        isFeatured: parsedData.isFeatured,
        isTrending: parsedData.isTrending,
        isUrgent: parsedData.isUrgent,
        status: parsedData.status,
        seoTitle: parsedData.seoTitle,
        seoDescription: parsedData.seoDescription,
        seoKeywords: parsedData.seoKeywords,
        publishedAt: parsedData.status === "PUBLISHED" ? new Date() : null,
      },
    });

    revalidatePath("/admin/jobs");
    revalidatePath("/jobs");
    
    return { success: true, job };
  } catch (error: any) {
    console.error("Error creating job:", error);
    return { success: false, error: error.message };
  }
}
