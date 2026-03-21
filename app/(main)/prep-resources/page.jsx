"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  Code2, 
  TerminalSquare, 
  BrainCircuit, 
  Target, 
  FileText, 
  Lightbulb, 
  Search, 
  X, 
  Folder, 
  File, 
  ChevronRight, 
  Award, 
  Clock, 
  Briefcase, 
  Users, 
  Play, 
  Download,
  Bookmark,
  Sparkles,
  Map,
  CheckCircle2,
  Bell,
  Cpu,
  Star,
  Zap,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Layers,
  Timer,
  Flame
} from "lucide-react";

// --- Loading Component ---
const loadingTexts = [
  "Initializing DSA Modules...",
  "Fetching Company Placement Papers...",
  "Preparing CS Fundamentals...",
  "Loading Aptitude Resources...",
  "Unlocking Lifetime Career Hub..."
];

const InitialLoader = ({ onComplete }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 500); 
    
    const timeout = setTimeout(() => {
      onComplete();
    }, 2600); 

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07090e]"
    >
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      
      <div className="relative flex items-center justify-center mb-10">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 180] }} 
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute w-40 h-40 bg-blue-600/30 rounded-full blur-2xl" 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], rotate: [180, 270, 360] }} 
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute w-32 h-32 bg-purple-600/30 rounded-full blur-xl" 
        />
        <div className="relative w-20 h-20 border-4 border-white/5 border-t-blue-500 border-r-purple-500 rounded-full animate-spin shadow-[0_0_30px_rgba(59,130,246,0.5)]" />
        <RocketIcon className="absolute w-8 h-8 text-white animate-pulse" />
      </div>

      <div className="h-10 relative w-full flex justify-center items-center overflow-visible">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.3 }}
            className="text-xl md:text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 absolute text-center whitespace-nowrap"
          >
            {loadingTexts[index]}
          </motion.p>
        </AnimatePresence>
      </div>
      
      <div className="mt-8 w-48 h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
        />
      </div>
    </motion.div>
  );
};

const RocketIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);


// --- Data ---
const modules = [
  { 
    id: 1, 
    title: "Data Structures and Algorithms", 
    desc: "Placement ka sabse important part", 
    points: ["Important questions (company level)", "Pattern-based practice", "Interview-focused preparation"],
    icon: <Code2 className="w-8 h-8 text-blue-400" />, 
    progress: 45,
    buttonText: "Start DSA Preparation"
  },
  { 
    id: 2, 
    title: "CS Fundamentals (OS, DBMS, CN)", 
    desc: "Interview me sabse jyada pucha jata hai", 
    points: ["Short notes", "Most asked questions", "Clear concepts"],
    icon: <TerminalSquare className="w-8 h-8 text-purple-400" />, 
    progress: 80,
    buttonText: "Access Fundamentals"
  },
  { 
    id: 3, 
    title: "DSA Common Problems", 
    desc: "Top companies ke repeated questions", 
    points: ["Amazon / Adobe level questions", "High probability problems"],
    icon: <BrainCircuit className="w-8 h-8 text-pink-400" />, 
    isNew: true, 
    progress: 10,
    buttonText: "Solve Problems"
  },
  { 
    id: 4, 
    title: "Master Placement Preparation", 
    desc: "Complete step-by-step system", 
    points: ["Aptitude + Coding + Interview", "Mock tests"],
    icon: <Target className="w-8 h-8 text-amber-400" />, 
    isNew: true, 
    progress: 0,
    buttonText: "View Master Plan"
  },
  { 
    id: 5, 
    title: "Placement Papers", 
    desc: "Real company pattern", 
    points: ["TCS, Wipro, Accenture", "Previous year questions"],
    icon: <FileText className="w-8 h-8 text-cyan-400" />, 
    progress: 60,
    buttonText: "Practice Papers"
  },
  { 
    id: 6, 
    title: "Aptitude Complete Resource", 
    desc: "Cutoff clear karne ke liye must", 
    points: ["Quant + Logical + Verbal", "Shortcut tricks"],
    icon: <Lightbulb className="w-8 h-8 text-emerald-400" />, 
    progress: 0,
    buttonText: "Start Aptitude"
  },
];

