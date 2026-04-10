"use client";

import { useState, useEffect } from "react";
import { Plus, Video, Trash2, Library, ChevronDown, ChevronRight, Play } from "lucide-react";
import { createModule, getModules, deleteModule, addVideo, deleteVideo } from "@/actions/internship-lms";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function LmsAdminSection({ batchId }) {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  // Module form
  const [showModuleForm, setShowModuleForm] = useState(false);
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleDesc, setModuleDesc] = useState("");

  // Video form
  const [activeModuleId, setActiveModuleId] = useState(null);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoResources, setVideoResources] = useState([]);
  
  // Expanded state
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    fetchModules();
  }, [batchId]);

  const fetchModules = async () => {
    try {
      setLoading(true);
      const data = await getModules(batchId);
      setModules(data);
      // expand all by default
      const exp = {};
      data.forEach(m => exp[m.id] = true);
      setExpanded(exp);
    } catch (error) {
      toast.error("Failed to load modules");
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id) => {
    setExpanded(p => ({ ...p, [id]: !p[id] }));
  };

  const handleCreateModule = async (e) => {
    e.preventDefault();
    if (!moduleTitle) return toast.error("Title is required");
    try {
      const newMod = await createModule(batchId, { title: moduleTitle, description: moduleDesc, order: modules.length });
      toast.success("Module created");
      setShowModuleForm(false);
      setModuleTitle("");
      setModuleDesc("");
      fetchModules();
    } catch (error) {
      toast.error(error.message || "Failed to create module");
    }
  };

  const handleDeleteModule = async (id) => {
    if (!confirm("Are you sure? This deletes all videos inside it as well.")) return;
    try {
      await deleteModule(id);
      toast.success("Module deleted");
      fetchModules();
    } catch (error) {
      toast.error("Failed to delete module");
    }
  };

  const handleAddVideo = async (e, moduleId) => {
    e.preventDefault();
    if (!videoUrl) return toast.error("YouTube URL required");
    try {
      const order = modules.find(m => m.id === moduleId)?.videos?.length || 0;
      await addVideo(moduleId, { 
        title: videoTitle, 
        videoUrl, 
        order,
        resources: JSON.stringify(videoResources)
      });
      toast.success("Video added");
      setActiveModuleId(null);
      setVideoTitle("");
      setVideoUrl("");
      setVideoResources([]);
      fetchModules();
    } catch (error) {
      toast.error("Failed to add video");
    }
  };

  const handleDeleteVideo = async (id) => {
    if (!confirm("Delete this video?")) return;
    try {
      await deleteVideo(id);
      toast.success("Video deleted");
      fetchModules();
    } catch (error) {
      toast.error("Failed to delete video");
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-500 animate-pulse">Loading LMS modules...</div>;

  return (
    <div className="bg-[#0c101a]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden mt-8 shadow-2xl">
      <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 bg-gradient-to-r from-blue-500/10 to-transparent gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-500/20 text-blue-400 rounded-2xl">
             <Library className="h-6 w-6" />
          </div>
          <div>
             <h2 className="text-xl font-black text-white tracking-tight">LMS Course Content</h2>
             <p className="text-xs text-gray-400 font-medium mt-1">Design your curriculum by adding modules and video lessons.</p>
          </div>
        </div>
        <Button onClick={() => setShowModuleForm(true)} className="h-10 px-6 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all">
          <Plus className="h-4 w-4 mr-2" /> Add Module
        </Button>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {showModuleForm && (
          <form onSubmit={handleCreateModule} className="bg-white/[0.02] p-6 rounded-2xl border border-white/10 space-y-4 mb-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] pointer-events-none" />
            <h3 className="text-sm font-black text-white uppercase tracking-wider">New Module</h3>
            <div className="space-y-4 relative z-10">
              <div>
                 <label className="text-[10px] text-gray-400 font-bold uppercase mb-1 block">Module Title</label>
                 <input value={moduleTitle} onChange={e => setModuleTitle(e.target.value)} placeholder="e.g. Master UI/UX Design Fundamentals" className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors" />
              </div>
              <div>
                 <label className="text-[10px] text-gray-400 font-bold uppercase mb-1 block">Short Description</label>
                 <input value={moduleDesc} onChange={e => setModuleDesc(e.target.value)} placeholder="What will students learn in this module?" className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors" />
              </div>
            </div>
            <div className="flex gap-3 justify-end pt-2 relative z-10">
              <Button type="button" variant="ghost" onClick={() => setShowModuleForm(false)} className="h-9 px-4 text-xs text-gray-400 hover:text-white">Cancel</Button>
              <Button type="submit" className="h-9 px-6 text-xs bg-white text-black hover:bg-gray-200 rounded-lg font-bold">Create Module</Button>
            </div>
          </form>
        )}

        {modules.length === 0 && !showModuleForm && (
          <div className="text-center py-16 bg-white/[0.02] rounded-3xl border border-white/5 border-dashed">
            <Library className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-1">Empty Curriculum</h3>
            <p className="text-sm text-gray-500">You haven't structured any course modules yet.</p>
          </div>
        )}

        <div className="space-y-5">
          {modules.map((mod, idx) => (
            <div key={mod.id} className="border border-white/10 rounded-2xl overflow-hidden bg-black/20 shadow-lg">
              <div className="p-4 md:p-5 bg-white/[0.04] hover:bg-white/[0.06] flex items-center justify-between group cursor-pointer transition-colors" onClick={() => toggleExpand(mod.id)}>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-black/50 border border-white/5 flex items-center justify-center">
                     {expanded[mod.id] ? <ChevronDown className="h-4 w-4 text-blue-400" /> : <ChevronRight className="h-4 w-4 text-gray-400" />}
                  </div>
                  <div>
                     <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-0.5">Module {idx + 1}</p>
                     <h3 className="text-base font-black text-white">{mod.title}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-3 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={(e) => { e.stopPropagation(); setActiveModuleId(mod.id); }} className="px-3 py-1.5 text-xs font-bold bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors rounded-lg flex items-center gap-1.5">
                    <Plus className="h-3 w-3" /> Add Lesson
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); handleDeleteModule(mod.id); }} className="p-2 text-red-500/70 hover:bg-red-500/20 hover:text-red-400 transition-colors rounded-lg">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {expanded[mod.id] && (
                <div className="p-5 md:p-6 space-y-4 border-t border-white/5">
                  {mod.description && <p className="text-sm text-gray-400 mb-4 bg-white/[0.02] p-4 rounded-xl border border-white/5">{mod.description}</p>}
                  
                  {activeModuleId === mod.id && (
                    <form onSubmit={(e) => handleAddVideo(e, mod.id)} className="bg-blue-900/10 border border-blue-500/20 p-5 rounded-xl space-y-4 shadow-inner mb-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[40px] pointer-events-none" />
                      <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest">New Video Lesson</h4>
                      <div className="grid md:grid-cols-2 gap-4 relative z-10">
                        <div>
                           <label className="text-[10px] text-gray-400 font-bold uppercase mb-1 block">Video Title <span className="text-gray-600">(Leave blank to Auto-fetch)</span></label>
                           <input value={videoTitle} onChange={e => setVideoTitle(e.target.value)} placeholder="e.g. Introduction to Figma" className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50" />
                        </div>
                        <div>
                           <label className="text-[10px] text-gray-400 font-bold uppercase mb-1 block">YouTube URL</label>
                           <input value={videoUrl} onChange={e => setVideoUrl(e.target.value)} placeholder="https://youtube.com/..." className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50" />
                        </div>
                      </div>
                      
                      {/* Resources Builder */}
                      <div className="bg-black/40 border border-white/5 p-4 rounded-xl relative z-10">
                        <div className="flex items-center justify-between mb-3">
                           <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Attached Assets</span>
                           <button type="button" onClick={() => setVideoResources([...videoResources, { title: "", type: "PDF", url: "" }])} className="text-[10px] text-blue-400 hover:text-blue-300 font-bold bg-blue-500/20 px-2 py-1 rounded-md flex items-center gap-1">+ Add Asset</button>
                        </div>
                        {videoResources.length > 0 ? (
                           <div className="space-y-3">
                             {videoResources.map((res, i) => (
                               <div key={i} className="flex flex-wrap md:flex-nowrap gap-3 items-center">
                                 <select value={res.type} onChange={(e) => { const n = [...videoResources]; n[i].type = e.target.value; setVideoResources(n); }} className="bg-black/60 border border-white/10 text-xs text-white rounded-md p-2 outline-none">
                                   <option>PDF</option>
                                   <option>Link</option>
                                   <option>Note</option>
                                 </select>
                                 <input value={res.title} onChange={(e) => { const n = [...videoResources]; n[i].title = e.target.value; setVideoResources(n); }} placeholder="Asset Title" className="flex-1 md:w-1/3 bg-black/60 border border-white/10 text-xs text-white rounded-md p-2 outline-none focus:border-blue-500/50" />
                                 <input value={res.url} onChange={(e) => { const n = [...videoResources]; n[i].url = e.target.value; setVideoResources(n); }} placeholder="URL (Optional for Notes)" className="flex-[2] bg-black/60 border border-white/10 text-xs text-white rounded-md p-2 outline-none focus:border-blue-500/50" />
                                 <button type="button" onClick={() => setVideoResources(videoResources.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-500 bg-red-400/10 p-2 rounded-md transition-colors"><Trash2 className="w-4 h-4" /></button>
                               </div>
                             ))}
                           </div>
                        ) : (
                           <p className="text-[10px] text-gray-500 italic">No assets attached to this lesson.</p>
                        )}
                      </div>

                      <div className="flex justify-end gap-3 mt-4 relative z-10">
                        <Button type="button" variant="ghost" onClick={() => { setActiveModuleId(null); setVideoResources([]); }} className="h-9 px-4 text-xs text-gray-400 hover:text-white">Cancel</Button>
                        <Button type="submit" className="h-9 px-6 text-xs bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold">Inject Video</Button>
                      </div>
                    </form>
                  )}

                  <div className="space-y-3">
                    {mod.videos?.map((vid, vIdx) => (
                      <div key={vid.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] group border border-white/5 hover:border-blue-500/30 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="relative w-24 md:w-32 aspect-video rounded-lg bg-black flex-shrink-0 overflow-hidden border border-white/10">
                            {vid.thumbnail ? (
                              <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                            ) : (
                              <Video className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-600" />
                            )}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Play className="w-6 h-6 text-white" />
                            </div>
                            <div className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 rounded text-[8px] font-bold text-white tracking-wider">
                              {vid.duration || '0:00'}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white mb-1 leading-tight group-hover:text-blue-400 transition-colors line-clamp-2">
                               <span className="text-blue-500/50 mr-1">{vIdx + 1}.</span> {vid.title}
                            </p>
                            <div className="flex gap-2">
                               {vid.resources && vid.resources !== "[]" && JSON.parse(vid.resources).length > 0 && (
                                  <span className="text-[9px] bg-white/10 text-gray-300 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                                    <Library className="w-3 h-3" /> {JSON.parse(vid.resources).length} Assets
                                  </span>
                               )}
                            </div>
                          </div>
                        </div>
                        <button onClick={() => handleDeleteVideo(vid.id)} className="p-2 mt-3 md:mt-0 opacity-100 md:opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition-all rounded-lg hover:bg-red-400/10">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {(!mod.videos || mod.videos.length === 0) && activeModuleId !== mod.id && (
                      <p className="text-[11px] text-gray-500 p-4 border border-white/5 border-dashed rounded-xl text-center">No video lessons uploaded to this module yet.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
