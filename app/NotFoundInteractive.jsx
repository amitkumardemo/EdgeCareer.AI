"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Home, Briefcase, BookOpen, Phone, ChevronRight, Search, Sparkles 
} from "lucide-react";

export default function NotFoundInteractive() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Force light mode on this page
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  // Mouse parallax effect tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePosition({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-[calc(100vh-96px)] bg-slate-50 text-slate-900 flex flex-col justify-between overflow-x-hidden pt-32 pb-16 relative font-sans">
      
      {/* Subtle Background Effects */}
      <div className="absolute inset-0 z-0 opacity-[0.015] pointer-events-none">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern-light" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern-light)" />
        </svg>
      </div>

      {/* Radial Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* MAIN CONTAINER */}
      <main className="relative z-10 container mx-auto px-6 max-w-7xl my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Content & Actions */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-cyan-200 bg-cyan-50 text-xs font-semibold text-cyan-700 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-cyan-600 animate-pulse" />
                <span>⚡ Building AI Leaders</span>
              </div>
              
              <h1 className="text-8xl md:text-[10rem] font-black tracking-tight leading-none bg-gradient-to-r from-cyan-600 via-blue-600 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_4px_15px_rgba(6,182,212,0.1)] select-none">
                404
              </h1>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Oops! This Page Doesn't Exist.
              </h2>
              <p className="text-slate-600 text-base md:text-lg max-w-xl leading-relaxed">
                Looks like the page you're looking for has been moved, deleted, or never existed. 
                Don't worry—your learning journey doesn't have to stop here.
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
              <Link href="/">
                <button className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm tracking-wide shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
                  <Home className="w-4.5 h-4.5" />
                  <span>🏠 Back to Home</span>
                </button>
              </Link>
              <Link href="/internships">
                <button className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-sm tracking-wide shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
                  <Briefcase className="w-4.5 h-4.5 text-cyan-600" />
                  <span>💼 Explore Internships</span>
                </button>
              </Link>
              <Link href="/programs">
                <button className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-sm tracking-wide shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
                  <BookOpen className="w-4.5 h-4.5 text-cyan-600" />
                  <span>📚 Explore Programs</span>
                </button>
              </Link>
              <Link href="/contact">
                <button className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-sm tracking-wide shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
                  <Phone className="w-4.5 h-4.5 text-slate-900" />
                  <span>📞 Contact Support</span>
                </button>
              </Link>
            </div>

            {/* Glassmorphism Helpful Links Card */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-md max-w-xl shadow-lg space-y-4">
              <h3 className="text-xs font-bold text-slate-400 tracking-[0.2em] uppercase">
                Popular Pages
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: "Training Programs", href: "/programs" },
                  { label: "Internship Opportunities", href: "/internships" },
                  { label: "Professional Certifications", href: "/prep-resources" },
                  { label: "Verify Certificate", href: "/#verify" },
                  { label: "Student Dashboard", href: "/internship/student/dashboard" },
                  { label: "About Us", href: "/about" },
                  { label: "Contact Us", href: "/contact" }
                ].map((item, i) => (
                  <Link key={i} href={item.href} className="group flex items-center gap-1.5 text-sm text-slate-600 hover:text-cyan-600 transition-colors">
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 group-hover:translate-x-0.5 transition-transform" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Floating Illustration */}
          <div className="lg:col-span-5 relative flex items-center justify-center w-full aspect-square max-w-[460px] mx-auto select-none">
            
            {/* Watermark logo in background (reacts heavily to mouse) */}
            <div 
              className="absolute inset-0 flex items-center justify-center opacity-[0.05] transition-transform duration-500 ease-out"
              style={{ transform: `translate(${mousePosition.x * -35}px, ${mousePosition.y * -35}px) scale(1.15)` }}
            >
              <Image 
                src="/thp logo.png" 
                alt="Branding Watermark" 
                width={360} 
                height={120} 
                className="w-full h-auto object-contain brightness-90"
              />
            </div>

            {/* Glowing broken route lines and orbits */}
            <svg 
              className="absolute w-full h-full text-slate-300 transition-transform duration-700 ease-out z-0"
              style={{ transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)` }}
              viewBox="0 0 100 100"
            >
              {/* Central dashed orbit */}
              <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" className="animate-[spin_40s_linear_infinite]" />
              
              {/* Outer broken orbit */}
              <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 25" className="animate-[spin_60s_linear_infinite_reverse]" />

              {/* Broken route lines (Bezier paths) */}
              <path d="M10,50 Q30,20 50,50" fill="none" stroke="rgba(6,182,212,0.4)" strokeWidth="1" strokeDasharray="2 4" />
              <path d="M90,50 Q70,80 50,50" fill="none" stroke="rgba(245,158,11,0.3)" strokeWidth="1" strokeDasharray="2 4" />
              <path d="M50,10 Q20,40 50,50" fill="none" stroke="rgba(6,182,212,0.3)" strokeWidth="1.5" strokeDasharray="5 5" />
            </svg>

            {/* Floating glowing particles */}
            <div 
              className="absolute w-full h-full z-10 pointer-events-none transition-transform duration-300 ease-out"
              style={{ transform: `translate(${mousePosition.x * 25}px, ${mousePosition.y * 25}px)` }}
            >
              {/* Cyan Particle */}
              <div className="absolute top-[20%] left-[25%] w-3 h-3 rounded-full bg-cyan-500/60 blur-[1px] shadow-[0_0_8px_rgba(6,182,212,0.4)] animate-bounce duration-3000" />
              {/* Gold Particle */}
              <div className="absolute bottom-[25%] right-[20%] w-2.5 h-2.5 rounded-full bg-amber-500/60 blur-[1px] shadow-[0_0_8px_rgba(245,158,11,0.4)] animate-pulse duration-2000" />
              {/* Small Cyan Particle */}
              <div className="absolute top-[65%] left-[15%] w-2 h-2 rounded-full bg-cyan-600/50 shadow-[0_0_6px_rgba(6,182,212,0.3)] animate-ping duration-1500" />
              {/* Sparkle star */}
              <div className="absolute top-[30%] right-[25%] animate-pulse">
                <Sparkles className="w-5 h-5 text-amber-500/70 drop-shadow-[0_0_5px_rgba(245,158,11,0.4)]" />
              </div>
              {/* Another Sparkle */}
              <div className="absolute bottom-[35%] left-[30%] animate-pulse duration-3000">
                <Sparkles className="w-4 h-4 text-cyan-500/70 drop-shadow-[0_0_5px_rgba(6,182,212,0.4)]" />
              </div>
            </div>

            {/* Central Glassmorphism Search Hub */}
            <div 
              className="relative z-20 w-36 h-36 rounded-3xl bg-white/80 border border-slate-200 shadow-2xl backdrop-blur-xl flex items-center justify-center group transition-transform duration-500 ease-out"
              style={{ transform: `translate(${mousePosition.x * 45}px, ${mousePosition.y * 45}px) rotate(${mousePosition.x * 8}deg)` }}
            >
              {/* Outer pulsing glow */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-cyan-500 to-amber-500 opacity-20 blur group-hover:opacity-30 transition-opacity duration-300" />
              
              {/* Inside Search Card */}
              <div className="relative w-full h-full rounded-3xl bg-white/90 border border-slate-100 flex flex-col items-center justify-center gap-2">
                <div className="w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-150 flex items-center justify-center text-cyan-600 shadow-[inset_0_0_12px_rgba(6,182,212,0.1)] animate-[pulse_2s_infinite]">
                  <Search className="w-7 h-7 drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]" />
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                  Searching...
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* BOTTOM SECTION */}
      <div className="relative z-10 w-full text-center mt-8 space-y-1.5">
        <p className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
          🚀 Continue Building Your Future With TechieHelp Institute of AI
        </p>
        <p className="text-[10px] text-slate-400 tracking-widest font-semibold">
          Training • Internships • Certifications
        </p>
      </div>

    </div>
  );
}
