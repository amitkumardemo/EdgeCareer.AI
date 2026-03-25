"use client";

import { useState, useEffect } from "react";
import { getMyApplications, getMyTasks, submitTask } from "@/actions/internship-student";
import { toast } from "sonner";
import { BookOpen, Calendar, Star, Upload, CheckCircle2, Clock, AlertCircle, X, ExternalLink, MessageSquare } from "lucide-react";
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
  const [expandedTasks, setExpandedTasks] = useState(new Set());

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

  const toggleExpand = (id) => {
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(id)) newExpanded.delete(id);
    else newExpanded.add(id);
    setExpandedTasks(newExpanded);
  };

  const extractLinks = (text) => {
    if (!text) return [];
    const urlRegex = /((?:https?:\/\/|www\.)[^\s]+)/g;
    const matches = text.match(urlRegex) || [];
    return matches.map(m => {
      const href = m.startsWith('www.') ? `https://${m}` : m;
      return { label: m.length > 30 ? m.substring(0, 30) + "..." : m, href };
    });
  };

  const renderDescriptionClean = (text) => {
    if (!text) return null;
    const urlRegex = /((?:https?:\/\/|www\.)[^\s]+)/g;
    return text.replace(urlRegex, "").trim();
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!submitModal || !selectedAppId) return;
    setSubmitting(true);
    try {
      await submitTask(selectedAppId, submitModal.id, fileUrl, notes);
      toast.success("Task submitted successfully!");
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
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Assignment Portal</h1>
          <p className="text-slate-400 text-lg mt-2 font-medium">Manage your internship deliverables and mentor submissions</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
           <div className="w-2 h-2 bg-indigo-500 animate-pulse rounded-full" />
           <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Active Batch</span>
        </div>
      </div>

      {/* Submit Modal */}
      {submitModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-8 w-full max-w-xl shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                 <Upload className="h-5 w-5 text-indigo-400" /> Submit Assignment
              </h2>
              <button onClick={() => setSubmitModal(null)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                 <X className="h-5 w-5 text-slate-400" />
              </button>
            </div>
            
            <div className="mb-6 p-4 bg-white/5 border border-white/5 rounded-xl">
               <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Assignment</h4>
               <p className="text-sm font-semibold text-white">{submitModal.title}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-bold text-slate-300">Deliverable URL</Label>
                <Input 
                  value={fileUrl} 
                  onChange={e => setFileUrl(e.target.value)} 
                  placeholder="https://github.com/your-repo or Google Drive link" 
                  required 
                  className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-indigo-500/50" 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-bold text-slate-300">Additional Notes</Label>
                <textarea 
                  rows={4} 
                  value={notes} 
                  onChange={e => setNotes(e.target.value)} 
                  placeholder="Anything your mentor should know about this submission?" 
                  className="bg-white/5 border border-white/10 rounded-xl text-white text-sm p-4 w-full focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none resize-none transition-all" 
                />
              </div>
              <Button type="submit" className="w-full h-12 text-base font-bold bg-indigo-600 hover:bg-indigo-700 rounded-xl" disabled={submitting}>
                {submitting ? "Processing..." : "Complete Task Submission"}
              </Button>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid gap-6">{Array(3).fill(0).map((_, i) => <div key={i} className="animate-pulse bg-white/5 border border-white/5 rounded-2xl h-48" />)}</div>
      ) : apps.length === 0 ? (
        <div className="text-center py-24 bg-white/3 border border-white/8 rounded-3xl backdrop-blur-sm">
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-slate-600" />
          <p className="text-xl font-bold text-white mb-2">No Verified Internships Found</p>
          <p className="text-slate-500">Only verified interns can access the assignment dashboard.</p>
        </div>
      ) : (
        <div className="grid gap-8">
          {tasks.map((task) => {
            const sub = task.submissions?.[0];
            const overdue = new Date(task.dueDate) < new Date() && !sub;
            const subCfg = sub ? SUB_STATUS[sub.status] : null;
            const isExpanded = expandedTasks.has(task.id);
            const resources = extractLinks(task.resources);
            const descriptionLinks = extractLinks(task.description);
            const allLinks = [...resources, ...descriptionLinks];

            return (
              <div key={task.id} className={`group bg-[#0f172a]/50 backdrop-blur-md border rounded-3xl p-6 md:p-8 transition-all duration-300 hover:bg-[#0f172a]/80 ${overdue ? "border-red-500/30" : "border-white/10 hover:border-indigo-500/30"}`}>
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                       <div className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter ${overdue ? "bg-red-500/20 text-red-400" : "bg-indigo-500/20 text-indigo-400"}`}>
                          {overdue ? "Past Due" : "Assignment"}
                       </div>
                       <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{task.title}</h3>
                    </div>
                    
                    <div className="relative">
                       <p className={`text-sm text-slate-400 leading-relaxed ${!isExpanded ? "line-clamp-3" : "whitespace-pre-wrap"}`}>
                         {renderDescriptionClean(task.description) || task.description}
                       </p>
                       {task.description?.length > 180 && (
                         <button 
                           onClick={() => toggleExpand(task.id)}
                           className="text-indigo-400 text-xs font-bold mt-2 hover:text-indigo-300 flex items-center gap-1"
                         >
                           {isExpanded ? "Minimize Description" : "View Full Context"}
                         </button>
                       )}
                    </div>

                    {allLinks.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {allLinks.map((link, idx) => (
                           <a 
                             key={idx}
                             href={link.href}
                             target="_blank"
                             rel="noopener noreferrer"
                             className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-all"
                           >
                             <ExternalLink className="h-3.5 w-3.5 text-indigo-400" />
                             {link.label}
                           </a>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/5 mt-6">
                      <div className={`flex items-center gap-2 text-xs font-semibold ${overdue ? "text-red-400" : "text-slate-400"}`}>
                        <Calendar className="h-4 w-4" /> 
                        Deadline: {new Date(task.dueDate).toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                        <Star className="h-4 w-4 text-amber-500" /> 
                        Maximum Score: {task.maxScore} pts
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-64 flex flex-col gap-3">
                    {sub ? (
                      <div className="p-4 bg-white/5 border border-white/5 rounded-2xl space-y-3">
                        <div className={`flex items-center justify-center gap-2 text-xs font-bold py-2 rounded-xl uppercase tracking-widest ${subCfg.color}`}>
                          <subCfg.icon className="h-4 w-4" /> {subCfg.label}
                        </div>
                        {sub.score != null && (
                           <div className="text-center">
                              <span className="text-2xl font-black text-white">{sub.score}</span>
                              <span className="text-xs text-slate-500 font-bold ml-1">/ {task.maxScore}</span>
                           </div>
                        )}
                        {sub.fileUrl && (
                          <Button asChild variant="outline" className="w-full bg-transparent border-white/10 text-xs h-9 font-bold hover:bg-white/5">
                             <a href={sub.fileUrl.startsWith('http') ? sub.fileUrl : `https://${sub.fileUrl}`} target="_blank" rel="noreferrer">
                               My Submission
                             </a>
                          </Button>
                        )}
                      </div>
                    ) : (
                      <Button 
                        size="lg" 
                        className={`w-full font-bold rounded-2xl h-14 ${overdue ? "bg-red-600 hover:bg-red-700" : "bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/20"}`} 
                        onClick={() => setSubmitModal(task)}
                      >
                        <Upload className="h-4 w-4 mr-2" /> 
                        {overdue ? "Submit Late" : "Begin Submission"}
                      </Button>
                    )}
                  </div>
                </div>

                {sub?.feedback && (
                  <div className="mt-6 p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2">
                       <MessageSquare className="h-12 w-12 text-indigo-500/10" />
                    </div>
                    <p className="text-sm font-bold text-indigo-400 mb-1 flex items-center gap-2 uppercase tracking-widest text-[10px]">
                       <Star className="h-3 w-3 fill-current" /> Mentor Assessment
                    </p>
                    <p className="text-sm text-slate-300 italic leading-relaxed">"{sub.feedback}"</p>
                  </div>
                )}
              </div>
            );
          })}
          {tasks.length === 0 && (
            <div className="text-center py-20 bg-white/3 border border-dashed border-white/10 rounded-3xl">
              <p className="text-slate-500 font-medium">Sit tight! No assignments have been published for your batch yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
