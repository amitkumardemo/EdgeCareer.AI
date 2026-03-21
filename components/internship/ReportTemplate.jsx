"use client";

import React, { useRef } from "react";
import { 
  Building2, 
  User, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Award, 
  FileText, 
  Briefcase, 
  Mail, 
  Linkedin, 
  Github, 
  Globe, 
  Clock, 
  Layout, 
  BarChart3, 
  Code2, 
  Zap,
  Download,
  Printer
} from "lucide-react";
import { format } from "date-fns";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function ReportTemplate({ data }) {
  const reportRef = useRef(null);

  const handleDownloadPDF = async () => {
    const element = reportRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(`${data.student.name}_Internship_Report.pdf`);
  };

  if (!data) return null;

  return (
    <div className="flex flex-col items-center bg-gray-50 dark:bg-gray-900 min-h-screen p-4 md:p-8">
      {/* Controls */}
      <div className="w-full max-w-[210mm] mb-6 flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Internship Report Preview</h2>
          <p className="text-sm text-gray-500">Official document preview</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={() => window.print()} 
            variant="outline" 
            className="rounded-xl gap-2 h-11"
          >
            <Printer className="w-4 h-4" /> Print
          </Button>
          <Button 
            onClick={handleDownloadPDF} 
            className="rounded-xl gap-2 h-11 bg-primary hover:bg-primary/90"
          >
            <Download className="w-4 h-4" /> Download PDF
          </Button>
        </div>
      </div>

      {/* A4 Document Container */}
      <div 
        ref={reportRef}
        className="w-[210mm] min-h-[297mm] bg-white text-gray-900 shadow-2xl p-[15mm] flex flex-col items-stretch overflow-hidden print:shadow-none print:m-0"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Header Section */}
        <div className="flex justify-between items-start border-b-2 border-primary/20 pb-8 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <Zap className="w-10 h-10 fill-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-gray-900 leading-none">TECHIEHELP</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary mt-1">Institute of AI</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold uppercase tracking-tight text-gray-900">Internship Report</h2>
            <p className="text-sm font-medium text-gray-500 mt-1">Report ID: TH-RP-{data.certificate?.serialNo || "PENDING"}</p>
          </div>
        </div>

        {/* Cover Section Card */}
        <div className="bg-primary/5 rounded-3xl p-10 mb-10 border border-primary/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="relative z-10">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Internship Completion Report</p>
            <h1 className="text-4xl font-black text-gray-900 mb-6 leading-tight">
              {data.student.name}
            </h1>
            
            <div className="grid grid-cols-2 gap-8 mt-10">
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Internship Program</p>
                <p className="font-bold text-gray-800 text-lg">{data.internship.programName}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Domain</p>
                <p className="font-bold text-gray-800 text-lg">{data.internship.domain}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Duration</p>
                <p className="font-bold text-gray-800 text-lg">{data.internship.duration} Months</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Completion Date</p>
                <p className="font-bold text-gray-800 text-lg">
                  {data.performance.completionDate ? format(new Date(data.performance.completionDate), "MMMM dd, yyyy") : "Processing"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs/Grid */}
        <div className="grid grid-cols-12 gap-10">
          {/* Left Column: Student & Info */}
          <div className="col-span-5 space-y-10">
            {/* Student Profile Info */}
            <section>
              <h3 className="text-xs font-bold uppercase text-primary tracking-widest mb-4 flex items-center gap-2">
                <User className="w-3 h-3" /> Student Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0">
                    <Building2 className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">College / Institute</p>
                    <p className="text-sm font-bold text-gray-800">{data.student.college}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Department</p>
                    <p className="text-sm font-bold text-gray-800">{data.student.department}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0">
                    <Mail className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</p>
                    <p className="text-sm font-bold text-gray-800">{data.student.email}</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  {data.student.linkedin && (
                    <div className="w-8 h-8 rounded-lg bg-[#0077b5]/10 flex items-center justify-center text-[#0077b5]">
                      <Linkedin className="w-4 h-4" />
                    </div>
                  )}
                  {data.student.github && (
                    <div className="w-8 h-8 rounded-lg bg-gray-900/10 flex items-center justify-center text-gray-900">
                      <Github className="w-4 h-4" />
                    </div>
                  )}
                  {data.student.portfolio && (
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Globe className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Performance Metrics */}
            <section>
              <h3 className="text-xs font-bold uppercase text-primary tracking-widest mb-4 flex items-center gap-2">
                <BarChart3 className="w-3 h-3" /> Performance Metrics
              </h3>
              <div className="p-6 rounded-3xl border border-gray-100 bg-gray-50/50 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] font-bold text-gray-500 uppercase">Overall Performance</span>
                    <span className="text-sm font-black text-primary">{data.performance.performScore}%</span>
                  </div>
                  <Progress value={data.performance.performScore} className="h-2 rounded-full bg-white border border-gray-100" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] font-bold text-gray-500 uppercase">Attendance Rate</span>
                    <span className="text-sm font-black text-gray-800">{data.performance.attendancePct}%</span>
                  </div>
                  <Progress value={data.performance.attendancePct} className="h-2 rounded-full bg-white border border-gray-100" />
                </div>

                <div className="flex justify-between pt-2">
                  <div className="text-center">
                    <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Tasks Done</p>
                    <p className="text-lg font-black text-gray-800">{data.performance.tasksCompleted}/{data.performance.totalTasks}</p>
                  </div>
                  <div className="text-center border-l border-gray-200 px-6">
                    <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Present</p>
                    <p className="text-lg font-black text-gray-800">{data.performance.presentDays} Days</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Experience & Project */}
          <div className="col-span-7 space-y-10">
            {/* Internship Overview */}
            <section>
              <h3 className="text-xs font-bold uppercase text-primary tracking-widest mb-4 flex items-center gap-2">
                <Layout className="w-3 h-3" /> Internship Overview
              </h3>
              <div className="bg-white rounded-3xl border border-gray-100 p-6">
                <p className="text-sm text-gray-600 leading-relaxed italic">
                  "{data.internship.description || "The TechieHelp Industrial Internship Program is designed to provide students with real-world exposure to software development processes and emerging technologies."}"
                </p>
                <div className="flex items-center gap-2 mt-6 p-4 rounded-2xl bg-primary/5 border border-primary/5">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Industry Mentor</p>
                    <p className="text-sm font-bold text-gray-800">{data.internship.mentorName}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Tasks Summary */}
            <section>
              <h3 className="text-xs font-bold uppercase text-primary tracking-widest mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3" /> Key Milestones & Tasks
              </h3>
              <div className="rounded-3xl border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-5 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Module / Task</th>
                      <th className="px-5 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Score</th>
                      <th className="px-5 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.tasks.slice(0, 8).map((task, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-5 py-3">
                          <p className="text-xs font-bold text-gray-800">{task.title}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{task.dueDate ? format(new Date(task.dueDate), "MMM dd, yyyy") : "N/A"}</p>
                        </td>
                        <td className="px-5 py-3 text-center">
                          <span className="text-xs font-black text-gray-700">{task.score || "--"}</span>
                          <span className="text-[10px] text-gray-400">/{task.maxScore}</span>
                        </td>
                        <td className="px-5 py-3 text-right">
                          <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-md ${
                            task.status === "APPROVED" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                          }`}>
                            {task.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>

        {/* Spacer to push signature to bottom */}
        <div className="flex-grow min-h-[40px]"></div>

        {/* Footer & Signatures */}
        <div className="mt-12">
          {/* Verification Section */}
          <div className="flex justify-between items-center p-6 border-t border-b border-gray-100 mb-12">
            <div>
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2 text-center">Scan to Verify</p>
              <div className="w-24 h-24 border border-gray-100 p-2 rounded-xl flex items-center justify-center bg-gray-50">
                {/* QR Code Placeholder */}
                <Globe className="w-16 h-16 text-gray-200" />
              </div>
            </div>
            <div className="max-w-[300px] text-right">
              <p className="text-[11px] font-bold text-gray-800 leading-relaxed mb-1">
                TechieHelp Institute of AI
              </p>
              <p className="text-[10px] text-gray-400 leading-relaxed">
                Empowering the next generation of AI developers. An ISO 9001:2015 Certified Organization.
              </p>
              <p className="text-[10px] font-bold text-primary mt-2">verify.techiehelp.info</p>
            </div>
          </div>

          {/* Signature Grid */}
          <div className="grid grid-cols-3 gap-10 mt-10">
            <div className="text-center">
              <div className="h-10 border-b border-gray-300 mx-4 mb-3"></div>
              <p className="text-xs font-black text-gray-800 uppercase tracking-widest">Mentor</p>
              <p className="text-[9px] text-gray-400 uppercase mt-1">Industrial Expert</p>
            </div>
            <div className="text-center">
              <div className="h-10 border-b border-gray-300 mx-4 mb-3"></div>
              <p className="text-xs font-black text-gray-800 uppercase tracking-widest">HR Manager</p>
              <p className="text-[9px] text-gray-400 uppercase mt-1">Human Resources</p>
            </div>
            <div className="text-center">
              <div className="h-10 border-b border-gray-300 mx-4 mb-3"></div>
              <p className="text-xs font-black text-gray-800 uppercase tracking-widest">Founder</p>
              <p className="text-[9px] text-gray-400 uppercase mt-1">TechieHelp AI</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }
          .no-print {
            display: none !important;
          }
        }
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
      `}</style>
    </div>
  );
}
