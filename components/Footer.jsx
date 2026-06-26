"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Github, Linkedin, Mail, Twitter, Youtube, Facebook, Instagram, 
  CheckCircle2, ArrowUp, ShieldCheck, Check
} from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // "", "loading", "success", "error"
  const [isScrollVisible, setIsScrollVisible] = useState(false);

  // Exclude dashboard, admin, and auth pages from showing the global footer
  const excludedPrefixes = [
    "/admin",
    "/internship/student",
    "/internship/admin",
    "/internship/college",
    "/tpo",
    "/sign-in",
    "/sign-up"
  ];

  const shouldHideFooter = excludedPrefixes.some(prefix => 
    pathname?.startsWith(prefix)
  );

  // Toggle scroll-to-top visibility
  useEffect(() => {
    const toggleVisibility = () => {
      setIsScrollVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus(""), 3000);
    }, 1000);
  };

  if (shouldHideFooter) return null;

  return (
    <footer className="relative bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 border-t border-slate-200 dark:border-slate-900 pt-20 pb-12 overflow-hidden transition-colors duration-300">
      
      {/* 1. TOP & SUBSCRIPTION SECTION */}
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-200 dark:border-slate-900">
          
          {/* Logo & Description (Left Column) */}
          <div className="lg:col-span-6 space-y-6">
            <Link href="/" className="inline-block transition-transform hover:scale-[1.02] origin-left">
              <Image 
                src="/thp logo.png" 
                alt="TechieHelp Logo" 
                width={300} 
                height={90} 
                className="h-16 sm:h-20 w-auto object-contain dark:brightness-110" 
                priority
              />
            </Link>
            
            <div>
              <p className="text-[11px] font-extrabold tracking-[0.2em] text-cyan-600 dark:text-cyan-400 uppercase">
                Building AI Leaders
              </p>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
                Industry-focused Training, Real-World Internships, Professional Certifications, and Career Development Programs designed to help students build skills, gain experience, and become industry-ready professionals.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Linkedin, href: "https://www.linkedin.com/company/techiehelp", label: "LinkedIn" },
                { icon: Twitter, href: "https://x.com/techiehelp", label: "Twitter" },
                { icon: Youtube, href: "https://youtube.com/techiehelp", label: "YouTube" },
                { icon: Facebook, href: "https://facebook.com/techiehelp", label: "Facebook" },
                { icon: Instagram, href: "https://instagram.com/techiehelp_ai", label: "Instagram" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:text-cyan-500 hover:border-cyan-500 dark:hover:text-cyan-400 dark:hover:border-cyan-400 hover:scale-105 hover:shadow-sm transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-4.5 h-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Subscription (Right Column) */}
          <div className="lg:col-span-6 space-y-6 lg:pl-6">
            <div>
              <h3 className="text-xs font-extrabold tracking-[0.15em] text-slate-900 dark:text-slate-100 uppercase">
                Subscribe to Newsletter
              </h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Get internship opportunities, hiring updates, AI industry insights, course launches, certification announcements, startup programs, and exclusive TechieHelp updates directly in your inbox.
              </p>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2.5 max-w-lg">
                <input
                  suppressHydrationWarning
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-slate-950 dark:text-white transition-all"
                  disabled={status === "loading"}
                />
                <button
                  suppressHydrationWarning
                  type="submit"
                  disabled={status === "loading"}
                  className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm tracking-wider uppercase shadow-md hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-75 flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : status === "success" ? (
                    <>
                      <Check className="w-4 h-4" /> Subscribed
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>

              {/* Checklist */}
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                {[
                  "Internship Opportunities",
                  "Hiring Updates",
                  "AI Industry Insights",
                  "Course Announcements",
                  "Startup Programs"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4.5 h-4.5 text-cyan-500 dark:text-cyan-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-slate-400 dark:text-slate-500">
                Weekly Updates • No Spam • Unsubscribe Anytime
              </p>
            </form>
          </div>

        </div>
      </div>

      {/* 2. MIDDLE 6-COLUMNS LINK SECTION */}
      <div className="container mx-auto px-6 max-w-7xl relative z-10 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          
          {/* Column 1: COMPANY */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold tracking-[0.15em] text-slate-900 dark:text-slate-100 uppercase">
              Company
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", href: "/about" },
                { label: "Contact Us", href: "/contact" },
                { label: "Founder & CEO", href: "/#founder" },
                { label: "Success Stories", href: "/#success" },
                { label: "Campus Ambassador Program", href: "/campus-ambassador" }
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: PROGRAMS */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold tracking-[0.15em] text-slate-900 dark:text-slate-100 uppercase">
              Programs
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Artificial Intelligence & Machine Learning", href: "/programs" },
                { label: "Data Science", href: "/programs" },
                { label: "Web Development", href: "/programs" },
                { label: "App Development", href: "/programs" },
                { label: "Cyber Security", href: "/programs" },
                { label: "Cloud Computing", href: "/programs" },
                { label: "UI/UX Design", href: "/programs" },
                { label: "Digital Marketing", href: "/programs" }
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: TRAINING & INTERNSHIPS */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold tracking-[0.15em] text-slate-900 dark:text-slate-100 uppercase">
              Training & Internships
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Training Programs", href: "/prep-resources" },
                { label: "Internship Opportunities", href: "/internship" },
                { label: "Live Projects", href: "/internship" },
                { label: "Professional Certifications", href: "/prep-resources" },
                { label: "Verify Certificate", href: "/#verify" },
                { label: "Career Opportunities", href: "/latest-jobs" }
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: RESOURCES */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold tracking-[0.15em] text-slate-900 dark:text-slate-100 uppercase">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Blog", href: "/blog" },
                { label: "Coding Challenges", href: "/dsa" },
                { label: "Resume Builder", href: "/resume" },
                { label: "Interview Preparation", href: "/mock-interview" },
                { label: "Student Dashboard", href: "/internship/student/dashboard" },
                { label: "FAQs", href: "/#faq" }
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: FOR COLLEGES & TPO */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold tracking-[0.15em] text-slate-900 dark:text-slate-100 uppercase">
              For Colleges & TPO
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Campus Partnership", href: "/campus-partnership" },
                { label: "Workshops & Seminars", href: "/workshops-seminars" },
                { label: "Skill Development Programs", href: "/skill-development-programs" },
                { label: "Institutional Collaborations", href: "/institutional-collaborations" },
                { label: "Placement Support", href: "/placement-support" }
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 6: LEGAL & COMPLIANCE */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold tracking-[0.15em] text-slate-900 dark:text-slate-100 uppercase">
              Legal & Compliance
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Refund Policy", href: "/refund-policy" },
                { label: "Cookie Policy", href: "/cookie-policy" },
                { label: "Acceptable Use Policy", href: "/acceptable-use" },
                { label: "Certificate Verification Policy", href: "/verification-policy" }
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* 3. WATERMARK, BRANDING & FOOTER BOTTOM */}
      <div className="relative border-t border-slate-200 dark:border-slate-900 pt-10 pb-4 z-10">
        <div className="container mx-auto px-6 max-w-7xl space-y-6">
          
          {/* Centered Slogans */}
          <div className="text-center space-y-1.5 relative z-20">
            <h5 className="text-[11px] font-extrabold tracking-[0.25em] text-slate-600 dark:text-slate-400 uppercase">
              Empowering Future Innovators Through Skills, Experience & Opportunities
            </h5>
            <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
              <span>Trusted by Students Across India</span>
            </p>
          </div>

          {/* Divider Line */}
          <div className="h-px w-full bg-slate-200/60 dark:bg-slate-900/60 relative z-20" />

          {/* Bottom links and copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-20 text-xs font-semibold text-slate-500 dark:text-slate-400">
            
            {/* Left Links */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <span className="text-slate-400 dark:text-slate-600">Training • Internships • Certifications</span>
            </div>

            {/* Center: Glowing Pulse Indicator */}
            <div className="relative flex items-center justify-center w-8 h-8 select-none pointer-events-none">
              <div className="absolute w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 animate-ping" />
              <div className="absolute w-4 h-4 rounded-full bg-red-500/20 border border-red-500/30 animate-pulse" />
              <div className="relative w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            </div>

            {/* Right Copyright */}
            <div className="text-center md:text-right">
              © {new Date().getFullYear()} TechieHelp Institute of AI. All rights reserved.
            </div>

          </div>
        </div>

        {/* Large watermark Logo in background (Full Screen) */}
        <div className="absolute inset-x-0 bottom-0 overflow-hidden pointer-events-none select-none h-36 md:h-44 flex items-center justify-center z-0">
          <Image
            src="/thp logo.png"
            alt="TechieHelp Logo Watermark"
            width={1800}
            height={600}
            className="w-[95vw] max-w-[1600px] h-auto object-contain opacity-[0.09] dark:opacity-[0.02]"
          />
        </div>
      </div>

      {/* 4. FLOATING WIDGETS */}
      {/* Scroll to Top */}
      {isScrollVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-950 dark:text-white shadow-lg hover:scale-110 active:scale-95 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/80 flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* WhatsApp chat widget */}
      <a
        href={`https://wa.me/918076239106?text=${encodeURIComponent("Hi TechieHelp Institute of AI! 👋 I'm interested in your Internship Programs. Could you please share more details about the available internships, eligibility criteria, stipend, duration, and how to apply? Thank you!")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-20 right-6 z-50 group flex items-center gap-0 hover:gap-3 overflow-hidden transition-all duration-300"
      >
        {/* Tooltip label */}
        <span className="opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-[180px] overflow-hidden whitespace-nowrap transition-all duration-300 text-xs font-bold text-white bg-[#128C7E] px-3 py-2 rounded-full shadow-md">
          Chat for Internship
        </span>

        {/* WhatsApp icon button */}
        <span className="flex items-center justify-center w-13 h-13 rounded-full bg-[#25D366] text-white shadow-xl hover:shadow-[0_8px_30px_rgba(37,211,102,0.45)] hover:scale-110 active:scale-95 transition-all duration-200 p-3.5">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-4.846c1.6.95 3.498 1.45 5.441 1.451 5.376 0 9.761-4.383 9.764-9.76.002-2.602-1.01-5.05-2.854-6.897C17.153 2.1 14.707 1.089 12.01 1.089c-5.38 0-9.766 4.386-9.77 9.763-.001 1.832.479 3.623 1.39 5.2l-.995 3.633 3.725-.977zm12.336-5.865c-.328-.164-1.94-.959-2.241-1.07-.302-.11-.522-.164-.741.164-.22.329-.851 1.07-1.042 1.29-.19.219-.382.246-.71.082-.328-.164-1.386-.511-2.641-1.631-.977-.872-1.636-1.95-1.828-2.279-.19-.329-.02-.507.145-.671.148-.147.328-.383.493-.575.164-.19.22-.329.329-.548.11-.219.055-.411-.027-.575-.083-.164-.741-1.785-1.015-2.443-.267-.643-.538-.553-.74-.563-.191-.01-.41-.01-.628-.01-.22 0-.575.082-.876.411-.301.329-1.15 1.122-1.15 2.738 0 1.616 1.177 3.177 1.34 3.396.164.22 2.316 3.537 5.611 4.961.783.339 1.396.541 1.874.693.788.251 1.505.216 2.071.131.632-.095 1.94-.794 2.214-1.562.274-.767.274-1.424.192-1.562-.082-.138-.301-.22-.629-.383z" />
          </svg>
        </span>
      </a>

    </footer>
  );
}
