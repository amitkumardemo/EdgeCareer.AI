import { getMyApplications, getMyAttendance } from "@/actions/internship-student";
import { CalendarDays, CheckCircle2, XCircle } from "lucide-react";

export default async function AttendancePage() {
  const apps = await getMyApplications();
  const selectedApp = apps.find((a) => a.status === "SELECTED");
  const appId = selectedApp?.id;

  let records = [];
  if (appId) {
    records = await getMyAttendance(appId);
  }

  const presents = records.filter(r => r.isPresent).length;
  const total = records.length;
  const pct = total > 0 ? Math.round((presents / total) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Attendance</h1>
        <p className="text-gray-500 text-sm mt-0.5">Track your daily presence and attendance score</p>
      </div>

      {!appId ? (
        <div className="text-center py-16 bg-white/3 border border-white/8 rounded-xl">
          <CalendarDays className="h-8 w-8 mx-auto mb-3 text-gray-600" />
          <p className="text-gray-500 text-sm">Join a batch to start tracking attendance.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/3 border border-white/8 rounded-xl p-5 text-center">
              <p className="text-3xl font-extrabold text-white mb-1">{pct}%</p>
              <p className="text-xs text-gray-400">Overall Score</p>
            </div>
            <div className="bg-white/3 border border-white/8 rounded-xl p-5 text-center">
              <p className="text-3xl font-extrabold text-green-400 mb-1">{presents}</p>
              <p className="text-xs text-gray-400">Days Present</p>
            </div>
            <div className="bg-white/3 border border-white/8 rounded-xl p-5 text-center">
              <p className="text-3xl font-extrabold text-red-400 mb-1">{total - presents}</p>
              <p className="text-xs text-gray-400">Days Absent</p>
            </div>
          </div>

          <div className="bg-white/3 border border-white/8 rounded-xl p-5">
            <h2 className="text-sm font-bold text-white mb-4">Recent Records</h2>
            {records.length === 0 ? (
              <p className="text-center py-8 text-gray-500 text-sm">No attendance records yet.</p>
            ) : (
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                {records.map((r) => (
                  <div key={r.id} className="flex items-center justify-between p-3 rounded-lg bg-white/3 border border-white/5">
                    <span className="text-sm font-medium text-white">{new Date(r.date).toLocaleDateString("en-IN", { weekday: "short", year: "numeric", month: "long", day: "numeric" })}</span>
                    {r.isPresent ? (
                      <span className="flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded bg-green-400/10 text-green-400">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Present
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded bg-red-400/10 text-red-400">
                        <XCircle className="h-3.5 w-3.5" /> Absent
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
