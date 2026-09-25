"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight, BarChart3, BookOpen, Briefcase, CheckCircle2,
  ChevronRight, Code2, FileText, Github, LineChart,
  Sparkles, Target, Trophy, Users, Zap, Building, LayoutDashboard, MonitorPlay, Presentation, XCircle,
  Sun, Moon, Menu, X, GraduationCap, Award, Star, TrendingUp, Cpu, Database, Code, Smartphone, Shield, Cloud, Layout, Megaphone, Video, Terminal, Linkedin, Map, Play,
  Mail, Phone, ArrowUpRight, HeartHandshake, MapPin, Settings, Clock, Banknote, Bell, Calendar
} from "lucide-react";

// Animations
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// Counter Component
const AnimatedCounter = ({ value, text }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (isInView) {
      let startValue = 0;
      const endValue = parseInt(value.toString().replace(/[^0-9]/g, ""));
      const duration = 2000;
      if (startValue === endValue) return;
      const increment = endValue / (duration / 16);
      const timer = setInterval(() => {
        startValue += increment;
        setCounter(Math.floor(startValue));
        if (startValue >= endValue) {
          setCounter(endValue);
          clearInterval(timer);
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div ref={ref} variants={fadeIn} className="flex flex-col items-center justify-center p-6 lg:p-8 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 transition-colors shadow-sm hover:shadow-md group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-amber-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10 text-center">
        <h3 className="text-4xl md:text-5xl font-bold text-blue-950 mb-2">
          {value.toString().includes("+") ? `${counter}+` : counter}
          {value.toString().includes("%") ? "%" : ""}
          {value.toString() === "24/7" ? "24/7" : ""}
        </h3>
        <p className="text-slate-500 font-medium">{text}</p>
      </div>
    </motion.div>
  );
};
export default function Home({ latestJobs = [] }) {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [whyCategory, setWhyCategory] = useState("all");
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeCertTab, setActiveCertTab] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Auto-cycle through dashboard steps every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 6);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Force light mode
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  return (
    <div className="light transition-colors duration-300">
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100 overflow-hidden relative">

        {/* Global Premium Background Effects (Light Theme) */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] opacity-[0.08] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600 via-blue-200 to-transparent blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] opacity-[0.1] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-400 via-transparent to-transparent blur-[120px]" />
          <div className="absolute inset-0 bg-center opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="relative z-10 pt-20 md:pt-22">

          {/* 1. HERO SECTION (Exact Replica of Reference Design) */}
          <section className="relative pt-2 md:pt-4 pb-6 md:pb-10 px-4 md:px-6 max-w-[1400px] mx-auto overflow-hidden">
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">

              {/* Left Side Column */}
              <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="lg:col-span-6 z-10 space-y-5">


                {/* Main Hero Headline */}
                <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl lg:text-[62px] xl:text-[70px] font-black tracking-tight leading-[1.08] text-[#0B192C]">
                  From Classroom <br />
                  to Dream <span className="inline-flex items-center tracking-tight">
                    <span className="text-[#1D4ED8]">C</span>
                    <span className="text-[#F97316]">a</span>
                    <span className="text-[#F59E0B]">r</span>
                    <span className="text-[#EAB308]">e</span>
                    <span className="text-[#F97316]">e</span>
                    <span className="text-[#EF4444]">r</span>
                    <span className="text-slate-400">.</span>
                  </span>
                </motion.h1>

                {/* Tagline Headline */}
                <motion.h2 variants={fadeIn} className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B192C] tracking-tight">
                  Learn. Build. Intern. Get Industry Ready.
                </motion.h2>

                {/* Description */}
                <motion.p variants={fadeIn} className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
                  TechieHelp Institute of AI helps students turn academic knowledge into real-world skills through industry-led training, live projects, internships, mentorship and career preparation.
                </motion.p>

                {/* Action Buttons */}
                <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-4 pt-1">
                  <Link
                    href="/skill-development-programs"
                    className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-bold text-base shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-95 group"
                  >
                    Explore Programs
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/internship"
                    className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#0B192C] font-bold border-2 border-slate-200 hover:border-slate-800 transition-all text-base shadow-sm hover:scale-[1.02] active:scale-95"
                  >
                    Start Your Career Journey
                  </Link>

                  <button
                    onClick={() => setVideoModalOpen(true)}
                    className="inline-flex items-center gap-3 px-3 py-2 text-slate-800 hover:text-blue-700 font-semibold transition-all group"
                  >
                    <div className="w-11 h-11 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold text-[#0B192C] group-hover:text-blue-700">Watch Video</div>
                      <div className="text-xs text-slate-500 font-medium">(1 min)</div>
                    </div>
                  </button>

                  {/* Free Mentorship CTA (Topmate) */}
                  <a
                    href="https://topmate.io/amit_kumar_ceo_techiehelp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-3 py-2 text-slate-800 hover:text-rose-600 font-semibold transition-all group"
                  >
                    <div className="w-11 h-11 rounded-full bg-white border-2 border-rose-100 shadow-md group-hover:scale-110 group-hover:border-rose-500 transition-all flex items-center justify-center p-0.5 overflow-hidden shrink-0">
                      <img src="/topmate.png" alt="Topmate Free Mentorship" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold text-[#0B192C] group-hover:text-rose-600 flex items-center gap-1">
                        Free Mentorship
                        <ArrowUpRight className="w-3.5 h-3.5 text-rose-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                      <div className="text-xs text-rose-600 font-bold bg-rose-50 px-2 py-0.2 rounded-full border border-rose-100 inline-block">Book 1-on-1</div>
                    </div>
                  </a>
                </motion.div>

              </motion.div>

              {/* Right Side Visual Column (Ultra-HD Replica Visual) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="lg:col-span-6 relative mt-6 lg:mt-0 flex justify-center items-center"
              >
                {/* Backdrop Glow & Ambient Lighting */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 via-sky-300/10 to-amber-300/20 rounded-[3rem] blur-2xl -z-10 transform scale-105" />

                {/* Main HD Visual Container */}
                <div className="relative w-full max-w-[650px] rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm border-4 border-white shadow-[0_25px_60px_-15px_rgba(29,78,216,0.15)] ring-1 ring-slate-200/80 group">

                  {/* HD Image Visual */}
                  <div className="relative w-full aspect-[1.75/1] overflow-hidden rounded-2xl">
                    <Image
                      src="/hero-visual-hd.png"
                      alt="TechieHelp Institute of AI Hero Visual"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                      className="object-cover object-center transform group-hover:scale-[1.015] transition-transform duration-700 ease-out filter contrast-[1.04] brightness-[1.02]"
                    />
                  </div>

                  {/* Floating Micro-Badges for Premium Touch */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-4 left-4 z-20 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-100 shadow-md text-xs font-bold text-slate-800"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Real-World Training</span>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-4 right-4 z-20 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-100 shadow-md text-xs font-bold text-[#1D4ED8]"
                  >
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>AI-Powered Platform</span>
                  </motion.div>

                </div>
              </motion.div>

            </div>

            {/* 2. HORIZONTAL FEATURE STRIP (5 Pillars Container) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-6 md:mt-8 rounded-2xl bg-white/90 border border-slate-200/80 p-4 md:p-5 shadow-sm backdrop-blur-md"
            >
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-5 divide-y md:divide-y-0 md:divide-x divide-slate-200/60">
                {[
                  { icon: GraduationCap, title: "Industry Mentors", desc: "Learn from Experts", color: "text-blue-600 bg-blue-100/60" },
                  { icon: FileText, title: "Live Projects", desc: "Build Real Products", color: "text-indigo-600 bg-indigo-100/60" },
                  { icon: Users, title: "Internships", desc: "Gain Experience", color: "text-[#0284C7] bg-sky-100/60" },
                  { icon: BarChart3, title: "Career Preparation", desc: "Mock Interviews & Resume", color: "text-amber-600 bg-amber-100/60" },
                  { icon: Building, title: "College Partnerships", desc: "Training & Placement Support", color: "text-blue-800 bg-blue-100/80" }
                ].map((item, idx) => (
                  <div key={idx} className={`flex items-center gap-3 ${idx !== 0 ? 'pt-2.5 md:pt-0 md:pl-4' : ''}`}>
                    <div className={`w-10 h-10 md:w-11 md:h-11 rounded-xl ${item.color} flex items-center justify-center shrink-0 shadow-sm`}>
                      <item.icon className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs md:text-sm text-[#0B192C] leading-snug">{item.title}</h4>
                      <p className="text-[11px] md:text-xs text-slate-500 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 3. TRUSTED BY LOGOS BAR (Infinite Looping Marquee in Full Brand Colors) */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-4 md:mt-5 flex flex-col lg:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200/60 overflow-hidden"
            >
              <div className="text-xs sm:text-sm font-bold text-slate-600 shrink-0 text-center lg:text-left flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Trusted by Students, Colleges &amp; Industry Professionals
              </div>

              {/* Infinite Scrolling Marquee Container */}
              <div className="relative w-full lg:max-w-4xl overflow-hidden flex items-center py-1">
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />

                <motion.div
                  className="flex items-center gap-6 md:gap-8 shrink-0 min-w-full"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ repeat: Infinity, ease: "linear", duration: 24 }}
                >
                  {[
                    /* --- Priority Govt & Trust Logos (First) --- */
                    // 1. MSME Logo
                    <div key="msme1" className="flex items-center gap-2 shrink-0 bg-white/90 backdrop-blur-sm border border-slate-200/90 rounded-xl px-3 py-1.5 shadow-sm hover:scale-105 transition-transform">
                      <img src="/msme.png" alt="MSME Govt of India" className="h-6 md:h-7 w-auto object-contain" onError={(e) => { e.currentTarget.src = "/image (4).png"; }} />
                      <span className="font-extrabold text-xs md:text-sm text-slate-900 tracking-tight">MSME Govt</span>
                    </div>,

                    // 2. ISO Logo
                    <div key="iso1_1" className="flex items-center gap-2 shrink-0 bg-white/90 backdrop-blur-sm border border-slate-200/90 rounded-xl px-3 py-1.5 shadow-sm hover:scale-105 transition-transform">
                      <img src="/image (3).png" alt="ISO Certified" className="h-6 md:h-7 w-auto object-contain" />
                      <span className="font-extrabold text-xs md:text-sm text-slate-900 tracking-tight">ISO 9001:2015</span>
                    </div>,

                    // 3. iStart Logo
                    <div key="istart1" className="flex items-center gap-2 shrink-0 bg-white/90 backdrop-blur-sm border border-slate-200/90 rounded-xl px-3.5 py-1 shadow-sm hover:scale-105 transition-transform">
                      <img src="/istart.svg" alt="iStart Rajasthan" className="h-6 md:h-7.5 w-auto object-contain" />
                    </div>,

                    // 4. ISO Certification Badge
                    <div key="iso1_2" className="flex items-center gap-2 shrink-0 bg-white/90 backdrop-blur-sm border border-amber-200/90 rounded-xl px-3 py-1.5 shadow-sm hover:scale-105 transition-transform">
                      <div className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-black text-[9px] text-amber-600">ISO</div>
                      <span className="font-extrabold text-xs md:text-sm text-amber-800 tracking-tight">ISO Quality Certified</span>
                    </div>,

                    // 5. AICTE Internship Portal Logo
                    <div key="aicte1" className="flex items-center gap-2 shrink-0 bg-white/90 backdrop-blur-sm border border-blue-200/90 rounded-xl px-3 py-1.5 shadow-sm hover:scale-105 transition-transform">
                      <img src="/internship-1.png" alt="AICTE Internship Portal" className="h-6 md:h-7 w-auto object-contain" />
                      <span className="font-extrabold text-xs md:text-sm text-blue-900 tracking-tight">AICTE Internship Portal</span>
                    </div>,

                    /* --- Industry Global Brands --- */
                    <span key="ms1" className="font-bold text-base md:text-lg text-slate-800 tracking-tight flex items-center gap-1.5 shrink-0">
                      <span className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5">
                        <span className="bg-[#F25022] w-1.5 h-1.5" />
                        <span className="bg-[#7FBA00] w-1.5 h-1.5" />
                        <span className="bg-[#00A4EF] w-1.5 h-1.5" />
                        <span className="bg-[#FFB900] w-1.5 h-1.5" />
                      </span>
                      Microsoft
                    </span>,
                    <span key="g1" className="font-bold text-base md:text-lg tracking-tight shrink-0">
                      <span className="text-[#4285F4]">G</span>
                      <span className="text-[#EA4335]">o</span>
                      <span className="text-[#FBBC05]">o</span>
                      <span className="text-[#4285F4]">g</span>
                      <span className="text-[#34A853]">l</span>
                      <span className="text-[#EA4335]">e</span>
                    </span>,
                    <span key="aws1" className="font-extrabold text-base md:text-lg text-[#FF9900] tracking-tighter shrink-0">
                      aws
                    </span>,
                    <span key="gh1" className="font-bold text-base md:text-lg text-slate-900 flex items-center gap-1.5 shrink-0">
                      <Github className="w-4 h-4 md:w-5 md:h-5 fill-slate-900 text-slate-900" /> GitHub
                    </span>,
                    <span key="li1" className="font-bold text-base md:text-lg text-[#0A66C2] flex items-center gap-1.5 shrink-0">
                      <Linkedin className="w-4 h-4 md:w-5 md:h-5 fill-[#0A66C2] text-[#0A66C2]" /> LinkedIn
                    </span>,
                    <span key="nv1" className="font-extrabold text-base md:text-lg text-[#76B900] tracking-wide shrink-0">
                      NVIDIA
                    </span>,
                    <span key="ibm1" className="font-black text-lg md:text-xl text-[#052FAD] tracking-widest shrink-0">
                      IBM
                    </span>,
                    <span key="inf1" className="font-bold text-base md:text-lg text-[#007CC3] shrink-0">
                      Infosys
                    </span>,

                    /* --- Duplicate Set for Continuous Seamless Marquee Loop --- */
                    <div key="msme2" className="flex items-center gap-2 shrink-0 bg-white/90 backdrop-blur-sm border border-slate-200/90 rounded-xl px-3 py-1.5 shadow-sm hover:scale-105 transition-transform">
                      <img src="/msme.png" alt="MSME Govt of India" className="h-6 md:h-7 w-auto object-contain" onError={(e) => { e.currentTarget.src = "/image (4).png"; }} />
                      <span className="font-extrabold text-xs md:text-sm text-slate-900 tracking-tight">MSME Govt</span>
                    </div>,

                    <div key="iso2_1" className="flex items-center gap-2 shrink-0 bg-white/90 backdrop-blur-sm border border-slate-200/90 rounded-xl px-3 py-1.5 shadow-sm hover:scale-105 transition-transform">
                      <img src="/image (3).png" alt="ISO Certified" className="h-6 md:h-7 w-auto object-contain" />
                      <span className="font-extrabold text-xs md:text-sm text-slate-900 tracking-tight">ISO 9001:2015</span>
                    </div>,

                    <div key="istart2" className="flex items-center gap-2 shrink-0 bg-white/90 backdrop-blur-sm border border-slate-200/90 rounded-xl px-3.5 py-1 shadow-sm hover:scale-105 transition-transform">
                      <img src="/istart.svg" alt="iStart Rajasthan" className="h-6 md:h-7.5 w-auto object-contain" />
                    </div>,

                    <div key="iso2_2" className="flex items-center gap-2 shrink-0 bg-white/90 backdrop-blur-sm border border-amber-200/90 rounded-xl px-3 py-1.5 shadow-sm hover:scale-105 transition-transform">
                      <div className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-black text-[9px] text-amber-600">ISO</div>
                      <span className="font-extrabold text-xs md:text-sm text-amber-800 tracking-tight">ISO Quality Certified</span>
                    </div>,

                    <div key="aicte2" className="flex items-center gap-2 shrink-0 bg-white/90 backdrop-blur-sm border border-blue-200/90 rounded-xl px-3 py-1.5 shadow-sm hover:scale-105 transition-transform">
                      <img src="/internship-1.png" alt="AICTE Internship Portal" className="h-6 md:h-7 w-auto object-contain" />
                      <span className="font-extrabold text-xs md:text-sm text-blue-900 tracking-tight">AICTE Internship Portal</span>
                    </div>,

                    <span key="ms2" className="font-bold text-base md:text-lg text-slate-800 tracking-tight flex items-center gap-1.5 shrink-0">
                      <span className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5">
                        <span className="bg-[#F25022] w-1.5 h-1.5" />
                        <span className="bg-[#7FBA00] w-1.5 h-1.5" />
                        <span className="bg-[#00A4EF] w-1.5 h-1.5" />
                        <span className="bg-[#FFB900] w-1.5 h-1.5" />
                      </span>
                      Microsoft
                    </span>,
                    <span key="g2" className="font-bold text-base md:text-lg tracking-tight shrink-0">
                      <span className="text-[#4285F4]">G</span>
                      <span className="text-[#EA4335]">o</span>
                      <span className="text-[#FBBC05]">o</span>
                      <span className="text-[#4285F4]">g</span>
                      <span className="text-[#34A853]">l</span>
                      <span className="text-[#EA4335]">e</span>
                    </span>,
                    <span key="aws2" className="font-extrabold text-base md:text-lg text-[#FF9900] tracking-tighter shrink-0">
                      aws
                    </span>,
                    <span key="gh2" className="font-bold text-base md:text-lg text-slate-900 flex items-center gap-1.5 shrink-0">
                      <Github className="w-4 h-4 md:w-5 md:h-5 fill-slate-900 text-slate-900" /> GitHub
                    </span>,
                    <span key="li2" className="font-bold text-base md:text-lg text-[#0A66C2] flex items-center gap-1.5 shrink-0">
                      <Linkedin className="w-4 h-4 md:w-5 md:h-5 fill-[#0A66C2] text-[#0A66C2]" /> LinkedIn
                    </span>,
                    <span key="nv2" className="font-extrabold text-base md:text-lg text-[#76B900] tracking-wide shrink-0">
                      NVIDIA
                    </span>,
                    <span key="ibm2" className="font-black text-lg md:text-xl text-[#052FAD] tracking-widest shrink-0">
                      IBM
                    </span>,
                    <span key="inf2" className="font-bold text-base md:text-lg text-[#007CC3] shrink-0">
                      Infosys
                    </span>,
                  ]}
                </motion.div>
              </div>
            </motion.div>

          </section>

          {/* STUDENT ACHIEVEMENTS & CERTIFICATION MOMENTS (Clean White Theme Image Marquee) */}
          <section id="our-interns-achievements" className="py-12 md:py-16 relative bg-white border-y border-slate-200/80 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              
              {/* Clean White Theme Header */}
              <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1D4ED8] text-xs font-bold uppercase tracking-wider">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>Verified Student Success</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-[#0B192C]">
                  Student Achievements &amp; <span className="text-[#1D4ED8]">Certification Moments 🏆</span>
                </h2>

                <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-normal">
                  Real students. Real certificates. Real internship outcomes. A glimpse of our interns receiving verified certificates, goodies, and recognition after completing live projects.
                </p>
              </div>

              {/* Controls Toggle */}
              <div className="flex justify-end mb-4">
                <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setAutoScroll(true)}
                    className={`px-3.5 py-1 rounded-lg text-xs font-bold transition-all ${autoScroll ? "bg-[#1D4ED8] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
                  >
                    Auto Scroll
                  </button>
                  <button
                    onClick={() => setAutoScroll(false)}
                    className={`px-3.5 py-1 rounded-lg text-xs font-bold transition-all ${!autoScroll ? "bg-[#1D4ED8] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
                  >
                    Manual Scroll
                  </button>
                </div>
              </div>

              {/* Running Image Marquee */}
              <div className={autoScroll ? "overflow-hidden py-2" : "overflow-x-auto py-2"}>
                <motion.div
                  className="flex gap-4 shrink-0"
                  animate={autoScroll ? { x: ["0%", "-50%"] } : { x: "0%" }}
                  transition={
                    autoScroll
                      ? {
                        x: {
                          repeat: Infinity,
                          repeatType: "loop",
                          duration: 28,
                          ease: "linear",
                        },
                      }
                      : { duration: 0.3 }
                  }
                  style={{ width: "max-content" }}
                >
                  {[
                    "/hero-slides/goodies_kit.jpg",
                    "/hero-slides/technocrats_certificates.jpg",
                    "/hero-slides/single_cert_handover.jpg",
                    "/hero-slides/thumbs_up_team.jpg",
                    "/hero-slides/hackloop_awards.jpg",
                    "/hero-slides/principal_trophy.jpg",
                    "/hero-slides/certificate_handover.jpg",
                    "/hero-slides/award_ceremony.jpg",
                    "/hero-slides/team_celebration.jpg",
                    "/aarshdeep_cert.jpg",
                    "/nikhil_completion_certificate.png",
                    "/goodies_box.png",
                    "/swag_apparel.png"
                  ].map((imgSrc, index) => (
                    <div key={index} className="w-64 h-48 relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl hover:scale-105 transition-all duration-300 shrink-0 bg-slate-50 group">
                      <img
                        src={imgSrc}
                        alt={`TechieHelp Student Achievement ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}

                  {/* Duplicate Loop Set */}
                  {[
                    "/hero-slides/goodies_kit.jpg",
                    "/hero-slides/technocrats_certificates.jpg",
                    "/hero-slides/single_cert_handover.jpg",
                    "/hero-slides/thumbs_up_team.jpg",
                    "/hero-slides/hackloop_awards.jpg",
                    "/hero-slides/principal_trophy.jpg",
                    "/hero-slides/certificate_handover.jpg",
                    "/hero-slides/award_ceremony.jpg",
                    "/hero-slides/team_celebration.jpg",
                    "/aarshdeep_cert.jpg",
                    "/nikhil_completion_certificate.png",
                    "/goodies_box.png",
                    "/swag_apparel.png"
                  ].map((imgSrc, index) => (
                    <div key={`dup-${index}`} className="w-64 h-48 relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 hover:shadow-xl hover:scale-105 transition-all duration-300 shrink-0 bg-slate-50 group">
                      <img
                        src={imgSrc}
                        alt={`TechieHelp Student Achievement Duplicate ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </motion.div>
              </div>

            </div>
          </section>

          {/* BUILD2EARN COMPACT PROMO SECTION (WHITE THEME) */}
          <section id="build2earn-promo" className="py-12 md:py-16 relative bg-white border-b border-slate-200/60">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="bg-gradient-to-r from-slate-50 via-white to-blue-50/50 rounded-3xl p-6 md:p-10 border border-slate-200 shadow-md hover:shadow-xl transition-all relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
                
                {/* Decorative Pill & Glow */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 blur-[90px] rounded-full pointer-events-none" />

                <div className="space-y-4 max-w-3xl z-10 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Flagship 3-Month Program</span>
                  </div>

                  <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight leading-snug">
                    Build2Earn: <span className="text-[#2563EB]">Build Live Projects & Earn Proof of Work</span> 
                  </h2>

                  <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium">
                    Designed for 1st & 2nd year students. Transform zero experience into a deployed portfolio website, verified internship certificate, top 1% GitHub & LinkedIn profile in 12 structured weeks.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    {[
                      { label: "12-Week Roadmap", desc: "Step-by-step practical" },
                      { label: "Dual Credentials", desc: "Training & Internship" },
                      { label: "Live Portfolio", desc: "Custom deployed URL" },
                      { label: "Stipend & Freelance", desc: "Monetization guidance" }
                    ].map((feat, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{feat.label}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{feat.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTAs with explicit path links */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 z-10 w-full lg:w-auto">
                  <Link
                    href="/build2earn"
                    className="px-7 py-3.5 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>Join Build2Earn</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/internship#build2earn"
                    className="px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex items-center justify-center gap-2"
                  >
                    <span>View 12-Week Curriculum</span>
                  </Link>
                </div>

              </div>
            </div>
          </section>


          {/* 2. WHY STUDENTS CHOOSE TECHIEHELP INSTITUTE OF AI (Trust Factors & Alternating Showcase Layout) */}
          <section className="py-20 md:py-28 relative bg-gradient-to-b from-slate-50/50 via-white to-slate-50/50 border-y border-slate-200/60 overflow-hidden">

            {/* Ambient Lighting Accents */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-amber-400/10 rounded-full blur-[120px] pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-4 md:px-6">

              {/* Header Section */}
              <div className="text-center mb-16 max-w-4xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs md:text-sm font-bold shadow-sm">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Verified Credentials &amp; Real Industry Exposure</span>
                </div>

                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#0B192C] tracking-tight leading-tight">
                  Why 5,000+ Students Choose <br />
                  <span className="text-[#1D4ED8]">TechieHelp</span> <span className="text-[#F97316]">Institute</span> of AI
                </h2>

                <p className="text-base md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                  From offline classroom training to live AI microservices, national placement drives, and verified certificates — see what makes TechieHelp India's #1 AI Internship Portal.
                </p>
              </div>

              {/* 1. TRUST FACTOR BADGES STRIP (AICTE, MSME, ISO) */}
              <div className="mb-20">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white border border-slate-200/90 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full group-hover:scale-110 transition-transform" />
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-black text-2xl mb-5 border border-blue-100 shadow-sm">
                      🏛️
                    </div>
                    <span className="text-[11px] font-extrabold uppercase text-blue-600 tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block mb-3">
                      Govt Recognized Portal
                    </span>
                    <h3 className="text-xl font-extrabold text-[#0B192C] mb-2 leading-snug">
                      Listed on AICTE Internship Portal
                    </h3>
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                      Officially listed on the Govt of India AICTE portal. Earn academic credits and government-verified internship credentials.
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200/90 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full group-hover:scale-110 transition-transform" />
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-black text-2xl mb-5 border border-amber-100 shadow-sm">
                      🏢
                    </div>
                    <span className="text-[11px] font-extrabold uppercase text-amber-600 tracking-wider bg-amber-50 px-3 py-1 rounded-full border border-amber-100 inline-block mb-3">
                      Govt Enterprise
                    </span>
                    <h3 className="text-xl font-extrabold text-[#0B192C] mb-2 leading-snug">
                      MSME Govt of India Registered
                    </h3>
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                      Registered enterprise under the Ministry of Micro, Small and Medium Enterprises for official tech training &amp; development.
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200/90 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full group-hover:scale-110 transition-transform" />
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black text-2xl mb-5 border border-emerald-100 shadow-sm">
                      📜
                    </div>
                    <span className="text-[11px] font-extrabold uppercase text-emerald-600 tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 inline-block mb-3">
                      Quality Standard
                    </span>
                    <h3 className="text-xl font-extrabold text-[#0B192C] mb-2 leading-snug">
                      ISO 9001:2015 Certified
                    </h3>
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                      Internationally certified for excellence in AI curriculum delivery, hands-on project mentoring, and student career outcomes.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. ALTERNATING LEFT-RIGHT COMBINATION SHOWCASE BLOCKS */}
              <div className="space-y-20">

                {/* BLOCK A: OFFLINE INTERNSHIP PROGRAM */}
                <div className="grid lg:grid-cols-12 gap-10 items-center bg-white border border-slate-200/80 rounded-[2.5rem] p-6 md:p-10 shadow-lg">
                  {/* Left: Video Container with AutoPlay Loop */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="relative rounded-3xl overflow-hidden bg-slate-950 aspect-video border-2 border-slate-800 shadow-2xl group">
                      <video
                        src="/home.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 z-10 bg-slate-950/85 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full text-[11px] font-extrabold text-white flex items-center gap-2 shadow-lg">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                        OFFLINE CLASSROOM BATCH
                      </div>
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                      🏢 In-Person Learning Hubs
                    </div>
                    <h3 className="text-2xl md:text-4xl font-extrabold text-[#0B192C] leading-tight">
                      Offline Internship &amp; Classroom Training Programs
                    </h3>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                      Hands-on offline training with dedicated high-performance AI labs, 1-on-1 mentor guidance, physical hackathons, and real product build sessions.
                    </p>

                    <div className="space-y-2.5 pt-2">
                      {[
                        "Modern Tech Labs with High-Speed Internet & Development Workstations",
                        "Direct In-Person Mentorship by Senior Software Engineers & AI Architects",
                        "Peer Networking, Group Project Presentations & Hackathon Competitions",
                      ].map((feat, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs md:text-sm font-semibold text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* BLOCK B: ONLINE INTERNSHIP & LIVE DASHBOARD PORTAL */}
                <div className="grid lg:grid-cols-12 gap-10 items-center bg-white border border-slate-200/80 rounded-[2.5rem] p-6 md:p-10 shadow-lg">
                  {/* Left: Content */}
                  <div className="lg:col-span-6 space-y-4 order-2 lg:order-1">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
                      💻 Remote Access Anywhere
                    </div>
                    <h3 className="text-2xl md:text-4xl font-extrabold text-[#0B192C] leading-tight">
                      Online Internship &amp; Live Student Portal Ecosystem
                    </h3>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                      Learn and build from anywhere in India with 24/7 access to LMS video lectures, GitHub assignment reviews, ATS resume builders, and live mentor sessions.
                    </p>

                    <div className="space-y-2.5 pt-2">
                      {[
                        "Interactive Student Portal with LMS Curriculum & Code Repositories",
                        "Automated Task Submissions, Mentor Reviews & Skill Scorecard Analytics",
                        "Instant Verified Digital Credentials, QR Certificates & Official Offer Letters",
                      ].map((feat, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs md:text-sm font-semibold text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: YouTube Embed Container */}
                  <div className="lg:col-span-6 space-y-4 order-1 lg:order-2">
                    <div className="relative rounded-3xl overflow-hidden bg-slate-950 aspect-video border-2 border-slate-800 shadow-2xl group">
                      <iframe
                        className="w-full h-full object-cover"
                        src="https://www.youtube.com/embed/ipVC6YsvttM?autoplay=1&loop=1&playlist=ipVC6YsvttM&start=145&mute=1&controls=1&enablejsapi=1"
                        title="TechieHelp Online Internship &amp; Student Portal Demo"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                      <div className="absolute top-4 left-4 z-10 bg-slate-950/85 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full text-[11px] font-extrabold text-white flex items-center gap-2 shadow-lg pointer-events-none">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                        LIVE PORTAL DEMO
                      </div>
                    </div>
                  </div>
                </div>

                {/* BLOCK C: PLACEMENT RECORDS & HIRING DRIVES */}
                <div className="grid lg:grid-cols-12 gap-10 items-center bg-white border border-slate-200/80 rounded-[2.5rem] p-6 md:p-10 shadow-lg">
                  {/* Left: Uncropped Placement Drive Gallery */}
                  <div className="lg:col-span-6 space-y-3">
                    {/* Top Row: Side-by-Side 16:9 Widescreen Cards */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* Image 1: JIET Campus Placement Drive */}
                      <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-[16/9] border-2 border-slate-800 shadow-xl group hover:border-emerald-500/50 transition-all duration-300 flex items-center justify-center">
                        <img
                          src="/placement_drive_1.jpg"
                          alt="On-Campus Hiring Drive at Jodhpur Institute of Engineering & Technology (JIET)"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent pointer-events-none" />
                        <div className="absolute bottom-2 left-2 right-2 text-white pointer-events-none">
                          <span className="text-[9px] md:text-[10px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded-md backdrop-blur-md inline-flex items-center gap-1">
                            🏛️ Campus Drive @ JIET
                          </span>
                        </div>
                      </div>

                      {/* Image 2: 1-on-1 Interview Selection Round */}
                      <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-[16/9] border-2 border-slate-800 shadow-xl group hover:border-amber-500/50 transition-all duration-300 flex items-center justify-center">
                        <img
                          src="/placement_drive_2.png"
                          alt="1-on-1 Placement Interview Selection Drive"
                          className="w-full h-full object-contain bg-slate-950 group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent pointer-events-none" />
                        <div className="absolute bottom-2 left-2 right-2 text-white pointer-events-none">
                          <span className="text-[9px] md:text-[10px] font-bold text-amber-300 bg-amber-950/80 border border-amber-500/40 px-2 py-0.5 rounded-md backdrop-blur-md inline-flex items-center gap-1">
                            💼 Interview Drive
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Featured Full Uncropped Widescreen Display of Interview Drive */}
                    <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-[16/9] border-2 border-amber-500/40 shadow-xl group">
                      <img
                        src="/placement_drive_2.png"
                        alt="Full Uncropped Widescreen Placement Interview Selection Drive"
                        className="w-full h-full object-contain bg-slate-950 group-hover:scale-[1.02] transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-slate-950/90 backdrop-blur-md border border-amber-500/40 px-3 py-1 rounded-full text-[10px] md:text-[11px] font-bold text-amber-300 flex items-center gap-2 pointer-events-none shadow-md">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                        INTERVIEW SELECTION DRIVE (FULL UNCROPPED VIEW)
                      </div>
                    </div>

                    {/* Bottom Trust Banner */}
                    <div className="bg-slate-950 border border-white/10 p-3 rounded-2xl flex items-center justify-between text-xs text-slate-300 shadow-inner">
                      <div className="flex items-center gap-2 font-bold text-white text-[11px] md:text-xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>On-Campus &amp; Off-Campus Hiring Drives</span>
                      </div>
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 font-extrabold px-2.5 py-0.5 rounded-full border border-amber-500/30 shrink-0">
                        HIGHEST PACKAGE ₹14 LPA
                      </span>
                    </div>
                  </div>

                  {/* Right: Content & Stats */}
                  <div className="lg:col-span-6 space-y-5">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                      📈 Proven Placement Success
                    </div>
                    <h3 className="text-2xl md:text-4xl font-extrabold text-[#0B192C] leading-tight">
                      Placement Records &amp; Hiring Drives
                    </h3>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                      Our interns get selected at leading tech firms, MNCs, and AI startups through dedicated on-campus hiring drives, interview preparation, and direct company referrals.
                    </p>

                    <div className="grid grid-cols-3 gap-3 pt-1">
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 border border-amber-200/80 p-3.5 rounded-2xl shadow-sm hover:scale-[1.02] transition-transform">
                        <div className="text-xl md:text-2xl font-black text-amber-600">₹14 LPA</div>
                        <div className="text-[11px] md:text-xs text-slate-700 font-bold mt-1">Highest Package</div>
                      </div>
                      <div className="bg-slate-50 border border-slate-200/80 p-3.5 rounded-2xl shadow-sm hover:scale-[1.02] transition-transform">
                        <div className="text-xl md:text-2xl font-black text-[#1D4ED8]">5,000+</div>
                        <div className="text-[11px] md:text-xs text-slate-700 font-bold mt-1">Students Placed</div>
                      </div>
                      <div className="bg-slate-50 border border-slate-200/80 p-3.5 rounded-2xl shadow-sm hover:scale-[1.02] transition-transform">
                        <div className="text-xl md:text-2xl font-black text-emerald-600">100+</div>
                        <div className="text-[11px] md:text-xs text-slate-700 font-bold mt-1">Hiring Partners</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BLOCK D: GOODIES, SWAG & WELCOME KITS */}
                <div className="grid lg:grid-cols-12 gap-10 items-center bg-white border border-slate-200/80 rounded-[2.5rem] p-6 md:p-10 shadow-lg">
                  {/* Left: Content */}
                  <div className="lg:col-span-6 space-y-4 order-2 lg:order-1">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-100">
                      🎁 Exclusive Rewards
                    </div>
                    <h3 className="text-2xl md:text-4xl font-extrabold text-[#0B192C] leading-tight">
                      Welcome Kits, Goodies &amp; Swag
                    </h3>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                      Every offline intern and top performer receives custom TechieHelp swag, developer T-shirts, stickers, ID cards, and welcome packages.
                    </p>

                    <div className="space-y-2.5 pt-2">
                      {[
                        "Custom TechieHelp Developer T-Shirts & Branded Hoodies",
                        "Official Student ID Badges, Laptop Stickers & Developer Diaries",
                        "Certificate Framed Honors & Excellence Awards for Top Interns",
                      ].map((feat, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs md:text-sm font-semibold text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Combined 2-Grid Image Gallery Container */}
                  <div className="lg:col-span-6 space-y-3 order-1 lg:order-2">
                    <div className="grid grid-cols-2 gap-3">
                      {/* Image 1: Welcome Kit Box */}
                      <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-[4/3] border-2 border-slate-800 shadow-xl group hover:border-amber-500/50 transition-colors">
                        <img
                          src="/goodies_box.png"
                          alt="TechieHelp Welcome Kit &amp; Premium Diary Box"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                          <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded-md backdrop-blur-md inline-block">
                            📦 Welcome Kit Box
                          </span>
                        </div>
                      </div>

                      {/* Image 2: Developer Polo & Hoodies Swag */}
                      <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-[4/3] border-2 border-slate-800 shadow-xl group hover:border-amber-500/50 transition-colors">
                        <img
                          src="/swag_apparel.png"
                          alt="TechieHelp Developer Hoodies &amp; Polo T-Shirts"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                          <span className="text-[10px] font-bold text-blue-300 bg-blue-500/20 border border-blue-500/30 px-2 py-0.5 rounded-md backdrop-blur-md inline-block">
                            👕 Hoodies &amp; Polos
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-950 border border-white/10 p-3 rounded-2xl flex items-center justify-between text-xs text-slate-300 shadow-inner">
                      <div className="flex items-center gap-2 font-bold text-white text-[11px] md:text-xs">
                        <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Includes: Diary, Pen, Smart Bottle, Hoodies &amp; Polos</span>
                      </div>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-500/30 shrink-0">
                        100% FREE KIT
                      </span>
                    </div>
                  </div>
                </div>

                {/* BLOCK E: TEAM & INDUSTRY MENTORS */}
                <div className="grid lg:grid-cols-12 gap-10 items-center bg-white border border-slate-200/80 rounded-[2.5rem] p-6 md:p-10 shadow-lg">
                  {/* Left: Team Image Container */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="relative rounded-3xl overflow-hidden bg-slate-950 aspect-video border-2 border-slate-800 shadow-2xl group hover:border-purple-500/50 transition-colors">
                      <img
                        src="/team_mentors.png"
                        alt="TechieHelp Team &amp; Industry Mentors"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-white">
                        <div>
                          <div className="font-extrabold text-sm text-slate-100">TechieHelp Core Team &amp; Mentors</div>
                          <div className="text-[10px] text-purple-300 font-semibold">Officially Certified &amp; Registered AI Mentors</div>
                        </div>
                        <span className="bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md">
                          👥 Industry Leadership
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-100">
                      👥 Expert Leadership
                    </div>
                    <h3 className="text-2xl md:text-4xl font-extrabold text-[#0B192C] leading-tight">
                      Learn from Experts &amp; Dedicated Mentors
                    </h3>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                      Our founding team and industry instructors bring years of real-world AI, full stack development, and corporate engineering experience to guide your career path.
                    </p>

                    <div className="space-y-2.5 pt-2">
                      {[
                        "1-on-1 Code Reviews & Project Architecture Guidance",
                        "Weekly Live Q&A Sessions & Interview Preparation",
                        "Direct Referral & Placement Advocacy by Senior Engineering Leaders",
                      ].map((feat, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs md:text-sm font-semibold text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Callout Banner */}
              <div className="mt-16 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-900/50">
                <div className="space-y-1 text-center md:text-left">
                  <h4 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                    Ready to Start Your Internship Journey?
                  </h4>
                  <p className="text-slate-300 text-xs md:text-sm">
                    Enroll today in Offline or Online AI Internship Programs and transform your career.
                  </p>
                </div>
                <Link
                  href="/internship"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-lg transition-all hover:scale-[1.03] active:scale-95 shrink-0"
                >
                  Explore Programs
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>

            </div>
          </section>

          {/* 3. INTERNSHIPS SECTION (Replaced Programs) */}
          <section id="internships" className="py-24 relative bg-slate-50 border-y border-slate-200/60">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-amber-50 text-amber-700 font-semibold text-sm mb-6 border border-amber-100">
                    <Briefcase className="w-4 h-4 mr-2" /> Live Internships
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 tracking-tight">Real Internships. Real Projects.</h2>
                  <p className="text-lg text-slate-600">Work on live industry projects and add real impact to your resume with our premium internship programs.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { role: "AI & ML Intern", tech: ["Python", "TensorFlow"], spots: "Closing Soon", icon: Cpu, link: "/internship/aiml" },
                  { role: "Data Science Intern", tech: ["Pandas", "PowerBI"], spots: "Open", icon: Database, link: "/internship/datascience" },
                  { role: "Full Stack Intern", tech: ["MERN", "Next.js"], spots: "Hot", icon: Code, link: "/internship/fullstack" },
                ].map((internship, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="group bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-xl hover:-translate-y-2 transition-all relative overflow-hidden flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 rounded-xl bg-blue-950 flex items-center justify-center text-amber-500">
                        <internship.icon className="w-6 h-6" />
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${internship.spots === 'Hot' || internship.spots === 'Closing Soon' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {internship.spots}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{internship.role}</h3>
                    <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                      {internship.tech.map(t => (
                        <span key={t} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg">{t}</span>
                      ))}
                    </div>
                    <Link href={internship.link} className="w-full py-3 rounded-xl bg-slate-50 border-2 border-slate-100 text-center font-semibold text-slate-600 group-hover:bg-blue-950 group-hover:border-blue-950 group-hover:text-amber-500 transition-all block">
                      View Details
                    </Link>
                  </motion.div>
                ))}

                {/* 4th Card: Explore More */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="group bg-blue-950 rounded-3xl p-6 hover:shadow-xl hover:-translate-y-2 transition-all relative overflow-hidden flex flex-col h-full items-center justify-center text-center cursor-pointer">
                  <Link href="/internship" className="absolute inset-0 z-10" />
                  <div className="w-16 h-16 rounded-full bg-blue-900/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-8 h-8 text-amber-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Explore More</h3>
                  <p className="text-blue-200 text-sm">View all 10+ internship domains</p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* 4. LATEST JOBS SECTION */}
          <section id="jobs" className="py-24 relative bg-white border-b border-slate-200/60">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 font-semibold text-sm mb-6 border border-blue-100">
                    <Briefcase className="w-4 h-4 mr-2" /> Latest Opportunities
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 tracking-tight">Recent Job Openings.</h2>
                  <p className="text-lg text-slate-600">Apply for the latest jobs posted by top companies directly from our platform.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {latestJobs.map((job, i) => {
                  let skillsList = [];
                  try {
                    skillsList = JSON.parse(job.skills || "[]").slice(0, 3);
                  } catch (e) { }

                  return (
                    <motion.div key={job.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="group bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden flex flex-col h-full">

                      {/* Top Row: Logo & Tag */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                          {job.company?.logoUrl ? (
                            <img src={job.company.logoUrl} alt={job.company.name} className="w-full h-full object-contain p-2" />
                          ) : (
                            <Briefcase className="w-6 h-6 text-slate-400" />
                          )}
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                          {job.employmentType || "JOBS"}
                        </span>
                      </div>

                      {/* Title & Company */}
                      <h3 className="text-lg font-bold text-slate-900 mb-1 leading-snug line-clamp-2 min-h-[3rem]">{job.title}</h3>
                      <p className="text-slate-500 text-sm font-medium mb-4">{job.company?.name || "TechieHelp Partner"}</p>

                      {/* Salary & Location Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.salary && (
                          <span className="px-2.5 py-1.5 bg-green-50 text-green-700 text-xs font-semibold rounded-md flex items-center gap-1">
                            <Banknote className="w-3 h-3" /> {job.salary}
                          </span>
                        )}
                        <span className="px-2.5 py-1.5 bg-slate-50 text-slate-600 text-xs font-medium rounded-md flex items-center gap-1 border border-slate-100">
                          {job.location?.name || "Remote"}
                        </span>
                      </div>

                      {/* Skills */}
                      {skillsList.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {skillsList.map((skill, idx) => (
                            <span key={idx} className="text-xs font-semibold text-slate-500">#{skill}</span>
                          ))}
                        </div>
                      )}

                      {/* Bottom Row: Apply By & Button */}
                      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center text-[11px] text-slate-500 font-medium">
                          <Clock className="w-3 h-3 mr-1 shrink-0" />
                          <span className="truncate max-w-[120px]">Apply by: {job.applyBefore ? new Date(job.applyBefore).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Not revealed"}</span>
                        </div>
                        <Link href={`/jobs/${job.slug}`} className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-4 py-1.5 rounded-full hover:bg-slate-50 transition-colors flex items-center shrink-0 group-hover:border-blue-950 group-hover:text-blue-950">
                          View <ArrowRight className="w-3 h-3 ml-1" />
                        </Link>
                      </div>

                    </motion.div>
                  )
                })}

                {/* 4th Card: Explore Jobs */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="group bg-blue-950 rounded-3xl p-6 hover:shadow-xl hover:-translate-y-2 transition-all relative overflow-hidden flex flex-col h-full items-center justify-center text-center cursor-pointer">
                  <Link href="/jobs" className="absolute inset-0 z-10" />
                  <div className="w-16 h-16 rounded-full bg-blue-900/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-8 h-8 text-amber-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Explore Jobs</h3>
                  <p className="text-blue-200 text-sm">View all job postings</p>
                </motion.div>
              </div>
            </div>
          </section>


          {/* 5. CERTIFICATIONS SECTION */}
          <section className="py-24 relative bg-gradient-to-b from-white to-slate-50 border-y border-slate-200/60 overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 z-0">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-300/20 blur-[100px] rounded-full" />
              <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-200/20 blur-[100px] rounded-full" />
              <div className="absolute inset-0 opacity-[0.02] bg-center" style={{ backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
                    <Award className="w-5 h-5 text-amber-500" />
                    <span className="text-sm font-medium text-slate-700">Verified Credentials</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-slate-900">Earn Industry-Recognized Certifications 🏆</h2>
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    Stand out to recruiters with premium certificates that validate your skills, project experience, and internship completion.
                  </p>

                  <div className="space-y-4">
                    {["Training Certificate", "Internship Completion Certificate", "Project Completion Certificate", "Letter of Recommendation (LoR)"].map((cert, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-amber-300 transition-colors">
                        <CheckCircle2 className="w-6 h-6 text-blue-950 flex-shrink-0" />
                        <span className="font-semibold text-lg text-slate-800">{cert}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Certificate Visual */}
                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-tr from-amber-400 to-blue-400 rounded-3xl blur-2xl opacity-20 animate-pulse" />
                  <div className="relative aspect-[1.4/1] w-full bg-white rounded-2xl shadow-2xl overflow-hidden border-8 border-slate-100 transform rotate-2 hover:rotate-0 transition-transform duration-500 group">
                    <img
                      src="/nikhil_completion_certificate.png"
                      alt="Official TechieHelp Internship Completion Certificate"
                      className="w-full h-full object-contain bg-white"
                    />
                    <div className="absolute bottom-3 right-3 bg-slate-900/85 backdrop-blur-md border border-amber-400/40 text-amber-300 text-[11px] font-bold px-3 py-1 rounded-full shadow-lg pointer-events-none flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>QR Verified Credentials</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* 6. PLACEMENT PREPARATION SECTION */}
          <section id="preparation" className="py-24 relative bg-slate-50 border-y border-slate-200/60">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="text-center mb-16 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 tracking-tight">🎯 Become Placement Ready</h2>
                <p className="text-lg text-slate-600">Our suite of AI-powered tools ensures you are 100% prepared for technical and HR interviews.</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "AI Resume Builder", icon: FileText, desc: "Create ATS-friendly resumes that get shortlisted.", link: "/resume" },
                  { title: "Mock Interviews", icon: Video, desc: "Practice with AI interviewers and get instant feedback.", link: "/mock-interview" },
                  { title: "Coding Practice", icon: Terminal, desc: "Solve DSA questions with real-time AI hints.", link: "/dsa" },
                  { title: "GitHub Portfolio", icon: Github, desc: "Build a strong open-source profile automatically." },
                  { title: "LinkedIn Optimization", icon: Linkedin, desc: "Make your profile magnetic to recruiters." },
                  { title: "Career Roadmaps", icon: Map, desc: "Step-by-step guides for your target role." }
                ].map((prep, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group p-8 rounded-3xl bg-white border border-slate-200 hover:border-amber-300 transition-all shadow-sm hover:shadow-lg">
                    <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:bg-blue-950 group-hover:text-amber-500 text-blue-950">
                      <prep.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900">{prep.title}</h3>
                    <p className="text-slate-600 mb-6">{prep.desc}</p>
                    {prep.link ? (
                      <Link href={prep.link} className="inline-flex items-center text-sm font-semibold text-amber-500 hover:text-amber-600">
                        Try Now <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    ) : (
                      <span className="inline-flex items-center text-sm font-semibold text-slate-400">
                        Coming Soon
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 7. SUCCESS STORIES */}
          <section id="success" className="py-24 relative bg-white border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-[#2563EB] font-bold text-xs uppercase tracking-wider">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-400" /> PROOF OF SUCCESS
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                  Student Reviews & <span className="text-[#2563EB]">Success Stories</span>
                </h2>
                <p className="text-base sm:text-lg text-slate-600 font-medium">
                  Hear directly from our students about their learning experience, live projects, and career growth with TechieHelp.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-xl hover:shadow-2xl transition-all">
                  <div className="aspect-[9/16] rounded-2xl overflow-hidden bg-slate-900">
                    <iframe
                      src="https://www.youtube.com/embed/Ia1EOzjVwEY"
                      title="Student Review 1"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-xl hover:shadow-2xl transition-all">
                  <div className="aspect-[9/16] rounded-2xl overflow-hidden bg-slate-900">
                    <iframe
                      src="https://www.youtube.com/embed/l5Ox9Z1AJow"
                      title="Student Review 2"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-xl hover:shadow-2xl transition-all">
                  <div className="aspect-[9/16] rounded-2xl overflow-hidden bg-slate-900">
                    <iframe
                      src="https://www.youtube.com/embed/ywZ-_qpzRNY"
                      title="Student Review 3"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-xl hover:shadow-2xl transition-all">
                  <div className="aspect-[9/16] rounded-2xl overflow-hidden bg-slate-900">
                    <iframe
                      src="https://www.youtube.com/embed/Kj5x1XQUiXc"
                      title="Student Review 4"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>



          {/* 8. COLLEGE PARTNERSHIP SECTION */}
          <section id="tpo" className="py-24 relative bg-slate-50 overflow-hidden rounded-t-[3rem]">
            <div className="absolute inset-0 opacity-[0.02] bg-center" style={{ backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
              <div className="bg-gradient-to-br from-blue-950 to-blue-900 rounded-3xl p-1 md:p-12 lg:p-16 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-12 shadow-xl border border-white/10">
                <div className="max-w-2xl p-8 lg:p-0">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md mb-6 font-semibold text-sm text-white border border-white/30">
                    <Building className="w-4 h-4" /> For Colleges & Training Institutes
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-white">🏫 Empower Your Students</h2>
                  <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                    Partner with TechieHelp to provide your students with enterprise-grade placement preparation tools. Get detailed analytics on student readiness and streamline your TPO operations.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8 text-left">
                    {["Student Tracking Dashboard", "Custom Internship Programs", "On-Campus Workshops", "Dedicated Career Support"].map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-white font-medium">
                        <CheckCircle2 className="w-5 h-5 text-amber-400" /> {feature}
                      </div>
                    ))}
                  </div>

                  <Link href="/campus-partnership">
                    <button suppressHydrationWarning className="px-8 py-4 rounded-full bg-amber-500 text-blue-950 font-bold hover:bg-amber-600 hover:scale-105 transition-all shadow-xl">
                      Request Partnership
                    </button>
                  </Link>
                </div>

                <div className="hidden lg:block w-full max-w-md relative p-8">
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-3xl border border-white/40 transform rotate-3" />
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-3xl border border-white/40 transform -rotate-3" />
                  <div className="relative bg-white rounded-2xl p-6 shadow-2xl border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="font-bold text-slate-900">Placement Cell Analytics</h4>
                      <BarChart3 className="w-5 h-5 text-amber-500" />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs text-slate-500 mb-1"><span>Batch Readiness</span><span className="text-slate-700 font-bold">85%</span></div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"><div className="w-[85%] h-full bg-green-500" /></div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-slate-500 mb-1"><span>Resumes Approved</span><span className="text-slate-700 font-bold">92%</span></div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"><div className="w-[92%] h-full bg-blue-500" /></div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-slate-500 mb-1"><span>Mock Interviews Completed</span><span className="text-slate-700 font-bold">64%</span></div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"><div className="w-[64%] h-full bg-amber-500" /></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 9. FINAL CTA SECTION */}
          <section className="py-32 relative text-center bg-white border-t border-slate-200">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-amber-50 blur-[100px] rounded-full pointer-events-none" />
            <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-slate-900">
                Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-950 via-blue-800 to-amber-500">AI-Powered</span> <br className="hidden md:block" /> Career Journey Today
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-xl text-slate-600 mb-10">
                Join thousands of students who have already transformed their careers.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/sign-up" className="px-10 py-4 rounded-full bg-blue-950 text-white font-bold hover:bg-blue-900 hover:-translate-y-1 transition-all text-lg shadow-xl hover:shadow-blue-900/30">
                  Join Now
                </Link>
                <Link href="/programs" className="px-10 py-4 rounded-full bg-white text-blue-950 font-bold border-2 border-slate-200 hover:border-amber-500 hover:bg-amber-50 hover:text-amber-700 transition-all text-lg">
                  Explore Programs
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Video Modal Overlay */}
          <AnimatePresence>
            {videoModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
                onClick={() => setVideoModalOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-800"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setVideoModalOpen(false)}
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white flex items-center justify-center transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <div className="relative aspect-video w-full">
                    <video
                      src="/intro.mp4"
                      controls
                      autoPlay
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
