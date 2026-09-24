import db from "@/lib/prisma";
import { inngest } from "./client";
import { sendNotificationEmail } from "@/lib/email-service";

export const triggerAssessmentEmail = inngest.createFunction(
  { id: "send-assessment-email", name: "Send Assessment Email" },
  { event: "internship.applied" },
  async ({ event, step }) => {
    const { applicationId, email, name, domain } = event.data;

    await step.run("Send email to student", async () => {
      // In a real application, you'd generate a unique link tied to the assessment model
      const assessmentLink = `https://techiehelpinstituteofai.in/assessment?appId=${applicationId}`;
      const deadline = new Date(Date.now() + 48 * 60 * 60 * 1000).toLocaleString(); // 48 hours

      await sendNotificationEmail({
        to: email,
        subject: `Complete Your Internship Assessment - ${domain}`,
        username: name,
        heroTitle: "Internship Assessment",
        statusBadge: "PENDING",
        message: `Thank you for applying to the <strong>${domain}</strong> internship.<br/><br/>Please complete the mandatory assessment before the deadline. Your performance will determine if you are shortlisted for the program.`,
        infoCards: [
          { label: "Duration", value: "45 Minutes" },
          { label: "Deadline", value: deadline }
        ],
        buttonText: "Start Assessment",
        buttonLink: assessmentLink
      });
    });

    return { success: true, emailSentTo: email };
  }
);
