import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { sendNotificationEmail } from "@/lib/email-service";
import { issueOfferLetter } from "@/actions/offer-letter";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req) {
  try {
    const { applicationId, mcqAnswers, codingAnswer, resumeText } = await req.json();

    if (!applicationId || !mcqAnswers || !codingAnswer) {
      return NextResponse.json({ error: "Missing required assessment data" }, { status: 400 });
    }

    const application = await prisma.internshipApplication.findUnique({
      where: { id: applicationId },
      include: {
        user: true,
        batch: { include: { program: true } },
      }
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    if (application.status !== "APPLIED") {
        return NextResponse.json({ error: "Application already processed" }, { status: 400 });
    }

    // AI Evaluation Prompt
    const prompt = `
      You are an expert technical interviewer evaluating an internship candidate for a ${application.batch.program.domain} role.
      
      Candidate's MCQ Answers (out of 10): ${mcqAnswers}
      Candidate's Coding Submission / GitHub Link / Solution: ${codingAnswer}
      Candidate's Resume Text (optional): ${resumeText || "Not provided"}
      
      Evaluate the candidate based on these inputs.
      Criteria for passing:
      1. MCQ score should be decent (e.g., > 6/10).
      2. The coding submission must show an understanding of basic programming concepts or present a valid GitHub repository link with projects related to the domain.
      
      Return a JSON response strictly in this format:
      {
        "passed": true/false,
        "score": number (0-100),
        "feedback": "Detailed feedback string explaining the decision",
        "eligibilityNotes": "Short note on their eligibility"
      }
      
      IMPORTANT: Return ONLY valid JSON, without any markdown formatting like \`\`\`json.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.candidates[0].content.parts[0].text;
    const cleanedText = responseText.replace(/```(?:json)?\n?/g, "").trim();
    
    let evaluation;
    try {
        evaluation = JSON.parse(cleanedText);
    } catch (e) {
        console.error("Failed to parse Gemini output:", cleanedText);
        throw new Error("AI returned malformed evaluation data");
    }

    const status = evaluation.passed ? "SELECTED" : "REJECTED";
    const aiFeedback = `AI Score: ${evaluation.score}/100. \nFeedback: ${evaluation.feedback} \nNotes: ${evaluation.eligibilityNotes}`;

    // Update Application Status in DB
    const updatedApplication = await prisma.internshipApplication.update({
      where: { id: applicationId },
      data: { 
        status, 
        reviewedAt: new Date(), 
        reviewNotes: aiFeedback 
      },
    });

    if (status === "SELECTED") {
      // Auto-create progress record
      const totalTasks = await prisma.internshipTask.count({ where: { batchId: application.batchId } });
      await prisma.internProgress.upsert({
        where: { applicationId },
        create: { applicationId, totalTasks },
        update: { totalTasks },
      });
      
      // Initialize offer letter record
      await prisma.offerLetter.upsert({
        where: { applicationId },
        create: { applicationId, validUntil: application.batch.endDate },
        update: {},
      });

      // Issue Offer letter PDF & send email (Phase 4 integration)
      try {
        await issueOfferLetter(applicationId);
      } catch (e) {
        console.error("Failed to auto-issue offer letter:", e);
      }
      
      // Note: The Congratulations email is effectively handled by the offer letter email logic.
      // Or we can send a specific "Shortlisted" email if the offer letter takes time.
      // We rely on issueOfferLetter to send the email as requested in Phase 4.

    } else {
      // Send Rejection / Try Again Email
      if (application.user && application.user.email) {
        await sendNotificationEmail({
          to: application.user.email,
          subject: "📝 Assessment Results - TechieHelp Internship",
          username: application.user.name,
          heroTitle: "Assessment Results",
          statusBadge: "FAILED",
          message: `Thank you for completing the assessment for the <strong>${application.batch.program.title}</strong> program. <br/><br/>Unfortunately, you did not meet the required criteria to be shortlisted for this batch.<br/><br/><strong>Feedback:</strong> ${evaluation.feedback}<br/><br/>You may apply again after improving your skills. Keep learning!`,
          buttonText: "Explore Free Resources",
          buttonLink: "https://techiehelpinstituteofai.in"
        });
      }
    }

    return NextResponse.json({ 
        success: true, 
        passed: evaluation.passed, 
        score: evaluation.score,
        feedback: evaluation.feedback
    }, { status: 200 });

  } catch (error) {
    console.error("Error evaluating assessment:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
