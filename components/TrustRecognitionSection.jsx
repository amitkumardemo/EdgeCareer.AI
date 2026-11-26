"use client";

import React, { useState } from "react";
import {
  Landmark,
  Building2,
  Award,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  Calendar,
  Briefcase,
  FileCheck2,
  X,
  Sparkles,
  BadgeCheck
} from "lucide-react";

export default function TrustRecognitionSection() {
  const [copiedId, setCopiedId] = useState(null);
  const [isIsoModalOpen, setIsIsoModalOpen] = useState(false);

  const handleCopy = (text, id) => {
    if (!text) return;
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="space-y-8 md:space-y-10">
      {/* 1. PRIMARY THREE-CARD INSTITUTIONAL TRUST GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        
        {/* CARD 1 — AICTE INTERNSHIP PORTAL */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative flex flex-col justify-between group overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full group-hover:scale-110 transition-transform pointer-events-none" />
          
          <div className="space-y-4">
            {/* Top Row: Icon + Govt Recognized Portal Badge */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="w-13 h-13 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100 shadow-xs">
                <Landmark className="w-6 h-6 text-blue-700" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase text-blue-700 tracking-wider bg-blue-50/90 px-3 py-1 rounded-full border border-blue-200/80 inline-flex items-center gap-1.5 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                GOVT. RECOGNIZED PORTAL
              </span>
            </div>

            {/* Title & Description */}
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-[#0B192C] leading-snug group-hover:text-blue-700 transition-colors">
                Listed on AICTE Internship Portal
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2">
                Officially listed on the Government of India&apos;s AICTE Internship Portal.
              </p>
            </div>

            {/* Verification Features Box */}
            <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-3.5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Earn AICTE Academic Internship Credits</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>National Internship Portal Listed Employer</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Recognized by Colleges &amp; Tech Universities</span>
              </div>
            </div>
          </div>

          {/* CTA Link to Official AICTE Portal */}
          <div className="pt-6 mt-2 border-t border-slate-100">
            <a
              href="https://internship.aicte-india.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow transition-all group/btn"
            >
              <span>Visit AICTE Internship Portal</span>
              <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* CARD 2 — MSME GOVERNMENT REGISTRATION */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative flex flex-col justify-between group overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full group-hover:scale-110 transition-transform pointer-events-none" />

          <div className="space-y-4">
            {/* Top Row: Icon + Govt Registered Badge */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="w-13 h-13 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200/80 shadow-xs">
                <Building2 className="w-6 h-6 text-amber-600" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase text-amber-700 tracking-wider bg-amber-50 px-3 py-1 rounded-full border border-amber-200/80 inline-flex items-center gap-1.5 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                GOVT. OF INDIA REGISTERED
              </span>
            </div>

            {/* Title & Description */}
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-[#0B192C] leading-snug group-hover:text-amber-700 transition-colors">
                MSME Registered Enterprise
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2">
                Registered under the Ministry of Micro, Small and Medium Enterprises, Government of India.
              </p>
            </div>

            {/* Registration Box with Monospace Typography & Copy Button */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Organization Name:</span>
                <span className="font-bold text-slate-800 uppercase">TECHIEHELP</span>
              </div>
              
              <div className="bg-amber-50/60 border border-amber-200/70 rounded-2xl p-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800 mb-1">
                  Registration Number
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs sm:text-sm font-black text-slate-900 tracking-wider select-all">
                    UDYAM-RJ-22-0126904
                  </span>
                  <button
                    onClick={() => handleCopy("UDYAM-RJ-22-0126904", "msme")}
                    type="button"
                    title="Copy MSME Registration Number"
                    className="p-1.5 rounded-lg bg-white border border-amber-200 hover:bg-amber-100/80 text-amber-800 transition-all flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    {copiedId === "msme" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-[10px] font-bold text-emerald-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-600" />
                        <span className="text-[10px] font-semibold text-slate-600">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Link to Official MSME Portal */}
          <div className="pt-6 mt-2 border-t border-slate-100">
            <a
              href="https://udyamregistration.gov.in/Udyam_Verify.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow transition-all group/btn"
            >
              <span>Verify MSME Registration</span>
              <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* CARD 3 — ISO 9001:2015 CERTIFICATION */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative flex flex-col justify-between group overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full group-hover:scale-110 transition-transform pointer-events-none" />

          <div className="space-y-4">
            {/* Top Row: Icon + Quality Standard Badge */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="w-13 h-13 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200/80 shadow-xs">
                <Award className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase text-emerald-700 tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80 inline-flex items-center gap-1.5 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                QUALITY MANAGEMENT STANDARD
              </span>
            </div>

            {/* Title & Description */}
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-[#0B192C] leading-snug group-hover:text-emerald-700 transition-colors">
                ISO 9001:2015 Certified
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2">
                Certified Quality Management System for Web &amp; App Development, Digital Marketing, Career Training &amp; AI-Based Tech Solutions.
              </p>
            </div>

            {/* Certificate Number with Monospace Typography & Copy Button */}
            <div className="bg-emerald-50/60 border border-emerald-200/70 rounded-2xl p-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 mb-1">
                Certificate Number
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs sm:text-sm font-black text-slate-900 tracking-wider select-all">
                  QMS/251180
                </span>
                <button
                  onClick={() => handleCopy("QMS/251180", "iso")}
                  type="button"
                  title="Copy ISO Certificate Number"
                  className="p-1.5 rounded-lg bg-white border border-emerald-200 hover:bg-emerald-100/80 text-emerald-800 transition-all flex items-center gap-1 cursor-pointer shrink-0"
                >
                  {copiedId === "iso" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-[10px] font-bold text-emerald-600">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-600" />
                      <span className="text-[10px] font-semibold text-slate-600">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Surveillance & Expiry Schedule Grid */}
            <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50/90 border border-slate-100 rounded-xl p-2.5">
              <div>
                <span className="text-slate-400 block text-[10px]">Certification Date</span>
                <span className="font-bold text-slate-700">10 Nov 2025</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">1st Surveillance</span>
                <span className="font-bold text-slate-700">09 Nov 2026</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">2nd Surveillance</span>
                <span className="font-bold text-slate-700">09 Nov 2027</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Certificate Expiry</span>
                <span className="font-bold text-emerald-700">09 Nov 2028</span>
              </div>
            </div>
          </div>

          {/* CTA View ISO Certificate */}
          <div className="pt-6 mt-2 border-t border-slate-100">
            <button
              onClick={() => setIsIsoModalOpen(true)}
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow transition-all cursor-pointer group/btn"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>View ISO Certificate</span>
            </button>
          </div>
        </div>

      </div>

      {/* 2. COMPACT RECRUITER PORTAL VERIFICATION SECTION */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Left: Section Header & Status Pill */}
          <div className="space-y-1.5 max-w-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100 shrink-0">
                <Briefcase className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-extrabold text-[#0B192C]">
                  Recruiter Portal Verification
                </h4>
                <p className="text-xs text-slate-500">
                  Verified hiring &amp; institutional training partner
                </p>
              </div>
            </div>
          </div>

          {/* Center: Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 flex-1">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 sm:p-3">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Organization
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5 block">
                TechieHelp
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 sm:p-3">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Status
              </span>
              <div className="mt-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Approved
                </span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 sm:p-3">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Account Type
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5 block">
                Employer – Type 2
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 sm:p-3">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Registered Date
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5 block">
                29 March 2025
              </span>
            </div>
          </div>

          {/* Right: Recruiter Organization Reference ID Box with Copy Button */}
          <div className="lg:w-80 shrink-0 bg-slate-900 text-white rounded-2xl p-3.5 border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              <span>Recruiter Organization Reference ID</span>
              <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="flex items-center justify-between gap-2 mt-1">
              <span className="font-mono text-xs font-bold text-amber-300 tracking-wider truncate select-all">
                CORPORATE67e85161cf2301743278433
              </span>
              <button
                onClick={() => handleCopy("CORPORATE67e85161cf2301743278433", "recruiter_id")}
                type="button"
                title="Copy Recruiter Organization Reference ID"
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all flex items-center gap-1 cursor-pointer shrink-0 border border-slate-700"
              >
                {copiedId === "recruiter_id" ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-[10px] font-bold text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-slate-300" />
                    <span className="text-[10px] font-semibold text-slate-300">Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 3. VERIFIED ISO 9001:2015 CERTIFICATE MODAL */}
      {isIsoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white p-5 sm:p-6 relative">
              <button
                onClick={() => setIsIsoModalOpen(false)}
                type="button"
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-emerald-100 text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                Verified Quality Standard
              </div>
              <h3 className="text-xl sm:text-2xl font-black">
                ISO 9001:2015 Certified
              </h3>
              <p className="text-xs text-emerald-100 mt-1">
                Official Quality Management System Certification Record
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-4">
              {/* Certificate Details Monospace Card */}
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Certified Entity:</span>
                  <span className="font-extrabold text-slate-900">TECHIEHELP</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Standard:</span>
                  <span className="font-extrabold text-emerald-700">ISO 9001:2015 (QMS)</span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/70">
                  <span className="text-slate-500 font-medium">Certificate Number:</span>
                  <span className="font-mono font-black text-slate-900 tracking-wider">QMS/251180</span>
                </div>
              </div>

              {/* Certified Scope */}
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
                  Scope of Certification
                </span>
                <p className="text-xs text-slate-600 bg-slate-50 border border-slate-200/80 rounded-xl p-3 leading-relaxed">
                  Certified Quality Management System for Web &amp; App Development, Digital Marketing, Career Training &amp; AI-Based Tech Solutions.
                </p>
              </div>

              {/* Audit & Validity Schedule */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-semibold">Certification Date</span>
                  <span className="font-bold text-slate-800">10 November 2025</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-semibold">1st Surveillance Due</span>
                  <span className="font-bold text-slate-800">09 November 2026</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-semibold">2nd Surveillance Due</span>
                  <span className="font-bold text-slate-800">09 November 2027</span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                  <span className="text-[10px] text-emerald-700 block font-semibold">Certificate Expiry</span>
                  <span className="font-bold text-emerald-800">09 November 2028</span>
                </div>
              </div>

              {/* Verified Status Banner */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Quality Management System Active &amp; Validated</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setIsIsoModalOpen(false)}
                type="button"
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer"
              >
                Close Verification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

