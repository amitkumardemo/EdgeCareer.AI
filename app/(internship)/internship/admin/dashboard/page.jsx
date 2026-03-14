import { getAdminStats, getBatches, getAllApplications } from "@/actions/internship-admin";
import { getFirebaseUser } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Users, BookOpen, Award, GraduationCap, Building2, TrendingUp, Clock, CheckCircle2, XCircle, FileText } from "lucide-react";

export default async function AdminDashboardPage() {
  const firebaseUser = await getFirebaseUser();
  const dbUser = await prisma.user.findUnique({ where: { uid: firebaseUser.uid } });
  if (dbUser?.role !== "ADMIN") redirect("/internship/student/dashboard");

  const stats = await getAdminStats();
  const recentApps = await getAllApplications({ status: "APPLIED" });
  const batches = await getBatches();

  const statCards = [
    { label: "Total Applications", value: stats.totalApplications, icon: FileText, color: "blue" },
    { label: "Selected Interns", value: stats.selected, icon: CheckCircle2, color: "green" },
    { label: "Active Batches", value: stats.activeBatches, icon: BookOpen, color: "purple" },
    { label: "Completions", value: stats.completed, icon: Award, color: "amber" },
    { label: "Colleges", value: stats.colleges, icon: Building2, color: "rose" },
  ];

  const colorMap = {
    blue: "from-blue-500/10 to-blue-600/5 border-blue-500/20 text-blue-400",
    green: "from-green-500/10 to-green-600/5 border-green-500/20 text-green-400",
    purple: "from-purple-500/10 to-purple-600/5 border-purple-500/20 text-purple-400",
    amber: "from-amber-500/10 to-amber-600/5 border-amber-500/20 text-amber-400",
    rose: "from-rose-500/10 to-rose-600/5 border-rose-500/20 text-rose-400",
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Internship Management — TechieHelp Institute of AI</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className={`bg-gradient-to-br ${colorMap[color]} border rounded-xl p-4`}>
            <Icon className="h-5 w-5 mb-3" />
            <p className="text-2xl font-extrabold text-white">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pending Applications */}
        <div className="bg-white/3 border border-white/8 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white">Pending Applications</h2>
            <Link href="/internship/admin/applications" className="text-xs text-primary hover:underline">View all →</Link>
          </div>
          <div className="space-y-2">
            {recentApps.slice(0, 6).map((app) => (
              <div key={app.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/3 hover:bg-white/5 transition-all">
                <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                  {app.user?.name?.[0]?.toUpperCase() || "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{app.user?.name}</p>
                  <p className="text-[10px] text-gray-600 truncate">{app.batch?.program?.title} · {app.batch?.name}</p>
                </div>
                <Link href={`/internship/admin/applications`} className="text-[10px] bg-primary/15 text-primary px-2 py-1 rounded-md hover:bg-primary/25 transition-all">
                  Review
                </Link>
              </div>
            ))}
            {recentApps.length === 0 && <p className="text-xs text-gray-600 text-center py-4">No pending applications</p>}
          </div>
        </div>

        {/* Active Batches */}
        <div className="bg-white/3 border border-white/8 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white">All Batches</h2>
            <Link href="/internship/admin/batches" className="text-xs text-primary hover:underline">Manage →</Link>
          </div>
          <div className="space-y-2">
            {batches.slice(0, 6).map((batch) => {
              const statusColors = {
                UPCOMING: "text-blue-400 bg-blue-400/10",
                ACTIVE: "text-green-400 bg-green-400/10",
                COMPLETED: "text-gray-400 bg-gray-400/10",
                CANCELLED: "text-red-400 bg-red-400/10",
              };
              return (
                <Link key={batch.id} href={`/internship/admin/batches/${batch.id}`}
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-white/3 hover:bg-white/5 transition-all"
                >
                  <BookOpen className="h-4 w-4 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{batch.name}</p>
                    <p className="text-[10px] text-gray-600">{batch._count.applications} applicants · {batch._count.tasks} tasks</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${statusColors[batch.status]}`}>
                    {batch.status}
                  </span>
                </Link>
              );
            })}
            {batches.length === 0 && <p className="text-xs text-gray-600 text-center py-4">No batches yet</p>}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { href: "/internship/admin/applications", label: "Review Apps", icon: FileText },
          { href: "/internship/admin/batches", label: "New Batch", icon: BookOpen },
          { href: "/internship/admin/attendance", label: "Mark Attendance", icon: Clock },
          { href: "/internship/admin/certificates", label: "Issue Certs", icon: Award },
        ].map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}
            className="flex flex-col items-center justify-center gap-2 p-4 bg-white/3 border border-white/8 rounded-xl hover:bg-white/5 hover:border-primary/30 transition-all group"
          >
            <Icon className="h-5 w-5 text-gray-500 group-hover:text-primary transition-colors" />
            <span className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
