import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export default function PerformancePdfTemplate({ data, scoreMap }) {
  if (!data) return null;

  return (
    <div className="w-[1200px] bg-white text-black shrink-0 font-sans">
      {/* ── Page 1 Content ── */}
      <div id="pdf-page-1" className="p-[80px]" style={{ minHeight: "1697px" }}>
        {/* Header section with logos */}
        <div className="flex justify-between items-start border-b-4 border-blue-600 pb-10 mb-12">
          <div className="flex items-center gap-6">
            <img src="/skill.png" alt="TechieHelp Logo" className="w-32 h-auto object-contain" />
            <div className="border-l-2 border-gray-300 pl-6">
              <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-none mb-2">TECHIEHELP</h1>
              <p className="text-lg font-bold text-blue-600 uppercase tracking-[0.2em]">Institute of AI</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <img src="/image (3).png" alt="ISO Logo" className="h-20 w-auto object-contain" />
            <img src="/image (4).png" alt="MSME Logo" className="h-20 w-auto object-contain" />
            <img src="/internship-1.png" alt="Internship Portal" className="h-20 w-auto object-contain" />
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 uppercase tracking-widest border-2 border-gray-900 inline-block px-8 py-4 bg-gray-50">
            Intern Performance Evaluation Report
          </h2>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-8 mb-16 bg-blue-50/50 p-8 border border-blue-100 rounded-3xl">
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Candidate Name</p>
            <p className="text-2xl font-black text-gray-900">{data.studentData.name}</p>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Institution</p>
            <p className="text-2xl font-black text-gray-900">{data.studentData.college}</p>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Internship Domain</p>
            <p className="text-2xl font-black text-gray-900">{data.batchData.domain}</p>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Evaluation Period</p>
            <p className="text-2xl font-black text-gray-900">
              {format(new Date(data.batchData.startDate), "MMM yyyy")} - {format(new Date(data.batchData.endDate), "MMM yyyy")}
            </p>
          </div>
        </div>

        {/* Detailed Assessment */}
        <div className="space-y-8">
          {[
            { 
              title: "1. Technical Knowledge & Problem Solving", 
              metrics: [
                { label: "Technical Skills", val: data.evaluation.technicalSkills },
                { label: "Learning Ability", val: data.evaluation.learningAbility },
                { label: "Initiative", val: data.evaluation.initiative },
              ],
              comment: data.evaluation.technicalComments
            },
            { 
              title: "2. Practical Implementation", 
              metrics: [
                { label: "Implementation & Standards", val: data.evaluation.practicalImplementation },
              ],
              comment: data.evaluation.practicalComments
            },
            { 
              title: "3. Communication Skills", 
              metrics: [
                { label: "Reporting & Progress", val: data.evaluation.communication },
              ],
              comment: data.evaluation.communicationComments
            },
          ].map((section, sidx) => (
            <div key={sidx} className="p-8 bg-gray-50 border border-gray-200 rounded-3xl">
              <h4 className="text-lg font-black text-gray-900 mb-6 uppercase flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-bold">{sidx + 1}</span>
                {section.title}
              </h4>
              <div className="grid grid-cols-2 gap-x-12 gap-y-4 mb-6">
                {section.metrics.map((m, midx) => (
                  <div key={midx} className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-sm font-bold text-gray-600">{m.label}</span>
                    <span className="text-xs font-black uppercase text-blue-600">{m.val}</span>
                  </div>
                ))}
              </div>
              {section.comment && (
                <div className="p-4 bg-white border-l-4 border-blue-600 rounded-r-xl">
                  <p className="text-sm text-gray-700 italic">"{section.comment}"</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Page 2 Content ── */}
      <div id="pdf-page-2" className="p-[80px]" style={{ minHeight: "1697px" }}>
        <div className="space-y-8 mb-16">
          {[
            { 
              title: "4. Teamwork & Collaboration", 
              metrics: [ { label: "Professionalism", val: data.evaluation.teamwork } ],
              comment: data.evaluation.teamworkComments
            },
            { 
              title: "5. Time Management & Discipline", 
              metrics: [
                { label: "Punctuality", val: data.evaluation.timeManagement },
                { label: "Conduct", val: data.evaluation.professionalEthics },
              ],
              comment: data.evaluation.disciplineComments
            },
          ].map((section, sidx) => (
            <div key={sidx} className="p-8 bg-gray-50 border border-gray-200 rounded-3xl">
              <h4 className="text-lg font-black text-gray-900 mb-6 uppercase flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-bold">{sidx + 4}</span>
                {section.title}
              </h4>
              <div className="grid grid-cols-2 gap-x-12 gap-y-4 mb-6">
                {section.metrics.map((m, midx) => (
                  <div key={midx} className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-sm font-bold text-gray-600">{m.label}</span>
                    <span className="text-xs font-black uppercase text-blue-600">{m.val}</span>
                  </div>
                ))}
              </div>
              {section.comment && (
                <div className="p-4 bg-white border-l-4 border-blue-600 rounded-r-xl">
                  <p className="text-sm text-gray-700 italic">"{section.comment}"</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Narrative & Conclusion */}
        <div className="space-y-8 mb-16">
          <div className="p-10 bg-white border-2 border-gray-100 rounded-[40px]">
            <h3 className="text-xl font-black text-gray-900 uppercase tracking-widest mb-6 text-center border-b pb-4">Key Capabilities & Strengths</h3>
            <p className="text-lg text-gray-700 leading-relaxed text-center px-10">
              {data.evaluation.strengths || "The candidate demonstrated exceptional dedication and a strong learning attitude. They effectively completed assigned tasks, showed good problem-solving skills, and maintained professional conduct throughout the internship."}
            </p>
          </div>
          <div className="p-10 bg-gray-900 text-white rounded-[40px]">
            <h3 className="text-xl font-black uppercase tracking-widest mb-6 text-center border-b border-white/10 pb-4">Areas for Growth</h3>
            <div className="text-lg leading-relaxed whitespace-pre-line text-center px-10 opacity-90">
              {data.evaluation.growthAreas || "1. Advanced Technical Frameworks\n2. System Architecture & Scalability\n3. Proactive Leadership in Projects"}
            </div>
          </div>
        </div>

        <div className="mb-24 p-12 bg-blue-600 text-white rounded-[40px] text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] opacity-80 mb-4">Official Performance Rating</p>
          <h3 className="text-6xl font-black tracking-tighter mb-4">{data.performanceBadge}</h3>
          <p className="text-2xl font-medium italic opacity-90">"{data.evaluation.summary || "Student exhibited satisfactory performance throughout and is recommended for advanced technical responsibilities."}"</p>
        </div>

        {/* Footer & Signatures */}
        <div className="flex justify-between items-end mt-auto pt-16 border-t-2 border-gray-200">
          <div className="text-center w-80">
            <div className="mb-4 relative">
              {/* Removed redundant name above signature */}
              <img src="/EdgeCareers.png" alt="Signature" className="h-20 w-auto mx-auto object-contain -mt-4 mb-2 relative z-10" />
            </div>
            <div className="border-t-2 border-gray-900 pt-2">
              <p className="text-xl font-black text-gray-900">Amit Kumar</p>
              <p className="text-sm text-gray-500 font-bold uppercase">Founder & CEO, TECHIEHELP</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img src="/seal.png" alt="Official Seal" className="w-48 h-48 object-contain" />
          </div>
        </div>

        <div className="text-center mt-12 bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <p className="text-xs text-gray-500 font-bold tracking-[0.2em] uppercase">techiehelp institute of ai • www.techiehelp.in • Verification ID: {data.applicationId}</p>
        </div>
      </div>
    </div>
  );
}
