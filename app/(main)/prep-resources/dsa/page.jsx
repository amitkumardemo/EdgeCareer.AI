"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ChevronRight, 
  Search, 
  LayoutGrid, 
  List as ListIcon, 
  Folder, 
  FileText, 
  PlaySquare, 
  Clock, 
  MoreVertical,
  Star,
  Download,
  Code2,
  TerminalSquare,
  Binary,
  BookOpen,
  FileJson,
  Layers,
  ArrowLeft,
  ListFilter,
  LayoutTemplate,
  Rocket,
  Zap
} from "lucide-react";

// --- Mock Data ---

const foldersData = [
  { id: "algo", title: "Algorithms", desc: "Core algorithms, sorting, and dynamic programming.", icon: Binary, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", date: "2026-03-15", size: "1.2 GB", items: 24, badge: "Most Important" },
  { id: "dsa-c", title: "DSA in C", desc: "Classic implementations using pointers and structs.", icon: Code2, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", date: "2026-02-28", size: "850 MB", items: 45 },
  { id: "dsa-cpp", title: "DSA in C++", desc: "STL, templates, and object-oriented data structures.", icon: TerminalSquare, color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20", date: "2026-03-10", size: "2.1 GB", items: 62 },
  { id: "dsa-java", title: "DSA in Java", desc: "Collections framework and enterprise-level patterns.", icon: Layers, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20", date: "2026-01-20", size: "1.5 GB", items: 50 },
  { id: "dsa-py", title: "DSA in Python", desc: "Pythonic approaches to solving complex problems.", icon: FileJson, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", date: "2026-03-22", size: "920 MB", items: 38, badge: "Beginner Friendly" },
  { id: "resources", title: "Learning DSA Resources", desc: "Cheat sheets, architecture diagrams, and e-books.", icon: BookOpen, color: "text-teal-400", bg: "bg-teal-500/10", border: "border-teal-500/20", date: "2025-11-05", size: "4.5 GB", items: 15 },
];

const mockFiles = [
  { id: 1, name: "Arrays & Hashing Masterclass", type: "video", size: "450 MB", date: "Mar 20, 2026", duration: "1h 15m" },
  { id: 2, name: "Sliding Window Pattern Cheat Sheet.pdf", type: "pdf", size: "2.4 MB", date: "Mar 18, 2026" },
  { id: 3, name: "Two Pointers Detailed Examples", type: "folder", size: "--", date: "Mar 15, 2026", items: 5 },
  { id: 4, name: "Dynamic Programming Top 50.pdf", type: "pdf", size: "12 MB", date: "Mar 10, 2026" },
  { id: 5, name: "Graph Traversal BFS vs DFS", type: "video", size: "320 MB", date: "Feb 28, 2026", duration: "45m" },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 12 } }
};

export default function DSAModulePage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFolder, setActiveFolder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("name");

  // Handle opening a folder with a highly polished fake loading state
  const handleOpenFolder = (folder) => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveFolder(folder);
      setIsLoading(false);
    }, 800); 
  };

  const handleBack = () => {
    setActiveFolder(null);
  };

  // Filter & Sort Logic
  const filteredFolders = foldersData
    .filter(f => f.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name") return a.title.localeCompare(b.title);
      if (sortBy === "date") return new Date(b.date) - new Date(a.date);
      return 0;
    });

  const filteredFiles = mockFiles.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#03030a] font-sans selection:bg-blue-500/30 text-slate-300 relative overflow-hidden">
      
      {/* Immersive Animated Grid & Mesh Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:24px_36px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Dynamic Rotating Orbs */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 150, repeat: Infinity, ease: "linear" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] opacity-30 select-none pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[150px]" />
          <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[120px]" />
        </motion.div>
        
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        
        {/* --- Top Navbar --- */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12"
        >
          {/* Breadcrumbs & Title */}
          <div>
            <nav className="flex items-center text-sm text-slate-500 mb-3 font-medium bg-white/5 w-fit px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
              <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 mx-2 opacity-50" />
              <Link href="/prep-resources" className="hover:text-blue-400 transition-colors">Resources</Link>
              <ChevronRight className="w-3.5 h-3.5 mx-2 opacity-50" />
              <button suppressHydrationWarning onClick={handleBack} className={`hover:text-blue-400 transition-colors ${!activeFolder ? "text-slate-300 font-bold" : ""}`}>
                DSA Module
              </button>
              <AnimatePresence>
                {activeFolder && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="flex items-center">
                    <ChevronRight className="w-3.5 h-3.5 mx-2 opacity-50" />
                    <span className="text-blue-400 font-bold">{activeFolder.title}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </nav>
            <h1 className="text-4xl md:text-5xl font-black text-white flex items-center gap-4 tracking-tight">
              {activeFolder ? activeFolder.title : "DSA Resource Library"}
              {!activeFolder && (
                <motion.span 
                  animate={{ scale: [1, 1.05, 1] }} 
                  transition={{ duration: 2, repeat: Infinity }}
                  className="hidden sm:flex items-center gap-1.5 text-sm font-black px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-blue-300 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                >
                  <Star className="w-4 h-4 fill-blue-400" /> Premium Vault
                </motion.span>
              )}
            </h1>
          </div>

          {/* Progress Tracker with Shimmer */}
          {!activeFolder && (
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-5 bg-gradient-to-br from-white/5 to-[#131620]/80 border border-white/10 rounded-2xl px-6 py-4 backdrop-blur-xl shadow-xl hover:border-white/20 transition-all"
            >
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Rocket className="w-3.5 h-3.5 text-indigo-400" /> Module Progress
                </span>
                <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">40% Mastered</span>
              </div>
              <div className="w-28 h-2.5 bg-black/50 rounded-full overflow-hidden shadow-inner border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "40%" }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 relative"
                >
                  <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)' }} />
                </motion.div>
              </div>
            </motion.div>
          )}
        </motion.header>

        {/* --- Top Action Bar --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 bg-[#0b0d14]/80 p-3 rounded-[1.25rem] border border-white/10 backdrop-blur-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)]"
        >
          <div className="relative w-full sm:max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
            <input suppressHydrationWarning 
              type="text" 
              placeholder={activeFolder ? "Search inside folder..." : "Search entire library..."}
              className="w-full bg-[#151822] border border-transparent hover:border-white/5 text-slate-200 text-sm font-medium rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:bg-[#1a1e2b] transition-all placeholder:text-slate-600 shadow-inner"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center bg-[#151822] border border-white/5 rounded-xl p-1.5 shadow-inner">
              <button suppressHydrationWarning 
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white/10 text-white shadow-md scale-105" : "text-slate-500 hover:text-white"}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button suppressHydrationWarning 
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white/10 text-white shadow-md scale-105" : "text-slate-500 hover:text-white"}`}
              >
                <ListIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="relative group/dropdown">
              <button suppressHydrationWarning className="flex items-center gap-2 px-4 py-3 text-sm font-bold text-slate-300 bg-[#151822] border border-white/5 rounded-xl hover:bg-white/10 transition-colors shadow-inner">
                <ListFilter className="w-4 h-4 text-indigo-400" />
                Sort By
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-[#151822] border border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all z-20 overflow-hidden transform origin-top-right group-hover/dropdown:scale-100 scale-95">
                <button suppressHydrationWarning onClick={() => setSortBy("name")} className={`w-full text-left px-5 py-3 text-sm font-medium hover:bg-white/5 transition-colors flex items-center gap-2 ${sortBy === "name" ? "text-blue-400 bg-blue-500/5" : "text-slate-300"}`}>
                  <FileText className="w-4 h-4" /> Name A-Z
                </button>
                <div className="h-px w-full bg-white/5" />
                <button suppressHydrationWarning onClick={() => setSortBy("date")} className={`w-full text-left px-5 py-3 text-sm font-medium hover:bg-white/5 transition-colors flex items-center gap-2 ${sortBy === "date" ? "text-blue-400 bg-blue-500/5" : "text-slate-300"}`}>
                  <Clock className="w-4 h-4" /> Date Modified
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- Main Content Area --- */}
        <AnimatePresence mode="wait">
          
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center py-40"
            >
              <div className="relative w-20 h-20 flex justify-center items-center mb-6">
                 <div className="absolute w-full h-full border-4 border-dashed border-indigo-500/30 rounded-full animate-spin [animation-duration:3s]" />
                 <div className="absolute w-16 h-16 border-4 border-solid border-t-blue-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin [animation-duration:1s]" />
                 <Zap className="w-6 h-6 text-amber-400 animate-pulse" />
              </div>
              <p className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse">Decrypting Premium Resources...</p>
            </motion.div>
          ) : !activeFolder ? (
            /* --- FOLDERS VIEW --- */
            <motion.div
              key="folders"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className={viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" 
                : "flex flex-col gap-4"
              }
            >
              {filteredFolders.map((folder) => {
                const Icon = folder.icon;
                return (
                  <motion.div
                    key={folder.id}
                    variants={itemVariants}
                    onClick={() => {
                      if (folder.id === "algo") {
                        router.push("/prep-resources/dsa/algorithms");
                      } else if (folder.id === "dsa-c") {
                        router.push("/prep-resources/dsa/dsa-c");
                      } else {
                        handleOpenFolder(folder);
                      }
                    }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group relative cursor-pointer bg-gradient-to-b from-[#151822]/80 to-[#0b0d14]/90 backdrop-blur-2xl border border-white/5 rounded-3xl overflow-hidden shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-white/10 transition-all duration-300 ${
                      viewMode === "list" ? "flex items-center p-5" : "p-8"
                    }`}
                  >
                    {/* Advanced Hover Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-${folder.color.split('-')[1]}-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                    <div className={`absolute -top-32 -right-32 w-64 h-64 bg-${folder.color.split('-')[1]}-500/20 rounded-full blur-[80px] group-hover:bg-${folder.color.split('-')[1]}-500/30 transition-colors duration-700 pointer-events-none`} />
                    
                    {viewMode === "grid" ? (
                      <>
                        <div className="flex justify-between items-start mb-8 relative z-10">
                          <div className={`p-4 rounded-2xl ${folder.bg} border border-white/5 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-inner`}>
                            <Icon className={`w-10 h-10 ${folder.color}`} />
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <button suppressHydrationWarning onClick={(e) => e.stopPropagation()} className="p-2 text-slate-500 hover:text-white rounded-xl hover:bg-white/10 transition-colors backdrop-blur-md">
                              <MoreVertical className="w-5 h-5" />
                            </button>
                            {folder.badge && (
                              <span className={`text-[10px] font-black px-3 py-1.5 rounded-lg ${folder.bg} ${folder.color} border border-white/5 uppercase tracking-widest shadow-lg`}>
                                {folder.badge}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="relative z-10">
                          <h3 className="text-2xl font-black text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">{folder.title}</h3>
                          <p className="text-sm font-medium text-slate-400 mb-8 line-clamp-2 leading-relaxed">{folder.desc}</p>
                          <div className="flex items-center justify-between text-xs font-bold text-slate-500 pt-5 border-t border-white/10">
                            <div className="flex items-center gap-2 group-hover:text-blue-400 transition-colors">
                              <LayoutTemplate className="w-4 h-4" />
                              {folder.items} premium items
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {folder.date}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={`p-3 rounded-2xl ${folder.bg} border border-white/5 mr-6 flex-shrink-0 relative z-10 shadow-inner group-hover:scale-110 transition-transform`}>
                          <Icon className={`w-7 h-7 ${folder.color}`} />
                        </div>
                        <div className="flex-1 relative z-10">
                          <h3 className="text-lg font-black text-white group-hover:text-blue-400 transition-colors mb-1">{folder.title}</h3>
                          <p className="text-sm font-medium text-slate-400 truncate max-w-xl">{folder.desc}</p>
                        </div>
                        {folder.badge && (
                          <span className={`hidden md:inline-block mr-8 text-[10px] font-black px-3 py-1.5 rounded-lg ${folder.bg} ${folder.color} border border-white/5 uppercase tracking-widest`}>
                            {folder.badge}
                          </span>
                        )}
                        <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-500 mr-8 relative z-10">
                          <span className="flex items-center gap-1.5"><LayoutTemplate className="w-4 h-4" /> {folder.items} items</span>
                          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {folder.date}</span>
                        </div>
                        <button suppressHydrationWarning onClick={(e) => e.stopPropagation()} className="p-2 text-slate-500 hover:text-white rounded-xl hover:bg-white/10 transition-colors relative z-10">
                          <MoreVertical className="w-6 h-6" />
                        </button>
                      </>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            /* --- FILES VIEW (Inside Folder) --- */
            <motion.div
              key="files"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="bg-[#0b0d14]/90 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-4 sm:p-8 shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 pb-8 border-b border-white/5">
                <div className="flex items-center gap-6">
                  <button suppressHydrationWarning onClick={handleBack} className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all hover:-translate-x-1 hover:shadow-lg">
                    <ArrowLeft className="w-6 h-6 text-white" />
                  </button>
                  <div>
                    <h2 className="text-3xl font-black text-white mb-1.5">{activeFolder.title}</h2>
                    <p className="text-sm font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-md w-fit">
                      {activeFolder.items} Items • Last updated {activeFolder.date}
                    </p>
                  </div>
                </div>
              </div>

              {/* Table Header mimicking Premium Drive */}
              <div className="hidden sm:grid grid-cols-12 gap-4 px-8 py-4 bg-[#151822] rounded-2xl border border-white/5 text-xs font-black text-slate-400 uppercase tracking-widest mb-4 shadow-inner">
                <div className="col-span-6 md:col-span-5">File Name & Type</div>
                <div className="col-span-3 hidden md:block">Last Modified</div>
                <div className="col-span-2">File Size</div>
                <div className="col-span-4 md:col-span-2 text-right">Quick Actions</div>
              </div>

              <div className="flex flex-col gap-3">
                {filteredFiles.map((file, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 + 0.2, type: "spring", stiffness: 100 }}
                    key={file.id} 
                    className="group flex flex-col sm:grid sm:grid-cols-12 gap-4 items-start sm:items-center px-6 py-5 bg-white/[0.01] hover:bg-white-[0.03] border border-white/5 hover:border-indigo-500/30 rounded-2xl cursor-pointer transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.1)] relative overflow-hidden"
                  >
                    {/* Hover slider indicator */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

                    <div className="col-span-6 md:col-span-5 flex items-center gap-5 w-full">
                      <div className="p-3 bg-[#131620] rounded-xl border border-white/10 group-hover:scale-110 group-hover:rotate-3 transition-transform flex-shrink-0 shadow-inner">
                        {file.type === "video" ? <PlaySquare className="w-6 h-6 text-purple-400" /> : 
                         file.type === "pdf" ? <FileText className="w-6 h-6 text-pink-400" /> : 
                         <Folder className="w-6 h-6 text-blue-400 fill-blue-400/20" />}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-lg text-slate-200 group-hover:text-white truncate transition-colors">{file.name}</span>
                        {file.duration && <span className="text-[10px] font-black tracking-wider uppercase text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-md w-fit mt-1.5">{file.duration} Video</span>}
                      </div>
                    </div>
                    
                    <div className="col-span-3 hidden md:block text-sm font-semibold text-slate-500">
                      {file.date}
                    </div>
                    
                    <div className="col-span-2 text-sm font-semibold text-slate-500 hidden sm:block">
                      {file.size !== "--" ? file.size : <span className="text-blue-400">{file.items} contents</span>}
                    </div>

                    <div className="col-span-4 md:col-span-2 flex items-center justify-end gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                      <button suppressHydrationWarning className="p-2.5 text-slate-500 hover:text-amber-400 hover:bg-amber-400/10 rounded-xl transition-all opacity-0 group-hover:opacity-100 hidden sm:block">
                        <Star className="w-5 h-5" />
                      </button>
                      <button suppressHydrationWarning className="px-5 py-2.5 sm:p-3 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500 hover:text-white rounded-xl transition-all flex items-center justify-center font-bold text-sm sm:text-base border border-indigo-500/20 hover:border-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] w-full sm:w-auto">
                        {file.type === "folder" ? "Open Directory" : <span className="flex items-center gap-2 sm:hidden"><Download className="w-4 h-4"/> Download</span>}
                        {file.type !== "folder" && <Download className="w-5 h-5 hidden sm:block" />}
                      </button>
                    </div>
                  </motion.div>
                ))}
                
                {filteredFiles.length === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 text-center flex flex-col items-center">
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/5 shadow-inner">
                      <Search className="w-10 h-10 text-slate-500" />
                    </div>
                    <p className="text-2xl font-black text-white mb-2">No files found</p>
                    <p className="text-slate-400 font-medium">Try adjusting your search query to find exact materials.</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
