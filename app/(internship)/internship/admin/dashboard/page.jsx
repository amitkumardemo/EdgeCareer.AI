"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  FileText, CheckCircle2, BookOpen, Award, Building2,
  Users, CalendarDays, Clock, BarChart3, GraduationCap,
  Megaphone, TrendingUp, Plus, RefreshCw, Globe,
  Star, Target, Zap, Crown, Medal, ThumbsUp, ThumbsDown,
  X, ChevronRight, Activity, ArrowRight, UserCheck,
  AlertTriangle, CheckSquare, XCircle, LayoutDashboard,
  ClipboardList, PieChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getDashboardData,
  reviewApplication,
  createAnnouncement,
  getBatches,
} from "@/actions/internship-admin";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function timeAgo(d) {
  if (!d) return "";
  const diff = Date.now() - new Date(d).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const STATUS_COLORS = {
  UPCOMING: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  ACTIVE: "text-green-400 bg-green-400/10 border-green-400/20",
  COMPLETED: "text-gray-400 bg-gray-400/10 border-gray-400/20",
  CANCELLED: "text-red-400 bg-red-400/10 border-red-400/20",
};

const ACTIVITY_CONFIG = {
  submission: { icon: FileText, cls: "text-blue-400 bg-blue-400/10" },
  application: { icon: Users, cls: "text-purple-400 bg-purple-400/10" },
  completion: { icon: Award, cls: "text-amber-400 bg-amber-400/10" },
  attendance: { icon: CalendarDays, cls: "text-green-400 bg-green-400/10" },
};

// ─── Component Parts ──────────────────────────────────────────────────────────

function Skeleton({ className = "" }) {
  return <div className={`bg-white/5 animate-pulse rounded-lg ${className}`} />;
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-9 w-24" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <Skeleton className="h-[400px] lg:col-span-2 rounded-xl" />
        <Skeleton className="h-[400px] rounded-xl" />
      </div>
    </div>
  );
}

