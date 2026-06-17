"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Shield,
  FileText,
  Database,
  Cookie,
  Share2,
  Lock,
  Globe,
  Users,
  UserCheck,
  Clock,
  MapPin,
  RefreshCw,
  Mail,
  Phone,
  ChevronRight,
  Copy,
  Check,
  ExternalLink,
  AlertCircle,
  Info,
  ArrowRight,
  Headphones,
  BookOpen,
  Eye,
  Trash2,
  Bell,
  MessageSquare,
  Building2,
  Scale,
  Sparkles,
  Home,
} from "lucide-react";

// ─── Section definitions ─────────────────────────────────────────────────────
const SECTIONS = [
  { id: "introduction",       label: "Introduction",            icon: BookOpen },
  { id: "information",        label: "Information We Collect",  icon: Database },
  { id: "usage",              label: "How We Use Information",  icon: Eye },
  { id: "cookies",            label: "Cookies & Tracking",      icon: Cookie },
  { id: "sharing",            label: "Sharing of Information",  icon: Share2 },
  { id: "security",           label: "Data Security",           icon: Lock },
  { id: "third-party",        label: "Third-Party Services",    icon: Globe },
  { id: "children",           label: "Children's Privacy",      icon: Users },
  { id: "rights",             label: "Your Rights",             icon: UserCheck },
  { id: "retention",          label: "Data Retention",          icon: Clock },
  { id: "international",      label: "International Users",     icon: MapPin },
  { id: "changes",            label: "Changes to This Policy",  icon: RefreshCw },
  { id: "contact",            label: "Contact Us",              icon: Mail },
];

