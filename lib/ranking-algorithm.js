/**
 * Intelligent Ranking Algorithm for TPO Dashboard
 * 
 * Calculates composite scores based on:
 * - Commit consistency (weighted by recency)
 * - PR quality (merged vs open)
 * - Issue engagement
 * - Contribution frequency
 * - Active day streaks
 */

/**
 * Calculate commit score with recency weighting
 * Recent commits are weighted higher
 */
function calculateCommitScore(activities) {
    if (!activities || activities.length === 0) return 0;

    let totalScore = 0;
    const now = new Date();

    activities.forEach((activity, index) => {
        const daysSinceActivity = Math.floor((now - new Date(activity.date)) / (1000 * 60 * 60 * 24));

        // Recency weight: exponential decay (0.95^days)
        const recencyWeight = Math.pow(0.95, daysSinceActivity);

        // Commit score: number of commits * recency weight
        const commitScore = activity.commits * recencyWeight;

        totalScore += commitScore;
    });

    // Normalize to 0-100 scale (assuming max 50 commits/day is exceptional)
    return Math.min(100, (totalScore / activities.length) * 2);
}

/**
 * Calculate PR score based on quantity and quality
 */
function calculatePRScore(activities) {
    if (!activities || activities.length === 0) return 0;

    const totalPRs = activities.reduce((sum, a) => sum + a.pullRequests, 0);

    // Normalize: 1 PR per week is good, 2+ is excellent
    const avgPRsPerWeek = (totalPRs / activities.length) * 7;

    return Math.min(100, avgPRsPerWeek * 50);
}

/**
 * Calculate issue engagement score
 */
function calculateIssueScore(activities) {
    if (!activities || activities.length === 0) return 0;

    const totalIssues = activities.reduce((sum, a) => sum + a.issues, 0);
    const totalReviews = activities.reduce((sum, a) => sum + a.reviews, 0);

    // Combined score for issues and reviews
    const avgIssuesPerWeek = (totalIssues / activities.length) * 7;
    const avgReviewsPerWeek = (totalReviews / activities.length) * 7;

    const issueScore = Math.min(50, avgIssuesPerWeek * 25);
    const reviewScore = Math.min(50, avgReviewsPerWeek * 25);

    return issueScore + reviewScore;
}

/**
 * Calculate consistency score based on active days and streaks
 */
function calculateConsistencyScore(activities) {
    if (!activities || activities.length === 0) return 0;

    const activeDays = activities.filter(a => a.isActive).length;
    const totalDays = activities.length;

    // Activity rate (0-70 points)
    const activityRate = (activeDays / totalDays) * 70;

    // Calculate longest streak (0-30 points)
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
    });
    longestStreak = Math.max(longestStreak, currentStreak);

    // Streak score: 7-day streak = 15 points, 30-day = 30 points
    const streakScore = Math.min(30, (longestStreak / 30) * 30);

    return activityRate + streakScore;
}

/**
 * Calculate overall composite score
 * 
 * Weights:
 * - Commits: 35%
 * - PRs: 25%
 * - Issues/Reviews: 20%
 * - Consistency: 20%
 */
export function calculateRankingScore(activities) {
    if (!activities || activities.length === 0) {
        return {
            commitScore: 0,
            prScore: 0,
            issueScore: 0,
            consistencyScore: 0,
            overallScore: 0,
        };
    }

    const commitScore = calculateCommitScore(activities);
    const prScore = calculatePRScore(activities);
    const issueScore = calculateIssueScore(activities);
    const consistencyScore = calculateConsistencyScore(activities);

    const overallScore =
        (commitScore * 0.35) +
        (prScore * 0.25) +
        (issueScore * 0.20) +
        (consistencyScore * 0.20);

    return {
        commitScore: Math.round(commitScore * 10) / 10,
        prScore: Math.round(prScore * 10) / 10,
        issueScore: Math.round(issueScore * 10) / 10,
        consistencyScore: Math.round(consistencyScore * 10) / 10,
        overallScore: Math.round(overallScore * 10) / 10,
    };
}

/**
 * Rank students within a college
 */
export function rankStudents(students, rankings) {
    // Sort by overall score (descending)
    const sorted = [...students].sort((a, b) => {
        const scoreA = rankings.find(r => r.userId === a.id)?.overallScore || 0;
        const scoreB = rankings.find(r => r.userId === b.id)?.overallScore || 0;
        return scoreB - scoreA;
    });

    // Assign ranks
    return sorted.map((student, index) => ({
        ...student,
        rank: index + 1,
        score: rankings.find(r => r.userId === student.id)?.overallScore || 0,
    }));
}

/**
 * Get top N students
 */
export function getTopStudents(rankedStudents, n = 10) {
    return rankedStudents.slice(0, n);
}

/**
 * Filter students by criteria
 */
export function filterStudents(students, filters) {
    let filtered = [...students];

    if (filters.branch) {
        filtered = filtered.filter(s => s.branch === filters.branch);
    }

    if (filters.year) {
        filtered = filtered.filter(s => s.year === filters.year);
    }

    if (filters.section) {
        filtered = filtered.filter(s => s.section === filters.section);
    }

    if (filters.minScore !== undefined) {
        filtered = filtered.filter(s => s.score >= filters.minScore);
    }

    if (filters.maxScore !== undefined) {
        filtered = filtered.filter(s => s.score <= filters.maxScore);
    }

    return filtered;
}