function Section({ title, icon: Icon, iconCls = "text-gray-400", action, children, className = "" }) {
  return (
    <div className={`bg-[#0d1117] border border-white/10 rounded-xl overflow-hidden shadow-sm ${className}`}>
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          {Icon && <Icon className={`h-4 w-4 ${iconCls}`} />}
          {title}
        </h2>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function AnnounceModal({ batches, onClose, onSuccess }) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", body: "", batchId: "", isGlobal: false });

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await createAnnouncement(form);
      toast.success("Announcement posted!");
      onSuccess();
      onClose();
    } catch (err) {
      toast.error("Failed to create announcement: " + err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0d1117] border border-white/10 rounded-xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <h3 className="text-lg font-semibold text-white">New Announcement</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Announcement title"
              className="mt-1"
              required
            />
          </div>
          <div>
            <Label htmlFor="body">Message</Label>
            <textarea
              id="body"
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              placeholder="Announcement content"
              className="mt-1 w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              rows={4}
              required
            />
          </div>
          <div>
            <Label htmlFor="batch">Target Batch (optional)</Label>
            <select
              id="batch"
              value={form.batchId}
              onChange={(e) => setForm({ ...form, batchId: e.target.value })}
              className="mt-1 w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none"
            >
              <option value="">All Batches (Global)</option>
              {batches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.program.title} - {b.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="global"
              checked={form.isGlobal}
              onChange={(e) => setForm({ ...form, isGlobal: e.target.checked })}
              className="rounded border-white/10 bg-white/5 text-primary focus:ring-primary/50 cursor-pointer"
            />
            <Label htmlFor="global" className="cursor-pointer">Make this a global announcement</Label>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={saving} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
              {saving ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Post"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewing, setReviewing] = useState(null);
  const [showAnnounce, setShowAnnounce] = useState(false);
  const [batches, setBatches] = useState([]);

  const loadData = useCallback(async () => {
    // Keep internal loading state separate if we're refreshing
    if (!data) setLoading(true);
    try {
      const [dash, bs] = await Promise.all([getDashboardData(), getBatches()]);
      setData(dash);
      setBatches(bs);
    } catch (err) {
      toast.error("Failed to load dashboard: " + err.message);
    } finally {
      setLoading(false);
    }
  }, [data]);

  useEffect(() => { loadData(); }, [loadData]);

  async function handleReview(id, status) {
    setReviewing(id + status);
    try {
      await reviewApplication(id, status);
      toast.success(`Application ${status === "SELECTED" ? "approved" : status === "REJECTED" ? "rejected" : "set to Under Review"}!`);
      await loadData();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setReviewing(null);
    }
  }

  if (loading) return <DashboardSkeleton />;

  const {
    stats,
    pendingApps,
    activeBatches,
    attendance,
    taskStats,
    activity,
    topPerformers,
    announcements,
    certStats,
    recentStudents,
    insights,
  } = data || {};

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 1. Dashboard Overview Cards */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-400 text-sm">TechieHelp – Institute of AI Control Panel</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={loadData} className="gap-2">
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </Button>
          <Button onClick={() => setShowAnnounce(true)} className="gap-2 bg-primary hover:bg-primary/90">
            <Megaphone className="h-4 w-4" /> Announce
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Total Applications", val: stats?.totalApplications, icon: FileText, color: "text-blue-400", bg: "bg-blue-400/10" },
          { label: "Selected Interns", val: stats?.selected, icon: CheckCircle2, color: "text-green-400", bg: "bg-green-400/10" },
          { label: "Active Batches", val: stats?.activeBatches, icon: BookOpen, color: "text-amber-400", bg: "bg-amber-400/10" },
          { label: "Completions", val: stats?.completed, icon: Award, color: "text-purple-400", bg: "bg-purple-400/10" },
          { label: "Participating Colleges", val: stats?.colleges, icon: Building2, color: "text-indigo-400", bg: "bg-indigo-400/10" },
        ].map((card, idx) => (
          <div key={idx} className="bg-[#0d1117] border border-white/10 rounded-xl p-5 shadow-sm">
            <div className={`p-2 w-fit rounded-lg ${card.bg} mb-3`}>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </div>
            <p className="text-xs text-gray-400 font-medium mb-1 uppercase tracking-wider">{card.label}</p>
            <p className="text-2xl font-bold text-white">{card.val || 0}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* 2. Quick Action Panel */}
          <Section title="Quick Action Panel" icon={Zap} iconCls="text-amber-400">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: "Review Apps", icon: FileText, href: "/internship/admin/applications", color: "hover:border-blue-500/50 hover:bg-blue-500/5" },
                { label: "Create Batch", icon: Plus, href: "/internship/admin/batches", color: "hover:border-green-500/50 hover:bg-green-500/5" },
                { label: "Assign Tasks", icon: GraduationCap, href: "/internship/admin/tasks", color: "hover:border-purple-500/50 hover:bg-purple-500/5" },
                { label: "Mark Attendance", icon: CalendarDays, href: "/internship/admin/attendance", color: "hover:border-amber-500/50 hover:bg-amber-500/5" },
                { label: "Issue Certs", icon: Award, href: "/internship/admin/certificates", color: "hover:border-indigo-500/50 hover:bg-indigo-500/5" },
                { label: "Send News", icon: Megaphone, href: "/internship/admin/announcements", color: "hover:border-red-500/50 hover:bg-red-500/5" },
              ].map((act, i) => (
                <Link key={i} href={act.href}>
                  <Button variant="outline" className={`w-full flex-col h-20 gap-2 border-white/5 transition-all duration-300 ${act.color}`}>
                    <act.icon className="h-5 w-5" />
                    <span className="text-xs font-semibold">{act.label}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </Section>

          {/* 3. Pending Applications Section */}
          <Section
            title="Pending Applications"
            icon={ClipboardList}
            iconCls="text-blue-400"
            action={
              <Link href="/internship/admin/applications">
                <Button variant="ghost" size="sm" className="text-xs hover:bg-white/5">
                  View All <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                    <th className="px-3 pb-3">Applicant</th>
                    <th className="px-3 pb-3">College</th>
                    <th className="px-3 pb-3">Role</th>
                    <th className="px-3 pb-3">Date</th>
                    <th className="px-3 pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {pendingApps?.length > 0 ? (
                    pendingApps.map((app) => (
                      <tr key={app.id} className="group hover:bg-white/[0.02]">
                        <td className="px-3 py-4">
                          <p className="font-medium text-white">{app.user?.name}</p>
                          <p className="text-xs text-gray-500">{app.user?.email}</p>
                        </td>
                        <td className="px-3 py-4 text-gray-400 text-xs">{app.user?.college?.name || "—"}</td>
                        <td className="px-3 py-4 text-gray-300 font-medium">{app.batch?.program?.title}</td>
                        <td className="px-3 py-4 text-gray-400 text-xs">{fmtDate(app.appliedAt)}</td>
                        <td className="px-3 py-4 text-right">
                          <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleReview(app.id, "SELECTED")}
                              disabled={reviewing === app.id + "SELECTED"}
                              className="h-8 w-8 p-0 text-green-400 hover:bg-green-400/10"
                            >
                              <ThumbsUp className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleReview(app.id, "REJECTED")}
                              disabled={reviewing === app.id + "REJECTED"}
                              className="h-8 w-8 p-0 text-red-400 hover:bg-red-400/10"
                            >
                              <ThumbsDown className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-10 text-center text-gray-500 italic">No pending applications</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Section>

          {/* 4. Active Batches Section */}
          <Section
            title="Active Batches"
            icon={GraduationCap}
            iconCls="text-indigo-400"
            action={
              <Link href="/internship/admin/batches">
                <Button variant="ghost" size="sm" className="text-xs hover:bg-white/5">
                  Manage All <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            }
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {activeBatches?.length > 0 ? (
                activeBatches.map((batch) => (
                  <div key={batch.id} className="p-4 bg-white/5 border border-white/5 rounded-xl hover:border-indigo-500/30 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-white truncate pr-2">{batch.program?.title} - {batch.name}</h4>
                      <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-[10px] font-bold rounded-full uppercase tracking-tighter">Active</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Interns</p>
                        <p className="text-lg font-bold text-white">{batch._count?.applications || 0}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Tasks</p>
                        <p className="text-lg font-bold text-white">{batch._count?.tasks || 0}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/internship/admin/batches/${batch.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full text-xs h-8 border-white/10 hover:bg-white/5">Manage</Button>
                      </Link>
                      <Link href={`/internship/admin/students?batchId=${batch.id}`}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 border border-white/5 hover:border-white/10"><Users className="h-3.5 w-3.5" /></Button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 py-8 text-center bg-white/[0.02] rounded-xl border border-dashed border-white/10 text-gray-500 italic">
                  No active batches at the moment
                </div>
              )}
            </div>
          </Section>
        </div>

        <div className="space-y-6">
          {/* 5. Attendance Overview */}
          <Section title="Attendance Overview" icon={CalendarDays} iconCls="text-green-400">
            <div className="space-y-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Total Attendance %</p>
                  <p className="text-4xl font-black text-white">{attendance?.pct || 0}<span className="text-xl text-primary">%</span></p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-green-400 font-bold">Present: {attendance?.present || 0}</p>
                  <p className="text-xs text-red-400 font-bold">Absent: {attendance?.absent || 0}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                  <p className="text-gray-500">Late</p>
                  <p className="text-sm font-bold text-amber-400">{attendance?.late || 0}</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                  <p className="text-gray-500">Leave</p>
                  <p className="text-sm font-bold text-blue-400">{attendance?.leave || 0}</p>
                </div>
              </div>
              <Link href="/internship/admin/attendance">
                <Button className="w-full bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 gap-2 h-10">
                  <UserCheck className="h-4 w-4" /> Mark Attendance
                </Button>
              </Link>
            </div>
          </Section>

          {/* 6. Task Overview */}
          <Section title="Task Overview" icon={Target} iconCls="text-blue-400">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Total</p>
                  <p className="text-2xl font-bold text-white">{taskStats?.total || 0}</p>
                </div>
                <div className="p-4 bg-green-400/5 border border-green-400/10 rounded-xl">
                  <p className="text-[10px] text-green-500/70 uppercase font-bold tracking-widest mb-1">Active</p>
                  <p className="text-2xl font-bold text-green-400">{taskStats?.active || 0}</p>
                </div>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-sm">
                  <p className="text-gray-400">Completed</p>
                  <p className="font-bold text-white">{taskStats?.completed || 0}</p>
                </div>
                <div className="flex items-center justify-between text-sm text-amber-400 font-medium">
                  <p>Pending Submissions</p>
                  <p>{taskStats?.pendingSubs || 0}</p>
                </div>
              </div>
              <Link href="/internship/admin/tasks">
                <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 h-10 gap-2 font-medium">
                  Manage Tasks <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Section>

          {/* 7. Internship Activity Feed */}
          <Section title="Activity Feed" icon={Activity} iconCls="text-purple-400">
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {activity?.length > 0 ? (
                activity.map((act, i) => {
                  const config = ACTIVITY_CONFIG[act.type] || { icon: Activity, cls: "text-gray-400 bg-gray-400/10" };
                  const Icon = config.icon;
                  return (
                    <div key={i} className="flex gap-3 items-start animate-in slide-in-from-right duration-300" style={{ animationDelay: `${i * 50}ms` }}>
                      <div className={`p-1.5 rounded-md ${config.cls} mt-0.5`}>
                        <Icon className="h-3 w-3" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-white leading-relaxed">{act.text}</p>
                        <p className="text-[10px] text-gray-500 mt-1 font-medium">{timeAgo(act.time)}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-center py-6 text-gray-500 text-xs italic">No activity yet</p>
              )}
            </div>
          </Section>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* 8. Top Intern Leaderboard */}
        <Section title="Top Intern Leaderboard" icon={Medal} iconCls="text-amber-400">
          <div className="space-y-4">
            {topPerformers?.length > 0 ? (
              topPerformers.map((p, i) => (
                <div key={i} className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border border-white/5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    i === 0 ? "bg-amber-400 text-black shadow-lg shadow-amber-400/20" :
                    i === 1 ? "bg-gray-300 text-black" :
                    i === 2 ? "bg-amber-700 text-white" :
                    "bg-white/10 text-white"
                  }`}>
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{p.application?.user?.name}</p>
                    <p className="text-[10px] text-gray-500 truncate">{p.application?.batch?.program?.title}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-primary">{p.performScore || 0}</p>
                    <p className="text-[10px] text-gray-600 font-medium">{p.attendancePct}% Att.</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-6 text-gray-500 text-xs translate-y-1">Waiting for data...</p>
            )}
          </div>
        </Section>

        {/* 9. Announcements Panel */}
        <Section
          title="Recent Announcements"
          icon={Megaphone}
          iconCls="text-red-400"
          action={
            <Button variant="ghost" size="sm" onClick={() => setShowAnnounce(true)} className="h-7 w-7 p-0 hover:bg-red-400/10 hover:text-red-400">
              <Plus className="h-4 w-4" />
            </Button>
          }
        >
          <div className="space-y-4">
            {announcements?.length > 0 ? (
              announcements.map((ann, i) => (
                <div key={i} className="pb-4 border-b border-white/5 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-bold text-white line-clamp-1">{ann.title}</h4>
                    <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap ml-2">{fmtDate(ann.createdAt)}</span>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-2 mb-2">{ann.body}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter ${ann.isGlobal ? 'bg-purple-500/10 text-purple-400' : 'bg-primary/10 text-primary'}`}>
                    {ann.isGlobal ? "Global" : ann.batch?.name || "Targeted"}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center py-6 text-gray-500 text-xs italic">No announcements posted</p>
            )}
            <Link href="/internship/admin/announcements">
              <Button variant="ghost" size="sm" className="w-full text-xs text-gray-400 hover:text-white mt-2">View All Announcements</Button>
            </Link>
          </div>
        </Section>

        {/* 10. Certificate Status Overview */}
        <Section title="Certificate Status" icon={Award} iconCls="text-indigo-400">
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-3 bg-white/3 rounded-xl">
                <p className="text-xl font-black text-white">{certStats?.eligible || 0}</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Eligible</p>
              </div>
              <div className="text-center p-3 bg-green-500/5 rounded-xl border border-green-500/10">
                <p className="text-xl font-black text-green-400">{certStats?.issued || 0}</p>
                <p className="text-[10px] text-green-500/50 font-bold uppercase tracking-widest mt-1">Issued</p>
              </div>
              <div className="text-center p-3 bg-amber-500/5 rounded-xl border border-amber-500/10">
                <p className="text-xl font-black text-amber-400">{certStats?.pending || 0}</p>
                <p className="text-[10px] text-amber-500/50 font-bold uppercase tracking-widest mt-1">Pending</p>
              </div>
            </div>

            <div className="p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-indigo-500/10 rounded-lg">
                  <CheckSquare className="h-4 w-4 text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Issue Certificates</p>
                  <p className="text-[10px] text-gray-500 leading-normal">Generate certificates for interns who have completed their program.</p>
                </div>
              </div>
              <Link href="/internship/admin/certificates">
                <Button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs h-9 shadow-lg shadow-indigo-500/20">
                  Manage Certificates
                </Button>
              </Link>
            </div>
          </div>
        </Section>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* 11. Recent Students Section */}
        <Section
          title="Recent Students"
          icon={Users}
          iconCls="text-blue-400"
          action={
            <Link href="/internship/admin/students">
              <Button variant="ghost" size="sm" className="text-xs hover:bg-white/5">
                View All Students <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          }
        >
          <div className="space-y-4">
            {recentStudents?.length > 0 ? (
              recentStudents.map((s, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl group hover:border-blue-500/30 border border-transparent transition-all">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {s.user?.name?.[0]?.toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white truncate">{s.user?.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-500 font-medium truncate">{s.user?.college?.name}</span>
                        <span className="w-1 h-1 rounded-full bg-white/10" />
                        <span className="text-[10px] text-primary font-semibold">{s.batch?.program?.title}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500 font-medium whitespace-nowrap">Joined {fmtDate(s.reviewedAt)}</p>
                </div>
              ))
            ) : (
              <p className="text-center py-8 text-gray-500 text-xs italic">No recently joined interns</p>
            )}
          </div>
        </Section>

        {/* 12. Reports & Insights */}
        <Section title="Reports & Insights" icon={PieChart} iconCls="text-pink-400">
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex flex-col justify-between">
              <div>
                <TrendingUp className="h-5 w-5 text-green-400 mb-2" />
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Apps this month</p>
              </div>
              <p className="text-3xl font-black text-white mt-1">{insights?.appsThisMonth || 0}</p>
            </div>
            <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex flex-col justify-between">
              <div>
                <Award className="h-5 w-5 text-indigo-400 mb-2" />
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Completion Rate</p>
              </div>
              <p className="text-3xl font-black text-white mt-1">{insights?.completionRate || 0}<span className="text-xl text-primary">%</span></p>
            </div>
            <div className="col-span-2 p-4 bg-white/5 border border-white/5 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <p className="text-xs font-bold text-white">Dominant College</p>
                </div>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Most Active</span>
              </div>
              <p className="text-lg font-bold text-gray-200 line-clamp-1">{insights?.topCollege || "—"}</p>
            </div>
            <div className="col-span-2 p-4 bg-white/5 border border-white/5 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                  <p className="text-xs font-bold text-white">Trending Role</p>
                </div>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Highest Demand</span>
              </div>
              <p className="text-lg font-bold text-gray-200 line-clamp-1">{insights?.topRole || "—"}</p>
            </div>
          </div>
        </Section>
      </div>

      {/* Announce Modal */}
      {showAnnounce && (
        <AnnounceModal
          batches={batches}
          onClose={() => setShowAnnounce(false)}
          onSuccess={loadData}
        />
      )}

      {/* Style overrides for custom scrollbar */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
