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
  Building, TrendingUp
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
      <h3 className="text-4xl md:text-5xl font-black text-blue-955 mb-2 bg-gradient-to-r from-blue-950 to-blue-800 bg-clip-text text-transparent">
        {value.toString().includes("+") ? `${count}+` : count}
      </h3>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</p>
    </div>
  );
};

export default function WorkshopsSeminarsClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTab, setActiveTab] = useState("ai");
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
    workshopType: "",
    audienceSize: "",
    preferredMode: "",
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
    if (!formData.workshopType) errors.workshopType = "Please select a workshop type";
    if (!formData.audienceSize.trim()) errors.audienceSize = "Estimated Audience Size is required";
    if (!formData.preferredMode) errors.preferredMode = "Please select a preferred mode";

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
      toast.success("Workshop request submitted successfully! Our events coordinator will contact you shortly.");
      setFormData({
        institutionName: "",
        contactName: "",
        designation: "",
        email: "",
        phone: "",
        location: "",
        workshopType: "",
        audienceSize: "",
        preferredMode: "",
        message: ""
      });
    }, 1500);
  };

  // Workshop categories data
  const categories = {
    ai: {
      title: "AI & Machine Learning",
      icon: Cpu,
      topics: [
        "Introduction to AI",
        "Machine Learning Fundamentals",
        "Deep Learning",
        "Generative AI",
        "Prompt Engineering",
        "AI Agents & Automation",
        "LangChain & RAG Systems",
        "ChatGPT Applications",
        "Computer Vision",
        "NLP (Natural Language Processing)",
        "AI in Real World Applications"
      ]
    },
    data: {
      title: "Data Science",
      icon: Laptop,
      topics: [
        "Python for Data Science",
        "Data Analysis",
        "Pandas & NumPy",
        "Data Visualization",
        "Power BI",
        "Statistics for AI",
        "Predictive Analytics"
      ]
    },
    web: {
      title: "Web Development",
      icon: Code,
      topics: [
        "HTML, CSS & JavaScript",
        "React.js",
        "Next.js",
        "Frontend Development",
        "Backend Development",
        "MERN Stack",
        "Full Stack Development"
      ]
    },
    security: {
      title: "Cyber Security",
      icon: ShieldAlert,
      topics: [
        "Ethical Hacking",
        "Network Security",
        "Cyber Awareness",
        "OWASP Top 10",
        "Web Security",
        "Bug Bounty Basics"
      ]
    },
    cloud: {
      title: "Cloud Computing",
      icon: Cloud,
      topics: [
        "AWS Fundamentals",
        "Azure Basics",
        "Google Cloud",
        "DevOps",
        "Docker & Kubernetes",
        "Cloud Security"
      ]
    },
    programming: {
      title: "Programming & DSA",
      icon: BookOpen,
      topics: [
        "Python Programming",
        "Java Programming",
        "DSA with Java",
        "C Programming",
        "Competitive Programming",
        "LeetCode Preparation"
      ]
    },
    career: {
      title: "Career Development",
      icon: UserCheck,
      topics: [
        "Resume Building",
        "LinkedIn Optimization",
        "GitHub Portfolio Building",
        "Interview Preparation",
        "Placement Readiness",
        "Personal Branding"
      ]
    }
  };

  const seminarTopics = [
    "Future of Artificial Intelligence",
    "AI in Education",
    "Careers in AI & Data Science",
    "How to Start in Machine Learning",
    "Roadmap to Become an AI Engineer",
    "Generative AI Revolution",
    "Industry 4.0",
    "Open Source & GitHub",
    "Building Startups with AI",
    "AI Entrepreneurship",
    "Women in Technology",
    "Cyber Security Awareness"
  ];

  const faqs = [
    {
      q: "Can workshops be conducted online?",
      a: "Yes, we support flexible delivery modes. We can organize fully virtual live workshops, physical on-campus labs, or hybrid formats matching your campus availability."
    },
    {
      q: "Do participants receive certificates?",
      a: "Yes, all students and participants receive verified digital certificates of participation issued by TechieHelp Institute of AI."
    },
    {
      q: "Can workshops be customized?",
      a: "Absolutely. We routinely customize duration, syllabus depth, practical projects, and target departments to align with your college's schedule."
    },
    {
      q: "Do you conduct one-day seminars?",
      a: "Yes, we conduct short 2 to 4-hour technology seminars and webinars designed to introduce students to current trends, roadmaps, and career scopes."
    },
    {
      q: "Can colleges request multiple sessions?",
      a: "Yes. Many partner colleges organize recurring weekly sessions, multi-phase bootcamps, or progressive monthly training modules."
    },
    {
      q: "Do you provide hands-on projects?",
      a: "Yes, all our workshops emphasize practical application. Students build and deploy working projects (such as custom AI models or web apps) during the session."
    }
  ];

  // Motion animation parameters
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased pt-24 pb-12 overflow-x-hidden selection:bg-[#0F4CBA] selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-20 lg:py-28 px-6 overflow-hidden">
        {/* Visual Grids & Background Blur Spheres */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none -z-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="workshop-grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#workshop-grid-pattern)" />
          </svg>
        </div>
        <div className="absolute top-1/3 left-1/4 w-[700px] h-[550px] bg-[#0F4CBA]/4 blur-[130px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#F4B400]/3 blur-[110px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left side: Heading */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-blue-200 bg-blue-50/50 text-xs font-bold text-[#0F4CBA] uppercase tracking-wider shadow-sm">
                <Sparkles className="w-4 h-4 text-[#F4B400] animate-pulse" />
                <span>AI Workshops & Seminars</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-blue-950 tracking-tight leading-[1.05]">
                Empowering Students <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-950 via-[#0F4CBA] to-[#F4B400]">
                  With Industry-Focused
                </span> <br />
                AI & Technology Workshops
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
                TechieHelp Institute of AI conducts hands-on workshops, seminars, bootcamps, and expert sessions to help students, colleges, and institutions stay ahead in the era of Artificial Intelligence and emerging technologies.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button 
                  onClick={() => scrollToSection("workshop-form")}
                  className="px-8 py-4 rounded-full bg-[#0F4CBA] hover:bg-blue-900 text-white font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                >
                  Request Workshop
                  <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => scrollToSection("workshop-form")}
                  className="px-8 py-4 rounded-full bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-[#0F4CBA]/30 text-slate-700 font-bold text-base shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  Schedule Seminar
                  <ArrowUpRight className="w-4.5 h-4.5 text-[#0F4CBA]" />
                </button>
              </div>
            </div>

            {/* Right side: Illustration */}
            <div className="lg:col-span-5 relative w-full flex items-center justify-center">
              <div className="relative w-full max-w-[460px] aspect-square rounded-[3rem] bg-white border border-slate-100 shadow-[0_24px_60px_rgba(15,76,186,0.06)] p-6 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/10 via-white to-amber-50/5 pointer-events-none" />
                <Image 
                  src="/workshops_seminars.png" 
                  alt="AI and Technology Workshops Seminar Illustration"
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

      {/* 2. WHY CHOOSE OUR WORKSHOPS */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-20 max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#0F4CBA] uppercase tracking-widest">Quality Delivery</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#0F4CBA] tracking-tight">Why Choose Our Workshops</h2>
            <p className="text-slate-600 text-base max-w-xl mx-auto">
              Our training structure ensures maximum student engagement, practical execution, and measurable outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Hands-On Learning", icon: Cpu, desc: "Interactive programming and developer tasks instead of standard slides." },
              { title: "Industry Experts", icon: Users, desc: "Conducted by engineers and product leads working at top technology firms." },
              { title: "Latest AI Tools", icon: Sparkles, desc: "Explore LangChain, RAG architectures, local LLMs, and prompt design." },
              { title: "Live Demonstrations", icon: Presentation, desc: "Real-time coding, tool configurations, and model deployments." },
              { title: "Project-Based Learning", icon: Trophy, desc: "Students build working applications and projects for their portfolios." },
              { title: "Certificates of Participation", icon: ShieldCheck, desc: "Accredited credentials confirming workshop hours and topics covered." }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="group p-8 rounded-3xl bg-white border border-slate-250/60 shadow-sm hover:shadow-xl hover:border-[#0F4CBA]/20 hover:-translate-y-0.5 transition-all duration-300 text-left flex flex-col justify-between">
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

      {/* 3. WORKSHOP CATEGORIES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-16 max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#F4B400] uppercase tracking-widest">Syllabus Domains</span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-950 tracking-tight">Workshop Categories</h2>
            <p className="text-slate-600 text-base max-w-2xl mx-auto">
              Choose from a wide variety of emerging technical modules and curriculum tracks.
            </p>
          </div>

          {/* Interactive Categories Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-4xl mx-auto border-b border-slate-100 pb-6">
            {Object.entries(categories).map(([key, cat]) => {
              const Icon = cat.icon;
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold transition-all ${
                    isActive 
                      ? "bg-[#0F4CBA] text-white shadow-md" 
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="w-4 h-4" strokeWidth={2} />
                  {cat.title}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="bg-slate-50/70 border border-slate-100 rounded-3xl p-8 md:p-12 text-left max-w-5xl mx-auto min-h-[300px]">
            <div className="grid md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-5 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#0F4CBA] shadow-sm">
                  {React.createElement(categories[activeTab].icon, { className: "w-6 h-6" })}
                </div>
                <h3 className="text-2xl font-black text-blue-950">{categories[activeTab].title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-normal">
                  Our structured modules are led by industry developers. Every topic contains live demonstrations, lab setups, and deployment assignments.
                </p>
              </div>

              <div className="md:col-span-7 grid sm:grid-cols-2 gap-3">
                {categories[activeTab].topics.map((topic, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3.5 bg-white border border-slate-200/50 rounded-2xl shadow-2xs hover:border-[#0F4CBA]/20 transition-all">
                    <CheckCircle2 className="w-4.5 h-4.5 text-[#0F4CBA] flex-shrink-0" strokeWidth={2} />
                    <span className="text-xs font-bold text-slate-700 leading-tight">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. SEMINAR TOPICS */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-20 max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#0F4CBA] uppercase tracking-widest">Single Session Topics</span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-955 tracking-tight">Seminar Topics</h2>
            <p className="text-slate-600 text-base max-w-xl mx-auto">
              Short, high-impact overview seminars for college tech festivals and orientation induction programs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {seminarTopics.map((topic, idx) => (
              <div 
                key={idx} 
                className="group p-5 rounded-2xl bg-white border border-slate-200/60 shadow-[0_2px_10px_rgba(0,0,0,0.01)] hover:shadow-md hover:border-[#0F4CBA]/10 hover:scale-[1.01] transition-all text-left flex items-center gap-4"
              >
                <div className="w-8.5 h-8.5 rounded-xl bg-blue-50/70 text-[#0F4CBA] flex-shrink-0 flex items-center justify-center group-hover:bg-[#0F4CBA] group-hover:text-[#F4B400] transition-colors">
                  <Star className="w-4 h-4" strokeWidth={2} />
                </div>
                <h4 className="text-xs font-bold text-slate-700 leading-snug group-hover:text-blue-955 transition-colors">{topic}</h4>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. WORKSHOP FORMATS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-20 max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#F4B400] uppercase tracking-widest">Delivery Channels</span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-955 tracking-tight">Workshop Formats</h2>
            <p className="text-slate-600 text-base max-w-xl mx-auto">
              Flexible setups meeting your campus infrastructure and student attendance goals.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Offline Workshops", icon: Building },
              { title: "Online Workshops", icon: Laptop },
              { title: "Bootcamps", icon: Zap },
              { title: "Faculty Development", icon: Users },
              { title: "Hackathons", icon: Trophy },
              { title: "Webinars", icon: MessagesSquare },
              { title: "Guest Lectures", icon: Presentation },
              { title: "Industrial Sessions", icon: Calendar },
              { title: "Hands-on Labs", icon: Cpu }
            ].map((format, idx) => {
              const Icon = format.icon;
              return (
                <div key={idx} className="group p-6 rounded-3xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-[#0F4CBA]/20 hover:shadow-lg transition-all text-center flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[#0F4CBA] group-hover:bg-[#0F4CBA] group-hover:text-[#F4B400] transition-all shadow-2xs mb-4">
                    <Icon className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <h4 className="text-xs font-bold text-blue-955 group-hover:text-[#0F4CBA] transition-colors">{format.title}</h4>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. WHO CAN REQUEST */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-10">
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#0F4CBA] uppercase tracking-widest">Eligibility</span>
            <h2 className="text-2xl md:text-3xl font-black text-blue-955">Who Can Request</h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">Our workshops can be coordinated and booked by the following groups:</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              "Engineering Colleges",
              "Universities",
              "Polytechnic Institutes",
              "Schools",
              "Training Institutes",
              "Student Clubs",
              "Communities",
              "Companies"
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

      {/* 7. BENEFITS FOR INSTITUTIONS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-20 max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#0F4CBA] uppercase tracking-widest">Institutional Benefits</span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-955 tracking-tight">Benefits for Institutions</h2>
            <p className="text-slate-600 text-base max-w-xl mx-auto">
              Empower your campus with industry-level developer outreach.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { title: "Industry Exposure", icon: Network, desc: "Students work directly under code guidelines used by active software engineers." },
              { title: "Skill Development", icon: TrendingUp, desc: "Practical hands-on programming hours aligning with developer placements." },
              { title: "Hands-On Experience", icon: Cpu, desc: "Learn by building, launching, and deploying applications." },
              { title: "Certificates", icon: ShieldCheck, desc: "Student credentials verified online via TechieHelp official verification portals." },
              { title: "Placement Prep", icon: GraduationCap, desc: "Overview of resume guidelines and technical screening expectations." },
              { title: "Technology Awareness", icon: Sparkles, desc: "Expose students to current generative AI tools and APIs." },
              { title: "Expert Sessions", icon: Presentation, desc: "Instructors with background profiles in tier-1 product organizations." },
              { title: "Community Building", icon: Users, desc: "Fosters group study circles and coding clubs inside the campus." }
            ].map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="p-6 rounded-3xl bg-slate-50 border border-slate-200/40 shadow-xs text-left flex flex-col justify-between hover:border-[#0F4CBA]/20 hover:bg-white hover:shadow-md transition-all duration-300 min-h-[180px]">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[#0F4CBA] shadow-2xs">
                    <Icon className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div className="space-y-1 mt-4">
                    <h3 className="text-sm font-bold text-blue-955">{benefit.title}</h3>
                    <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. WORKSHOP IMPACT */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCounter value="5000+" label="Students Trained" />
            <StatCounter value="50+" label="Workshops Conducted" />
            <StatCounter value="200+" label="Institutions Connected" />
            <StatCounter value="100+" label="Projects Built" />
          </div>
        </div>
      </section>

      {/* 9. COLLABORATION PROCESS */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-20 max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#0F4CBA] uppercase tracking-widest">Steps</span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-955 tracking-tight">Collaboration Process</h2>
            <p className="text-slate-600 text-base max-w-xl mx-auto">
              Our streamlined onboarding ensures efficient scheduling and delivery.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-900/10 via-[#0F4CBA]/20 to-amber-400/10 transform -translate-y-1/2 z-0 hidden lg:block" />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
              {[
                { step: "Step 1", title: "Submit Request", desc: "Share details of your college, preferred domain, and mode in the request form." },
                { step: "Step 2", title: "Schedule Discussion", desc: "Our academic events lead schedules a 15-min call to lock details." },
                { step: "Step 3", title: "Customize Workshop", desc: "We customize the training syllabus and schedule around your calendar." },
                { step: "Step 4", title: "Execution", desc: "Conduct workshops with live code setups, models, and interactive tools." },
                { step: "Step 5", title: "Certificates & Feedback", desc: "Issue participation credentials and collect student review forms." }
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

      {/* 10. WORKSHOP REQUEST FORM */}
      <section id="workshop-form" className="py-24 px-6 max-w-3xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative text-left">
          
          <div className="absolute top-6 right-8 text-blue-900/10 pointer-events-none">
            <Rocket className="w-12 h-12" />
          </div>
          
          <div className="mb-8 space-y-3">
            <h2 className="text-2xl md:text-3xl font-black text-blue-955 tracking-tight">Request a Campus Workshop</h2>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Provide your details below to submit your training session request. Fields marked with <span className="text-red-500 font-extrabold">*</span> are required.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Grid 1: Institution & Contact Person */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Institution Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="institutionName"
                  value={formData.institutionName}
                  onChange={handleChange}
                  placeholder="e.g. IIT Delhi"
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
                  placeholder="e.g. Prof. Alok Patel"
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
                  placeholder="e.g. HOD / Student Club Lead"
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
                  placeholder="name@institution.org"
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
                  placeholder="e.g. +91 9876543210"
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
                  placeholder="e.g. Bangalore, Karnataka"
                  className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-1 transition-all ${
                    formErrors.location ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#0F4CBA] focus:ring-[#0F4CBA]'
                  }`}
                />
                {formErrors.location && <p className="text-[10px] font-bold text-red-500">{formErrors.location}</p>}
              </div>
            </div>

            {/* Selection Dropdown & Audience */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Workshop Type <span className="text-red-500">*</span></label>
                <select
                  name="workshopType"
                  value={formData.workshopType}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-1 bg-white transition-all ${
                    formErrors.workshopType ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#0F4CBA] focus:ring-[#0F4CBA]'
                  }`}
                >
                  <option value="">-- Select Category --</option>
                  <option value="AI & Machine Learning">AI & Machine Learning</option>
                  <option value="Generative AI">Generative AI</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Cyber Security">Cyber Security</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                  <option value="Career Development">Career Development</option>
                  <option value="Custom Workshop">Custom Workshop</option>
                </select>
                {formErrors.workshopType && <p className="text-[10px] font-bold text-red-500">{formErrors.workshopType}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Audience Size <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="audienceSize"
                  value={formData.audienceSize}
                  onChange={handleChange}
                  placeholder="e.g. 150+ Students"
                  className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-1 transition-all ${
                    formErrors.audienceSize ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#0F4CBA] focus:ring-[#0F4CBA]'
                  }`}
                />
                {formErrors.audienceSize && <p className="text-[10px] font-bold text-red-500">{formErrors.audienceSize}</p>}
              </div>
            </div>

            {/* Mode Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Preferred Mode <span className="text-red-500">*</span></label>
              <div className="flex gap-4 pt-1">
                {["Online", "Offline", "Hybrid"].map(mode => (
                  <label key={mode} className="flex items-center gap-1.5 cursor-pointer text-sm font-semibold text-slate-700">
                    <input 
                      type="radio" 
                      name="preferredMode" 
                      value={mode}
                      checked={formData.preferredMode === mode}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#0F4CBA] border-slate-300 focus:ring-[#0F4CBA]"
                    />
                    {mode}
                  </label>
                ))}
              </div>
              {formErrors.preferredMode && <p className="text-[10px] font-bold text-red-500">{formErrors.preferredMode}</p>}
            </div>

            {/* Custom Message */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Message / Context Details</label>
              <textarea 
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Include custom syllabus suggestions, scheduling plans, or campus lab details..."
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
                  Request Workshop
                </>
              )}
            </button>

          </form>
        </div>
      </section>

      {/* 11. FAQ SECTION */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-left">
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-bold text-[#0F4CBA] uppercase tracking-widest">Common Questions</span>
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

      {/* 12. FINAL CTA */}
      <section className="py-24 bg-white border-t border-slate-200/50 relative">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-50/60 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-blue-955">
            Bring AI & Emerging Technologies to Your Campus
          </h2>
          <p className="text-slate-600 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Partner with TechieHelp Institute of AI to organize impactful workshops and seminars that prepare students for the future.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => scrollToSection("workshop-form")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#0F4CBA] hover:bg-blue-900 text-white font-bold text-base shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all"
            >
              Request Workshop
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
