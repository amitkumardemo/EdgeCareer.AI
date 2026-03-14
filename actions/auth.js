"use server";

import prisma from "@/lib/prisma";
import { headers } from "next/headers";

/**
 * Fetches the user's role and ID from the database based on their Firebase UID.
 */
export async function getUserRole(uid) {
  if (!uid) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { uid },
      select: {
        id: true,
        role: true,
        email: true,
      }
    });
    return user;
  } catch (error) {
    console.error("Error fetching user role:", error);
    return null;
  }
}

/**
 * Logs a successful login activity.
 */
export async function logLoginActivity(userId) {
  if (!userId) return;

  try {
    const headerList = await headers();
    const ip = headerList.get("x-forwarded-for") || "unknown";
    const userAgent = headerList.get("user-agent") || "unknown";

    await prisma.loginLog.create({
      data: {
        userId,
        ipAddress: ip,
        userAgent: userAgent,
      }
    });

    // Also update lastActivity on User
    await prisma.user.update({
      where: { id: userId },
      data: { lastActivity: new Date() }
    });
  } catch (error) {
    console.error("Error logging login activity:", error);
  }
}
