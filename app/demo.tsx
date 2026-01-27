"use client";

import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const GlowCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-xl ${className}`}
      style={{
        '--mouse-x': `${mousePosition.x}px`,
        '--mouse-y': `${mousePosition.y}px`,
        '--glow-opacity': isHovered ? '0.8' : '0.3',
      } as React.CSSProperties}
    >
      {/* Glow layers */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y),
            rgba(59, 130, 246, var(--glow-opacity)) 0%,
            rgba(147, 51, 234, var(--glow-opacity)) 25%,
            rgba(236, 72, 153, var(--glow-opacity)) 50%,
            transparent 70%)`,
          filter: 'blur(20px)',
        }}
      />
      <div
        className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300"
        style={{
          background: `conic-gradient(from 0deg at var(--mouse-x) var(--mouse-y),
            transparent 0deg,
            rgba(59, 130, 246, 0.6) 60deg,
            rgba(147, 51, 234, 0.8) 120deg,
            rgba(236, 72, 153, 0.6) 180deg,
            transparent 240deg)`,
          filter: 'blur(15px)',
        }}
      />

      {/* Border glow */}
      <div
        className="absolute inset-0 rounded-xl transition-all duration-300"
        style={{
          background: `linear-gradient(45deg,
            rgba(59, 130, 246, ${isHovered ? '0.5' : '0.2'}),
            rgba(147, 51, 234, ${isHovered ? '0.7' : '0.3'}),
            rgba(236, 72, 153, ${isHovered ? '0.5' : '0.2'}))`,
          padding: '2px',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
        }}
      />

      {/* Card content */}
      <div
        className={`relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 h-full transition-all duration-300 ${
          isHovered ? 'scale-105 shadow-2xl shadow-blue-500/25' : 'scale-100'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export function GlowingEffectDemo() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <div className="w-full py-16 md:py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            AI Career Tutor (EdgeCareer Platform)
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Our AI Career Tutor acts as a 24/7 personal career assistant.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              title: "Industry Dashboard",
              icon: <Box className="h-6 w-6" />,
              description: "Comprehensive industry insights and trends",
              delay: 0.6
            },
            {
              title: "Career Roadmap Generator",
              icon: <Settings className="h-6 w-6" />,
              description: "Personalized career path planning",
              delay: 0.7
            },
            {
              title: "Skill Gap Analysis",
              icon: <Search className="h-6 w-6" />,
              description: "Identify and bridge skill gaps",
              delay: 0.8
            },
            {
              title: "Course Recommendations",
              icon: <Sparkles className="h-6 w-6" />,
              description: "AI-powered learning suggestions",
              delay: 0.9
            },
            {
              title: "Internship Matching",
              icon: <Lock className="h-6 w-6" />,
              description: "Find perfect internship opportunities",
              delay: 1.0
            },
            {
              title: "Job Matching Engine",
              icon: <Box className="h-6 w-6" />,
              description: "Advanced job matching algorithm",
              delay: 1.1
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: item.delay }}
            >
              <GlowCard>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-300">{item.description}</p>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border-[0.75px] border-border bg-muted p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-foreground">
                {title}
              </h3>
              <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
