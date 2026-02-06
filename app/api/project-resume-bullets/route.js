import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(request) {
  try {
    const { projectDescription, techStack } = await request.json();

    if (!projectDescription || !techStack) {
      return NextResponse.json({ error: "Project description and tech stack are required" }, { status: 400 });
    }

    const prompt = `
      Convert a project description into ATS-friendly resume bullet points.

      Project Description: "${projectDescription}"
      Tech Stack: "${techStack}"

      Please provide the bullet points in the following JSON format:
      {
        "bullets": "3-5 ATS-optimized bullet points, each starting with strong action verbs and including quantifiable achievements where possible"
      }

      Guidelines:
      - Start each bullet with strong action verbs (Developed, Implemented, Designed, etc.)
      - Include quantifiable metrics when possible
      - Use industry keywords from the tech stack
      - Focus on impact and results
      - Keep each bullet concise but descriptive
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
        bullets: `• Developed a full-stack application using ${techStack}, implementing user authentication and database integration\n• Designed and implemented responsive UI components, improving user experience and accessibility\n• Collaborated with team members to optimize application performance, reducing load times by 40%\n• Integrated third-party APIs to enhance functionality and provide real-time data updates\n• Applied best practices in code organization and documentation for maintainable codebase`
      });
    }

  } catch (error) {
    console.error("Project Resume Bullets error:", error);
    return NextResponse.json(
      { error: "Failed to generate resume bullets" },
      { status: 500 }
    );
  }
}
