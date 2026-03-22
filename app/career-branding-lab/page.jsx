"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Linkedin, 
  Github, 
  Search, 
  FileText, 
  MessageSquare, 
  Sparkles, 
  Target, 
  Rocket, 
  CheckCircle2, 
  Zap, 
  ChevronRight,
  ShieldCheck,
  Cpu
} from "lucide-react";
import { toast } from "sonner";

// Modular Component Imports
import LinkedInAnalyzerModal from "./_components/LinkedInAnalyzerModal";
import LinkedInManualAnalyzerModal from "./_components/LinkedInManualAnalyzerModal";
import LinkedInEnhancerModal from "./_components/LinkedInEnhancerModal";
import LinkedInPostModal from "./_components/LinkedInPostModal";
import { GitHubRepoModal, GitHubProfileModal } from "./_components/GithubReadmeModals";
import CareerBrandingModal from "./_components/CareerBrandingModal";
import ProjectBulletsModal from "./_components/ProjectBulletsModal";

const LabFeatureCard = ({ icon: Icon, title, description, badge, onClick, color = "cyan" }) => {
  const colorMap = {
    cyan: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400 hover:shadow-cyan-500/20",
    purple: "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400 hover:shadow-purple-500/20",
    orange: "from-orange-500/20 to-yellow-500/20 border-orange-500/30 text-orange-400 hover:shadow-orange-500/20",
    green: "from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400 hover:shadow-green-500/20",
    pink: "from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-400 hover:shadow-pink-500/20",
    indigo: "from-indigo-500/20 to-blue-500/20 border-indigo-500/30 text-indigo-400 hover:shadow-indigo-500/20",
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br ${colorMap[color]} p-6 cursor-pointer transition-all duration-300 backdrop-blur-md`}
    >
      <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon size={80} />
      </div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-black/40 border border-white/10 ${colorMap[color].split(' ')[2]}`}>
            <Icon size={24} />
          </div>
          {badge && (
            <span className="text-[10px] uppercase font-bold tracking-widest bg-white/10 px-2 py-1 rounded-full border border-white/10 text-white">
              {badge}
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2 group-hover:translate-x-1 transition-transform">
          {title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          {description}
        </p>
        
        <div className="mt-auto flex items-center gap-2 group-hover:text-white transition-colors font-semibold text-xs uppercase tracking-tighter">
          Launch Intelligence <ChevronRight size={14} />
        </div>
      </div>
    </motion.div>
  );
};

export default function CareerBrandingLab() {
  const [activeModal, setActiveModal] = useState(null);
  const [copied, setCopied] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap) {
      window.gsap.from(titleRef.current, {
        duration: 1.5,
        y: 100,
        opacity: 0,
        ease: "power4.out",
        stagger: 0.2
      });
    }
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Successfully Copied!", {
      description: "Content is now in your clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const featureGroups = [
    {
      title: "LinkedIn Dominance",
      description: "AI-powered tools to master your professional presence",
      features: [
        {
          id: "linkedin-analyzer",
          icon: Search,
          title: "Profile URL Intelligence",
          description: "Full diagnostic of your LinkedIn profile URL with recruiter insights.",
          color: "cyan",
          badge: "AI Deep Scan"
        },
        {
          id: "linkedin-manual",
          icon: FileText,
          title: "Manual Content Analysis",
          description: "Paste your headline or about section for targeted precision analysis.",
          color: "indigo",
          badge: "Precision"
        },
        {
          id: "linkedin-enhancer",
          icon: Zap,
          title: "Profile Optimizer",
          description: "Generate world-class headlines and summaries that hook recruiters.",
          color: "purple",
          badge: "Conversion"
        },
        {
          id: "linkedin-post",
          icon: MessageSquare,
          title: "Viral Post Architect",
          description: "AI that writes high-engagement posts tailored to your career goals.",
          color: "pink",
          badge: "Personal Brand"
        }
      ]
    },
    {
      title: "Tech Visibility",
      description: "Engineered READMEs and project narratives for builders",
      features: [
        {
          id: "github-repo",
          icon: Github,
          title: "Repo README Magic",
          description: "Professional project documentation that screams 'Lead Engineer'.",
          color: "green",
          badge: "Best Practice"
        },
        {
          id: "github-profile",
          icon: Target,
          title: "Profile README Builder",
          description: "A stunning landing page for your GitHub profile in seconds.",
          color: "orange",
          badge: "Social Proof"
        }
      ]
    },
    {
      title: "Resume & Strategy",
      description: "Strategic narratives that win technical interviews",
      features: [
        {
          id: "career-branding",
          icon: Rocket,
          title: "Branding Calibration",
          description: "Fix mismatches between your experiences and your target dream role.",
          color: "pink",
          badge: "Strategy"
        },
        {
          id: "project-bullets",
          icon: Cpu,
          title: "Impact Bullet Factory",
          description: "Convert basic project tasks into high-impact, data-driven resume bullets.",
          color: "orange",
          badge: "ATS Optimized"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-40">
        {/* Premium Hero Section */}
        <section className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-xl"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-300">EdgeCareer AI Intelligence</span>
          </motion.div>

          <motion.h1 
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl font-black mb-8 tracking-tighter"
          >
            Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Branding</span> Lab
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed"
          >
            Science-backed AI agents designed to transform your professional narrative into an industry-leading powerhouse.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-12"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 bg-white/5 border border-white/10 px-4 py-2 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-green-400" /> Professional Accuracy
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 bg-white/5 border border-white/10 px-4 py-2 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Recruiter Approved
            </div>
          </motion.div>
        </section>

        {/* Feature Grid */}
        <div className="space-y-24">
          {featureGroups.map((group, groupIdx) => (
            <section key={groupIdx}>
              <div className="mb-10 flex items-end justify-between border-b border-white/10 pb-6">
                <div>
                  <h2 className="text-3xl font-black mb-2 tracking-tight">{group.title}</h2>
                  <p className="text-gray-500 font-medium">{group.description}</p>
                </div>
                <div className="hidden md:block">
                  <span className="text-5xl font-black text-white/5 select-none">{String(groupIdx + 1).padStart(2, '0')}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {group.features.map((feature, fIdx) => (
                  <LabFeatureCard
                    key={fIdx}
                    {...feature}
                    onClick={() => setActiveModal(feature.id)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Trust/Premium Footer Info */}
        <section className="mt-40 pt-20 border-t border-white/10 text-center">
            <h3 className="text-xl font-bold mb-4 opacity-50 uppercase tracking-widest">Powered by Advanced Career AI</h3>
            <div className="flex justify-center flex-wrap gap-12 opacity-30 grayscale hover:grayscale-0 transition-all">
                {/* Simulated Partner Icons */}
                <div className="flex items-center gap-2 font-bold text-2xl">EDGE<span className="text-cyan-400">ENGINE</span></div>
                <div className="flex items-center gap-2 font-bold text-2xl">RECRUIT<span className="text-purple-400">AI</span></div>
                <div className="flex items-center gap-2 font-bold text-2xl">LAB<span className="text-pink-400">CORE</span></div>
            </div>
        </section>
      </main>

      {/* Modals Container */}
      <AnimatePresence>
        {activeModal === "linkedin-analyzer" && (
          <LinkedInAnalyzerModal 
            open={true} 
            onOpenChange={() => setActiveModal(null)} 
            onCopy={handleCopy} 
            copied={copied} 
          />
        )}
        {activeModal === "linkedin-manual" && (
          <LinkedInManualAnalyzerModal 
            open={true} 
            onOpenChange={() => setActiveModal(null)} 
            onCopy={handleCopy} 
            copied={copied} 
          />
        )}
        {activeModal === "linkedin-enhancer" && (
          <LinkedInEnhancerModal 
            open={true} 
            onOpenChange={() => setActiveModal(null)} 
            onCopy={handleCopy} 
            copied={copied} 
          />
        )}
        {activeModal === "linkedin-post" && (
          <LinkedInPostModal 
            open={true} 
            onOpenChange={() => setActiveModal(null)} 
            onCopy={handleCopy} 
            copied={copied} 
          />
        )}
        {activeModal === "github-repo" && (
          <GitHubRepoModal 
            open={true} 
            onOpenChange={() => setActiveModal(null)} 
            onCopy={handleCopy} 
            copied={copied} 
          />
        )}
        {activeModal === "github-profile" && (
          <GitHubProfileModal 
            open={true} 
            onOpenChange={() => setActiveModal(null)} 
            onCopy={handleCopy} 
            copied={copied} 
          />
        )}
        {activeModal === "career-branding" && (
          <CareerBrandingModal 
            open={true} 
            onOpenChange={() => setActiveModal(null)} 
            onCopy={handleCopy} 
            copied={copied} 
          />
        )}
        {activeModal === "project-bullets" && (
          <ProjectBulletsModal 
            open={true} 
            onOpenChange={() => setActiveModal(null)} 
            onCopy={handleCopy} 
            copied={copied} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
