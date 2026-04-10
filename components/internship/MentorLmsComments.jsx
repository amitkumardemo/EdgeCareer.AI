"use client";

import { useState, useEffect } from "react";
import { getBatchLmsComments, postVideoComment } from "@/actions/internship-comments";
import { User, MessageSquare, Send, Reply, Video } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function MentorLmsComments({ batchId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);

  useEffect(() => {
    fetchComments();
  }, [batchId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const data = await getBatchLmsComments(batchId);
      setComments(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (e, videoId) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    try {
      // For now we just post a comment back to the same video. 
      // Future iteration could use `parentId` for deep threading. Let's just drop a mentor reply inside the video.
      const added = await postVideoComment(videoId, replyText);
      setComments([ { ...added, video: { title: comments.find(c => c.videoId === videoId)?.video?.title } }, ...comments ]);
      setReplyText("");
      setReplyingTo(null);
      toast.success("Reply posted");
    } catch (error) {
      toast.error("Failed to post reply");
    }
  };

  if (loading) return <div className="animate-pulse text-gray-500 text-sm py-4">Fetching Q&A feed...</div>;

  return (
    <div className="bg-[#0c101a]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden mt-8 shadow-2xl">
      <div className="p-6 md:p-8 flex items-center gap-4 border-b border-white/5 bg-gradient-to-r from-purple-500/10 to-transparent">
        <div className="p-3 bg-purple-500/20 text-purple-400 rounded-2xl">
          <MessageSquare className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-xl font-black text-white tracking-tight">Student Q&A Dashboard</h2>
          <p className="text-xs text-gray-400 font-medium mt-1">Review and resolve doubts asked by students across all course modules.</p>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
        {comments.length === 0 ? (
          <div className="text-center py-10 bg-white/[0.02] border border-white/5 border-dashed rounded-2xl">
            <MessageSquare className="w-10 h-10 text-gray-600 mx-auto mb-3" />
            <h3 className="text-white font-bold mb-1">No Questions Yet</h3>
            <p className="text-sm text-gray-500">When students ask doubts on videos, they will appear here.</p>
          </div>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-black border border-white/10 overflow-hidden shrink-0">
                     {comment.user.imageUrl ? (
                        <img src={comment.user.imageUrl} className="w-full h-full object-cover" alt="Student" />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-800"><User className="w-5 h-5 text-gray-400"/></div>
                     )}
                  </div>
                  <div>
                    <div className="flex gap-2 items-center">
                      <span className="font-bold text-white text-sm">{comment.user.name || "Student"}</span>
                      {comment.user.role === "ADMIN" ? (
                         <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded font-bold uppercase">Mentor</span>
                      ) : (
                         <span className="text-[10px] bg-white/10 text-gray-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider">Student</span>
                      )}
                      <span className="text-[10px] text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Video className="w-3 h-3 text-purple-400" />
                      <p className="text-xs text-purple-400 font-semibold">{comment.video?.title}</p>
                    </div>
                  </div>
                </div>
                <button onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)} className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                  <Reply className="w-4 h-4" />
                </button>
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed mt-2 p-3 bg-black/20 rounded-xl border border-white/5">{comment.text}</p>
              
              {replyingTo === comment.id && (
                <form onSubmit={(e) => handleReply(e, comment.videoId)} className="mt-4 flex gap-2 pt-4 border-t border-white/5">
                  <input 
                    autoFocus
                    value={replyText} 
                    onChange={e => setReplyText(e.target.value)} 
                    placeholder={`Reply to ${comment.user.name}...`} 
                    className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/50" 
                  />
                  <Button type="submit" disabled={!replyText.trim()} className="bg-purple-600 hover:bg-purple-500 text-white rounded-xl px-6">
                    <Send className="w-4 h-4 mr-2" /> Reply
                  </Button>
                </form>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
