"use client"
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BUTTONS_MENUS } from "../lib/constants";
import { Card, CardContent } from "../components/ui/card";
import HeroSection from "../components/hero";
import SplitText from "../components/ui/blocks/ShinyText/SplitText";
import ShinyText from "../components/ui/blocks/ShinyText/ShinyText";
import TestimonialCarousel from "../components/ui/TestimonialCarousel";
import RadialOrbitalTimeline from "../components/ui/radial-orbital-timeline";
import WhyChooseTechieHelp from "../components/ui/database-with-rest-api";
import { GlowingEffect } from "../components/ui/glowing-effect";
import ScrollToTop from "../components/ScrollToTop";
import InterviewPlacementSection from "../components/InterviewPlacementSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { features } from "@/data/features";
import { testimonial } from "@/data/testimonial";
import { faqs } from "@/data/faqs";
import { howItWorks } from "@/data/howItWorks";
import {
  ArrowRight,
  ChevronRight,
  Sparkles,
  Target,
  Zap,
  CheckCircle,
  BookOpen,
  Briefcase,
  Rocket,
  Award,
  Clock,
  Users,
  FileText,
  TrendingUp,
  Building,
  Code,
  Github,
  Lightbulb,
  Linkedin,
  Trophy,
  Mail,
  ExternalLink,
  BarChart3,
  Route,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useAnimation,
  useInView,
} from "framer-motion";
import { useRef } from "react";

