"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  FileText,
  Handshake,
  MessagesSquare,
  Compass,
  Building2,
  Code2,
  UserCheck,
  Clock,
  ArrowRight,
  Download,
  ExternalLink,
  ShieldCheck,
  BookOpen,
  FileCheck,
  Eye,
  Check,
  X,
  ChevronRight,
  Star,
  Tag,
  HelpCircle,
  Send,
  PhoneCall,
  Layers,
  Lock,
  BadgePercent,
  Zap,
  Briefcase,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

// ==========================================
// DATA: 8 CAREER SERVICES
// ==========================================
const CAREER_SERVICES = [
  {
    id: "resume-writing",
    title: "Professional Resume Writing",
    category: "Resume",
    categories: ["All Services", "Resume"],
    description:
      "Create a professionally structured resume that presents your skills, experience and achievements clearly.",
    icon: FileText,
    iconBg: "bg-blue-50 text-blue-600 border-blue-200",
    duration: "3-5 Working Days",
    currentPrice: 799,
    originalPrice: 1499,
    popular: true,
    highlights: [
      "ATS-Engine Compliant Format",
      "Action-verb & Metric optimization",
      "2 Rounds of Personalized Revisions"
    ],
    bookingNote: "Includes personalized 1:1 questionnaire & final editable DOCX + PDF files."
  },
  {
    id: "resume-review",
    title: "Resume Review & Career Guidance",
    category: "Resume",
    categories: ["All Services", "Resume", "Career Guidance"],
    description:
      "Get personalised feedback on your resume, career direction and job search strategy.",
    icon: CheckCircle2,
    iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
    duration: "45 Mins 1:1 Session",
    currentPrice: 499,
    originalPrice: 999,
    popular: false,
    highlights: [
      "Line-by-line section critique",
      "Target role & domain alignment",
      "Immediate action plan to boost score"
    ],
    bookingNote: "Live 1:1 screen-share session with an industry resume evaluator."
  },
  {
    id: "referral-support",
    title: "Career Guidance & Referral Support",
    category: "Referrals",
    categories: ["All Services", "Referrals", "Career Guidance"],
    description:
      "Understand how to approach professional connections, explore relevant opportunities and prepare for referral conversations.",
    icon: Handshake,
    iconBg: "bg-indigo-50 text-indigo-600 border-indigo-200",
    duration: "1:1 Strategy Session",
    currentPrice: 999,
    originalPrice: 1999,
    popular: false,
    disclaimer:
      "Notice: TechieHelp prepares you for professional networking etiquette and company research. We never guarantee actual employee referrals, interviews, or job offers.",
    highlights: [
      "Cold outreach & LinkedIn message frameworks",
      "Employee search & timing strategies",
      "Ethical networking & profile positioning"
    ],
    bookingNote: "Strategic session on connecting effectively with alumni & industry leads."
  },
  {
    id: "mock-interview",
    title: "Mock Interview Preparation",
    category: "Interview Preparation",
    categories: ["All Services", "Interview Preparation"],
    description:
      "Practise technical and HR interviews with feedback to identify areas for improvement.",
    icon: MessagesSquare,
    iconBg: "bg-purple-50 text-purple-600 border-purple-200",
    duration: "60 Mins Live Simulation",
    currentPrice: 899,
    originalPrice: 1599,
    popular: true,
    highlights: [
      "Real-world technical & HR question bank",
      "Live rubric evaluation & scorecard",
      "Recorded session for personal review"
    ],
    bookingNote: "Select Technical (DSA, Core CS, Web, AI) or HR/Behavioral track."
  },
  {
    id: "job-strategy",
    title: "Internship & Job Search Strategy Guide",
    category: "Career Guidance",
    categories: ["All Services", "Career Guidance"],
    description:
      "Get guidance on finding relevant opportunities, preparing applications and managing your job search.",
    icon: Compass,
    iconBg: "bg-amber-50 text-amber-600 border-amber-200",
    duration: "Personalized Roadmap",
    currentPrice: 399,
    originalPrice: 799,
    popular: false,
    highlights: [
      "Application Tracker & Portal list",
      "Off-campus vs On-campus tactics",
      "Follow-up cadence & portfolio proofing"
    ],
    bookingNote: "Walk away with a customized 30-day proactive job hunt playbook."
  },
  {
    id: "company-prep",
    title: "Company-Wise Interview Preparation",
    category: "Interview Preparation",
    categories: ["All Services", "Interview Preparation"],
    description:
      "Prepare for technical and placement interviews using curated company-oriented preparation resources.",
    icon: Building2,
    iconBg: "bg-cyan-50 text-cyan-600 border-cyan-200",
    duration: "Targeted Prep Track",
    currentPrice: 699,
    originalPrice: 1299,
    popular: true,
    highlights: [
      "TCS, Infosys, Accenture, Wipro & Capgemini",
      "Pattern analysis & repeated coding questions",
      "Aptitude cutoff & technical round guides"
    ],
    bookingNote: "Tailored to your upcoming on-campus / off-campus hiring drive."
  },
  {
    id: "project-guidance",
    title: "Personalised Project Guidance",
    category: "Career Guidance",
    categories: ["All Services", "Career Guidance", "Consultation"],
    description:
      "Get guidance on selecting and improving projects relevant to your target role.",
    icon: Code2,
    iconBg: "bg-rose-50 text-rose-600 border-rose-200",
    duration: "2 Milestone Reviews",
    currentPrice: 799,
    originalPrice: 1499,
    popular: false,
    highlights: [
      "Resume-worthy project idea selection",
      "Architecture, clean code & GitHub review",
      "How to defend projects in interviews"
    ],
    bookingNote: "Covers Full-Stack, AI/ML, Python, Cloud, or Core Engineering domains."
  },
  {
    id: "career-consultation",
    title: "1:1 Career Consultation",
    category: "Consultation",
    categories: ["All Services", "Consultation", "Career Guidance"],
    description:
      "Discuss your career goals, professional profile and preparation roadmap with a mentor.",
    icon: UserCheck,
    iconBg: "bg-teal-50 text-teal-600 border-teal-200",
    duration: "45 Mins Consultation",
    currentPrice: 599,
    originalPrice: 1199,
    popular: false,
    highlights: [
      "Individual skill-gap & career diagnostic",
      "Next 90-day actionable study roadmap",
      "Q&A on higher studies vs jobs vs freelancing"
    ],
    bookingNote: "Direct mentor conversation tailored to college students & freshers."
  }
];

