"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import TypingHeadlineWord from "@/components/TypingHeadlineWord";
import {
  Sparkles,
  Award,
  Users,
  Briefcase,
  GraduationCap,
  Trophy,
  MapPin,
  Mail,
  Phone,
  BookOpen,
  Send,
  ChevronDown,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Rocket,
  Gift,
  Calendar,
  HelpCircle,
  Building,
  Target,
  Presentation,
  Clock,
  Lightbulb,
  Zap,
  Cpu,
  Layers,
  Code2,
  Terminal,
  Compass,
  Check,
  X,
  ExternalLink,
  ChevronRight,
  Flame,
  Globe2,
  Star,
  Shirt,
  IdCard,
  BookMarked,
  Coffee,
  FileBadge,
  Sparkle,
  Share2,
  Activity,
  UserCheck,
  Laptop,
  TrendingUp
} from "lucide-react";
import { toast } from "sonner";

// Brand Colors Palette Reference
// Navy: #0A0F1D / #0B132B
// Cyan / Blue: #00C2FF / #0284C7 / #2563EB
// Gold / Yellow: #FFB800 / #F59E0B
// Orange: #FF5722 / #F97316

export default function CampusInnovationClubClient() {
  // Navigation State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("hero");

  // Modal States
  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [partnerSuccessModal, setPartnerSuccessModal] = useState(false);
  const [studentSuccessModal, setStudentSuccessModal] = useState(false);

  // Form States
  const [isSubmittingPartner, setIsSubmittingPartner] = useState(false);
  const [isSubmittingStudent, setIsSubmittingStudent] = useState(false);

  // Weekly Activities Interactive Calendar State
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  // Interactive Member Dashboard State
  const [activeDashboardRole, setActiveDashboardRole] = useState("president");

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Partner Form State
  const [partnerForm, setPartnerForm] = useState({
    collegeName: "",
    collegeWebsite: "",
    city: "",
    state: "",
    contactPersonName: "",
    designation: "Training & Placement Officer (TPO)",
    email: "",
    phone: "",
    studentCommunitySize: "250 - 500 Students",
    message: ""
  });
  const [partnerErrors, setPartnerErrors] = useState({});

  // Student Form State
  const [studentForm, setStudentForm] = useState({
    studentName: "",
    email: "",
    phone: "",
    collegeName: "",
    branch: "",
    year: "3rd Year",
    interestedRole: "Executive / Core Leadership",
    skillsInterest: "AI & Full Stack Development"
  });
  const [studentErrors, setStudentErrors] = useState({});

  // Smooth scroll handler
  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveNav(id);
    }
  };

  // Partner form handlers
  const handlePartnerChange = (e) => {
    const { name, value } = e.target;
    let finalVal = value;
    if (name === "phone") {
      finalVal = value.replace(/\D/g, "").slice(0, 10);
    }
    setPartnerForm((prev) => ({ ...prev, [name]: finalVal }));
    if (partnerErrors[name]) {
      setPartnerErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validatePartnerForm = () => {
    const errs = {};
    if (!partnerForm.collegeName.trim()) errs.collegeName = "College Name is required.";
    if (!partnerForm.city.trim()) errs.city = "City is required.";
    if (!partnerForm.state.trim()) errs.state = "State is required.";
    if (!partnerForm.contactPersonName.trim()) errs.contactPersonName = "Contact Name is required.";
    if (!partnerForm.designation.trim()) errs.designation = "Designation is required.";
    if (!partnerForm.email.trim()) {
      errs.email = "Email Address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(partnerForm.email)) {
      errs.email = "Please enter a valid official email address.";
    }
    if (!partnerForm.phone.trim()) {
      errs.phone = "Phone number is required.";
    } else if (partnerForm.phone.length < 10) {
      errs.phone = "Must be a valid 10-digit contact number.";
    }
    setPartnerErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePartnerSubmit = async (e) => {
    e.preventDefault();
    if (!validatePartnerForm()) {
      toast.error("Please fill in all required fields accurately.");
      return;
    }
    setIsSubmittingPartner(true);
    try {
      const res = await fetch("/api/campus-innovation-club", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "partnership",
          ...partnerForm
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPartnerSuccessModal(true);
        toast.success("Partnership request received successfully!");
        setPartnerForm({
          collegeName: "",
          collegeWebsite: "",
          city: "",
          state: "",
          contactPersonName: "",
          designation: "Training & Placement Officer (TPO)",
          email: "",
          phone: "",
          studentCommunitySize: "250 - 500 Students",
          message: ""
        });
      } else {
        toast.error(data.error || "Unable to submit request. Please try again.");
      }
    } catch (err) {
      toast.error("Network issue. Please reach out to support@techiehelp.in");
    } finally {
      setIsSubmittingPartner(false);
    }
  };

  // Student form handlers
  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    let finalVal = value;
    if (name === "phone") {
      finalVal = value.replace(/\D/g, "").slice(0, 10);
    }
    setStudentForm((prev) => ({ ...prev, [name]: finalVal }));
    if (studentErrors[name]) {
      setStudentErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStudentForm = () => {
    const errs = {};
    if (!studentForm.studentName.trim()) errs.studentName = "Full Name is required.";
    if (!studentForm.email.trim()) {
      errs.email = "Email Address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentForm.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!studentForm.phone.trim()) {
      errs.phone = "Contact number is required.";
    } else if (studentForm.phone.length < 10) {
      errs.phone = "Must be a 10-digit number.";
    }
    if (!studentForm.collegeName.trim()) errs.collegeName = "College Name is required.";
    if (!studentForm.branch.trim()) errs.branch = "Degree / Branch is required.";
    setStudentErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    if (!validateStudentForm()) {
      toast.error("Please fill in your complete details.");
      return;
    }
    setIsSubmittingStudent(true);
    try {
      const res = await fetch("/api/campus-innovation-club", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "student_join",
          ...studentForm
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStudentModalOpen(false);
        setStudentSuccessModal(true);
        toast.success("Welcome to TechieHelp Campus Community!");
        setStudentForm({
          studentName: "",
          email: "",
          phone: "",
          collegeName: "",
          branch: "",
          year: "3rd Year",
          interestedRole: "Executive / Core Leadership",
          skillsInterest: "AI & Full Stack Development"
        });
      } else {
        toast.error(data.error || "Unable to submit registration.");
      }
    } catch (err) {
      toast.error("Network issue. Please contact support@techiehelp.in");
    } finally {
      setIsSubmittingStudent(false);
    }
  };

  // Weekly Activities Data
  const weeklyDays = [
    {
      day: "Monday",
      code: "DAY 01",
      title: "Tech Challenges & CodeSprint",
      type: "Algorithmic Challenges & Aptitude",
      description: "Weekly algorithmic problem solving, logic sprints, LeetCode style mini-contests, and technical aptitude challenges.",
      icon: Terminal,
      accent: "from-blue-600 to-cyan-500",
      badge: "Competition Track",
      time: "5:00 PM - 6:30 PM",
      skills: ["Data Structures", "Problem Solving", "Time-Optimized Logic"]
    },
    {
      day: "Tuesday",
      code: "DAY 02",
      title: "Skill Bootcamps",
      type: "Hands-on Guided Training",
      description: "Structured progressive learning paths covering modern frontend, backend architectures, cloud workflows, and DevOps essentials.",
      icon: Code2,
      accent: "from-amber-500 to-orange-500",
      badge: "Skill Accelerator",
      time: "5:30 PM - 7:00 PM",
      skills: ["Next.js & React", "Node.js & Postgres", "Git & CI/CD"]
    },
    {
      day: "Wednesday",
      code: "DAY 03",
      title: "AI & Technology Workshops",
      type: "Emerging Tech Exploration",
      description: "Deep dive workshops into Generative AI, Large Language Models, Prompt Engineering, Agentic Workflows, and Computer Vision.",
      icon: Cpu,
      accent: "from-cyan-500 to-blue-600",
      badge: "AI Core Track",
      time: "5:00 PM - 6:45 PM",
      skills: ["Gemini & OpenAI APIs", "Vector DBs", "Autonomous Agents"]
    },
    {
      day: "Thursday",
      code: "DAY 04",
      title: "Expert Sessions & Mentorship",
      type: "Industry Leaders & Founders",
      description: "Interactive fireside chats and masterclasses with Silicon Valley / top Indian startup founders, engineering leads, and alumni mentors.",
      icon: Presentation,
      accent: "from-purple-600 to-indigo-600",
      badge: "Industry Connect",
      time: "6:00 PM - 7:30 PM",
      skills: ["System Design", "Career Roadmaps", "Founder Insights"]
    },
    {
      day: "Friday",
      code: "DAY 05",
      title: "Build Days & Open Source",
      type: "Collaborative Lab & Team Sprints",
      description: "Hands-on collaborative sprint where students build real-world micro-SaaS apps, contribute to open-source repositories, and debug in squads.",
      icon: Laptop,
      accent: "from-emerald-500 to-teal-600",
      badge: "Portfolio Builder",
      time: "4:00 PM - 6:30 PM",
      skills: ["Open Source PRs", "Full Stack MVP", "Pair Programming"]
    },
    {
      day: "Saturday",
      code: "DAY 06",
      title: "Hackathons & Demo Days",
      type: "Innovation Challenges & Showcases",
      description: "High-energy campus hackathons, 24h innovation challenges, peer project reviews, and live product demos evaluated by industry jury.",
      icon: Trophy,
      accent: "from-orange-500 to-amber-500",
      badge: "Showcase & Awards",
      time: "10:00 AM - 4:00 PM",
      skills: ["Rapid Prototyping", "Pitching & Presentation", "Prize Showcases"]
    }
  ];

  // Programs & Opportunities Data (6 Cards)
  const programsData = [
    {
      title: "AI & Technology Learning",
      tagline: "Artificial Intelligence & Emerging Tech",
      description: "Structured curriculum covering Generative AI, Machine Learning fundamentals, full-stack web engineering, automation and cloud architecture.",
      icon: Cpu,
      color: "border-cyan-200 text-cyan-600 bg-cyan-50/50",
      accentBg: "bg-cyan-500",
      cta: "Explore Curriculum"
    },
    {
      title: "Coding & Innovation Challenges",
      tagline: "High-Octane Technical Contests",
      description: "Weekly coding battles, algorithmic hackathons, bug hunts, and inter-college innovation challenges with live leaderboards.",
      icon: Terminal,
      color: "border-amber-200 text-amber-600 bg-amber-50/50",
      accentBg: "bg-amber-500",
      cta: "View Challenge Tracks"
    },
    {
      title: "Practical Projects",
      tagline: "Portfolio-Worthy Production Apps",
      description: "Move beyond toy code. Build end-to-end production-grade software, AI agents, SaaS prototypes, and open-source contributions with senior guidance.",
      icon: Layers,
      color: "border-blue-200 text-blue-600 bg-blue-50/50",
      accentBg: "bg-blue-600",
      cta: "Explore Projects"
    },
    {
      title: "Internship Opportunities",
      tagline: "Live Industry Experience",
      description: "Eligible and top-contributing club members gain direct access to apply for guided internships and live client projects powered by TechieHelp.",
      icon: Briefcase,
      color: "border-orange-200 text-orange-600 bg-orange-50/50",
      accentBg: "bg-orange-500",
      cta: "Check Eligibility"
    },
    {
      title: "Career Development",
      tagline: "Professional Profile Transformation",
      description: "Comprehensive ATS resume enhancement, LinkedIn authority building, GitHub portfolio showcases, technical mock interviews, and placement prep.",
      icon: Target,
      color: "border-emerald-200 text-emerald-600 bg-emerald-50/50",
      accentBg: "bg-emerald-500",
      cta: "View Career Modules"
    },
    {
      title: "Startup & Entrepreneurship",
      tagline: "Idea to MVP Launchpad",
      description: "Master product discovery, customer validation, rapid prototyping, business models, and pitch deck preparation for aspiring student founders.",
      icon: Rocket,
      color: "border-indigo-200 text-indigo-600 bg-indigo-50/50",
      accentBg: "bg-indigo-600",
      cta: "Discover Incubation"
    }
  ];

  // College Partnership 4 Steps
  const partnershipSteps = [
    {
      step: "01",
      title: "Connect",
      tag: "Initial Discovery",
      description: "The college leadership or TPO connects with TechieHelp to explore institutional goals, student demographics, and collaboration opportunities.",
      icon: Building
    },
    {
      step: "02",
      title: "MoU & Approval",
      tag: "Institutional Alignment",
      description: "Both parties define scope, mutual commitments, academic schedules, and sign a structured, mutually agreed institutional MoU.",
      icon: ShieldCheck
    },
    {
      step: "03",
      title: "Establish the Club",
      tag: "Campus Launch",
      description: "Formal club inauguration on campus with college administration, faculty coordinator appointment, and student leadership elections.",
      icon: Rocket
    },
    {
      step: "04",
      title: "Activities & Growth",
      tag: "Continuous Momentum",
      description: "Execution of weekly hands-on workshops, bootcamps, hackathons, guest lectures, internship pathways, and career-readiness initiatives.",
      icon: Activity
    }
  ];

  // College Benefits (8 Benefits in 2-Column)
  const collegeBenefits = [
    {
      title: "Regular Technical & Innovation Activities",
      description: "Weekly workshops, coding challenges, and demo days that keep campus energy vibrant and academically enriching all year round.",
      icon: Zap
    },
    {
      title: "Industry-Oriented Learning Opportunities",
      description: "Bridging the syllabus with modern AI tools, production stacks, and real-world software engineering practices.",
      icon: Laptop
    },
    {
      title: "Student Leadership & Community Development",
      description: "Empowering students to organize, manage events, lead technical squads, and build transferable organizational abilities.",
      icon: Users
    },
    {
      title: "Hackathons & Inter-College Competitions",
      description: "Providing campus students a national platform to showcase their innovation against top universities across India.",
      icon: Trophy
    },
    {
      title: "Internship & Practical Training Pathways",
      description: "Structured pathways for active students to participate in guided TechieHelp internships and hands-on client projects.",
      icon: Briefcase
    },
    {
      title: "Resume & Interview Preparation",
      description: "Dedicated modules on ATS-optimized resumes, dynamic GitHub repositories, LinkedIn personal branding, and aptitude.",
      icon: BookMarked
    },
    {
      title: "Expert Sessions & Mentorship",
      description: "Direct access to engineering leaders, startup founders, and technical architects who provide genuine career direction.",
      icon: Presentation
    },
    {
      title: "Support for Placement Readiness",
      description: "Holistic technical upskilling, behavioral guidance, mock interviews, and industry network facilitation to maximize employability.",
      icon: GraduationCap
    }
  ];

  // Student Leadership Team (7 Roles)
  const leadershipRoles = [
    {
      title: "Club President",
      role: "Strategic Executive",
      description: "Heads overall campus club operations, interfaces with college administration & TechieHelp, and steers the community vision.",
      icon: Trophy,
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200"
    },
    {
      title: "Vice President",
      role: "Operations & Governance",
      description: "Coordinates cross-team execution, tracks weekly deliverables, monitors club growth, and manages internal chapter affairs.",
      icon: Target,
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200"
    },
    {
      title: "Technical Lead",
      role: "Software & Architecture",
      description: "Curates coding tracks, mentors members during build days, manages campus open-source projects, and leads code challenges.",
      icon: Code2,
      badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200"
    },
    {
      title: "AI & Innovation Lead",
      role: "AI & Emerging Technologies",
      description: "Directs AI workshops, Generative AI hackathons, machine learning study jams, and innovative prototype development.",
      icon: Cpu,
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200"
    },
    {
      title: "Event Management Lead",
      role: "Logistics & Production",
      description: "Supervises venue coordination, event scheduling, workshop hosting, demo day logistics, and speaker hospitality.",
      icon: Calendar,
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
    },
    {
      title: "Marketing & Community Lead",
      role: "Outreach & Digital Presence",
      description: "Drives campus outreach, social media branding, campus WhatsApp/Discord engagement, and member recruitment campaigns.",
      icon: Share2,
      badgeColor: "bg-orange-50 text-orange-700 border-orange-200"
    },
    {
      title: "Student Coordinators",
      role: "Squad Engagement",
      description: "Represents departments and batches, assists leads during events, facilitates peer queries, and drives grassroots club participation.",
      icon: Users,
      badgeColor: "bg-slate-100 text-slate-700 border-slate-200"
    }
  ];

  // Membership Categories (4 Categories)
  const membershipTiers = [
    {
      tier: "Executive Leadership",
      sub: "President & Vice President",
      tag: "Highest Institutional Authority",
      color: "border-amber-400 bg-gradient-to-b from-amber-50/40 via-white to-white",
      pill: "bg-amber-500 text-white",
      badgeText: "Gold Executive Crest",
      perks: [
        "Official role-based executive digital badge with unique ID",
        "Premium leadership joining kit (Apparel, diary, mug, metal pen, metal badge)",
        "Official Leadership Recognition Certificate signed by TechieHelp",
        "Priority direct consideration for free TechieHelp internships",
        "1-on-1 mentorship sessions with industry tech leads and founders",
        "Official representation of college at state/national innovation summits",
        "Exclusive access to the National Executive Leadership Community"
      ]
    },
    {
      tier: "Core Leadership Team",
      sub: "Technical, AI, Events & Marketing Leads",
      tag: "Functional Pillar Leads",
      color: "border-cyan-400 bg-gradient-to-b from-cyan-50/40 via-white to-white",
      pill: "bg-cyan-600 text-white",
      badgeText: "Cyan Core Lead Badge",
      perks: [
        "Official role-specific verified digital badge",
        "Core team joining kit (Branded T-shirt, club ID, lanyard, notebook, pen)",
        "Direct free internship application pathway with TechieHelp mentors",
        "Lead high-visibility campus projects and live community hackathons",
        "Contribution-based achievement certificates and recommendation letters",
        "Dedicated technical and career mentorship from senior engineers"
      ]
    },
    {
      tier: "Campus Ambassadors & Coordinators",
      sub: "Outreach & Department Liaisons",
      tag: "Campus Advocates",
      color: "border-blue-300 bg-gradient-to-b from-blue-50/40 via-white to-white",
      pill: "bg-blue-600 text-white",
      badgeText: "Blue Ambassador Pin",
      perks: [
        "Official campus ambassador verified digital badge",
        "Standard joining kit for eligible active coordinators",
        "Eligibility for performance-based free internship opportunities",
        "Hands-on community leadership, event planning & outreach experience",
        "Quarterly performance-based certificates and merchandise rewards",
        "Direct fast-track progression pathway into Core and Executive Leadership"
      ]
    },
    {
      tier: "General Student Members",
      sub: "All Enrolled Campus Students",
      tag: "Community Builders",
      color: "border-slate-200 bg-white",
      pill: "bg-slate-800 text-white",
      badgeText: "Member ID Badge",
      perks: [
        "Official digital membership badge & verified club member ID",
        "Free entry to all weekly introductory and intermediate tech sessions",
        "Unrestricted access to the campus Discord, WhatsApp & peer community",
        "Active participation in campus hackathons, quizzes & build sprints",
        "Opportunity to apply for selected free internships upon milestone completion",
        "Open leadership nomination pathway during annual club elections"
      ]
    }
  ];

  // Digital Role Badges Definition (8 Badges)
  const roleBadgesList = [
    {
      id: "president",
      name: "Club President",
      tier: "Executive",
      color: "from-amber-400 via-yellow-500 to-amber-600",
      ringColor: "ring-amber-400/50",
      textColor: "text-amber-800",
      bgBadge: "bg-amber-100",
      icon: Trophy,
      code: "TECHIE-EXEC-01"
    },
    {
      id: "vice_president",
      name: "Vice President",
      tier: "Executive",
      color: "from-blue-600 via-indigo-600 to-blue-800",
      ringColor: "ring-blue-400/50",
      textColor: "text-blue-800",
      bgBadge: "bg-blue-100",
      icon: Target,
      code: "TECHIE-EXEC-02"
    },
    {
      id: "tech_lead",
      name: "Technical Lead",
      tier: "Core Team",
      color: "from-cyan-500 via-teal-500 to-blue-600",
      ringColor: "ring-cyan-400/50",
      textColor: "text-cyan-800",
      bgBadge: "bg-cyan-100",
      icon: Code2,
      code: "TECHIE-CORE-TECH"
    },
    {
      id: "ai_lead",
      name: "AI & Innovation Lead",
      tier: "Core Team",
      color: "from-purple-500 via-pink-500 to-indigo-600",
      ringColor: "ring-purple-400/50",
      textColor: "text-purple-800",
      bgBadge: "bg-purple-100",
      icon: Cpu,
      code: "TECHIE-CORE-AI"
    },
    {
      id: "event_lead",
      name: "Event Lead",
      tier: "Core Team",
      color: "from-emerald-500 via-teal-600 to-emerald-700",
      ringColor: "ring-emerald-400/50",
      textColor: "text-emerald-800",
      bgBadge: "bg-emerald-100",
      icon: Calendar,
      code: "TECHIE-CORE-EVT"
    },
    {
      id: "marketing_lead",
      name: "Marketing Lead",
      tier: "Core Team",
      color: "from-orange-500 via-amber-500 to-rose-600",
      ringColor: "ring-orange-400/50",
      textColor: "text-orange-800",
      bgBadge: "bg-orange-100",
      icon: Share2,
      code: "TECHIE-CORE-MKT"
    },
    {
      id: "ambassador",
      name: "Campus Ambassador",
      tier: "Coordinator",
      color: "from-blue-400 via-cyan-500 to-sky-600",
      ringColor: "ring-sky-400/50",
      textColor: "text-sky-800",
      bgBadge: "bg-sky-100",
      icon: Award,
      code: "TECHIE-AMBASSADOR"
    },
    {
      id: "member",
      name: "Student Member",
      tier: "Innovator",
      color: "from-slate-700 via-slate-800 to-slate-900",
      ringColor: "ring-slate-400/50",
      textColor: "text-slate-800",
      bgBadge: "bg-slate-100",
      icon: Sparkles,
      code: "TECHIE-MEMBER"
    }
  ];

  // Dashboard Role Presets for Interactive Simulator
  const dashboardRolePresets = {
    president: {
      name: "Aditya Sharma",
      role: "Club President",
      college: "Jodhpur Institute of Engineering & Technology",
      tierBadge: "Executive Council",
      points: 940,
      maxPoints: 1000,
      level: "Level 5 Executive Leader",
      internshipStatus: "PRE-APPROVED & ELIGIBLE",
      internshipDesc: "Executive priority access active. Eligible for direct mentor-led AI & Engineering internship.",
      eventsAttended: [
        { name: "National Campus Innovation Kickoff", date: "Nov 12, 2026", status: "Keynote Host", xp: "+150 XP" },
        { name: "Full Stack GenAI Hackathon", date: "Nov 02, 2026", status: "Lead Organizer", xp: "+120 XP" },
        { name: "System Design Masterclass", date: "Oct 24, 2026", status: "Attended", xp: "+50 XP" }
      ],
      certificates: [
        { title: "Executive Campus Leadership Honor 2026", id: "THP-EXEC-8821", date: "Nov 2026" },
        { title: "Advanced Applied AI & Agentic Systems", id: "THP-AI-4419", date: "Oct 2026" }
      ]
    },
    tech_lead: {
      name: "Pooja Verma",
      role: "Technical Lead",
      college: "Government Engineering College, Ajmer",
      tierBadge: "Core Leadership",
      points: 780,
      maxPoints: 1000,
      level: "Level 4 Senior Architect",
      internshipStatus: "INTERNSHIP ELIGIBILITY ACHIEVED",
      internshipDesc: "Technical track milestones met. Ready for software engineering internship interview.",
      eventsAttended: [
        { name: "Open Source Code Sprint #4", date: "Nov 14, 2026", status: "Sprint Leader", xp: "+100 XP" },
        { name: "Vector Databases & RAG Workshop", date: "Nov 06, 2026", status: "Speaker", xp: "+110 XP" },
        { name: "Campus Bug Bounty Weekend", date: "Oct 29, 2026", status: "Top Contributor", xp: "+80 XP" }
      ],
      certificates: [
        { title: "Certified Open Source Architect", id: "THP-CORE-6712", date: "Nov 2026" },
        { title: "Full Stack Microservices Bootcamp", id: "THP-FSD-3110", date: "Sep 2026" }
      ]
    },
    ambassador: {
      name: "Rohan Singhania",
      role: "Campus Ambassador",
      college: "MBM University, Jodhpur",
      tierBadge: "Campus Ambassador",
      points: 520,
      maxPoints: 1000,
      level: "Level 3 Community Catalyst",
      internshipStatus: "ELIGIBLE FOR SUMMER SELECTION",
      internshipDesc: "500+ XP threshold crossed. Eligible to submit application for upcoming TechieHelp batch.",
      eventsAttended: [
        { name: "Campus TechieHelp Community Launch", date: "Nov 10, 2026", status: "Coordinator", xp: "+80 XP" },
        { name: "Weekly Aptitude & Code Sprint", date: "Nov 03, 2026", status: "Attended", xp: "+40 XP" },
        { name: "Resume & LinkedIn Masterclass", date: "Oct 20, 2026", status: "Attended", xp: "+50 XP" }
      ],
      certificates: [
        { title: "Campus Community Builder Certificate", id: "THP-AMB-2901", date: "Nov 2026" }
      ]
    },
    member: {
      name: "Sneha Patel",
      role: "Student Member",
      college: "Poornima College of Engineering, Jaipur",
      tierBadge: "Active Member",
      points: 390,
      maxPoints: 1000,
      level: "Level 2 Rising Innovator",
      internshipStatus: "PROGRESSING TOWARD ELIGIBILITY (39%)",
      internshipDesc: "Need 110 more XP (approx 2 more weekly activities or 1 hackathon) to unlock free internship application.",
      eventsAttended: [
        { name: "Getting Started with Python & Git", date: "Nov 15, 2026", status: "Attended", xp: "+50 XP" },
        { name: "Introduction to Generative AI Lab", date: "Nov 08, 2026", status: "Attended", xp: "+50 XP" },
        { name: "Weekly Tech Quiz #12", date: "Oct 31, 2026", status: "Completed", xp: "+30 XP" }
      ],
      certificates: [
        { title: "Foundations of AI & Python Programming", id: "THP-MEM-1082", date: "Nov 2026" }
      ]
    }
  };

  const currentDashboard = dashboardRolePresets[activeDashboardRole] || dashboardRolePresets.president;

  // TechieHelp Ecosystem Data (8 Initiatives)
  const ecosystemData = [
    {
      name: "TechieHelp",
      tag: "Parent Brand & Industry Hub",
      description: "Technology development and enterprise software delivery powering practical student exposure.",
      icon: Globe2,
      accent: "text-blue-600 bg-blue-50 border-blue-200"
    },
    {
      name: "TechieHelp Institute of AI",
      tag: "Advanced AI Academy",
      description: "Premier AI, Machine Learning, Data Science, and emerging technology training programs.",
      icon: Cpu,
      accent: "text-cyan-600 bg-cyan-50 border-cyan-200"
    },
    {
      name: "EdgeCareer",
      tag: "AI Career Intelligence",
      description: "AI-driven ATS resume diagnostics, mock interview simulators, and algorithmic job matching.",
      icon: Target,
      accent: "text-emerald-600 bg-emerald-50 border-emerald-200"
    },
    {
      name: "Career Branding Lab",
      tag: "Executive Positioning",
      description: "Tailored LinkedIn authority building, GitHub portfolio curation, and professional branding for engineers.",
      icon: UserCheck,
      accent: "text-purple-600 bg-purple-50 border-purple-200"
    },
    {
      name: "Open Source & Hackathon Hub",
      tag: "Collaborative Coding",
      description: "National hackathons, collaborative code sprints, open-source repositories, and developer bounty tracks.",
      icon: Terminal,
      accent: "text-amber-600 bg-amber-50 border-amber-200"
    },
    {
      name: "Founder & Startup School",
      tag: "Venture Incubation",
      description: "Idea validation, MVP architecture, customer discovery, and investor pitch preparation for campus founders.",
      icon: Rocket,
      accent: "text-orange-600 bg-orange-50 border-orange-200"
    },
    {
      name: "LMS",
      tag: "Adaptive Learning Cloud",
      description: "Structured self-paced modules, interactive assessments, project submissions, and verifiable credentials.",
      icon: BookOpen,
      accent: "text-indigo-600 bg-indigo-50 border-indigo-200"
    },
    {
      name: "Internship Programs",
      tag: "Guided Practical Experience",
      description: "Hands-on virtual and in-person internships with mentor feedback, code reviews, and live deliverables.",
      icon: Briefcase,
      accent: "text-teal-600 bg-teal-50 border-teal-200"
    }
  ];

  // Campus-to-Career Journey (7 Steps)
  const journeySteps = [
    { step: "01", title: "Join the Club", desc: "Enroll as a member or apply for campus leadership", icon: UserCheck },
    { step: "02", title: "Learn New Skills", desc: "Attend weekly workshops & guided tech bootcamps", icon: BookOpen },
    { step: "03", title: "Participate in Activities", desc: "Engage in code sprints, quizzes & tech challenges", icon: Activity },
    { step: "04", title: "Build Projects", desc: "Collaborate on real-world software and AI apps", icon: Laptop },
    { step: "05", title: "Join Internships", desc: "Earn eligibility for guided TechieHelp internships", icon: Briefcase },
    { step: "06", title: "Develop Career Profile", desc: "Craft ATS resumes, LinkedIn authority & GitHub", icon: Target },
    { step: "07", title: "Prepare for Placements", desc: "Aptitude tests, technical mocks & hiring drives", icon: Trophy }
  ];

  // FAQs (10 Required Questions)
  const faqs = [
    {
      q: "What is TechieHelp Campus Innovation Club?",
      a: "TechieHelp Campus Innovation Club is an official institutional technology, AI, entrepreneurship, and career-development community established inside colleges through formal collaboration. The club serves as an experiential hub where students participate in weekly learning activities, hands-on projects, bootcamps, coding competitions, hackathons, and career-readiness initiatives under the guidance of TechieHelp mentors."
    },
    {
      q: "How can a college establish a club?",
      a: "A college can initiate the process by submitting a partnership request on this page. Our Institutional Partnerships team connects with the Principal, HOD, Faculty Coordinator, or Training & Placement Officer (TPO) to discuss institutional requirements, finalize scope, coordinate MoU formalities, and schedule the campus inauguration."
    },
    {
      q: "Is an MoU required?",
      a: "Yes. A formal, mutually agreed Memorandum of Understanding (MoU) is signed between the educational institution and TechieHelp. This establishes a clear institutional framework, defines roles and responsibilities, aligns academic schedules, and ensures sustained value delivery for both students and faculty."
    },
    {
      q: "Who can become a club member?",
      a: "Any regular student enrolled in the partner institution across Engineering, Computer Applications (BCA/MCA), Data Science, AI, Information Technology, and allied disciplines can join the club regardless of prior coding experience. Foundation sessions are conducted to support beginners."
    },
    {
      q: "Are activities conducted every week?",
      a: "Yes, our core model includes weekly structured engagement—such as Tech Challenges, AI Workshops, Build Days, Expert Sessions, and Hackathons. However, schedules are flexible and coordinated in advance with the college administration to respect mid-term exams, university schedules, and campus holidays."
    },
    {
      q: "Are workshops and bootcamps paid?",
      a: "Regular club activities, introductory workshops, and campus meetups conducted under the official club schedule are included as part of the institutional partnership. Any specialized certification tracks or third-party credentialing programs are clearly communicated with transparent options and student concessions."
    },
    {
      q: "Can students become club leaders?",
      a: "Absolutely! Every campus club is operated by a student leadership council—including Club President, Vice President, Technical Lead, AI & Innovation Lead, Event Lead, and Marketing Lead. Leadership selection happens through a structured evaluation process in coordination with college faculty coordinators."
    },
    {
      q: "Does TechieHelp provide internship opportunities?",
      a: "Yes. Active club members who demonstrate consistency, milestone achievements, and participation points have access to apply for selected free internships and live project tracks powered by TechieHelp. Selection is subject to merit, available seats, and meeting technical eligibility criteria."
    },
    {
      q: "Does the partnership include placement support?",
      a: "The club provides extensive placement readiness support—including ATS resume building, GitHub optimization, technical mock interviews, aptitude masterclasses, and corporate opportunity facilitation. We clearly clarify that this support focuses on comprehensive career preparation and opportunity connection, rather than an unconditional employment guarantee."
    },
    {
      q: "How can a college contact TechieHelp?",
      a: "Educational institutions can submit the partnership form on this page, email us directly at support@techiehelp.in, or visit our official portals at https://www.techiehelp.in and https://www.techiehelp.in/contacts. Our institutional team typically responds within 24–48 business hours."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-cyan-500 selection:text-white">
      {/* =========================================================================
          SECTION 3: NAVBAR (Sticky) - Exact Match to Screenshot 2
      ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-all duration-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[76px] md:h-[82px]">
            {/* Left: Brand Logo & Title */}
            <div className="flex items-center">
              <Link href="/campus-innovation-club" className="flex items-center gap-3 sm:gap-3.5 group">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/campus-club-logo-ref.png"
                    alt="Campus Innovation Club Emblem"
                    width={56}
                    height={56}
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-black text-sm sm:text-base text-[#0B1F42] uppercase tracking-tight leading-[1.05]">
                    CAMPUS
                  </span>
                  <span className="font-black text-sm sm:text-base text-[#0B1F42] uppercase tracking-tight leading-[1.05]">
                    INNOVATION CLUB
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                    POWERED BY TECHIEHELP INSTITUTE OF AI
                  </span>
                </div>
              </Link>
            </div>

            {/* Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center space-x-7 text-sm font-semibold text-slate-800">
              <button
                onClick={() => scrollTo("hero")}
                className="relative py-1 text-[#0B1F42] font-bold transition-all flex flex-col items-center"
              >
                <span>Home</span>
                <span className="block h-[3px] w-6 bg-[#FFB800] rounded-full mt-0.5" />
              </button>
              <button
                onClick={() => scrollTo("about")}
                className="hover:text-[#087BEA] transition-colors py-1"
              >
                About Club
              </button>
              <button
                onClick={() => scrollTo("activities")}
                className="hover:text-[#087BEA] transition-colors py-1"
              >
                Activities
              </button>
              <button
                onClick={() => scrollTo("programs")}
                className="hover:text-[#087BEA] transition-colors py-1"
              >
                Programs
              </button>
              <button
                onClick={() => scrollTo("partnership")}
                className="hover:text-[#087BEA] transition-colors py-1"
              >
                College Partnership
              </button>
              <button
                onClick={() => scrollTo("membership")}
                className="hover:text-[#087BEA] transition-colors py-1"
              >
                Community
              </button>
            </nav>

            {/* Right: Actions */}
            <div className="hidden sm:flex items-center space-x-3">
              <button
                onClick={() => setStudentModalOpen(true)}
                className="px-5 py-2 text-xs sm:text-[13px] font-bold text-[#0B1F42] bg-[#FFB800] hover:bg-[#FFA800] rounded-full shadow-xs transition-all"
              >
                Join the Club
              </button>
              <button
                onClick={() => scrollTo("partner-form")}
                className="px-5 py-2 text-xs sm:text-[13px] font-semibold text-[#0B1F42] bg-white hover:bg-slate-50 rounded-full border border-[#0B1F42] shadow-xs transition-all"
              >
                Partner With Us
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <div className="space-y-1.5 w-6">
                  <span className="block h-0.5 w-6 bg-slate-800 rounded-full" />
                  <span className="block h-0.5 w-4 bg-slate-800 rounded-full ml-auto" />
                  <span className="block h-0.5 w-6 bg-slate-800 rounded-full" />
                </div>}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl"
            >
              <button
                onClick={() => scrollTo("hero")}
                className="w-full text-left px-3 py-2.5 text-sm font-bold text-[#0B1F42] bg-slate-50 rounded-lg"
              >
                Home
              </button>
              <button
                onClick={() => scrollTo("about")}
                className="w-full text-left px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                About Club
              </button>
              <button
                onClick={() => scrollTo("activities")}
                className="w-full text-left px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                Activities
              </button>
              <button
                onClick={() => scrollTo("programs")}
                className="w-full text-left px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                Programs
              </button>
              <button
                onClick={() => scrollTo("partnership")}
                className="w-full text-left px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                College Partnership
              </button>
              <button
                onClick={() => scrollTo("membership")}
                className="w-full text-left px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                Community & Benefits
              </button>
              <button
                onClick={() => scrollTo("faq")}
                className="w-full text-left px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                Frequently Asked Questions
              </button>
              <div className="pt-3 flex flex-col gap-2.5 border-t border-slate-100">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setStudentModalOpen(true);
                  }}
                  className="w-full py-2.5 text-center text-xs font-bold text-[#0B1F42] bg-[#FFB800] rounded-full"
                >
                  Join the Club
                </button>
                <button
                  onClick={() => scrollTo("partner-form")}
                  className="w-full py-2.5 text-center text-xs font-semibold text-[#0B1F42] bg-white border border-[#0B1F42] rounded-full"
                >
                  Partner With Us
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* =========================================================================
          SECTION 4: HERO SECTION - Exact Match to Screenshot 2
      ========================================================================= */}
      <section id="hero" className="relative w-full overflow-hidden bg-white border-b border-slate-100 flex flex-col justify-center min-h-[auto] lg:h-[calc(100vh-74px)] lg:max-h-[580px] xl:max-h-[620px]">
        {/* Subtle Ambient Glows on Left Side */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full flex flex-col lg:flex-row items-stretch justify-between h-full">
          {/* Left Column: ~55% width on desktop, generous spacing & balanced typography */}
          <div className="w-full lg:w-[54%] xl:w-[55%] 2xl:w-[56%] flex flex-col justify-center z-20 pl-6 sm:pl-10 md:pl-14 lg:pl-12 xl:pl-20 2xl:pl-28 pr-6 lg:pr-8 py-8 lg:py-4 text-left">
            {/* Top Light Blue Pill Badge with Sparkle */}
            <div className="inline-flex items-center gap-2 self-start bg-gradient-to-r from-blue-50/90 via-sky-50 to-amber-50/70 text-[#087BEA] border border-blue-200/90 text-[11px] sm:text-[12px] font-black px-4 py-1.5 rounded-full tracking-wider uppercase mb-3 sm:mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#FFB800] shrink-0" />
              <span>POWERED BY TECHIEHELP INSTITUTE OF AI</span>
            </div>

            {/* Main Headline: Static prefix + Premium dynamic rotating typed keyword */}
            <h1 className="text-3xl sm:text-4xl lg:text-[36px] xl:text-[42px] 2xl:text-[48px] font-black text-[#0B1F42] tracking-tight leading-[1.12]">
              <span className="block whitespace-normal lg:whitespace-nowrap">
                Transform Your Campus
              </span>
              <span className="block whitespace-normal lg:whitespace-nowrap mt-1">
                Into a Hub of{" "}
                <TypingHeadlineWord />
              </span>
            </h1>

            {/* Description (max 3 lines on desktop, clear and readable) */}
            <p className="text-sm sm:text-base xl:text-[16px] text-slate-600 font-normal leading-relaxed max-w-[540px] my-3 sm:my-4">
              Join a growing campus innovation ecosystem where students learn emerging technologies, build real-world projects, participate in hackathons, develop leadership skills and prepare for successful careers.
            </p>

            {/* Both CTAs side by side on the same horizontal line */}
            <div className="flex flex-row items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
              <button
                onClick={() => scrollTo("partner-form")}
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#FFB800] hover:bg-[#FFA800] text-[#0B1F42] font-black text-xs sm:text-sm shadow-md hover:shadow-lg hover:shadow-amber-400/30 hover:-translate-y-0.5 active:translate-y-0 transition-all whitespace-nowrap cursor-pointer"
              >
                <span>Establish a Club in Your College</span>
                <ArrowRight className="w-4 h-4 text-[#0B1F42] group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              <button
                onClick={() => setStudentModalOpen(true)}
                className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white hover:bg-slate-50 border-2 border-[#0B1F42] text-[#0B1F42] hover:border-[#087BEA] hover:text-[#087BEA] font-extrabold text-xs sm:text-sm shadow-xs transition-all whitespace-nowrap cursor-pointer"
              >
                <Users className="w-4 h-4 text-slate-500 group-hover:text-[#087BEA] transition-colors" />
                <span>Join Our Community</span>
              </button>
            </div>

            {/* Feature Indicator Row with Subtle Divider */}
            <div className="pt-4 sm:pt-5 mt-4 sm:mt-5 border-t border-slate-100 flex items-center gap-5 sm:gap-7 xl:gap-9 max-w-[560px]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#EAF3FD] to-sky-100 border border-blue-200/70 flex items-center justify-center text-[#087BEA] shrink-0 shadow-2xs">
                  <Building className="w-4 h-4 text-[#087BEA]" />
                </div>
                <div className="text-xs sm:text-[13px] font-black text-[#0B1F42] leading-tight">
                  College<br />
                  <span className="font-semibold text-slate-500 text-[10px] sm:text-[11px]">Collaboration</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#EAF3FD] to-sky-100 border border-blue-200/70 flex items-center justify-center text-[#087BEA] shrink-0 shadow-2xs">
                  <Calendar className="w-4 h-4 text-[#087BEA]" />
                </div>
                <div className="text-xs sm:text-[13px] font-black text-[#0B1F42] leading-tight">
                  Weekly Tech<br />
                  <span className="font-semibold text-slate-500 text-[10px] sm:text-[11px]">Activities</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#EAF3FD] to-sky-100 border border-blue-200/70 flex items-center justify-center text-[#087BEA] shrink-0 shadow-2xs">
                  <GraduationCap className="w-4 h-4 text-[#087BEA]" />
                </div>
                <div className="text-xs sm:text-[13px] font-black text-[#0B1F42] leading-tight">
                  Learning Beyond<br />
                  <span className="font-semibold text-slate-500 text-[10px] sm:text-[11px]">Classrooms</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual: ~45% width on desktop, naturally scaled & perfectly proportioned */}
          <div className="w-full lg:w-[46%] xl:w-[45%] 2xl:w-[44%] h-[340px] sm:h-[420px] lg:h-full relative overflow-hidden flex items-stretch">
            {/* The Award Ceremony Visual Banner */}
            <div className="relative w-full h-full min-h-[340px] lg:min-h-full">
              <Image
                src="/hero-slides/award_ceremony.jpg"
                alt="TechieHelp Campus Innovation Club Award Ceremony & Student Recognition"
                fill
                quality={95}
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-[center_18%]"
                priority
              />

              {/* Floating Tag / Badge on Right Top */}
              <div className="hidden sm:flex absolute top-4 right-4 xl:top-5 xl:right-5 z-10 items-center gap-2 bg-[#0B1F42]/85 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full border border-white/20 shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#FFB800] animate-pulse" />
                <span className="text-[11px] xl:text-xs font-bold tracking-wide">Learn • Build • Compete • Innovate</span>
              </div>

              {/* Floating Achievement Card on Bottom Right */}
              <div className="hidden sm:flex absolute bottom-5 right-5 xl:bottom-6 xl:right-6 z-10 items-center gap-2.5 bg-white/95 backdrop-blur-md text-[#0B1F42] px-3.5 py-2 rounded-xl border border-slate-100 shadow-lg">
                <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                  <Trophy className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] font-black text-[#0B1F42]">Campus Excellence</div>
                  <div className="text-[9px] text-slate-500 font-medium">Recognizing Top Performers</div>
                </div>
              </div>

              {/* Diagonal Transition Accent Overlay (Clean Geometric Edge) */}
              <div className="hidden lg:block absolute inset-y-0 -left-1 w-14 sm:w-16 xl:w-20 h-full z-10 pointer-events-none">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                  {/* Large Diagonal White Mask */}
                  <polygon points="0,0 48,0 10,100 0,100" fill="#FFFFFF" />
                  {/* Blue Accent Diagonal Stripe */}
                  <polygon points="48,0 53,0 15,100 10,100" fill="#087BEA" opacity="0.9" />
                  {/* Subtle Yellow Accent Stripe */}
                  <polygon points="53,0 56,0 18,100 15,100" fill="#FFB800" opacity="0.95" />
                </svg>
              </div>

              {/* Mobile top fade to smoothly blend stacked mobile view */}
              <div className="block lg:hidden absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: ABOUT THE CLUB — Premium 3D Animated UI (Exact Match to Reference)
      ========================================================================= */}
      <section id="about" className="py-20 lg:py-28 bg-[#F7FAFF] relative overflow-hidden border-y border-slate-200/70">
        {/* Soft Ambient Depth Glows */}
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-12 -right-24 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* ==========================================
              TOP: INTRODUCTION SPLIT TWO-COLUMN LAYOUT
          ========================================== */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 lg:mb-20">
            
            {/* Left Column: ~55% content on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-7 flex flex-col justify-center text-left"
            >
              {/* Badge Pill */}
              <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#087BEA] text-xs font-black uppercase tracking-wider mb-5 shadow-2xs">
                <Users className="w-3.5 h-3.5 text-[#087BEA]" />
                <span>ABOUT THE CLUB</span>
              </div>

              {/* Main Headline with Innovation Highlight & Gradient Swoosh */}
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#0B1F42] tracking-tight leading-[1.14]">
                More Than a College Club.{" "}
                <span className="block mt-1">
                  A Complete{" "}
                  <span className="relative inline-block text-[#FFB800]">
                    Innovation
                    {/* Brand gradient swoosh accent */}
                    <svg
                      className="absolute -bottom-2 sm:-bottom-2.5 left-0 w-full h-3 sm:h-3.5 text-[#087BEA] overflow-visible"
                      viewBox="0 0 160 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 14C45 3 115 3 158 13"
                        stroke="url(#swooshAboutInnovation)"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="swooshAboutInnovation" x1="0" y1="0" x2="160" y2="0" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#087BEA" />
                          <stop offset="0.65" stopColor="#087BEA" />
                          <stop offset="1" stopColor="#FFB800" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>{" "}
                  Ecosystem.
                </span>
              </h2>

              {/* Description */}
              <p className="text-base text-slate-600 leading-relaxed font-normal max-w-xl my-6">
                TechieHelp Campus Innovation Club is designed to bridge the gap between academic learning and real-world opportunities. We collaborate with colleges to establish student-led innovation communities where students explore technology, develop practical skills and prepare for their professional journeys.
              </p>

              {/* Three Horizontal Benefit Indicators */}
              <div className="pt-2 flex flex-wrap sm:flex-nowrap items-center gap-5 sm:gap-7 xl:gap-8 border-t border-slate-200/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EAF3FD] to-sky-100 border border-blue-200/80 flex items-center justify-center text-[#087BEA] shrink-0 shadow-2xs">
                    <Building className="w-5 h-5 text-[#087BEA]" />
                  </div>
                  <div className="text-xs sm:text-[13px] font-black text-[#0B1F42] leading-tight">
                    College<br />
                    <span className="font-semibold text-slate-500 text-[11px] sm:text-xs">Collaboration</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EAF3FD] to-sky-100 border border-blue-200/80 flex items-center justify-center text-[#087BEA] shrink-0 shadow-2xs">
                    <Calendar className="w-5 h-5 text-[#087BEA]" />
                  </div>
                  <div className="text-xs sm:text-[13px] font-black text-[#0B1F42] leading-tight">
                    Weekly Tech<br />
                    <span className="font-semibold text-slate-500 text-[11px] sm:text-xs">Activities</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EAF3FD] to-sky-100 border border-blue-200/80 flex items-center justify-center text-[#087BEA] shrink-0 shadow-2xs">
                    <GraduationCap className="w-5 h-5 text-[#087BEA]" />
                  </div>
                  <div className="text-xs sm:text-[13px] font-black text-[#0B1F42] leading-tight">
                    Learning Beyond<br />
                    <span className="font-semibold text-slate-500 text-[11px] sm:text-xs">Classrooms</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: ~45% Premium 3D-Style Visual with Organic Geometric Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="lg:col-span-5 relative flex items-center justify-center"
            >
              {/* Back Accent Yellow Crescent / Blob */}
              <div className="absolute -left-6 top-1/4 w-28 h-28 sm:w-36 sm:h-36 bg-[#FFB800] rounded-full blur-[1px] -z-10 opacity-95 transform -translate-x-3" />

              {/* Top-Right Yellow Celebratory Sparks (\\|/) */}
              <div className="absolute -top-6 -right-3 sm:-top-8 sm:-right-4 text-[#FFB800] pointer-events-none select-none z-20">
                <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 4V14M10 10L17 17M38 10L31 17" stroke="#FFB800" strokeWidth="4.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Organic Curved Outer Wrapper with Electric Blue/Cyan Gradient Border */}
              <div className="relative w-full max-w-[480px] sm:max-w-[500px] aspect-[16/11] sm:aspect-[16/10.5] p-1.5 sm:p-2 rounded-[2.5rem] sm:rounded-[3rem] bg-gradient-to-tr from-[#087BEA] via-[#16BDE0] to-[#087BEA] shadow-2xl shadow-blue-500/20 overflow-hidden group">
                
                {/* Inner Image Container */}
                <div className="relative w-full h-full rounded-[2.2rem] sm:rounded-[2.7rem] overflow-hidden bg-slate-900">
                  <Image
                    src="/about-students-collaboration.jpg"
                    alt="Students Collaborating at TechieHelp Campus Innovation Club"
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    quality={95}
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Subtle glass gradient overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F42]/40 via-transparent to-transparent pointer-events-none" />

                  {/* Floating AI Chip Badge — Top Left */}
                  <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0B1F42]/80 backdrop-blur-md text-white border border-white/20 text-[11px] font-bold shadow-lg">
                    <Cpu className="w-3.5 h-3.5 text-[#16BDE0]" />
                    <span>AI & Web Tracks</span>
                  </div>

                  {/* Floating Lightbulb Project Badge — Bottom Right */}
                  <div className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md text-[#0B1F42] border border-slate-200/80 text-[11px] font-black shadow-xl">
                    <Lightbulb className="w-3.5 h-3.5 text-[#FFB800]" />
                    <span>Real-World Projects</span>
                  </div>
                </div>
              </div>

              {/* Small Floating Innovation Spark */}
              <div className="absolute -bottom-3 -left-3 z-20 w-10 h-10 rounded-2xl bg-white border border-slate-200/80 shadow-lg flex items-center justify-center text-amber-500 transform -rotate-12 hover:rotate-0 transition-transform">
                <Sparkles className="w-5 h-5 text-[#FFB800]" />
              </div>
            </motion.div>
          </div>


          {/* ==========================================
              BOTTOM: FOUR INTERACTIVE 3D FEATURE CARDS
          ========================================== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. LEARN */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.05 }}
              whileHover={{ y: -8, transition: { duration: 0.25, ease: "easeOut" } }}
              onClick={() => scrollTo("programs")}
              className="group relative bg-white/95 rounded-[1.75rem] p-7 border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
            >
              {/* Top-Right Soft Colored Corner Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/15 via-cyan-400/10 to-transparent rounded-bl-[4.5rem] pointer-events-none transition-transform duration-500 group-hover:scale-110" />

              <div className="relative z-10">
                {/* 3D-Style Icon Tile */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#087BEA] via-[#0D87F2] to-[#16BDE0] text-white flex items-center justify-center shadow-lg shadow-blue-500/25 mb-6 transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-white/20 to-white/40 pointer-events-none" />
                  <BookOpen className="w-7 h-7 text-white stroke-[2.2] relative z-10" />
                </div>

                <h3 className="text-2xl font-black text-[#0B1F42] mb-3 tracking-tight">
                  Learn
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed font-normal mb-8">
                  Explore AI, programming, emerging technologies and industry-relevant skills through structured, hands-on masterclasses.
                </p>
              </div>

              {/* Footer */}
              <div className="relative z-10 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[13px] font-bold text-[#087BEA]">
                  AI, Web & Cloud Tracks
                </span>
                <div className="w-8 h-8 rounded-full bg-[#087BEA] text-white flex items-center justify-center shadow-sm group-hover:translate-x-1.5 transition-transform duration-200">
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            </motion.div>

            {/* 2. BUILD */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.12 }}
              whileHover={{ y: -8, transition: { duration: 0.25, ease: "easeOut" } }}
              onClick={() => scrollTo("activities")}
              className="group relative bg-white/95 rounded-[1.75rem] p-7 border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-amber-300 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
            >
              {/* Top-Right Soft Colored Corner Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-400/20 via-yellow-300/10 to-transparent rounded-bl-[4.5rem] pointer-events-none transition-transform duration-500 group-hover:scale-110" />

              <div className="relative z-10">
                {/* 3D-Style Icon Tile */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFB800] via-[#F59E0B] to-[#EA580C] text-white flex items-center justify-center shadow-lg shadow-amber-500/25 mb-6 transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-white/20 to-white/40 pointer-events-none" />
                  <Code2 className="w-7 h-7 text-white stroke-[2.2] relative z-10" />
                </div>

                <h3 className="text-2xl font-black text-[#0B1F42] mb-3 tracking-tight">
                  Build
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed font-normal mb-8">
                  Work on practical projects, solve real-world problems and build your portfolio with guidance from seasoned tech mentors.
                </p>
              </div>

              {/* Footer */}
              <div className="relative z-10 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[13px] font-bold text-[#D97706]">
                  Production Portfolio
                </span>
                <div className="w-8 h-8 rounded-full bg-[#FFB800] text-[#0B1F42] flex items-center justify-center shadow-sm group-hover:translate-x-1.5 transition-transform duration-200">
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            </motion.div>

            {/* 3. COMPETE */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.19 }}
              whileHover={{ y: -8, transition: { duration: 0.25, ease: "easeOut" } }}
              onClick={() => scrollTo("activities")}
              className="group relative bg-white/95 rounded-[1.75rem] p-7 border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-purple-300 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
            >
              {/* Top-Right Soft Colored Corner Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/20 via-indigo-300/10 to-transparent rounded-bl-[4.5rem] pointer-events-none transition-transform duration-500 group-hover:scale-110" />

              <div className="relative z-10">
                {/* 3D-Style Icon Tile */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8B5CF6] via-[#7C3AED] to-[#4F46E5] text-white flex items-center justify-center shadow-lg shadow-purple-500/25 mb-6 transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-white/20 to-white/40 pointer-events-none" />
                  <Trophy className="w-7 h-7 text-white stroke-[2.2] relative z-10" />
                </div>

                <h3 className="text-2xl font-black text-[#0B1F42] mb-3 tracking-tight">
                  Compete
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed font-normal mb-8">
                  Participate in coding contests, hackathons, innovation challenges and technical events across campus and national stages.
                </p>
              </div>

              {/* Footer */}
              <div className="relative z-10 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[13px] font-bold text-[#7C3AED]">
                  Hackathons & Contests
                </span>
                <div className="w-8 h-8 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center shadow-sm group-hover:translate-x-1.5 transition-transform duration-200">
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            </motion.div>

            {/* 4. GROW */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.26 }}
              whileHover={{ y: -8, transition: { duration: 0.25, ease: "easeOut" } }}
              onClick={() => scrollTo("membership")}
              className="group relative bg-white/95 rounded-[1.75rem] p-7 border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
            >
              {/* Top-Right Soft Colored Corner Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-500/20 via-teal-300/10 to-transparent rounded-bl-[4.5rem] pointer-events-none transition-transform duration-500 group-hover:scale-110" />

              <div className="relative z-10">
                {/* 3D-Style Icon Tile */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857] text-white flex items-center justify-center shadow-lg shadow-emerald-500/25 mb-6 transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-white/20 to-white/40 pointer-events-none" />
                  <TrendingUp className="w-7 h-7 text-white stroke-[2.2] relative z-10" />
                </div>

                <h3 className="text-2xl font-black text-[#0B1F42] mb-3 tracking-tight">
                  Grow
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed font-normal mb-8">
                  Develop leadership, communication, networking and career-readiness skills that distinguish you in campus hiring drives.
                </p>
              </div>

              {/* Footer */}
              <div className="relative z-10 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[13px] font-bold text-[#059669]">
                  Career & Leadership
                </span>
                <div className="w-8 h-8 rounded-full bg-[#10B981] text-white flex items-center justify-center shadow-sm group-hover:translate-x-1.5 transition-transform duration-200">
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6: WEEKLY ACTIVITIES & INTERACTIVE CALENDAR
      ========================================================================= */}
      <section id="activities" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <span className="text-xs font-black tracking-widest text-amber-600 uppercase bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-full">
              Weekly Rhythm
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Something Exciting Happens Every Week.
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Our campus clubs keep students engaged through regular learning, innovation and community activities. Click through the calendar to preview a typical week inside the club.
            </p>
          </div>

          {/* Interactive Activity Day Selector Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {weeklyDays.map((item, idx) => {
              const isSelected = selectedDayIndex === idx;
              return (
                <button
                  key={item.day}
                  onClick={() => setSelectedDayIndex(idx)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? "bg-slate-950 border-slate-900 text-white shadow-lg shadow-slate-900/10 scale-[1.02]"
                      : "bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <div className={`text-[10px] font-extrabold uppercase tracking-wider mb-1 ${isSelected ? "text-cyan-400" : "text-slate-400"}`}>
                    {item.code}
                  </div>
                  <div className="font-bold text-sm">{item.day}</div>
                  <div className={`text-[11px] truncate mt-1 ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                    {item.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Activity Feature Card */}
          {weeklyDays[selectedDayIndex] && (
            <motion.div
              key={selectedDayIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-50/70 border border-slate-200/80 rounded-3xl p-6 sm:p-10 mb-12 shadow-sm"
            >
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                      {weeklyDays[selectedDayIndex].day} Spotlight
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800">
                      {weeklyDays[selectedDayIndex].badge}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {weeklyDays[selectedDayIndex].time}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
                    {weeklyDays[selectedDayIndex].title}
                  </h3>
                  <p className="text-sm font-semibold text-cyan-700">
                    {weeklyDays[selectedDayIndex].type}
                  </p>
                  <p className="text-base text-slate-600 leading-relaxed">
                    {weeklyDays[selectedDayIndex].description}
                  </p>

                  <div className="pt-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                      Key Competencies & Practical Skills Unlocked:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {weeklyDays[selectedDayIndex].skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-xs flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 text-amber-400 mx-auto flex items-center justify-center shadow-md">
                    <Calendar className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">Student-Led & Mentor Guided</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Designed to blend seamlessly with campus academic timetables without burdening exam schedules.
                    </p>
                  </div>
                  <button
                    onClick={() => setStudentModalOpen(true)}
                    className="w-full py-2.5 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shadow-xs"
                  >
                    Join Upcoming Activity Session
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* 6 Visual Activity Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Terminal className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-950 text-base mb-1.5">Tech Challenges</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Coding contests, algorithmic puzzles, aptitude competitions and competitive programming sprints.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-cyan-400 hover:shadow-lg transition-all">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-950 text-base mb-1.5">AI & Technology Workshops</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Artificial intelligence, machine learning, automation, modern frameworks and emerging technologies.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-lg transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <Laptop className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-950 text-base mb-1.5">Build Days</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Collaborative projects, practical architecture implementation, pair programming and demonstrations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-purple-400 hover:shadow-lg transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <Presentation className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-950 text-base mb-1.5">Expert Sessions</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Industry experts, tech founders, alumni mentors and structured interactive career roadmap discussions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <Code2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-950 text-base mb-1.5">Skill Bootcamps</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hands-on training, guided learning modules, deep-dive technical stacks, and practical labs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-orange-400 hover:shadow-lg transition-all">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-950 text-base mb-1.5">Hackathons & Demo Days</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Campus-wide innovation challenges, team hackathons, prototype showcases and evaluated project presentations.
              </p>
            </div>
          </div>

          {/* Schedule Disclaimer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-slate-500 italic max-w-2xl mx-auto">
              * Note: Activity schedules and timing can vary according to college academic calendars, mid-semester exams, and campus venue availability.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: PROGRAMS & OPPORTUNITIES (6 Cards)
      ========================================================================= */}
      <section id="programs" className="py-20 bg-slate-50/70 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-black tracking-widest text-blue-600 uppercase bg-blue-50 border border-blue-200/80 px-3 py-1 rounded-full">
              Opportunities
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Everything Students Need to Grow.
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              From foundational AI skills to product building and startup incubation, each program is architected to give students unfair advantages in today’s technology landscape.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programsData.map((prog) => {
              const IconComp = prog.icon;
              return (
                <div
                  key={prog.title}
                  className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${prog.color}`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        Program
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-slate-950 mb-1">{prog.title}</h3>
                      <p className="text-xs font-semibold text-cyan-700">{prog.tagline}</p>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {prog.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <button
                      onClick={() => setStudentModalOpen(true)}
                      className="w-full py-2.5 px-4 text-xs font-bold text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors flex items-center justify-center gap-1.5 group"
                    >
                      <span>{prog.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-600 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: COLLEGE PARTNERSHIP SECTION (4 Steps)
      ========================================================================= */}
      <section id="partnership" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-black tracking-widest text-cyan-700 uppercase bg-cyan-50 border border-cyan-200/80 px-3 py-1 rounded-full">
              Institutional Partnership
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Let&apos;s Build Something Great on Your Campus.
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              We partner with educational institutions to establish dedicated Campus Innovation Clubs that create continuous opportunities for students to learn, build and grow.
            </p>
          </div>

          {/* 4 Steps Process */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {partnershipSteps.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.step}
                  className="relative bg-slate-50/70 p-7 rounded-3xl border border-slate-200/80 hover:bg-white hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-slate-300 group-hover:text-cyan-500 transition-colors">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-800 group-hover:bg-slate-950 group-hover:text-cyan-400 transition-all">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block mb-1">
                    {item.tag}
                  </span>
                  <h3 className="text-xl font-bold text-slate-950 mb-3">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <button
              onClick={() => scrollTo("partner-form")}
              className="px-8 py-4 text-sm font-bold text-white bg-slate-950 hover:bg-slate-900 rounded-2xl shadow-lg hover:shadow-cyan-500/20 transition-all border border-slate-800 inline-flex items-center gap-2 group"
            >
              <span>Partner With TechieHelp</span>
              <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: BENEFITS FOR COLLEGES (2-Column + Disclaimer)
      ========================================================================= */}
      <section className="py-20 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-black tracking-widest text-amber-600 uppercase bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-full">
              Institutional Impact
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              A Stronger Innovation Culture for Your Institution.
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Empower your campus with tangible technical enrichment, student leadership structures, and corporate visibility that bolster accreditation, student satisfaction, and career outcomes.
            </p>
          </div>

          {/* Two-Column Grid of 8 Benefits */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
            {collegeBenefits.map((benefit) => {
              const IconComp = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex items-start gap-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 shrink-0">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-950 text-base mb-1">{benefit.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mandatory Transparent Scope Communication */}
          <div className="max-w-4xl mx-auto bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 text-center">
            <div className="flex items-center justify-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Transparency Commitment: Placement Support Scope</span>
            </div>
            <p className="text-xs text-amber-900/80 max-w-2xl mx-auto leading-relaxed">
              Placement support within the Campus Innovation Club means thorough technical preparation, ATS resume building, mock interviews, and direct facilitation of opportunities with our partner network. We do not promise unconditional or guaranteed employment.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: STUDENT LEADERSHIP TEAM (7 Roles)
      ========================================================================= */}
      <section id="leadership" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-black tracking-widest text-cyan-600 uppercase bg-cyan-50 border border-cyan-200/80 px-3 py-1 rounded-full">
              Campus Governance
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Lead Your Campus. Build Your Community.
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Every college club will have a student leadership team that manages activities, engages members and helps build a strong technology community.
            </p>
          </div>

          {/* 7 Leadership Roles Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {leadershipRoles.map((role) => {
              const IconComp = role.icon;
              return (
                <div
                  key={role.title}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shadow-xs">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${role.badgeColor}`}>
                        {role.role}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-950 text-lg">{role.title}</h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {role.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium">Council Role</span>
                    <span className="font-bold text-cyan-600">Official Badge</span>
                  </div>
                </div>
              );
            })}

            {/* Application Opportunity Card */}
            <div className="bg-gradient-to-tr from-slate-950 to-slate-900 rounded-3xl p-6 text-white border border-slate-800 shadow-md flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase">
                  Open Nominations
                </span>
                <h3 className="text-xl font-black text-white">Ready to Lead?</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Step up to spearhead technical culture on your campus and earn premier executive credentials.
                </p>
              </div>
              <button
                onClick={() => setStudentModalOpen(true)}
                className="mt-6 w-full py-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shadow-sm"
              >
                Become a Campus Leader
              </button>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-slate-500 italic max-w-xl mx-auto mb-4">
              * Leadership selection will happen in structured coordination with the college administration, faculty coordinators, and TechieHelp.
            </p>
            <button
              onClick={() => setStudentModalOpen(true)}
              className="px-6 py-3 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-200 transition-colors inline-flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-cyan-600" />
              <span>Apply for Leadership Council</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 11: CLUB MEMBERSHIP, LEADERSHIP & BENEFITS (EXPANDED SECTION)
      ========================================================================= */}
      <section id="membership" className="py-24 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/70 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-black tracking-widest text-amber-600 uppercase bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-full">
              Membership & Recognition
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
              Join the Club. Unlock Real Opportunities.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
              &ldquo;Become part of a campus community where your contribution earns recognition, leadership experience, exclusive benefits and career opportunities.&rdquo;
            </p>
          </div>

          {/* 4 Membership Categories Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {membershipTiers.map((tier) => (
              <div
                key={tier.tier}
                className={`rounded-3xl p-7 border shadow-xs hover:shadow-xl transition-all flex flex-col justify-between ${tier.color}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${tier.pill}`}>
                      {tier.tier}
                    </span>
                    <Sparkle className="w-4 h-4 text-amber-500" />
                  </div>

                  <div>
                    <h3 className="font-black text-slate-950 text-xl">{tier.tier}</h3>
                    <p className="text-xs font-bold text-slate-500 mt-0.5">{tier.sub}</p>
                    <span className="inline-block mt-2 text-[10px] font-semibold text-cyan-700 bg-cyan-50/80 px-2 py-0.5 rounded border border-cyan-100">
                      Badge: {tier.badgeText}
                    </span>
                  </div>

                  <div className="pt-2 space-y-2.5">
                    {tier.perks.map((perk, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-tight">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button
                    onClick={() => setStudentModalOpen(true)}
                    className="w-full py-2.5 text-xs font-bold text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors shadow-xs"
                  >
                    Apply for this Tier
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* =========================================================================
              SUB-FEATURE: JOINING KIT SHOWCASE
          ========================================================================= */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-md mb-20">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-black tracking-widest text-cyan-600 uppercase bg-cyan-50 border border-cyan-200 px-3 py-1 rounded-full">
                  Official Merch & Swag
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                  Proposed Joining Kit Showcase
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Celebrate your active involvement with official TechieHelp Campus Innovation Club merchandise designed to foster identity and team pride.
                </p>

                {/* Kit Item List */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800">
                    <Shirt className="w-4 h-4 text-cyan-600" />
                    <span>Branded T-Shirt</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800">
                    <IdCard className="w-4 h-4 text-amber-500" />
                    <span>Official Club ID Card</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>Custom Club Lanyard</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800">
                    <BookMarked className="w-4 h-4 text-emerald-600" />
                    <span>Diary & Notebook</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800">
                    <FileBadge className="w-4 h-4 text-orange-500" />
                    <span>Official Welcome Letter</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800">
                    <Coffee className="w-4 h-4 text-purple-600" />
                    <span>Mug (Leadership Kits)</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 italic pt-2">
                  * Physical kit contents and eligibility depend on the membership role, active club engagement, and club policy.
                </p>
              </div>

              {/* Visual Showcase Graphic / Apparel Box */}
              <div className="lg:col-span-7">
                <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 p-6 text-white aspect-[16/10] flex items-center justify-center">
                  <Image
                    src="/swag_apparel.png"
                    alt="TechieHelp Campus Innovation Club Swag and Apparel Kit"
                    fill
                    className="object-cover opacity-85 hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
                        Official Welcome Package
                      </span>
                      <h4 className="text-base font-bold text-white">Campus Chapter Apparel & Leadership Badges</h4>
                    </div>
                    <span className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-white">
                      Verified Kit
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              SUB-FEATURE: FREE INTERNSHIP OPPORTUNITY
          ========================================================================= */}
          <div className="bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-2xl mb-20 relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl space-y-4 mb-10">
              <span className="text-xs font-black tracking-widest text-amber-400 uppercase bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full">
                Industry Launchpad
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Your Club Membership Could Open the Door to Real Industry Experience.
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Active members can apply for selected free internship opportunities with TechieHelp. Gain real-world engineering and product experience while still studying on campus.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-9 h-9 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
                  <Laptop className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm mb-1">Practical Project Exposure</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Work on production architectures, live web applications, and AI pipelines alongside senior engineers.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm mb-1">Real-World Learning</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Understand sprint planning, GitHub pull requests, CI/CD automated deployments, and agile workflows.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
                  <Presentation className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm mb-1">Mentor Guidance</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Regular code reviews, architectural feedback, and 1-on-1 problem-solving sessions with industry practitioners.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                  <FileBadge className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm mb-1">Internship Completion Certificate</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Official verifiable digital credentials awarded for eligible successful participants upon project delivery.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-9 h-9 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center mb-3">
                  <Target className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm mb-1">Portfolio Development</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Build GitHub repositories with live links and deployment documentation that impress tech recruiters.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-9 h-9 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
                  <Trophy className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm mb-1">Career Preparation</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Aptitude masterclasses, ATS resume vetting, mock technical interviews, and professional positioning.
                </p>
              </div>
            </div>

            {/* Crucial Mandatory Disclaimer Box */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center max-w-3xl mx-auto">
              <p className="text-xs text-amber-300 font-medium leading-relaxed">
                &ldquo;Internship opportunities are subject to eligibility, selection, available seats and successful completion requirements. Membership does not guarantee internship selection.&rdquo;
              </p>
            </div>
          </div>

          {/* =========================================================================
              SUB-FEATURE: DIGITAL ROLE BADGES (8 BADGES)
          ========================================================================= */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-md mb-20">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <span className="text-xs font-black tracking-widest text-cyan-600 uppercase bg-cyan-50 border border-cyan-200 px-3 py-1 rounded-full">
                Digital Credentialing
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
                Official Digital Role Badges
              </h3>
              <p className="text-sm text-slate-600">
                Verifiable digital badges styled in signature TechieHelp brand aesthetics for student leaders, ambassadors, and innovators.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {roleBadgesList.map((badge) => {
                const IconComp = badge.icon;
                return (
                  <div
                    key={badge.id}
                    className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all text-center flex flex-col items-center justify-center space-y-3 group"
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${badge.color} p-0.5 shadow-md group-hover:scale-105 transition-transform`}>
                      <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center text-white">
                        <IconComp className="w-6 h-6 text-amber-300" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{badge.name}</h4>
                      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mt-0.5">
                        {badge.tier}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono font-bold text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {badge.code}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* =========================================================================
              NEW ADVANCED FEATURE: LIVE INTERACTIVE MEMBER DASHBOARD SIMULATOR
              "Club member dashboard mein student ka role, digital badge, participation
               points, event history, certificates aur internship eligibility status"
          ========================================================================= */}
          <div id="dashboard" className="bg-slate-950 rounded-3xl p-6 sm:p-10 text-white border border-slate-800 shadow-2xl mb-16 relative overflow-hidden">
            {/* Ambient Background Aura */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Dashboard Header Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-800">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold mb-2">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Interactive Member Dashboard Preview</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Student Member Portal & Progress Tracker
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Students earn points for every workshop, code sprint, and hackathon, unlocking verified badges and free internship eligibility.
                </p>
              </div>

              {/* Role Switcher Selector */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
                <span className="text-[10px] text-slate-400 font-bold px-2 uppercase">Preview Role:</span>
                <button
                  onClick={() => setActiveDashboardRole("president")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeDashboardRole === "president" ? "bg-amber-400 text-slate-950" : "text-slate-400 hover:text-white"
                  }`}
                >
                  President
                </button>
                <button
                  onClick={() => setActiveDashboardRole("tech_lead")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeDashboardRole === "tech_lead" ? "bg-cyan-500 text-slate-950" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Tech Lead
                </button>
                <button
                  onClick={() => setActiveDashboardRole("ambassador")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeDashboardRole === "ambassador" ? "bg-blue-500 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Ambassador
                </button>
                <button
                  onClick={() => setActiveDashboardRole("member")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeDashboardRole === "member" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Member
                </button>
              </div>
            </div>

            {/* Dashboard Content Grid */}
            <div className="grid lg:grid-cols-12 gap-8 pt-8">
              {/* Left Column: Student Profile & Digital Badge */}
              <div className="lg:col-span-4 space-y-6">
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-cyan-500 p-0.5 shadow-lg">
                      <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center text-amber-300 font-black text-xl">
                        {currentDashboard.name.split(" ").map(n => n[0]).join("")}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-black text-white text-lg">{currentDashboard.name}</h4>
                        <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      </div>
                      <p className="text-xs font-bold text-amber-400">{currentDashboard.role}</p>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{currentDashboard.college}</p>
                    </div>
                  </div>

                  {/* Badge Pill */}
                  <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Official Status</span>
                    <span className="text-xs font-extrabold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2.5 py-0.5 rounded-lg">
                      {currentDashboard.tierBadge}
                    </span>
                  </div>
                </div>

                {/* Participation Points & XP Bar */}
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-orange-400" />
                      Participation XP
                    </span>
                    <span className="text-sm font-black text-amber-400">
                      {currentDashboard.points} / {currentDashboard.maxPoints} XP
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden p-0.5 border border-slate-700">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(currentDashboard.points / currentDashboard.maxPoints) * 100}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-cyan-400"
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>Rank: {currentDashboard.level}</span>
                    <span className="text-cyan-400 font-semibold">{Math.round((currentDashboard.points / currentDashboard.maxPoints) * 100)}% Complete</span>
                  </div>
                </div>

                {/* Real-time Internship Eligibility Status Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-b from-cyan-950/40 to-slate-900 border border-cyan-500/30 space-y-3">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-extrabold text-cyan-300 uppercase tracking-wider">
                      Internship Eligibility Status
                    </span>
                  </div>

                  <div className="text-sm font-black text-white">
                    {currentDashboard.internshipStatus}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentDashboard.internshipDesc}
                  </p>

                  <button
                    onClick={() => setStudentModalOpen(true)}
                    className="w-full mt-2 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors shadow-xs"
                  >
                    Apply / Review Application
                  </button>
                </div>
              </div>

              {/* Right Column: Event History & Earned Certificates */}
              <div className="lg:col-span-8 space-y-6">
                {/* Event Attendance History */}
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-400" />
                      <h4 className="font-bold text-white text-sm">Event Attendance & Activity History</h4>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">Synced with Campus LMS</span>
                  </div>

                  <div className="space-y-2.5">
                    {currentDashboard.eventsAttended.map((evt, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-4 hover:border-slate-700 transition-colors"
                      >
                        <div>
                          <div className="font-bold text-white text-xs sm:text-sm">{evt.name}</div>
                          <div className="text-[11px] text-slate-400">{evt.date}</div>
                        </div>
                        <div className="flex items-center gap-2.5 shrink-0">
                          <span className="text-[11px] font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                            {evt.status}
                          </span>
                          <span className="text-xs font-extrabold text-amber-400 font-mono">
                            {evt.xp}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verified Certificates */}
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-cyan-400" />
                      <h4 className="font-bold text-white text-sm">Verified Club Certificates</h4>
                    </div>
                    <span className="text-[11px] text-cyan-400 font-bold uppercase">Digitally Verifiable</span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {currentDashboard.certificates.map((cert, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3"
                      >
                        <div className="flex items-start justify-between">
                          <FileBadge className="w-5 h-5 text-amber-400" />
                          <span className="text-[9px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                            {cert.id}
                          </span>
                        </div>
                        <div>
                          <h5 className="font-bold text-white text-xs line-clamp-1">{cert.title}</h5>
                          <span className="text-[10px] text-slate-400">Issued: {cert.date}</span>
                        </div>
                        <button
                          onClick={() => toast.info(`Viewing verifiable certificate #${cert.id}`)}
                          className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                        >
                          <span>View Credential</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Final CTA of this section */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
              Your Campus Journey Deserves More Than a Membership Card.
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Join a community that recognizes your skills, rewards your contributions and helps you grow through real opportunities.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setStudentModalOpen(true)}
                className="w-full sm:w-auto px-7 py-3.5 text-xs font-bold text-white bg-slate-950 hover:bg-slate-900 rounded-xl shadow-md border border-slate-800"
              >
                Become a Club Member
              </button>
              <button
                onClick={() => setStudentModalOpen(true)}
                className="w-full sm:w-auto px-7 py-3.5 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-xs"
              >
                Apply for Leadership Role
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 12: CAMPUS-TO-CAREER JOURNEY (Horizontal Timeline)
      ========================================================================= */}
      <section id="journey" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-black tracking-widest text-cyan-600 uppercase bg-cyan-50 border border-cyan-200/80 px-3 py-1 rounded-full">
              Student Trajectory
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              From Campus Learning to Career Readiness.
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              A structured 7-step progressive pathway that takes students from first-year curiosity to high-confidence campus placement readiness.
            </p>
          </div>

          {/* Horizontal Timeline Steps */}
          <div className="relative">
            {/* Connecting Line for Large Screens */}
            <div className="hidden xl:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-cyan-400 via-amber-400 to-blue-600 -translate-y-6 -z-0" />

            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-7 gap-4 relative z-10">
              {journeySteps.map((step) => {
                const IconComp = step.icon;
                return (
                  <div
                    key={step.step}
                    className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-black text-slate-400 group-hover:text-cyan-600 transition-colors font-mono">
                          STEP {step.step}
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-800 group-hover:bg-slate-950 group-hover:text-amber-400 transition-all">
                          <IconComp className="w-4 h-4" />
                        </div>
                      </div>

                      <h4 className="font-bold text-slate-950 text-sm mb-1">{step.title}</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{step.desc}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1 text-[10px] font-bold text-cyan-600">
                      <span>Milestone {step.step}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 13: TECHIEHELP ECOSYSTEM (8 Connected Cards)
      ========================================================================= */}
      <section className="py-20 bg-slate-50/70 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-black tracking-widest text-blue-600 uppercase bg-blue-50 border border-blue-200/80 px-3 py-1 rounded-full">
              Synergistic Network
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              One Ecosystem. Multiple Opportunities.
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              The Campus Innovation Club is not an isolated initiative. It is tightly integrated into the broader TechieHelp career and artificial intelligence ecosystem.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ecosystemData.map((eco) => {
              const IconComp = eco.icon;
              return (
                <div
                  key={eco.name}
                  className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${eco.accent}`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        {eco.tag}
                      </span>
                      <h3 className="font-bold text-slate-950 text-base">{eco.name}</h3>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {eco.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
                    <span>Ecosystem Pillar</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 14: PARTNERSHIP CTA SECTION (Dark Navy + Brand Highlights)
      ========================================================================= */}
      <section className="py-24 bg-[#0A0F1D] text-white relative overflow-hidden">
        {/* Subtle Brand Accent Glows */}
        <div className="absolute -left-20 top-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-20 bottom-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Empower Your Institution</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Your Campus. Your Community. Your Innovation Journey.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Bring TechieHelp Campus Innovation Club to your institution and create an environment where students learn beyond classrooms.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => scrollTo("partner-form")}
              className="w-full sm:w-auto px-8 py-4 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 group"
            >
              <span>Establish a Club</span>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollTo("partner-form")}
              className="w-full sm:w-auto px-8 py-4 text-sm font-bold text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-2xl backdrop-blur-md transition-all"
            >
              Discuss College Partnership
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 15: CONTACT / PARTNERSHIP FORM & STUDENT CTA
      ========================================================================= */}
      <section id="partner-form" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-black tracking-widest text-cyan-600 uppercase bg-cyan-50 border border-cyan-200 px-3 py-1 rounded-full">
              Partnership Inquiry
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Bring a TechieHelp Club to Your College
            </h2>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
              Principals, Directors, HODs, Faculty Coordinators, and Training & Placement Officers can submit their institutional details below.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-slate-50/70 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm">
            <form onSubmit={handlePartnerSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-5">
                {/* College Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    College Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="collegeName"
                    value={partnerForm.collegeName}
                    onChange={handlePartnerChange}
                    placeholder="e.g. Jodhpur Institute of Engineering & Technology"
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                      partnerErrors.collegeName ? "border-rose-400 bg-rose-50/30" : "border-slate-200"
                    }`}
                  />
                  {partnerErrors.collegeName && (
                    <p className="text-[11px] text-rose-500">{partnerErrors.collegeName}</p>
                  )}
                </div>

                {/* College Website */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    College Website <span className="text-slate-400">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="collegeWebsite"
                    value={partnerForm.collegeWebsite}
                    onChange={handlePartnerChange}
                    placeholder="e.g. https://www.jietjodhpur.ac.in"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  />
                </div>

                {/* City */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    City <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={partnerForm.city}
                    onChange={handlePartnerChange}
                    placeholder="e.g. Jodhpur"
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                      partnerErrors.city ? "border-rose-400 bg-rose-50/30" : "border-slate-200"
                    }`}
                  />
                  {partnerErrors.city && (
                    <p className="text-[11px] text-rose-500">{partnerErrors.city}</p>
                  )}
                </div>

                {/* State */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    State <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={partnerForm.state}
                    onChange={handlePartnerChange}
                    placeholder="e.g. Rajasthan"
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                      partnerErrors.state ? "border-rose-400 bg-rose-50/30" : "border-slate-200"
                    }`}
                  />
                  {partnerErrors.state && (
                    <p className="text-[11px] text-rose-500">{partnerErrors.state}</p>
                  )}
                </div>

                {/* Contact Person Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Contact Person Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="contactPersonName"
                    value={partnerForm.contactPersonName}
                    onChange={handlePartnerChange}
                    placeholder="e.g. Dr. Rajesh Sharma"
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                      partnerErrors.contactPersonName ? "border-rose-400 bg-rose-50/30" : "border-slate-200"
                    }`}
                  />
                  {partnerErrors.contactPersonName && (
                    <p className="text-[11px] text-rose-500">{partnerErrors.contactPersonName}</p>
                  )}
                </div>

                {/* Designation */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Designation <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="designation"
                    value={partnerForm.designation}
                    onChange={handlePartnerChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  >
                    <option value="Principal / Director">Principal / Director</option>
                    <option value="HOD (Head of Department)">HOD (Head of Department)</option>
                    <option value="Faculty Coordinator">Faculty Coordinator</option>
                    <option value="Training & Placement Officer (TPO)">Training & Placement Officer (TPO)</option>
                    <option value="Student Representative">Student Representative</option>
                    <option value="Other Institutional Official">Other Institutional Official</option>
                  </select>
                </div>

                {/* Official Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Official Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={partnerForm.email}
                    onChange={handlePartnerChange}
                    placeholder="e.g. tpo@college.edu.in"
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                      partnerErrors.email ? "border-rose-400 bg-rose-50/30" : "border-slate-200"
                    }`}
                  />
                  {partnerErrors.email && (
                    <p className="text-[11px] text-rose-500">{partnerErrors.email}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Phone Number (10 Digits) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={partnerForm.phone}
                    onChange={handlePartnerChange}
                    placeholder="e.g. 9876543210"
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                      partnerErrors.phone ? "border-rose-400 bg-rose-50/30" : "border-slate-200"
                    }`}
                  />
                  {partnerErrors.phone && (
                    <p className="text-[11px] text-rose-500">{partnerErrors.phone}</p>
                  )}
                </div>
              </div>

              {/* Expected Student Community Size */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Expected Student Community Size <span className="text-rose-500">*</span>
                </label>
                <select
                  name="studentCommunitySize"
                  value={partnerForm.studentCommunitySize}
                  onChange={handlePartnerChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                >
                  <option value="50 - 100 Students">50 - 100 Students</option>
                  <option value="100 - 250 Students">100 - 250 Students</option>
                  <option value="250 - 500 Students">250 - 500 Students</option>
                  <option value="500+ Students">500+ Students</option>
                </select>
              </div>

              {/* Message / Partnership Requirements */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Message / Partnership Requirements <span className="text-slate-400">(Optional)</span>
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={partnerForm.message}
                  onChange={handlePartnerChange}
                  placeholder="Share any specific initiatives, departments (e.g. CSE, AI/ML, BCA) or targets your institution is prioritizing..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmittingPartner}
                className="w-full py-4 text-sm font-bold text-white bg-slate-950 hover:bg-slate-900 rounded-2xl shadow-lg hover:shadow-cyan-500/20 transition-all border border-slate-800 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isSubmittingPartner ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Partnership Request</span>
                    <Send className="w-4 h-4 text-cyan-400" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Separate Student Registration CTA */}
          <div className="mt-10 text-center p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="font-bold text-slate-900 text-sm">Interested in Joining the Club?</h4>
              <p className="text-xs text-slate-500">
                Are you a college student looking to build, learn and compete? Join the student community.
              </p>
            </div>
            <button
              onClick={() => setStudentModalOpen(true)}
              className="px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shrink-0 shadow-xs"
            >
              Join the Student Community
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 16: FAQ SECTION (Interactive Accordion for 10 Questions)
      ========================================================================= */}
      <section id="faq" className="py-20 bg-slate-50/70 border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-14">
            <span className="text-xs font-black tracking-widest text-amber-600 uppercase bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600">
              Clear answers regarding our college partnership framework, student benefits, and weekly schedules.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
                  >
                    <span className="font-bold text-slate-900 text-sm sm:text-base">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180 text-cyan-600" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/70">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 17: FOOTER
      ========================================================================= */}
      <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
            {/* Col 1: Logo & Club Description */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 p-1.5 border border-slate-800 flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="TechieHelp Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <div>
                  <span className="font-black text-white text-lg">TechieHelp</span>
                  <span className="block text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                    Campus Innovation Club
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                TechieHelp Campus Innovation Club is an institutional student-led technology, AI, and career ecosystem established in partnership with colleges via formal MoUs.
              </p>

              <div className="pt-2 text-xs font-semibold text-slate-300">
                Official Support:{" "}
                <a href="mailto:support@techiehelp.in" className="text-cyan-400 hover:underline">
                  support@techiehelp.in
                </a>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">Quick Navigation</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <button onClick={() => scrollTo("hero")} className="hover:text-cyan-400 transition-colors">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo("about")} className="hover:text-cyan-400 transition-colors">
                    About Club
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo("activities")} className="hover:text-cyan-400 transition-colors">
                    Weekly Activities
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo("programs")} className="hover:text-cyan-400 transition-colors">
                    Programs & Tracks
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo("membership")} className="hover:text-cyan-400 transition-colors">
                    Membership & Benefits
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo("dashboard")} className="hover:text-cyan-400 transition-colors">
                    Member Dashboard
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Institutional & Links */}
            <div className="lg:col-span-4 space-y-3">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">TechieHelp Network</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <button onClick={() => scrollTo("partner-form")} className="hover:text-cyan-400 transition-colors">
                    College Partnership (MoU)
                  </button>
                </li>
                <li>
                  <button onClick={() => setStudentModalOpen(true)} className="hover:text-cyan-400 transition-colors">
                    Student Community Registration
                  </button>
                </li>
                <li>
                  <a
                    href="https://www.techiehelp.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
                  >
                    <span>TechieHelp Main Website</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.techiehelp.in/contacts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
                  >
                    <span>Contact TechieHelp</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
              </ul>

              {/* Social Channels */}
              <div className="pt-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-2">
                  Follow Community
                </span>
                <div className="flex items-center gap-3 text-slate-400">
                  <a
                    href="https://www.linkedin.com/company/techiehelp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-400 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="https://youtube.com/techiehelp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-400 transition-colors"
                    aria-label="YouTube"
                  >
                    <YoutubeIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="https://instagram.com/techiehelp_ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-400 transition-colors"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="https://github.com/amitkumardemo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-400 transition-colors"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar & Tagline */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              &copy; {new Date().getFullYear()} TechieHelp Campus Innovation Club. All rights reserved.
            </div>
            <div className="text-amber-400 font-extrabold tracking-widest uppercase text-xs">
              Learn. Build. Compete. Innovate.
            </div>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          MODAL 1: STUDENT COMMUNITY / LEADERSHIP JOIN MODAL
      ========================================================================= */}
      <AnimatePresence>
        {studentModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setStudentModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2 mb-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-md border border-cyan-200">
                  Join Campus Innovation Network
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                  Student Community Registration
                </h3>
                <p className="text-xs text-slate-600">
                  Enroll as an active student member or apply for campus chapter leadership roles.
                </p>
              </div>

              <form onSubmit={handleStudentSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    name="studentName"
                    value={studentForm.studentName}
                    onChange={handleStudentChange}
                    placeholder="e.g. Aditya Sharma"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  {studentErrors.studentName && (
                    <p className="text-[11px] text-rose-500">{studentErrors.studentName}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={studentForm.email}
                      onChange={handleStudentChange}
                      placeholder="student@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    {studentErrors.email && (
                      <p className="text-[11px] text-rose-500">{studentErrors.email}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">WhatsApp / Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={studentForm.phone}
                      onChange={handleStudentChange}
                      placeholder="10 digit number"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    {studentErrors.phone && (
                      <p className="text-[11px] text-rose-500">{studentErrors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">College / University Name</label>
                  <input
                    type="text"
                    name="collegeName"
                    value={studentForm.collegeName}
                    onChange={handleStudentChange}
                    placeholder="e.g. Engineering College Jodhpur"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  {studentErrors.collegeName && (
                    <p className="text-[11px] text-rose-500">{studentErrors.collegeName}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Branch / Major</label>
                    <input
                      type="text"
                      name="branch"
                      value={studentForm.branch}
                      onChange={handleStudentChange}
                      placeholder="e.g. CSE / IT / AI / BCA"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    {studentErrors.branch && (
                      <p className="text-[11px] text-rose-500">{studentErrors.branch}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Academic Year</label>
                    <select
                      name="year"
                      value={studentForm.year}
                      onChange={handleStudentChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                      <option value="Postgraduate / MCA">Postgraduate / MCA</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Interested Role / Category</label>
                  <select
                    name="interestedRole"
                    value={studentForm.interestedRole}
                    onChange={handleStudentChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="General Student Member">General Student Member</option>
                    <option value="Campus Ambassador / Coordinator">Campus Ambassador / Coordinator</option>
                    <option value="Technical Lead / AI Lead">Technical Lead / AI Lead</option>
                    <option value="Executive Council (President / VP)">Executive Council (President / VP)</option>
                    <option value="Events & Marketing Lead">Events & Marketing Lead</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingStudent}
                  className="w-full mt-2 py-3 text-xs font-bold text-white bg-slate-950 hover:bg-slate-900 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {isSubmittingStudent ? (
                    <>
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Complete Registration</span>
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          MODAL 2: PARTNERSHIP SUBMISSION CONFIRMATION MODAL
      ========================================================================= */}
      <AnimatePresence>
        {partnerSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full p-8 border border-slate-200 shadow-2xl text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-950">Partnership Request Received!</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Thank you for your interest in bringing the TechieHelp Campus Innovation Club to your institution. Our Institutional Partnerships Lead will review your college profile and connect with your team within 24–48 hours.
              </p>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500">
                A formal acknowledgement has also been recorded for follow-up.
              </div>
              <button
                onClick={() => setPartnerSuccessModal(false)}
                className="w-full py-3 text-xs font-bold text-white bg-slate-950 hover:bg-slate-900 rounded-xl transition-colors"
              >
                Close & Return
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          MODAL 3: STUDENT REGISTRATION CONFIRMATION MODAL
      ========================================================================= */}
      <AnimatePresence>
        {studentSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full p-8 border border-slate-200 shadow-2xl text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-cyan-100 text-cyan-600 mx-auto flex items-center justify-center shadow-xs">
                <Rocket className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-950">Welcome to TechieHelp Club!</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your registration has been logged successfully. We are excited to support your journey in building AI projects, attending bootcamps, and earning leadership recognition.
              </p>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500">
                Please check your inbox or WhatsApp for upcoming activity notifications.
              </div>
              <button
                onClick={() => setStudentSuccessModal(false)}
                className="w-full py-3 text-xs font-bold text-white bg-slate-950 hover:bg-slate-900 rounded-xl transition-colors"
              >
                Explore Portal
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Icon fallbacks for social icons
function LinkedinIcon(props) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.5a1.63 1.63 0 0 0-1.63 1.63 1.63 1.63 0 0 0 1.63 1.63 1.63 1.63 0 0 0 1.63-1.63A1.63 1.63 0 0 0 7.86 6.5Z" />
    </svg>
  );
}

function YoutubeIcon(props) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function GithubIcon(props) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function TrendingUpIcon(props) {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" {...props}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

