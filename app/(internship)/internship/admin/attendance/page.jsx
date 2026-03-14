"use client";

import { useState, useEffect } from "react";
import {
  getBatches,
  getBatchAttendanceForDate,
  markAttendanceWithStatus,
  bulkMarkStatusAttendance,
  getStudentAttendanceHistory,
} from "@/actions/internship-admin";
import { toast } from "sonner";
import {
  Calendar, Users, Search, Download, History, X,
  CheckCircle2, XCircle, Clock, AlertTriangle, UserCheck,
  TrendingUp, ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Status config ────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  PRESENT: {
    label: "Present",
    badge: "text-green-400 bg-green-400/10 border-green-400/20",
    select: "bg-green-400/10 border-green-400/20 text-green-400",
    icon: CheckCircle2,
  },
  ABSENT: {
    label: "Absent",
    badge: "text-red-400 bg-red-400/10 border-red-400/20",
    select: "bg-red-400/10 border-red-400/20 text-red-400",
    icon: XCircle,
  },
  LEAVE: {
    label: "Leave",
    badge: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    select: "bg-amber-400/10 border-amber-400/20 text-amber-400",
    icon: Clock,
  },
  LATE: {
    label: "Late",
    badge: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    select: "bg-blue-400/10 border-blue-400/20 text-blue-400",
    icon: AlertTriangle,
  },
};

