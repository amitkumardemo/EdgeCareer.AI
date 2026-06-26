"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, HelpCircle, Linkedin, Briefcase, FileText, 
  Brain, Code, Server, Building, Users, Video, 
  CheckCircle, Star, ArrowRight, Download, Award
} from "lucide-react";
import Head from 'next/head';

const faqs = [
  {
    question: "Who is this program for?",
    answer: "This program is for college students, freshers, and early professionals who want to crack top product and service-based companies. Whether you are aiming for FAANG or top startups, this curriculum covers everything from DSA to System Design."
  },
  {
    question: "What is the mode of delivery?",
    answer: "The program includes both live sessions and high-quality recorded modules, along with 1:1 personalized mock interviews conducted via video call."
  },
  {
    question: "Do I get a certificate?",
    answer: "Yes, you will receive a verified Certificate of Completion from TechieHelp, which you can showcase on your LinkedIn profile and resume."
  },
  {
    question: "What is the refund policy?",
    answer: "We offer a 7-day money-back guarantee if you are not satisfied with the course content. However, this does not apply if 1:1 mock interviews have already been conducted."
  },
  {
    question: "Is there any placement assistance?",
    answer: "Absolutely! If you opt for the Placement Pack, you get placement guarantee support, direct company referrals, and priority access to our paid internship opportunities."
  }
];

const curriculum = [
  { icon: <Linkedin className="w-6 h-6" />, title: "LinkedIn & GitHub Profile Enhancement", desc: "Optimize your profiles for recruiters with professional branding and project showcases." },
  { icon: <Briefcase className="w-6 h-6" />, title: "Personal Portfolio / Elevator Pitch", desc: "Build a stunning portfolio website and craft compelling 30-second pitches." },
  { icon: <FileText className="w-6 h-6" />, title: "Resume & Cover Letter Templates", desc: "ATS-friendly templates with industry-specific examples and tips." },
  { icon: <Brain className="w-6 h-6" />, title: "Aptitude & Logical Reasoning Practice", desc: "300+ questions with solutions and time-saving strategies." },
  { icon: <Code className="w-6 h-6" />, title: "DSA Foundations & Problem-Solving", desc: "Master data structures, algorithms, and coding interview patterns." },
  { icon: <Server className="w-6 h-6" />, title: "System Design & Mini Projects", desc: "Learn scalable architecture and build mini-projects for your portfolio." },
  { icon: <Building className="w-6 h-6" />, title: "Domain Specific Interview Prep", desc: "Tailored prep for FAANG, product-based, and service-based companies." },
  { icon: <Users className="w-6 h-6" />, title: "Behavioral & HR Coaching", desc: "Master STAR method, common questions, and cultural fit interviews." },
  { icon: <Video className="w-6 h-6" />, title: "1:1 Recorded Mock Interviews", desc: "Real interview simulations with detailed feedback and improvement plans." },
];

