"use client";

import { useState, useEffect } from "react";
import { getVideoComments, postVideoComment } from "@/actions/internship-comments";
import { User, Send, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function VideoComments({ videoId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const data = await getVideoComments(videoId);
      setComments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || submitting) return;
    setSubmitting(true);
    try {
      const added = await postVideoComment(videoId, newComment);
      setComments([added, ...comments]);
      setNewComment("");
      toast.success("Comment posted");
    } catch (error) {
      toast.error("Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500 animate-pulse">Loading discussions...</div>;

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="flex-1">
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Ask a doubt or share an insight..."
            className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
        <Button disabled={submitting || !newComment.trim()} type="submit" className="h-auto shrink-0 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 shadow-sm px-6 rounded-xl">
          <Send className="w-4 h-4 mr-2" /> Post
        </Button>
      </form>

      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
            <MessageSquare className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-slate-900 font-bold">No Discussion Yet</h3>
            <p className="text-sm text-slate-500">Be the first to ask a question or start the discussion.</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 p-4 bg-white border border-slate-200 shadow-sm rounded-2xl">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                {comment.user.imageUrl ? (
                  <img src={comment.user.imageUrl} className="w-full h-full object-cover" alt={comment.user.name} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-100">
                    <User className="w-5 h-5 text-slate-400" />
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-sm text-slate-900">{comment.user.name || "Student"}</span>
                  {comment.user.role === "ADMIN" && (
                    <span className="text-[10px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded font-bold uppercase">Mentor</span>
                  )}
                  <span className="text-[10px] text-slate-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{comment.text}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
