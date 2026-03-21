import { getReportData } from "@/actions/internship-report";
import { ReportTemplate } from "@/components/internship/ReportTemplate";
import { notFound } from "next/navigation";

export default async function StudentReportPage({ params }) {
  const { id } = await params;

  try {
    const data = await getReportData(id);
    return <ReportTemplate data={data} />;
  } catch (error) {
    console.error("Error fetching report data:", error);
    notFound();
  }
}