export default function PlacementBooster() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      <Head>
        <title>A→Z Interview Program | Placement Booster | TechieHelp</title>
        <meta name="description" content="Master DSA, optimize your LinkedIn, and ace system design with 1-on-1 mock interviews and guaranteed placement support." />
      </Head>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white text-slate-900">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-indigo-100 blur-[120px]" />
          <div className="absolute bottom-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-50 blur-[100px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-sm font-semibold text-indigo-600 mb-8 tracking-wide uppercase shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Enrollments Open for 2026 Batch
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Crack Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">Dream Job</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-slate-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            A→Z Interview Program
          </h2>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Master DSA, optimize your LinkedIn, and ace system design with 1-on-1 mock interviews and guaranteed placement support.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 group text-lg">
              Enroll Now — ₹999
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold rounded-full transition-all flex items-center justify-center gap-2 text-lg shadow-sm">
              <Download className="w-5 h-5 text-slate-500" />
              Download Syllabus
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-16 z-20 max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 flex flex-col md:flex-row justify-around items-center gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="text-center px-8">
            <p className="text-4xl font-black text-slate-900 mb-2">₹12 LPA</p>
            <p className="text-slate-500 font-medium uppercase tracking-wide text-sm">Highest Package</p>
          </div>
          <div className="text-center px-8 pt-8 md:pt-0">
            <p className="text-4xl font-black text-slate-900 mb-2">300+</p>
            <p className="text-slate-500 font-medium uppercase tracking-wide text-sm">Top Campus Hires</p>
          </div>
          <div className="text-center px-8 pt-8 md:pt-0">
            <p className="text-4xl font-black text-indigo-600 mb-2">98%</p>
            <p className="text-slate-500 font-medium uppercase tracking-wide text-sm">Success Rate</p>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">A→Z Interview Curriculum</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Everything you need to crack top product and service-based companies.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {curriculum.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-indigo-100 transition-all group"
            >
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Paid Internship Section */}
      <section className="py-20 px-6 bg-slate-50 border-y border-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200 text-sm font-bold uppercase tracking-wider mb-6 shadow-sm">
              <Star className="w-4 h-4" fill="currentColor" /> Paid Internship Available
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">Exclusive Paid Internship Opportunity</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Top-performing students in our A→Z Interview Program are eligible for paid internships at leading tech companies. Gain real-world experience, build your network, and earn while you learn.
            </p>
            <ul className="space-y-4">
              {[
                "Stipend ranging from ₹15,000 - ₹30,000 per month",
                "Work on live projects with industry mentorship",
                "Letter of recommendation upon completion",
                "Potential for full-time conversion (PPO)"
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0" />
                  <span className="text-slate-700 font-medium">{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-xl relative">
              <div className="absolute -top-6 -right-6 bg-gradient-to-r from-amber-400 to-orange-500 w-24 h-24 rounded-full flex items-center justify-center shadow-lg rotate-12">
                <span className="text-white font-black text-xl text-center leading-tight">Earn<br/>while<br/>learning!</span>
              </div>
              <div className="space-y-6">
                <div className="h-4 bg-slate-100 rounded-full w-3/4"></div>
                <div className="h-4 bg-slate-100 rounded-full w-full"></div>
                <div className="h-4 bg-slate-100 rounded-full w-5/6"></div>
                <div className="h-32 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center">
                  <Award className="w-16 h-16 text-slate-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">Proven Success Stories</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Join hundreds of students who transformed their careers with us.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <Star className="w-32 h-32 text-slate-900" />
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl">
                R
              </div>
              <div>
                <h4 className="font-bold text-xl text-slate-900">Rahul Sharma</h4>
                <p className="text-indigo-600 font-medium">Placed at Google | ₹12 LPA</p>
              </div>
            </div>
            <p className="text-slate-600 text-lg italic leading-relaxed relative z-10">
              "The A→Z program completely transformed my approach to interviews. The 1:1 mock interviews and system design sessions gave me the confidence to ace my Google loops. Unmatched quality."
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <Star className="w-32 h-32 text-slate-900" />
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold text-2xl">
                P
              </div>
              <div>
                <h4 className="font-bold text-xl text-slate-900">Priya Patel</h4>
                <p className="text-indigo-600 font-medium">Placed at Microsoft | ₹10 LPA</p>
              </div>
            </div>
            <p className="text-slate-600 text-lg italic leading-relaxed relative z-10">
              "From completely rebuilding my resume to providing paid internship opportunities, TechieHelp's program covers every single blind spot a student has. The ROI is incredible."
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Invest in your career. Select the add-ons that fit your needs.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            
            {/* Base Program */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Base Program</h3>
              <p className="text-slate-500 mb-6 font-medium">Core Interview Prep</p>
              <div className="mb-8">
                <span className="text-4xl font-black text-slate-900">₹999</span>
                <span className="text-slate-500"> / one-time</span>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "Live & Recorded grouped sessions",
                  "Lifetime access to materials",
                  "2 Mock Interviews",
                  "LinkedIn & GitHub Optimization",
                  "Verified Certificate of Completion"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <CheckCircle className="w-5 h-5 text-indigo-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-full font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors">
                Enroll Base
              </button>
            </div>

            {/* Placement Pack */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-indigo-500 relative transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider whitespace-nowrap shadow-md">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Placement Pack</h3>
              <p className="text-slate-500 mb-6 font-medium">Total Career Transformation</p>
              <div className="mb-2 flex items-baseline gap-2">
                <span className="text-4xl font-black text-slate-900">₹2,999</span>
                <span className="text-xl text-slate-400 line-through">₹5,000</span>
              </div>
              <p className="text-green-600 text-sm font-bold mb-8">Save ₹2,001</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-slate-900 font-bold pb-2 border-b border-slate-100">
                  <CheckCircle className="w-5 h-5 text-indigo-500 shrink-0" />
                  <span>Everything in Base, plus:</span>
                </li>
                {[
                  "Personalized 1:1 Resume Build",
                  "5 Premium Mock Interviews",
                  "Direct Company Referrals",
                  "Placement Guarantee Support"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <CheckCircle className="w-5 h-5 text-indigo-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-full font-bold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 transition-all shadow-lg shadow-indigo-200">
                Get Placement Pack
              </button>
            </div>

            {/* Add-on */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Interview Add-on</h3>
              <p className="text-slate-500 mb-6 font-medium">Extra Mock Sessions</p>
              <div className="mb-8">
                <span className="text-4xl font-black text-slate-900">₹1,499</span>
                <span className="text-slate-500"> / optional</span>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "3 Additional 1:1 Mock Interviews",
                  "Detailed algorithmic breakdown",
                  "System Design dedicated review",
                  "Improvement tracking plan"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <CheckCircle className="w-5 h-5 text-slate-300 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-full font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
                Add to Program
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Booking Form & FAQ Container */}
      <section className="py-24 px-6 max-w-7xl mx-auto bg-white">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* FAQs */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Got questions?</h2>
            <p className="text-slate-600 mb-10 text-lg">We've got answers.</p>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:border-indigo-200 transition-colors">
                  <button 
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-slate-900 text-lg">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-slate-50 border-t border-slate-100"
                      >
                        <p className="p-6 text-slate-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:w-1/2">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100">
              <h2 className="text-3xl font-black text-slate-900 mb-2">Reserve Your Spot</h2>
              <p className="text-slate-500 mb-8 font-medium">Next batch starts soon. Limited seats available.</p>
              
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-slate-50 hover:bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-slate-50 hover:bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                  <input type="tel" placeholder="+91 98765 43210" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-slate-50 hover:bg-white" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">College Name</label>
                    <input type="text" placeholder="Delhi University" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-slate-50 hover:bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Course & Year</label>
                    <input type="text" placeholder="B.Tech CS / 3rd Year" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-slate-50 hover:bg-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Promo Code (Optional)</label>
                  <input type="text" placeholder="SAVE20" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-slate-50 hover:bg-white uppercase" />
                </div>
                
                <button className="w-full py-4 mt-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-200 text-lg flex items-center justify-center gap-2 group">
                  Pay & Enroll Now — ₹999
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-center text-sm text-slate-500 font-medium flex items-center justify-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center"><CheckCircle className="w-3 h-3 text-emerald-600" /></span>
                  100% Secure Checkout via Razorpay
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
