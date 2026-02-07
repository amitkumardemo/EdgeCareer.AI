"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const BADGES = {
  first_quiz: "First Quiz Completed",
  first_roadmap: "First Roadmap Generated",
  first_resume: "Resume Builder",
  first_cover_letter: "Cover Letter Creator",
  quiz_master: "Quiz Master (5 quizzes)",
  roadmap_explorer: "Roadmap Explorer (3 roadmaps)",
  streak_7: "Week Warrior (7 day streak)",
  level_5: "Level 5 Achiever",
};

const POINTS = {
  quiz_completed: 50,
  roadmap_generated: 30,
  resume_created: 40,
  cover_letter_created: 20,
};

export async function updateGamification(actionType) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const pointsEarned = POINTS[actionType] || 0;
  const newPoints = user.points + pointsEarned;
  const newLevel = Math.floor(newPoints / 100) + 1;

  // Calculate streak
  const now = new Date();
  const lastActivity = user.lastActivity ? new Date(user.lastActivity) : null;
  let newStreak = user.streak;

  if (!lastActivity) {
    newStreak = 1;
  } else {
    const diffTime = now.getTime() - lastActivity.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      newStreak += 1;
    } else if (diffDays > 1) {
      newStreak = 1;
    }
    // If same day, keep streak
  }

  // Check for new badges
  // Parse badges from JSON string
  const currentBadges = typeof user.badges === 'string' ? JSON.parse(user.badges) : user.badges;
  const newBadges = [...currentBadges];
  const earnedBadges = [];

  // Action-based badges
  if (actionType === 'quiz_completed' && !newBadges.includes(BADGES.first_quiz)) {
    newBadges.push(BADGES.first_quiz);
    earnedBadges.push({ name: BADGES.first_quiz, description: "Completed your first technical quiz!" });
  }
  if (actionType === 'roadmap_generated' && !newBadges.includes(BADGES.first_roadmap)) {
    newBadges.push(BADGES.first_roadmap);
    earnedBadges.push({ name: BADGES.first_roadmap, description: "Generated your first career roadmap!" });
  }
  if (actionType === 'resume_created' && !newBadges.includes(BADGES.first_resume)) {
    newBadges.push(BADGES.first_resume);
    earnedBadges.push({ name: BADGES.first_resume, description: "Created your first professional resume!" });
  }
  if (actionType === 'cover_letter_created' && !newBadges.includes(BADGES.first_cover_letter)) {
    newBadges.push(BADGES.first_cover_letter);
    earnedBadges.push({ name: BADGES.first_cover_letter, description: "Generated your first cover letter!" });
  }

  // Level-based
  if (newLevel >= 5 && !newBadges.includes(BADGES.level_5)) {
    newBadges.push(BADGES.level_5);
    earnedBadges.push({ name: BADGES.level_5, description: "Reached Level 5 - Keep going!" });
  }

  // Streak-based
  if (newStreak >= 7 && !newBadges.includes(BADGES.streak_7)) {
    newBadges.push(BADGES.streak_7);
    earnedBadges.push({ name: BADGES.streak_7, description: "Maintained a 7-day streak - Amazing consistency!" });
  }

  // Always give a success badge for the action
  if (actionType === 'quiz_completed') {
    earnedBadges.push({ name: "Quiz Completed", description: "Great job finishing the quiz! Keep learning." });
  } else if (actionType === 'roadmap_generated') {
    earnedBadges.push({ name: "Roadmap Generated", description: "Your career path is taking shape!" });
  } else if (actionType === 'resume_created') {
    earnedBadges.push({ name: "Resume Saved", description: "Your resume is ready to impress!" });
  } else if (actionType === 'cover_letter_created') {
    earnedBadges.push({ name: "Cover Letter Generated", description: "Tailored cover letter created successfully!" });
  }

  // Update user
  await db.user.update({
    where: { clerkUserId: userId },
    data: {
      points: newPoints,
      level: newLevel,
      badges: JSON.stringify(newBadges), // Store as JSON string
      streak: newStreak,
      lastActivity: now,
    },
  });

  return {
    points: newPoints,
    level: newLevel,
    badges: newBadges,
    streak: newStreak,
    earnedBadges, // New badges earned in this update
  };
}

export async function getUserGamification() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: {
      points: true,
      level: true,
      badges: true,
      streak: true,
      lastActivity: true,
    },
  });

  if (!user) throw new Error("User not found");

  // Parse badges from JSON string
  return {
    ...user,
    badges: typeof user.badges === 'string' ? JSON.parse(user.badges) : user.badges,
  };
}
