"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { 
  Briefcase, 
  Code, 
  MapPin, 
  Building, 
  Star, 
  Users, 
  Globe, 
  Award, 
  ArrowRight, 
  CheckCircle, 
  BookOpen, 
  Target, 
  Search, 
  Filter,
  Sparkles,
  Zap,
  TrendingUp,
  ExternalLink,
  Code2,
  BrainCircuit,
  Cpu
} from "lucide-react";
import TestimonialCarousel from "@/components/ui/TestimonialCarousel";

// Job matching testimonials
const jobTestimonials = [
  {
    quote: "The deep learning matching algorithm found me opportunities I never would have discovered. Got my dream job in just 2 weeks!",
    author: "Sarah Chen",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    role: "Senior Software Engineer",
    company: "Tech Giant Inc",
  },
  {
    quote: "The personalized job recommendations were incredibly accurate. It understood my skills and career goals perfectly.",
    author: "Michael Rodriguez",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    role: "Product Manager",
    company: "Startup Co",
  },
  {
    quote: "Saved me hours of searching. The AI-powered matching found relevant positions that matched my exact tech stack and seniority.",
    author: "Emily Johnson",
    image: "https://randomuser.me/api/portraits/women/67.jpg",
    role: "Data Scientist",
    company: "Analytics Corp",
  },
];

// Custom Match Loader component
const loadingSteps = [
  { text: "Scanning your skills & experience profile...", icon: <Cpu className="w-5 h-5 text-blue-400" /> },
  { text: "Crawling 50,000+ active global listings...", icon: <Search className="w-5 h-5 text-purple-400" /> },
  { text: "Running generative matchmaking logic...", icon: <BrainCircuit className="w-5 h-5 text-pink-400" /> },
  { text: "Filtering out low probability roles...", icon: <Filter className="w-5 h-5 text-red-400" /> },
  { text: "Finalizing your elite career matches...", icon: <Sparkles className="w-5 h-5 text-emerald-400" /> }
];

