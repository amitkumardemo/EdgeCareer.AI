"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { 
  Sparkles, Award, Star, Users, Briefcase, GraduationCap, Trophy, 
  MapPin, Settings, Mail, Phone, BookOpen, Send, ChevronDown, 
  ArrowRight, ArrowUpRight, CheckCircle2, ShieldCheck, Rocket, 
  Calendar, HelpCircle, Network, Cpu, Presentation, Clock, 
  Lightbulb, Zap, MessagesSquare, Laptop, ShieldAlert, Cloud, Code, UserCheck,
  Building, TrendingUp, Smartphone, PenTool, GitBranch, ArrowRightLeft, Target,
  Compass, Handshake
} from "lucide-react";
import { toast } from "sonner";

// Animated counter component for Stats
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
    <div ref={ref} className="text-center p-8 bg-slate-50/70 backdrop-blur-md border border-slate-100 rounded-3xl shadow-sm hover:shadow-md hover:border-[#0F4CBA]/20 transition-all duration-300">
      <h3 className="text-4xl md:text-5xl font-black text-blue-950 mb-2 bg-gradient-to-r from-blue-950 to-blue-800 bg-clip-text text-transparent">
        {value.toString().includes("%") ? `${count}%` : value.toString().includes("+") ? `${count}+` : count}
      </h3>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</p>
    </div>
  );
};

