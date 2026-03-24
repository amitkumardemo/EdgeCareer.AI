"use client";

import { useState } from "react";
import { issueCertificate } from "@/actions/certificate";
import { toast } from "sonner";
import { Award, FileText, RefreshCw } from "lucide-react";

export default function IssueCertificateButton({ applicationId, certificatePdfUrl }) {
  const [loading, setLoading] = useState(false);

  async function handleIssue() {
    setLoading(true);
    try {
      const result = await issueCertificate(applicationId);
      toast.success(result.message || "Certificate issued and emailed successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to issue certificate");
    } finally {
      setLoading(false);
    }
  }

  if (certificatePdfUrl) {
    return (
      <div className="flex items-center gap-2">
        <a 
          href={certificatePdfUrl} 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-1 text-[10px] px-3 py-1.5 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-all shadow-sm"
        >
          <FileText className="h-3 w-3" /> View Certificate
        </a>
        <button
          onClick={handleIssue}
          disabled={loading}
          className="flex items-center gap-1 text-[10px] px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 font-medium hover:bg-white/10 hover:text-white transition-all shadow-sm disabled:opacity-50"
          title="Regenerate Certificate"
        >
          <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
          {loading ? "..." : "Regenerate"}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleIssue}
      disabled={loading}
      className="flex items-center gap-1 text-[10px] px-3 py-1.5 rounded-lg bg-black text-white font-medium hover:bg-black/80 transition-all shadow-sm disabled:opacity-50"
    >
      <Award className="h-3 w-3" />
      {loading ? "Generating PDF..." : "Issue Certificate"}
    </button>
  );
}
