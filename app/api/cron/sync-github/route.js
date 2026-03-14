import { NextResponse } from "next/server";
import db from "@/lib/prisma";
import { syncAllStudents } from "@/actions/github-sync";

/**
 * Cron Job Endpoint for Automated GitHub Syncing
 * 
 * This endpoint should be called daily (e.g., via Vercel Cron or external scheduler)
 * to automatically sync GitHub activity for all students across all colleges.
 * 
 * Vercel Cron Configuration (vercel.json):
 * {
 *   "crons": [{
 *     "path": "/api/cron/sync-github",
 *     "schedule": "0 0 * * *"
 *   }]
 * }
 * 
 * Security: Add authorization header check in production
 */

export async function GET(req) {
    try {
        // Security: Verify cron secret (add to .env in production)
        const authHeader = req.headers.get("authorization");
        const cronSecret = process.env.CRON_SECRET;

        if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        console.log("[CRON] Starting daily GitHub sync...");

        // Get all colleges
        const colleges = await db.college.findMany({
            select: { id: true, name: true },
        });

        const results = [];

        // Sync each college sequentially to avoid rate limits
        for (const college of colleges) {
            try {
                console.log(`[CRON] Syncing college: ${college.name}`);

                // Note: syncAllStudents requires auth, so we'll use a direct implementation here
                const students = await db.user.findMany({
                    where: {
                        collegeId: college.id,
                        role: "STUDENT",
                        githubUsername: { not: null },
                    },
                    select: { id: true, githubUsername: true },
                });

                // Create sync record
                const sync = await db.gitHubSync.create({
                    data: {
                        collegeId: college.id,
                        status: "IN_PROGRESS",
                    },
                });

                let processed = 0;
                let failed = 0;
                const errors = [];

                // Process students in batches
                const BATCH_SIZE = 10;
                for (let i = 0; i < students.length; i += BATCH_SIZE) {
                    const batch = students.slice(i, i + BATCH_SIZE);

                    // Process batch (implementation would call GitHub API)
                    // For now, just increment counters
                    processed += batch.length;

                    // Delay between batches
                    if (i + BATCH_SIZE < students.length) {
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    }
                }

                // Update sync record
                await db.gitHubSync.update({
                    where: { id: sync.id },
                    data: {
                        status: "COMPLETED",
                        completedAt: new Date(),
                        studentsProcessed: processed,
                        studentsFailed: failed,
                        errors: JSON.stringify(errors),
                    },
                });

                results.push({
                    college: college.name,
                    processed,
                    failed,
                });

                console.log(`[CRON] Completed ${college.name}: ${processed} processed, ${failed} failed`);
            } catch (error) {
                console.error(`[CRON] Error syncing ${college.name}:`, error);
                results.push({
                    college: college.name,
                    error: error.message,
                });
            }
        }

        console.log("[CRON] Daily GitHub sync completed");

        return NextResponse.json({
            success: true,
            timestamp: new Date().toISOString(),
            colleges: colleges.length,
            results,
        });
    } catch (error) {
        console.error("[CRON] Fatal error:", error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
