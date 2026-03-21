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
  Award,
  Layers,
  X
} from "lucide-react";

// --- Data based directly on user specifications ---
const resourcesData = [
  {
    id: 1,
    title: "Algorithm Design",
    author: "Jon Kleinberg, Eva Tardos",
    tag: "Advanced",
    tagColor: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    pages: "800+",
    level: "Advanced",
    useCase: "Placements & Interviews",
    driveLink: "https://drive.google.com/file/d/1yyh0zlVGuDwR48KkM2P4P4IZabzKQvHT/view",
    desc: [
      "Learn real-world problem solving using algorithms",
      "Covers greedy, divide & conquer, dynamic programming",
      "Focus on design + analysis techniques",
      "Best for placements & interviews"
    ],
    topics: ["Greedy Algorithms", "Dynamic Programming", "Graph Algorithms", "Network Flow"],
    youtubeTitle: "Algorithm Design full course",
    youtubeEmbedUrl: "https://www.youtube.com/embed/0IAPZzGSbME", // Placeholder example
    thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800", 
    rating: 4.8,
    reviews: 1240,
    badge: "Most Popular",
  },
  {
    id: 2,
    title: "Algorithm Notes",
    author: "Curated by Experts",
    tag: "Beginner",
    tagColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    pages: "120+",
    level: "Beginner",
    useCase: "Quick Revision & Exams",
    driveLink: "https://drive.google.com/file/d/1OGcsI5UXCqPYVLIZH2WZZMKzxBKqGK1z/view",
    desc: [
      "Short and quick revision notes",
      "Easy explanations for fast learning",
      "Perfect before exams & interviews"
    ],
    topics: ["Time Complexity", "Sorting", "Searching", "Recursion"],
    youtubeTitle: "Algorithms revision / crash course",
    youtubeEmbedUrl: "https://www.youtube.com/embed/8hly31xKli0",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    reviews: 3200,
    badge: "Recommended by TechieHelp",
  },
  {
    id: 3,
    title: "Algorithm Basics",
    author: "Zero to Hero Series",
    tag: "Beginner",
    tagColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    pages: "250+",
    level: "Beginner",
    useCase: "Foundation Learning",
    driveLink: "https://drive.google.com/file/d/1-xSREXRqkYCZ5EsuNwed8dBWJrHL4tml/view",
    desc: [
      "Start from scratch (zero to hero)",
      "Basic concepts with examples",
      "Beginner-friendly explanations"
    ],
    topics: ["Arrays", "Loops", "Basic algorithms"],
    youtubeTitle: "Algorithms for beginners",
    youtubeEmbedUrl: "https://www.youtube.com/embed/bum_19loj9A",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    rating: 4.7,
    reviews: 890,
  },
  {
    id: 4,
    title: "Introduction to Algorithms (CLRS)",
    author: "Thomas H. Cormen et al.",
    tag: "Advanced",
    tagColor: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    pages: "1300+",
    level: "Advanced",
    useCase: "Deep Learning & Theory",
    driveLink: "https://drive.google.com/file/d/1ykWodJL7ilMo7QHRGtenFitqqwSO1PRL/view",
    desc: [
      "Most famous algorithms book (CLRS)",
      "Covers theory + practical applications",
      "Used worldwide in universities"
    ],
    topics: ["Sorting & Searching", "Graph Algorithms", "Dynamic Programming", "NP-Completeness"],
    youtubeTitle: "CLRS full course / MIT algorithms lecture",
    youtubeEmbedUrl: "https://www.youtube.com/embed/HtSuA80QTyo",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    reviews: 5400,
    badge: "Ivy League Standard",
  }
];

