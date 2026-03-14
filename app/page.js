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

      {/* Professional Education + AI Institute Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 dark:from-slate-900 dark:via-blue-950/30 dark:to-indigo-950/50"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20 dark:opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Floating AI/Education Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-green-400/20 to-blue-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-br from-indigo-400/20 to-cyan-500/20 rounded-full blur-xl animate-pulse delay-3000"></div>

        {/* Circuit-like patterns */}
        <svg className="absolute inset-0 w-full h-full opacity-5 dark:opacity-3" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M10 10 L90 10 M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <circle cx="50" cy="50" r="2" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      <section id="hero" aria-label="Hero Section">
        <HeroSection />
      </section>

      {/* Partner Logos & Stats Section */}
      <section className="w-full py-8 bg-background border-t border-b overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          {/* Animated scrolling container */}
          <div className="relative">
            <div className="flex animate-scroll">
              {/* First set of items */}
              <div className="flex items-center space-x-8 md:space-x-12 flex-shrink-0">
                <Image
                  src="/internship (1).png"
                  alt="Internship Partner"
                  width={120}
                  height={60}
                  className="h-16 md:h-20 lg:h-24 w-auto object-contain"
                />
                <Image
                  src="/image (4).png"
                  alt="Partner Logo 4"
                  width={120}
                  height={60}
                  className="h-16 md:h-20 lg:h-24 w-auto object-contain"
                />
                <Image
                  src="/college se placement.jpg"
                  alt="College Placement Partner"
                  width={120}
                  height={60}
                  className="h-16 md:h-20 lg:h-24 w-auto object-contain"
                />
                <Image
                  src="/image (3).png"
                  alt="Partner Logo 3"
                  width={120}
                  height={60}
                  className="h-16 md:h-20 lg:h-24 w-auto object-contain"
                />

                {/* Stats */}
                <div className="flex items-center space-x-8 md:space-x-12">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-primary">5000+</div>
                    <div className="text-sm text-muted-foreground">Students Using AI Tools</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-primary">85%</div>
                    <div className="text-sm text-muted-foreground">Improved Resume Readiness</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-primary">200+</div>
                    <div className="text-sm text-muted-foreground">Colleges, Mentors & Partners</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-primary">24/7</div>
                    <div className="text-sm text-muted-foreground">AI Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-primary">AICTE</div>
                    <div className="text-sm text-muted-foreground">Internship Portal Aligned</div>
                  </div>
                </div>
              </div>

              {/* Duplicate set for seamless loop */}
              <div className="flex items-center space-x-8 md:space-x-12 flex-shrink-0">
                <Image
                  src="/internship (1).png"
                  alt="Internship Partner"
                  width={120}
                  height={60}
                  className="h-16 md:h-20 lg:h-24 w-auto object-contain"
                />
                <Image
                  src="/image (4).png"
                  alt="Partner Logo 4"
                  width={120}
                  height={60}
                  className="h-16 md:h-20 lg:h-24 w-auto object-contain"
                />
                <Image
                  src="/college se placement.jpg"
                  alt="College Placement Partner"
                  width={120}
                  height={60}
                  className="h-16 md:h-20 lg:h-24 w-auto object-contain"
                />
                <Image
                  src="/image (3).png"
                  alt="Partner Logo 3"
                  width={120}
                  height={60}
                  className="h-16 md:h-20 lg:h-24 w-auto object-contain"
                />

                {/* Stats */}
                <div className="flex items-center space-x-8 md:space-x-12">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-primary">5000+</div>
                    <div className="text-sm text-muted-foreground">Students Using AI Tools</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-primary">85%</div>
                    <div className="text-sm text-muted-foreground">Improved Resume Readiness</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-primary">200+</div>
                    <div className="text-sm text-muted-foreground">Colleges, Mentors & Partners</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-primary">24/7</div>
                    <div className="text-sm text-muted-foreground">AI Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-primary">AICTE</div>
                    <div className="text-sm text-muted-foreground">Internship Portal Aligned</div>
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
            animation: scroll 20s linear infinite;
          }
        `}</style>
      </section>

      {/* About Us Section */}
      <section className="w-full py-12 md:py-20 bg-background">
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
                className="text-3xl md:text-4xl font-bold mb-3"
              >
                About TechieHelp Institute of AI
              </motion.h2>
              <motion.p
                variants={fadeIn}
                className="text-sm font-semibold text-primary mb-4 uppercase tracking-widest"
              >
                An AI Software Company–Backed Career Intelligence Platform
              </motion.p>
              <motion.p
                variants={fadeIn}
                className="text-lg text-muted-foreground mb-4 leading-relaxed"
              >
                TechieHelp Institute of AI is an <strong>AI-powered career intelligence and placement readiness platform</strong> — built by TechieHelp, an established AI software development company. Our platform helps students prepare for placements with precision, and equips college TPOs with real-time data to support better placement decisions.
              </motion.p>
              <motion.p
                variants={fadeIn}
                className="text-lg text-muted-foreground mb-4 leading-relaxed"
              >
                We are <strong>not a hiring platform</strong>. We are the infrastructure that makes students job-ready and makes placement processes data-driven, fair, and efficient.
              </motion.p>
              <motion.div variants={fadeIn} className="flex flex-wrap gap-2 mt-2">
                {["MSME Certified", "ISO Certified", "AICTE Aligned", "Founder-Led"].map(badge => (
                  <span key={badge} className="text-xs font-semibold bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full">{badge}</span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Internship & Training Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex justify-center order-2 lg:order-1"
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full max-w-lg h-auto object-cover rounded-lg shadow-2xl"
              >
                <source src="/internship.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="order-1 lg:order-2"
            >
              <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-6">
                Internship & Skill Training Programs
              </motion.h2>
              <motion.p variants={fadeIn} className="text-lg text-gray-300 mb-8 leading-relaxed">
                Our structured internship and training programs are aligned with the <strong>AICTE National Internship Portal</strong> and designed to build real, demonstrable skills — not just theoretical knowledge. Students gain hands-on experience through live projects mentored by industry practitioners.
              </motion.p>
              <motion.ul variants={fadeIn} className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Rocket className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <span className="text-gray-300">AICTE-aligned internship programs with structured learning paths</span>
                </li>
                <li className="flex items-start gap-3">
                  <Code className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <span className="text-gray-300">Live project experience with GitHub-tracked deliverables</span>
                </li>
                <li className="flex items-start gap-3">
                  <BookOpen className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <span className="text-gray-300">Domain-specific skill building validated by AI assessments</span>
                </li>
                <li className="flex items-start gap-3">
                  <FileText className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <span className="text-gray-300">Certification-backed portfolio — preparation tool, not a job guarantee</span>
                </li>
              </motion.ul>
              <motion.div variants={fadeIn}>
                <Link href="/internships">
                  <Button size="lg" className="px-8 bg-primary hover:bg-primary/90 text-white shadow-lg">
                    Explore Training Programs
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose TechieHelp Institute of AI */}
      <section className="w-full py-16 md:py-24 bg-black">
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
                lightColor="#10B981"
              />
            </motion.div>

            {/* Right Side: Text Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="order-1 lg:order-2 text-white"
            >
              <motion.h2
                variants={fadeIn}
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                Why TechieHelp Institute of AI?
              </motion.h2>
              <motion.p
                variants={fadeIn}
                className="text-lg text-gray-300 mb-8 leading-relaxed"
              >
                Built by an AI software company, we don&apos;t just teach — we build the intelligence layer that makes placement preparation measurable, personalized, and scalable for both students and institutions.
              </motion.p>
              <motion.ul
                variants={fadeIn}
                className="space-y-4 mb-8"
              >
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <span className="text-gray-300"><strong>AI Resume Scoring</strong> — ATS analysis with specific improvement feedback, not generic tips</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <span className="text-gray-300"><strong>AI Mock Interviews</strong> — Aptitude, Technical &amp; HR rounds with automated performance evaluation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <span className="text-gray-300"><strong>Skill Gap Detection</strong> — AI identifies weak areas and generates personalized preparation paths</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <span className="text-gray-300"><strong>TPO Dashboards</strong> — Real-time student readiness scores, GitHub activity, and ranking tools</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <span className="text-gray-300"><strong>MSME · ISO · AICTE</strong> — Certified, credible, and built for scale</span>
                </li>
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI-Driven Career Growth Platform */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-br from-green-500/30 to-blue-600/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-500/20 to-cyan-600/20 rounded-full blur-3xl"></div>
        </div>

        {/* Tech Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

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
                className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
              >
                How AI Powers Placement Readiness
              </motion.h2>
              <motion.p
                variants={fadeIn}
                className="text-lg text-gray-300 mb-8 leading-relaxed"
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
                      className="px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
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
                      className="px-8 border-2 border-gray-400 hover:border-gray-200 text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-300"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "AI Resume Builder",
                    icon: <FileText className="h-5 w-5" />,
                    description: "ATS score analysis with section-by-section feedback",
                    delay: 0.6
                  },
                  {
                    title: "AI Mock Interviews",
                    icon: <Users className="h-5 w-5" />,
                    description: "Aptitude, Technical & HR rounds with AI evaluation",
                    delay: 0.7
                  },
                  {
                    title: "Skill Gap Detection",
                    icon: <BarChart3 className="h-5 w-5" />,
                    description: "Identifies weak areas and builds personalized prep paths",
                    delay: 0.8
                  },
                  {
                    title: "TPO Readiness Dashboard",
                    icon: <TrendingUp className="h-5 w-5" />,
                    description: "Student rankings, GitHub analytics & placement insights",
                    delay: 0.9
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: item.delay }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/15 hover:border-white/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-white/20 rounded-lg">
                        {item.icon}
                      </div>
                      <h3 className="text-sm font-semibold text-white">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-300">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <InterviewPlacementSection />

      {/* Career Branding Lab */}
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex justify-center order-2 lg:order-1"
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full max-w-lg h-auto object-cover rounded-lg shadow-2xl"
              >
                <source src="/Career.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="order-1 lg:order-2"
            >
              <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-6">
                Career Branding Lab
              </motion.h2>
              <motion.p variants={fadeIn} className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Strong skills alone don&apos;t win interviews — your professional presence does. Most students lose shortlisting opportunities because their LinkedIn, GitHub, and portfolio don&apos;t communicate their real capabilities.
              </motion.p>
              <motion.p variants={fadeIn} className="text-lg text-muted-foreground mb-8 leading-relaxed">
                The Career Branding Lab uses AI to help you audit, optimize, and rebuild your professional profile — so your digital presence matches your actual potential.
              </motion.p>
              <motion.div variants={fadeIn}>
                <Link href="/career-branding-lab">
                  <Button size="lg" className="px-8">
                    Optimize My Profile
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder & Startup School */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-r from-primary/5 to-secondary/5 relative overflow-hidden">
        <div className="grid-background absolute inset-0"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="order-1 lg:order-1"
            >
              <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-6">
                Founder &amp; Startup Mindset Program
              </motion.h2>
              <motion.p variants={fadeIn} className="text-lg text-muted-foreground mb-8 leading-relaxed">
                For students who want to <span className="font-semibold text-primary">build, not just apply</span>. This program covers the fundamentals of <span className="font-semibold text-primary">startups, product thinking, and freelancing</span> — structured alongside your core career preparation. Entrepreneurship as a mindset, not a distraction. A preparation tool that opens more doors, not a guarantee.
              </motion.p>
              <motion.div variants={fadeIn}>
                <Button size="lg" className="px-8">
                  Explore Founder Program
                </Button>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex justify-center order-2 lg:order-2"
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full max-w-lg h-auto object-cover rounded-lg shadow-2xl"
              >
                <source src="/startup.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lifetime Career Resources */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-slate-900 via-blue-900/80 to-indigo-900/60 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-br from-green-500/30 to-blue-600/30 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex justify-center order-1"
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full max-w-lg h-auto object-cover rounded-lg shadow-2xl"
                onLoadedMetadata={(e) => {
                  e.currentTarget.playbackRate = 0.7;
                }}
              >
                <source src="/certificates.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
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
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                Lifetime Career Preparation Resources
              </motion.h2>
              <motion.p
                variants={fadeIn}
                className="text-lg text-muted-foreground mb-6 leading-relaxed"
              >
                Most students enter placements underprepared — not because they lack potential, but because they lacked structured, AI-driven guidance.
                Our career resources library gives students <span className="font-semibold text-primary">lifetime access</span> to the tools they need to continuously improve.
              </motion.p>
              <motion.ul variants={fadeIn} className="space-y-3 mb-8">
                {[
                  "AI Resume Builder with ATS optimization scoring",
                  "Mock interview bank — Aptitude, Technical & HR",
                  "Skill assessment reports with gap analysis",
                  "Certification-backed learning paths",
                  "Career branding & LinkedIn/GitHub profile audits",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </motion.ul>
              <motion.div variants={fadeIn}>
                <Link href="/dashboard">
                  <Button size="lg" className="px-8">
                    Access Career Resources
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* College & TPO Partnerships */}
      <section className="w-full py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-4">
              For Colleges &amp; Training Placement Officers
            </motion.h2>
            <motion.p variants={fadeIn} className="text-lg text-muted-foreground max-w-3xl mx-auto mb-4">
              TPOs spend significant manual effort tracking student readiness — often relying on self-reported data and inconsistent resume formats. Our platform gives TPOs a real-time, AI-powered view of every student&apos;s placement preparedness.
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
          >
            {[
              { icon: <BarChart3 className="w-6 h-6 text-primary" />, title: "Student Skill Dashboards", desc: "Track individual and batch-level readiness in real time" },
              { icon: <Github className="w-6 h-6 text-primary" />, title: "GitHub & Coding Analytics", desc: "Verify actual coding activity and portfolio quality" },
              { icon: <TrendingUp className="w-6 h-6 text-primary" />, title: "Placement Readiness Scores", desc: "AI-computed indicators based on resume, interviews & skills" },
              { icon: <Users className="w-6 h-6 text-primary" />, title: "Ranking & Comparison Tools", desc: "Fair, data-backed shortlisting — reducing manual effort" },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-5 bg-background border rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <div className="mb-3">{card.icon}</div>
                <h3 className="font-semibold text-sm mb-1">{card.title}</h3>
                <p className="text-xs text-muted-foreground">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/contact">
              <Button size="lg" className="px-8">
                Request Dashboard Demo
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="px-8">
                Partner with TechieHelp
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-4">
              What Students &amp; Institutions Say
            </motion.h2>
            <motion.p variants={fadeIn} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from students who improved their placement readiness, and from institutional partners who enhanced their TPO process with data-driven insights.
            </motion.p>
          </motion.div>
          <TestimonialCarousel testimonials={testimonial} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-4">
              Start Your AI-Powered Placement Journey
            </motion.h2>
            <motion.p variants={fadeIn} className="text-lg mb-10 max-w-2xl mx-auto">
              Whether you&apos;re a student preparing for placements, a college TPO looking for data-driven tools, or an organization looking to partner — TechieHelp Institute of AI has a clear path for you.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <Link href="/dashboard">
                <Button size="lg" className="px-8 bg-white text-primary hover:bg-gray-100">
                  🎓 Start Preparing with AI
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="px-8 border-white text-white hover:bg-white hover:text-primary">
                  🏫 Request Dashboard Demo
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="px-8 border-white/60 text-white/90 hover:bg-white/10 hover:text-white">
                  🤝 Partner with TechieHelp
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Scroll To Top Button */}
      <ScrollToTop />
    </>
  );
}
