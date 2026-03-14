"use server";

import { db } from "@/lib/prisma";
import { getFirebaseUser } from "@/lib/auth-utils";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";
import { updateGamification } from "./gamification";

// Helper to get Gemini model safely
function getGeminiModel(config = {}) {
  let apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("⚠️ GEMINI_API_KEY is missing. AI features will be limited.");
    return null;
  }

  // Sanitize key (especially for Windows line endings)
  apiKey = apiKey.trim();

  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
    ...config
  });
}

export async function saveResume(content, resumeId = null, name = "My Resume", mode = "manual") {
  const firebaseUser = await getFirebaseUser();
  if (!firebaseUser) {
    console.error("❌ [Action] Unauthorized saveResume attempt");
    throw new Error("Unauthorized");
  }
  const userId = firebaseUser.uid;

  const user = await db.user.findUnique({
    where: { uid: userId },
  });

  if (!user) {
    console.error("❌ [Action] User not found");
    throw new Error("User not found");
  }

  try {
    let resume;

    if (resumeId) {
      console.log(`🔄 [DB] Updating existing resume ${resumeId} for user ${user.id}...`);
      console.log(`📝 Mode: ${mode}, Name: ${name}`);

      // Update existing resume
      resume = await db.resume.update({
        where: {
          id: resumeId,
          userId: user.id,
        },
        data: {
          content,
          name,
          mode,
          status: "saved",
        },
      });

      console.log(`✅ [DB] Resume ${resumeId} updated successfully`);

      // Update user analytics
      await db.user.update({
        where: { id: user.id },
        data: {
          totalResumesSaved: {
            increment: 1,
          },
        },
      });

      console.log(`📊 [DB] User analytics updated - totalResumesSaved incremented`);
    } else {
      console.log(`🔄 [DB] Creating new resume for user ${user.id}...`);
      console.log(`📝 Mode: ${mode}, Name: ${name}`);

      // Create new resume
      resume = await db.resume.create({
        data: {
          userId: user.id,
          content,
          name,
          mode,
          status: "saved",
        },
      });

      console.log(`✅ [DB] New resume created with ID: ${resume.id}`);

      // Update user analytics
      await db.user.update({
        where: { id: user.id },
        data: {
          totalResumesCreated: {
            increment: 1,
          },
          totalResumesSaved: {
            increment: 1,
          },
        },
      });

      console.log(`📊 [DB] User analytics updated - totalResumesCreated and totalResumesSaved incremented`);
    }

    // Verify resume was actually created/updated
    if (!resume) {
      throw new Error("Failed to create or update resume record");
    }

    // Update gamification for resume creation
    // Only award points if it's a new resume or significant update
    // For now, we'll keep the existing logic but ensure it doesn't fail the whole request
    let gamification = null;
    try {
      gamification = await updateGamification(user.id, "resume_created");
    } catch (gError) {
      console.warn("⚠️ [Action] Gamification update failed:", gError.message);
      // Don't fail the request, just continue
    }

    revalidatePath("/resume");
    revalidatePath("/dashboard");

    console.log(`✅ [Action] Resume saved successfully - ID: ${resume.id}, Mode: ${mode}`);

    return {
      success: true,
      resume,
      gamification
    };
  } catch (error) {
    console.error("❌ [Action] Error saving resume:", error);
    // Return error object instead of throwing to handle it gracefully in UI
    return {
      success: false,
      error: error.message || "Failed to save resume"
    };
  }
}

export async function getResume(resumeId = null) {
  const firebaseUser = await getFirebaseUser();
  if (!firebaseUser) throw new Error("Unauthorized");
  const userId = firebaseUser.uid;

  const user = await db.user.findUnique({
    where: { uid: userId },
  });

  if (!user) throw new Error("User not found");

  if (resumeId) {
    return await db.resume.findUnique({
      where: {
        id: resumeId,
        userId: user.id,
      },
    });
  }

  // Get the most recent resume
  const resumes = await db.resume.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: 1,
  });

  return resumes[0] || null;
}

export async function getAllResumes() {
  const firebaseUser = await getFirebaseUser();
  if (!firebaseUser) throw new Error("Unauthorized");
  const userId = firebaseUser.uid;

  const user = await db.user.findUnique({
    where: { uid: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.resume.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
}

export async function improveWithAI({ current, type }) {
  const firebaseUser = await getFirebaseUser();
  if (!firebaseUser) throw new Error("Unauthorized");
  const userId = firebaseUser.uid;

  const user = await db.user.findUnique({
    where: { uid: userId },
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

  const model = getGeminiModel();
  if (!model) throw new Error("AI service unavailable (missing API key)");

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
  const firebaseUser = await getFirebaseUser();
  if (!firebaseUser) throw new Error("Unauthorized");
  const userId = firebaseUser.uid;

  const user = await db.user.findUnique({
    where: { uid: userId },
  });

  if (!user) throw new Error("User not found");

  let resumeText = "";
  try {
    if (typeof file === 'string') {
      resumeText = file;
    } else if (file instanceof File || (typeof file === 'object' && file.arrayBuffer)) {
      if (file.type === 'application/pdf') {
        const buffer = Buffer.from(await file.arrayBuffer());
        console.log(`[Action] ATS Checker: Parsing PDF, size: ${buffer.length} bytes`);
        const pdfModule = await import("pdf-parse");
        const pdfParse = pdfModule.default || pdfModule;
        const data = await pdfParse(buffer);
        resumeText = data.text;
        console.log(`[Action] ATS Checker: PDF parsed, length: ${resumeText?.length || 0}`);
      } else {
        resumeText = await file.text();
      }
    } else {
      throw new Error("Invalid input format");
    }
  } catch (error) {
    console.error("Error reading resume text:", error);
    throw new Error("Failed to read resume content");
  }

  if (!resumeText || resumeText.trim().length === 0) {
    throw new Error("Resume content is empty");
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

  const model = getGeminiModel();
  if (!model) throw new Error("AI service unavailable (missing API key)");

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

    // Note: We are not saving to DB here as this is a quick check from the builder.
    // For full analysis and history, use the main ATS Analyzer.

    return {
      success: true,
      atsScore,
      feedback,
      analysisId: null
    };
  } catch (error) {
    console.error("ATS Checker error:", error);
    return {
      success: false,
      error: error.message || "Failed to analyze resume"
    };
  }
}

