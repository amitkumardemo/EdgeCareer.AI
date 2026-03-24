"use client";

import { useState, useEffect } from "react";
import { getAllApplications, reviewApplication } from "@/actions/internship-admin";
import { getBatches } from "@/actions/internship-admin";
import { issueOfferLetter } from "@/actions/offer-letter";
import { toast } from "sonner";
import { 
  CheckCircle2, XCircle, Eye, Filter, Clock, Github, Linkedin, 
  Globe, FileText, User, Mail, Phone, MapPin, School, GraduationCap, X, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";

const STATUS_COLORS = {
  APPLIED: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  UNDER_REVIEW: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  SELECTED: "text-green-400 bg-green-400/10 border-green-400/20",
  REJECTED: "text-red-400 bg-red-400/10 border-red-400/20",
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [batches, setBatches] = useState([]);
  const [filter, setFilter] = useState("");
  const [batchFilter, setBatchFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [reviewing, setReviewing] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);
  const [issuingOffer, setIssuingOffer] = useState(false);

  useEffect(() => {
    loadData();
  }, [filter, batchFilter]);

  async function loadData() {
    setLoading(true);
    try {
      const [apps, bs] = await Promise.all([
        getAllApplications({ status: filter || undefined, batchId: batchFilter || undefined }),
        getBatches(),
      ]);
      setApplications(apps);
      setBatches(bs);
    } finally {
      setLoading(false);
    }
  }

  async function handleReview(id, status) {
    setReviewing(id);
    try {
      await reviewApplication(id, status);
      toast.success(`Application ${status.toLowerCase()}`);
      await loadData();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setReviewing(null);
    }
  }

  async function handleIssueOffer(id) {
    setIssuingOffer(true);
    try {
      const res = await issueOfferLetter(id);
      if (res.success) {
        toast.success("Offer Letter Issued & Emailed Successfully!");
        await loadData();
        setSelectedApp(null);
      }
    } catch (e) {
      toast.error(e.message || "Failed to issue offer letter");
    } finally {
      setIssuingOffer(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Applications</h1>
          <p className="text-gray-500 text-sm mt-0.5">{applications.length} application{applications.length !== 1 ? "s" : ""} found</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-black border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:border-primary outline-none"
          >
            <option value="">All Statuses</option>
            {["APPLIED", "UNDER_REVIEW", "SELECTED", "REJECTED"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select
            value={batchFilter}
            onChange={(e) => setBatchFilter(e.target.value)}
            className="bg-black border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:border-primary outline-none"
          >
            <option value="">All Batches</option>
            {batches.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-white/3 border border-white/8 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-4 py-3 text-left">Student</th>
                <th className="px-4 py-3 text-left">Batch / Program</th>
                <th className="px-4 py-3 text-left">College</th>
                <th className="px-4 py-3 text-left">Applied</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-600">Loading...</td></tr>
              ) : applications.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-600">No applications found</td></tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="border-b border-white/5 hover:bg-white/2 transition-all">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                          {app.user?.name?.[0]?.toUpperCase() || "?"}
                        </div>
                        <div>
                          <p className="font-medium text-white text-xs">{app.user?.name}</p>
                          <p className="text-[10px] text-gray-600 truncate max-w-[120px]">{app.user?.email}</p>
                          <div className="flex gap-1.5 mt-1.5 opacity-60 hover:opacity-100 transition-opacity">
                            {app.user?.githubUsername && (
                              <a href={`https://github.com/${app.user.githubUsername}`} target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary"><Github className="h-3 w-3" /></a>
                            )}
                            {app.user?.linkedinLink && (
                              <a href={app.user.linkedinLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-primary"><Linkedin className="h-3 w-3" /></a>
                            )}
                            {app.user?.portfolioLink && (
                              <a href={app.user.portfolioLink} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-primary"><Globe className="h-3 w-3" /></a>
                            )}
                            {app.user?.resumeLink && (
                              <a href={app.user.resumeLink} target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-primary"><FileText className="h-3 w-3" /></a>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-xs text-white font-medium">{app.batch?.name}</p>
                      <p className="text-[10px] text-gray-600">{app.batch?.program?.title}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400">{app.user?.college?.name || app.user?.collegeName || "—"}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {new Date(app.appliedAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-semibold px-2 py-1 rounded-full border ${STATUS_COLORS[app.status]}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                          title="View Details"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        
                        <div className="h-6 w-px bg-white/5 mx-1" />

                        <button
                          onClick={() => handleReview(app.id, "SELECTED")}
                          disabled={reviewing === app.id || app.status === "SELECTED"}
                          className={`p-1.5 rounded-lg transition-all disabled:opacity-30 ${
                            app.status === "SELECTED" ? "bg-green-400/20 text-green-400" : "bg-green-400/5 text-green-400/60 hover:text-green-400 hover:bg-green-400/15"
                          }`}
                          title="Select"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleReview(app.id, "UNDER_REVIEW")}
                          disabled={reviewing === app.id || app.status === "UNDER_REVIEW"}
                          className={`p-1.5 rounded-lg transition-all disabled:opacity-30 ${
                            app.status === "UNDER_REVIEW" ? "bg-amber-400/20 text-amber-400" : "bg-amber-400/5 text-amber-400/60 hover:text-amber-400 hover:bg-amber-400/15"
                          }`}
                          title="Under Review"
                        >
                          <Clock className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleReview(app.id, "REJECTED")}
                          disabled={reviewing === app.id || app.status === "REJECTED"}
                          className={`p-1.5 rounded-lg transition-all disabled:opacity-30 ${
                            app.status === "REJECTED" ? "bg-red-400/20 text-red-400" : "bg-red-400/5 text-red-400/60 hover:text-red-400 hover:bg-red-400/15"
                          }`}
                          title="Reject"
                        >
                          <XCircle className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0f1117] border border-white/10 rounded-2xl w-full max-w-2xl my-auto animate-in fade-in zoom-in duration-200 shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xl font-bold border border-primary/20">
                  {selectedApp.user?.name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white leading-tight">{selectedApp.user?.name}</h2>
                  <p className="text-sm text-gray-500">{selectedApp.user?.email}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedApp(null)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Information Sections */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Academic & Contact</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-gray-300">
                        <School className="h-4 w-4 text-primary/60" />
                        <span>{selectedApp.user?.college?.name || selectedApp.user?.collegeName || "College not provided"}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-300">
                        <GraduationCap className="h-4 w-4 text-primary/60" />
                        <span>{selectedApp.user?.branch} • {selectedApp.user?.year} Year</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-300">
                        <Phone className="h-4 w-4 text-primary/60" />
                        <span>{selectedApp.user?.phone || "No phone provided"}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-300">
                        <MapPin className="h-4 w-4 text-primary/60" />
                        <span>{selectedApp.user?.city || "City not provided"}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Application Context</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-gray-300">
                        <FileText className="h-4 w-4 text-primary/60" />
                        <div>
                          <p className="font-medium text-white">{selectedApp.batch?.program?.title}</p>
                          <p className="text-xs text-gray-500">{selectedApp.batch?.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-300">
                        <Clock className="h-4 w-4 text-primary/60" />
                        <span>Applied on {new Date(selectedApp.appliedAt).toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Links Section */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Professional Links</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedApp.user?.githubUsername && (
                        <a 
                          href={`https://github.com/${selectedApp.user.githubUsername}`} 
                          target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5 hover:border-primary/30 hover:bg-white/5 transition-all group"
                        >
                          <Github className="h-5 w-5 text-gray-400 group-hover:text-white" />
                          <div className="flex-1 overflow-hidden">
                            <p className="text-xs font-medium text-white">GitHub</p>
                            <p className="text-[10px] text-gray-500 truncate">github.com/{selectedApp.user.githubUsername}</p>
                          </div>
                          <Eye className="h-3.5 w-3.5 text-gray-700 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all" />
                        </a>
                      )}
                      {selectedApp.user?.linkedinLink && (
                        <a 
                          href={selectedApp.user.linkedinLink} 
                          target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5 hover:border-primary/30 hover:bg-white/5 transition-all group"
                        >
                          <Linkedin className="h-5 w-5 text-blue-500/80 group-hover:text-blue-400" />
                          <div className="flex-1 overflow-hidden">
                            <p className="text-xs font-medium text-white">LinkedIn</p>
                            <p className="text-[10px] text-gray-500 truncate">{selectedApp.user.linkedinLink}</p>
                          </div>
                          <Eye className="h-3.5 w-3.5 text-gray-700 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all" />
                        </a>
                      )}
                      {selectedApp.user?.resumeLink && (
                        <a 
                          href={selectedApp.user.resumeLink} 
                          target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all group"
                        >
                          <FileText className="h-5 w-5 text-red-500/80 group-hover:text-red-500" />
                          <div className="flex-1 overflow-hidden">
                            <p className="text-xs font-bold text-primary">Resume / Drive Link</p>
                            <p className="text-[10px] text-primary/60 truncate">{selectedApp.user.resumeLink}</p>
                          </div>
                          <Eye className="h-3.5 w-3.5 text-primary/60 opacity-0 group-hover:opacity-100 transition-all" />
                        </a>
                      )}
                      {selectedApp.user?.portfolioLink && (
                        <a 
                          href={selectedApp.user.portfolioLink} 
                          target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5 hover:border-primary/30 hover:bg-white/5 transition-all group"
                        >
                          <Globe className="h-5 w-5 text-green-500/80 group-hover:text-green-400" />
                          <div className="flex-1 overflow-hidden">
                            <p className="text-xs font-medium text-white">Portfolio</p>
                            <p className="text-[10px] text-gray-500 truncate">{selectedApp.user.portfolioLink}</p>
                          </div>
                          <Eye className="h-3.5 w-3.5 text-gray-700 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all" />
                        </a>
                      )}
                      {selectedApp.user?.leetcodeLink && (
                        <a 
                          href={selectedApp.user.leetcodeLink} 
                          target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5 hover:border-primary/30 hover:bg-white/5 transition-all group"
                        >
                          <Star className="h-5 w-5 text-orange-500/80 group-hover:text-orange-400" />
                          <div className="flex-1 overflow-hidden">
                            <p className="text-xs font-medium text-white">LeetCode / HackRank</p>
                            <p className="text-[10px] text-gray-500 truncate">{selectedApp.user.leetcodeLink}</p>
                          </div>
                          <Eye className="h-3.5 w-3.5 text-gray-700 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Cover Note Section */}
              <div className="pt-6 border-t border-white/5">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Cover Letter / Note</h3>
                <div className="p-4 rounded-xl bg-white/3 border border-white/5 text-sm text-gray-300 leading-relaxed italic">
                  {selectedApp.reviewNotes || "No cover note provided by the student."}
                </div>
              </div>
            </div>

            {/* Modal Footer (Actions) */}
            <div className="p-6 border-t border-white/5 flex flex-col gap-3 bg-white/[0.01]">
              {selectedApp.status === "SELECTED" && (
                <div className="flex w-full">
                  <Button 
                    onClick={() => handleIssueOffer(selectedApp.id)}
                    disabled={issuingOffer}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6"
                  >
                    {issuingOffer ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        Generating & Sending Offer Letter...
                      </span>
                    ) : selectedApp.offerLetter?.pdfUrl ? (
                      <span className="flex items-center gap-2">
                        <Mail className="h-5 w-5" /> 
                        Re-Issue Offer Letter PDF
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Mail className="h-5 w-5" /> 
                        Issue Offer Letter PDF
                      </span>
                    )}
                  </Button>
                </div>
              )}
              <div className="flex w-full gap-2">
                <Button 
                  onClick={() => { handleReview(selectedApp.id, "SELECTED"); setSelectedApp(null); }}
                  disabled={reviewing === selectedApp.id || selectedApp.status === "SELECTED"}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  Approve Application
                </Button>
                <Button 
                  onClick={() => { handleReview(selectedApp.id, "REJECTED"); setSelectedApp(null); }}
                  disabled={reviewing === selectedApp.id || selectedApp.status === "REJECTED"}
                  variant="outline" 
                  className="flex-1 border-red-500/50 text-red-500 hover:bg-red-500/10"
                >
                  Reject
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
