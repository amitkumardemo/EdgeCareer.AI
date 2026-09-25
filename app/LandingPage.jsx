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
              <div className="text-xs sm:text-sm font-bold text-slate-600 shrink-0 text-center lg:text-left">
                Trusted by Students, Colleges & Industry Professionals
              </div>

              {/* Infinite Scrolling Marquee Container */}
              <div className="relative w-full lg:max-w-3xl overflow-hidden flex items-center py-1">
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />

                <motion.div
                  className="flex items-center gap-8 md:gap-12 shrink-0 min-w-full"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ repeat: Infinity, ease: "linear", duration: 18 }}
                >
                  {[
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
                    /* Duplicate set for seamless continuous marquee loop */
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

                {/* BLOCK C: PLACEMENT RECORDS & SUCCESS STORIES */}
                <div className="grid lg:grid-cols-12 gap-10 items-center bg-white border border-slate-200/80 rounded-[2.5rem] p-6 md:p-10 shadow-lg">
                  {/* Left: YouTube Video Container */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="relative rounded-3xl overflow-hidden bg-slate-950 aspect-video border-2 border-slate-800 shadow-2xl group">
                      <iframe
                        className="w-full h-full object-cover"
                        src="https://www.youtube.com/embed/opSP03NPXrU?autoplay=1&loop=1&playlist=opSP03NPXrU&mute=1&controls=1&enablejsapi=1"
                        title="TechieHelp Placement Records &amp; Student Success Stories"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                      <div className="absolute top-4 left-4 z-10 bg-slate-950/85 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full text-[11px] font-extrabold text-white flex items-center gap-2 shadow-lg pointer-events-none">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        STUDENT SUCCESS STORIES
                      </div>
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                      📈 Proven Career Outcomes
                    </div>
                    <h3 className="text-2xl md:text-4xl font-extrabold text-[#0B192C] leading-tight">
                      Placement Records &amp; Hiring Drives
                    </h3>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                      Our interns work at top tech companies, MNCs, and high-growth AI startups. Get direct referrals and placement support.
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl">
                        <div className="text-2xl font-black text-[#1D4ED8]">5,000+</div>
                        <div className="text-xs text-slate-500 font-semibold mt-1">Students Trained &amp; Placed</div>
                      </div>
                      <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl">
                        <div className="text-2xl font-black text-emerald-600">100+</div>
                        <div className="text-xs text-slate-500 font-semibold mt-1">Industry Hiring Partners</div>
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
                  <div className="relative aspect-[4/3] w-full bg-white rounded-2xl shadow-2xl overflow-hidden border-8 border-slate-100 flex flex-col p-8 items-center justify-center text-slate-900 text-center transform rotate-2 hover:rotate-0 transition-transform duration-500">
                    <div className="w-16 h-16 mb-4">
                      <Award className="w-full h-full text-amber-500" />
                    </div>
                    <h3 className="text-3xl font-serif font-bold text-slate-900 mb-2">CERTIFICATE</h3>
                    <p className="text-sm tracking-widest text-slate-500 uppercase mb-8">Of Completion</p>
                    <p className="text-sm text-slate-600 mb-2">This is proudly presented to</p>
                    <h4 className="text-2xl font-bold border-b-2 border-slate-200 pb-2 mb-4 w-3/4 italic text-blue-950">Student Name</h4>
                    <p className="text-sm text-slate-600 px-8">For successfully completing the rigorous 6-month AI & Machine Learning Internship Program.</p>

                    <div className="absolute bottom-8 left-8 text-left">
                      <div className="w-24 h-px bg-slate-300 mb-2" />
                      <p className="text-[10px] font-bold">Director Signature</p>
                    </div>
                    <div className="absolute bottom-8 right-8 text-right">
                      <div className="w-16 h-16 rounded-full border-4 border-amber-400 flex items-center justify-center ml-auto mb-2 opacity-50">
                        <div className="w-12 h-12 rounded-full border border-amber-400" />
                      </div>
                      <p className="text-[10px] font-bold text-amber-600">Verified Badge</p>
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
          <section id="success" className="py-24 relative bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 tracking-tight">Success Stories</h2>
                <p className="text-lg text-slate-600">Hear from students who transformed their careers with TechieHelp.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { name: "Rahul Sharma", college: "IIT Delhi", role: "SDE Intern @ Amazon", story: "The AI mock interviews and DSA practice were exactly what I needed. I felt completely confident during my actual Amazon interview.", img: "R" },
                  { name: "Priya Singh", college: "NIT Surathkal", role: "Data Analyst @ MuSigma", story: "The Data Science internship program gave me real-world datasets to work on. That practical experience was the key to my placement.", img: "P" },
                  { name: "Amit Kumar", college: "VIT Vellore", role: "Frontend Dev @ Swiggy", story: "TechieHelp's resume builder took my resume from zero to hero. The ATS score feature is a game-changer.", img: "A" }
                ].map((testimonial, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-slate-50 border border-slate-200 p-8 rounded-3xl relative">
                    <div className="text-amber-500 flex gap-1 mb-6">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-5 h-5 fill-current" />)}
                    </div>
                    <p className="text-slate-700 italic mb-8">"{testimonial.story}"</p>
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-950 to-blue-900 flex items-center justify-center text-amber-500 font-bold text-lg shadow-md border border-blue-900">
                        {testimonial.img}
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-950">{testimonial.name}</h4>
                        <p className="text-xs font-semibold text-amber-500 mb-0.5">{testimonial.role}</p>
                        <p className="text-xs text-slate-500">{testimonial.college}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* BRAND NEW PREMIUM FOUNDER SECTION */}
          <section id="founder" className="py-24 md:py-32 relative bg-white overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
              <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="founder-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#founder-grid)" />
              </svg>
            </div>
            <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[#0F4CBA]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-[#F4B400]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
              {/* Section Header */}
              <div className="text-center mb-16 md:mb-24 max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#0F4CBA]/20 bg-[#0F4CBA]/5 text-xs font-extrabold text-[#0F4CBA] uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[#F4B400]" />
                  <span>Meet Our Founder</span>
                </div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-blue-950 tracking-tight leading-tight">
                  Building Opportunities for the <br /> Next Generation of Innovators
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  Empowering students through technology, mentorship, internships, certifications, and innovation.
                </p>
              </div>

              {/* Two-Column Layout */}
              <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">

                {/* LEFT SIDE: IMAGE & FLOATING CARDS */}
                <div className="lg:col-span-5 relative flex flex-col items-center">

                  {/* Founder Image Card Container */}
                  <div className="relative w-full max-w-[320px] aspect-[4/5] rounded-[2.5rem] bg-white border-[10px] border-white shadow-[0_24px_60px_rgba(15,76,186,0.12)] hover:shadow-[0_32px_72px_rgba(15,76,186,0.18)] transition-all duration-500 ease-out hover:scale-[1.02] ring-1 ring-slate-100/50 overflow-hidden z-10 group">
                    <Image
                      src="/Founder.png"
                      alt="Amit Kumar - Founder of TechieHelp"
                      fill
                      className="object-cover object-top filter contrast-[1.02] saturate-[1.05]"
                      sizes="(max-w-7xl) 100vw, 320px"
                      priority
                    />
                    {/* Golden accent bar at the bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0F4CBA] to-[#F4B400]" />
                  </div>

                  {/* FLOATING CARDS - Desktop Only (positioned absolutely around image) */}
                  {[
                    { text: "Top 2% Developer in the World", icon: Trophy, color: "text-[#F4B400]", bg: "bg-amber-50/50", border: "border-amber-100", pos: "top-4 -left-16", delay: 0, dur: 4 },
                    { text: "World Record Holder", icon: Award, color: "text-[#0F4CBA]", bg: "bg-blue-50/50", border: "border-blue-100", pos: "top-[20%] -right-16", delay: 0.5, dur: 4.2 },
                    { text: "Top 1% Mentor at Topmate", icon: Star, color: "text-[#F4B400]", bg: "bg-amber-50/50", border: "border-amber-100", pos: "top-[42%] -left-20", delay: 1.2, dur: 3.8 },
                    { text: "Trained 5000+ Students", icon: GraduationCap, color: "text-[#0F4CBA]", bg: "bg-blue-50/50", border: "border-blue-100", pos: "top-[64%] -right-20", delay: 1.8, dur: 4.5 },
                    { text: "10+ Hackathons Judged", icon: Users, color: "text-[#F4B400]", bg: "bg-amber-50/50", border: "border-amber-100", pos: "bottom-6 -left-12", delay: 2.2, dur: 3.9 },
                    { text: "15+ Hackathons Mentored", icon: Briefcase, color: "text-[#0F4CBA]", bg: "bg-blue-50/50", border: "border-blue-100", pos: "bottom-[-16px] -right-12", delay: 2.7, dur: 4.3 }
                  ].map((card, idx) => {
                    const IconComponent = card.icon;
                    return (
                      <motion.div
                        key={idx}
                        className={`absolute ${card.pos} z-20 hidden lg:flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/90 backdrop-blur-md border ${card.border} shadow-[0_8px_30px_rgba(0,0,0,0.04)] w-max max-w-[220px]`}
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                          duration: card.dur,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: card.delay
                        }}
                      >
                        <div className={`w-8 h-8 rounded-xl ${card.bg} flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className={`w-4 h-4 ${card.color}`} strokeWidth={2} />
                        </div>
                        <span className="text-xs font-bold text-slate-800 leading-tight">{card.text}</span>
                      </motion.div>
                    );
                  })}

                  {/* MOBILE & TABLET ONLY: Achievement Cards Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 w-full max-w-lg lg:hidden">
                    {[
                      { text: "Top 2% Developer", icon: Trophy, color: "text-[#F4B400]", bg: "bg-amber-50/50", border: "border-amber-100" },
                      { text: "World Record Holder", icon: Award, color: "text-[#0F4CBA]", bg: "bg-blue-50/50", border: "border-blue-100" },
                      { text: "Top 1% Mentor", icon: Star, color: "text-[#F4B400]", bg: "bg-amber-50/50", border: "border-amber-100" },
                      { text: "Trained 5000+ Students", icon: GraduationCap, color: "text-[#0F4CBA]", bg: "bg-blue-50/50", border: "border-blue-100" },
                      { text: "10+ Hackathons Judged", icon: Users, color: "text-[#F4B400]", bg: "bg-amber-50/50", border: "border-amber-100" },
                      { text: "15+ Hackathons Mentored", icon: Briefcase, color: "text-[#0F4CBA]", bg: "bg-blue-50/50", border: "border-blue-100" }
                    ].map((card, idx) => {
                      const IconComponent = card.icon;
                      return (
                        <div key={idx} className={`flex items-center gap-2.5 p-3 rounded-2xl bg-white border ${card.border} shadow-sm`}>
                          <div className={`w-8 h-8 rounded-lg ${card.bg} flex items-center justify-center flex-shrink-0`}>
                            <IconComponent className={`w-4 h-4 ${card.color}`} strokeWidth={2} />
                          </div>
                          <span className="text-xs font-bold text-slate-800 leading-tight">{card.text}</span>
                        </div>
                      );
                    })}
                  </div>

                </div>

                {/* RIGHT SIDE: TEXT DETAILS */}
                <div className="lg:col-span-7 space-y-8 text-left">

                  {/* Name & Title */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-3xl md:text-4xl font-extrabold text-blue-950 tracking-tight">Amit Kumar</h3>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-500 uppercase">He / Him</span>
                    </div>
                    <p className="text-lg md:text-xl font-bold text-[#0F4CBA] tracking-wide">Founder & CEO @ TechieHelp & TechieHelp Institute of AI</p>
                  </div>

                  {/* Profile Description */}
                  <div className="space-y-4 text-slate-600 font-normal leading-relaxed text-base md:text-lg">
                    <p>
                      Amit Kumar is the Founder & CEO of TechieHelp & TechieHelp Institute of AI and a passionate technology leader dedicated to empowering students through innovation, mentorship, internships, certifications, and skill development.
                    </p>
                    <p>
                      Recognized among the Top 2% Developers in the World and a World Record Holder, Amit has trained over 5000+ students and actively contributes to the global tech ecosystem through mentorship, hackathons, and open-source communities.
                    </p>
                    <p>
                      He currently serves as State Lead (Bihar) @ OSCI and Project Admin @ GSSOC & SSOC S4 2025 while helping aspiring innovators become industry-ready professionals.
                    </p>
                  </div>


                  {/* Quote Section */}
                  <div className="w-full relative p-6 md:p-8 rounded-[2rem] bg-slate-50 border border-slate-100/60 overflow-hidden shadow-sm">
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 text-slate-200/50 opacity-40 pointer-events-none">
                      <Sparkles className="w-full h-full text-blue-900/10" />
                    </div>
                    <p className="text-slate-700 font-serif italic text-base md:text-lg leading-relaxed relative z-10 pl-6 border-l-4 border-[#F4B400]">
                      "Success is not measured by what you achieve alone, but by how many lives you inspire and opportunities you create."
                    </p>
                    <p className="text-sm font-extrabold text-blue-950 uppercase tracking-widest mt-4 pl-6">— Amit Kumar</p>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 w-full sm:w-auto">
                    <a
                      href="https://www.linkedin.com/in/amit-kumar-founder-of-techiehelp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 rounded-full bg-[#0F4CBA] hover:bg-[#F4B400] text-white font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                    >
                      <Linkedin className="w-5 h-5 text-white" strokeWidth={1.75} />
                      Connect on LinkedIn
                    </a>
                    <a
                      href="https://www.techiehelp.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 rounded-full bg-white hover:bg-slate-50 border-2 border-[#0F4CBA] text-[#0F4CBA] font-bold text-base shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                      View Portfolio
                      <ArrowUpRight className="w-5 h-5" strokeWidth={1.75} />
                    </a>
                  </div>

                </div>
              </div>

              {/* Row 2: Highlights & Contact Info aligned horizontally */}
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-16 pt-12 border-t border-slate-100">

                {/* Left side (under photo): Key Highlights (4-4 paired in 2 columns) */}
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="text-sm font-extrabold text-blue-950 uppercase tracking-widest border-b border-slate-100 pb-2">Key Highlights</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { text: "Top 2% Developer in the World", icon: Trophy },
                      { text: "World Record Holder", icon: Award },
                      { text: "Top 1% Mentor at Topmate", icon: Star },
                      { text: "Trained 5000+ Students", icon: GraduationCap },
                      { text: "10+ Hackathons Judged", icon: Users },
                      { text: "15+ Hackathons Mentored", icon: Briefcase },
                      { text: "State Lead (Bihar) @ OSCI", icon: MapPin },
                      { text: "Project Admin @ GSSOC & SSOC S4 2025", icon: Settings }
                    ].map((item, idx) => {
                      const IconComponent = item.icon;
                      return (
                        <div
                          key={idx}
                          className="group flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-150 shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_32px_rgba(15,76,186,0.06)] hover:border-[#0F4CBA]/20 transition-all duration-300"
                        >
                          <div className="w-8.5 h-8.5 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-center text-[#0F4CBA] group-hover:bg-[#0F4CBA] group-hover:text-[#F4B400] transition-all duration-300 flex-shrink-0">
                            <IconComponent className="w-4 h-4" strokeWidth={1.75} />
                          </div>
                          <span className="text-xs font-bold text-slate-700 leading-tight group-hover:text-blue-950 transition-colors">{item.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right side (under bio): Contact Information */}
                <div className="lg:col-span-5 space-y-4">
                  <h4 className="text-sm font-extrabold text-blue-950 uppercase tracking-widest border-b border-slate-100 pb-2">Contact Information</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                    <a
                      href="mailto:ceo@techiehelp.in"
                      className="group flex items-center gap-3 text-slate-700 hover:text-[#0F4CBA] transition-colors"
                    >
                      <div className="w-9 h-9 rounded-xl bg-blue-50/50 flex items-center justify-center text-[#0F4CBA] group-hover:text-[#F4B400] transition-colors flex-shrink-0">
                        <Mail className="w-4.5 h-4.5" strokeWidth={1.75} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Email</span>
                        <span className="text-xs font-semibold tracking-wide truncate">ceo@techiehelp.in</span>
                      </div>
                    </a>
                    <a
                      href="tel:+917673825079"
                      className="group flex items-center gap-3 text-slate-700 hover:text-[#0F4CBA] transition-colors"
                    >
                      <div className="w-9 h-9 rounded-xl bg-blue-50/50 flex items-center justify-center text-[#0F4CBA] group-hover:text-[#F4B400] transition-colors flex-shrink-0">
                        <Phone className="w-4.5 h-4.5" strokeWidth={1.75} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Phone</span>
                        <span className="text-xs font-semibold tracking-wide">+91 7673825079</span>
                      </div>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/amit-kumar-founder-of-techiehelp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 text-slate-700 hover:text-[#0F4CBA] transition-colors"
                    >
                      <div className="w-9 h-9 rounded-xl bg-blue-50/50 flex items-center justify-center text-[#0F4CBA] group-hover:text-[#F4B400] transition-colors flex-shrink-0">
                        <Linkedin className="w-4.5 h-4.5" strokeWidth={1.75} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">LinkedIn</span>
                        <span className="text-xs font-semibold tracking-wide truncate">amit-kumar</span>
                      </div>
                    </a>
                    <a
                      href="https://github.com/amitkumardemo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 text-slate-700 hover:text-[#0F4CBA] transition-colors"
                    >
                      <div className="w-9 h-9 rounded-xl bg-blue-50/50 flex items-center justify-center text-[#0F4CBA] group-hover:text-[#F4B400] transition-colors flex-shrink-0">
                        <Github className="w-4.5 h-4.5" strokeWidth={1.75} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">GitHub</span>
                        <span className="text-xs font-semibold tracking-wide truncate">amitkumardemo</span>
                      </div>
                    </a>
                  </div>
                </div>

              </div>

              {/* BOTTOM STATS GRID */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-20 pt-16 border-t border-slate-100">
                {[
                  { value: "Top 2%", label: "Developer in the World" },
                  { value: "5000+", label: "Students Trained" },
                  { value: "10+", label: "Hackathons Judged" },
                  { value: "15+", label: "Hackathons Mentored" },
                  { value: "Top 1%", label: "Mentor at Topmate" }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-slate-50/50 hover:bg-white border border-slate-100/60 p-6 rounded-3xl text-center hover:shadow-md hover:border-[#0F4CBA]/20 transition-all duration-300">
                    <h4 className="text-3xl font-black text-blue-950 bg-gradient-to-r from-blue-950 to-blue-800 bg-clip-text text-transparent mb-1.5">{stat.value}</h4>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider leading-relaxed">{stat.label}</p>
                  </div>
                ))}
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
