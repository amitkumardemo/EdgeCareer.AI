import { getIndustryInsights } from "@/actions/dashboard";
import DashboardView from "./_component/dashboard-view";
import { getUserOnboardingStatus, getUserData } from "@/actions/user";
import { getUserGamification } from "@/actions/gamification";
import { getATSAnalytics } from "@/actions/ats";
import { 
  getResumeAnalytics, 
  getResumeTimeline, 
  getResumeStatusDistribution,
  getRecentResumeActivity 
} from "@/actions/resume-analytics";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { isOnboarded } = await getUserOnboardingStatus();

  // If not onboarded, redirect to onboarding page
  // Skip this check if already on the onboarding page
  if (!isOnboarded) {
    redirect("/onboarding");
  }

  const insights = await getIndustryInsights();
  const gamification = await getUserGamification();
  const userData = await getUserData();
  const atsAnalytics = await getATSAnalytics();
  const resumeAnalytics = await getResumeAnalytics();
  const resumeTimeline = await getResumeTimeline();
  const resumeStatusDistribution = await getResumeStatusDistribution();
  const recentResumeActivity = await getRecentResumeActivity();

  return (
    <div className="container mx-auto">
      <DashboardView 
        insights={insights} 
        gamification={gamification} 
        userData={userData}
        atsAnalytics={atsAnalytics}
        resumeAnalytics={resumeAnalytics}
        resumeTimeline={resumeTimeline}
        resumeStatusDistribution={resumeStatusDistribution}
        recentResumeActivity={recentResumeActivity}
      />
    </div>
  );
}
