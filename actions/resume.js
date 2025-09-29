"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";
import { updateGamification } from "./gamification";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function saveResume(content) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const resume = await db.resume.upsert({
      where: {
        userId: user.id,
      },
      update: {
        content,
      },
      create: {
        userId: user.id,
        content,
      },
    });

    // Update gamification for resume creation
    const gamification = await updateGamification(user.id, "resume_created");

    revalidatePath("/resume");
    return { resume, gamification };
  } catch (error) {
    console.error("Error saving resume:", error);
    throw new Error("Failed to save resume");
  }
}

export async function getResume() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.resume.findUnique({
    where: {
      userId: user.id,
    },
  });
}

export async function improveWithAI({ current, type }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      industryInsight: true,
    },
  });

  if (!user) throw new Error("User not found");

  const prompt = `
    As an expert resume writer, improve the following ${type} description for a ${user.industry} professional.
    Make it more impactful, quantifiable, and aligned with industry standards.
    Current content: "${current}"

    Requirements:
    1. Use action verbs
    2. Include metrics and results where possible
    3. Highlight relevant technical skills
    4. Keep it concise but detailed
    5. Focus on achievements over responsibilities
    6. Use industry-specific keywords
    
    Format the response as a single paragraph without any additional text or explanations.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const improvedContent = response.text().trim();
    return improvedContent;
  } catch (error) {
    console.error("Error improving content:", error);
    throw new Error("Failed to improve content");
  }
}

export async function atsChecker(file) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  // Extract text from file (assuming PDF)
  const buffer = Buffer.from(await file.arrayBuffer());
  const pdfParse = (await import("pdf-parse")).default;
  const data = await pdfParse(buffer);
  const resumeText = data.text;

  if (!resumeText || resumeText.trim().length === 0) {
    throw new Error("Could not extract text from file");
  }

  const prompt = `
    Analyze the following resume for ATS (Applicant Tracking System) compatibility. Provide:
    1. An ATS score out of 100 (as a number)
    2. Detailed feedback on what to improve for better ATS performance

    Resume content:
    ${resumeText}

    Consider factors like:
    - Keyword optimization
    - Format and structure
    - Length and readability
    - Use of standard sections
    - Contact information format
    - Skills presentation

    Return the response in JSON format with keys: "atsScore" (number) and "feedback" (string).
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const aiResponse = response.text().trim();

    let atsScore, feedback;
    try {
      const parsed = JSON.parse(aiResponse);
      atsScore = parsed.atsScore;
      feedback = parsed.feedback;
    } catch (error) {
      atsScore = 70;
      feedback = "Unable to parse AI response. Please review your resume manually.";
    }

    await db.resume.upsert({
      where: {
        userId: user.id,
      },
      update: {
        atsScore,
        feedback,
      },
      create: {
        userId: user.id,
        content: resumeText,
        atsScore,
        feedback,
      },
    });

    return { atsScore, feedback };
  } catch (error) {
    console.error("ATS Checker error:", error);
    throw new Error("Failed to analyze resume");
  }
}
