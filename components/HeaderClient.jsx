"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Mail,
  User,
  Trophy,
  Award,
  Brain,
  BarChart3,
  Code2,
  Smartphone,
  ShieldCheck,
  Cloud,
  Layout,
  Megaphone,
  GraduationCap,
  Briefcase,
  Terminal,
  CheckCircle,
  TrendingUp,
  Newspaper,
  Code,
  FileText,
  MessagesSquare,
  LayoutDashboard,
  HelpCircle,
  Handshake,
  Presentation,
  Network,
  Target,
  Lock,
  FileCheck,
  DollarSign,
  Cookie,
  ShieldAlert,
  Flame,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  ChevronRight
} from "lucide-react";

import AuthButtons from "./AuthButtons";
import { Button } from "./ui/button";

export default function HeaderClient({ user, streakData }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveCategory, setMobileActiveCategory] = useState(null);
  const timeoutRef = useRef(null);

  // Monitor scroll for sticky style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Safe hover state handlers
  const handleMouseEnter = (menuName) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menuName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 200);
  };

  const clearMenu = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(null);
  };

  // Close menus on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
        setMobileActiveCategory(null);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Menu Configuration
  const menuConfig = {
    company: {
      label: "Company",
      description: "Learn more about TechieHelp Institute of AI and our mission.",
      gridCards: [
        { title: "About Us", desc: "Learn about our vision and mission.", href: "/about", icon: Building2 },
        { title: "Contact Us", desc: "Get in touch with our team.", href: "/contact", icon: Mail },
        { title: "Founder & CEO", desc: "Meet Amit Kumar, Founder & CEO.", href: "/#founder", icon: User },
        { title: "Success Stories", desc: "Explore achievements and student journeys.", href: "/#success", icon: Trophy },
        { title: "Campus Ambassador Program", desc: "Become the face of TechieHelp on your campus.", href: "/campus-ambassador", icon: Award }
      ],
      featured: {
        badge: "ABOUT US",
        title: "BUILDING AI LEADERS",
        desc: "Empowering students through skills, internships, and opportunities.",
        btnText: "Explore Company",
        href: "/about"
      }
    },
    programs: {
      label: "Programs",
      description: "Explore industry-focused learning programs.",
      gridCards: [
        { title: "Artificial Intelligence & ML", desc: "Master AI algorithms, deep learning, and neural networks.", href: "/skill-development-programs", icon: Brain },
        { title: "Data Science", desc: "Learn statistics, data visualization, and predictive modeling.", href: "/skill-development-programs", icon: BarChart3 },
        { title: "Web Development", desc: "Build responsive, high-performance web applications.", href: "/skill-development-programs", icon: Code2 },
        { title: "App Development", desc: "Create native and cross-platform mobile apps.", href: "/skill-development-programs", icon: Smartphone },
        { title: "Cyber Security", desc: "Protect systems, networks, and data from cyber threats.", href: "/skill-development-programs", icon: ShieldCheck },
        { title: "Cloud Computing", desc: "Deploy and manage scalable cloud infrastructure.", href: "/skill-development-programs", icon: Cloud },
        { title: "UI/UX Design", desc: "Craft intuitive interfaces and user experiences.", href: "/skill-development-programs", icon: Layout },
        { title: "Digital Marketing", desc: "Grow brands and reach audiences through digital channels.", href: "/skill-development-programs", icon: Megaphone }
      ],
      featured: {
        badge: "PROGRAMS",
        title: "CAREER-FOCUSED LEARNING",
        desc: "Build industry-ready skills with practical learning.",
        btnText: "Explore Programs",
        href: "/skill-development-programs"
      }
    },
    training: {
      label: "Training & Internships",
      description: "Practical learning and real-world experience.",
      gridCards: [
        { title: "Training Programs", desc: "Comprehensive classroom and online training.", href: "/skill-development-programs", icon: GraduationCap },
        { title: "Internship Opportunities", desc: "Gain hands-on industry experience.", href: "/internship", icon: Briefcase },
        { title: "Live Projects", desc: "Work on real-world industrial projects.", href: "/internship", icon: Terminal },
        { title: "Professional Certifications", desc: "Earn industry-recognized credentials.", href: "/prep-resources", icon: Award },
        { title: "Verify Certificate", desc: "Validate the authenticity of your certificate.", href: "/#verify", icon: CheckCircle },
        { title: "Career Opportunities", desc: "Explore open career roles at TechieHelp.", href: "/latest-jobs", icon: TrendingUp }
      ],
      featured: {
        badge: "EXPERIENCE",
        title: "LEARN. INTERN. GROW.",
        desc: "Hands-on experience designed for future professionals.",
        btnText: "Apply Now",
        href: "/internship"
      }
    },
    resources: {
      label: "Resources",
      description: "Tools and resources for career growth.",
      gridCards: [
        { title: "Blog", desc: "Read articles on tech trends and career advice.", href: "/blog", icon: Newspaper },
        { title: "Coding Challenges", desc: "Solve coding problems and improve logic.", href: "/dsa", icon: Code },
        { title: "Resume Builder", desc: "Build ATS-friendly resumes using AI.", href: "/resume", icon: FileText },
        { title: "Interview Preparation", desc: "Practice mock interviews and review answers.", href: "/mock-interview", icon: MessagesSquare },
        { title: "Student Dashboard", desc: "Access your courses, tasks, and progress.", href: "/internship/student/dashboard", icon: LayoutDashboard },
        { title: "FAQs", desc: "Find answers to frequently asked questions.", href: "/#faq", icon: HelpCircle }
      ],
      featured: {
        badge: "CAREER ACCELERATOR",
        title: "BECOME PLACEMENT-READY",
        desc: "Resources that help students become placement-ready.",
        btnText: "Explore Resources",
        href: "/prep-resources"
      }
    },
    colleges: {
      label: "For Colleges & TPO",
      description: "Institutional collaborations and skill development initiatives.",
      gridCards: [
        { title: "Campus Partnership", desc: "Collaborate with us for campus training.", href: "/campus-partnership", icon: Handshake },
        { title: "Workshops & Seminars", desc: "Organize technical workshops for students.", href: "/workshops-seminars", icon: Presentation },
        { title: "Skill Development Programs", desc: "Implement skill training programs on campus.", href: "/skill-development-programs", icon: TrendingUp },
        { title: "Institutional Collaborations", desc: "Build strategic institutional alliances.", href: "/institutional-collaborations", icon: Network },
        { title: "Placement Support", desc: "Provide industry readiness and placement assistance.", href: "/placement-support", icon: Target }
      ],
      featured: {
        badge: "PARTNERSHIPS",
        title: "ACADEMIC COLLABORATION",
        desc: "Empowering institutions through training and innovation.",
        btnText: "Request Partnership",
        href: "/campus-partnership"
      }
    },
    legal: {
      label: "Legal & Compliance",
      description: "Policies and trust framework.",
      gridCards: [
        { title: "Privacy Policy", desc: "Understand how we protect your data.", href: "/privacy", icon: Lock },
        { title: "Terms & Conditions", desc: "Review our terms of service and agreement.", href: "/terms", icon: FileCheck },
        { title: "Refund Policy", desc: "Read our fee refund guidelines.", href: "/refund-policy", icon: DollarSign },
        { title: "Cookie Policy", desc: "Manage cookie preferences and usage.", href: "/cookie-policy", icon: Cookie },
        { title: "Acceptable Use Policy", desc: "Understand acceptable user behaviors.", href: "/acceptable-use", icon: ShieldAlert },
        { title: "Certificate Verification Policy", desc: "Guidelines on verification and security.", href: "/verification-policy", icon: CheckCircle }
      ],
      featured: {
        badge: "TRUST & COMPLIANCE",
        title: "TRUST & TRANSPARENCY",
        desc: "Building a secure and reliable learning ecosystem.",
        btnText: "View Policies",
        href: "/privacy"
      }
    }
  };

  // Helper to trigger mobile active category toggle
  const toggleMobileCategory = (cat) => {
    if (mobileActiveCategory === cat) {
      setMobileActiveCategory(null);
    } else {
      setMobileActiveCategory(cat);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-white/95 dark:bg-slate-950/95 border-slate-200/60 dark:border-slate-800/60 shadow-md backdrop-blur-md"
          : "bg-white/80 dark:bg-slate-950/80 border-slate-200/20 dark:border-slate-800/20 backdrop-blur-sm"
      }`}
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6 h-24 md:h-28 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" onClick={clearMenu} className="flex items-center gap-2 group shrink-0">
          <div className="flex items-center justify-center transition-transform duration-300 group-hover:scale-102 origin-left">
            <Image
              src="/thp logo.png"
              alt="TechieHelp Logo"
              width={520}
              height={150}
              className="h-20 sm:h-24 md:h-28 w-auto object-contain drop-shadow-sm"
              priority
            />
          </div>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-2 xl:gap-3 bg-slate-50/50 dark:bg-slate-900/30 px-5 py-2 rounded-full border border-slate-200/40 dark:border-slate-800/40 shadow-sm">
          {Object.entries(menuConfig)
            .filter(([key]) => key !== "legal")
            .map(([key, value]) => (
              <button
                key={key}
                onMouseEnter={() => handleMouseEnter(key)}
                suppressHydrationWarning
                className={`text-[13px] xl:text-[14px] font-bold text-slate-700 dark:text-slate-300 hover:text-[#0F4CBA] dark:hover:text-blue-400 px-4.5 py-2.5 rounded-full transition-all flex items-center gap-1.5 group ${
                  activeMenu === key ? "bg-slate-100/80 dark:bg-slate-800/80 text-[#0F4CBA] dark:text-blue-400" : "hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
                }`}
              >
                {value.label}
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 group-hover:text-[#0F4CBA] dark:group-hover:text-blue-400 transition-transform duration-300 ${
                    activeMenu === key ? "rotate-180 text-[#0F4CBA] dark:text-blue-400" : ""
                  }`}
                />
              </button>
            ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-5">
          {user && (
            <>
              {/* Streak Counter */}
              {streakData?.streak > 0 && (
                <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-md shadow-orange-500/10">
                  <Flame className="h-4 w-4 animate-bounce" />
                  <span>{streakData.streak} Day{streakData.streak !== 1 ? "s" : ""}</span>
                </div>
              )}

              {/* Dashboard Short Route */}
              <Link href="/dashboard" onClick={clearMenu}>
                <Button variant="outline" size="sm" className="rounded-full flex items-center gap-1.5 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-semibold">
                  <LayoutDashboard className="h-3.5 w-3.5 text-[#0F4CBA] dark:text-blue-400" />
                  <span>Dashboard</span>
                </Button>
              </Link>
            </>
          )}

          {/* Auth Button */}
          <div onClick={clearMenu} className="flex items-center">
            <AuthButtons />
          </div>

          {/* Get Started (Non-Logged in CTA) */}
          {!user && (
            <Link href="/sign-up" onClick={clearMenu}>
              <button suppressHydrationWarning className="text-xs xl:text-sm font-bold px-5 py-2.5 rounded-full bg-[#0F4CBA] hover:bg-blue-700 text-white hover:text-white dark:hover:bg-blue-600 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                Get Started
              </button>
            </Link>
          )}
        </div>

        {/* Hamburger Mobile Menu Trigger */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            suppressHydrationWarning
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Desktop Dropdown Panels */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="hidden lg:block absolute left-0 right-0 top-[100%] mx-auto max-w-6xl z-40 px-4"
            onMouseEnter={() => handleMouseEnter(activeMenu)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl shadow-2xl overflow-hidden grid grid-cols-12 max-h-[85vh]">
              
              {/* Left Panel: Category title & description */}
              <div className="col-span-3 bg-slate-50/50 dark:bg-slate-950/20 p-8 flex flex-col justify-between border-r border-slate-100 dark:border-slate-800/50">
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0F4CBA] dark:text-blue-400 mb-3">
                    {menuConfig[activeMenu].label}
                  </h3>
                  <p className="text-sm text-slate-800 dark:text-slate-200 font-bold mb-3 leading-snug">
                    {menuConfig[activeMenu].label === "Legal & Compliance" ? "Trust Framework" : "Explore Category"}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {menuConfig[activeMenu].description}
                  </p>
                </div>

                <div className="pt-8 border-t border-slate-100 dark:border-slate-800/50">
                  <div className="flex items-center gap-2 text-slate-400 dark:text-slate-600 text-xs">
                    <span className="w-2 h-2 rounded-full bg-[#F4B400] animate-pulse" />
                    <span>TechieHelp Institute of AI</span>
                  </div>
                </div>
              </div>

              {/* Center Panel: Sub-items 2-column grid */}
              <div className="col-span-6 p-8 overflow-y-auto max-h-[70vh]">
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  {menuConfig[activeMenu].gridCards.map((card, idx) => {
                    const CardIcon = card.icon;
                    return (
                      <Link
                        key={idx}
                        href={card.href}
                        onClick={clearMenu}
                        className="group flex items-start gap-4 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <div className="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center bg-blue-50 dark:bg-blue-950/40 text-[#0F4CBA] dark:text-blue-400 group-hover:bg-[#F4B400]/10 group-hover:text-[#F4B400] transition-colors">
                          <CardIcon className="w-5 h-5 stroke-[1.8]" />
                        </div>
                        <div>
                          <h4 className="text-[13px] font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#0F4CBA] dark:group-hover:text-blue-400 transition-colors leading-tight">
                            {card.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                            {card.desc}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Right Panel: Featured Action Card */}
              <div className="col-span-3 p-8 bg-gradient-to-br from-[#0F4CBA]/5 to-[#F4B400]/5 dark:from-[#0F4CBA]/10 dark:to-[#F4B400]/10 flex flex-col justify-between border-l border-slate-100 dark:border-slate-800/50">
                <div className="space-y-4">
                  <div className="inline-block bg-white dark:bg-slate-850 px-2.5 py-1 rounded-full border border-slate-150 dark:border-slate-850 shadow-sm">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0F4CBA] dark:text-blue-400">
                      {menuConfig[activeMenu].featured.badge}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm leading-snug">
                    {menuConfig[activeMenu].featured.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    {menuConfig[activeMenu].featured.desc}
                  </p>
                </div>

                <div className="pt-6">
                  <Link
                    href={menuConfig[activeMenu].featured.href}
                    onClick={clearMenu}
                    className="group w-full py-2.5 px-4 rounded-full bg-white dark:bg-slate-900 hover:bg-[#0F4CBA] hover:text-white dark:hover:bg-blue-600 border border-slate-200 dark:border-slate-700 hover:border-transparent text-xs font-bold text-[#0F4CBA] dark:text-blue-400 flex items-center justify-center gap-1.5 shadow-sm hover:shadow transition-all"
                  >
                    <span>{menuConfig[activeMenu].featured.btnText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden absolute top-[100%] left-0 right-0 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 shadow-xl overflow-y-auto z-40 pb-28"
          >
            <div className="px-4 py-6 space-y-4">
              
              {/* Direct Link: Home */}
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-bold text-slate-800 dark:text-slate-200 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-150 dark:hover:border-slate-800/80 transition-colors"
              >
                Home
              </Link>

              {/* Collapsible Categories */}
              {Object.entries(menuConfig).map(([key, value]) => (
                <div key={key} className="border border-slate-100 dark:border-slate-850 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleMobileCategory(key)}
                    className="w-full flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-900/30 text-slate-800 dark:text-slate-200 font-bold text-sm text-left"
                  >
                    <span>{value.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                        mobileActiveCategory === key ? "rotate-180 text-[#0F4CBA] dark:text-blue-400" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {mobileActiveCategory === key && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white dark:bg-slate-950 px-4 py-2 border-t border-slate-100 dark:border-slate-850 divide-y divide-slate-100 dark:divide-slate-900"
                      >
                        {value.gridCards.map((card, idx) => {
                          const CardIcon = card.icon;
                          return (
                            <Link
                              key={idx}
                              href={card.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-3 py-3 text-slate-700 dark:text-slate-300 hover:text-[#0F4CBA] dark:hover:text-blue-400 transition-colors"
                            >
                              <CardIcon className="w-4 h-4 text-[#0F4CBA] dark:text-blue-400 shrink-0" />
                              <span className="text-xs font-semibold">{card.title}</span>
                            </Link>
                          );
                        })}

                        {/* Mobile Category CTA */}
                        <div className="py-4">
                          <Link
                            href={value.featured.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-[#0F4CBA]/5 to-[#F4B400]/5 dark:from-[#0F4CBA]/10 dark:to-[#F4B400]/10 border border-slate-100 dark:border-slate-800 text-xs font-bold text-[#0F4CBA] dark:text-blue-400"
                          >
                            <span>{value.featured.btnText}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Direct Link: Contact */}
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-bold text-slate-800 dark:text-slate-200 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-150 dark:hover:border-slate-800/80 transition-colors"
              >
                Contact
              </Link>

              {/* User / Auth Info */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
                {user ? (
                  <div className="space-y-4">
                    {/* Streak Info */}
                    {streakData?.streak > 0 && (
                      <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold w-full justify-center shadow-md">
                        <Flame className="h-4 w-4 animate-bounce" />
                        <span>{streakData.streak} Day Streak! Keep it up!</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden flex items-center justify-center">
                          {user.photoURL ? (
                            <Image src={user.photoURL} alt={user.displayName || "User"} width={40} height={40} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-slate-500 dark:text-slate-400 font-bold text-sm">{user.displayName?.charAt(0) || "U"}</span>
                          )}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{user.displayName}</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">{user.email}</div>
                        </div>
                      </div>

                      <AuthButtons />
                    </div>

                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-sm font-bold text-slate-700 dark:text-slate-300 transition-colors"
                    >
                      <LayoutDashboard className="h-4 w-4 text-[#0F4CBA] dark:text-blue-400" />
                      <span>Go to Dashboard</span>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/sign-in"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex-1 py-3 text-center rounded-full border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-900 text-sm font-bold text-slate-700 dark:text-slate-300 transition-all"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/sign-up"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex-1 py-3 text-center rounded-full bg-[#0F4CBA] hover:bg-blue-700 dark:hover:bg-blue-600 text-sm font-bold text-white transition-all shadow-md"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
