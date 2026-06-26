"use client";

import React, { useState, useEffect, useRef } from "react";
import { react, intern, overview, swag } from "./assets";
import { motion, useInView } from "framer-motion";
import {
  CheckCircle, Clock, Briefcase, Star, Download, Calendar,
  IndianRupee, ArrowRight, Code, Zap, Trophy, Users, Shield
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen bg-white">
    <div className="relative text-center">
      <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
      <div className="mt-4 text-indigo-600 font-semibold text-sm">Loading...</div>
    </div>
  </div>
);

const PriceCard = ({ title, price, originalPrice, features, recommended = false, badge }) => (
  <motion.div
    variants={fadeUp}
    className={`relative bg-white rounded-2xl p-8 transition-all duration-300 ${
      recommended
        ? "border-2 border-indigo-600 shadow-2xl shadow-indigo-100 scale-105"
        : "border-2 border-slate-200 shadow-lg hover:shadow-xl hover:border-indigo-300 hover:-translate-y-1"
    }`}
  >
    {recommended && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-5 py-1.5 rounded-full whitespace-nowrap">
        ⭐ Most Popular
      </div>
    )}
    {badge && (
      <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full mb-4">
        {badge}
      </span>
    )}
    <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
    <div className="flex items-end gap-2 mb-6">
      <span className="text-4xl font-black text-indigo-600">{price}</span>
      {originalPrice && (
        <span className="text-lg text-slate-400 line-through mb-1">{originalPrice}</span>
      )}
    </div>
    <ul className="space-y-3">
      {features.slice(0, 10).map((f, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
          <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
          <span>{f}</span>
        </li>
      ))}
    </ul>
    <a
      href="https://payments.cashfree.com/forms?code=techiehelpinternship"
      target="_blank"
      rel="noopener noreferrer"
      className={`mt-8 flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
        recommended
          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-200"
          : "bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white"
      }`}
    >
      Enroll Now <ArrowRight className="w-4 h-4" />
    </a>
  </motion.div>
);

