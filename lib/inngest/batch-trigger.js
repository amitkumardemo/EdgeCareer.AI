import db from "@/lib/prisma";
import { inngest } from "./client";
import { sendBulkNotificationEmails } from "@/lib/email-service";

export const dailyBatchStarter = inngest.createFunction(
  { id: "daily-batch-starter", name: "Daily Batch Starter" },
  { cron: "0 1 * * *" }, // Run every day at 1:00 AM
  async ({ step }) => {
    
    // Find batches that should start today
    const activeBatches = await step.run("Find upcoming batches to start", async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      return await db.internshipBatch.findMany({
        where: {
          status: "UPCOMING",
          startDate: {
            gte: today,
            lt: tomorrow
          }
        },
        include: {
          program: true,
          applications: {
            where: { status: "SELECTED" },
            include: { user: true }
          }
        }
      });
    });

    for (const batch of activeBatches) {
      await step.run(`Start Batch ${batch.id}`, async () => {
        await db.internshipBatch.update({
          where: { id: batch.id },
          data: { status: "ACTIVE" }
        });

        const usersArray = batch.applications.map(app => app.user).filter(u => u && u.email);
        if (usersArray.length > 0) {
          await sendBulkNotificationEmails(
            usersArray,
            `🚀 Welcome to the ${batch.program.title} Internship!`,
            () => `<p>Your internship officially starts today!</p>
                   <p>Please log into your dashboard to access your LMS modules, view your Week 1 tasks, and join the orientation session.</p>`,
            "Go to Dashboard",
            "https://techiehelpinstituteofai.in/dashboard"
          );
        }
      });
    }

    return { startedBatches: activeBatches.length };
  }
);

// --- Phase 12: Automatic Completion Check ---
export const dailyBatchCompleter = inngest.createFunction(
  { id: "daily-batch-completer", name: "Daily Batch Completer" },
  { cron: "0 2 * * *" }, // Run every day at 2:00 AM
  async ({ step }) => {
    
    const completedBatches = await step.run("Find active batches that have ended", async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return await db.internshipBatch.findMany({
        where: {
          status: "ACTIVE",
          endDate: {
            lt: today // Passed the end date
          }
        },
        include: {
          applications: {
            where: { status: "SELECTED" },
            include: { progress: true, user: true }
          }
        }
      });
    });

    for (const batch of completedBatches) {
      await step.run(`Complete Batch ${batch.id}`, async () => {
        // 1. Mark batch as COMPLETED
        await db.internshipBatch.update({
          where: { id: batch.id },
          data: { status: "COMPLETED" }
        });

        // 2. Evaluate all students
        const passedStudents = [];
        const failedStudents = [];

        for (const app of batch.applications) {
          const score = app.progress?.performScore || 0;
          const attendancePct = app.progress?.attendancePct || 0;
          
          // Evaluation Criteria: > 60% Score & > 70% Attendance
          if (score >= 60 && attendancePct >= 70) {
            // Student has successfully graduated.
            if (app.user) passedStudents.push(app.user);
          } else {
            if (app.user) failedStudents.push(app.user);
          }
        }

        // 3. Notify Passed Students (Phase 13 setup)
        if (passedStudents.length > 0) {
          await sendBulkNotificationEmails(
            passedStudents,
            `🎓 Congratulations! You've Completed the Internship`,
            () => `<p>You have successfully completed your internship program!</p>
                   <p>Your final performance and attendance meet our graduation criteria.</p>
                   <p>You can now proceed to the portal to claim your Official Certificate.</p>`,
            "Claim Certificate",
            "https://techiehelpinstituteofai.in/dashboard/certificate"
          );
        }
        
        // 4. Notify Failed Students
        if (failedStudents.length > 0) {
          await sendBulkNotificationEmails(
            failedStudents,
            `Internship Completion Status Update`,
            () => `<p>Your internship batch has concluded.</p>
                   <p>Unfortunately, your performance score or attendance did not meet the minimum requirements for graduation.</p>
                   <p>Please check your dashboard for detailed feedback. We encourage you to keep learning and apply again in the future.</p>`,
            "View Dashboard",
            "https://techiehelpinstituteofai.in/dashboard"
          );
        }

      });
    }

    return { completedBatches: completedBatches.length };
  }
);
