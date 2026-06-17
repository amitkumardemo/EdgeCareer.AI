"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight, BarChart3, BookOpen, Briefcase, CheckCircle2,
  ChevronRight, Code2, FileText, Github, LineChart,
  Sparkles, Target, Trophy, Users, Zap, Building, LayoutDashboard, MonitorPlay, Presentation, XCircle,
  Sun, Moon, Menu, X, GraduationCap, Award, Star, TrendingUp, Cpu, Database, Code, Smartphone, Shield, Cloud, Layout, Megaphone, Video, Terminal, Linkedin, Map, Play,
  Mail, Phone, ArrowUpRight, HeartHandshake, MapPin, Settings
} from "lucide-react";

// Animations
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// Counter Component
const AnimatedCounter = ({ value, text }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [counter, setCounter] = useState(0);

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
    <motion.div ref={ref} variants={fadeIn} className="flex flex-col items-center justify-center p-6 lg:p-8 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 transition-colors shadow-sm hover:shadow-md group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-amber-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10 text-center">
        <h3 className="text-4xl md:text-5xl font-bold text-blue-950 mb-2">
          {value.toString().includes("+") ? `${counter}+` : counter}
          {value.toString().includes("%") ? "%" : ""}
          {value.toString() === "24/7" ? "24/7" : ""}
        </h3>
        <p className="text-slate-500 font-medium">{text}</p>
      </div>
    </motion.div>
  );
};
export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Force light mode
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  return (
    <div className="light transition-colors duration-300">
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100 overflow-hidden relative">

        {/* Global Premium Background Effects (Light Theme) */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] opacity-[0.08] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600 via-blue-200 to-transparent blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] opacity-[0.1] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-400 via-transparent to-transparent blur-[120px]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="relative z-10 pt-20">
          
          {/* 1. HERO SECTION */}
          <section className="relative pt-20 pb-20 md:pt-32 md:pb-24 px-4 md:px-6 max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              
              {/* Left Side */}
              <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-2xl lg:w-1/2 z-10">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-semibold text-slate-700">Admissions Open 2026</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
