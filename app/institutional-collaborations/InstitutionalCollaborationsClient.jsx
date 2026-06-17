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
  Heart, Search, Globe, ChevronRight
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

export default function InstitutionalCollaborationsClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    institutionName: "",
    contactPersonName: "",
    designation: "",
    email: "",
    phone: "",
    website: "",
    cityState: "",
    institutionType: "",
    collaborationInterest: "",
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
    if (!formData.contactPersonName.trim()) errors.contactPersonName = "Contact Person Name is required";
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

    if (!formData.cityState.trim()) errors.cityState = "City & State is required";
    if (!formData.institutionType) errors.institutionType = "Please select institution type";
    if (!formData.collaborationInterest) errors.collaborationInterest = "Please select collaboration interest";

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
      toast.success("Collaboration request submitted successfully! Our partnership team will contact you shortly.");
      setFormData({
        institutionName: "",
        contactPersonName: "",
        designation: "",
        email: "",
        phone: "",
        website: "",
        cityState: "",
        institutionType: "",
        collaborationInterest: "",
        message: ""
      });
    }, 1500);
  };

  // Force light mode on this page
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  const whyCollaborate = [
    { title: "Industry-Focused Learning", icon: Cpu, desc: "Bridge academic syllabi with real-world applications led by developers." },
    { title: "Skill Development Programs", icon: Code, desc: "Deliver hands-on training tracks across AI, Generative AI, MERN, and Cloud." },
    { title: "Internship Opportunities", icon: Briefcase, desc: "Provide students with direct access to project-based developer internships." },
    { title: "Professional Certifications", icon: Award, desc: "Equip learners with industry-recognized, verifiable skills credentials." },
    { title: "Workshops & Seminars", icon: Presentation, desc: "Organize technology webinars, offline masterclasses, and hands-on lab sessions." },
    { title: "Innovation & Community Building", icon: Network, desc: "Establish tech chapters, open-source cohorts, and innovation ecosystems on campus." },
    { title: "Placement Readiness Support", icon: Trophy, desc: "Provide resume audits, ATS evaluations, portfolio builders, and mock rounds." },
    { title: "Long-Term Partnerships", icon: Handshake, desc: "Sign institutional MoUs to run structured academic programs annually." }
  ];

  const whoWeCollaborateWith = [
    { title: "Engineering Colleges", icon: Building, desc: "Modernizing core engineering streams with advanced software tracks." },
    { title: "Universities", icon: GraduationCap, desc: "Integrating structured tech internships and certification modules." },
    { title: "Polytechnic Institutes", icon: Settings, desc: "Delivering practical skills and hands-on technology labs." },
    { title: "Management Colleges", icon: Briefcase, desc: "Adding business analytics, AI operations, and project tools." },
    { title: "Training Institutes", icon: Laptop, desc: "Coordinating technical workshops and developer curriculums." },
    { title: "EdTech Platforms", icon: Globe, desc: "Collaborating on specialized content delivery and evaluation tracks." },
    { title: "Student Communities", icon: Users, desc: "Empowering tech clubs, coding chapters, and open-source groups." },
    { title: "NGOs", icon: Heart, desc: "Providing accessible technical training for underrepresented groups." },
    { title: "Research Organizations", icon: Search, desc: "Co-developing AI models, pipelines, and technical research frameworks." },
    { title: "Startups", icon: Rocket, desc: "Offering technical talent pipelines and project collaboration tools." },
    { title: "Technology Communities", icon: Cpu, desc: "Running local developer chapters, developer events, and hackathons." },
    { title: "Corporate Partners", icon: Building, desc: "Designing specialized curriculums for immediate employee hiring." }
  ];

  const collaborationAreas = [
    { title: "Campus Training Programs", desc: "Long-term semester courses or short-term certifications integrated with labs." },
    { title: "Workshops & Seminars", desc: "Interactive bootcamps and session series on AI, GenAI, Web, and Cloud." },
    { title: "Hackathons & Challenges", desc: "Co-hosting coding contests and product design sprints on campus." },
    { title: "Internship Programs", desc: "Facilitating real-world project tasks with active code reviews." },
    { title: "Faculty Development Programs", desc: "Upskilling professors and academic staff on generative AI frameworks." },
    { title: "Guest Lectures", desc: "Expert talks on industry hiring trends, dev workflows, and system architecture." },
    { title: "Placement Readiness", desc: "Conducting resume optimization audits, profile assessments, and interview prep." },
    { title: "Technology Clubs", desc: "Creating and supporting specialized coding chapters and groups." },
    { title: "Campus Ambassador Programs", desc: "Empowering student leaders to coordinate tech events and build network reach." },
    { title: "Research Initiatives", desc: "Collaborating on academic research, engineering datasets, and AI solutions." },
    { title: "Industry Projects", desc: "Allowing students to build modules for active corporate product tracks." },
    { title: "Open Source Communities", desc: "Engaging students in Git coordination, GSoC preparation, and open repos." }
  ];

  const forColleges = [
    { title: "Industry Exposure", desc: "Expose students to current industry development practices, coding workflows, and pipelines." },
    { title: "Practical Learning", desc: "Integrate hands-on developer sandboxes and coding challenges alongside academic courses." },
    { title: "Certification Programs", desc: "Acquire verifiable certificates of participation that recruiters can authenticate." },
    { title: "Student Engagement", desc: "Establish active campus communities that participate in hackathons and developer talks." },
    { title: "Placement Preparation", desc: "Prepare students to pass algorithmic coding challenges, system design rounds, and ATS filters." },
    { title: "Faculty Development", desc: "Train faculty members on using vector databases, prompt engineering, and modern DevOps." },
    { title: "Technology Awareness", desc: "Build literacy in emerging tech concepts such as RAG pipelines, cloud architecture, and Web3." },
    { title: "Innovation Ecosystem", desc: "Nurture on-campus incubation, developer projects, and open-source contributions." }
  ];

  const forTPOs = [
    { title: "Workshops", desc: "Host bootcamps to prepare students for core technical screening rounds." },
    { title: "Career Development Programs", desc: "Deliver structured sessions on soft skills, communication, and presentation." },
    { title: "Resume Building", desc: "Conduct hands-on sessions to optimize developer portfolios and build ATS-friendly resumes." },
    { title: "Interview Preparation", desc: "Provide mock sessions covering algorithms, data structures, and system design." },
    { title: "Internship Support", desc: "Create priority pipelines for students in our development programs." },
    { title: "Placement Readiness", desc: "Identify skill gaps early and run targeted remediation cohorts." },
    { title: "Industry Networking", desc: "Connect training and placement officers with corporate developers and recruiters." },
    { title: "Community Building", desc: "Facilitate coordinate sharing of placement drives and opportunities." }
  ];

  const collaborationProcess = [
    { step: "Step 1", title: "Submit Request", desc: "Provide details of your institution and interests via our online request form." },
    { step: "Step 2", title: "Initial Discussion", desc: "Connect with our partnership team to align on mutual training goals." },
    { step: "Step 3", title: "Requirement Analysis", desc: "Evaluate student counts, technical requirements, and calendar mode preferences." },
    { step: "Step 4", title: "Customized Proposal", desc: "Receive custom syllabus options, execution roadmaps, and scheduling structures." },
    { step: "Step 5", title: "MoU & Onboarding", desc: "Formalize the collaboration via Memorandum of Understanding (MoU) and set setup paths." },
    { step: "Step 6", title: "Program Execution", desc: "Execute live developer classes, campus workshops, and coordinate project labs." },
    { step: "Step 7", title: "Long-Term Collaboration", desc: "Run periodic program audits, update coursework, and facilitate placement tracks." }
  ];

  const partnershipTypes = [
    "Academic Collaborations",
    "Technology Collaborations",
    "Research Collaborations",
    "Training Collaborations",
    "Workshop Collaborations",
    "Community Collaborations",
    "Innovation Collaborations",
    "Industry Collaborations"
  ];

  const successStories = [
    {
      logo: "/thp logo.png",
      name: "Engineering Institute of Technology",
      type: "Academic & Internship MoU",
      impact: "350+ Students completed capstone AI projects with verified credentials."
    },
    {
      logo: "/thp logo.png",
      name: "National Science University",
      type: "AI & ML Bootcamps",
      impact: "Successfully hosted 4 tech seminars and bootcamps with 98% satisfaction."
    },
    {
      logo: "/thp logo.png",
      name: "Global Tech Community Chapter",
      type: "Student Chapters Coordination",
      impact: "Empowered 5 Campus Ambassadors who led national hackathons and events."
    }
  ];

  const faqs = [
    {
      q: "How does institutional collaboration work?",
      a: "Colleges submit their interests through our request form. Our partnership team schedules a discussion to tailor program syllabi, session modes, and timeline constraints to match your curriculum before setting up execution paths."
    },
    {
      q: "Do you sign MoUs?",
      a: "Yes. TechieHelp Institute of AI establishes official Memorandums of Understanding (MoUs) with colleges, universities, and corporate hubs to guarantee long-term deliverables, certifications, and project tracks."
    },
    {
      q: "Can programs be customized?",
      a: "Absolutely. We work closely with HODs and TPOs to align durations (from 1-week bootcamps to semester-long classes), target student branches, and technologies like Next.js, GenAI, or Cloud architecture."
    },
    {
      q: "Do you provide certificates?",
      a: "Yes. All participating students and faculty members who successfully finish our training courses, workshops, or bootcamps receive official, verifiable certificates from TechieHelp Institute of AI."
    },
    {
      q: "Can workshops be conducted online?",
      a: "Yes, we support multiple delivery formats: completely Online, on-campus Offline lab sessions, or Hybrid modes depending on scheduling goals and infrastructure availability."
    },
    {
      q: "Is there any partnership fee?",
      a: "We offer diverse partnership formats. Some general community workshops and campus ambassador programs are free of cost, whereas specialized, long-term training tracks, capstone evaluations, and custom faculty workshops involve program specific pricing structures."
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
              <pattern id="collab-grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#collab-grid-pattern)" />
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
                <span>Institutional Collaborations</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-blue-955 tracking-tight leading-[1.05]">
                Building Strategic <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-950 via-[#0F4CBA] to-[#F4B400]">
                  Partnerships for
                </span> <br />
                Future-Ready Education
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
                TechieHelp Institute of AI collaborates with colleges, universities, training institutions, student communities, and industry partners to deliver skill development, internships, workshops, certifications, and innovation-driven learning experiences.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button 
                  onClick={() => scrollToSection("partner-form")}
                  className="px-8 py-4 rounded-full bg-[#0F4CBA] hover:bg-blue-900 text-white font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                >
                  Become a Partner
                  <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => scrollToSection("partner-form")}
                  className="px-8 py-4 rounded-full bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-[#0F4CBA]/30 text-slate-700 font-bold text-base shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  Schedule a Meeting
                  <ArrowUpRight className="w-4.5 h-4.5 text-[#0F4CBA]" />
                </button>
              </div>
            </div>

            {/* Right side: Illustration */}
            <div className="lg:col-span-5 relative w-full flex items-center justify-center">
              <div className="relative w-full max-w-[460px] aspect-square rounded-[3rem] bg-white border border-slate-100 shadow-[0_24px_60px_rgba(15,76,186,0.06)] p-6 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/10 via-white to-amber-50/5 pointer-events-none" />
                <Image 
                  src="/institutional_collaborations.png" 
                  alt="Institutional Collaborations Program Illustration"
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

      {/* 2. WHY COLLABORATE WITH TECHIEHELP INSTITUTE OF AI */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-20 max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#0F4CBA] uppercase tracking-widest">Core Advantages</span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-955 tracking-tight">Why Collaborate with TechieHelp Institute of AI</h2>
            <p className="text-slate-600 text-base max-w-xl mx-auto leading-relaxed">
              We coordinate end-to-end support for academic institutions, bringing industrial coding practices to campus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyCollaborate.map((item, idx) => {
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

      {/* 3. WHO WE COLLABORATE WITH */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#F4B400] uppercase tracking-widest">Our Ecosystem</span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-955 tracking-tight">Who We Collaborate With</h2>
            <p className="text-slate-500 text-sm">We establish partnerships across the entire academic and professional spectrum.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
            {whoWeCollaborateWith.map((dom, idx) => {
              const Icon = dom.icon;
              return (
                <div key={idx} className="group p-5 rounded-2xl border border-slate-200/50 hover:border-[#0F4CBA]/30 hover:shadow-md transition-all flex flex-col items-start gap-3 bg-slate-50/50 hover:bg-white">
                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-150 text-[#0F4CBA] group-hover:bg-[#0F4CBA] group-hover:text-[#F4B400] transition-colors flex-shrink-0 flex items-center justify-center shadow-2xs">
                    <Icon className="w-4.5 h-4.5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#0F4CBA] transition-colors leading-tight">{dom.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-1 font-semibold leading-normal">{dom.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. COLLABORATION AREAS */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-20 max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#0F4CBA] uppercase tracking-widest">Partnership Spheres</span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-955 tracking-tight">Collaboration Areas</h2>
            <p className="text-slate-600 text-base max-w-xl mx-auto">
              Our structures handle everything from campus chapters to specialized academic R&D modules.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {collaborationAreas.map((feat, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200/40 shadow-xs text-left flex flex-col justify-between hover:border-[#0F4CBA]/20 hover:shadow-md transition-all duration-300 min-h-[150px]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#F4B400]" />
                <div className="space-y-1 mt-4">
                  <h3 className="text-xs font-bold text-blue-955">{feat.title}</h3>
                  <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FOR COLLEGES & UNIVERSITIES */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-5 text-left space-y-4">
              <span className="text-xs font-bold text-[#F4B400] uppercase tracking-widest">Colleges & Universities</span>
              <h2 className="text-3xl md:text-5xl font-black text-blue-955 tracking-tight leading-tight">Academic Partnerships That Create Impact</h2>
              <p className="text-slate-600 text-sm leading-relaxed font-normal">
                Enable industry-aligned curriculums, practical lab environments, and placement preparedness dashboards at your institute.
              </p>
            </div>
            
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              {forColleges.map((item, idx) => (
                <div key={idx} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-[#0F4CBA]/20 hover:bg-white hover:shadow-lg transition-all text-left flex gap-4">
                  <CheckCircle2 className="w-5 h-5 text-[#0F4CBA] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 leading-snug">{item.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-1 font-semibold leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 6. FOR TRAINING & PLACEMENT CELLS */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6 order-2 lg:order-1">
              {forTPOs.map((item, idx) => (
                <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200/50 hover:border-[#F4B400]/40 hover:shadow-lg transition-all text-left flex gap-4">
                  <CheckCircle2 className="w-5 h-5 text-[#F4B400] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 leading-snug">{item.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-1 font-semibold leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-5 text-left space-y-4 order-1 lg:order-2 lg:pl-6">
              <span className="text-xs font-bold text-[#0F4CBA] uppercase tracking-widest">TPO Support</span>
              <h2 className="text-3xl md:text-5xl font-black text-blue-955 tracking-tight leading-tight">Empowering Training & Placement Cells</h2>
              <p className="text-slate-600 text-sm leading-relaxed font-normal">
                Equip your placement cell with targeted resume building tools, mock screening rounds, corporate networks, and student tracking analytics.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 7. COLLABORATION PROCESS */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-20 max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#0F4CBA] uppercase tracking-widest">Execution Pathway</span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-955 tracking-tight">Collaboration Process</h2>
            <p className="text-slate-600 text-base max-w-xl mx-auto">
              A structured step-by-step pipeline for seamless onboarding and execution.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-900/10 via-[#0F4CBA]/20 to-amber-400/10 transform -translate-y-1/2 z-0 hidden lg:block" />

            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-6 relative z-10">
              {collaborationProcess.map((step, idx) => (
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

      {/* 8. OUR IMPACT */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCounter value="5000+" label="Students Impacted" />
            <StatCounter value="200+" label="Institutions Connected" />
            <StatCounter value="50+" label="Workshops Conducted" />
            <StatCounter value="100+" label="Projects Completed" />
          </div>
        </div>
      </section>

      {/* 9. PARTNERSHIP TYPES */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-10">
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#F4B400] uppercase tracking-widest">Partnership Formats</span>
            <h2 className="text-2xl md:text-3xl font-black text-blue-955">Partnership Types</h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">Accredited ways for your organization to build coordinates with TechieHelp:</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {partnershipTypes.map((tag, idx) => (
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

      {/* 10. PARTNERSHIP REQUEST FORM */}
      <section id="partner-form" className="py-24 px-6 max-w-3xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative text-left">
          
          <div className="absolute top-6 right-8 text-blue-900/10 pointer-events-none">
            <Rocket className="w-12 h-12" />
          </div>
          
          <div className="mb-8 space-y-3">
            <h2 className="text-2xl md:text-3xl font-black text-blue-955 tracking-tight">Partnership Request Form</h2>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Register interest for your college, community, or startup hub. Fields marked with <span className="text-red-500 font-extrabold">*</span> are required.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Institution Name */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Institution Name <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="institutionName"
                value={formData.institutionName}
                onChange={handleChange}
                placeholder="e.g. Engineering Institute of Technology"
                className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-1 transition-all ${
                  formErrors.institutionName ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#0F4CBA] focus:ring-[#0F4CBA]'
                }`}
              />
              {formErrors.institutionName && <p className="text-[10px] font-bold text-red-500">{formErrors.institutionName}</p>}
            </div>

            {/* Grid 1: Name & Designation */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Contact Person Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="contactPersonName"
                  value={formData.contactPersonName}
                  onChange={handleChange}
                  placeholder="e.g. Dr. Rajesh Kumar"
                  className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-1 transition-all ${
                    formErrors.contactPersonName ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#0F4CBA] focus:ring-[#0F4CBA]'
                  }`}
                />
                {formErrors.contactPersonName && <p className="text-[10px] font-bold text-red-500">{formErrors.contactPersonName}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Designation <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="e.g. Director / Head of TPO"
                  className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-1 transition-all ${
                    formErrors.designation ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#0F4CBA] focus:ring-[#0F4CBA]'
                  }`}
                />
                {formErrors.designation && <p className="text-[10px] font-bold text-red-500">{formErrors.designation}</p>}
              </div>
            </div>

            {/* Grid 2: Email & Phone */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Email Address <span className="text-red-500">*</span></label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@institution.edu"
                  className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-1 transition-all ${
                    formErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#0F4CBA] focus:ring-[#0F4CBA]'
                  }`}
                />
                {formErrors.email && <p className="text-[10px] font-bold text-red-500">{formErrors.email}</p>}
              </div>

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
            </div>

            {/* Grid 3: Website & City/State */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Website URL</label>
                <input 
                  type="text" 
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="www.institution.edu"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#0F4CBA] focus:ring-1 focus:ring-[#0F4CBA] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">City & State <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="cityState"
                  value={formData.cityState}
                  onChange={handleChange}
                  placeholder="e.g. New Delhi, Delhi"
                  className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-1 transition-all ${
                    formErrors.cityState ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#0F4CBA] focus:ring-[#0F4CBA]'
                  }`}
                />
                {formErrors.cityState && <p className="text-[10px] font-bold text-red-500">{formErrors.cityState}</p>}
              </div>
            </div>

            {/* Grid 4: Dropdowns */}
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Dropdown: Type of Institution */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Type of Institution <span className="text-red-500">*</span></label>
                <select
                  name="institutionType"
                  value={formData.institutionType}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-1 bg-white transition-all ${
                    formErrors.institutionType ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#0F4CBA] focus:ring-[#0F4CBA]'
                  }`}
                >
                  <option value="">-- Select Category --</option>
                  <option value="Engineering College">Engineering College</option>
                  <option value="University">University</option>
                  <option value="Polytechnic">Polytechnic</option>
                  <option value="Training Institute">Training Institute</option>
                  <option value="Community">Community</option>
                  <option value="Startup">Startup</option>
                  <option value="Company">Company</option>
                  <option value="Other">Other</option>
                </select>
                {formErrors.institutionType && <p className="text-[10px] font-bold text-red-500">{formErrors.institutionType}</p>}
              </div>

              {/* Dropdown: Collaboration Interest */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Collaboration Interest <span className="text-red-500">*</span></label>
                <select
                  name="collaborationInterest"
                  value={formData.collaborationInterest}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-1 bg-white transition-all ${
                    formErrors.collaborationInterest ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#0F4CBA] focus:ring-[#0F4CBA]'
                  }`}
                >
                  <option value="">-- Select Interest --</option>
                  <option value="Workshops & Seminars">Workshops & Seminars</option>
                  <option value="Skill Development Programs">Skill Development Programs</option>
                  <option value="Internship Programs">Internship Programs</option>
                  <option value="Faculty Development Program">Faculty Development Program</option>
                  <option value="Hackathon Collaboration">Hackathon Collaboration</option>
                  <option value="Campus Ambassador Program">Campus Ambassador Program</option>
                  <option value="Research Collaboration">Research Collaboration</option>
                  <option value="Technology Club">Technology Club</option>
                  <option value="Other">Other</option>
                </select>
                {formErrors.collaborationInterest && <p className="text-[10px] font-bold text-red-500">{formErrors.collaborationInterest}</p>}
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
                placeholder="Include custom requirements, batch schedules, or specific timing details..."
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
                  Submit Collaboration Request
                </>
              )}
            </button>

          </form>
        </div>
      </section>

      {/* 11. TESTIMONIAL SECTION */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-bold text-[#0F4CBA] uppercase tracking-widest">Success Stories</span>
            <h2 className="text-3xl font-black text-blue-955 tracking-tight">Institution Success Stories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {successStories.map((story, idx) => (
              <div key={idx} className="bg-white border border-slate-200/60 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:border-amber-400/20 transition-all flex flex-col justify-between text-left">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 p-1 flex items-center justify-center">
                      <Image 
                        src={story.logo} 
                        alt={story.name} 
                        width={36} 
                        height={36} 
                        className="object-contain" 
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 leading-snug line-clamp-1">{story.name}</h4>
                      <span className="text-[10px] font-bold text-[#F4B400] uppercase tracking-wider">{story.type}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal italic">
                    "{story.impact}"
                  </p>
                </div>
                <div className="pt-4 flex items-center gap-1 text-[#0F4CBA] font-extrabold text-[11px] uppercase tracking-wider">
                  <span>View Case Study</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
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

      {/* 13. FINAL CTA */}
      <section className="py-24 bg-white border-t border-slate-200/50 relative">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-50/60 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-blue-955">
            Let's Build Future-Ready Institutions Together
          </h2>
          <p className="text-slate-600 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Partner with TechieHelp Institute of AI to empower students with skills, internships, certifications, innovation, and career opportunities.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => scrollToSection("partner-form")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#0F4CBA] hover:bg-blue-900 text-white font-bold text-base shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all"
            >
              Become a Partner
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
