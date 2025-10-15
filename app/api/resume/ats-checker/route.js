import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs"; // ✅ Prevents Edge runtime errors

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(request) {
  try {
    // Temporarily disable auth for testing
    // const { userId } = await auth();
    // if (!userId) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    // const user = await db.user.upsert({
    //   where: { clerkUserId: userId },
    //   update: {},
    //   create: { clerkUserId: userId },
    // });

    const formData = await request.formData();
    const file = formData.get("resume");
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // For now, return mock data since PDF parsing is complex
    const resumeText = "Sample resume text for testing";
    const analysis = {
      score: 85,
      feedback: "Your resume has good ATS compatibility. Consider adding more keywords from the job description."
    };

    // Save in DB - temporarily disabled
    // await db.resume.upsert({
    //   where: { userId: user.id },
    //   update: {
    //     atsScore: analysis.score,
    //     feedback: analysis.feedback,
    //     content: resumeText,
    //   },
    //   create: {
    //     userId: user.id,
    //     atsScore: analysis.score,
    //     feedback: analysis.feedback,
    //     content: resumeText,
    //   },
    // });

    return NextResponse.json({
      atsScore: analysis.score,
      feedback: analysis.feedback,
    });
  } catch (err) {
    console.error("❌ ATS Checker Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error", details: err.message },
      { status: 500 }
    );
  }
}
