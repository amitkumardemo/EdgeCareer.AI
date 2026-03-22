"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Sparkles, Zap, Target, TrendingUp } from "lucide-react";

const quotes = [
  { text: "Your career is a journey, not a destination.", icon: Rocket, color: "text-cyan-400" },
  { text: "The best way to predict the future is to create it.", icon: Sparkles, color: "text-purple-400" },
  { text: "Consistency is the key to success.", icon: Zap, color: "text-yellow-400" },
  { text: "Believe in yourself and all that you are.", icon: Target, color: "text-pink-400" },
  { text: "Great things never came from comfort zones.", icon: TrendingUp, color: "text-green-400" },
];

export default function ResumeLoading() {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const Icon = quotes[currentQuote].icon;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse delay-700" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
        {/* Animated Icon Container */}
        <motion.div
          key={`icon-${currentQuote}`}
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ scale: 0, rotate: 180, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className={`p-6 rounded-3xl bg-white/5 border border-white/10 mb-10 backdrop-blur-xl ${quotes[currentQuote].color}`}
        >
          <Icon size={48} className="animate-pulse" />
        </motion.div>

        {/* Motivational Text */}
        <div className="h-24 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentQuote}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight"
            >
              {quotes[currentQuote].text}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Loading Progress Bar */}
        <div className="w-64 h-1.5 bg-white/5 rounded-full mt-12 overflow-hidden border border-white/5">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-full h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          />
        </div>

        <motion.p
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-6 text-xs font-bold tracking-[0.3em] uppercase text-gray-500"
        >
          Preparing Your Future Narrative
        </motion.p>
      </div>

      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
    </div>
  );
}
