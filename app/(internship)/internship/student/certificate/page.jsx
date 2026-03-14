import { getMyApplications } from "@/actions/internship-student";
import { Award, Download, CheckCircle2, Lock } from "lucide-react";
import Link from "next/link";

export default async function CertificatePage() {
  const applications = await getMyApplications();
  const completed = applications.filter((a) => a.progress?.completed && a.progress?.certificate);
  const pending = applications.filter((a) => a.status === "SELECTED" && !a.progress?.completed);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Internship Certificates</h1>
        <p className="text-gray-500 text-sm mt-0.5">Download your internship completion certificates</p>
      </div>

      {completed.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-white text-gray-400">Earned Certificates</h2>
          {completed.map((app) => {
            const cert = app.progress.certificate;
            return (
              <div key={app.id} className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-400/15 rounded-xl"><Award className="h-6 w-6 text-amber-400" /></div>
                  <div>
                    <p className="text-sm font-bold text-white">Internship Completion Certificate</p>
                    <p className="text-xs text-gray-400">{app.batch?.program?.title} · {app.batch?.name}</p>
                    <p className="text-[10px] text-amber-400 mt-1">Serial: {cert.serialNo}</p>
                    <p className="text-[10px] text-gray-500">Issued: {new Date(cert.issuedAt).toLocaleDateString("en-IN")}</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-sm px-4 py-2 bg-amber-400/15 text-amber-400 border border-amber-400/25 rounded-lg hover:bg-amber-400/25 transition-all self-start sm:self-center">
                  <Download className="h-4 w-4" /> Download
                </button>
              </div>
            );
          })}
        </div>
      )}

      {pending.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-400">Pending Completion</h2>
          {pending.map((app) => {
            const prog = app.progress;
            return (
              <div key={app.id} className="bg-white/3 border border-white/8 rounded-xl p-5 flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-xl"><Lock className="h-5 w-5 text-gray-500" /></div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{app.batch?.program?.title}</p>
                  <p className="text-xs text-gray-500">{app.batch?.name}</p>
                  {prog && (
                    <div className="mt-2">
                      <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                        <span>Progress</span><span>{prog.progressPct}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden w-48">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${prog.progressPct}%` }} />
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-xs text-gray-500 text-right">Complete all tasks<br />to unlock</span>
              </div>
            );
          })}
        </div>
      )}

      {completed.length === 0 && pending.length === 0 && (
        <div className="text-center py-16 bg-white/3 border border-white/8 rounded-xl">
          <Award className="h-8 w-8 mx-auto mb-3 text-gray-600" />
          <p className="text-white font-semibold mb-1">No Certificates Yet</p>
          <p className="text-gray-500 text-sm mb-4">Complete an internship to earn your certificate.</p>
          <Link href="/internship/student/apply" className="inline-flex items-center gap-2 text-sm px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all">
            Apply for Internship
          </Link>
        </div>
      )}
    </div>
  );
}
