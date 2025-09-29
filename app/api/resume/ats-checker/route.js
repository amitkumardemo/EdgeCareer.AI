import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const formData = await request.formData();
    const file = formData.get("resume");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Extract text from PDF
    const buffer = Buffer.from(await file.arrayBuffer());
    const { PdfReader } = await import("pdfreader");

    let resumeText = '';

    const reader = new PdfReader();

    await new Promise((resolve, reject) => {
      reader.parseBuffer(buffer, (err, item) => {
        if (err) reject(err);
        else if (!item) resolve();
        else if (item.text) {
          resumeText += item.text + ' ';
        }
      });
    });

    if (!resumeText || resumeText.trim().length === 0) {
      // Fallback: return mock data for testing
      resumeText = "Sample resume content for testing ATS analysis.";
    }

    // Use AI to analyze ATS score
    const prompt = `
      Analyze the following resume for ATS (Applicant Tracking System) compatibility.

      Resume content:
      ${resumeText}

      Provide an ATS score out of 100 and detailed feedback on improvements.

      Respond ONLY with a valid JSON object in this exact format:
      {"atsScore": 85, "feedback": "Your detailed feedback here..."}
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const aiResponse = response.text().trim();

    // Parse AI response (assuming it returns JSON)
    let atsScore, feedback;
    try {
      const parsed = JSON.parse(aiResponse);
      atsScore = parsed.atsScore;
      feedback = parsed.feedback;
    } catch (error) {
      // Fallback if AI doesn't return valid JSON
      atsScore = 70; // Default score
      feedback = "Unable to parse AI response. Please review your resume manually.";
    }

    // Update user's resume with ATS score and feedback
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
        content: resumeText, // Save extracted text as content
        atsScore,
        feedback,
      },
    });

    return NextResponse.json({ atsScore, feedback });
  } catch (error) {
    console.error("ATS Checker error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
