"use client";

import { useState } from "react";
import { issueExistingEvaluation } from "@/actions/internship-evaluation";
import { toast } from "sonner";
import { Send, CheckCircle2, RefreshCw, Eye } from "lucide-react";

export default function IssueEvaluationButton({ evaluationId, applicationId, isPublished }) {
  const [loading, setLoading] = useState(false);
  const [published, setPublished] = useState(!!isPublished);

  const handleIssue = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await issueExistingEvaluation(evaluationId);
      if (res.success) {
        toast.success("Evaluation issued and emailed to student!");
        setPublished(true);
      }
    } catch (error) {
      toast.error(error.message || "Failed to issue evaluation");
    } finally {
      setLoading(false);
    }
  };

  if (published) {
    return (
      <div className="flex gap-2 relative z-30">
        <a 
          href={`/internship/student/evaluation?applicationId=${applicationId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="h-10 px-4 rounded-xl bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500/20 transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-wide cursor-pointer flex items-center justify-center no-underline"
        >
          <Eye className="w-4 h-4" /> View
        </a>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleIssue();
          }}
          disabled={loading}
          className="h-10 px-4 rounded-xl bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-wide disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <CheckCircle2 className="w-4 h-4" />
          )}
          {loading ? "Sending..." : "Re-issue"}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={(e) => {
        console.log("Issue button clicked for:", evaluationId);
        e.preventDefault();
        e.stopPropagation();
        handleIssue();
      }}
      disabled={loading}
      type="button"
      className="h-10 px-4 rounded-xl bg-primary text-black hover:bg-primary/90 transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-wide disabled:opacity-50 cursor-pointer relative z-30 pointer-events-auto border-none outline-none shadow-lg active:scale-95"
    >
      {loading ? (
        <RefreshCw className="w-4 h-4 animate-spin" />
      ) : (
        <Send className="w-4 h-4" />
      )}
      {loading ? "Issuing..." : "Finalize & Issue"}
    </button>
  );
}
