import { getUserATSAnalyses } from "@/actions/ats";
import ATSHistoryView from "../_components/ats-history-view";
import ATSNav from "../_components/ats-nav";

export default async function ATSHistoryPage() {
  const analyses = await getUserATSAnalyses();

  return (
    <div className="container mx-auto py-4">
      <ATSNav />
      <ATSHistoryView analyses={analyses} />
    </div>
  );
}
