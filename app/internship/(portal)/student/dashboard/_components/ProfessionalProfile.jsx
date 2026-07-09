"use client";

import { 
  Github, 
  Linkedin, 
  Code, 
  Globe, 
  FileText, 
  ExternalLink, 
  Edit3 
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ProfessionalProfile({ dbUser }) {
  const links = [
    { label: "Resume", icon: FileText, url: dbUser?.resumeLink, color: "text-red-400" },
    { label: "Portfolio", icon: Globe, url: dbUser?.portfolioLink, color: "text-blue-400" },
    { label: "GitHub", icon: Github, url: dbUser?.githubLink || (dbUser?.githubUsername ? `https://github.com/${dbUser.githubUsername}` : null), color: "text-white" },
    { label: "LinkedIn", icon: Linkedin, url: dbUser?.linkedinLink, color: "text-blue-500" },
    { label: "LeetCode", icon: Code, url: dbUser?.leetcodeLink, color: "text-orange-500" },
  ];

  const activeLinks = links.filter(l => l.url);

  return (
    <div className="bg-[#0f172a] border border-white/5 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Professional Profile</p>
        <Link href="/onboarding">
          <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px] text-primary hover:text-white hover:bg-primary/10 transition-all gap-1">
            <Edit3 className="h-3 w-3" /> EDIT
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {activeLinks.length > 0 ? (
          activeLinks.map((link) => (
            <a 
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-white/3 border border-white/5 rounded-xl group hover:border-primary/30 hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-lg bg-[#030712] border border-white/5 ${link.color}`}>
                  <link.icon className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">{link.label}</span>
              </div>
              <ExternalLink className="h-3 w-3 text-gray-600 group-hover:text-primary transition-colors" />
            </a>
          ))
        ) : (
          <div className="text-center py-4 px-2">
            <p className="text-[10px] text-gray-600 italic">No links added yet. Complete your profile to stand out!</p>
          </div>
        )}
      </div>
    </div>
  );
}
