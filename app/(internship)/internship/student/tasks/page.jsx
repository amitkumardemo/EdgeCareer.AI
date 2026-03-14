"use client";

import { useState, useEffect } from "react";
import { getMyApplications, getMyTasks, submitTask } from "@/actions/internship-student";
import { toast } from "sonner";
import { BookOpen, Calendar, Star, Upload, CheckCircle2, Clock, AlertCircle, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SUB_STATUS = {
  PENDING: { label: "Pending", icon: Clock, color: "text-amber-400 bg-amber-400/10" },
  APPROVED: { label: "Approved", icon: CheckCircle2, color: "text-green-400 bg-green-400/10" },
  REJECTED: { label: "Rejected", icon: AlertCircle, color: "text-red-400 bg-red-400/10" },
  NEEDS_REVISION: { label: "Revise", icon: AlertCircle, color: "text-orange-400 bg-orange-400/10" },
};

export default function StudentTasksPage() {
  const [apps, setApps] = useState([]);
  const [selectedAppId, setSelectedAppId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitModal, setSubmitModal] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getMyApplications().then((a) => {
      const active = a.filter((x) => x.status === "SELECTED");
      setApps(active);
      if (active.length > 0) {
        const id = active[0].id;
        setSelectedAppId(id);
        loadTasks(id);
      }
      setLoading(false);
    });
  }, []);

  async function loadTasks(appId) {
    const t = await getMyTasks(appId);
    setTasks(t);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!submitModal || !selectedAppId) return;
    setSubmitting(true);
    try {
      await submitTask(selectedAppId, submitModal.id, fileUrl, notes);
      toast.success("Task submitted!");
      setSubmitModal(null);
      setFileUrl(""); setNotes("");
      await loadTasks(selectedAppId);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">My Tasks</h1>
        <p className="text-gray-500 text-sm mt-0.5">Submit your internship assignments and track evaluations</p>
      </div>

      {/* Submit Modal */}
      {submitModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#0d1117] border border-white/10 rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-white">Submit: {submitModal.title}</h2>
              <button onClick={() => setSubmitModal(null)}><X className="h-4 w-4 text-gray-400" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><Label className="text-xs text-gray-400">File / Project URL</Label><Input value={fileUrl} onChange={e => setFileUrl(e.target.value)} placeholder="https://github.com/... or Drive link" required className="bg-white/5 border-white/10 text-white h-9 text-sm mt-1" /></div>
              <div><Label className="text-xs text-gray-400">Notes (optional)</Label><textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any notes for the reviewer..." className="bg-white/5 border border-white/10 rounded-md text-white text-sm p-2 w-full focus:border-primary outline-none resize-none mt-1" /></div>
              <Button type="submit" className="w-full h-9 text-sm" disabled={submitting}>{submitting ? "Submitting..." : <><Upload className="h-3.5 w-3.5 mr-1" /> Submit Task</>}</Button>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">{Array(4).fill(0).map((_, i) => <div key={i} className="animate-pulse bg-white/3 border border-white/8 rounded-xl h-24" />)}</div>
      ) : apps.length === 0 ? (
        <div className="text-center py-16 bg-white/3 border border-white/8 rounded-xl">
          <BookOpen className="h-8 w-8 mx-auto mb-3 text-gray-600" />
          <p className="text-white font-semibold mb-1">No Active Internship</p>
          <p className="text-gray-500 text-sm">You need to be selected in a batch to see tasks.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => {
            const sub = task.submissions?.[0];
            const overdue = new Date(task.dueDate) < new Date() && !sub;
            const subCfg = sub ? SUB_STATUS[sub.status] : null;
            return (
              <div key={task.id} className={`bg-white/3 border rounded-xl p-5 ${overdue ? "border-red-500/20" : "border-white/8"} hover:border-white/12 transition-all`}>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold text-white">{task.title}</h3>
                      {overdue && <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-400/10 text-red-400">Overdue</span>}
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-2">{task.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className={`flex items-center gap-1 ${overdue ? "text-red-400" : ""}`}>
                        <Calendar className="h-3 w-3" /> Due {new Date(task.dueDate).toLocaleDateString("en-IN")}
                      </span>
                      <span className="flex items-center gap-1"><Star className="h-3 w-3" /> Max {task.maxScore} pts</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {sub ? (
                      <div className="text-right">
                        <div className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full ${subCfg.color}`}>
                          <subCfg.icon className="h-3.5 w-3.5" /> {subCfg.label}
                        </div>
                        {sub.score != null && <p className="text-xs text-gray-500 mt-1 text-right">Score: {sub.score}/{task.maxScore}</p>}
                        {sub.fileUrl && (
                          <a href={sub.fileUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[10px] text-primary hover:underline mt-1 justify-end">
                            <ExternalLink className="h-2.5 w-2.5" /> View submission
                          </a>
                        )}
                      </div>
                    ) : (
                      <Button size="sm" className="text-xs h-8" onClick={() => setSubmitModal(task)}>
                        <Upload className="h-3.5 w-3.5 mr-1" /> Submit
                      </Button>
                    )}
                  </div>
                </div>

                {sub?.feedback && (
                  <div className="mt-3 pt-3 border-t border-white/5">
                    <p className="text-xs text-gray-500"><span className="text-white font-medium">Mentor feedback: </span>{sub.feedback}</p>
                  </div>
                )}
              </div>
            );
          })}
          {tasks.length === 0 && <div className="text-center py-12 text-gray-500 text-sm">No tasks assigned to your batch yet.</div>}
        </div>
      )}
    </div>
  );
}
