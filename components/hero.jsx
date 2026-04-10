"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { BUTTONS_MENUS } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";
import ShinyText from "./ui/blocks/ShinyText/ShinyText";
import SplitType from "split-type";
import { gsap } from "gsap";
import {
  motion,
  useAnimation,
  useInView,
} from "framer-motion";
import { ArrowRight, Sparkles, Star, Award } from "lucide-react";

// Create a reusable sequence animation component
const SequenceItem = ({ children, delay = 0, animation = "slideUp", isMobile = false }) => {
  const animations = {
    slideUp: {
      hidden: { y: 40, opacity: 0 },
      visible: { y: 0, opacity: 1 },
    },
    slideLeft: {
      hidden: { x: -60, opacity: 0 },
      visible: { x: 0, opacity: 1 },
    },
    slideRight: {
      hidden: { x: 60, opacity: 0 },
      visible: { x: 0, opacity: 1 },
    },
    scale: {
      hidden: { scale: 0.8, opacity: 0 },
      visible: { scale: 1, opacity: 1 },
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  };

  const adjustedDelay = isMobile ? delay * 0.5 : delay;
  const adjustedDuration = isMobile ? 0.5 : 0.7;

  return (
    <motion.div
      variants={animations[animation]}
      initial="hidden"
      animate="visible"
      transition={{
        duration: adjustedDuration,
        delay: adjustedDelay,
        ease: [0.25, 0.1, 0.25, 1.0],
      }}
    >
      {children}
    </motion.div>
  );
};

// Floating animation component for decorative elements
const FloatingElement = ({ children, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 0.8],
        y: [0, -15, 0],
        rotate: [0, index % 2 === 0 ? 10 : -10, 0],
      }}
      transition={{
        duration: 3 + index,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: index * 0.2,
      }}
      className="absolute pointer-events-none"
      style={{
        left: `${10 + index * 30}%`,
        top: `${20 + index * 15}%`,
      }}
    >
      {children}
    </motion.div>
  );
};

const HeroSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // useEffect(() => {
  //   const text = new SplitType(".gradient-title");
  //   let t1 = gsap.timeline();
  //   t1.from(".char", {
  //     y: 50,
  //     opacity: 0,
  //     duration: 0.5,
  //     stagger: 0.05,
  //     ease: "power2.out",
  //   });
  //   t1.from("#hero-description", {
  //     scale: 0,
  //     opacity: 0,
  //     duration: 0.5,
  //     ease: "power2.out",
  //   });
  // }, []);


  // Decorative elements for visual flair
  // const decorativeElements = [
  //   <Sparkles key={1} className="text-primary w-6 h-6 opacity-60" />,
  //   <Star key={2} className="text-yellow-500 w-5 h-5 opacity-70" />,
  //   <Sparkles key={3} className="text-sky-400 w-7 h-7 opacity-50" />,
  //   <Star key={4} className="text-primary w-4 h-4 opacity-60" />,
  // ];

  return (
    <section
      className="w-full pt-32 md:pt-36 pb-24 relative overflow-hidden"
      ref={containerRef}
    >
      {/* Clean SaaS Background with Animated Blobs */}
      <div className="absolute inset-0 bg-transparent -z-10 overflow-hidden">
        {/* Animated Gradient Blobs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-[10%] -right-[5%] w-[40%] h-[40%] bg-indigo-200/30 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-[20%] -left-[10%] w-[35%] h-[35%] bg-blue-200/20 rounded-full blur-[80px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-[10%] right-[15%] w-[30%] h-[30%] bg-purple-200/20 rounded-full blur-[90px]"
        />
      </div>

      <div className="space-y-6 text-center relative z-20">
        {/* Main content with sequence animations */}
        <div className="space-y-6 mx-auto pt-32 pb-4 max-w-5xl px-4">
          <SequenceItem animation="slideUp" delay={0.1} isMobile={isMobile}>
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 text-[10px] md:text-xs font-bold tracking-widest uppercase text-indigo-600 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full shadow-sm">
                <Sparkles className="h-3.5 w-3.5" /> AI-Powered Career Launchpad
              </span>
            </div>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight"
            >
              Master the Skills That <br /> 
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Get You Hired
              </span>
            </h1>
          </SequenceItem>

          <SequenceItem animation="slideUp" delay={0.4} isMobile={isMobile}>
            <p
              className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium"
            >
              Build a job-ready portfolio, practice with AI mentors, and get verified <br className="hidden md:block" /> 
              certificates — everything you need to land your dream career.
            </p>
          </SequenceItem>

          <SequenceItem animation="fade" delay={1.2} isMobile={isMobile}>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <motion.div 
                whileHover={{ y: -5, scale: 1.02 }}
                className="flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(79,70,229,0.1)] transition-all duration-300"
              >
                <div className="p-1.5 bg-slate-50 rounded-lg">
                  <Image src="/msme.png" alt="MSME" width={80} height={20} className="h-5 w-auto object-contain brightness-110" onError={(e) => e.currentTarget.style.display = 'none'} />
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">MSME Certified</span>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5, scale: 1.02 }}
                className="flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(245,158,11,0.1)] transition-all duration-300"
              >
                <div className="p-1.5 bg-amber-50 rounded-lg">
                  <Award className="h-4 w-4 text-amber-500" />
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">ISO 9001:2015</span>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5, scale: 1.02 }}
                className="flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(34,197,94,0.1)] transition-all duration-300"
              >
                <div className="p-1.5 bg-green-50 rounded-lg">
                  <div className="w-2 ha-2 rounded-full bg-green-500 animate-pulse" />
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">AICTE Aligned</span>
              </motion.div>
            </div>
          </SequenceItem>

        </div>

        <SequenceItem animation="slideUp" delay={1.0} isMobile={isMobile}>
          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-6 mb-20 px-4"
            whileInView={{
              transition: {
                staggerChildren: 0.2,
              },
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="px-8 h-12 md:h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm md:text-base shadow-xl shadow-indigo-200 group"
                >
                  <span className="flex items-center gap-2">
                    Start Preparing with AI
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link href="/courses">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 h-12 md:h-14 rounded-full border-indigo-200 bg-white hover:bg-indigo-50 text-indigo-700 font-bold text-sm md:text-base transition-all duration-300 shadow-sm"
                >
                  Explore Verified Courses
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </SequenceItem>


      </div>
    </section>
  );
};

export default HeroSection;
