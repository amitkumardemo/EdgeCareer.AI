import { getATSAnalytics } from "@/actions/ats";
import ATSAnalyticsView from "../_components/ats-analytics-view";
import ATSNav from "../_components/ats-nav";

export default async function ATSAnalyticsPage() {
  const analytics = await getATSAnalytics();

  return (
    <div className="container mx-auto py-4">
      <ATSNav />
      <ATSAnalyticsView analytics={analytics} />
    </div>
  );
}
