"use client";

import React from "react";
import Link from "next/link";
import Script from "next/script";
import Image from "next/image";
import { 
  Sparkles, ChevronRight, Calendar, Clock, Star, MapPin, 
  ShieldCheck, HelpCircle, CheckCircle2, Phone, MessageCircle, ArrowRight
} from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function SEOPageTemplate({
  title,
  subtitle,
  description,
  duration,
  mode,
  features = [],
  curriculum = [],
  faqs = [],
  reviews = [],
  canonical,
  schema = {},
  breadcrumbSchema = {}
}) {
  
  // List of all landing pages for crawler internal links
  const landingPages = [
    { label: "AI & Machine Learning Training", href: "/ai-machine-learning-training-jodhpur" },
    { label: "Data Science Training", href: "/data-science-training-jodhpur" },
    { label: "Web Development Training", href: "/web-development-training-jodhpur" },
    { label: "App Development Training", href: "/app-development-training-jodhpur" },
    { label: "Cyber Security Training", href: "/cyber-security-training-jodhpur" },
    { label: "Cloud Computing Training", href: "/cloud-computing-training-jodhpur" },
    { label: "Digital Marketing Training", href: "/digital-marketing-training-jodhpur" },
    { label: "TechieHelp Internship", href: "/internship-jodhpur" },
    { label: "Summer Internship Jodhpur", href: "/summer-internship-jodhpur" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pt-28 md:pt-36 pb-0 transition-colors duration-300 selection:bg-cyan-150">
      
      {/* Schema Markup Injection */}
      {schema && (
        <Script
          id={`page-schema-${canonical.replace(/[^a-z0-9]+/g, "-")}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      {breadcrumbSchema && (
        <Script
          id={`breadcrumb-schema-${canonical.replace(/[^a-z0-9]+/g, "-")}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}

      {/* 1. HERO SECTION */}
      <section className="relative py-16 md:py-24 px-6 max-w-7xl mx-auto overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-400/5 dark:bg-blue-400/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[250px] bg-cyan-400/5 dark:bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 overflow-x-auto whitespace-nowrap">
              <Link href="/" className="hover:text-[#0F4CBA] dark:hover:text-blue-400 transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/skill-development-programs" className="hover:text-[#0F4CBA] dark:hover:text-blue-400 transition-colors">Programs</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-800 dark:text-slate-200 font-extrabold truncate max-w-xs">{title}</span>
            </nav>

            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-cyan-200 dark:border-cyan-800 bg-white dark:bg-slate-900 shadow-sm text-xs font-bold text-cyan-800 dark:text-cyan-400">
              <Sparkles className="w-4.5 h-4.5 text-amber-500 animate-pulse" />
              <span>Jodhpur's Premium Training Portal</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-blue-950 dark:text-white tracking-tight leading-[1.1]">
              {title}
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              {subtitle}
            </p>

            {/* Program specifications */}
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <Clock className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-505 uppercase font-bold tracking-wider">Duration</div>
                  <div className="text-xs font-extrabold text-slate-800 dark:text-slate-200">{duration}</div>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-505 uppercase font-bold tracking-wider">Mode</div>
                  <div className="text-xs font-extrabold text-slate-800 dark:text-slate-200">{mode}</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link href="/sign-up">
                <button className="px-8 py-4 rounded-full bg-[#0F4CBA] hover:bg-blue-700 text-white font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group">
                  Register for Next Batch
                  <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <a
                href={`https://wa.me/918076239106?text=${encodeURIComponent(`Hi TechieHelp! 👋 I'm interested in the ${title} program in Jodhpur. Please guide me.`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="w-full px-8 py-4 rounded-full bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border-2 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold text-base shadow-sm flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5 text-green-500 shrink-0" />
                  Chat on WhatsApp
                </button>
              </a>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5 relative w-full">
            <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-100 to-blue-100 dark:from-cyan-950/20 dark:to-blue-950/20 rounded-3xl blur-2xl opacity-40 -z-10" />
            <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden border-8 border-white dark:border-slate-900 shadow-2xl bg-white dark:bg-slate-900">
              <Image 
                src="/skill_development.png" 
                alt={`${title} Showcase`} 
                fill 
                className="object-cover" 
                priority
              />
            </div>
          </div>

        </div>
      </section>

      {/* 2. PROGRAM OVERVIEW & FEATURES */}
      <section className="py-20 bg-white dark:bg-slate-900/20 border-y border-slate-200/50 dark:border-slate-800/40">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Highlight details */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">
                <CheckCircle2 className="w-4 h-4" />
                <span>Why TechieHelp</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-blue-950 dark:text-white tracking-tight leading-tight">
                Accelerate Your Skills <br />With Live Pipelines
              </h2>
              <div className="h-1.5 w-16 bg-[#0F4CBA] rounded-full" />
              <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                {description}
              </p>
              <div className="space-y-3 pt-2">
                {features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <ShieldCheck className="w-4.5 h-4.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Jodhpur Map Embed */}
            <div className="lg:col-span-6 relative w-full space-y-4">
              <h3 className="text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-left">
                📍 Jodhpur, Rajasthan Campus Location
              </h3>
              <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14312.359239563266!2d73.0182606554199!3d26.258700200000013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418c39ab34b8c9%3A0xcfca4e815664188b!2sJodhpur%2C%20Rajasthan%20342001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="TechieHelp Institute of AI Google Map"
                  className="grayscale dark:invert opacity-90"
                />
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 px-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  Jodhpur Branch
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-cyan-600" />
                  +91-7673825079
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SYLLABUS & CURRICULUM */}
      {curriculum.length > 0 && (
        <section className="py-20 px-6 max-w-4xl mx-auto text-left">
          <div className="text-center mb-12 space-y-4">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Syllabus Breakdown</span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-950 dark:text-white tracking-tight">Curriculum</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base max-w-xl mx-auto">
              Our structures map core theories straight to production deployment.
            </p>
          </div>

          <div className="space-y-6">
            {curriculum.map((module, i) => (
              <div key={i} className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 hover:border-slate-200 dark:hover:border-slate-850 shadow-sm hover:shadow-md transition-all flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 font-extrabold text-sm border border-cyan-100 dark:border-cyan-900">
                  {i + 1}
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-blue-950 dark:text-white">{module.title}</h3>
                  <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">{module.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. REVIEWS SECTION */}
      {reviews.length > 0 && (
        <section className="py-20 bg-white dark:bg-slate-900/20 border-y border-slate-200/50 dark:border-slate-800/40">
          <div className="container mx-auto px-6 max-w-7xl text-left">
            <div className="text-center mb-16 space-y-4">
              <span className="text-xs font-bold text-[#0F4CBA] uppercase tracking-widest">Success Stories</span>
              <h2 className="text-3xl md:text-5xl font-black text-blue-950 dark:text-white tracking-tight">Student Reviews</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base max-w-xl mx-auto">
                Read how students from Jodhpur built skills and secured placements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((rev, i) => (
                <div key={i} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="space-y-4">
                    {/* Stars */}
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, sIdx) => (
                        <Star key={sIdx} className={`w-4 h-4 ${sIdx < rev.rating ? "text-amber-500 fill-amber-500" : "text-slate-200"}`} />
                      ))}
                    </div>
                    {/* Review text */}
                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-350 leading-relaxed italic font-normal">
                      "{rev.text}"
                    </p>
                  </div>
                  {/* Reviewer details */}
                  <div className="flex items-center gap-3 pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                    <div className="w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center font-bold text-xs text-cyan-800 dark:text-cyan-300 uppercase shrink-0">
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{rev.name}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-455">{rev.role || "Student"}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. FAQs SECTION */}
      {faqs.length > 0 && (
        <section className="py-20 px-6 max-w-4xl mx-auto text-left">
          <div className="text-center mb-12 space-y-4">
            <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest">Got Questions?</span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-950 dark:text-white tracking-tight">Frequently Asked Questions</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
              Find answers to common questions about training, cohorts, and schedules in Jodhpur.
            </p>
          </div>

          <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 shadow-sm">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-b border-slate-100 dark:border-slate-800 py-2 last:border-b-0">
                  <AccordionTrigger className="text-sm md:text-base font-extrabold text-blue-950 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 py-3 flex gap-2">
                    <HelpCircle className="w-4.5 h-4.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal pl-7 pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* 6. INTERNAL CROSS LINKS (CRAWLER MAP) */}
      <section className="py-12 bg-slate-100 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6 max-w-7xl text-left">
          <h3 className="text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-6">
            Explore Training & Internship Programs in Jodhpur
          </h3>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {landingPages.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="text-xs font-bold text-slate-550 dark:text-slate-400 hover:text-[#0F4CBA] dark:hover:text-blue-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="py-24 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-50/50 dark:bg-blue-900/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-blue-950 dark:text-white leading-tight">
            Kickstart Your AI Journey Today
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-xl mx-auto font-normal leading-relaxed">
            Register now to join the upcoming training cohorts and lock in your MERN, Python, or Cyber Security internship at TechieHelp Institute of AI Jodhpur.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/sign-up">
              <button className="px-8 py-4 rounded-full bg-[#0F4CBA] hover:bg-blue-700 text-white font-bold text-base shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all">
                Register for Cohort
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-8 py-4 rounded-full bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border-2 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold text-base shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all">
                Contact Campus
              </button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
