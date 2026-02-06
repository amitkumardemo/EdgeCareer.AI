"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Linkedin, 
  Github,
  FileText,
  Lightbulb,
  Copy,
  CheckCircle,
  AlertCircle,
  Loader2,
  ExternalLink,
  Rocket,
  Target,
  MessageSquare,
  BookOpen,
  Search,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Star,
  Clock,
  Database,
  Shield,
  Eye,
  Zap,
  Users,
  Award,
  Briefcase,
  GraduationCap,
  MapPin,
  Image,
  CheckCircle2,
  XCircle,
  AlertOctagon
} from "lucide-react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Feature cards data
const features = [
  {
    id: "linkedin-analyzer",
    title: "LinkedIn Profile Intelligence Agent (URL)",
    description: "Advanced AI analysis for REAL LinkedIn profiles with founder-level branding insights, profile classification, and executive-level recommendations",
    icon: Search,
    color: "from-cyan-500 to-blue-600",
    buttonText: "Analyze My Profile"
  },
  {
    id: "linkedin-manual-analyzer",
    title: "LinkedIn Profile Intelligence Agent (Manual)",
    description: "Paste your LinkedIn content directly for instant AI-powered analysis without sharing URLs. Trust-first, zero assumptions approach.",
    icon: FileText,
    color: "from-indigo-500 to-purple-600",
    buttonText: "Analyze Manual Input"
  },
  {
    id: "linkedin-enhancer",
    title: "LinkedIn Profile Enhancer",
    description: "Optimize your LinkedIn profile with AI-powered suggestions for headline, about section, and experience",
    icon: Linkedin,
    color: "from-blue-500 to-blue-700",
    buttonText: "Optimize My LinkedIn"
  },
  {
    id: "linkedin-post",
    title: "Daily LinkedIn Post Generator",
    description: "Generate engaging LinkedIn posts for your projects, learnings, and achievements",
    icon: MessageSquare,
    color: "from-purple-500 to-purple-700",
    buttonText: "Generate LinkedIn Post"
  },
  {
    id: "github-repo",
    title: "GitHub Repo README Generator",
    description: "Create professional README.md files for your repositories with proper documentation",
    icon: Github,
    color: "from-gray-600 to-gray-800",
    buttonText: "Generate README"
  },
  {
    id: "github-profile",
    title: "GitHub Profile README Generator",
    description: "Build an impressive GitHub profile README that showcases your skills and projects",
    icon: BookOpen,
    color: "from-green-500 to-green-700",
    buttonText: "Build GitHub Profile"
  },
  {
    id: "career-branding",
    title: "Career Branding Fixer",
    description: "Fix your career branding with AI-powered analysis and optimization suggestions",
    icon: Target,
    color: "from-pink-500 to-pink-700",
    buttonText: "Fix My Career Branding"
  },
  {
    id: "project-bullets",
    title: "Project → Resume Bullet Generator",
    description: "Convert your projects into ATS-friendly resume bullet points with quantifiable achievements",
    icon: Rocket,
    color: "from-orange-500 to-orange-700",
    buttonText: "Convert Project to Resume Points"
  }
];

export default function CareerBrandingLab() {
  const [activeModal, setActiveModal] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black text-white">
      {/* Hero Section */}
      <motion.section
        className="container mx-auto px-4 py-20"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/20 mb-6"
            variants={fadeIn}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">AI-Powered Career Branding Tools</span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
            variants={fadeIn}
          >
            Career Branding Lab
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8"
            variants={fadeIn}
          >
            Elevate your professional presence with AI-powered tools for LinkedIn, GitHub, and resume optimization
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature) => (
            <motion.div key={feature.id} variants={fadeIn}>
              <Card className="bg-gradient-to-br from-purple-900/20 to-black border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300 h-full flex flex-col">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button
                    onClick={() => setActiveModal(feature.id)}
                    className={`w-full bg-gradient-to-r ${feature.color} hover:opacity-90 text-white font-semibold`}
                  >
                    {feature.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Modals */}
      <LinkedInAnalyzerModal 
        open={activeModal === "linkedin-analyzer"} 
        onOpenChange={(open) => !open && setActiveModal(null)}
        onCopy={handleCopy}
        copied={copied}
      />
      <LinkedInManualAnalyzerModal 
        open={activeModal === "linkedin-manual-analyzer"} 
        onOpenChange={(open) => !open && setActiveModal(null)}
        onCopy={handleCopy}
        copied={copied}
      />
      <LinkedInEnhancerModal 
        open={activeModal === "linkedin-enhancer"} 
        onOpenChange={(open) => !open && setActiveModal(null)}
        onCopy={handleCopy}
        copied={copied}
      />
      <LinkedInPostModal 
        open={activeModal === "linkedin-post"} 
        onOpenChange={(open) => !open && setActiveModal(null)}
        onCopy={handleCopy}
        copied={copied}
      />
      <GitHubRepoModal 
        open={activeModal === "github-repo"} 
        onOpenChange={(open) => !open && setActiveModal(null)}
        onCopy={handleCopy}
        copied={copied}
      />
      <GitHubProfileModal 
        open={activeModal === "github-profile"} 
        onOpenChange={(open) => !open && setActiveModal(null)}
        onCopy={handleCopy}
        copied={copied}
      />
      <CareerBrandingModal 
        open={activeModal === "career-branding"} 
        onOpenChange={(open) => !open && setActiveModal(null)}
        onCopy={handleCopy}
        copied={copied}
      />
      <ProjectBulletsModal 
        open={activeModal === "project-bullets"} 
        onOpenChange={(open) => !open && setActiveModal(null)}
        onCopy={handleCopy}
        copied={copied}
      />
    </div>
  );
}

