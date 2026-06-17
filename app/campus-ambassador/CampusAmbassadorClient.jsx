"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { 
  Sparkles, Award, Star, Users, Briefcase, GraduationCap, Trophy, 
  MapPin, Settings, Mail, Phone, BookOpen, Send, ChevronDown, 
  ArrowRight, ArrowUpRight, CheckCircle2, ShieldCheck, Rocket, 
  Gift, HeartHandshake, Calendar, HelpCircle, Network
} from "lucide-react";
import { toast } from "sonner";

// Animated counter component for Stats
const StatCounter = ({ value, label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value.toString().replace(/[^0-9]/g, ""));
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center p-8 bg-slate-50/70 backdrop-blur-md border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-4xl md:text-5xl font-black text-blue-950 mb-2 bg-gradient-to-r from-blue-950 to-blue-800 bg-clip-text text-transparent">
        {value.toString().includes("+") ? `${count}+` : count}
      </h3>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</p>
    </div>
  );
};

export default function CampusAmbassadorClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    courseBranch: "",
    yearOfStudy: "1st Year",
    linkedin: "",
    reason: "",
    experience: ""
  });

  // Force light mode on mount
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.college || !formData.courseBranch || !formData.reason) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission delay
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Application submitted successfully! Our community team will get in touch with you shortly.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        college: "",
        courseBranch: "",
        yearOfStudy: "1st Year",
        linkedin: "",
        reason: "",
        experience: ""
      });
    } catch (error) {
      toast.error("Failed to submit. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: "What is the duration of the program?",
      a: "The TechieHelp Campus Ambassador Program is a 6-month cohort-based program. Outstanding ambassadors may get the opportunity to extend their tenure or step up to regional leadership roles."
    },
    {
      q: "Is there any fee to join?",
      a: "No, there is absolutely no fee to join the program. It is completely free and designed to empower student leaders with career and skill opportunities."
    },
    {
      q: "Will I receive a certificate?",
      a: "Yes! All campus ambassadors who successfully complete the minimal program milestones and activities during their tenure will receive an official completion certificate and a professional Letter of Recommendation."
    },
    {
      q: "What rewards can I earn?",
      a: "Apart from learning, networking, and direct placement mentorship, you can earn exclusive TechieHelp merchandise (T-shirts, hoodies, stickers, notebooks), cash rewards for successful event milestones, and free access to premium training programs."
    },
    {
      q: "How are ambassadors selected?",
      a: "The selection is based on your application form responses, active campus presence, passion for tech/community development, and communication skills. Shortlisted candidates undergo a brief virtual interaction before onboarding."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 overflow-x-hidden pt-24 pb-0 font-sans selection:bg-blue-100">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-20 md:py-28 px-6 max-w-7xl mx-auto overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none -z-10">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-[0.06] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600 via-amber-200 to-transparent blur-[120px] pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Headline & Content */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-blue-200 bg-white shadow-sm text-xs font-bold text-[#0F4CBA] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#F4B400] animate-pulse" />
              <span>Campus Ambassador Program 2026</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-blue-950 tracking-tight leading-[1.05]">
              Become the Face of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-950 via-[#0F4CBA] to-[#F4B400]">
                TechieHelp Institute of AI on Your Campus
              </span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
              Lead innovation, build your network, organize events, earn rewards, and help students discover internships and certification opportunities through TechieHelp Institute of AI.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button 
                onClick={() => scrollToSection("apply")}
                className="px-8 py-4 rounded-full bg-[#0F4CBA] hover:bg-blue-900 text-white font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
              >
                Apply Now
                <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => scrollToSection("benefits")}
                className="px-8 py-4 rounded-full bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-700 font-bold text-base shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all"
              >
                View Benefits
              </button>
            </div>
          </div>

          {/* Right Column: Hero Image (campus_leader.png) */}
          <div className="lg:col-span-5 relative w-full flex justify-center">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-amber-100 rounded-3xl blur-2xl opacity-40 -z-10 animate-pulse" />
            <div className="relative aspect-square w-full max-w-[420px] rounded-3xl overflow-hidden bg-white/40 backdrop-blur-sm border border-slate-200/50 shadow-xl p-4 flex items-center justify-center group hover:scale-[1.01] transition-transform duration-500">
              <Image 
                src="/campus_leader.png" 
                alt="Student leader illustration representing community growth and networking" 
                fill 
                className="object-contain p-4"
                priority
              />
            </div>
          </div>

        </div>
      </section>

      {/* 2. WHY BECOME A CAMPUS AMBASSADOR */}
      <section id="benefits" className="py-24 bg-white border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#0F4CBA] uppercase tracking-widest">Why Join Us</span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-950 tracking-tight">Why Become a Campus Ambassador?</h2>
            <p className="text-slate-600 text-base">Develop essential career skills while connecting your campus to global technical ecosystems.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Leadership Development", icon: Trophy, desc: "Take charge of student initiatives and workshops to refine your leadership and coordination skills." },
              { title: "Professional Networking", icon: Network, desc: "Connect directly with experienced professionals, recruiters, mentors, and other student leaders." },
              { title: "Career Growth", icon: GraduationCap, desc: "Gain highly visible milestones to add to your resume, setting you apart from peers in job placements." },
              { title: "Exclusive Opportunities", icon: Star, desc: "Unlock direct priority access to internships, certification training, and community pilot programs." },
              { title: "Recognition & Rewards", icon: Award, desc: "Get certificates, reference letters, achievement badges, and premium custom merchandise." }
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div key={idx} className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-[#0F4CBA]/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-[#0F4CBA] shadow-sm group-hover:bg-[#0F4CBA] group-hover:text-[#F4B400] transition-all duration-300">
                      <IconComponent className="w-5.5 h-5.5" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-xl font-bold text-blue-950">{item.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-normal">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. RESPONSIBILITIES SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-bold text-[#F4B400] uppercase tracking-widest">Our Work</span>
          <h2 className="text-3xl md:text-5xl font-black text-blue-950 tracking-tight">What You'll Do</h2>
          <p className="text-slate-600 text-base">Here is what a typical day looks like for a TechieHelp Campus Ambassador.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Promote TechieHelp Programs", icon: Sparkles, desc: "Create awareness on your campus about our internships, resume tools, and technical programs." },
            { title: "Organize Workshops", icon: Calendar, desc: "Facilitate online/offline awareness sessions and tech workshops with speaker support from TechieHelp." },
            { title: "Build Student Communities", icon: Users, desc: "Establish tech circles or forums in your college to foster group coding and learning sessions." },
            { title: "Share Opportunities", icon: Briefcase, desc: "Help fellow students discover career resources, mock tools, and active job/internship boards." },
            { title: "Represent TechieHelp", icon: Award, desc: "Act as the official representative and primary point of contact for college tech festivals and programs." },
            { title: "Drive Campus Engagement", icon: Settings, desc: "Design and implement student contests, quiz challenges, and coding competitions on campus." }
          ].map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div key={idx} className="group p-6 rounded-3xl bg-white/70 backdrop-blur-md border border-slate-200/60 shadow-sm hover:shadow-lg transition-shadow text-left flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0F4CBA] group-hover:bg-[#0F4CBA] group-hover:text-[#F4B400] transition-colors flex-shrink-0 flex items-center justify-center">
                  <IconComponent className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-blue-950">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. BENEFITS & REWARDS */}
      <section className="py-24 bg-white border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#0F4CBA] uppercase tracking-widest">Perks</span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-950 tracking-tight">What's In It For You?</h2>
            <p className="text-slate-600 text-base">Earn valuable career credentials and rewards as you guide your student community.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Official Certificate", icon: ShieldCheck, desc: "Get a verified completion certificate signed by organization executives." },
              { title: "Recommendation Letter", icon: Award, desc: "Earn a custom Letter of Recommendation (LoR) based on your performance." },
              { title: "Exclusive Merchandise", icon: Gift, desc: "Recieve premium TechieHelp hoodies, t-shirts, badges, and tech accessories." },
              { title: "Internship Access", icon: Briefcase, desc: "Get priority fast-track interviews for in-house development and management roles." },
              { title: "Leadership Recognition", icon: Trophy, desc: "Features on the TechieHelp official leaderboards and website ambassador hall." },
              { title: "Networking Exposure", icon: Network, desc: "Participate in virtual meetups and tech events with ambassadors nationwide." },
              { title: "Achievement Badges", icon: Star, desc: "Display verified student leader credentials on your LinkedIn profile." },
              { title: "Priority Event Access", icon: Calendar, desc: "Register early for tech conferences, hackathons, and corporate programs." }
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div key={idx} className="group p-6 rounded-3xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-blue-200/50 hover:shadow-xl transition-all text-left flex flex-col justify-between min-h-[160px]">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[#0F4CBA] group-hover:bg-[#0F4CBA] group-hover:text-[#F4B400] transition-all shadow-sm">
                    <IconComponent className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div className="space-y-1 mt-4">
                    <h3 className="text-sm font-bold text-blue-950">{item.title}</h3>
                    <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. WHO CAN APPLY & ELIGIBILITY */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Eligibility Side */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h3 className="text-2xl md:text-3xl font-black text-blue-950 tracking-tight border-b border-slate-100 pb-3">Who Can Apply?</h3>
            <p className="text-slate-600 text-base leading-relaxed">
              We welcome applications from motivated students across colleges, universities, and disciplines who are ready to make a local impact.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              {[
                { title: "College Students", desc: "Currently enrolled in any full-time undergraduate or postgraduate program." },
                { title: "Diploma Students", desc: "Pursuing polytechnic or technical diploma tracks in engineering." },
                { title: "Engineering Students", desc: "Passionate about computer science, IT, electronics, or technical domains." },
                { title: "Management Students", desc: "Focused on business administration, coordination, operations, or marketing." },
                { title: "Passionate Learners", desc: "Eager to explore AI tools, resumes, and modern technical structures." },
                { title: "Community Builders", desc: "Excited to organize groups, help peers, and handle campus events." }
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-150 shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:border-amber-300 transition-colors">
                  <h4 className="text-sm font-bold text-blue-950 flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-[#0F4CBA]" />
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements Side */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-white border border-slate-200 shadow-lg text-left space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#0F4CBA]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-blue-950">Program Requirements</h3>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              To succeed as an ambassador, we suggest meeting these general skills and outreach guidelines:
            </p>
            <div className="space-y-4 pt-2">
              {[
                { title: "Good communication skills", desc: "Willingness to explain benefits, outline campaigns, and interface with staff." },
                { title: "Active on campus", desc: "Participating in college student clubs, student groups, or sports." },
                { title: "Passion for tech and learning", desc: "Understanding the importance of AI skills and placement tools." },
                { title: "Willingness to lead initiatives", desc: "Ready to step out of your comfort zone and handle event operations." }
              ].map((req, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <CheckCircle2 className="w-4.5 h-4.5 text-[#F4B400]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{req.title}</h4>
                    <p className="text-[11px] text-slate-400 font-medium">{req.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 6. PROGRAM JOURNEY (TIMELINE) */}
      <section className="py-24 bg-white border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#0F4CBA] uppercase tracking-widest">Process</span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-950 tracking-tight">Program Journey</h2>
            <p className="text-slate-600 text-base">A transparent, step-by-step path to becoming an accredited campus leader.</p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Horizontal timeline line for desktop */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-900/10 via-[#0F4CBA]/30 to-amber-400/10 transform -translate-y-1/2 z-0 hidden lg:block" />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
              {[
                { step: "Step 1", title: "Apply Online", desc: "Submit your details and outreach experience in the application form." },
                { step: "Step 2", title: "Screening & Selection", desc: "Our coordination team reviews your submission and conducts interviews." },
                { step: "Step 3", title: "Onboarding Session", desc: "Attend the virtual kick-off call, meet team coordinators, and get tool kits." },
                { step: "Step 4", title: "Campus Activities", desc: "Launch community groups, share opportunities, and host tech workshops." },
                { step: "Step 5", title: "Earn Rewards", desc: "Accumulate badges, redeem exclusive merch, and receive accredited certificates." }
              ].map((step, idx) => (
                <div key={idx} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-amber-300 hover:bg-white hover:shadow-lg transition-all text-center flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#0F4CBA] text-white flex items-center justify-center font-bold text-xs shadow-md mb-4 relative z-10">
                    {idx + 1}
                  </div>
                  <span className="text-[10px] font-bold text-[#0F4CBA] uppercase tracking-widest mb-1">{step.step}</span>
                  <h3 className="text-sm font-extrabold text-blue-950 mb-2 leading-tight">{step.title}</h3>
                  <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. AMBASSADOR IMPACT STATISTICS */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCounter value="100+" label="Campus Ambassadors" />
          <StatCounter value="5000+" label="Students Reached" />
          <StatCounter value="50+" label="Campus Events" />
          <StatCounter value="100+" label="Opportunities Shared" />
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-24 bg-white border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#0F4CBA] uppercase tracking-widest">Stories</span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-950 tracking-tight">Success Stories</h2>
            <p className="text-slate-600 text-base">Hear from student leaders who built thriving communities in their colleges.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Rahul Deshmukh", college: "VIT Pune", role: "Lead Ambassador (CS Batch)", text: "Managing workshops with TechieHelp gave me practical event coordination experience. The recommendations helped me land my first software internship.", initial: "R" },
              { name: "Anjali Mehta", college: "SRM University", role: "Growth Leader (2025)", text: "Sharing ATS resume reviews and mock platforms with my batchmates made a massive impact. Our placement numbers improved significantly.", initial: "A" },
              { name: "Vikram Sen", college: "BIT Mesra", role: "Technical Ambassador", text: "The leadership badges and hoodies are amazing, but the best part was working closely with Amit Kumar and other core tech leads.", initial: "V" }
            ].map((test, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col justify-between text-left relative overflow-hidden">
                <div className="absolute right-4 top-4 text-6xl font-serif text-slate-200/60 pointer-events-none select-none">“</div>
                <p className="text-sm text-slate-600 italic leading-relaxed mb-6 font-normal">"{test.text}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-[#0F4CBA] text-[#F4B400] font-bold text-base flex items-center justify-center flex-shrink-0 shadow-sm">
                    {test.initial}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-blue-950">{test.name}</h4>
                    <p className="text-[10px] font-bold text-amber-600">{test.role}</p>
                    <p className="text-[10px] text-slate-400 font-semibold">{test.college}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. APPLICATION FORM */}
      <section id="apply" className="py-24 px-6 max-w-3xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative">
          <div className="absolute top-6 right-8 text-blue-900/10 pointer-events-none">
            <Rocket className="w-12 h-12" />
          </div>
          
          <div className="text-left mb-8 space-y-3">
            <h2 className="text-2xl md:text-3xl font-black text-blue-950 tracking-tight">Apply for Campus Ambassador</h2>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Provide your details below to submit your application. Fields marked with <span className="text-red-500 font-extrabold">*</span> are required.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Full Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#0F4CBA] focus:outline-none bg-slate-50/50 focus:bg-white transition-colors"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Email Address <span className="text-red-500">*</span></label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#0F4CBA] focus:outline-none bg-slate-50/50 focus:bg-white transition-colors"
                  required
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Phone Number <span className="text-red-500">*</span></label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter contact number" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#0F4CBA] focus:outline-none bg-slate-50/50 focus:bg-white transition-colors"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">College / Institute Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="Enter full college name" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#0F4CBA] focus:outline-none bg-slate-50/50 focus:bg-white transition-colors"
                  required
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Course / Branch <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="courseBranch"
                  value={formData.courseBranch}
                  onChange={handleChange}
                  placeholder="e.g. B.Tech (CSE), BBA" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#0F4CBA] focus:outline-none bg-slate-50/50 focus:bg-white transition-colors"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Year of Study <span className="text-red-500">*</span></label>
                <select 
                  name="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold focus:border-[#0F4CBA] focus:outline-none bg-slate-50/50 focus:bg-white transition-colors text-slate-700"
                  required
                >
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                  <option>Other / Postgrad</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">LinkedIn Profile URL</label>
              <input 
                type="url" 
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourprofile" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#0F4CBA] focus:outline-none bg-slate-50/50 focus:bg-white transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Why do you want to become a Campus Ambassador? <span className="text-red-500">*</span></label>
              <textarea 
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                rows={3}
                placeholder="Describe your motivation to represent TechieHelp in college" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#0F4CBA] focus:outline-none bg-slate-50/50 focus:bg-white transition-colors resize-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Experience in leadership / community building</label>
              <textarea 
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                rows={3}
                placeholder="Tell us about student clubs, sports, hackathons, or event management roles you have handled" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#0F4CBA] focus:outline-none bg-slate-50/50 focus:bg-white transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-[#0F4CBA] text-white hover:bg-blue-900 transition-colors flex items-center justify-center gap-2 font-bold text-sm shadow-md"
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Submit Application</span>
                  <Send className="w-4.5 h-4.5" strokeWidth={1.75} />
                </>
              )}
            </button>

          </form>
        </div>
      </section>

      {/* 10. FAQ SECTION */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-left">
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-bold text-[#0F4CBA] uppercase tracking-widest">Questions & Answers</span>
          <h2 className="text-3xl font-black text-blue-950 tracking-tight">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="border-b border-slate-100 last:border-0 py-4.5">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="flex justify-between items-center w-full text-left font-bold text-base md:text-lg text-slate-800 hover:text-[#0F4CBA] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-[#0F4CBA] flex-shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#0F4CBA]' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-normal pl-7">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 11. FINAL CTA SECTION */}
      <section className="py-24 bg-white border-t border-slate-200/50 relative">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-50/60 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-blue-950">
            Ready to Lead Your Campus?
          </h2>
          <p className="text-slate-600 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Join the TechieHelp Campus Ambassador Program and become a leader in your college community.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => scrollToSection("apply")}
              className="px-8 py-4 rounded-full bg-[#0F4CBA] hover:bg-blue-900 text-white font-bold text-base shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all"
            >
              Apply Now
            </button>
            <Link href="/contact">
              <button className="px-8 py-4 rounded-full bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-[#0F4CBA] text-slate-700 font-bold text-base shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-1">
                Contact Us
                <ArrowUpRight className="w-4.5 h-4.5" strokeWidth={1.75} />
              </button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