</div>

                <motion.h1 variants={fadeIn} className="text-5xl md:text-[72px] font-extrabold tracking-tight mb-6 leading-[1.1] text-blue-950">
                  Build Skills. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-950 via-blue-800 to-amber-500">Gain Experience.</span><br />
                  Launch Career.
                </motion.h1>

                <motion.p variants={fadeIn} className="text-xl text-slate-600 mb-8 leading-relaxed max-w-xl">
                  Industry-focused Training, Real-World Internships, Professional Certifications, and Career Development Programs designed for the next generation of tech professionals.
                </motion.p>

                <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 mb-10">
                  <Link href="/programs" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-amber-500 text-white font-bold hover:bg-amber-600 transition-all shadow-xl hover:shadow-amber-500/30 hover:-translate-y-1 text-lg group">
                    Start Learning
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link href="/internships" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-blue-950 font-semibold border-2 border-slate-200 hover:border-blue-950 hover:bg-slate-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-1 text-lg group">
                    Apply for Internship
                  </Link>
                </motion.div>

                {/* Hero Stats */}
                <motion.div variants={fadeIn} className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-slate-200">
                  <div>
                    <div className="text-2xl font-bold text-slate-900">5000+</div>
                    <div className="text-sm font-medium text-slate-500">Students</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">100+</div>
                    <div className="text-sm font-medium text-slate-500">Projects</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">200+</div>
                    <div className="text-sm font-medium text-slate-500">Institutions</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900 text-indigo-600">95%</div>
                    <div className="text-sm font-medium text-slate-500">Completion</div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Side: Cover Image Visual */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 1, delay: 0.2 }} 
                className="relative lg:w-1/2 w-full mt-12 lg:mt-0"
              >
                {/* Backdrop glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-100 via-white to-amber-100 blur-3xl -z-10 rounded-full" />
                
                {/* Premium Image Container */}
                <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden border-[8px] border-white bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] ring-1 ring-slate-200">
                  <Image 
                    src="/coveri.png" 
                    alt="Cover Image" 
                    fill 
                    priority 
                    className="object-cover hover:scale-105 transition-transform duration-700" 
                  />
                </div>
              </motion.div>

            </div>
          </section>


          {/* 2. WHY STUDENTS CHOOSE TECHIEHELP INSTITUTE OF AI */}
          <section className="py-24 relative bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="text-center mb-16 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 tracking-tight">Why Students Choose <span className="text-amber-500">TechieHelp Institute of AI</span></h2>
                <p className="text-lg text-slate-600">We bridge the gap between academic learning and industry expectations with a holistic approach to career development.</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "Industry-Focused Training", icon: LayoutDashboard, desc: "Learn practical skills demanded by top companies.", color: "from-blue-900 to-blue-950", bg: "bg-blue-50" },
                  { title: "Internship Opportunities", icon: Briefcase, desc: "Work on real projects and gain industry experience.", color: "from-amber-400 to-amber-500", bg: "bg-amber-50" },
                  { title: "Professional Certifications", icon: Award, desc: "Earn certificates that strengthen your resume.", color: "from-blue-800 to-blue-900", bg: "bg-blue-50/50" },
                  { title: "Career Support", icon: Users, desc: "Resume building, interview preparation, and guidance.", color: "from-amber-500 to-yellow-600", bg: "bg-amber-50/50" }
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group p-8 rounded-3xl bg-white border border-slate-100 hover:border-slate-200 transition-all shadow-sm hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-5 rounded-bl-full -z-10 group-hover:opacity-10 transition-opacity" />
                    <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-6 shadow-sm`}>
                      <item.icon className="w-7 h-7 text-blue-950 group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                    <div className="mt-6 flex items-center text-sm font-semibold text-amber-500 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                      Learn More <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 3. PROGRAMS SECTION */}
          <section id="programs" className="py-24 relative bg-slate-50 border-y border-slate-200/60">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div className="max-w-2xl">
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 tracking-tight">Explore Our Programs</h2>
                  <p className="text-lg text-slate-600">Master the most in-demand skills with our comprehensive, project-based courses taught by industry experts.</p>
                </div>
                <Link href="/programs" className="inline-flex items-center font-semibold text-blue-950 hover:text-blue-900 bg-amber-50 px-5 py-2.5 rounded-full transition-colors self-start md:self-end shrink-0">
                  View All Programs <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "AI & Machine Learning", icon: Cpu, duration: "6 Months", tag: "Most Popular" },
                  { title: "Data Science", icon: Database, duration: "5 Months", tag: "High Demand" },
                  { title: "Web Development", icon: Code, duration: "4 Months" },
                  { title: "App Development", icon: Smartphone, duration: "4 Months" },
                  { title: "Cyber Security", icon: Shield, duration: "5 Months" },
                  { title: "Cloud Computing", icon: Cloud, duration: "3 Months" },
                  { title: "UI/UX Design", icon: Layout, duration: "3 Months" },
                  { title: "Digital Marketing", icon: Megaphone, duration: "2 Months" }
                ].map((prog, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="group bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer relative overflow-hidden flex flex-col h-full">
                    {prog.tag && (
                      <div className="absolute top-4 right-4 bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full">
                        {prog.tag}
                      </div>
                    )}
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:bg-blue-950 group-hover:text-white transition-colors text-blue-950">
                      <prog.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-blue-950 transition-colors">{prog.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-6 mt-auto">
                      <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-green-500" /> Certificate</span>
                      <span className="flex items-center bg-slate-100 px-2 py-1 rounded-md text-slate-600">{prog.duration}</span>
                    </div>
                    <div className="w-full py-3 rounded-xl border-2 border-slate-100 text-center font-semibold text-slate-600 group-hover:bg-blue-950 group-hover:border-blue-950 group-hover:text-amber-500 transition-all">
                      View Details
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. INTERNSHIP SECTION */}
          <section id="internships" className="py-24 relative bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-amber-50 text-amber-700 font-semibold text-sm mb-6 border border-amber-100">
                  <Briefcase className="w-4 h-4 mr-2" /> Live Internships
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 tracking-tight">Real Internships. Real Projects. <br />Real Experience.</h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">Skip the generic tutorials. Work on live industry projects and add real impact to your resume.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { role: "Frontend Developer Intern", tech: ["React", "Next.js", "Tailwind"], spots: "Few Left" },
                  { role: "Backend Developer Intern", tech: ["Node.js", "Express", "MongoDB"], spots: "Open" },
                  { role: "Full Stack Intern", tech: ["MERN Stack", "AWS"], spots: "Hot" },
                  { role: "AI/ML Engineer Intern", tech: ["Python", "TensorFlow", "NLP"], spots: "Closing Soon" },
                  { role: "Data Science Intern", tech: ["Pandas", "SQL", "PowerBI"], spots: "Open" },
                  { role: "Cyber Security Intern", tech: ["Ethical Hacking", "Networking"], spots: "Open" }
                ].map((internship, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-shadow flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 rounded-xl bg-blue-950 flex items-center justify-center">
                        <Code2 className="w-6 h-6 text-amber-500" />
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${internship.spots === 'Hot' || internship.spots === 'Closing Soon' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {internship.spots}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{internship.role}</h3>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {internship.tech.map(t => (
                        <span key={t} className="px-3 py-1 bg-slate-100 text-slate-600 text-sm font-medium rounded-lg">{t}</span>
                      ))}
                    </div>
                    <button className="mt-auto w-full py-3 rounded-xl bg-blue-950 text-white font-semibold hover:bg-amber-500 hover:text-blue-950 transition-colors">
                      Apply Now
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. CERTIFICATIONS SECTION */}
          <section className="py-24 relative bg-gradient-to-b from-white to-slate-50 border-y border-slate-200/60 overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 z-0">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-300/20 blur-[100px] rounded-full" />
              <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-200/20 blur-[100px] rounded-full" />
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] bg-center" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
                    <Award className="w-5 h-5 text-amber-500" />
                    <span className="text-sm font-medium text-slate-700">Verified Credentials</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-slate-900">Earn Industry-Recognized Certifications 🏆</h2>
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    Stand out to recruiters with premium certificates that validate your skills, project experience, and internship completion.
                  </p>

                  <div className="space-y-4">
                    {["Training Certificate", "Internship Completion Certificate", "Project Completion Certificate", "Letter of Recommendation (LoR)"].map((cert, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-amber-300 transition-colors">
                        <CheckCircle2 className="w-6 h-6 text-blue-950 flex-shrink-0" />
                        <span className="font-semibold text-lg text-slate-800">{cert}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Certificate Visual */}
                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-tr from-amber-400 to-blue-400 rounded-3xl blur-2xl opacity-20 animate-pulse" />
                  <div className="relative aspect-[4/3] w-full bg-white rounded-2xl shadow-2xl overflow-hidden border-8 border-slate-100 flex flex-col p-8 items-center justify-center text-slate-900 text-center transform rotate-2 hover:rotate-0 transition-transform duration-500">
                    <div className="w-16 h-16 mb-4">
                      <Award className="w-full h-full text-amber-500" />
                    </div>
                    <h3 className="text-3xl font-serif font-bold text-slate-900 mb-2">CERTIFICATE</h3>
                    <p className="text-sm tracking-widest text-slate-500 uppercase mb-8">Of Completion</p>
                    <p className="text-sm text-slate-600 mb-2">This is proudly presented to</p>
                    <h4 className="text-2xl font-bold border-b-2 border-slate-200 pb-2 mb-4 w-3/4 italic text-blue-950">Student Name</h4>
                    <p className="text-sm text-slate-600 px-8">For successfully completing the rigorous 6-month AI & Machine Learning Internship Program.</p>

                    <div className="absolute bottom-8 left-8 text-left">
                      <div className="w-24 h-px bg-slate-300 mb-2" />
                      <p className="text-[10px] font-bold">Director Signature</p>
                    </div>
                    <div className="absolute bottom-8 right-8 text-right">
                      <div className="w-16 h-16 rounded-full border-4 border-amber-400 flex items-center justify-center ml-auto mb-2 opacity-50">
                        <div className="w-12 h-12 rounded-full border border-amber-400" />
                      </div>
                      <p className="text-[10px] font-bold text-amber-600">Verified Badge</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* 6. PLACEMENT PREPARATION SECTION */}
          <section id="preparation" className="py-24 relative bg-slate-50 border-y border-slate-200/60">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="text-center mb-16 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 tracking-tight">🎯 Become Placement Ready</h2>
                <p className="text-lg text-slate-600">Our suite of AI-powered tools ensures you are 100% prepared for technical and HR interviews.</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "AI Resume Builder", icon: FileText, desc: "Create ATS-friendly resumes that get shortlisted.", link: "/resume" },
                  { title: "Mock Interviews", icon: Video, desc: "Practice with AI interviewers and get instant feedback.", link: "/mock-interview" },
                  { title: "Coding Practice", icon: Terminal, desc: "Solve DSA questions with real-time AI hints.", link: "/dsa" },
                  { title: "GitHub Portfolio", icon: Github, desc: "Build a strong open-source profile automatically." },
                  { title: "LinkedIn Optimization", icon: Linkedin, desc: "Make your profile magnetic to recruiters." },
                  { title: "Career Roadmaps", icon: Map, desc: "Step-by-step guides for your target role." }
                ].map((prep, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group p-8 rounded-3xl bg-white border border-slate-200 hover:border-amber-300 transition-all shadow-sm hover:shadow-lg">
                    <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:bg-blue-950 group-hover:text-amber-500 text-blue-950">
                      <prep.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900">{prep.title}</h3>
                    <p className="text-slate-600 mb-6">{prep.desc}</p>
                    {prep.link ? (
                      <Link href={prep.link} className="inline-flex items-center text-sm font-semibold text-amber-500 hover:text-amber-600">
                        Try Now <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    ) : (
                      <span className="inline-flex items-center text-sm font-semibold text-slate-400">
                        Coming Soon
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 7. SUCCESS STORIES */}
          <section id="success" className="py-24 relative bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 tracking-tight">Success Stories</h2>
                <p className="text-lg text-slate-600">Hear from students who transformed their careers with TechieHelp.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { name: "Rahul Sharma", college: "IIT Delhi", role: "SDE Intern @ Amazon", story: "The AI mock interviews and DSA practice were exactly what I needed. I felt completely confident during my actual Amazon interview.", img: "R" },
                  { name: "Priya Singh", college: "NIT Surathkal", role: "Data Analyst @ MuSigma", story: "The Data Science internship program gave me real-world datasets to work on. That practical experience was the key to my placement.", img: "P" },
                  { name: "Amit Kumar", college: "VIT Vellore", role: "Frontend Dev @ Swiggy", story: "TechieHelp's resume builder took my resume from zero to hero. The ATS score feature is a game-changer.", img: "A" }
                ].map((testimonial, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-slate-50 border border-slate-200 p-8 rounded-3xl relative">
                    <div className="text-amber-500 flex gap-1 mb-6">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-5 h-5 fill-current" />)}
                    </div>
                    <p className="text-slate-700 italic mb-8">"{testimonial.story}"</p>
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-950 to-blue-900 flex items-center justify-center text-amber-500 font-bold text-lg shadow-md border border-blue-900">
                        {testimonial.img}
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-950">{testimonial.name}</h4>
                        <p className="text-xs font-semibold text-amber-500 mb-0.5">{testimonial.role}</p>
                        <p className="text-xs text-slate-500">{testimonial.college}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* BRAND NEW PREMIUM FOUNDER SECTION */}
          <section id="founder" className="py-24 md:py-32 relative bg-white overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
              <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="founder-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#founder-grid)" />
              </svg>
            </div>
            <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[#0F4CBA]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-[#F4B400]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
              {/* Section Header */}
              <div className="text-center mb-16 md:mb-24 max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#0F4CBA]/20 bg-[#0F4CBA]/5 text-xs font-extrabold text-[#0F4CBA] uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[#F4B400]" />
                  <span>Meet Our Founder</span>
                </div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-blue-950 tracking-tight leading-tight">
                  Building Opportunities for the <br /> Next Generation of Innovators
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  Empowering students through technology, mentorship, internships, certifications, and innovation.
                </p>
              </div>

              {/* Two-Column Layout */}
              <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                
                {/* LEFT SIDE: IMAGE & FLOATING CARDS */}
                <div className="lg:col-span-5 relative flex flex-col items-center">
                  
                  {/* Founder Image Card Container */}
                  <div className="relative w-full max-w-[320px] aspect-[4/5] rounded-[2.5rem] bg-white border-[10px] border-white shadow-[0_24px_60px_rgba(15,76,186,0.12)] hover:shadow-[0_32px_72px_rgba(15,76,186,0.18)] transition-all duration-500 ease-out hover:scale-[1.02] ring-1 ring-slate-100/50 overflow-hidden z-10 group">
                    <Image
                      src="/Founder.png"
                      alt="Amit Kumar - Founder of TechieHelp"
                      fill
                      className="object-cover object-top filter contrast-[1.02] saturate-[1.05]"
                      sizes="(max-w-7xl) 100vw, 320px"
                      priority
                    />
                    {/* Golden accent bar at the bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0F4CBA] to-[#F4B400]" />
                  </div>

                  {/* FLOATING CARDS - Desktop Only (positioned absolutely around image) */}
                  {[
                    { text: "Top 2% Developer in the World", icon: Trophy, color: "text-[#F4B400]", bg: "bg-amber-50/50", border: "border-amber-100", pos: "top-4 -left-16", delay: 0, dur: 4 },
                    { text: "World Record Holder", icon: Award, color: "text-[#0F4CBA]", bg: "bg-blue-50/50", border: "border-blue-100", pos: "top-[20%] -right-16", delay: 0.5, dur: 4.2 },
                    { text: "Top 1% Mentor at Topmate", icon: Star, color: "text-[#F4B400]", bg: "bg-amber-50/50", border: "border-amber-100", pos: "top-[42%] -left-20", delay: 1.2, dur: 3.8 },
                    { text: "Trained 5000+ Students", icon: GraduationCap, color: "text-[#0F4CBA]", bg: "bg-blue-50/50", border: "border-blue-100", pos: "top-[64%] -right-20", delay: 1.8, dur: 4.5 },
                    { text: "10+ Hackathons Judged", icon: Users, color: "text-[#F4B400]", bg: "bg-amber-50/50", border: "border-amber-100", pos: "bottom-6 -left-12", delay: 2.2, dur: 3.9 },
                    { text: "15+ Hackathons Mentored", icon: Briefcase, color: "text-[#0F4CBA]", bg: "bg-blue-50/50", border: "border-blue-100", pos: "bottom-[-16px] -right-12", delay: 2.7, dur: 4.3 }
                  ].map((card, idx) => {
                    const IconComponent = card.icon;
                    return (
                      <motion.div
                        key={idx}
                        className={`absolute ${card.pos} z-20 hidden lg:flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/90 backdrop-blur-md border ${card.border} shadow-[0_8px_30px_rgba(0,0,0,0.04)] w-max max-w-[220px]`}
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                          duration: card.dur,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: card.delay
                        }}
                      >
                        <div className={`w-8 h-8 rounded-xl ${card.bg} flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className={`w-4 h-4 ${card.color}`} strokeWidth={2} />
                        </div>
                        <span className="text-xs font-bold text-slate-800 leading-tight">{card.text}</span>
                      </motion.div>
                    );
                  })}

                  {/* MOBILE & TABLET ONLY: Achievement Cards Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 w-full max-w-lg lg:hidden">
                    {[
                      { text: "Top 2% Developer", icon: Trophy, color: "text-[#F4B400]", bg: "bg-amber-50/50", border: "border-amber-100" },
                      { text: "World Record Holder", icon: Award, color: "text-[#0F4CBA]", bg: "bg-blue-50/50", border: "border-blue-100" },
                      { text: "Top 1% Mentor", icon: Star, color: "text-[#F4B400]", bg: "bg-amber-50/50", border: "border-amber-100" },
                      { text: "Trained 5000+ Students", icon: GraduationCap, color: "text-[#0F4CBA]", bg: "bg-blue-50/50", border: "border-blue-100" },
                      { text: "10+ Hackathons Judged", icon: Users, color: "text-[#F4B400]", bg: "bg-amber-50/50", border: "border-amber-100" },
                      { text: "15+ Hackathons Mentored", icon: Briefcase, color: "text-[#0F4CBA]", bg: "bg-blue-50/50", border: "border-blue-100" }
                    ].map((card, idx) => {
                      const IconComponent = card.icon;
                      return (
                        <div key={idx} className={`flex items-center gap-2.5 p-3 rounded-2xl bg-white border ${card.border} shadow-sm`}>
                          <div className={`w-8 h-8 rounded-lg ${card.bg} flex items-center justify-center flex-shrink-0`}>
                            <IconComponent className={`w-4 h-4 ${card.color}`} strokeWidth={2} />
                          </div>
                          <span className="text-xs font-bold text-slate-800 leading-tight">{card.text}</span>
                        </div>
                      );
                    })}
                  </div>

                </div>

                {/* RIGHT SIDE: TEXT DETAILS */}
                <div className="lg:col-span-7 space-y-8 text-left">
                  
                  {/* Name & Title */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-3xl md:text-4xl font-extrabold text-blue-950 tracking-tight">Amit Kumar</h3>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-500 uppercase">He / Him</span>
                    </div>
                    <p className="text-lg md:text-xl font-bold text-[#0F4CBA] tracking-wide">Founder & CEO @ TechieHelp & TechieHelp Institute of AI</p>
                  </div>

                  {/* Profile Description */}
                  <div className="space-y-4 text-slate-600 font-normal leading-relaxed text-base md:text-lg">
                    <p>
                      Amit Kumar is the Founder & CEO of TechieHelp & TechieHelp Institute of AI and a passionate technology leader dedicated to empowering students through innovation, mentorship, internships, certifications, and skill development.
                    </p>
                    <p>
                      Recognized among the Top 2% Developers in the World and a World Record Holder, Amit has trained over 5000+ students and actively contributes to the global tech ecosystem through mentorship, hackathons, and open-source communities.
                    </p>
                    <p>
                      He currently serves as State Lead (Bihar) @ OSCI and Project Admin @ GSSOC & SSOC S4 2025 while helping aspiring innovators become industry-ready professionals.
                    </p>
                  </div>


                  {/* Quote Section */}
                  <div className="w-full relative p-6 md:p-8 rounded-[2rem] bg-slate-50 border border-slate-100/60 overflow-hidden shadow-sm">
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 text-slate-200/50 opacity-40 pointer-events-none">
                      <Sparkles className="w-full h-full text-blue-900/10" />
                    </div>
                    <p className="text-slate-700 font-serif italic text-base md:text-lg leading-relaxed relative z-10 pl-6 border-l-4 border-[#F4B400]">
                      "Success is not measured by what you achieve alone, but by how many lives you inspire and opportunities you create."
                    </p>
                    <p className="text-sm font-extrabold text-blue-950 uppercase tracking-widest mt-4 pl-6">— Amit Kumar</p>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 w-full sm:w-auto">
                    <a
                      href="https://www.linkedin.com/in/amit-kumar-founder-of-techiehelp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 rounded-full bg-[#0F4CBA] hover:bg-[#F4B400] text-white font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                    >
                      <Linkedin className="w-5 h-5 text-white" strokeWidth={1.75} />
                      Connect on LinkedIn
                    </a>
                    <a
                      href="https://www.techiehelp.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 rounded-full bg-white hover:bg-slate-50 border-2 border-[#0F4CBA] text-[#0F4CBA] font-bold text-base shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                      View Portfolio
                      <ArrowUpRight className="w-5 h-5" strokeWidth={1.75} />
                    </a>
                  </div>

                </div>
              </div>

              {/* Row 2: Highlights & Contact Info aligned horizontally */}
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-16 pt-12 border-t border-slate-100">
                
                {/* Left side (under photo): Key Highlights (4-4 paired in 2 columns) */}
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="text-sm font-extrabold text-blue-950 uppercase tracking-widest border-b border-slate-100 pb-2">Key Highlights</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { text: "Top 2% Developer in the World", icon: Trophy },
                      { text: "World Record Holder", icon: Award },
                      { text: "Top 1% Mentor at Topmate", icon: Star },
                      { text: "Trained 5000+ Students", icon: GraduationCap },
                      { text: "10+ Hackathons Judged", icon: Users },
                      { text: "15+ Hackathons Mentored", icon: Briefcase },
                      { text: "State Lead (Bihar) @ OSCI", icon: MapPin },
                      { text: "Project Admin @ GSSOC & SSOC S4 2025", icon: Settings }
                    ].map((item, idx) => {
                      const IconComponent = item.icon;
                      return (
                        <div
                          key={idx}
                          className="group flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-150 shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_32px_rgba(15,76,186,0.06)] hover:border-[#0F4CBA]/20 transition-all duration-300"
                        >
                          <div className="w-8.5 h-8.5 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-center text-[#0F4CBA] group-hover:bg-[#0F4CBA] group-hover:text-[#F4B400] transition-all duration-300 flex-shrink-0">
                            <IconComponent className="w-4 h-4" strokeWidth={1.75} />
                          </div>
                          <span className="text-xs font-bold text-slate-700 leading-tight group-hover:text-blue-950 transition-colors">{item.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right side (under bio): Contact Information */}
                <div className="lg:col-span-5 space-y-4">
                  <h4 className="text-sm font-extrabold text-blue-950 uppercase tracking-widest border-b border-slate-100 pb-2">Contact Information</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                    <a
                      href="mailto:ceo@techiehelp.in"
                      className="group flex items-center gap-3 text-slate-700 hover:text-[#0F4CBA] transition-colors"
                    >
                      <div className="w-9 h-9 rounded-xl bg-blue-50/50 flex items-center justify-center text-[#0F4CBA] group-hover:text-[#F4B400] transition-colors flex-shrink-0">
                        <Mail className="w-4.5 h-4.5" strokeWidth={1.75} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Email</span>
                        <span className="text-xs font-semibold tracking-wide truncate">ceo@techiehelp.in</span>
                      </div>
                    </a>
                    <a
                      href="tel:+917673825079"
                      className="group flex items-center gap-3 text-slate-700 hover:text-[#0F4CBA] transition-colors"
                    >
                      <div className="w-9 h-9 rounded-xl bg-blue-50/50 flex items-center justify-center text-[#0F4CBA] group-hover:text-[#F4B400] transition-colors flex-shrink-0">
                        <Phone className="w-4.5 h-4.5" strokeWidth={1.75} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Phone</span>
                        <span className="text-xs font-semibold tracking-wide">+91 7673825079</span>
                      </div>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/amit-kumar-founder-of-techiehelp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 text-slate-700 hover:text-[#0F4CBA] transition-colors"
                    >
                      <div className="w-9 h-9 rounded-xl bg-blue-50/50 flex items-center justify-center text-[#0F4CBA] group-hover:text-[#F4B400] transition-colors flex-shrink-0">
                        <Linkedin className="w-4.5 h-4.5" strokeWidth={1.75} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">LinkedIn</span>
                        <span className="text-xs font-semibold tracking-wide truncate">amit-kumar</span>
                      </div>
                    </a>
                    <a
                      href="https://github.com/amitkumardemo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 text-slate-700 hover:text-[#0F4CBA] transition-colors"
                    >
                      <div className="w-9 h-9 rounded-xl bg-blue-50/50 flex items-center justify-center text-[#0F4CBA] group-hover:text-[#F4B400] transition-colors flex-shrink-0">
                        <Github className="w-4.5 h-4.5" strokeWidth={1.75} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">GitHub</span>
                        <span className="text-xs font-semibold tracking-wide truncate">amitkumardemo</span>
                      </div>
                    </a>
                  </div>
                </div>

              </div>

              {/* BOTTOM STATS GRID */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-20 pt-16 border-t border-slate-100">
                {[
                  { value: "Top 2%", label: "Developer in the World" },
                  { value: "5000+", label: "Students Trained" },
                  { value: "10+", label: "Hackathons Judged" },
                  { value: "15+", label: "Hackathons Mentored" },
                  { value: "Top 1%", label: "Mentor at Topmate" }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-slate-50/50 hover:bg-white border border-slate-100/60 p-6 rounded-3xl text-center hover:shadow-md hover:border-[#0F4CBA]/20 transition-all duration-300">
                    <h4 className="text-3xl font-black text-blue-950 bg-gradient-to-r from-blue-950 to-blue-800 bg-clip-text text-transparent mb-1.5">{stat.value}</h4>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider leading-relaxed">{stat.label}</p>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* 8. COLLEGE PARTNERSHIP SECTION */}
          <section id="tpo" className="py-24 relative bg-slate-50 overflow-hidden rounded-t-[3rem]">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] bg-center" />
            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
              <div className="bg-gradient-to-br from-blue-950 to-blue-900 rounded-3xl p-1 md:p-12 lg:p-16 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-12 shadow-xl border border-white/10">
                <div className="max-w-2xl p-8 lg:p-0">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md mb-6 font-semibold text-sm text-white border border-white/30">
                    <Building className="w-4 h-4" /> For Colleges & Training Institutes
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-white">🏫 Empower Your Students</h2>
                  <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                    Partner with TechieHelp to provide your students with enterprise-grade placement preparation tools. Get detailed analytics on student readiness and streamline your TPO operations.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8 text-left">
                    {["Student Tracking Dashboard", "Custom Internship Programs", "On-Campus Workshops", "Dedicated Career Support"].map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-white font-medium">
                        <CheckCircle2 className="w-5 h-5 text-amber-400" /> {feature}
                      </div>
                    ))}
                  </div>

                  <button className="px-8 py-4 rounded-full bg-amber-500 text-blue-950 font-bold hover:bg-amber-600 hover:scale-105 transition-all shadow-xl">
                    Request Partnership
                  </button>
                </div>

                <div className="hidden lg:block w-full max-w-md relative p-8">
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-3xl border border-white/40 transform rotate-3" />
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-3xl border border-white/40 transform -rotate-3" />
                  <div className="relative bg-white rounded-2xl p-6 shadow-2xl border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="font-bold text-slate-900">Placement Cell Analytics</h4>
                      <BarChart3 className="w-5 h-5 text-amber-500" />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs text-slate-500 mb-1"><span>Batch Readiness</span><span className="text-slate-700 font-bold">85%</span></div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"><div className="w-[85%] h-full bg-green-500" /></div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-slate-500 mb-1"><span>Resumes Approved</span><span className="text-slate-700 font-bold">92%</span></div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"><div className="w-[92%] h-full bg-blue-500" /></div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-slate-500 mb-1"><span>Mock Interviews Completed</span><span className="text-slate-700 font-bold">64%</span></div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"><div className="w-[64%] h-full bg-amber-500" /></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 9. FINAL CTA SECTION */}
          <section className="py-32 relative text-center bg-white border-t border-slate-200">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-amber-50 blur-[100px] rounded-full pointer-events-none" />
            <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-slate-900">
                Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-950 via-blue-800 to-amber-500">AI-Powered</span> <br className="hidden md:block" /> Career Journey Today
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-xl text-slate-600 mb-10">
                Join thousands of students who have already transformed their careers.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/sign-up" className="px-10 py-4 rounded-full bg-blue-950 text-white font-bold hover:bg-blue-900 hover:-translate-y-1 transition-all text-lg shadow-xl hover:shadow-blue-900/30">
                  Join Now
                </Link>
                <Link href="/programs" className="px-10 py-4 rounded-full bg-white text-blue-950 font-bold border-2 border-slate-200 hover:border-amber-500 hover:bg-amber-50 hover:text-amber-700 transition-all text-lg">
                  Explore Programs
                </Link>
              </motion.div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
