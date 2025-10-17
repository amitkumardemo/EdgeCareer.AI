

import { GoogleGenerativeAI } from "@google/generative-ai";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const HUGGINGFACE_TOKEN = process.env.HUGGINGFACE_TOKEN;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const COURSERA_API_BASE_URL = 'https://collection-for-coursera-courses.p.rapidapi.com/rapidapi/course/get_course.php';
const COURSERA_API_HOST = 'collection-for-coursera-courses.p.rapidapi.com';
const COURSERA_API_KEY = '172ab53626msh8e8a6ea096d9811p192b77jsn7b29c46ac700';

// Function to fetch courses from Coursera
export async function fetchCoursesFromCoursera(query) {
  const url = `${COURSERA_API_BASE_URL}?query=${encodeURIComponent(query)}&num=10`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': COURSERA_API_KEY,
        'X-RapidAPI-Host': COURSERA_API_HOST,
      },
    });

    if (!response.ok) {
      throw new Error(`Coursera API error: ${response.statusText}`);
    }

    const data = await response.json();
    if (data && Array.isArray(data)) {
      return data.map(course => ({
        course_title: course.title || 'Unknown Title',
        platform: 'Coursera',
        rating: course.rating || 'N/A',
        duration: course.duration || 'N/A',
        url: course.url || `https://www.coursera.org/search?query=${encodeURIComponent(query)}`,
        thumbnail: course.thumbnail || 'https://via.placeholder.com/320x180?text=Coursera+Course',
        description: course.description || 'No description available.',
        reason: `Recommended certification course for ${query}.`,
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching courses from Coursera:", error);
    // Return mock data for testing
    return [
      {
        course_title: "Machine Learning Certification",
        platform: "Coursera",
        rating: "4.8",
        duration: "10 weeks",
        url: "https://www.coursera.org/learn/machine-learning",
        thumbnail: "https://via.placeholder.com/320x180?text=Machine+Learning",
        description: "Complete machine learning certification covering all essential concepts from basics to advanced topics.",
        reason: "Recommended certification course for machine learning.",
      },
      {
        course_title: "Data Science Specialization",
        platform: "Coursera",
        rating: "4.5",
        duration: "8 months",
        url: "https://www.coursera.org/specializations/jhu-data-science",
        thumbnail: "https://via.placeholder.com/320x180?text=Data+Science",
        description: "Learn data science from scratch with practical examples and real-world projects.",
        reason: "Recommended certification course for data science.",
      },
    ];
  }
}

// Main function to recommend courses
export async function recommendCourses(userSkills, careerGoal) {
  const query = careerGoal ? careerGoal : userSkills;
  const courses = await fetchCoursesFromCoursera(query);

  if (courses.length === 0) {
    return [];
  }

  // Return top 5-10 courses, with the first one as best
  const recommendations = courses.slice(0, 9).map(course => ({
    course_title: course.course_title,
    platform: course.platform,
    rating: course.rating,
    duration: course.duration,
    url: course.url,
    thumbnail: course.thumbnail,
    description: course.description,
    reason: course.reason,
  }));

  // Add best recommendation at the end
  const best = courses[0];
  recommendations.push({
    course_title: best.course_title,
    platform: best.platform,
    rating: best.rating,
    duration: best.duration,
    url: best.url,
    thumbnail: best.thumbnail,
    description: best.description,
    reason: `Best certification course for ${query}.`,
  });

  return recommendations;
}
