"use client";

import { useState, useEffect, useMemo } from "react";
import { getMyAttendanceFull } from "@/actions/internship-student";
import {
  CalendarDays, CheckCircle2, XCircle, Clock, AlertTriangle,
  Download, Info, TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Config ───────────────────────────────────────────────────────────────────
const STATUS = {
  PRESENT: {
    label: "Present",
    badge: "text-green-400 bg-green-400/10 border-green-400/20",
    cardBg: "bg-green-400/5 border-green-400/20",
    dot: "bg-green-400",
    bar: "bg-green-400",
    text: "text-green-400",
    icon: CheckCircle2,
  },
  ABSENT: {
    label: "Absent",
    badge: "text-red-400 bg-red-400/10 border-red-400/20",
    cardBg: "bg-red-400/5 border-red-400/20",
    dot: "bg-red-400",
    bar: "bg-red-400",
    text: "text-red-400",
    icon: XCircle,
  },
  LEAVE: {
    label: "Leave",
    badge: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    cardBg: "bg-amber-400/5 border-amber-400/20",
    dot: "bg-amber-400",
    bar: "bg-amber-400",
    text: "text-amber-400",
    icon: Clock,
  },
  LATE: {
    label: "Late",
    badge: "text-orange-400 bg-orange-400/10 border-orange-400/20",
    cardBg: "bg-orange-400/5 border-orange-400/20",
    dot: "bg-orange-400",
    bar: "bg-orange-400",
    text: "text-orange-400",
    icon: AlertTriangle,
  },
  PENDING: {
    label: "Not Marked Yet",
    badge: "text-gray-400 bg-white/5 border-white/10",
    cardBg: "bg-white/3 border-white/8",
    dot: "bg-gray-700",
    bar: "bg-gray-600",
    text: "text-gray-400",
    icon: Info,
  },
};

const DAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getStatus(record) {
  if (!record) return "PENDING";
  if (record.note && STATUS[record.note]) return record.note;
  return record.present ? "PRESENT" : "ABSENT";
}

function dateKey(dateObj) {
  const d = new Date(dateObj);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function StudentAttendancePage() {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedYM, setSelectedYM] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  useEffect(() => {
    getMyAttendanceFull()
      .then(setApplication)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const records = application?.attendance ?? [];
  const todayStr = dateKey(new Date());

  // Today's record
  const todayRecord = records.find((r) => dateKey(r.date) === todayStr) ?? null;
  const todayStatus = getStatus(todayRecord);
  const TodayIcon = STATUS[todayStatus].icon;

  // Overall stats (all-time)
  const stats = useMemo(() => {
    const present = records.filter((r) => getStatus(r) === "PRESENT").length;
    const absent  = records.filter((r) => getStatus(r) === "ABSENT").length;
    const leave   = records.filter((r) => getStatus(r) === "LEAVE").length;
    const late    = records.filter((r) => getStatus(r) === "LATE").length;
    const total   = records.length;
    const pct     = total > 0 ? Math.round(((present + late) / total) * 100) : 0;
    return { present, absent, leave, late, total, pct };
  }, [records]);

  // Month options — populated from records + current month always included
  const availableMonths = useMemo(() => {
    const set = new Set(
      records.map((r) => {
        const d = new Date(r.date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      })
    );
    set.add(todayStr.slice(0, 7));
    return [...set].sort().reverse();
  }, [records, todayStr]);

  // Records for selected month
  const [selYear, selMonthIdx] = selectedYM.split("-").map(Number);
  const monthRecords = useMemo(
    () =>
      records.filter((r) => {
        const d = new Date(r.date);
        return d.getFullYear() === selYear && d.getMonth() === selMonthIdx - 1;
      }),
    [records, selYear, selMonthIdx]
  );

  // O(1) lookup map: "YYYY-MM-DD" → record
  const recordMap = useMemo(() => {
    const m = {};
    records.forEach((r) => { m[dateKey(r.date)] = r; });
    return m;
  }, [records]);

  // Calendar cells for selected month (null = empty leading cell)
  const calendarCells = useMemo(() => {
    const daysInMonth = new Date(selYear, selMonthIdx, 0).getDate();
    const firstDay = new Date(selYear, selMonthIdx - 1, 1).getDay();
    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const key = `${selYear}-${String(selMonthIdx).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      cells.push({ day: d, key, record: recordMap[key] ?? null });
    }
    return cells;
  }, [selYear, selMonthIdx, recordMap]);

  // CSV export
  function exportCSV() {
    const header = ["#", "Date", "Day", "Status", "Marked By"];
    const rows = [...records].reverse().map((r, i) => {
      const d = new Date(r.date);
      return [
        i + 1,
        d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
        d.toLocaleDateString("en-IN", { weekday: "long" }),
        STATUS[getStatus(r)]?.label ?? "-",
        r.markedBy ? "Admin" : "—",
      ];
    });
    const csv = [header, ...rows].map((row) => row.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `attendance_report_${todayStr}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const monthLabel = `${MONTH_NAMES[selMonthIdx - 1]} ${selYear}`;
  const pctColor = stats.pct >= 75 ? "text-green-400" : stats.pct >= 50 ? "text-amber-400" : "text-red-400";
  const pctBar   = stats.pct >= 75 ? "bg-green-400"   : stats.pct >= 50 ? "bg-amber-400"   : "bg-red-400";

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-7 w-52 bg-white/5 rounded-lg" />
        <div className="h-24 bg-white/3 rounded-2xl" />
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {[...Array(6)].map((_, i) => <div key={i} className="h-16 bg-white/3 rounded-xl" />)}
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="h-72 bg-white/3 rounded-xl" />
          <div className="h-72 bg-white/3 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">My Attendance</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {application?.batch?.program?.title
              ? `${application.batch.program.title} — ${application.batch.name}`
              : "Track your daily presence and attendance score"}
          </p>
        </div>
        {records.length > 0 && (
          <Button
            onClick={exportCSV}
            size="sm"
            variant="outline"
            className="text-xs border-white/10 text-gray-300 hover:bg-white/5 bg-transparent gap-1.5 h-8"
          >
            <Download className="h-3.5 w-3.5" /> Download Report
          </Button>
        )}
      </div>

      {/* ── No application ─────────────────────────────────────────────────── */}
      {!application ? (
        <div className="text-center py-20 bg-white/3 border border-dashed border-white/8 rounded-xl">
          <CalendarDays className="h-10 w-10 mx-auto mb-3 text-gray-700" />
          <p className="text-gray-400 font-medium">No active internship found</p>
          <p className="text-gray-600 text-sm mt-1">
            Join an active batch to start tracking your attendance
          </p>
        </div>
      ) : (
        <>
          {/* ── Today's Status Card ──────────────────────────────────────────── */}
          <div className={`rounded-2xl p-5 border ${STATUS[todayStatus].cardBg}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1.5">
                  Today&apos;s Attendance
                </p>
                <p className="text-white font-medium text-sm">
                  {new Date().toLocaleDateString("en-IN", {
                    weekday: "long", year: "numeric", month: "long", day: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-xl border ${STATUS[todayStatus].badge}`}>
                  <TodayIcon className="h-4 w-4" />
                  {STATUS[todayStatus].label}
                </span>
                {todayRecord?.markedBy && (
                  <span className="text-xs text-gray-500">Marked by Admin</span>
                )}
                {todayStatus === "PENDING" && (
                  <span className="text-xs text-gray-600 flex items-center gap-1">
                    <Info className="h-3.5 w-3.5" /> Not marked yet
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ── Overall Stats ────────────────────────────────────────────────── */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {[
              { label: "Total Days",  value: stats.total,           cls: "text-gray-300 bg-white/5 border-white/10" },
              { label: "Present",     value: stats.present,         cls: "text-green-400 bg-green-400/10 border-green-400/20" },
              { label: "Absent",      value: stats.absent,          cls: "text-red-400 bg-red-400/10 border-red-400/20" },
              { label: "Leave",       value: stats.leave,           cls: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
              { label: "Late",        value: stats.late,            cls: "text-orange-400 bg-orange-400/10 border-orange-400/20" },
              { label: "Score",       value: `${stats.pct}%`,       cls: stats.pct >= 75 ? "text-green-400 bg-green-400/10 border-green-400/20" : stats.pct >= 50 ? "text-amber-400 bg-amber-400/10 border-amber-400/20" : "text-red-400 bg-red-400/10 border-red-400/20" },
            ].map(({ label, value, cls }) => (
              <div key={label} className={`rounded-xl p-3 border text-center ${cls}`}>
                <p className="text-xl font-extrabold">{value}</p>
                <p className="text-[10px] font-medium mt-0.5 opacity-80">{label}</p>
              </div>
            ))}
          </div>

          {/* ── Overall Progress Bar ─────────────────────────────────────────── */}
          <div className="bg-white/3 border border-white/8 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-3.5 w-3.5 text-gray-500" />
                <span className="text-xs font-semibold text-white">Overall Attendance Score</span>
              </div>
              <span className={`text-sm font-bold ${pctColor}`}>{stats.pct}%</span>
            </div>
            <div className="h-2.5 bg-white/8 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${pctBar}`}
                style={{ width: `${stats.pct}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-1.5">
              <p className="text-[10px] text-gray-600">
                {stats.pct < 75 && stats.total > 0
                  ? `⚠️ Below 75% minimum — need ${Math.max(0, Math.ceil((0.75 * stats.total - (stats.present + stats.late)) / 0.25))} more days to qualify`
                  : stats.pct >= 75
                  ? "✅ Meeting minimum 75% attendance requirement"
                  : "No records yet"}
              </p>
              <p className="text-[10px] text-gray-600">{stats.present + stats.late} / {stats.total} days</p>
            </div>
          </div>

          {/* ── Month Selector ───────────────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-sm font-bold text-white">Monthly View</h2>
            <select
              value={selectedYM}
              onChange={(e) => setSelectedYM(e.target.value)}
              className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-primary w-full sm:w-52"
            >
              {availableMonths.map((ym) => {
                const [y, m] = ym.split("-");
                return (
                  <option key={ym} value={ym}>
                    {MONTH_NAMES[parseInt(m) - 1]} {y}
                  </option>
                );
              })}
            </select>
          </div>

          {/* ── Calendar + Table (side by side) ──────────────────────────────── */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Calendar */}
            <div className="bg-white/3 border border-white/8 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">{monthLabel}</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    ["Present", "bg-green-400"],
                    ["Absent",  "bg-red-400"],
                    ["Leave",   "bg-amber-400"],
                    ["Late",    "bg-orange-400"],
                    ["Pending", "bg-gray-600"],
                  ].map(([label, dot]) => (
                    <span key={label} className="flex items-center gap-1 text-[9px] text-gray-500">
                      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 mb-1">
                {DAY_HEADERS.map((d) => (
                  <div key={d} className="text-center text-[9px] font-semibold text-gray-600 py-1">
                    {d}
                  </div>
                ))}
              </div>

              {/* Day cells */}
              <div className="grid grid-cols-7 gap-1">
                {calendarCells.map((cell, i) => {
                  if (!cell) return <div key={`e-${i}`} />;

                  const status  = getStatus(cell.record);
                  const isToday = cell.key === todayStr;
                  const cfg     = STATUS[status];

                  const cellBg =
                    status === "PRESENT" ? "bg-green-400/10 hover:bg-green-400/20" :
                    status === "ABSENT"  ? "bg-red-400/10 hover:bg-red-400/20" :
                    status === "LEAVE"   ? "bg-amber-400/10 hover:bg-amber-400/20" :
                    status === "LATE"    ? "bg-orange-400/10 hover:bg-orange-400/20" :
                                          "bg-white/3 hover:bg-white/5";

                  return (
                    <div
                      key={cell.key}
                      title={`${cell.key} — ${cfg.label}`}
                      className={`aspect-square flex flex-col items-center justify-center rounded-lg transition-all cursor-default ${cellBg} ${
                        isToday ? "ring-2 ring-white/40" : ""
                      }`}
                    >
                      <span className={`text-[11px] font-semibold ${isToday ? "text-white" : "text-gray-400"}`}>
                        {cell.day}
                      </span>
                      <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${cfg.dot}`} />
                    </div>
                  );
                })}
              </div>

              {/* Monthly mini-stats */}
              {monthRecords.length > 0 && (
                <div className="mt-4 pt-3 border-t border-white/5 grid grid-cols-4 gap-2">
                  {[
                    { label: "Present", count: monthRecords.filter(r => getStatus(r) === "PRESENT").length, cls: "text-green-400" },
                    { label: "Absent",  count: monthRecords.filter(r => getStatus(r) === "ABSENT").length,  cls: "text-red-400" },
                    { label: "Leave",   count: monthRecords.filter(r => getStatus(r) === "LEAVE").length,   cls: "text-amber-400" },
                    { label: "Late",    count: monthRecords.filter(r => getStatus(r) === "LATE").length,    cls: "text-orange-400" },
                  ].map(({ label, count, cls }) => (
                    <div key={label} className="text-center">
                      <p className={`text-base font-bold ${cls}`}>{count}</p>
                      <p className="text-[9px] text-gray-600">{label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Monthly Table */}
            <div className="bg-white/3 border border-white/8 rounded-xl overflow-hidden flex flex-col">
              <div className="px-5 py-4 border-b border-white/8 flex items-center justify-between flex-shrink-0">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  {monthLabel} Records
                </h3>
                <span className="text-[10px] text-gray-500">{monthRecords.length} entries</span>
              </div>

              {monthRecords.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center py-12">
                  <CalendarDays className="h-7 w-7 mb-2 text-gray-700" />
                  <p className="text-sm text-gray-500">No records for this month</p>
                </div>
              ) : (
                <div className="overflow-y-auto flex-1 max-h-72">
                  <table className="w-full text-xs">
                    <thead className="sticky top-0 bg-[#0d0f1a]">
                      <tr className="border-b border-white/8 text-gray-500 uppercase tracking-wider">
                        <th className="px-4 py-2.5 text-left">Date</th>
                        <th className="px-4 py-2.5 text-center">Status</th>
                        <th className="px-4 py-2.5 text-center">Marked By</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {[...monthRecords].reverse().map((r) => {
                        const d      = new Date(r.date);
                        const status = getStatus(r);
                        const cfg    = STATUS[status];
                        return (
                          <tr key={r.id} className="hover:bg-white/2 transition-colors">
                            <td className="px-4 py-2.5">
                              <p className="text-gray-200 font-medium">
                                {d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                              </p>
                              <p className="text-gray-600 text-[10px]">
                                {d.toLocaleDateString("en-IN", { weekday: "long" })}
                              </p>
                            </td>
                            <td className="px-4 py-2.5 text-center">
                              <span className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold ${cfg.badge}`}>
                                {cfg.label}
                              </span>
                            </td>
                            <td className="px-4 py-2.5 text-center text-gray-500">
                              {r.markedBy ? "Admin" : "—"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* ── Full History Table ───────────────────────────────────────────── */}
          {records.length > 0 && (
            <div className="bg-white/3 border border-white/8 rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-white/8 flex items-center justify-between">
                <h2 className="text-sm font-bold text-white">Full Attendance History</h2>
                <span className="text-[10px] text-gray-500">{records.length} total records</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs min-w-[500px]">
                  <thead>
                    <tr className="border-b border-white/5 text-gray-500 uppercase tracking-wider bg-white/2">
                      <th className="px-4 py-3 text-left w-10">#</th>
                      <th className="px-4 py-3 text-left">Date</th>
                      <th className="px-4 py-3 text-left">Day</th>
                      <th className="px-4 py-3 text-center">Status</th>
                      <th className="px-4 py-3 text-center">Marked By</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[...records].reverse().map((r, idx) => {
                      const d      = new Date(r.date);
                      const status = getStatus(r);
                      const cfg    = STATUS[status];
                      return (
                        <tr key={r.id} className="hover:bg-white/2 transition-colors">
                          <td className="px-4 py-2.5 text-gray-600">{records.length - idx}</td>
                          <td className="px-4 py-2.5 text-gray-300 font-medium">
                            {d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                          </td>
                          <td className="px-4 py-2.5 text-gray-500">
                            {d.toLocaleDateString("en-IN", { weekday: "long" })}
                          </td>
                          <td className="px-4 py-2.5 text-center">
                            <span className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold ${cfg.badge}`}>
                              {cfg.label}
                            </span>
                          </td>
                          <td className="px-4 py-2.5 text-center text-gray-500">
                            {r.markedBy ? "Admin" : "—"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
