import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(request) {
  try {
    const { resumeText, targetRole } = await request.json();

    if (!resumeText || !targetRole) {
      return NextResponse.json({ error: "Resume text and target role are required" }, { status: 400 });
    }

    const prompt = `
      Analyze the resume content and provide career branding fixes for a ${targetRole} position.

      Resume Content: "${resumeText}"
      Target Role: "${targetRole}"

      Please provide analysis in the following JSON format:
      {
        "brandingMismatch": "Description of current branding issues",
        "correctPositioning": "How to correctly position for ${targetRole}",
        "optimizedSummary": "Optimized professional summary"
      }

      Focus on:
      1. Identifying weak or inconsistent branding
      2. Suggesting stronger positioning
      3. Providing an optimized summary that highlights relevant skills
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const aiResponse = response.text().trim();

    let jsonResponse = aiResponse;
    if (aiResponse.startsWith('```json')) {
      jsonResponse = aiResponse.replace(/```json\s*/, '').replace(/\s*```$/, '');
    } else if (aiResponse.startsWith('```')) {
      jsonResponse = aiResponse.replace(/```\s*/, '').replace(/\s*```$/, '');
    }

    try {
      const parsed = JSON.parse(jsonResponse);
      return NextResponse.json(parsed);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return NextResponse.json({
        brandingMismatch: "Current resume lacks clear positioning and quantifiable achievements for " + targetRole + " roles.",
        correctPositioning: "Position yourself as a skilled " + targetRole + " with demonstrated technical expertise and problem-solving abilities.",
        optimizedSummary: "Results-driven " + targetRole + " with experience in developing scalable solutions. Proven track record of delivering high-quality code and collaborating effectively in team environments. Passionate about leveraging technology to solve complex problems."
      });
    }

  } catch (error) {
    console.error("Career Branding Fixer error:", error);
    return NextResponse.json(
      { error: "Failed to analyze career branding" },
      { status: 500 }
    );
  }
}
