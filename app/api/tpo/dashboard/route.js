import { NextResponse } from "next/server";
import { getFirebaseUser } from "@/lib/auth-utils";
import { db } from "@/lib/prisma";
import { calculateRankingScore } from "@/lib/ranking-algorithm";

export async function GET(req) {
    try {
        const firebaseUser = await getFirebaseUser();
        if (!firebaseUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const uid = firebaseUser.uid;

        console.log("TPO Dashboard Request for Firebase UID:", uid);

        // Verify user is TPO
        let tpo = await db.user.findUnique({
            where: { uid: uid },
            select: { id: true, role: true, collegeId: true, email: true, college: { select: { name: true } } },
        });

        console.log("TPO Initial Data:", tpo);

        if (!tpo || tpo.role !== "TPO") {
            return NextResponse.json({ error: "Unauthorized: TPO access required" }, { status: 403 });
        }

        // Auto-link TPO to college if missing
        if (!tpo.collegeId) {
            console.log("TPO has no collegeId, attempting auto-link via email domain...");
            const email = firebaseUser.email || tpo.email;

            if (email) {
                const domain = email.split("@")[1];
                console.log(`Extracting domain from TPO email (${email}): ${domain}`);

                // Find or create college
                let college = await db.college.findUnique({
                    where: { domain },
                });

                if (!college) {
                    console.log(`College not found for domain ${domain}, creating new entry...`);
                    const collegeName = domain.split(".")[0].toUpperCase();
                    college = await db.college.create({
                        data: {
                            name: collegeName,
                            domain,
                        },
                    });
                }

                console.log(`Linking TPO ${tpo.id} to college ${college.name} (${college.id})`);
                tpo = await db.user.update({
                    where: { id: tpo.id },
                    data: { collegeId: college.id },
                    select: { id: true, role: true, collegeId: true, email: true, college: { select: { name: true } } },
                });
            } else {
                console.warn("Could not find email for TPO to perform auto-link.");
            }
        }

        if (!tpo.collegeId) {
            console.warn("TPO still has no collegeId association after auto-link attempt.");
            return NextResponse.json({
                stats: { totalStudents: 0, activeStudents: 0, inactiveStudents: 0, averageScore: 0, onboardedThisMonth: 0 },
                rankedStudents: [],
                newlyOnboarded: []
            });
        }

        console.log(`Fetching students for College ID: ${tpo.collegeId}`);

        // Get all students in the college
        const students = await db.user.findMany({
            where: {
                collegeId: tpo.collegeId,
                role: "STUDENT",
            },
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
                createdAt: true,
            },
            orderBy: { createdAt: "desc" },
        });

        console.log(`Found ${students.length} students for college ${tpo.collegeId}`);

        // Get GitHub activities for all students (last 30 days)
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - 30);

        const activities = await db.gitHubActivity.findMany({
            where: {
                userId: { in: students.map(s => s.id) },
                date: { gte: cutoffDate },
            },
            orderBy: { date: "desc" },
        });

        // Calculate rankings for each student
        const rankedStudents = students.map(student => {
            const studentActivities = activities.filter(a => a.userId === student.id);
            const scores = calculateRankingScore(studentActivities);

            return {
                ...student,
                score: isNaN(scores.overallScore) ? 0 : scores.overallScore,
                commitScore: isNaN(scores.commitScore) ? 0 : scores.commitScore,
                prScore: isNaN(scores.prScore) ? 0 : scores.prScore,
                issueScore: isNaN(scores.issueScore) ? 0 : scores.issueScore,
                consistencyScore: isNaN(scores.consistencyScore) ? 0 : scores.consistencyScore,
            };
        });

        // Sort by overall score
        rankedStudents.sort((a, b) => (b.score || 0) - (a.score || 0));

        // Newly onboarded students (last 30 days, sorted by join date)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const newlyOnboarded = students
            .filter(s => new Date(s.createdAt) >= thirtyDaysAgo)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Calculate stats
        const now = new Date();
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        const recentActivities = await db.gitHubActivity.findMany({
            where: {
                userId: { in: students.map(s => s.id) },
                date: { gte: sevenDaysAgo },
                isActive: true,
            },
            distinct: ["userId"],
        });

        const totalScore = rankedStudents.reduce((sum, s) => sum + (s.score || 0), 0);
        const averageScore = students.length > 0 ? totalScore / students.length : 0;

        const stats = {
            totalStudents: students.length,
            activeStudents: recentActivities.length,
            inactiveStudents: Math.max(0, students.length - recentActivities.length),
            averageScore: isNaN(averageScore) ? 0 : Math.round(averageScore * 10) / 10,
            onboardedThisMonth: newlyOnboarded.length,
        };

        return NextResponse.json({
            stats,
            rankedStudents,
            newlyOnboarded,
            collegeName: tpo?.college?.name,
        });

    } catch (error) {
        console.error("❌ TPO Dashboard API Error:", error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
