"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "sonner";
import {
  Search, Download, RefreshCw, X, Users, TrendingUp, MoreHorizontal,
  Eye, UserX, Trash2, Star, Trophy, Calendar, Building2, BarChart3,
  Megaphone, CheckSquare, Square, History, GraduationCap, Crown,
  Activity, CheckCircle2, Award, Send, UserCheck, Clock, Crown as CrownIcon,
  Medal, ChevronRight, Filter, BookOpen, Mail, Phone, FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getStudentsForAdmin,
  getBatches,
  getStudentAttendanceHistory,
  deactivateStudent,
  removeStudentApplication,
  createAnnouncement,
  updateStudentNotes,
} from "@/actions/internship-admin";

// ── Constants ─────────────────────────────────────────────────────────────────

const STATUS_CFG = {
  ACTIVE: {
    label: "Active",
    badge: "text-green-400 bg-green-400/10 border-green-400/20",
    dot: "bg-green-400",
  },
  COMPLETED: {
    label: "Completed",
    badge: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    dot: "bg-blue-400",
  },
  INACTIVE: {
    label: "Inactive",
    badge: "text-rose-400 bg-rose-400/10 border-rose-400/20",
    dot: "bg-rose-400",
  },
  PENDING: {
    label: "Pending",
    badge: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    dot: "bg-amber-400",
  },
};

