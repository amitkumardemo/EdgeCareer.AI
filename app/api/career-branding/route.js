import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(request) {
  try {
    const { linkedinUrl, githubUrl, resumeText, targetRole } = await request.json();

    if (!targetRole) {
      return NextResponse.json({ error: "Target role is required" }, { status: 400 });
    }

    const prompt = `
      As an expert career branding consultant and recruiter, analyze the following profile information for a student targeting ${targetRole} roles. Provide a comprehensive career brand assessment and optimization suggestions.

      LinkedIn Profile: "${linkedinUrl || 'Not provided'}"
      GitHub Profile: "${githubUrl || 'Not provided'}"
      Resume Content: "${resumeText || 'Not provided'}"
      Target Role: "${targetRole}"

      Please provide analysis in the following JSON format:
      {
        "score": 75,
        "strengths": ["Strength 1", "Strength 2", "Strength 3"],
        "weaknesses": ["Weakness 1", "Weakness 2"],
        "missingSignals": ["Missing signal 1", "Missing signal 2"],
        "linkedinOptimization": {
          "headline": "Optimized LinkedIn headline",
          "about": "Optimized About section content",
          "experience": "Optimized experience bullet points"
        },
        "githubOptimization": {
          "bio": "Optimized GitHub bio",
          "readme": "Sample README improvement",
          "projectDescriptions": "Improved project descriptions"
        },
        "projectBranding": {
          "resumeBullets": "Resume bullet points for projects",
          "recruiterSummary": "Recruiter-friendly project summary"
        }
      }

      Scoring Guidelines (0-100):
      - 90-100: Exceptional profile, ready for top companies
      - 80-89: Strong profile with minor improvements needed
      - 70-79: Good profile, needs optimization
      - 60-69: Average profile, significant improvements needed
      - Below 60: Weak profile, major overhaul required

      Focus on:
      1. Keyword optimization for ATS and recruiters
      2. Quantifiable achievements and impact
      3. Industry-specific terminology
      4. Professional storytelling
      5. Visual presentation and branding
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
      console.error("JSON parse error:", parseError);
      // Fallback response
      return NextResponse.json({
        score: 65,
        strengths: ["Good educational background", "Some relevant projects"],
        weaknesses: ["Lack of quantifiable achievements", "Weak keyword usage"],
        missingSignals: ["Industry certifications", "Professional network"],
        linkedinOptimization: {
          headline: "Aspiring " + targetRole + " | Student | Tech Enthusiast",
          about: "Passionate about technology and problem-solving...",
          experience: "• Developed web applications using React and Node.js\n• Collaborated on team projects..."
        },
        githubOptimization: {
          bio: "Building innovative solutions | " + targetRole + " enthusiast",
          readme: "# Project Title\n\n## Description\nA comprehensive project demonstrating...",
          projectDescriptions: "Enhanced project descriptions with technical details and impact metrics"
        },
        projectBranding: {
          resumeBullets: "• Built full-stack application serving 100+ users\n• Implemented CI/CD pipeline reducing deployment time by 50%",
          recruiterSummary: "Demonstrated strong technical skills and project management abilities"
        }
      });
    }

  } catch (error) {
    console.error("Career Branding error:", error);
    return NextResponse.json(
      { error: "Failed to analyze profile" },
      { status: 500 }
    );
  }
}
