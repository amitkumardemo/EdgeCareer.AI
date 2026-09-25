"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Code2,
  FileText,
  FileCheck,
  Github,
  Linkedin,
  Sparkles,
  Zap,
  BookOpen,
  Briefcase,
  GraduationCap,
  Award,
  Users,
  Terminal,
  Globe,
  Trophy,
  BarChart3,
  Cpu,
  Layers,
  ShieldCheck,
  Check,
  X,
  MessageSquare,
  Star,
  ExternalLink,
  Laptop,
  HelpCircle,
  Clock,
  ChevronRight,
  ChevronLeft,
  UserCheck,
  TrendingUp,
  AlertCircle,
  Play,
  CheckSquare,
  QrCode
} from "lucide-react";
import { toast } from "sonner";
import {
  certificate,
  recommendation,
  aarshdeepcertificate,
  aarshdeepdiary,
  aarshdeeptrophy,
  groups,
  hod,
  rohitdiary,
  rohittrophy,
  simrancertificate,
  simrandiary,
  simrantrophy,
  simrantshirt,
  aryan1,
  aryan2,
  sixty,
  coreTeam,
  amazad,
  tit,
  delhiJudge,
  recon,
  kitInt,
  kit,
  kitNodha,
  kitCert
} from "@/components/assets";

