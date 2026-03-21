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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f1117] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div>
                <h2 className="text-lg font-bold text-white">{selected.program?.title}</h2>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{selected.name}</span>
                  <span>•</span>
                  <span>Step {step} of 3</span>
                </div>
              </div>
              <button 
                onClick={() => { setSelected(null); setStep(1); }}
                className="p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            {/* Modal Content - Scrollable Form */}
            <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
              {step === 1 && (
                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-5 bg-primary rounded-full" />
                    <h3 className="font-bold text-white uppercase tracking-wider text-sm">Basic Information</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-400 font-medium">Full Name</label>
                      <input 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-primary/50 outline-none transition-all"
                        placeholder="Aditya Kumar"
                        value={formData.fullName}
                        onChange={(e) => updateForm("fullName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-400 font-medium">Email Address</label>
                      <input 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/50 outline-none cursor-not-allowed"
                        value={formData.email}
                        readOnly
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-400 font-medium">Phone Number</label>
                      <input 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-primary/50 outline-none transition-all"
                        placeholder="+91 00000 00000"
                        value={formData.phone}
                        onChange={(e) => updateForm("phone", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-400 font-medium">City / Location</label>
                      <input 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-primary/50 outline-none transition-all"
                        placeholder="Enter City"
                        value={formData.city}
                        onChange={(e) => updateForm("city", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs text-gray-400 font-medium">College Name</label>
                      <input 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-primary/50 outline-none transition-all"
                        placeholder="University Name"
                        value={formData.collegeName}
                        onChange={(e) => updateForm("collegeName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-400 font-medium">Course / Branch</label>
                      <input 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-primary/50 outline-none transition-all"
                        placeholder="e.g. B.Tech (CSE)"
                        value={formData.branch}
                        onChange={(e) => updateForm("branch", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-400 font-medium">Current Year</label>
                      <select 
                        className="w-full bg-[#1a1c23] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-primary/50 outline-none transition-all appearance-none"
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
                    <div className="w-1 h-5 bg-primary rounded-full" />
                    <h3 className="font-bold text-white uppercase tracking-wider text-sm">Professional Profiles</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-400 font-medium font-inter">GitHub Profile</label>
                      <input 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-primary/50 outline-none transition-all"
                        placeholder="https://github.com/..."
                        value={formData.githubProfile}
                        onChange={(e) => updateForm("githubProfile", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-400 font-medium">LinkedIn Profile</label>
                      <input 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-primary/50 outline-none transition-all"
                        placeholder="https://linkedin.com/in/..."
                        value={formData.linkedinProfile}
                        onChange={(e) => updateForm("linkedinProfile", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-400 font-medium">Portfolio / Website</label>
                      <input 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-primary/50 outline-none transition-all"
                        placeholder="https://yourwebsite.com"
                        value={formData.portfolioWebsite}
                        onChange={(e) => updateForm("portfolioWebsite", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-400 font-medium">LeetCode / HackerRank (optional)</label>
                      <input 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-primary/50 outline-none transition-all"
                        placeholder="Profile Link"
                        value={formData.leetcodeHackerRank}
                        onChange={(e) => updateForm("leetcodeHackerRank", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs text-gray-400 font-medium">Resume / Drive Link</label>
                      <input 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-primary/50 outline-none transition-all"
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
                    <div className="w-1 h-5 bg-primary rounded-full" />
                    <h3 className="font-bold text-white uppercase tracking-wider text-sm">Final Submission</h3>
                  </div>
                  
                  <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 space-y-4">
                    <div className="flex gap-3">
                      <input 
                        type="checkbox" 
                        id="correct" 
                        className="mt-1 accent-primary"
                        checked={formData.declarationCorrect}
                        onChange={(e) => updateForm("declarationCorrect", e.target.checked)}
                      />
                      <label htmlFor="correct" className="text-sm text-gray-300 cursor-pointer">
                        I confirm that all the information provided above is correct and true to the best of my knowledge.
                      </label>
                    </div>
                    <div className="flex gap-3">
                      <input 
                        type="checkbox" 
                        id="guidelines" 
                        className="mt-1 accent-primary"
                        checked={formData.declarationGuidelines}
                        onChange={(e) => updateForm("declarationGuidelines", e.target.checked)}
                      />
                      <label htmlFor="guidelines" className="text-sm text-gray-300 cursor-pointer">
                        I am ready to follow all the internship guidelines and institute protocols during the program.
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-400 font-medium font-inter">Cover Note / Why should we hire you? (optional)</label>
                    <textarea 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-primary/50 outline-none transition-all resize-none"
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
            <div className="p-6 border-t border-white/5 flex items-center justify-between bg-white/[0.02]">
              {step > 1 ? (
                <Button variant="outline" className="border-white/10 text-white px-6 h-11" onClick={() => setStep(step - 1)}>
                  Back
                </Button>
              ) : (
                <div />
              )}
              
              {step < 3 ? (
                <Button className="px-8 h-11 shadow-lg shadow-primary/20" onClick={() => setStep(step + 1)}>
                  Next Step <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  className="px-8 h-11 shadow-lg shadow-green-500/20 bg-green-600 hover:bg-green-700 text-white font-bold"
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
            return (
              <div key={batch.id} className={`bg-white/3 border rounded-xl p-5 flex flex-col transition-all ${isFull ? "border-white/5 opacity-60" : "border-white/8 hover:border-primary/30 hover:bg-white/5"}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg"><BookOpen className="h-4 w-4 text-primary" /></div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${isFull ? "text-red-400 bg-red-400/10" : "text-green-400 bg-green-400/10"}`}>
                    {isFull ? "Full" : `${seatsLeft} seats left`}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mb-0.5">{batch.program?.title}</h3>
                <p className="text-xs text-gray-500 mb-1">{batch.name}</p>
                <p className="text-[11px] text-primary font-medium mb-3">{batch.program?.domain}</p>
                <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {batch.program?.duration}w</span>
                  <span className="flex items-center gap-1"><Star className="h-3 w-3" /> {batch.program?.stipend ? `₹${batch.program.stipend}/mo` : "Unpaid"}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(batch.startDate).toLocaleDateString("en-IN")}</span>
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {batch._count.applications} applied</span>
                </div>
                <Button
                  size="sm"
                  className="mt-auto text-xs"
                  disabled={isFull}
                  onClick={() => setSelected(batch)}
                >
                  Apply Now <ChevronRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
