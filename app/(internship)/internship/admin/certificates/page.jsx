import { getCertificatePipelineApps, markInternshipComplete } from "@/actions/internship-admin";
import { Award, Download, CheckCircle2, Eye } from "lucide-react";
import Link from "next/link";
import CertificateActions from "./CertificateActions";
import IssueCertificateButton from "./IssueCertificateButton";

export default async function CertificatesPage() {
  const selected = await getCertificatePipelineApps();
  const completed = selected.filter((a) => a.progress?.completed);
  const pending = selected.filter((a) => !a.progress?.completed);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Certificates</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          {completed.length} issued · {pending.length} pending completion
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Pending Completion */}
        <div className="bg-white/3 border border-white/8 rounded-xl p-5">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-amber-400" /> Pending Completion ({pending.length})
          </h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {pending.map((app) => (
              <div key={app.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/3">
                <div className="w-8 h-8 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-400 text-xs font-bold flex-shrink-0">
                  {app.user?.name?.[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{app.user?.name}</p>
                  <p className="text-[10px] text-gray-600">{app.batch?.name} · {app.progress?.progressPct || 0}% done</p>
                </div>
                <CertificateActions applicationId={app.id} />
              </div>
            ))}
            {pending.length === 0 && <p className="text-xs text-gray-600 text-center py-4">All selected interns have been marked complete!</p>}
          </div>
        </div>

        {/* Issued Certificates */}
        <div className="bg-white/3 border border-white/8 rounded-xl p-5">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Award className="h-4 w-4 text-green-400" /> Issued Certificates ({completed.length})
          </h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {completed.map((app) => (
              <div key={app.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/3">
                <div className="w-8 h-8 rounded-full bg-green-400/10 flex items-center justify-center text-green-400 text-xs font-bold flex-shrink-0">
                  {app.user?.name?.[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{app.user?.name}</p>
                  <p className="text-[10px] text-gray-600">
                    Completed {app.progress?.completedAt ? new Date(app.progress.completedAt).toLocaleDateString("en-IN") : "—"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/internship/student/report/${app.id}`} target="_blank">
                    <button className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all">
                      <Eye className="h-3 w-3" /> Report
                    </button>
                  </Link>
                  <IssueCertificateButton 
                    applicationId={app.id} 
                    certificatePdfUrl={app.progress?.certificate?.pdfUrl}
                  />
                </div>
              </div>
            ))}
            {completed.length === 0 && <p className="text-xs text-gray-600 text-center py-4">No certificates issued yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