function deriveStatus(record) {
  if (!record) return null;
  if (record.note && STATUS_CONFIG[record.note]) return record.note;
  return record.present ? "PRESENT" : "ABSENT";
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminAttendancePage() {
  const [batches, setBatches] = useState([]);
  const [selectedBatchId, setSelectedBatchId] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savingIds, setSavingIds] = useState(new Set());
  const [bulkSaving, setBulkSaving] = useState(false);

  // History modal state
  const [historyModal, setHistoryModal] = useState(null);
  const [historyRecords, setHistoryRecords] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Load batches once
  useEffect(() => {
    getBatches().then(setBatches).catch(() => toast.error("Failed to load batches"));
  }, []);

  // Load students when batch or date changes
  useEffect(() => {
    if (selectedBatchId && selectedDate) loadStudents();
    else setStudents([]);
  }, [selectedBatchId, selectedDate]);

  async function loadStudents() {
    setLoading(true);
    try {
      const apps = await getBatchAttendanceForDate(selectedBatchId, selectedDate);
      setStudents(
        apps.map((app) => {
          const rec = app.attendance?.[0] ?? null;
          const status = deriveStatus(rec);
          return {
            applicationId: app.id,
            user: app.user,
            batch: app.batch,
            progress: app.progress,
            currentStatus: status,
            savedStatus: status,
          };
        })
      );
    } catch (e) {
      toast.error("Failed to load students: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  // Auto-save when status changes
  async function handleStatusChange(applicationId, status) {
    // Optimistic update
    setStudents((prev) =>
      prev.map((s) =>
        s.applicationId === applicationId ? { ...s, currentStatus: status } : s
      )
    );
    if (!status) return;

    setSavingIds((prev) => new Set([...prev, applicationId]));
    try {
      await markAttendanceWithStatus(applicationId, selectedDate, status);
      setStudents((prev) =>
        prev.map((s) =>
          s.applicationId === applicationId ? { ...s, savedStatus: status } : s
        )
      );
    } catch (e) {
      toast.error("Save failed: " + e.message);
      // Revert
      setStudents((prev) =>
        prev.map((s) =>
          s.applicationId === applicationId
            ? { ...s, currentStatus: s.savedStatus }
            : s
        )
      );
    } finally {
      setSavingIds((prev) => {
        const next = new Set(prev);
        next.delete(applicationId);
        return next;
      });
    }
  }

  async function handleMarkAllPresent() {
    if (!selectedBatchId) return;
    setBulkSaving(true);
    try {
      await bulkMarkStatusAttendance(selectedBatchId, selectedDate, "PRESENT");
      setStudents((prev) =>
        prev.map((s) => ({ ...s, currentStatus: "PRESENT", savedStatus: "PRESENT" }))
      );
      toast.success("All students marked as Present!");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBulkSaving(false);
    }
  }

  async function openHistory(applicationId, studentName, programTitle) {
    setHistoryModal({ applicationId, studentName, programTitle });
    setHistoryLoading(true);
    setHistoryRecords([]);
    try {
      const records = await getStudentAttendanceHistory(applicationId);
      setHistoryRecords(records);
    } catch {
      toast.error("Failed to load history");
    } finally {
      setHistoryLoading(false);
    }
  }

  function exportCSV() {
    if (filteredStudents.length === 0) return;
    const header = ["#", "Name", "Email", "Branch", "Program", "Date", "Status", "Attendance %"];
    const rows = filteredStudents.map((s, i) => [
      i + 1,
      s.user.name ?? "-",
      s.user.email ?? "-",
      s.user.branch ?? "-",
      s.batch?.program?.title ?? "-",
      selectedDate,
      s.currentStatus ?? "NOT MARKED",
      s.progress?.attendancePct != null ? s.progress.attendancePct + "%" : "-",
    ]);
    const csv = [header, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `attendance_${selectedDate}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("CSV exported!");
  }

  // ── Derived state ───────────────────────────────────────────────────────────
  const filteredStudents = students.filter((s) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      s.user.name?.toLowerCase().includes(q) ||
      s.user.email?.toLowerCase().includes(q)
    );
  });

  const stats = {
    total: students.length,
    present: students.filter((s) => s.currentStatus === "PRESENT").length,
    absent: students.filter((s) => s.currentStatus === "ABSENT").length,
    leave: students.filter((s) => s.currentStatus === "LEAVE").length,
    late: students.filter((s) => s.currentStatus === "LATE").length,
    unmarked: students.filter((s) => !s.currentStatus).length,
  };

  const todayPct =
    stats.total > 0
      ? Math.round(((stats.present + stats.late) / stats.total) * 100)
      : 0;

  const formattedDate = selectedDate
    ? new Date(selectedDate + "T00:00:00").toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  // History modal derived stats
  const historyPresent = historyRecords.filter(
    (r) => r.note === "PRESENT" || (r.present && !r.note)
  ).length;
  const historyAbsent = historyRecords.filter(
    (r) => r.note === "ABSENT" || (!r.present && !r.note && r.note !== "LEAVE")
  ).length;
  const historyLate = historyRecords.filter((r) => r.note === "LATE").length;
  const historyLeave = historyRecords.filter((r) => r.note === "LEAVE").length;
  const historyPct =
    historyRecords.length > 0
      ? Math.round(((historyPresent + historyLate) / historyRecords.length) * 100)
      : 0;

  return (
    <div className="space-y-6">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Attendance Management</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Mark and track daily attendance for active intern batches
          </p>
        </div>
        {selectedBatchId && students.length > 0 && (
          <div
            className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
              todayPct >= 75
                ? "text-green-400 bg-green-400/10 border-green-400/20"
                : todayPct >= 50
                ? "text-amber-400 bg-amber-400/10 border-amber-400/20"
                : "text-red-400 bg-red-400/10 border-red-400/20"
            }`}
          >
            {todayPct}% Today's Attendance
          </div>
        )}
      </div>

      {/* ── Filters ────────────────────────────────────────────────── */}
      <div className="bg-white/3 border border-white/8 rounded-xl p-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="text-xs text-gray-400 block mb-1.5">Select Batch</label>
          <select
            value={selectedBatchId}
            onChange={(e) => setSelectedBatchId(e.target.value)}
            className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:border-primary outline-none w-full"
          >
            <option value="">— Select a Batch —</option>
            {batches
              .filter((b) => b.status === "ACTIVE" || b.status === "UPCOMING")
              .map((b) => (
                <option key={b.id} value={b.id}>
                  {b.program?.title} — {b.name} ({b.status})
                </option>
              ))}
          </select>
        </div>
        <div className="sm:w-48">
          <label className="text-xs text-gray-400 block mb-1.5">Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:border-primary outline-none w-full"
          />
        </div>
        <div className="flex-1">
          <label className="text-xs text-gray-400 block mb-1.5">Search Student</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 text-white text-sm rounded-lg pl-9 pr-3 py-2 focus:border-primary outline-none w-full placeholder:text-gray-600"
            />
          </div>
        </div>
      </div>

      {/* ── Empty state ─────────────────────────────────────────────── */}
      {!selectedBatchId ? (
        <div className="text-center py-20 bg-white/3 border border-dashed border-white/8 rounded-xl">
          <Calendar className="h-10 w-10 mx-auto mb-3 text-gray-700" />
          <p className="text-gray-400 font-medium">Select a batch to start marking attendance</p>
          <p className="text-gray-600 text-sm mt-1">
            Choose an active or upcoming batch from the dropdown above
          </p>
        </div>
      ) : loading ? (
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-16 bg-white/3 border border-white/5 rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : (
        <>
          {/* ── Stats ────────────────────────────────────────────────── */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {[
              { label: "Total", value: stats.total, cls: "text-gray-300 bg-white/5 border-white/10" },
              { label: "Present", value: stats.present, cls: "text-green-400 bg-green-400/10 border-green-400/20" },
              { label: "Absent", value: stats.absent, cls: "text-red-400 bg-red-400/10 border-red-400/20" },
              { label: "Leave", value: stats.leave, cls: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
              { label: "Late", value: stats.late, cls: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
              { label: "Unmarked", value: stats.unmarked, cls: "text-gray-500 bg-white/3 border-white/8" },
            ].map(({ label, value, cls }) => (
              <div key={label} className={`rounded-xl p-3 border text-center ${cls}`}>
                <p className="text-xl font-extrabold">{value}</p>
                <p className="text-[10px] font-medium mt-0.5 opacity-80">{label}</p>
              </div>
            ))}
          </div>

          {/* ── Action bar ───────────────────────────────────────────── */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs text-gray-500 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formattedDate}
            </span>
            <div className="flex-1" />
            <Button
              onClick={handleMarkAllPresent}
              disabled={bulkSaving || students.length === 0}
              size="sm"
              variant="outline"
              className="text-xs border-green-400/30 text-green-400 hover:bg-green-400/10 bg-transparent gap-1.5 h-8"
            >
              <UserCheck className="h-3.5 w-3.5" />
              {bulkSaving ? "Saving..." : "Mark All Present"}
            </Button>
            <Button
              onClick={exportCSV}
              disabled={students.length === 0}
              size="sm"
              variant="outline"
              className="text-xs border-white/10 text-gray-300 hover:bg-white/5 bg-transparent gap-1.5 h-8"
            >
              <Download className="h-3.5 w-3.5" />
              Export CSV
            </Button>
          </div>

          {/* ── Table ───────────────────────────────────────────────── */}
          <div className="bg-white/3 border border-white/8 rounded-xl overflow-hidden">
            {students.length === 0 ? (
              <div className="text-center py-16">
                <Users className="h-8 w-8 mx-auto mb-3 text-gray-700" />
                <p className="text-gray-400 font-medium text-sm">No selected interns in this batch</p>
                <p className="text-gray-600 text-xs mt-1">
                  Review and select applications first from the Applications page
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[680px]">
                    <thead>
                      <tr className="border-b border-white/8 text-gray-500 text-xs uppercase tracking-wider bg-white/2">
                        <th className="px-4 py-3 text-left w-10">#</th>
                        <th className="px-4 py-3 text-left">Student</th>
                        <th className="px-4 py-3 text-left hidden md:table-cell">Role / Branch</th>
                        <th className="px-4 py-3 text-left">Attendance Status</th>
                        <th className="px-4 py-3 text-center hidden sm:table-cell">Overall Att%</th>
                        <th className="px-4 py-3 text-center">History</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredStudents.map((student, idx) => {
                        const isSaving = savingIds.has(student.applicationId);
                        const status = student.currentStatus;
                        const selectCls = status
                          ? STATUS_CONFIG[status]?.select
                          : "bg-white/5 border-white/10 text-gray-400";

                        return (
                          <tr
                            key={student.applicationId}
                            className="hover:bg-white/2 transition-colors"
                          >
                            {/* # */}
                            <td className="px-4 py-3 text-xs text-gray-600">{idx + 1}</td>

                            {/* Student */}
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                  {student.user?.name?.[0]?.toUpperCase() ?? "?"}
                                </div>
                                <div>
                                  <p className="text-xs font-semibold text-white">
                                    {student.user?.name ?? "—"}
                                  </p>
                                  <p className="text-[10px] text-gray-500">{student.user?.email}</p>
                                </div>
                              </div>
                            </td>

                            {/* Role / Branch */}
                            <td className="px-4 py-3 hidden md:table-cell">
                              <p className="text-xs text-gray-300">
                                {student.batch?.program?.title ?? "—"}
                              </p>
                              <p className="text-[10px] text-gray-600">
                                {student.user?.branch ?? "Student"}
                              </p>
                            </td>

                            {/* Status Dropdown */}
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <select
                                  value={status ?? ""}
                                  onChange={(e) =>
                                    handleStatusChange(student.applicationId, e.target.value)
                                  }
                                  disabled={isSaving}
                                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg border outline-none cursor-pointer transition-all appearance-none disabled:opacity-60 ${selectCls}`}
                                >
                                  <option value="">— Not Marked —</option>
                                  <option value="PRESENT">✅ Present</option>
                                  <option value="ABSENT">❌ Absent</option>
                                  <option value="LEAVE">📋 Leave</option>
                                  <option value="LATE">⏰ Late</option>
                                </select>
                                {isSaving && (
                                  <span className="text-[10px] text-gray-500 animate-pulse">
                                    Saving…
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* Overall Att% */}
                            <td className="px-4 py-3 text-center hidden sm:table-cell">
                              {student.progress?.attendancePct != null ? (
                                <div className="flex flex-col items-center gap-1">
                                  <span
                                    className={`text-xs font-bold ${
                                      student.progress.attendancePct >= 75
                                        ? "text-green-400"
                                        : student.progress.attendancePct >= 50
                                        ? "text-amber-400"
                                        : "text-red-400"
                                    }`}
                                  >
                                    {student.progress.attendancePct}%
                                  </span>
                                  <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                      className={`h-full rounded-full transition-all ${
                                        student.progress.attendancePct >= 75
                                          ? "bg-green-400"
                                          : student.progress.attendancePct >= 50
                                          ? "bg-amber-400"
                                          : "bg-red-400"
                                      }`}
                                      style={{ width: `${student.progress.attendancePct}%` }}
                                    />
                                  </div>
                                </div>
                              ) : (
                                <span className="text-xs text-gray-600">—</span>
                              )}
                            </td>

                            {/* History */}
                            <td className="px-4 py-3 text-center">
                              <button
                                onClick={() =>
                                  openHistory(
                                    student.applicationId,
                                    student.user?.name,
                                    student.batch?.program?.title
                                  )
                                }
                                className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all"
                                title="View attendance history"
                              >
                                <History className="h-3.5 w-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {filteredStudents.length === 0 && search && (
                  <p className="text-center py-8 text-sm text-gray-500">
                    No students match &ldquo;{search}&rdquo;
                  </p>
                )}

                {/* Footer */}
                {students.length > 0 && (
                  <div className="px-4 py-3 border-t border-white/8 bg-white/1 flex items-center justify-between">
                    <p className="text-xs text-gray-600">
                      Showing {filteredStudents.length} of {students.length} interns
                    </p>
                    <p className="text-xs text-gray-600">
                      {stats.unmarked > 0 && (
                        <span className="text-amber-400">{stats.unmarked} not marked yet</span>
                      )}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}

      {/* ── History Modal ────────────────────────────────────────────── */}
      {historyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0d0f1a] border border-white/10 rounded-2xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="p-5 border-b border-white/8 flex items-start justify-between flex-shrink-0">
              <div>
                <h2 className="text-base font-bold text-white">{historyModal.studentName}</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  {historyModal.programTitle} · Attendance History
                </p>
              </div>
              <button
                onClick={() => setHistoryModal(null)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all ml-4"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Summary Stats */}
            {!historyLoading && historyRecords.length > 0 && (
              <div className="px-5 py-3 border-b border-white/5 flex-shrink-0">
                <div className="grid grid-cols-5 gap-2 mb-3">
                  {[
                    { label: "Days", value: historyRecords.length, cls: "text-gray-300" },
                    { label: "Present", value: historyPresent, cls: "text-green-400" },
                    { label: "Absent", value: historyAbsent, cls: "text-red-400" },
                    { label: "Late", value: historyLate, cls: "text-blue-400" },
                    { label: "Leave", value: historyLeave, cls: "text-amber-400" },
                  ].map(({ label, value, cls }) => (
                    <div key={label} className="text-center">
                      <p className={`text-lg font-bold ${cls}`}>{value}</p>
                      <p className="text-[10px] text-gray-600">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        historyPct >= 75 ? "bg-green-400" : historyPct >= 50 ? "bg-amber-400" : "bg-red-400"
                      }`}
                      style={{ width: `${historyPct}%` }}
                    />
                  </div>
                  <span
                    className={`text-xs font-bold ${
                      historyPct >= 75 ? "text-green-400" : historyPct >= 50 ? "text-amber-400" : "text-red-400"
                    }`}
                  >
                    {historyPct}% Attendance
                  </span>
                </div>
              </div>
            )}

            {/* Modal Records */}
            <div className="flex-1 overflow-y-auto">
              {historyLoading ? (
                <div className="p-10 text-center">
                  <div className="animate-spin h-6 w-6 border-2 border-white/20 border-t-white rounded-full mx-auto mb-3" />
                  <p className="text-sm text-gray-500">Loading history…</p>
                </div>
              ) : historyRecords.length === 0 ? (
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
                    {historyRecords.map((record) => {
                      const d = new Date(record.date);
                      const statusKey = deriveStatus(record);
                      const config = STATUS_CONFIG[statusKey] ?? STATUS_CONFIG.ABSENT;
                      return (
                        <tr key={record.id} className="hover:bg-white/3 transition-colors">
                          <td className="px-5 py-2.5 text-gray-300">
                            {d.toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>
                          <td className="px-5 py-2.5 text-gray-500">
                            {d.toLocaleDateString("en-IN", { weekday: "long" })}
                          </td>
                          <td className="px-5 py-2.5 text-center">
                            <span
                              className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold ${config.badge}`}
                            >
                              {config.label}
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
      )}
    </div>
  );
}
