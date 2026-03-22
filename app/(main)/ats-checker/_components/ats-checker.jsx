"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Loader2,
  CheckCircle2,
  FileText,
  Upload,
  Target,
  TrendingUp,
  Award,
  Zap,
  Shield,
  CheckCircle,
  XCircle,
  AlertCircle,
  Sparkles,
  BarChart3,
  FileCheck,
  Clock,
  Users,
  ArrowRight,
  TrendingDown,
  Activity,
  Rocket,
  Star,
  Check,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

const steps = [
  "Parsing your resume",
  "Analyzing your experience",
  "Extracting your skills",
  "Generating recommendations",
];

// Mock data for visualizations (UI only)
const scoreBreakdownData = [
  { category: "Keywords", score: 75 },
  { category: "Skills", score: 85 },
  { category: "Formatting", score: 90 },
  { category: "Experience", score: 70 },
  { category: "Projects", score: 65 },
  { category: "Compatibility", score: 88 },
];

const keywordMatchData = [
  { name: "Matched", value: 65, color: "#10b981" },
  { name: "Missing", value: 35, color: "#f59e0b" },
];

const skillsData = [
  { skill: "JavaScript", level: 90 },
  { skill: "React", level: 85 },
  { skill: "Node.js", level: 75 },
  { skill: "Python", level: 70 },
  { skill: "SQL", level: 80 },
  { skill: "Git", level: 95 },
];

const experienceImpactData = [
  { category: "Experience Quality", score: 85 },
  { category: "Project Relevance", score: 72 },
  { category: "Action Verbs", score: 68 },
  { category: "Quantified Results", score: 55 },
];

const matchedKeywords = [
  "JavaScript", "React", "API", "Database", "Agile", "Git", "Problem Solving"
];

const missingKeywords = [
  "TypeScript", "Testing", "CI/CD", "Docker", "Microservices", "Cloud (AWS/Azure)"
];

const improvementPriorities = [
  {
    priority: 1,
    title: "Add missing keywords",
    description: "Include 'TypeScript', 'Testing', 'CI/CD' to boost ATS score by ~15%",
    impact: "High",
  },
  {
    priority: 2,
    title: "Improve project descriptions",
    description: "Add quantifiable metrics and results to each project",
    impact: "High",
  },
  {
    priority: 3,
    title: "Optimize formatting",
    description: "Ensure consistent date formats and section headings",
    impact: "Medium",
  },
  {
    priority: 4,
    title: "Enhance skills section",
    description: "Categorize skills into Technical, Tools, and Soft Skills",
    impact: "Medium",
  },
];

const atsCompatibilityChecks = [
  { check: "PDF format (text-based)", passed: true },
  { check: "Clean section headings", passed: true },
  { check: "No tables or complex graphics", passed: true },
  { check: "Standard fonts used", passed: true },
  { check: "Optimal section ordering", passed: false },
  { check: "Contact info format", passed: true },
];

