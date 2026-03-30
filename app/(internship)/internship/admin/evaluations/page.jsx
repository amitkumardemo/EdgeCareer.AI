import { getEvaluationsForAdmin } from "@/actions/internship-admin";
import Link from "next/link";
import { FileText, Star, Eye, Calendar, User, Search, Send } from "lucide-react";
import { format } from "date-fns";
import IssueEvaluationButton from "@/components/internship/IssueEvaluationButton";

export const metadata = {
  title: "Performance Evaluations | Admin Portal",
};

export default async function AdminEvaluationsPage() {
  const evaluations = await getEvaluationsForAdmin();

  const getScoreMap = (evalObj) => {
    let score = 0;
    const vals = [evalObj.technicalSkills, evalObj.practicalImplementation, evalObj.communication, evalObj.teamwork, evalObj.timeManagement, evalObj.learningAbility, evalObj.initiative, evalObj.professionalEthics];
    vals.forEach(v => {
      if (v === "Strongly Agree") score += 100;
      else if (v === "Agree") score += 75;
      else score += 40;
    });
    return Math.round(score / 8);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Performance Evaluations</h1>
          <p className="text-gray-500 text-sm mt-1">Review manager feedback and performance metrics for interns.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-primary/10 border border-primary/20 rounded-2xl px-4 py-2">
            <p className="text-xs font-bold text-primary uppercase tracking-widest">
              Total Evaluated: {evaluations.length}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {evaluations.length > 0 ? (
          evaluations.map((ev) => {
            const score = getScoreMap(ev);
            return (
              <div 
                key={ev.id} 
                className="bg-[#0f172a] border border-white/5 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-white/10 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl flex-shrink-0
                    ${score >= 90 ? "bg-green-500/10 text-green-500 border border-green-500/20" : 
                      score >= 70 ? "bg-blue-500/10 text-blue-500 border border-blue-500/20" : 
                      "bg-amber-500/10 text-amber-500 border border-amber-500/20"}`}
                  >
                    {score}
                  </div>
                  <div>
                    <h3 className="text-white font-bold flex items-center gap-2 text-lg">
                      {ev.application?.user?.name || "Unknown Student"}
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                      <p className="text-xs text-gray-500 flex items-center gap-1.5 font-medium">
                        <User className="w-3.5 h-3.5" /> {ev.application?.user?.email}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1.5 font-medium">
                        <FileText className="w-3.5 h-3.5" /> {ev.application?.batch?.name}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1.5 font-medium">
                        <Calendar className="w-3.5 h-3.5" /> Evaluated {format(new Date(ev.createdAt), "MMM dd, yyyy")}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 relative z-20">
                  <IssueEvaluationButton 
                    evaluationId={ev.id} 
                    applicationId={ev.application?.id}
                    isPublished={!!ev.publishedAt} 
                  />
                  <Link href={`/internship/admin/applications?search=${ev.application?.user?.email}`} className="relative z-20">
                    <button className="h-10 px-4 rounded-xl bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:text-white transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-wide cursor-pointer">
                      <Star className="w-4 h-4" /> Edit
                    </button>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-24 text-center bg-[#0f172a] border border-dashed border-white/10 rounded-3xl">
            <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-5">
              <Star className="h-10 w-10 text-gray-400 opacity-50" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Evaluations Yet</h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">
              Manager evaluations will appear here once submitted from a student's application profile.
            </p>
            <Link href="/internship/admin/applications">
              <button className="mt-6 px-6 py-3 bg-primary text-black rounded-xl font-bold text-sm tracking-wide transition-all hover:bg-primary/90">
                Go to Applications
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
