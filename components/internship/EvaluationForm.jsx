"use client";

import { useState, useEffect } from "react";
import { submitEvaluation, getEvaluation } from "@/actions/internship-evaluation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const OPTIONS = ["Strongly Agree", "Agree", "Disagree"];

export default function EvaluationForm({ applicationId, onClose }) {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    technicalSkills: "Agree",
    practicalImplementation: "Agree",
    communication: "Agree",
    teamwork: "Agree",
    timeManagement: "Agree",
    learningAbility: "Agree",
    initiative: "Agree",
    professionalEthics: "Agree",
    technicalComments: "",
    practicalComments: "",
    communicationComments: "",
    teamworkComments: "",
    disciplineComments: "",
    strengths: "",
    growthAreas: "",
    comments: "",
    summary: "",
  });

  useEffect(() => {
    async function loadData() {
      try {
        const evalData = await getEvaluation(applicationId);
        if (evalData) {
          setFormData({
            ...evalData,
            technicalComments: evalData.technicalComments || "",
            practicalComments: evalData.practicalComments || "",
            communicationComments: evalData.communicationComments || "",
            teamworkComments: evalData.teamworkComments || "",
            disciplineComments: evalData.disciplineComments || "",
            strengths: evalData.strengths || "",
            growthAreas: evalData.growthAreas || "",
            comments: evalData.comments || "",
            summary: evalData.summary || "",
          });
        }
      } catch (e) {
        toast.error("Failed to load evaluation");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [applicationId]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e, sendEmail = false) => {
    if (e) e.preventDefault();
    setSubmitting(true);
    try {
      await submitEvaluation(applicationId, formData, sendEmail);
      toast.success(sendEmail ? "Evaluation saved & emailed to student!" : "Evaluation saved as draft!");
      if (onClose) onClose();
    } catch (error) {
      toast.error(error.message || "Failed to submit evaluation");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-4 text-center text-sm text-gray-500 animate-pulse">Loading past evaluation data...</div>;

  const sections = [
    {
      title: "1. Technical Knowledge & Problem Solving",
      metrics: [
        { key: "technicalSkills", label: "Fundamental Technical Knowledge" },
        { key: "learningAbility", label: "Learning Ability & Adaptability" },
        { key: "initiative", label: "Initiative & Problem Solving" },
      ],
      commentKey: "technicalComments"
    },
    {
      title: "2. Practical Implementation & Coding Skills",
      metrics: [
        { key: "practicalImplementation", label: "Coding Standards & Best Practices" },
      ],
      commentKey: "practicalComments"
    },
    {
      title: "3. Communication & Documentation",
      metrics: [
        { key: "communication", label: "Communication & Progress Reporting" },
      ],
      commentKey: "communicationComments"
    },
    {
      title: "4. Teamwork & Collaboration",
      metrics: [
        { key: "teamwork", label: "Collaboration & Professionalism" },
      ],
      commentKey: "teamworkComments"
    },
    {
      title: "5. Time Management & Discipline",
      metrics: [
        { key: "timeManagement", label: "Punctuality & Deadlines" },
        { key: "professionalEthics", label: "Professional Ethics & Responsibility" },
      ],
      commentKey: "disciplineComments"
    }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
      {sections.map((section, sidx) => (
        <div key={sidx} className="bg-black/20 p-4 border border-white/5 rounded-xl space-y-4">
          <h3 className="text-sm font-semibold text-white inline-flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-[10px] flex items-center justify-center border border-primary/20">{sidx + 1}</span>
            {section.title}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {section.metrics.map((m) => (
              <div key={m.key} className="space-y-1.5">
                <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest block">{m.label}</label>
                <select 
                  value={formData[m.key]}
                  onChange={(e) => handleChange(m.key, e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-primary/50"
                >
                  {OPTIONS.map(opt => <option key={opt} value={opt} className="bg-[#0f172a]">{opt}</option>)}
                </select>
              </div>
            ))}
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-primary/70 uppercase font-black tracking-widest block italic">Manager Remarks for this Section</label>
            <textarea
              value={formData[section.commentKey]}
              onChange={(e) => handleChange(section.commentKey, e.target.value)}
              placeholder={`Enter specific observations about ${section.title}...`}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white h-20 focus:outline-none focus:border-primary/50 custom-scrollbar"
            />
          </div>
        </div>
      ))}

      <div className="bg-primary/5 p-4 border border-primary/20 rounded-xl space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-tight">Final Performance Narrative</h3>
        
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] text-gray-400 uppercase font-black tracking-widest block">Key Capabilities & Strengths</label>
            <textarea
              value={formData.strengths}
              onChange={(e) => handleChange("strengths", e.target.value)}
              placeholder="What value did the intern add to the organization?"
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white h-24 focus:outline-none focus:border-primary/50 custom-scrollbar"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-gray-400 uppercase font-black tracking-widest block">Areas of Growth</label>
            <textarea
              value={formData.growthAreas}
              onChange={(e) => handleChange("growthAreas", e.target.value)}
              placeholder="1. Advanced concepts... 2. Backend integration..."
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white h-24 focus:outline-none focus:border-primary/50 custom-scrollbar"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-gray-400 uppercase font-black tracking-widest block">Internal Summary (Admin Only)</label>
            <textarea
              value={formData.summary}
              onChange={(e) => handleChange("summary", e.target.value)}
              placeholder="Recommended for PPO, etc."
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white h-16 focus:outline-none focus:border-primary/50 custom-scrollbar"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-end pt-2 sticky bottom-0 bg-[#0f172a] py-4 border-t border-white/5 pb-2 -mx-4 px-4 rounded-b-xl z-50">
        {onClose && (
          <Button type="button" variant="outline" onClick={onClose} className="border-white/10 hover:bg-white/5 disabled:opacity-50 text-xs h-9">
            Cancel
          </Button>
        )}
        <Button 
          type="button" 
          variant="secondary"
          disabled={submitting} 
          onClick={(e) => handleSubmit(e, false)}
          className="bg-white/5 text-white border-white/10 hover:bg-white/10 text-xs h-9"
        >
          {submitting ? "Saving..." : "Save Draft"}
        </Button>
        <Button 
          type="button"
          disabled={submitting} 
          onClick={(e) => handleSubmit(e, true)}
          className="bg-primary text-black hover:bg-primary/90 disabled:opacity-50 text-xs h-9 flex items-center gap-2 shadow-lg shadow-primary/20"
        >
          {submitting ? "Processing..." : "Save & Issue Report"}
        </Button>
      </div>
    </form>
  );
}
