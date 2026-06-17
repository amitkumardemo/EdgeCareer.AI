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
  Building, TrendingUp, Smartphone, PenTool, GitBranch, Compass, Handshake,
  Heart, Search, Globe, ChevronRight, Info, Target
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
      <h3 className="text-4xl md:text-5xl font-black text-blue-955 mb-2 bg-gradient-to-r from-blue-955 to-[#0F4CBA] bg-clip-text text-transparent">
        {value.toString().includes("%") ? `${count}%` : value.toString().includes("+") ? `${count}+` : count}
      </h3>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</p>
    </div>
  );
};

export default function PlacementSupportClient() {
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
    currentGoal: "",
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

    if (!formData.college.trim()) errors.college = "College Name is required";
    if (!formData.course.trim()) errors.course = "Course / Branch is required";
    if (!formData.currentYear.trim()) errors.currentYear = "Current Year of study is required";
    if (!formData.interestedDomain) errors.interestedDomain = "Please select interested domain";
    if (!formData.currentGoal) errors.currentGoal = "Please select your current goal";

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
      toast.success("Placement support request submitted successfully! We will coordinate your readiness induction.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        college: "",
        course: "",
        currentYear: "",
        interestedDomain: "",
        currentGoal: "",
        message: ""
      });
    }, 1500);
  };

  // Force light mode on this page
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  const whyPlacementMatters = [
    { title: "Resume Building", icon: Code, desc: "Construct ATS-compatible developer CVs targeting enterprise scanning tools." },
    { title: "Interview Preparation", icon: Presentation, desc: "Solve standard structural coding questions, mock sprints, and system designs." },
    { title: "Mock Interviews", icon: Users, desc: "Run simulated technical & HR rounds directly with active software engineers." },
    { title: "Career Guidance", icon: Compass, desc: "Provide roadmaps for GenAI, Cloud Computing, Web Dev, and technical engineering." },
    { title: "LinkedIn Optimization", icon: TrendingUp, desc: "Optimize profiles to increase recruiter impressions and inbound opportunities." },
    { title: "Industry Exposure", icon: Cpu, desc: "Gain familiarity with enterprise code environments, Git coordination, and tools." },
    { title: "Internship Opportunities", icon: Briefcase, desc: "Obtain direct priority routes to in-house and partner project internships." },
    { title: "Placement Readiness", icon: Target, desc: "Consistently track and improve technical and communication competencies." }
  ];

  const placementServices = [
    { title: "AI Resume Builder", icon: Zap, desc: "Build industry-aligned profiles automatically mapped to ATS requirements." },
    { title: "ATS-Friendly Resume Review", icon: ShieldCheck, desc: "Detailed manual CV audits scoring readability and tech stack listings." },
    { title: "LinkedIn Profile Optimization", icon: Award, desc: "Configure headlines, summaries, and experience parameters for algorithms." },
    { title: "GitHub Portfolio Building", icon: GitBranch, desc: "Structure repositories, readmes, and code patterns for hiring panels." },
    { title: "Mock HR Interviews", icon: Users, desc: "Simulate behavior, background, and cultural fit evaluation rounds." },
    { title: "Technical Interview Prep", icon: Code, desc: "Mock practice covering system designs, coding scripts, and diagnostics." },
    { title: "DSA & Coding Practice", icon: Trophy, desc: "Coordinated practice on arrays, trees, search scripts, and algorithms." },
    { title: "Communication Skills", icon: MessagesSquare, desc: "Workshops covering tech explanations, mock presentations, and logic flows." },
    { title: "Career Roadmaps", icon: Compass, desc: "Step-by-step career path structures aligning with skills and placements." },
    { title: "Internship Assistance", icon: Briefcase, desc: "Direct priority channels for projects to gain real experience." },
    { title: "Professional Certifications", icon: GraduationCap, desc: "Acquire verifiable certificates of accomplishment after project checks." },
    { title: "Job Readiness Programs", icon: Rocket, desc: "Intensive job readiness programs that review all tech streams." }
  ];

  const placementJourney = [
    { step: "Step 1", title: "Learn Skills", desc: "Gain baseline competencies in languages, frameworks, and tools." },
    { step: "Step 2", title: "Build Projects", desc: "Construct web apps and AI algorithms in GitHub portfolios." },
    { step: "Step 3", title: "Complete Internship", desc: "Gain real-world experience via project-based tasks." },
    { step: "Step 4", title: "Create ATS Resume", desc: "Design a resume that successfully passes industrial ATS filters." },
    { step: "Step 5", title: "Practice Interviews", desc: "Participate in HR and coding mock rounds with mentors." },
    { step: "Step 6", title: "Become Placement Ready", desc: "Score high on our technical evaluation metrics." },
    { step: "Step 7", title: "Launch Career", desc: "Apply with confidence and transition into professional roles." }
  ];

  const preparationTracks = [
    "Software Development",
    "AI & Machine Learning",
    "Data Science",
    "Web Development",
    "Cyber Security",
    "Cloud Computing",
    "Digital Marketing",
    "UI/UX Design"
  ];

  const featuredPrograms = [
    { title: "Resume Building Program", desc: "Convert your project achievements into professional bullet points that recruiters notice." },
    { title: "LinkedIn Branding Program", desc: "Optimize your digital profile and structure inbound networking activities." },
    { title: "Mock Interview Program", desc: "Participate in 3 structural live interviews with software developers from tier-1 firms." },
    { title: "GitHub & Portfolio Program", desc: "Host, deploy, and organize projects to demonstrate active code execution." },
    { title: "Placement Readiness Program", desc: "A complete review track combining DSA practice, resumes, and HR diagnostics." },
    { title: "Career Accelerator Program", desc: "Specialized training focused on transitions from engineering study to professional jobs." }
  ];

  const whatStudentsReceive = [
    "Professional Resume Support",
    "Interview Guidance",
    "Mock Interviews",
    "Career Mentorship",
    "Portfolio Development",
    "LinkedIn Optimization",
    "Placement Readiness Score",
    "Professional Certifications"
  ];

  const whoCanBenefit = [
    "College Students",
    "Freshers",
    "Interns",
    "Working Professionals",
    "Final Year Students",
    "Campus Ambassadors"
  ];

  const forColleges = [
    { title: "Campus Placement Training", desc: "Structured mock tests and training camps aligned with recruitment calendars." },
    { title: "Resume Building Workshops", desc: "In-depth class reviews converting student files into ATS-ready models." },
    { title: "Mock Interview Sessions", desc: "Conduct mass scale technical mock evaluations before campus drives." },
    { title: "LinkedIn Workshops", desc: "Train students on optimizing profiles and managing developer branding." },
    { title: "Career Development Programs", desc: "Dedicated modules covering communication, logic building, and corporate behaviors." },
    { title: "Industry Readiness Training", desc: "Familiarize students with corporate environments, developer setups, and version control." },
    { title: "Soft Skills Development", desc: "Workshops to refine communication, tech explanations, and team interactions." },
    { title: "Career Guidance Sessions", desc: "Expert seminars sharing details on current technology job hiring structures." }
  ];

  const faqs = [
    {
      q: "Do you guarantee placements?",
      a: "No. TechieHelp Institute of AI does not guarantee jobs or placements. We provide comprehensive career guidance, placement readiness programs, resume support, mock interviews, and project internship opportunities to significantly improve student employability and help them become industry-ready professionals."
    },
    {
      q: "Do you provide interview preparation?",
      a: "Yes. We conduct structural mock interview tracks covering data structures, algorithms, system architecture, database design, and HR behavior diagnostics."
    },
    {
      q: "Can beginners join?",
      a: "Yes. Our placement readiness tracks are structured progressively. We guide you through foundational coding before starting complex project development and mock interviews."
    },
    {
      q: "Do you help with resume building?",
      a: "Absolutely. We review student profiles and guide them in constructing ATS-compliant resumes that highlight technical projects, repository links, and verifiable credentials."
    },
    {
      q: "Do you conduct mock interviews?",
      a: "Yes, we run mock interview cycles with developer mentors from top technology firms who provide constructive feedback on technical skills, logic structure, and communication."
    },
    {
      q: "Can colleges organize placement programs?",
      a: "Yes. We work closely with Training & Placement Officers (TPOs) and HODs to host campus-wide placement workshops, mock diagnostic tests, and developer classes."
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
              <pattern id="placement-grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#placement-grid-pattern)" />
          </svg>
        </div>
        <div className="absolute top-1/4 left-1/3 w-[800px] h-[600px] bg-[#0F4CBA]/4 blur-[130px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-5 right-5 w-[500px] h-[500px] bg-[#F4B400]/3 blur-[110px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left side: Heading */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-blue-200 bg-blue-50/50 text-xs font-bold text-[#0F4CBA] uppercase tracking-wider shadow-sm">
                <Sparkles className="w-4 h-4 text-[#F4B400] animate-pulse" />
                <span>Placement Support</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-blue-955 tracking-tight leading-[1.05]">
                Transforming Students <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-950 via-[#0F4CBA] to-[#F4B400]">
                  Into Industry-Ready
                </span> <br />
                Professionals
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
                TechieHelp Institute of AI provides comprehensive placement support through resume building, interview preparation, mock interviews, LinkedIn optimization, career guidance, and internship opportunities to help students launch successful careers.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button 
                  onClick={() => scrollToSection("placement-form")}
                  className="px-8 py-4 rounded-full bg-[#0F4CBA] hover:bg-blue-900 text-white font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                >
                  Get Started
                  <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => scrollToSection("placement-form")}
                  className="px-8 py-4 rounded-full bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-[#0F4CBA]/30 text-slate-700 font-bold text-base shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  Book Career Guidance
                  <ArrowUpRight className="w-4.5 h-4.5 text-[#0F4CBA]" />
                </button>
              </div>
            </div>

            {/* Right side: Illustration */}
            <div className="lg:col-span-5 relative w-full flex items-center justify-center">
              <div className="relative w-full max-w-[460px] aspect-square rounded-[3rem] bg-white border border-slate-100 shadow-[0_24px_60px_rgba(15,76,186,0.06)] p-6 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/10 via-white to-amber-50/5 pointer-events-none" />
                <Image 
                  src="/placement_support.png" 
                  alt="Placement Support Program Illustration"
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

      {/* 2. WHY PLACEMENT SUPPORT MATTERS */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-20 max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#0F4CBA] uppercase tracking-widest">Bridging The Gap</span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-955 tracking-tight">Why Placement Support Matters</h2>
            <p className="text-slate-600 text-base max-w-xl mx-auto leading-relaxed">
              We help students develop the practical skills, portfolio structures, and interview confidence required by recruiters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyPlacementMatters.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="group p-8 rounded-3xl bg-white border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-[#0F4CBA]/20 hover:-translate-y-0.5 transition-all duration-300 text-left flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0F4CBA] group-hover:bg-[#0F4CBA] group-hover:text-[#F4B400] transition-all duration-300 shadow-xs">
                      <Icon className="w-5.5 h-5.5" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-lg font-bold text-blue-955 transition-colors group-hover:text-[#0F4CBA]">{item.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. OUR PLACEMENT SUPPORT SERVICES */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-20 max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#F4B400] uppercase tracking-widest">Accredited Services</span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-955 tracking-tight">Our Placement Support Services</h2>
            <p className="text-slate-600 text-base max-w-xl mx-auto">
              Our structures handle every parameter of career readiness.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {placementServices.map((feat, idx) => {
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

      {/* 4. PLACEMENT JOURNEY */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-20 max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#0F4CBA] uppercase tracking-widest">Roadmap Pathway</span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-955 tracking-tight">Placement Journey</h2>
            <p className="text-slate-600 text-base max-w-xl mx-auto">
              A transparent, progressive route to preparing for and launching your career.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-900/10 via-[#0F4CBA]/20 to-amber-400/10 transform -translate-y-1/2 z-0 hidden lg:block" />

            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-6 relative z-10">
              {placementJourney.map((step, idx) => (
                <div key={idx} className="p-5 rounded-3xl bg-white border border-slate-200/40 hover:border-amber-300 hover:shadow-lg transition-all text-center flex flex-col items-center">
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

      {/* 5. PLACEMENT PREPARATION TRACKS */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-10">
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#F4B400] uppercase tracking-widest">Training Areas</span>
            <h2 className="text-2xl md:text-3xl font-black text-blue-955">Placement Preparation Tracks</h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">We provide preparation modules across key industrial engineering and design domains:</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {preparationTracks.map((tag, idx) => (
              <span 
                key={idx} 
                className="px-5 py-2.5 rounded-full border border-slate-200 bg-slate-50/50 hover:border-[#0F4CBA]/40 text-sm font-semibold text-slate-700 hover:text-[#0F4CBA] shadow-xs transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FEATURED SUPPORT PROGRAMS */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-20 max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#0F4CBA] uppercase tracking-widest">Signature Tracks</span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-955 tracking-tight">Featured Support Programs</h2>
            <p className="text-slate-600 text-base max-w-xl mx-auto">
              Our structured programs designed to target specific placement outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {featuredPrograms.map((prog, idx) => (
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
                    onClick={() => scrollToSection("placement-form")}
                    className="text-xs font-bold text-[#0F4CBA] flex items-center gap-1 hover:underline"
                  >
                    Register Interest
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. WHAT STUDENTS RECEIVE */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#F4B400] uppercase tracking-widest">Deliverables</span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-955 tracking-tight">What Students Receive</h2>
            <p className="text-slate-500 text-sm">Key coordinates built for every participant in our support track.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto text-left">
            {whatStudentsReceive.map((item, idx) => (
              <div key={idx} className="group p-5 rounded-2xl border border-slate-200/50 hover:border-[#0F4CBA]/30 hover:shadow-md transition-all flex items-center gap-4 bg-slate-50/50 hover:bg-white">
                <CheckCircle2 className="w-5 h-5 text-[#0F4CBA] flex-shrink-0" />
                <span className="text-xs font-bold text-slate-700 group-hover:text-[#0F4CBA] transition-colors leading-tight">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. WHO CAN BENEFIT */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-10">
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#0F4CBA] uppercase tracking-widest">Audience</span>
            <h2 className="text-2xl md:text-3xl font-black text-blue-955">Who Can Benefit</h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">Our tracks accommodate varying placement preparation needs:</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {whoCanBenefit.map((tag, idx) => (
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

      {/* 9. OUR IMPACT */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCounter value="5000+" label="Students Trained" />
            <StatCounter value="100+" label="Projects Completed" />
            <StatCounter value="200+" label="Institutions Connected" />
            <StatCounter value="95%" label="Readiness Improvement" />
          </div>
        </div>
      </section>

      {/* 10. FOR COLLEGES & TPOs */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-20 max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#0F4CBA] uppercase tracking-widest">Institutions</span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-955 tracking-tight">Placement Readiness Programs for Institutions</h2>
            <p className="text-slate-600 text-base max-w-xl mx-auto">
              We collaborate with colleges to run intensive mass readiness training camps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto text-left">
            {forColleges.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200/50 shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:border-[#F4B400]/40 transition-colors flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-blue-50/80 text-[#0F4CBA] flex-shrink-0 flex items-center justify-center">
                  <CheckCircle2 className="w-4.5 h-4.5" strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-blue-955 mb-1">{item.title}</h4>
                  <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 11. PLACEMENT SUPPORT REQUEST FORM */}
      <section id="placement-form" className="py-24 px-6 max-w-3xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative text-left">
          
          <div className="absolute top-6 right-8 text-blue-900/10 pointer-events-none">
            <Rocket className="w-12 h-12" />
          </div>
          
          <div className="mb-8 space-y-3">
            <h2 className="text-2xl md:text-3xl font-black text-blue-955 tracking-tight">Placement Support Request Form</h2>
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
                <label className="text-xs font-bold text-slate-700">College Name <span className="text-red-500">*</span></label>
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
                <label className="text-xs font-bold text-slate-700">Current Year <span className="text-red-500">*</span></label>
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

            {/* Grid 4: Dropdowns */}
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Dropdown: Interested Domain */}
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
                  <option value="Data Science">Data Science</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Cyber Security">Cyber Security</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Other">Other</option>
                </select>
                {formErrors.interestedDomain && <p className="text-[10px] font-bold text-red-500">{formErrors.interestedDomain}</p>}
              </div>

              {/* Dropdown: Current Goal */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Current Goal <span className="text-red-500">*</span></label>
                <select
                  name="currentGoal"
                  value={formData.currentGoal}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-1 bg-white transition-all ${
                    formErrors.currentGoal ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#0F4CBA] focus:ring-[#0F4CBA]'
                  }`}
                >
                  <option value="">-- Select Goal --</option>
                  <option value="Internship">Internship</option>
                  <option value="Placement Preparation">Placement Preparation</option>
                  <option value="Resume Review">Resume Review</option>
                  <option value="Mock Interview">Mock Interview</option>
                  <option value="Career Guidance">Career Guidance</option>
                </select>
                {formErrors.currentGoal && <p className="text-[10px] font-bold text-red-500">{formErrors.currentGoal}</p>}
              </div>
            </div>

            {/* Custom Message */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Message / Context Details</label>
              <textarea 
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your current targets or specific placement challenges..."
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
                  Request Placement Support
                </>
              )}
            </button>

          </form>
        </div>
      </section>

      {/* 12. FAQ SECTION */}
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

      {/* 13. IMPORTANT DISCLAIMER */}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <div className="p-6 rounded-3xl border border-amber-300 bg-amber-50/40 text-left flex gap-4 items-start shadow-2xs">
          <Info className="w-6 h-6 text-[#F4B400] flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-extrabold text-[#0F4CBA] uppercase tracking-wider">Important Disclaimer</h4>
            <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
              TechieHelp Institute of AI does not guarantee jobs or placements. We provide career guidance, placement readiness programs, resume support, interview preparation, and internship opportunities to improve employability and help students become industry-ready professionals.
            </p>
          </div>
        </div>
      </section>

      {/* 14. FINAL CTA */}
      <section className="py-24 bg-white border-t border-slate-200/50 relative">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-50/60 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-blue-955">
            Your Career Journey Starts Here
          </h2>
          <p className="text-slate-600 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Build skills, gain experience, prepare with confidence, and become industry-ready with TechieHelp Institute of AI.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => scrollToSection("placement-form")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#0F4CBA] hover:bg-blue-900 text-white font-bold text-base shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all"
            >
              Start Your Journey
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
