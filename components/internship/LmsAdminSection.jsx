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
    if (!videoTitle || !videoUrl) return toast.error("Title and URL required");
    try {
      const order = modules.find(m => m.id === moduleId)?.videos?.length || 0;
      await addVideo(moduleId, { title: videoTitle, videoUrl, order });
      toast.success("Video added");
      setActiveModuleId(null);
      setVideoTitle("");
      setVideoUrl("");
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

  if (loading) return <div className="p-5 text-center text-gray-500 text-sm animate-pulse">Loading LMS modules...</div>;

  return (
    <div className="bg-white/3 border border-white/8 rounded-xl overflow-hidden mt-6">
      <div className="p-5 flex items-center justify-between border-b border-white/8">
        <div className="flex items-center gap-3">
          <Library className="h-5 w-5 text-primary" />
          <h2 className="text-sm font-bold text-white">LMS Course Content</h2>
        </div>
        <Button size="sm" onClick={() => setShowModuleForm(true)} className="h-8 text-xs bg-primary/20 text-primary hover:bg-primary/30 border-0">
          <Plus className="h-3 w-3 mr-1" /> Add Module
        </Button>
      </div>

      <div className="p-5 space-y-4">
        {showModuleForm && (
          <form onSubmit={handleCreateModule} className="bg-black/20 p-4 rounded-lg border border-white/5 space-y-3 mb-4">
            <h3 className="text-xs font-semibold text-white">New Module</h3>
            <div>
              <input value={moduleTitle} onChange={e => setModuleTitle(e.target.value)} placeholder="e.g. Week 1: Introduction" className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-primary/50" />
            </div>
            <div>
              <input value={moduleDesc} onChange={e => setModuleDesc(e.target.value)} placeholder="Short description (optional)" className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-primary/50" />
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="ghost" size="sm" onClick={() => setShowModuleForm(false)} className="h-7 text-xs text-gray-400">Cancel</Button>
              <Button type="submit" size="sm" className="h-7 text-xs">Create Module</Button>
            </div>
          </form>
        )}

        {modules.length === 0 && !showModuleForm && (
          <div className="text-center py-8 text-sm text-gray-500">
            No course content added yet. Create a module to start.
          </div>
        )}

        <div className="space-y-4">
          {modules.map(mod => (
            <div key={mod.id} className="border border-white/8 rounded-lg overflow-hidden bg-black/10">
              <div className="p-3 bg-white/5 flex items-center justify-between group cursor-pointer" onClick={() => toggleExpand(mod.id)}>
                <div className="flex items-center gap-2">
                  {expanded[mod.id] ? <ChevronDown className="h-4 w-4 text-gray-400" /> : <ChevronRight className="h-4 w-4 text-gray-400" />}
                  <h3 className="text-sm font-semibold text-white">{mod.title}</h3>
                </div>
                <div className="flex items-center gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={(e) => { e.stopPropagation(); setActiveModuleId(mod.id); }} className="p-1.5 text-xs bg-primary/10 text-primary rounded hover:bg-primary/20 flex items-center gap-1">
                    <Plus className="h-3 w-3" /> Add Video
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); handleDeleteModule(mod.id); }} className="p-1.5 text-xs text-red-400 hover:bg-red-400/10 rounded">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {expanded[mod.id] && (
                <div className="p-3 space-y-2">
                  {mod.description && <p className="text-xs text-gray-500 mb-3 ml-6">{mod.description}</p>}
                  
                  {activeModuleId === mod.id && (
                    <form onSubmit={(e) => handleAddVideo(e, mod.id)} className="bg-white/3 border border-white/5 p-3 rounded-md ml-6 mb-3 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <input value={videoTitle} onChange={e => setVideoTitle(e.target.value)} placeholder="Video Title" className="bg-black/20 border border-white/10 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-primary/50" />
                        <input value={videoUrl} onChange={e => setVideoUrl(e.target.value)} placeholder="YouTube URL" className="bg-black/20 border border-white/10 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-primary/50" />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button type="button" variant="ghost" size="sm" onClick={() => setActiveModuleId(null)} className="h-6 text-[10px] text-gray-400">Cancel</Button>
                        <Button type="submit" size="sm" className="h-6 text-[10px]">Save Video</Button>
                      </div>
                    </form>
                  )}

                  <div className="space-y-1.5 ml-6">
                    {mod.videos?.map((vid, idx) => (
                      <div key={vid.id} className="flex items-center justify-between p-2 rounded bg-white/3 hover:bg-white/5 group border border-transparent hover:border-white/5">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-8 rounded bg-black flex-shrink-0 overflow-hidden mt-0.5">
                            {vid.thumbnail ? (
                              <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover" />
                            ) : (
                              <Video className="w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500" />
                            )}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Play className="w-3 h-3 text-white" />
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-200 font-medium line-clamp-1">{idx + 1}. {vid.title}</p>
                          </div>
                        </div>
                        <button onClick={() => handleDeleteVideo(vid.id)} className="p-1.5 opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition-all rounded hover:bg-red-400/10">
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    {(!mod.videos || mod.videos.length === 0) && activeModuleId !== mod.id && (
                      <p className="text-[10px] text-gray-600 py-1">No videos added to this module.</p>
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