export default function ATSChecker() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [atsScore, setAtsScore] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
        setAtsScore(null);
        setFeedback(null);
        setCurrentStep(0);
      } else {
        toast.error("Please upload a PDF file only.");
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setAtsScore(null);
        setFeedback(null);
        setCurrentStep(0);
      } else {
        toast.error("Please upload a PDF file only.");
      }
    }
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    let timer;
    if (loading && currentStep < steps.length) {
      timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [loading, currentStep]);

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Please upload a PDF file.");
      return;
    }

    setLoading(true);
    setAtsScore(null);
    setFeedback(null);
    setCurrentStep(0);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await fetch("/api/resume/ats-checker", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to analyze resume");
        return;
      }

      const data = await response.json();
      setAtsScore(data.atsScore);
      if (data.feedback && data.feedback.includes("Unable to parse AI response")) {
        setFeedback("We encountered an issue parsing your resume. Please review it manually or try again.");
      } else {
        setFeedback(data.feedback);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error analyzing resume. Please try again.");
    } finally {
      setLoading(false);
      setCurrentStep(steps.length);
    }
  };

  const getScoreStatus = (score) => {
    if (score >= 81) return {
      label: "Elite",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
      glowColor: "shadow-emerald-500/30"
    };
    if (score >= 66) return {
      label: "Strong",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      glowColor: "shadow-blue-500/30"
    };
    if (score >= 41) return {
      label: "Average",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20",
      glowColor: "shadow-yellow-500/30"
    };
    return {
      label: "Critical",
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
      glowColor: "shadow-red-500/30"
    };
  };

  const getImpactColor = (impact) => {
    if (impact === "High") return "bg-red-500/10 text-red-400 border-red-500/20";
    if (impact === "Medium") return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  };

  const status = atsScore !== null ? getScoreStatus(atsScore) : null;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30 overflow-x-hidden">
      {/* 1. Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -mr-40 -mt-40 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px] -ml-40 -mb-40" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                 <Image src="/skill.png" alt="Logo" width={40} height={40} className="h-10 w-auto" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-black tracking-tighter text-white">TECHIEHELP <span className="text-emerald-400">AI</span></h3>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Industry Readiness Engine</p>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-[1.1]">
              Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">Digital Gatekeeper</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Our AI-driven ATS engine deconstructs your resume using enterprise-grade algorithms to ensure you rank #1 in any recruiter&apos;s dashboard.
            </p>

            {/* Premium Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { label: "Resumes Optimized", val: "10K+", icon: Users, color: "text-blue-400", bg: "bg-blue-500/5" },
                { label: "Success Velocity", val: "95%", icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/5" },
                { label: "Elite Insights", val: "AI Power", icon: Sparkles, color: "text-purple-400", bg: "bg-purple-500/5" }
              ].map((stat, i) => (
                <Card key={i} className={`border-white/10 ${stat.bg} backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:scale-[1.02] group`}>
                  <CardContent className="p-8 text-center">
                    <stat.icon className={`h-8 w-8 mx-auto mb-4 ${stat.color} group-hover:scale-110 transition-transform`} />
                    <div className="text-4xl font-black mb-1 text-white">{stat.val}</div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground font-bold">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Upload Area */}
      <section className="py-20 bg-white/[0.02] border-y border-white/5 relative z-10">
        <div className="container mx-auto px-4">
          {!atsScore && (
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Uploader Card */}
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                <Card className="border-white/10 bg-white/5 backdrop-blur-2xl overflow-hidden group">
                  <CardContent className="p-10">
                    <div className="flex items-center gap-4 mb-10">
                      <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400">
                        <Upload className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black tracking-tight">Deploy Resume</h2>
                        <p className="text-sm text-muted-foreground">PDF Protocol Only • Max 5MB</p>
                      </div>
                    </div>

                    <div
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      className={`relative border-2 border-dashed rounded-[32px] p-12 transition-all duration-500 group/drop ${
                        dragActive ? "border-emerald-500 bg-emerald-500/5 scale-[1.02]" : "border-white/10 hover:border-emerald-500/50 hover:bg-white/[0.02]"
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover/drop:opacity-100 transition-opacity rounded-[30px]" />
                      
                      <div className="relative z-10">
                        <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover/drop:scale-110 transition-transform">
                          <FileText className="w-10 h-10 text-emerald-400" />
                        </div>
                        <p className="text-xl font-bold mb-2">Drop your blueprint here</p>
                        <p className="text-muted-foreground mb-8">or click to browse filesystem</p>
                        
                        <Button 
                          onClick={handleChooseFile}
                          className="h-12 px-8 rounded-2xl bg-white text-black font-black hover:bg-emerald-400 transition-colors"
                        >
                          Choose PDF
                        </Button>
                        <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
                      </div>

                      {file && (
                        <div className="mt-8 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 animate-in fade-in slide-in-from-bottom-2">
                           <p className="text-sm font-bold text-emerald-400 flex items-center justify-center gap-2">
                             <CheckCircle className="h-4 w-4" />
                             Blueprint Ready: {file.name}
                           </p>
                        </div>
                      )}
                    </div>

                    <Button
                      onClick={handleSubmit}
                      disabled={loading || !file}
                      className="mt-10 w-full h-16 rounded-[24px] bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white text-lg font-black transition-all shadow-[0_20px_40px_-15px_rgba(37,99,235,0.3)] disabled:opacity-50"
                    >
                      {loading ? (
                        <span className="flex items-center gap-3">
                          <Loader2 className="h-6 w-6 animate-spin" />
                          ENGAGING AI ANALYZER...
                        </span>
                      ) : (
                        <span className="flex items-center gap-3">
                          <Sparkles className="h-6 w-6" />
                          LAUNCH ANALYSIS
                        </span>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Progress Card */}
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
                <Card className="border-white/10 bg-white/5 backdrop-blur-2xl h-full">
                  <CardContent className="p-10 flex flex-col h-full">
                    <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                      <Activity className="h-6 w-6 text-blue-400" />
                      Analysis Stream
                    </h2>

                    <AnimatePresence mode="wait">
                      {loading || currentStep < steps.length ? (
                        <div className="space-y-6 flex-1">
                          {steps.map((step, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-500 ${
                                index === currentStep ? "bg-white/10 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.1)]" : "bg-transparent border-white/5 opcity-40"
                              }`}
                            >
                              {index < currentStep ? (
                                <div className="bg-emerald-500/20 p-1.5 rounded-full">
                                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                                </div>
                              ) : index === currentStep ? (
                                <Loader2 className="h-6 w-6 text-blue-400 animate-spin" />
                              ) : (
                                <div className="h-6 w-6 rounded-full border border-white/20" />
                              )}
                              <span className={`text-sm font-bold tracking-tight ${index === currentStep ? "text-white" : "text-muted-foreground"}`}>
                                {step}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center flex-1 py-10 text-center">
                          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 animate-bounce">
                            <Rocket className="w-12 h-12 text-blue-400 " />
                          </div>
                          <h3 className="text-2xl font-black mb-2">Ready for Lift-off</h3>
                          <p className="text-muted-foreground max-w-xs">Upload your resume and our AI will begin the deep-scan sequence.</p>
                        </div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* 3. Post-Analysis Results Dashboard */}
      <AnimatePresence>
        {atsScore !== null && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="pb-32"
          >
            <div className="container mx-auto px-4">
              {/* Score Header Card */}
              <Card className="border-white/10 bg-white/5 backdrop-blur-2xl overflow-hidden mb-12 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-emerald-500/5" />
                <CardContent className="p-12 relative z-10 flex flex-col md:flex-row items-center gap-16">
                  
                  {/* Gauge */}
                  <div className="relative w-64 h-64 lg:w-80 lg:h-80 flex-shrink-0">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                      className={`absolute inset-0 rounded-full blur-[80px] ${status.bgColor} ${status.glowColor} opacity-40`}
                    />
                    <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/5" />
                      <motion.circle
                        cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray="263.89"
                        initial={{ strokeDashoffset: 263.89 }}
                        animate={{ strokeDashoffset: 263.89 * (1 - atsScore / 100) }}
                        transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
                        className={status.color} strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className={`text-8xl font-black ${status.color}`}>
                        {atsScore}
                      </motion.div>
                      <div className="text-lg font-bold text-muted-foreground -mt-2 uppercase tracking-[0.2em]">SCORE</div>
                    </div>
                  </div>

                  {/* Verdict Info */}
                  <div className="text-center md:text-left space-y-6 flex-1">
                    <Badge className={`${status.bgColor} ${status.color} border ${status.borderColor} px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest`}>
                      {status.label} RATING DETECTED
                    </Badge>
                    <h2 className="text-4xl lg:text-5xl font-black tracking-tighter leading-[1.1]">
                      Your Professional Blueprint <br />
                      <span className={status.color}>Performance Analysis</span>
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                      {atsScore >= 81 ? "Your profile is engineered for elite enterprise standards. Minor structural refinements will cement your status." : 
                       atsScore >= 66 ? "Strong foundation. Focus on high-density keyword integration and quantify your business impact to ascend." :
                       "Strategic intervention required. Your narrative is strong, but the digital filters are failing to parse your value."}
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                       <div className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold">
                         <Clock className="h-4 w-4 text-blue-400" />
                         SCAN COMPLETE: 1.2s
                       </div>
                       <div className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold text-emerald-400">
                         <FileCheck className="h-4 w-4" />
                         ATS COMPATIBLE
                       </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Data Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Radar Comparison */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <Card className="border-white/10 bg-white/5 backdrop-blur-2xl h-full">
                    <CardHeader className="p-8">
                      <CardTitle className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400"><Activity className="h-5 w-5" /></div>
                        Multidimensional Profile
                      </CardTitle>
                      <CardDescription>Industry standard vs. your performance</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80 pb-12">
                       <ResponsiveContainer width="100%" height="100%">
                         <RadarChart data={scoreBreakdownData}>
                           <PolarGrid stroke="rgba(255,255,255,0.05)" />
                           <PolarAngleAxis dataKey="category" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 700 }} />
                           <Radar name="You" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                         </RadarChart>
                       </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Keyword Match PIE */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <Card className="border-white/10 bg-white/5 backdrop-blur-2xl h-full">
                    <CardHeader className="p-8">
                      <CardTitle className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400"><Target className="h-5 w-5" /></div>
                        Keyword Density Match
                      </CardTitle>
                      <CardDescription>Relevance to your target sector</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 pt-0 flex items-center justify-around h-full">
                       <div className="h-56 w-56 relative">
                         <ResponsiveContainer width="100%" height="100%">
                           <PieChart>
                             <Pie data={keywordMatchData} innerRadius={60} outerRadius={85} paddingAngle={10} dataKey="value">
                                {keywordMatchData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />)}
                             </Pie>
                           </PieChart>
                         </ResponsiveContainer>
                         <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="text-3xl font-black text-white">65%</div>
                            <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">MATCH</div>
                         </div>
                       </div>
                       <div className="space-y-4">
                          <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-emerald-400" /> <span className="text-sm font-bold">Identified (65%)</span></div>
                          <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-orange-400" /> <span className="text-sm font-bold">Missing (35%)</span></div>
                       </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Skill Vectors */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-2">
                  <Card className="border-white/10 bg-white/5 backdrop-blur-2xl">
                    <CardHeader className="p-8">
                      <CardTitle className="flex items-center gap-3">
                        < Zap className="h-5 w-5 text-yellow-400" />
                        Technological Proficiency Vectors
                      </CardTitle>
                      <CardDescription>How the machine sees your capabilities</CardDescription>
                    </CardHeader>
                    <CardContent className="p-10 pt-0">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                          {skillsData.map((skill, index) => (
                            <div key={index} className="space-y-3">
                              <div className="flex justify-between items-center text-sm">
                                <span className="font-bold tracking-tight">{skill.skill}</span>
                                <span className="text-blue-400 font-black">{skill.level}%</span>
                              </div>
                              <div className="h-2 rounded-full bg-white/5 overflow-hidden border border-white/5">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${skill.level}%` }} transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }} className="h-full bg-gradient-to-r from-blue-600 to-blue-400" />
                              </div>
                            </div>
                          ))}
                       </div>
                       
                       <div className="mt-16 p-8 rounded-3xl bg-blue-500/5 border border-blue-500/10 flex flex-col md:flex-row items-center gap-8">
                         <div className="p-4 rounded-2xl bg-blue-500/10"><Sparkles className="h-8 w-8 text-blue-400" /></div>
                         <div className="flex-1">
                            <h4 className="text-lg font-black mb-1">Strategic AI Insight</h4>
                            <p className="text-muted-foreground">Integrating <span className="text-white font-bold">TypeScript</span> and <span className="text-white font-bold">CI/CD</span> into your project narratives would likely boost your match score for Fintech and E-commerce sectors by <span className="text-emerald-400 font-bold">+14%</span>.</p>
                         </div>
                         <Button className="h-14 px-10 rounded-2xl bg-white text-black font-black hover:bg-blue-400 transition-colors shrink-0">
                           Optimize Blueprint
                         </Button>
                       </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Keyword Analysis Tags */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  <Card className="border-white/10 bg-white/5 backdrop-blur-2xl">
                    <CardHeader className="p-8"><CardTitle>Keyword Intelligence</CardTitle></CardHeader>
                    <CardContent className="p-8 pt-0 space-y-10">
                      <div>
                        <div className="flex items-center gap-2 mb-5">
                          <CheckCircle className="h-5 w-5 text-emerald-400" />
                          <span className="text-xs uppercase font-black tracking-widest text-muted-foreground">DETECTED NEURAL MATCHES</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {matchedKeywords.map((tag, i) => (
                            <Badge key={i} className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-3 py-1.5 rounded-xl font-bold">#{tag}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-5">
                          <AlertCircle className="h-5 w-5 text-orange-400" />
                          <span className="text-xs uppercase font-black tracking-widest text-muted-foreground">RECOMMENDED SYNERGIES</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {missingKeywords.map((tag, i) => (
                            <Badge key={i} className="bg-orange-500/10 text-orange-400 border-orange-500/20 px-3 py-1.5 rounded-xl font-bold">+{tag}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Compatibility Checks */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                  <Card className="border-white/10 bg-white/5 backdrop-blur-2xl">
                    <CardHeader className="p-8"><CardTitle>Structural Protocol Check</CardTitle></CardHeader>
                    <CardContent className="p-8 pt-0 space-y-4">
                      {atsCompatibilityChecks.map((check, i) => (
                        <div key={i} className={`flex items-center justify-between p-4 rounded-2xl border ${check.passed ? "bg-emerald-500/5 border-emerald-500/20" : "bg-red-500/5 border-red-500/20"}`}>
                           <span className="text-sm font-bold">{check.check}</span>
                           {check.passed ? <Check className="h-5 w-5 text-emerald-400" /> : <X className="h-5 w-5 text-red-400" />}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
                
                {/* Improvement Roadmap */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="lg:col-span-2">
                  <Card className="border-white/10 bg-white/5 backdrop-blur-2xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 w-64 h-64 bg-blue-600/10 blur-[60px] rounded-full" />
                    <CardHeader className="p-8 relative z-10">
                      <CardTitle className="flex items-center gap-3">
                         <Rocket className="h-6 w-6 text-blue-400" />
                         Optimization Roadmap
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-10 pt-0 relative z-10">
                       <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-500/40 before:via-blue-500/10 before:to-transparent">
                          {improvementPriorities.map((item, i) => (
                            <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                               <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-black group-[.is-active]:bg-blue-600 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                  {item.priority}
                               </div>
                               <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-blue-500/50 transition-colors">
                                  <div className="flex items-center justify-between mb-2">
                                     <h3 className="font-black text-white">{item.title}</h3>
                                     <Badge className={getImpactColor(item.impact)}>{item.impact}</Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground italic">&ldquo;{item.description}&rdquo;</p>
                               </div>
                            </div>
                          ))}
                       </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Branding Footer */}
              <div className="mt-20 text-center">
                 <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
                    <Image src="/skill.png" alt="Logo" width={24} height={24} />
                    <span className="text-xs uppercase tracking-[0.3em] font-black text-muted-foreground">Powered by TechieHelp <span className="text-emerald-400">Intelligent Analysis</span> Core</span>
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
