"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  FileText, CheckSquare, Info, UserCheck, BookOpen, Briefcase, CreditCard,
  Award, ShieldAlert, Copyright, Globe, AlertTriangle, Lock, RefreshCw,
  Mail, ChevronRight, Copy, Check, Home, Scale, Phone, Building2, ExternalLink
} from "lucide-react";

const SECTIONS = [
  { id: "acceptance", label: "Acceptance of Terms", icon: CheckSquare },
  { id: "about", label: "About TechieHelp", icon: Info },
  { id: "eligibility", label: "User Eligibility", icon: UserCheck },
  { id: "programs", label: "Training & Internship", icon: BookOpen },
  { id: "placement", label: "Placement Support", icon: Briefcase },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "responsibilities", label: "User Responsibilities", icon: ShieldAlert },
  { id: "ip", label: "Intellectual Property", icon: Copyright },
  { id: "third-party", label: "Third-Party Links", icon: Globe },
  { id: "liability", label: "Limitation of Liability", icon: AlertTriangle },
  { id: "privacy", label: "Privacy", icon: Lock },
  { id: "modifications", label: "Modifications", icon: RefreshCw },
  { id: "contact", label: "Contact Information", icon: Mail },
];

function useCopyLink() {
  const [copiedId, setCopiedId] = useState(null);
  const copy = useCallback((id) => {
    const url = `${window.location.origin}/terms#${id}`;
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

function InfoCard({ children, variant = "default" }) {
  const variants = {
    default: "bg-blue-50/60 border-blue-100",
    warning: "bg-amber-50/60 border-amber-100",
    success: "bg-emerald-50/60 border-emerald-100",
    danger: "bg-red-50/60 border-red-100",
  };
  return <div className={`rounded-2xl border ${variants[variant]} backdrop-blur-sm p-5 my-5`}>{children}</div>;
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

export default function TermsClient() {
  const [activeSection, setActiveSection] = useState("acceptance");
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
            <span className="text-[#0F4CBA] font-medium">Terms & Conditions</span>
          </div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-none">
            Terms & <span className="bg-gradient-to-r from-[#0F4CBA] to-[#1e6fd9] bg-clip-text text-transparent">Conditions</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            Please read these Terms & Conditions carefully before using TechieHelp Institute of AI's website, training programs, internship platform, certifications, and career services.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap items-center justify-center gap-4 print:hidden">
            <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-[#0F4CBA]/8 flex items-center justify-center"><RefreshCw className="w-4 h-4 text-[#0F4CBA]" /></div>
              <div className="text-left"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Last Updated</p><p className="text-sm font-semibold text-slate-800">June 18, 2026</p></div>
            </div>
            <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-[#0F4CBA]/8 flex items-center justify-center"><BookOpen className="w-4 h-4 text-[#0F4CBA]" /></div>
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
                    <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center"><FileText className="w-4 h-4 text-white" /></div>
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
              <SectionHeading number={1} id="acceptance" icon={CheckSquare} title="Acceptance of Terms" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 leading-relaxed text-base md:text-lg">
                By accessing or using TechieHelp Institute of AI, you agree to comply with and be bound by these Terms & Conditions. If you do not agree with any part of these terms, you must not use our website or services.
              </p>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow print:shadow-none print:border-none print:p-0 print:mb-8">
              <SectionHeading number={2} id="about" icon={Info} title="About TechieHelp Institute of AI" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 leading-relaxed mb-4">
                TechieHelp Institute of AI is an educational technology platform dedicated to empowering students and professionals. Our services include:
              </p>
              <BulletList items={[
                "Industry-focused Training Programs",
                "Internship Programs",
                "Professional Certifications",
                "Career Development Services",
                "Resume Building & Interview Preparation",
                "Placement Support",
                "Workshops & Seminars",
                "Campus Ambassador Programs",
                "College & TPO Partnerships"
              ]} />
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow print:shadow-none print:border-none print:p-0 print:mb-8">
              <SectionHeading number={3} id="eligibility" icon={UserCheck} title="User Eligibility" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 leading-relaxed mb-4">
                By registering on our platform, you agree to provide accurate, current, and complete information. 
              </p>
              <InfoCard variant="warning">
                <p className="text-sm text-slate-700 leading-relaxed">
                  Students are responsible for maintaining the confidentiality of their account credentials. The provision of false information may result in immediate account suspension or termination.
                </p>
              </InfoCard>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow print:shadow-none print:border-none print:p-0 print:mb-8">
              <SectionHeading number={4} id="programs" icon={BookOpen} title="Training & Internship Programs" copiedId={copiedId} onCopy={copy} />
              <BulletList items={[
                "Program structure, curriculum, and duration may change based on industry requirements.",
                "Completion certificates are issued only after successfully meeting all program requirements.",
                "Attendance, assignments, and project submissions may be mandatory depending on the enrolled program.",
                "Internships are entirely learning-oriented to provide real-world experience, unless explicitly mentioned as paid internships."
              ]} />
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow print:shadow-none print:border-none print:p-0 print:mb-8">
              <SectionHeading number={5} id="placement" icon={Briefcase} title="Placement Support" copiedId={copiedId} onCopy={copy} />
              <InfoCard>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  TechieHelp provides dedicated placement assistance, however, this does <strong>not</strong> guarantee employment.
                </p>
              </InfoCard>
              <BulletList items={[
                "Hiring decisions are made solely by recruiting companies based on their criteria and requirements.",
                "Students are responsible for their own interview preparation, professional communication, and performance."
              ]} />
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow print:shadow-none print:border-none print:p-0 print:mb-8">
              <SectionHeading number={6} id="payments" icon={CreditCard} title="Payments" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 leading-relaxed mb-4">
                All fees associated with our programs are transparently stated during the registration process.
              </p>
              <BulletList items={[
                "Registration fees and course fees are generally non-refundable unless explicitly stated otherwise.",
                "Refunds (if applicable) follow the terms outlined in our official Refund Policy.",
                "Applicable taxes may apply to services where required by law."
              ]} />
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow print:shadow-none print:border-none print:p-0 print:mb-8">
              <SectionHeading number={7} id="certificates" icon={Award} title="Certificates" copiedId={copiedId} onCopy={copy} />
              <BulletList items={[
                "Certificates are issued only after successful completion of all program components.",
                "Misuse, forgery, or unauthorized modification of certificates is strictly prohibited.",
                "Verification of all issued credentials is available through our official certificate verification portal."
              ]} />
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow print:shadow-none print:border-none print:p-0 print:mb-8">
              <SectionHeading number={8} id="responsibilities" icon={ShieldAlert} title="User Responsibilities" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 leading-relaxed mb-4">Users must abide by the following rules. You must <strong>not</strong>:</p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                {["Share accounts", "Upload malicious files", "Misuse the platform", "Copy paid content", "Harass mentors or other learners"].map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-red-50/50 border border-red-100 rounded-xl px-4 py-3">
                    <ShieldAlert className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <InfoCard variant="danger">
                <p className="text-sm text-red-800 leading-relaxed">
                  Violation of any of these responsibilities may lead to immediate account suspension without refund and potential legal action.
                </p>
              </InfoCard>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow print:shadow-none print:border-none print:p-0 print:mb-8">
              <SectionHeading number={9} id="ip" icon={Copyright} title="Intellectual Property" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 leading-relaxed">
                All website content, branding, logos, graphics, training materials, videos, projects, and documents belong to TechieHelp Institute of AI unless otherwise stated. Unauthorized copying, distribution, or reproduction of any materials is strictly prohibited.
              </p>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow print:shadow-none print:border-none print:p-0 print:mb-8">
              <SectionHeading number={10} id="third-party" icon={Globe} title="Third-Party Links" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 leading-relaxed mb-4">
                The website may contain links to third-party platforms.
              </p>
              <InfoCard>
                <p className="text-sm text-slate-700 leading-relaxed">
                  TechieHelp Institute of AI is not responsible for the content, privacy policies, or practices of any external websites or services.
                </p>
              </InfoCard>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow print:shadow-none print:border-none print:p-0 print:mb-8">
              <SectionHeading number={11} id="liability" icon={AlertTriangle} title="Limitation of Liability" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 leading-relaxed mb-4">
                TechieHelp Institute of AI is not liable for:
              </p>
              <BulletList items={[
                "Employment outcomes or failure to secure placement",
                "Technical interruptions, downtime, or network failures",
                "Errors, inaccuracies, or omissions from third-party services",
                "Data loss resulting from events beyond our reasonable control"
              ]} />
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow print:shadow-none print:border-none print:p-0 print:mb-8">
              <SectionHeading number={12} id="privacy" icon={Lock} title="Privacy" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 leading-relaxed mb-4">
                Use of personal information is governed by our Privacy Policy.
              </p>
              <Link href="/privacy" className="inline-flex items-center gap-2 text-sm font-bold text-[#0F4CBA] hover:text-blue-700 transition-colors">
                Read our Privacy Policy <ExternalLink className="w-4 h-4" />
              </Link>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow print:shadow-none print:border-none print:p-0 print:mb-8">
              <SectionHeading number={13} id="modifications" icon={RefreshCw} title="Modifications" copiedId={copiedId} onCopy={copy} />
              <BulletList items={[
                "These Terms may be updated at any time without prior notice.",
                "Continued use of the platform after updates indicates your acceptance of the revised Terms."
              ]} />
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="bg-gradient-to-br from-[#0F4CBA] to-[#1a5cd6] border border-[#0F4CBA]/20 rounded-3xl p-8 md:p-10 shadow-xl shadow-[#0F4CBA]/15 print:bg-white print:border-none print:shadow-none print:p-0 print:text-black print:mb-8">
              <div className="flex items-start gap-4 mb-8">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center print:hidden"><Mail className="w-5 h-5 text-white" /></div>
                <div><span className="text-xs font-bold text-[#F4B400] uppercase tracking-widest print:text-black">Section 14</span><h2 id="contact" className="text-2xl md:text-3xl font-bold text-white mt-1 scroll-mt-32 print:text-black">Contact Information</h2></div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Mail, label: "Email", value: "techiehelpinstituteofai@gmail.com", href: "mailto:techiehelpinstituteofai@gmail.com" },
                  { icon: Phone, label: "Phone", value: "+91 7673825079", href: "tel:+917673825079" },
                  { icon: Globe, label: "Website", value: "techiehelpinstituteofai.in", href: "https://techiehelpinstituteofai.in" },
                  { icon: Building2, label: "Address", value: "Vivek Vihar, Sector 14, Block D, Room No. 31, Jodhpur, Rajasthan, India", href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 print:border-slate-200">
                    <div className="flex items-center gap-2.5 mb-2"><Icon className="w-4 h-4 text-[#F4B400] print:text-slate-600" /><p className="text-xs font-bold text-blue-200 uppercase tracking-wider print:text-slate-600">{label}</p></div>
                    {href ? <a href={href} className="text-sm font-semibold text-white hover:text-[#F4B400] transition-colors print:text-black">{value}</a> : <p className="text-sm font-semibold text-white print:text-black">{value}</p>}
                  </div>
                ))}
              </div>
            </motion.section>
          </article>
        </div>
      </div>

      <section className="bg-gradient-to-br from-slate-50 to-slate-100/60 border-t border-slate-200 py-20 px-4 print:hidden">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 bg-[#F4B400]/10 border border-[#F4B400]/25 text-[#c49000] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <Info className="w-3.5 h-3.5" /> Support
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">Questions About These Terms?</h2>
            <p className="text-slate-600 mb-8 max-w-xl mx-auto">
              If you have any questions regarding these Terms & Conditions, our team is happy to help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="px-6 py-3 rounded-xl bg-[#0F4CBA] text-white font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">Contact Us</Link>
              <Link href="/privacy" className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all">Privacy Policy</Link>
              <Link href="/refund-policy" className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all">Refund Policy</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