export default function AlgorithmsMarketplacePage() {
  const [selectedResource, setSelectedResource] = useState(null);

  // Lock body scroll on modal
  useEffect(() => {
    if (selectedResource) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedResource]);

  return (
    <div className="min-h-screen bg-[#07090e] font-sans selection:bg-blue-500/30 text-slate-300 pb-20">
      
      {/* Background Animated Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        
        {/* --- Top Navbar --- */}
        <header className="mb-12">
          <nav className="flex items-center text-sm text-slate-500 mb-4 font-medium">
            <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2 opacity-50" />
            <Link href="/prep-resources/dsa" className="hover:text-blue-400 transition-colors">DSA</Link>
            <ChevronRight className="w-4 h-4 mx-2 opacity-50" />
            <span className="text-blue-400 font-semibold">Algorithms</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-3 tracking-tight">
                Algorithms Marketplace
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl">
                Premium curriculum materials, carefully categorized for placements, quick revisions, and deep theoretical understanding.
              </p>
            </div>
            
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 backdrop-blur-md">
              <Award className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-bold text-white">4 Verified Resources</span>
            </div>
          </div>
        </header>

        {/* --- Marketplace Grid --- */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {resourcesData.map((resource, idx) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group relative flex flex-col bg-[#0f111a]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:border-white/20 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-blue-500/5 transition-colors duration-500 pointer-events-none z-0" />
              
              <div className="flex flex-col sm:flex-row flex-1 p-6 gap-6 relative z-10">
                {/* Left: Thumbnail & Badges */}
                <div className="sm:w-1/3 flex flex-col gap-3">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-lg group-hover:shadow-blue-500/20 transition-all">
                    <img suppressHydrationWarning src={resource.thumbnail} alt={resource.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    
                    {/* Floating Badges on Image */}
                    <div className="absolute top-3 inset-x-0 flex flex-col items-center gap-2">
                      <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border shadow-lg backdrop-blur-md ${resource.tagColor}`}>
                        {resource.tag}
                      </span>
                    </div>

                    {resource.badge && (
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent pt-10 pb-3 px-2 text-center text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                        ★ {resource.badge}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Content */}
                <div className="sm:w-2/3 flex flex-col">
                  
                  {/* Title & Rating */}
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold text-white mb-1 leading-tight group-hover:text-blue-400 transition-colors">
                      {resource.title}
                    </h2>
                    <p className="text-sm text-slate-400 mb-3">{resource.author && `By ${resource.author}`}</p>
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <div className="flex text-amber-400">
                        <Star className="w-4 h-4 fill-amber-400" />
                      </div>
                      <span className="text-amber-400">{resource.rating}</span>
                      <span className="text-slate-500 font-normal">({resource.reviews.toLocaleString()} reviews)</span>
                    </div>
                  </div>

                  {/* Description List */}
                  <div className="space-y-2 mb-6 flex-1">
                    {resource.desc.slice(0,3).map((line, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-300 leading-snug">{line}</span>
                      </div>
                    ))}
                  </div>

                  {/* Info Meta Row */}
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-6 p-3 bg-white/5 rounded-2xl border border-white/5 text-xs font-semibold text-slate-400">
                    <div className="flex flex-col gap-1">
                      <span className="uppercase text-[9px] text-slate-500">Pages</span>
                      <div className="flex items-center gap-1.5 text-slate-200">
                        <BookOpen className="w-3.5 h-3.5 text-blue-400" /> {resource.pages}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="uppercase text-[9px] text-slate-500">Target</span>
                      <div className="flex items-center gap-1.5 text-slate-200">
                        <Target className="w-3.5 h-3.5 text-purple-400" /> {resource.useCase.split(' ')[0]}
                      </div>
                    </div>
                    <div className="hidden lg:flex flex-col gap-1">
                      <span className="uppercase text-[9px] text-slate-500">Level</span>
                      <div className="flex items-center gap-1.5 text-slate-200">
                        <Layers className="w-3.5 h-3.5 text-pink-400" /> {resource.level}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 mt-auto">
                    <button suppressHydrationWarning onClick={() => window.open(resource.driveLink, '_blank')} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all">
                      <Flame className="w-4 h-4 text-amber-300 fill-amber-300" /> 
                      Unlock Access / Download
                    </button>
                    <button suppressHydrationWarning onClick={() => setSelectedResource(resource)} className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all">
                      View Full Details
                    </button>
                  </div>

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
                className="relative w-full max-w-5xl max-h-[90vh] flex flex-col bg-[#0b0d14] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/[0.02]">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedResource.title}</h3>
                    <p className="text-sm text-slate-400 mt-1">Detailed Resource Metadata</p>
                  </div>
                  <button suppressHydrationWarning onClick={() => setSelectedResource(null)} className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Modal Scroll Content */}
                <div className="flex-1 overflow-y-auto p-6 lg:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    
                    {/* Left: YouTube Video Section */}
                    <div className="lg:col-span-3 flex flex-col gap-6">
                      <div className="bg-[#131620] border border-white/10 rounded-2xl p-4">
                        <div className="flex items-center gap-2 text-white font-bold mb-4">
                          <Play className="w-5 h-5 text-red-500 fill-red-500" />
                          Watch Before You Start: {selectedResource.youtubeTitle}
                        </div>
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/5 shadow-inner">
                          <iframe 
                            src={selectedResource.youtubeEmbedUrl} 
                            title={selectedResource.youtubeTitle}
                            className="absolute top-0 left-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Full Outline</h4>
                        <div className="space-y-3 pl-2">
                          {selectedResource.desc.map((line, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                              <span className="text-slate-300 leading-relaxed text-sm lg:text-base">{line}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Metadata & Purchase Box */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                      
                      {/* Sub-Topics */}
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Core Topics Covered</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedResource.topics.map((t, i) => (
                            <span key={i} className="px-3 py-1.5 bg-[#131620] border border-white/10 rounded-lg text-sm text-slate-300 font-medium">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Sticky Buy Box */}
                      <div className="bg-gradient-to-br from-[#131620] to-[#0f111a] border border-white/10 rounded-2xl p-6 shadow-2xl sticky top-0">
                        <div className="flex items-baseline gap-2 mb-6">
                          <span className="text-4xl font-black text-white">Free</span>
                          <span className="text-sm text-slate-400 line-through">₹4,999</span>
                          <span className="ml-auto text-[10px] font-bold px-2 py-1 rounded bg-emerald-500/20 text-emerald-400">Lifetime</span>
                        </div>
                        
                        <button suppressHydrationWarning onClick={() => window.open(selectedResource.driveLink, '_blank')} className="w-full flex items-center justify-center gap-2 py-4 mb-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all">
                          <Flame className="w-5 h-5 text-amber-300 fill-amber-300" /> 
                          Access Resource Now
                        </button>
                        
                        <button suppressHydrationWarning onClick={() => window.open(selectedResource.driveLink, '_blank')} className="w-full flex items-center justify-center gap-2 py-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold transition-all">
                          <ExternalLink className="w-4 h-4" /> 
                          Preview PDF First
                        </button>

                        <p className="text-center text-xs text-slate-500 mt-6 font-medium">
                          Securely hosted on Google Drive. 100% Virus Free guarantee by TechieHelp.
                        </p>
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
