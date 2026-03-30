"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { 
  Award, BarChart3, Star, Target, Download, Share2, FileText, CheckCircle2,
  TrendingUp, RefreshCw, Briefcase, Calendar, ShieldCheck
} from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { format } from "date-fns";
import PerformancePdfTemplate from "./PerformancePdfTemplate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";

export default function PerformanceDashboard({ data }) {
  const [downloading, setDownloading] = useState(false);
  const pdfRef = useRef(null);

  const handleDownload = async () => {
    if (!pdfRef.current) return;
    setDownloading(true);
    toast.info("Generating professional evaluation report...");

    try {
      const container = pdfRef.current;
      if (!container) return;
      
      const page1 = container.querySelector("#pdf-page-1");
      const page2 = container.querySelector("#pdf-page-2");

      if (!page1 || !page2) throw new Error("PDF pages not found");

      const canvasOptions = {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        windowWidth: 1200,
      };

      // Capture Page 1
      const canvas1 = await html2canvas(page1, canvasOptions);
      if (canvas1.width === 0) throw new Error("Canvas 1 capture failed");

      // Capture Page 2
      const canvas2 = await html2canvas(page2, canvasOptions);
      if (canvas2.width === 0) throw new Error("Canvas 2 capture failed");

      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true });
      const imgWidth = 210;
      const imgHeight = 297; // A4 standard

      // Add Page 1
      const imgData1 = canvas1.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData1, "JPEG", 0, 0, imgWidth, imgHeight);

      // Add Page 2
      pdf.addPage();
      const imgData2 = canvas2.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData2, "JPEG", 0, 0, imgWidth, imgHeight);

      pdf.save(`${data.studentData.name.replace(/\s+/g, '_')}_Performance_Evaluation.pdf`);
      toast.success("Downloaded 2-page report successfully!");
    } catch (e) {
      console.error(e);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const scoreMap = { "Strongly Agree": 100, "Agree": 75, "Disagree": 40 };
  const getScoreColor = (score) => {
    if (score >= 90) return "bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]";
    if (score >= 70) return "bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]";
    return "bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]";
  };

  const getBadgeColor = (badge) => {
    if (badge.includes("Outstanding")) return "text-purple-400 bg-purple-500/10 border-purple-500/20";
    if (badge.includes("Strong")) return "text-blue-400 bg-blue-500/10 border-blue-500/20";
    if (badge.includes("Average")) return "text-green-400 bg-green-500/10 border-green-500/20";
    return "text-amber-400 bg-amber-500/10 border-amber-500/20";
  };

  return (
    <div className="space-y-8 pb-10">
      
      {/* 1. Header & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Performance Evaluation</h1>
          <p className="text-sm text-gray-500 mt-1">Detailed competency analysis and feedback from your manager.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => toast.success("Public link copied to clipboard!")} className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 font-bold text-sm transition-all">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button 
            onClick={handleDownload}
            disabled={downloading} 
            className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-black rounded-xl border border-primary/50 font-black text-sm transition-all truncate"
          >
            {downloading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            {downloading ? "Generating PDF..." : "Download Official PDF"}
          </button>
        </div>
      </div>

      {/* 2. Overview Card */}
      <div className="relative bg-gradient-to-br from-[#0f172a] via-[#0b0f19] to-[#030712] border border-white/10 rounded-3xl p-8 overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-primary/10 transition-all duration-700" />
        
        <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-10">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center border border-white/10 overflow-hidden shadow-xl">
                <Image src="/skill.png" alt="TechieHelp" width={40} height={40} className="object-cover" />
              </div>
              <div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border mb-1 ${getBadgeColor(data.performanceBadge)}`}>
                  <Star className="w-3 h-3" /> {data.performanceBadge}
                </span>
                <h2 className="text-2xl font-black text-white">{data.batchData.program?.title || data.batchData.domain}</h2>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-1.5 mb-1"><Briefcase className="w-3 h-3" /> Batch</p>
                <p className="text-sm font-bold text-gray-200">{data.batchData.name}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-1.5 mb-1"><Calendar className="w-3 h-3" /> Duration</p>
                <p className="text-sm font-bold text-gray-200">{data.batchData.duration} Months</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-1.5 mb-1"><Target className="w-3 h-3" /> Score</p>
                <p className="text-sm font-bold text-gray-200">{data.overallScore}/100</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-1.5 mb-1"><ShieldCheck className="w-3 h-3" /> Progress</p>
                <p className="text-sm font-bold text-gray-200">{data.progress?.progressPct || 0}% Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 3. Performance Breakdown (Left Column 8/12) */}
        <div className="lg:col-span-8 space-y-8">
          
          <div className="bg-[#0b0f19] border border-white/5 rounded-3xl p-8 shadow-xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-8 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" /> Core Competency Breakdown & Feedback
            </h3>
            
            <div className="space-y-10">
              {[
                { 
                  title: "Technical Knowledge & Problem Solving",
                  metrics: [
                    { label: "Technical Skills & Knowledge", val: data.evaluation.technicalSkills },
                    { label: "Learning Ability", val: data.evaluation.learningAbility },
                    { label: "Initiative & Problem Solving", val: data.evaluation.initiative },
                  ],
                  comment: data.evaluation.technicalComments
                },
                { 
                  title: "Practical Implementation & Coding",
                  metrics: [
                    { label: "Practical Implementation", val: data.evaluation.practicalImplementation },
                  ],
                  comment: data.evaluation.practicalComments
                },
                { 
                  title: "Communication & Documentation",
                  metrics: [
                    { label: "Communication Skills", val: data.evaluation.communication },
                  ],
                  comment: data.evaluation.communicationComments
                },
                { 
                  title: "Teamwork & Collaboration",
                  metrics: [
                    { label: "Teamwork & Collaboration", val: data.evaluation.teamwork },
                  ],
                  comment: data.evaluation.teamworkComments
                },
                { 
                  title: "Time Management & Discipline",
                  metrics: [
                    { label: "Time Management", val: data.evaluation.timeManagement },
                    { label: "Professional Ethics & Conduct", val: data.evaluation.professionalEthics },
                  ],
                  comment: data.evaluation.disciplineComments
                },
              ].map((section, sidx) => (
                <div key={sidx} className="space-y-4 border-l-2 border-white/5 pl-6 relative">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#0b0f19] border-2 border-primary/40 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-4">{section.title}</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-4">
                    {section.metrics.map((item, idx) => {
                      const numScore = scoreMap[item.val] || 0;
                      return (
                        <div key={idx} className="group">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-bold text-gray-400">{item.label}</span>
                            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                              item.val === "Strongly Agree" ? "bg-green-500/10 text-green-400" :
                              item.val === "Agree" ? "bg-blue-500/10 text-blue-400" : "bg-amber-500/10 text-amber-400"
                            }`}>{item.val}</span>
                          </div>
                          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <div 
                              className={`h-full rounded-full transition-all duration-1000 ${getScoreColor(numScore)}`} 
                              style={{ width: `${numScore}%` }} 
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {section.comment && (
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 group hover:border-primary/20 transition-all">
                      <p className="text-xs text-gray-400 leading-relaxed italic">
                        <span className="text-primary font-bold mr-1 block text-[10px] uppercase not-italic mb-1 tracking-tighter opacity-70">Category Feedback:</span>
                        "{section.comment}"
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0b0f19] to-[#0f172a] border border-white/5 rounded-3xl p-8 shadow-xl space-y-8">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" /> Final Performance Narrative
            </h3>
            
            {(data.evaluation.strengths || data.evaluation.growthAreas) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/10">
                  <p className="text-[10px] text-green-400 uppercase font-black tracking-widest mb-3 flex items-center gap-2">
                    <Star className="w-3.5 h-3.5" /> Key Capabilities & Strengths
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {data.evaluation.strengths || "The intern demonstrated consistent professional growth and technical proficiency during the evaluation period."}
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                  <p className="text-[10px] text-primary uppercase font-black tracking-widest mb-3 flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5" /> Areas for Further Growth
                  </p>
                  <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                    {data.evaluation.growthAreas || "Continual exposure to advanced software architectures and collaborative workflows will further enhance professional readiness."}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-3">Overall Remarks</p>
                <p className="text-sm text-gray-300 leading-relaxed italic border-l-2 border-primary/50 pl-4 py-1">
                  "{data.evaluation.comments || "No specific comments provided."}"
                </p>
              </div>
            )}
            
            <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Award className="w-20 h-20" />
              </div>
              <p className="text-xs text-primary uppercase font-bold tracking-widest mb-2">Final Conclusion</p>
              <p className="text-lg text-white font-black leading-tight tracking-tight">
                {data.evaluation.summary || "Student exhibited satisfactory performance throughout."}
              </p>
            </div>
          </div>

        </div>

        {/* 4. Visual Analytics & AI Insight (Right Column 4/12) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Radar Chart */}
          <div className="bg-[#0b0f19] border border-white/5 rounded-3xl p-6 shadow-xl flex flex-col items-center">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 w-full text-left">Skill Matrix</h3>
            <div className="w-full h-64 -ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data.radarData}>
                  <PolarGrid stroke="#ffffff20" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 10, fontWeight: 700 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Student" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '12px' }}
                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                    formatter={(val) => [`${val}/100`, 'Score']}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-gradient-to-b from-[#0b0f19] to-[#0f172a] border border-white/5 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-primary to-purple-500" />
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" /> Automated Insights
            </h3>
            
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-xs font-bold text-gray-300">Key Strengths</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed ml-6 rounded-lg bg-green-500/5 p-3 border border-green-500/10">
                  {data.aiFeedback.strengthsText}
                </p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-gray-300">Growth Opportunities</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed ml-6 rounded-lg bg-amber-500/5 p-3 border border-amber-500/10">
                  {data.aiFeedback.improvementsText}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-3xl p-6 border border-primary/20 text-center">
            <Award className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-xs text-gray-400 mb-4">Official Verification ID: <br/><strong className="text-primary truncate block mt-1">{data.applicationId}</strong></p>
            <p className="text-[10px] text-gray-500">This evaluation report is electronically generated and can be verified at <span className="text-gray-300">techiehelp.info/verify</span></p>
          </div>

        </div>
      </div>

      {/* Hidden off-screen Component for PDF Generation */}
      <div style={{ position: "absolute", top: "-10000px", left: "-10000px", zIndex: -100 }}>
        <div ref={pdfRef} style={{ width: "1200px", background: "white" }}>
          <PerformancePdfTemplate data={data} scoreMap={scoreMap} />
        </div>
      </div>

    </div>
  );
}
