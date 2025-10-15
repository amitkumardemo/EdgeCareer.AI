import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(request) {
  try {
    const { jobTitle, currentSkills, currentExperience } = await request.json();

    if (!jobTitle) {
      return NextResponse.json({ error: "Job title is required" }, { status: 400 });
    }

    const prompt = `
      As an expert career counselor and resume writer, analyze the following job title and provide tailored suggestions to improve the candidate's resume for better ATS compatibility and job matching.

      Job Title: "${jobTitle}"
      Current Skills: "${currentSkills || 'Not provided'}"
      Current Experience: "${Array.isArray(currentExperience) ? currentExperience.map(exp => `${exp.title} at ${exp.company} (${exp.duration})`).join(', ') : 'Not provided'}"

      Please provide suggestions in the following JSON format:
      {
        "suggestions": [
          {
            "title": "Suggestion title",
            "description": "Detailed explanation of the suggestion",
            "keywords": ["keyword1", "keyword2", "keyword3"],
            "priority": "high|medium|low"
          }
        ]
      }

      Focus on:
      1. Missing keywords that are commonly required for this role
      2. Skills gaps that should be addressed
      3. Experience improvements or rephrasing
      4. Certifications or qualifications that would strengthen the application
      5. Industry-specific terminology and buzzwords

      Provide 5-8 specific, actionable suggestions. Prioritize based on impact for ATS systems and recruiter appeal.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const aiResponse = response.text().trim();

    // Clean up the response to extract JSON
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
      // Fallback: try to extract JSON from the response
      const jsonMatch = jsonResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return NextResponse.json(parsed);
      }

      // If all parsing fails, return a basic structure
      return NextResponse.json({
        suggestions: [
          {
            title: "Add relevant keywords",
            description: `Include industry-standard keywords for ${jobTitle} roles such as technical skills, methodologies, and tools commonly used in this field.`,
            keywords: ["leadership", "communication", "problem-solving"],
            priority: "high"
          },
          {
            title: "Quantify achievements",
            description: "Replace generic descriptions with specific metrics and results to demonstrate impact.",
            keywords: ["improved", "increased", "reduced", "achieved"],
            priority: "high"
          }
        ]
      });
    }

  } catch (error) {
    console.error("AI Suggestions error:", error);
    return NextResponse.json(
      { error: "Failed to generate suggestions" },
      { status: 500 }
    );
  }
}
