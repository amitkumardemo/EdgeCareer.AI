import { getATSAnalysisByToken } from "@/actions/ats";
import ATSShareView from "../../_components/ats-share-view";
import { notFound } from "next/navigation";

export default async function ATSSharePage({ params }) {
  const { token } = await params;
  const analysis = await getATSAnalysisByToken(token);

  if (!analysis) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <ATSShareView analysis={analysis} />
      </div>
    </div>
  );
}
