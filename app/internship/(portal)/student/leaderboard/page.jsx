import { getMyApplications, getLeaderboard } from "@/actions/internship-student";
import LeaderboardClient from "@/components/internship/student/LeaderboardClient";

export default async function LeaderboardPage() {
  const applications = await getMyApplications();
  const selectedApp = applications.find((a) => a.status === "SELECTED");
  const batchId = selectedApp?.batch?.id;

  let leaders = [];
  if (batchId) {
    leaders = await getLeaderboard(batchId);
  }

  return (
    <LeaderboardClient 
      leaders={leaders} 
      batchId={batchId} 
      myAppId={selectedApp?.id} 
      batchName={selectedApp?.batch?.name} 
    />
  );
}
