"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { 
  Sparkles, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Award, 
  Cpu, Code, Smartphone, Database, Lock, Cloud, Palette, TrendingUp,
  Target, Rocket, BookOpen, Users, Milestone, GraduationCap, Building
} from "lucide-react";

// Counter Component for Stats
const StatCounter = ({ value, label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value.toString().replace(/[^0-9]/g, ""));
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center p-6 bg-white/70 backdrop-blur-md border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-4xl md:text-5xl font-black text-blue-950 mb-1.5 bg-gradient-to-r from-blue-950 to-blue-800 bg-clip-text text-transparent">
        {value.toString().includes("+") ? `${count}+` : value.toString().includes("%") ? `${count}%` : count}
      </h3>
      <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
    </div>
  );
};

export default function AboutClient() {
  // Force light mode on mount
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden pt-24 pb-0 font-sans selection:bg-cyan-150 transition-colors duration-300">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-24 md:py-32 px-6 max-w-7xl mx-auto overflow-hidden">
        {/* Background Gradients & Grids */}
        <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-[0.08] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600 via-amber-200 to-transparent blur-[120px] pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          
          {/* Left Column: Text & Actions */}
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={containerVariants} 
            className="lg:col-span-7 space-y-8 text-left"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-cyan-200 bg-white shadow-sm text-xs font-bold text-cyan-800">
              <Sparkles className="w-4.5 h-4.5 text-amber-500 animate-pulse" />
              <span>Building AI Leaders</span>
            </motion.div>

            {/* Title */}
            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-blue-950 tracking-tight leading-[1.05]">
              Empowering Students Through <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-950 via-blue-800 to-amber-500">
                Skills, Experience & Opportunities
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={itemVariants} className="text-base md:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
              TechieHelp Institute of AI is an industry-focused learning platform dedicated to helping students build in-demand skills, gain real-world experience through internships, and earn professional certifications to accelerate their careers.
            </motion.p>

            {/* Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link href="/sign-up">
                <button className="px-8 py-4 rounded-full bg-blue-950 hover:bg-blue-900 text-white font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group">
                  Get Started
                  <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/programs">
                <button className="px-8 py-4 rounded-full bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-blue-950 text-blue-950 font-bold text-base shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all">
                  Explore Programs
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Showcase Image (coveri.png) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative w-full"
          >
            {/* Backdrop glow behind image */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-amber-100 rounded-3xl blur-2xl opacity-50 -z-10 animate-pulse" />
            
            {/* Image Container with elegant borders */}
            <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden border-[8px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:scale-[1.01] transition-transform duration-500 ease-out bg-white ring-1 ring-slate-200">
              <Image 
                src="/coveri.png" 
                alt="TechieHelp Showcase" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover" 
                priority
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. OUR STORY SECTION */}
      <section className="py-24 bg-white border-y border-slate-200/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Image / Illustration */}
            <div className="lg:col-span-6 relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-amber-100 rounded-3xl blur-2xl opacity-40 -z-10" />
              <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-2xl border-[8px] border-slate-50/50 bg-slate-100">
                <Image 
                  src="/about.webp" 
                  alt="Our Story Illustration" 
                  fill 
                  className="object-cover hover:scale-102 transition-transform duration-700" 
                  priority
                />
              </div>
            </div>

            {/* Right: Content */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-1 text-xs font-bold text-amber-500 uppercase tracking-widest">
                <span>The Journey</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-blue-950 tracking-tight leading-tight">
                Our Story
              </h2>
              <div className="h-1.5 w-16 bg-amber-500 rounded-full" />
              <p className="text-slate-600 text-lg leading-relaxed font-normal">
                Founded with a vision to bridge the gap between academic learning and industry requirements, TechieHelp Institute of AI empowers students with practical skills, internships, certifications, and career guidance. Our mission is to create industry-ready professionals and future innovators.
              </p>
              <p className="text-slate-600 text-base leading-relaxed font-normal">
                We believe that learning shouldn't be confined to textbooks. By working on live project infrastructures and receiving personalized guidance, our students gain the experience necessary to compete at a global level.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="group p-8 rounded-3xl bg-white/70 backdrop-blur-md border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all text-left space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-950 font-bold shadow-sm">
              <Target className="w-6 h-6 text-blue-900 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-2xl font-bold text-blue-950 flex items-center gap-2">
              🎯 Mission
            </h3>
            <p className="text-slate-600 leading-relaxed text-base">
              To provide quality training, real-world internships, and career opportunities that help students become industry-ready professionals.
            </p>
          </div>

          {/* Vision Card */}
          <div className="group p-8 rounded-3xl bg-white/70 backdrop-blur-md border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all text-left space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-950 font-bold shadow-sm">
              <Rocket className="w-6 h-6 text-amber-600 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-2xl font-bold text-blue-950 flex items-center gap-2">
              🚀 Vision
            </h3>
            <p className="text-slate-600 leading-relaxed text-base">
              To become one of India's leading AI and technology learning platforms, empowering students through innovation, skills, and practical experience.
            </p>
          </div>
        </div>
      </section>

      {/* 4. WHAT WE OFFER */}
      <section className="py-24 bg-white border-y border-slate-200/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest">Our Verticals</span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-950 tracking-tight">What We Offer</h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Accelerate your engineering journey with our targeted technology training programs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Cpu, label: "Artificial Intelligence & Machine Learning", desc: "Deep Learning, Neural Networks, NLP, and Predictive Analytics." },
              { icon: Code, label: "Web Development", desc: "NextJS, React, NodeJS, databases, and responsive architectural designs." },
              { icon: Smartphone, label: "App Development", desc: "Native & Cross-platform apps using Flutter, React Native, and Swift." },
              { icon: Database, label: "Data Science", desc: "Statistical models, data mining, Python scripts, and visualization dashboards." },
              { icon: Lock, label: "Cyber Security", desc: "Ethical hacking, network defense mechanisms, and compliance protocols." },
              { icon: Cloud, label: "Cloud Computing", desc: "AWS, Azure architecture, serverless pipelines, and containerization." },
              { icon: Palette, label: "UI/UX Design", desc: "Figma wireframing, heuristic evaluations, and interactive layouts." },
              { icon: TrendingUp, label: "Digital Marketing", desc: "SEO methodologies, growth hacking, and conversion funnel optimizations." }
            ].map((offer, i) => (
              <div key={i} className="group p-6 rounded-3xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all text-left flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-blue-950 shadow-sm group-hover:bg-blue-950 group-hover:text-white transition-colors duration-300">
                    <offer.icon className="w-5.5 h-5.5" />
                  </div>
                  <h3 className="text-lg font-bold text-blue-950 leading-snug group-hover:text-blue-900 transition-colors">
                    {offer.label}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-normal">
                    {offer.desc}
                  </p>
                </div>
                <div className="pt-4 flex items-center text-xs font-semibold text-cyan-600 opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0 mt-4">
                  <span>Learn More</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE TECHIEHELP */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest font-sans">Why Partner with Us</span>
          <h2 className="text-3xl md:text-5xl font-black text-blue-950 tracking-tight">Why Choose TechieHelp</h2>
          <p className="text-slate-600 text-base">
            We deliver absolute career value through structural design and industry expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Industry-Focused Training", desc: "Learn directly from curated modules built to mirror top engineering requirements." },
            { title: "Real-World Internships", desc: "Apply knowledge directly on live workspace projects with actual metrics." },
            { title: "Professional Certifications", desc: "Earn verified credentials which are trusted by leading companies in India." },
            { title: "Live Projects", desc: "Work in active production environments containing real-time data pipelines." },
            { title: "Career Guidance", desc: "1-on-1 mentorship programs directly answering your technical query." },
            { title: "Placement Preparation", desc: "Technical interview feedback, resume building, and placement tracking." }
          ].map((item, i) => (
            <div key={i} className="group p-8 rounded-3xl bg-white border border-slate-100 hover:border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all text-left space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5.5 h-5.5 text-cyan-600 flex-shrink-0" />
                <h3 className="text-lg font-bold text-blue-950">{item.title}</h3>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed font-normal">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. OUR IMPACT */}
      <section className="py-20 bg-white border-y border-slate-200/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCounter value="5000+" label="Students" />
            <StatCounter value="100+" label="Projects" />
            <StatCounter value="200+" label="Institutions" />
            <StatCounter value="95%" label="Completion Rate" />
          </div>
        </div>
      </section>

      {/* 7. LEARNING JOURNEY (TIMELINE) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20 max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest">The Road Ahead</span>
          <h2 className="text-3xl md:text-5xl font-black text-blue-950 tracking-tight">Learning Journey</h2>
          <p className="text-slate-600 text-base">
            Our step-by-step layout turns beginner developers into qualified engineering leads.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Connecting Line (mobile/tablet) */}
          <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-900/10 via-cyan-500/30 to-amber-400/10 transform -translate-x-1/2 z-0" />

          <div className="space-y-16 relative z-10">
            {[
              { step: "Step 1", title: "Learn Skills", desc: "Begin your education with industry-focused training tracks taught by experts.", bg: "bg-blue-50 text-blue-900 border-blue-200" },
              { step: "Step 2", title: "Build Projects", desc: "Build functional application templates using actual dev dependencies.", bg: "bg-cyan-50 text-cyan-900 border-cyan-200" },
              { step: "Step 3", title: "Gain Experience", desc: "Work on live enterprise-grade industry projects through our internship pipelines.", bg: "bg-amber-50 text-amber-900 border-amber-200" },
              { step: "Step 4", title: "Earn Certifications", desc: "Recieve verified digital certificates and letters of recommendation (LoR).", bg: "bg-emerald-50 text-emerald-900 border-emerald-200" },
              { step: "Step 5", title: "Launch Career", desc: "Access direct placement tracking tools and apply to premium corporate job listings.", bg: "bg-indigo-50 text-indigo-900 border-indigo-200" }
            ].map((step, i) => (
              <div key={i} className={`flex flex-col md:flex-row items-stretch ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                {/* Left/Right Card spacer */}
                <div className="hidden md:block w-1/2" />
                
                {/* Center Timeline Pin */}
                <div className="flex items-start justify-start md:justify-center px-4 md:px-8 relative">
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center font-bold text-sm text-slate-700 shadow-md relative z-10">
                    {i + 1}
                  </div>
                </div>

                {/* Content Card */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0">
                  <div className="p-6 rounded-3xl bg-white border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-lg transition-all text-left space-y-2 relative">
                    <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest">{step.step}</span>
                    <h3 className="text-xl font-bold text-blue-950">{step.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-normal">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. OUR VALUES */}
      <section className="py-24 bg-white border-y border-slate-200/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Our Principles</span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-950 tracking-tight">Our Values</h2>
            <p className="text-slate-600 text-base">
              The foundational codes guiding our educational operations.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
            {[
              { label: "Innovation", bg: "bg-blue-50/50 border-blue-100 text-blue-900" },
              { label: "Excellence", bg: "bg-cyan-50/50 border-cyan-100 text-cyan-900" },
              { label: "Integrity", bg: "bg-amber-50/50 border-amber-100 text-amber-900" },
              { label: "Community", bg: "bg-emerald-50/50 border-emerald-100 text-emerald-900" },
              { label: "Continuous Learning", bg: "bg-indigo-50/50 border-indigo-100 text-indigo-900" },
              { label: "Growth", bg: "bg-purple-50/50 border-purple-100 text-purple-900" }
            ].map((val, i) => (
              <div key={i} className={`p-6 rounded-2xl border text-center font-bold text-base shadow-sm hover:shadow-md transition-shadow ${val.bg}`}>
                {val.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FOR STUDENTS & COLLEGES */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Students Column */}
          <div className="group p-8 rounded-3xl bg-gradient-to-tr from-white via-white to-blue-50/20 border border-slate-200/60 shadow-sm hover:shadow-xl transition-all text-left space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-950 font-bold shadow-sm">
              <GraduationCap className="w-6 h-6 text-blue-900" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-950">For Students</h3>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                Empower your software engineering skill sets and build project experiences.
              </p>
            </div>
            
            <div className="space-y-3 pt-2">
              {["Build Skills", "Gain Experience", "Become Placement Ready"].map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-4.5 h-4.5 text-cyan-600" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <Link href="/sign-up" className="inline-flex items-center text-sm font-bold text-blue-900 hover:text-blue-950 pt-2 gap-1 group/btn">
              <span>Sign Up as Student</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Colleges Column */}
          <div className="group p-8 rounded-3xl bg-gradient-to-tr from-white via-white to-amber-50/20 border border-slate-200/60 shadow-sm hover:shadow-xl transition-all text-left space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-950 font-bold shadow-sm">
              <Building className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-950">For Colleges & TPOs</h3>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                Introduce enterprise-level placement tools and tracking to your campus.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {["Workshops", "Internship Programs", "Industry Exposure", "Partnerships"].map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-4.5 h-4.5 text-amber-500" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <Link href="/contact" className="inline-flex items-center text-sm font-bold text-amber-600 hover:text-amber-700 pt-2 gap-1 group/btn">
              <span>Request Partnership</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      {/* 10. FINAL CTA SECTION */}
      <section className="py-24 bg-white border-t border-slate-200/50 relative">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-50/60 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-blue-950">
            Start Your AI-Powered Career Journey Today
          </h2>
          <p className="text-slate-600 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Join thousands of students building their future with TechieHelp Institute of AI.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/sign-up">
              <button className="px-8 py-4 rounded-full bg-blue-950 hover:bg-blue-900 text-white font-bold text-base shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all">
                Join Now
              </button>
            </Link>
            <Link href="/programs">
              <button className="px-8 py-4 rounded-full bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-blue-950 text-blue-950 font-bold text-base shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all">
                Explore Programs
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 11. FOOTER MESSAGE */}
      <div className="py-12 text-center space-y-1.5 border-t border-slate-100 bg-slate-50/50">
        <p className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
          Building AI Leaders
        </p>
        <p className="text-[10px] text-slate-400 tracking-widest font-semibold">
          Training • Internships • Certifications
        </p>
      </div>

    </div>
  );
}