const mockResources = {
  1: [
    { type: "folder", name: "Arrays and Hashing", items: 12 },
    { type: "folder", name: "Linked Lists & Trees", items: 8 },
    { type: "file", name: "DSA Cheatsheet 2026.pdf", size: "2.4 MB" },
    { type: "video", name: "Dynamic Programming Masterclass.mp4", size: "450 MB" },
  ],
  2: [
    { type: "folder", name: "Operating Systems", items: 15 },
    { type: "folder", name: "Database Management System", items: 10 },
    { type: "file", name: "SQL Queries Playbook.pdf", size: "1.2 MB" },
  ],
};

const defaultResources = [
  { type: "folder", name: "Module Introduction", items: 3 },
  { type: "folder", name: "Practice Questions", items: 50 },
  { type: "file", name: "Quick Revision Notes.pdf", size: "3.1 MB" },
  { type: "video", name: "Expert Walkthrough.mp4", size: "320 MB" },
];

// --- Components ---

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 lg:px-8 overflow-hidden z-10 flex flex-col items-center text-center w-full min-h-[90vh] justify-center">
      {/* Advanced Animated Grid & Mesh Background */}
      <div className="absolute inset-0 bg-[#03030a] -z-20" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none -z-10 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Massive Glowing Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-600/30 rounded-full blur-[120px] -z-10 pointer-events-none opacity-60 animate-pulse" />
      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-fuchsia-600/20 rounded-full blur-[100px] -z-10 pointer-events-none opacity-50" />
      <div className="absolute top-[30%] left-[-10%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] -z-10 pointer-events-none opacity-50" />

      {/* Floating 3D Elements */}
      <motion.div animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-40 left-10 md:left-24 p-5 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md shadow-2xl hidden md:flex items-center justify-center">
        <Code2 className="w-10 h-10 text-blue-400" />
      </motion.div>
      <motion.div animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-40 right-10 md:right-24 p-5 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md shadow-2xl hidden md:flex items-center justify-center">
        <Target className="w-10 h-10 text-purple-400" />
      </motion.div>
      <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-60 right-1/4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-full backdrop-blur-md hidden lg:flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.2)]">
        <Sparkles className="w-6 h-6 text-amber-400" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", type: "spring", stiffness: 100 }}
        className="max-w-5xl mx-auto flex flex-col items-center relative z-10"
      >
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
          <div className="flex items-center">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
          </div>
          <span className="text-sm font-bold text-blue-200 border-l border-white/20 pl-3">Top Rated 2026 Batch Library</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter text-white mb-6 leading-[1.1]">
          Ultimate Placement <br className="hidden md:block" />
          <span className="relative inline-block mt-2">
            <span className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 blur-2xl opacity-40"></span>
            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 drop-shadow-lg">
              Preparation 2026
            </span>
          </span>
        </h1>

        <h2 className="text-xl md:text-2xl font-bold text-slate-300 mb-8 max-w-2xl leading-relaxed">
          Crack Top MNCs Like <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mx-2 text-2xl md:text-3xl font-black">Amazon, Adobe & Apple</span> 🚀
        </h2>
        
        <p className="text-base md:text-lg text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
          Stop wasting time on random YouTube videos and scattered PDFs. Get everything you need for placements in one structured platform. Designed exclusively for students targeting <strong className="text-emerald-400 px-1">10–20 LPA packages.</strong>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto mb-10">
          <button suppressHydrationWarning onClick={() => document.getElementById("modules").scrollIntoView({ behavior: "smooth" })} className="group relative flex items-center justify-center gap-3 px-10 py-5 rounded-[1.25rem] font-bold text-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-[0_0_40px_rgba(79,70,229,0.5)] hover:shadow-[0_0_60px_rgba(79,70,229,0.7)] transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_2.5s_infinite]" />
            <Cpu className="w-6 h-6 relative z-10" />
            <span className="relative z-10 tracking-wide">Access All Modules</span>
          </button>
          
          <button suppressHydrationWarning onClick={() => document.getElementById("offer").scrollIntoView({ behavior: "smooth" })} className="group px-10 py-5 rounded-[1.25rem] font-bold text-lg text-white border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center gap-3 shadow-xl">
            <Zap className="w-6 h-6 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
            Start Preparation Now
          </button>
        </div>

        {/* Highlight Banner directly integrated inside the hero box area for visual weight */}
        <div className="mt-4 inline-flex items-center gap-3 p-1 pr-6 rounded-full bg-gradient-to-r from-white/5 to-transparent border border-white/10 backdrop-blur-sm">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
            <Flame className="w-5 h-5 text-amber-400" />
          </div>
          <p className="text-sm md:text-base font-bold italic text-slate-300">
            "Placement crack karne ke liye hard work nahi, <span className="text-amber-400 underline decoration-amber-500/50 underline-offset-4">right direction</span> chahiye."
          </p>
        </div>
      </motion.div>
    </section>
  );
};

