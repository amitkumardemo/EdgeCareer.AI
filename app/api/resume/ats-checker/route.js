import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";
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
    const buffer = await file.arrayBuffer();
    const data = await pdfParse(Buffer.from(buffer));
    const resumeText = data.text;

    // Analyze with AI
    const prompt = `
      Analyze the following resume for ATS (Applicant Tracking System) compatibility. Provide:
      1. An ATS score out of 100 (based on keyword optimization, format, structure, etc.)
      2. Detailed feedback on what to improve to increase the ATS score.

      Resume text:
      ${resumeText}

      Respond in JSON format: { "atsScore": number, "feedback": "string" }
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const analysisText = response.text().trim();

    // Parse the JSON response
    let analysis;
    try {
      analysis = JSON.parse(analysisText);
    } catch (e) {
      // If not JSON, extract score and feedback manually
      const scoreMatch = analysisText.match(/atsScore["\s:]*(\d+)/i);
      const feedbackMatch = analysisText.match(/feedback["\s:]*["']([^"']+)["']/i);
      analysis = {
        atsScore: scoreMatch ? parseFloat(scoreMatch[1]) : 50,
        feedback: feedbackMatch ? feedbackMatch[1] : "Unable to parse feedback.",
      };
    }

    // Save to DB
    await db.resume.upsert({
      where: { userId: user.id },
      update: {
        atsScore: analysis.atsScore,
        feedback: analysis.feedback,
      },
      create: {
        userId: user.id,
        content: resumeText, // Save the text as content
        atsScore: analysis.atsScore,
        feedback: analysis.feedback,
      },
    });

    return NextResponse.json({
      atsScore: analysis.atsScore,
      feedback: analysis.feedback,
    });
  } catch (error) {
    console.error("Error in ATS checker:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
