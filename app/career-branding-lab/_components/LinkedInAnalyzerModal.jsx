"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Briefcase, 
  Users, 
  AlertCircle, 
  Loader2, 
  CheckCircle2, 
  AlertOctagon, 
  Eye, 
  Target, 
  BarChart3, 
  AlertTriangle, 
  Shield, 
  XCircle,
  Database,
  MapPin,
  Image,
  GraduationCap
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { getScoreColor, getScoreLabel, getImpactColor } from "./LabUtils";
import { ProfileRadarChart, SectionBarChart } from "./ResultVisuals";

export default function LinkedInAnalyzerModal({ open, onOpenChange }) {
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!linkedinUrl) {
      setError("Please enter your LinkedIn profile URL");
      return;
    }

    setLoading(true);
    setError("");
    setResults(null);

    try {
      const response = await fetch("/api/linkedin-profile-analyzer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ linkedinUrl }),
      });

      const data = await response.json();
      if (response.ok) {
        setResults(data);
      } else {
        setError(data.error || "Failed to analyze profile");
      }
    } catch (err) {
      setError("An error occurred while analyzing your profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[85vh] overflow-y-auto bg-gradient-to-br from-cyan-900/40 to-black border-cyan-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold flex items-center gap-3">
            <Search className="w-8 h-8 text-cyan-400" />
            LinkedIn Profile Analyzer (URL)
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-base">
            Get comprehensive analysis of your LinkedIn profile URL.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label className="text-gray-300 text-base">LinkedIn Profile URL *</Label>
            <Input
              placeholder="https://linkedin.com/in/yourprofile"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              className="bg-black/50 border-cyan-500/30 text-white h-12 text-base"
            />
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-md p-4"
            >
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </motion.div>
          )}

          <Button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 h-12 text-base font-semibold"
          >
            {loading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Search className="w-5 h-5 mr-2" />}
            {loading ? "Analyzing..." : "Analyze Profile"}
          </Button>

          {results && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {/* Results display logic same as before, using ProfileRadarChart and SectionBarChart */}
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6">
                 <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-cyan-400" />
                    Overall Profile Score
                  </h3>
                  <div className="text-right">
                    <div className={`text-5xl font-bold ${getScoreColor(results.score)}`}>
                      {results.score}<span className="text-2xl text-gray-400">/100</span>
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <ProfileRadarChart data={results.radarChart} />
                  <SectionBarChart data={results.sectionScores} />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