export default function SkillDevelopmentClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    course: "",
    currentYear: "",
    interestedDomain: "",
    message: ""
  });

  const [formErrors, setFormErrors] = useState({});

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Full Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email Address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone Number is required";
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phone.replace(/\s/g, ""))) {
      errors.phone = "Please enter a valid phone number";
    }

    if (!formData.college.trim()) errors.college = "College / Institution is required";
    if (!formData.course.trim()) errors.course = "Course / Branch is required";
    if (!formData.currentYear.trim()) errors.currentYear = "Current Year is required";
    if (!formData.interestedDomain) errors.interestedDomain = "Please select an interested domain";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Enrollment request submitted successfully! We will coordinate your induction track.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        college: "",
        course: "",
        currentYear: "",
        interestedDomain: "",
        message: ""
      });
    }, 1500);
  };

  // Force light mode on this page
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  const domains = [
    { name: "Artificial Intelligence & ML", icon: Cpu },
    { name: "Generative AI Mastery", icon: Sparkles },
    { name: "Data Science & Analytics", icon: Laptop },
    { name: "Web Development (MERN)", icon: Code },
    { name: "App Development", icon: Smartphone },
    { name: "Cyber Security & Hacking", icon: ShieldAlert },
    { name: "Cloud Computing & DevOps", icon: Cloud },
    { name: "UI/UX Product Design", icon: PenTool },
    { name: "Digital Marketing", icon: Network },
    { name: "Programming Fundamentals", icon: Code },
    { name: "DSA & Problem Solving", icon: Target },
    { name: "Git & GitHub Workflows", icon: GitBranch }
  ];

  const features = [
    { title: "Live Sessions", icon: Presentation, desc: "Interactive online and offline classes led by software developers." },
    { title: "Industry Mentors", icon: Users, desc: "Direct code guidance and career insights from professionals at tier-1 firms." },
    { title: "Hands-On Projects", icon: Cpu, desc: "Work on live application projects instead of pure textbook theories." },
    { title: "Syllabus Assignments", icon: BookOpen, desc: "Weekly developer sprints that build actual repository work." },
    { title: "Assessments", icon: ShieldCheck, desc: "Periodic testing checks mapping industrial candidate standards." },
    { title: "Certificates", icon: Award, desc: "Verifiable credentials showcasing skills to recruiting panels." },
    { title: "Career Guidance", icon: Compass, desc: "Detailed roadmap checks matching GenAI, Cloud, and engineering fields." },
    { title: "Resume Building", icon: Trophy, desc: "Workshops to optimize ATS ratings and highlight technical benchmarks." },
    { title: "Interview Prep", icon: UserCheck, desc: "Structured mock interviews covering algorithmic and design questions." },
    { title: "Internship Access", icon: Briefcase, desc: "Direct priority channels for in-house developer and corporate roles." },
    { title: "Placement Readiness", icon: Target, desc: "Dedicated support to refine portfolios, LinkedIn profiles, and networks." },
    { title: "Community Support", icon: Network, desc: "Lifetime access to national coding chapters and placement updates." }
  ];

  const specialPrograms = [
    { title: "AI Career Accelerator Program", desc: "Master ML pipeline design, NLP, computer vision, and deploy active AI products." },
    { title: "Full Stack Development Program", desc: "End-to-end training covering React, Next.js, Node, databases, and AWS deployment." },
    { title: "Data Science Career Track", desc: "Focus on statistical modeling, Big Data pipelines, predictive analysis, and Power BI." },
    { title: "Cyber Security Professional Program", desc: "Ethical hacking, OWASP vulnerability patching, network security, and cloud defense." },
    { title: "Cloud Computing Essentials", desc: "Build secure architecture across AWS, Azure, or GCP with Docker & Kubernetes." },
    { title: "Placement Preparation Program", desc: "Intensive training for resume audits, LinkedIn profiles, coding tests, and mock rounds." },
    { title: "GitHub & Open Source Program", desc: "Learn community building, repository coordination, Git pipelines, and GSoC readiness." },
    { title: "Generative AI Mastery Program", desc: "Deep dive into Prompt Design, LangChain, vector databases, RAG, and AI agent automation." }
  ];

  const faqs = [
    {
      q: "Do participants receive certificates?",
      a: "Yes. Every student who completes a skill development program receives an official, verifiable certificate of completion from TechieHelp Institute of AI."
    },
    {
      q: "Are the programs project-based?",
      a: "Absolutely. We follow a strict hands-on approach. Students build mini-projects during training and complete a comprehensive Capstone project before certification."
    },
    {
      q: "Can colleges request customized training?",
      a: "Yes. We work closely with Training & Placement Officers (TPOs) and HODs to tailor program syllabi, durations, and session modes to match the college's calendar."
    },
    {
      q: "Are internships included?",
      a: "Yes. Top-performing students and program graduates are fast-tracked into real project internship tracks with mentorship from senior developers."
    },
    {
      q: "Is placement support available?",
      a: "Yes, we offer placement assistance including resume building, LinkedIn optimization, mock interviews, and direct networking opportunities with partner firms."
    },
    {
      q: "Can beginners join?",
      a: "Yes, our curriculum structures are designed progressively. We start from foundational basics before introducing intermediate and advanced professional frameworks."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased pt-24 pb-12 overflow-x-hidden selection:bg-[#0F4CBA] selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-20 lg:py-28 px-6 overflow-hidden">
        {/* Background visual components */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none -z-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="skills-grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#skills-grid-pattern)" />
          </svg>
        </div>
        <div className="absolute top-1/3 left-1/4 w-[750px] h-[550px] bg-[#0F4CBA]/4 blur-[130px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-10 w-[480px] h-[480px] bg-[#F4B400]/3 blur-[110px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left side: Heading */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-blue-200 bg-blue-50/50 text-xs font-bold text-[#0F4CBA] uppercase tracking-wider shadow-sm">
                <Sparkles className="w-4 h-4 text-[#F4B400] animate-pulse" />
                <span>Skill Development Programs</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-blue-955 tracking-tight leading-[1.05]">
                Transform Students <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-950 via-[#0F4CBA] to-[#F4B400]">
                  Into Industry-Ready
                </span> <br />
                Professionals
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
                TechieHelp Institute of AI offers industry-focused skill development programs designed to bridge the gap between academics and real-world careers through practical learning, projects, internships, and certifications.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button 
                  onClick={() => scrollToSection("special-programs")}
                  className="px-8 py-4 rounded-full bg-[#0F4CBA] hover:bg-blue-900 text-white font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                >
                  Explore Programs
                  <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => scrollToSection("enroll-form")}
                  className="px-8 py-4 rounded-full bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-[#0F4CBA]/30 text-slate-700 font-bold text-base shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  Request Collaboration
                  <ArrowUpRight className="w-4.5 h-4.5 text-[#0F4CBA]" />
                </button>
              </div>
            </div>

            {/* Right side: Illustration */}
            <div className="lg:col-span-5 relative w-full flex items-center justify-center">
              <div className="relative w-full max-w-[460px] aspect-square rounded-[3rem] bg-white border border-slate-100 shadow-[0_24px_60px_rgba(15,76,186,0.06)] p-6 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/10 via-white to-amber-50/5 pointer-events-none" />
                <Image 
                  src="/skill_development.png" 
                  alt="Skill Development Program Illustration"
                  width={420}
                  height={420}
                  className="w-full h-auto object-contain hover:scale-[1.03] transition-transform duration-700 ease-out"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. WHY SKILL DEVELOPMENT MATTERS */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-20 max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#0F4CBA] uppercase tracking-widest">Bridging The Gap</span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-955 tracking-tight">Why Skill Development Matters</h2>
            <p className="text-slate-600 text-base max-w-xl mx-auto leading-relaxed">
              Academic curriculums teach concepts. We focus on developing the actual skills recruiters search for.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Industry-Relevant Skills", icon: Cpu, desc: "Master frameworks and libraries currently used inside modern tech firms." },
              { title: "Hands-On Learning", icon: Laptop, desc: "Step out of static slides and complete real developer workspace tasks." },
              { title: "Project-Based Training", icon: Trophy, desc: "Syllabuses structured around building portfolio-ready applications." },
              { title: "Professional Certifications", icon: ShieldCheck, desc: "Verifiable student credentials that improve screening priority." },
              { title: "Career Readiness", icon: Briefcase, desc: "In-depth preparation covering soft skills, Git logs, and testing checks." },
              { title: "Internship Opportunities", icon: GraduationCap, desc: "Access project internships that translate directly to job experience." }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="group p-8 rounded-3xl bg-white border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-[#0F4CBA]/20 hover:-translate-y-0.5 transition-all duration-300 text-left flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0F4CBA] group-hover:bg-[#0F4CBA] group-hover:text-[#F4B400] transition-all duration-300 shadow-xs">
                      <Icon className="w-5.5 h-5.5" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-lg font-bold text-blue-950 transition-colors group-hover:text-[#0F4CBA]">{item.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. OUR SKILL DEVELOPMENT DOMAINS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#F4B400] uppercase tracking-widest">Training Domains</span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-955 tracking-tight">Our Skill Development Domains</h2>
            <p className="text-slate-500 text-sm">We provide accredited coursework across key technical fields.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
            {domains.map((dom, idx) => {
              const Icon = dom.icon;
              return (
                <div key={idx} className="group p-5 rounded-2xl border border-slate-200/50 hover:border-[#0F4CBA]/30 hover:shadow-md transition-all flex items-center gap-4.5 bg-slate-50/50 hover:bg-white">
                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-150 text-[#0F4CBA] group-hover:bg-[#0F4CBA] group-hover:text-[#F4B400] transition-colors flex-shrink-0 flex items-center justify-center shadow-2xs">
                    <Icon className="w-4.5 h-4.5" strokeWidth={2} />
                  </div>
                  <span className="text-xs font-bold text-slate-700 group-hover:text-[#0F4CBA] transition-colors leading-tight">{dom.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PROGRAM FEATURES */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-20 max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#0F4CBA] uppercase tracking-widest">Key Pillars</span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-955 tracking-tight">Program Features</h2>
            <p className="text-slate-600 text-base max-w-xl mx-auto">
              Every training cohort is integrated with developer feedback checkpoints.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200/40 shadow-xs text-left flex flex-col justify-between hover:border-[#0F4CBA]/20 hover:shadow-md transition-all duration-300 min-h-[170px]">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0F4CBA] shadow-3xs">
                    <Icon className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div className="space-y-1 mt-4">
                    <h3 className="text-xs font-bold text-blue-955">{feat.title}</h3>
                    <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. LEARNING LEVELS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-20 max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#F4B400] uppercase tracking-widest">Target Tiers</span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-955 tracking-tight">Learning Levels</h2>
            <p className="text-slate-600 text-base max-w-xl mx-auto">
              Progressive program structures ensuring solid groundings before professional deployment.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Beginner Programs", icon: BookOpen, desc: "Step-by-step programming languages introduction." },
              { title: "Intermediate Programs", icon: Settings, desc: "Focus on frameworks, API routing, and coding algorithms." },
              { title: "Advanced Programs", icon: Cpu, desc: "Deep dive into model architectures, pipelines, and server clouds." },
              { title: "Professional Tracks", icon: Briefcase, desc: "Career-aligned tracks focusing heavily on developer placements." },
              { title: "Bootcamps", icon: Zap, desc: "Intensive 1 to 2-week technical coding sprints." },
              { title: "Intensive Cohorts", icon: Users, desc: "Project teams collaborating closely with senior software mentors." }
            ].map((level, idx) => {
              const Icon = level.icon;
              return (
                <div key={idx} className="group p-6 rounded-3xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-[#0F4CBA]/20 hover:shadow-lg transition-all text-center flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[#0F4CBA] group-hover:bg-[#0F4CBA] group-hover:text-[#F4B400] transition-all shadow-3xs mb-4">
                    <Icon className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <h4 className="text-sm font-bold text-blue-955 mb-1">{level.title}</h4>
                  <p className="text-[10px] text-slate-400 font-semibold leading-relaxed max-w-xs">{level.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. FOR STUDENTS & COLLEGES */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* For Students side */}
            <div className="p-8 md:p-10 rounded-[2.5rem] bg-white border border-slate-200/60 shadow-md text-left space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#0F4CBA]">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-blue-955 tracking-tight border-b border-slate-100 pb-3">For Students</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Take charge of your technical learning, build coding portfolios, and unlock career opportunities.
              </p>
              <ul className="space-y-4 pt-2">
                {[
                  { title: "Build Skills", desc: "Master modern languages, web frameworks, and AI workflows." },
                  { title: "Gain Experience", desc: "Work on real-world development tasks with actual code review cycles." },
                  { title: "Earn Certifications", desc: "Gain accredited participation credentials that check out online." },
                  { title: "Work on Real Projects", desc: "Deploy working code to active web domains and repositories." },
                  { title: "Become Placement Ready", desc: "Excel in placement tests, technical screening rounds, and algorithmic checks." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#0F4CBA] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 leading-snug">{item.title}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Colleges side */}
            <div className="p-8 md:p-10 rounded-[2.5rem] bg-white border border-slate-200/60 shadow-md text-left space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#0F4CBA]">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-blue-955 tracking-tight border-b border-slate-100 pb-3">For Colleges & TPOs</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Introduce enterprise-grade technical training and placement support to your college.
              </p>
              <ul className="space-y-4 pt-2">
                {[
                  { title: "Custom Training Programs", desc: "Syllabuses custom-tailored to align with your academic timeline." },
                  { title: "Department-Specific Training", desc: "Targeted modules for Computer Science, IT, or Management branches." },
                  { title: "Campus Workshops", icon: Presentation, desc: "Facilitate technical coding bootcamps with hands-on lab sessions." },
                  { title: "Placement Readiness Programs", desc: "Provide direct support for resume audits, mock tests, and screenings." },
                  { title: "Faculty Development Programs", desc: "Upskill academic staff on generative AI, cloud, and modern coding systems." },
                  { title: "Industry Expert Sessions", desc: "Guest sessions and live lectures led by developers working at tech companies." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#F4B400] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 leading-snug">{item.title}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 7. PROGRAM STRUCTURE */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-20 max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#0F4CBA] uppercase tracking-widest">Curriculum Pathway</span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-955 tracking-tight">Program Structure</h2>
            <p className="text-slate-600 text-base max-w-xl mx-auto">
              A transparent, progressive route to mastering a technical domain.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-900/10 via-[#0F4CBA]/20 to-amber-400/10 transform -translate-y-1/2 z-0 hidden lg:block" />

            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-6 relative z-10">
              {[
                { step: "Step 1", title: "Foundation Training", desc: "Learn key concepts, logic building, and syntax basics." },
                { step: "Step 2", title: "Practical Tasks", desc: "Implement concepts through weekly code assignments." },
                { step: "Step 3", title: "Mini Projects", desc: "Build small application blocks to test integrations." },
                { step: "Step 4", title: "Capstone Projects", desc: "Construct a production-ready software application." },
                { step: "Step 5", title: "Internships", desc: "Collaborate on development tasks with active developer reviews." },
                { step: "Step 6", title: "Certifications", desc: "Receive verifiable technical skills credentials." },
                { step: "Step 7", title: "Career Prep", desc: "Optimize portfolios, mock interviews, and placement connects." }
              ].map((step, idx) => (
                <div key={idx} className="p-5 rounded-3xl bg-slate-50 border border-slate-100 hover:border-amber-300 hover:bg-white hover:shadow-lg transition-all text-center flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-[#0F4CBA] text-white flex items-center justify-center font-bold text-xs shadow-md mb-4 relative z-10">
                    {idx + 1}
                  </div>
                  <span className="text-[9px] font-bold text-[#0F4CBA] uppercase tracking-widest mb-1">{step.step}</span>
                  <h3 className="text-xs font-extrabold text-blue-955 mb-2 leading-tight min-h-[32px] flex items-center justify-center">{step.title}</h3>
                  <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 8. SPECIAL PROGRAMS */}
      <section id="special-programs" className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-20 max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#F4B400] uppercase tracking-widest">Highlighted Tracks</span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-955 tracking-tight">Special Programs</h2>
            <p className="text-slate-600 text-base max-w-xl mx-auto">
              Our signature training cohorts built to develop specific software job readiness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialPrograms.map((prog, idx) => (
              <div 
                key={idx} 
                className="group p-7 rounded-3xl bg-white border border-slate-200/60 shadow-xs hover:shadow-xl hover:border-[#0F4CBA]/20 hover:-translate-y-1 transition-all duration-300 text-left flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50/70 text-[#0F4CBA] flex items-center justify-center shadow-3xs group-hover:bg-[#0F4CBA] group-hover:text-[#F4B400] transition-colors">
                    <Rocket className="w-4.5 h-4.5" />
                  </div>
                  <h3 className="text-base font-bold text-blue-955 group-hover:text-[#0F4CBA] transition-colors leading-snug min-h-[44px]">{prog.title}</h3>
                  <p className="text-xs text-slate-450 font-semibold leading-relaxed">{prog.desc}</p>
                </div>
                <div className="pt-6">
                  <button 
                    onClick={() => scrollToSection("enroll-form")}
                    className="text-xs font-bold text-[#0F4CBA] flex items-center gap-1 hover:underline"
                  >
                    Enroll Program
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. OUR IMPACT */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCounter value="5000+" label="Students Trained" />
            <StatCounter value="100+" label="Projects Completed" />
            <StatCounter value="200+" label="Institutions Connected" />
            <StatCounter value="95%" label="Program Completion Rate" />
          </div>
        </div>
      </section>

      {/* 10. WHO CAN JOIN */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-10">
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#0F4CBA] uppercase tracking-widest">Audience</span>
            <h2 className="text-2xl md:text-3xl font-black text-blue-955">Who Can Join</h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">We offer learning structures designed for diverse technical targets:</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              "College Students",
              "School Students",
              "Freshers",
              "Working Professionals",
              "Educational Institutions",
              "Student Communities"
            ].map((tag, idx) => (
              <span 
                key={idx} 
                className="px-5 py-2.5 rounded-full border border-slate-200 bg-white hover:border-[#0F4CBA]/40 text-sm font-semibold text-slate-700 hover:text-[#0F4CBA] shadow-xs transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FOR INSTITUTIONS SECTION */}
      <section className="py-24 bg-white relative">
        <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-[#0F4CBA]/3 blur-[125px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-20 max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#0F4CBA] uppercase tracking-widest">Colleges</span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-955 tracking-tight">Empowering Campuses Through Skill Development</h2>
            <p className="text-slate-600 text-base max-w-xl mx-auto">
              Our academic partnership packages handle curriculum design and evaluation dashboards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto text-left">
            {[
              { title: "Customized Training Programs", icon: Settings, desc: "Syllabuses tailored to align with college calendar guidelines." },
              { title: "Industry-Aligned Curriculum", icon: Cpu, desc: "Continuous syllabus updates matching core technical trends." },
              { title: "Practical Learning", icon: Laptop, desc: "Step out of theory blocks and complete developer labs." },
              { title: "Certification Support", icon: ShieldCheck, desc: "Verify student credentials via official databases." },
              { title: "Workshops & Bootcamps", icon: Zap, desc: "Conduct intensive coding bootcamps on campus." },
              { title: "Career Development", icon: Trophy, desc: "Optimize portfolios, resume reviews, and placement mock rounds." },
              { title: "Placement Preparation", icon: Target, desc: "Prepare students to clear technical screening filters." },
              { title: "Long-Term Partnerships", icon: Handshake, desc: "Execute Memorandum of Understanding for long-term deliverables." }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-150 shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:border-[#F4B400]/40 transition-colors flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-blue-50/80 text-[#0F4CBA] flex-shrink-0 flex items-center justify-center">
                    <Icon className="w-4.5 h-4.5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-blue-955 mb-1">{item.title}</h4>
                    <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 12. ENROLL/REQUEST FORM */}
      <section id="enroll-form" className="py-24 px-6 max-w-3xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative text-left">
          
          <div className="absolute top-6 right-8 text-blue-900/10 pointer-events-none">
            <Rocket className="w-12 h-12" />
          </div>
          
          <div className="mb-8 space-y-3">
            <h2 className="text-2xl md:text-3xl font-black text-blue-955 tracking-tight">Skill Development Request Form</h2>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Submit details of your college or domain interests. Fields marked with <span className="text-red-500 font-extrabold">*</span> are required.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Grid 1: Name & Email */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Full Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Aditya Sen"
                  className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-1 transition-all ${
                    formErrors.name ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#0F4CBA] focus:ring-[#0F4CBA]'
                  }`}
                />
                {formErrors.name && <p className="text-[10px] font-bold text-red-500">{formErrors.name}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Email Address <span className="text-red-500">*</span></label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@email.com"
                  className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-1 transition-all ${
                    formErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#0F4CBA] focus:ring-[#0F4CBA]'
                  }`}
                />
                {formErrors.email && <p className="text-[10px] font-bold text-red-500">{formErrors.email}</p>}
              </div>
            </div>

            {/* Grid 2: Phone & College */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Phone Number <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-1 transition-all ${
                    formErrors.phone ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#0F4CBA] focus:ring-[#0F4CBA]'
                  }`}
                />
                {formErrors.phone && <p className="text-[10px] font-bold text-red-500">{formErrors.phone}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">College / Institution Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="e.g. SRM University"
                  className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-1 transition-all ${
                    formErrors.college ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#0F4CBA] focus:ring-[#0F4CBA]'
                  }`}
                />
                {formErrors.college && <p className="text-[10px] font-bold text-red-500">{formErrors.college}</p>}
              </div>
            </div>

            {/* Grid 3: Branch & Current Year */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Course / Branch <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  placeholder="e.g. B.Tech CSE"
                  className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-1 transition-all ${
                    formErrors.course ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#0F4CBA] focus:ring-[#0F4CBA]'
                  }`}
                />
                {formErrors.course && <p className="text-[10px] font-bold text-red-500">{formErrors.course}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Current Year of Study <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="currentYear"
                  value={formData.currentYear}
                  onChange={handleChange}
                  placeholder="e.g. 3rd Year"
                  className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-1 transition-all ${
                    formErrors.currentYear ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#0F4CBA] focus:ring-[#0F4CBA]'
                  }`}
                />
                {formErrors.currentYear && <p className="text-[10px] font-bold text-red-500">{formErrors.currentYear}</p>}
              </div>
            </div>

            {/* Selection Dropdown: Interested Domain */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Interested Domain <span className="text-red-500">*</span></label>
              <select
                name="interestedDomain"
                value={formData.interestedDomain}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-1 bg-white transition-all ${
                  formErrors.interestedDomain ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#0F4CBA] focus:ring-[#0F4CBA]'
                }`}
              >
                <option value="">-- Select Category --</option>
                <option value="AI & ML">AI & ML</option>
                <option value="Web Development">Web Development</option>
                <option value="Data Science">Data Science</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Other">Other</option>
              </select>
              {formErrors.interestedDomain && <p className="text-[10px] font-bold text-red-500">{formErrors.interestedDomain}</p>}
            </div>

            {/* Custom Message */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Message / Context Details</label>
              <textarea 
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Include custom requirements, cohort goals, or specific timing details..."
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0F4CBA] focus:ring-1 focus:ring-[#0F4CBA] transition-all"
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-[#0F4CBA] hover:bg-blue-900 text-white font-bold text-sm tracking-wide shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4.5 h-4.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting Request...
                </>
              ) : (
                <>
                  <Send className="w-4.5 h-4.5" />
                  Enroll Now
                </>
              )}
            </button>

          </form>
        </div>
      </section>

      {/* 13. FAQ SECTION */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-left">
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-bold text-[#0F4CBA] uppercase tracking-widest">Questions & Answers</span>
          <h2 className="text-3xl font-black text-blue-955 tracking-tight">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="border-b border-slate-100 last:border-0 py-4.5">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="flex justify-between items-center w-full text-left font-bold text-base md:text-lg text-slate-800 hover:text-[#0F4CBA] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-[#0F4CBA] flex-shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#0F4CBA]' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-48 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-normal pl-7">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 14. FINAL CTA */}
      <section className="py-24 bg-white border-t border-slate-200/50 relative">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-50/60 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-blue-955">
            Build Skills. Create Opportunities. Shape Your Future.
          </h2>
          <p className="text-slate-600 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Empowering students and institutions with industry-relevant skills and practical learning experiences.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => scrollToSection("special-programs")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#0F4CBA] hover:bg-blue-900 text-white font-bold text-base shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all"
            >
              Start Learning
            </button>
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="w-full px-8 py-4 rounded-full bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-[#0F4CBA] text-[#0F4CBA] font-bold text-base shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
