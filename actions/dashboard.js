"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateAIInsights = async (industry) => {
  try {
    const prompt = `
          Analyze the current state of the ${industry} industry in India and provide insights in ONLY the following JSON format without any additional notes or explanations:
          {
            "salaryRanges": [
              { "role": "string", "min": number, "max": number, "median": number, "location": "India" }
            ],
            "growthRate": number,
            "demandLevel": "High" | "Medium" | "Low",
            "topSkills": ["skill1", "skill2"],
            "marketOutlook": "Positive" | "Neutral" | "Negative",
            "keyTrends": ["trend1", "trend2"],
            "recommendedSkills": ["skill1", "skill2"]
          }

          IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
          For salary ranges: Provide 4 specific career progression roles for this industry in India.
          Salaries should be in INR per annum (not LPA format in the numbers, just the raw INR amounts).
          Growth rate should be a percentage for the Indian market.
          Include at least 5 skills and trends relevant to this specific industry.
          Focus on current 2024 market data for India.
        `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    const parsedData = JSON.parse(cleanedText);
    
    // Stringify array/object fields to match database schema
    return {
      ...parsedData,
      salaryRanges: JSON.stringify(parsedData.salaryRanges),
      topSkills: JSON.stringify(parsedData.topSkills),
      keyTrends: JSON.stringify(parsedData.keyTrends),
      recommendedSkills: JSON.stringify(parsedData.recommendedSkills),
    };
  } catch (error) {
    console.error("Error generating AI insights:", error);
    // Return industry-specific insights if API fails - Indian market salaries in INR

    // Parse industry string (e.g., "tech-software-development")
    const industryParts = industry.split('-');
    const mainIndustry = industryParts[0];
    const subIndustry = industryParts.slice(1).join(' ');

    let insights = {};

    switch (mainIndustry) {
      case 'tech':
        insights = {
          salaryRanges: JSON.stringify([
            { role: "Full Stack Developer", min: 600000, max: 1200000, median: 900000, location: "India" },
            { role: "Frontend Developer", min: 500000, max: 1000000, median: 750000, location: "India" },
            { role: "Backend Developer", min: 700000, max: 1400000, median: 1000000, location: "India" },
            { role: "DevOps Engineer", min: 800000, max: 1600000, median: 1200000, location: "India" },
            { role: "Mobile App Developer", min: 550000, max: 1100000, median: 800000, location: "India" }
          ]),
          growthRate: 12,
          demandLevel: "High",
          topSkills: JSON.stringify(["JavaScript", "React", "Node.js", "Python", "SQL", "Git", "Agile", "Problem Solving"]),
          marketOutlook: "Positive",
          keyTrends: JSON.stringify(["AI/ML Integration", "Cloud Computing", "Cybersecurity", "Remote Work", "DevOps", "Microservices"]),
          recommendedSkills: JSON.stringify(["Full Stack Development", "Data Science", "Mobile Development", "Blockchain", "IoT", "Cloud Architecture"])
        };
        break;

      case 'finance':
        insights = {
          salaryRanges: JSON.stringify([
            { role: "Financial Analyst", min: 400000, max: 800000, median: 600000, location: "India" },
            { role: "Investment Banker", min: 800000, max: 2000000, median: 1400000, location: "India" },
            { role: "Financial Manager", min: 1500000, max: 3000000, median: 2200000, location: "India" },
            { role: "Risk Analyst", min: 600000, max: 1500000, median: 1000000, location: "India" },
            { role: "Finance Director", min: 3000000, max: 6000000, median: 4500000, location: "India" }
          ]),
          growthRate: 8,
          demandLevel: "High",
          topSkills: JSON.stringify(["Financial Modeling", "Excel", "SQL", "Python", "Risk Management", "Financial Analysis"]),
          marketOutlook: "Positive",
          keyTrends: JSON.stringify(["FinTech", "Digital Banking", "Cryptocurrency", "AI in Finance", "Sustainable Finance", "RegTech"]),
          recommendedSkills: JSON.stringify(["Data Analytics", "Blockchain", "Machine Learning", "Regulatory Compliance", "Financial Technology"])
        };
        break;

      case 'healthcare':
        insights = {
          salaryRanges: JSON.stringify([
            { role: "Healthcare Assistant", min: 250000, max: 500000, median: 350000, location: "India" },
            { role: "Medical Officer", min: 500000, max: 1200000, median: 800000, location: "India" },
            { role: "Healthcare Manager", min: 800000, max: 2000000, median: 1400000, location: "India" },
            { role: "Medical Director", min: 2000000, max: 4000000, median: 3000000, location: "India" },
            { role: "Healthcare Executive", min: 3000000, max: 7000000, median: 5000000, location: "India" }
          ]),
          growthRate: 10,
          demandLevel: "High",
          topSkills: JSON.stringify(["Patient Care", "Medical Knowledge", "Communication", "Healthcare IT", "Data Analysis"]),
          marketOutlook: "Positive",
          keyTrends: JSON.stringify(["Telemedicine", "AI Diagnostics", "Digital Health", "Personalized Medicine", "Healthcare Analytics"]),
          recommendedSkills: JSON.stringify(["Healthcare Technology", "Data Science", "Biotechnology", "Healthcare Management", "Clinical Research"])
        };
        break;

      case 'consulting':
        insights = {
          salaryRanges: JSON.stringify([
            { role: "Business Analyst", min: 400000, max: 800000, median: 600000, location: "India" },
            { role: "Consultant", min: 800000, max: 1800000, median: 1300000, location: "India" },
            { role: "Senior Consultant", min: 1500000, max: 3000000, median: 2200000, location: "India" },
            { role: "Manager", min: 2500000, max: 4500000, median: 3500000, location: "India" },
            { role: "Partner", min: 5000000, max: 10000000, median: 7500000, location: "India" }
          ]),
          growthRate: 9,
          demandLevel: "High",
          topSkills: JSON.stringify(["Problem Solving", "Communication", "Data Analysis", "Project Management", "Strategic Thinking"]),
          marketOutlook: "Positive",
          keyTrends: JSON.stringify(["Digital Transformation", "Sustainability Consulting", "AI Consulting", "Remote Consulting", "Industry 4.0"]),
          recommendedSkills: JSON.stringify(["Digital Strategy", "Change Management", "Data Analytics", "Industry Expertise", "Leadership"])
        };
        break;

      default:
        // Generic fallback for other industries
        insights = {
          salaryRanges: JSON.stringify([
            { role: "Entry Level Professional", min: 300000, max: 600000, median: 450000, location: "India" },
            { role: "Mid Level Professional", min: 600000, max: 1200000, median: 900000, location: "India" },
            { role: "Senior Professional", min: 1200000, max: 2000000, median: 1600000, location: "India" },
            { role: "Manager", min: 1800000, max: 3000000, median: 2400000, location: "India" },
            { role: "Director", min: 2500000, max: 5000000, median: 3500000, location: "India" }
          ]),
          growthRate: 8,
          demandLevel: "Medium",
          topSkills: JSON.stringify(["Communication", "Problem Solving", "Teamwork", "Adaptability", "Leadership"]),
          marketOutlook: "Neutral",
          keyTrends: JSON.stringify(["Digital Transformation", "Remote Work", "AI Integration", "Sustainability", "Innovation"]),
          recommendedSkills: JSON.stringify(["Project Management", "Data Analysis", "Digital Skills", "Industry Knowledge", "Leadership"])
        };
    }

    return insights;
  }
};

// Helper function to validate JSON strings
const isValidJSON = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};

export async function getIndustryInsights() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      industryInsight: true,
    },
  });

  if (!user) throw new Error("User not found");

  // Check if insights exist and are valid
  const hasValidInsights = user.industryInsight && 
    isValidJSON(user.industryInsight.salaryRanges) &&
    isValidJSON(user.industryInsight.topSkills) &&
    isValidJSON(user.industryInsight.keyTrends) &&
    isValidJSON(user.industryInsight.recommendedSkills);

  // If no insights exist or they're corrupted, regenerate them
  if (!hasValidInsights) {
    // Delete corrupted data if it exists
    if (user.industryInsight) {
      await db.industryInsight.delete({
        where: { id: user.industryInsight.id },
      });
    }

    const insights = await generateAIInsights(user.industry);

    const industryInsight = await db.industryInsight.create({
      data: {
        industry: user.industry,
        ...insights,
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return industryInsight;
  }

  return user.industryInsight;
}
