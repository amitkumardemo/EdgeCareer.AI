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

export const dynamic = "force-dynamic";

export default async function StudentDashboardPage() {
  let firebaseUser = null;
  try {
    firebaseUser = await getFirebaseUser();
  } catch (authErr) {
    console.error("Dashboard auth check failed:", authErr);
  }

  if (!firebaseUser) redirect("/sign-in?redirect_url=/internship/student/dashboard");

  // Ensure user is onboarded with safe fallback
  let isOnboarded = true;
  try {
    const status = await getUserOnboardingStatus();
    isOnboarded = status?.isOnboarded ?? true;
  } catch (onboardingErr) {
    console.warn("Failed to check onboarding status (continuing):", onboardingErr?.message || onboardingErr);
    isOnboarded = true;
  }

  if (!isOnboarded) {
    redirect("/onboarding");
  }

  // Ensure user exists in DB & Sync safely
  try {
    await checkUser();
  } catch (checkErr) {
    console.warn("checkUser in student dashboard failed:", checkErr?.message || checkErr);
  }

  let dbUser = null;
  try {
    dbUser = await prisma.user.findUnique({
      where: { uid: firebaseUser.uid },
      include: { college: true }
    });
  } catch (userDbErr) {
    console.error("Student dashboard user fetch failed:", userDbErr?.message || userDbErr);
  }

  if (!dbUser) {
    dbUser = {
      id: firebaseUser.uid,
      name: firebaseUser.name || firebaseUser.email?.split("@")[0] || "Student",
      email: firebaseUser.email || "",
      role: "STUDENT",
      imageUrl: firebaseUser.picture || null,
      college: null,
    };
  }

  let applications = [];
  let openBatches = [];
  let notifications = [];

  try {
    const results = await Promise.allSettled([
      getMyApplications(),
      getOpenBatches(),
      getMyNotifications(dbUser?.id)
    ]);
    applications = results[0].status === "fulfilled" && Array.isArray(results[0].value) ? results[0].value : [];
    openBatches = results[1].status === "fulfilled" && Array.isArray(results[1].value) ? results[1].value : [];
    notifications = results[2].status === "fulfilled" && Array.isArray(results[2].value) ? results[2].value : [];
  } catch (batchErr) {
    console.error("Failed to load dashboard data:", batchErr);
  }

  const selectedApp = applications.find((a) => a.status === "SELECTED");
  const progress = selectedApp?.progress;

  // Fetch contextual data based on active internship safely
  let tasks = [];
  let leaderboard = [];
  if (selectedApp) {
    try {
      const contextualResults = await Promise.allSettled([
        getMyTasks(selectedApp.id),
        getLeaderboard(selectedApp.batchId)
      ]);
      tasks = contextualResults[0].status === "fulfilled" && Array.isArray(contextualResults[0].value) ? contextualResults[0].value : [];
      leaderboard = contextualResults[1].status === "fulfilled" && Array.isArray(contextualResults[1].value) ? contextualResults[1].value : [];
    } catch (contextErr) {
      console.error("Failed to load task/leaderboard data:", contextErr);
    }
  }

  return (
    <div className="min-h-screen bg-transparent pb-20">
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
