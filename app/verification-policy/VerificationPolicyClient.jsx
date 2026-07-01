"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Info, Link as LinkIcon, Settings, Activity, Users, List,
  ShieldCheck, XCircle, Briefcase, UserCheck, Lock, Mail, Check,
  ChevronRight, Copy, Home, FileText, Phone, Building2, CheckCircle2,
  Clock, AlertTriangle, ExternalLink
} from "lucide-react";

const SECTIONS = [
  { id: "purpose", label: "Purpose", icon: Info },
  { id: "portal", label: "Official Verification Portal", icon: LinkIcon },
  { id: "process", label: "Verification Process", icon: Settings },
  { id: "status", label: "Verification Status", icon: Activity },
  { id: "who-can", label: "Who Can Verify?", icon: Users },
  { id: "information", label: "Information Displayed", icon: List },
  { id: "security", label: "Certificate Security", icon: ShieldCheck },
  { id: "invalid", label: "Invalid Certificates", icon: XCircle },
  { id: "employers", label: "Employer Guidelines", icon: Briefcase },
  { id: "students", label: "Student Responsibilities", icon: UserCheck },
  { id: "privacy", label: "Privacy", icon: Lock },
  { id: "contact", label: "Contact", icon: Mail },
];

function useCopyLink() {
  const [copiedId, setCopiedId] = useState(null);
  const copy = useCallback((id) => {
    const url = `${window.location.origin}/verification-policy#${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }, []);
  return { copiedId, copy };
}

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
            {copiedId === id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
        <h2 id={id} className="text-2xl md:text-3xl font-bold text-slate-900 mt-1 scroll-mt-32">
          {title}
        </h2>
      </div>
    </div>
  );
}

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

export default function VerificationPolicyClient() {
  const [activeSection, setActiveSection] = useState("purpose");
  const { copiedId, copy } = useCopyLink();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

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
    <main className="min-h-screen bg-white font-sans print:bg-white print:text-black">
      <motion.div className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0F4CBA] via-[#F4B400] to-[#0F4CBA] z-[60] origin-left print:hidden" style={{ scaleX }} />

      <section className="relative pt-36 pb-20 overflow-hidden bg-gradient-to-b from-slate-50 to-white border-b border-slate-100 print:pt-10 print:pb-5">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative">
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-8 print:hidden">
            <Link href="/" className="hover:text-[#0F4CBA] transition-colors flex items-center gap-1"><Home className="w-3.5 h-3.5" /> Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-400">Legal</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#0F4CBA] font-medium">Certificate Verification Policy</span>
          </div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-none">
            Certificate <span className="bg-gradient-to-r from-[#0F4CBA] to-[#1e6fd9] bg-clip-text text-transparent">Verification Policy</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            This policy explains how TechieHelp Institute of AI verifies the authenticity of certificates, internships, training programs, and professional credentials issued through our platform.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap items-center justify-center gap-4 print:hidden">
            <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-[#0F4CBA]/8 flex items-center justify-center"><CheckCircle2 className="w-4 h-4 text-[#0F4CBA]" /></div>
              <div className="text-left"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Last Updated</p><p className="text-sm font-semibold text-slate-800">June 18, 2026</p></div>
            </div>
            <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-[#0F4CBA]/8 flex items-center justify-center"><FileText className="w-4 h-4 text-[#0F4CBA]" /></div>
              <div className="text-left"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Reading Time</p><p className="text-sm font-semibold text-slate-800">5 mins</p></div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="flex gap-12 xl:gap-16">
          <aside className="hidden lg:block w-72 xl:w-80 flex-shrink-0 print:hidden">
            <div className="sticky top-28">
              <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-900/5 overflow-hidden">
                <div className="bg-gradient-to-br from-[#0F4CBA] to-[#1a5cd6] px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center"><ShieldCheck className="w-4 h-4 text-white" /></div>
                    <div><p className="text-white font-bold text-sm">Table of Contents</p><p className="text-blue-100 text-xs">{SECTIONS.length} sections</p></div>
                  </div>
                </div>
                <nav className="p-4 space-y-1 max-h-[70vh] overflow-y-auto scrollbar-thin">
                  {SECTIONS.map(({ id, label, icon: Icon }, i) => {
                    const isActive = activeSection === id;
                    return (
                      <button key={id} onClick={() => scrollTo(id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group ${isActive ? "bg-[#0F4CBA]/8 text-[#0F4CBA]" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`}>
                        <span className={`text-[10px] font-black w-5 flex-shrink-0 ${isActive ? "text-[#F4B400]" : "text-slate-300"}`}>{String(i + 1).padStart(2, "0")}</span>
                        <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-[#0F4CBA]" : "text-slate-300 group-hover:text-slate-500"}`} />
                        <span className="text-xs font-medium leading-tight">{label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </aside>

          <article className="flex-1 min-w-0 space-y-16">
            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow print:shadow-none print:border-none print:p-0 print:mb-8">
              <SectionHeading number={1} id="purpose" icon={Info} title="Purpose" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 leading-relaxed text-base md:text-lg mb-4">
                The Certificate Verification Policy establishes the standards and procedures used by TechieHelp Institute of AI to validate certificates issued through its training programs, internship programs, workshops, certifications, and career development initiatives.
              </p>
              <p className="text-slate-600 leading-relaxed text-base md:text-lg">
                The purpose of this policy is to help employers, educational institutions, Training & Placement Officers (TPOs), recruiters, and learners verify the authenticity of issued credentials.
              </p>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow print:shadow-none print:border-none print:p-0 print:mb-8">
              <SectionHeading number={2} id="portal" icon={LinkIcon} title="Official Verification Portal" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 leading-relaxed mb-6">
                All certificates issued by TechieHelp Institute of AI can only be verified through the official verification portal.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-6 text-center">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Official Verification Portal</p>
                <a href="https://techiehelpinstituteofai.in/verify-certificate" target="_blank" rel="noopener noreferrer" className="text-lg md:text-xl font-bold text-[#0F4CBA] hover:text-[#0a3a94] flex items-center justify-center gap-2 transition-colors">
                  techiehelpinstituteofai.in/verify-certificate <ExternalLink className="w-5 h-5" />
                </a>
              </div>
              <p className="text-slate-800 font-medium">
                Verification requests made through unofficial sources should not be considered valid.
              </p>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow print:shadow-none print:border-none print:p-0 print:mb-8">
              <SectionHeading number={3} id="process" icon={Settings} title="Verification Process" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 leading-relaxed mb-4">Every issued certificate contains:</p>
              <div className="grid md:grid-cols-2 gap-3 mb-6">
                {["Unique Certificate ID", "Verification ID", "QR Code (where applicable)", "Digital Verification Record", "Issue Date", "Program Details", "Student Information"].map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
                    <Check className="w-4 h-4 text-[#0F4CBA]" />
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed">
                The verification portal matches the submitted Certificate ID against TechieHelp Institute of AI's official records before displaying the verification result.
              </p>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow print:shadow-none print:border-none print:p-0 print:mb-8">
              <SectionHeading number={4} id="status" icon={Activity} title="Verification Status" copiedId={copiedId} onCopy={copy} />
              <div className="space-y-4">
                {[
                  { title: "Verified", desc: "The certificate is authentic and matches the official records.", icon: CheckCircle2, color: "emerald" },
                  { title: "Pending", desc: "The certificate is still being processed or published.", icon: Clock, color: "blue" },
                  { title: "Expired", desc: "The certificate is no longer active due to program policies.", icon: AlertTriangle, color: "amber" },
                  { title: "Revoked", desc: "The certificate has been cancelled because of policy violations, fraud, or administrative action.", icon: XCircle, color: "red" },
                  { title: "Not Found", desc: "The Certificate ID does not exist or has been entered incorrectly.", icon: XCircle, color: "slate" }
                ].map(({ title, desc, icon: Icon, color }) => (
                  <div key={title} className={`flex gap-4 p-5 rounded-2xl border bg-${color}-50/40 border-${color}-100`}>
                    <div className={`bg-${color}-100/50 p-2 rounded-xl h-fit`}>
                      <Icon className={`w-5 h-5 text-${color}-600`} />
                    </div>
                    <div>
                      <h3 className="text-md font-bold text-slate-900 mb-1">{title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow print:shadow-none print:border-none print:p-0 print:mb-8">
              <SectionHeading number={5} id="who-can" icon={Users} title="Who Can Verify?" copiedId={copiedId} onCopy={copy} />
              <div className="flex flex-wrap gap-3">
                {["Employers", "Recruiters", "Companies", "Training & Placement Officers (TPOs)", "Educational Institutions", "Government Organizations", "Students", "Interns", "General Public"].map((item) => (
                  <span key={item} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm font-medium text-slate-700">
                    {item}
                  </span>
                ))}
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow print:shadow-none print:border-none print:p-0 print:mb-8">
              <SectionHeading number={6} id="information" icon={List} title="Information Displayed During Verification" copiedId={copiedId} onCopy={copy} />
              <div className="grid md:grid-cols-2 gap-3">
                {["Certificate ID", "Student Name", "Program Name", "Program Type", "Internship Domain", "Issue Date", "Completion Date", "Credential Status", "Verification Status", "Verification Timestamp", "Issuing Organization"].map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
                    <List className="w-4 h-4 text-[#0F4CBA]" />
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow print:shadow-none print:border-none print:p-0 print:mb-8">
              <SectionHeading number={7} id="security" icon={ShieldCheck} title="Certificate Security" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 leading-relaxed mb-6">
                TechieHelp Institute of AI uses secure digital verification mechanisms to maintain the integrity of issued credentials. Our verification system is designed to:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {["Detect unauthorized modifications", "Validate official records", "Prevent duplicate credentials", "Protect certificate authenticity", "Maintain permanent verification history"].map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-emerald-50/50 border border-emerald-100 rounded-xl p-4">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-sm font-semibold text-slate-800">{item}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow print:shadow-none print:border-none print:p-0 print:mb-8">
              <SectionHeading number={8} id="invalid" icon={XCircle} title="Invalid Certificates" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 leading-relaxed mb-4">Certificates should be considered invalid if:</p>
              <BulletList items={[
                "Certificate ID cannot be verified",
                "Certificate has been revoked",
                "Certificate has been altered",
                "Certificate information does not match official records"
              ]} />
              <div className="mt-6 bg-red-50/60 border border-red-100 rounded-2xl p-5">
                <p className="text-sm text-red-800 font-bold leading-relaxed">
                  Fraudulent or modified certificates may result in legal or disciplinary action.
                </p>
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow print:shadow-none print:border-none print:p-0 print:mb-8">
              <SectionHeading number={9} id="employers" icon={Briefcase} title="Employer Guidelines" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 leading-relaxed mb-4">
                Recruiters and institutions should always verify certificates using the official verification portal before accepting them as proof of training or internship completion.
              </p>
              <p className="text-slate-800 font-bold leading-relaxed">
                Verification results displayed by the portal should be considered the official source of truth.
              </p>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow print:shadow-none print:border-none print:p-0 print:mb-8">
              <SectionHeading number={10} id="students" icon={UserCheck} title="Student Responsibilities" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 leading-relaxed mb-4">Students must:</p>
              <BulletList items={[
                "Keep their Certificate ID secure.",
                "Share only authentic certificates.",
                "Avoid modifying issued certificates.",
                "Report verification issues immediately."
              ]} />
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow print:shadow-none print:border-none print:p-0 print:mb-8">
              <SectionHeading number={11} id="privacy" icon={Lock} title="Privacy" copiedId={copiedId} onCopy={copy} />
              <BulletList items={[
                "Only information necessary for verification is displayed.",
                "Sensitive personal information is never publicly disclosed.",
                "Verification records are handled in accordance with the Privacy Policy."
              ]} />
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="bg-gradient-to-br from-[#0F4CBA] to-[#1a5cd6] border border-[#0F4CBA]/20 rounded-3xl p-8 md:p-10 shadow-xl shadow-[#0F4CBA]/15 print:bg-white print:border-none print:shadow-none print:p-0 print:text-black print:mb-8">
              <div className="flex items-start gap-4 mb-8">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center print:hidden"><Mail className="w-5 h-5 text-white" /></div>
                <div><span className="text-xs font-bold text-[#F4B400] uppercase tracking-widest print:text-black">Section 12</span><h2 id="contact" className="text-2xl md:text-3xl font-bold text-white mt-1 scroll-mt-32 print:text-black">Contact</h2></div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Mail, label: "Email", value: "support@techiehelp.in", href: "mailto:support@techiehelp.in" },
                  { icon: Mail, label: "Alternate Email", value: "techiehelpinstituteofai@gmail.com", href: "mailto:techiehelpinstituteofai@gmail.com" },
                  { icon: Phone, label: "Phone", value: "+91 7673825079", href: "tel:+917673825079" },
                  { icon: Building2, label: "Address", value: "Vivek Vihar Sector 14, Block D, Room No. 31, Jodhpur, Rajasthan, India", href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 print:border-slate-200">
                    <div className="flex items-center gap-2.5 mb-2"><Icon className="w-4 h-4 text-[#F4B400] print:text-slate-600" /><p className="text-xs font-bold text-blue-200 uppercase tracking-wider print:text-slate-600">{label}</p></div>
                    {href ? <a href={href} className="text-sm font-semibold text-white hover:text-[#F4B400] transition-colors print:text-black">{value}</a> : <p className="text-sm font-semibold text-white print:text-black">{value}</p>}
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Important Notice Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-900/10 relative overflow-hidden text-white">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#0F4CBA]" />
                <div className="flex items-start gap-4">
                  <div className="bg-slate-800 p-3 rounded-full shrink-0">
                    <ShieldCheck className="w-6 h-6 text-[#F4B400]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Official Verification Notice</h3>
                    <p className="text-slate-300 leading-relaxed mb-2">
                      Only certificates successfully verified through the official TechieHelp Institute of AI Verification Portal should be considered authentic.
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                      Certificates that cannot be verified should not be accepted as valid proof of completion.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </article>
        </div>
      </div>

      <section className="bg-gradient-to-br from-slate-50 to-slate-100/60 border-t border-slate-200 py-20 px-4 print:hidden">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 bg-[#F4B400]/10 border border-[#F4B400]/25 text-[#c49000] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <ShieldCheck className="w-3.5 h-3.5" /> Verification
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-8">Need Help Verifying a Certificate?</h2>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/verify-certificate" className="px-6 py-3 rounded-xl bg-[#0F4CBA] text-white font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">Verify Certificate</Link>
              <Link href="/contact" className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all">Contact Verification Team</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
