import { GoogleGenerativeAI } from "@google/generative-ai";
import { fetchYouTubePlaylists } from "./course-recommendation";
import * as cheerio from "cheerio";

const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID;
const ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY;
const ADZUNA_COUNTRY = process.env.ADZUNA_COUNTRY || "in";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// Function to fetch internships from TechieHelp website
export async function fetchInternshipsFromTechieHelp() {
  try {
    const response = await fetch('https://www.techiehelp.in/careers/training-internships');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    const $ = cheerio.load(html);

    const internships = [];

    // Parse internship listings from the page
    $('.internship-item, .job-item, .career-item').each((index, element) => {
      const title = $(element).find('h3, .title, .job-title').text().trim() || 'Internship Position';
      const company = $(element).find('.company, .organization').text().trim() || 'TechieHelp';
      const location = $(element).find('.location, .city').text().trim() || 'Remote';
      const description = $(element).find('.description, .details, p').text().trim() || 'Training and internship opportunity';
      const applyLink = $(element).find('a').attr('href') || 'https://www.techiehelp.in/careers/training-internships';

      if (title && title !== 'Internship Position') {
        internships.push({
          id: `techiehelp-${index}`,
          title,
          company,
          location,
          description: description.substring(0, 300),
          apply_link: applyLink.startsWith('http') ? applyLink : `https://www.techiehelp.in${applyLink}`,
        });
      }
    });

    // If no structured data found, try to extract from general content
    if (internships.length === 0) {
      const pageText = $('body').text();
      const lines = pageText.split('\n').filter(line => line.trim().length > 10);

      lines.forEach((line, index) => {
        if (line.toLowerCase().includes('internship') || line.toLowerCase().includes('training')) {
          internships.push({
            id: `techiehelp-general-${index}`,
            title: line.trim().substring(0, 100),
            company: 'TechieHelp',
            location: 'Remote',
            description: line.trim().substring(0, 300),
            apply_link: 'https://www.techiehelp.in/careers/training-internships',
          });
        }
      });
    }

    return internships.slice(0, 20); // Limit to 20 internships
  } catch (error) {
    console.error("Error fetching internships from TechieHelp:", error);
    // Fallback to empty array
    return [];
  }
}

