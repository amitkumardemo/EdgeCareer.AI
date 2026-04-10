import { getBatchDetail, updateBatchStatus } from "@/actions/internship-admin";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Users, BookOpen, CheckCircle2, Clock, XCircle, CalendarDays, ArrowLeft } from "lucide-react";
import LmsAdminSection from "@/components/internship/LmsAdminSection";
import MentorLmsComments from "@/components/internship/MentorLmsComments";

const STATUS_COLORS = {
  APPLIED: "text-blue-400 bg-blue-400/10",
  UNDER_REVIEW: "text-amber-400 bg-amber-400/10",
  SELECTED: "text-green-400 bg-green-400/10",
  REJECTED: "text-red-400 bg-red-400/10",
};

export default async function BatchDetailPage({ params }) {
  const { id } = await params;
  const batch = await getBatchDetail(id);
  if (!batch) notFound();

  const selected = batch.applications.filter(a => a.status === "SELECTED").length;
  const pending  = batch.applications.filter(a => a.status === "APPLIED").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/internship/admin/batches" className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/8 transition-all">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-white">{batch.name}</h1>
          <p className="text-gray-500 text-xs mt-0.5">{batch.program?.title} · {batch.program?.domain}</p>
        </div>
        <span className="ml-auto text-xs px-3 py-1 rounded-full font-semibold bg-primary/15 text-primary border border-primary/25">
          {batch.status}
        </span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Applied", value: batch.applications.length, icon: Users },
          { label: "Selected", value: selected, icon: CheckCircle2 },
          { label: "Pending Review", value: pending, icon: Clock },
          { label: "Tasks", value: batch.tasks.length, icon: BookOpen },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-white/3 border border-white/8 rounded-xl p-4 flex items-center gap-3">
            <Icon className="h-4 w-4 text-primary" />
            <div><p className="text-lg font-bold text-white">{value}</p><p className="text-[10px] text-gray-500">{label}</p></div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Applicants */}
        <div className="bg-white/3 border border-white/8 rounded-xl p-5">
          <h2 className="text-sm font-bold text-white mb-4">Applicants ({batch.applications.length})</h2>
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {batch.applications.map((app) => (
              <div key={app.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/3 hover:bg-white/5 transition-all">
                <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                  {app.user?.name?.[0]?.toUpperCase() || "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{app.user?.name}</p>
                  <p className="text-[10px] text-gray-600">{app.user?.branch || "—"} · Roll: {app.user?.rollNumber || "—"}</p>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[app.status]}`}>{app.status}</span>
                  {app.progress && <p className="text-[10px] text-gray-600 mt-0.5">{app.progress.progressPct}% done</p>}
                </div>
              </div>
            ))}
            {batch.applications.length === 0 && <p className="text-xs text-gray-600 text-center py-4">No applications yet</p>}
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-white/3 border border-white/8 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white">Tasks ({batch.tasks.length})</h2>
            <Link href={`/internship/admin/tasks?batch=${id}`} className="text-xs text-primary hover:underline">+ Add Task</Link>
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {batch.tasks.map((task) => {
              const overdue = new Date(task.dueDate) < new Date();
              return (
                <div key={task.id} className="flex items-start gap-3 p-2.5 rounded-lg bg-white/3">
                  <BookOpen className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{task.title}</p>
                    <p className="text-[10px] text-gray-600">Max score: {task.maxScore}</p>
                  </div>
                  <span className={`text-[10px] ${overdue ? "text-red-400" : "text-gray-500"} whitespace-nowrap`}>
                    {new Date(task.dueDate).toLocaleDateString("en-IN")}
                  </span>
                </div>
              );
            })}
            {batch.tasks.length === 0 && <p className="text-xs text-gray-600 text-center py-4">No tasks yet</p>}
          </div>
        </div>
      </div>

      {/* Announcements */}
      <div className="bg-white/3 border border-white/8 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-white">Recent Announcements</h2>
          <Link href="/internship/admin/announcements" className="text-xs text-primary hover:underline">Post New →</Link>
        </div>
        <div className="space-y-2">
          {batch.announcements.slice(0, 4).map((a) => (
            <div key={a.id} className="flex gap-3 p-3 rounded-lg bg-white/3">
              <CalendarDays className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-white">{a.title}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">{a.body}</p>
              </div>
            </div>
          ))}
          {batch.announcements.length === 0 && <p className="text-xs text-gray-600">No announcements for this batch yet.</p>}
        </div>
      </div>

      <LmsAdminSection batchId={batch.id} />
      <MentorLmsComments batchId={batch.id} />
    </div>
  );
}