// ==========================================
// DATA: 6 FEATURED DIGITAL PRODUCTS
// (Curated from TechieHelp Authorized Resources)
// ==========================================
const DIGITAL_PRODUCTS = [
  {
    id: "prod-ats-resume",
    title: "ATS-Optimized Tech Resume Template Kit",
    category: "Resume Resources",
    description:
      "Handcrafted, ATS-compliant single-page templates tested across recruitment parsers with pre-written impact bullet points.",
    format: "DOCX, LaTeX & PDF",
    isFree: true,
    currentPrice: 0,
    originalPrice: null,
    previewUrl: "/resume",
    downloadLink: "/resume",
    colorTheme: "from-blue-600 to-indigo-700",
    features: [
      "100% ATS score verified",
      "Freshers & Final Year layouts",
      "Action-verb bullet library"
    ]
  },
  {
    id: "prod-company-pack",
    title: "Top MNCs Placement & Company-Wise Prep Guide",
    category: "Company-Wise Preparation",
    description:
      "Curated company interview questions, syllabus patterns, and HR round strategies for TCS, Infosys, Accenture & Wipro.",
    format: "Curated PDF & Practice Bank",
    isFree: false,
    currentPrice: 199,
    originalPrice: 499,
    previewUrl: "/prep-resources",
    downloadLink: "/prep-resources",
    colorTheme: "from-slate-800 to-slate-950",
    features: [
      "Latest 2025-2026 test trends",
      "Technical & pseudo-code questions",
      "HR situational answers (STAR)"
    ]
  },
  {
    id: "prod-dsa-cheatsheet",
    title: "DSA 75 Core Patterns & Coding Cheat Sheet",
    category: "DSA & Coding",
    description:
      "Step-by-step pattern breakdown from Two Pointers, Sliding Window, DP to Graphs with C++, Java and Python code snippets.",
    format: "Interactive Roadmap + PDF",
    isFree: true,
    currentPrice: 0,
    originalPrice: null,
    previewUrl: "/dsa",
    downloadLink: "/dsa",
    colorTheme: "from-amber-600 to-orange-700",
    features: [
      "75 Repeated coding patterns",
      "Time & space complexity matrix",
      "LeetCode problem references"
    ]
  },
  {
    id: "prod-aptitude-formulas",
    title: "Placement Quantitative Aptitude & Formulas Handbook",
    category: "Aptitude & Reasoning",
    description:
      "Essential Quantitative formulas, shortcut methods, and Logical Reasoning patterns designed to crack placement cutoffs.",
    format: "Quick Revision PDF (80+ Pages)",
    isFree: false,
    currentPrice: 149,
    originalPrice: 299,
    previewUrl: "/prep-resources",
    downloadLink: "/prep-resources",
    colorTheme: "from-emerald-700 to-teal-800",
    features: [
      "Speed arithmetic shortcuts",
      "Logical puzzle methodologies",
      "Formula summary cheat sheet"
    ]
  },
  {
    id: "prod-tech-interview-qna",
    title: "Core Technical Interview Master Q&A (Java, Python & SQL)",
    category: "Interview Preparation",
    description:
      "200+ must-know conceptual questions on OOPs, DBMS queries, concurrency, and behavioral interview situations.",
    format: "Handbook & Notes PDF",
    isFree: true,
    currentPrice: 0,
    originalPrice: null,
    previewUrl: "/mock-interview",
    downloadLink: "/mock-interview",
    colorTheme: "from-cyan-700 to-blue-800",
    features: [
      "Top 100 SQL query problems",
      "OOPs & OS fundamental notes",
      "AI Mock interview alignment"
    ]
  },
  {
    id: "prod-open-source-guide",
    title: "Open Source & GitHub Portfolio Launchpad",
    category: "GSoC & Open Source",
    description:
      "Step-by-step guide to finding your first issue, creating clean README portfolios, and building verified project proof.",
    format: "Action Guide & Templates",
    isFree: true,
    currentPrice: 0,
    originalPrice: null,
    previewUrl: "/career-branding-lab",
    downloadLink: "/career-branding-lab",
    colorTheme: "from-purple-700 to-pink-800",
    features: [
      "GitHub profile markdown templates",
      "First Pull Request walkthrough",
      "GSoC proposal structure"
    ]
  }
];

