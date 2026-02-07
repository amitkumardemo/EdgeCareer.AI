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
} from "recharts";

const steps = [
  "Parsing your resume",
  "Analyzing your experience",
  "Extracting your skills",
  "Generating recommendations",
];

// Mock data for visualizations (UI only)
const scoreBreakdownData = [
  { category: "Keywords", score: 75, fullMark: 100 },
  { category: "Skills", score: 85, fullMark: 100 },
  { category: "Formatting", score: 90, fullMark: 100 },
  { category: "Experience", score: 70, fullMark: 100 },
  { category: "Projects", score: 65, fullMark: 100 },
  { category: "ATS Compatible", score: 88, fullMark: 100 },
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
      label: "Excellent", 
      color: "text-green-500", 
      bgColor: "bg-green-500/10", 
      borderColor: "border-green-500/30",
      glowColor: "shadow-green-500/50"
    };
    if (score >= 66) return { 
      label: "Good", 
      color: "text-blue-500", 
      bgColor: "bg-blue-500/10", 
      borderColor: "border-blue-500/30",
      glowColor: "shadow-blue-500/50"
    };
    if (score >= 41) return { 
      label: "Average", 
      color: "text-yellow-500", 
      bgColor: "bg-yellow-500/10", 
      borderColor: "border-yellow-500/30",
      glowColor: "shadow-yellow-500/50"
    };
    return { 
      label: "Poor", 
      color: "text-red-500", 
      bgColor: "bg-red-500/10", 
      borderColor: "border-red-500/30",
      glowColor: "shadow-red-500/50"
    };
  };

  const getImpactColor = (impact) => {
    if (impact === "High") return "bg-red-500/10 text-red-500 border-red-500/30";
    if (impact === "Medium") return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30";
    return "bg-green-500/10 text-green-500 border-green-500/30";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-secondary/5"></div>
        <div className="absolute inset-0 bg-grid-white/[0.02]"></div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* TechieHelp Branding */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <Image
                src="/skill.png"
                alt="TechieHelp Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <div className="text-left">
                <h3 className="text-lg font-bold">TechieHelp Institute of AI</h3>
                <p className="text-xs text-muted-foreground">Building Careers with AI & Innovation</p>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
              ATS Resume Analyzer
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              AI-powered resume analysis to beat Applicant Tracking Systems
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-3xl font-bold mb-1">10K+</div>
                  <div className="text-sm text-muted-foreground">Resumes Analyzed</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <div className="text-3xl font-bold mb-1">95%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
                <CardContent className="p-6 text-center">
                  <Sparkles className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <div className="text-3xl font-bold mb-1">AI-Powered</div>
                  <div className="text-sm text-muted-foreground">Smart Analysis</div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Upload & Initial Results Section */}
        {!atsScore && (
          <div className="max-w-6xl mx-auto mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Upload Section */}
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Upload Resume</h2>
                      <p className="text-sm text-muted-foreground">Get instant ATS feedback</p>
                    </div>
                  </div>

                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                      dragActive
                        ? "border-primary bg-primary/5 scale-[1.02]"
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-lg font-semibold mb-2">
                      Drag & drop your resume here
                    </p>
                    <p className="text-muted-foreground mb-4">or</p>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleChooseFile}
                      className="mb-2"
                    >
                      Choose File
                    </Button>
                    <p className="text-xs text-muted-foreground">PDF files only (Max 5MB)</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    {file && (
                      <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                        <p className="text-sm">
                          <strong className="text-primary">Selected:</strong> {file.name}
                        </p>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={handleSubmit}
                    disabled={loading || !file}
                    className="mt-6 w-full"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Analyzing Resume...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Analyze Resume
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Analysis Progress */}
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <AnimatePresence mode="wait">
                    {loading || currentStep < steps.length ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Loader2 className="h-6 w-6 text-primary animate-spin" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold">Analyzing</h2>
                            <p className="text-sm text-muted-foreground">Please wait...</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          {steps.map((step, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                            >
                              {index < currentStep ? (
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                              ) : index === currentStep ? (
                                <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <div className="h-5 w-5 border-2 border-muted-foreground/30 rounded-full"></div>
                              )}
                              <span
                                className={`text-sm font-medium ${
                                  index === currentStep
                                    ? "text-primary"
                                    : index < currentStep
                                    ? "text-green-500"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {step}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="initial"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                      >
                        <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4">
                          <FileCheck className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Ready to Analyze</h3>
                        <p className="text-muted-foreground text-sm">
                          Upload your resume to get detailed ATS feedback
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* ENHANCED POST-ANALYSIS UI */}
        {atsScore !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto space-y-8"
          >
            {/* 1. ENHANCED ATS SCORE OVERVIEW */}
            <Card className="shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-secondary/10 p-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-8">Your ATS Score</h2>

                  {/* Animated Circular Gauge with Glow */}
                  <div className="relative w-64 h-64 mx-auto mb-6">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6, type: "spring" }}
                      className={`absolute inset-0 rounded-full blur-2xl ${getScoreStatus(atsScore).glowColor} shadow-2xl`}
                      style={{ transform: 'scale(1.1)' }}
                    />
                    <svg className="w-64 h-64 transform -rotate-90 relative z-10" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-muted/30"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 45}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - atsScore / 100) }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className={`${getScoreStatus(atsScore).color}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5, type: "spring" }}
                          className={`text-6xl font-bold ${getScoreStatus(atsScore).color}`}
                        >
                          {atsScore}
                        </motion.div>
                        <div className="text-muted-foreground text-lg">/100</div>
                      </div>
                    </div>
                  </div>

                  <Badge className={`${getScoreStatus(atsScore).bgColor} ${getScoreStatus(atsScore).color} border ${getScoreStatus(atsScore).borderColor} text-base px-4 py-2`}>
                    {getScoreStatus(atsScore).label} Profile
                  </Badge>

                  <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                    {atsScore >= 81 ? "Strong Profile with Optimization Potential – Your resume is ATS-ready and competitive!" :
                     atsScore >= 66 ? "Good Foundation with Room for Improvement – A few tweaks will make you stand out." :
                     atsScore >= 41 ? "Average Score – Strategic optimization needed for better ATS performance." :
                     "Needs Significant Improvement – Let's rebuild your resume for ATS success."}
                  </p>
                </div>
              </div>
            </Card>

            {/* 2. ATS SCORE BREAKDOWN - RADAR CHART */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-6 w-6 text-primary" />
                  ATS Score Breakdown
                </CardTitle>
                <CardDescription>
                  Detailed analysis of each scoring factor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Radar Chart */}
                  <div className="h-80">
                    <ChartContainer
                      config={{
                        score: {
                          label: "Score",
                          color: "hsl(var(--primary))",
                        },
                      }}
                      className="w-full h-full"
                    >
                      <RadarChart data={scoreBreakdownData}>
                        <PolarGrid stroke="hsl(var(--border))" />
                        <PolarAngleAxis 
                          dataKey="category" 
                          tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                        />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                        <Radar
                          name="Score"
                          dataKey="score"
                          stroke="hsl(var(--primary))"
                          fill="hsl(var(--primary))"
                          fillOpacity={0.3}
                        />
                      </RadarChart>
                    </ChartContainer>
                  </div>

                  {/* Score Details */}
                  <div className="space-y-4">
                    {scoreBreakdownData.map((item, index) => (
                      <motion.div
                        key={item.category}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{item.category}</span>
                          <span className={`font-bold ${
                            item.score >= 80 ? 'text-green-500' :
                            item.score >= 60 ? 'text-blue-500' :
                            item.score >= 40 ? 'text-yellow-500' : 'text-red-500'
                          }`}>
                            {item.score}%
                          </span>
                        </div>
                        <Progress value={item.score} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          {item.category === "Keywords" && "Alignment with job description keywords"}
                          {item.category === "Skills" && "Relevance of technical and soft skills"}
                          {item.category === "Formatting" && "Resume structure and readability"}
                          {item.category === "Experience" && "Work history quality and impact"}
                          {item.category === "Projects" && "Project descriptions and achievements"}
                          {item.category === "ATS Compatible" && "System readability and parsing"}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 3. KEYWORD MATCH ANALYSIS - DONUT CHART */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-6 w-6 text-primary" />
                    Keyword Match Insights
                  </CardTitle>
                  <CardDescription>
                    Recruiters' ATS systems prioritize keyword alignment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 mb-6">
                    <ChartContainer
                      config={{
                        matched: {
                          label: "Matched",
                          color: "hsl(142, 76%, 36%)",
                        },
                        missing: {
                          label: "Missing",
                          color: "hsl(24, 100%, 50%)",
                        },
                      }}
                      className="w-full h-full"
                    >
                      <PieChart>
                        <Pie
                          data={keywordMatchData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {keywordMatchData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ChartContainer>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                      <div className="text-3xl font-bold text-green-500">65%</div>
                      <div className="text-sm text-muted-foreground">Matched</div>
                    </div>
                    <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                      <div className="text-3xl font-bold text-orange-500">35%</div>
                      <div className="text-sm text-muted-foreground">Missing</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Keyword Tags */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Keywords Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Matched Keywords */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-semibold">Matched Keywords</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {matchedKeywords.map((keyword, index) => (
                        <Badge key={index} variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Missing Keywords */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle className="h-5 w-5 text-orange-500" />
                      <span className="font-semibold">Missing / Recommended Keywords</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {missingKeywords.map((keyword, index) => (
                        <Badge key={index} variant="outline" className="bg-orange-500/10 text-orange-600 border-orange-500/30">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 4. SKILLS & TECH STACK VISUALIZATION */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-6 w-6 text-primary" />
                  Skills Alignment with Industry
                </CardTitle>
                <CardDescription>
                  Your technical skills compared to industry standards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillsData.map((skill, index) => (
                    <motion.div
                      key={skill.skill}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{skill.skill}</span>
                        <span className={`font-bold ${
                          skill.level >= 80 ? 'text-green-500' :
                          skill.level >= 60 ? 'text-blue-500' : 'text-yellow-500'
                        }`}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className="relative">
                        <Progress value={skill.level} className="h-3" />
                        <div className="absolute inset-0 flex items-center px-2">
                          <div 
                            className="h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <p className="text-sm text-blue-600 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <strong>Pro Tip:</strong> Add proficiency levels to your skills section (Beginner, Intermediate, Advanced)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 5. ATS COMPATIBILITY CHECK */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  ATS Compatibility Check
                </CardTitle>
                <CardDescription>
                  Technical requirements for ATS systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  {atsCompatibilityChecks.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        item.passed 
                          ? 'bg-green-500/5 border-green-500/20' 
                          : 'bg-red-500/5 border-red-500/20'
                      }`}
                    >
                      {item.passed ? (
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 flex-shrink-0" />
                      )}
                      <span className={item.passed ? 'text-foreground' : 'text-muted-foreground'}>
                        {item.check}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">ATS Readability Score</span>
                    <span className="text-2xl font-bold text-green-500">88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* 6. EXPERIENCE & PROJECT IMPACT GRAPH */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-6 w-6 text-primary" />
                  Experience & Project Impact
                </CardTitle>
                <CardDescription>
                  How well your experience is presented for ATS
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer
                    config={{
                      score: {
                        label: "Score",
                        color: "hsl(var(--primary))",
                      },
                    }}
                    className="w-full h-full"
                  >
                    <BarChart data={experienceImpactData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="category" 
                        tick={{ fill: 'hsl(var(--foreground))', fontSize: 11 }}
                        angle={-15}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                      <ChartTooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-background border rounded-lg p-3 shadow-lg">
                                <p className="font-semibold">{payload[0].payload.category}</p>
                                <p className="text-primary font-bold">{payload[0].value}%</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {payload[0].payload.category === "Quantified Results" && 
                                    "Projects with metrics perform better in ATS scans"}
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar 
                        dataKey="score" 
                        fill="hsl(var(--primary))" 
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* 7. IMPROVEMENT PRIORITY TIMELINE */}
            <Card className="shadow-lg border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="h-6 w-6 text-primary" />
                  What to Fix First
                </CardTitle>
                <CardDescription>
                  Prioritized action plan to boost your ATS score
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {improvementPriorities.map((item, index) => (
                    <motion.div
                      key={item.priority}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      <div className="flex gap-4">
                        {/* Priority Number */}
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${
                          item.priority === 1 ? 'bg-red-500 text-white' :
                          item.priority === 2 ? 'bg-orange-500 text-white' :
                          item.priority === 3 ? 'bg-yellow-500 text-white' :
                          'bg-green-500 text-white'
                        }`}>
                          {item.priority}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-8 border-l-2 border-dashed border-muted pl-6 -ml-6">
                          <div className="bg-muted/50 rounded-lg p-4 hover:bg-muted transition-colors">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <h3 className="font-semibold text-lg">{item.title}</h3>
                              <Badge className={`${getImpactColor(item.impact)} border`}>
                                {item.impact} Impact
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 8. HIGH-CONVERSION CTA SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-lg hover:shadow-xl transition-shadow border-2 border-primary/20 hover:border-primary/40">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Build ATS-Optimized Resume</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Use our AI Resume Builder with ATS templates
                  </p>
                  <Button className="w-full gap-2" onClick={() => window.location.href = '/resume'}>
                    Start Building
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-lg hover:shadow-xl transition-shadow border-2 border-green-500/20 hover:border-green-500/40">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Fix Resume with AI</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get personalized fixes powered by TechieHelp AI
                  </p>
                  <Button variant="outline" className="w-full gap-2 border-green-500/30 hover:bg-green-500/10">
                    Get AI Fixes
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-lg hover:shadow-xl transition-shadow border-2 border-blue-500/20 hover:border-blue-500/40">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Re-analyze After Changes</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload updated resume to track improvements
                  </p>
                  <Button variant="outline" className="w-full gap-2 border-blue-500/30 hover:bg-blue-500/10" onClick={() => window.location.reload()}>
                    Upload Again
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* TechieHelp Branding Footer */}
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Image
                    src="/skill.png"
                    alt="TechieHelp Logo"
                    width={48}
                    height={48}
                    className="h-12 w-auto"
                  />
                  <div className="text-left">
                    <h3 className="text-xl font-bold">Powered by TechieHelp Institute of AI</h3>
                    <p className="text-sm text-muted-foreground">Building Careers with AI, Innovation & Industry Readiness</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-background/50 rounded-lg border border-border max-w-3xl mx-auto">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Disclaimer:</strong> This ATS score is generated using AI-based analysis aligned with industry hiring systems. 
                    Final recruiter decisions may vary based on specific company requirements and job descriptions. 
                    Use this tool as a guide to optimize your resume for better ATS compatibility.
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>Secure & Private</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span>Instant Analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    <span>Industry-Grade</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
