import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(request) {
  try {
    const { postType, tone } = await request.json();

    if (!postType || !tone) {
      return NextResponse.json({ error: "Post type and tone are required" }, { status: 400 });
    }

    const prompt = `
      Generate a professional LinkedIn post for a student/early-career professional.

      Post Type: "${postType}"
      Tone: "${tone}"

      Please provide the post content in the following JSON format:
      {
        "post": "The full LinkedIn post content with emojis and formatting",
        "hashtags": "#hashtag1 #hashtag2 #hashtag3 #hashtag4 #hashtag5"
      }

      Guidelines:
      - Keep post under 200 words
      - Include relevant emojis
      - Make it engaging and professional
      - Add call-to-action when appropriate
      - Use line breaks for readability
      - Include 5 relevant hashtags
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
        post: `🚀 Excited to share my latest ${postType}!\n\nJust completed an amazing project that challenged me to grow and learn new skills. The ${tone} approach helped me deliver exceptional results.\n\nWhat are you working on today? Let's connect and share our experiences!\n\n#Tech #Learning #Growth #ProfessionalDevelopment #Innovation`,
        hashtags: "#LinkedIn #CareerGrowth #Technology #Professional #Networking"
      });
    }

  } catch (error) {
    console.error("LinkedIn Post Generator error:", error);
    return NextResponse.json(
      { error: "Failed to generate LinkedIn post" },
      { status: 500 }
    );
  }
}
