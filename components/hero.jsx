"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { BUTTONS_MENUS } from "@/lib/constants";
import Link from "next/link";
import ShinyText from "./ui/blocks/ShinyText/ShinyText";
import SplitType from "split-type";
import { gsap } from "gsap";
import {
  motion,
  useAnimation,
  useInView,
} from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";

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
      {/* Decorative background elements */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
      />
      <motion.div
        className="absolute bottom-24 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-secondary/5 to-transparent rounded-full blur-3xl -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Floating decorative elements */}
      {/* {decorativeElements.map((element, index) => (
        <FloatingElement key={index} index={index}>
          {element}
        </FloatingElement>
      ))} */}

      <div
        className="space-y-6 text-center relative z-20"
      >
        {/* Main content with sequence animations */}
        <div className="space-y-6 mx-auto pt-32 pb-4">
          <SequenceItem animation="slideUp" delay={0.1} isMobile={isMobile}>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white text-center"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
            >
              TechieHelp Institute of AI
            </h1>
          </SequenceItem>

          <SequenceItem animation="scale" delay={0.8} isMobile={isMobile}>
            <div className="relative bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2 mx-auto max-w-[700px]">
              <p
                className="text-lg md:text-xl lg:text-2xl font-semibold text-center text-[#00E5FF]"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
              >
                Building Careers with AI, Innovation & Industry Readiness
              </p>
            </div>
          </SequenceItem>

          <SequenceItem animation="fade" delay={1.2} isMobile={isMobile}>
            <p className="text-sm md:text-base text-[#B0BEC5] text-center font-medium">
              Powered by TechieHelp
            </p>
          </SequenceItem>

        </div>

        <SequenceItem animation="slideUp" delay={1.0} isMobile={isMobile}>
          <motion.div
            className="flex justify-center space-x-4 mt-6 mb-20"
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
                  className="px-8 relative overflow-hidden group"
                >
                  <motion.span className="relative z-10 flex items-center gap-2">
                    {BUTTONS_MENUS.GET_STARTED}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </motion.span>
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary rounded-md -z-10"
                    initial={{ x: -100, opacity: 0.5 }}
                    whileHover={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link href="/interview">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-6 py-4 border-2 border-gray-400 hover:border-gray-200 transition-all duration-300 hover:text-gray-200 hover:bg-gray-900 relative overflow-hidden"
                >
                  <motion.span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 hover:opacity-100 transition-opacity duration-500" />
                  <ShinyText
                    text="Interview Prep"
                    speed={2}
                    className="text-lg font-semibold px-1 relative z-10"
                  />
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
