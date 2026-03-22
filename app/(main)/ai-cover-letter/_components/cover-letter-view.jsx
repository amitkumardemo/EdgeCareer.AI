"use client";

import Link from "next/link";
import { Plus, PenTool, Sparkles, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUTTONS_MENUS } from "@/lib/constants";
import CoverLetterList from "./cover-letter-list";
import { motion } from "framer-motion";
import React from "react";

export default function CoverLetterView({ coverLetters }) {
  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-600/10 via-purple-600/5 to-transparent blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm font-medium text-blue-400 mb-4">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Narrative Builder</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
              Craft the Perfect <br />
              <span className="gradient-title drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">Cover Letter</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Stand out to recruiters with AI-generated cover letters tailored to your unique skills and the specific job description. High impact, professionally structured, and ready in seconds.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/ai-cover-letter/new">
                <Button size="lg" className="h-14 px-8 text-lg rounded-2xl group relative overflow-hidden transition-all hover:scale-105 active:scale-95">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Plus className="h-5 w-5 mr-3 relative z-10" />
                  <span className="relative z-10">{BUTTONS_MENUS.CREATE_NEW}</span>
                  <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all relative z-10" />
                </Button>
              </Link>
              
              <div className="flex -space-x-3 overflow-hidden p-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="inline-block h-10 w-10 rounded-full border-4 border-background bg-muted flex items-center justify-center">
                    <PenTool className="h-4 w-4 text-primary" />
                  </div>
                ))}
                <div className="flex items-center ml-4 text-sm font-medium text-muted-foreground italic">
                  Join 10,000+ successful applicants
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 mt-8">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Recent drafts</h2>
                <p className="text-sm text-muted-foreground">Manage and edit your generated letters</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-muted/50 text-xs font-bold uppercase tracking-wider">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              {coverLetters?.length || 0} Document{coverLetters?.length !== 1 ? 's' : ''} Saved
            </div>
          </div>

          <CoverLetterList coverLetters={coverLetters} />
        </motion.div>
      </section>
    </div>
  );
}
