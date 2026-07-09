"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit3, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function DashboardHeader({ dbUser, selectedApp }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const firstName = dbUser?.name?.split(" ")[0] || "Intern";
  const role = selectedApp?.batch?.program?.title || dbUser?.industry?.replace(/-/g, " ") || "Intern";

  if (!mounted) {
    return (
      <div className="relative group overflow-hidden bg-white border border-slate-200 rounded-3xl p-8 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-slate-100 animate-pulse" />
            <div className="space-y-2">
              <div className="h-8 w-48 bg-slate-100 animate-pulse rounded" />
              <div className="h-4 w-32 bg-slate-100 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative group overflow-hidden bg-white border border-slate-200 rounded-3xl p-8 mb-8 shadow-sm"
    >
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] -mr-32 -mt-32 rounded-full" />
      
      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-500 rounded-2xl blur opacity-10 group-hover:opacity-25 transition duration-1000 group-hover:duration-200" />
            <Avatar className="h-24 w-24 rounded-2xl border border-slate-200 relative">
              <AvatarImage src={dbUser?.imageUrl} alt={dbUser?.name} />
              <AvatarFallback className="bg-slate-100 text-slate-700 text-2xl font-bold rounded-2xl">
                {dbUser?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Welcome back, {firstName} 👋
            </h1>
            <p className="text-slate-500 mt-1.5 max-w-md">
              {dbUser?.email}
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-4">
              {dbUser?.college?.name && (
                <span className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  🏢 {dbUser.college.name}
                </span>
              )}
              <span className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] uppercase font-bold text-primary tracking-wider">
                🎯 {role}
              </span>
              {dbUser?.branch && (
                <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] uppercase font-bold text-blue-600 tracking-wider">
                  🎓 {dbUser.branch}
                </span>
              )}
              {dbUser?.techieId && (
                <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] uppercase font-bold text-indigo-600 tracking-widest">
                  🪪 {dbUser.techieId}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <Link href={`/intern/${dbUser?.name ? dbUser.name.toLowerCase().replace(/\s+/g, "-") : dbUser?.id}`} target="_blank" className="flex-1 md:flex-none">
            <Button variant="outline" className="w-full bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700 gap-2 h-11 px-6 rounded-xl">
              <ExternalLink className="h-4 w-4" /> View Public Profile
            </Button>
          </Link>
          <Link href="/onboarding" className="flex-1 md:flex-none">
            <Button variant="outline" className="w-full bg-white border-slate-200 hover:bg-slate-50 text-slate-700 gap-2 h-11 px-6 rounded-xl shadow-sm font-bold">
              <Edit3 className="h-4 w-4" /> Edit Profile
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
