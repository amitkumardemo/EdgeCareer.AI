"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { 
  Sparkles, Award, Star, Users, Briefcase, GraduationCap, Trophy, 
  MapPin, Settings, Mail, Phone, BookOpen, Send, ChevronDown, 
  ArrowRight, ArrowUpRight, CheckCircle2, ShieldCheck, Rocket, 
  Gift, Calendar, HelpCircle, Network, Building, Target, Compass,
  Presentation, Clock, Lightbulb, Zap, Cpu, MessagesSquare,
  LineChart, FolderGit, Globe, FileCheck, TrendingUp, Handshake,
  Building2, Users2
} from "lucide-react";
import { toast } from "sonner";

// Animated counter component for Statistics
const StatCounter = ({ value, label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value.toString().replace(/[^0-9]/g, ""));
      const duration = 2000; // 2 seconds
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
        {value.toString().includes("+") ? `${count}+` : count}
      </h3>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</p>
    </div>
  );
};

export default function CampusPartnershipClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const formRef = useRef(null);

  // Force light mode on this page
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  const [formData, setFormData] = useState({
    institutionName: "",
    contactName: "",
    designation: "",
    email: "",
    phone: "",
    location: "",
    studentCount: "",
    departments: "",
    collaborationType: "",
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
    if (!formData.institutionName.trim()) errors.institutionName = "Institution Name is required";
    if (!formData.contactName.trim()) errors.contactName = "Contact Person Name is required";
    if (!formData.designation.trim()) errors.designation = "Designation is required";
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
    if (!formData.location.trim()) errors.location = "City & State is required";
    if (!formData.studentCount.trim()) errors.studentCount = "Estimated Student Count is required";
    if (!formData.collaborationType) errors.collaborationType = "Please select a collaboration type";
    
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
    
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Partnership request submitted successfully! Our Institutional Lead will reach out to you within 24 hours.");
      setFormData({
        institutionName: "",
        contactName: "",
        designation: "",
        email: "",
        phone: "",
        location: "",
        studentCount: "",
        departments: "",
        collaborationType: "",
        message: ""
      });
    }, 1500);
  };

  // Framer Motion Variants for scroll animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  const faqs = [
    {
      q: "How does the partnership process work?",
      a: "The process begins when you submit a partnership request. We schedule a brief discovery call to understand your institution's specific requirements, draft a customized collaboration proposal, complete the formal MoU onboarding, and then initiate training or internship tracks led by our industry experts."
    },
    {
      q: "Do you provide certificates?",
      a: "Yes. All participating students receive official, verified certificates of completion from TechieHelp Institute of AI. Top-performing students also receive industry recommendation letters (LoRs) and achievement badges that they can showcase on LinkedIn and their resumes."
    },
    {
      q: "Can workshops be conducted online?",
      a: "Yes, we support flexible delivery modes. Workshops, bootcamps, and expert sessions can be conducted completely online via live interactive sessions, hybrid (mix of online lectures and physical lab support), or fully offline on-campus depending on requirements."
    },
    {
      q: "Do you provide internship opportunities?",
      a: "Absolutely. We offer Semester Internship Programs and project-based learning tracks where students collaborate on live, real-world development tasks with mentoring from industry software leads."
    },
    {
      q: "Can programs be customized?",
      a: "Yes, customization is one of our key highlights. We tailor course syllabi, duration, project domains (e.g. AI/ML, Data Science, Fullstack Web, Cyber Security), and session scheduling to fit perfectly into your college's academic calendar and curriculum framework."
    },
    {
      q: "Is there an MoU process?",
      a: "Yes. For formal long-term partnerships (such as establishing tech clubs, semester internships, or annual workshops), we execute a standard Memorandum of Understanding (MoU) that outlines deliverables, roles, and benefits for both the institution and TechieHelp."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased pt-24 pb-12 overflow-x-hidden selection:bg-[#0F4CBA] selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-20 lg:py-28 px-6 overflow-hidden">
        {/* Decorative Grid Patterns & Radial Glows */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none -z-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="partnership-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#partnership-grid)" />
          </svg>
        </div>
        <div className="absolute top-1/4 left-10 w-[600px] h-[600px] bg-[#0F4CBA]/5 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-[#F4B400]/3 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Heading & Text */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-blue-200 bg-blue-50/50 text-xs font-bold text-[#0F4CBA] uppercase tracking-wider shadow-sm">
                <ShieldCheck className="w-4 h-4 text-[#F4B400]" />
                <span>Institutional Partnerships</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-blue-950 tracking-tight leading-[1.05]">
                Empowering Colleges <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-950 via-[#0F4CBA] to-[#F4B400]">
                  Through Industry-Aligned
                </span> <br />
                Training & Internship Programs
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
                Partner with TechieHelp Institute of AI to provide students with practical skills, industry exposure, professional certifications, internships, workshops, and career opportunities.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button 
                  onClick={() => scrollToSection("partnership-form")}
                  className="px-8 py-4 rounded-full bg-[#0F4CBA] hover:bg-blue-900 text-white font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                >
                  Request Partnership
                  <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
                </button>
                <a 
                  href="mailto:ceo@techiehelp.in?subject=Campus%20Partnership%20Inquiry%20-%20TechieHelp"
                  className="px-8 py-4 rounded-full bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-[#0F4CBA]/30 text-slate-700 font-bold text-base shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  Schedule a Meeting
                  <ArrowUpRight className="w-4.5 h-4.5 text-[#0F4CBA]" />
                </a>
              </div>
            </div>

            {/* Right Column: Hero Graphic Illustration */}
            <div className="lg:col-span-5 relative w-full flex items-center justify-center">
              <div className="relative w-full max-w-[460px] aspect-square rounded-[3rem] bg-white border border-slate-100 shadow-[0_24px_60px_rgba(15,76,186,0.08)] p-6 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/10 via-white to-amber-50/5 pointer-events-none" />
                <Image 
                  src="/campus_collaboration.png" 
                  alt="University and Industry Collaboration Graphic"
                  width={400}
                  height={400}
                  className="w-full h-auto object-contain hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. WHY PARTNER WITH TECHIEHELP */}
      <section id="why-partner" className="py-24 bg-slate-50 border-y border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-20 max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#0F4CBA] uppercase tracking-widest">Core Capabilities</span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-955 tracking-tight">Why Partner with TechieHelp</h2>
            <p className="text-slate-600 text-base max-w-2xl mx-auto leading-relaxed">
              We bridge the academic-industry gap by offering structured technical and career programs tailored for modern placement standards.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { title: "Industry-Focused Training", icon: BookOpen, desc: "Curriculums designed around machine learning, data engineering, fullstack web, and AI capabilities." },
              { title: "Internship Programs", icon: Briefcase, desc: "Hands-on virtual and hybrid internships focusing on building production-ready developer projects." },
              { title: "Professional Certifications", icon: ShieldCheck, desc: "Accredited credentials confirming student skills in software engineering and cloud domains." },
              { title: "Workshops & Seminars", icon: Calendar, desc: "Short, highly engaging technical seminars conducted by developers and engineers." },
              { title: "Career Development Programs", icon: Trophy, desc: "Resume building workshops, LinkedIn audits, and technical portfolio reviews." },
              { title: "Placement Support", icon: GraduationCap, desc: "Mock interviews, career track coaching, and direct job connectivity modules." },
              { title: "Faculty Development Programs", icon: Users2, desc: "Up-skilling tracks for academic faculty focusing on generative AI, cloud, and modern coding tools." },
              { title: "Industry Expert Sessions", icon: Award, desc: "Live guest lectures and experience sharing sessions with veterans from tier-1 global tech companies." }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={idx} 
                  variants={itemVariants}
                  className="group p-7 rounded-3xl bg-white border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-[#0F4CBA]/20 hover:-translate-y-1 transition-all duration-300 text-left flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0F4CBA] group-hover:bg-[#0F4CBA] group-hover:text-[#F4B400] transition-all duration-300 shadow-sm">
                      <Icon className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-lg font-bold text-blue-950 transition-colors group-hover:text-[#0F4CBA]">{item.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3. PARTNERSHIP MODELS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-20 max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#F4B400] uppercase tracking-widest">Cooperation Schemes</span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-955 tracking-tight">Flexible Collaboration Models</h2>
            <p className="text-slate-600 text-base max-w-xl mx-auto">
              Choose from standard academic integrations or build a custom program tailored to your institutional calendar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Campus Training Programs", icon: Sparkles, desc: "Comprehensive semester-long curriculum integrations with evaluation support." },
              { title: "Semester Internship Programs", icon: Clock, desc: "Structured 3 to 6-month project development tracks with expert mentoring." },
              { title: "Hackathons & Innovation", icon: Lightbulb, desc: "Co-sponsored campus-wide coding challenges, quiz rounds, and technical festivals." },
              { title: "Faculty Development Programs", icon: Users, desc: "Short bootcamps and updates for professors to align with dynamic industry tech stack trends." },
              { title: "Bootcamps", icon: Zap, desc: "Immersive 1 to 2-week intensive programming and software building sprints." },
              { title: "Placement Readiness", icon: Briefcase, desc: "Mock testing, ATS checks, resume writing, and soft-skill optimization." },
              { title: "Technology Clubs", icon: Cpu, desc: "Collaborate to launch and guide specialized campus developer chapters and AI labs." },
              { title: "Guest Lectures", icon: MessagesSquare, desc: "Focused single-session interactions covering cloud, AI careers, and developer pathways." }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="group p-6 rounded-2xl bg-white border border-slate-200/60 shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:shadow-lg hover:border-[#0F4CBA]/20 transition-all duration-300 text-left flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50/80 text-[#0F4CBA] group-hover:bg-[#0F4CBA] group-hover:text-[#F4B400] transition-colors flex-shrink-0 flex items-center justify-center">
                    <Icon className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-bold text-blue-955 group-hover:text-[#0F4CBA] transition-colors">{item.title}</h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-normal">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. BENEFITS FOR COLLEGES */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-20 max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#0F4CBA] uppercase tracking-widest">Strategic Outcomes</span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-955 tracking-tight">Benefits for Colleges</h2>
            <p className="text-slate-600 text-base max-w-2xl mx-auto">
              Aligning with TechieHelp AI provides tangible educational, placement, and institutional credentials.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Improve Placement Outcomes", icon: LineChart, desc: "Direct improvement in placement selection statistics through structured preparation." },
              { title: "Project-Based Learning", icon: FolderGit, desc: "Students build real-world project portfolios, leaving dry theory behind." },
              { title: "Industry Exposure", icon: Globe, desc: "Live workflows, industry practices, and mentorship from actual software teams." },
              { title: "Professional Certifications", icon: FileCheck, desc: "Verifiable credentials that build credibility during recruiter screenings." },
              { title: "Skill Development", icon: TrendingUp, desc: "A practical approach to coding, testing, and modern application development." },
              { title: "Internship Opportunities", icon: Briefcase, desc: "Fast-track access to real project internship vacancies at TechieHelp and partners." },
              { title: "National Community Access", icon: Network, desc: "Connect with developer groups and student leaders from over 200+ universities." },
              { title: "Long-Term Academic MoU", icon: Handshake, desc: "Structured long-term collaborations with legal framework and accredited delivery." }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200/40 shadow-sm text-left flex flex-col justify-between hover:border-[#0F4CBA]/20 hover:shadow-md transition-all duration-300 min-h-[180px]">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0F4CBA] shadow-xs">
                    <Icon className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div className="space-y-1 mt-4">
                    <h3 className="text-sm font-bold text-blue-950">{item.title}</h3>
                    <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. FOR TPOs */}
      <section className="py-24 bg-white relative">
        <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-amber-500/3 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left side: content */}
            <div className="lg:col-span-5 text-left space-y-6">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-200 text-xs font-bold uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5 text-[#F4B400]" />
                <span>Placement Focus</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-blue-955 tracking-tight leading-tight">
                Built for Training & <br /> Placement Officers
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                We design placement ecosystems that make coordination easy, automate project audits, and provide recruitment partners with verified developer candidates.
              </p>
              <div className="pt-2">
                <button 
                  onClick={() => scrollToSection("partnership-form")}
                  className="px-6 py-3 rounded-full bg-[#0F4CBA] hover:bg-blue-900 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 group"
                >
                  Connect with TPO Team
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right side: cards grid */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              {[
                { title: "Workshops", icon: Presentation, desc: "Facilitate specialized technical coding bootcamps on campus or online." },
                { title: "Internship Programs", icon: Briefcase, desc: "Provide students with official project-based virtual and hybrid internship roles." },
                { title: "Placement Support", icon: Target, desc: "Direct connect pathways for verified student leaders to active tech companies." },
                { title: "Career Guidance", icon: Compass, desc: "Up-to-date industry sessions mapping job roles in Generative AI and ML fields." },
                { title: "Skill Initiatives", icon: Sparkles, desc: "Integrate student development projects directly into institutional placement audits." },
                { title: "Industry Collaborations", icon: Building, desc: "Work with TechieHelp partner networks to invite hiring leads and tech deans." }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-150 shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:border-[#F4B400]/40 transition-colors text-left flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-blue-50/80 text-[#0F4CBA] flex-shrink-0 flex items-center justify-center">
                      <Icon className="w-4.5 h-4.5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-blue-955 mb-1">{item.title}</h4>
                      <p className="text-[10px] text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 6. OUR IMPACT (STATISTICS) */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCounter value="5000+" label="Students Impacted" />
            <StatCounter value="200+" label="Institutions Connected" />
            <StatCounter value="100+" label="Projects Completed" />
            <StatCounter value="50+" label="Workshops Conducted" />
          </div>
        </div>
      </section>

      {/* 7. COLLABORATION PROCESS (TIMELINE) */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-20 max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#0F4CBA] uppercase tracking-widest">Workflow</span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-955 tracking-tight">Collaboration Process</h2>
            <p className="text-slate-600 text-base max-w-xl mx-auto">
              We ensure structured onboarding, clear deliverable timelines, and transparent academic execution.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-900/10 via-[#0F4CBA]/20 to-amber-400/10 transform -translate-y-1/2 z-0 hidden lg:block" />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
              {[
                { step: "Step 1", title: "Partnership Request", desc: "Submit the request form below with your college's requirements." },
                { step: "Step 2", title: "Discovery Call", desc: "Our academic coordinator schedules a 15-min call with your TPO/HOD." },
                { step: "Step 3", title: "Customized Proposal", desc: "We draft a tailored syllabus, pricing, and project timeline structure." },
                { step: "Step 4", title: "MoU & Onboarding", desc: "Review deliverables and complete standard Memorandum of Understanding." },
                { step: "Step 5", title: "Program Execution", desc: "Initiate technical classes, internship tracks, and evaluation portals." }
              ].map((step, idx) => (
                <div key={idx} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-amber-300 hover:bg-white hover:shadow-lg transition-all text-center flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#0F4CBA] text-white flex items-center justify-center font-bold text-xs shadow-md mb-4 relative z-10">
                    {idx + 1}
                  </div>
                  <span className="text-[10px] font-bold text-[#0F4CBA] uppercase tracking-widest mb-1">{step.step}</span>
                  <h3 className="text-sm font-extrabold text-blue-955 mb-2 leading-tight">{step.title}</h3>
                  <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 8. WHO CAN PARTNER */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-10">
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#F4B400] uppercase tracking-widest">Eligibility</span>
            <h2 className="text-2xl md:text-3xl font-black text-blue-955">Who Can Partner</h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">We structure collaboration tracks for diverse educational organizations and communities.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              "Engineering Colleges",
              "Universities",
              "Polytechnic Institutes",
              "Training Institutes",
              "Management Colleges",
              "Educational Organizations",
              "Skill Development Centers",
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

      {/* 9. PARTNERSHIP REQUEST FORM */}
      <section id="partnership-form" className="py-24 px-6 max-w-3xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative text-left">
          
          <div className="absolute top-6 right-8 text-blue-900/10 pointer-events-none">
            <Rocket className="w-12 h-12" />
          </div>
          
          <div className="mb-8 space-y-3">
            <h2 className="text-2xl md:text-3xl font-black text-blue-955 tracking-tight">Request a Campus Partnership</h2>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Provide your institution details below. Fields marked with <span className="text-red-500 font-extrabold">*</span> are required.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Grid 1: Institution & Name */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Institution Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="institutionName"
                  value={formData.institutionName}
                  onChange={handleChange}
                  placeholder="e.g. VIT University"
                  className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-1 transition-all ${
                    formErrors.institutionName ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#0F4CBA] focus:ring-[#0F4CBA]'
                  }`}
                />
                {formErrors.institutionName && <p className="text-[10px] font-bold text-red-500">{formErrors.institutionName}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Contact Person Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  placeholder="e.g. Dr. Ramesh Kumar"
                  className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-1 transition-all ${
                    formErrors.contactName ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#0F4CBA] focus:ring-[#0F4CBA]'
                  }`}
                />
                {formErrors.contactName && <p className="text-[10px] font-bold text-red-500">{formErrors.contactName}</p>}
              </div>
            </div>

            {/* Grid 2: Designation & Email */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Designation <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="e.g. Dean / HOD / TPO Lead"
                  className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-1 transition-all ${
                    formErrors.designation ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#0F4CBA] focus:ring-[#0F4CBA]'
                  }`}
                />
                {formErrors.designation && <p className="text-[10px] font-bold text-red-500">{formErrors.designation}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Email Address <span className="text-red-500">*</span></label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@college.edu"
                  className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-1 transition-all ${
                    formErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#0F4CBA] focus:ring-[#0F4CBA]'
                  }`}
                />
                {formErrors.email && <p className="text-[10px] font-bold text-red-500">{formErrors.email}</p>}
              </div>
            </div>

            {/* Grid 3: Phone & Location */}
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
                <label className="text-xs font-bold text-slate-700">City & State <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Pune, Maharashtra"
                  className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-1 transition-all ${
                    formErrors.location ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#0F4CBA] focus:ring-[#0F4CBA]'
                  }`}
                />
                {formErrors.location && <p className="text-[10px] font-bold text-red-500">{formErrors.location}</p>}
              </div>
            </div>

            {/* Grid 4: Students & Departments */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Estimated Student Count <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="studentCount"
                  value={formData.studentCount}
                  onChange={handleChange}
                  placeholder="e.g. 500+ / 1000+"
                  className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-1 transition-all ${
                    formErrors.studentCount ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#0F4CBA] focus:ring-[#0F4CBA]'
                  }`}
                />
                {formErrors.studentCount && <p className="text-[10px] font-bold text-red-500">{formErrors.studentCount}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Target Departments / Branches</label>
                <input 
                  type="text" 
                  name="departments"
                  value={formData.departments}
                  onChange={handleChange}
                  placeholder="e.g. CSE, IT, ECE"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0F4CBA] focus:ring-1 focus:ring-[#0F4CBA] transition-all"
                />
              </div>
            </div>

            {/* Selection: Collaboration Type */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Type of Collaboration <span className="text-red-500">*</span></label>
              <select
                name="collaborationType"
                value={formData.collaborationType}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-1 bg-white transition-all ${
                  formErrors.collaborationType ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#0F4CBA] focus:ring-[#0F4CBA]'
                }`}
              >
                <option value="">-- Select Collaboration Type --</option>
                <option value="Training Programs">Training Programs</option>
                <option value="Internship Programs">Internship Programs</option>
                <option value="Workshop Request">Workshop Request</option>
                <option value="Hackathon Collaboration">Hackathon Collaboration</option>
                <option value="Placement Support">Placement Support</option>
                <option value="Faculty Development Program">Faculty Development Program</option>
                <option value="Other">Other</option>
              </select>
              {formErrors.collaborationType && <p className="text-[10px] font-bold text-red-500">{formErrors.collaborationType}</p>}
            </div>

            {/* Message Textarea */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Message / Custom Requirements</label>
              <textarea 
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your requirements, specific domains, or timeline..."
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
                  Sending Request...
                </>
              ) : (
                <>
                  <Send className="w-4.5 h-4.5" />
                  Submit Partnership Request
                </>
              )}
            </button>

          </form>
        </div>
      </section>

      {/* 10. FAQ SECTION */}
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

      {/* 11. FINAL CTA SECTION */}
      <section className="py-24 bg-white border-t border-slate-200/50 relative">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-50/60 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-blue-950">
            Let's Build Future-Ready Campuses Together
          </h2>
          <p className="text-slate-600 text-lg md:text-xl max-w-xl mx-auto leading-relaxed font-normal">
            Partner with TechieHelp Institute of AI to empower students with industry-relevant skills, internships, certifications, and career opportunities.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => scrollToSection("partnership-form")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#0F4CBA] hover:bg-blue-900 text-white font-bold text-base shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all"
            >
              Request Partnership
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
