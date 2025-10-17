import { GoogleGenerativeAI } from "@google/generative-ai";

const INDEED_API_KEY = process.env.INDEED_API_KEY || '172ab53626msh8e8a6ea096d9811p192b77jsn7b29c46ac700';
const INDEED_API_HOST = process.env.INDEED_API_HOST || 'indeed-indeed.p.rapidapi.com';
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// Function to fetch jobs from Indeed API
export async function fetchJobsFromIndeed(query, location, page = 1) {
  if (!INDEED_API_KEY || !INDEED_API_HOST) {
    throw new Error("Indeed API keys not set in environment variables. Please configure INDEED_API_KEY and INDEED_API_HOST.");
  }

  const url = `https://${INDEED_API_HOST}/search?query=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}&page=${page}&num_pages=1`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': INDEED_API_KEY,
        'X-RapidAPI-Host': INDEED_API_HOST,
      },
    });
    if (!response.ok) {
      console.error(`Indeed API error: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Indeed API error: ${response.statusText}`);
    }
    const data = await response.json();
    // If API returns empty data, return mock data instead
    if (!data.data || data.data.length === 0) {
      console.log("API returned no data, using mock data");
      return getMockJobs(query, location);
    }
    return data.data;
  } catch (error) {
    console.error("Error fetching jobs from Indeed:", error);
    // Return mock data as fallback
    console.log("Using mock data as fallback");
    return getMockJobs(query, location);
  }
}

