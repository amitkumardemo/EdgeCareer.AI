import db from "@/lib/prisma";
import { inngest } from "./client";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const aiTaskReview = inngest.createFunction(
  { id: "ai-task-review", name: "AI Task Review" },
  { event: "internship.task.submitted" },
  async ({ event, step }) => {
    const { submissionId } = event.data;

    // 1. Fetch Submission Data
    const submission = await step.run("Fetch submission data", async () => {
      return await db.taskSubmission.findUnique({
        where: { id: submissionId },
        include: {
          task: true,
          application: {
            include: { user: true, batch: { include: { program: true } } }
          }
        }
      });
    });

    if (!submission) return { success: false, error: "Submission not found" };
    if (submission.status !== "PENDING") return { success: false, error: "Already evaluated" };

    // 2. Perform AI Review
    const aiFeedback = await step.run("Evaluate via Gemini", async () => {
      const prompt = `
        You are an AI Code Reviewer and Mentor for an internship program in ${submission.application.batch.program.domain}.
        
        Task Title: ${submission.task.title}
        Task Description: ${submission.task.description}
        
        Student's Submission Link / Data: ${submission.fileUrl || "Not provided"}
        Student's Notes: ${submission.notes || "None"}
        
        Please evaluate this submission. If the submission is a link, deduce what you can from the URL structure or assume standard structure based on the notes. 
        Focus on:
        1. Whether they followed the task instructions.
        2. Potential edge cases or best practices they might have missed.
        3. Overall quality suggestions.
        
        Write a concise, encouraging review meant for the Mentor to see as "AI Suggestions".
        Do not output JSON, just plain text markdown.
      `;

      try {
        const result = await model.generateContent(prompt);
        return result.response.text();
      } catch (error) {
        console.error("Gemini API Error:", error);
        return "AI Review could not be completed at this time due to an API error.";
      }
    });

    // 3. Save AI Feedback to DB
    await step.run("Save AI Feedback", async () => {
      const newFeedback = `🤖 [AI Suggestions]:\n${aiFeedback}\n\n---\nMentor Feedback:\n(Pending)`;
      
      await db.taskSubmission.update({
        where: { id: submissionId },
        data: {
          feedback: newFeedback
        }
      });
    });

    return { success: true, submissionId };
  }
);
