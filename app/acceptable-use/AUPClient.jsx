"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Info, Users, CheckCircle, XCircle, Briefcase, Copyright, Lock, Scale,
  AlertTriangle, RefreshCw, Mail, Check, ChevronRight, Copy, Home, FileText,
  Phone, Building2, ShieldAlert
} from "lucide-react";

const SECTIONS = [
  { id: "purpose", label: "Purpose", icon: Info },
  { id: "scope", label: "Scope", icon: Users },
  { id: "acceptable", label: "Acceptable Use", icon: CheckCircle },
  { id: "prohibited", label: "Prohibited Activities", icon: XCircle },
  { id: "conduct", label: "Internship & Training Conduct", icon: Briefcase },
  { id: "ip", label: "Intellectual Property", icon: Copyright },
  { id: "security", label: "Security", icon: Lock },
  { id: "enforcement", label: "Enforcement", icon: Scale },
  { id: "reporting", label: "Reporting Misuse", icon: AlertTriangle },
  { id: "updates", label: "Policy Updates", icon: RefreshCw },
  { id: "contact", label: "Contact Information", icon: Mail },
];

function useCopyLink() {
  const [copiedId, setCopiedId] = useState(null);
  const copy = useCallback((id) => {
    const url = `${window.location.origin}/acceptable-use#${id}`;
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

export default function AUPClient() {
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
            <span className="text-[#0F4CBA] font-medium">Acceptable Use Policy</span>
          </div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-none">
            Acceptable <span className="bg-gradient-to-r from-[#0F4CBA] to-[#1e6fd9] bg-clip-text text-transparent">Use Policy</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            This Acceptable Use Policy outlines the rules and standards for using TechieHelp Institute of AI's website, training platform, internship programs, certifications, and digital services responsibly and ethically.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap items-center justify-center gap-4 print:hidden">
            <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-[#0F4CBA]/8 flex items-center justify-center"><RefreshCw className="w-4 h-4 text-[#0F4CBA]" /></div>
              <div className="text-left"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Last Updated</p><p className="text-sm font-semibold text-slate-800">June 18, 2026</p></div>
            </div>
            <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-[#0F4CBA]/8 flex items-center justify-center"><FileText className="w-4 h-4 text-[#0F4CBA]" /></div>
              <div className="text-left"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Reading Time</p><p className="text-sm font-semibold text-slate-800">4 mins</p></div>
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
              <SectionHeading number={1} id="purpose" icon={Info} title="Purpose" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 leading-relaxed text-base md:text-lg">
                This policy explains the acceptable and prohibited use of TechieHelp Institute of AI's platform, services, digital content, and community to ensure a safe, respectful, and productive learning environment.
              </p>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow print:shadow-none print:border-none print:p-0 print:mb-8">
              <SectionHeading number={2} id="scope" icon={Users} title="Scope" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 leading-relaxed mb-4">This policy applies to all users, including:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["Students", "Interns", "Learners", "Mentors", "Trainers", "Colleges & Universities", "TPOs", "Campus Ambassadors", "Website Visitors", "Institutional Partners"].map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
                    <Check className="w-4 h-4 text-[#0F4CBA]" />
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow print:shadow-none print:border-none print:p-0 print:mb-8">
              <SectionHeading number={3} id="acceptable" icon={CheckCircle} title="Acceptable Use" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 leading-relaxed mb-4">Users are expected to:</p>
              <BulletList items={[
                "Use the platform for lawful educational and professional purposes.",
                "Provide accurate registration information.",
                "Respect mentors, trainers, students, and community members.",
                "Complete assignments honestly.",
                "Follow internship and training guidelines.",
                "Protect account credentials.",
                "Report security vulnerabilities responsibly."
              ]} />
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow print:shadow-none print:border-none print:p-0 print:mb-8">
              <SectionHeading number={4} id="prohibited" icon={XCircle} title="Prohibited Activities" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 leading-relaxed mb-4">Users must <strong>NOT</strong>:</p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Share or sell account credentials.",
                  "Copy, redistribute, or pirate course materials.",
                  "Upload malware, viruses, or harmful code.",
                  "Attempt unauthorized access to systems or data.",
                  "Use bots, scraping tools, or automated attacks.",
                  "Submit fraudulent certificates or documents.",
                  "Post abusive, offensive, discriminatory, or illegal content.",
                  "Spam users or misuse communication channels.",
                  "Violate intellectual property rights.",
                  "Misrepresent affiliation with TechieHelp Institute of AI."
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-red-50/50 border border-red-100 rounded-xl px-4 py-3">
                    <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow print:shadow-none print:border-none print:p-0 print:mb-8">
              <SectionHeading number={5} id="conduct" icon={Briefcase} title="Internship & Training Conduct" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 leading-relaxed mb-4">Participants must:</p>
              <BulletList items={[
                "Maintain professional behavior.",
                "Complete assigned tasks responsibly.",
                "Meet submission deadlines where applicable.",
                "Follow mentor and trainer instructions.",
                "Respect confidential project information."
              ]} />
              <div className="mt-4 bg-amber-50/60 border border-amber-100 rounded-2xl p-5">
                <p className="text-sm text-slate-700 leading-relaxed font-bold">
                  Failure to comply may result in removal from the program.
                </p>
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow print:shadow-none print:border-none print:p-0 print:mb-8">
              <SectionHeading number={6} id="ip" icon={Copyright} title="Intellectual Property" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 leading-relaxed mb-4">
                All course materials, videos, projects, documentation, branding, website content, graphics, logos, and software remain the intellectual property of TechieHelp Institute of AI unless otherwise stated.
              </p>
              <p className="text-slate-800 font-bold leading-relaxed">
                Unauthorized copying, distribution, resale, or commercial use is strictly prohibited.
              </p>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow print:shadow-none print:border-none print:p-0 print:mb-8">
              <SectionHeading number={7} id="security" icon={Lock} title="Security" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 leading-relaxed mb-4">Users must not attempt to:</p>
              <BulletList items={[
                "Exploit platform vulnerabilities.",
                "Circumvent authentication.",
                "Access restricted resources.",
                "Interfere with website availability.",
                "Reverse engineer platform functionality without authorization."
              ]} />
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow print:shadow-none print:border-none print:p-0 print:mb-8">
              <SectionHeading number={8} id="enforcement" icon={Scale} title="Enforcement" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 leading-relaxed mb-4">Violation of this policy may result in one or more of the following actions:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["Warning", "Temporary account suspension", "Permanent account termination", "Certificate cancellation", "Internship removal", "Restriction from future programs", "Legal action where applicable"].map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
                    <Scale className="w-4 h-4 text-[#0F4CBA]" />
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow print:shadow-none print:border-none print:p-0 print:mb-8">
              <SectionHeading number={9} id="reporting" icon={AlertTriangle} title="Reporting Misuse" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 leading-relaxed mb-4">Users are encouraged to report:</p>
              <BulletList items={[
                "Security vulnerabilities",
                "Fraudulent activity",
                "Copyright violations",
                "Abuse or harassment",
                "Fake certificates",
                "Platform misuse"
              ]} />
              <p className="text-slate-500 text-sm mt-4 italic">Reports will be reviewed confidentially.</p>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow print:shadow-none print:border-none print:p-0 print:mb-8">
              <SectionHeading number={10} id="updates" icon={RefreshCw} title="Policy Updates" copiedId={copiedId} onCopy={copy} />
              <p className="text-slate-600 leading-relaxed mb-4">
                TechieHelp Institute of AI may modify this policy periodically. Continued use of the platform after updates constitutes acceptance of the revised policy.
              </p>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="bg-gradient-to-br from-[#0F4CBA] to-[#1a5cd6] border border-[#0F4CBA]/20 rounded-3xl p-8 md:p-10 shadow-xl shadow-[#0F4CBA]/15 print:bg-white print:border-none print:shadow-none print:p-0 print:text-black print:mb-8">
              <div className="flex items-start gap-4 mb-8">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center print:hidden"><Mail className="w-5 h-5 text-white" /></div>
                <div><span className="text-xs font-bold text-[#F4B400] uppercase tracking-widest print:text-black">Section 11</span><h2 id="contact" className="text-2xl md:text-3xl font-bold text-white mt-1 scroll-mt-32 print:text-black">Contact Information</h2></div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Mail, label: "Email", value: "techiehelpinstituteofai@gmail.com", href: "mailto:techiehelpinstituteofai@gmail.com" },
                  { icon: Mail, label: "Support", value: "support@techiehelp.in", href: "mailto:support@techiehelp.in" },
                  { icon: Phone, label: "Phone", value: "+91 7673825079", href: "tel:+917673825079" },
                  { icon: Building2, label: "Address", value: "Vivek Vihar, Sector 14, Block D, Room No. 31, Jodhpur, Rajasthan, India", href: null },
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
              <div className="bg-red-50/80 border border-red-200 rounded-3xl p-8 md:p-10 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-red-500" />
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 p-3 rounded-full shrink-0">
                    <ShieldAlert className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Important Notice</h3>
                    <p className="text-slate-700 leading-relaxed">
                      Any misuse of the TechieHelp Institute of AI platform may lead to suspension of services, certificate cancellation, removal from programs, or legal action where applicable.
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
              <Info className="w-3.5 h-3.5" /> Support
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">Need Help Understanding This Policy?</h2>
            <p className="text-slate-600 mb-8 max-w-xl mx-auto">
              If you have questions about acceptable use, platform security, or user responsibilities, our support team is here to help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="px-6 py-3 rounded-xl bg-[#0F4CBA] text-white font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">Contact Support</Link>
              <Link href="/privacy" className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all">Privacy Policy</Link>
              <Link href="/terms" className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all">Terms & Conditions</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