const RealitySection = () => {
  return (
    <section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto relative z-10 my-10 border border-white/10 rounded-[3rem] bg-gradient-to-br from-[#0c0f1a] to-[#07090e] shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center p-4 lg:p-8">
        
        {/* Reality Block */}
        <div className="flex flex-col gap-6 bg-red-500/5 p-8 rounded-3xl border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.05)]">
          <div className="flex items-center gap-3 text-red-400 mb-2">
            <AlertTriangle className="w-8 h-8" />
            <h3 className="text-3xl font-black">Harsh Reality</h3>
          </div>
          <p className="text-slate-300 font-medium">If a student is currently:</p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-lg text-slate-400">
              <TrendingDown className="w-6 h-6 text-red-500/80 flex-shrink-0" />
              Doing random, unguided preparation
            </li>
            <li className="flex items-start gap-3 text-lg text-slate-400">
              <TrendingDown className="w-6 h-6 text-red-500/80 flex-shrink-0" />
              Confused about where to start
            </li>
            <li className="flex items-start gap-3 text-lg text-slate-400">
              <TrendingDown className="w-6 h-6 text-red-500/80 flex-shrink-0" />
              Practicing without any clear direction
            </li>
          </ul>
          <div className="mt-4 p-4 border border-red-500/30 bg-red-500/10 rounded-xl text-center">
            <p className="text-red-400 font-bold text-lg">Then Selection Becomes Difficult ❌</p>
          </div>
        </div>

        {/* Solution Block */}
        <div className="flex flex-col gap-6 bg-emerald-500/5 p-8 rounded-3xl border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.05)]">
          <div className="flex items-center gap-3 text-emerald-400 mb-2">
            <ShieldCheck className="w-8 h-8" />
            <h3 className="text-3xl font-black">The Solution</h3>
          </div>
          <p className="text-slate-300 font-medium">With TechieHelp, you get:</p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-lg text-slate-200">
              <TrendingUp className="w-6 h-6 text-emerald-500 flex-shrink-0" />
              Clear & focused direction
            </li>
            <li className="flex items-start gap-3 text-lg text-slate-200">
              <TrendingUp className="w-6 h-6 text-emerald-500 flex-shrink-0" />
              Smart, high-ROI preparation
            </li>
            <li className="flex items-start gap-3 text-lg text-slate-200">
              <TrendingUp className="w-6 h-6 text-emerald-500 flex-shrink-0" />
              Massive time savings
            </li>
          </ul>
          <div className="mt-4 p-4 border border-emerald-500/30 bg-emerald-500/10 rounded-xl text-center">
            <p className="text-emerald-400 font-bold text-lg flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> Higher Selection Chances ✅
            </p>
          </div>
          <div className="text-center w-full mt-2">
             <span className="inline-block px-4 py-1.5 bg-indigo-500/20 text-indigo-300 font-extrabold rounded-full border border-indigo-500/30 tracking-widest uppercase text-sm">Target: 10–20 LPA Packages</span>
          </div>
        </div>

      </div>
    </section>
  );
};


const ModulesSection = ({ onOpenModule }) => {
  const router = useRouter();
  return (
    <section id="modules" className="py-16 px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Structured Preparation Modules</h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">Skip the noise. Focus directly on the materials that modern tech companies use in their hiring pipelines.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {modules.map((mod, index) => (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
            whileHover={{ y: -12, scale: 1.03 }}
            className="group relative rounded-[32px] border border-white/5 bg-gradient-to-b from-[#131620] to-[#0b0d14] backdrop-blur-2xl overflow-hidden cursor-pointer shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-500 flex flex-col"
            onClick={() => {
              if (mod.id === 1) {
                router.push("/prep-resources/dsa"); // Clicking DSA routes to the new page
              } else {
                onOpenModule(mod);
              }
            }}
          >
            {/* Dynamic Hover Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-colors duration-700 pointer-events-none" />
            
            <div className="p-8 relative z-10 flex flex-col flex-1 h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 rounded-2xl bg-[#0f111a] border border-white/10 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  {mod.icon}
                </div>
                {mod.isNew && (
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold tracking-wide uppercase shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                    <Bell className="w-3.5 h-3.5" />
                    New
                  </div>
                )}
              </div>
              
              <h3 className="text-2xl font-black text-white mb-2 group-hover:text-blue-400 transition-colors leading-tight">
                {mod.title}
              </h3>
              <p className="text-amber-400 text-sm font-bold mb-5 leading-relaxed bg-amber-400/10 inline-block px-3 py-1 rounded-md w-fit">
                {mod.desc}
              </p>

              <div className="flex-1 mb-6">
                <ul className="space-y-2">
                  {mod.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Progress Bar */}
              <div className="mb-6 mt-auto">
                <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                  <span>Progress</span>
                  <span className="text-slate-300">{mod.progress}%</span>
                </div>
                <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${mod.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full relative" 
                  >
                    <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }} />
                  </motion.div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <span suppressHydrationWarning className="text-sm font-black text-blue-400 group-hover:text-indigo-400 transition-colors flex items-center gap-2">
                  {mod.buttonText || "Access Vault"}
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  return (
    <section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Why Choose Us?</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">What you will get by following this specialized library.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { title: "All-in-One Platform", desc: "Clear roadmap from beginner to advanced without bouncing between sites.", icon: <Layers className="w-7 h-7 text-blue-400" /> },
          { title: "Structured Roadmap", desc: "Important questions only. Absolutely no time waste on irrelevant topics.", icon: <Map className="w-7 h-7 text-indigo-400" /> },
          { title: "Real Company Qs", desc: "Interview-ready preparation simulating actual test environments.", icon: <Briefcase className="w-7 h-7 text-purple-400" /> },
          { title: "Lifetime Access", desc: "Massive confidence boost with continuous updates for the rest of your career.", icon: <Clock className="w-7 h-7 text-pink-400" /> }
        ].map((feat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="p-8 rounded-[2rem] bg-gradient-to-br from-[#131620] to-[#0b0d14] border border-white/5 hover:border-white/10 shadow-lg hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner">
              {feat.icon}
            </div>
            <h4 className="text-xl font-black text-white mb-3">{feat.title}</h4>
            <p className="text-sm text-slate-400 leading-relaxed font-medium">{feat.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  return (
    <section className="py-24 px-6 lg:px-8 bg-gradient-to-b from-[#07090e] to-[#0b0d14] relative z-10 w-full overflow-hidden">
      
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-40 bg-indigo-500/10 rounded-[100%] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 text-balance">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Proven Results</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">See what successful candidates are saying.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Rahul", role: "Amazon", img: "https://i.pravatar.cc/150?u=1", text: "DSA module se direct questions aaye placement me. Life changing platform!" },
            { name: "Priya", role: "Deloitte", img: "https://i.pravatar.cc/150?u=2", text: "Structured preparation ne confidence boost kiya. Absolutely worth it." },
            { name: "Ankit", role: "TCS", img: "https://i.pravatar.cc/150?u=3", text: "Placement papers exactly same pattern ke the. Cracked it in first attempt!" }
          ].map((t, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className="p-8 rounded-[2rem] bg-[#131620]/80 border border-white/5 backdrop-blur-md relative group hover:border-indigo-500/30 transition-colors"
            >
              <div className="absolute top-0 right-8 -mt-5 text-6xl text-white/10 font-serif leading-none group-hover:text-indigo-500/20 transition-colors">"</div>
              
              <div className="flex text-amber-400 mb-6 gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-amber-400" />)}
              </div>
              <p className="text-slate-300 mb-8 text-lg leading-relaxed font-medium">"{t.text}"</p>
              
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/5">
                <img src={t.img} alt={t.name} className="w-14 h-14 rounded-full border-2 border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.3)]" />
                <div>
                  <h4 className="text-white font-bold text-lg">{t.name}</h4>
                  <p className="text-sm font-bold text-indigo-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const OfferSection = () => {
  return (
    <section id="offer" className="py-20 px-6 lg:px-8 max-w-5xl mx-auto relative z-10 mb-20 text-center">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-[3rem] blur-3xl -z-10" />
      <div className="bg-[#131620]/90 backdrop-blur-3xl border-2 border-indigo-500/30 rounded-[3rem] p-10 md:p-16 shadow-[0_0_60px_rgba(79,70,229,0.2)]">
        
        <div className="inline-block px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full mb-6 relative animate-[pulse_3s_infinite]">
          <span className="text-red-400 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
            <Timer className="w-4 h-4" /> Limited Time Offer Ending Soon 🔥
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Lifetime Placement <br/> <span className="text-indigo-400">Preparation Library</span></h2>
        
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-10 text-slate-300 font-bold text-lg">
          <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-400" /> One-time payment</span>
          <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-400" /> Lifetime access</span>
          <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-400" /> All modules included</span>
          <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-400" /> Regular updates</span>
        </div>

        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl mb-10 max-w-2xl mx-auto">
          <p className="text-xl md:text-2xl font-black text-amber-400">
            "Aaj start karoge to hi next placement me result milega!"
          </p>
        </div>

        <button suppressHydrationWarning className="mx-auto flex items-center justify-center gap-3 px-12 py-6 rounded-2xl font-black text-xl text-white bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_0_40px_rgba(16,185,129,0.6)] hover:shadow-[0_0_60px_rgba(16,185,129,0.8)] transition-all duration-300 hover:-translate-y-2 w-full sm:w-auto transform scale-100 hover:scale-105">
          <Zap className="w-7 h-7 fill-white" /> Get Full Access Now
        </button>
      </div>
    </section>
  );
}

const ResourceModal = ({ isOpen, onClose, module }) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Lock body scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  if (!isOpen || !module) return null;

  const resources = mockResources[module.id] || defaultResources;
  const filteredResources = resources.filter(res => res.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[85vh] flex flex-col bg-[#0b0d14] border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 lg:p-8 border-b border-white/5 bg-gradient-to-r from-white/[0.02] to-transparent">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-[#131620] rounded-2xl border border-white/5 shadow-inner">
                {module.icon}
              </div>
              <div>
                <h3 className="text-2xl font-black text-white mb-1">{module.title}</h3>
                <p className="text-sm font-medium text-slate-400">{module.desc}</p>
              </div>
            </div>
            <button suppressHydrationWarning
              onClick={onClose}
              className="p-3 rounded-full hover:bg-white/10 text-slate-500 hover:text-white transition-all hover:rotate-90"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search Bar & Filters */}
          <div className="p-6 lg:px-8 border-b border-white/5 bg-black/20">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
              <input suppressHydrationWarning
                type="text"
                placeholder="Search precise topics, papers, or specific folders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-[#131620] border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium text-sm shadow-inner"
              />
            </div>
          </div>

          {/* Resource List */}
          <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-3 bg-[#0b0d14]">
            {filteredResources.length > 0 ? (
              filteredResources.map((res, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-5 rounded-2xl hover:bg-[#131620] border border-transparent hover:border-white/10 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center gap-5">
                    <div className="p-3 bg-[#0f111a] rounded-xl group-hover:scale-110 transition-transform shadow-inner border border-white/5">
                      {res.type === "folder" ? <Folder className="w-6 h-6 text-blue-400 fill-blue-400/20" /> :
                       res.type === "video" ? <Play className="w-6 h-6 text-purple-400 fill-purple-400/20" /> :
                       <File className="w-6 h-6 text-pink-400 fill-pink-400/20" />}
                    </div>
                    <div>
                      <h4 className="text-lg text-white font-bold group-hover:text-blue-400 transition-colors">{res.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-800 px-2 py-0.5 rounded">
                          {res.type}
                        </span>
                        <span className="text-xs font-medium text-slate-400">
                          • {res.type === "folder" ? `${res.items} items` : res.size}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button suppressHydrationWarning className="opacity-0 group-hover:opacity-100 p-3 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all shadow-sm">
                    {res.type === "folder" ? <ChevronRight className="w-5 h-5" /> : <Download className="w-5 h-5" />}
                  </button>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                  <Search className="w-10 h-10 text-slate-600" />
                </div>
                <p className="text-lg font-bold text-slate-300">No matches found</p>
                <p className="text-sm text-slate-500 mt-2">Try adjusting your search query to find exact materials.</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};


// --- Main Page ---

export default function CareerResourcesPage() {
  const [selectedModule, setSelectedModule] = useState(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!isPageLoaded && <InitialLoader onComplete={() => setIsPageLoaded(true)} />}
      </AnimatePresence>

      <div className={`min-h-screen bg-[#07090e] font-sans selection:bg-indigo-500/30 overflow-x-hidden transition-opacity duration-1000 ${isPageLoaded ? "opacity-100" : "opacity-0 h-screen overflow-hidden"}`}>
        <HeroSection />
        <RealitySection />
        <ModulesSection onOpenModule={setSelectedModule} />
        <FeaturesSection />
        <TestimonialsSection />
        <OfferSection />

        <ResourceModal 
          isOpen={!!selectedModule} 
          onClose={() => setSelectedModule(null)} 
          module={selectedModule} 
        />
      </div>
    </>
  );
}
