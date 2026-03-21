"use client";

import React, { useState } from "react";
import { 
  Target, 
  Sparkles, 
  AlertCircle, 
  Loader2, 
  CheckCircle, 
  Copy
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CareerBrandingModal({ open, onOpenChange, onCopy, copied }) {
  const [resumeText, setResumeText] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!resumeText || !targetRole) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/career-branding-fixer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, targetRole }),
      });
      const data = await response.json();
      if (response.ok) setResults(data);
      else setError(data.error || "Failed to analyze branding");
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-pink-900/40 to-black border-pink-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Target className="w-6 h-6 text-pink-400" />
            Career Branding Fixer
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Fix your career branding mismatches.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Resume Content *</Label>
             <textarea placeholder="Paste resume content..." value={resumeText} onChange={(e) => setResumeText(e.target.value)} className="w-full h-32 bg-black/50 border border-pink-500/30 rounded-md p-3 text-white" />
          </div>
          <div className="space-y-2">
            <Label>Target Role *</Label>
            <Input placeholder="e.g., Product Manager" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} className="bg-black/50 border-pink-500/30 text-white" />
          </div>

          <Button onClick={handleAnalyze} disabled={loading} className="w-full bg-gradient-to-r from-pink-600 to-pink-700">
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
            Analyze Branding
          </Button>

          {results && (
            <div className="space-y-4 mt-6">
              <div className="bg-black/30 p-4 rounded-lg">
                <h4 className="font-semibold text-pink-300">Mismatch Found</h4>
                <p className="text-sm text-gray-300 mt-1">{results.brandingMismatch}</p>
              </div>
              <div className="bg-black/30 p-4 rounded-lg">
                 <h4 className="font-semibold text-pink-300">Optimized Summary</h4>
                 <p className="text-sm text-gray-300 mt-1">{results.optimizedSummary}</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
