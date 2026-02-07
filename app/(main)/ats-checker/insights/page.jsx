import { getATSInsights } from "@/actions/ats";
import ATSInsightsView from "../_components/ats-insights-view";
import ATSNav from "../_components/ats-nav";

export default async function ATSInsightsPage() {
  const insights = await getATSInsights();

  return (
    <div className="container mx-auto py-4">
      <ATSNav />
      <ATSInsightsView insights={insights} />
    </div>
  );
}
