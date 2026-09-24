import db from "@/lib/prisma";
import { inngest } from "./client";
import { sendBulkNotificationEmails } from "@/lib/email-service";

export const weeklyAutomationJob = inngest.createFunction(
  { id: "weekly-automation", name: "Weekly Automation & Attendance" },
  { cron: "0 9 * * 1" }, // Run every Monday at 9:00 AM
  async ({ step }) => {
    
    // 1. Fetch active batches
    const activeBatches = await step.run("Fetch active batches", async () => {
      return await db.internshipBatch.findMany({
        where: { status: "ACTIVE" },
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
      await step.run(`Process batch ${batch.id}`, async () => {
        const today = new Date();
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);

        // --- Phase 9: Weekly Task Release Notification ---
        // Find tasks due in the next 7 days
        const upcomingTasks = await db.internshipTask.findMany({
          where: {
            batchId: batch.id,
            dueDate: {
              gte: today,
              lt: nextWeek
            }
          }
        });

        if (upcomingTasks.length > 0) {
          const task = upcomingTasks[0]; // Usually one task per week
          
          // Send notification email
          const usersArray = batch.applications.map(app => app.user).filter(u => u && u.email);
          if (usersArray.length > 0) {
            await sendBulkNotificationEmails(
              usersArray,
              `📌 New Week, New Task: ${task.title}`,
              () => `<p>Your task for this week has been officially released!</p>
                     <p><strong>Task:</strong> ${task.title}</p>
                     <p><strong>Deadline:</strong> ${new Date(task.dueDate).toLocaleDateString()}</p>
                     <p>Log in to your dashboard to view the instructions and submit your work.</p>`,
              "View Dashboard",
              "https://techiehelpinstituteofai.in/dashboard"
            );
          }

          // Create a Dashboard Announcement for the Batch
          await db.announcement.create({
            data: {
              title: `Week Task Released: ${task.title}`,
              content: `Your new task is due on ${new Date(task.dueDate).toLocaleDateString()}. Make sure to complete it on time!`,
              batchId: batch.id,
              isGlobal: false
            }
          });
        }

        // --- Phase 10: Weekly Attendance Tracking ---
        // We evaluate attendance for the *previous* week based on task submissions.
        // Find tasks that were due in the past 7 days
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);

        const pastTasks = await db.internshipTask.findMany({
          where: {
            batchId: batch.id,
            dueDate: {
              gte: lastWeek,
              lt: today
            }
          }
        });

        if (pastTasks.length > 0) {
          const pastTask = pastTasks[0];
          
          for (const app of batch.applications) {
            // Check if student submitted this task
            const submission = await db.taskSubmission.findUnique({
              where: {
                applicationId_taskId: {
                  applicationId: app.id,
                  taskId: pastTask.id
                }
              }
            });

            // Mark Attendance
            await db.attendanceRecord.create({
              data: {
                applicationId: app.id,
                date: new Date(), // Marked today for the previous week
                status: submission ? "PRESENT" : "ABSENT"
              }
            });
            
            // If absent, we could also send a warning email here.
            if (!submission && app.user?.email) {
              await sendBulkNotificationEmails(
                [app.user],
                `⚠️ Missed Deadline & Absent Warning`,
                () => `<p>You missed the deadline for <strong>${pastTask.title}</strong>.</p>
                       <p>As a result, you have been marked <strong>ABSENT</strong> for the previous week.</p>
                       <p>Consistent absences will negatively impact your final completion certificate.</p>`,
                "Submit Late Task",
                "https://techiehelpinstituteofai.in/dashboard"
              );
            }
          }
        }

      });
    }

    return { processedBatches: activeBatches.length };
  }
);
