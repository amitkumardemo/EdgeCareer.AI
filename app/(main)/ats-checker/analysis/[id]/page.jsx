import { getATSAnalysisById } from "@/actions/ats";
import ATSAnalysisDetailView from "../../_components/ats-analysis-detail-view";
import ATSNav from "../../_components/ats-nav";
import { notFound } from "next/navigation";

export default async function ATSAnalysisDetailPage({ params }) {
  const { id } = await params;
  const analysis = await getATSAnalysisById(id);

  if (!analysis) {
    notFound();
  }

  return (
    <div className="container mx-auto py-4">
      <ATSNav />
      <ATSAnalysisDetailView analysis={analysis} />
    </div>
  );
}
