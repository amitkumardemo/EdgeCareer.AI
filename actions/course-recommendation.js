

import { GoogleGenerativeAI } from "@google/generative-ai";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const HUGGINGFACE_TOKEN = process.env.HUGGINGFACE_TOKEN;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// Function to fetch courses from YouTube
export async function fetchCoursesFromYouTube(query) {
  if (!YOUTUBE_API_KEY) {
    throw new Error("YouTube API key not set in environment variables.");
  }

  const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video,playlist&order=relevance&maxResults=20&key=${YOUTUBE_API_KEY}`;
  try {
    const searchResponse = await fetch(searchUrl);
    if (!searchResponse.ok) {
      throw new Error(`YouTube search error: ${searchResponse.statusText}`);
    }
    const searchData = await searchResponse.json();

    // Get video details for duration and statistics
    const videoIds = searchData.items.map(item => item.id.videoId).join(',');
    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`;
    const detailsResponse = await fetch(detailsUrl);
    const detailsData = await detailsResponse.json();

    const courses = searchData.items.map((item, index) => {
      const isPlaylist = item.id.kind === 'youtube#playlist';
      const details = !isPlaylist ? detailsData.items[index] : null;
      return {
        course_title: item.snippet.title,
        platform: "YouTube",
        rating: details ? details.statistics.likeCount / (details.statistics.likeCount + details.statistics.dislikeCount || 1) * 5 : "N/A",
        duration: isPlaylist ? "Playlist" : (details ? parseDuration(details.contentDetails.duration) : "N/A"),
        url: isPlaylist ? `https://www.youtube.com/playlist?list=${item.id.playlistId}` : `https://www.youtube.com/watch?v=${item.id.videoId}`,
        topics: [query], // Simplified
        description: item.snippet.description,
        channelTitle: item.snippet.channelTitle,
        viewCount: details ? details.statistics.viewCount : 0,
        type: isPlaylist ? 'playlist' : 'video',
      };
    });

    return courses;
  } catch (error) {
    console.error("Error fetching courses from YouTube:", error);
    // Return mock data for testing
    return [
      {
        course_title: "Machine Learning Full Course",
        platform: "YouTube",
        rating: "4.8",
        duration: "10 hours",
        url: "https://www.youtube.com/watch?v=example1",
        topics: ["Machine Learning", "AI", "Python"],
        description: "Complete machine learning course",
        channelTitle: "Example Channel",
        viewCount: 1000000,
      },
      {
        course_title: "Data Science Tutorial",
        platform: "YouTube",
        rating: "4.5",
        duration: "8 hours",
        url: "https://www.youtube.com/watch?v=example2",
        topics: ["Data Science", "Python", "Pandas"],
        description: "Learn data science from scratch",
        channelTitle: "Data Science Hub",
        viewCount: 500000,
      },
    ];
  }
}

// Helper function to parse YouTube duration
function parseDuration(duration) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = (parseInt(match[1]) || 0);
  const minutes = (parseInt(match[2]) || 0);
  const seconds = (parseInt(match[3]) || 0);
  return `${hours ? hours + 'h ' : ''}${minutes}m ${seconds}s`;
}

// Function to get embeddings from HuggingFace API
async function getEmbedding(text) {
  if (!HUGGINGFACE_TOKEN) {
    throw new Error("HuggingFace token not set in environment variables.");
  }
  const apiUrl = "https://api-inference.huggingface.co/embeddings/sentence-transformers/all-MiniLM-L6-v2";
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HUGGINGFACE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: text }),
    });
    if (!response.ok) {
      throw new Error(`HuggingFace API error: ${response.statusText}`);
    }
    const data = await response.json();
    return data.embedding;
  } catch (error) {
    console.error("Error fetching embedding:", error);
    throw error;
  }
}

// Function to compute cosine similarity between two vectors
function cosineSimilarity(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Main function to recommend courses
export async function recommendCourses(userSkills, careerGoal) {
  const query = `best ${userSkills} courses tutorial playlist`;
  const courses = await fetchCoursesFromYouTube(query);

  // Use AI to select and compare top courses
  const coursesText = courses.map((course, index) => 
    `${index + 1}. Title: ${course.course_title}\n   Channel: ${course.channelTitle}\n   Duration: ${course.duration}\n   Views: ${course.viewCount}\n   Description: ${course.description.substring(0, 200)}...`
  ).join('\n\n');

  const prompt = `
    Based on the user's skills: "${userSkills}" and career goal: "${careerGoal || 'General improvement'}", analyze the following YouTube courses and recommend the top 5-10 most suitable ones, including playlists and long videos.

    Courses:
    ${coursesText}

    Provide a JSON object with:
    - recommendations: array of top 5-10 courses, each with course_title, platform, rating, duration, url, reason
    - bestRecommendation: the single best course with course_title, platform, rating, duration, url, reason (why it's the best overall)

    Focus on comprehensive courses from reputable channels. Compare them in terms of depth, popularity, and suitability. Prefer playlists for thorough learning.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const analysisText = response.text().trim();

    // Parse the JSON response
    let data;
    try {
      data = JSON.parse(analysisText);
      const recommendations = data.recommendations || [];
      const best = data.bestRecommendation;
      if (best) {
        recommendations.push(best); // Add best at the end
      }
      return recommendations;
    } catch (e) {
      // If not JSON, extract manually or return top courses
      const recommendations = courses.slice(0, 5).map(course => ({
        course_title: course.course_title,
        platform: course.platform,
        rating: course.rating,
        duration: course.duration,
        url: course.url,
        reason: `Recommended based on relevance to ${userSkills}.`,
      }));
      // Add a best one
      const best = courses[0];
      recommendations.push({
        course_title: best.course_title,
        platform: best.platform,
        rating: best.rating,
        duration: best.duration,
        url: best.url,
        reason: `Best overall recommendation for ${userSkills}.`,
      });
      return recommendations;
    }
  } catch (error) {
    console.error("Error generating recommendations:", error);
    // Fallback to top courses
    return courses.slice(0, 5).map(course => ({
      course_title: course.course_title,
      platform: course.platform,
      rating: course.rating,
      duration: course.duration,
      url: course.url,
      reason: `Fallback recommendation for ${userSkills}.`,
    }));
  }
}
