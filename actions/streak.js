"use server";

import db from "@/lib/prisma";
import { getFirebaseUser } from "@/lib/auth-utils";
import { checkUser } from "@/lib/checkUser";

export async function updateUserStreak() {
  const firebaseUser = await getFirebaseUser();
  if (!firebaseUser) throw new Error("Unauthorized");
  const userId = firebaseUser.uid;

  let user = await db.user.findUnique({
    where: { uid: userId },
  });

  if (!user) {
    user = await checkUser();
  }

  if (!user) throw new Error("User not found");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastStreakDate = user.lastStreakDate ? new Date(user.lastStreakDate) : null;
  const streakStartDate = user.streakStartDate ? new Date(user.streakStartDate) : null;

  let newStreak = user.streak;
  let newLastStreakDate = user.lastStreakDate;
  let newStreakStartDate = user.streakStartDate;

  if (!lastStreakDate) {
    // First time activity
    newStreak = 1;
    newLastStreakDate = today;
    newStreakStartDate = today;
  } else {
    const daysSinceLastActivity = Math.floor((today - lastStreakDate) / (1000 * 60 * 60 * 24));

    if (daysSinceLastActivity === 1) {
      // Consecutive day
      newStreak = user.streak + 1;
      newLastStreakDate = today;
    } else if (daysSinceLastActivity === 0) {
      // Same day, no change
      return { streak: user.streak, isNewDay: false };
    } else {
      // Streak broken
      newStreak = 1;
      newLastStreakDate = today;
      newStreakStartDate = today;
    }
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      streak: newStreak,
      lastStreakDate: newLastStreakDate,
      streakStartDate: newStreakStartDate,
      lastActivity: new Date(),
    },
  });

  // Note: revalidatePath removed - caller should handle revalidation if needed
  return { streak: newStreak, isNewDay: true };
}

export async function getUserStreak() {
  const firebaseUser = await getFirebaseUser();
  if (!firebaseUser) return { streak: 0, lastStreakDate: null };
  const userId = firebaseUser.uid;

  const user = await db.user.findUnique({
    where: { uid: userId },
    select: {
      streak: true,
      lastStreakDate: true,
      streakStartDate: true,
    },
  });

  return user || { streak: 0, lastStreakDate: null, streakStartDate: null };
}

export async function getStreakCalendar() {
  const firebaseUser = await getFirebaseUser();
  if (!firebaseUser) return [];
  const userId = firebaseUser.uid;

  const user = await db.user.findUnique({
    where: { uid: userId },
    select: {
      streakStartDate: true,
      lastStreakDate: true,
      streak: true,
    },
  });

  if (!user || !user.streakStartDate) return [];

  const startDate = new Date(user.streakStartDate);
  const endDate = new Date(user.lastStreakDate || startDate);
  const calendar = [];

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    calendar.push({
      date: new Date(d),
      active: true,
    });
  }

  return calendar;
}
