import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs"; // ✅ Prevents Edge runtime errors

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

    // Parse PDF with fallback
    let resumeText = "";
    let analysis;
    
    // Define these outside try-catch so they're accessible later
    const keywords = ['experience', 'skills', 'education', 'projects', 'certifications', 'contact', 'summary', 'objective'];
    const industryKeywords = ['javascript', 'python', 'java', 'react', 'node', 'sql', 'aws', 'docker', 'git', 'agile'];
    const formattingIssues = ['table', 'image', 'graphic', 'column'];
    
    let foundKeywords = [];
    let foundIndustryKeywords = [];
    let foundFormattingIssues = [];
    let feedback = "";

    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const pdfParse = (await import('pdf-parse')).default;
      const data = await pdfParse(buffer);
      resumeText = data.text;

      // Advanced analysis based on multiple factors
      let score = 40; // base score
      foundKeywords = keywords.filter(k => resumeText.toLowerCase().includes(k));
      foundIndustryKeywords = industryKeywords.filter(k => resumeText.toLowerCase().includes(k));
      foundFormattingIssues = formattingIssues.filter(k => resumeText.toLowerCase().includes(k));

      // Score calculation
      score += foundKeywords.length * 8; // +8 per standard section
      score += foundIndustryKeywords.length * 3; // +3 per industry keyword
      score += Math.min(resumeText.length / 200, 25); // + up to 25 based on length
      score -= foundFormattingIssues.length * 10; // -10 per formatting issue
      score = Math.min(Math.max(score, 0), 100); // clamp to 0-100

      // Generate detailed feedback
      feedback = "";
      if (foundKeywords.length < 3) {
        feedback += "Missing key sections: Add Experience, Skills, and Education sections.\n";
      }
      if (foundIndustryKeywords.length < 2) {
        feedback += "Limited technical keywords: Include more relevant skills and technologies.\n";
      }
      if (resumeText.length < 500) {
        feedback += "Resume too short: Expand on your experience and achievements.\n";
      }
      if (foundFormattingIssues.length > 0) {
        feedback += "Formatting issues detected: Avoid tables and complex layouts.\n";
      }
      if (feedback === "") {
        feedback = "Good foundation! Focus on tailoring keywords to specific job descriptions.";
      }

      analysis = {
        score: Math.round(score),
        feedback: feedback.trim()
      };
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

      feedback = "PDF parsing encountered an issue. Estimated score based on file analysis. For best results, ensure your PDF contains selectable text and standard formatting. Key improvements: Use Arial/Calibri fonts, include clear section headings (Experience, Skills, Education), and avoid complex layouts or images.";
      
      analysis = {
        score: Math.max(60, Math.min(85, fallbackScore)),
        feedback: feedback
      };
    }

    // Calculate detailed scores
    const keywordMatchScore = Math.min((foundKeywords.length / keywords.length) * 100, 100);
    const skillsScore = Math.min((foundIndustryKeywords.length / 5) * 100, 100);
    const formattingScore = Math.max(100 - (foundFormattingIssues.length * 15), 0);
    const experienceScore = Math.min((resumeText.length / 1500) * 100, 100);
    const projectScore = resumeText.toLowerCase().includes('project') ? 85 : 60;
    const atsCompatibleScore = formattingScore;

    // Generate suggestions
    const suggestions = [];
    if (foundKeywords.length < 3) suggestions.push("Add more standard resume sections");
    if (foundIndustryKeywords.length < 3) suggestions.push("Include more technical keywords");
    if (resumeText.length < 800) suggestions.push("Expand your experience descriptions");
    if (foundFormattingIssues.length > 0) suggestions.push("Remove tables and complex formatting");

    // Identify strengths and weaknesses
    const strengths = [];
    const weaknesses = [];
    if (keywordMatchScore >= 70) strengths.push("Good section structure");
    else weaknesses.push("Missing key sections");
    if (skillsScore >= 70) strengths.push("Strong technical keywords");
    else weaknesses.push("Limited technical skills mentioned");
    if (formattingScore >= 80) strengths.push("Clean formatting");
    else weaknesses.push("Formatting issues detected");

    // Save detailed analysis to database
    const { createATSAnalysis } = await import('@/actions/ats');
    await createATSAnalysis({
      resumeFileName: file.name,
      atsScore: analysis.score,
      keywordMatchScore,
      skillsScore,
      formattingScore,
      experienceScore,
      projectScore,
      atsCompatibleScore,
      matchedKeywords: foundKeywords,
      missingKeywords: keywords.filter(k => !foundKeywords.includes(k)),
      suggestions,
      strengths,
      weaknesses,
      improvementTip: feedback,
    });

    return NextResponse.json({
      atsScore: analysis.score,
      feedback: analysis.feedback,
      detailedScores: {
        keywordMatchScore,
        skillsScore,
        formattingScore,
        experienceScore,
        projectScore,
        atsCompatibleScore,
      },
      matchedKeywords: foundKeywords,
      missingKeywords: keywords.filter(k => !foundKeywords.includes(k)),
      suggestions,
      strengths,
      weaknesses,
    });
  } catch (err) {
    console.error("❌ ATS Checker Error:", err);
    // Return a more user-friendly error message
    return NextResponse.json(
      { error: "Failed to analyze resume. Please try again." },
      { status: 500 }
    );
  }
}
