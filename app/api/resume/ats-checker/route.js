import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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

    // Analyze with AI using a different approach
    const prompt = `
      Analyze the following resume for ATS (Applicant Tracking System) compatibility.

      Resume text:
      ${resumeText}

      Provide your analysis in exactly this format:
      SCORE: [number between 0-100]
      FEEDBACK: [detailed feedback text]

      Do not include any other text or formatting.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const analysisText = response.text().trim();

    // Parse the response
    let analysis;
    try {
      const scoreMatch = analysisText.match(/SCORE:\s*(\d+(?:\.\d+)?)/i);
      const feedbackMatch = analysisText.match(/FEEDBACK:\s*(.+)/is);

      const atsScore = scoreMatch ? Math.min(100, Math.max(0, parseFloat(scoreMatch[1]))) : 70;
      const feedback = feedbackMatch ? feedbackMatch[1].trim() : "Please review your resume for better ATS compatibility.";

      analysis = { atsScore, feedback };
    } catch (e) {
      // Fallback if parsing fails
      analysis = {
        atsScore: 70,
        feedback: "Unable to analyze resume. Please ensure your resume is in a readable format."
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
