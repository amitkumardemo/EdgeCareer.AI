"use server";

import prisma from "@/lib/prisma";
import { getStudentProfile } from "./internship-student";
import { requireAdmin } from "./internship-admin";
import { revalidatePath } from "next/cache";
import { sendNotificationEmail } from "@/lib/email-service";

/**
 * Creates a new leave request for the logged-in user.
 */
export async function createLeaveRequest(data) {
  const user = await getStudentProfile();
  
  const leave = await prisma.leaveRequest.create({
    data: {
      userId: user.id,
      batchId: data.batchId,
      fullName: data.fullName,
      email: data.email,
      contactNumber: data.contactNumber,
      department: data.department || user.branch || null,
      leaveType: data.leaveType,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      reason: data.reason,
      workHandover: data.workHandover,
      attachmentUrl: data.attachmentUrl || null,
      status: "PENDING",
    },
  });

  revalidatePath("/internship/student/leave");
  return leave;
}

/**
 * Fetches all leave requests for the logged-in user.
 */
export async function getMyLeaveRequests() {
  const user = await getStudentProfile();
  return prisma.leaveRequest.findMany({
    where: { userId: user.id },
    include: { batch: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Admin: Fetches all leave requests with optional filters.
 */
export async function getLeaveRequests(filters = {}) {
  await requireAdmin();
  
  const where = {};
  if (filters.status) where.status = filters.status;
  if (filters.leaveType) where.leaveType = filters.leaveType;
  
  if (filters.startDate && filters.endDate) {
    where.startDate = {
      gte: new Date(filters.startDate),
      lte: new Date(filters.endDate),
    };
  }

  return prisma.leaveRequest.findMany({
    where,
    include: {
      user: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
        }
      },
      batch: { select: { name: true } }
    },
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Admin: Updates the status of a leave request.
 */
export async function updateLeaveStatus(requestId, status, adminNotes = "") {
  await requireAdmin();
  
  const leave = await prisma.leaveRequest.update({
    where: { id: requestId },
    data: { 
      status,
      adminNotes,
    },
    include: {
      user: { select: { email: true, name: true } },
    }
  });

  try {
    if (leave.user?.email && (status === "APPROVED" || status === "REJECTED")) {
      const isApproved = status === "APPROVED";
      await sendNotificationEmail({
        to: leave.user.email,
        subject: `📅 Leave Request ${isApproved ? "Approved" : "Rejected"} - TechieHelp`,
        username: leave.user.name,
        message: `Your leave request from <strong>${new Date(leave.startDate).toLocaleDateString("en-IN")}</strong> to <strong>${new Date(leave.endDate).toLocaleDateString("en-IN")}</strong> has been <strong>${status}</strong>.<br/><br/>${adminNotes ? `<strong>Admin Notes:</strong> ${adminNotes}` : ""}`,
        buttonText: "View Dashboard"
      });
    }
  } catch(e) {}

  revalidatePath("/internship/admin/leave");
  return leave;
}

/**
 * Admin: Simple dashboard stats for leave requests.
 */
export async function getLeaveStats() {
  await requireAdmin();
  
  const [total, pending, approved, rejected] = await Promise.all([
    prisma.leaveRequest.count(),
    prisma.leaveRequest.count({ where: { status: "PENDING" } }),
    prisma.leaveRequest.count({ where: { status: "APPROVED" } }),
    prisma.leaveRequest.count({ where: { status: "REJECTED" } }),
  ]);

  return { total, pending, approved, rejected };
}
