import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs"; // ✅ Prevents Edge runtime errors

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.upsert({
      where: { clerkUserId: userId },
      update: {},
      create: { clerkUserId: userId },
    });

    const formData = await request.formData();
    const file = formData.get("resume");
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Parse PDF with fallback
    let resumeText = "";
    let analysis;

    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const pdfParse = (await import('pdf-parse')).default;
      const data = await pdfParse(buffer);
      resumeText = data.text;

      const prompt = `
        Analyze the following resume for ATS (Applicant Tracking System) compatibility.

        Resume Text:
        ${resumeText}

        Return only valid JSON in this format:
        {
          "score": number between 0 and 100,
          "feedback": "detailed feedback on improving ATS score"
        }
      `;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text().trim();

      // Parse JSON safely
      try {
        analysis = JSON.parse(responseText);
      } catch {
        // Fallback if Gemini returns non-JSON text
        const scoreMatch = responseText.match(/(\d{1,3})/);
        analysis = {
          score: scoreMatch ? parseInt(scoreMatch[1]) : 70,
          feedback: responseText.replace(/[^a-zA-Z0-9 .,]/g, "").slice(0, 500),
        };
      }
    } catch (pdfError) {
      console.error("PDF parsing failed:", pdfError);
      // Dynamic fallback based on file size and name
      const fileSize = file.size;
      const fileName = file.name.toLowerCase();
      let fallbackScore = 75;

      // Adjust score based on file characteristics
      if (fileSize < 50000) fallbackScore -= 10; // Small files might be too simple
      if (fileSize > 2000000) fallbackScore -= 15; // Large files might have formatting issues
      if (fileName.includes('resume') || fileName.includes('cv')) fallbackScore += 5;

      analysis = {
        score: Math.max(60, Math.min(85, fallbackScore)),
        feedback: "PDF parsing encountered an issue. Estimated score based on file analysis. For best results, ensure your PDF contains selectable text and standard formatting. Key improvements: Use Arial/Calibri fonts, include clear section headings (Experience, Skills, Education), and avoid complex layouts or images."
      };
    }

    // Save in DB
    await db.resume.upsert({
      where: { userId: user.id },
      update: {
        atsScore: analysis.score,
        feedback: analysis.feedback,
        content: resumeText,
      },
      create: {
        userId: user.id,
        atsScore: analysis.score,
        feedback: analysis.feedback,
        content: resumeText,
      },
    });

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
