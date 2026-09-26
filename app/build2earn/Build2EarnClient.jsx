"use client";

import React, { useState } from "react";
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
  QrCode,
  Gift,
  GitPullRequest,
  Compass,
  FileCode
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
  const [selectedDomain, setSelectedDomain] = useState("frontend");
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDomain, setModalDomain] = useState("Frontend Development");
  const [activeRoadmapTab, setActiveRoadmapTab] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);

  // Campus Photos Gallery Slide Bar State
  const [gallerySlideIndex, setGallerySlideIndex] = useState(0);

  const campusPhotos = [
    { src: "/hero-slides/goodies_kit.jpg", title: "TechieHelp Official Apparel, Welcome Kit & Student Goodies" },
    { src: "/hero-slides/id_cards_lanyards.jpg", title: "Official TechieHelp Employee & Intern Credentials" },
    { src: "/hero-slides/gift_box.jpg", title: "TechieHelp Executive Diary, Pen & Stainless Bottle Set" },
    { src: "/hero-slides/tshirt_gift.jpg", title: "Student Receiving TechieHelp Welcome Kit & Internship Deliverables" },
    { src: "/hero-slides/technocrats_certificates.jpg", title: "Students Presenting TechieHelp Internship Certificates" },
    { src: "/hero-slides/single_cert_handover.jpg", title: "Official Internship Completion Certificate Presentation" },
    { src: "/hero-slides/thumbs_up_team.jpg", title: "Student Developers & Intern Celebration Event" },
    { src: "/hero-slides/hackloop_awards.jpg", title: "HackLoop Hackathon Winners & Award Ceremony" },
    { src: "/hero-slides/principal_trophy.jpg", title: "Academic Excellence & Institutional Recognition" },
    { src: "/hero-slides/certificate_handover.jpg", title: "Internship Certificate Award Ceremony" },
    { src: "/hero-slides/backbone_team.jpg", title: "TechieHelp Leadership & Development Mentors" },
    { src: "/hero-slides/team_steps.jpg", title: "Campus Development Team & Student Engineers" },
    { src: "/hero-slides/celebration_balloons.jpg", title: "TechieHelp Campus Event Celebration" },
    { src: "/hero-slides/award_ceremony.jpg", title: "Student Performance Recognition Ceremony" },
    { src: "/hero-slides/team_celebration.jpg", title: "TechieHelp Student Developers Cohort" },
    { src: "/hero-slides/slide1.jpg", title: "TechieHelp AI Headquarters & Government Accreditation" },
    { src: "/hero-slides/slide2.jpg", title: "Institutional Campus Training Hub" },
    { src: "/hero-slides/slide3.jpg", title: "Live Mentor Evaluation & Project Code Reviews" },
    { src: "/hero-slides/slide4.jpg", title: "Mock Interview & Technical Placement Coaching" },
    { src: "/hero-slides/slide5.jpg", title: "TechieHelp AI Learning Hub & Workspaces" }
  ];

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    year: "1st Year",
    domain: "Frontend Development",
    linkedin: "",
    github: "",
    source: "Social Media / Friend"
  });

  const CASHFREE_PAYMENT_URL = "https://payments.cashfree.com/forms/Build2Earn";

  const handleOpenModal = (domainName = "Frontend Development") => {
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
    toast.success("Application details saved. Redirecting to Cashfree Payment Gateway...");
    setTimeout(() => {
      window.open(CASHFREE_PAYMENT_URL, "_blank");
    }, 800);
  };

  // 8 INTERNSHIP DOMAINS
  const domainsList = [
    {
      id: "frontend",
      name: "Frontend Development",
      icon: Code2,
      desc: "Master modern HTML, CSS, JavaScript, React.js, responsive design principles, REST API consumption, Git/GitHub workflows, and production deployment on Vercel.",
      output: "Build Responsive Web Applications",
      stack: ["HTML5", "CSS3", "JavaScript", "React.js", "Responsive UI", "REST APIs", "Git/GitHub", "Vercel"],
      color: "from-blue-600 to-cyan-500",
      badgeBg: "bg-blue-50 text-blue-700 border-blue-200"
    },
    {
      id: "backend",
      name: "Backend Development",
      icon: Terminal,
      desc: "Build secure server-side applications, design RESTful APIs, implement user authentication, connect databases, handle CRUD operations, and deploy cloud microservices.",
      output: "Build Scalable Backend APIs",
      stack: ["Node.js", "Express.js", "REST APIs", "Authentication", "MongoDB / SQL", "CRUD", "Cloud Deployment"],
      color: "from-emerald-600 to-teal-500",
      badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200"
    },
    {
      id: "mern",
      name: "MERN Stack Development",
      icon: Layers,
      desc: "Engineered for end-to-end full-stack development using MongoDB, Express.js, React.js, and Node.js with JWT authentication and state management.",
      output: "Build Full-Stack Web Applications",
      stack: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT Auth", "Full-Stack Architecture"],
      color: "from-indigo-600 to-purple-500",
      badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200"
    },
    {
      id: "fullstack",
      name: "Full Stack Development",
      icon: Globe,
      desc: "Integrate sophisticated frontend interfaces with robust backend services, manage relational databases, handle secure user sessions, and launch production products.",
      output: "Build End-to-End Tech Products",
      stack: ["Frontend Integration", "Backend APIs", "Database Design", "Authentication", "Deployment", "Full Products"],
      color: "from-sky-600 to-blue-700",
      badgeBg: "bg-sky-50 text-sky-700 border-sky-200"
    },
    {
      id: "uiux",
      name: "UI/UX & Product Design",
      icon: Award,
      desc: "Conduct user research, design wireframes, map user journeys, create high-fidelity Figma prototypes, build design systems, and present portfolio case studies.",
      output: "Build a Professional Design Portfolio",
      stack: ["User Research", "Wireframing", "User Flows", "Figma", "Design Systems", "Prototypes", "Case Studies"],
      color: "from-purple-600 to-pink-500",
      badgeBg: "bg-purple-50 text-purple-700 border-purple-200"
    },
    {
      id: "ai",
      name: "Artificial Intelligence",
      icon: Sparkles,
      desc: "Understand core AI principles, build Python-powered intelligent tools, integrate LLM APIs, construct custom prompts, and develop autonomous AI agents.",
      output: "Build AI-Powered Applications",
      stack: ["Python", "AI Principles", "LLM APIs", "Prompt Engineering", "AI Microservices", "OpenAI / Claude"],
      color: "from-amber-500 to-orange-600",
      badgeBg: "bg-amber-50 text-amber-700 border-amber-200"
    },
    {
      id: "ml",
      name: "Machine Learning",
      icon: Cpu,
      desc: "Process complex datasets using Python, NumPy, and Pandas. Train supervised and unsupervised models, evaluate algorithm accuracy, and deploy ML models.",
      output: "Build & Deploy Machine Learning Models",
      stack: ["Python", "NumPy", "Pandas", "Data Preprocessing", "Supervised Learning", "Scikit-Learn", "Model Eval"],
      color: "from-cyan-600 to-blue-600",
      badgeBg: "bg-cyan-50 text-cyan-700 border-cyan-200"
    },
    {
      id: "cybersecurity",
      name: "Cybersecurity",
      icon: ShieldCheck,
      desc: "Understand network security architecture, Linux CLI operations, web application security, OWASP Top 10 vulnerabilities, and perform authorized security audits.",
      output: "Practice in Authorized Security Labs",
      stack: ["Networking", "Linux CLI", "Web Security", "OWASP Top 10", "Vulnerability Assessment", "Security Audits"],
      color: "from-rose-600 to-red-500",
      badgeBg: "bg-rose-50 text-rose-700 border-rose-200"
    }
  ];

  // DELIVERABLES
  const deliverables = [
    {
      icon: Code2,
      title: "Domain-Specific Practical Training",
      desc: "Structured learning paths, real-world assignments, practical implementation modules, and hands-on project building in your chosen domain.",
      badge: "Skill Acceleration"
    },
    {
      icon: Github,
      title: "Production Projects & Portfolio",
      desc: "Build, document, and deploy production projects to GitHub or Figma, establishing verifiable proof of work for recruiters.",
      badge: "Proof of Work"
    },
    {
      icon: Users,
      title: "Mentorship & Live Feedback",
      desc: "Interactive mentorship sessions, technical doubt resolution, code reviews, and structured task feedback throughout the program.",
      badge: "Live Mentorship"
    },
    {
      icon: Award,
      title: "Dual Industry Credentials",
      desc: "Earn an official Training Certificate and an Internship Completion Certificate, along with eligibility for a performance-based Letter of Recommendation (LOR).",
      badge: "Verified Credentials"
    },
    {
      icon: Gift,
      title: "Official Welcome Goodies Kit",
      desc: "Enrolled students receive an official welcome kit featuring a custom TechieHelp T-Shirt, Intern ID Card, Executive Diary, and Pen set.",
      badge: "Welcome Swag"
    }
  ];

  // FAQ LIST
  const faqList = [
    {
      q: "Who is the Build2Earn program designed for?",
      a: "The program is specifically engineered for 1st and 2nd year college students who want to build real tech skills, production projects, and verified credentials before their final year placement season."
    },
    {
      q: "Can I choose more than one domain specialization track?",
      a: "No. Enrolled students select one primary domain specialization track (such as Frontend, Backend, MERN, Full Stack, UI/UX, AI, ML, or Cybersecurity) to complete focused tasks, projects, and mentor evaluations."
    },
    {
      q: "Is employment or income guaranteed after completion?",
      a: "No employment or income is guaranteed. Build2Earn is a practical skill acceleration and portfolio program. We equip you with practical capabilities, project proof, and career resources to pursue internships, freelance clients, and job opportunities."
    },
    {
      q: "What certificates do students receive upon graduation?",
      a: "Students who complete the required program milestones receive two verified credentials: a Training Certificate and an Internship Completion Certificate. High performers are eligible for a Letter of Recommendation (LOR)."
    },
    {
      q: "What is included in the company-wise technical interview preparation?",
      a: "Students gain access to curated practice question sets based on company technical patterns, Data Structures & Algorithms problem-solving guides, mock interview coaching, and profile reviews."
    },
    {
      q: "How does the founder-led hackathon guidance work?",
      a: "Mentors provide strategic coaching on discovering hackathons, team formation, problem statement evaluation, rapid MVP building, pitch deck creation, and demo presentations."
    },
    {
      q: "What is the fee structure for the program?",
      a: "The fee is a one-time investment of ₹4,999 for the full 3-month practical program with no recurring subscriptions or hidden costs."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#1D4ED8] selection:text-white relative overflow-x-hidden">

      {/* Light Theme Background Ambient Effects */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-gradient-to-b from-blue-100/60 via-sky-50/40 to-transparent blur-3xl rounded-full" />
        <div className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] bg-amber-100/40 blur-3xl rounded-full" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#0F172A 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      </div>

      <main className="relative z-10">

        {/* ==================== HERO SECTION (ULTRA-PROFESSIONAL WHITE THEME) ==================== */}
        <section className="w-full relative bg-gradient-to-b from-white via-slate-50/60 to-white overflow-hidden py-14 lg:py-20 border-b border-slate-200/80">
          
          {/* Ambient Lighting Gradients */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-blue-100/70 via-sky-50/30 to-transparent blur-3xl rounded-full" />
            <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-amber-200/20 blur-[130px] rounded-full" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* Left Content Column (Ultra-Professional & High-Converting) */}
              <div className="lg:col-span-6 space-y-6 text-left">
                
                {/* Pill Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#1D4ED8] text-xs font-black shadow-xs tracking-wide"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>BUILD2EARN · 3-MONTH PRACTICAL CAREER PROGRAM</span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0B192C] tracking-tight leading-[1.12]"
                >
                  Don't Just Learn. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1D4ED8] via-blue-600 to-indigo-600">
                    Build &amp; Prepare to Earn.
                  </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-sm sm:text-base lg:text-lg text-slate-600 font-medium leading-relaxed max-w-xl"
                >
                  A 3-month practical career accelerator for 1st &amp; 2nd year students. Master 1 primary domain, build verified portfolio projects, earn dual industry credentials, and prepare for paid opportunities.
                </motion.p>

                {/* Feature Chips Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="grid grid-cols-2 gap-3 max-w-lg pt-1"
                >
                  <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1D4ED8] flex items-center justify-center font-bold shrink-0">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-black text-[#0B192C]">8 Specializations</div>
                      <div className="text-[10px] font-semibold text-slate-500">Pick 1 Primary Domain</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-black text-[#0B192C]">Dual Certificates</div>
                      <div className="text-[10px] font-semibold text-slate-500">Training + Internship</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold shrink-0">
                      <Gift className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-black text-[#0B192C]">Welcome Goodies</div>
                      <div className="text-[10px] font-semibold text-slate-500">T-Shirt, ID &amp; Kit</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
                      <Users className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-black text-[#0B192C]">Founder Guidance</div>
                      <div className="text-[10px] font-semibold text-slate-500">Hackathons &amp; DSA</div>
                    </div>
                  </div>
                </motion.div>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
                >
                  <a
                    href={CASHFREE_PAYMENT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 rounded-2xl bg-[#1D4ED8] hover:bg-blue-800 text-white font-black text-base shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 text-center"
                  >
                    <span>Enroll Now — ₹4,999</span>
                    <ArrowRight className="w-5 h-5" />
                  </a>

                  <a
                    href="#learn-domains"
                    className="px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-sm border-2 border-slate-200 hover:border-slate-800 transition-all flex items-center justify-center gap-2 text-center shadow-xs"
                  >
                    <span>Explore Specializations</span>
                  </a>
                </motion.div>

                {/* Guarantee / Pricing Strip */}
                <div className="pt-3 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-600 border-t border-slate-200/80">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> ₹4,999 One-Time Fee</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#1D4ED8]" /> 90 Days Execution</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-amber-500" /> Limited Batch Seats</span>
                </div>

              </div>

              {/* Right Column: Studio Showcase Video Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="lg:col-span-6 relative"
              >
                {/* Browser Studio Window Frame */}
                <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-[0_25px_60px_-15px_rgba(29,78,216,0.15)] p-2 sm:p-3 group">
                  
                  {/* Browser Top Dot Bar */}
                  <div className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-2xl mb-2 border border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                    </div>
                    <div className="text-[11px] font-bold text-slate-500 tracking-wider">
                      TECHIEHELP AI CAMPUS SHOWCASE
                    </div>
                    <div className="w-12" />
                  </div>

                  {/* Video Aspect Window */}
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-900 shadow-inner">
                    <video
                      src="/home.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover block group-hover:scale-[1.03] transition-transform duration-700"
                    >
                      Your browser does not support the video tag.
                    </video>

                    {/* Overlay Live Tag */}
                    <div className="absolute top-3 left-3 z-10 bg-slate-900/85 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full text-[10px] font-extrabold text-white flex items-center gap-2 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      LIVE CAMPUS &amp; LAB DEMO
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
                      <div className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl border border-slate-200 text-[11px] font-bold text-slate-800 shadow-md">
                        Practical Workstation Session
                      </div>
                      <a
                        href={CASHFREE_PAYMENT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-xl bg-[#1D4ED8] hover:bg-blue-800 text-white font-black text-xs shadow-md transition-colors"
                      >
                        Enroll ₹4,999 →
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* VERIFIED STUDENT ACHIEVEMENTS SHOWCASE */}
        <section id="build2earn-achievements" className="py-12 md:py-16 relative bg-white border-b border-slate-200/80 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1D4ED8] text-xs font-extrabold uppercase tracking-wider">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Verified Student Success</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-[#0B192C]">
                Student Achievements &amp; Certification Moments
              </h2>

              <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-normal">
                Real student outcomes and verified certification moments. A glimpse of our interns receiving official certificates, goodies, and project recognition.
              </p>
            </div>

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

        {/* QUICK VALUE TICKER BAR */}
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
                  <div className="text-[11px] font-semibold text-slate-500">One-Time Fee</div>
                </div>
              </div>

              <div className="pt-2 md:pt-0 md:pl-6 flex items-center gap-3 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-black text-slate-900">DUAL CREDENTIALS</div>
                  <div className="text-[11px] font-semibold text-slate-500">Training &amp; Internship</div>
                </div>
              </div>

              <div className="pt-2 md:pt-0 md:pl-6 flex items-center gap-3 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-black text-slate-900">LOR &amp; SWAG KIT</div>
                  <div className="text-[11px] font-semibold text-slate-500">Performance-Based</div>
                </div>
              </div>

              <div className="pt-2 md:pt-0 md:pl-6 flex items-center gap-3 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-black text-slate-900">FOUNDER MENTORSHIP</div>
                  <div className="text-[11px] font-semibold text-slate-500">Hackathons &amp; DSA</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CAMPUS & STUDENT GALLERY (WHITE THEME CONTAINER) */}
        <section id="campus-gallery" className="bg-slate-50 text-slate-900 py-12 md:py-16 border-y border-slate-200 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-[#1D4ED8] font-extrabold text-xs uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Campus Life &amp; Development Hub
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                TechieHelp AI <span className="text-[#1D4ED8]">Campus Gallery</span>
              </h2>
              <p className="text-slate-600 text-xs sm:text-base font-medium">
                Explore photos from our campus development hub, mentorship sessions, project evaluations, and student events.
              </p>
            </div>

            <div className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white group">
              <div className="relative w-full h-[50vh] sm:h-[65vh] md:h-[75vh] lg:h-[80vh] flex items-center justify-center bg-slate-900 p-2 sm:p-4">
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

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20 pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-3 z-10">
                  <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-200 text-slate-900 text-xs sm:text-sm font-bold shadow-lg max-w-lg">
                    {campusPhotos[gallerySlideIndex].title}
                  </div>
                  <div className="bg-[#1D4ED8] text-white px-3.5 py-1.5 rounded-full text-xs font-extrabold shadow-md">
                    Campus Gallery Highlight
                  </div>
                </div>

                <button
                  onClick={() =>
                    setGallerySlideIndex(
                      (prev) => (prev - 1 + campusPhotos.length) % campusPhotos.length
                    )
                  }
                  aria-label="Previous Photo"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center backdrop-blur-md border border-slate-200 transition-all z-20 shadow-xl"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() =>
                    setGallerySlideIndex((prev) => (prev + 1) % campusPhotos.length)
                  }
                  aria-label="Next Photo"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center backdrop-blur-md border border-slate-200 transition-all z-20 shadow-xl"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col items-center gap-3">
              <div className="flex items-center justify-between w-full text-xs text-slate-500 font-bold px-1">
                <span>SLIDE BAR TRACK</span>
                <span>Click any thumbnail to view</span>
              </div>

              <div className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-slate-200">
                <div className="flex items-center gap-3 min-w-max mx-auto px-1">
                  {campusPhotos.map((photo, idx) => (
                    <button
                      key={idx}
                      onClick={() => setGallerySlideIndex(idx)}
                      className={`relative rounded-xl overflow-hidden transition-all duration-300 group shrink-0 bg-white ${idx === gallerySlideIndex
                          ? "ring-2 ring-[#1D4ED8] scale-105 opacity-100 shadow-md"
                          : "opacity-60 hover:opacity-100 hover:scale-102"
                        }`}
                    >
                      <img
                        src={photo.src}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-20 sm:w-28 md:w-36 h-16 sm:h-20 md:h-24 object-contain bg-slate-900 p-1 block"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== SPECIALIZED INTERNSHIP TRACKS ==================== */}
        <section id="learn-domains" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200 scroll-mt-16">
          <div className="text-center max-w-4xl mx-auto mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1D4ED8] text-xs font-bold uppercase tracking-wider">
              <Code2 className="w-4 h-4 text-blue-600" /> Internship Specialization Tracks
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Choose Your Specialization Track
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium max-w-3xl mx-auto">
              Select one primary specialization track tailored to your career goals. Experience structured project assignments, code reviews, and direct mentor coaching.
            </p>
          </div>

          <div className="mb-10 p-5 rounded-2xl bg-blue-50/90 border border-blue-200 text-blue-950 text-xs sm:text-sm font-semibold flex items-start gap-3 shadow-xs max-w-4xl mx-auto">
            <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-extrabold text-blue-900 block mb-0.5">Domain Focus Policy:</strong>
              Enrolled students select one primary domain track for specialized tasks, production projects, and dedicated mentor reviews.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {domainsList.map((dom) => {
              const DomIcon = dom.icon;
              return (
                <div
                  key={dom.id}
                  className="bg-white border border-slate-200 hover:border-blue-500 rounded-3xl p-6 transition-all duration-300 hover:shadow-xl flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${dom.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                        <DomIcon className="w-5 h-5" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">{dom.name}</h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">{dom.desc}</p>
                    </div>

                    <div className={`p-2.5 rounded-xl text-xs font-extrabold border flex items-center gap-2 ${dom.badgeBg}`}>
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{dom.output}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {dom.stack.map((tech, idx) => (
                        <span key={idx} className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-6 border-t border-slate-100">
                    <a
                      href={CASHFREE_PAYMENT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-blue-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/10 text-center"
                    >
                      <span>Direct Payment — {dom.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ==================== PROGRAM DELIVERABLES & PACKAGE ==================== */}
        <section id="whats-included" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200 bg-white/50 scroll-mt-16">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              <Gift className="w-4 h-4 text-emerald-600" /> Program Deliverables Package
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Program Deliverables &amp; Student Package
            </h2>
            <p className="text-base text-slate-600 font-medium">
              Everything included in your ₹4,999 one-time enrollment fee:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverables.map((item, idx) => {
              const ItemIcon = item.icon;
              return (
                <div key={idx} className="bg-white border border-slate-200/90 rounded-3xl p-7 space-y-4 hover:shadow-xl hover:border-blue-400 transition-all flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1D4ED8] flex items-center justify-center font-bold shadow-sm group-hover:scale-110 transition-transform">
                        <ItemIcon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-blue-100/70 text-blue-800 uppercase tracking-wider">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 tracking-tight">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Included in Program Fee
                    </span>
                    <a
                      href={CASHFREE_PAYMENT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline font-extrabold"
                    >
                      Pay ₹4,999 →
                    </a>
                  </div>
                </div>
              );
            })}

            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-7 space-y-4 shadow-xl flex flex-col justify-between border border-slate-800">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold border border-amber-500/30">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                    WELCOME SWAG
                  </span>
                </div>

                <h3 className="text-xl font-black text-white">Official Welcome Kit</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Enrolled students receive an official TechieHelp welcome kit including custom apparel, intern ID card, executive diary, and pen set.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-amber-400">
                <span className="flex items-center gap-1.5">
                  <Trophy className="w-4 h-4" /> Performance Recommendation
                </span>
                <a
                  href={CASHFREE_PAYMENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-300 hover:text-white underline font-extrabold"
                >
                  Direct Payment →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== DATA STRUCTURES & INTERVIEW MASTERY ==================== */}
        <section id="dsa-interview-prep" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200 scroll-mt-16">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                <BarChart3 className="w-4 h-4 text-indigo-600" /> Technical Interview Acceleration
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Data Structures &amp; <br />
                <span className="text-[#1D4ED8]">Interview Mastery</span>
              </h2>

              <blockquote className="p-4 rounded-2xl bg-blue-50 border-l-4 border-blue-600 text-xs sm:text-sm font-semibold text-slate-800 italic">
                “Prepare for competitive technical interviews, campus placement drives, and coding rounds with dedicated DSA resources and profile audits.”
              </blockquote>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Combining Data Structures &amp; Algorithms preparation with domain internships provides students with a competitive advantage during recruiter evaluations.
              </p>

              <div className="pt-2">
                <a
                  href={CASHFREE_PAYMENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#1D4ED8] hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition-all"
                >
                  <span>Enroll for DSA &amp; Technical Prep — ₹4,999</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 hover:border-blue-400 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Code2 className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm">Core Data Structures</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Arrays, strings, searching, sorting, recursion, trees, graphs, and algorithmic problem-solving.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 hover:border-blue-400 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm">Problem-Solving Approach</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Time and space complexity analysis, optimization techniques, and coding practice routines.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 hover:border-blue-400 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm">Company Practice Collections</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Curated company-wise practice question banks and previous interview pattern analysis.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 hover:border-blue-400 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm">Technical Mock Interviews</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Technical interview strategies, coding assessment preparation, and mock interview guidance.
                </p>
              </div>

              <div className="sm:col-span-2 p-5 rounded-2xl bg-gradient-to-r from-blue-900 to-slate-900 text-white shadow-md space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider">
                  <UserCheck className="w-4 h-4" /> Professional Profile Optimization
                </div>
                <h4 className="font-extrabold text-white text-base">Resume, LinkedIn &amp; GitHub Profile Reviews</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Professional resume formatting, LinkedIn profile optimization, and GitHub repository reviews to improve recruiter response rates.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ==================== HACKATHONS & OPEN SOURCE ==================== */}
        <section id="hackathon-opensource" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200 scroll-mt-16">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold uppercase tracking-wider">
              <Trophy className="w-4 h-4 text-purple-600" /> Practical Industry Proof
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Founder Mentorship &amp; Open Source
            </h2>
            <p className="text-base text-slate-600 font-medium">
              Build minimum viable products for national hackathons and contribute to public open-source codebases.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            
            <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-6 shadow-lg hover:shadow-2xl transition-all relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black px-3 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200 uppercase tracking-wider">
                    FOUNDER-LED
                  </span>
                </div>

                <h3 className="text-2xl font-black text-slate-900">Founder-Led Hackathon Guidance</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Strategic coaching from tech founders to help you build and win hackathons:
                </p>

                <div className="space-y-3 pt-2 text-xs font-semibold text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>Discover high-impact national and global hackathons matching your skill level.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>Master team formation, problem statement evaluation, and rapid idea validation.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>Plan and execute minimum viable products (MVPs) under submission deadlines.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>Create compelling pitch decks and master live demo presentations for judges.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">Strategic mentorship provided</span>
                <a
                  href={CASHFREE_PAYMENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs"
                >
                  Pay ₹4,999 →
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 via-white to-slate-50 text-slate-900 rounded-3xl p-8 space-y-6 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden flex flex-col justify-between border border-emerald-200/80">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold border border-emerald-200">
                    <GitPullRequest className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
                    OPEN SOURCE
                  </span>
                </div>

                <div className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">
                  Your First Open-Source Contribution Starts Here
                </div>
                <h3 className="text-2xl font-black text-slate-900">Open Source Contribution Support</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Master public developer collaboration and build a green GitHub contribution history:
                </p>

                <div className="space-y-3 pt-2 text-xs font-semibold text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Master Git &amp; GitHub CLI workflows, branch management, and commit etiquette.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Identify beginner-friendly repositories and navigate 'Good First Issue' labels.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Create clean feature branches, submit pull requests (PRs), and address code reviews.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">Verified GitHub workflow coaching</span>
                <a
                  href={CASHFREE_PAYMENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs transition-colors shadow-sm"
                >
                  Pay ₹4,999 →
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* ==================== 90-DAY EXECUTION ROADMAP ==================== */}
        <section id="roadmap" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200 scroll-mt-16">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1D4ED8] text-xs font-bold uppercase tracking-wider">
              <Clock className="w-4 h-4 text-blue-600" /> Curriculum Blueprint
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              90-Day Execution Roadmap
            </h2>
            <p className="text-base text-slate-600 font-medium">
              A milestone-driven curriculum designed to take you from foundational concepts to career-ready outputs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="bg-white border-2 border-blue-100 rounded-3xl p-7 space-y-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="px-3.5 py-1 rounded-full bg-blue-600 text-white font-black text-xs">
                    MONTH 1
                  </span>
                  <span className="text-xs font-bold text-blue-600">WEEKS 1 - 4</span>
                </div>

                <h3 className="text-xl font-black text-slate-900">Foundation &amp; Profile Setup</h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Domain fundamentals, Git/GitHub setup, coding best practices, LinkedIn profile optimization, career roadmap, and initial practical project.
                </p>

                <div className="space-y-2 pt-2 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600" /> Domain Core Fundamentals
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600" /> Git/GitHub Workflow Setup
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600" /> LinkedIn Profile Optimization
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-xs font-extrabold text-[#1D4ED8]">
                Output: Recruiter-Ready Profile &amp; Initial Project
              </div>
            </div>

            <div className="bg-white border-2 border-purple-100 rounded-3xl p-7 space-y-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="px-3.5 py-1 rounded-full bg-purple-600 text-white font-black text-xs">
                    MONTH 2
                  </span>
                  <span className="text-xs font-bold text-purple-600">WEEKS 5 - 8</span>
                </div>

                <h3 className="text-xl font-black text-slate-900">Project Build &amp; Practical Experience</h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Domain capstone project execution, mentor feedback loops, portfolio integration, open-source PR submission, and hackathon MVP planning.
                </p>

                <div className="space-y-2 pt-2 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-600" /> Structured Internship Tasks
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-600" /> Domain Capstone Development
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-600" /> Open Source PR Submission
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 text-xs font-extrabold text-purple-800">
                Output: Deployed Project Portfolio &amp; Practical Work
              </div>
            </div>

            <div className="bg-white border-2 border-emerald-100 rounded-3xl p-7 space-y-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="px-3.5 py-1 rounded-full bg-emerald-600 text-white font-black text-xs">
                    MONTH 3
                  </span>
                  <span className="text-xs font-bold text-emerald-600">WEEKS 9 - 12</span>
                </div>

                <h3 className="text-xl font-black text-slate-900">Career Launch &amp; Opportunity Exploration</h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Final capstone refinement, technical interview prep, company-wise DSA practice, freelancing proposal frameworks, and opportunity outreach.
                </p>

                <div className="space-y-2 pt-2 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" /> Company Practice Question Sets
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" /> Resume &amp; Interview Coaching
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" /> Certification &amp; LOR Evaluation
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-extrabold text-emerald-800">
                Output: Career-Ready Portfolio &amp; Opportunity Action Plan
              </div>
            </div>

          </div>
        </section>

        {/* ==================== POST-PROGRAM CAREER READINESS ==================== */}
        <section id="earning-outcomes" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200 scroll-mt-16">
          <div className="bg-gradient-to-br from-[#0B192C] via-slate-900 to-blue-950 text-white rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-slate-800 space-y-8">
            
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-extrabold uppercase tracking-wider">
                <TrendingUp className="w-4 h-4 text-emerald-400" /> Career Readiness Outcomes
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Post-Program Career Readiness
              </h2>

              <p className="text-base sm:text-lg text-emerald-400 font-extrabold max-w-2xl mx-auto">
                “Graduate with the skills, portfolio, and confidence to start pursuing paid opportunities within 90 days.”
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 backdrop-blur-sm">
                <h4 className="font-extrabold text-white text-base">Apply for Internships &amp; Jobs</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Target entry-level positions and internships backed by a verified portfolio of real-world projects.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 backdrop-blur-sm">
                <h4 className="font-extrabold text-white text-base">Pursue Freelance Projects</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Pitch clients, build tailored proposals, and deliver commercial freelance tech services.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 backdrop-blur-sm">
                <h4 className="font-extrabold text-white text-base">Showcase Public Proof of Work</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Present recruiters with live project URLs, active GitHub repositories, and structured case studies.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 backdrop-blur-sm">
                <h4 className="font-extrabold text-white text-base">Compete in Hackathons &amp; Open Source</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Contribute to global repositories and participate in national hackathons with confidence.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 backdrop-blur-sm sm:col-span-2 lg:col-span-2 flex flex-col justify-between">
                <div>
                  <h4 className="font-extrabold text-white text-base">Excel in Technical Interviews</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Leverage structured DSA practice, polished resumes, and interview preparation to clear technical rounds.
                  </p>
                </div>
                <div className="pt-3">
                  <a
                    href={CASHFREE_PAYMENT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-blue-700 text-white font-black text-xs shadow-md hover:opacity-95 transition-opacity"
                  >
                    <span>Enroll Now — ₹4,999 →</span>
                  </a>
                </div>
              </div>

            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center text-xs sm:text-sm font-black text-[#1D4ED8] shadow-sm">
              Program Objective: Shift from passive learning to demonstrating capability and actively pursuing paid career opportunities.
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-slate-700 space-y-1.5 leading-relaxed shadow-sm">
              <div className="font-bold text-amber-900 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600" /> Professional Disclaimer:
              </div>
              <div>
                Freelance clients, internship selection, job offers, and income depend on individual performance, market demand, and employer evaluation. Build2Earn provides training, tools, and mentorship—not contractual income guarantees.
              </div>
            </div>

          </div>
        </section>

        {/* ==================== STUDENT REVIEWS & STORIES ==================== */}
        <section id="student-reviews" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-[#2563EB] font-bold text-xs uppercase tracking-wider">
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" /> Student Verification
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Student Testimonials &amp; Reviews
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium">
              Hear directly from our students about their learning experience, live projects, and career growth.
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

        {/* ==================== CERTIFICATION & CREDENTIAL SHOWCASE ==================== */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
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
                    <QrCode className="w-4 h-4" /> QR Code Verification
                  </span>
                  <span className="bg-emerald-500 text-white px-2.5 py-1 rounded-lg text-[10px] font-black uppercase">
                    OFFICIAL CREDENTIAL
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] font-bold text-xs uppercase">
                <Award className="w-4 h-4 text-[#2563EB]" /> Official Credentials
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Training &amp; Internship Credentials
              </h2>

              <p className="text-base text-slate-600 leading-relaxed font-medium">
                Students who complete the required milestones receive official credentials powered by TechieHelp Institute of AI to enhance their professional profiles:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">Training Certificate</h4>
                      <p className="text-xs text-slate-600">Validates your 3-month practical domain learning and skill development.</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">Internship Completion Certificate</h4>
                      <p className="text-xs text-slate-600">Recognizes your practical work execution, domain tasks, and project submissions.</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Trophy className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">Performance Letter of Recommendation</h4>
                      <p className="text-xs text-slate-600">Letter of Recommendation awarded to top-performing students based on project evaluation.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={CASHFREE_PAYMENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-[#1D4ED8] hover:bg-blue-700 text-white font-extrabold text-sm shadow-md transition-all"
                >
                  <span>Get Started &amp; Enroll — ₹4,999</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* ==================== FINAL SUMMARY & ENROLLMENT ==================== */}
        <section id="pricing-enrollment" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200 scroll-mt-16">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1D4ED8] text-white font-extrabold text-xs uppercase tracking-widest shadow-md">
              BUILD2EARN · POWERED BY TECHIEHELP INSTITUTE OF AI
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Everything You Need to Build Your Career
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium">
              One program. Three months. Practical skills, internship experience, mentorship, production projects, and a clear career roadmap.
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-white border-4 border-[#1D4ED8] rounded-[2.5rem] p-8 sm:p-10 shadow-2xl space-y-8 relative">
            
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-1.5 rounded-full bg-gradient-to-r from-[#1D4ED8] to-indigo-600 text-white font-black text-xs uppercase tracking-widest shadow-lg">
              3-MONTH PRACTICAL PROGRAM
            </div>

            <div className="text-center space-y-2 pt-2">
              <div className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Program Investment</div>
              <div className="flex items-baseline justify-center gap-3">
                <span className="text-5xl sm:text-6xl font-black text-slate-900">₹4,999</span>
                <span className="text-slate-400 line-through text-xl font-bold">₹12,000</span>
              </div>
              <div className="text-xs text-emerald-600 font-extrabold">3-month program · One-time fee · No hidden charges</div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-800 border-t border-b border-slate-100 py-6">
              <div className="font-extrabold text-slate-900 uppercase tracking-wider text-xs mb-3 text-[#1D4ED8]">
                Program Package &amp; Deliverables:
              </div>
              {[
                "Select 1 of 8 primary internship domains (Frontend, Backend, MERN, Full Stack, UI/UX, AI, ML, Cybersecurity)",
                "3-month practical training & domain-specific internship tasks",
                "Production-grade project development & live deployment",
                "Direct mentorship & technical feedback sessions",
                "DSA & company-wise interview practice resources",
                "Founder-led hackathon guidance & pitch frameworks",
                "Open-source contribution guidance & GitHub workflows",
                "LinkedIn, GitHub & resume profile reviews",
                "Official welcome goodies kit",
                "Training & Internship completion certificates*",
                "Performance-based Letter of Recommendation (LOR) eligibility*"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-semibold leading-snug">{item}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <a
                href={CASHFREE_PAYMENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#1D4ED8] via-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-base shadow-xl shadow-blue-500/25 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-3 group text-center"
              >
                <span>Direct Cashfree Payment → ₹4,999</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={() => handleOpenModal("Frontend Development")}
                className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Need to Submit Contact Details First? Click Here</span>
              </button>

              <p className="text-[11px] text-center text-slate-500 font-medium leading-relaxed">
                *Certificates are subject to program milestone completion. LOR is performance-based. Freelance projects, job selection, and income depend on individual performance and market demand.
              </p>
            </div>

          </div>
        </section>

        {/* ==================== FAQ ACCORDION ==================== */}
        <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-200">
          <div className="text-center mb-16 space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-[#1D4ED8]">Frequently Asked Questions</div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Program Inquiries &amp; Information
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
                      className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ==================== LEAD REGISTRATION MODAL ==================== */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden relative"
              >
                <div className="bg-[#0F172A] text-white p-6 relative">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">ENROLLMENT FORM</span>
                  <h3 className="text-2xl font-black text-white mt-1">Apply for Build2Earn</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Selected Track: <strong className="text-emerald-400">{modalDomain}</strong> | Fee: ₹4,999 (3 Months)
                  </p>
                </div>

                <div className="p-6">
                  {isSubmitted ? (
                    <div className="text-center py-8 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h4 className="text-2xl font-black text-slate-900">Application Saved</h4>
                      <p className="text-xs text-slate-600 max-w-xs mx-auto">
                        Thank you, <strong>{formData.fullName}</strong>. Click below to complete your ₹4,999 program payment on Cashfree.
                      </p>
                      <div className="pt-2 flex flex-col gap-2">
                        <a
                          href={CASHFREE_PAYMENT_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#1D4ED8] to-[#0EA5E9] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 hover:scale-[1.01] transition-transform text-center"
                        >
                          <span>PROCEED TO CASHFREE PAYMENT — ₹4,999</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => setIsModalOpen(false)}
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
                          placeholder="Full Name"
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
                            placeholder="email@domain.com"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#1D4ED8]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
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
                            placeholder="College Name"
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
                        <label className="block text-xs font-bold text-slate-700 mb-1">Primary Domain Specialization</label>
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
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#1D4ED8] to-[#0EA5E9] text-white font-extrabold text-xs shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider"
                      >
                        <span>PROCEED TO CASHFREE PAYMENT — ₹4,999</span>
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
