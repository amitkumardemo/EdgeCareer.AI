import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    const companyName = formData.get("companyName");
    const jobRole = formData.get("jobRole");
    const jobDescription = formData.get("jobDescription");
    const resumeFile = formData.get("resumeFile");
    const resumeText = formData.get("resumeText");

    // Validation
    if (!companyName || !jobRole || !jobDescription) {
      return NextResponse.json(
        { error: "Company name, job role, and job description are required" },
        { status: 400 }
      );
    }

    if (!resumeFile && !resumeText) {
      return NextResponse.json(
        { error: "Either resume file or resume text is required" },
        { status: 400 }
      );
    }

    // Extract resume content
    let existingResumeContent = resumeText || "";

    if (resumeFile && !resumeText) {
      try {
        const buffer = Buffer.from(await resumeFile.arrayBuffer());
        const pdfParse = (await import('pdf-parse')).default;
        const data = await pdfParse(buffer);
        existingResumeContent = data.text;
        
        if (!existingResumeContent || existingResumeContent.trim().length === 0) {
          throw new Error("Could not extract text from PDF");
        }
      } catch (pdfError) {
        // Log error but don't fail if it's just a test file error
        if (pdfError.code === 'ENOENT' && pdfError.path?.includes('test')) {
          console.warn("PDF parse test file warning (can be ignored):", pdfError.message);
        } else {
          console.error("PDF parsing error:", pdfError);
          return NextResponse.json(
            { error: "Failed to parse resume PDF. Please try uploading a different file or paste your resume text." },
            { status: 400 }
          );
        }
      }
    }

    // AI Prompt for Resume Generation
    const prompt = `You are an expert ATS-optimized resume generator. Your task is to create a company-specific, job-aligned resume that maximizes ATS compatibility.

**INPUT DETAILS:**
Company: ${companyName}
Job Role: ${jobRole}

Job Description:
${jobDescription}

Existing Resume:
${existingResumeContent}

**CRITICAL CHARACTER LIMITS - MUST BE STRICTLY ENFORCED:**
- Contact Name: MAX 50 characters
- Contact Mobile: MAX 20 characters
- Professional Summary: MAX 200 characters
- Skills Section: MAX 300 characters total
- Each Experience Title: MAX 60 characters
- Each Experience Organization: MAX 60 characters
- Each Experience Description: MAX 360 characters (3 bullets × 120 chars each)
- Each Project Title: MAX 60 characters
- Each Project Organization: MAX 60 characters
- Each Project Description: MAX 220 characters (2 bullets × 110 chars each)
- Each Education Title: MAX 60 characters
- Each Education Organization: MAX 60 characters
- Each Education Description: MAX 220 characters
- Achievements: MAX 300 characters (3 items × 100 chars each)
- Leadership Positions: MAX 220 characters (2 items × 110 chars each)
- Why I Fit This Role: MAX 300 characters (3 items × 100 chars each)

**ENTRY LIMITS - MUST BE STRICTLY ENFORCED:**
- Experience: MAX 3 entries
- Projects: MAX 3 entries
- Education: MAX 2 entries

**YOUR TASK:**
Analyze the job description and existing resume, then generate a ONE-PAGE, ATS-optimized resume that:
1. Extracts and incorporates ALL relevant ATS keywords from the job description
2. Rewrites experience bullets using job-specific keywords and quantifiable achievements
3. Auto-generates a professional summary tailored to this specific role (MAX 200 chars)
4. Optimizes skills section to match job requirements (MAX 300 chars total)
5. Restructures projects to highlight relevance to the target role
6. Removes content that doesn't align with job requirements
7. Uses action verbs and quantifiable metrics (%, $, numbers)
8. Maintains truthfulness - only enhance, don't fabricate
9. **NEVER exceeds character limits - truncate intelligently if needed**
10. **Auto-generates missing sections (Achievements, Leadership, Why I Fit) if not in uploaded resume**

**ATS OPTIMIZATION RULES:**
- Target 90%+ keyword match with job description
- Use simple, ATS-safe formatting (no tables, icons, images)
- Include both acronyms and full terms (e.g., "AI (Artificial Intelligence)")
- Use standard section headings (SUMMARY, EXPERIENCE, SKILLS, EDUCATION, PROJECTS)
- Prioritize content that directly relates to job requirements
- Keep content concise to fit ONE PAGE ONLY

**AUTO-GENERATION RULES:**
If the uploaded resume does NOT contain these sections, generate them:
- Achievements: 3 achievements (max 100 chars each) based on experience and job requirements
- Leadership Positions: 2 leadership roles (max 110 chars each) derived from experience or inferred
- Why I Fit This Role: 3 reasons (max 100 chars each) matching job description to candidate's background

**OUTPUT FORMAT:**
Return ONLY valid JSON with this exact structure (no markdown, no code blocks):
{
  "contactInfo": {
    "name": "Full Name (max 50 chars)",
    "email": "email@example.com",
    "mobile": "phone (max 20 chars)",
    "linkedin": "LinkedIn URL or empty",
    "github": "GitHub URL or empty",
    "portfolio": "Portfolio URL or empty"
  },
  "summary": "Professional summary (EXACTLY under 200 chars) for ${companyName} ${jobRole}",
  "skills": "Comma-separated skills (EXACTLY under 300 chars total)",
  "experience": [
    {
      "title": "Job Title (max 60 chars)",
      "organization": "Company (max 60 chars)",
      "startDate": "MM/YYYY",
      "endDate": "MM/YYYY or Present",
      "current": true or false,
      "description": "3 bullets max 120 chars each (TOTAL under 360 chars):\\n• Bullet 1\\n• Bullet 2\\n• Bullet 3"
    }
  ],
  "projects": [
    {
      "title": "Project (max 60 chars)",
      "organization": "Context (max 60 chars)",
      "startDate": "MM/YYYY",
      "endDate": "MM/YYYY or Present",
      "current": true or false,
      "description": "2 bullets max 110 chars each (TOTAL under 220 chars):\\n• Bullet 1\\n• Bullet 2"
    }
  ],
  "education": [
    {
      "title": "Degree (max 60 chars)",
      "organization": "University (max 60 chars)",
      "startDate": "MM/YYYY",
      "endDate": "MM/YYYY or Present",
      "current": true or false,
      "description": "Coursework/GPA (under 220 chars)"
    }
  ],
  "achievements": "3 achievements (max 100 chars each, TOTAL under 300 chars):\\n• Achievement 1\\n• Achievement 2\\n• Achievement 3",
  "positions": "2 leadership roles (max 110 chars each, TOTAL under 220 chars):\\n• Position 1\\n• Position 2",
  "whyIFit": "3 reasons (max 100 chars each, TOTAL under 300 chars):\\n• Reason 1\\n• Reason 2\\n• Reason 3",
  "atsScore": 85-95 (realistic score),
  "matchedKeywords": ["keyword1", "keyword2"],
  "optimizationNotes": "Brief explanation of optimizations"
}

**VERIFICATION BEFORE OUTPUT:**
Before returning JSON, verify:
- Summary length <= 200 chars
- Skills length <= 300 chars
- Each experience description <= 360 chars
- Each project description <= 220 chars
- Achievements <= 300 chars
- Positions <= 220 chars
- WhyIFit <= 300 chars
- Experience entries <= 3
- Project entries <= 3
- Education entries <= 2

Generate the optimized resume now:`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    // Clean and parse JSON response
    let cleanedResponse = responseText;
    
    // Remove markdown code blocks if present
    if (cleanedResponse.includes('```json')) {
      cleanedResponse = cleanedResponse.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    } else if (cleanedResponse.includes('```')) {
      cleanedResponse = cleanedResponse.replace(/```\s*/g, '');
    }
    
    cleanedResponse = cleanedResponse.trim();

    let generatedResume;
    try {
      generatedResume = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      console.log("Response text:", responseText);
      
      return NextResponse.json(
        { 
          error: "Failed to generate resume. AI response format error.", 
          details: "The AI service returned an unexpected format. Please try again."
        },
        { status: 500 }
      );
    }

    // Validate required fields
    if (!generatedResume.contactInfo || !generatedResume.summary) {
      return NextResponse.json(
        { error: "Generated resume is incomplete. Please try again." },
        { status: 500 }
      );
    }

    // Ensure ATS score is within valid range
    generatedResume.atsScore = Math.min(100, Math.max(0, generatedResume.atsScore || 85));

    return NextResponse.json({
      success: true,
      resume: generatedResume
    });

  } catch (error) {
    console.error("AI Resume Generator Error:", error);
    return NextResponse.json(
      { 
        error: "Internal Server Error", 
        details: error.message 
      },
      { status: 500 }
    );
  }
}
