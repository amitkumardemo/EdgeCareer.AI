"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Linkedin, 
  Sparkles, 
  AlertCircle, 
  Loader2, 
  CheckCircle, 
  Copy,
  Zap
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

export default function LinkedInEnhancerModal({ open, onOpenChange, onCopy, copied }) {
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!targetRole) {
      setError("Please enter your target role");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/linkedin-enhancer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ linkedinUrl, targetRole }),
      });

      const data = await response.json();
      if (response.ok) {
        setResults(data);
      } else {
        setError(data.error || "Failed to generate optimization");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-purple-900/40 to-black border-purple-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Linkedin className="w-6 h-6 text-blue-400" />
            LinkedIn Profile Enhancer
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Get AI-powered suggestions to optimize your LinkedIn profile.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label className="text-gray-300">Target Role *</Label>
            <Input
              placeholder="e.g., Software Engineer, Data Scientist"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="bg-black/50 border-purple-500/30 text-white"
            />
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
            {loading ? "Optimizing..." : "Optimize Profile"}
          </Button>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 flex items-center gap-2">
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          {results && (
            <div className="space-y-4 mt-6">
              <div className="bg-black/30 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-green-300 text-lg flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    ✨ Optimized Headline
                  </h4>
                  <Button size="sm" variant="outline" onClick={() => onCopy(results.headline)} className="border-green-500/30">
                    {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="text-white">{results.headline}</p>
              </div>

              <div className="bg-black/30 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-green-300 text-lg flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    📝 Enhanced About Section
                  </h4>
                  <Button size="sm" variant="outline" onClick={() => onCopy(results.about)} className="border-green-500/30">
                    {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="text-white whitespace-pre-wrap">{results.about}</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
