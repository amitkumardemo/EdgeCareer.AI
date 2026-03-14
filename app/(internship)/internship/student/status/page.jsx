import { getMyApplications } from "@/actions/internship-student";
import Link from "next/link";
import { FileText, Download, Award, ChevronRight } from "lucide-react";

const STATUS_CONFIG = {
  APPLIED: { label: "Applied", color: "text-blue-400 bg-blue-400/10 border-blue-400/20", step: 1 },
  UNDER_REVIEW: { label: "Under Review", color: "text-amber-400 bg-amber-400/10 border-amber-400/20", step: 2 },
  SELECTED: { label: "Selected ✓", color: "text-green-400 bg-green-400/10 border-green-400/20", step: 3 },
  REJECTED: { label: "Rejected", color: "text-red-400 bg-red-400/10 border-red-400/20", step: 0 },
};

const STEPS = ["Applied", "Under Review", "Selected", "Interning", "Completed"];

export default async function StatusPage() {
  const applications = await getMyApplications();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Application Status</h1>
        <p className="text-gray-500 text-sm mt-0.5">{applications.length} application{applications.length !== 1 ? "s" : ""}</p>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-16 bg-white/3 border border-white/8 rounded-xl">
          <FileText className="h-8 w-8 mx-auto mb-3 text-gray-600" />
          <p className="text-white font-semibold mb-1">No Applications Yet</p>
          <p className="text-gray-500 text-sm mb-4">Browse open internship batches and apply today.</p>
          <Link href="/internship/student/apply" className="inline-flex items-center gap-2 text-sm px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all">
            Apply Now <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => {
            const cfg = STATUS_CONFIG[app.status];
            const prog = app.progress;
            const cert = prog?.certificate;
            const isCompleted = prog?.completed;

            return (
              <div key={app.id} className="bg-white/3 border border-white/8 rounded-xl p-5 hover:border-white/12 transition-all">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-white">{app.batch?.program?.title}</h3>
                    <p className="text-xs text-gray-500">{app.batch?.name} · Applied {new Date(app.appliedAt).toLocaleDateString("en-IN")}</p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border self-start ${cfg.color}`}>{cfg.label}</span>
                </div>

                {/* Progress tracker (not for rejected) */}
                {app.status !== "REJECTED" && (
                  <div className="mb-4">
                    <div className="flex items-center gap-0">
                      {STEPS.map((step, i) => {
                        const activeStep = isCompleted ? 5 : app.status === "SELECTED" ? 3 : cfg.step;
                        const isActive = i < activeStep;
                        const isCurrent = i === activeStep - 1;
                        return (
                          <div key={step} className="flex items-center flex-1 last:flex-none">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 border transition-all ${isActive ? "bg-primary border-primary text-white" : "bg-white/5 border-white/10 text-gray-600"} ${isCurrent ? "ring-2 ring-primary/30" : ""}`}>
                              {isActive ? "✓" : i + 1}
                            </div>
                            {i < STEPS.length - 1 && (
                              <div className={`flex-1 h-0.5 ${isActive ? "bg-primary" : "bg-white/8"}`} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex justify-between mt-1.5">
                      {STEPS.map((step) => (
                        <p key={step} className="text-[9px] text-gray-600 text-center flex-1">{step}</p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Progress stats for selected */}
                {prog && app.status === "SELECTED" && (
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      { label: "Progress", value: `${prog.progressPct}%` },
                      { label: "Score", value: prog.performScore.toFixed(1) },
                      { label: "Attendance", value: `${prog.attendancePct}%` },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-white/3 rounded-lg p-2.5 text-center">
                        <p className="text-sm font-bold text-white">{value}</p>
                        <p className="text-[10px] text-gray-500">{label}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Download actions */}
                <div className="flex gap-2 flex-wrap">
                  {app.offerLetter && (
                    <Link href={`/internship/student/offer-letter?appId=${app.id}`}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-green-400/10 text-green-400 border border-green-400/20 rounded-lg hover:bg-green-400/20 transition-all"
                    >
                      <Download className="h-3.5 w-3.5" /> Offer Letter
                    </Link>
                  )}
                  {cert && (
                    <Link href={`/internship/student/certificate?appId=${app.id}`}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-amber-400/10 text-amber-400 border border-amber-400/20 rounded-lg hover:bg-amber-400/20 transition-all"
                    >
                      <Award className="h-3.5 w-3.5" /> Certificate
                    </Link>
                  )}
                  {app.status === "SELECTED" && (
                    <Link href="/internship/student/tasks"
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-lg hover:bg-primary/20 transition-all"
                    >
                      View Tasks <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
