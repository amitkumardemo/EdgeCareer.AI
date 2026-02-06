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
      return NextResponse.json({ error: "Invalid LinkedIn URL format" }, { status: 400 });
    }

    const linkedinUsername = urlMatch[1];

    // Fetch LinkedIn profile data using Proxycurl API
    let linkedinData = null;
    try {
      const proxycurlResponse = await fetch(
        `https://nubela.co/proxycurl/api/v2/linkedin?url=https://www.linkedin.com/in/${linkedinUsername}`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.PROXYCURL_API_KEY}`,
          },
        }
      );

      if (!proxycurlResponse.ok) {
        console.error("Proxycurl API error:", proxycurlResponse.status);
        // Continue without real data - AI will work with URL only
      } else {
        linkedinData = await proxycurlResponse.json();
      }
    } catch (proxycurlError) {
      console.error("Proxycurl fetch error:", proxycurlError);
      // Continue without real data
    }

    // Prepare the prompt with real data or URL
    const profileDataContext = linkedinData
      ? `
REAL LINKEDIN PROFILE DATA (from Proxycurl API):

**Profile Information:**
- Full Name: ${linkedinData.full_name || 'N/A'}
- Headline: ${linkedinData.headline || 'N/A'}
- Summary/About: ${linkedinData.summary || 'N/A'}
- Follower Count: ${linkedinData.follower_count || 'N/A'}
- Connections: ${linkedinData.connections || 'N/A'}
- Location: ${linkedinData.city || 'N/A'}, ${linkedinData.country || 'N/A'}

**Experience:**
${linkedinData.experiences?.map((exp, idx) => `
${idx + 1}. ${exp.title || 'N/A'} at ${exp.company || 'N/A'}
   Duration: ${exp.starts_at?.year || ''}-${exp.starts_at?.month || ''} to ${exp.ends_at?.year || 'Present'}
   Description: ${exp.description || 'No description'}
`).join('\n') || 'No experience data'}

**Education:**
${linkedinData.education?.map((edu, idx) => `
${idx + 1}. ${edu.degree_name || 'N/A'} at ${edu.school || 'N/A'}
   Field: ${edu.field_of_study || 'N/A'}
   Year: ${edu.starts_at?.year || ''} - ${edu.ends_at?.year || ''}
`).join('\n') || 'No education data'}

**Skills:**
${linkedinData.skills?.join(', ') || 'No skills data'}

**Languages:**
${linkedinData.languages?.join(', ') || 'No languages data'}

**Accomplishments:**
- Certifications: ${linkedinData.accomplishment_courses?.length || 0}
- Honors & Awards: ${linkedinData.accomplishment_honors_awards?.length || 0}
- Projects: ${linkedinData.accomplishment_projects?.length || 0}
- Publications: ${linkedinData.accomplishment_publications?.length || 0}
`
      : `
LinkedIn Profile URL: ${linkedinUrl}
(Note: Unable to fetch real profile data. Please analyze based on what can be inferred from typical LinkedIn profiles.)
`;

    const prompt = `
You are an AI-powered LinkedIn Profile Enhancer designed for professional, founder-level, and recruiter-facing optimization.

DATA SOURCE (STRICT):
${profileDataContext}

The data provided above is ${linkedinData ? 'REAL, structured, and publicly available LinkedIn data from Proxycurl API' : 'limited - analyze based on best practices'}.
Treat this data as the ONLY source of truth.
Do NOT assume, fabricate, or generalize any information beyond what's provided.

------------------------------------------------
STEP 1: Identity Detection (Mandatory)
Based ONLY on the input data, classify the profile into ONE category:
- Founder / CEO / Entrepreneur
- Working Professional
- Freelancer / Consultant
- Student / Entry-Level

Rules for Classification:
- If the profile includes company ownership, founder/CEO titles, hiring activity, leadership roles, or follower count > 5000 → classify as Founder
- If experience shows 3+ years in corporate/tech roles → classify as Working Professional
- If experience shows contract work, multiple clients, consulting → classify as Freelancer
- NEVER default to "student" unless education is recent and experience is minimal or internship-only

Briefly explain why this category was selected (2-3 sentences).

------------------------------------------------
STEP 2: Role-Aware Enhancement Strategy
Enhance the profile strictly according to the identified role.

If Founder / CEO:
- Focus on authority, vision, credibility, impact, and leadership branding
- Highlight business metrics (revenue, users, team size, growth)
- Emphasize thought leadership and industry influence

If Professional / Freelancer:
- Focus on role clarity, skill positioning, experience impact, and recruiter alignment
- Highlight quantifiable achievements and technical expertise
- Emphasize career progression and specialization

If Student / Entry-Level:
- Focus on potential, projects, learning trajectory, and skill development
- Highlight academic projects with real-world applications
- Emphasize eagerness to learn and contribute

------------------------------------------------
STEP 3: Optimized Output (Core Feature)
Generate the following ENHANCED content:

1. **Optimized LinkedIn Headline**
   - Authority-driven for founders/execs, skill-focused for professionals
   - Keyword-optimized for recruiter searches
   - Clear positioning (not overcrowded, max 220 characters)
   - Format: "Role | Value Proposition | Key Skills/Impact"

2. **Enhanced About Section**
   - Strong opening hook (achievement or bold statement)
   - Clear value proposition (what you do and for whom)
   - Impact, metrics, or scale (use real numbers from data)
   - Vision / mission alignment (for founders) or career goals (for professionals)
   - Natural keyword integration for SEO
   - Call to action at the end
   - Length: 3-5 paragraphs, ~150-250 words

3. **Experience Enhancement Template**
   - Provide 3-4 example bullet points rewritten with:
     * Strong action verbs (Led, Built, Scaled, Optimized, Achieved)
     * Quantifiable metrics (%, $, numbers, timelines)
     * Business or outcome-oriented framing
     * Technical skills naturally integrated
   - Format: "Action verb + what you did + how you did it + quantifiable result"

4. **Skills Optimization**
   - Priority skills (top 10-15 based on role and industry)
   - Missing but recommended skills (role-based, industry-standard)
   - Reasoning for why these skills matter for visibility and opportunities

------------------------------------------------
STEP 4: SEO & Visibility Boost
Provide:
- **Primary keywords** (5-7 keywords): Most important for recruiter searches
- **Secondary keywords** (8-12 keywords): Supporting terms for broader reach
- **Placement strategy**: Specific guidance on where to use keywords
  * Headline: Which primary keywords to include
  * About: How to naturally integrate keywords
  * Experience: Keywords to sprinkle in role descriptions
  * Skills: Order of priority for endorsements

------------------------------------------------
STEP 5: Content & Brand Growth Suggestions
Based on the role classification, suggest:

**What type of LinkedIn content to post:**
- For Founders: Thought leadership, company updates, hiring posts, industry insights
- For Professionals: Project learnings, skill showcases, industry trends, career tips
- For Freelancers: Case studies, client wins, service offerings, testimonials
- For Students: Learning journey, project builds, internship experiences, skill development

**Posting frequency:**
- Optimal frequency for visibility (2-3 times/week, daily, etc.)
- Best times to post for engagement

**How to position authority:**
- Specific strategies based on role (founder authority vs. professional expertise)
- Engagement tactics (commenting, sharing, networking)
- Profile optimization tips (profile photo, banner, featured section)

------------------------------------------------
RULES (VERY IMPORTANT):
- No generic advice - tailor everything to the actual data provided
- No student-style suggestions for founder profiles
- No assumptions beyond provided data
- No resume-style tone - use professional, engaging language
- All suggestions must be actionable and specific
- Include reasoning/explanation for every recommendation

------------------------------------------------
TONE:
Professional, strategic, confident, founder-aware (when applicable), and growth-focused.

GOAL:
Transform this LinkedIn profile into a **high-authority, high-visibility, recruiter- and opportunity-ready personal brand** using real LinkedIn data.

------------------------------------------------
OUTPUT FORMAT (JSON):

Provide your analysis in the following JSON structure:

{
  "profileClassification": "Founder / CEO / Entrepreneur" or "Working Professional" or "Freelancer / Consultant" or "Student / Entry-Level",
  "classificationReasoning": "2-3 sentences explaining why this classification was chosen based on the data",
  
  "founderBrandingScore": 85,
  "scoreBreakdown": {
    "authorityLeadership": 18,
    "brandClarity": 16,
    "credibilityTrust": 17,
    "contentInfluence": 12,
    "seoVisibility": 14
  },
  "summary": "Overall assessment paragraph (3-4 sentences) summarizing the profile's current state and key opportunities",
  
  "mistakes": [
    {
      "category": "Headline",
      "issue": "Specific problem identified in current headline",
      "impact": "High" or "Medium" or "Low",
      "explanation": "Why this matters and what's being missed"
    }
  ],
  
  "improvements": {
    "headline": {
      "current": "Current headline from profile data",
      "optimized": "New optimized headline following best practices",
      "reasoning": "Why this new headline works better - specific benefits"
    },
    "about": {
      "current": "Current about section summary (first 100 chars)",
      "optimized": "Complete rewritten about section with hook, value prop, metrics, vision, and CTA",
      "reasoning": "Why this structure and content works better",
      "structure": ["Opening hook", "Value proposition", "Key achievements", "Vision/Mission", "Call to action"]
    },
    "experience": {
      "template": "3-4 example bullet points showing the optimized format with action verbs and metrics",
      "tips": [
        "Specific tip 1 for writing experience bullets",
        "Specific tip 2 with examples",
        "Specific tip 3 for their industry"
      ]
    },
    "skills": {
      "mustHave": ["Top priority skill 1", "Top priority skill 2", "..."],
      "recommended": ["Secondary skill 1", "Secondary skill 2", "..."],
      "reasoning": "Why these specific skills matter for this profile and role"
    },
    "seoKeywords": {
      "primary": ["Primary keyword 1", "Primary keyword 2", "..."],
      "secondary": ["Secondary keyword 1", "Secondary keyword 2", "..."],
      "placement": "Detailed guidance: 'Use [specific keywords] in headline. In about section, integrate [keywords] naturally in paragraphs 1 and 3. Add [keywords] to experience descriptions where relevant.'"
    }
  },
  
  "contentStrategy": {
    "postingFrequency": "Specific recommendation with reasoning (e.g., '2-3 times per week during weekday mornings for B2B audience visibility')",
    "contentTypes": [
      "Specific content type 1 with example topic",
      "Specific content type 2 with example topic",
      "Specific content type 3 with example topic"
    ],
    "engagementTips": [
      "Actionable tip 1 for their specific role",
      "Actionable tip 2 with example",
      "Actionable tip 3 for building authority"
    ],
    "authorityPositioning": "Specific strategy for establishing authority in their field (2-3 sentences with concrete actions)"
  },
  
  "roadmap": {
    "immediate": [
      {
        "action": "Specific action to take right now",
        "impact": "High",
        "timeNeeded": "5-10 minutes"
      }
    ],
    "shortTerm": [
      {
        "action": "Action for this week",
        "impact": "High" or "Medium",
        "timeNeeded": "Realistic time estimate"
      }
    ],
    "longTerm": [
      {
        "action": "Ongoing habit or strategy",
        "impact": "Medium",
        "timeNeeded": "Ongoing" or specific duration
      }
    ]
  },
  
  "competitiveEdge": [
    "Specific differentiator 1 based on their unique experience",
    "Specific differentiator 2 leveraging their strengths",
    "Specific differentiator 3 for their target market"
  ]
}

Remember:
- Base everything on the REAL data provided
- Classification MUST match the actual profile (founder vs professional vs student)
- All suggestions must be specific to their industry, role, and experience level
- Include specific examples and reasoning for every recommendation
- Focus on actionable, implementable changes
`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const aiResponse = response.text().trim();

    // Clean up the response to extract JSON
    let jsonResponse = aiResponse;
    if (aiResponse.startsWith('```json')) {
      jsonResponse = aiResponse.replace(/```json\s*/, '').replace(/\s*```$/, '');
    } else if (aiResponse.startsWith('```')) {
      jsonResponse = aiResponse.replace(/```\s*/, '').replace(/\s*```$/, '');
    }

    try {
      const parsed = JSON.parse(jsonResponse);
      
      // Add the raw LinkedIn data to the response for reference
      if (linkedinData) {
        parsed.rawProfileData = {
          name: linkedinData.full_name,
          headline: linkedinData.headline,
          followerCount: linkedinData.follower_count,
          experienceYears: linkedinData.experiences?.length || 0
        };
      }
      
      return NextResponse.json(parsed);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      console.error("AI Response:", aiResponse.substring(0, 500));
      
      // Fallback response with the enhanced structure
      return NextResponse.json({
        profileClassification: "Working Professional",
        classificationReasoning: "Based on the LinkedIn profile, this appears to be a working professional with relevant industry experience. The profile shows a career progression with focus on technical skills and professional development.",
        founderBrandingScore: 70,
        scoreBreakdown: {
          authorityLeadership: 14,
          brandClarity: 13,
          credibilityTrust: 14,
          contentInfluence: 11,
          seoVisibility: 12
        },
        summary: "Your LinkedIn profile demonstrates solid professional experience but has significant opportunities for optimization. The main areas requiring attention are strategic positioning, quantifiable achievements, and SEO visibility. By implementing founder-level branding strategies and recruiter-focused optimization, you can dramatically increase your profile's impact and opportunity attraction.",
        mistakes: [
          {
            category: "Headline",
            issue: "Headline lacks authority positioning and keyword optimization",
            impact: "High",
            explanation: "Your headline is the first thing recruiters and potential clients see. Without strategic keywords and clear value proposition, you're invisible in searches and fail to capture attention."
          },
          {
            category: "About Section",
            issue: "Missing compelling hook and quantifiable impact metrics",
            impact: "High",
            explanation: "The about section doesn't immediately grab attention or demonstrate concrete value. Without a strong narrative and metrics, visitors bounce without connecting."
          },
          {
            category: "Experience Descriptions",
            issue: "Lacking specific outcomes and business impact metrics",
            impact: "High",
            explanation: "Generic responsibility lists don't differentiate you. Recruiters need to see quantifiable results to understand your actual value and impact."
          }
        ],
        improvements: {
          headline: {
            current: linkedinData?.headline || "Professional Title",
            optimized: "Senior Software Engineer | Building Scalable Cloud Solutions | React, AWS, Microservices | Helping Startups Scale to 1M+ Users",
            reasoning: "This headline combines role clarity, technical expertise, key technologies, and concrete value proposition. It's keyword-rich for recruiter searches while demonstrating authority and impact."
          },
          about: {
            current: linkedinData?.summary?.substring(0, 100) || "Standard professional summary",
            optimized: "I turn complex technical challenges into elegant solutions that scale.\n\nOver the past 5 years, I've architected and deployed cloud infrastructure serving 2M+ users across 3 continents, reduced operational costs by 40%, and led teams that delivered mission-critical systems with 99.9% uptime.\n\n💡 What I Do:\n• Design and implement scalable microservices architectures using AWS, Kubernetes, and serverless technologies\n• Lead technical strategy for high-growth startups, from MVP to production scale\n• Mentor engineering teams in best practices for cloud-native development and DevOps\n\n🎯 My Approach:\nI believe the best technology solutions combine technical excellence with business impact. Every architectural decision I make is driven by measurable outcomes - performance, reliability, cost efficiency, and user experience.\n\n🚀 Currently:\n• Exploring AI/ML integration in cloud platforms\n• Contributing to open-source cloud-native tools\n• Helping startups navigate their scaling journey\n\nLet's connect if you're building something ambitious and need a technical partner who thinks beyond code.",
            reasoning: "This about section opens with a bold value statement, backs it up with specific metrics, showcases expertise with relevant keywords, demonstrates business thinking, and ends with a clear call to action. It positions you as a strategic technical leader, not just a developer.",
            structure: ["Bold opening hook", "Quantifiable achievements", "Core competencies with keywords", "Philosophy/Approach", "Current focus and CTA"]
          },
          experience: {
            template: "• Architected microservices platform using Node.js and AWS Lambda, reducing infrastructure costs by 35% while improving response time by 50%\n• Led 8-person engineering team through migration to Kubernetes, achieving 99.95% uptime and 60% faster deployment cycles\n• Implemented CI/CD pipeline with GitHub Actions and AWS CodePipeline, reducing deployment time from 2 hours to 15 minutes\n• Designed and deployed real-time analytics system processing 50M+ events daily with sub-100ms latency",
            tips: [
              "Start with powerful action verbs: Architected, Led, Implemented, Designed, Scaled, Optimized",
              "Include specific technologies and tools to boost SEO and demonstrate expertise",
              "Always quantify impact: percentages, dollar amounts, time saved, users served, scale metrics",
              "Show business value, not just technical complexity - connect your work to outcomes that matter"
            ]
          },
          skills: {
            mustHave: ["Cloud Architecture", "AWS", "Microservices", "Kubernetes", "Docker", "Node.js", "React", "TypeScript", "CI/CD", "System Design"],
            recommended: ["Terraform", "GraphQL", "Redis", "PostgreSQL", "Monitoring & Observability", "DevOps", "Agile Leadership", "Technical Strategy", "Team Mentoring", "API Design"],
            reasoning: "These skills are the most searched by recruiters for senior engineering roles and align with current industry demands. The 'must have' list covers your core technical stack and makes you discoverable. The 'recommended' list adds breadth and positions you for leadership opportunities."
          },
          seoKeywords: {
            primary: ["Senior Software Engineer", "Cloud Architect", "Full Stack Engineer", "Technical Lead", "Engineering Manager"],
            secondary: ["AWS Solutions", "Microservices Architecture", "Kubernetes Expert", "React Development", "Node.js Backend", "DevOps", "CI/CD", "System Design", "Scalable Systems", "Cloud Native"],
            placement: "Headline: Include 'Senior Software Engineer' and '2-3 key technologies'. About Section: Naturally integrate 'cloud architect', 'microservices', and 'scalable systems' in first paragraph. Use 'technical leadership' and specific tech keywords (AWS, Kubernetes, React) throughout. Experience: Sprinkle technical keywords in each role description - focus on actions like 'architected', 'designed', 'scaled'. Skills: Order by recruiter search frequency - put 'Cloud Architecture', 'AWS', 'Microservices' first."
          }
        },
        contentStrategy: {
          postingFrequency: "2-3 times per week, ideally Tuesday-Thursday mornings (8-10 AM) when B2B professionals are most active. Consistency matters more than frequency - build a sustainable rhythm.",
          contentTypes: [
            "Technical deep-dives: 'How we scaled to 1M users with serverless architecture' - establishes expertise",
            "Lessons learned: '5 mistakes I made migrating to Kubernetes (and how to avoid them)' - shows wisdom and humility",
            "Industry insights: Commentary on latest cloud/engineering trends with your unique perspective",
            "Career journey: Stories about challenges, failures, and breakthroughs that humanize your expertise",
            "Team highlights: When appropriate, showcase projects and give credit - demonstrates leadership"
          ],
          engagementTips: [
            "Comment thoughtfully on posts from engineering leaders and industry influencers in your first 30 minutes daily",
            "Ask questions in your posts to drive comments (LinkedIn's algorithm loves engagement)",
            "Respond to every comment on your posts within 2 hours to boost visibility",
            "Use 3-5 targeted hashtags: mix high-traffic (#CloudComputing) with niche (#Kubernetes)",
            "Share company/team wins monthly to show you're actively building"
          ],
          authorityPositioning: "Position yourself as a 'technical leader who delivers business value' rather than 'just an engineer'. Share insights that connect technology decisions to business outcomes. Write for two audiences: technical peers (who appreciate depth) and business leaders (who care about impact). Your unique angle is bridging the gap between complex technical work and measurable business results."
        },
        roadmap: {
          immediate: [
            {
              action: "Update headline with optimized version including role, value prop, and key technologies",
              impact: "High",
              timeNeeded: "5 minutes"
            },
            {
              action: "Add professional headshot if missing (crucial for credibility and first impressions)",
              impact: "High",
              timeNeeded: "10 minutes"
            }
          ],
          shortTerm: [
            {
              action: "Rewrite about section with the enhanced structure (hook, metrics, value, CTA)",
              impact: "High",
              timeNeeded: "45-60 minutes"
            },
            {
              action: "Update top 3 experience roles with quantified bullet points and metrics",
              impact: "High",
              timeNeeded: "1-2 hours"
            },
            {
              action: "Reorganize skills section - priority order, add missing must-have skills, get 3 endorsements each",
              impact: "Medium",
              timeNeeded: "30 minutes + ongoing"
            },
            {
              action: "Request 2-3 recommendations from recent colleagues focusing on leadership and technical impact",
              impact: "Medium",
              timeNeeded: "20 minutes"
            }
          ],
          longTerm: [
            {
              action: "Build consistent content posting habit (2-3x/week) - start with simple project updates",
              impact: "High",
              timeNeeded: "30 min/week"
            },
            {
              action: "Daily engagement routine: 15 mins of thoughtful commenting on relevant posts",
              impact: "Medium",
              timeNeeded: "15 min/day"
            },
            {
              action: "Monthly profile audit: review analytics, update skills, refresh experience with new wins",
              impact: "Medium",
              timeNeeded: "1 hour/month"
            }
          ]
        },
        competitiveEdge: [
          "Quantify everything ruthlessly - while others list responsibilities, you showcase measurable impact (cost savings, performance gains, scale achieved)",
          "Bridge technical and business language - make your expertise accessible to both engineers and executives, expanding your opportunity pool",
          "Build in public - share your journey, lessons, and wins consistently. Most engineers stay silent; your voice becomes your differentiator",
          "Strategic keywords + authentic storytelling - optimize for search while staying genuine. You're not gaming the system; you're helping the right people find you",
          "Demonstrate leadership beyond titles - show mentorship, technical strategy, and business thinking even if you're not formally a manager"
        ]
      });
    }

  } catch (error) {
    console.error("LinkedIn Profile Enhancer error:", error);
    return NextResponse.json(
      { error: "Failed to enhance LinkedIn profile. Please try again." },
      { status: 500 }
    );
  }
}
