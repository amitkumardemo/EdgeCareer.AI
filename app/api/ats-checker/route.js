import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { getFirebaseUser } from "@/lib/auth-utils";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { checkUser } from "@/lib/checkUser";

export const runtime = "nodejs"; // ✅ Prevents Edge runtime errors

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(request) {
  try {
    const firebaseUser = await getFirebaseUser();
    if (!firebaseUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await checkUser();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

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
        analysis = JSON.parse(responseText.replace(/```json|```/g, ""));
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
    const existingResume = await db.resume.findFirst({
      where: { userId: user.id },
    });

    if (existingResume) {
      await db.resume.update({
        where: { id: existingResume.id },
        data: {
          atsScore: analysis.score,
          feedback: analysis.feedback,
          content: resumeText,
        },
      });
    } else {
      await db.resume.create({
        data: {
          userId: user.id,
          atsScore: analysis.score,
          feedback: analysis.feedback,
          content: resumeText,
          name: "ATS Analysis Resume",
        },
      });
    }

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
