import { getStudentPerformance } from "@/actions/internship-performance";
import PerformanceDashboard from "@/components/internship/student/PerformanceDashboard";
import { AlertCircle, Clock } from "lucide-react";

export const metadata = {
  title: "My Evaluation | Student Portal",
};

export default async function StudentEvaluationPage({ searchParams }) {
  const params = await searchParams;
  const applicationId = params?.applicationId;
  const result = await getStudentPerformance(applicationId);

  if (!result.success && result.ongoing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-md mx-auto">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 border border-primary/20 shadow-[0_0_30px_rgba(37,99,235,0.15)]">
          <Clock className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Report Pending</h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          Your performance evaluation for <strong>{result.batch?.name}</strong> has not been published by your manager yet. This usually happens upon marking your internship sequence as complete.
        </p>
      </div>
    );
  }

  if (!result.success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Unavailable</h2>
        <p className="text-gray-400 text-sm">{result.message}</p>
      </div>
    );
  }

  return <PerformanceDashboard data={result.data} />;
}
