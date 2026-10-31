import { getFirebaseUser } from "@/lib/auth-utils";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import LmsClientView from "@/components/internship/LmsClientView";
import { getStudentLmsProgress } from "@/actions/internship-lms";

export const metadata = {
  title: "Course Viewer | TechieHelp",
};

export const dynamic = "force-dynamic";

export default async function StudentLmsViewerPage() {
  const firebaseUser = await getFirebaseUser();
  if (!firebaseUser) redirect("/sign-in");

  let dbUser = null;
  let application = null;
  let modules = [];
  let progressData = null;

  try {
    dbUser = await prisma.user.findUnique({
      where: { uid: firebaseUser.uid }
    });

    if (dbUser) {
      application = await prisma.internshipApplication.findFirst({
        where: { userId: dbUser.id, status: "SELECTED" },
        include: { batch: { include: { mentor: true } } },
        orderBy: { appliedAt: "desc" },
      });

      if (application) {
        modules = await prisma.internshipModule.findMany({
          where: { batchId: application.batchId },
          include: {
            videos: {
              orderBy: { order: "asc" }
            }
          },
          orderBy: { order: "asc" }
        });

        progressData = await getStudentLmsProgress(application.id);
      }
    }
  } catch (error) {
    console.error("LMS viewer data fetch error:", error);
  }

  if (!dbUser && !application) {
    redirect("/internship/student/dashboard");
  }

  if (!application) {
    redirect("/internship/student/dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-50">
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