const FILTER_TABS = [
  "All Services",
  "Resume",
  "Career Guidance",
  "Referrals",
  "Interview Preparation",
  "Consultation"
];

export default function CareerServicesSection() {
  const [activeTab, setActiveTab] = useState("All Services");
  const [selectedService, setSelectedService] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);

  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    email: "",
    college: "",
    preferredDate: "",
    notes: ""
  });
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);

  // Filtered Services
  const filteredServices = useMemo(() => {
    if (activeTab === "All Services") return CAREER_SERVICES;
    return CAREER_SERVICES.filter((svc) => svc.categories.includes(activeTab));
  }, [activeTab]);

  // Open booking modal
  const handleOpenBooking = (service) => {
    setSelectedService(service);
    setBookingModalOpen(true);
  };

  // Open product preview modal
  const handleOpenProduct = (product) => {
    setSelectedProduct(product);
    setProductModalOpen(true);
  };

  // Handle booking form submission
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.name.trim() || !bookingForm.phone.trim()) {
      toast.error("Please provide your name and WhatsApp number.");
      return;
    }

    setIsSubmittingBooking(true);

    const message = `Hello TechieHelp Team! 👋%0A%0AI want to book the Career Service:%0A*${selectedService?.title}*%0A• Price: ₹${selectedService?.currentPrice}%0A• Duration: ${selectedService?.duration}%0A%0A*My Details:*%0A• Name: ${bookingForm.name}%0A• Phone: ${bookingForm.phone}%0A• Email: ${bookingForm.email || "Not specified"}%0A• College/Year: ${bookingForm.college || "Not specified"}%0A• Preferred Slot: ${bookingForm.preferredDate || "Earliest available"}%0A• Query: ${bookingForm.notes || "None"}%0A%0APlease confirm my booking slot and payment details. Thank you!`;

    // WhatsApp Direct Link
    const waUrl = `https://wa.me/917673825079?text=${message}`;

    setTimeout(() => {
      setIsSubmittingBooking(false);
      setBookingModalOpen(false);
      toast.success("Booking request initialized! Redirecting to TechieHelp support...");
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }, 600);
  };

  return (
    <section
      id="career-services"
      className="py-20 md:py-28 relative bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200/60 overflow-hidden"
    >
      {/* Subtle Background Lighting Accents */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-[110px] pointer-events-none -z-10" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* ==================================================== */}
        {/* MAIN SECTION HEADER */}
        {/* ==================================================== */}
        <div className="text-center mb-16 max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs md:text-sm font-bold shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>TechieHelp Career Marketplace &amp; Resources</span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#0B192C] tracking-tight leading-tight">
            Tired of Applying?{" "}
            <span className="text-[#1D4ED8]">Get the Career Support</span> You Need.
          </h2>

          <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Get personalised career guidance, improve your resume, prepare for interviews and access practical placement resources to move closer to your career goals.
          </p>
        </div>

        {/* ==================================================== */}
        {/* SUBSECTION ONE — CAREER SERVICES */}
        {/* ==================================================== */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-200 pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                <Briefcase className="w-3.5 h-3.5" />
                <span>1-on-1 Assistance</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Our Career Services
              </h3>
              <p className="text-slate-600 text-sm md:text-base mt-1">
                Get personalised support to prepare for opportunities and present your skills professionally.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {FILTER_TABS.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                      isActive
                        ? "bg-[#1D4ED8] text-white shadow-sm"
                        : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Service Cards Grid (Desktop 3 cols, Tablet 2 cols, Mobile 1 col) */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredServices.map((svc) => {
                const IconComponent = svc.icon;
                const hasDiscount = svc.originalPrice && svc.originalPrice > svc.currentPrice;
                const discountPercent = hasDiscount
                  ? Math.round(((svc.originalPrice - svc.currentPrice) / svc.originalPrice) * 100)
                  : 0;

                return (
                  <motion.div
                    key={svc.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`group bg-white rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                      svc.popular
                        ? "border-blue-400/80 shadow-md hover:shadow-xl hover:-translate-y-1"
                        : "border-slate-200/90 shadow-xs hover:shadow-lg hover:-translate-y-1 hover:border-blue-300"
                    }`}
                  >
                    {/* Top Glow Accent on Hover */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div>
                      {/* Badge Row */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                          {svc.category}
                        </span>

                        {svc.popular && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-50 border border-amber-300 text-amber-800 shadow-xs">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                            Popular
                          </span>
                        )}
                      </div>

                      {/* Icon & Title */}
                      <div className="flex items-start gap-3.5 mb-3">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${svc.iconBg}`}
                        >
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                            {svc.title}
                          </h4>
                          {svc.duration && (
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 font-medium">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              <span>{svc.duration}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        {svc.description}
                      </p>

                      {/* Key Highlights */}
                      <ul className="space-y-2 mb-4 pt-3 border-t border-slate-100">
                        {svc.highlights.map((point, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs font-medium text-slate-700"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Disclaimer if applicable */}
                      {svc.disclaimer && (
                        <div className="mb-4 p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/60 text-[11px] text-amber-900 leading-snug flex items-start gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span>{svc.disclaimer}</span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Pricing & CTA */}
                    <div className="pt-4 border-t border-slate-100 mt-auto">
                      <div className="flex items-baseline justify-between mb-4">
                        <div>
                          <span className="text-xs text-slate-500 font-medium block">
                            Service Fee
                          </span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black text-slate-900">
                              ₹{svc.currentPrice}
                            </span>
                            {hasDiscount && (
                              <span className="text-xs text-slate-400 line-through font-semibold">
                                ₹{svc.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>

                        {hasDiscount && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <BadgePercent className="w-3 h-3" />
                            {discountPercent}% OFF
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleOpenBooking(svc)}
                        className={`w-full py-3 rounded-2xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                          svc.popular
                            ? "bg-[#1D4ED8] hover:bg-[#1e40af] text-white shadow-md hover:shadow-lg"
                            : "bg-slate-900 hover:bg-slate-800 text-white shadow-xs"
                        }`}
                      >
                        <span>Book Now</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ==================================================== */}
        {/* VISUAL DIVIDER */}
        {/* ==================================================== */}
        <div className="relative my-16">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-slate-50 px-4 py-1.5 rounded-full border border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Curated Placement Materials</span>
            </span>
          </div>
        </div>

        {/* ==================================================== */}
        {/* SUBSECTION TWO — DIGITAL PRODUCTS */}
        {/* ==================================================== */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-200 pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                <FileCheck className="w-3.5 h-3.5" />
                <span>Verified Learning Kits</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Career Resources to Help You Prepare Smarter.
              </h3>
              <p className="text-slate-600 text-sm md:text-base mt-1">
                Explore curated preparation materials, editable templates and practical resources for your placement journey.
              </p>
            </div>

            <Link
              href="/prep-resources"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 text-xs md:text-sm font-bold shadow-xs transition-all shrink-0"
            >
              <span>View All 2026 Batch Resources</span>
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </Link>
          </div>

          {/* Product Cards Grid (Desktop 3 cols, Tablet 2 cols, Mobile 1 col) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIGITAL_PRODUCTS.map((prod) => {
              const hasDiscount = prod.originalPrice && prod.originalPrice > prod.currentPrice;

              return (
                <div
                  key={prod.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  {/* Product Cover Visual */}
                  <div
                    className={`relative p-6 bg-gradient-to-br ${prod.colorTheme} text-white flex flex-col justify-between min-h-[140px]`}
                  >
                    {/* Background Pattern */}
                    <div
                      className="absolute inset-0 opacity-10 bg-center"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, #fff 1px, transparent 1px)",
                        backgroundSize: "16px 16px"
                      }}
                    />

                    <div className="relative z-10 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-md text-white border border-white/20">
                        {prod.category}
                      </span>
                      <span
                        className={`text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                          prod.isFree
                            ? "bg-emerald-400 text-emerald-950 font-black"
                            : "bg-amber-400 text-amber-950 font-black"
                        }`}
                      >
                        {prod.isFree ? "100% FREE" : "PREMIUM"}
                      </span>
                    </div>

                    <div className="relative z-10 mt-4">
                      <span className="text-xs font-semibold text-white/80 block">
                        Format: {prod.format}
                      </span>
                      <h4 className="text-lg font-black text-white leading-tight mt-1 line-clamp-2">
                        {prod.title}
                      </h4>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-4">
                        {prod.description}
                      </p>

                      <ul className="space-y-1.5 mb-6">
                        {prod.features.map((feat, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-xs font-semibold text-slate-700"
                          >
                            <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom Pricing & Actions */}
                    <div className="pt-4 border-t border-slate-100 mt-auto">
                      <div className="flex items-baseline justify-between mb-4">
                        <div>
                          <span className="text-[11px] text-slate-500 font-medium block">
                            Access
                          </span>
                          <div className="flex items-baseline gap-2">
                            {prod.isFree ? (
                              <span className="text-xl font-black text-emerald-600">
                                FREE
                              </span>
                            ) : (
                              <>
                                <span className="text-xl font-black text-slate-900">
                                  ₹{prod.currentPrice}
                                </span>
                                {hasDiscount && (
                                  <span className="text-xs text-slate-400 line-through font-semibold">
                                    ₹{prod.originalPrice}
                                  </span>
                                )}
                              </>
                            )}
                          </div>
                        </div>

                        <span className="text-[11px] text-slate-500 font-medium">
                          Verified Material
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenProduct(prod)}
                          className="py-2.5 px-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Preview</span>
                        </button>

                        <Link
                          href={prod.downloadLink}
                          className="py-2.5 px-3 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                        >
                          <span>{prod.isFree ? "Access Now" : "Purchase Now"}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Banner to Dedicated Portal */}
          <div className="mt-12 rounded-3xl p-6 md:p-8 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
            <div className="space-y-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Dedicated Placement Knowledge Base</span>
              </div>
              <h4 className="text-xl md:text-2xl font-black tracking-tight">
                Looking for 100+ MNC Placement Papers, CS Notes &amp; Video Modules?
              </h4>
              <p className="text-sm text-slate-300 max-w-2xl">
                Explore our full digital library with company syllabus breakdown for TCS, Infosys, Accenture, Wipro, plus complete DSA Algorithms in C++, Java and Python.
              </p>
            </div>

            <Link
              href="/prep-resources"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm shadow-md hover:shadow-lg transition-all shrink-0 flex items-center gap-2"
            >
              <span>Explore Resource Hub</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

      {/* ==================================================== */}
      {/* BOOKING MODAL FOR CAREER SERVICES */}
      {/* ==================================================== */}
      <AnimatePresence>
        {bookingModalOpen && selectedService && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden my-8"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-950 to-indigo-950 p-6 text-white relative">
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(false)}
                  className="absolute top-5 right-5 text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/30">
                  {selectedService.category} Service
                </span>

                <h3 className="text-xl md:text-2xl font-black mt-2 leading-tight">
                  {selectedService.title}
                </h3>

                <div className="flex items-center gap-4 mt-3 text-xs text-blue-200 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {selectedService.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Verified
                  </span>
                  <span className="text-amber-400 font-bold text-sm">
                    ₹{selectedService.currentPrice}
                  </span>
                </div>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleBookingSubmit} className="p-6 space-y-4">
                <p className="text-xs text-slate-500 leading-relaxed">
                  {selectedService.bookingNote}
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={bookingForm.name}
                      onChange={(e) =>
                        setBookingForm({ ...bookingForm, name: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={bookingForm.phone}
                        onChange={(e) =>
                          setBookingForm({ ...bookingForm, phone: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. rahul@example.com"
                        value={bookingForm.email}
                        onChange={(e) =>
                          setBookingForm({ ...bookingForm, email: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        College / Current Year
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 3rd Year B.Tech CSE"
                        value={bookingForm.college}
                        onChange={(e) =>
                          setBookingForm({ ...bookingForm, college: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Preferred Date / Slot
                      </label>
                      <input
                        type="date"
                        value={bookingForm.preferredDate}
                        onChange={(e) =>
                          setBookingForm({ ...bookingForm, preferredDate: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Target Role or Questions
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Preparing for TCS Digital & Frontend Developer interviews..."
                      value={bookingForm.notes}
                      onChange={(e) =>
                        setBookingForm({ ...bookingForm, notes: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 resize-none"
                    />
                  </div>
                </div>

                {selectedService.disclaimer && (
                  <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200">
                    {selectedService.disclaimer}
                  </p>
                )}

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setBookingModalOpen(false)}
                    className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmittingBooking}
                    className="flex-1 py-3 rounded-xl bg-[#1D4ED8] hover:bg-[#1e40af] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmittingBooking ? (
                      <span>Connecting...</span>
                    ) : (
                      <>
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Confirm &amp; Proceed</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================== */}
      {/* PRODUCT PREVIEW MODAL */}
      {/* ==================================================== */}
      <AnimatePresence>
        {productModalOpen && selectedProduct && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden my-8"
            >
              <div
                className={`p-6 bg-gradient-to-br ${selectedProduct.colorTheme} text-white relative`}
              >
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="absolute top-5 right-5 text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 text-white">
                  {selectedProduct.category}
                </span>

                <h3 className="text-xl md:text-2xl font-black mt-2 leading-tight">
                  {selectedProduct.title}
                </h3>

                <div className="flex items-center gap-3 mt-3 text-xs text-white/80">
                  <span>Format: {selectedProduct.format}</span>
                  <span>•</span>
                  <span className="font-bold text-amber-300">
                    {selectedProduct.isFree ? "Free Resource" : `₹${selectedProduct.currentPrice}`}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-slate-600 text-sm leading-relaxed">
                  {selectedProduct.description}
                </p>

                <div>
                  <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Key Contents &amp; Highlights:
                  </h5>
                  <ul className="space-y-2">
                    {selectedProduct.features.map((feat, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs font-medium text-slate-700"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200/60 text-xs text-blue-900 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    Authorized material curated by TechieHelp Institute of AI placement mentors for 2025–2026 campus drives.
                  </span>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setProductModalOpen(false)}
                    className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
                  >
                    Close Preview
                  </button>

                  <Link
                    href={selectedProduct.downloadLink}
                    onClick={() => setProductModalOpen(false)}
                    className="flex-1 py-3 rounded-xl bg-[#1D4ED8] hover:bg-[#1e40af] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>{selectedProduct.isFree ? "Open Resource" : "Proceed to Purchase"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
