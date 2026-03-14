"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function PublicProfileLink({ dbUser }) {
  const [copied, setCopied] = useState(false);
  const profileUrl = `techiehelp.in/intern/${dbUser?.name ? dbUser.name.toLowerCase().replace(/\s+/g, "-") : dbUser?.id}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0f172a] border border-white/5 rounded-3xl p-6">
      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3">Public Profile Link</p>
      <div className="p-3 bg-white/3 border border-white/5 rounded-xl flex items-center justify-between group">
        <code className="text-xs text-primary truncate max-w-[180px]">
          {profileUrl}
        </code>
        <button 
          onClick={copyToClipboard}
          className="text-[10px] font-bold text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-green-400" />
              <span className="text-green-400">COPIED</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>COPY</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
