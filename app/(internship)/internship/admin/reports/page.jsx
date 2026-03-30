import { getCompletedInternshipsForReports } from "@/actions/internship-admin";
import { FileText, Eye, User, Calendar, Award } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default async function AdminReportsPage() {
  const completedInternships = await getCompletedInternshipsForReports();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Internship Reports</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage and view all student completion reports
          </p>
        </div>
        <div className="bg-primary/10 border border-primary/20 rounded-2xl px-4 py-2">
          <p className="text-xs font-bold text-primary uppercase tracking-widest">
            Total Reports: {completedInternships.length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {completedInternships.length > 0 ? (
          completedInternships.map((app) => (
            <div 
              key={app.id} 
              className="bg-[#0f172a] border border-white/5 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-white/10 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-bold flex items-center gap-2">
                    {app.user?.name}
                    <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full border border-green-500/20">
                      COMPLETED
                    </span>
                  </h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                    <p className="text-[10px] text-gray-500 flex items-center gap-1 font-medium uppercase tracking-wider">
                      <Award className="w-3 h-3" /> {app.batch?.program?.title}
                    </p>
                    <p className="text-[10px] text-gray-500 flex items-center gap-1 font-medium uppercase tracking-wider">
                      <Calendar className="w-3 h-3" /> {app.progress?.completedAt ? format(new Date(app.progress.completedAt), "MMM dd, yyyy") : "N/A"}
                    </p>
                    <p className="text-[10px] text-gray-500 flex items-center gap-1 font-medium uppercase tracking-wider">
                      <User className="w-3 h-3" /> {app.user?.email}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Link href={`/internship/student/report/${app.id}`} target="_blank">
                  <button className="h-10 px-4 rounded-xl bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all flex items-center gap-2 text-xs font-bold uppercase">
                    <Eye className="w-4 h-4" /> View Report
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center bg-[#0f172a] border border-dashed border-white/10 rounded-3xl">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 opacity-20">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-white font-bold">No Completed Internships Yet</h3>
            <p className="text-gray-500 text-sm mt-1 max-w-xs mx-auto">
              Reports are automatically generated when an internship is marked as complete in the certificates section.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
