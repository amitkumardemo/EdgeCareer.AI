import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(request) {
  try {
    const { linkedinUrl, targetRole } = await request.json();

    if (!targetRole) {
      return NextResponse.json({ error: "Target role is required" }, { status: 400 });
    }

    const prompt = `
      As a LinkedIn optimization expert, generate optimized content for a LinkedIn profile targeting ${targetRole} roles.

      LinkedIn Profile URL: "${linkedinUrl || 'Not provided'}"
      Target Role: "${targetRole}"

      Please provide optimization suggestions in the following JSON format:
      {
        "headline": "Professional headline optimized for recruiters and ATS",
        "about": "Compelling About section with keywords and storytelling",
        "experience": "ATS-friendly experience bullet points with quantifiable achievements"
      }

      Focus on:
      1. Industry-specific keywords for ${targetRole}
      2. Quantifiable achievements and metrics
      3. Professional storytelling
      4. ATS optimization
      5. Recruiter-friendly language
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
        headline: `Aspiring ${targetRole} | Student | Tech Enthusiast`,
        about: `Passionate ${targetRole} with experience in modern technologies. Skilled in problem-solving and collaborative development. Seeking opportunities to contribute to innovative projects.`,
        experience: `• Developed applications using industry-standard technologies\n• Collaborated on team projects demonstrating strong communication skills\n• Continuously learning and adapting to new technologies`
      });
    }

  } catch (error) {
    console.error("LinkedIn Enhancer error:", error);
    return NextResponse.json(
      { error: "Failed to generate LinkedIn optimization" },
      { status: 500 }
    );
  }
}
