import { getTpoDashboardStats } from "@/actions/internship-tpo";
import { Users, FileText, Award, Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function TpoStudentsPage() {
  const stats = await getTpoDashboardStats();
  
  // Create a map to link students to their applications
  const studentAppMap = new Map();
  stats.applications.forEach(app => {
    if (!studentAppMap.has(app.userId)) {
      studentAppMap.set(app.userId, []);
    }
    studentAppMap.get(app.userId).push(app);
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Your Students</h1>
        <p className="text-gray-500 text-sm mt-0.5">Track {stats.collegeName} students and their internships</p>
      </div>

      <div className="bg-white/3 border border-white/8 rounded-xl overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 border-b border-white/8 bg-white/2 text-xs font-semibold text-gray-400">
          <div className="col-span-4">Student</div>
          <div className="col-span-3">Latest Application</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-3 text-right">Progress</div>
        </div>

        {/* Table Body */}
        <div className="space-y-0 text-sm divide-y divide-white/5">
          {stats.applications.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <Users className="h-8 w-8 mx-auto mb-3 opacity-30" />
              <p>No students have applied for internships yet.</p>
            </div>
          ) : (
            Array.from(studentAppMap.values()).map(appGroup => {
              // Get their most recent application
              const app = appGroup.sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt))[0];
              const prog = app.progress;
              const isSelected = app.status === "SELECTED";
              const isCompleted = prog?.completed;

              return (
                <div key={app.userId} className="grid md:grid-cols-12 gap-4 px-5 py-3 items-center hover:bg-white/4 transition-colors">
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                      {app.user?.name?.[0]?.toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-white truncate">{app.user?.name}</p>
                      <p className="text-[10px] text-gray-500 truncate">{app.user?.branch || "No branch"}</p>
                    </div>
                  </div>

                  <div className="col-span-3">
                    <p className="text-xs text-white truncate">{app.batch?.program?.title}</p>
                    <p className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
                      <Calendar className="h-2.5 w-2.5" /> Applied {new Date(app.appliedAt).toLocaleDateString("en-IN")}
                    </p>
                  </div>

                  <div className="col-span-2 text-left md:text-center">
                    {isCompleted ? (
                      <span className="inline-flex py-1 px-2.5 rounded-full text-[10px] font-semibold bg-green-400/10 text-green-400 border border-green-400/20">
                        <Award className="h-3 w-3 mr-1" /> Certified
                      </span>
                    ) : (
                      <span className={`inline-flex py-1 px-2.5 rounded-full text-[10px] font-semibold border ${
                        app.status === "SELECTED" ? "bg-primary/10 text-primary border-primary/20" :
                        app.status === "UNDER_REVIEW" ? "bg-amber-400/10 text-amber-400 border-amber-400/20" :
                        app.status === "REJECTED" ? "bg-red-400/10 text-red-400 border-red-400/20" :
                        "bg-blue-400/10 text-blue-400 border-blue-400/20"
                      }`}>
                        {app.status}
                      </span>
                    )}
                  </div>

                  <div className="col-span-3 text-right">
                    {isSelected ? (
                      <div className="flex flex-col items-end">
                        <div className="flex justify-between w-24 text-[10px] text-gray-500 mb-1">
                          <span>{prog?.tasksCompleted}/{prog?.totalTasks}</span>
                          <span>{prog?.progressPct || 0}%</span>
                        </div>
                        <div className="h-1.5 w-24 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${prog?.progressPct || 0}%` }} />
                        </div>
                      </div>
                    ) : (
                       <span className="text-xs text-gray-600">—</span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
