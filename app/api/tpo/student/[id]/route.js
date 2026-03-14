import { NextResponse } from "next/server";
import { getFirebaseUser } from "@/lib/auth-utils";
import { db } from "@/lib/prisma";
import { calculateRankingScore } from "@/lib/ranking-algorithm";

export async function GET(req, { params }) {
    try {
        const firebaseUser = await getFirebaseUser();
        if (!firebaseUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const uid = firebaseUser.uid;

        // Verify user is TPO
        const tpo = await db.user.findUnique({
            where: { uid: uid },
            select: { role: true, collegeId: true },
        });

        if (tpo?.role !== "TPO") {
            return NextResponse.json({ error: "Unauthorized: TPO access required" }, { status: 403 });
        }

        const studentId = params.id;

        // Get student data
        const student = await db.user.findUnique({
            where: { id: studentId },
            select: {
                id: true,
                name: true,
                email: true,
                branch: true,
                year: true,
                section: true,
                rollNumber: true,
                githubUsername: true,
                leetcodeUsername: true,
                imageUrl: true,
                collegeId: true,
            },
        });

        if (!student || student.collegeId !== tpo.collegeId) {
            return NextResponse.json({ error: "Student not found" }, { status: 404 });
        }

        // Get GitHub activities (last 30 days)
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - 30);

        const activities = await db.gitHubActivity.findMany({
            where: {
                userId: studentId,
                date: { gte: cutoffDate },
            },
            orderBy: { date: "desc" },
        });

        // Calculate GitHub stats
        const githubStats = {
            totalCommits: activities.reduce((sum, a) => sum + a.commits, 0),
            totalPRs: activities.reduce((sum, a) => sum + a.pullRequests, 0),
            totalIssues: activities.reduce((sum, a) => sum + a.issues, 0),
            totalReviews: activities.reduce((sum, a) => sum + a.reviews, 0),
            activeDays: activities.filter(a => a.isActive).length,
            streak: 0,
            longestStreak: 0,
            languages: {},
            repositories: new Set(),
        };

        // Calculate streaks
        let currentStreak = 0;
        let longestStreak = 0;
        let lastDate = null;

        activities.forEach((activity) => {
            if (activity.isActive) {
                if (!lastDate) {
                    currentStreak = 1;
                } else {
                    const dayDiff = Math.floor((lastDate - new Date(activity.date)) / (1000 * 60 * 60 * 24));
                    if (dayDiff === 1) {
                        currentStreak++;
                    } else {
                        longestStreak = Math.max(longestStreak, currentStreak);
                        currentStreak = 1;
                    }
                }
                lastDate = new Date(activity.date);
            }

            // Merge languages
            const langs = JSON.parse(activity.languages || "{}");
            Object.entries(langs).forEach(([lang, count]) => {
                githubStats.languages[lang] = (githubStats.languages[lang] || 0) + count;
            });

            // Merge repositories
            const repos = JSON.parse(activity.repositories || "[]");
            repos.forEach(repo => githubStats.repositories.add(repo));
        });

        githubStats.streak = currentStreak;
        githubStats.longestStreak = Math.max(longestStreak, currentStreak);
        githubStats.repositories = Array.from(githubStats.repositories);

        // Prepare activity history for chart
        const activityHistory = activities.map(a => ({
            date: new Date(a.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            commits: a.commits,
            prs: a.pullRequests,
            issues: a.issues,
        })).reverse();

        // Calculate ranking scores
        const scores = calculateRankingScore(activities);

        // Get student's rank among all students
        const allStudents = await db.user.findMany({
            where: {
                collegeId: tpo.collegeId,
                role: "STUDENT",
            },
            select: { id: true },
        });

        const allActivities = await db.gitHubActivity.findMany({
            where: {
                userId: { in: allStudents.map(s => s.id) },
                date: { gte: cutoffDate },
            },
        });

        const rankedStudents = allStudents.map(s => {
            const studentActivities = allActivities.filter(a => a.userId === s.id);
            const studentScores = calculateRankingScore(studentActivities);
            return {
                id: s.id,
                score: studentScores.overallScore,
            };
        });

        rankedStudents.sort((a, b) => b.score - a.score);
        const rank = rankedStudents.findIndex(s => s.id === studentId) + 1;

        // Fetch LeetCode stats (mock for now - would integrate with LeetCode API)
        let leetcodeStats = null;
        if (student.leetcodeUsername) {
            // In production, you would call LeetCode API here
            // For now, return mock data
            leetcodeStats = {
                easy: Math.floor(Math.random() * 100),
                medium: Math.floor(Math.random() * 80),
                hard: Math.floor(Math.random() * 30),
            };
        }

        return NextResponse.json({
            student,
            githubStats,
            leetcodeStats,
            activityHistory,
            ranking: {
                rank,
                score: scores.overallScore,
                commitScore: scores.commitScore,
                prScore: scores.prScore,
                issueScore: scores.issueScore,
                consistencyScore: scores.consistencyScore,
            },
        });
    } catch (error) {
        console.error("Student profile error:", error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
