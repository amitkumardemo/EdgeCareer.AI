import { getTpoDashboardStats } from "@/actions/internship-tpo";
import { Users, BookOpen, Award, TrendingUp, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CollegeDashboardPage() {
  const stats = await getTpoDashboardStats();

  if (!stats) {
    redirect("/internship");
  }

  const metrics = [
    { label: "Total Students", value: stats.totalStudents, icon: Users, color: "text-blue-400" },
    { label: "Applied for Internships", value: stats.totalApplied, icon: BookOpen, color: "text-primary" },
    { label: "Active Interns", value: stats.activeInterns, icon: TrendingUp, color: "text-amber-400" },
    { label: "Completed Internships", value: stats.completedInternships, icon: Award, color: "text-green-400" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">TPO Dashboard</h1>
          <p className="text-gray-500 text-sm mt-0.5">{stats.collegeName} Placement Cell</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white/3 border border-white/8 rounded-xl p-5 hover:bg-white/5 transition-colors">
            <m.icon className={`h-6 w-6 mb-3 ${m.color}`} />
            <p className="text-2xl font-bold text-white mb-0.5">{m.value}</p>
            <p className="text-xs text-gray-500">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Applications */}
        <div className="lg:col-span-2 bg-white/3 border border-white/8 rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-bold text-white">Student Internship Activity</h2>
            <Link href="/internship/college/students" className="text-xs text-primary hover:underline">View All Students →</Link>
          </div>
          
          <div className="space-y-3">
            {stats.applications.length === 0 ? (
              <p className="text-center text-sm text-gray-500 py-8">No internship applications from your students yet.</p>
            ) : (
              stats.applications.slice(0, 5).map((app) => {
                const isSelected = app.status === "SELECTED";
                const isCompleted = app.progress?.completed;
                
                return (
                  <div key={app.id} className="flex items-center justify-between p-3 rounded-lg bg-white/3 hover:bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                        {app.user?.name?.[0]?.toUpperCase()}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">{app.user?.name}</p>
                        <p className="text-[10px] text-gray-500">{app.batch?.program?.title}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      {isCompleted ? (
                        <span className="flex items-center gap-1 text-[10px] text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full border border-green-400/20">
                          <Award className="h-3 w-3" /> Completed
                        </span>
                      ) : isSelected ? (
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-12 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${app.progress?.progressPct || 0}%` }} />
                          </div>
                          <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">Active</span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">{app.status}</span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Quick Actions & Info */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-primary/10 to-blue-500/5 border border-primary/20 rounded-xl p-5">
            <h2 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" /> How it Works
            </h2>
            <ul className="space-y-3 text-xs text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">1.</span>
                Students log in using their college email address (@{stats.collegeName.toLowerCase()})
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">2.</span>
                They are automatically linked to your TPO dashboard
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">3.</span>
                You can track their applications, progress, and certificates in real-time
              </li>
            </ul>
          </div>
          
          <div className="bg-white/3 border border-white/8 rounded-xl p-5">
             <h2 className="text-sm font-bold text-white mb-3">College Support</h2>
             <p className="text-xs text-gray-500 mb-4">Need help setting up a custom internship drive for your college?</p>
             <button className="w-full text-xs py-2 bg-white/5 text-white border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
               Contact Admin Support
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
