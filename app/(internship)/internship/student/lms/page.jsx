import { getFirebaseUser } from "@/lib/auth-utils";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import LmsClientView from "@/components/internship/LmsClientView";
import { getStudentLmsProgress } from "@/actions/internship-lms";

export const metadata = {
  title: "Course LMS | TechieHelp",
  description: "Internship Learning Management System",
};

export default async function StudentLmsPage() {
  const firebaseUser = await getFirebaseUser();
  if (!firebaseUser) redirect("/sign-in");

  const dbUser = await prisma.user.findUnique({
    where: { uid: firebaseUser.uid }
  });
  if (!dbUser) redirect("/sign-in");

  // Get active application
  const application = await prisma.internshipApplication.findFirst({
    where: { userId: dbUser.id, status: "SELECTED" },
    include: { batch: true },
    orderBy: { appliedAt: "desc" },
  });

  if (!application) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center p-4">
        <div className="text-center bg-white/5 border border-white/10 rounded-2xl p-8 max-w-md w-full">
          <h2 className="text-xl font-bold text-white mb-2">No Active Course</h2>
          <p className="text-sm text-gray-400">You do not have an active internship course.</p>
        </div>
      </div>
    );
  }

  // Get modules & videos
  const modules = await prisma.internshipModule.findMany({
    where: { batchId: application.batchId },
    include: {
      videos: {
        orderBy: { order: "asc" }
      }
    },
    orderBy: { order: "asc" }
  });

  const progressData = await getStudentLmsProgress(application.id);

  return (
    <div className="min-h-screen bg-[#030712]">
      <LmsClientView 
        applicationId={application.id} 
        batchName={application.batch?.name || "Internship Course"} 
        modules={modules} 
        progressData={progressData}
      />
    </div>
  );
}
