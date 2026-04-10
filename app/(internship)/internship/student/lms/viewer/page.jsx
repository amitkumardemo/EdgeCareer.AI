import { getFirebaseUser } from "@/lib/auth-utils";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import LmsClientView from "@/components/internship/LmsClientView";
import { getStudentLmsProgress } from "@/actions/internship-lms";

export const metadata = {
  title: "Course Viewer | TechieHelp",
};

export default async function StudentLmsViewerPage() {
  const firebaseUser = await getFirebaseUser();
  if (!firebaseUser) redirect("/sign-in");

  const dbUser = await prisma.user.findUnique({
    where: { uid: firebaseUser.uid }
  });
  if (!dbUser) redirect("/sign-in");

  // Get active application
  const application = await prisma.internshipApplication.findFirst({
    where: { userId: dbUser.id, status: "SELECTED" },
    include: { batch: { include: { mentor: true } } },
    orderBy: { appliedAt: "desc" },
  });

  if (!application) {
    redirect("/internship/student/dashboard");
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
        userEmail={dbUser.email}
      />
    </div>
  );
}