// ─── Copy-link hook ──────────────────────────────────────────────────────────
function useCopyLink() {
  const [copiedId, setCopiedId] = useState(null);
  const copy = useCallback((id) => {
    const url = `${window.location.origin}/privacy#${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }, []);
  return { copiedId, copy };
}

// ─── Section heading component ───────────────────────────────────────────────
function SectionHeading({ number, id, icon: Icon, title, copiedId, onCopy }) {
  return (
    <div className="flex items-start gap-4 mb-8 group">
      <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0F4CBA] to-[#1a5cd6] flex items-center justify-center shadow-lg shadow-blue-900/20">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-[#F4B400] uppercase tracking-widest">
            Section {number}
          </span>
          <button
            onClick={() => onCopy(id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
            title="Copy link to this section"
          >
            {copiedId === id ? (
              <Check className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
        <h2
          id={id}
          className="text-2xl md:text-3xl font-bold text-slate-900 mt-1 scroll-mt-32"
        >
          {title}
        </h2>
      </div>
    </div>
  );
}

// ─── Info card ───────────────────────────────────────────────────────────────
function InfoCard({ children, variant = "default" }) {
  const variants = {
    default: "bg-blue-50/60 border-blue-100",
    warning: "bg-amber-50/60 border-amber-100",
    success: "bg-emerald-50/60 border-emerald-100",
  };
  return (
    <div className={`rounded-2xl border ${variants[variant]} backdrop-blur-sm p-5 my-5`}>
      {children}
    </div>
  );
}

// ─── Bullet list ─────────────────────────────────────────────────────────────
function BulletList({ items }) {
  return (
    <ul className="space-y-2.5 mt-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <ChevronRight className="w-4 h-4 text-[#0F4CBA] mt-0.5 flex-shrink-0" />
          <span className="text-slate-600 leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

// ─── Main client component ───────────────────────────────────────────────────
export default function PrivacyClient() {
  const [activeSection, setActiveSection] = useState("introduction");
  const { copiedId, copy } = useCopyLink();

  // Reading progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  // Intersection observer for active TOC highlight
  useEffect(() => {
    const observers = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen bg-white font-sans">
      {/* ── Reading progress bar ──────────────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0F4CBA] via-[#F4B400] to-[#0F4CBA] z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
        {/* grid bg */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#0F4CBA 1px,transparent 1px),linear-gradient(90deg,#0F4CBA 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* blobs */}
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-[#0F4CBA]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-56 h-56 bg-[#F4B400]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative">
          {/* breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-[#0F4CBA] transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-400">Legal & Compliance</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#0F4CBA] font-medium">Privacy Policy</span>
          </div>

          {/* badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#0F4CBA]/8 border border-[#0F4CBA]/20 text-[#0F4CBA] text-xs font-bold uppercase tracking-widest px-5 py-2 rounded-full mb-8"
          >
            <Scale className="w-3.5 h-3.5" />
            Legal &amp; Compliance
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-none"
          >
            Privacy{" "}
            <span className="bg-gradient-to-r from-[#0F4CBA] to-[#1e6fd9] bg-clip-text text-transparent">
              Policy
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Your privacy matters to us. This Privacy Policy explains how{" "}
            <strong className="text-slate-800">TechieHelp Institute of AI</strong> collects,
            uses, stores, and protects your information when you use our website,
            programs, internships, and services.
          </motion.p>

          {/* meta pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {[
              { icon: FileText, label: "Effective Date", value: "June 17, 2026" },
              { icon: RefreshCw, label: "Last Updated", value: "June 17, 2026" },
              { icon: Shield, label: "Jurisdiction", value: "India" },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm"
              >
                <div className="w-8 h-8 rounded-xl bg-[#0F4CBA]/8 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-[#0F4CBA]" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
                  <p className="text-sm font-semibold text-slate-800">{value}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Body ──────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="flex gap-12 xl:gap-16">

          {/* ── Sticky sidebar TOC ───────────────────────────────────── */}
          <aside className="hidden lg:block w-72 xl:w-80 flex-shrink-0">
            <div className="sticky top-28">
              <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-900/5 overflow-hidden">
                <div className="bg-gradient-to-br from-[#0F4CBA] to-[#1a5cd6] px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">Table of Contents</p>
                      <p className="text-blue-100 text-xs">{SECTIONS.length} sections</p>
                    </div>
                  </div>
                </div>
                <nav className="p-4 space-y-1 max-h-[70vh] overflow-y-auto scrollbar-thin">
                  {SECTIONS.map(({ id, label, icon: Icon }, i) => {
                    const isActive = activeSection === id;
                    return (
                      <button
                        key={id}
                        onClick={() => scrollTo(id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group ${
                          isActive
                            ? "bg-[#0F4CBA]/8 text-[#0F4CBA]"
                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                        }`}
                      >
                        <span
                          className={`text-[10px] font-black w-5 flex-shrink-0 ${
                            isActive ? "text-[#F4B400]" : "text-slate-300 group-hover:text-slate-400"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <Icon
                          className={`w-3.5 h-3.5 flex-shrink-0 ${
                            isActive ? "text-[#0F4CBA]" : "text-slate-300 group-hover:text-slate-500"
                          }`}
                        />
                        <span className="text-xs font-medium leading-tight">{label}</span>
                        {isActive && (
                          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#0F4CBA] flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </nav>
                <div className="px-4 pb-4">
                  <div className="border-t border-slate-100 pt-4">
                    <Link
                      href="mailto:techiehelpinstituteofai@gmail.com"
                      className="flex items-center gap-2 text-xs text-[#0F4CBA] font-semibold hover:underline"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Email our privacy team
                      <ExternalLink className="w-3 h-3 ml-auto" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* ── Main content ─────────────────────────────────────────── */}
          <article className="flex-1 min-w-0 space-y-16">

            {/* ── Section 1: Introduction ─────────────────────────────── */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow"
            >
              <SectionHeading number={1} id="introduction" icon={BookOpen} title="Introduction" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 leading-relaxed text-base md:text-lg">
                TechieHelp Institute of AI is committed to protecting your privacy. This policy explains how information is collected
                and used when students, institutions, and visitors interact with our platform.
              </p>
              <InfoCard>
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-[#0F4CBA] mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-600 leading-relaxed">
                    By accessing or using the TechieHelp Institute of AI platform, you agree to the collection and use of
                    information in accordance with this policy. If you do not agree, please discontinue use of our services.
                  </p>
                </div>
              </InfoCard>
            </motion.section>

            {/* ── Section 2: Information We Collect ──────────────────── */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow"
            >
              <SectionHeading number={2} id="information" icon={Database} title="Information We Collect" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 mb-8 leading-relaxed">
                We collect different types of information to provide and improve our services to you.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-[#0F4CBA]/4 to-[#0F4CBA]/8 border border-[#0F4CBA]/12 rounded-2xl p-6">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-[#0F4CBA]/12 flex items-center justify-center">
                      <Users className="w-4 h-4 text-[#0F4CBA]" />
                    </div>
                    <h3 className="font-bold text-slate-800">Personal Information</h3>
                  </div>
                  <BulletList items={[
                    "Full Name",
                    "Email Address",
                    "Phone Number",
                    "College / Institution Name",
                    "Academic Details & Year",
                    "Social Media Profiles (LinkedIn, GitHub)",
                    "Payment Information (if applicable)",
                  ]} />
                </div>
                <div className="bg-gradient-to-br from-[#F4B400]/4 to-[#F4B400]/8 border border-[#F4B400]/15 rounded-2xl p-6">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-[#F4B400]/15 flex items-center justify-center">
                      <Database className="w-4 h-4 text-[#c49000]" />
                    </div>
                    <h3 className="font-bold text-slate-800">Technical Information</h3>
                  </div>
                  <BulletList items={[
                    "IP Address",
                    "Browser Type & Version",
                    "Device Information",
                    "Operating System",
                    "Cookies & Session Data",
                    "Analytics & Usage Data",
                  ]} />
                </div>
              </div>
            </motion.section>

            {/* ── Section 3: How We Use Information ──────────────────── */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow"
            >
              <SectionHeading number={3} id="usage" icon={Eye} title="How We Use Information" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 mb-6 leading-relaxed">
                The information we collect is used exclusively to provide, improve, and secure our services.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { icon: Sparkles, text: "Provide training and internship services" },
                  { icon: FileText, text: "Issue certificates and verifiable credentials" },
                  { icon: MessageSquare, text: "Respond to inquiries and support requests" },
                  { icon: Eye, text: "Improve overall user experience" },
                  { icon: Bell, text: "Send newsletters and platform updates" },
                  { icon: UserCheck, text: "Process enrollment and applications" },
                  { icon: Lock, text: "Maintain platform security and integrity" },
                  { icon: Headphones, text: "Provide dedicated customer support" },
                ].map(({ icon: Icon, text }, i) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-50/70 rounded-xl px-4 py-3.5 border border-slate-100">
                    <div className="w-7 h-7 rounded-lg bg-[#0F4CBA]/8 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5 text-[#0F4CBA]" />
                    </div>
                    <span className="text-sm text-slate-700 font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* ── Section 4: Cookies ─────────────────────────────────── */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow"
            >
              <SectionHeading number={4} id="cookies" icon={Cookie} title="Cookies & Tracking Technologies" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 mb-6 leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience on our platform.
                Cookies are small data files stored on your device that help us understand how you use our services.
              </p>
              <div className="space-y-3 mb-6">
                {[
                  { label: "Analytics Cookies", desc: "Help us understand how visitors interact with our website (e.g., Google Analytics)." },
                  { label: "Performance Cookies", desc: "Optimize load times and ensure smooth platform functionality." },
                  { label: "Security Cookies", desc: "Protect users from fraudulent activity and maintain session integrity." },
                  { label: "Preference Cookies", desc: "Remember your settings and personalization options across visits." },
                ].map(({ label, desc }) => (
                  <div key={label} className="flex gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/60">
                    <Cookie className="w-4 h-4 text-[#F4B400] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800 mb-0.5">{label}</p>
                      <p className="text-sm text-slate-500">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <InfoCard variant="warning">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <strong className="text-slate-800">User Control:</strong> You may disable cookies at any time through your browser settings.
                    Note that disabling certain cookies may impact the functionality of some features on our platform.
                  </p>
                </div>
              </InfoCard>
            </motion.section>

            {/* ── Section 5: Sharing ─────────────────────────────────── */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow"
            >
              <SectionHeading number={5} id="sharing" icon={Share2} title="Sharing of Information" copiedId={copiedId} onCopy={copy} />
              <InfoCard variant="success">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    TechieHelp Institute of AI <strong>does not sell, rent, or trade</strong> your personal information to any third party.
                  </p>
                </div>
              </InfoCard>
              <p className="text-slate-600 mt-4 mb-4 leading-relaxed">
                We may share limited information only in the following circumstances:
              </p>
              <BulletList items={[
                "Payment providers for processing transactions securely (e.g., Razorpay)",
                "Analytics providers to improve platform performance (e.g., Google Analytics)",
                "Email service providers to send communications you've subscribed to",
                "Legal authorities when required by applicable law or court order",
                "Institutional partners only with your explicit prior consent",
              ]} />
            </motion.section>

            {/* ── Section 6: Data Security ───────────────────────────── */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow"
            >
              <SectionHeading number={6} id="security" icon={Lock} title="Data Security" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 mb-6 leading-relaxed">
                We implement industry-standard security practices to protect your personal information from unauthorized access,
                alteration, disclosure, or destruction.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                {[
                  { icon: Lock, label: "Encrypted Storage", desc: "All sensitive data is encrypted at rest using AES-256." },
                  { icon: Shield, label: "HTTPS Everywhere", desc: "All data in transit is secured via TLS 1.3 encryption." },
                  { icon: Eye, label: "Access Controls", desc: "Strict role-based access to protect user data internally." },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="bg-gradient-to-br from-slate-50 to-slate-100/60 border border-slate-200/60 rounded-2xl p-5 text-center">
                    <div className="w-10 h-10 rounded-2xl bg-[#0F4CBA]/10 flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-5 h-5 text-[#0F4CBA]" />
                    </div>
                    <p className="text-sm font-bold text-slate-800 mb-1">{label}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
              <InfoCard variant="warning">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-700 leading-relaxed">
                    No method of transmission over the internet or electronic storage is 100% secure.
                    While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.
                  </p>
                </div>
              </InfoCard>
            </motion.section>

            {/* ── Section 7: Third-Party Services ───────────────────── */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow"
            >
              <SectionHeading number={7} id="third-party" icon={Globe} title="Third-Party Services" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 mb-6 leading-relaxed">
                Our platform integrates with third-party services to deliver a complete experience. Each of these services
                has its own privacy policy governing their data practices.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {[
                  "Google Analytics",
                  "Razorpay",
                  "Email Services",
                  "YouTube",
                  "GitHub",
                  "LinkedIn",
                ].map((service) => (
                  <div key={service} className="flex items-center gap-2.5 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
                    <ExternalLink className="w-3.5 h-3.5 text-[#0F4CBA] flex-shrink-0" />
                    <span className="text-sm font-medium text-slate-700">{service}</span>
                  </div>
                ))}
              </div>
              <InfoCard>
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-[#0F4CBA] mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Users are encouraged to review the privacy policies of each third-party service independently.
                    TechieHelp Institute of AI is not responsible for the privacy practices of these external services.
                  </p>
                </div>
              </InfoCard>
            </motion.section>

            {/* ── Section 8: Children's Privacy ─────────────────────── */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow"
            >
              <SectionHeading number={8} id="children" icon={Users} title="Children's Privacy" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 mb-4 leading-relaxed">
                Our services are designed for students, graduates, and educational users seeking professional development.
              </p>
              <InfoCard variant="warning">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <strong className="text-slate-800">Age Restriction:</strong> Users under 13 years of age should access our
                    services only under parental or institutional supervision and guidance. We do not knowingly collect personal
                    information from children under 13. If we become aware of such collection, the information will be promptly deleted.
                  </p>
                </div>
              </InfoCard>
            </motion.section>

            {/* ── Section 9: Your Rights ─────────────────────────────── */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow"
            >
              <SectionHeading number={9} id="rights" icon={UserCheck} title="Your Rights" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 mb-6 leading-relaxed">
                You have the following rights with respect to your personal information held by TechieHelp Institute of AI:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { icon: Eye, label: "Right to Access", desc: "Request a copy of the personal information we hold about you." },
                  { icon: RefreshCw, label: "Right to Correction", desc: "Request correction of inaccurate or incomplete information." },
                  { icon: Trash2, label: "Right to Deletion", desc: "Request deletion of your personal data from our systems." },
                  { icon: UserCheck, label: "Withdraw Consent", desc: "Withdraw consent to process your information at any time." },
                  { icon: Bell, label: "Opt Out of Newsletters", desc: "Unsubscribe from marketing communications instantly." },
                  { icon: MessageSquare, label: "Privacy Concerns", desc: "Contact us to raise any privacy-related concerns or queries." },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex gap-4 p-4 bg-slate-50/70 rounded-2xl border border-slate-100">
                    <div className="w-9 h-9 rounded-xl bg-[#0F4CBA]/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-[#0F4CBA]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 mb-0.5">{label}</p>
                      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* ── Section 10: Data Retention ─────────────────────────── */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow"
            >
              <SectionHeading number={10} id="retention" icon={Clock} title="Data Retention" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 leading-relaxed mb-4">
                We retain your personal information only for as long as necessary to fulfil the purposes for which it was collected,
                including to provide services, resolve disputes, and comply with legal obligations.
              </p>
              <BulletList items={[
                "Account data is retained for the duration of your active relationship with us",
                "Certificate and academic records are retained for verification purposes",
                "Transaction records are retained as required by financial regulations",
                "Analytics data is retained in anonymized form only",
                "Data is securely deleted upon your request where legally permissible",
              ]} />
            </motion.section>

            {/* ── Section 11: International Users ───────────────────── */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow"
            >
              <SectionHeading number={11} id="international" icon={MapPin} title="International Users" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 mb-4 leading-relaxed">
                TechieHelp Institute of AI is operated from India and governed by Indian law.
              </p>
              <InfoCard>
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-[#0F4CBA] mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Users accessing the platform from outside India acknowledge and agree that their information may be transferred to,
                    stored in, and processed in India in accordance with the Information Technology Act, 2000 and applicable Indian
                    data protection regulations.
                  </p>
                </div>
              </InfoCard>
            </motion.section>

            {/* ── Section 12: Changes ────────────────────────────────── */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow"
            >
              <SectionHeading number={12} id="changes" icon={RefreshCw} title="Changes to This Policy" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 mb-4 leading-relaxed">
                TechieHelp Institute of AI reserves the right to update or modify this Privacy Policy at any time to reflect changes
                in our practices, technology, legal requirements, or other operational factors.
              </p>
              <BulletList items={[
                "Changes become effective immediately upon publication on this page",
                "The 'Last Updated' date at the top of this page will reflect the most recent revision",
                "Significant changes will be communicated to registered users via email",
                "Continued use of our services after changes constitutes acceptance of the updated policy",
              ]} />
            </motion.section>

            {/* ── Section 13: Contact ────────────────────────────────── */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-[#0F4CBA] to-[#1a5cd6] border border-[#0F4CBA]/20 rounded-3xl p-8 md:p-10 shadow-xl shadow-[#0F4CBA]/15"
            >
              <div className="flex items-start gap-4 mb-8">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#F4B400] uppercase tracking-widest">Section 13</span>
                  <h2 id="contact" className="text-2xl md:text-3xl font-bold text-white mt-1 scroll-mt-32">Contact Us</h2>
                </div>
              </div>

              <p className="text-blue-100 mb-8 leading-relaxed">
                If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data,
                please reach out to us through any of the following channels.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Building2, label: "Organization", value: "TechieHelp Institute of AI" },
                  { icon: Mail,      label: "General Email", value: "techiehelpinstituteofai@gmail.com", href: "mailto:techiehelpinstituteofai@gmail.com" },
                  { icon: Headphones,label: "Support Email", value: "support@techiehelp.in", href: "mailto:support@techiehelp.in" },
                  { icon: Phone,     label: "Phone",         value: "+91 7673825079", href: "tel:+917673825079" },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
                    <div className="flex items-center gap-2.5 mb-2">
                      <Icon className="w-4 h-4 text-[#F4B400]" />
                      <p className="text-xs font-bold text-blue-200 uppercase tracking-wider">{label}</p>
                    </div>
                    {href ? (
                      <a href={href} className="text-sm font-semibold text-white hover:text-[#F4B400] transition-colors break-all">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-white">{value}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-white/10 border border-white/20 rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#F4B400] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-blue-200 uppercase tracking-wider mb-1">Mailing Address</p>
                    <p className="text-sm text-white leading-relaxed">
                      Vivek Vihar Sector 14, Block D, Room No. 31<br />India
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* ── Bottom disclaimer ──────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-slate-50/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 text-center"
            >
              <Scale className="w-6 h-6 text-[#0F4CBA] mx-auto mb-3" />
              <p className="text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
                By using TechieHelp Institute of AI, you acknowledge that you have read, understood, and agree to be
                bound by this Privacy Policy.
              </p>
            </motion.div>

          </article>
        </div>
      </div>

      {/* ── Bottom CTA ────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-slate-50 to-slate-100/60 border-t border-slate-200 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#F4B400]/10 border border-[#F4B400]/25 text-[#c49000] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <Headphones className="w-3.5 h-3.5" />
              We're here to help
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
              Questions About Privacy?
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Our privacy team is ready to assist you with any questions, data requests, or concerns you may have.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="mailto:support@techiehelp.in"
                className="inline-flex items-center gap-2.5 bg-[#0F4CBA] hover:bg-[#0d42a3] text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-[#0F4CBA]/25 hover:shadow-xl hover:shadow-[#0F4CBA]/30 hover:-translate-y-0.5"
              >
                <Headphones className="w-4 h-4" />
                Get Support
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="mailto:techiehelpinstituteofai@gmail.com"
                className="inline-flex items-center gap-2.5 bg-white hover:bg-slate-50 text-slate-800 font-bold px-8 py-4 rounded-2xl transition-all duration-200 border border-slate-200 hover:border-slate-300 shadow-sm hover:-translate-y-0.5"
              >
                <Mail className="w-4 h-4" />
                Email Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Mobile TOC (floating bottom pill) ────────────────────────── */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <details className="relative group">
          <summary className="cursor-pointer list-none flex items-center gap-2.5 bg-white/90 backdrop-blur-xl border border-slate-200 shadow-xl rounded-full px-5 py-3 text-sm font-bold text-slate-700">
            <BookOpen className="w-4 h-4 text-[#0F4CBA]" />
            Jump to Section
            <ChevronRight className="w-4 h-4 rotate-90" />
          </summary>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl p-3 space-y-1 max-h-80 overflow-y-auto">
            {SECTIONS.map(({ id, label, icon: Icon }, i) => (
              <button
                key={id}
                onClick={() => {
                  scrollTo(id);
                  document.querySelector("details")?.removeAttribute("open");
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-medium transition-colors ${
                  activeSection === id
                    ? "bg-[#0F4CBA]/8 text-[#0F4CBA]"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span className="text-[9px] font-black text-slate-300 w-4">{String(i + 1).padStart(2, "0")}</span>
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                {label}
              </button>
            ))}
          </div>
        </details>
      </div>
    </main>
  );
}
