"use client";

import { TrendingUp, Code, Github, Star } from "lucide-react";
import { motion } from "framer-motion";

export function SkillScoreCard({ dbUser }) {
  const points = dbUser?.points || 0;
  const level = dbUser?.level || 1;
  const streak = dbUser?.streak || 0;

  // Mock scores based on user data
  const scores = [
    { label: "Internship Performance", value: 85, icon: Star, color: "text-amber-400" },
    { label: "Coding Activity", value: 72, icon: Code, color: "text-indigo-400" },
    { label: "GitHub Projects", value: 64, icon: Github, color: "text-gray-400" },
  ];

  const overallScore = Math.round(scores.reduce((acc, s) => acc + s.value, 0) / scores.length);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-gradient-to-br from-[#0f172a] via-[#020617] to-primary/5 border border-white/5 rounded-3xl p-6 mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" /> TechieHelp Skill Score
        </h2>
        <div className="px-3 py-1 bg-primary/20 border border-primary/30 rounded-lg text-primary text-xs font-black uppercase tracking-widest">
          LVL {level}
        </div>
      </div>

      <div className="flex items-center gap-6 mb-8">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-white/5"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 40}
              strokeDashoffset={2 * Math.PI * 40 * (1 - overallScore / 100)}
              className="text-primary transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-2xl font-black text-white">{overallScore}</span>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Overall</span>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-white mb-1">Elite Career Readiness</p>
          <p className="text-xs text-gray-500 leading-relaxed font-medium">
            Your score is based on tasks, github activity, and internship performance.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {scores.map((s, i) => (
          <div key={i}>
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1.5 px-1">
              <span className="flex items-center gap-1.5 text-gray-400">
                <s.icon className={`h-3 w-3 ${s.color}`} /> {s.label}
              </span>
              <span className="text-white">{s.value}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-slate-700 rounded-full transition-all duration-1000"
                style={{ width: `${s.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