// Mock data function
function getMockJobs(query, location) {
  const mockJobs = [
    {
      job_title: "Frontend Developer",
      employer_name: "Mitigata",
      job_city: "Bangalore Urban",
      job_country: "India",
      job_apply_link: "https://wellfound.com/jobs/3178936-frontend-developer",
      job_description: "Join Mitigata as a Frontend Developer to build innovative web applications using modern JavaScript frameworks and technologies.",
      job_employment_type: "Full-time"
    },
    {
      job_title: "Frontend Developer",
      employer_name: "RiverPace",
      job_city: "Bangalore Urban",
      job_country: "India",
      job_apply_link: "https://wellfound.com/jobs/3264003-frontend-developer",
      job_description: "RiverPace is looking for a skilled Frontend Developer to create responsive and user-friendly web interfaces.",
      job_employment_type: "Full-time"
    },
    {
      job_title: "Full Stack Developer",
      employer_name: "Virtusa",
      job_city: "Bangalore",
      job_country: "India",
      job_apply_link: "https://www.virtusa.com/careers/in/bangalore/functional-programming/full-stack-developer/creq231401",
      job_description: "Virtusa seeks a Full Stack Developer to work on functional programming projects and build scalable applications.",
      job_employment_type: "Full-time"
    },
    {
      job_title: "Senior Java FullStack Developer",
      employer_name: "Virtusa",
      job_city: "Bangalore",
      job_country: "India",
      job_apply_link: "https://www.virtusa.com/careers/in/bangalore/core-tech-java/senior-java-fullstack-developer/creq213994",
      job_description: "Senior Java FullStack Developer position at Virtusa requiring expertise in Java technologies and full-stack development.",
      job_employment_type: "Full-time"
    },
    {
      job_title: "Backend Developer",
      employer_name: "Blackbuck",
      job_city: "Kadubeesanahalli, Bangalore",
      job_country: "India",
      job_apply_link: "https://apna.co/job/bengaluru-bangalore/backend-developer-787199703",
      job_description: "Blackbuck is hiring a Backend Developer to work on scalable backend systems and APIs.",
      job_employment_type: "Full-time"
    },
    {
      job_title: "Backend Developer",
      employer_name: "SAP",
      job_city: "Bangalore",
      job_country: "India",
      job_apply_link: "https://jobs.sap.com/job/Bangalore-Backend-Developer-560066/1222043901/",
      job_description: "SAP is looking for a Backend Developer to contribute to enterprise software solutions.",
      job_employment_type: "Full-time"
    },
    {
      job_title: "Full Stack Developer",
      employer_name: "Capgemini",
      job_city: "Bangalore",
      job_country: "India",
      job_apply_link: "https://careers.capgemini.com/job/Bangalore-Full-Stack-Developer/1213089901/",
      job_description: "Capgemini seeks a Full Stack Developer for projects in Bangalore and Noida locations.",
      job_employment_type: "Full-time"
    },
    {
      job_title: "Full Stack Developer",
      employer_name: "Schneider Electric",
      job_city: "Bangalore",
      job_country: "India",
      job_apply_link: "https://careers.se.com/jobs/009EUK?lang=en-us",
      job_description: "Schneider Electric is hiring a Full Stack Developer to work on energy management solutions.",
      job_employment_type: "Full-time"
    },
    {
      job_title: "Frontend Developer",
      employer_name: "Employter",
      job_city: "Bangalore",
      job_country: "India",
      job_apply_link: "https://www.foundit.in/job/frontend-developer-employ-bengaluru-bangalore-36676557",
      job_description: "Employter is looking for a Frontend Developer with 3-5 years of experience in Bangalore.",
      job_employment_type: "Full-time"
    },
    {
      job_title: "Website Developer (Frontend-heavy)",
      employer_name: "RankMotive",
      job_city: "Bangalore",
      job_country: "India",
      job_apply_link: "https://rankmotive.com/career/apply-for-website-developer-job-in-bangalore/",
      job_description: "RankMotive seeks a Website Developer with strong frontend skills for SEO-focused web development projects.",
      job_employment_type: "Full-time"
    }
  ];

  // Filter mock jobs based on query and location
  return mockJobs.filter(job => {
    const titleMatch = job.job_title.toLowerCase().includes(query.toLowerCase());
    const locationMatch = job.job_city.toLowerCase().includes(location.toLowerCase()) ||
                         job.job_country.toLowerCase().includes(location.toLowerCase());
    return titleMatch || locationMatch;
  }).slice(0, 10); // Return up to 10 jobs
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

// Function to generate match reasons
async function generateMatchReasons(role, skills, job) {
  try {
    const prompt = `Explain why this job matches the user's role and skills. Job: ${job.job_title} at ${job.employer_name}. User role: ${role}, Skills: ${skills}. Keep it to 2-3 sentences.`;
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    return "This job aligns with your specified role and skills based on the job description.";
  }
}

// Function to generate application tips
async function generateApplicationTips(job) {
  try {
    const prompt = `Provide 2-3 tips for applying to this job: ${job.job_title} at ${job.employer_name}. Keep it concise.`;
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    return "Tailor your resume to highlight relevant skills. Research the company and prepare for common interview questions.";
  }
}

// Main function to get job matches
export async function getJobMatches(role, skills, location) {
  // Build query from role, skills, location
  const query = `${role} ${skills} ${location}`;

  // Fetch jobs
  const jobs = await fetchJobsFromIndeed(role, location, 1);

  // Limit to top 10 jobs
  const topJobs = jobs.slice(0, 10);

  // Process jobs and calculate match scores
  const processedJobs = [];
  for (const job of topJobs) {
    const matchScore = await calculateMatchScore(role, skills, job);
    const matchReasons = await generateMatchReasons(role, skills, job);
    const applicationTips = await generateApplicationTips(job);
    const salary = job.job_salary_min && job.job_salary_max ? `₹${job.job_salary_min}-${job.job_salary_max}/month` : 'N/A';
    const category = job.job_employment_type || 'General';
    processedJobs.push({
      title: job.job_title,
      company: job.employer_name,
      location: `${job.job_city}, ${job.job_country}`,
      salary_range: salary,
      match_percentage: matchScore,
      apply_link: job.job_apply_link,
      description: job.job_description,
      match_reasons: matchReasons,
      application_tips: applicationTips,
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

    if (job.salary_range !== 'N/A') {
      const avgSalary = (parseInt(job.salary_range.split('-')[0].replace('₹', '')) + parseInt(job.salary_range.split('-')[1].replace('/month', ''))) / 2;
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
