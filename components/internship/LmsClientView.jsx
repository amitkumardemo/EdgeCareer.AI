"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, PlayCircle, CheckCircle2, Circle, ChevronDown, ChevronRight, Lock } from "lucide-react";
import { markVideoComplete } from "@/actions/internship-lms";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function LmsClientView({ applicationId, batchName, modules, progressData }) {
  const [completedIds, setCompletedIds] = useState(new Set(progressData?.completedIds || []));
  const [activeVideo, setActiveVideo] = useState(null);
  const [expandedModules, setExpandedModules] = useState({});
  const [marking, setMarking] = useState(false);

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
        <div className="flex-1 flex flex-col min-h-0 relative">
          {activeVideo ? (
            <div className="flex-1 bg-black w-full h-full flex flex-col min-h-0 relative">
              <div className="flex-1 w-full bg-black relative max-h-[70vh] md:max-h-none h-full min-h-0">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.youtubeId || ""}?autoplay=0&rel=0`}
                  title={activeVideo.title}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="flex-none p-6 bg-[#0B0F19] border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shrink-0">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">{activeVideo.title}</h2>
                  <p className="text-xs text-gray-400 max-w-2xl line-clamp-2">In this lesson, you will learn the core concepts related to {activeVideo.title}. Make sure to complete the entire video before proceeding.</p>
                </div>
                <Button 
                  onClick={handleMarkComplete} 
                  disabled={marking || completedIds.has(activeVideo.id)}
                  className={`shrink-0 ${completedIds.has(activeVideo.id) ? "bg-green-500/20 text-green-500 hover:bg-green-500/30" : "bg-primary text-black hover:bg-primary/90"} px-8 py-6 rounded-xl font-bold`}
                >
                  {completedIds.has(activeVideo.id) ? (
                    <><CheckCircle2 className="mr-2 h-5 w-5" /> Completed</>
                  ) : (
                    <>{marking ? "Marking..." : "Mark as Completed"} <ChevronRight className="ml-2 h-5 w-5" /></>
                  )}
                </Button>
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