const cardGradients = [
  "linear-gradient(to bottom right, #0e001a, #1e0033)", // Very dark purple
  "linear-gradient(to bottom right, #000d1a, #001a33)", // Very dark blue
  "linear-gradient(to bottom right, #001a0e, #00331c)", // Very dark green
  "linear-gradient(to bottom right, #1a0010, #33001e)", // Very dark magenta
  "linear-gradient(to bottom right, #1a0e00, #331c00)", // Very dark amber
  "linear-gradient(to bottom right, #0e0033, #000d33)", // Very dark purple-blue
  "linear-gradient(to bottom right, #00141a, #001a1f)", // Very dark teal
  "linear-gradient(to bottom right, #140026, #1f002b)", // Very dark violet
];

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Animated counter component
const AnimatedCounter = ({ value, text, classname }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [counter, setCounter] = React.useState(0);

  useEffect(() => {
    if (isInView) {
      let startValue = 0;
      const endValue = parseInt(value.toString().replace(/[^0-9]/g, ""));
      const duration = 2000;

      if (startValue === endValue) return;

      const increment = endValue / (duration / 16);

      const timer = setInterval(() => {
        startValue += increment;
        setCounter(Math.floor(startValue));

        if (startValue >= endValue) {
          setCounter(endValue);
          clearInterval(timer);
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className={`flex flex-col items-center justify-center space-y-2 ${classname} text-center`}
    >
      <h3 className="text-4xl font-bold">
        {value.toString().includes("+") ? `${counter}+` : counter}
        {value.toString().includes("%") ? "%" : ""}
        {value.toString() === "24/7" ? "24/7" : ""}
      </h3>
      <p className="text-muted-foreground">{text}</p>
    </motion.div>
  );
};

const SectionGlow = ({ children, className = "" }) => {
  const sectionRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    };

    section.addEventListener('mousemove', handleMouseMove);

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  return (
    <div
      ref={sectionRef}
      className={`relative ${className}`}
    >
      {/* Shared glow layer */}
      {!isMobile && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px,
              rgba(59, 130, 246, 0.15) 0%,
              rgba(147, 51, 234, 0.1) 25%,
              transparent 50%)`,
            filter: 'blur(40px)',
          }}
        />
      )}
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

const timelineData = [
  {
    id: 1,
    title: "AI-Powered Career Guidance",
    content: "Advanced AI analytics provide personalized career insights, skill gap analysis, and industry trends to guide your professional journey.",
    status: "completed",
    date: "2024",
    energy: 95,
    icon: Zap,
    relatedIds: [2, 3, 4],
  },
  {
    id: 2,
    title: "Industry-Aligned Curriculum",
    content: "Comprehensive learning paths designed with industry experts, featuring cutting-edge tools and technologies that match current market demands.",
    status: "completed",
    date: "2024",
    energy: 90,
    icon: BookOpen,
    relatedIds: [1, 5, 6],
  },
  {
    id: 3,
    title: "Real-World Internships",
    content: "Hands-on experience through partnerships with 200+ companies, providing authentic project work and industry exposure.",
    status: "completed",
    date: "2024",
    energy: 88,
    icon: Briefcase,
    relatedIds: [1, 4, 5],
  },
  {
    id: 4,
    title: "Startup & Founder Mindset",
    content: "Entrepreneurial training programs that foster innovation, problem-solving, and business acumen for aspiring founders.",
    status: "completed",
    date: "2024",
    energy: 85,
    icon: Rocket,
    relatedIds: [1, 3, 6],
  },
  {
    id: 5,
    title: "Placement & Career Resources",
    content: "Comprehensive preparation with AI mock interviews, ATS-optimized resume building, and company-specific training.",
    status: "completed",
    date: "2024",
    energy: 92,
    icon: Award,
    relatedIds: [2, 3, 6],
  },
  {
    id: 6,
    title: "Lifetime Learning Access",
    content: "Continuous access to resources, updates, and community support for lifelong career development and growth.",
    status: "completed",
    date: "2024",
    energy: 87,
    icon: Clock,
    relatedIds: [2, 4, 5],
  },
];

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const testimonialRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [isMobile, setIsMobile] = useState(false);

  const featuresFadeIn = useAnimation();
  const isFeaturesSectionInView = useInView(featuresRef, { once: true });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isFeaturesSectionInView) {
      featuresFadeIn.start("visible");
    }
  }, [isFeaturesSectionInView, featuresFadeIn]);

  useLayoutEffect(() => {
    const durationMultiplier = isMobile ? 0.5 : 1;
    const staggerMultiplier = isMobile ? 0.5 : 1;

    gsap.from("#features-title", {
      scale: 0.8,
      opacity: 0,
      duration: 0.7 * durationMultiplier,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#features-title",
        start: "top 80%",
      },
    });

    gsap.from(".feature-card", {
      y: 60,
      opacity: 0,
      duration: 0.8 * durationMultiplier,
      stagger: 0.2 * staggerMultiplier,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".feature-card",
        start: "top 85%",
      },
    });

    // Stats number animation
    const statEls = document.querySelectorAll('.stat-number');
    statEls.forEach((el) => {
      const target = parseInt(el.getAttribute('data-target'));
      let suffix = el.textContent.replace(/\d+/g, '');
      gsap.fromTo(el, {
        innerText: 0
      }, {
        innerText: target,
        duration: 1.5 * durationMultiplier,
        ease: 'power1.out',
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: el,
          start: 'top 90%'
        },
        onUpdate: function () {
          if (suffix === '+') {
            el.textContent = Math.floor(el.innerText) + '+';
          } else if (suffix === '%') {
            el.textContent = Math.floor(el.innerText) + '%';
          } else if (suffix === '/7') {
            el.textContent = Math.floor(el.innerText) + '/7';
          }
        }
      });
    });

    gsap.from("#how-section", {
      scale: 0.8,
      opacity: 0,
      duration: 0.7 * durationMultiplier,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#how-section",
        start: "top 80%",
      },
    });
    gsap.from(".how-card", {
      y: 60,
      opacity: 0,
      duration: 0.8 * durationMultiplier,
      stagger: 0.2 * staggerMultiplier,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".how-card",
        start: "top 85%",
      },
    });
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/70 via-secondary/70 to-primary/70 z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Professional SaaS Background Layer */}
      <div className="fixed inset-0 -z-10 bg-[#F8FAFC]">
        {/* Animated Background Mesh */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] bg-indigo-50/50 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-[-10%] left-[-5%] w-[60%] h-[60%] bg-blue-50/50 rounded-full blur-[120px]"
        />

        {/* Even Bolder Global Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.1] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#4F46E5 1.5px, transparent 1.5px), linear-gradient(90deg, #4F46E5 1.5px, transparent 1.5px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <section id="hero" aria-label="Hero Section">
        <HeroSection />
      </section>

      {/* Partner Logos & Stats Section */}
      <section className="w-full py-12 bg-white border-b border-slate-100 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          {/* Animated scrolling container */}
          <div className="relative">
            <div className="flex animate-scroll">
              {/* First set of items */}
              <div className="flex items-center space-x-12 md:space-x-16 flex-shrink-0">
                <Image
                  src="/internship (1).png"
                  alt="Internship Partner"
                  width={140}
                  height={70}
                  className="h-12 md:h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
                <Image
                  src="/image (4).png"
                  alt="Partner Logo 4"
                  width={140}
                  height={70}
                  className="h-12 md:h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
                <Image
                  src="/college se placement.jpg"
                  alt="College Placement Partner"
                  width={140}
                  height={70}
                  className="h-12 md:h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
                <Image
                  src="/image (3).png"
                  alt="Partner Logo 3"
                  width={140}
                  height={70}
                  className="h-12 md:h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />

                {/* Stats */}
                <div className="flex items-center space-x-12 md:space-x-16 px-8 border-l border-slate-100">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-black text-indigo-600">5000+</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Students Prepped</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-black text-indigo-600">85%</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ATS Score Peak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-black text-indigo-600">200+</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Institutions</div>
                  </div>
                </div>
              </div>

              {/* Duplicate set for seamless loop */}
              <div className="flex items-center space-x-12 md:space-x-16 flex-shrink-0">
                <Image
                  src="/internship (1).png"
                  alt="Internship Partner"
                  width={140}
                  height={70}
                  className="h-12 md:h-16 w-auto object-contain opacity-70"
                />
                <div className="flex items-center space-x-12 md:space-x-16 px-8 border-l border-slate-100">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-black text-indigo-600">24/7</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">AI Mentorship</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-black text-indigo-600 text-slate-900">AICTE</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Portal Aligned</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
        `}</style>
      </section>

      {/* About Us Section */}
      <section className="w-full py-12 md:py-20 bg-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex justify-center lg:order-2"
            >
              <div className="h-96 lg:h-[500px] w-full">
                <RadialOrbitalTimeline timelineData={timelineData} />
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="lg:order-1"
            >
              <motion.h2
                variants={fadeIn}
                className="text-3xl md:text-4xl font-bold mb-3 text-slate-900"
              >
                About TechieHelp Institute of AI
              </motion.h2>
              <motion.p
                variants={fadeIn}
                className="text-sm font-semibold text-indigo-600 mb-4 uppercase tracking-widest"
              >
                An AI Software Company–Backed Career Intelligence Platform
              </motion.p>
              <motion.p
                variants={fadeIn}
                className="text-lg text-slate-600 mb-4 leading-relaxed font-medium"
              >
                TechieHelp Institute of AI is an <strong>AI-powered career intelligence and placement readiness platform</strong> — built by TechieHelp, an established AI software development company. Our platform helps students prepare for placements with precision, and equips college TPOs with real-time data to support better placement decisions.
              </motion.p>
              <motion.p
                variants={fadeIn}
                className="text-lg text-slate-600 mb-4 leading-relaxed font-medium"
              >
                We are <strong>not a hiring platform</strong>. We are the infrastructure that makes students job-ready and makes placement processes data-driven, fair, and efficient.
              </motion.p>
              <motion.div variants={fadeIn} className="flex flex-wrap gap-2 mt-2">
                {["MSME Certified", "ISO Certified", "AICTE Aligned", "Founder-Led"].map(badge => (
                  <span key={badge} className="text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100 px-3 py-1 rounded-full uppercase tracking-wider">{badge}</span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Internship & Training Section */}
      <section className="w-full py-16 md:py-24 bg-transparent border-t border-slate-100/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex justify-center order-2 lg:order-1"
            >
              <div className="relative group p-4 md:p-6 bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-[0_20px_50px_rgba(79,70,229,0.1)]">
                <div className="absolute -inset-2 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-[3rem] blur-2xl group-hover:from-indigo-500/20 group-hover:to-purple-500/20 transition-all duration-700"></div>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full max-w-lg h-auto object-cover rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] relative z-10 border-2 border-white"
                >
                  <source src="/internship.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="order-1 lg:order-2"
            >
              <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
                Internship & Skill Training Programs
              </motion.h2>
              <motion.p variants={fadeIn} className="text-lg text-slate-600 mb-8 leading-relaxed">
                Our structured internship and training programs are aligned with the <strong>AICTE National Internship Portal</strong> and designed to build real, demonstrable skills — not just theoretical knowledge. Students gain hands-on experience through live projects mentored by industry practitioners.
              </motion.p>
              <motion.ul variants={fadeIn} className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="p-1 bg-indigo-50 rounded-lg text-indigo-600 mt-1 flex-shrink-0">
                    <Rocket className="w-5 h-5" />
                  </div>
                  <span className="text-slate-700">AICTE-aligned internship programs with structured learning paths</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1 bg-indigo-50 rounded-lg text-indigo-600 mt-1 flex-shrink-0">
                    <Code className="w-5 h-5" />
                  </div>
                  <span className="text-slate-700">Live project experience with GitHub-tracked deliverables</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1 bg-indigo-50 rounded-lg text-indigo-600 mt-1 flex-shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="text-slate-700">Domain-specific skill building validated by AI assessments</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1 bg-indigo-50 rounded-lg text-indigo-600 mt-1 flex-shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-slate-700">Certification-backed portfolio — preparation tool, not a job guarantee</span>
                </li>
              </motion.ul>
              <motion.div variants={fadeIn}>
                <Link href="/internship/student/dashboard">
                  <Button size="lg" className="px-10 h-14 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-xl">
                    Explore Training Programs
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose TechieHelp Institute of AI */}
      <section className="w-full py-16 md:py-24 bg-transparent border-t border-slate-100/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side: Animation */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex justify-center order-2 lg:order-1"
            >
              <div className="p-8 rounded-3xl bg-indigo-50/50 border border-indigo-100 shadow-inner">
                <WhyChooseTechieHelp
                  title="AI-Powered Career Ecosystem"
                  circleText="AI"
                  badgeTexts={{
                    first: "Learn",
                    second: "Build",
                    third: "Intern",
                    fourth: "Place"
                  }}
                  buttonTexts={{
                    first: "TechieHelp",
                    second: "AI Institute"
                  }}
                  lightColor="#4F46E5"
                />
              </div>
            </motion.div>

            {/* Right Side: Text Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="order-1 lg:order-2 text-slate-900"
            >
              <motion.h2
                variants={fadeIn}
                className="text-3xl md:text-4xl font-bold mb-6 text-slate-900"
              >
                Why TechieHelp Institute of AI?
              </motion.h2>
              <motion.p
                variants={fadeIn}
                className="text-lg text-slate-600 mb-8 leading-relaxed"
              >
                Built by an AI software company, we don&apos;t just teach — we build the intelligence layer that makes placement preparation measurable, personalized, and scalable for both students and institutions.
              </motion.p>
              <motion.ul
                variants={fadeIn}
                className="space-y-4 mb-8"
              >
                <li className="flex items-start gap-4">
                  <div className="mt-1 p-1 bg-green-50 rounded-md">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-slate-700"><strong>AI Resume Scoring</strong> — ATS analysis with specific improvement feedback, not generic tips</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 p-1 bg-green-50 rounded-md">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-slate-700"><strong>AI Mock Interviews</strong> — Aptitude, Technical &amp; HR rounds with automated performance evaluation</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 p-1 bg-green-50 rounded-md">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-slate-700"><strong>Skill Gap Detection</strong> — AI identifies weak areas and generates personalized preparation paths</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 p-1 bg-green-50 rounded-md">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-slate-700"><strong>TPO Dashboards</strong> — Real-time student readiness scores, GitHub activity, and ranking tools</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 p-1 bg-indigo-50 rounded-md">
                    <Award className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span className="text-slate-700"><strong>MSME · ISO · AICTE</strong> — Certified, credible, and built for scale</span>
                </li>
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI-Driven Career Growth Platform */}
      <section className="w-full py-20 md:py-28 bg-[#F8FAFC]">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side: Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="order-1 lg:order-1"
            >
              <motion.h2
                variants={fadeIn}
                className="text-4xl md:text-5xl font-black mb-6 text-slate-900 leading-tight"
              >
                How AI Powers Placement Readiness
              </motion.h2>
              <motion.p
                variants={fadeIn}
                className="text-lg text-slate-600 mb-8 leading-relaxed font-medium"
              >
                Our platform uses AI at every stage of the career preparation journey — from building an ATS-optimized resume, to evaluating mock interview responses, to detecting skill gaps and generating a personalized roadmap. Every insight is data-backed, not generic.
              </motion.p>
              <motion.div
                variants={fadeIn}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      className="px-8 h-12 md:h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-xl shadow-indigo-200"
                    >
                      Start Preparing with AI
                    </Button>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link href="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="px-8 h-12 md:h-14 rounded-full border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold shadow-sm"
                    >
                      Request Dashboard Demo
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Side: Feature Cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 lg:order-2"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "AI Resume Builder",
                    icon: <FileText className="h-5 w-5 text-indigo-600" />,
                    description: "ATS score analysis with section-by-section feedback",
                    delay: 0.2
                  },
                  {
                    title: "AI Mock Interviews",
                    icon: <Users className="h-5 w-5 text-purple-600" />,
                    description: "Aptitude, Technical & HR rounds with AI evaluation",
                    delay: 0.3
                  },
                  {
                    title: "Skill Gap Detection",
                    icon: <BarChart3 className="h-5 w-5 text-indigo-600" />,
                    description: "Identifies weak areas and builds personalized prep paths",
                    delay: 0.4
                  },
                  {
                    title: "TPO Readiness Dashboard",
                    icon: <TrendingUp className="h-5 w-5 text-purple-600" />,
                    description: "Student rankings, GitHub analytics & placement insights",
                    delay: 0.5
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: item.delay }}
                    viewport={{ once: true }}
                    className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-slate-50 rounded-xl">
                        {item.icon}
                      </div>
                      <h3 className="font-bold text-slate-900">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <InterviewPlacementSection />

      {/* Career Branding Lab */}
      <section className="w-full py-16 md:py-24 bg-transparent border-t border-slate-100/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex justify-center order-2 lg:order-1"
            >
              <div className="relative group p-4 md:p-6 bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-[0_20px_50px_rgba(168,85,247,0.1)]">
                <div className="absolute -inset-2 bg-gradient-to-tr from-purple-500/10 to-indigo-500/10 rounded-[3rem] blur-2xl group-hover:from-purple-500/20 group-hover:to-indigo-500/20 transition-all duration-700"></div>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full max-w-lg h-auto object-cover rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] relative z-10 border-2 border-white"
                >
                  <source src="/Career.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="order-1 lg:order-2"
            >
              <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
                Career Branding Lab
              </motion.h2>
              <motion.p variants={fadeIn} className="text-lg text-slate-600 mb-4 leading-relaxed font-medium">
                Strong skills alone don&apos;t win interviews — your professional presence does. Most students lose shortlisting opportunities because their LinkedIn, GitHub, and portfolio don&apos;t communicate their real capabilities.
              </motion.p>
              <motion.p variants={fadeIn} className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
                The Career Branding Lab uses AI to help you audit, optimize, and rebuild your professional profile — so your digital presence matches your actual potential.
              </motion.p>
              <motion.div variants={fadeIn}>
                <Link href="/career-branding-lab">
                  <Button size="lg" className="px-10 h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-xl shadow-indigo-200">
                    Optimize My Profile
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder & Startup School */}
      <section className="w-full py-20 md:py-28 bg-transparent border-t border-slate-100/50">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="order-1 lg:order-1"
            >
              <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
                Founder &amp; Startup Mindset Program
              </motion.h2>
              <motion.p variants={fadeIn} className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
                For students who want to <span className="font-bold text-indigo-600">build, not just apply</span>. This program covers the fundamentals of <span className="font-bold text-indigo-600">startups, product thinking, and freelancing</span> — structured alongside your core career preparation. Entrepreneurship as a mindset, not a distraction.
              </motion.p>
              <motion.div variants={fadeIn}>
                <Link href="/contact">
                  <Button size="lg" className="px-10 h-14 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-xl">
                    Explore Founder Program
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex justify-center order-2 lg:order-2"
            >
              <div className="relative group p-4 md:p-6 bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-[0_20px_50px_rgba(15,23,42,0.1)]">
                <div className="absolute -inset-2 bg-gradient-to-tr from-slate-900/5 to-indigo-900/5 rounded-[3rem] blur-2xl group-hover:from-slate-900/10 group-hover:to-indigo-900/10 transition-all duration-700"></div>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full max-w-lg h-auto object-cover rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] relative z-10 border-2 border-white"
                >
                  <source src="/startup.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lifetime Career Resources */}
      <section className="w-full py-20 md:py-28 bg-transparent border-t border-slate-100/50">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex justify-center order-1 lg:order-1"
            >
              <div className="relative group">
                <div className="absolute -inset-12 bg-indigo-500/10 rounded-full blur-[120px] group-hover:bg-indigo-500/20 transition-all duration-700"></div>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full max-w-lg h-auto object-cover rounded-3xl shadow-[0_20px_60px_rgba(79,70,229,0.25)] relative z-10 border-2 border-white/50 backdrop-blur-sm"
                  onLoadedMetadata={(e) => {
                    e.currentTarget.playbackRate = 0.7;
                  }}
                >
                  <source src="/certificates.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="order-2"
            >
              <motion.h2
                variants={fadeIn}
                className="text-3xl md:text-4xl font-bold mb-6 text-slate-900"
              >
                Lifetime Career Preparation Resources
              </motion.h2>
              <motion.p
                variants={fadeIn}
                className="text-lg text-slate-600 mb-6 leading-relaxed font-medium"
              >
                Most students enter placements underprepared — not because they lack potential, but because they lacked structured, AI-driven guidance.
                Our career resources library gives students <span className="font-bold text-indigo-600">lifetime access</span> to the tools they need to continuously improve.
              </motion.p>
              <motion.ul variants={fadeIn} className="space-y-4 mb-10">
                {[
                  "AI Resume Builder with ATS optimization scoring",
                  "Mock interview bank — Aptitude, Technical & HR",
                  "Skill assessment reports with gap analysis",
                  "Certification-backed learning paths",
                  "Career branding & LinkedIn/GitHub profile audits",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 p-1 bg-indigo-50 rounded-md">
                      <CheckCircle className="w-4 h-4 text-indigo-600" />
                    </div>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </motion.ul>
              <motion.div variants={fadeIn}>
                <Link href="/dashboard">
                  <Button size="lg" className="px-10 h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-xl shadow-indigo-200">
                    Access Career Resources
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* College & TPO Partnerships */}
      <section className="w-full py-20 md:py-28 bg-transparent border-t border-slate-100/50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl font-black mb-6 text-slate-900 leading-tight">
              For Colleges &amp; <br className="hidden md:block" /> Training Placement Officers
            </motion.h2>
            <motion.p variants={fadeIn} className="text-lg text-slate-600 max-w-3xl mx-auto mb-4 font-medium">
              TPOs spend significant manual effort tracking student readiness — often relying on self-reported data and inconsistent resume formats. Our platform gives TPOs a real-time, AI-powered view of every student&apos;s placement preparedness.
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {[
              { icon: <BarChart3 className="w-6 h-6 text-indigo-600" />, title: "Student Skill Dashboards", desc: "Track individual and batch-level readiness in real time" },
              { icon: <Github className="w-6 h-6 text-indigo-600" />, title: "GitHub & Coding Analytics", desc: "Verify actual coding activity and portfolio quality" },
              { icon: <TrendingUp className="w-6 h-6 text-purple-600" />, title: "Placement Readiness Scores", desc: "AI-computed indicators based on resume, interviews & skills" },
              { icon: <Users className="w-6 h-6 text-purple-600" />, title: "Ranking & Comparison Tools", desc: "Fair, data-backed shortlisting — reducing manual effort" },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl transition-all"
              >
                <div className="mb-4 p-3 bg-slate-50 w-fit rounded-xl">{card.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{card.title}</h3>
                <p className="text-sm text-slate-600 font-medium">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link href="/contact">
              <Button size="lg" className="px-10 h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-xl shadow-indigo-100">
                Request Dashboard Demo
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="px-10 h-14 rounded-full border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold shadow-sm">
                Partner with TechieHelp
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-20 md:py-28 bg-transparent overflow-hidden border-t border-slate-100/50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl font-black mb-6 text-slate-900 leading-tight">
              What Students &amp; Institutions Say
            </motion.h2>
            <motion.p variants={fadeIn} className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
              Hear from students who improved their placement readiness, and from institutional partners who enhanced their TPO process with data-driven insights.
            </motion.p>
          </motion.div>
          <div className="relative">
            <div className="absolute top-1/2 -left-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2"></div>
            <div className="absolute top-1/2 -right-4 w-24 h-24 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2"></div>
            <TestimonialCarousel testimonials={testimonial} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-transparent border-t border-slate-100/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative rounded-[3rem] bg-indigo-600 p-12 md:p-20 overflow-hidden text-center">
            {/* CTA Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="relative z-10"
            >
              <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                Start Your AI-Powered <br className="hidden md:block" /> Placement Journey
              </motion.h2>
              <motion.p variants={fadeIn} className="text-lg text-indigo-50 mb-12 max-w-2xl mx-auto font-medium">
                Whether you&apos;re a student preparing for placements, a college TPO looking for data-driven tools, or an organization looking to partner — TechieHelp Institute of AI has a clear path for you.
              </motion.p>
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-6 justify-center flex-wrap">
                <Link href="/dashboard">
                  <Button size="lg" className="px-10 h-14 rounded-full bg-white text-indigo-600 hover:bg-slate-50 font-bold shadow-xl group">
                    Start Preparing with AI
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="px-10 h-14 rounded-full border-indigo-400 text-white hover:bg-white/10 font-bold">
                    Request Dashboard Demo
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="ghost" className="px-10 h-14 rounded-full text-indigo-50 hover:bg-white/5 font-bold">
                    Partner with TechieHelp
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scroll To Top Button */}
      <ScrollToTop />
    </>
  );
}
