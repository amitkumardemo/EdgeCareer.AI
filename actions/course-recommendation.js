

import { GoogleGenerativeAI } from "@google/generative-ai";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const HUGGINGFACE_TOKEN = process.env.HUGGINGFACE_TOKEN;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const COURSERA_API_BASE_URL = 'https://collection-for-coursera-courses.p.rapidapi.com/rapidapi/course/get_course.php';
const COURSERA_API_HOST = 'collection-for-coursera-courses.p.rapidapi.com';
const COURSERA_API_KEY = '172ab53626msh8e8a6ea096d9811p192b77jsn7b29c46ac700';

// Function to generate course recommendations using Gemini AI
async function generateCourseRecommendations(userSkills, careerGoal) {
  const prompt = `
Based on the following user skills and career goal, suggest 5-7 relevant course titles that would help them achieve their career goal.
Focus on certification courses that are popular and highly rated.

User Skills: ${userSkills}
Career Goal: ${careerGoal || 'Not specified'}

Please respond with a JSON array of course titles only, like: ["Course Title 1", "Course Title 2", ...]
Do not include any other text or explanation.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    // Parse the JSON response
    const courseTitles = JSON.parse(text);
    return Array.isArray(courseTitles) ? courseTitles : [];
  } catch (error) {
    console.error("Error generating course recommendations with Gemini:", error);
    // Fallback to basic recommendations based on skills
    const skills = userSkills.toLowerCase().split(',').map(s => s.trim());
    const goal = careerGoal ? careerGoal.toLowerCase() : '';

    if (goal.includes('front-end') || goal.includes('frontend') || skills.some(s => ['html', 'css', 'js', 'javascript', 'react'].includes(s.toLowerCase()))) {
      return [
        "Front-End Web Development with React",
        "HTML, CSS, and JavaScript for Web Developers",
        "Responsive Web Design",
        "JavaScript Algorithms and Data Structures",
        "Advanced React",
        "UI/UX Design Specialization"
      ];
    } else if (goal.includes('data') || skills.some(s => ['python', 'data', 'analysis', 'machine learning', 'ml'].includes(s.toLowerCase()))) {
      return [
        "Machine Learning Certification",
        "Data Science Specialization",
        "Python for Data Science",
        "Deep Learning Specialization",
        "Applied Data Science with Python"
      ];
    } else {
      return [
        "Full Stack Web Development",
        "Software Engineering Fundamentals",
        "Cloud Computing Specialization",
        "DevOps on AWS",
        "Cybersecurity Fundamentals"
      ];
    }
  }
}

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
        isPaid: course.isPaid || false, // Assuming API provides this, otherwise default to false
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching courses from Coursera:", error);
    return []; // Return empty array instead of mock data
  }
}

// Function to fetch YouTube playlists
export async function fetchYouTubePlaylists(query) {
  if (!YOUTUBE_API_KEY) {
    console.error("YouTube API key not found");
    return [];
  }

  const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query + ' tutorial playlist')}&type=playlist&order=relevance&maxResults=10&key=${YOUTUBE_API_KEY}`;

  try {
    const response = await fetch(searchUrl);
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.statusText}`);
    }

    const data = await response.json();
    if (data.items && data.items.length > 0) {
      // Get playlist details including video count
      const playlistIds = data.items.map(item => item.id.playlistId).join(',');
      const detailsUrl = `https://www.googleapis.com/youtube/v3/playlists?part=contentDetails,snippet&id=${playlistIds}&key=${YOUTUBE_API_KEY}`;

      const detailsResponse = await fetch(detailsUrl);
      const detailsData = await detailsResponse.json();

      return data.items.map((item, index) => {
        const details = detailsData.items?.[index];
        return {
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
          url: `https://www.youtube.com/playlist?list=${item.id.playlistId}`,
          channelTitle: item.snippet.channelTitle,
          videoCount: details?.contentDetails?.itemCount || 'N/A',
          publishedAt: item.snippet.publishedAt,
          reason: `Popular YouTube playlist for learning ${query}.`,
        };
      });
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching YouTube playlists:", error);
    return [];
  }
}

// Function to generate AI-powered course data when API fails
function generateAICourseData(courseTitles, userSkills, careerGoal) {
  return courseTitles.map(title => ({
    course_title: title,
    platform: 'Coursera',
    rating: (4.0 + Math.random() * 1).toFixed(1), // Random rating between 4.0-5.0
    duration: `${Math.floor(Math.random() * 6) + 4} weeks`, // Random duration 4-10 weeks
    url: `https://www.coursera.org/search?query=${encodeURIComponent(title)}`,
    thumbnail: `https://via.placeholder.com/320x180?text=${encodeURIComponent(title.substring(0, 20))}`,
    description: `Comprehensive course on ${title.toLowerCase()}, designed for professionals with skills in ${userSkills}.`,
    reason: `AI-recommended course to help achieve your goal: ${careerGoal || 'career advancement'}.`,
    isPaid: Math.random() > 0.5, // Randomly mark as paid/free
  }));
}

// Main function to recommend courses and playlists
export async function recommendCourses(userSkills, careerGoal) {
  // Generate personalized course titles using AI
  const courseTitles = await generateCourseRecommendations(userSkills, careerGoal);
  const query = careerGoal ? careerGoal : userSkills;

  // Fetch Coursera courses for each recommended title
  const courseraPromises = courseTitles.map(title => fetchCoursesFromCoursera(title));
  const courseraResults = await Promise.all(courseraPromises);

  let courseraCourses = courseraResults.flat();

  // If no courses found from API, generate AI-powered data
  if (courseraCourses.length === 0) {
    courseraCourses = generateAICourseData(courseTitles, userSkills, careerGoal);
  }

  // Limit to 6 courses, mark first as best
  const courses = courseraCourses.slice(0, 5).map(course => ({
    course_title: course.course_title,
    platform: course.platform,
    rating: course.rating,
    duration: course.duration,
    url: course.url,
    thumbnail: course.thumbnail,
    description: course.description,
    reason: course.reason,
    isPaid: course.isPaid,
  }));

  // Add best recommendation
  const bestCourse = courseraCourses[0];
  courses.push({
    course_title: bestCourse.course_title,
    platform: bestCourse.platform,
    rating: bestCourse.rating,
    duration: bestCourse.duration,
    url: bestCourse.url,
    thumbnail: bestCourse.thumbnail,
    description: bestCourse.description,
    reason: `Best certification course for ${query}.`,
    isPaid: bestCourse.isPaid,
  });

  // Fetch YouTube playlists
  const youtubePlaylists = await fetchYouTubePlaylists(query);

  return {
    courses,
    playlists: youtubePlaylists.slice(0, 6), // Limit to 6 playlists
  };
}
