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
        <h1 className="text-2xl font-bold text-slate-900">Internship Certificates</h1>
        <p className="text-slate-500 text-sm mt-0.5">Download your internship completion certificates</p>
      </div>

      {completed.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-700">Earned Certificates</h2>
          {completed.map((app) => {
            const cert = app.progress.certificate;
            return (
              <div key={app.id} className="bg-white border border-amber-200 shadow-sm rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl"><Award className="h-6 w-6 text-amber-500" /></div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Internship Completion Certificate</p>
                    <p className="text-xs text-slate-500">{app.batch?.program?.title} · {app.batch?.name}</p>
                    <p className="text-[10px] font-semibold text-amber-600 mt-1">Serial: {cert.serialNo}</p>
                    <p className="text-[10px] text-slate-500">Issued: {new Date(cert.issuedAt).toLocaleDateString("en-IN")}</p>
                  </div>
                </div>
                {cert.pdfUrl ? (
                  <a href={cert.pdfUrl} target="_blank" rel="noreferrer" download>
                    <button className="flex items-center gap-2 text-sm px-4 py-2 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg hover:bg-amber-100 transition-all shadow-sm self-start sm:self-center font-semibold">
                      <Download className="h-4 w-4" /> Download
                    </button>
                  </a>
                ) : (
                  <button disabled className="flex items-center gap-2 text-sm px-4 py-2 bg-slate-50 text-slate-400 border border-slate-200 rounded-lg opacity-50 cursor-not-allowed self-start sm:self-center font-semibold">
                    Generating...
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {pending.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-700">Pending Completion</h2>
          {pending.map((app) => {
            const prog = app.progress;
            return (
              <div key={app.id} className="bg-white border border-slate-200 shadow-sm rounded-xl p-5 flex items-center gap-4">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl"><Lock className="h-5 w-5 text-slate-400" /></div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">{app.batch?.program?.title}</p>
                  <p className="text-xs text-slate-500">{app.batch?.name}</p>
                  {prog && (
                    <div className="mt-2">
                      <div className="flex justify-between text-[10px] text-slate-500 mb-1 font-semibold">
                        <span>Progress</span><span>{prog.progressPct}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden w-48 border border-slate-200">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${prog.progressPct}%` }} />
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-xs text-slate-500 text-right font-medium">Complete all tasks<br />to unlock</span>
              </div>
            );
          })}
        </div>
      )}

      {completed.length === 0 && pending.length === 0 && (
        <div className="text-center py-16 bg-white border border-slate-200 shadow-sm rounded-xl">
          <Award className="h-8 w-8 mx-auto mb-3 text-slate-400" />
          <p className="text-slate-900 font-semibold mb-1">No Certificates Yet</p>
          <p className="text-slate-500 text-sm mb-4">Complete an internship to earn your certificate.</p>
          <Link href="/internship/student/apply" className="inline-flex items-center gap-2 text-sm px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-sm">
            Apply for Internship
          </Link>
        </div>
      )}
    </div>
  );
}
