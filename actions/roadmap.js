"use server";

import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { updateGamification } from "./gamification";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

/**
 * Fetch YouTube video link for a given query using YouTube Data API v3
 */
async function fetchYouTubeVideoLink(query) {
  if (!YOUTUBE_API_KEY) {
    console.warn("YouTube API key not set in environment variables.");
    return null;
  }

  const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(
    query
  )}&key=${YOUTUBE_API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error("YouTube API error:", response.statusText);
      return null;
    }
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      // Iterate over results to find the first available video link
      for (const item of data.items) {
        if (item.id && item.id.videoId) {
          // Optionally, could add validation here to check video availability
          return `https://www.youtube.com/watch?v=${item.id.videoId}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Error fetching YouTube video link:", error);
    return null;
  }
}

/**
 * Generate a learning roadmap for the logged-in user with real YouTube video links
 */
export async function generateRoadmap(currentSkills, targetRole, timeFrame) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const prompt = `
    Generate a detailed learning roadmap for someone aiming to become a ${targetRole}.
    Current skills: ${currentSkills || "beginner level"}.
    Time frame: ${timeFrame || "6 months"}.

    Create a step-by-step roadmap with milestones, resources, and estimated time for each step. For each step, provide a videoLink to a real, high-quality YouTube tutorial video that covers the main topic of this step. Make sure the link is to an actual YouTube video tutorial, not a made-up link.
    Also, include self-growth content at the end with tips on how to complete the roadmap and stay motivated.

    Return only valid JSON in this format, no markdown, no additional text. Start with {:
    {
      "roadmap": {
        "title": "Roadmap to ${targetRole}",
        "steps": [
          {
            "title": "string",
            "description": "string",
            "duration": "string (e.g., 2 weeks)",
            "prerequisites": ["string"],
            "resources": ["string"],
            "videoLink": "string - YouTube or other video tutorial link for this step"
          }
        ],
        "selfGrowthTips": {
          "howToComplete": "string - detailed tips on completing the roadmap",
          "motivationTips": "string - tips to stay motivated throughout the journey"
        }
      }
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    const roadmapData = JSON.parse(cleanedText);

    // For each step, fetch actual YouTube video link using YouTube API
    const stepsWithVideos = await Promise.all(
      roadmapData.roadmap.steps.map(async (step) => {
        const videoLink = await fetchYouTubeVideoLink(step.title);
        return {
          ...step,
          videoLink: videoLink || step.videoLink || null,
        };
      })
    );

    roadmapData.roadmap.steps = stepsWithVideos;

    // Update gamification
    const gamification = await updateGamification('roadmap_generated');

    return { roadmap: roadmapData.roadmap, gamification };
  } catch (error) {
    console.error("Error generating roadmap:", error);
    throw new Error("Failed to generate roadmap");
  }
}
