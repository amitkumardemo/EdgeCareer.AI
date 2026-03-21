"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Users, TrendingUp, Sparkles, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ATSHeader() {
  return (
    <section className="relative pt-12 pb-20 overflow-hidden">
      {/* Mesh Gradient Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-blue-600/10 via-emerald-600/5 to-transparent blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm font-medium text-emerald-400 mb-4 mx-auto">
            <ShieldCheck className="h-4 w-4" />
            <span>Enterprise-Grade Resume Screening AI</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Optimize for the <br />
            <span className="gradient-title drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">Digital Gatekeeper</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Don't let a "Bot" reject your dream job. Our AI-powered ATS analyzer dissects your resume like a recruiter's system, giving you the exact keywords and formatting fixes needed to land the interview.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
            {[
              { label: "Resumes Analyzed", value: "25k+", icon: Users, color: "text-blue-400", bg: "bg-blue-500/10" },
              { label: "Success Rate", value: "98.2%", icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10" },
              { label: "AI Accuracy", value: "Smart Scan", icon: Sparkles, color: "text-purple-400", bg: "bg-purple-500/10" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <Card className="bg-white/5 border-white/10 backdrop-blur-xl group hover:border-white/20 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