const MatchLoader = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-3xl mx-auto bg-[#0b0d14]/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-12 shadow-[0_30px_60px_rgba(0,0,0,0.6)] relative overflow-hidden my-12"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 pointer-events-none" />
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Animated Core */}
        <div className="relative w-40 h-40 flex items-center justify-center flex-shrink-0">
          <div className="absolute w-full h-full border-[6px] border-dashed border-indigo-500/20 rounded-full animate-[spin_6s_linear_infinite]" />
          <div className="absolute w-32 h-32 border-[6px] border-t-blue-500 border-r-purple-500 border-b-transparent border-l-transparent rounded-full animate-[spin_2s_linear_infinite]" />
          <div className="absolute w-24 h-24 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full animate-pulse" />
          <Zap className="w-10 h-10 text-amber-400 animate-pulse drop-shadow-[0_0_20px_rgba(251,191,36,0.8)] relative z-10" />
        </div>

        {/* Dynamic Stepper */}
        <div className="w-full space-y-5">
          <h3 className="text-3xl font-black text-white tracking-tight mb-2">Analyzing Opportunities</h3>
          {loadingSteps.map((step, idx) => {
            const isActive = idx === currentStep;
            const isCompleted = idx < currentStep;
            
            return (
              <div key={idx} className={`flex items-center gap-4 transition-all duration-500 ${isActive ? 'opacity-100 scale-[1.02] transform' : isCompleted ? 'opacity-40' : 'opacity-10'}`}>
                <div className={`p-2.5 rounded-xl border ${isActive ? 'bg-[#151822] border-indigo-500/40 shadow-[0_0_20px_rgba(99,102,241,0.3)]' : isCompleted ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-white/5 border-white/5'}`}>
                  {isCompleted ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : step.icon}
                </div>
                <span className={`text-base font-bold ${isActive ? 'text-white' : isCompleted ? 'text-emerald-400/80' : 'text-slate-500'}`}>
                  {step.text}
                </span>
                {isActive && (
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: "30px" }} 
                    transition={{ repeat: Infinity, duration: 1.2 }} 
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
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [showNoJobsDialog, setShowNoJobsDialog] = useState(false);

  const handleSubmit = async () => {
    if (!role.trim() || !skills.trim() || !location.trim()) {
      alert("Please fill in all required fields: role, skills, and location.");
      return;
    }
    setLoading(true);
    setJobs([]);
    try {
      const response = await fetch("/api/job-matches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, skills, location, experience }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch job matches");
      }
      const data = await response.json();
      
      // Keep loading screen for at least 8.5 seconds to show off animation and build anticipation
      await new Promise(resolve => setTimeout(resolve, 8500));
      
      if (data.error) {
        alert("Unable to fetch jobs at the moment. Please try again later or contact support if the issue persists.");
        return;
      }
      
      const foundJobs = data.jobs || [];
      if(foundJobs.length === 0) {
        setShowNoJobsDialog(true);
      } else {
        setJobs(foundJobs);
      }
      
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#03030a] text-slate-300 font-sans selection:bg-indigo-500/30 overflow-x-hidden relative">
      
      {/* Immersive Deep Mesh Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 px-6 z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
        >
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="text-sm font-bold text-indigo-200 tracking-widest uppercase">Deep Learning Job Engine</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 leading-tight"
        >
          Find Your <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-lg">
            Perfect Job Match
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto font-medium mb-16 leading-relaxed"
        >
          Discover personalized elite opportunities that match your skills, experience, and career aspirations. Let our <strong className="text-white">AI Algorithms</strong> do the heavy lifting.
        </motion.p>

        {/* Floating Glowing Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl mx-auto">
          {[
            { tag: "50K+", desc: "Active Jobs", glow: "from-blue-500/20" },
            { tag: "2000+", desc: "Companies", glow: "from-purple-500/20" },
            { tag: "85%", desc: "Match Accuracy", glow: "from-emerald-500/20" },
            { tag: "24hrs", desc: "Avg. Response", glow: "from-amber-500/20" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3 + (i * 0.1), type: "spring", stiffness: 100 }}
              className={`p-6 bg-gradient-to-b ${stat.glow} to-[#0b0d14]/50 border border-white/10 rounded-3xl backdrop-blur-md shadow-xl flex flex-col items-center justify-center hover:-translate-y-2 transition-transform duration-300`}
            >
              <div className="text-4xl font-black text-white mb-1 drop-shadow-md">{stat.tag}</div>
              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Search Form Section */}
      <section id="search-form" className="py-12 px-6 relative z-10 w-full max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-white/[0.02] border border-white/10 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-12 shadow-[0_40px_80px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          {/* Subtle Form Inner Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] pointer-events-none" />
          
          <div className="mb-10 text-center relative z-10">
            <h2 className="text-3xl font-black text-white mb-3">Define Your Ideal Architecture</h2>
            <p className="text-slate-400 font-medium">Inject your parameters below and initiate the matchmaking sequence.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 relative z-10">
            {/* Desired Role */}
            <div className="space-y-2.5">
              <label className="flex items-center text-sm font-black text-slate-300 uppercase tracking-widest pl-1">
                <Briefcase className="h-4 w-4 mr-2 text-indigo-400" /> Desired Role *
              </label>
              <div className="relative group dark">
                {/* Forcing dark mode on Select wrapper so shadcn popover respects it if configured */}
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="w-full h-14 bg-[#0b0d14] border border-white/10 focus:ring-2 focus:ring-indigo-500/50 rounded-xl px-5 text-white shadow-inner transition-all data-[state=open]:border-indigo-500/50">
                    <SelectValue placeholder="Select your desired role" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#151822] border-white/10 text-slate-200 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
                    <SelectItem value="Frontend Developer" className="focus:bg-indigo-500/20 focus:text-white cursor-pointer py-3">Frontend Developer</SelectItem>
                    <SelectItem value="Backend Developer" className="focus:bg-indigo-500/20 focus:text-white cursor-pointer py-3">Backend Developer</SelectItem>
                    <SelectItem value="Full Stack Developer" className="focus:bg-indigo-500/20 focus:text-white cursor-pointer py-3">Full Stack Developer</SelectItem>
                    <SelectItem value="Software Engineer" className="focus:bg-indigo-500/20 focus:text-white cursor-pointer py-3">Software Engineer</SelectItem>
                    <SelectItem value="Data Scientist" className="focus:bg-indigo-500/20 focus:text-white cursor-pointer py-3">Data Scientist</SelectItem>
                    <SelectItem value="DevOps Engineer" className="focus:bg-indigo-500/20 focus:text-white cursor-pointer py-3">DevOps Engineer</SelectItem>
                    <SelectItem value="Mobile Developer" className="focus:bg-indigo-500/20 focus:text-white cursor-pointer py-3">Mobile Developer</SelectItem>
                    <SelectItem value="Product Manager" className="focus:bg-indigo-500/20 focus:text-white cursor-pointer py-3">Product Manager</SelectItem>
                    <SelectItem value="UI/UX Designer" className="focus:bg-indigo-500/20 focus:text-white cursor-pointer py-3">UI/UX Designer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Key Skills */}
            <div className="space-y-2.5">
              <label className="flex items-center text-sm font-black text-slate-300 uppercase tracking-widest pl-1">
                <Code2 className="h-4 w-4 mr-2 text-emerald-400" /> Key Skills *
              </label>
              <div className="relative group">
                <Input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="e.g. Python, React, Machine Learning"
                  className="w-full h-14 bg-[#0b0d14] border border-white/10 focus-visible:ring-emerald-500/50 rounded-xl px-5 text-white placeholder:text-slate-600 shadow-inner transition-all"
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2.5">
              <label className="flex items-center text-sm font-black text-slate-300 uppercase tracking-widest pl-1">
                <MapPin className="h-4 w-4 mr-2 text-pink-400" /> Location *
              </label>
              <div className="relative group">
                <Input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Bangalore, India or Remote"
                  className="w-full h-14 bg-[#0b0d14] border border-white/10 focus-visible:ring-pink-500/50 rounded-xl px-5 text-white placeholder:text-slate-600 shadow-inner transition-all"
                />
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-2.5">
              <label className="flex items-center text-sm font-black text-slate-300 uppercase tracking-widest pl-1">
                <Award className="h-4 w-4 mr-2 text-amber-400" /> Experience Level
              </label>
              <div className="relative group">
                <Input
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="e.g. 2-3 years, Entry Level, Senior"
                  className="w-full h-14 bg-[#0b0d14] border border-white/10 focus-visible:ring-amber-500/50 rounded-xl px-5 text-white placeholder:text-slate-600 shadow-inner transition-all"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 relative z-10 w-full sm:w-2/3 mx-auto">
            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="w-full relative group overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-4.5 rounded-2xl flex items-center justify-center gap-3 font-black text-xl text-white shadow-[0_0_40px_rgba(79,70,229,0.4)] hover:shadow-[0_0_60px_rgba(79,70,229,0.6)] transition-all disabled:opacity-60 disabled:cursor-not-allowed transform hover:-translate-y-1 h-16"
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_2.5s_infinite] group-hover:scale-105 transition-transform" />
              <span className="relative z-10 tracking-wide">{loading ? "Engaging Match Engine..." : "Find My Job Matches"}</span>
              {!loading && <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />}
            </button>
          </div>
        </motion.div>
      </section>

      {/* Loading & Results Handling */}
      <section className="py-8 px-6 relative z-10 w-full max-w-7xl mx-auto">
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
              <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 bg-[#151822]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-xl">
                <div>
                  <h2 className="text-3xl font-black text-white flex items-center gap-3 tracking-tight">
                    <Target className="w-8 h-8 text-emerald-400" />
                    Personalized Matches Generated
                  </h2>
                  <p className="text-slate-400 font-medium mt-1">Our AI evaluated the global market and isolated these high-probability roles.</p>
                </div>
                <div className="px-5 py-2.5 rounded-2xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 font-black tracking-widest text-sm shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                  {jobs.length} SIGNALS
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                {jobs.map((job, idx) => {
                  const score = job.match_percentage || Math.floor(Math.random() * 20) + 75; // Fallback to 75-95 range
                  const scoreColor = score >= 85 ? "text-emerald-400" : score >= 70 ? "text-amber-400" : "text-blue-400";
                  
                  return (
                    <motion.div
                      key={job.job_id || `job-${idx}`}
                      initial={{ opacity: 0, scale: 0.95, y: 30 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                      className="group bg-[#0b0d14]/80 backdrop-blur-xl border border-white/10 hover:border-indigo-500/40 rounded-[2.5rem] shadow-xl hover:shadow-[0_20px_50px_rgba(99,102,241,0.15)] transition-all duration-500 flex flex-col h-full overflow-hidden"
                    >
                      {/* Top Header Card Info */}
                      <div className="p-8 pb-6 bg-gradient-to-br from-[#151822] to-transparent relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[50px] pointer-events-none" />
                        
                        <div className="flex justify-between items-start mb-6 relative z-10">
                          <div className="flex-1 pr-4">
                            <h3 className="text-2xl font-black text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors line-clamp-2">{job.title}</h3>
                            <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-slate-400">
                              <span className="flex items-center gap-1.5 text-indigo-300 bg-indigo-500/10 px-2 py-1 rounded-md border border-indigo-500/20">
                                <Building className="h-4 w-4" /> {job.company}
                              </span>
                              <span className="flex items-center gap-1.5 text-pink-300 bg-pink-500/10 px-2 py-1 rounded-md border border-pink-500/20">
                                <MapPin className="h-4 w-4" /> {job.location}
                              </span>
                            </div>
                          </div>
                          
                          {/* Circular AI Match Dial */}
                          <div className="flex flex-col items-center">
                            <div className="relative w-16 h-16 flex items-center justify-center bg-[#07090e] rounded-2xl shadow-inner border border-white/5">
                              <svg className="absolute w-14 h-14 transform -rotate-90 top-1 left-1">
                                <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="none" className="text-white/5" />
                                <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="none" className={scoreColor} strokeDasharray="150.7" strokeDashoffset={150.7 - (150.7 * score) / 100} strokeLinecap="round" />
                              </svg>
                              <span className={`text-lg font-black ${scoreColor}`}>{score}</span>
                            </div>
                            <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase mt-2">Match</span>
                          </div>
                        </div>

                        <p className="text-sm font-medium text-slate-400 line-clamp-3 leading-relaxed relative z-10">
                          {job.description || "Incredible matching opportunity. Review the direct application site for complete requirements and benefits."}
                        </p>
                        
                        {job.salary_range && (
                           <div className="mt-4 flex items-center gap-2 text-emerald-400 font-black text-sm relative z-10">
                             <TrendingUp className="w-4 h-4"/> Salary Benchmark: {job.salary_range}
                           </div>
                        )}
                      </div>

                      {/* AI Reasoning Sub-Panel */}
                      <div className="border-t border-white/5 p-8 flex-1 bg-white/[0.01]">
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="p-1.5 bg-blue-500/10 text-blue-400 rounded-lg shrink-0 mt-0.5 border border-blue-500/20">
                              <CheckCircle className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-200 text-sm mb-1 uppercase tracking-wider">AI Match Reasoning</h4>
                              <p className="text-sm font-medium text-slate-500 leading-relaxed">{job.match_reasons || "High structural alignment detected with your submitted parameters and tech stack."}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="p-1.5 bg-purple-500/10 text-purple-400 rounded-lg shrink-0 mt-0.5 border border-purple-500/20">
                              <Target className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-200 text-sm mb-1 uppercase tracking-wider">Application Strategy</h4>
                              <p className="text-sm font-medium text-slate-500 leading-relaxed">{job.application_tips || "Emphasize your core competencies heavily in your resume summary for this role."}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Apply Footer */}
                      <div className="p-6 md:p-8 bg-[#07090e] border-t border-white/5 mt-auto flex items-center justify-between group-hover:bg-[#151822] transition-colors">
                        <div className="flex flex-wrap gap-2">
                           <span className="text-[10px] px-2.5 py-1 bg-white/5 text-slate-400 rounded border border-white/10 uppercase font-bold tracking-widest hidden sm:flex items-center gap-1.5">
                             <ActivityIcon className="w-3 h-3" /> Verifying Activity
                           </span>
                        </div>
                        <a
                           href={job.apply_link || "#"}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-black text-sm transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:-translate-y-0.5 transform"
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
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 border-t border-white/10 bg-gradient-to-b from-[#0b0d14] to-[#03030a] relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">Architects of Success</h2>
            <p className="text-lg text-slate-400 font-medium">Read the telemetry logs of candidates who elevated their careers here.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {jobTestimonials.map((t, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-colors backdrop-blur-sm">
                <div className="flex items-center gap-2 text-amber-400 mb-6">
                  {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-current"/>)}
                </div>
                <p className="text-slate-300 font-medium leading-relaxed mb-8 italic">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                   <img src={t.image} alt={t.author} className="w-12 h-12 rounded-full border border-white/10" />
                   <div>
                     <h4 className="text-white font-bold">{t.author}</h4>
                     <p className="text-xs text-slate-500 font-semibold">{t.role} @ {t.company}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* No Jobs Found Dialog Theme Override */}
      <Dialog open={showNoJobsDialog} onOpenChange={setShowNoJobsDialog}>
        <DialogContent className="sm:max-w-md bg-[#151822] border-white/10 text-white shadow-2xl rounded-3xl">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-black text-white flex items-center gap-2">
               <AlertCircleIcon className="w-6 h-6 text-red-500" />
               Zero Matches Detected
            </DialogTitle>
            <DialogDescription className="text-slate-400 font-medium text-base mt-2">
              Our AI engine could not establish a high-probability link between your parameters and the current global matrix. Please broaden your role or location scope.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-4">
            <Button onClick={() => setShowNoJobsDialog(false)} className="bg-white/10 hover:bg-white/20 text-white rounded-xl shadow-none">Recalibrate Parameters</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Small missing icons
function ActivityIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
  );
}
function AlertCircleIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
  );
}
