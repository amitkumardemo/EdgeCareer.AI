"use client";

import { useState } from "react";
import { markInternshipComplete } from "@/actions/internship-admin";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

export default function CertificateActions({ applicationId }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleMarkComplete() {
    setLoading(true);
    try {
      await markInternshipComplete(applicationId);
      toast.success("Marked as complete & certificate generated!");
      setDone(true);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  }

  if (done) return <span className="text-[10px] text-green-400 px-2 py-0.5 rounded-full bg-green-400/10 border border-green-400/20">Done</span>;

  return (
    <button
      onClick={handleMarkComplete}
      disabled={loading}
      className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all disabled:opacity-50"
    >
      <CheckCircle2 className="h-3 w-3" />
      {loading ? "..." : "Mark Complete"}
    </button>
  );
}