const FeatureCard = ({ icon: Icon, title, desc, color }) => (
  <motion.div
    variants={fadeUp}
    className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color} group-hover:scale-110 transition-transform`}>
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="font-bold text-slate-900 mb-1 text-base">{title}</h3>
    <p className="text-sm text-slate-500">{desc}</p>
  </motion.div>
);

const ReactJS = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <LoadingSpinner />;

  const marqueeItems = [
    "Highest Package ₹12 LPA", "₹8 LPA", "₹6 LPA", "MSME Registered",
    "ISO 9001:2015 Certified", "15,000+ Students Trained", "Live Project Based",
    "Career Support", "Welcome Kit Provided", "4.6/5 Rating",
  ];

  const features = [
    { icon: Shield, title: "MSME Recognized", desc: "Verified on AICTE Internship Portal", color: "bg-blue-100 text-blue-600" },
    { icon: Trophy, title: "Dual Certificate", desc: "Offer Letter + Completion Certificate + LinkedIn Badge", color: "bg-amber-100 text-amber-600" },
    { icon: Zap, title: "Live Classes", desc: "Expert mentor guidance + Hackathons + Projects", color: "bg-purple-100 text-purple-600" },
    { icon: Code, title: "GitHub Portfolio", desc: "Resume Review & GitHub Hosting Support", color: "bg-emerald-100 text-emerald-600" },
    { icon: Users, title: "Intern ID Card", desc: "Public Records on TechieHelp Website", color: "bg-indigo-100 text-indigo-600" },
    { icon: Star, title: "Excellence Awards", desc: "Top Interns Get Goodies + LinkedIn/YouTube Feature", color: "bg-rose-100 text-rose-600" },
  ];

  const nextBatchDate = new Date(2026, new Date().getMonth() + 1, 1).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="et-root bg-white min-h-screen">

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-blue-50">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-cyan-100/40 to-blue-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-sky-100/30 to-cyan-100/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 bg-cyan-600/10 border border-cyan-200 text-cyan-700 text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-wider">
                <Star className="w-3.5 h-3.5" />
                React.js Developer Internship
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6">
                Build Modern UIs with <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">React.js</span>
              </h1>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Master React.js, hooks, and state management. Build dynamic, performance-optimized front-end applications with real-world projects.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="bg-white border border-slate-200 text-slate-700 text-sm font-medium px-3 py-1.5 rounded-lg shadow-sm">✔ React Hooks & Context</span>
                <span className="bg-white border border-slate-200 text-slate-700 text-sm font-medium px-3 py-1.5 rounded-lg shadow-sm">✔ State Management</span>
                <span className="bg-white border border-slate-200 text-slate-700 text-sm font-medium px-3 py-1.5 rounded-lg shadow-sm">✔ Next.js & Vite</span>
                <span className="bg-white border border-slate-200 text-slate-700 text-sm font-medium px-3 py-1.5 rounded-lg shadow-sm">✔ Certificate + Badge</span>
              </div>
              <div className="flex items-center gap-3 mb-8">
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold">{i}</div>
                  ))}
                </div>
                <span className="text-sm text-slate-600">⭐ 4.6/5 rated by <strong>2,000+</strong> students</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://payments.cashfree.com/forms?code=techiehelpinternship" target="_blank" rel="noopener noreferrer"
                  className="et-btn-primary inline-flex items-center justify-center gap-2">
                  Apply Now – Starting ₹999 <ArrowRight className="w-4 h-4" />
                </a>
                <a href="https://drive.google.com/file/d/1KMG5JObcneMBHqcKw_JZmCC2l9lEI3s6/view?usp=drive_link" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border-2 border-indigo-200 text-indigo-700 px-6 py-3 rounded-full font-bold hover:bg-indigo-50 transition-colors">
                  <Download className="w-4 h-4" /> Download Syllabus
                </a>
              </div>
              <p className="text-xs text-slate-400 mt-3">Limited seats • Certificate + Projects Included • Beginner Friendly</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <div className="bg-white rounded-3xl shadow-2xl shadow-indigo-100 border border-indigo-100 p-8">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { value: "₹12 LPA", label: "Highest Package", color: "from-cyan-500 to-blue-700" },
                    { value: "95%", label: "Placement Readiness", color: "from-emerald-500 to-teal-600" },
                    { value: "15+", label: "Live Projects", color: "from-sky-500 to-cyan-600" },
                    { value: "24/7", label: "Mentor Support", color: "from-amber-500 to-orange-600" },
                  ].map(s => (
                    <div key={s.label} className={`bg-gradient-to-br ${s.color} text-white rounded-2xl p-5 text-center`}>
                      <div className="text-2xl font-black mb-1">{s.value}</div>
                      <div className="text-xs opacity-90">{s.label}</div>
                    </div>
                  ))}
                </div>
                <hr className="border-slate-100 mb-5" />
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-indigo-500" />
                    <span className="text-sm text-slate-600">Next Batch: <strong className="text-indigo-600">{nextBatchDate}</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <IndianRupee className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm text-slate-600">Pricing from: <strong className="text-emerald-600">₹999/-</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-purple-500" />
                    <span className="text-sm text-slate-600">Duration: <strong>1–3 Months</strong></span>
                  </div>
                </div>
                <a href="https://payments.cashfree.com/forms?code=techiehelpinternship" target="_blank" rel="noopener noreferrer"
                  className="block w-full text-center bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all">
                  Enroll Now – ₹999/-
                </a>
                <p className="text-xs text-slate-400 text-center mt-3">Based on past learner outcomes & placement support</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="bg-gradient-to-r from-cyan-600 to-blue-700 py-4 overflow-hidden">
        <div className="flex gap-4 animate-[et-marquee_30s_linear_infinite] w-max">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="bg-white/15 backdrop-blur-sm border border-white/25 text-white text-sm font-semibold px-5 py-2 rounded-full whitespace-nowrap">
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Why Choose TechieHelp */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                Why Choose <span className="bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">TechieHelp</span>?
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto mb-4" />
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                Our React.js internship offers practical experience in building modern web interfaces with real-world projects and dedicated mentor support.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f) => <FeatureCard key={f.title} {...f} />)}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Internship Overview</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full mx-auto mb-4" />
              <p className="text-slate-500 text-lg">Flexible online & offline React.js internship programs for students, freshers, and working professionals.</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                { icon: Clock, title: "1 Month", desc: "Beginner Level", detail: "For students starting from scratch", color: "bg-blue-100 text-blue-600" },
                { icon: Briefcase, title: "2 Months", desc: "Intermediate Level", detail: "Project-based skill development", color: "bg-emerald-100 text-emerald-600" },
                { icon: Trophy, title: "3 Months", desc: "Advanced Level", detail: "Full-stack mastery + career placement", color: "bg-purple-100 text-purple-600" },
              ].map(d => (
                <motion.div key={d.title} variants={fadeUp} className="bg-slate-50 rounded-2xl p-8 text-center border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all group">
                  <div className={`w-14 h-14 ${d.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <d.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-1">{d.title}</h3>
                  <p className="font-semibold text-indigo-600 mb-2">{d.desc}</p>
                  <p className="text-sm text-slate-500">{d.detail}</p>
                </motion.div>
              ))}
            </div>
            <p className="text-sm text-slate-500 text-center mb-4"><strong>Mode:</strong> Online &amp; Offline &nbsp;|&nbsp; <strong>Format:</strong> Live Sessions, Recordings, Doubt Solving, Hackathons &nbsp;|&nbsp; <strong>Tools:</strong> React, Hooks, Context API, Redux, Next.js, and More</p>
            <div className="bg-indigo-50 rounded-2xl p-6 flex flex-wrap gap-3 justify-center">
              {["Online Internship", "Offline Classroom (Limited)", "Live Sessions", "Recorded Videos", "Doubt Solving", "Hackathons & Assessments"].map(m => (
                <span key={m} className="bg-white border border-indigo-200 text-indigo-700 text-sm font-semibold px-4 py-2 rounded-full">{m}</span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Curriculum Table */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                1-Month React.js Frontend Internship — <span className="text-indigo-600">₹999</span>
              </h2>
              <p className="text-slate-500">Best for Beginners • Fast-Track Learning • Certificate + Badge</p>
              <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mt-4" />
            </motion.div>
            <motion.div variants={fadeUp} className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white">
                    <th className="px-6 py-4 font-bold text-sm">Week</th>
                    <th className="px-6 py-4 font-bold text-sm">Topic</th>
                    <th className="px-6 py-4 font-bold text-sm">What You'll Do</th>
                  </tr>
                </thead>
                <tbody>
                  
                  <tr className="bg-white">
                    <td className="px-6 py-4 font-bold text-indigo-600 text-sm align-top">Week 1</td>
                    <td className="px-6 py-4 font-semibold text-slate-800 text-sm align-top">React Fundamentals</td>
                    <td className="px-6 py-4 text-slate-600 text-sm">
                      <ul className="space-y-1">
                        <li className="flex items-start gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />Learn JSX and component architecture</li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />Props, state, and event handling</li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />Functional vs class components</li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-6 py-4 font-bold text-indigo-600 text-sm align-top">Week 2</td>
                    <td className="px-6 py-4 font-semibold text-slate-800 text-sm align-top">React Hooks & State Management</td>
                    <td className="px-6 py-4 text-slate-600 text-sm">
                      <ul className="space-y-1">
                        <li className="flex items-start gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />useState, useEffect, useRef</li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />Context API for global state</li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />Custom hooks and best practices</li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-4 font-bold text-indigo-600 text-sm align-top">Week 3</td>
                    <td className="px-6 py-4 font-semibold text-slate-800 text-sm align-top">Advanced React & APIs</td>
                    <td className="px-6 py-4 text-slate-600 text-sm">
                      <ul className="space-y-1">
                        <li className="flex items-start gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />Integrate REST APIs and data fetching</li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />React Router for navigation</li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />Performance optimization techniques</li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-6 py-4 font-bold text-indigo-600 text-sm align-top">Week 4</td>
                    <td className="px-6 py-4 font-semibold text-slate-800 text-sm align-top">Final Project & Certification</td>
                    <td className="px-6 py-4 text-slate-600 text-sm">
                      <ul className="space-y-1">
                        <li className="flex items-start gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />Submit final React.js project</li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />Personal review by mentors</li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />Receive certificate & badge</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Internship Plans & Pricing</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mb-4" />
              <p className="text-slate-500 text-lg">Special launch offer — Save 50%+ on all plans</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8 items-start">
              <PriceCard title="1-Month Internship" price="₹999" originalPrice="₹2,000" badge="Beginner Friendly"
                features={[
                  "React.js Frontend Basics & Fundamentals", "Real-World Project Work", "Live Classes & AMAs with Mentors",
                  "Weekly Task Guidance", "Dedicated Support via Discord", "Internship ID Card & Digital Identity",
                  "Resume & LinkedIn Optimization", "GitHub Project Hosting", "Government-Recognized Certificate",
                  "Offer Letter + Completion Certificate",
                ]} />
              <PriceCard title="2-Month Internship" price="₹1,499" originalPrice="₹3,000" badge="Best Value" recommended={true}
                features={[
                  "Everything in 1-Month Plan", "Advanced React.js Frontend Concepts", "Portfolio Review with Personalized Feedback",
                  "Mini Hackathon + Mentor Recognition", "Certificate of Excellence", "Letter of Recommendation",
                  "Exclusive TechieHelp Merchandise", "LinkedIn & YouTube Feature Opportunity",
                  "Featured Portfolio on Partner Networks", "Priority Mentor Access",
                ]} />
              <PriceCard title="3-Month Internship" price="₹1,999" originalPrice="₹4,000" badge="Most Complete"
                features={[
                  "Everything in 2-Month Plan", "Performance Optimization & Testing",
                  "Final Hackathon + T-Shirt + YouTube Feature", "₹2,000 Cash Prize for Top Performers",
                  "Open Source Contribution Guidance", "Certificate of Excellence",
                  "TechieHelp Internship T-Shirt", "Final Jury Review by Industry Mentors",
                  "Permanent Letter of Recommendation", "Hackathon Winner Recognition",
                ]} />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-cyan-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to Start Your React.js Frontend Journey?</h2>
            <p className="text-cyan-200 text-lg mb-8">Join 15,000+ students who transformed their careers with TechieHelp Institute of AI</p>
            <a href="https://payments.cashfree.com/forms?code=techiehelpinternship" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-cyan-700 font-black px-10 py-4 rounded-full hover:shadow-2xl hover:-translate-y-1 transition-all text-lg">
              Apply Now – Starting ₹999 <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-cyan-200/70 text-sm mt-4">Limited seats available • No experience required</p>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default ReactJS;
