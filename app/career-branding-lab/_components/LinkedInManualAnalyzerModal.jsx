"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Briefcase, 
  Users, 
  MessageSquare, 
  Award, 
  AlertCircle, 
  Loader2, 
  CheckCircle2, 
  AlertOctagon, 
  Eye, 
  Target, 
  BarChart3, 
  AlertTriangle, 
  Clock, 
  Shield, 
  Zap, 
  XCircle,
  Copy,
  CheckCircle,
  Lightbulb,
  TrendingUp,
  Rocket,
  Sparkles
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

export default function LinkedInManualAnalyzerModal({ open, onOpenChange, onCopy, copied }) {
  const [headline, setHeadline] = useState("");
  const [about, setAbout] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [followers, setFollowers] = useState("");
  const [activity, setActivity] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!headline && !about && !experience && !skills && !followers && !activity) {
      setError("Please provide at least one section of your LinkedIn profile");
      return;
    }

    setLoading(true);
    setError("");
    setResults(null);

    try {
      const response = await fetch("/api/linkedin-manual-analyzer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ headline, about, experience, skills, followers, activity }),
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
      <DialogContent className="max-w-6xl max-h-[85vh] overflow-y-auto bg-gradient-to-br from-indigo-900/40 to-black border-indigo-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold flex items-center gap-3">
            <FileText className="w-8 h-8 text-indigo-400" />
            LinkedIn Profile Intelligence (Manual Input)
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-base">
            Paste your LinkedIn profile sections below for AI-powered analysis. We only analyze what you share.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-gray-300 text-base flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Headline
              </Label>
              <Input
                placeholder="e.g., Full Stack Developer | React & Node.js Expert"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="bg-black/50 border-indigo-500/30 text-white h-12 text-base"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300 text-base flex items-center gap-2">
                <Users className="w-4 h-4" />
                Followers (Optional)
              </Label>
              <Input
                placeholder="e.g., 5000+"
                value={followers}
                onChange={(e) => setFollowers(e.target.value)}
                className="bg-black/50 border-indigo-500/30 text-white h-12 text-base"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300 text-base flex items-center gap-2">
              <FileText className="w-4 h-4" />
              About Section
            </Label>
            <textarea
              placeholder="Paste your LinkedIn About section here..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full h-32 bg-black/50 border border-indigo-500/30 rounded-md p-3 text-white resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300 text-base flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Experience
            </Label>
            <textarea
              placeholder="Paste your experience entries..."
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full h-32 bg-black/50 border border-indigo-500/30 rounded-md p-3 text-white resize-none"
            />
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 h-12 text-base font-semibold"
          >
            {loading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Sparkles className="w-5 h-5 mr-2" />}
            {loading ? "Analyzing Profile..." : "Analyze Profile"}
          </Button>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 flex items-center gap-2">
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          {results && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
               {/* Complexity here matched from page.jsx */}
              <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-indigo-400" />
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

              {/* Mistakes Section */}
              {results.mistakes && results.mistakes.length > 0 && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-red-400 flex items-center gap-2 mb-4">
                    <AlertTriangle size={24} />
                    Identified Mistakes
                  </h3>
                  <div className="space-y-3">
                    {results.mistakes.map((m, i) => (
                      <div key={i} className="bg-black/30 p-4 rounded-lg">
                        <p className="font-semibold text-white">{m.issue}</p>
                        <p className="text-sm text-gray-400 mt-1">{m.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Roadmap Section */}
              {results.roadmap && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-green-400 flex items-center gap-2 mb-4">
                    <Rocket size={24} />
                    Action Roadmap
                  </h3>
                  <div className="space-y-4">
                    {results.roadmap.immediate && (
                      <div>
                        <h4 className="text-sm font-bold text-red-400 uppercase mb-2">Immediate Actions</h4>
                        {results.roadmap.immediate.map((item, i) => (
                          <div key={i} className="bg-black/30 p-3 rounded mb-2">
                            <p className="text-white">{item.action}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
