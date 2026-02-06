import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(request) {
  try {
    const { headline, about, experience, skills, followers, activity } = await request.json();

    // STEP 1: Input Validation
    const providedSections = {
      headline: !!headline && headline.trim().length > 0,
      about: !!about && about.trim().length > 0,
      experience: !!experience && experience.trim().length > 0,
      skills: !!skills && skills.trim().length > 0,
      followers: !!followers && followers.trim().length > 0,
      activity: !!activity && activity.trim().length > 0,
    };

    const providedCount = Object.values(providedSections).filter(Boolean).length;
    const totalSections = Object.keys(providedSections).length;
    const completenessPercentage = (providedCount / totalSections) * 100;

    let inputStatus = "⚠️ Partial Input";
    if (completenessPercentage >= 70) {
      inputStatus = "✅ Complete Input";
    }

    console.log(`📊 Input Completeness: ${completenessPercentage.toFixed(1)}% (${inputStatus})`);

    // Prepare user-provided data context
    const userProvidedContext = `
USER-PROVIDED LINKEDIN PROFILE DATA:

**Input Status:** ${inputStatus}
**Data Completeness:** ${completenessPercentage.toFixed(1)}%

${providedSections.headline ? `**Headline:**
${headline}
` : '**Headline:** Not provided'}

${providedSections.about ? `**About / Summary:**
${about}
` : '**About / Summary:** Not provided'}

${providedSections.experience ? `**Experience:**
${experience}
` : '**Experience:** Not provided'}

${providedSections.skills ? `**Skills:**
${skills}
` : '**Skills:** Not provided'}

${providedSections.followers ? `**Followers / Connections:**
${followers}
` : '**Followers / Connections:** Not provided'}

${providedSections.activity ? `**Activity / Posts:**
${activity}
` : '**Activity / Posts:** Not provided'}

**Provided Sections:**
${Object.entries(providedSections).filter(([_, v]) => v).map(([k]) => `- ${k}: ✅ Provided`).join('\n')}

**Missing Sections:**
${Object.entries(providedSections).filter(([_, v]) => !v).map(([k]) => `- ${k}: ❌ Not provided`).join('\n')}
`;

    const prompt = `You are the LinkedIn Profile Intelligence Agent for EdgeCareer.

INPUT MODE (STRICT):
The user has manually pasted their LinkedIn profile data.
The data provided below is the ONLY source of truth.

${userProvidedContext}

ABSOLUTE RULES (NON-NEGOTIABLE):
1. NEVER fetch or assume data from LinkedIn URLs
2. NEVER fabricate or auto-complete missing data
3. NEVER add information not explicitly provided
4. Missing data ≠ weak profile. Missing data = not provided
5. Be transparent, trust-first, and data-responsible

------------------------------------------------
INPUT VALIDATION STATUS: ${inputStatus}
Data Completeness: ${completenessPercentage.toFixed(1)}%

Provided sections: ${Object.entries(providedSections).filter(([_, v]) => v).map(([k]) => k).join(', ')}
Missing sections: ${Object.entries(providedSections).filter(([_, v]) => !v).map(([k]) => k).join(', ')}

------------------------------------------------
STEP 1: ROLE IDENTIFICATION (ONLY IF DATA SUPPORTS IT)

Classify into ONE category based strictly on the provided content:
- Founder / CEO / Entrepreneur
- Working Professional
- Freelancer / Consultant
- Student / Entry-Level

Classification Rules:
- Founder/CEO: Company ownership, founder/CEO in current role, hiring mentions, leadership language
- Professional: 3+ years experience with career progression
- Freelancer: Contract work, multiple clients, consulting roles
- Student: Recent education, minimal/internship-only experience, NO leadership

NEVER default to "student" without clear evidence.
Provide clear reasoning based ONLY on provided text.

------------------------------------------------
STEP 2: PROBLEM ANALYSIS (ONLY FROM PROVIDED DATA)

Identify REAL issues from the actual pasted content:
- Authority dilution in headline
- Unclear positioning or value proposition
- Missing impact metrics in experience
- Weak SEO keyword coverage
- Inconsistent branding
- Skills not aligned with positioning
- Under-leveraged content opportunities

Do NOT list problems for sections that were not provided.
Be specific about which provided sections have issues.

------------------------------------------------
STEP 3: DATA-DRIVEN SCORING

${completenessPercentage >= 70 ? `
Score on 0-100 scale based ONLY on provided data:
- Authority & Leadership (0-20)
- Brand Clarity (0-20)
- Credibility & Trust (0-20)
- SEO Visibility (0-20)
- Content Influence (0-20)

All scores must be explainable from the pasted content.
` : `
SCORING LIMITED: Only ${completenessPercentage.toFixed(1)}% of data provided (<70% threshold)
Score what's available, set missing sections to 0, and explain limitations.
`}

------------------------------------------------
STEP 4: CHART & VISUALIZATION DATA

Generate the following chart-ready data based on provided sections:

1. **radarChart** - Current vs Optimized (5 dimensions):
{
  "before": {
    "authority": <0-20 based on provided data>,
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
  "headline": <0-20 if provided, 0 if not>,
  "about": <0-20 if provided, 0 if not>,
  "experience": <0-20 if provided, 0 if not>,
  "skills": <0-20 if provided, 0 if not>,
  "engagement": <0-20 based on activity if provided>
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
  "headline": ${providedSections.headline},
  "about": ${providedSections.about},
  "experience": ${providedSections.experience},
  "skills": ${providedSections.skills},
  "followers": ${providedSections.followers},
  "activity": ${providedSections.activity},
  "completenessPercentage": ${completenessPercentage.toFixed(1)}
}

------------------------------------------------
STEP 5: AI-SUGGESTED IMPROVEMENTS

For each PROVIDED section, offer optimized versions:

${providedSections.headline ? `- **Headline** (220 char max, keyword-rich, authority-focused)` : ''}
${providedSections.about ? `- **About section** (3-5 paragraphs, 150-250 words, value proposition)` : ''}
${providedSections.experience ? `- **Experience bullets** (with metrics, STAR format)` : ''}
${providedSections.skills ? `- **Skills optimization** (must-have + recommended + prioritization)` : ''}

Additional recommendations:
- SEO keyword strategy
- Content & engagement plan (if activity provided)
- Authority building tactics

Label ALL improvements clearly as "AI-Suggested Improvements"

------------------------------------------------
OUTPUT FORMAT (STRICT JSON):

{
  "inputStatus": "${inputStatus}",
  "completenessPercentage": ${completenessPercentage},
  "providedSections": ${JSON.stringify(Object.entries(providedSections).filter(([_, v]) => v).map(([k]) => k))},
  "missingSections": ${JSON.stringify(Object.entries(providedSections).filter(([_, v]) => !v).map(([k]) => k))},
  "userProvidedData": {
    "headline": ${JSON.stringify(headline || '')},
    "about": ${JSON.stringify(about || '')},
    "experience": ${JSON.stringify(experience || '')},
    "skills": ${JSON.stringify(skills || '')},
    "followers": ${JSON.stringify(followers || '')},
    "activity": ${JSON.stringify(activity || '')}
  },
  "profileClassification": "<classification based on provided data>",
  "classificationReasoning": "<2-3 sentences explaining the classification>",
  "score": <0-100>,
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
      "category": "Section name",
      "issue": "Specific issue found in provided data",
      "impact": "High/Medium/Low",
      "explanation": "Why this matters"
    }
  ],
  "improvements": {
    ${providedSections.headline ? `"headline": {
      "current": "<exact user-provided headline>",
      "optimized": "<AI-suggested improved version>",
      "reasoning": "<why this works better>"
    },` : ''}
    ${providedSections.about ? `"about": {
      "current": "<summary of current or first 100 chars>",
      "optimized": "<AI-suggested improved version>",
      "reasoning": "<why this works better>"
    },` : ''}
    ${providedSections.experience ? `"experience": {
      "template": "<example bullets with metrics>",
      "tips": ["tip1", "tip2"]
    },` : ''}
    ${providedSections.skills ? `"skills": {
      "current": ["<user-provided skills as array>"],
      "mustHave": ["<skills they should add>"],
      "recommended": ["<additional skills>"],
      "reasoning": "<why these skills matter>"
    },` : ''}
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
  "analysisNotes": "Analysis based on manually provided data. Sections not provided were not analyzed."
}

TONE: Executive, transparent, supportive, professional, trust-first.

GOAL: Turn manually provided LinkedIn data into a high-authority, recruiter-ready personal brand while maintaining maximum trust and zero assumptions.
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
      
      // Add input metadata
      parsed.inputMetadata = {
        providedSections,
        completenessPercentage,
        inputStatus
      };
      
      return NextResponse.json(parsed);
      
    } catch (parseError) {
      console.error("❌ JSON parse error:", parseError);
      console.error("AI Response preview:", aiResponse.substring(0, 800));
      
      return NextResponse.json({
        error: "Failed to parse AI analysis response",
        inputStatus,
        completenessPercentage,
        providedSections,
        debugInfo: aiResponse.substring(0, 500)
      }, { status: 500 });
    }

  } catch (error) {
    console.error("❌ Manual LinkedIn Analyzer error:", error);
    return NextResponse.json(
      { error: "Failed to analyze LinkedIn profile data. Please try again." },
      { status: 500 }
    );
  }
}