// Function to fetch internships from Adzuna API
export async function fetchInternshipsFromAdzuna(query) {
  if (!ADZUNA_APP_ID || !ADZUNA_APP_KEY) {
    throw new Error("Adzuna API keys not set in environment variables.");
  }

  const url = `https://api.adzuna.com/v1/api/jobs/${ADZUNA_COUNTRY}/search/1?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&what=${encodeURIComponent(query)}&results_per_page=20`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Adzuna API error: ${response.statusText}`);
    }
    const data = await response.json();
    return data.results.map(job => ({
      id: job.id.toString(),
      title: job.title,
      company: job.company.display_name,
      location: job.location.display_name,
      description: job.description,
      apply_link: job.redirect_url,
    })) || [];
  } catch (error) {
    console.error("Error fetching internships from Adzuna:", error);
    throw error;
  }
}



// Main function to get internship matches with tips
export async function getInternshipMatches(role, skills, location) {
  // Try TechieHelp first
  let internships = await fetchInternshipsFromTechieHelp();

  // If no internships from TechieHelp, try Adzuna
  if (internships.length === 0) {
    const query = `internship ${role} ${skills} ${location}`;
    internships = await fetchInternshipsFromAdzuna(query);
  }

  // If still no internships, provide TechieHelp training links
  if (internships.length === 0) {
    internships = [
      {
        id: 'techiehelp-training',
        title: 'Training & Internship Programs',
        company: 'TechieHelp',
        location: 'Remote',
        description: 'Comprehensive training and internship opportunities in various tech fields.',
        apply_link: 'https://www.techiehelp.in/careers/training-internships',
      },
      {
        id: 'techiehelp-webdev',
        title: 'Web Development Training',
        company: 'TechieHelp',
        location: 'Remote',
        description: 'Learn web development skills and get internship opportunities.',
        apply_link: 'https://www.techiehelp.in/webdevelopment',
      },
      {
        id: 'techiehelp-android',
        title: 'Android Development Training',
        company: 'TechieHelp',
        location: 'Remote',
        description: 'Master Android development and secure internship positions.',
        apply_link: 'https://www.techiehelp.in/androiddevelopment',
      },
      {
        id: 'techiehelp-uiux',
        title: 'UI/UX Design Training',
        company: 'TechieHelp',
        location: 'Remote',
        description: 'Learn UI/UX design principles and internship opportunities.',
        apply_link: 'https://www.techiehelp.in/uiux',
      },
      {
        id: 'techiehelp-seo',
        title: 'SEO Training',
        company: 'TechieHelp',
        location: 'Remote',
        description: 'Master SEO techniques and get internship experience.',
        apply_link: 'https://www.techiehelp.in/seo',
      },
      {
        id: 'techiehelp-ai',
        title: 'AI Training',
        company: 'TechieHelp',
        location: 'Remote',
        description: 'Learn artificial intelligence and machine learning for internships.',
        apply_link: 'https://www.techiehelp.in/ai',
      },
      {
        id: 'techiehelp-ml',
        title: 'Machine Learning Training',
        company: 'TechieHelp',
        location: 'Remote',
        description: 'Comprehensive machine learning training and internship programs.',
        apply_link: 'https://www.techiehelp.in/machinelearning',
      },
      {
        id: 'techiehelp-frontend',
        title: 'Frontend Development Training',
        company: 'TechieHelp',
        location: 'Remote',
        description: 'Master frontend technologies and secure internship positions.',
        apply_link: 'https://www.techiehelp.in/frontend',
      },
      {
        id: 'techiehelp-backend',
        title: 'Backend Development Training',
        company: 'TechieHelp',
        location: 'Remote',
        description: 'Learn backend development and get internship opportunities.',
        apply_link: 'https://www.techiehelp.in/backend',
      },
      {
        id: 'techiehelp-fullstack',
        title: 'Full Stack Development Training',
        company: 'TechieHelp',
        location: 'Remote',
        description: 'Complete full stack development training and internships.',
        apply_link: 'https://www.techiehelp.in/fullstack',
      },
    ];
  }

  // Fetch preparation courses for the role
  const courseQuery = `fast preparation ${role} tutorial`;
  const preparationCourses = await fetchYouTubePlaylists(courseQuery);

  // Limit to top 10 internships
  const topInternships = internships.slice(0, 10);

  // Prepare internships text for AI
  const internshipsText = topInternships.map((internship, index) =>
    `${index + 1}. Title: ${internship.title}\n   Company: ${internship.company}\n   Location: ${internship.location}\n   Description: ${internship.description ? internship.description.substring(0, 300) : 'No description'}...\n   Link: ${internship.apply_link}`
  ).join('\n\n');

  const prompt = `
    Based on the user's role: "${role}" and skills: "${skills}", analyze the following internship listings and for each internship, provide tailored tips for:

    1. Resume optimization: Specific advice on how to tailor the resume for this internship.
    2. Interview preparation: Key topics to prepare, common questions, and tips.

    Internships:
    ${internshipsText}

    Respond ONLY with a valid JSON array of objects. Do not include any other text, explanations, or markdown. Each object must have exactly these keys:
    - internship_id
    - title
    - company
    - location
    - description
    - apply_link
    - resume_tips
    - interview_tips

    Example format: [{"internship_id": "id1", "title": "Title1", ...}, ...]
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const analysisText = response.text().trim();

    // Parse the JSON response
    let data;
    try {
      // Try to extract JSON from AI response text
      const jsonStart = analysisText.indexOf('[');
      const jsonEnd = analysisText.lastIndexOf(']');
      if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error("JSON array not found in AI response");
      }
      const jsonString = analysisText.substring(jsonStart, jsonEnd + 1);
      data = JSON.parse(jsonString);
      data.forEach((internship, idx) => {
        internship.preparation_course = preparationCourses[idx % preparationCourses.length];
      });
      return { internships: data };
    } catch (e) {
      // If not JSON, fallback to internships without tips
      console.error("Failed to parse AI response:", e);
      const fallbackInternships = topInternships.map((internship, idx) => ({
        internship_id: internship.id,
        title: internship.title,
        company: internship.company,
        location: internship.location,
        description: internship.description ? internship.description.substring(0, 200) : 'No description',
        apply_link: internship.apply_link,
        resume_tips: "Tailor your resume to highlight relevant skills and experiences.",
        interview_tips: "Prepare answers for common questions and research the company.",
        preparation_course: preparationCourses[idx % preparationCourses.length],
      }));
      return { internships: fallbackInternships };
    }
  } catch (error) {
    console.error("Error generating internship tips:", error);
    // Fallback
    const fallbackInternships = topInternships.map((internship, idx) => ({
      internship_id: internship.id,
      title: internship.title,
      company: internship.company,
      location: internship.location,
      description: internship.description ? internship.description.substring(0, 200) : 'No description',
      apply_link: internship.apply_link,
      resume_tips: "Tailor your resume to highlight relevant skills and experiences.",
      interview_tips: "Prepare answers for common questions and research the company.",
      preparation_course: preparationCourses[idx % preparationCourses.length],
    }));
    return { internships: fallbackInternships };
  }
}
