import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(request) {
  try {
    const { linkedinUrl } = await request.json();

    if (!linkedinUrl) {
      return NextResponse.json({ error: "LinkedIn URL is required" }, { status: 400 });
    }

    // Extract LinkedIn username from URL
    const urlMatch = linkedinUrl.match(/linkedin\.com\/in\/([^\/\?]+)/);
    if (!urlMatch) {
      return NextResponse.json({
        error: "Invalid LinkedIn URL format. Please use format: https://linkedin.com/in/username"
      }, { status: 400 });
    }

    const linkedinUsername = urlMatch[1];

    // Fetch LinkedIn profile data using RapidAPI (LinkedIn Data API)
    let linkedinData = null;
    let dataFetchError = null;

    try {
      const rapidApiResponse = await fetch(
        `https://${process.env.RAPIDAPI_HOST}/get-profile-data-by-url?url=https://www.linkedin.com/in/${linkedinUsername}`,
        {
          headers: {
            'x-rapidapi-key': process.env.RAPIDAPI_KEY,
            'x-rapidapi-host': process.env.RAPIDAPI_HOST,
          },
        }
      );

      if (rapidApiResponse.ok) {
        linkedinData = await rapidApiResponse.json();
        console.log("✅ Successfully fetched LinkedIn data from RapidAPI");
      } else {
        const errorText = await rapidApiResponse.text();
        dataFetchError = `RapidAPI returned status ${rapidApiResponse.status}`;
        console.error("❌ RapidAPI error:", rapidApiResponse.status, errorText);
      }
    } catch (rapidApiError) {
      dataFetchError = rapidApiError.message;
      console.error("❌ RapidAPI fetch error:", rapidApiError);
    }

    // STEP 1: Data Availability Check
    const dataAvailability = {
      headline: !!linkedinData?.headline,
      about: !!linkedinData?.summary,
      experience: !!(linkedinData?.experiences && linkedinData.experiences.length > 0),
      skills: !!(linkedinData?.skills && linkedinData.skills.length > 0),
      leadership: false,
      followers: typeof linkedinData?.follower_count === 'number',
      education: !!(linkedinData?.education && linkedinData.education.length > 0),
      profilePicture: !!linkedinData?.profile_pic_url,
      backgroundImage: !!linkedinData?.background_cover_image_url,
    };

    // Check for leadership signals
    if (linkedinData?.experiences) {
      const leadershipTitles = ['founder', 'ceo', 'cto', 'director', 'head', 'lead', 'manager', 'vp', 'chief'];
      dataAvailability.leadership = linkedinData.experiences.some(exp =>
        leadershipTitles.some(title => exp.title?.toLowerCase().includes(title))
      );
    }

    const availableFields = Object.values(dataAvailability).filter(Boolean).length;
    const totalFields = Object.keys(dataAvailability).length;
    const dataAvailabilityPercentage = (availableFields / totalFields) * 100;

    let dataStatus = "❌ Data Not Accessible";
    if (dataAvailabilityPercentage >= 70) {
      dataStatus = "✅ Sufficient Data Available";
    } else if (dataAvailabilityPercentage >= 30) {
      dataStatus = "⚠️ Partial Data Available";
    }

    console.log(`📊 Data Availability: ${dataAvailabilityPercentage.toFixed(1)}% (${dataStatus})`);

    // CASE A: ❌ Data Not Accessible
    if (dataAvailabilityPercentage < 30) {
      return NextResponse.json({
        dataStatus: "not_accessible",
        dataAvailabilityPercentage: dataAvailabilityPercentage.toFixed(1),
        error: {
          title: "Unable to Access LinkedIn Profile Data",
          message: dataFetchError
            ? `We encountered an issue while trying to fetch your LinkedIn profile: ${dataFetchError}`
            : "We couldn't retrieve enough information from your LinkedIn profile to provide an accurate analysis.",
          reasons: [
            "Your profile may be set to private or have restricted visibility",
            "The LinkedIn URL format might be incorrect",
            "The profile might have privacy settings that prevent data access",
            "There may be a temporary issue with the data source"
          ],
          whyRealDataMatters: "TechieHelp Institute of AI uses real, structured LinkedIn data (via RapidAPI) to provide accurate, personalized career intelligence. Unlike generic tools, we analyze your actual profile content, metrics, and positioning to give you actionable insights that are specific to YOUR career brand.",
          nextSteps: [
            {
              step: "Make your LinkedIn profile public",
              description: "Go to LinkedIn Settings → Visibility → Public profile visibility and ensure it's turned ON"
            },
            {
              step: "Verify your profile URL",
              description: "Ensure you're using the format: https://linkedin.com/in/your-username"
            },
            {
              step: "Try again in a few minutes",
              description: "If you just changed your privacy settings, wait 2-3 minutes and retry"
            },
            {
              step: "Alternative: Manual analysis",
              description: "You can paste key sections of your profile (headline, about, experience) for a basic review"
            }
          ]
        }
      });
    }

    // Prepare raw profile data for display
    const rawProfileData = linkedinData ? {
      fullName: linkedinData.full_name || 'Not available',
      currentHeadline: linkedinData.headline || 'Not available',
      about: linkedinData.summary || 'Not available',
      followerCount: linkedinData.follower_count || 0,
      connectionCount: linkedinData.connections || 0,
      location: `${linkedinData.city || ''} ${linkedinData.state || ''} ${linkedinData.country || ''}`.trim() || 'Not specified',
      profilePicture: linkedinData.profile_pic_url ? 'Yes' : 'No',
      backgroundImage: linkedinData.background_cover_image_url ? 'Yes' : 'No',
      experiences: linkedinData.experiences?.slice(0, 5).map(exp => ({
        title: exp.title || 'N/A',
        company: exp.company || 'N/A',
        duration: `${exp.starts_at?.month || ''}/${exp.starts_at?.year || ''} - ${exp.ends_at ? `${exp.ends_at.month}/${exp.ends_at.year}` : 'Present'}`,
        description: exp.description || 'No description provided'
      })) || [],
      education: linkedinData.education?.slice(0, 3).map(edu => ({
        degree: edu.degree_name || 'Degree',
        field: edu.field_of_study || 'Field of Study',
        school: edu.school || 'N/A',
        period: `${edu.starts_at?.year || ''} - ${edu.ends_at?.year || 'N/A'}`
      })) || [],
      skills: linkedinData.skills?.slice(0, 30) || [],
      languages: linkedinData.languages || [],
      accomplishments: {
        certifications: linkedinData.accomplishment_courses?.length || 0,
        honors: linkedinData.accomplishment_honours_awards?.length || 0,
        projects: linkedinData.accomplishment_projects?.length || 0,
        publications: linkedinData.accomplishment_publications?.length || 0
      }
    } : null;

    // Prepare enhanced prompt for AI
    const profileDataContext = linkedinData ? `
REAL LINKEDIN PROFILE DATA (Fetched via RapidAPI - LinkedIn Data API):

**Profile Information:**
- Full Name: ${linkedinData.full_name || 'N/A'}
- Current Headline: ${linkedinData.headline || 'N/A'}
- Summary/About: ${linkedinData.summary || 'Not provided'}
- Follower Count: ${linkedinData.follower_count || 0}
- Connections: ${linkedinData.connections || 0}
- Location: ${linkedinData.city || ''} ${linkedinData.state || ''}, ${linkedinData.country || ''}

**Current Experience:**
${linkedinData.experiences?.slice(0, 5).map((exp, idx) => `
${idx + 1}. ${exp.title || 'N/A'} at ${exp.company || 'N/A'}
   Duration: ${exp.starts_at?.month || ''}/${exp.starts_at?.year || ''} to ${exp.ends_at ? `${exp.ends_at.month}/${exp.ends_at.year}` : 'Present'}
   ${exp.description ? `Description: ${exp.description.substring(0, 300)}${exp.description.length > 300 ? '...' : ''}` : 'No description'}
`).join('\n') || 'No experience data available'}

**Education:**
${linkedinData.education?.slice(0, 3).map((edu, idx) => `
${idx + 1}. ${edu.degree_name || 'Degree'} - ${edu.field_of_study || 'Field'} at ${edu.school || 'N/A'}
   Period: ${edu.starts_at?.year || ''} - ${edu.ends_at?.year || 'N/A'}
`).join('\n') || 'No education data available'}

**Skills:**
${linkedinData.skills?.slice(0, 30).join(', ') || 'No skills listed'}

**Accomplishments:**
- Certifications/Courses: ${linkedinData.accomplishment_courses?.length || 0}
- Honors & Awards: ${linkedinData.accomplishment_honours_awards?.length || 0}
- Projects: ${linkedinData.accomplishment_projects?.length || 0}
- Publications: ${linkedinData.accomplishment_publications?.length || 0}

**Additional Context:**
- Profile Picture: ${linkedinData.profile_pic_url ? 'Yes' : 'No'}
- Background Image: ${linkedinData.background_cover_image_url ? 'Yes' : 'No'}
- Languages: ${linkedinData.languages?.join(', ') || 'Not specified'}
- Total Experience Count: ${linkedinData.experiences?.length || 0} positions

**Data Availability Status:**
${Object.entries(dataAvailability).map(([field, available]) => `- ${field}: ${available ? '✅ Available' : '❌ Not Available'}`).join('\n')}
` : 'No data available';

    const prompt = `You are the LinkedIn Profile Intelligence Agent for TechieHelp Institute of AI.

DATA SOURCE (STRICT & VERIFIED):
${profileDataContext}

The data provided above is ${linkedinData ? 'REAL, structured, and publicly available LinkedIn data fetched via RapidAPI' : 'limited'}.
This data is the ONLY source of truth.

ABSOLUTE RULES (NON-NEGOTIABLE):
1. NEVER fabricate or simulate profile content
2. NEVER generate demo or placeholder analysis
3. NEVER classify the user's role without evidence from data
4. Missing data ≠ weak profile. Missing data = access limitation
5. Transparency and trust are more important than completeness

------------------------------------------------
DATA AVAILABILITY STATUS: ${dataStatus}
Data Coverage: ${dataAvailabilityPercentage.toFixed(1)}%

Available sections: ${Object.entries(dataAvailability).filter(([_, v]) => v).map(([k]) => k).join(', ')}
Missing sections: ${Object.entries(dataAvailability).filter(([_, v]) => !v).map(([k]) => k).join(', ')}

------------------------------------------------
CONDITIONAL BEHAVIOR:

${dataStatus === "⚠️ Partial Data Available" ? `
### ⚠️ PARTIAL DATA MODE ACTIVE

- Analyze ONLY available sections
- Do NOT score missing sections
- Clearly indicate which data was used and which wasn't
- Set scores for missing sections to 0
- In the analysis, explicitly state what couldn't be analyzed and why
` : `
### ✅ FULL ANALYSIS MODE ACTIVE

Proceed with comprehensive profile intelligence analysis.
`}

------------------------------------------------
STEP 1: ROLE IDENTIFICATION (ONLY IF DATA SUPPORTS IT)

Classify into ONE category based strictly on evidence:
- Founder / CEO / Entrepreneur
- Working Professional
- Freelancer / Consultant
- Student / Entry-Level

Classification Rules:
- Founder/CEO: Company ownership, founder/CEO in current role, follower count > 5000, hiring mentions, leadership roles
- Professional: 3+ years corporate/tech experience with career progression
- Freelancer: Contract work, multiple clients, consulting roles
- Student: Recent education (< 2 years), minimal/internship-only experience, NO leadership

NEVER default to "student" without clear evidence.
Provide clear reasoning for classification.

------------------------------------------------
STEP 2: TRUST-BUILDING ANALYSIS

Identify REAL issues based on the actual data:
- Authority dilution
- Unclear positioning
- Missing impact metrics
- Weak SEO keyword coverage
- Inconsistent branding
- Under-leveraged content

Do NOT list problems for sections that were not available.

------------------------------------------------
STEP 3: DATA-DRIVEN SCORING (ONLY IF ≥70% DATA AVAILABLE)

${dataAvailabilityPercentage >= 70 ? `
Score on 0-100 scale:
- Authority & Leadership (0-20)
- Brand Clarity (0-20)
- Credibility & Trust (0-20)
- SEO Visibility (0-20)
- Content Influence (0-20)

All scores must be explainable and based on actual data.
` : `
SCORING SKIPPED: Insufficient data (${dataAvailabilityPercentage.toFixed(1)}% < 70% threshold)
Set all scores to 0 and explain why scoring couldn't be performed.
`}

------------------------------------------------
STEP 4: CHART & VISUALIZATION DATA

Generate the following chart-ready data:

1. **radarChart** - Before vs After (5 dimensions):
{
  "before": {
    "authority": <0-20>,
    "brandClarity": <0-20>,
    "credibility": <0-20>,
    "seoVisibility": <0-20>,
    "contentInfluence": <0-20>
  },
  "after": {
    "authority": <projected score after improvements>,
    "brandClarity": <projected score>,
    "credibility": <projected score>,
    "seoVisibility": <projected score>,
    "contentInfluence": <projected score>
  }
}

2. **sectionScores** - Bar chart data:
{
  "headline": <0-20>,
  "about": <0-20>,
  "experience": <0-20>,
  "skills": <0-20>,
  "engagement": <0-20>
}

3. **seoKeywordCoverage**:
{
  "targetKeywords": ["keyword1", "keyword2", ...],
  "foundKeywords": ["keyword1", ...],
  "missingKeywords": ["keyword2", ...],
  "coveragePercentage": <0-100>
}

4. **profileCompleteness**:
{
  "headline": <true/false>,
  "about": <true/false>,
  "experience": <true/false>,
  "skills": <true/false>,
  "profilePicture": <true/false>,
  "backgroundImage": <true/false>,
  "certifications": <true/false>,
  "recommendations": <true/false>,
  "completenessPercentage": <0-100>
}

------------------------------------------------
STEP 5: AI-SUGGESTED IMPROVEMENTS

Provide optimized versions of:
- Headline (220 char max, keyword-rich)
- About section (3-5 paragraphs, 150-250 words)
- Experience bullet template (with metrics)
- Skills optimization (must-have + recommended)
- SEO keyword strategy
- Content & engagement plan

Label clearly as "AI-Suggested Improved Version"

------------------------------------------------
OUTPUT FORMAT (STRICT JSON):

{
  "dataStatus": "${dataStatus}",
  "dataAvailabilityPercentage": ${dataAvailabilityPercentage},
  "availableFields": ${JSON.stringify(Object.entries(dataAvailability).filter(([_, v]) => v).map(([k]) => k))},
  "missingFields": ${JSON.stringify(Object.entries(dataAvailability).filter(([_, v]) => !v).map(([k]) => k))},
  "profileClassification": "<classification>",
  "classificationReasoning": "<2-3 sentences based on actual data>",
  "score": <0-100>,
  "founderBrandingScore": <0-100>,
  "scoreBreakdown": {
    "authorityLeadership": <0-20>,
    "brandClarity": <0-20>,
    "credibilityTrust": <0-20>,
    "seoVisibility": <0-20>,
    "contentInfluence": <0-20>
  },
  "radarChart": { "before": {...}, "after": {...} },
  "sectionScores": { "headline": <0-20>, ... },
  "seoKeywordCoverage": { ... },
  "profileCompleteness": { ... },
  "mistakes": [
    {
      "category": "Headline",
      "issue": "Specific issue found in the data",
      "impact": "High/Medium/Low",
      "explanation": "Why this matters based on their role"
    }
  ],
  "improvements": {
    "headline": {
      "current": "<actual current headline from data>",
      "optimized": "<AI-suggested improved version>",
      "reasoning": "<why this works better>"
    },
    "about": {
      "current": "<actual current about or summary of it>",
      "optimized": "<AI-suggested improved version>",
      "reasoning": "<why this works better>"
    },
    "experience": {
      "template": "<example bullets with metrics>",
      "tips": ["tip1", "tip2"]
    },
    "skills": {
      "current": ["<actual skills from data>"],
      "mustHave": ["<skills they should add>"],
      "recommended": ["<additional skills>"],
      "reasoning": "<why these skills matter>"
    },
    "seoKeywords": {
      "primary": ["<5-7 keywords>"],
      "secondary": ["<8-12 keywords>"],
      "placement": "<specific guidance>"
    }
  },
  "contentStrategy": {
    "postingFrequency": "<specific recommendation>",
    "contentTypes": ["<type1>", "<type2>"],
    "engagementTips": ["<tip1>", "<tip2>"]
  },
  "roadmap": {
    "immediate": [
      {
        "action": "<specific action>",
        "impact": "High/Medium/Low",
        "timeNeeded": "<time estimate>"
      }
    ],
    "shortTerm": [...],
    "longTerm": [...]
  },
  "competitiveEdge": ["<point1>", "<point2>"],
  "summary": "<overall assessment paragraph>",
  "analysisNotes": "<IMPORTANT: State which sections were analyzed and which weren't due to data limitations>"
}

TONE: Executive, transparent, analytical, professional, trust-first.

GOAL: Make TechieHelp Institute of AI feel like a real, data-driven, enterprise-grade career intelligence platform where users first SEE their actual data, then UNDERSTAND the problems, and finally TRUST the improvements.
`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const aiResponse = response.text().trim();

    // Clean up JSON response
    let jsonResponse = aiResponse;
    if (aiResponse.startsWith('```json')) {
      jsonResponse = aiResponse.replace(/```json\s*/, '').replace(/\s*```$/, '');
    } else if (aiResponse.startsWith('```')) {
      jsonResponse = aiResponse.replace(/```\s*/, '').replace(/\s*```$/, '');
    }

    try {
      const parsed = JSON.parse(jsonResponse);

      // Add raw profile data for trust-building display
      parsed.rawProfileData = rawProfileData;
      parsed.dataAvailability = dataAvailability;

      return NextResponse.json(parsed);

    } catch (parseError) {
      console.error("❌ JSON parse error:", parseError);
      console.error("AI Response preview:", aiResponse.substring(0, 800));

      // Return error with partial data if available
      return NextResponse.json({
        error: "Failed to parse AI analysis response",
        rawProfileData,
        dataStatus,
        dataAvailabilityPercentage,
        dataAvailability,
        debugInfo: aiResponse.substring(0, 500)
      }, { status: 500 });
    }

  } catch (error) {
    console.error("❌ LinkedIn Profile Analyzer error:", error);
    return NextResponse.json(
      { error: "Failed to analyze LinkedIn profile. Please check the URL and try again." },
      { status: 500 }
    );
  }
}
