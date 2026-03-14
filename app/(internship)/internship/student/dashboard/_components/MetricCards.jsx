"use client";

import { Card } from "@/components/ui/card";
import { CheckCircle2, Calendar, Award, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function MetricCards({ progress, selectedApp }) {
  const stats = [
    {
      label: "Tasks Completed",
      value: progress ? `${progress.tasksCompleted} / ${progress.totalTasks}` : "0 / 0",
      icon: CheckCircle2,
      color: "text-green-400",
      bg: "bg-green-400/10",
      border: "border-green-400/20",
    },
    {
      label: "Attendance",
      value: progress ? `${progress.attendancePct}%` : "0%",
      icon: Calendar,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/20",
    },
    {
      label: "Performance Score",
      value: progress ? progress.performScore.toFixed(1) : "0.0",
      icon: Zap,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20",
    },
    {
      label: "Internship Status",
      value: selectedApp ? "Active" : "No Active",
      icon: Award,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      border: "border-amber-400/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
        >
          <Card className="bg-[#0f172a] border-white/5 p-6 rounded-2xl relative group overflow-hidden h-full">
            <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity`}>
              <stat.icon size={80} />
            </div>
            <div className="relative z-10">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4 border ${stat.border}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-black text-white mt-1 tracking-tight">{stat.value}</h3>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
