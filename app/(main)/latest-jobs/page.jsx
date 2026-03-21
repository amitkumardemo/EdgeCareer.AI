"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Sparkles, 
  Search, 
  Target, 
  TrendingUp,
  ExternalLink,
  ChevronRight,
  Code2,
  Cpu,
  Zap,
  CheckCircle2
} from "lucide-react";

// --- Advanced Loading Component ---
const loadingSteps = [
  { text: "Analyzing your profile and skills...", icon: <Cpu className="w-5 h-5 text-blue-400" /> },
  { text: "Scanning 10,000+ active company roles...", icon: <Search className="w-5 h-5 text-purple-400" /> },
  { text: "Running AI matchmaking algorithms...", icon: <BrainIcon className="w-5 h-5 text-pink-400" /> },
  { text: "Extracting highest compatibility scores...", icon: <Target className="w-5 h-5 text-emerald-400" /> },
  { text: "Finalizing your premium job matches...", icon: <Sparkles className="w-5 h-5 text-amber-400" /> }
];

function BrainIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/>
    </svg>
  );
}

const MatchLoader = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-2xl mx-auto bg-[#0b0d14]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] relative overflow-hidden my-12"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none" />
      
      <div className="flex flex-col items-center justify-center text-center">
        {/* Animated Core */}
        <div className="relative w-28 h-28 mb-10 flex items-center justify-center">
          <div className="absolute w-full h-full border-4 border-dashed border-indigo-500/30 rounded-full animate-[spin_4s_linear_infinite]" />
          <div className="absolute w-20 h-20 border-4 border-t-blue-500 border-r-purple-500 border-b-transparent border-l-transparent rounded-full animate-[spin_2s_linear_infinite]" />
          <Zap className="w-8 h-8 text-amber-400 animate-pulse drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]" />
        </div>

        <h3 className="text-2xl font-black text-white mb-2 tracking-tight">AI Agent is Working</h3>
        <p className="text-slate-400 font-medium mb-8">Please wait while we curate your best opportunities.</p>

        {/* Dynamic Stepper */}
        <div className="w-full max-w-md space-y-4">
          {loadingSteps.map((step, idx) => {
            const isActive = idx === currentStep;
            const isCompleted = idx < currentStep;
            const isPending = idx > currentStep;

            return (
              <div key={idx} className={`flex items-center gap-4 transition-all duration-500 ${isActive ? 'opacity-100 scale-105 transform' : isCompleted ? 'opacity-50' : 'opacity-20'}`}>
                <div className={`p-2 rounded-xl border ${isActive ? 'bg-[#151822] border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.2)]' : isCompleted ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-white/5 border-white/5'}`}>
                  {isCompleted ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : step.icon}
                </div>
                <span className={`text-sm font-bold ${isActive ? 'text-white' : isCompleted ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {step.text}
                </span>
                {isActive && (
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: "20px" }} 
                    transition={{ repeat: Infinity, duration: 1 }} 
                    className="h-1 bg-indigo-500/50 rounded-full ml-auto"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};


export default function JobMatches() {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role.trim() || !skills.trim() || !location.trim()) {
      alert("Please fill in all fields: role, skills, and location.");
      return;
    }
    
    setLoading(true);
    setJobs([]);
    
    try {
      const response = await fetch("/api/job-matches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, skills, location }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch job matches");
      }
      const data = await response.json();
      
      // Artificial delay to show off the fancy loader if the API is too fast
      await new Promise(resolve => setTimeout(resolve, 8000));
      
      setJobs(data.jobs);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper to parse Match Score safely
  const parseScore = (scoreStr) => {
    if (!scoreStr) return 0;
    // Extract numbers like "85/100" or just "85"
    const match = scoreStr.toString().match(/(\d+)/);
    return match ? parseInt(match[0], 10) : 0;
  };

  return (
    <div className="min-h-screen bg-[#03030a] text-slate-300 font-sans selection:bg-indigo-500/30 pb-24 relative overflow-x-hidden">
      
      {/* Background Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-bold text-indigo-200 uppercase tracking-widest">AI-Powered Job Matcher</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6"
          >
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 drop-shadow-sm">Dream Role</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto font-medium"
          >
            Enter your target role, skills, and location to let our AI scan thousands of verified career opportunities tailored exactly to your profile.
          </motion.p>
        </div>

        {/* Search Form */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-[2rem] p-6 lg:p-10 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Form Glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur opacity-20 pointer-events-none" />

          <form onSubmit={handleSubmit} className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-300 uppercase tracking-wider ml-1">Target Role</label>
              <div className="relative group">
                <Briefcase className="absolute w-5 h-5 text-slate-500 left-4 top-1/2 -translate-y-1/2 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Frontend Engineer"
                  className="w-full bg-[#0b0d14] border border-white/10 focus:border-blue-500/50 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-300 uppercase tracking-wider ml-1">Core Skills</label>
              <div className="relative group">
                <Code2 className="absolute w-5 h-5 text-slate-500 left-4 top-1/2 -translate-y-1/2 group-focus-within:text-purple-400 transition-colors" />
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="e.g. React, Next.js, Tailwind"
                  className="w-full bg-[#0b0d14] border border-white/10 focus:border-purple-500/50 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:ring-4 focus:ring-purple-500/10 transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-300 uppercase tracking-wider ml-1">Location</label>
              <div className="relative group">
                <MapPin className="absolute w-5 h-5 text-slate-500 left-4 top-1/2 -translate-y-1/2 group-focus-within:text-pink-400 transition-colors" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Remote, Bangalore"
                  className="w-full bg-[#0b0d14] border border-white/10 focus:border-pink-500/50 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:ring-4 focus:ring-pink-500/10 transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="col-span-1 md:col-span-3 mt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full relative group overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-lg text-white shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] transition-all disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
              >
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_2.5s_infinite] group-hover:scale-105 transition-transform" />
                <span className="relative z-10">{loading ? "Scanning Database..." : "Find Best Matches"}</span>
                {!loading && <Search className="w-5 h-5 relative z-10" />}
              </button>
            </div>
          </form>
        </motion.div>

        {/* --- Results Section --- */}
        <div className="mt-16">
          <AnimatePresence mode="wait">
            {loading ? (
              <MatchLoader key="loader" />
            ) : jobs.length > 0 ? (
              <motion.div 
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-black text-white flex items-center gap-3">
                    <Target className="w-8 h-8 text-emerald-400" />
                    Top Recommended Matches
                  </h2>
                  <span className="px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold text-sm">
                    {jobs.length} Opportunities Found
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {jobs.map((job, idx) => {
                    const score = parseScore(job.match_score);
                    // Determine color based on score
                    const scoreColor = score >= 85 ? "text-emerald-400" : score >= 70 ? "text-amber-400" : "text-blue-400";
                    const scoreBg = score >= 85 ? "bg-emerald-400" : score >= 70 ? "bg-amber-400" : "bg-blue-400";

                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                        className="group bg-gradient-to-br from-[#131620] to-[#0b0d14] p-8 rounded-[2rem] border border-white/5 hover:border-indigo-500/30 shadow-lg hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col h-full"
                      >
                        {/* Company & Score Header */}
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-[#07090e] border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                              <Building2 className="w-7 h-7 text-indigo-400" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{job.company}</p>
                              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mt-1">
                                <MapPin className="w-3.5 h-3.5 text-pink-400" /> {job.location || "Location Flexible"}
                              </div>
                            </div>
                          </div>

                          {/* Circular Score display logic */}
                          <div className="flex flex-col items-center">
                            <div className="relative w-12 h-12 flex items-center justify-center">
                              <svg className="w-12 h-12 transform -rotate-90">
                                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="none" className="text-white/10" />
                                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="none" className={scoreColor} strokeDasharray="125.6" strokeDashoffset={125.6 - (125.6 * score) / 100} strokeLinecap="round" />
                              </svg>
                              <span className={`absolute text-sm font-black ${scoreColor}`}>{score}</span>
                            </div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase mt-1">Match</span>
                          </div>
                        </div>

                        {/* Title & Desc */}
                        <h3 className="text-2xl font-black text-white mb-4 group-hover:text-blue-400 transition-colors leading-tight">
                          {job.title}
                        </h3>
                        <p className="text-sm text-slate-400 font-medium mb-8 line-clamp-3 leading-relaxed flex-1">
                          {job.description || "Exciting opportunity available! Analyze the role links to discover more metadata and requirements directly from the source."}
                        </p>

                        {/* Extracted/Hardcoded Skills (Visual Flare) */}
                        <div className="flex flex-wrap gap-2 mb-8">
                          {["Fast-Paced", "High Impact", "Remote Option"].map((badge, bIdx) => (
                            <span key={bIdx} className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-300">
                              {badge}
                            </span>
                          ))}
                        </div>

                        {/* Footer Action */}
                        <div className="pt-6 border-t border-white/10 mt-auto flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-500 flex items-center gap-1.5">
                            <TrendingUp className="w-4 h-4 text-emerald-400" /> High Priority
                          </span>
                          <a
                            href={job.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-2.5 bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-white rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] border border-blue-500/30"
                          >
                            Apply Now <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>

                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        
      </div>
    </div>
  );
}
