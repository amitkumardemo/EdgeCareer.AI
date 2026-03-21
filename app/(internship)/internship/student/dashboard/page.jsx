import { 
  getMyApplications, 
  getOpenBatches, 
  getMyTasks, 
  getLeaderboard, 
  getMyNotifications 
} from "@/actions/internship-student";
import { getFirebaseUser } from "@/lib/auth-utils";
import { checkUser } from "@/lib/checkUser";
import { getUserOnboardingStatus } from "@/actions/user";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

// Modular Components
import { DashboardHeader } from "./_components/DashboardHeader";
import { MetricCards } from "./_components/MetricCards";
import { CourseProgress } from "./_components/CourseProgress";
import { TasksTable } from "./_components/TasksTable";
import { LeaderboardSection } from "./_components/LeaderboardSection";
import { NotificationsPanel } from "./_components/NotificationsPanel";
import { SkillScoreCard } from "./_components/SkillScoreCard";
import { CertificatesSection } from "./_components/CertificatesSection";
import { PublicProfileLink } from "./_components/PublicProfileLink";
import { ProfessionalProfile } from "./_components/ProfessionalProfile";
import { ReportsSection } from "./_components/ReportsSection";

export default async function StudentDashboardPage() {
  const firebaseUser = await getFirebaseUser();
  if (!firebaseUser) redirect("/sign-in?redirect_url=/internship/student/dashboard");

  // Ensure user is onboarded
  const { isOnboarded } = await getUserOnboardingStatus();
  if (!isOnboarded) {
    redirect("/onboarding");
  }

  // Ensure user exists in DB & Sync
  await checkUser();

  const dbUser = await prisma.user.findUnique({
    where: { uid: firebaseUser.uid },
    include: { college: true }
  });

  const [applications, openBatches, notifications] = await Promise.all([
    getMyApplications(),
    getOpenBatches(),
    getMyNotifications(dbUser?.id)
  ]);

  const selectedApp = applications.find((a) => a.status === "SELECTED");
  const progress = selectedApp?.progress;

  // Fetch contextual data based on active internship
  let tasks = [];
  let leaderboard = [];
  if (selectedApp) {
    [tasks, leaderboard] = await Promise.all([
      getMyTasks(selectedApp.id),
      getLeaderboard(selectedApp.batchId)
    ]);
  }

  return (
    <div className="min-h-screen bg-[#030712] pb-20">
      <div className="container mx-auto px-4 pt-8 max-w-7xl">
        {/* Welcome & Profile Section */}
        <DashboardHeader dbUser={dbUser} selectedApp={selectedApp} />

        {/* Analytics Highlights */}
        <MetricCards progress={progress} selectedApp={selectedApp} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Workspace (8/12) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Active Internship Progress */}
            <CourseProgress selectedApp={selectedApp} progress={progress} />

            {/* Current Tasks List */}
            {selectedApp && <TasksTable tasks={tasks} />}

            {/* Skill & Performance Overview */}
            <SkillScoreCard dbUser={dbUser} />
          </div>

          {/* Side Panels (4/12) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Leaderboard */}
            <LeaderboardSection 
              leaderboard={leaderboard} 
              currentUserId={dbUser?.id} 
            />

            {/* Notifications */}
            <NotificationsPanel notifications={notifications} />

            {/* Certificates */}
            <CertificatesSection applications={applications} />

            {/* Internship Reports */}
            <ReportsSection applications={applications} />

            {/* Professional Profile Links */}
            <ProfessionalProfile dbUser={dbUser} />

            {/* Public Profile Link Preview */}
            <PublicProfileLink dbUser={dbUser} />
          </div>
        </div>
      </div>
    </div>
  );
}