export default function Build2EarnClient() {
  const [selectedDomain, setSelectedDomain] = useState("web-dev");
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDomain, setModalDomain] = useState("Web Development");
  const [activeHeroTab, setActiveHeroTab] = useState("linkedin");
  const [activeRoadmapTab, setActiveRoadmapTab] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);

  // Campus Photos Gallery Slide Bar State (Manual Navigation Only)
  const [gallerySlideIndex, setGallerySlideIndex] = useState(0);

  const campusPhotos = [
    { src: "/hero-slides/goodies_kit.jpg", title: "Official TechieHelp T-Shirts, Hoodies & Welcome Goodies Kit" },
    { src: "/hero-slides/id_cards_lanyards.jpg", title: "Official TechieHelp Employee & Intern ID Cards & Lanyards" },
    { src: "/hero-slides/gift_box.jpg", title: "TechieHelp Executive Diary, Pen & Stainless Water Bottle Kit" },
    { src: "/hero-slides/tshirt_gift.jpg", title: "Student Receiving Official TechieHelp Goodies & Internship Kit" },
    { src: "/hero-slides/technocrats_certificates.jpg", title: "Technocrats Students Displaying Official TechieHelp Internship Certificates" },
    { src: "/hero-slides/single_cert_handover.jpg", title: "TechieHelp Official Internship Completion Certificate Awarding" },
    { src: "/hero-slides/thumbs_up_team.jpg", title: "TechieHelp Student Developers Event & Certificate Celebration" },
    { src: "/hero-slides/hackloop_awards.jpg", title: "HackLoop Hackathon Winners & Award Ceremony Group Photo" },
    { src: "/hero-slides/principal_trophy.jpg", title: "TechieHelp Academic Excellence & Trophy Presentation" },
    { src: "/hero-slides/certificate_handover.jpg", title: "TechieHelp Internship Completion Certificate Awarding" },
    { src: "/hero-slides/backbone_team.jpg", title: "Backbone of TechieHelp — The Team Behind The Vision" },
    { src: "/hero-slides/team_steps.jpg", title: "TechieHelp Campus Team & Student Developers" },
    { src: "/hero-slides/celebration_balloons.jpg", title: "TechieHelp Team Flag & Independence Day Celebration" },
    { src: "/hero-slides/award_ceremony.jpg", title: "TechieHelp Performance Award & Recognition Ceremony" },
    { src: "/hero-slides/team_celebration.jpg", title: "TechieHelp Student Developers & Interns Team" },
    { src: "/hero-slides/slide1.jpg", title: "TechieHelp AI Office Team & MSME Certification" },
    { src: "/hero-slides/slide2.jpg", title: "Jodhpur Institute of Engineering & Technology Campus" },
    { src: "/hero-slides/slide3.jpg", title: "Live Mentorship & Project Evaluation Workspace" },
    { src: "/hero-slides/slide4.jpg", title: "Student Mock Interviews & Placement Support" },
    { src: "/hero-slides/slide5.jpg", title: "TechieHelp AI Learning Hub & Workspaces" }
  ];

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    year: "1st Year",
    domain: "Web Development",
    linkedin: "",
    github: "",
    source: "Social Media / Friend"
  });

  const CASHFREE_PAYMENT_URL = "https://payments.cashfree.com/forms/Build2Earn";

  const handleOpenModal = (domainName = "Web Development") => {
    setModalDomain(domainName);
    setFormData((prev) => ({ ...prev, domain: domainName }));
    setIsSubmitted(false);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.college) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setIsSubmitted(true);
    toast.success("Application details saved! Redirecting to Cashfree Payment Gateway...");
    setTimeout(() => {
      window.open(CASHFREE_PAYMENT_URL, "_blank");
    }, 800);
  };

  const domainsList = [
    {
      id: "web-dev",
      name: "Web Development",
      icon: Globe,
      desc: "Build modern responsive web applications with React, Next.js, and API integrations.",
      project: "Full-Stack Web App + Portfolio Integration",
      stack: ["HTML5/CSS3", "JavaScript", "React.js", "Tailwind CSS", "Vercel"],
      roles: ["Frontend Developer", "Web Application Developer"],
      color: "from-blue-600 to-cyan-500",
      accent: "#2563EB"
    },
    {
      id: "aiml",
      name: "AI & Machine Learning",
      icon: Cpu,
      desc: "Develop predictive AI models, clean datasets, and build data-driven intelligent apps.",
      project: "Predictive AI Model & Interactive Dashboard",
      stack: ["Python", "Scikit-Learn", "Pandas", "Streamlit", "Jupyter"],
      roles: ["AI Trainee", "ML Associate"],
      color: "from-indigo-600 to-purple-500",
      accent: "#4F46E5"
    },
    {
      id: "genai",
      name: "Generative AI & AI Agents",
      icon: Sparkles,
      desc: "Leverage LLMs, RAG workflows, and build autonomous AI agents using prompt engine architecture.",
      project: "LLM-Powered Multi-Agent AI Tool",
      stack: ["LangChain", "OpenAI API", "Python", "Vector DBs", "Streamlit"],
      roles: ["GenAI Developer", "AI Tooling Specialist"],
      color: "from-cyan-500 to-[#1D4ED8]",
      accent: "#06B6D4"
    },
    {
      id: "python",
      name: "Python Automation & Scripting",
      icon: Terminal,
      desc: "Master Python programming to automate workflows, build APIs, and construct data web scrapers.",
      project: "Automated Data Scraper & Task Automation Suite",
      stack: ["Python 3", "BeautifulSoup", "FastAPI", "Requests", "Automation"],
      roles: ["Python Developer", "Backend Trainee"],
      color: "from-amber-500 to-orange-600",
      accent: "#F59E0B"
    },
    {
      id: "datascience",
      name: "Data Science & Analytics",
      icon: BarChart3,
      desc: "Transform raw metrics into actionable insights using statistical modeling and visual dashboards.",
      project: "End-to-End Business Data Analytics Case Study",
      stack: ["Python", "SQL", "PowerBI / Tableau", "Seaborn", "Excel"],
      roles: ["Data Analyst Trainee", "Business Intelligence Associate"],
      color: "from-blue-700 to-indigo-600",
      accent: "#1D4ED8"
    },
    {
      id: "cybersecurity",
      name: "Cybersecurity Basics",
      icon: ShieldCheck,
      desc: "Understand network security fundamentals, vulnerability analysis, and security auditing.",
      project: "Vulnerability Assessment & Security Audit Tool",
      stack: ["Wireshark", "Nmap", "Linux CLI", "Security Auditing"],
      roles: ["Security Analyst Trainee", "Junior Penetration Tester"],
      color: "from-rose-600 to-red-500",
      accent: "#E11D48"
    },
    {
      id: "app-dev",
      name: "App Development",
      icon: Laptop,
      desc: "Build cross-platform mobile applications with smooth native UX and API connections.",
      project: "Cross-Platform React Native App",
      stack: ["React Native", "Expo", "JavaScript", "Firebase API"],
      roles: ["Mobile App Developer", "React Native Trainee"],
      color: "from-emerald-600 to-teal-500",
      accent: "#059669"
    },
    {
      id: "devops",
      name: "Cloud & DevOps",
      icon: Layers,
      desc: "Learn Git workflows, Docker containerization, CI/CD automation, and cloud deployment.",
      project: "Automated Docker & CI/CD Cloud Pipeline",
      stack: ["Docker", "Git/GitHub", "AWS Basic", "Linux CLI", "GitHub Actions"],
      roles: ["DevOps Trainee", "Cloud Support Associate"],
      color: "from-blue-600 to-indigo-600",
      accent: "#2563EB"
    },
    {
      id: "uiux",
      name: "UI/UX & Product Design",
      icon: Award,
      desc: "Design modern user interfaces, create high-fidelity Figma prototypes, and conduct UX research.",
      project: "Interactive Mobile App UX Design System & Figma Prototype",
      stack: ["Figma", "Wireframing", "Design Systems", "User Journeys"],
      roles: ["UI/UX Designer", "Product Design Trainee"],
      color: "from-purple-600 to-pink-500",
      accent: "#9333EA"
    }
  ];

  const faqList = [
    {
      q: "Who can join Build2Earn?",
      a: "The program is specifically tailored for 1st and 2nd year college students who want to build their professional assets, GitHub, LinkedIn, and real projects early before reaching their final year placement season."
    },
    {
      q: "Is this program only for coding students?",
      a: "No! We offer technical tracks (Web Dev, AI/ML, Data Science, Python, DevOps) as well as design tracks like UI/UX & Product Design. Non-tech students can easily join UI/UX or Data Science."
    },
    {
      q: "Is the program theory-based or practical?",
      a: "100% Practical. Every module is structured around execution. You don't just watch videos—you build live GitHub repositories, an optimized LinkedIn, a personal portfolio website, and real domain projects."
    },
    {
      q: "Is any job or income guaranteed after completing Build2Earn?",
      a: "No job placement or income outcome is guaranteed. Build2Earn is a skill-building, portfolio-building, and internship preparation program. We teach you how to create opportunities, apply for freelancing, and present proof of work."
    },
    {
      q: "Will I get certificates upon completion?",
      a: "Yes! Eligible students who satisfy program deliverables receive two official credentials: a Training Certificate and an Internship Certificate powered by TechieHelp Institute of AI."
    },
    {
      q: "How is the Letter of Recommendation (LOR) awarded?",
      a: "The LOR is performance-based and awarded to top-performing students who complete all practical milestones, maintain attendance, and submit high-quality domain projects."
    },
    {
      q: "What is the fee for the 3-month program?",
      a: "The fee is a one-time payment of ₹4,999. It includes 3 months of training, internship tasks, live mentorship, project guidance, and credentials."
    },
    {
      q: "Can I manage this along with my college classes & exams?",
      a: "Yes! The program is designed with flexible schedules and self-paced milestone submission windows so it fits smoothly alongside your college schedule."
    },
    {
      q: "Will I deploy a live personal portfolio website?",
      a: "Yes! Month 1 explicitly guides you step-by-step to design, build, and deploy your custom live portfolio website accessible on your own URL."
    },
    {
      q: "How do I clear my doubts during the program?",
      a: "You get access to dedicated live mentorship sessions, interactive doubt-clearing blocks, and our student community workspace."
    }
  ];

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#1D4ED8] selection:text-white relative overflow-x-hidden">

      {/* Import Caveat Handwriting Font & Marquee Scroll Keyframes */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap');
        .font-handwriting {
          font-family: 'Caveat', cursive;
        }
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex !important;
          animation: marqueeScroll 35s linear infinite !important;
        }
        .animate-scroll:hover {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* Decorative Grid Mesh & Ambient Glow Header */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-gradient-to-b from-[#1D4ED8]/10 via-[#0EA5E9]/5 to-transparent blur-3xl rounded-full" />
        <div className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] bg-[#1D4ED8]/5 blur-3xl rounded-full" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#0F172A 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      </div>

      <main className="relative z-10">

        {/* ==================== 1. FULL-BLEED HERO VIDEO WITH LAUNCHED TEXT OVERLAY ==================== */}
        <section className="w-full relative bg-slate-950 overflow-hidden min-h-[65vh] lg:min-h-[85vh] flex items-center justify-center">
          {/* Continuous Loop Background Video */}
          <video
            src="/home.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover block z-0 opacity-80"
          >
            Your browser does not support the video tag.
          </video>

          {/* Premium Dark Glassmorphism Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40 z-10 pointer-events-none" />

          {/* Hero Content Overlay */}
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center flex flex-col items-center justify-center">
            {/* Launched Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/30 text-blue-300 text-xs sm:text-sm font-extrabold border border-blue-400/40 backdrop-blur-md shadow-xl mb-6"
            >
              <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
              <span>TechieHelp Institute of AI Launched — Build2Earn Program</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.15] max-w-4xl drop-shadow-xl"
            >
              Build2Earn <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">3-Month Practical</span> Career Program
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-sm sm:text-lg lg:text-xl text-slate-200 font-medium max-w-2xl leading-relaxed drop-shadow-md"
            >
              Master In-Demand Tech Tracks, Build Production-Grade GitHub Repos, & Earn Official Industry Credentials. Tailored for 1st & 2nd Year Students.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <button
                onClick={() => handleOpenModal("Web Development")}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-base shadow-xl shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Enroll Now — ₹4,999</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href="#campus-gallery"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900/80 hover:bg-slate-900 text-slate-200 hover:text-white font-bold text-base border border-slate-700/80 backdrop-blur-md shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Explore Campus Slide Bar</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* STUDENT ACHIEVEMENTS & CERTIFICATION MOMENTS (Clean White Theme Image Marquee) */}
        <section id="build2earn-achievements" className="py-12 md:py-16 relative bg-white border-b border-slate-200/80 overflow-hidden">
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





        {/* ==================== 2. QUICK VALUE TICKER BAR ==================== */}
        <section className="bg-white border-y border-slate-200 py-6 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-200">

              <div className="pt-2 md:pt-0 md:pl-2 flex items-center gap-3 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-black text-slate-900">3 MONTHS</div>
                  <div className="text-[11px] font-semibold text-slate-500">Practical Program</div>
                </div>
              </div>

              <div className="pt-2 md:pt-0 md:pl-6 flex items-center gap-3 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold shrink-0 text-lg">
                  ₹
                </div>
                <div>
                  <div className="text-base font-black text-slate-900">₹4,999</div>
                  <div className="text-[11px] font-semibold text-slate-500">Complete Program</div>
                </div>
              </div>

              <div className="pt-2 md:pt-0 md:pl-6 flex items-center gap-3 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-black text-slate-900">2 CERTIFICATES</div>
                  <div className="text-[11px] font-semibold text-slate-500">Training + Internship</div>
                </div>
              </div>

              <div className="pt-2 md:pt-0 md:pl-6 flex items-center gap-3 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-black text-slate-900">LOR</div>
                  <div className="text-[11px] font-semibold text-slate-500">Performance-Based</div>
                </div>
              </div>

              <div className="pt-2 md:pt-0 md:pl-6 flex items-center gap-3 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-black text-slate-900">LIVE MENTORSHIP</div>
                  <div className="text-[11px] font-semibold text-slate-500">Practical Guidance</div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ==================== 2.5. CAMPUS & STUDENT GALLERY (MANUAL SLIDE BAR TRACK) ==================== */}
        <section id="campus-gallery" className="bg-slate-950 text-white py-12 md:py-16 border-y border-slate-800 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-extrabold text-xs uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Campus Life & Student Moments
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                TechieHelp AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Campus Gallery</span>
              </h2>
              <p className="text-slate-400 text-xs sm:text-base font-medium">
                Use the interactive slide bar below to explore photos from our campus development hub, mentorship sessions, and student evaluations.
              </p>
            </div>

            {/* Main Interactive Display Window */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-800/80 bg-slate-950 group">
              <div className="relative w-full h-[50vh] sm:h-[65vh] md:h-[75vh] lg:h-[80vh] flex items-center justify-center bg-slate-950 p-2 sm:p-4">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={gallerySlideIndex}
                    src={campusPhotos[gallerySlideIndex].src}
                    alt={campusPhotos[gallerySlideIndex].title}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="max-w-full max-h-full w-auto h-auto object-contain block mx-auto drop-shadow-2xl rounded-lg"
                  />
                </AnimatePresence>

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20 pointer-events-none" />

                {/* Photo Title & Slide Counter */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-3 z-10">
                  <div className="bg-slate-950/85 backdrop-blur-md px-4 py-2 rounded-xl border border-white/15 text-white text-xs sm:text-sm font-semibold shadow-lg max-w-lg">
                    {campusPhotos[gallerySlideIndex].title}
                  </div>
                  <div className="bg-blue-600/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-xs font-extrabold shadow-md">
                    Photo {gallerySlideIndex + 1} of {campusPhotos.length}
                  </div>
                </div>

                {/* Manual Navigation Buttons */}
                <button
                  onClick={() =>
                    setGallerySlideIndex(
                      (prev) => (prev - 1 + campusPhotos.length) % campusPhotos.length
                    )
                  }
                  aria-label="Previous Photo"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all z-20 shadow-xl"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() =>
                    setGallerySlideIndex((prev) => (prev + 1) % campusPhotos.length)
                  }
                  aria-label="Next Photo"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all z-20 shadow-xl"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* INTERACTIVE MANUAL SLIDE BAR TRACK WITH THUMBNAILS */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col items-center gap-3">
              <div className="flex items-center justify-between w-full text-xs text-slate-400 font-bold px-1">
                <span>SLIDE BAR TRACK</span>
                <span>Click any slide to jump</span>
              </div>

              {/* Horizontal Scrollable Slide Bar */}
              <div className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-slate-800">
                <div className="flex items-center gap-3 min-w-max mx-auto px-1">
                  {campusPhotos.map((photo, idx) => (
                    <button
                      key={idx}
                      onClick={() => setGallerySlideIndex(idx)}
                      className={`relative rounded-xl overflow-hidden transition-all duration-300 group shrink-0 bg-slate-950 ${idx === gallerySlideIndex
                          ? "ring-2 ring-blue-500 scale-105 opacity-100 shadow-lg shadow-blue-500/20"
                          : "opacity-60 hover:opacity-100 hover:scale-102"
                        }`}
                    >
                      <img
                        src={photo.src}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-20 sm:w-28 md:w-36 h-16 sm:h-20 md:h-24 object-contain bg-slate-900 p-1 block"
                      />
                      <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors" />
                      <div className="absolute bottom-1 right-1 bg-slate-950/80 text-[10px] text-white px-1.5 py-0.5 rounded font-bold">
                        #{idx + 1}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ==================== 3. PROCESS AFTER REGISTRATION (STEP-BY-STEP JOURNEY) ==================== */}
        <section id="process" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 space-y-2.5 relative">

            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-100/90 border border-blue-200 text-[#2563EB] font-black text-xs uppercase tracking-wider shadow-2xs">
              <FileText className="w-3.5 h-3.5 text-[#2563EB]" /> PROCESS AFTER REGISTRATION
            </div>

            {/* Headline with Yellow Accent Sparks */}
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight relative inline-block">
              Your Journey to Success <span className="text-[#2563EB] relative">Starts Here</span>
              {/* Decorative Yellow Sparks Accent SVG */}
              <svg className="absolute -top-4 -right-8 w-8 h-8 text-amber-400 stroke-current hidden sm:block" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.364-6.364l-2.121 2.121M7.757 16.243l-2.121 2.121m12.728 0l-2.121-2.121M7.757 7.757L5.636 5.636" />
              </svg>
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-base text-slate-600 font-medium max-w-2xl mx-auto">
              Follow these simple steps after completing your <strong className="text-slate-900">Build2Earn registration</strong> to activate your account and start your career journey with TechieHelp.
            </p>
          </div>

          {/* Side-by-Side Main Container (Left: Laptop Visual, Right: Timeline Card) */}
          <div className="relative">
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">

              {/* LEFT COLUMN: LAPTOP GRAPHIC WITH ANNOTATION */}
              <div className="lg:col-span-6 relative">

                {/* Handwritten Callout on Top Left */}
                <div className="absolute -top-6 -left-4 z-20 font-handwriting text-lg sm:text-xl font-bold text-blue-600 -rotate-12 hidden sm:flex items-center gap-1.5">
                  <span>Create your account in seconds</span>
                  <svg className="w-6 h-6 text-blue-600 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>

                {/* MacBook Laptop Container Mockup */}
                <div className="relative mx-auto max-w-[560px]">
                  {/* Laptop Screen Bezel */}
                  <div className="relative bg-slate-900 p-2 sm:p-3 rounded-t-3xl border-t-2 border-x-2 border-slate-700 shadow-2xl">
                    <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                      <Image
                        src="/registration_step_1.jpg"
                        alt="Step 1: Login to your account"
                        width={900}
                        height={520}
                        className="w-full h-auto object-cover rounded-xl"
                        priority
                      />
                    </div>
                  </div>
                  {/* Laptop Base Stand */}
                  <div className="relative bg-slate-300 h-4 rounded-b-2xl border-t border-slate-400 shadow-md flex items-center justify-center">
                    <div className="w-16 h-1 bg-slate-400 rounded-full" />
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: STEP 1 TIMELINE CARD */}
              <div className="lg:col-span-6">

                <div className="bg-white/95 backdrop-blur-md border border-blue-100 rounded-3xl p-6 sm:p-7 shadow-lg shadow-blue-500/5 space-y-4">

                  {/* Card Header & Badges */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-3.5 py-1 rounded-full bg-[#2563EB] text-white font-extrabold text-xs shadow-xs uppercase tracking-wider">
                        STEP 1
                      </span>
                      <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-extrabold text-xs">
                        Onboarding
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2">
                      Login to <span className="text-[#2563EB]">your account</span> ✨
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                      Create your TechieHelp account using Google or your email to access all career tools, internships, projects and opportunities.
                    </p>
                  </div>

                  {/* Vertical Timeline Steps */}
                  <div className="relative pl-3 space-y-4 pt-1">

                    {/* Dashed Connecting Vertical Line */}
                    <div className="absolute left-[27px] top-6 bottom-6 w-0.5 border-l-2 border-dashed border-blue-200 pointer-events-none" />

                    {/* Step Item 1 */}
                    <div className="relative flex items-start gap-4 z-10">
                      <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-black text-base shrink-0 shadow-2xs">
                        <span className="text-sm font-black text-blue-600">G</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900">Continue with Google</h4>
                        <p className="text-xs text-slate-500 font-medium">Click on "Continue with Google" for quick and easy access.</p>
                      </div>
                    </div>

                    {/* Step Item 2 */}
                    <div className="relative flex items-start gap-4 z-10">
                      <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0 shadow-2xs">
                        <MessageSquare className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900">Or use Email & Password</h4>
                        <p className="text-xs text-slate-500 font-medium">Enter your registered email and password manually.</p>
                      </div>
                    </div>

                    {/* Step Item 3 */}
                    <div className="relative flex items-start gap-4 z-10">
                      <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0 shadow-2xs">
                        <ArrowRight className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900">Click on Sign In</h4>
                        <p className="text-xs text-slate-500 font-medium">After entering details, click "Sign In" to open your dashboard.</p>
                      </div>
                    </div>

                  </div>

                  {/* Primary CTA Row + Annotation */}
                  <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <a
                      href={CASHFREE_PAYMENT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3.5 rounded-2xl bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold text-sm shadow-md shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group min-w-[210px]"
                    >
                      <span>Create Your Account</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>

                    <div className="font-handwriting text-base font-bold text-blue-600 flex items-center gap-1.5">
                      <svg className="w-5 h-5 text-blue-600 stroke-current -scale-x-100" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                      <span>It takes less than 1 minute!</span>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* BOTTOM STEPPER PROGRESS BAR (STEPS 1 TO 7) */}
          <div className="mt-10 bg-white/80 backdrop-blur-md border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs overflow-x-auto">
            <div className="flex items-center justify-between min-w-[850px] gap-2">

              {/* Step 1 (Active) */}
              <div className="flex items-center gap-3 bg-blue-50/80 border border-blue-200 px-4 py-2.5 rounded-2xl shrink-0">
                <span className="w-7 h-7 rounded-full bg-[#2563EB] text-white font-black text-xs flex items-center justify-center shadow-2xs">1</span>
                <div>
                  <div className="text-xs font-black text-blue-600">Login</div>
                  <div className="text-[10px] font-semibold text-slate-500">Create your account</div>
                </div>
              </div>

              <span className="text-slate-300 font-bold">➔</span>

              {/* Step 2 */}
              <div className="flex items-center gap-3 px-3 py-2 shrink-0">
                <span className="w-7 h-7 rounded-full bg-slate-100 border border-slate-300 text-slate-500 font-black text-xs flex items-center justify-center">2</span>
                <div>
                  <div className="text-xs font-bold text-slate-700">Complete Profile</div>
                  <div className="text-[10px] font-semibold text-slate-400">Add your details</div>
                </div>
              </div>

              <span className="text-slate-300 font-bold">➔</span>

              {/* Step 3 */}
              <div className="flex items-center gap-3 px-3 py-2 shrink-0">
                <span className="w-7 h-7 rounded-full bg-slate-100 border border-slate-300 text-slate-500 font-black text-xs flex items-center justify-center">3</span>
                <div>
                  <div className="text-xs font-bold text-slate-700">AI Assessment</div>
                  <div className="text-[10px] font-semibold text-slate-400">Know your strengths</div>
                </div>
              </div>

              <span className="text-slate-300 font-bold">➔</span>

              {/* Step 4 */}
              <div className="flex items-center gap-3 px-3 py-2 shrink-0">
                <span className="w-7 h-7 rounded-full bg-slate-100 border border-slate-300 text-slate-500 font-black text-xs flex items-center justify-center">4</span>
                <div>
                  <div className="text-xs font-bold text-slate-700">Build Skills</div>
                  <div className="text-[10px] font-semibold text-slate-400">Learn & practice</div>
                </div>
              </div>

              <span className="text-slate-300 font-bold">➔</span>

              {/* Step 5 */}
              <div className="flex items-center gap-3 px-3 py-2 shrink-0">
                <span className="w-7 h-7 rounded-full bg-slate-100 border border-slate-300 text-slate-500 font-black text-xs flex items-center justify-center">5</span>
                <div>
                  <div className="text-xs font-bold text-slate-700">Gain Experience</div>
                  <div className="text-[10px] font-semibold text-slate-400">Internships & projects</div>
                </div>
              </div>

              <span className="text-slate-300 font-bold">➔</span>

              {/* Step 6 */}
              <div className="flex items-center gap-3 px-3 py-2 shrink-0">
                <span className="w-7 h-7 rounded-full bg-slate-100 border border-slate-300 text-slate-500 font-black text-xs flex items-center justify-center">6</span>
                <div>
                  <div className="text-xs font-bold text-slate-700">Get Career Ready</div>
                  <div className="text-[10px] font-semibold text-slate-400">Mock interviews & resume</div>
                </div>
              </div>

              <span className="text-slate-300 font-bold">➔</span>

              {/* Step 7 */}
              <div className="flex items-center gap-3 px-3 py-2 shrink-0">
                <span className="w-7 h-7 rounded-full bg-slate-100 border border-slate-300 text-slate-500 font-black text-xs flex items-center justify-center">7</span>
                <div>
                  <div className="text-xs font-bold text-slate-700">Explore Opportunities</div>
                  <div className="text-[10px] font-semibold text-slate-400">Apply & grow</div>
                </div>
              </div>

            </div>
          </div>

        </section>


        {/* ==================== 4. PHILOSOPHY / 4-STEP ENGINE ==================== */}
        <section id="program" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-[#1D4ED8]">The 4-Step Framework</div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Learn Less Theory. <span className="text-[#1D4ED8]">Build More Assets.</span>
            </h2>
            <p className="text-base text-slate-600">
              Build2Earn follows a practical 4-step execution framework designed for immediate impact.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", title: "LEARN", text: "Master core practical concepts and AI workflows without spending months on passive video tutorials.", color: "bg-blue-600", icon: Terminal },
              { num: "02", title: "BUILD", text: "Apply your skills directly by constructing real, functional domain projects with clean documentation.", color: "bg-purple-600", icon: Code2 },
              { num: "03", title: "SHOWCASE", text: "Publish your work publicly on LinkedIn, GitHub, and your personal portfolio website to build social proof.", color: "bg-sky-600", icon: Globe },
              { num: "04", title: "EARN", text: "Learn how to monetize tech skills through freelancing gigs, open source bento, and client projects.", color: "bg-emerald-600", icon: Zap }
            ].map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 hover:border-blue-400 transition-all hover:shadow-lg group">
                  <div className="flex items-center justify-between">
                    <span className={`w-10 h-10 rounded-xl ${step.color} text-white flex items-center justify-center font-bold text-sm shadow-md`}>
                      {step.num}
                    </span>
                    <StepIcon className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.text}</p>
                </div>
              );
            })}
          </div>
        </section>


        {/* ==================== 5. WHAT WILL YOU BUILD (8 CORE DELIVERABLE ASSETS - BENTO GRID) ==================== */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-[#1D4ED8]">Practical Outputs</div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              8 Tangible Assets You Will Build in 90 Days
            </h2>
            <p className="text-base text-slate-600">
              When you complete Build2Earn, you won't just have certificates—you'll have an entire ecosystem of career proof.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Card 1: LinkedIn Profile */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 hover:shadow-xl transition-all flex flex-col justify-between border-t-4 border-t-blue-600">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-full">ASSET #1</span>
                  <Linkedin className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">LinkedIn Career Profile</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Optimized bio, headline, banner, project showcases, and connection strategy to attract recruiters early.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Recruiter-Ready Profile
              </div>
            </div>

            {/* Card 2: GitHub Proof of Work */}
            <div className="bg-[#0F172A] text-white rounded-3xl p-6 space-y-4 hover:shadow-xl transition-all flex flex-col justify-between border-t-4 border-t-purple-500">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest bg-purple-950 px-2.5 py-1 rounded-full border border-purple-800">ASSET #2</span>
                  <Github className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white">GitHub Proof of Work</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Clean repositories, customized READMEs, green contribution matrix, and proper Git commit practices.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-800 text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Active GitHub Matrix
              </div>
            </div>

            {/* Card 3: Live Personal Portfolio Website */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 hover:shadow-xl transition-all flex flex-col justify-between border-t-4 border-t-cyan-500">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-cyan-700 uppercase tracking-widest bg-cyan-50 px-2.5 py-1 rounded-full">ASSET #3</span>
                  <Globe className="w-6 h-6 text-cyan-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Live Portfolio Website</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your custom personal website deployed live on Vercel/Netlify displaying your bio, projects, and contact links.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Deployed Live Website
              </div>
            </div>

            {/* Card 4: Domain Projects */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 hover:shadow-xl transition-all flex flex-col justify-between border-t-4 border-t-amber-500">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest bg-amber-50 px-2.5 py-1 rounded-full">ASSET #4</span>
                  <Code2 className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Real Domain Projects</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Projects built in Web Dev, AI/ML, Data Science, or Python with live links and clean codebases.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Published Domain Code
              </div>
            </div>

            {/* Card 5: Hackathon Readiness */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 hover:shadow-xl transition-all flex flex-col justify-between border-t-4 border-t-rose-500">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-rose-700 uppercase tracking-widest bg-rose-50 px-2.5 py-1 rounded-full">ASSET #5</span>
                  <Trophy className="w-6 h-6 text-rose-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Hackathon Pitch Kit</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Team setup, fast MVP building, demo pitching skills, and registering for national student hackathons.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Hackathon-Ready MVP
              </div>
            </div>

            {/* Card 6: Open Source Contribution */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 hover:shadow-xl transition-all flex flex-col justify-between border-t-4 border-t-teal-500">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-teal-700 uppercase tracking-widest bg-teal-50 px-2.5 py-1 rounded-full">ASSET #6</span>
                  <Users className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Open Source Pathway</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  How to find beginner open-source issues, create pull requests, and contribute to public repositories.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> First PR Contribution
              </div>
            </div>

            {/* Card 7: Freelancing Foundation */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 hover:shadow-xl transition-all flex flex-col justify-between border-t-4 border-t-indigo-500">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-widest bg-indigo-50 px-2.5 py-1 rounded-full">ASSET #7</span>
                  <Briefcase className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Freelancing Service Pack</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Packaging your skill into a freelancing service, proposal templates, pricing strategy, and client communication.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Service Offer Blueprint
              </div>
            </div>

            {/* Card 8: AI Productivity Stack */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 hover:shadow-xl transition-all flex flex-col justify-between border-t-4 border-t-emerald-500">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-2.5 py-1 rounded-full">ASSET #8</span>
                  <Cpu className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">AI Productivity Workflow</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Using ChatGPT, Claude, and GitHub Copilot for code assistance, debugging, research, and faster development.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> 5x AI Coding Workflow
              </div>
            </div>

          </div>
        </section>


        {/* ==================== 6. DOMAIN TRACKS SELECTOR ==================== */}
        <section id="domains" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-[#1D4ED8]">Specializations</div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Choose Your Practical Domain Track
            </h2>
            <p className="text-base text-slate-600">
              Pick a domain based on your interest. You'll master the fundamentals and build a live domain project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {domainsList.map((dom) => {
              const DomIcon = dom.icon;
              const isSelected = selectedDomain === dom.id;
              return (
                <div
                  key={dom.id}
                  onClick={() => setSelectedDomain(dom.id)}
                  className={`cursor-pointer rounded-3xl p-6 border-2 transition-all flex flex-col justify-between ${isSelected
                    ? "bg-white border-[#1D4ED8] shadow-xl scale-[1.02]"
                    : "bg-white border-slate-200 hover:border-slate-300"
                    }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${dom.color} text-white flex items-center justify-center shadow-md`}>
                        <DomIcon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                        90-Day Track
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{dom.name}</h3>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{dom.desc}</p>
                    </div>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {dom.stack.map((tech, idx) => (
                        <span key={idx} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-6 border-t border-slate-100 space-y-3">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Target Project Output</div>
                      <div className="text-xs font-bold text-[#1D4ED8] mt-0.5">{dom.project}</div>
                    </div>
                    <a
                      href={CASHFREE_PAYMENT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${isSelected
                        ? "bg-[#1D4ED8] text-white shadow-md hover:bg-blue-700"
                        : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                        }`}
                    >
                      <span>Apply for {dom.name}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>


        {/* ==================== 7. 90-DAY ROADMAP TABS ==================== */}
        <section id="roadmap" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-[#1D4ED8]">Curriculum Blueprint</div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              The 90-Day Step-by-Step Execution Plan
            </h2>
            <p className="text-base text-slate-600">
              Clear weekly objectives so you never feel lost or overwhelmed.
            </p>
          </div>

          {/* Month Tabs Switcher */}
          <div className="flex justify-center gap-3 mb-10">
            {[
              { month: 1, title: "MONTH 1: Digital Foundation", subtitle: "LinkedIn, GitHub & Live Portfolio" },
              { month: 2, title: "MONTH 2: Domain Masterclass", subtitle: "Deep Practical Project Building" },
              { month: 3, title: "MONTH 3: Career Launchpad", subtitle: "Freelancing, Open Source & Bounties" }
            ].map((tab) => (
              <button
                key={tab.month}
                onClick={() => setActiveRoadmapTab(tab.month)}
                suppressHydrationWarning
                className={`px-5 py-3 rounded-2xl text-left transition-all border ${activeRoadmapTab === tab.month
                  ? "bg-[#1D4ED8] text-white border-[#1D4ED8] shadow-lg"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                  }`}
              >
                <div className="text-xs font-bold opacity-80">Phase 0{tab.month}</div>
                <div className="text-sm font-black">{tab.title}</div>
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            {activeRoadmapTab === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-[#1D4ED8] border border-blue-200">
                    WEEKS 1 TO 4
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-2">Building Your Digital Brand & Proof of Work</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center text-xs">1</span>
                      Week 1: Mindset & Career Positioning
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Setting up your developer roadmap, choosing your primary domain track, and understanding AI-assisted learning.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center text-xs">2</span>
                      Week 2: Recruiter-Ready LinkedIn Profile
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Writing high-converting headlines, optimizing your About section, adding featured projects, and networking with tech creators.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center text-xs">3</span>
                      Week 3: GitHub & Git Version Control
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Mastering Git CLI commands, creating clean repository README files, customized GitHub profile README, and commit habits.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center text-xs">4</span>
                      Week 4: Deploying Live Portfolio Website
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Designing and building your personal portfolio website. Deploying live to Vercel/Netlify with custom domain integration.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeRoadmapTab === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                    WEEKS 5 TO 8
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-2">Deep Domain Execution & Real Projects</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">5</span>
                      Week 5: Core Domain Architecture
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Deep dive into selected domain concepts (React/Next.js for Web Dev, Scikit-Learn/Python for AI/ML, Figma for UI/UX).
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">6</span>
                      Week 6: AI-Assisted Development Workflow
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Integrating Claude & Cursor AI tools into your daily workflow to write code faster, fix bugs, and design architectures.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">7</span>
                      Week 7: Building Capstone Project MVP
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Hands-on execution of your domain project. Implementing APIs, database connections, UI components, or AI models.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">8</span>
                      Week 8: Project Polishing & Documentation
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Writing comprehensive project README documentation, recording demo videos, and publishing code on GitHub.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeRoadmapTab === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    WEEKS 9 TO 12
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-2">Monetization, Hackathons & Open Source</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">9</span>
                      Week 9: Hackathon Strategy & Team Pitch
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Finding national & global hackathons (Devpost, Unstop), forming teams, rapid ideation, and pitch presentation tricks.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">10</span>
                      Week 10: Open Source Contributions
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Discovering "Good First Issue" tags on GitHub open-source repositories and submitting your first Pull Request (PR).
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">11</span>
                      Week 11: Freelancing Setup & Client Pitching
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Packaging your skills into freelance services (e.g. Website Building, Data Cleaning, UI Design), proposal templates, and pricing.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">12</span>
                      Week 12: Certification & Future Placement Prep
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Final evaluation, awarding Training & Internship Certificates, performance-based LOR review, and long-term career planning.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>


        {/* ==================== 7.1 STUDENT REVIEWS & SUCCESS STORIES ==================== */}
        <section id="student-reviews" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
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
        </section>


        {/* ==================== 7.2 COMPLETION CERTIFICATE ==================== */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
          <div className="grid lg:grid-cols-12 gap-12 items-center">

            {/* Left: Certificate Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-slate-100 group">
                <Image
                  src={certificate?.src || certificate}
                  alt="Completion Certificate"
                  width={600}
                  height={420}
                  className="w-full h-auto object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-white/80 shadow-lg flex items-center justify-between text-xs font-bold text-slate-800">
                  <span className="flex items-center gap-2 text-blue-600">
                    <QrCode className="w-4 h-4" /> QR Code Verified
                  </span>
                  <span className="bg-emerald-500 text-white px-2.5 py-1 rounded-lg text-[10px] font-black uppercase">
                    OFFICIAL CREDENTIAL
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Certificate Info & Verification Points */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] font-bold text-xs uppercase">
                <Award className="w-4 h-4 text-[#2563EB]" /> Official Recognition
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Completion Certificate
              </h2>

              <p className="text-base text-slate-600 leading-relaxed font-medium">
                We provide an industry-recognized certification that validates your skills, internship experience, and project work through verified and trusted channels.
              </p>

              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-1">
                <h3 className="text-lg font-extrabold text-slate-900">TechieHelp Career & Internship Completion Certificate</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Issued after successful completion of training, projects, and milestone assessments. Designed to validate real skills for recruiters and institutions.
                </p>
              </div>

              {/* Trust Points */}
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider text-[#2563EB]">Trust & Verification Points</h4>
                <div className="grid sm:grid-cols-2 gap-3 text-xs font-bold text-slate-700">
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                    <span>National Internship Portal Listed</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                    <span>AICTE-Recognized Internship Program</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <QrCode className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                    <span>QR Code Scanner Verification</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <ShieldCheck className="w-4.5 h-4.5 text-sky-600 shrink-0" />
                    <span>Public Profile TechieHelp Verification</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <Award className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                    <span>Unique Certificate ID for Every Intern</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <Clock className="w-4.5 h-4.5 text-purple-600 shrink-0" />
                    <span>Linked to Duration & Projects Completed</span>
                  </div>
                </div>
              </div>

              {/* Notice Box */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center shrink-0 font-black text-sm">
                  💡
                </span>
                <span>Every certificate can be instantly verified by scanning the QR code or visiting the intern's public profile on TechieHelp.</span>
              </div>
            </div>

          </div>
        </section>


        {/* ==================== 7.3 RECOMMENDATION LETTER (PLACEMENT SUPPORT) ==================== */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
          <div className="grid lg:grid-cols-12 gap-12 items-center">

            {/* Left: Recommendation Letter Info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs uppercase">
                <FileCheck className="w-4 h-4 text-emerald-600" /> Placement Acceleration
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Recommendation Letter <span className="text-[#2563EB]">(Placement Support)</span>
              </h2>

              <p className="text-base text-slate-600 leading-relaxed font-medium">
                This recommendation letter strengthens your resume and supports internship-to-placement transitions by highlighting your performance, skills, and project contributions.
              </p>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1">
                <h3 className="text-lg font-extrabold text-slate-900">TechieHelp Internship Letter of Recommendation (LOR)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Awarded based on student project execution, code quality, and active participation during the 3-month program.
                </p>
              </div>

              {/* Placement Points */}
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider text-emerald-600">Placement-Focused Trust Points</h4>
                <div className="grid sm:grid-cols-2 gap-3 text-xs font-bold text-slate-700">
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                    <span>Performance & Project Based Award</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                    <span>Boosts Resume Shortlisting in HR Rounds</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <ShieldCheck className="w-4.5 h-4.5 text-sky-600 shrink-0" />
                    <span>Linked to Public TechieHelp Profile</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <QrCode className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                    <span>QR Code Verification for Recruiters</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <Award className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                    <span>Valid for Jobs, Internships & Higher Studies</span>
                  </div>
                </div>
              </div>

              {/* Verification Box */}
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs font-bold text-blue-900 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 font-black text-sm">
                  ✓
                </span>
                <span>Recruiters & HRs can directly verify this recommendation letter via QR Code or the intern's public profile link.</span>
              </div>
            </div>

            {/* Right: Recommendation Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-slate-100 group">
                <Image
                  src={recommendation?.src || recommendation}
                  alt="Recommendation Letter"
                  width={600}
                  height={420}
                  className="w-full h-auto object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

          </div>
        </section>


        {/* ==================== 7.4 STUDENT ACHIEVEMENTS & CERTIFICATION MOMENTS ==================== */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 font-bold text-xs uppercase tracking-wider">
              <Trophy className="w-4 h-4 text-purple-600" /> Real Outcomes
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Student Achievements & <span className="text-[#2563EB]">Certification Moments</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium">
              Real students. Real certificates. Real internship outcomes. A glimpse of our interns receiving verified certificates, goodies, and recognition after completing live projects.
            </p>
          </div>

          {/* Gallery Controls Toggle */}
          <div className="flex justify-end mb-6">
            <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
              <button
                onClick={() => setAutoScroll(true)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${autoScroll ? "bg-[#2563EB] text-white shadow-md" : "text-slate-600 hover:text-slate-900"
                  }`}
                suppressHydrationWarning
              >
                Auto Scroll
              </button>
              <button
                onClick={() => setAutoScroll(false)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${!autoScroll ? "bg-[#2563EB] text-white shadow-md" : "text-slate-600 hover:text-slate-900"
                  }`}
                suppressHydrationWarning
              >
                Manual Scroll
              </button>
            </div>
          </div>

          {/* Marquee Image Gallery */}
          <div className={autoScroll ? "overflow-hidden py-4" : "overflow-x-auto py-4"}>
            <motion.div
              className="flex gap-5 shrink-0"
              animate={autoScroll ? { x: ["0%", "-50%"] } : { x: "0%" }}
              transition={
                autoScroll
                  ? {
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 35,
                      ease: "linear",
                    },
                  }
                  : { duration: 0.3 }
              }
              style={{ width: "max-content" }}
            >
              {[
                aryan1, aryan2, sixty, coreTeam, amazad, tit, delhiJudge, recon, kitInt, kit, kitNodha, kitCert,
                aarshdeepcertificate, aarshdeepdiary, aarshdeeptrophy, groups, hod, rohitdiary, rohittrophy,
                simrancertificate, simrandiary, simrantrophy, simrantshirt
              ].map((img, index) => (
                <div key={index} className="w-64 h-64 relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 shrink-0 bg-slate-100">
                  <Image
                    src={img?.src || img}
                    alt={`Student Achievement ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
              {[
                aryan1, aryan2, sixty, coreTeam, amazad, tit, delhiJudge, recon, kitInt, kit, kitNodha, kitCert,
                aarshdeepcertificate, aarshdeepdiary, aarshdeeptrophy, groups, hod, rohitdiary, rohittrophy,
                simrancertificate, simrandiary, simrantrophy, simrantshirt
              ].map((img, index) => (
                <div key={`dup-${index}`} className="w-64 h-64 relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 shrink-0 bg-slate-100">
                  <Image
                    src={img?.src || img}
                    alt={`Student Achievement Duplicate ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          <div className="text-center mt-8 text-xs font-bold text-slate-500">
            All certificates and recognitions are awarded after successful completion of real internship projects and milestones.
          </div>
        </section>


        {/* ==================== 8. MENTORSHIP & OFFICIAL CERTIFICATES ==================== */}
        <section id="outcomes" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left Column: Certifications Showcase */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1D4ED8] font-bold text-xs uppercase">
                Official Credentials
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Earn Industry Credentials Powered by TechieHelp
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Upon successful completion of the Build2Earn program deliverables, students receive 2 official credentials to add directly to their resume and LinkedIn:
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#1D4ED8] flex items-center justify-center shrink-0 font-bold">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">01. Training Certificate</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Validates your 3-month structured skill mastery, practical hands-on training, and project development.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">02. Internship Certificate</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Recognizes your practical work execution, domain project submission, and internship task completion.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent border border-amber-200 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 font-bold">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Performance Letter of Recommendation (LOR)</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Performance-based credential awarded to top performers who demonstrate exceptional project output and commitment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Mentorship Card */}
            <div className="bg-[#0F172A] text-white rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase">LIVE MENTORSHIP ENGINE</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ACTIVE SUPPORT
                </span>
              </div>

              <h3 className="text-2xl font-black text-white">Direct Guidance. Zero Doubt Blockers.</h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                Building alone can be confusing. With Build2Earn, you get direct access to experienced mentors who review your GitHub commits, check your LinkedIn profile, and help resolve technical errors.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Weekly Live Interactive Q&A & Project Review Sessions</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>GitHub Repository & Code Quality Reviews</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Personal Portfolio Review before public deployment</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Peer Community Access for team building & networking</span>
                </div>
              </div>

              <a
                href={CASHFREE_PAYMENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#1D4ED8] to-[#0EA5E9] text-white font-extrabold text-sm shadow-lg hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
              >
                <span>Join Mentored Cohort — ₹4,999</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>
        </section>


        {/* ==================== 9. PRICING STACK & VALUE BREAKDOWN ==================== */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-[#1D4ED8]">Investment</div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Simple, Transparent Pricing
            </h2>
            <p className="text-base text-slate-600">
              One price for the complete 3-month practical program. No hidden fees or recurring subscriptions.
            </p>
          </div>

          <div className="max-w-xl mx-auto bg-white border-2 border-[#1D4ED8] rounded-3xl p-8 sm:p-10 shadow-2xl space-y-8 relative">

            {/* Top Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#1D4ED8] text-white font-black text-xs uppercase tracking-widest shadow-md">
              COMPLETE 3-MONTH COHORT
            </div>

            {/* Price Stack */}
            <div className="text-center space-y-2 pt-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Enrollment Fee</div>
              <div className="flex items-baseline justify-center gap-3">
                <span className="text-5xl font-black text-slate-900">₹4,999</span>
                <span className="text-slate-400 line-through text-lg font-bold">₹12,000</span>
              </div>
              <p className="text-xs text-emerald-600 font-bold">Includes Training + Internship + 2 Certificates</p>
            </div>

            {/* Checklist */}
            <div className="space-y-3.5 text-sm text-slate-700 border-t border-b border-slate-100 py-6">
              {[
                "3 Months Practical Training & Work Execution",
                "LinkedIn Profile & Digital Brand Optimization",
                "GitHub Proof of Work Setup & Repository Building",
                "Live Personal Portfolio Website Deployment",
                "Domain-Specific Capstone Project",
                "AI Tools & Workflow Integration (Claude, ChatGPT, Copilot)",
                "Hackathon Readiness & Pitching Framework",
                "Open Source Contribution Guidance",
                "Freelancing Services Setup & Proposal Training",
                "2 Official Credentials (Training + Internship Certificates)",
                "Eligibility for Performance-Based Letter of Recommendation (LOR)"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold">{item}</span>
                </div>
              ))}
            </div>

            {/* Enrollment Action */}
            <div className="space-y-3">
              <a
                href={CASHFREE_PAYMENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#1D4ED8] via-[#0EA5E9] to-[#0284C7] hover:from-blue-700 hover:to-sky-600 text-white font-extrabold text-base shadow-xl shadow-blue-500/25 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 group"
              >
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>PAY & ENROLL NOW — ₹4,999</span>
                <ExternalLink className="w-5 h-5" />
              </a>
              <p className="text-[11px] text-center text-slate-500 font-medium">
                Disclaimer: Build2Earn is a skill-building program. We do not guarantee jobs or passive income; outcomes depend on student effort and execution.
              </p>
            </div>

          </div>
        </section>


        {/* ==================== 10. FAQ ACCORDION ==================== */}
        <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-200">
          <div className="text-center mb-16 space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-[#1D4ED8]">Got Questions?</div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqList.map((faq, idx) => {
              const isOpen = activeFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                    suppressHydrationWarning
                    className="w-full p-5 text-left font-bold text-slate-900 flex items-center justify-between gap-4 text-base hover:text-[#1D4ED8] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${isOpen ? "rotate-180 text-[#1D4ED8]" : "text-slate-400"}`} />
                  </button>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </section>


        {/* ==================== 11. LEAD REGISTRATION MODAL ==================== */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden relative"
              >
                {/* Modal Header */}
                <div className="bg-[#0F172A] text-white p-6 relative">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    suppressHydrationWarning
                    className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">APPLICATION FORM</span>
                  <h3 className="text-2xl font-black text-white mt-1">Apply for Build2Earn</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Selected Track: <strong className="text-emerald-400">{modalDomain}</strong> | Fee: ₹4,999
                  </p>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  {isSubmitted ? (
                    <div className="text-center py-8 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h4 className="text-2xl font-black text-slate-900">Application Submitted!</h4>
                      <p className="text-xs text-slate-600 max-w-xs mx-auto">
                        Thank you, <strong>{formData.fullName}</strong>. Click below to complete your registration payment on Cashfree.
                      </p>
                      <div className="pt-2 flex flex-col gap-2">
                        <a
                          href={CASHFREE_PAYMENT_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#1D4ED8] to-[#0EA5E9] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 hover:scale-[1.01] transition-transform"
                        >
                          <span>PROCEED TO CASHFREE PAYMENT — ₹4,999</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => setIsModalOpen(false)}
                          suppressHydrationWarning
                          className="py-2 text-slate-400 font-bold text-xs hover:text-slate-600"
                        >
                          Close Window
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#1D4ED8]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="rahul@gmail.com"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#1D4ED8]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Phone *</label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+91 9876543210"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#1D4ED8]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">College Name *</label>
                          <input
                            type="text"
                            required
                            value={formData.college}
                            onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                            placeholder="e.g. MBM University"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#1D4ED8]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Academic Year</label>
                          <select
                            value={formData.year}
                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#1D4ED8] bg-white"
                          >
                            <option value="1st Year">1st Year Student</option>
                            <option value="2nd Year">2nd Year Student</option>
                            <option value="3rd Year">3rd Year Student</option>
                            <option value="4th Year">4th Year Student</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Selected Domain Track</label>
                        <select
                          value={formData.domain}
                          onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#1D4ED8] bg-white font-semibold text-[#1D4ED8]"
                        >
                          {domainsList.map((d) => (
                            <option key={d.id} value={d.name}>{d.name}</option>
                          ))}
                        </select>
                      </div>

                      <button
                        type="submit"
                        suppressHydrationWarning
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#1D4ED8] to-[#0EA5E9] text-white font-extrabold text-xs shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider"
                      >
                        <span>PROCEED TO PAYMENT — ₹4,999</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </main>

    </div>
  );
}
