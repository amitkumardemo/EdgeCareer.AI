import { GoogleGenerativeAI } from "@google/generative-ai";

const JSEARCH_KEY = process.env.JSEARCH_KEY;
const JSEARCH_HOST = 'jsearch.p.rapidapi.com';
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// Function to fetch jobs from JSearch API
export async function fetchJobsFromJSearch(query, numPages = 1) {
  if (!JSEARCH_KEY || !JSEARCH_HOST) {
    console.warn("JSearch API keys not set in environment variables. Using mock data.");
    // Return mock data for testing
    return [
      {
        job_id: "1",
        job_title: "Data Science Intern",
        employer_name: "TCS",
        job_city: "Bangalore",
        job_country: "India",
        job_description: "Work on data analysis projects.",
        job_apply_link: "https://www.example.com/apply/123",
        job_salary_min: 15000,
        job_salary_max: 20000,
        job_employment_type: "internship",
      },
      {
        job_id: "2",
        job_title: "Software Engineer",
        employer_name: "Infosys",
        job_city: "Mumbai",
        job_country: "India",
        job_description: "Develop software applications.",
        job_apply_link: "https://www.example.com/apply/456",
        job_salary_min: 25000,
        job_salary_max: 35000,
        job_employment_type: "fulltime",
      },
    ];
  }

  const url = `https://${JSEARCH_HOST}/search?query=${encodeURIComponent(query)}&num_pages=1`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': JSEARCH_KEY,
        'X-RapidAPI-Host': JSEARCH_HOST,
      },
    });
    if (!response.ok) {
      throw new Error(`JSearch API error: ${response.statusText}`);
    }
    const data = await response.json();
    // If API returns empty data, throw an error to show user-friendly message
    if (!data.data || data.data.length === 0) {
      throw new Error("No jobs found for the specified role and location. Please try a different role or location.");
    }
    return data.data;
  } catch (error) {
    console.error("Error fetching jobs from JSearch:", error);
    // Return mock data for testing
    return [
      {
        job_id: "1",
        job_title: "Data Science Intern",
        employer_name: "TCS",
        job_city: "Bangalore",
        job_country: "India",
        job_description: "Work on data analysis projects.",
        job_apply_link: "https://www.example.com/apply/123",
        job_salary_min: 15000,
        job_salary_max: 20000,
        job_employment_type: "internship",
      },
      {
        job_id: "2",
        job_title: "Software Engineer",
        employer_name: "Infosys",
        job_city: "Mumbai",
        job_country: "India",
        job_description: "Develop software applications.",
        job_apply_link: "https://www.example.com/apply/456",
        job_salary_min: 25000,
        job_salary_max: 35000,
        job_employment_type: "fulltime",
      },
    ];
  }
}

// Function to calculate match score
async function calculateMatchScore(role, skills, job) {
  try {
    const prompt = `Calculate a match score (0-100) for how well this job matches the user's role and skills. Job title: ${job.job_title}, Description: ${job.job_description}. User role: ${role}, Skills: ${skills}. Return only the number.`;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text().trim();
    const score = parseInt(text);
    return isNaN(score) ? 80 : score;
  } catch (error) {
    console.error("Error calculating match score:", error);
    return 80;
  }
}

// Main function to get job matches
export async function getJobMatches(role, skills, location) {
  // Build query from role, skills, location
  const query = `${role} ${skills} ${location}`;

  // Fetch jobs
  const jobs = await fetchJobsFromJSearch(query, 1);

  // Limit to top 10 jobs
  const topJobs = jobs.slice(0, 10);

  // Process jobs and calculate match scores
  const processedJobs = [];
  for (const job of topJobs) {
    const matchScore = await calculateMatchScore(role, skills, job);
    const salary = job.job_salary_min && job.job_salary_max ? `₹${job.job_salary_min}-${job.job_salary_max}/month` : 'N/A';
    const category = job.job_employment_type || 'General';
    processedJobs.push({
      title: job.job_title,
      company: job.employer_name,
      location: `${job.job_city}, ${job.job_country}`,
      salary: salary,
      match_score: `${matchScore}%`,
      url: job.job_apply_link,
      description: job.job_description,
      category: category,
    });
  }

  // Compute analytics
  const vacanciesByCity = {};
  const vacanciesByCategory = {};
  const salariesByCategory = {};

  processedJobs.forEach(job => {
    const city = job.location.split(',')[0].trim();
    const category = job.category || 'General';

    vacanciesByCity[city] = (vacanciesByCity[city] || 0) + 1;
    vacanciesByCategory[category] = (vacanciesByCategory[category] || 0) + 1;

    if (job.salary !== 'N/A') {
      const avgSalary = (parseInt(job.salary.split('-')[0].replace('₹', '')) + parseInt(job.salary.split('-')[1].replace('/month', ''))) / 2;
      if (!salariesByCategory[category]) salariesByCategory[category] = [];
      salariesByCategory[category].push(avgSalary);
    }
  });

  const averageSalaryByCategory = {};
  for (const cat in salariesByCategory) {
    const avg = salariesByCategory[cat].reduce((a, b) => a + b, 0) / salariesByCategory[cat].length;
    averageSalaryByCategory[cat] = `₹${Math.round(avg)}`;
  }

  const analytics = {
    vacancies_by_city: vacanciesByCity,
    vacancies_by_category: vacanciesByCategory,
    average_salary_by_category: averageSalaryByCategory,
  };

  const graphs = [
    "Bar chart: vacancies_by_city",
    "Pie chart: vacancies_by_category",
    "Line chart: average_salary_by_category",
  ];

  return {
    jobs: processedJobs,
    analytics,
    graphs,
  };
}
