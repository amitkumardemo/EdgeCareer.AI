"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ChevronRight, 
  Star, 
  ExternalLink, 
  Play, 
  BookOpen, 
  Target, 
  CheckCircle2, 
  Flame,
  Layers,
  X,
  Lock,
  Timer,
  Award
} from "lucide-react";

// --- Data based directly on user specifications ---
const resourcesData = [
  {
    id: 1,
    title: "Basic Data Structures",
    author: "TechieHelp Core",
    tag: "Beginner",
    tagColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    pages: "200+",
    level: "Beginner",
    useCase: "Placements & Foundations",
    driveLink: "https://drive.google.com/file/d/1xDDNt8At1Jn8d_pp_jDGZfSRYSqq8cGu/view",
    desc: [
      "Core fundamentals of data structures in C",
      "Covers arrays, linked lists, stacks, queues",
      "Must-learn before advanced DSA"
    ],
    topics: ["Arrays", "Linked List", "Stack", "Queue"],
    youtubeTitle: "Data Structures in C full course",
    youtubeEmbedUrl: "https://www.youtube.com/embed/B31LgI4Y4DQ", // standard C DSA video placeholder
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    reviews: 4200,
    badge: "🔥 Most Important",
  },
  {
    id: 2,
    title: "C Programming DSA",
    author: "Logic Builders",
    tag: "Beginner",
    tagColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    pages: "150+",
    level: "Beginner",
    useCase: "Logic Building",
    driveLink: "https://drive.google.com/file/d/1RGfNauPHSsqXhlFRagUAZwiPHA9wrnyM/view",
    desc: [
      "Learn DSA concepts using C programming",
      "Strong focus on logic building"
    ],
    topics: ["Pointers", "Memory allocation", "Structures"],
    youtubeTitle: "C programming for DSA beginners",
    youtubeEmbedUrl: "https://www.youtube.com/embed/8PopR3x-VMY",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?auto=format&fit=crop&q=80&w=800",
    rating: 4.6,
    reviews: 890,
  },
  {
    id: 3,
    title: "Cheat CODE Book By GFG",
    author: "GeeksForGeeks",
    tag: "Beginner",
    tagColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    pages: "80+",
    level: "Beginner",
    useCase: "Quick Exam Prep",
    driveLink: "https://drive.google.com/file/d/15bK-S2BqcR9EsUYwtGi_YjtrEfoOFBhT/view",
    desc: [
      "Quick revision notes",
      "Important formulas and shortcuts"
    ],
    topics: ["Tricks", "Key questions"],
    youtubeTitle: "DSA quick revision",
    youtubeEmbedUrl: "https://www.youtube.com/embed/bum_19loj9A",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    reviews: 5120,
    badge: "⚡ Quick Revision",
  },
  {
    id: 4,
    title: "Complete DSA Guide ROADMAP",
    author: "TechieHelp Mentors",
    tag: "Beginner",
    tagColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    pages: "40+",
    level: "Beginner",
    useCase: "Learning Path Setup",
    driveLink: "https://drive.google.com/file/d/1uErAbgIxfUFo8bekTc15uOSOXTUgIc1E/view",
    desc: [
      "Step-by-step DSA roadmap",
      "Structured learning path"
    ],
    topics: ["Learning plan", "Practice roadmap"],
    youtubeTitle: "DSA roadmap for placements",
    youtubeEmbedUrl: "https://www.youtube.com/embed/aGjK0oU_8jQ",
    thumbnail: "https://images.unsplash.com/photo-1506784951209-42b15fb7fc17?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    reviews: 3100,
    badge: "🧭 Roadmap",
  },
  {
    id: 5,
    title: "Data Structure and Algorithms",
    author: "Advanced Series",
    tag: "Intermediate",
    tagColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    pages: "300+",
    level: "Intermediate",
    useCase: "Deep Concept Learning",
    driveLink: "https://drive.google.com/file/d/1rXP60PxKTbFCzb7_BVL6LZe1BbNm3hhw/view",
    desc: [
      "Detailed explanation of DSA concepts",
      "Includes real examples"
    ],
    topics: ["Sorting", "Searching", "Trees", "Graphs"],
    youtubeTitle: "DSA full course intermediate",
    youtubeEmbedUrl: "https://www.youtube.com/embed/0IAPZzGSbME",
    thumbnail: "https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&q=80&w=800",
    rating: 4.7,
    reviews: 1800,
  },
  {
    id: 6,
    title: "DSA Cheatsheet",
    author: "Quick Notes",
    tag: "Beginner",
    tagColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    pages: "50+",
    level: "Beginner",
    useCase: "Before Interviews",
    driveLink: "https://drive.google.com/file/d/1ollpBsvjVs6rgrOjZvEvtONrZ831uF6K/view",
    desc: [
      "Quick summary for revision",
      "Easy-to-read notes"
    ],
    topics: ["Summary", "Definitions", "Complexity"],
    youtubeTitle: "DSA cheatsheet explanation",
    youtubeEmbedUrl: "https://www.youtube.com/embed/RBSGKlAvoiM",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=800",
    rating: 4.6,
    reviews: 1100,
  },
  {
    id: 7,
    title: "DSA CheatSheet (Advanced)",
    author: "TechieHelp Pro",
    tag: "Intermediate",
    tagColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    pages: "70+",
    level: "Intermediate",
    useCase: "FAANG Prep",
    driveLink: "https://drive.google.com/file/d/1zCKKXA8aCKxnRbgx72kNTt0kwBi4n330/view",
    desc: [
      "Advanced level revision",
      "Covers complex concepts"
    ],
    topics: ["Dynamic Programming", "Tries", "Segment Trees"],
    youtubeTitle: "Advanced DSA concepts",
    youtubeEmbedUrl: "https://www.youtube.com/embed/v4cd1O4zkGw",
    thumbnail: "https://images.unsplash.com/photo-1629904853716-f0bc54eea481?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    reviews: 2450,
  },
  {
    id: 8,
    title: "IMPORTANT DSA Cheatsheet",
    author: "Interview Experts",
    tag: "Beginner",
    tagColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    pages: "45+",
    level: "Beginner",
    useCase: "Exam Crash Revision",
    driveLink: "https://drive.google.com/file/d/1C9UTGfCNwpTKQgtJe5EeloWYY1Ot6DjP/view",
    desc: [
      "High priority topics for interviews",
      "Must revise before exams"
    ],
    topics: ["Top 50 Qs", "Patterns", "Must-Knows"],
    youtubeTitle: "Important DSA questions",
    youtubeEmbedUrl: "https://www.youtube.com/embed/3Q_oYDQ2whs",
    thumbnail: "https://images.unsplash.com/photo-1605379399843-5870eea9b74e?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    reviews: 4900,
    badge: "🔥 Must Do",
  },
  {
    id: 9,
    title: "Learn DSA in 100 Days",
    author: "TechieHelp Standard",
    tag: "Beginner",
    tagColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    pages: "100+",
    level: "Beginner",
    useCase: "Daily Consistency",
    driveLink: "https://drive.google.com/file/d/1lgHYJa6pZSDvcbmE9YHSX3dHjdLZ5Shb/view",
    desc: [
      "Daily roadmap for mastering DSA",
      "Perfect for consistency"
    ],
    topics: ["Daily schedule", "Practice problems", "Pacing"],
    youtubeTitle: "DSA 100 days challenge",
    youtubeEmbedUrl: "https://www.youtube.com/embed/jZ_y91c0eWw",
    thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    reviews: 6730,
    badge: "📅 Study Plan",
  }
];

