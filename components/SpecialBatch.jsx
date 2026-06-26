"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { hod, swag } from "./assets";
import {
  Sparkles, Rocket, ShieldCheck, Users, TrendingUp,
  Trophy, Globe, Linkedin, ChevronRight, CheckCircle2,
  Clock, ArrowRight, Star, Zap, Award
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger} className={className}>
      {children}
    </motion.div>
  );
};

const SpecialBatch = () => {
  const benefits = [
    { icon: <Sparkles className="w-6 h-6 text-amber-500" />, title: "Welcome Kit", desc: "Exclusive merchandise upon enrollment", bg: "bg-amber-50 border-amber-100" },
    { icon: <Rocket className="w-6 h-6 text-blue-600" />, title: "Live Projects", desc: "Work on real client work, no dummy tasks", bg: "bg-blue-50 border-blue-100" },
    { icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />, title: "Certification", desc: "ISO Certified internship certificate", bg: "bg-emerald-50 border-emerald-100" },
    { icon: <TrendingUp className="w-6 h-6 text-cyan-600" />, title: "Stipend", desc: "Based on performance & client satisfaction", bg: "bg-cyan-50 border-cyan-100" },
    { icon: <Globe className="w-6 h-6 text-indigo-600" />, title: "Profile Feature", desc: "Get featured on our official website", bg: "bg-indigo-50 border-indigo-100" },
    { icon: <Linkedin className="w-6 h-6 text-blue-700" />, title: "LinkedIn Badge", desc: "Exclusive digital badge for your profile", bg: "bg-sky-50 border-sky-100" },
  ];

  const domains = [
    { emoji: "📱", title: "App Developer", desc: "Master Flutter or React Native with real-world app deployments.", color: "from-blue-500 to-indigo-600" },
    { emoji: "💻", title: "Frontend Developer", desc: "Build high-performance React architectures for global clients.", color: "from-purple-500 to-indigo-600" },
    { emoji: "⚡", title: "Full Stack Developer", desc: "The ultimate path. Master MERN stack and cloud deployments.", color: "from-indigo-500 to-purple-700" },
  ];

  const steps = [
    { num: "01", title: "Enroll & Get Gear", desc: "Secure your spot and receive your exclusive welcome kit." },
    { num: "02", title: "Client Assignment", desc: "Get onboarded to a live project with dedicated mentors." },
    { num: "03", title: "Collaborate & Build", desc: "Work in a professional environment and submit high-quality code." },
    { num: "04", title: "Certify & Launch", desc: "Earn your certificate and get referred to our hiring partners." },
  ];

  const stats = [
    { value: "500+", label: "Students Placed" },
    { value: "95%", label: "Success Rate" },
    { value: "₹12 LPA", label: "Highest Package" },
  ];

  return (
    <div className="et-root bg-white text-slate-900 min-h-screen overflow-hidden pt-24">

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-indigo-100/50 to-purple-100/40 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-100/30 to-blue-100/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Content */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 bg-indigo-600/10 border border-indigo-200 text-indigo-700 text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                Limited-Time Special Batch
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6">
                Transform Your Career with{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Real-World Projects
                </span>
              </h1>

              <p className="text-lg text-slate-600 mb-8 leading-relaxed border-l-4 border-indigo-200 pl-5">
                Join our exclusive Special Batch. Gain hands-on experience on live client projects, build a premium portfolio, and launch your career with industry-proven skills.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8 pb-8 border-b border-slate-100">
                {stats.map(s => (
                  <div key={s.label}>
                    <div className="text-2xl font-black text-indigo-600 mb-1">{s.value}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <motion.a
                  href="https://forms.gle/MUSBDGVVap4eqH418"
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black text-base px-8 py-4 rounded-full shadow-lg shadow-indigo-200 hover:shadow-xl transition-all"
                >
                  Enroll Now – ₹3000 <ChevronRight className="w-5 h-5" />
                </motion.a>
                <p className="flex items-center gap-2 text-slate-500 text-sm">
                  <Clock className="w-4 h-4 text-amber-500" />
                  Offer ends soon • Limited seats
                </p>
              </div>
            </motion.div>

            {/* Right — Image with floating cards */}
            <motion.div
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-3xl blur-2xl" />

                <motion.img
                  src={hod?.src || hod}
                  alt="Technical Head"
                  className="w-full h-auto max-w-[480px] mx-auto relative z-10 drop-shadow-2xl rounded-2xl"
                  animate={{ y: [0, -16, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Floating card 1 */}
                <motion.div
                  animate={{ x: [0, 8, 0], y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-8 -left-8 bg-white border border-indigo-100 rounded-2xl p-4 shadow-xl z-20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Success Rate</p>
                      <p className="text-lg font-black text-slate-900">99.2%</p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating card 2 */}
                <motion.div
                  animate={{ x: [0, -8, 0], y: [0, 8, 0] }}
                  transition={{ duration: 5, delay: 1, repeat: Infinity }}
                  className="absolute bottom-8 -right-8 bg-white border border-indigo-100 rounded-2xl p-4 shadow-xl z-20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center">
                      <Users className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Elite Batch</p>
                      <p className="text-lg font-black text-slate-900">Top 5% Talent</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-xs font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-wider">
                <Star className="w-3.5 h-3.5" /> Why Our Special Batch Stands Out
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
                The Elite <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Advantage</span>
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto" />
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((b, i) => (
                <motion.div
                  key={i} variants={fadeUp}
                  className={`bg-white rounded-2xl border p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group ${b.bg}`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform">
                    {b.icon}
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mb-2">{b.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Specializations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="flex md:flex-row flex-col items-start md:items-center gap-8 mb-14">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
                  Available <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Specializations</span>
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
              </div>
              <div className="flex-1">
                <p className="text-slate-500 text-lg leading-relaxed">
                  We've curated the most high-demand domains for the special batch to ensure maximum employability and technical depth.
                </p>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {domains.map((d, i) => (
                <motion.div
                  key={i} variants={fadeUp}
                  whileHover={{ y: -8 }}
                  className="relative bg-white rounded-3xl border border-slate-100 shadow-lg p-10 text-center overflow-hidden group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${d.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  <div className="text-6xl mb-6 block transition-all duration-500 group-hover:scale-110">{d.emoji}</div>
                  <h3 className="text-2xl font-black text-slate-900 mb-3">{d.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{d.desc}</p>
                  <div className={`mt-6 h-1 rounded-full bg-gradient-to-r ${d.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Roadmap / Steps */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-xs font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5" /> 4-Phase Transformation
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
                Roadmap to <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Excellence</span>
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto" />
            </motion.div>

            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 relative">
              {/* Connector line */}
              <div className="absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-200 hidden lg:block" />

              {steps.map((step, i) => (
                <motion.div
                  key={i} variants={fadeUp}
                  className="relative z-10 flex flex-col items-center text-center bg-white rounded-2xl border border-slate-100 shadow-sm p-8 hover:shadow-lg hover:-translate-y-1 transition-all"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-indigo-200">
                    <span className="text-white font-black text-lg">{step.num}</span>
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mb-3">{step.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Who is This For */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection>
            <motion.div
              variants={fadeUp}
              className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl border border-indigo-100 p-12 text-center"
            >
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" /> Eligibility
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-6">Who Is This For?</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Open to students from <span className="text-indigo-700 font-bold">Any Year</span> with basic domain knowledge and a passion for building enterprise-grade software.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {["Any Academic Year", "Basic Knowledge Needed", "Industry Passion"].map(tag => (
                  <span key={tag} className="bg-white border border-indigo-200 text-indigo-700 text-sm font-bold px-5 py-2 rounded-full shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-700">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} className="flex-1"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-cyan-300 font-mono tracking-[3px] text-xs uppercase">Immediate Enrollment</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                Secure Your Spot in the{" "}
                <span className="text-cyan-300">Special Batch.</span>
              </h2>
              <p className="text-indigo-200 text-lg mb-8 max-w-md">
                Grab the exclusive ₹2000 discount. Join the elite team working on projects that actually matter.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-cyan-500 flex items-center justify-center text-white text-xs font-bold">+12</div>
                </div>
                <p className="text-indigo-200 font-bold text-xs uppercase tracking-widest">Joining Now</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} className="flex-shrink-0"
            >
              <motion.a
                href="https://forms.gle/MUSBDGVVap4eqH418"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-white text-indigo-700 font-black text-xl px-12 py-6 rounded-2xl shadow-2xl hover:shadow-white/20 transition-all"
              >
                Enroll Now – ₹3000
                <ArrowRight className="w-6 h-6" />
              </motion.a>
              <p className="text-indigo-200/70 text-sm text-center mt-4">Limited seats • Offer ends soon</p>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default SpecialBatch;
