"use client";

import { useState, useEffect } from "react";
import { getOpenBatches, applyToInternship, getStudentProfile } from "@/actions/internship-student";
import { toast } from "sonner";
import { BookOpen, Calendar, Users, Star, ChevronRight, X, Briefcase, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ApplyPage() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [applying, setApplying] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    collegeName: "",
    branch: "",
    year: "",
    city: "",
    githubProfile: "",
    linkedinProfile: "",
    portfolioWebsite: "",
    leetcodeHackerRank: "",
    resumeLink: "",
    declarationCorrect: false,
    declarationGuidelines: false,
    coverNote: "",
  });

  useEffect(() => {
    getOpenBatches().then((b) => { setBatches(b); setLoading(false); });
    // Fetch profile to pre-fill
    getStudentProfile().then(user => {
      if (user) {
        setFormData(prev => ({
          ...prev,
          fullName: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          collegeName: user.collegeName || "",
          branch: user.branch || "",
          year: user.year?.toString() || "",
          city: user.city || "",
          githubProfile: user.githubUsername ? `https://github.com/${user.githubUsername}` : "",
          linkedinProfile: user.linkedinLink || "",
          portfolioWebsite: user.portfolioLink || "",
          leetcodeHackerRank: user.leetcodeLink || "",
        }));
      }
    });
  }, []);

  async function handleApply() {
    if (!selected) return;
    if (!formData.declarationCorrect || !formData.declarationGuidelines) {
      return toast.error("Please accept the declarations before applying");
    }
    setApplying(true);
    try {
      await applyToInternship(selected.id, formData);
      toast.success("Application submitted successfully!");
      setSelected(null);
      setStep(1);
      getOpenBatches().then(setBatches);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setApplying(false);
    }
  }

  const updateForm = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Apply for Internship</h1>
        <p className="text-gray-500 text-sm mt-0.5">Browse open batches and submit your application</p>
      </div>

      {/* Application Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h2 className="text-lg font-bold text-slate-900">{selected.program?.title}</h2>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                  <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-semibold">{selected.name}</span>
                  <span>•</span>
                  <span className="font-medium text-slate-600">Step {step} of 3</span>
                </div>
              </div>
              <button 
                onClick={() => { setSelected(null); setStep(1); }}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors bg-white border border-slate-200 shadow-sm"
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>

            {/* Modal Content - Scrollable Form */}
            <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
              {step === 1 && (
                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-5 bg-primary rounded-full shadow-sm" />
                    <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Basic Information</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-600 font-semibold uppercase tracking-wide">Full Name</label>
                      <input 
                        className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-slate-400"
                        placeholder="Aditya Kumar"
                        value={formData.fullName}
                        onChange={(e) => updateForm("fullName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-600 font-semibold uppercase tracking-wide">Email Address</label>
                      <input 
                        className="w-full bg-slate-50 border border-slate-200 shadow-sm rounded-xl px-4 py-2.5 text-sm text-slate-500 outline-none cursor-not-allowed"
                        value={formData.email}
                        readOnly
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-600 font-semibold uppercase tracking-wide">Phone Number</label>
                      <input 
                        className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-slate-400"
                        placeholder="+91 00000 00000"
                        value={formData.phone}
                        onChange={(e) => updateForm("phone", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-600 font-semibold uppercase tracking-wide">City / Location</label>
                      <input 
                        className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-slate-400"
                        placeholder="Enter City"
                        value={formData.city}
                        onChange={(e) => updateForm("city", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs text-slate-600 font-semibold uppercase tracking-wide">College Name</label>
                      <input 
                        className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-slate-400"
                        placeholder="University Name"
                        value={formData.collegeName}
                        onChange={(e) => updateForm("collegeName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-600 font-semibold uppercase tracking-wide">Course / Branch</label>
                      <input 
                        className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-slate-400"
                        placeholder="e.g. B.Tech (CSE)"
                        value={formData.branch}
                        onChange={(e) => updateForm("branch", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-600 font-semibold uppercase tracking-wide">Current Year</label>
                      <select 
                        className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all appearance-none"
                        value={formData.year}
                        onChange={(e) => updateForm("year", e.target.value)}
                      >
                        <option value="" disabled>Select Year</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5 animate-in fade-in slide-in-from-right-2 duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-5 bg-primary rounded-full shadow-sm" />
                    <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Professional Profiles</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-600 font-semibold uppercase tracking-wide font-inter">GitHub Profile</label>
                      <input 
                        className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-slate-400"
                        placeholder="https://github.com/..."
                        value={formData.githubProfile}
                        onChange={(e) => updateForm("githubProfile", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-600 font-semibold uppercase tracking-wide">LinkedIn Profile</label>
                      <input 
                        className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-slate-400"
                        placeholder="https://linkedin.com/in/..."
                        value={formData.linkedinProfile}
                        onChange={(e) => updateForm("linkedinProfile", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-600 font-semibold uppercase tracking-wide">Portfolio / Website</label>
                      <input 
                        className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-slate-400"
                        placeholder="https://yourwebsite.com"
                        value={formData.portfolioWebsite}
                        onChange={(e) => updateForm("portfolioWebsite", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-600 font-semibold uppercase tracking-wide">LeetCode / HackerRank (optional)</label>
                      <input 
                        className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-slate-400"
                        placeholder="Profile Link"
                        value={formData.leetcodeHackerRank}
                        onChange={(e) => updateForm("leetcodeHackerRank", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs text-slate-600 font-semibold uppercase tracking-wide">Resume / Drive Link</label>
                      <input 
                        className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-slate-400"
                        placeholder="https://drive.google.com/..."
                        value={formData.resumeLink}
                        onChange={(e) => updateForm("resumeLink", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-5 bg-primary rounded-full shadow-sm" />
                    <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Final Submission</h3>
                  </div>
                  
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4 shadow-sm">
                    <div className="flex gap-3">
                      <input 
                        type="checkbox" 
                        id="correct" 
                        className="mt-1 accent-primary w-4 h-4 cursor-pointer"
                        checked={formData.declarationCorrect}
                        onChange={(e) => updateForm("declarationCorrect", e.target.checked)}
                      />
                      <label htmlFor="correct" className="text-sm text-slate-700 cursor-pointer font-medium leading-relaxed">
                        I confirm that all the information provided above is correct and true to the best of my knowledge.
                      </label>
                    </div>
                    <div className="flex gap-3">
                      <input 
                        type="checkbox" 
                        id="guidelines" 
                        className="mt-1 accent-primary w-4 h-4 cursor-pointer"
                        checked={formData.declarationGuidelines}
                        onChange={(e) => updateForm("declarationGuidelines", e.target.checked)}
                      />
                      <label htmlFor="guidelines" className="text-sm text-slate-700 cursor-pointer font-medium leading-relaxed">
                        I am ready to follow all the internship guidelines and institute protocols during the program.
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-600 font-semibold uppercase tracking-wide font-inter">Cover Note / Why should we hire you? (optional)</label>
                    <textarea 
                      className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-sm text-slate-900 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none placeholder:text-slate-400"
                      rows={4}
                      placeholder="Share your motivation..."
                      value={formData.coverNote}
                      onChange={(e) => updateForm("coverNote", e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 flex items-center justify-between bg-slate-50">
              {step > 1 ? (
                <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900 px-6 h-11 font-semibold" onClick={() => setStep(step - 1)}>
                  Back
                </Button>
              ) : (
                <div />
              )}
              
              {step < 3 ? (
                <Button className="px-8 h-11 shadow-md shadow-primary/20 font-semibold" onClick={() => setStep(step + 1)}>
                  Next Step <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  className="px-8 h-11 shadow-md shadow-green-500/20 bg-green-600 hover:bg-green-700 text-white font-bold"
                  onClick={handleApply}
                  disabled={applying}
                >
                  {applying ? "Submitting..." : "Complete Application"}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Batch cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {loading ? (
          Array(3).fill(0).map((_, i) => <div key={i} className="animate-pulse bg-white/3 border border-white/8 rounded-xl h-52" />)
        ) : batches.length === 0 ? (
          <div className="col-span-3 text-center py-16">
            <Briefcase className="h-8 w-8 mx-auto mb-3 text-gray-600" />
            <p className="text-gray-500 text-sm">No open batches available right now. Check back soon!</p>
          </div>
        ) : (
          batches.map((batch) => {
            const seatsLeft = batch.maxStudents - batch._count.applications;
            const isFull = seatsLeft <= 0;
            const hasApplied = batch.hasApplied;
            return (
              <div key={batch.id} className={`bg-white/3 border rounded-xl p-5 flex flex-col transition-all ${isFull || hasApplied ? "border-white/5 opacity-60" : "border-white/8 hover:border-primary/30 hover:bg-white/5"}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg"><BookOpen className="h-4 w-4 text-primary" /></div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${hasApplied ? "text-blue-400 bg-blue-400/10" : isFull ? "text-red-400 bg-red-400/10" : "text-green-400 bg-green-400/10"}`}>
                    {hasApplied ? "Applied" : isFull ? "Full" : `${seatsLeft} seats left`}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mb-0.5">{batch.program?.title}</h3>
                <p className="text-xs text-gray-500 mb-1">{batch.name}</p>
                <p className="text-[11px] text-primary font-medium mb-3">{batch.program?.domain}</p>
                <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {batch.program?.duration}m</span>
                  <span className="flex items-center gap-1"><Star className="h-3 w-3" /> {batch.program?.stipend ? `₹${batch.program.stipend}/mo` : "Unpaid"}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(batch.startDate).toLocaleDateString("en-IN")}</span>
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {batch._count.applications} applied</span>
                </div>
                <Button
                  size="sm"
                  className={`mt-auto text-xs ${hasApplied ? "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/5 cursor-not-allowed" : ""}`}
                  disabled={isFull || hasApplied}
                  onClick={() => !hasApplied && setSelected(batch)}
                  variant={hasApplied ? "outline" : "default"}
                >
                  {hasApplied ? "Applied" : <>Apply Now <ChevronRight className="h-3.5 w-3.5 ml-1" /></>}
                </Button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
