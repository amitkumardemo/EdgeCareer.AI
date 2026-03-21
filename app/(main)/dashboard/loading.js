"use client";

import React from "react";
import { Brain } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
      <div className="relative">
        {/* Pulsing Glow Effect */}
        <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full animate-pulse scale-150" />
        <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full animate-pulse delay-700 scale-125" />
        
        {/* Animated Icon Container */}
        <div className="relative bg-[#111] border border-white/10 p-8 rounded-3xl shadow-2xl animate-bounce duration-2000">
          <Brain className="w-16 h-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400" 
                 style={{ filter: "drop-shadow(0 0 8px rgba(96, 165, 250, 0.5))" }} />
          
          {/* Orbital Rings Animation */}
          <div className="absolute inset-0 border-2 border-dashed border-blue-500/20 rounded-full animate-spin-slow" />
          <div className="absolute inset-2 border border-dotted border-purple-500/20 rounded-full animate-reverse-spin" />
        </div>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white tracking-widest uppercase opacity-80">
          Syncing Core
        </h2>
        <p className="text-gray-400 font-medium animate-pulse">
          Preparing your AI career insights...
        </p>
      </div>

      {/* Progress Bar Simulation */}
      <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-loading-progress w-full" />
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes reverse-spin {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes loading-progress {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-reverse-spin {
          animation: reverse-spin 12s linear infinite;
        }
        .animate-loading-progress {
          animation: loading-progress 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
