"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const PHRASES = [
  "Training",
  "Internships",
  "Live Projects",
  "Resume Building",
  "Interview Preparation",
  "Placement Support",
  "Job Opportunities",
  "Building AI Leaders"
];

export default function SplashScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Slower duration as requested
    const phraseDuration = 500; 
    
    const phraseInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PHRASES.length);
    }, phraseDuration);

    return () => clearInterval(phraseInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99999] bg-white flex flex-col items-center justify-center pointer-events-none"
    >
      <div className="flex flex-col items-center max-w-sm w-full px-6">
        
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: shouldReduceMotion ? 0 : [0, -6, 0],
            filter: shouldReduceMotion ? "none" : [
              "drop-shadow(0 0 0px rgba(244, 180, 0, 0))",
              "drop-shadow(0 0 20px rgba(244, 180, 0, 0.3))",
              "drop-shadow(0 0 0px rgba(244, 180, 0, 0))"
            ]
          }}
          transition={{
            opacity: { duration: 0.5, ease: "easeOut" },
            scale: { duration: 0.5, ease: "easeOut" },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            filter: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          className="mb-10"
        >
          <img 
            src="/logo.png" 
            alt="TechieHelp Logo" 
            className="h-20 w-auto object-contain"
          />
        </motion.div>

        {/* Dynamic Text Container */}
        <div className="h-12 relative w-full flex justify-center items-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`absolute text-center w-full flex items-center justify-center gap-2 ${
                currentIndex === PHRASES.length - 1 
                  ? "text-[#0F4CBA] font-extrabold text-2xl tracking-tight" 
                  : "text-slate-600 font-medium text-[17px] tracking-wide"
              }`}
            >
              {currentIndex !== PHRASES.length - 1 && <span className="text-[#0F4CBA] font-bold">✓</span>}
              {PHRASES[currentIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Indeterminate sweeping progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100 overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-[#0F4CBA] via-blue-500 to-[#F4B400] w-1/2"
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
}