// LinkedIn Manual Profile Analyzer Modal
function LinkedInManualAnalyzerModal({ open, onOpenChange, onCopy, copied }) {
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
    // Check if at least one field is provided
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

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-400";
    if (score >= 80) return "text-blue-400";
    if (score >= 70) return "text-yellow-400";
    if (score >= 60) return "text-orange-400";
    return "text-red-400";
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return "Exceptional";
    if (score >= 80) return "Strong";
    if (score >= 70) return "Good";
    if (score >= 60) return "Average";
    return "Needs Improvement";
  };

  const getImpactColor = (impact) => {
    if (impact === "High") return "text-red-400 bg-red-500/10";
    if (impact === "Medium") return "text-yellow-400 bg-yellow-500/10";
    return "text-blue-400 bg-blue-500/10";
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
            Paste your LinkedIn profile sections below for AI-powered analysis. We only analyze what you share - no assumptions, no URL fetching.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Input Fields */}
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
                Followers / Connections (Optional)
              </Label>
              <Input
                placeholder="e.g., 5000+ followers, 2000 connections"
                value={followers}
                onChange={(e) => setFollowers(e.target.value)}
                className="bg-black/50 border-indigo-500/30 text-white h-12 text-base"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300 text-base flex items-center gap-2">
              <FileText className="w-4 h-4" />
              About / Summary Section
            </Label>
            <textarea
              placeholder="Paste your LinkedIn About section here..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full h-32 bg-black/50 border border-indigo-500/30 rounded-md p-3 text-white resize-none text-base"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300 text-base flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Experience Section
            </Label>
            <textarea
              placeholder="Paste your experience entries (job titles, companies, descriptions)..."
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full h-32 bg-black/50 border border-indigo-500/30 rounded-md p-3 text-white resize-none text-base"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-gray-300 text-base flex items-center gap-2">
                <Award className="w-4 h-4" />
                Skills
              </Label>
              <textarea
                placeholder="Paste your skills (comma-separated or list)..."
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full h-24 bg-black/50 border border-indigo-500/30 rounded-md p-3 text-white resize-none text-base"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300 text-base flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Recent Activity / Posts (Optional)
              </Label>
              <textarea
                placeholder="Paste examples of your recent LinkedIn posts or activity..."
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="w-full h-24 bg-black/50 border border-indigo-500/30 rounded-md p-3 text-white resize-none text-base"
              />
            </div>
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

          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
            <p className="text-sm text-indigo-300 flex items-start gap-2">
              <Shield className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>
                <strong>Privacy First:</strong> Your data is analyzed in real-time and never stored. We only work with what you paste - no URL fetching, no LinkedIn scraping, no assumptions.
              </span>
            </p>
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 h-12 text-base font-semibold"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Analyzing Your Profile...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Analyze Profile
              </>
            )}
          </Button>

          {results && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Input Status */}
              {results.inputMetadata && (
                <div className={`border rounded-xl p-4 ${
                  results.inputMetadata.completenessPercentage >= 70
                    ? "bg-green-500/10 border-green-500/30"
                    : "bg-yellow-500/10 border-yellow-500/30"
                }`}>
                  <div className="flex items-start gap-3">
                    {results.inputMetadata.completenessPercentage >= 70 ? (
                      <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertOctagon className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold text-base mb-1">
                        {results.inputMetadata.inputStatus}
                      </h4>
                      <p className="text-sm text-gray-300 mb-2">
                        {results.inputMetadata.completenessPercentage}% of sections provided
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {results.providedSections?.map((field, idx) => (
                          <Badge key={idx} variant="outline" className="bg-green-500/20 border-green-500/30 text-green-300">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            {field}
                          </Badge>
                        ))}
                        {results.missingSections?.map((field, idx) => (
                          <Badge key={idx} variant="outline" className="bg-gray-500/20 border-gray-500/30 text-gray-400">
                            <XCircle className="w-3 h-3 mr-1" />
                            {field}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Trust-First Display - "What You Shared" */}
              {results.userProvidedData && (
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6">
                  <h3 className="text-2xl font-bold flex items-center gap-2 mb-4">
                    <Eye className="w-6 h-6 text-blue-400" />
                    What You Shared From Your LinkedIn Profile
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    This is exactly what you pasted - unmodified. Review it before proceeding to analysis.
                  </p>

                  <Tabs defaultValue="headline" className="w-full">
                    <TabsList className="bg-black/30">
                      {results.userProvidedData.headline && <TabsTrigger value="headline">Headline</TabsTrigger>}
                      {results.userProvidedData.about && <TabsTrigger value="about">About</TabsTrigger>}
                      {results.userProvidedData.experience && <TabsTrigger value="experience">Experience</TabsTrigger>}
                      {results.userProvidedData.skills && <TabsTrigger value="skills">Skills</TabsTrigger>}
                      {results.userProvidedData.followers && <TabsTrigger value="followers">Followers</TabsTrigger>}
                      {results.userProvidedData.activity && <TabsTrigger value="activity">Activity</TabsTrigger>}
                    </TabsList>

                    {results.userProvidedData.headline && (
                      <TabsContent value="headline" className="mt-4">
                        <div className="bg-black/30 rounded-lg p-4">
                          <p className="text-white font-medium">{results.userProvidedData.headline}</p>
                        </div>
                      </TabsContent>
                    )}

                    {results.userProvidedData.about && (
                      <TabsContent value="about" className="mt-4">
                        <div className="bg-black/30 rounded-lg p-4">
                          <p className="text-white whitespace-pre-wrap">{results.userProvidedData.about}</p>
                        </div>
                      </TabsContent>
                    )}

                    {results.userProvidedData.experience && (
                      <TabsContent value="experience" className="mt-4">
                        <div className="bg-black/30 rounded-lg p-4">
                          <p className="text-white whitespace-pre-wrap">{results.userProvidedData.experience}</p>
                        </div>
                      </TabsContent>
                    )}

                    {results.userProvidedData.skills && (
                      <TabsContent value="skills" className="mt-4">
                        <div className="bg-black/30 rounded-lg p-4">
                          <p className="text-white whitespace-pre-wrap">{results.userProvidedData.skills}</p>
                        </div>
                      </TabsContent>
                    )}

                    {results.userProvidedData.followers && (
                      <TabsContent value="followers" className="mt-4">
                        <div className="bg-black/30 rounded-lg p-4">
                          <p className="text-white">{results.userProvidedData.followers}</p>
                        </div>
                      </TabsContent>
                    )}

                    {results.userProvidedData.activity && (
                      <TabsContent value="activity" className="mt-4">
                        <div className="bg-black/30 rounded-lg p-4">
                          <p className="text-white whitespace-pre-wrap">{results.userProvidedData.activity}</p>
                        </div>
                      </TabsContent>
                    )}
                  </Tabs>
                </div>
              )}

              {/* Profile Classification & Scoring - Same as URL version */}
              <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-xl p-6">
                {results.profileClassification && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold flex items-center gap-2 mb-3">
                      <Target className="w-5 h-5 text-indigo-400" />
                      Profile Classification
                    </h3>
                    <div className="bg-black/30 rounded-lg p-4 space-y-2">
                      <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full text-lg font-semibold text-purple-300">
                        {results.profileClassification}
                      </span>
                      {results.classificationReasoning && (
                        <p className="text-sm text-gray-400 mt-3 italic">
                          <strong className="text-indigo-300">Why:</strong> {results.classificationReasoning}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-indigo-400" />
                    Overall Profile Score
                  </h3>
                  <div className="text-right">
                    <div className={`text-5xl font-bold ${getScoreColor(results.score)}`}>
                      {results.score}
                      <span className="text-2xl text-gray-400">/100</span>
                    </div>
                    <p className={`text-sm font-semibold ${getScoreColor(results.score)}`}>
                      {getScoreLabel(results.score)}
                    </p>
                  </div>
                </div>

                {results.scoreBreakdown && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
                    {Object.entries(results.scoreBreakdown).map(([key, value]) => (
                      <div key={key} className="bg-black/30 rounded-lg p-3">
                        <p className="text-xs text-gray-400 capitalize mb-1">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-xl font-bold text-indigo-300">{value}<span className="text-sm text-gray-500">/20</span></p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-4 p-3 bg-black/20 rounded-lg">
                  <p className="text-gray-300 text-sm leading-relaxed">{results.summary}</p>
                </div>
              </div>

              {/* Rest of the components - Same as URL version (Mistakes, Charts, Improvements, etc.) */}
              {/* Copy the same sections from LinkedInAnalyzerModal for consistency */}
              
              {/* Mistakes & Issues */}
              {results.mistakes && results.mistakes.length > 0 && (
                <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-6">
                  <h3 className="text-2xl font-bold flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                    Issues Found in Provided Sections
                  </h3>
                  <div className="space-y-3">
                    {results.mistakes.map((mistake, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-black/30 rounded-lg p-4 space-y-2"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-white">{mistake.category}</h4>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getImpactColor(mistake.impact)}`}>
                                {mistake.impact} Impact
                              </span>
                            </div>
                            <p className="text-red-300 text-sm mb-2">{mistake.issue}</p>
                            <p className="text-gray-400 text-sm italic">💡 Why it matters: {mistake.explanation}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Visualizations - Charts */}
              {(results.radarChart || results.sectionScores) && (
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
                  <h3 className="text-2xl font-bold flex items-center gap-2 mb-6">
                    <BarChart3 className="w-6 h-6 text-purple-400" />
                    Performance Visualizations
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    {results.radarChart && (
                      <div className="bg-black/30 rounded-lg p-4">
                        <h4 className="font-semibold text-purple-300 mb-4 text-center">Profile Strength: Current → Optimized</h4>
                        <ResponsiveContainer width="100%" height={300}>
                          <RadarChart data={[
                            { subject: 'Authority', before: results.radarChart.before?.authority || 0, after: results.radarChart.after?.authority || 0 },
                            { subject: 'Brand Clarity', before: results.radarChart.before?.brandClarity || 0, after: results.radarChart.after?.brandClarity || 0 },
                            { subject: 'Credibility', before: results.radarChart.before?.credibility || 0, after: results.radarChart.after?.credibility || 0 },
                            { subject: 'SEO', before: results.radarChart.before?.seoVisibility || 0, after: results.radarChart.after?.seoVisibility || 0 },
                            { subject: 'Content', before: results.radarChart.before?.contentInfluence || 0, after: results.radarChart.after?.contentInfluence || 0 },
                          ]}>
                            <PolarGrid stroke="#444" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                            <PolarRadiusAxis domain={[0, 20]} tick={{ fill: '#6b7280', fontSize: 10 }} />
                            <Radar name="Current" dataKey="before" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                            <Radar name="Optimized" dataKey="after" stroke="#10b981" fill="#10b981" fillOpacity={0.5} />
                            <Legend wrapperStyle={{ fontSize: '12px' }} />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    )}

                    {results.sectionScores && (
                      <div className="bg-black/30 rounded-lg p-4">
                        <h4 className="font-semibold text-purple-300 mb-4 text-center">Section-wise Scores</h4>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={Object.entries(results.sectionScores).map(([key, value]) => ({
                            name: key.charAt(0).toUpperCase() + key.slice(1),
                            score: value,
                          }))}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                            <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 11 }} angle={-15} textAnchor="end" height={80} />
                            <YAxis domain={[0, 20]} tick={{ fill: '#6b7280', fontSize: 10 }} />
                            <RechartsTooltip 
                              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                              labelStyle={{ color: '#fff' }}
                            />
                            <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                              {Object.keys(results.sectionScores).map((_, index) => (
                                <Cell key={`cell-${index}`} fill={['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'][index % 5]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </div>

                  {/* SEO Keyword Coverage */}
                  {results.seoKeywordCoverage && (
                    <div className="mt-6 bg-black/30 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-300 mb-3">SEO Keyword Coverage</h4>
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex-1 bg-gray-700 rounded-full h-4 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                            style={{ width: `${results.seoKeywordCoverage.coveragePercentage || 0}%` }}
                          />
                        </div>
                        <span className="text-2xl font-bold text-purple-300">{results.seoKeywordCoverage.coveragePercentage || 0}%</span>
                      </div>
                    </div>
                  )}

                  {/* Profile Completeness */}
                  {results.profileCompleteness && (
                    <div className="mt-4 bg-black/30 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-300 mb-3">Profile Completeness</h4>
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex-1 bg-gray-700 rounded-full h-4 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500"
                            style={{ width: `${results.profileCompleteness.completenessPercentage || 0}%` }}
                          />
                        </div>
                        <span className="text-2xl font-bold text-cyan-300">{results.profileCompleteness.completenessPercentage || 0}%</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* AI-Suggested Improvements */}
              {results.improvements && (
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
                  <h3 className="text-2xl font-bold flex items-center gap-2 mb-4">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                    AI-Suggested Improvements
                  </h3>
                  
                  <div className="space-y-4">
                    {results.improvements.headline && (
                      <div className="bg-black/30 rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-green-300 text-lg flex items-center gap-2">
                            <Zap className="w-5 h-5" />
                            ✨ Optimized Headline
                          </h4>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onCopy(results.improvements.headline.optimized)}
                            className="border-green-500/30"
                          >
                            {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                        {results.improvements.headline.current && (
                          <div className="bg-red-500/10 border-l-4 border-red-500/50 p-3 rounded">
                            <p className="text-xs text-gray-500 mb-1">Current:</p>
                            <p className="text-white text-sm">{results.improvements.headline.current}</p>
                          </div>
                        )}
                        <div className="bg-green-500/10 border-l-4 border-green-500/50 p-3 rounded">
                          <p className="text-xs text-gray-500 mb-1">AI-Optimized:</p>
                          <p className="text-white font-medium">{results.improvements.headline.optimized}</p>
                        </div>
                        <p className="text-sm text-gray-400 italic">💡 {results.improvements.headline.reasoning}</p>
                      </div>
                    )}

                    {results.improvements.about && (
                      <div className="bg-black/30 rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-green-300 text-lg flex items-center gap-2">
                            <Zap className="w-5 h-5" />
                            📝 Enhanced About Section
                          </h4>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onCopy(results.improvements.about.optimized)}
                            className="border-green-500/30"
                          >
                            {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                        <div className="bg-green-500/10 border-l-4 border-green-500/50 p-3 rounded">
                          <p className="text-xs text-gray-500 mb-2">AI-Optimized:</p>
                          <p className="text-white whitespace-pre-wrap">{results.improvements.about.optimized}</p>
                        </div>
                        <p className="text-sm text-gray-400 italic">💡 {results.improvements.about.reasoning}</p>
                      </div>
                    )}

                    {results.improvements.experience && (
                      <div className="bg-black/30 rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-green-300 text-lg flex items-center gap-2">
                            <Zap className="w-5 h-5" />
                            💼 Experience Bullet Template
                          </h4>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onCopy(results.improvements.experience.template)}
                            className="border-green-500/30"
                          >
                            {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                        <div className="bg-green-500/10 border-l-4 border-green-500/50 p-3 rounded">
                          <p className="text-xs text-gray-500 mb-2">AI-Optimized:</p>
                          <p className="text-white whitespace-pre-wrap">{results.improvements.experience.template}</p>
                        </div>
                        {results.improvements.experience.tips && (
                          <div className="mt-2 space-y-1">
                            <p className="text-sm font-semibold text-green-400">Tips:</p>
                            {results.improvements.experience.tips.map((tip, i) => (
                              <p key={i} className="text-sm text-gray-400">• {tip}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {results.improvements.skills && (
                      <div className="bg-black/30 rounded-lg p-4 space-y-3">
                        <h4 className="font-semibold text-green-300 text-lg flex items-center gap-2">
                          <Zap className="w-5 h-5" />
                          🎯 Skills Optimization
                        </h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div>
                            <p className="text-sm font-semibold text-cyan-400 mb-2">Must-Have Skills:</p>
                            <div className="flex flex-wrap gap-2">
                              {results.improvements.skills.mustHave?.map((skill, i) => (
                                <span key={i} className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-sm">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-blue-400 mb-2">Recommended:</p>
                            <div className="flex flex-wrap gap-2">
                              {results.improvements.skills.recommended?.map((skill, i) => (
                                <span key={i} className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-sm">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 italic">{results.improvements.skills.reasoning}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Content Strategy */}
              {results.contentStrategy && (
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
                  <h3 className="text-2xl font-bold flex items-center gap-2 mb-4">
                    <MessageSquare className="w-6 h-6 text-purple-400" />
                    Content & Engagement Strategy
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-black/30 rounded-lg p-4">
                      <p className="text-sm font-semibold text-purple-400 mb-2">Posting Frequency:</p>
                      <p className="text-white">{results.contentStrategy.postingFrequency}</p>
                    </div>
                    <div className="bg-black/30 rounded-lg p-4">
                      <p className="text-sm font-semibold text-purple-400 mb-2">Content Types to Share:</p>
                      <ul className="space-y-1">
                        {results.contentStrategy.contentTypes?.map((type, i) => (
                          <li key={i} className="text-white flex items-start gap-2">
                            <span className="text-purple-400">•</span>
                            {type}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-black/30 rounded-lg p-4">
                      <p className="text-sm font-semibold text-purple-400 mb-2">Engagement Tips:</p>
                      <ul className="space-y-1">
                        {results.contentStrategy.engagementTips?.map((tip, i) => (
                          <li key={i} className="text-white flex items-start gap-2">
                            <span className="text-purple-400">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Roadmap */}
              {results.roadmap && (
                <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6">
                  <h3 className="text-2xl font-bold flex items-center gap-2 mb-4">
                    <Rocket className="w-6 h-6 text-yellow-400" />
                    Action Roadmap
                  </h3>
                  
                  <div className="space-y-4">
                    {results.roadmap.immediate && (
                      <div>
                        <h4 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
                          <Clock className="w-5 h-5" />
                          🔥 Do This Right Now
                        </h4>
                        <div className="space-y-2">
                          {results.roadmap.immediate.map((item, i) => (
                            <div key={i} className="bg-black/30 rounded-lg p-3 flex items-start gap-3">
                              <div className="flex-1">
                                <p className="text-white font-medium">{item.action}</p>
                                <div className="flex items-center gap-4 mt-1">
                                  <span className={`text-xs px-2 py-0.5 rounded ${getImpactColor(item.impact)}`}>
                                    {item.impact} Impact
                                  </span>
                                  <span className="text-xs text-gray-500">⏱️ {item.timeNeeded}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {results.roadmap.shortTerm && (
                      <div>
                        <h4 className="font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                          <Target className="w-5 h-5" />
                          📅 This Week
                        </h4>
                        <div className="space-y-2">
                          {results.roadmap.shortTerm.map((item, i) => (
                            <div key={i} className="bg-black/30 rounded-lg p-3 flex items-start gap-3">
                              <div className="flex-1">
                                <p className="text-white font-medium">{item.action}</p>
                                <div className="flex items-center gap-4 mt-1">
                                  <span className={`text-xs px-2 py-0.5 rounded ${getImpactColor(item.impact)}`}>
                                    {item.impact} Impact
                                  </span>
                                  <span className="text-xs text-gray-500">⏱️ {item.timeNeeded}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {results.roadmap.longTerm && (
                      <div>
                        <h4 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5" />
                          🎯 Build These Habits
                        </h4>
                        <div className="space-y-2">
                          {results.roadmap.longTerm.map((item, i) => (
                            <div key={i} className="bg-black/30 rounded-lg p-3 flex items-start gap-3">
                              <div className="flex-1">
                                <p className="text-white font-medium">{item.action}</p>
                                <div className="flex items-center gap-4 mt-1">
                                  <span className={`text-xs px-2 py-0.5 rounded ${getImpactColor(item.impact)}`}>
                                    {item.impact} Impact
                                  </span>
                                  <span className="text-xs text-gray-500">⏱️ {item.timeNeeded}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Analysis Notes */}
              {results.analysisNotes && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <p className="text-sm text-yellow-300 flex items-start gap-2">
                    <AlertOctagon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Analysis Scope:</strong> {results.analysisNotes}
                    </span>
                  </p>
                </div>
              )}

              {/* Final Note */}
              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
                <p className="text-sm text-indigo-300 flex items-start gap-2">
                  <Lightbulb className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>
                    💡 <strong>Pro Tip:</strong> All improvements are based strictly on the content you pasted. 
                    Use the copy buttons to quickly transfer optimized content to your LinkedIn profile. 
                    Focus on implementing the "Do This Right Now" actions first for immediate impact!
                  </span>
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// LinkedIn Profile Analyzer Modal
function LinkedInAnalyzerModal({ open, onOpenChange, onCopy, copied }) {
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

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-400";
    if (score >= 80) return "text-blue-400";
    if (score >= 70) return "text-yellow-400";
    if (score >= 60) return "text-orange-400";
    return "text-red-400";
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return "Exceptional";
    if (score >= 80) return "Strong";
    if (score >= 70) return "Good";
    if (score >= 60) return "Average";
    return "Needs Improvement";
  };

  const getImpactColor = (impact) => {
    if (impact === "High") return "text-red-400 bg-red-500/10";
    if (impact === "Medium") return "text-yellow-400 bg-yellow-500/10";
    return "text-blue-400 bg-blue-500/10";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[85vh] overflow-y-auto bg-gradient-to-br from-cyan-900/40 to-black border-cyan-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold flex items-center gap-3">
            <Search className="w-8 h-8 text-cyan-400" />
            LinkedIn Profile Analyzer
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-base">
            Get comprehensive analysis of your LinkedIn profile with actionable insights to make it recruiter-ready
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
            <p className="text-sm text-gray-500">Enter your public LinkedIn profile URL for comprehensive analysis</p>
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
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Analyzing Your Profile...
              </>
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Analyze Profile
              </>
            )}
          </Button>

          {results && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Data Availability Status */}
              {results.dataStatus && (
                <div className={`border rounded-xl p-4 ${
                  results.dataStatus === "not_accessible" 
                    ? "bg-red-500/10 border-red-500/30" 
                    : results.dataStatus.includes("⚠️") || results.dataAvailabilityPercentage < 70
                    ? "bg-yellow-500/10 border-yellow-500/30"
                    : "bg-green-500/10 border-green-500/30"
                }`}>
                  <div className="flex items-start gap-3">
                    {results.dataStatus === "not_accessible" ? (
                      <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                    ) : results.dataAvailabilityPercentage < 70 ? (
                      <AlertOctagon className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold text-base mb-1">
                        {results.dataStatus === "not_accessible" 
                          ? "❌ Data Not Accessible" 
                          : results.dataAvailabilityPercentage < 70
                          ? "⚠️ Partial Data Available"
                          : "✅ Sufficient Data Available"}
                      </h4>
                      <p className="text-sm text-gray-300 mb-2">
                        {results.dataAvailabilityPercentage}% of profile data successfully retrieved
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {results.availableFields?.map((field, idx) => (
                          <Badge key={idx} variant="outline" className="bg-green-500/20 border-green-500/30 text-green-300">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            {field}
                          </Badge>
                        ))}
                        {results.missingFields?.map((field, idx) => (
                          <Badge key={idx} variant="outline" className="bg-gray-500/20 border-gray-500/30 text-gray-400">
                            <XCircle className="w-3 h-3 mr-1" />
                            {field}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Handle "No Data" Case */}
              {results.dataStatus === "not_accessible" && results.error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-red-400 flex items-center gap-2">
                    <Shield className="w-6 h-6" />
                    {results.error.title}
                  </h3>
                  <p className="text-gray-300">{results.error.message}</p>
                  
                  <div className="bg-black/30 rounded-lg p-4 space-y-2">
                    <p className="font-semibold text-red-300 mb-2">Possible Reasons:</p>
                    <ul className="space-y-1">
                      {results.error.reasons?.map((reason, idx) => (
                        <li key={idx} className="text-gray-300 flex items-start gap-2">
                          <span className="text-red-400 mt-1">•</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
                    <p className="font-semibold text-cyan-300 mb-2 flex items-center gap-2">
                      <Database className="w-5 h-5" />
                      Why Real Data Matters
                    </p>
                    <p className="text-sm text-gray-300">{results.error.whyRealDataMatters}</p>
                  </div>

                  <div className="space-y-3">
                    <p className="font-semibold text-cyan-300">Next Steps:</p>
                    {results.error.nextSteps?.map((step, idx) => (
                      <div key={idx} className="bg-black/30 rounded-lg p-4">
                        <p className="font-semibold text-white flex items-center gap-2">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 text-sm">
                            {idx + 1}
                          </span>
                          {step.step}
                        </p>
                        <p className="text-sm text-gray-400 mt-1 ml-8">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Raw Profile Data Display - "What We Found on Your LinkedIn" */}
              {results.rawProfileData && results.dataStatus !== "not_accessible" && (
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6">
                  <h3 className="text-2xl font-bold flex items-center gap-2 mb-4">
                    <Eye className="w-6 h-6 text-blue-400" />
                    What We Found on Your LinkedIn
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    This is your actual profile data as fetched from LinkedIn. Review it for accuracy before proceeding to AI analysis.
                  </p>

                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="bg-black/30">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="experience">Experience</TabsTrigger>
                      <TabsTrigger value="education">Education</TabsTrigger>
                      <TabsTrigger value="skills">Skills</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-3 mt-4">
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="bg-black/30 rounded-lg p-4">
                          <p className="text-xs text-gray-500 mb-1">Full Name</p>
                          <p className="text-white font-medium">{results.rawProfileData.fullName}</p>
                        </div>
                        <div className="bg-black/30 rounded-lg p-4">
                          <p className="text-xs text-gray-500 mb-1">Current Headline</p>
                          <p className="text-white font-medium">{results.rawProfileData.currentHeadline}</p>
                        </div>
                        <div className="bg-black/30 rounded-lg p-4">
                          <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                            <Users className="w-3 h-3" /> Followers
                          </p>
                          <p className="text-white font-medium">{results.rawProfileData.followerCount?.toLocaleString() || 0}</p>
                        </div>
                        <div className="bg-black/30 rounded-lg p-4">
                          <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                            <Users className="w-3 h-3" /> Connections
                          </p>
                          <p className="text-white font-medium">{results.rawProfileData.connectionCount?.toLocaleString() || 0}</p>
                        </div>
                        <div className="bg-black/30 rounded-lg p-4">
                          <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> Location
                          </p>
                          <p className="text-white font-medium">{results.rawProfileData.location}</p>
                        </div>
                        <div className="bg-black/30 rounded-lg p-4">
                          <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                            <Image className="w-3 h-3" /> Profile Assets
                          </p>
                          <p className="text-white font-medium">
                            Picture: {results.rawProfileData.profilePicture} | Banner: {results.rawProfileData.backgroundImage}
                          </p>
                        </div>
                      </div>

                      <div className="bg-black/30 rounded-lg p-4">
                        <p className="text-xs text-gray-500 mb-2">About Section</p>
                        <p className="text-white text-sm whitespace-pre-wrap line-clamp-6">{results.rawProfileData.about}</p>
                      </div>

                      <div className="bg-black/30 rounded-lg p-4">
                        <p className="text-xs text-gray-500 mb-2">Accomplishments</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          <div className="text-center p-2 bg-purple-500/10 rounded">
                            <p className="text-2xl font-bold text-purple-300">{results.rawProfileData.accomplishments?.certifications || 0}</p>
                            <p className="text-xs text-gray-400">Certifications</p>
                          </div>
                          <div className="text-center p-2 bg-blue-500/10 rounded">
                            <p className="text-2xl font-bold text-blue-300">{results.rawProfileData.accomplishments?.honors || 0}</p>
                            <p className="text-xs text-gray-400">Honors</p>
                          </div>
                          <div className="text-center p-2 bg-green-500/10 rounded">
                            <p className="text-2xl font-bold text-green-300">{results.rawProfileData.accomplishments?.projects || 0}</p>
                            <p className="text-xs text-gray-400">Projects</p>
                          </div>
                          <div className="text-center p-2 bg-orange-500/10 rounded">
                            <p className="text-2xl font-bold text-orange-300">{results.rawProfileData.accomplishments?.publications || 0}</p>
                            <p className="text-xs text-gray-400">Publications</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="experience" className="space-y-3 mt-4">
                      {results.rawProfileData.experiences?.length > 0 ? (
                        results.rawProfileData.experiences.map((exp, idx) => (
                          <div key={idx} className="bg-black/30 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-300 flex-shrink-0">
                                <Briefcase className="w-4 h-4" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-white">{exp.title}</h4>
                                <p className="text-sm text-cyan-300">{exp.company}</p>
                                <p className="text-xs text-gray-500 mt-1">{exp.duration}</p>
                                {exp.description && exp.description !== 'No description provided' && (
                                  <p className="text-sm text-gray-400 mt-2 line-clamp-3">{exp.description}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400 text-center py-8">No experience data available</p>
                      )}
                    </TabsContent>

                    <TabsContent value="education" className="space-y-3 mt-4">
                      {results.rawProfileData.education?.length > 0 ? (
                        results.rawProfileData.education.map((edu, idx) => (
                          <div key={idx} className="bg-black/30 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 flex-shrink-0">
                                <GraduationCap className="w-4 h-4" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-white">{edu.degree}</h4>
                                <p className="text-sm text-purple-300">{edu.field}</p>
                                <p className="text-sm text-gray-400">{edu.school}</p>
                                <p className="text-xs text-gray-500 mt-1">{edu.period}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400 text-center py-8">No education data available</p>
                      )}
                    </TabsContent>

                    <TabsContent value="skills" className="mt-4">
                      {results.rawProfileData.skills?.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {results.rawProfileData.skills.map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="bg-blue-500/20 border-blue-500/30 text-blue-300">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-400 text-center py-8">No skills data available</p>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              )}

              {/* Profile Classification & Founder Branding Score */}
              {results.dataStatus !== "not_accessible" && (
                <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6">
                  {/* Profile Classification */}
                  {results.profileClassification && (
                    <div className="mb-6">
                      <h3 className="text-xl font-bold flex items-center gap-2 mb-3">
                        <Target className="w-5 h-5 text-cyan-400" />
                        Profile Classification
                      </h3>
                      <div className="bg-black/30 rounded-lg p-4 space-y-2">
                        <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full text-lg font-semibold text-purple-300">
                          {results.profileClassification}
                        </span>
                        {results.classificationReasoning && (
                          <p className="text-sm text-gray-400 mt-3 italic">
                            <strong className="text-cyan-300">Why:</strong> {results.classificationReasoning}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-cyan-400" />
                    {results.founderBrandingScore ? 'Founder Branding Score' : 'Overall Profile Score'}
                  </h3>
                  <div className="text-right">
                    <div className={`text-5xl font-bold ${getScoreColor(results.founderBrandingScore || results.score)}`}>
                      {results.founderBrandingScore || results.score}
                      <span className="text-2xl text-gray-400">/100</span>
                    </div>
                    <p className={`text-sm font-semibold ${getScoreColor(results.founderBrandingScore || results.score)}`}>
                      {getScoreLabel(results.founderBrandingScore || results.score)}
                    </p>
                  </div>
                </div>

                {/* Score Breakdown */}
                {results.scoreBreakdown && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
                    {Object.entries(results.scoreBreakdown).map(([key, value]) => (
                      <div key={key} className="bg-black/30 rounded-lg p-3">
                        <p className="text-xs text-gray-400 capitalize mb-1">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-xl font-bold text-cyan-300">{value}<span className="text-sm text-gray-500">/20</span></p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-4 p-3 bg-black/20 rounded-lg">
                  <p className="text-gray-300 text-sm leading-relaxed">{results.summary}</p>
                </div>
                </div>
              )}

              {/* Mistakes & Issues Section */}
              {results.dataStatus !== "not_accessible" && results.mistakes && results.mistakes.length > 0 && (
                <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-6">
                  <h3 className="text-2xl font-bold flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                    Mistakes & Gaps Found
                  </h3>
                  <div className="space-y-3">
                    {results.mistakes.map((mistake, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-black/30 rounded-lg p-4 space-y-2"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-white">{mistake.category}</h4>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getImpactColor(mistake.impact)}`}>
                                {mistake.impact} Impact
                              </span>
                            </div>
                            <p className="text-red-300 text-sm mb-2">{mistake.issue}</p>
                            <p className="text-gray-400 text-sm italic">💡 Why it matters: {mistake.explanation}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Visualizations - Charts */}
              {results.dataStatus !== "not_accessible" && (results.radarChart || results.sectionScores) && (
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
                  <h3 className="text-2xl font-bold flex items-center gap-2 mb-6">
                    <BarChart3 className="w-6 h-6 text-purple-400" />
                    Performance Visualizations
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Radar Chart - Before vs After */}
                    {results.radarChart && (
                      <div className="bg-black/30 rounded-lg p-4">
                        <h4 className="font-semibold text-purple-300 mb-4 text-center">Profile Strength: Before → After</h4>
                        <ResponsiveContainer width="100%" height={300}>
                          <RadarChart data={[
                            { subject: 'Authority', before: results.radarChart.before?.authority || 0, after: results.radarChart.after?.authority || 0 },
                            { subject: 'Brand Clarity', before: results.radarChart.before?.brandClarity || 0, after: results.radarChart.after?.brandClarity || 0 },
                            { subject: 'Credibility', before: results.radarChart.before?.credibility || 0, after: results.radarChart.after?.credibility || 0 },
                            { subject: 'SEO', before: results.radarChart.before?.seoVisibility || 0, after: results.radarChart.after?.seoVisibility || 0 },
                            { subject: 'Content', before: results.radarChart.before?.contentInfluence || 0, after: results.radarChart.after?.contentInfluence || 0 },
                          ]}>
                            <PolarGrid stroke="#444" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                            <PolarRadiusAxis domain={[0, 20]} tick={{ fill: '#6b7280', fontSize: 10 }} />
                            <Radar name="Current" dataKey="before" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                            <Radar name="Projected" dataKey="after" stroke="#10b981" fill="#10b981" fillOpacity={0.5} />
                            <Legend wrapperStyle={{ fontSize: '12px' }} />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    )}

                    {/* Bar Chart - Section Scores */}
                    {results.sectionScores && (
                      <div className="bg-black/30 rounded-lg p-4">
                        <h4 className="font-semibold text-purple-300 mb-4 text-center">Section-wise Scores</h4>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={Object.entries(results.sectionScores).map(([key, value]) => ({
                            name: key.charAt(0).toUpperCase() + key.slice(1),
                            score: value,
                          }))}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                            <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 11 }} angle={-15} textAnchor="end" height={80} />
                            <YAxis domain={[0, 20]} tick={{ fill: '#6b7280', fontSize: 10 }} />
                            <RechartsTooltip 
                              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                              labelStyle={{ color: '#fff' }}
                            />
                            <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                              {Object.keys(results.sectionScores).map((_, index) => (
                                <Cell key={`cell-${index}`} fill={['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'][index % 5]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </div>

                  {/* SEO Keyword Coverage */}
                  {results.seoKeywordCoverage && (
                    <div className="mt-6 bg-black/30 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-300 mb-3">SEO Keyword Coverage</h4>
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex-1 bg-gray-700 rounded-full h-4 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                            style={{ width: `${results.seoKeywordCoverage.coveragePercentage || 0}%` }}
                          />
                        </div>
                        <span className="text-2xl font-bold text-purple-300">{results.seoKeywordCoverage.coveragePercentage || 0}%</span>
                      </div>
                      <div className="grid md:grid-cols-3 gap-3">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Target Keywords</p>
                          <p className="text-white font-semibold">{results.seoKeywordCoverage.targetKeywords?.length || 0}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Found</p>
                          <p className="text-green-400 font-semibold">{results.seoKeywordCoverage.foundKeywords?.length || 0}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Missing</p>
                          <p className="text-red-400 font-semibold">{results.seoKeywordCoverage.missingKeywords?.length || 0}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Profile Completeness */}
                  {results.profileCompleteness && (
                    <div className="mt-4 bg-black/30 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-300 mb-3">Profile Completeness</h4>
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex-1 bg-gray-700 rounded-full h-4 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500"
                            style={{ width: `${results.profileCompleteness.completenessPercentage || 0}%` }}
                          />
                        </div>
                        <span className="text-2xl font-bold text-cyan-300">{results.profileCompleteness.completenessPercentage || 0}%</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {Object.entries(results.profileCompleteness).filter(([key]) => key !== 'completenessPercentage').map(([key, value]) => (
                          <div key={key} className={`p-2 rounded ${value ? 'bg-green-500/20' : 'bg-gray-500/20'}`}>
                            <div className="flex items-center gap-2">
                              {value ? (
                                <CheckCircle2 className="w-4 h-4 text-green-400" />
                              ) : (
                                <XCircle className="w-4 h-4 text-gray-500" />
                              )}
                              <span className="text-xs text-white capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Improvements Section */}
              {results.dataStatus !== "not_accessible" && results.improvements && (
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
                  <h3 className="text-2xl font-bold flex items-center gap-2 mb-4">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                    Recommended Improvements
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Headline Improvement */}
                    {results.improvements.headline && (
                <div className="bg-black/30 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-green-300 text-lg flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    ✨ AI-Suggested Headline
                  </h4>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onCopy(results.improvements.headline.optimized)}
                    className="border-green-500/30"
                  >
                    {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                {results.improvements.headline.current && (
                  <div className="bg-red-500/10 border-l-4 border-red-500/50 p-3 rounded">
                    <p className="text-xs text-gray-500 mb-1">Current:</p>
                    <p className="text-white text-sm">{results.improvements.headline.current}</p>
                  </div>
                )}
                <div className="bg-green-500/10 border-l-4 border-green-500/50 p-3 rounded">
                  <p className="text-xs text-gray-500 mb-1">AI-Optimized:</p>
                  <p className="text-white font-medium">{results.improvements.headline.optimized}</p>
                </div>
                <p className="text-sm text-gray-400 italic">💡 {results.improvements.headline.reasoning}</p>
              </div>
                    )}

                    {/* About Section Improvement */}
                    {results.improvements.about && (
                <div className="bg-black/30 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-green-300 text-lg flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    📝 AI-Suggested About Section
                  </h4>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onCopy(results.improvements.about.optimized)}
                    className="border-green-500/30"
                  >
                    {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <div className="bg-green-500/10 border-l-4 border-green-500/50 p-3 rounded">
                  <p className="text-xs text-gray-500 mb-2">AI-Optimized:</p>
                  <p className="text-white whitespace-pre-wrap">{results.improvements.about.optimized}</p>
                </div>
                <p className="text-sm text-gray-400 italic">💡 {results.improvements.about.reasoning}</p>
              </div>
                    )}

                    {/* Experience Improvement */}
                    {results.improvements.experience && (
                <div className="bg-black/30 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-green-300 text-lg flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    💼 AI-Suggested Experience Bullets
                  </h4>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onCopy(results.improvements.experience.template)}
                    className="border-green-500/30"
                  >
                    {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <div className="bg-green-500/10 border-l-4 border-green-500/50 p-3 rounded">
                  <p className="text-xs text-gray-500 mb-2">AI-Optimized:</p>
                  <p className="text-white whitespace-pre-wrap">{results.improvements.experience.template}</p>
                </div>
                        {results.improvements.experience.tips && (
                          <div className="mt-2 space-y-1">
                            <p className="text-sm font-semibold text-green-400">Tips:</p>
                            {results.improvements.experience.tips.map((tip, i) => (
                              <p key={i} className="text-sm text-gray-400">• {tip}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Skills Optimization */}
                    {results.improvements.skills && (
                      <div className="bg-black/30 rounded-lg p-4 space-y-3">
                        <h4 className="font-semibold text-green-300 text-lg flex items-center gap-2">
                          <Zap className="w-5 h-5" />
                          🎯 AI-Suggested Skills Optimization
                        </h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div>
                            <p className="text-sm font-semibold text-cyan-400 mb-2">Must-Have Skills:</p>
                            <div className="flex flex-wrap gap-2">
                              {results.improvements.skills.mustHave?.map((skill, i) => (
                                <span key={i} className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-sm">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-blue-400 mb-2">Recommended:</p>
                            <div className="flex flex-wrap gap-2">
                              {results.improvements.skills.recommended?.map((skill, i) => (
                                <span key={i} className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-sm">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 italic">{results.improvements.skills.reasoning}</p>
                      </div>
                    )}

                    {/* SEO Keywords */}
                    {results.improvements.seoKeywords && (
                      <div className="bg-black/30 rounded-lg p-4 space-y-3">
                        <h4 className="font-semibold text-green-300 text-lg flex items-center gap-2">
                          <Zap className="w-5 h-5" />
                          🔍 AI-Suggested SEO Keywords Strategy
                        </h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div>
                            <p className="text-sm font-semibold text-purple-400 mb-2">Primary Keywords:</p>
                            <div className="flex flex-wrap gap-2">
                              {results.improvements.seoKeywords.primary?.map((keyword, i) => (
                                <span key={i} className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm">
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-pink-400 mb-2">Secondary Keywords:</p>
                            <div className="flex flex-wrap gap-2">
                              {results.improvements.seoKeywords.secondary?.map((keyword, i) => (
                                <span key={i} className="px-3 py-1 bg-pink-500/20 border border-pink-500/30 rounded-full text-sm">
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 italic">{results.improvements.seoKeywords.placement}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Content Strategy */}
              {results.dataStatus !== "not_accessible" && results.contentStrategy && (
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
                  <h3 className="text-2xl font-bold flex items-center gap-2 mb-4">
                    <MessageSquare className="w-6 h-6 text-purple-400" />
                    Content & Engagement Strategy
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-black/30 rounded-lg p-4">
                      <p className="text-sm font-semibold text-purple-400 mb-2">Posting Frequency:</p>
                      <p className="text-white">{results.contentStrategy.postingFrequency}</p>
                    </div>
                    <div className="bg-black/30 rounded-lg p-4">
                      <p className="text-sm font-semibold text-purple-400 mb-2">Content Types to Share:</p>
                      <ul className="space-y-1">
                        {results.contentStrategy.contentTypes?.map((type, i) => (
                          <li key={i} className="text-white flex items-start gap-2">
                            <span className="text-purple-400">•</span>
                            {type}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-black/30 rounded-lg p-4">
                      <p className="text-sm font-semibold text-purple-400 mb-2">Engagement Tips:</p>
                      <ul className="space-y-1">
                        {results.contentStrategy.engagementTips?.map((tip, i) => (
                          <li key={i} className="text-white flex items-start gap-2">
                            <span className="text-purple-400">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Roadmap */}
              {results.dataStatus !== "not_accessible" && results.roadmap && (
                <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6">
                  <h3 className="text-2xl font-bold flex items-center gap-2 mb-4">
                    <Rocket className="w-6 h-6 text-yellow-400" />
                    Action Roadmap
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Immediate Actions */}
                    {results.roadmap.immediate && (
                      <div>
                        <h4 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
                          <Clock className="w-5 h-5" />
                          🔥 Do This Right Now
                        </h4>
                        <div className="space-y-2">
                          {results.roadmap.immediate.map((item, i) => (
                            <div key={i} className="bg-black/30 rounded-lg p-3 flex items-start gap-3">
                              <div className="flex-1">
                                <p className="text-white font-medium">{item.action}</p>
                                <div className="flex items-center gap-4 mt-1">
                                  <span className={`text-xs px-2 py-0.5 rounded ${getImpactColor(item.impact)}`}>
                                    {item.impact} Impact
                                  </span>
                                  <span className="text-xs text-gray-500">⏱️ {item.timeNeeded}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Short Term Actions */}
                    {results.roadmap.shortTerm && (
                      <div>
                        <h4 className="font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                          <Target className="w-5 h-5" />
                          📅 This Week
                        </h4>
                        <div className="space-y-2">
                          {results.roadmap.shortTerm.map((item, i) => (
                            <div key={i} className="bg-black/30 rounded-lg p-3 flex items-start gap-3">
                              <div className="flex-1">
                                <p className="text-white font-medium">{item.action}</p>
                                <div className="flex items-center gap-4 mt-1">
                                  <span className={`text-xs px-2 py-0.5 rounded ${getImpactColor(item.impact)}`}>
                                    {item.impact} Impact
                                  </span>
                                  <span className="text-xs text-gray-500">⏱️ {item.timeNeeded}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Long Term Actions */}
                    {results.roadmap.longTerm && (
                      <div>
                        <h4 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5" />
                          🎯 Build These Habits
                        </h4>
                        <div className="space-y-2">
                          {results.roadmap.longTerm.map((item, i) => (
                            <div key={i} className="bg-black/30 rounded-lg p-3 flex items-start gap-3">
                              <div className="flex-1">
                                <p className="text-white font-medium">{item.action}</p>
                                <div className="flex items-center gap-4 mt-1">
                                  <span className={`text-xs px-2 py-0.5 rounded ${getImpactColor(item.impact)}`}>
                                    {item.impact} Impact
                                  </span>
                                  <span className="text-xs text-gray-500">⏱️ {item.timeNeeded}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Competitive Edge */}
              {results.dataStatus !== "not_accessible" && results.competitiveEdge && results.competitiveEdge.length > 0 && (
                <div className="bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border border-indigo-500/30 rounded-xl p-6">
                  <h3 className="text-2xl font-bold flex items-center gap-2 mb-4">
                    <Star className="w-6 h-6 text-indigo-400" />
                    How to Stand Out From Competitors
                  </h3>
                  <div className="space-y-2">
                    {results.competitiveEdge.map((edge, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-black/30 rounded-lg p-4 flex items-start gap-3"
                      >
                        <span className="text-indigo-400 font-bold text-lg">{i + 1}.</span>
                        <p className="text-white flex-1">{edge}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Analysis Notes */}
              {results.analysisNotes && results.dataStatus !== "not_accessible" && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <p className="text-sm text-yellow-300 flex items-start gap-2">
                    <AlertOctagon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Analysis Scope:</strong> {results.analysisNotes}
                    </span>
                  </p>
                </div>
              )}

              {/* Final Note */}
              {results.dataStatus !== "not_accessible" && (
                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
                  <p className="text-sm text-cyan-300 flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>
                      💡 <strong>Pro Tip:</strong> All content suggestions are AI-generated based on your real LinkedIn data. 
                      Use the copy buttons to quickly transfer optimized content to your profile. 
                      Focus on implementing the "Do This Right Now" actions first for immediate impact!
                    </span>
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// LinkedIn Enhancer Modal
function LinkedInEnhancerModal({ open, onOpenChange, onCopy, copied }) {
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
            Get AI-powered suggestions to optimize your LinkedIn profile for recruiters and ATS
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label className="text-gray-300">LinkedIn Profile URL</Label>
            <Input
              placeholder="https://linkedin.com/in/yourprofile"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              className="bg-black/50 border-purple-500/30 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Target Role *</Label>
            <Input
              placeholder="e.g., Software Engineer, Data Scientist"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="bg-black/50 border-purple-500/30 text-white"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-md p-3">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <Button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Optimize Profile
              </>
            )}
          </Button>

          {results && (
            <div className="space-y-4 mt-6">
              <div className="bg-black/30 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-blue-300">Optimized Headline</h4>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onCopy(results.headline)}
                    className="border-blue-500/30"
                  >
                    {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="text-gray-300">{results.headline}</p>
              </div>

              <div className="bg-black/30 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-blue-300">About Section</h4>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onCopy(results.about)}
                    className="border-blue-500/30"
                  >
                    {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="text-gray-300 whitespace-pre-wrap">{results.about}</p>
              </div>

              <div className="bg-black/30 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-blue-300">Experience Bullets</h4>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onCopy(results.experience)}
                    className="border-blue-500/30"
                  >
                    {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="text-gray-300 whitespace-pre-wrap">{results.experience}</p>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <p className="text-sm text-blue-300">
                  💡 Note: LinkedIn updates require manual copy for security reasons. Use the copy buttons above.
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// LinkedIn Post Generator Modal
function LinkedInPostModal({ open, onOpenChange, onCopy, copied }) {
  const [postType, setPostType] = useState("");
  const [tone, setTone] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!postType || !tone) {
      setError("Please select both post type and tone");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/linkedin-post-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postType, tone }),
      });

      const data = await response.json();
      if (response.ok) {
        setResults(data);
      } else {
        setError(data.error || "Failed to generate post");
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
            <MessageSquare className="w-6 h-6 text-purple-400" />
            Daily LinkedIn Post Generator
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Generate engaging LinkedIn posts for your professional journey
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label className="text-gray-300">Post Type *</Label>
            <Select value={postType} onValueChange={setPostType}>
              <SelectTrigger className="bg-black/50 border-purple-500/30 text-white">
                <SelectValue placeholder="Select post type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-purple-500/30 text-white">
                <SelectItem value="Project">Project</SelectItem>
                <SelectItem value="Learning">Learning</SelectItem>
                <SelectItem value="Achievement">Achievement</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Tone *</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger className="bg-black/50 border-purple-500/30 text-white">
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-purple-500/30 text-white">
                <SelectItem value="Professional">Professional</SelectItem>
                <SelectItem value="Story">Story</SelectItem>
                <SelectItem value="Technical">Technical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-md p-3">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Post
              </>
            )}
          </Button>

          {results && (
            <div className="space-y-4 mt-6">
              <div className="bg-black/30 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-purple-300">Generated Post</h4>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onCopy(results.post + "\n\n" + results.hashtags)}
                    className="border-purple-500/30"
                  >
                    {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="text-gray-300 whitespace-pre-wrap">{results.post}</p>
                <p className="text-blue-400 font-medium">{results.hashtags}</p>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => onCopy(results.post + "\n\n" + results.hashtags)}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Post
                </Button>
                <Button
                  onClick={() => window.open("https://www.linkedin.com/feed/?shareActive=true", "_blank")}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Post on LinkedIn
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// GitHub Repo README Generator Modal
function GitHubRepoModal({ open, onOpenChange, onCopy, copied }) {
  const [repoName, setRepoName] = useState("");
  const [techStack, setTechStack] = useState("");
  const [problemSolved, setProblemSolved] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!repoName || !techStack || !problemSolved) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/github-repo-readme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoName, techStack, problemSolved }),
      });

      const data = await response.json();
      if (response.ok) {
        setResults(data);
      } else {
        setError(data.error || "Failed to generate README");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-gray-900/40 to-black border-gray-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Github className="w-6 h-6 text-gray-400" />
            GitHub Repo README Generator
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Create professional README.md files for your repositories
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label className="text-gray-300">Repository Name *</Label>
            <Input
              placeholder="my-awesome-project"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              className="bg-black/50 border-gray-500/30 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Tech Stack *</Label>
            <Input
              placeholder="React, Node.js, MongoDB, Tailwind CSS"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              className="bg-black/50 border-gray-500/30 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Problem Solved *</Label>
            <textarea
              placeholder="Describe what problem your project solves..."
              value={problemSolved}
              onChange={(e) => setProblemSolved(e.target.value)}
              className="w-full h-24 bg-black/50 border border-gray-500/30 rounded-md p-3 text-white"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-md p-3">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate README
              </>
            )}
          </Button>

          {results && (
            <div className="space-y-4 mt-6">
              <div className="bg-black/30 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-300">README.md Preview</h4>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onCopy(results.readme)}
                    className="border-gray-500/30"
                  >
                    {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <pre className="text-gray-300 text-sm whitespace-pre-wrap font-mono bg-black/50 p-4 rounded overflow-x-auto">
                  {results.readme}
                </pre>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => onCopy(results.readme)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy README
                </Button>
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  disabled
                >
                  <Github className="w-4 h-4 mr-2" />
                  Push to GitHub (Coming Soon)
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// GitHub Profile README Generator Modal
function GitHubProfileModal({ open, onOpenChange, onCopy, copied }) {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!username || !role) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/github-profile-readme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, role }),
      });

      const data = await response.json();
      if (response.ok) {
        setResults(data);
      } else {
        setError(data.error || "Failed to generate profile README");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-green-900/40 to-black border-green-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-green-400" />
            GitHub Profile README Generator
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Build an impressive GitHub profile that showcases your skills
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label className="text-gray-300">GitHub Username *</Label>
            <Input
              placeholder="yourusername"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-black/50 border-green-500/30 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Target Role *</Label>
            <Input
              placeholder="e.g., Full Stack Developer, DevOps Engineer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-black/50 border-green-500/30 text-white"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-md p-3">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Profile
              </>
            )}
          </Button>

          {results && (
            <div className="space-y-4 mt-6">
              <div className="bg-black/30 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-green-300">Profile README.md</h4>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onCopy(results.readme)}
                    className="border-green-500/30"
                  >
                    {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <pre className="text-gray-300 text-sm whitespace-pre-wrap font-mono bg-black/50 p-4 rounded overflow-x-auto">
                  {results.readme}
                </pre>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => onCopy(results.readme)}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy README
                </Button>
                <Button
                  className="flex-1 bg-gray-600 hover:bg-gray-700"
                  disabled
                >
                  <Github className="w-4 h-4 mr-2" />
                  Push to GitHub (Coming Soon)
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Career Branding Fixer Modal
function CareerBrandingModal({ open, onOpenChange, onCopy, copied }) {
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
      if (response.ok) {
        setResults(data);
      } else {
        setError(data.error || "Failed to analyze branding");
      }
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
            Fix your career branding with AI-powered analysis
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label className="text-gray-300">Resume Content *</Label>
            <textarea
              placeholder="Paste your resume content here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="w-full h-32 bg-black/50 border border-pink-500/30 rounded-md p-3 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Target Role *</Label>
            <Input
              placeholder="e.g., Product Manager, UX Designer"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="bg-black/50 border-pink-500/30 text-white"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-md p-3">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <Button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Analyze Branding
              </>
            )}
          </Button>

          {results && (
            <div className="space-y-4 mt-6">
              <div className="bg-black/30 rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-pink-300">Branding Mismatch</h4>
                <p className="text-gray-300">{results.brandingMismatch}</p>
              </div>

              <div className="bg-black/30 rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-pink-300">Correct Positioning</h4>
                <p className="text-gray-300">{results.correctPositioning}</p>
              </div>

              <div className="bg-black/30 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-pink-300">Optimized Summary</h4>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onCopy(results.optimizedSummary)}
                    className="border-pink-500/30"
                  >
                    {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="text-gray-300">{results.optimizedSummary}</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Project Resume Bullets Generator Modal
function ProjectBulletsModal({ open, onOpenChange, onCopy, copied }) {
  const [projectDescription, setProjectDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!projectDescription || !techStack) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/project-resume-bullets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectDescription, techStack }),
      });

      const data = await response.json();
      if (response.ok) {
        setResults(data);
      } else {
        setError(data.error || "Failed to generate bullets");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-orange-900/40 to-black border-orange-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Rocket className="w-6 h-6 text-orange-400" />
            Project → Resume Bullet Generator
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Convert your projects into ATS-friendly resume bullet points
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label className="text-gray-300">Project Description *</Label>
            <textarea
              placeholder="Describe what your project does, what problems it solves, and your role in it..."
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              className="w-full h-32 bg-black/50 border border-orange-500/30 rounded-md p-3 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Tech Stack Used *</Label>
            <Input
              placeholder="React, Node.js, Express, PostgreSQL, AWS"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              className="bg-black/50 border-orange-500/30 text-white"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-md p-3">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Bullets
              </>
            )}
          </Button>

          {results && (
            <div className="space-y-4 mt-6">
              <div className="bg-black/30 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-orange-300">ATS-Friendly Resume Bullets</h4>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onCopy(results.bullets)}
                    className="border-orange-500/30"
                  >
                    {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="text-gray-300 whitespace-pre-wrap">{results.bullets}</p>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                <p className="text-sm text-orange-300">
                  💡 Pro Tip: Use these bullets in your resume's project section. They're optimized for ATS systems and recruiter readability.
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
