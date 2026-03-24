"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, BarChart3, BookOpen, Briefcase, CheckCircle2,
  ChevronRight, Code2, FileText, Github, LineChart, 
  Sparkles, Target, Trophy, Users, Zap, Building, LayoutDashboard, MonitorPlay, Presentation, XCircle,
  Sun, Moon, Menu, X
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
    <motion.div ref={ref} variants={fadeIn} className="flex flex-col items-center justify-center p-8 rounded-2xl bg-white dark:bg-[#111] border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 transition-colors shadow-lg">
      <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-gray-500 bg-clip-text text-transparent mb-2">
        {value.toString().includes("+") ? `${counter}+` : counter}
        {value.toString().includes("%") ? "%" : ""}
        {value.toString() === "24/7" ? "24/7" : ""}
      </h3>
      <p className="text-slate-500 dark:text-gray-400 font-medium text-center">{text}</p>
    </motion.div>
  );
};

// Navbar Component
const Navbar = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-md border-slate-200 dark:border-white/10' : 'bg-transparent border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg hidden sm:block">TechieHelp Institute of AI</span>
        </Link>

        {/* Center: Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white transition-colors">Features</Link>
          <Link href="#students" className="text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white transition-colors">For Students</Link>
          <Link href="#tpo" className="text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white transition-colors">For TPO</Link>
          <Link href="/dashboard" className="text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white transition-colors">Dashboard</Link>
        </nav>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-gray-300">
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link href="/sign-in" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white transition-colors">Login</Link>
          <Link href="/sign-up" className="text-sm font-medium px-4 py-2 rounded-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-gray-100 transition-colors">
            Get Started
          </Link>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 text-slate-600 dark:text-gray-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#0A0A0A] border-b border-slate-200 dark:border-white/10 px-4 py-4 space-y-4">
          <Link href="#features" className="block text-sm font-medium text-slate-600 dark:text-gray-300">Features</Link>
          <Link href="#students" className="block text-sm font-medium text-slate-600 dark:text-gray-300">For Students</Link>
          <Link href="#tpo" className="block text-sm font-medium text-slate-600 dark:text-gray-300">For TPO</Link>
          <Link href="/dashboard" className="block text-sm font-medium text-slate-600 dark:text-gray-300">Dashboard</Link>
          <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
            <Link href="/sign-in" className="text-sm font-medium text-slate-600 dark:text-gray-300">Login</Link>
            <div className="flex gap-4">
              <button onClick={toggleTheme} className="p-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-gray-300">
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <Link href="/sign-up" className="text-sm font-medium px-4 py-2 rounded-full bg-slate-900 text-white dark:bg-white dark:text-black">Get Started</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default function Home() {
  const [theme, setTheme] = useState("dark");
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    // Check local storage or system preference on mount
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div className={`${theme} transition-colors duration-300`}>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#0A0A0A] dark:text-white font-sans selection:bg-indigo-500/30 overflow-hidden relative">
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        {/* Global Background Effects */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 dark:opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/40 via-transparent to-transparent blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[600px] opacity-10 dark:opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/40 via-transparent to-transparent blur-[120px]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] dark:bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" style={{ backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.03 }} />
        </div>

        <div className="relative z-10 pt-16">
          {/* 1. HERO SECTION */}
          <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 px-4 md:px-6 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              
              {/* Left Side */}
              <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-2xl">
                <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-200/50 dark:bg-white/5 border border-slate-300 dark:border-white/10 backdrop-blur-sm mb-6">
                  <span className="text-sm font-medium text-slate-700 dark:text-gray-300">🚀 The new standard for placement prep</span>
                </motion.div>
                
                <motion.h1 variants={fadeIn} className="text-5xl md:text-[64px] font-bold tracking-tight mb-6 leading-[1.05]">
                  AI-Powered <br className="hidden md:block"/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Career Intelligence</span> <br className="hidden md:block"/>
                  Platform
                </motion.h1>
                
                <motion.h2 variants={fadeIn} className="text-xl md:text-2xl font-medium text-slate-800 dark:text-gray-200 mb-4 max-w-xl">
                  Track your skills, improve performance, and become placement-ready with real data.
                </motion.h2>

                <motion.p variants={fadeIn} className="text-lg text-slate-600 dark:text-gray-400 mb-6 leading-relaxed max-w-xl">
                  The ultimate AI infrastructure for students and colleges to prepare and make data-driven placement decisions.
                </motion.p>
                
                <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Link href="/dashboard" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-slate-900 text-white dark:bg-white dark:text-black font-semibold hover:bg-slate-800 dark:hover:bg-gray-100 transition-all shadow-xl dark:shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]">
                    Start Free with AI
                  </Link>
                  <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white dark:bg-[#111] text-slate-900 dark:text-white font-semibold border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-all backdrop-blur-sm shadow-sm">
                    <MonitorPlay className="w-4 h-4 mr-2" />
                    Watch Demo
                  </Link>
                </motion.div>

                <motion.div variants={fadeIn} className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-slate-500 dark:text-gray-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    No credit card required • Free access available
                  </p>
                  <p className="text-sm font-bold text-slate-700 dark:text-gray-300">
                    Trusted by 5000+ students & institutions
                  </p>
                </motion.div>
              </motion.div>
              
              {/* Right Side: Product Image with Floating Cards */}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="relative flex justify-center items-center w-full aspect-square md:aspect-auto md:h-[600px] mt-12 lg:mt-0">
                {/* Underglow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/30 to-purple-500/30 blur-[80px] rounded-full" />
                
                <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="relative w-full max-w-lg z-10">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/50 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-3xl">
                    <Image
                      src="/product.png"
                      alt="TechieHelp Product Dashboard"
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover rounded-2xl"
                      fallback={<div className="w-full h-64 bg-slate-200 dark:bg-[#111] animate-pulse rounded-2xl" />}
                    />
                  </div>
                  
                  {/* Floating Mini Card 1: Resume Score */}
                  <motion.div 
                    animate={{ y: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -top-6 -left-8 md:-left-12 p-4 rounded-xl shadow-xl bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 flex items-center gap-4 backdrop-blur-xl"
                  >
                    <div className="relative w-12 h-12 rounded-full flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90 absolute">
                        <circle cx="24" cy="24" r="20" className="stroke-slate-100 dark:stroke-white/10" strokeWidth="4" fill="none" />
                        <circle cx="24" cy="24" r="20" className="stroke-green-500" strokeWidth="4" fill="none" strokeDasharray="125" strokeDashoffset="18" strokeLinecap="round" />
                      </svg>
                      <span className="text-xs font-bold text-slate-800 dark:text-white">85%</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-white">Resume Score</h4>
                      <p className="text-xs text-green-500 font-medium">Excellent</p>
                    </div>
                  </motion.div>

                  {/* Floating Mini Card 2: Interview Feedback */}
                  <motion.div 
                    animate={{ y: [0, 15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute -bottom-8 -right-4 md:-right-8 p-4 rounded-xl shadow-xl bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 flex items-start gap-3 backdrop-blur-xl max-w-[200px]"
                  >
                     <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center shrink-0">
                       <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                     </div>
                     <div>
                       <h4 className="text-sm font-bold text-slate-800 dark:text-white">AI Feedback</h4>
                       <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 line-clamp-2">Good technical depth. Try to improve eye contact.</p>
                     </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* 2. PRODUCT DEMO SECTION */}
          <section id="features" className="py-24 relative border-t border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-[#050505]/50">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">See How It Works</h2>
                <p className="text-slate-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">Four powerful tools unified into one seamless experience.</p>
              </motion.div>
              
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "Resume Builder", icon: FileText, desc: "ATS-optimized templates powered by AI." },
                  { title: "Mock Interview", icon: Presentation, desc: "Real-time AI voice interviews & feedback." },
                  { title: "Dashboard", icon: LayoutDashboard, desc: "Track your readiness score & progress." },
                  { title: "TPO Analytics", icon: BarChart3, desc: "Institutional oversight & student ranking." }
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeIn} whileHover={{ y: -5 }} className="group p-6 rounded-2xl bg-white dark:bg-[#111] border border-slate-200 dark:border-white/5 hover:border-indigo-500/30 transition-all cursor-pointer shadow-sm hover:shadow-md">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-6 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 transition-colors">
                      <item.icon className="w-6 h-6 text-slate-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">{item.title}</h3>
                    <p className="text-slate-500 dark:text-gray-400 text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* 3. PROBLEM -> SOLUTION SECTION */}
          <section className="py-24 relative overflow-hidden bg-white dark:bg-transparent">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">The Old Way</h2>
                    <p className="text-slate-500 dark:text-gray-400 text-lg">Traditional placement preparation is broken and leaves students guessing.</p>
                  </div>
                  <div className="space-y-4">
                    {[
                      "Students prepare blindly without data",
                      "Weak, unoptimized resumes failing ATS",
                      "Zero feedback before real interviews"
                    ].map((text, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-red-50 dark:bg-red-950/10 border border-red-100 dark:border-red-500/10">
                        <XCircle className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0" />
                        <span className="text-slate-700 dark:text-gray-300">{text}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative p-8 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-100 dark:border-indigo-500/20">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />
                  <div className="space-y-8 relative z-10">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">The Modern Way</h2>
                      <p className="text-slate-500 dark:text-gray-400 text-lg">Data-driven preparation with instant AI feedback.</p>
                    </div>
                    <div className="space-y-4">
                      {[
                        { text: "AI Resume Builder & Scorer", icon: FileText },
                        { text: "AI Mock Interviews (Tech & HR)", icon: Code2 },
                        { text: "Predictive Skill Analytics Dashboard", icon: LineChart }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm hover:bg-slate-50 dark:hover:bg-white/10 transition-colors">
                          <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                          <span className="text-slate-900 dark:text-white font-medium">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* 4. CORE FEATURES GRID */}
          <section id="features-grid" className="py-24 relative bg-slate-50/50 dark:bg-[#050505]/50 border-t border-slate-200 dark:border-white/5">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Everything you need to succeed</h2>
                <p className="text-slate-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">A complete toolkit designed to make you top-tier placement material.</p>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "AI Resume Builder", icon: FileText, desc: "Create ATS-friendly resumes instantly." },
                  { title: "AI Mock Interviews", icon: Presentation, desc: "Practice with AI and get instant feedback." },
                  { title: "Coding Practice", icon: Code2, desc: "Solve DSA questions with an AI mentor." },
                  { title: "Skill Dashboard", icon: BarChart3, desc: "Visualize your strengths and weak spots." },
                  { title: "GitHub Tracking", icon: Github, desc: "Sync open source contributions automatically." },
                  { title: "Readiness Score", icon: Target, desc: "Know exactly when you are ready to apply." },
                  { title: "TPO Dashboard", icon: Building, desc: "College-wide visibility and admin controls." }
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeIn} whileHover={{ y: -5, scale: 1.02 }} className="p-6 rounded-2xl bg-white dark:bg-[#111] border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 transition-all shadow-sm hover:shadow-md group">
                    <item.icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{item.title}</h3>
                    <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* 5. HOW IT WORKS (STEP FLOW) */}
          <section id="students" className="py-24 relative overflow-hidden bg-white dark:bg-transparent">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">The Journey to Placement</h2>
              </div>
              
              <div className="relative py-10">
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-white/5 -translate-y-1/2 rounded-full" />
                <div className="hidden md:block absolute top-1/2 left-0 w-2/3 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 -translate-y-1/2 z-0 rounded-full" />
                
                <div className="grid md:grid-cols-5 gap-8 relative z-10">
                  {[
                    { title: "Build Resume", icon: FileText },
                    { title: "Practice Interviews", icon: Presentation },
                    { title: "Improve Skills", icon: Zap },
                    { title: "Track Performance", icon: LineChart },
                    { title: "Get Placed", icon: Trophy }
                  ].map((step, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center text-center relative">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 border-4 border-white dark:border-[#0A0A0A] bg-slate-50 dark:bg-[#111] ${i < 4 ? 'text-indigo-600 dark:text-indigo-400 ring-2 ring-indigo-500/20 shadow-lg' : 'text-slate-400 dark:text-gray-500 border-slate-200 dark:border-white/10'}`}>
                        <step.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-sm font-bold tracking-wider uppercase text-slate-700 dark:text-gray-200">{step.title}</h3>
                      <div className="mt-2 text-xs font-bold text-slate-400 dark:text-gray-500">STEP 0{i+1}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>


          {/* 7. TPO SECTION */}
          <section id="tpo" className="py-24 relative overflow-hidden bg-white dark:bg-transparent">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                  <h2 className="text-sm font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-4">For Colleges & TPOs</h2>
                  <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-[1.1]">Institutional Placement Intelligence</h3>
                  <p className="text-slate-500 dark:text-gray-400 text-lg mb-8 leading-relaxed">
                    Empower your placement cell with data-driven insights. Track, manage, and boost student readiness across your entire campus.
                  </p>
                  <div className="space-y-4">
                    {[
                      { title: "Track student skills", icon: Target },
                      { title: "View GitHub & coding data", icon: Code2 },
                      { title: "Rank students automatically", icon: Trophy },
                      { title: "Make data-driven decisions", icon: BarChart3 }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                          <item.icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <span className="text-slate-700 dark:text-gray-300 font-medium">{item.title}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative h-[400px] w-full bg-slate-50 dark:bg-[#111] rounded-3xl border border-slate-200 dark:border-white/10 p-6 flex items-center justify-center shadow-xl">
                  <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-indigo-50 dark:from-indigo-500/10 to-transparent" />
                   <div className="w-full h-full border border-slate-200 dark:border-white/5 rounded-xl bg-white dark:bg-[#0A0A0A] p-4 flex flex-col gap-2 shadow-sm relative z-10">
                      {[1,2,3,4,5].map((i) => (
                          <div key={i} className="w-full h-12 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-transparent rounded-md flex items-center px-4 gap-4">
                              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-white/10"></div>
                              <div className="w-32 h-3 bg-slate-200 dark:bg-white/20 rounded-full"></div>
                              <div className={`ml-auto w-16 h-3 rounded-full ${i <= 2 ? 'bg-green-400 dark:bg-green-500/50' : i === 3 ? 'bg-yellow-400 dark:bg-yellow-500/50' : 'bg-slate-200 dark:bg-white/10'}`}></div>
                          </div>
                      ))}
                   </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* 8. SOCIAL PROOF / STATS */}
          <section className="py-24 relative border-y border-slate-200 dark:border-white/5 bg-slate-50/80 dark:bg-[#050505]/80">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                <AnimatedCounter value="5000+" text="Students" />
                <AnimatedCounter value="85%" text="Resume Improvement" />
                <AnimatedCounter value="200+" text="Institutions" />
                <AnimatedCounter value="24/7" text="AI Support" />
              </div>
            </div>
          </section>

          {/* 9. FINAL CTA */}
          <section className="py-32 relative text-center bg-white dark:bg-transparent">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-indigo-500/10 dark:bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
                Start Your AI-Powered <br className="hidden md:block"/> Career Journey
              </motion.h2>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/dashboard" className="px-8 py-4 rounded-full bg-slate-900 text-white dark:bg-white dark:text-black font-semibold hover:bg-slate-800 dark:hover:bg-gray-100 transition-all text-lg shadow-xl dark:shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]">
                  Start Preparing
                </Link>
                <Link href="/contact" className="px-8 py-4 rounded-full bg-white dark:bg-[#111] text-slate-900 dark:text-white font-semibold border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-lg shadow-sm">
                  Request Demo
                </Link>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
