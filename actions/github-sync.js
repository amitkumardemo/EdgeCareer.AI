"use server";

import { getFirebaseUser } from "@/lib/auth-utils";
import db from "@/lib/prisma";

/**
 * GitHub API Integration for TPO Dashboard
 * 
 * Security: All GitHub API calls are server-side only.
 * GITHUB_TOKEN is never exposed to the client.
 */

const GITHUB_API_BASE = "https://api.github.com";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Rate limiting constants
const RATE_LIMIT_DELAY = 1000; // 1 second between requests
const MAX_RETRIES = 3;
const BACKOFF_MULTIPLIER = 2;

/**
 * Make a GitHub API request with rate limiting and retries
 */
async function githubRequest(endpoint, retries = 0) {
    if (!GITHUB_TOKEN) {
        throw new Error("GITHUB_TOKEN not configured in environment");
    }

    try {
        const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                Accept: "application/vnd.github.v3+json",
            },
        });

        // Handle rate limiting
        if (response.status === 403 || response.status === 429) {
            const resetTime = response.headers.get("X-RateLimit-Reset");
            const resetDate = resetTime ? new Date(parseInt(resetTime) * 1000) : null;

            if (retries < MAX_RETRIES) {
                const delay = Math.pow(BACKOFF_MULTIPLIER, retries) * RATE_LIMIT_DELAY;
                console.log(`Rate limited. Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                return githubRequest(endpoint, retries + 1);
            }

            throw new Error(`GitHub rate limit exceeded. Reset at: ${resetDate?.toISOString()}`);
        }

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`GitHub API request failed for ${endpoint}:`, error);
        throw error;
    }
}

/**
 * Verify if a GitHub username exists
 */
export async function verifyGitHubUsername(username) {
    try {
        const user = await githubRequest(`/users/${username}`);
        return {
            valid: true,
            user: {
                login: user.login,
                name: user.name,
                avatarUrl: user.avatar_url,
                bio: user.bio,
                publicRepos: user.public_repos,
                followers: user.followers,
                following: user.following,
            },
        };
    } catch (error) {
        return {
            valid: false,
            error: error.message,
        };
    }
}

/**
 * Fetch GitHub activity for a user
 * Returns commits, PRs, issues, and other metrics
 */
export async function fetchGitHubActivity(username) {
    try {
        // Fetch user events (last 90 days of activity)
        const events = await githubRequest(`/users/${username}/events?per_page=100`);

        // Fetch user repos
        const repos = await githubRequest(`/users/${username}/repos?per_page=100&sort=updated`);

        // Process events to extract metrics
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let commits = 0;
        let pullRequests = 0;
        let issues = 0;
        let reviews = 0;
        const repositoriesSet = new Set();
        const languagesMap = {};

        // Count today's activity
        events.forEach(event => {
            const eventDate = new Date(event.created_at);
            eventDate.setHours(0, 0, 0, 0);

            if (eventDate.getTime() === today.getTime()) {
                switch (event.type) {
                    case "PushEvent":
                        commits += event.payload.commits?.length || 0;
                        repositoriesSet.add(event.repo.name);
                        break;
                    case "PullRequestEvent":
                        pullRequests++;
                        repositoriesSet.add(event.repo.name);
                        break;
                    case "IssuesEvent":
                        issues++;
                        repositoriesSet.add(event.repo.name);
                        break;
                    case "PullRequestReviewEvent":
                        reviews++;
                        break;
                }
            }
        });

        // Extract languages from repos
        repos.forEach(repo => {
            if (repo.language) {
                languagesMap[repo.language] = (languagesMap[repo.language] || 0) + 1;
            }
        });

        return {
            commits,
            pullRequests,
            issues,
            reviews,
            repositories: Array.from(repositoriesSet),
            languages: languagesMap,
            isActive: commits > 0 || pullRequests > 0 || issues > 0,
        };
    } catch (error) {
        console.error(`Failed to fetch GitHub activity for ${username}:`, error);
        throw error;
    }
}

/**
 * Sync GitHub activity for a single student
 */
export async function syncStudentGitHub(studentId) {
    const firebaseUser = await getFirebaseUser();
    if (!firebaseUser) throw new Error("Unauthorized");

    try {
        // Get student data
        const student = await db.user.findUnique({
            where: { id: studentId },
            select: { githubUsername: true, id: true },
        });

        if (!student || !student.githubUsername) {
            throw new Error("Student not found or GitHub username not set");
        }

        // Fetch GitHub activity
        const activity = await fetchGitHubActivity(student.githubUsername);

        // Store in database
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        await db.gitHubActivity.upsert({
            where: {
                userId_date: {
                    userId: student.id,
                    date: today,
                },
            },
            update: {
                commits: activity.commits,
                pullRequests: activity.pullRequests,
                issues: activity.issues,
                reviews: activity.reviews,
                repositories: JSON.stringify(activity.repositories),
                languages: JSON.stringify(activity.languages),
                isActive: activity.isActive,
                fetchedAt: new Date(),
            },
            create: {
                userId: student.id,
                date: today,
                commits: activity.commits,
                pullRequests: activity.pullRequests,
                issues: activity.issues,
                reviews: activity.reviews,
                repositories: JSON.stringify(activity.repositories),
                languages: JSON.stringify(activity.languages),
                isActive: activity.isActive,
            },
        });

        return { success: true, activity };
    } catch (error) {
        console.error(`Failed to sync GitHub for student ${studentId}:`, error);
        return { success: false, error: error.message };
    }
}

/**
 * Sync GitHub activity for all students in a college (batch processing)
 */
export async function syncAllStudents(collegeId) {
    const firebaseUser = await getFirebaseUser();
    if (!firebaseUser) throw new Error("Unauthorized");
    const userId = firebaseUser.uid;

    // Verify user is TPO of this college
    const tpo = await db.user.findUnique({
        where: { uid: userId },
        select: { role: true, collegeId: true },
    });

    if (tpo?.role !== "TPO" || tpo?.collegeId !== collegeId) {
        throw new Error("Unauthorized: Only TPO can sync college students");
    }

    // Create sync record
    const sync = await db.gitHubSync.create({
        data: {
            collegeId,
            status: "IN_PROGRESS",
        },
    });

    try {
        // Get all students with GitHub usernames
        const students = await db.user.findMany({
            where: {
                collegeId,
                role: "STUDENT",
                githubUsername: { not: null },
            },
            select: { id: true, githubUsername: true },
        });

        let processed = 0;
        let failed = 0;
        const errors = [];

        // Process in batches of 10 to respect rate limits
        const BATCH_SIZE = 10;
        for (let i = 0; i < students.length; i += BATCH_SIZE) {
            const batch = students.slice(i, i + BATCH_SIZE);

            await Promise.all(
                batch.map(async (student) => {
                    try {
                        await syncStudentGitHub(student.id);
                        processed++;
                    } catch (error) {
                        failed++;
                        errors.push({
                            studentId: student.id,
                            username: student.githubUsername,
                            error: error.message,
                        });
                    }
                })
            );

            // Delay between batches
            if (i + BATCH_SIZE < students.length) {
                await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_DELAY));
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

        return {
            success: true,
            processed,
            failed,
            total: students.length,
        };
    } catch (error) {
        // Update sync record with failure
        await db.gitHubSync.update({
            where: { id: sync.id },
            data: {
                status: "FAILED",
                completedAt: new Date(),
                errors: JSON.stringify([{ error: error.message }]),
            },
        });

        throw error;
    }
}

/**
 * Get cached GitHub stats for a student
 */
export async function getStudentGitHubStats(studentId, days = 30) {
    const firebaseUser = await getFirebaseUser();
    if (!firebaseUser) throw new Error("Unauthorized");

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const activities = await db.gitHubActivity.findMany({
        where: {
            userId: studentId,
            date: { gte: cutoffDate },
        },
        orderBy: { date: "desc" },
    });

    // Calculate aggregated stats
    const stats = {
        totalCommits: 0,
        totalPRs: 0,
        totalIssues: 0,
        totalReviews: 0,
        activeDays: 0,
        streak: 0,
        languages: {},
        repositories: new Set(),
    };

    let currentStreak = 0;
    let lastActiveDate = null;

    activities.forEach((activity) => {
        stats.totalCommits += activity.commits;
        stats.totalPRs += activity.pullRequests;
        stats.totalIssues += activity.issues;
        stats.totalReviews += activity.reviews;

        if (activity.isActive) {
            stats.activeDays++;

            // Calculate streak
            if (!lastActiveDate) {
                currentStreak = 1;
            } else {
                const dayDiff = Math.floor((lastActiveDate - activity.date) / (1000 * 60 * 60 * 24));
                if (dayDiff === 1) {
                    currentStreak++;
                } else {
                    stats.streak = Math.max(stats.streak, currentStreak);
                    currentStreak = 1;
                }
            }
            lastActiveDate = activity.date;
        }

        // Merge languages
        const langs = JSON.parse(activity.languages || "{}");
        Object.entries(langs).forEach(([lang, count]) => {
            stats.languages[lang] = (stats.languages[lang] || 0) + count;
        });

        // Merge repositories
        const repos = JSON.parse(activity.repositories || "[]");
        repos.forEach(repo => stats.repositories.add(repo));
    });

    stats.streak = Math.max(stats.streak, currentStreak);
    stats.repositories = Array.from(stats.repositories);

    return {
        stats,
        activities: activities.map(a => ({
            date: a.date,
            commits: a.commits,
            pullRequests: a.pullRequests,
            issues: a.issues,
            reviews: a.reviews,
            isActive: a.isActive,
        })),
    };
}