export default function DSACMarketplacePage() {
  const [selectedResource, setSelectedResource] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });

  // Limited time offer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Lock body scroll on modal
  useEffect(() => {
    if (selectedResource) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedResource]);

  return (
    <div className="min-h-screen bg-[#07090e] font-sans selection:bg-indigo-500/30 text-slate-300 pb-20 relative">
      
      {/* Background Animated Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
      </div>

      {/* Sticky Flash Deal Banner */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white shadow-xl shadow-indigo-900/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col sm:flex-row items-center justify-between text-sm font-bold">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-300 fill-amber-300" />
            Limited Time Offer: Unlock "Complete C Language DSA Bundle" for 80% Off!
          </div>
          <div className="flex items-center gap-2 mt-2 sm:mt-0 font-mono text-amber-200">
            <Timer className="w-4 h-4" />
            {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        
        {/* --- Top Navbar --- */}
        <header className="mb-12">
          <nav className="flex items-center text-sm text-slate-500 mb-4 font-medium">
            <Link href="/" className="hover:text-indigo-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2 opacity-50" />
            <Link href="/prep-resources/dsa" className="hover:text-indigo-400 transition-colors">DSA</Link>
            <ChevronRight className="w-4 h-4 mx-2 opacity-50" />
            <span className="text-indigo-400 font-semibold">DSA in C</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 mb-3 tracking-tight">
                DSA in C Marketplace
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl">
                C-optimized PDFs, foundational theory, and comprehensive roadmaps. Curated to build impeccable logic from the ground up.
              </p>
            </div>
            
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 backdrop-blur-md">
              <Award className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-bold text-white">9 Verified Resources</span>
            </div>
          </div>
        </header>

        {/* --- Marketplace Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {resourcesData.map((resource, idx) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group flex flex-col bg-[#0f111a]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:border-indigo-500/30 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] transition-all duration-300"
            >
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img suppressHydrationWarning src={resource.thumbnail} alt={resource.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f111a] via-transparent to-black/40" />
                
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <span className={`px-2 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg backdrop-blur-md border ${resource.tagColor}`}>
                    {resource.tag}
                  </span>
                  {resource.badge && (
                    <span className="px-2 py-1 text-[10px] sm:text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg">
                      {resource.badge}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 left-4 flex gap-2 text-sm font-semibold">
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {resource.rating}
                  </div>
                </div>
              </div>

              <div className="flex flex-col flex-1 p-5 lg:p-6 relative z-10">
                <h2 className="text-xl font-bold text-white mb-1 leading-tight group-hover:text-indigo-400 transition-colors line-clamp-1">
                  {resource.title}
                </h2>
                <p className="text-xs text-slate-400 mb-4">{resource.author}</p>

                <ul className="space-y-2 mb-6 flex-1 text-sm text-slate-300">
                  {resource.desc.slice(0, 2).map((line, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-2">{line}</span>
                    </li>
                  ))}
                </ul>

                <div className="grid grid-cols-2 gap-2 mb-6 p-3 bg-white/5 rounded-xl border border-white/5 text-[10px] sm:text-xs font-semibold text-slate-400">
                  <div className="flex flex-col gap-1">
                    <span className="uppercase text-slate-500">Pages</span>
                    <div className="flex items-center gap-1.5 text-slate-200">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> {resource.pages}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="uppercase text-slate-500">Target</span>
                    <div className="flex items-center gap-1.5 text-slate-200">
                      <Target className="w-3.5 h-3.5 text-purple-400" /> {resource.useCase.split(' ')[0]}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                  <button suppressHydrationWarning onClick={() => setSelectedResource(resource)} className="w-full sm:w-1/2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold transition-all">
                    View Details
                  </button>
                  <button suppressHydrationWarning onClick={() => window.open(resource.driveLink, '_blank')} className="w-full sm:w-1/2 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold shadow-[0_0_15px_rgba(79,70,229,0.3)] transition-all">
                    <Flame className="w-4 h-4 text-amber-300" /> 
                    Unlock
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- Expanded Detail Modal --- */}
        <AnimatePresence>
          {selectedResource && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              onClick={() => setSelectedResource(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-5xl max-h-[95vh] flex flex-col bg-[#0b0d14] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/[0.02]">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-bold text-white">{selectedResource.title}</h3>
                      {selectedResource.badge && (
                        <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-bold text-white bg-indigo-600 rounded-md">
                          {selectedResource.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-400 mt-1">Detailed Resource Metadata & Preview</p>
                  </div>
                  <button suppressHydrationWarning onClick={() => setSelectedResource(null)} className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Modal Scroll Content */}
                <div className="flex-1 overflow-y-auto p-6 lg:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    
                    {/* Left: YouTube Video & Description */}
                    <div className="lg:col-span-3 flex flex-col gap-6">
                      <div className="bg-[#131620] border border-white/10 rounded-2xl p-4">
                        <div className="flex items-center gap-2 text-white font-bold mb-4">
                          <Play className="w-5 h-5 text-red-500 fill-red-500" />
                          Watch Before You Start: {selectedResource.youtubeTitle}
                        </div>
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/5 shadow-inner bg-black/50">
                          {selectedResource.youtubeEmbedUrl ? (
                            <iframe 
                              src={selectedResource.youtubeEmbedUrl} 
                              title={selectedResource.youtubeTitle}
                              className="absolute top-0 left-0 w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                              allowFullScreen
                            ></iframe>
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm">
                              Video currently unavailable
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Benefits</h4>
                          <div className="space-y-3 pl-2">
                            {selectedResource.desc.map((line, i) => (
                              <div key={i} className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-300 leading-relaxed text-sm">{line}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Topics Covered</h4>
                          <ul className="space-y-3 pl-2">
                            {selectedResource.topics.map((t, i) => (
                              <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                                <Layers className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                                {t}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Right: Premium Blurred Preview & Purchase Box */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                      
                      {/* Blurred Locked Preview */}
                      <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                        <img suppressHydrationWarning src={selectedResource.thumbnail} alt="Preview" className="w-full h-full object-cover blur-md scale-110 opacity-50" />
                        <div className="absolute inset-0 bg-[#0b0d14]/60 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-t from-[#0f111a] via-transparent">
                          <Lock className="w-10 h-10 text-slate-400 mb-3" />
                          <h4 className="text-white font-bold mb-1">Preview Locked</h4>
                          <p className="text-xs text-slate-400">Unlock full access to view all {selectedResource.pages} high-quality PDF content instantly.</p>
                        </div>
                      </div>

                      {/* Sticky Buy Box */}
                      <div className="bg-gradient-to-br from-[#131620] to-[#0f111a] border border-white/10 rounded-2xl p-6 shadow-2xl sticky top-6">
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-4xl font-black text-white">Free</span>
                          <span className="text-sm text-slate-400 line-through">₹2,999</span>
                          <span className="ml-auto text-xs font-bold px-2 py-1 rounded bg-indigo-500/20 text-indigo-400 flex items-center gap-1">
                            <Star className="w-3 h-3 fill-indigo-400" /> {selectedResource.rating}
                          </span>
                        </div>
                        <p className="text-xs text-amber-400 font-semibold mb-6 flex items-center gap-1">
                          <Timer className="w-3 h-3" /> Offer expires very soon.
                        </p>
                        
                        <button suppressHydrationWarning onClick={() => window.open(selectedResource.driveLink, '_blank')} className="w-full flex items-center justify-center gap-2 py-4 mb-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all transform hover:-translate-y-1">
                          <Flame className="w-5 h-5 text-amber-300 fill-amber-300" /> 
                          Unlock Full Content
                        </button>
                        
                        <button suppressHydrationWarning onClick={() => window.open(selectedResource.driveLink, '_blank')} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold transition-all">
                          <ExternalLink className="w-4 h-4" /> 
                          Quick PDF Preview
                        </button>

                        <div className="mt-6 flex flex-col gap-2 text-xs font-medium text-slate-500">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Lifetime Updates
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Tested & Verified Material
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Secure Download via Drive
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
