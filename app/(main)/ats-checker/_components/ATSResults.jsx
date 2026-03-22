"use client";

import { motion } from "framer-motion";
import { 
  Activity, 
  Target, 
  Zap, 
  CheckCircle, 
  AlertCircle, 
  Sparkles, 
  BarChart3, 
  Clock, 
  ArrowRight,
  TrendingDown,
  Star,
  FileCheck,
  TrendingUp,
  Award
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function ATSResults({ atsScore, feedback }) {
  if (!atsScore) return null;

  const getScoreStatus = (score) => {
    if (score >= 81) return { label: "Elite", color: "text-emerald-400", bgColor: "bg-emerald-500/10", border: "border-emerald-500/20", glow: "shadow-emerald-500/20" };
    if (score >= 66) return { label: "Strong", color: "text-blue-400", bgColor: "bg-blue-500/10", border: "border-blue-500/20", glow: "shadow-blue-500/20" };
    if (score >= 41) return { label: "Average", color: "text-yellow-400", bgColor: "bg-yellow-500/10", border: "border-yellow-500/20", glow: "shadow-yellow-500/20" };
    return { label: "Critical", color: "text-red-400", bgColor: "bg-red-500/10", border: "border-red-500/20", glow: "shadow-red-500/20" };
  };

  const status = getScoreStatus(atsScore);

  // Mock data for visualizations (UI only, inherited from original)
  const radarData = [
    { category: "Keywords", score: 75 },
    { category: "Skills", score: 85 },
    { category: "Formatting", score: 90 },
    { category: "Experience", score: 70 },
    { category: "Projects", score: 65 },
    { category: "Compatibility", score: 88 },
  ];

  const keywordPieData = [
    { name: "Matched", value: 65, color: "#10b981" },
    { name: "Missing", value: 35, color: "#f59e0b" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20 space-y-10">
      {/* 1. Score Overview Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-white/10 bg-white/5 backdrop-blur-2xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
          
          <CardContent className="p-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="text-center lg:text-left space-y-6">
                <Badge className={`${status.bgColor} ${status.color} border ${status.border} px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-widest`}>
                  {status.label} Profile Detected
                </Badge>
                
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                  Your Resume Performance <br />
                  <span className={status.color}>Analysis Report</span>
                </h2>
                
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                  {atsScore >= 81 ? "Your resume is highly optimized for enterprise ATS. Minor formatting tweaks could push it to perfection." :
                   atsScore >= 66 ? "Solid foundation. To rank higher, focus on quantifying your impact and adding missing industry keywords." :
                   "Strategic overhaul recommended. The digital gatekeepers may struggle to parse your unique contributions."}
                </p>

                <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
                   <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-sm font-medium">
                     <Clock className="h-4 w-4 text-blue-400" />
                     <span>Analysed 2 min ago</span>
                   </div>
                   <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-sm font-medium text-emerald-400">
                     <FileCheck className="h-4 w-4" />
                     <span>ATS Ready</span>
                   </div>
                </div>
              </div>

              {/* Advanced Circular Progress */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className={`absolute inset-0 rounded-full blur-[60px] ${status.bgColor} ${status.glow} opacity-60`}
                  />
                  
                  <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="transparent"
                      className="text-white/5"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="42"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="transparent"
                      strokeDasharray="263.89"
                      initial={{ strokeDashoffset: 263.89 }}
                      animate={{ strokeDashoffset: 263.89 * (1 - atsScore / 100) }}
                      transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                      className={status.color}
                      strokeLinecap="round"
                    />
                  </svg>
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center relative z-20">
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className={`text-7xl lg:text-8xl font-black ${status.color}`}
                    >
                      {atsScore}
                    </motion.span>
                    <span className="text-xl font-bold text-muted-foreground -mt-2">/ 100</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 2. Detailed Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radar Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-white/10 bg-white/5 backdrop-blur-2xl h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                 <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                   <Activity className="h-5 w-5" />
                 </div>
                 Multidimensional Scoring
              </CardTitle>
              <CardDescription>Performance across 6 key evaluation metrics</CardDescription>
            </CardHeader>
            <CardContent className="h-80 pb-10">
               <ResponsiveContainer width="100%" height="100%">
                 <RadarChart data={radarData}>
                   <PolarGrid stroke="rgba(255,255,255,0.1)" />
                   <PolarAngleAxis dataKey="category" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} />
                   <Radar
                     name="ATS Analysis"
                     dataKey="score"
                     stroke="#10b981"
                     fill="#10b981"
                     fillOpacity={0.2}
                   />
                 </RadarChart>
               </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Keyword Match */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-white/10 bg-white/5 backdrop-blur-2xl h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                 <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                   <Target className="h-5 w-5" />
                 </div>
                 Keyword Alignment
              </CardTitle>
              <CardDescription>Matching your narrative with technical needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-8 items-center h-full">
                <div className="h-52">
                   <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                       <Pie
                         data={keywordPieData}
                         innerRadius={60}
                         outerRadius={80}
                         paddingAngle={8}
                         dataKey="value"
                       >
                         {keywordPieData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                         ))}
                       </Pie>
                     </PieChart>
                   </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                   <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                      <div className="text-2xl font-bold text-emerald-400">65%</div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Matched</div>
                   </div>
                   <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20">
                      <div className="text-2xl font-bold text-orange-400">35%</div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Missing</div>
                   </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 3. Skill Progress & Insights */}
      <motion.div
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.4 }}
      >
        <Card className="border-white/10 bg-white/5 backdrop-blur-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
               <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                 <Zap className="h-5 w-5" />
               </div>
               Growth Vector Analysis
            </CardTitle>
            <CardDescription>Identifying critical skill gaps and optimization zones</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="space-y-6">
                 <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Core Technical Proficiency</h4>
                 {[
                   { name: "JavaScript", val: 90 },
                   { name: "React Framework", val: 85 },
                   { name: "Backend Architecture", val: 75 },
                   { name: "Data Structures", val: 80 }
                 ].map((skill, i) => (
                   <div key={i} className="space-y-2">
                     <div className="flex justify-between text-sm">
                       <span className="font-bold">{skill.name}</span>
                       <span className="text-blue-400 font-black">{skill.val}%</span>
                     </div>
                     <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.val}%` }}
                          transition={{ duration: 1, delay: 0.8 + i * 0.1 }}
                          className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
                        />
                     </div>
                   </div>
                 ))}
               </div>

               <div className="p-8 rounded-3xl bg-blue-500/5 border border-blue-500/10 flex flex-col justify-center gap-6">
                  <div className="flex items-start gap-4">
                     <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 mt-1">
                        <Star className="h-4 w-4" />
                     </div>
                     <p className="text-sm leading-relaxed text-muted-foreground">
                       <strong className="text-white">Pro Insight:</strong> Your project bullet points are strong, but adding <span className="text-emerald-400">quantifiable metrics</span> (e.g. "improved speed by 40%") would boost your compatibility score by up to 12%.
                     </p>
                  </div>
                  <div className="flex items-start gap-4">
                     <div className="p-2 rounded-lg bg-orange-500/20 text-orange-400 mt-1">
                        <AlertCircle className="h-4 w-4" />
                     </div>
                     <p className="text-sm leading-relaxed text-muted-foreground">
                       <strong className="text-white">Optimization Warning:</strong> 3 critical industry keywords (TypeScript, CI/CD, Testing) were not detected in your narrative context.
                     </p>
                  </div>
                  <button className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors font-bold group mt-4">
                     Improve with AI Agent
                     <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
               </div>
             </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
