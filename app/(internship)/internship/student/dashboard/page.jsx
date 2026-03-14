import { getMyApplications, getOpenBatches } from "@/actions/internship-student";
import { getFirebaseUser } from "@/lib/auth-utils";
import prisma from "@/lib/prisma";
import Link from "next/link";
import {
  FileText, Award, CalendarDays, TrendingUp, Clock, CheckCircle2,
  BookOpen, ChevronRight, BarChart3, Flame
} from "lucide-react";

export default async function StudentDashboardPage() {
  const firebaseUser = await getFirebaseUser();
  const dbUser = await prisma.user.findUnique({
    where: { uid: firebaseUser.uid },
    select: { id: true, name: true, streak: true, branch: true },
  });

  const applications = await getMyApplications();
  const openBatches = await getOpenBatches();

  const selectedApp = applications.find((a) => a.status === "SELECTED");
  const progress = selectedApp?.progress;

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Welcome back, {dbUser?.name?.split(" ")[0] || "Intern"} 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">Track your internship progress and stay on top of tasks.</p>
        </div>
        <div className="flex items-center gap-3">
          {dbUser?.streak > 0 && (
            <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 text-orange-400 px-4 py-2 rounded-xl text-sm font-semibold">
              <Flame className="h-4 w-4" /> {dbUser.streak}-day streak 🔥
            </div>
          )}
          <Link href={`/intern/${dbUser?.name ? dbUser.name.toLowerCase().replace(/\s+/g, "-") : dbUser.id}`} target="_blank" className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 px-4 py-2 rounded-xl text-sm font-semibold transition-all">
            <TrendingUp className="h-4 w-4" /> Public Profile
          </Link>
        </div>
      </div>

      {/* Active internship progress */}
      {selectedApp && progress ? (
        <div className="bg-gradient-to-br from-primary/10 to-blue-500/5 border border-primary/20 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div>
              <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-1">Active Internship</p>
              <h2 className="text-lg font-bold text-white">{selectedApp.batch?.program?.title}</h2>
              <p className="text-sm text-gray-400">{selectedApp.batch?.name}</p>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <p className="text-2xl font-extrabold text-white">{progress.progressPct}%</p>
                <p className="text-[10px] text-gray-500">Progress</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-extrabold text-white">{progress.performScore.toFixed(1)}</p>
                <p className="text-[10px] text-gray-500">Score</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-extrabold text-white">{progress.attendancePct}%</p>
                <p className="text-[10px] text-gray-500">Attendance</p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1.5">
              <span>Completion</span>
              <span>{progress.tasksCompleted}/{progress.totalTasks} tasks</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full transition-all duration-700"
                style={{ width: `${progress.progressPct}%` }}
              />
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Link href={`/internship/student/tasks`} className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-primary/15 text-primary border border-primary/25 rounded-lg hover:bg-primary/25 transition-all">
              <BookOpen className="h-3.5 w-3.5" /> My Tasks
            </Link>
            <Link href={`/internship/student/attendance`} className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-white/5 text-gray-300 border border-white/10 rounded-lg hover:bg-white/8 transition-all">
              <CalendarDays className="h-3.5 w-3.5" /> Attendance
            </Link>
            {!progress.completed && progress.progressPct === 100 && (
              <Link href={`/internship/student/certificate`} className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-green-400/15 text-green-400 border border-green-400/25 rounded-lg hover:bg-green-400/25 transition-all">
                <Award className="h-3.5 w-3.5" /> Get Certificate
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white/3 border border-white/8 border-dashed rounded-2xl p-8 text-center">
          <BookOpen className="h-8 w-8 mx-auto mb-3 text-gray-600" />
          <p className="text-white font-semibold mb-1">No Active Internship</p>
          <p className="text-gray-500 text-sm mb-4">Apply to an open batch to begin your internship journey.</p>
          <Link href="/internship/student/apply" className="inline-flex items-center gap-2 text-sm px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all">
            Browse Open Batches <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      {/* Application history */}
      {applications.length > 0 && (
        <div className="bg-white/3 border border-white/8 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white">My Applications</h2>
            <Link href="/internship/student/status" className="text-xs text-primary hover:underline">View all →</Link>
          </div>
          <div className="space-y-2">
            {applications.slice(0, 4).map((app) => {
              const statusColors = {
                APPLIED: "text-blue-400 bg-blue-400/10",
                UNDER_REVIEW: "text-amber-400 bg-amber-400/10",
                SELECTED: "text-green-400 bg-green-400/10",
                REJECTED: "text-red-400 bg-red-400/10",
              };
              return (
                <div key={app.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/3 hover:bg-white/5 transition-all">
                  <div className="p-1.5 bg-primary/10 rounded-lg"><FileText className="h-3.5 w-3.5 text-primary" /></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{app.batch?.program?.title}</p>
                    <p className="text-[10px] text-gray-500">{app.batch?.name} · Applied {new Date(app.appliedAt).toLocaleDateString("en-IN")}</p>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColors[app.status]}`}>{app.status}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { href: "/internship/student/apply", label: "Apply Now", icon: FileText, color: "primary" },
          { href: "/internship/student/leaderboard", label: "Leaderboard", icon: BarChart3, color: "amber" },
          { href: "/internship/student/notifications", label: "Notifications", icon: TrendingUp, color: "blue" },
          { href: "/internship/student/certificate", label: "My Certificate", icon: Award, color: "green" },
        ].map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className="flex flex-col items-center justify-center gap-2 p-4 bg-white/3 border border-white/8 rounded-xl hover:bg-white/5 hover:border-primary/30 transition-all group">
            <Icon className="h-5 w-5 text-gray-500 group-hover:text-primary transition-colors" />
            <span className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors text-center">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
