import { FileText, Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ReportsSection({ applications }) {
  const completedInternships = applications?.filter(
    (app) => app.status === "SELECTED" && app.progress?.completed
  );

  return (
    <div className="bg-[#0f172a] border border-white/5 rounded-3xl overflow-hidden mb-8">
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" /> Internship Reports
        </h2>
      </div>
      <div className="p-4 space-y-3">
        {completedInternships && completedInternships.length > 0 ? (
          completedInternships.map((app) => (
            <div 
              key={app.id} 
              className="flex items-center justify-between p-4 rounded-2xl bg-white/3 border border-transparent hover:border-white/10 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                  <FileText />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{app.batch?.program?.title}</p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                    Internship Report Ready
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href={`/internship/student/report/${app.id}`}>
                  <Button size="sm" variant="ghost" className="h-8 px-3 rounded-lg bg-primary/5 text-primary hover:bg-primary/20 gap-2 text-[10px] font-black uppercase">
                    <Eye className="h-3 w-3" /> View Report
                  </Button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 text-center">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mx-auto mb-3 opacity-20">
              <FileText className="h-6 w-6 text-gray-400" />
            </div>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">No Reports Yet</p>
            <p className="text-[9px] text-gray-600 mt-1 max-w-[150px] mx-auto">Your official report will be generated once you complete the program.</p>
          </div>
        )}
      </div>
    </div>
  );
}
