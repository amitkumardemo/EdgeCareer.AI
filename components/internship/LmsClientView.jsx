"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, PlayCircle, CheckCircle2, Circle, ChevronDown, ChevronRight, Lock, FileText, MessageCircle, File } from "lucide-react";
import { markVideoComplete } from "@/actions/internship-lms";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import VideoComments from "./VideoComments";

export default function LmsClientView({ applicationId, batchName, modules, progressData, userEmail = "student@lms.com" }) {
  const [completedIds, setCompletedIds] = useState(new Set(progressData?.completedIds || []));
  const [activeVideo, setActiveVideo] = useState(null);
  const [expandedModules, setExpandedModules] = useState({});
  const [marking, setMarking] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Flatten videos just for "Next View" functionality
  const allVideos = useMemo(() => {
    return modules.flatMap(m => m.videos || []);
  }, [modules]);

  // Set initial video and open its module
  useMemo(() => {
    if (modules.length > 0 && !activeVideo) {
      // Find first uncompleted video
      let firstUncompleted = null;
      let firstMod = null;
      for (const m of modules) {
        for (const v of m.videos || []) {
          if (!completedIds.has(v.id)) {
            firstUncompleted = v;
            firstMod = m;
            break;
          }
        }
        if (firstUncompleted) break;
      }
      
      const v = firstUncompleted || (modules[0].videos?.[0]);
      if (v) {
        setActiveVideo(v);
        setExpandedModules({ [firstMod?.id || modules[0].id]: true });
      }
    }
  }, [modules, completedIds, activeVideo]);

  const toggleModule = (id) => {
    setExpandedModules(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleMarkComplete = async () => {
    if (!activeVideo || marking) return;
    setMarking(true);
    try {
      await markVideoComplete(applicationId, activeVideo.id);
      setCompletedIds(prev => {
        const next = new Set(prev);
        next.add(activeVideo.id);
        return next;
      });
      toast.success("Marked as completed!");

      // Find next video
      const currentIndex = allVideos.findIndex(v => v.id === activeVideo.id);
      if (currentIndex !== -1 && currentIndex + 1 < allVideos.length) {
        const nextVid = allVideos[currentIndex + 1];
        setActiveVideo(nextVid);
        // Ensure its module is expanded
        const nextMod = modules.find(m => m.videos.some(v => v.id === nextVid.id));
        if (nextMod) setExpandedModules(p => ({ ...p, [nextMod.id]: true }));
      } else {
        toast.info("Course completed! Great job.");
      }
    } catch (e) {
      toast.error("Failed to update progress");
    } finally {
      setMarking(false);
    }
  };

  const progressPct = allVideos.length > 0 ? Math.round((completedIds.size / allVideos.length) * 100) : 0;

  return (
    <div className="flex flex-col h-screen max-h-screen bg-[#030712] text-white overflow-hidden">
      {/* Top Navbar */}
      <header className="flex-none h-16 border-b border-white/10 bg-black/50 backdrop-blur-md flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/internship/student/dashboard" className="p-2 hover:bg-white/10 rounded-full transition-colors group">
            <ArrowLeft className="h-5 w-5 text-gray-400 group-hover:text-white" />
          </Link>
          <div>
            <h1 className="text-sm font-bold truncate max-w-[200px] md:max-w-[400px]">{batchName}</h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest bg-primary/20 text-primary px-2 py-0.5 rounded-full inline-block mt-0.5">LMS Course</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs font-bold text-gray-300">Progress</span>
            <span className="text-[10px] text-gray-500">{completedIds.size} of {allVideos.length} completed</span>
          </div>
          <div className="w-24 md:w-32 h-2 bg-white/10 border border-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full transition-all duration-700" style={{ width: `${progressPct}%` }} />
          </div>
          <span className="text-sm font-black text-white">{progressPct}%</span>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden min-h-0">
        
        {/* Video Player (Main) */}
        <div className="flex-1 flex flex-col min-h-0 relative overflow-y-auto custom-scrollbar">
          {activeVideo ? (
            <div className="flex-1 w-full flex flex-col pb-20">
              <div 
                className="w-full bg-black relative aspect-video"
                onContextMenu={e => e.preventDefault()}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.youtubeId || ""}?autoplay=1&rel=0&modestbranding=1&controls=1`}
                  title={activeVideo.title}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                {/* Top Right blocker to hide Share/More native YT actions */}
                <div className="absolute top-0 right-0 w-48 h-16 bg-black z-10 pointer-events-auto" />
                
                {/* Dynamic Watermark */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-10 select-none flex flex-wrap gap-8 items-center justify-center -rotate-12 scale-150">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <span key={i} className="text-white/20 font-black tracking-widest text-xl">{userEmail}</span>
                  ))}
                </div>
              </div>

              {/* Enhanced Action Bar */}
              <div className="p-6 bg-[#0B0F19] border-y border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shrink-0 shadow-lg">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">{activeVideo.title}</h2>
                  <div className="flex items-center gap-3 text-sm font-bold text-gray-500">
                     <span>{activeVideo.duration || "Self-Paced"}</span>
                     <span className="w-1 h-1 rounded-full bg-white/20" />
                     <span className="text-primary">{batchName}</span>
                  </div>
                </div>
                <Button 
                  onClick={handleMarkComplete} 
                  disabled={marking || completedIds.has(activeVideo.id)}
                  className={`shrink-0 ${completedIds.has(activeVideo.id) ? "bg-green-500/20 text-green-500 hover:bg-green-500/30" : "bg-primary text-black hover:bg-primary/90"} px-8 py-6 rounded-xl font-bold shadow-xl shadow-primary/10`}
                >
                  {completedIds.has(activeVideo.id) ? (
                    <><CheckCircle2 className="mr-2 h-5 w-5" /> Completed</>
                  ) : (
                    <>{marking ? "Marking..." : "Mark as Completed"} <ChevronRight className="ml-2 h-5 w-5" /></>
                  )}
                </Button>
              </div>

              {/* Engagement Core: Tabs */}
              <div className="px-6 py-4 flex items-center gap-6 border-b border-white/5 bg-[#0A0D14] sticky top-0 z-20">
                 <button onClick={() => setActiveTab("overview")} className={`pb-4 border-b-2 font-bold text-sm transition-colors ${activeTab === "overview" ? "border-primary text-white" : "border-transparent text-gray-500 hover:text-gray-300"}`}>Overview</button>
                 <button onClick={() => setActiveTab("resources")} className={`flex items-center gap-2 pb-4 border-b-2 font-bold text-sm transition-colors ${activeTab === "resources" ? "border-primary text-white" : "border-transparent text-gray-500 hover:text-gray-300"}`}>
                   Resources <span className="bg-white/10 px-2 py-0.5 rounded text-[10px]">{!activeVideo.resources || activeVideo.resources === "[]" ? 0 : JSON.parse(activeVideo.resources).length}</span>
                 </button>
                 <button onClick={() => setActiveTab("qa")} className={`pb-4 border-b-2 font-bold text-sm transition-colors ${activeTab === "qa" ? "border-primary text-white" : "border-transparent text-gray-500 hover:text-gray-300"}`}>Q&A Discussions</button>
              </div>

              {/* Tab Content Display */}
              <div className="p-6">
                 {activeTab === "overview" && (
                    <div className="max-w-4xl bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                       <h3 className="text-lg font-bold text-white mb-3">About this module</h3>
                       <p className="text-gray-400 leading-relaxed text-sm">Please ensure you complete watching the video tutorial before marking the assignment as complete. This curriculum is designed systematically—skipping modules might impact your holistic understanding.</p>
                    </div>
                 )}
                 
                 {activeTab === "resources" && (
                    <div className="max-w-4xl space-y-4">
                       <h3 className="text-lg font-bold text-white mb-4">Attached Assets</h3>
                       {(!activeVideo.resources || activeVideo.resources === "[]" || JSON.parse(activeVideo.resources).length === 0) ? (
                          <div className="p-10 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
                             <File className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                             <p className="text-gray-400 text-sm font-medium">No downloadable resources attached.</p>
                          </div>
                       ) : (
                          <div className="grid md:grid-cols-2 gap-4">
                            {JSON.parse(activeVideo.resources).map((res, i) => (
                               <a key={i} href={res.url || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white/[0.03] hover:bg-white/5 border border-white/5 hover:border-primary/30 rounded-xl transition-all group">
                                  <div className="flex items-center gap-4">
                                     <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:scale-110 transition-transform"><FileText className="w-5 h-5"/></div>
                                     <div>
                                        <p className="font-bold text-white text-sm mb-0.5 line-clamp-1">{res.title}</p>
                                        <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">{res.type}</p>
                                     </div>
                                  </div>
                                  {res.url && <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors" />}
                               </a>
                            ))}
                          </div>
                       )}
                    </div>
                 )}

                 {activeTab === "qa" && (
                    <div className="max-w-4xl">
                       <h3 className="text-lg font-bold text-white mb-6">Module Discussion</h3>
                       <VideoComments videoId={activeVideo.id} />
                    </div>
                 )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                <PlayCircle className="h-8 w-8 text-gray-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-300">No Video Selected</h2>
              <p className="text-sm text-gray-500 mt-2">Select a video from the syllabus to start learning.</p>
            </div>
          )}
        </div>

        {/* Syllabus Sidebar */}
        <div className="w-full md:w-80 lg:w-[400px] border-l border-white/10 bg-[#0A0D14] flex flex-col min-h-0 shrink-0 h-[40vh] md:h-auto overflow-y-auto custom-scrollbar">
          <div className="p-5 border-b border-white/5 sticky top-0 bg-[#0A0D14]/90 backdrop-blur-md z-10">
            <h3 className="text-sm font-bold text-white tracking-wide">Course Syllabus</h3>
          </div>
          <div className="p-3">
            {modules.map((mod, idx) => (
              <div key={mod.id} className="mb-2 bg-white/5 border border-white/5 rounded-xl overflow-hidden">
                <button 
                  onClick={() => toggleModule(mod.id)} 
                  className="w-full p-4 flex items-center justify-between bg-white/[0.02] hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3 text-left">
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">M{idx + 1}</span>
                    <h4 className="text-xs font-bold text-gray-200 line-clamp-1">{mod.title}</h4>
                  </div>
                  {expandedModules[mod.id] ? <ChevronDown className="h-4 w-4 text-gray-500" /> : <ChevronRight className="h-4 w-4 text-gray-500" />}
                </button>
                
                {expandedModules[mod.id] && (
                  <div className="p-2 space-y-1">
                    {(!mod.videos || mod.videos.length === 0) ? (
                      <p className="text-[10px] text-gray-600 px-3 py-2 italic">No lessons available yet.</p>
                    ) : (
                      mod.videos.map((vid, vIdx) => {
                        const isCompleted = completedIds.has(vid.id);
                        const isActive = activeVideo?.id === vid.id;
                        return (
                          <button
                            key={vid.id}
                            onClick={() => setActiveVideo(vid)}
                            className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all ${
                              isActive ? "bg-primary/10 border border-primary/20 shadow-[0_0_15px_rgba(79,70,229,0.1)]" : "hover:bg-white/5 border border-transparent"
                            }`}
                          >
                            <div className="mt-0.5">
                              {isCompleted ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500 z-10 relative bg-black rounded-full" />
                              ) : (
                                <Circle className={`h-4 w-4 ${isActive ? "text-primary" : "text-gray-600"}`} />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className={`text-xs font-semibold line-clamp-2 ${isActive ? "text-primary hover:text-primary" : "text-gray-300"}`}>
                                {vIdx + 1}. {vid.title}
                              </p>
                              {vid.duration && (
                                <p className="text-[10px] text-gray-500 mt-1">{vid.duration}</p>
                              )}
                            </div>
                          </button>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            ))}
            {modules.length === 0 && (
              <div className="p-8 text-center bg-white/5 rounded-xl border border-white/5 mt-4">
                <Lock className="h-6 w-6 text-gray-600 mx-auto mb-3" />
                <p className="text-xs text-gray-500">The syllabus hasn't been uploaded yet by the organizer.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
