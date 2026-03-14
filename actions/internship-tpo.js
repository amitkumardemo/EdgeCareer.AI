"use server";

import prisma from "@/lib/prisma";
import { getFirebaseUser } from "@/lib/auth-utils";

async function getCollegeTpo() {
  const firebaseUser = await getFirebaseUser();
  if (!firebaseUser) return null;
  
  const user = await prisma.user.findUnique({
    where: { uid: firebaseUser.uid },
    include: { college: true }
  });
  
  if (!user || (user.role !== "TPO" && user.role !== "ADMIN")) {
    return null;
  }
  
  return user;
}

export async function getTpoDashboardStats() {
  const tpo = await getCollegeTpo();
  if (!tpo) return null;
  
  // Either specific college binding OR matching domain email
  const domain = tpo.email.split("@")[1];
  
  let studentsQuery = {};
  if (tpo.collegeId) {
    studentsQuery = { collegeId: tpo.collegeId };
  } else {
    studentsQuery = { email: { endsWith: `@${domain}` }, role: "STUDENT" };
  }

  // All students from this college
  const students = await prisma.user.findMany({
    where: studentsQuery,
    select: { id: true, name: true, branch: true }
  });
  
  const studentIds = students.map(s => s.id);

  // Applications from these students
  const applications = await prisma.internshipApplication.findMany({
    where: { userId: { in: studentIds } },
    include: {
      user: { select: { id: true, name: true, branch: true } },
      batch: { include: { program: true } },
      progress: true
    }
  });

  const totalStudents = studentIds.length;
  const totalApplied = new Set(applications.map(a => a.userId)).size;
  const activeInterns = applications.filter(a => a.status === "SELECTED" && !a.progress?.completed).length;
  const completedInternships = applications.filter(a => a.progress?.completed).length;

  return {
    tpoName: tpo.name,
    collegeName: tpo.college?.name || domain.toUpperCase(),
    totalStudents,
    totalApplied,
    activeInterns,
    completedInternships,
    applications
  };
}