const ATTENDANCE_STATUS_CFG = {
  PRESENT: { label: "Present", badge: "text-green-400 bg-green-400/10 border-green-400/20" },
  ABSENT: { label: "Absent", badge: "text-red-400 bg-red-400/10 border-red-400/20" },
  LEAVE: { label: "Leave", badge: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
  LATE: { label: "Late", badge: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function getStudentStatus(app) {
  if (app.progress?.completed) return "COMPLETED";
  if (app.status === "SELECTED") return "ACTIVE";
  if (app.status === "REJECTED") return "INACTIVE";
  return "PENDING";
}

function fmtDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function getScoreColor(score) {
  if (score >= 80) return "text-green-400";
  if (score >= 60) return "text-amber-400";
  if (score >= 40) return "text-orange-400";
  return "text-red-400";
}

function getAttendanceColor(pct) {
  if (pct >= 75) return "bg-green-400";
  if (pct >= 50) return "bg-amber-400";
  return "bg-red-400";
}

function getAttendanceTextColor(pct) {
  if (pct >= 75) return "text-green-400";
  if (pct >= 50) return "text-amber-400";
  return "text-red-400";
}

function deriveAttendanceStatus(record) {
  if (!record) return null;
  if (record.note && ATTENDANCE_STATUS_CFG[record.note]) return record.note;
  return record.present ? "PRESENT" : "ABSENT";
}

function exportStudentsCSV(students, filename = "students") {
  const headers = [
    "#", "Name", "Email", "Role / Program", "College", "Branch",
    "Join Date", "Attendance %", "Tasks Completed", "Total Tasks",
    "Performance Score", "Status",
  ];
  const rows = students.map((s, i) => [
    i + 1,
    s.user?.name ?? "—",
    s.user?.email ?? "—",
    s.batch?.program?.title ?? "—",
    s.user?.college?.name ?? "—",
    s.user?.branch ?? "—",
    fmtDate(s.appliedAt),
    s.progress?.attendancePct ?? 0,
    s.progress?.tasksCompleted ?? 0,
    s.progress?.totalTasks ?? 0,
    s.progress?.performScore ?? 0,
    getStudentStatus(s),
  ]);
  const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}_${new Date().toISOString().split("T")[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast.success("Student list downloaded!");
}

// ── Analytics Cards ───────────────────────────────────────────────────────────

function AnalyticsCards({ stats }) {
  const cards = [
    {
      label: "Total Interns",
      value: stats.total,
      icon: Users,
      color: "from-blue-500/10 to-blue-600/5 border-blue-500/20 text-blue-400",
    },
    {
      label: "Active Interns",
      value: stats.active,
      icon: Activity,
      color: "from-green-500/10 to-green-600/5 border-green-500/20 text-green-400",
    },
    {
      label: "Completed Internship",
      value: stats.completed,
      icon: Award,
      color: "from-purple-500/10 to-purple-600/5 border-purple-500/20 text-purple-400",
    },
    {
      label: "Inactive Interns",
      value: stats.inactive,
      icon: UserX,
      color: "from-rose-500/10 to-rose-600/5 border-rose-500/20 text-rose-400",
    },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className={`bg-gradient-to-br ${color} border rounded-xl p-4`}>
          <Icon className="h-5 w-5 mb-3" />
          <p className="text-2xl font-extrabold text-white">{value}</p>
          <p className="text-xs text-gray-500 mt-0.5">{label}</p>
        </div>
      ))}
    </div>
  );
}

// ── Performance Leaderboard ───────────────────────────────────────────────────

function PerformanceLeaderboard({ students }) {
  const leaderboard = useMemo(() =>
    [...students]
      .filter((s) => s.status === "SELECTED")
      .sort((a, b) => (b.progress?.performScore ?? 0) - (a.progress?.performScore ?? 0))
      .slice(0, 10),
    [students]
  );

  const rankIcon = (i) => {
    if (i === 0) return <Crown className="h-4 w-4 text-yellow-400" />;
    if (i === 1) return <Medal className="h-4 w-4 text-gray-300" />;
    if (i === 2) return <Medal className="h-4 w-4 text-amber-600" />;
    return <span className="text-xs font-bold text-gray-600 w-4 text-center">#{i + 1}</span>;
  };

  const rankBg = (i) => {
    if (i === 0) return "bg-yellow-400/5 border-yellow-400/15";
    if (i === 1) return "bg-gray-400/5 border-gray-400/10";
    if (i === 2) return "bg-amber-600/5 border-amber-600/10";
    return "bg-white/2 border-white/5";
  };

  if (leaderboard.length === 0) {
    return (
      <div className="text-center py-20 bg-white/3 border border-dashed border-white/8 rounded-xl">
        <Trophy className="h-10 w-10 mx-auto mb-3 text-gray-700" />
        <p className="text-gray-400 font-medium">No performance data yet</p>
        <p className="text-gray-600 text-sm mt-1">Performance scores will appear once tasks are evaluated</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="h-4 w-4 text-yellow-400" />
        <h3 className="text-sm font-bold text-white">Top Performers</h3>
        <span className="text-xs text-gray-600">by performance score</span>
      </div>
      {leaderboard.map((student, i) => {
        const score = student.progress?.performScore ?? 0;
        const att = student.progress?.attendancePct ?? 0;
        const tasks = student.progress?.tasksCompleted ?? 0;
        const totalTasks = student.progress?.totalTasks ?? 0;
        return (
          <div
            key={student.id}
            className={`flex items-center gap-4 p-4 border rounded-xl transition-all hover:bg-white/3 ${rankBg(i)}`}
          >
            {/* Rank */}
            <div className="w-8 flex items-center justify-center flex-shrink-0">
              {rankIcon(i)}
            </div>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
              {student.user?.name?.[0]?.toUpperCase() || "?"}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{student.user?.name}</p>
              <p className="text-[10px] text-gray-500 truncate">
                {student.batch?.program?.title} · {student.user?.college?.name ?? "—"}
              </p>
            </div>

            {/* Stats */}
            <div className="hidden sm:flex items-center gap-6 flex-shrink-0">
              <div className="text-center">
                <p className={`text-sm font-bold ${getAttendanceTextColor(att)}`}>{att}%</p>
                <p className="text-[9px] text-gray-600">Attendance</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-white">{tasks}/{totalTasks}</p>
                <p className="text-[9px] text-gray-600">Tasks</p>
              </div>
            </div>

            {/* Score */}
            <div className="flex-shrink-0 text-right">
              <div className={`text-lg font-extrabold ${getScoreColor(score)}`}>{score}</div>
              <p className="text-[9px] text-gray-600">/ 100</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Student Profile Panel ─────────────────────────────────────────────────────

function StudentProfilePanel({ student, onClose, onDeactivate, onRemove, onViewAttendance }) {
  const [notes, setNotes] = useState(student.reviewNotes || "");
  const [savingNotes, setSavingNotes] = useState(false);
  const status = getStudentStatus(student);
  const cfg = STATUS_CFG[status];
  const score = student.progress?.performScore ?? 0;
  const att = student.progress?.attendancePct ?? 0;
  const tasks = student.progress?.tasksCompleted ?? 0;
  const totalTasks = student.progress?.totalTasks ?? 0;

  async function handleSaveNotes() {
    setSavingNotes(true);
    try {
      await updateStudentNotes(student.id, notes);
      toast.success("Notes saved.");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSavingNotes(false);
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-[#0a0c14] border-l border-white/8 flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-white/8 flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center text-primary text-lg font-bold flex-shrink-0">
                {student.user?.name?.[0]?.toUpperCase() || "?"}
              </div>
              <div>
                <h2 className="text-base font-bold text-white">{student.user?.name}</h2>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-semibold ${cfg.badge}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                  {cfg.label}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Contact & Info */}
          <div className="bg-white/3 border border-white/8 rounded-xl p-4 space-y-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Profile</h3>
            {[
              { icon: Mail, label: "Email", value: student.user?.email },
              { icon: GraduationCap, label: "Role / Program", value: student.batch?.program?.title },
              { icon: Building2, label: "College", value: student.user?.college?.name },
              { icon: BookOpen, label: "Branch", value: student.user?.branch },
              { icon: Calendar, label: "Join Date", value: fmtDate(student.appliedAt) },
              { icon: FileText, label: "Batch", value: student.batch?.name },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon className="h-3.5 w-3.5 text-gray-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-gray-600">{label}</p>
                  <p className="text-xs text-white truncate">{value || "—"}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Performance Stats */}
          <div className="bg-white/3 border border-white/8 rounded-xl p-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Performance</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <button
                  onClick={() => onViewAttendance(student)}
                  className={`text-xl font-extrabold hover:underline ${getAttendanceTextColor(att)}`}
                >
                  {att}%
                </button>
                <p className="text-[10px] text-gray-600 mt-0.5">Attendance</p>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-1">
                  <div className={`h-full rounded-full ${getAttendanceColor(att)}`} style={{ width: `${att}%` }} />
                </div>
              </div>
              <div className="text-center">
                <p className="text-xl font-extrabold text-white">{tasks}<span className="text-xs text-gray-600">/{totalTasks}</span></p>
                <p className="text-[10px] text-gray-600 mt-0.5">Tasks Done</p>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${totalTasks > 0 ? (tasks / totalTasks) * 100 : 0}%` }}
                  />
                </div>
              </div>
              <div className="text-center">
                <p className={`text-xl font-extrabold ${getScoreColor(score)}`}>{score}</p>
                <p className="text-[10px] text-gray-600 mt-0.5">Perf. Score</p>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-1">
                  <div className="h-full rounded-full bg-yellow-400" style={{ width: `${score}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Completion info */}
          {student.progress?.completed && (
            <div className="bg-blue-400/5 border border-blue-400/20 rounded-xl p-4 flex items-center gap-3">
              <Award className="h-5 w-5 text-blue-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-blue-400">Internship Completed</p>
                <p className="text-[10px] text-gray-500">
                  {student.progress.completedAt ? fmtDate(student.progress.completedAt) : "Date not recorded"}
                </p>
              </div>
            </div>
          )}

          {/* Admin Notes */}
          <div className="bg-white/3 border border-white/8 rounded-xl p-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Admin Notes</h3>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about this student..."
              className="bg-white/5 border border-white/10 rounded-lg text-white text-xs p-3 w-full focus:border-primary outline-none resize-none placeholder:text-gray-600"
            />
            <Button
              size="sm"
              onClick={handleSaveNotes}
              disabled={savingNotes}
              className="mt-2 h-7 text-xs"
            >
              {savingNotes ? "Saving..." : "Save Notes"}
            </Button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/8 flex-shrink-0 space-y-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onViewAttendance(student)}
            className="w-full text-xs border-white/10 text-gray-300 hover:text-white bg-transparent gap-2 h-8"
          >
            <History className="h-3.5 w-3.5" /> View Attendance History
          </Button>
          {status !== "INACTIVE" && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDeactivate(student)}
              className="w-full text-xs border-amber-400/30 text-amber-400 hover:bg-amber-400/5 bg-transparent gap-2 h-8"
            >
              <UserX className="h-3.5 w-3.5" /> Deactivate Student
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={() => onRemove(student)}
            className="w-full text-xs border-red-400/30 text-red-400 hover:bg-red-400/5 bg-transparent gap-2 h-8"
          >
            <Trash2 className="h-3.5 w-3.5" /> Remove Student
          </Button>
        </div>
      </div>
    </>
  );
}

// ── Attendance History Modal ───────────────────────────────────────────────────

function AttendanceHistoryModal({ student, onClose }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudentAttendanceHistory(student.id)
      .then(setRecords)
      .catch(() => toast.error("Failed to load history"))
      .finally(() => setLoading(false));
  }, [student.id]);

  const present = records.filter((r) => r.note === "PRESENT" || (r.present && !r.note)).length;
  const historyPct = records.length > 0 ? Math.round((present / records.length) * 100) : 0;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#0d0f1a] border border-white/10 rounded-2xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-white/8 flex items-start justify-between flex-shrink-0">
          <div>
            <h2 className="text-base font-bold text-white">{student.user?.name}</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {student.batch?.program?.title} · Attendance History
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all">
            <X className="h-4 w-4" />
          </button>
        </div>

        {!loading && records.length > 0 && (
          <div className="px-5 py-3 border-b border-white/5 flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${historyPct >= 75 ? "bg-green-400" : historyPct >= 50 ? "bg-amber-400" : "bg-red-400"}`}
                  style={{ width: `${historyPct}%` }}
                />
              </div>
              <span className={`text-xs font-bold ${historyPct >= 75 ? "text-green-400" : historyPct >= 50 ? "text-amber-400" : "text-red-400"}`}>
                {historyPct}% Attendance
              </span>
            </div>
            <p className="text-[10px] text-gray-600 mt-1">{records.length} total days recorded</p>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-10 text-center">
              <div className="animate-spin h-6 w-6 border-2 border-white/20 border-t-white rounded-full mx-auto mb-3" />
              <p className="text-sm text-gray-500">Loading history…</p>
            </div>
          ) : records.length === 0 ? (
            <div className="p-12 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-3 text-gray-700" />
              <p className="text-sm text-gray-500">No attendance records found</p>
            </div>
          ) : (
            <table className="w-full text-xs">
              <thead className="sticky top-0 bg-[#0d0f1a] border-b border-white/8">
                <tr className="text-gray-500 uppercase tracking-wider">
                  <th className="px-5 py-2.5 text-left">Date</th>
                  <th className="px-5 py-2.5 text-left">Day</th>
                  <th className="px-5 py-2.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {records.map((record) => {
                  const d = new Date(record.date);
                  const statusKey = deriveAttendanceStatus(record);
                  const cfg = ATTENDANCE_STATUS_CFG[statusKey] ?? ATTENDANCE_STATUS_CFG.ABSENT;
                  return (
                    <tr key={record.id} className="hover:bg-white/3 transition-colors">
                      <td className="px-5 py-2.5 text-gray-300">
                        {d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-5 py-2.5 text-gray-500">
                        {d.toLocaleDateString("en-IN", { weekday: "long" })}
                      </td>
                      <td className="px-5 py-2.5 text-center">
                        <span className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold ${cfg.badge}`}>
                          {cfg.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Announcement Modal ────────────────────────────────────────────────────────

function AnnouncementModal({ selectedStudents, batches, onClose }) {
  const [form, setForm] = useState({ title: "", body: "", isGlobal: false, batchId: "" });
  const [saving, setSaving] = useState(false);

  async function handleSend(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await createAnnouncement({ ...form, isGlobal: form.isGlobal });
      toast.success("Announcement sent!");
      onClose();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0d1117] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-white/8">
          <div>
            <h2 className="text-sm font-bold text-white">Send Announcement</h2>
            <p className="text-[10px] text-gray-500 mt-0.5">
              {selectedStudents.length > 0 ? `${selectedStudents.length} students selected` : "To all interns"}
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all">
            <X className="h-4 w-4" />
          </button>
        </div>
        <form onSubmit={handleSend} className="p-5 space-y-4">
          <div>
            <Label className="text-xs text-gray-400 mb-1.5 block">Title <span className="text-red-400">*</span></Label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Announcement title"
              required
              className="bg-white/5 border-white/10 text-white h-9 text-sm placeholder:text-gray-600"
            />
          </div>
          <div>
            <Label className="text-xs text-gray-400 mb-1.5 block">Message <span className="text-red-400">*</span></Label>
            <textarea
              rows={4}
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              placeholder="Write your message to interns..."
              required
              className="bg-white/5 border border-white/10 rounded-lg text-white text-sm p-3 w-full focus:border-primary outline-none resize-none placeholder:text-gray-600"
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="ann-global"
              checked={form.isGlobal}
              onChange={(e) => setForm({ ...form, isGlobal: e.target.checked })}
              className="accent-primary"
            />
            <Label htmlFor="ann-global" className="text-xs text-gray-400 cursor-pointer">Send globally to all interns</Label>
          </div>
          {!form.isGlobal && (
            <div>
              <Label className="text-xs text-gray-400 mb-1.5 block">Target Batch (optional)</Label>
              <select
                value={form.batchId}
                onChange={(e) => setForm({ ...form, batchId: e.target.value })}
                className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:border-primary outline-none w-full [&_option]:text-black"
              >
                <option value="">— All batches —</option>
                {batches.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
          )}
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 border-white/10 text-gray-400 hover:text-white bg-transparent h-9 text-sm">
              Cancel
            </Button>
            <Button type="submit" disabled={saving} className="flex-1 h-9 text-sm gap-1.5">
              <Send className="h-3.5 w-3.5" />
              {saving ? "Sending..." : "Send"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Confirm Modal ─────────────────────────────────────────────────────────────

function ConfirmModal({ title, message, onConfirm, onClose, dangerous = false, loading = false }) {
  return (
    <div className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0d1117] border border-white/10 rounded-2xl w-full max-w-sm shadow-2xl">
        <div className="p-6 text-center">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${dangerous ? "bg-red-400/10" : "bg-amber-400/10"}`}>
            {dangerous
              ? <Trash2 className="h-5 w-5 text-red-400" />
              : <UserX className="h-5 w-5 text-amber-400" />}
          </div>
          <h2 className="text-sm font-bold text-white mb-2">{title}</h2>
          <p className="text-xs text-gray-400 mb-6">{message}</p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1 border-white/10 text-gray-400 hover:text-white bg-transparent h-9 text-sm">
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              disabled={loading}
              className={`flex-1 h-9 text-sm border-0 ${dangerous ? "bg-red-500/80 hover:bg-red-500 text-white" : "bg-amber-500/80 hover:bg-amber-500 text-white"}`}
            >
              {loading ? "Please wait..." : "Confirm"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Row Actions Menu ──────────────────────────────────────────────────────────

function RowActionsMenu({ student, onView, onDeactivate, onRemove }) {
  const [open, setOpen] = useState(false);
  const status = getStudentStatus(student);

  function act(fn) {
    setOpen(false);
    fn();
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-8 z-20 bg-[#0d1117] border border-white/10 rounded-xl shadow-2xl py-1 w-44 overflow-hidden">
            <button
              onClick={() => act(onView)}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-all"
            >
              <Eye className="h-3.5 w-3.5 text-gray-500" /> View Profile
            </button>
            <button
              onClick={() => act(() => onView(student, "attendance"))}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-all"
            >
              <History className="h-3.5 w-3.5 text-gray-500" /> Attendance History
            </button>
            {status !== "INACTIVE" && (
              <button
                onClick={() => act(onDeactivate)}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-amber-400 hover:bg-amber-400/5 transition-all"
              >
                <UserX className="h-3.5 w-3.5" /> Deactivate
              </button>
            )}
            <div className="h-px bg-white/5 my-1" />
            <button
              onClick={() => act(onRemove)}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-red-400 hover:bg-red-400/5 transition-all"
            >
              <Trash2 className="h-3.5 w-3.5" /> Remove
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function AdminStudentsPage() {
  const [students, setStudents] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterBatch, setFilterBatch] = useState("");

  // Selection
  const [selectedIds, setSelectedIds] = useState(new Set());

  // UI state
  const [activeTab, setActiveTab] = useState("students");
  const [profileStudent, setProfileStudent] = useState(null);
  const [historyStudent, setHistoryStudent] = useState(null);
  const [announcementModal, setAnnouncementModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Load data
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [s, b] = await Promise.all([getStudentsForAdmin(), getBatches()]);
      setStudents(s);
      setBatches(b);
    } catch {
      toast.error("Failed to load students");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Derived analytics stats
  const stats = useMemo(() => {
    const selected = students.filter((s) => s.status === "SELECTED");
    const completed = selected.filter((s) => s.progress?.completed).length;
    return {
      total: selected.length,
      active: selected.length - completed,
      completed,
      inactive: students.filter((s) => s.status === "REJECTED").length,
    };
  }, [students]);

  // Unique roles for filter dropdown
  const roles = useMemo(() => {
    const set = new Set(students.map((s) => s.batch?.program?.title).filter(Boolean));
    return [...set];
  }, [students]);

  // Filtered student list
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const status = getStudentStatus(s);
      if (filterStatus && status !== filterStatus) return false;
      if (filterRole && s.batch?.program?.title !== filterRole) return false;
      if (filterBatch && s.batchId !== filterBatch) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          s.user?.name?.toLowerCase().includes(q) ||
          s.user?.email?.toLowerCase().includes(q) ||
          s.user?.college?.name?.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [students, search, filterStatus, filterRole, filterBatch]);

  const hasFilters = search || filterStatus || filterRole || filterBatch;

  // Bulk selection helpers
  const allSelected =
    filteredStudents.length > 0 && filteredStudents.every((s) => selectedIds.has(s.id));

  function toggleSelectAll() {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredStudents.map((s) => s.id)));
    }
  }

  function toggleSelect(id) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const selectedStudents = useMemo(
    () => students.filter((s) => selectedIds.has(s.id)),
    [students, selectedIds]
  );

  // Actions
  async function handleDeactivate(applicationId) {
    setActionLoading(true);
    try {
      await deactivateStudent(applicationId);
      toast.success("Student deactivated.");
      setConfirmModal(null);
      setProfileStudent(null);
      await loadData();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setActionLoading(false);
    }
  }

  async function handleRemove(applicationId) {
    setActionLoading(true);
    try {
      await removeStudentApplication(applicationId);
      toast.success("Student removed successfully.");
      setConfirmModal(null);
      setProfileStudent(null);
      await loadData();
    } catch (e) {
      toast.error("Failed to remove: " + e.message);
    } finally {
      setActionLoading(false);
    }
  }

  async function handleBulkRemove() {
    setActionLoading(true);
    const ids = [...selectedIds];
    let removed = 0;
    try {
      for (const appId of ids) {
        try {
          await removeStudentApplication(appId);
          removed++;
        } catch {
          // continue removing others
        }
      }
      setSelectedIds(new Set());
      setConfirmModal(null);
      toast.success(`${removed} student(s) removed.`);
      await loadData();
    } finally {
      setActionLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* ── Page Header ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Student Management</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Manage all interns across batches — TechieHelp Institute of AI
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={loadData}
            disabled={loading}
            className="h-9 text-xs border-white/10 text-gray-400 hover:text-white bg-transparent gap-1.5"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => exportStudentsCSV(filteredStudents, "techiehelp_students")}
            disabled={filteredStudents.length === 0}
            className="h-9 text-xs border-white/10 text-gray-400 hover:text-white bg-transparent gap-1.5"
          >
            <Download className="h-3.5 w-3.5" />
            Download List
          </Button>
        </div>
      </div>

      {/* ── Analytics Cards ───────────────────────────────────────── */}
      <AnalyticsCards stats={stats} />

      {/* ── Tabs ──────────────────────────────────────────────────── */}
      <div className="flex gap-1 bg-white/3 border border-white/8 p-1 rounded-xl w-fit">
        {[
          { key: "students", label: "Students", icon: Users },
          { key: "leaderboard", label: "Top Performers", icon: Trophy },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === key
                ? "bg-primary/15 text-primary border border-primary/25"
                : "text-gray-500 hover:text-white hover:bg-white/5"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* ── Tab: Leaderboard ──────────────────────────────────────── */}
      {activeTab === "leaderboard" && (
        <div className="bg-white/3 border border-white/8 rounded-xl p-5">
          <PerformanceLeaderboard students={students} />
        </div>
      )}

      {/* ── Tab: Students ─────────────────────────────────────────── */}
      {activeTab === "students" && (
        <>
          {/* Search & Filters */}
          <div className="bg-white/3 border border-white/8 rounded-xl p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search by name, email, or college..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-white/5 border border-white/10 text-white text-sm rounded-lg pl-9 pr-3 py-2 focus:border-primary outline-none w-full placeholder:text-gray-600"
                />
              </div>

              {/* Status filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:border-primary outline-none sm:w-36 [&_option]:text-black"
              >
                <option value="">All Statuses</option>
                <option value="ACTIVE">Active</option>
                <option value="COMPLETED">Completed</option>
                <option value="INACTIVE">Inactive</option>
              </select>

              {/* Role filter */}
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:border-primary outline-none sm:w-44 [&_option]:text-black"
              >
                <option value="">All Roles</option>
                {roles.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>

              {/* Batch filter */}
              <select
                value={filterBatch}
                onChange={(e) => setFilterBatch(e.target.value)}
                className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:border-primary outline-none sm:w-44 [&_option]:text-black"
              >
                <option value="">All Batches</option>
                {batches.map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>

            {hasFilters && (
              <div className="flex items-center gap-2 mt-3">
                <span className="text-xs text-gray-500">
                  Showing {filteredStudents.length} of {students.length} students
                </span>
                <button
                  onClick={() => { setSearch(""); setFilterStatus(""); setFilterRole(""); setFilterBatch(""); }}
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  <X className="h-3 w-3" /> Clear filters
                </button>
              </div>
            )}
          </div>

          {/* Bulk Actions Bar */}
          {selectedIds.size > 0 && (
            <div className="flex flex-wrap items-center gap-3 bg-primary/5 border border-primary/20 rounded-xl px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
                  <CheckSquare className="h-3 w-3 text-primary-foreground" />
                </div>
                <span className="text-xs font-semibold text-primary">
                  {selectedIds.size} student{selectedIds.size !== 1 ? "s" : ""} selected
                </span>
              </div>
              <div className="flex-1" />
              <Button
                size="sm"
                variant="outline"
                onClick={() => exportStudentsCSV(selectedStudents, "selected_students")}
                className="h-7 text-xs border-white/10 text-gray-300 hover:text-white bg-transparent gap-1.5"
              >
                <Download className="h-3 w-3" /> Export Selected
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setAnnouncementModal(true)}
                className="h-7 text-xs border-blue-400/30 text-blue-400 hover:bg-blue-400/5 bg-transparent gap-1.5"
              >
                <Megaphone className="h-3 w-3" /> Send Announcement
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setConfirmModal({
                    title: "Remove Selected Students",
                    message: `Are you sure you want to remove ${selectedIds.size} student(s)? This action cannot be undone.`,
                    onConfirm: handleBulkRemove,
                    dangerous: true,
                  })
                }
                className="h-7 text-xs border-red-400/30 text-red-400 hover:bg-red-400/5 bg-transparent gap-1.5"
              >
                <Trash2 className="h-3 w-3" /> Remove
              </Button>
              <button
                onClick={() => setSelectedIds(new Set())}
                className="p-1 rounded text-gray-500 hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* Students Table */}
          <div className="bg-white/3 border border-white/8 rounded-xl overflow-hidden">
            {loading ? (
              <div className="p-6 space-y-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-16 bg-white/3 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : filteredStudents.length === 0 ? (
              <div className="text-center py-20">
                <Users className="h-8 w-8 mx-auto mb-3 text-gray-700" />
                <p className="text-gray-400 font-medium text-sm">
                  {hasFilters ? "No students match your filters" : "No students found"}
                </p>
                <p className="text-gray-600 text-xs mt-1">
                  {hasFilters
                    ? "Try adjusting search or filters above"
                    : "Students appear here once they are selected in the Applications page"}
                </p>
                {hasFilters && (
                  <button
                    onClick={() => { setSearch(""); setFilterStatus(""); setFilterRole(""); setFilterBatch(""); }}
                    className="mt-4 text-xs text-primary hover:underline"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[960px]">
                  <thead>
                    <tr className="border-b border-white/8 text-gray-500 text-xs uppercase tracking-wider bg-white/2">
                      <th className="px-4 py-3 w-10">
                        <button onClick={toggleSelectAll} className="text-gray-500 hover:text-white transition-colors">
                          {allSelected
                            ? <CheckSquare className="h-3.5 w-3.5 text-primary" />
                            : <Square className="h-3.5 w-3.5" />}
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left w-8">#</th>
                      <th className="px-4 py-3 text-left">Student</th>
                      <th className="px-4 py-3 text-left hidden md:table-cell">Role</th>
                      <th className="px-4 py-3 text-left hidden lg:table-cell">College</th>
                      <th className="px-4 py-3 text-left hidden lg:table-cell">Joined</th>
                      <th className="px-4 py-3 text-center">Attendance</th>
                      <th className="px-4 py-3 text-center">Tasks</th>
                      <th className="px-4 py-3 text-center hidden sm:table-cell">Score</th>
                      <th className="px-4 py-3 text-center">Status</th>
                      <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredStudents.map((student, idx) => {
                      const status = getStudentStatus(student);
                      const cfg = STATUS_CFG[status];
                      const att = student.progress?.attendancePct ?? null;
                      const tasks = student.progress?.tasksCompleted ?? 0;
                      const totalTasks = student.progress?.totalTasks ?? 0;
                      const score = student.progress?.performScore ?? 0;
                      const isSelected = selectedIds.has(student.id);

                      return (
                        <tr
                          key={student.id}
                          className={`hover:bg-white/2 transition-colors ${isSelected ? "bg-primary/3" : ""}`}
                        >
                          {/* Checkbox */}
                          <td className="px-4 py-3">
                            <button
                              onClick={() => toggleSelect(student.id)}
                              className="text-gray-500 hover:text-white transition-colors"
                            >
                              {isSelected
                                ? <CheckSquare className="h-3.5 w-3.5 text-primary" />
                                : <Square className="h-3.5 w-3.5" />}
                            </button>
                          </td>

                          {/* Index */}
                          <td className="px-4 py-3 text-xs text-gray-600">{idx + 1}</td>

                          {/* Student */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                                {student.user?.name?.[0]?.toUpperCase() || "?"}
                              </div>
                              <div className="min-w-0">
                                <button
                                  onClick={() => setProfileStudent(student)}
                                  className="text-xs font-semibold text-white hover:text-primary transition-colors text-left truncate block max-w-[140px]"
                                >
                                  {student.user?.name || "—"}
                                </button>
                                <p className="text-[10px] text-gray-500 truncate max-w-[140px]">
                                  {student.user?.email}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Role */}
                          <td className="px-4 py-3 hidden md:table-cell">
                            <p className="text-xs text-white font-medium line-clamp-1">
                              {student.batch?.program?.title || "—"}
                            </p>
                            <p className="text-[10px] text-gray-600">{student.batch?.name || "—"}</p>
                          </td>

                          {/* College */}
                          <td className="px-4 py-3 hidden lg:table-cell">
                            <p className="text-xs text-gray-400 line-clamp-1 max-w-[140px]">
                              {student.user?.college?.name || "—"}
                            </p>
                          </td>

                          {/* Joined */}
                          <td className="px-4 py-3 hidden lg:table-cell">
                            <p className="text-xs text-gray-500">{fmtDate(student.appliedAt)}</p>
                          </td>

                          {/* Attendance */}
                          <td className="px-4 py-3 text-center">
                            {att !== null ? (
                              <button
                                onClick={() => setHistoryStudent(student)}
                                className="flex flex-col items-center group"
                                title="Click to view attendance history"
                              >
                                <span className={`text-xs font-bold group-hover:underline ${getAttendanceTextColor(att)}`}>
                                  {att}%
                                </span>
                                <div className="w-14 h-1 bg-white/10 rounded-full overflow-hidden mt-1">
                                  <div
                                    className={`h-full rounded-full transition-all ${getAttendanceColor(att)}`}
                                    style={{ width: `${att}%` }}
                                  />
                                </div>
                              </button>
                            ) : (
                              <span className="text-xs text-gray-600">—</span>
                            )}
                          </td>

                          {/* Tasks */}
                          <td className="px-4 py-3 text-center">
                            <div className="flex flex-col items-center">
                              <span className="text-xs font-bold text-white">
                                {tasks}<span className="text-gray-600 font-normal">/{totalTasks}</span>
                              </span>
                              <div className="w-14 h-1 bg-white/10 rounded-full overflow-hidden mt-1">
                                <div
                                  className="h-full rounded-full bg-primary transition-all"
                                  style={{ width: `${totalTasks > 0 ? (tasks / totalTasks) * 100 : 0}%` }}
                                />
                              </div>
                            </div>
                          </td>

                          {/* Score */}
                          <td className="px-4 py-3 text-center hidden sm:table-cell">
                            <div className="flex items-center justify-center gap-1">
                              <Star className="h-3 w-3 text-yellow-400/70" />
                              <span className={`text-xs font-bold ${getScoreColor(score)}`}>{score}</span>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="px-4 py-3 text-center">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-semibold ${cfg.badge}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                              {cfg.label}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="px-4 py-3 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => setProfileStudent(student)}
                                className="p-1.5 rounded-lg text-gray-500 hover:text-primary hover:bg-primary/10 transition-all"
                                title="View profile"
                              >
                                <Eye className="h-3.5 w-3.5" />
                              </button>
                              <RowActionsMenu
                                student={student}
                                onView={() => setProfileStudent(student)}
                                onDeactivate={() =>
                                  setConfirmModal({
                                    title: "Deactivate Student",
                                    message: `Deactivate ${student.user?.name}? Their status will be changed to Inactive.`,
                                    onConfirm: () => handleDeactivate(student.id),
                                    dangerous: false,
                                  })
                                }
                                onRemove={() =>
                                  setConfirmModal({
                                    title: "Remove Student",
                                    message: `Permanently remove ${student.user?.name}? All their application data will be deleted.`,
                                    onConfirm: () => handleRemove(student.id),
                                    dangerous: true,
                                  })
                                }
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Table Footer */}
                <div className="px-4 py-3 border-t border-white/8 bg-white/1 flex items-center justify-between">
                  <p className="text-xs text-gray-600">
                    Showing {filteredStudents.length} of {students.length} students
                    {selectedIds.size > 0 && (
                      <span className="text-primary ml-2">· {selectedIds.size} selected</span>
                    )}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <span>{stats.active} active</span>
                    <span>{stats.completed} completed</span>
                    <span>{stats.inactive} inactive</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* ── Profile Panel ─────────────────────────────────────────── */}
      {profileStudent && (
        <StudentProfilePanel
          student={profileStudent}
          onClose={() => setProfileStudent(null)}
          onViewAttendance={(s) => {
            setHistoryStudent(s);
          }}
          onDeactivate={(s) =>
            setConfirmModal({
              title: "Deactivate Student",
              message: `Deactivate ${s.user?.name}? Their status will be changed to Inactive.`,
              onConfirm: () => handleDeactivate(s.id),
              dangerous: false,
            })
          }
          onRemove={(s) =>
            setConfirmModal({
              title: "Remove Student",
              message: `Permanently remove ${s.user?.name}? All their application data will be deleted.`,
              onConfirm: () => handleRemove(s.id),
              dangerous: true,
            })
          }
        />
      )}

      {/* ── Attendance History Modal ───────────────────────────────── */}
      {historyStudent && (
        <AttendanceHistoryModal
          student={historyStudent}
          onClose={() => setHistoryStudent(null)}
        />
      )}

      {/* ── Announcement Modal ────────────────────────────────────── */}
      {announcementModal && (
        <AnnouncementModal
          selectedStudents={selectedStudents}
          batches={batches}
          onClose={() => setAnnouncementModal(false)}
        />
      )}

      {/* ── Confirm Modal ─────────────────────────────────────────── */}
      {confirmModal && (
        <ConfirmModal
          title={confirmModal.title}
          message={confirmModal.message}
          onConfirm={confirmModal.onConfirm}
          onClose={() => setConfirmModal(null)}
          dangerous={confirmModal.dangerous}
          loading={actionLoading}
        />
      )}
    </div>
  );
}
