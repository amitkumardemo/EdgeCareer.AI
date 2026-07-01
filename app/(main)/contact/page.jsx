"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, Phone, MapPin, Linkedin, Github, Youtube, Instagram, 
  User, Building2, Handshake, Briefcase, BadgeCheck, BriefcaseBusiness, 
  BookOpen, ChevronDown, Send, ArrowRight, Sparkles, CheckCircle2, X
} from "lucide-react";
import { toast } from "sonner";


export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    userType: "Student",
    name: "",
    email: "",
    phone: "",
    organization: "",
    purpose: "Internship Inquiry",
    message: ""
  });

  // Force light mode on mount
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const payload = {
      ...formData,
      _captcha: "false",
      _template: "table",
      _subject: "🚀 New TechieHelp Contact Form Submission",
      _autoresponse: "Thank you for contacting TechieHelp Institute of AI. Our team has received your request and will contact you shortly.",
    };

    try {
      const response = await fetch("https://formsubmit.co/ajax/techiehelpinstituteofai@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        setShowSuccessModal(true);
        setFormData({
          userType: "Student",
          name: "",
          email: "",
          phone: "",
          organization: "",
          purpose: "Internship Inquiry",
          message: ""
        });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to submit the form. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = (type = "Student", purpose = "Internship Inquiry") => {
    setFormData((prev) => ({ ...prev, userType: type, purpose: purpose }));
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const faqs = [
    {
      question: "How do I apply for internships?",
      answer: "You can explore available internships on our internships portal page and apply directly by submitting your credentials and project links."
    },
    {
      question: "How can colleges collaborate with TechieHelp?",
      answer: "Colleges can request campus partnerships, custom skill development programs, or technical workshops by filling out the partnership form above."
    },
    {
      question: "How can I verify my certificate?",
      answer: "You can verify any certificate issued by TechieHelp by entering the unique certificate ID on our dedicated verification section or contacting support."
    },
    {
      question: "Do you conduct workshops for institutions?",
      answer: "Yes, we collaborate with college TPOs to conduct hands-on technology workshops, DSA bootcamps, and placement preparation seminars."
    },
    {
      question: "How quickly will I receive a response?",
      answer: "Our relations team typically responds to all inquiries and collaboration requests within 24 business hours."
    }
  ];

  return (
    <div className="bg-slate-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-slate-50 to-slate-50 min-h-screen text-slate-900 overflow-x-hidden transition-colors duration-300 font-sans selection:bg-cyan-150 relative">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-24 px-6 max-w-7xl mx-auto overflow-hidden text-center rounded-[2.5rem] bg-white/70 backdrop-blur-xl border border-white/50 shadow-2xl shadow-[#0F4CBA]/5 mt-6">
        {/* Background grid & blob */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="contact-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#contact-grid)" />
          </svg>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] opacity-[0.07] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600 via-amber-200 to-transparent blur-[100px] pointer-events-none z-0" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-cyan-200 bg-cyan-50/50 text-xs font-bold text-cyan-800 shadow-sm">
            <Sparkles className="w-4.5 h-4.5 text-[#0F4CBA]" strokeWidth={1.75} />
            <span>Get in Touch</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-blue-950 tracking-tight leading-[1.1]">
            Let's Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-950 via-[#0F4CBA] to-[#F4B400]">Future Together</span>
          </h1>

          <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Whether you're a student looking for internships, a college seeking partnerships, or an organization interested in collaboration, we're here to help.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button 
              onClick={() => scrollToForm("Student", "General Inquiry")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#0F4CBA] hover:bg-[#0c3d96] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
            >
              Contact Us
            </button>
            <button 
              onClick={() => scrollToForm("College / TPO", "Campus Collaboration")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-[#0F4CBA] text-[#0F4CBA] font-bold text-sm shadow-sm transition-all"
            >
              Request Partnership
            </button>
          </div>
        </div>
      </section>

      {/* 2. CONTACT INFORMATION & CONNECT */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Info Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Email */}
          <div className="group p-6 rounded-3xl bg-white border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow text-left flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center text-[#0F4CBA] group-hover:text-[#F4B400] transition-colors shadow-sm">
                <Mail className="w-5.5 h-5.5" strokeWidth={1.75} />
              </div>
              <h3 className="text-base font-bold text-blue-950">Email</h3>
              <a href="mailto:techiehelpinstituteofai@gmail.com" className="block text-sm font-semibold text-[#0F4CBA] hover:underline break-all">
                techiehelpinstituteofai@gmail.com
              </a>
            </div>
            <p className="text-xs text-slate-400 mt-4">Response Time: Within 24 Hours</p>
          </div>

          {/* Card 2: Phone */}
          <div className="group p-6 rounded-3xl bg-white border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow text-left flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center text-[#0F4CBA] group-hover:text-[#F4B400] transition-colors shadow-sm">
                <Phone className="w-5.5 h-5.5" strokeWidth={1.75} />
              </div>
              <h3 className="text-base font-bold text-blue-950">Phone</h3>
              <p className="text-sm font-bold text-slate-700">+91 7673825079</p>
            </div>
            <p className="text-xs text-slate-400 mt-4">Available: Monday – Saturday</p>
          </div>

          {/* Card 3: Location */}
          <div className="group p-6 rounded-3xl bg-white border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow text-left flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center text-[#0F4CBA] group-hover:text-[#F4B400] transition-colors shadow-sm">
                <MapPin className="w-5.5 h-5.5" strokeWidth={1.75} />
              </div>
              <h3 className="text-base font-bold text-blue-950">Location</h3>
              <p className="text-sm text-slate-600 leading-snug">
                Vivek Vihar Sector 14<br />
                Block D, Room No. 31<br />
                India
              </p>
            </div>
            <p className="text-xs text-slate-400 mt-4">HQ & Learning Hub</p>
          </div>

        </div>

        {/* Connect Socials Card */}
        <div className="lg:col-span-4 p-8 rounded-3xl bg-gradient-to-tr from-white via-white to-blue-50/20 border border-slate-200/60 shadow-sm flex flex-col justify-between text-left">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-blue-950">Connect With Us</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Join our active digital community to get real-time training announcements and internship alerts.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-6 lg:pt-0">
            {[
              { icon: Linkedin, href: "https://www.linkedin.com/company/techiehelp", label: "LinkedIn" },
              { icon: Github, href: "https://github.com/techiehelp", label: "GitHub" },
              { icon: Youtube, href: "https://youtube.com/techiehelp", label: "YouTube" },
              { icon: Instagram, href: "https://instagram.com/techiehelp_ai", label: "Instagram" }
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-[#0F4CBA] hover:text-[#F4B400] hover:border-[#F4B400] transition-all hover:scale-105"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </div>

      </section>

      {/* 3. WHO CAN CONTACT US */}
      <section className="py-16 bg-white border-y border-slate-200/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest">Target Channels</span>
            <h2 className="text-3xl md:text-4xl font-black text-blue-950 tracking-tight">Who Can Contact Us</h2>
            <p className="text-slate-500 text-sm">
              We coordinate structural opportunities with three core pillars of EdTech growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Column 1: Students */}
            <div className="p-8 rounded-3xl bg-slate-50 hover:bg-slate-100/50 transition-colors border border-slate-100 text-left space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#0F4CBA] shadow-sm">
                <User className="w-5.5 h-5.5" strokeWidth={1.75} />
              </div>
              <h3 className="text-xl font-bold text-blue-950">Students</h3>
              <ul className="space-y-3">
                {["Internships", "Training Programs", "Certifications", "Career Guidance"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <CheckCircle2 className="w-4.5 h-4.5 text-[#0F4CBA]" strokeWidth={1.75} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Colleges & TPOs */}
            <div className="p-8 rounded-3xl bg-slate-50 hover:bg-slate-100/50 transition-colors border border-slate-100 text-left space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#0F4CBA] shadow-sm">
                <Building2 className="w-5.5 h-5.5" strokeWidth={1.75} />
              </div>
              <h3 className="text-xl font-bold text-blue-950">Colleges & TPOs</h3>
              <ul className="space-y-3">
                {["Campus Partnerships", "Workshops", "Skill Development Programs", "Internship Opportunities"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <CheckCircle2 className="w-4.5 h-4.5 text-[#0F4CBA]" strokeWidth={1.75} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Industry Partners */}
            <div className="p-8 rounded-3xl bg-slate-50 hover:bg-slate-100/50 transition-colors border border-slate-100 text-left space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#0F4CBA] shadow-sm">
                <Handshake className="w-5.5 h-5.5" strokeWidth={1.75} />
              </div>
              <h3 className="text-xl font-bold text-blue-950">Industry Partners</h3>
              <ul className="space-y-3">
                {["Collaborations", "Hiring Partnerships", "Projects", "Guest Sessions"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <CheckCircle2 className="w-4.5 h-4.5 text-[#0F4CBA]" strokeWidth={1.75} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CONTACT FORM */}
      <section ref={formRef} className="py-24 px-6 max-w-4xl mx-auto relative">
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-2xl shadow-[#0F4CBA]/10 p-8 md:p-14 text-left space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-cyan-100/50 rounded-full blur-3xl pointer-events-none" />
          
          <div className="text-center md:text-left space-y-2 relative z-10">
            <h2 className="text-3xl font-black text-blue-950 tracking-tight">How Can We Help You?</h2>
            <p className="text-slate-500 text-sm">Fill out the secure form below to connect directly with our departments.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Dropdown: I am a */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">I am a</label>
              <div className="relative">
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:border-[#0F4CBA] text-sm text-slate-800 appearance-none font-medium"
                >
                  <option value="Student">Student</option>
                  <option value="College / TPO">College / TPO</option>
                  <option value="Industry Partner">Industry Partner</option>
                  <option value="Mentor">Mentor</option>
                  <option value="Recruiter">Recruiter</option>
                  <option value="Other">Other</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:border-[#0F4CBA] text-sm text-slate-800"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:border-[#0F4CBA] text-sm text-slate-800"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:border-[#0F4CBA] text-sm text-slate-800"
                />
              </div>

              {/* Org / College Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Organization / College Name</label>
                <input
                  type="text"
                  name="organization"
                  required
                  placeholder="TechieHelp University"
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:border-[#0F4CBA] text-sm text-slate-800"
                />
              </div>

            </div>

            {/* Dropdown: Purpose */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Purpose</label>
              <div className="relative">
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:border-[#0F4CBA] text-sm text-slate-800 appearance-none font-medium"
                >
                  <option value="Internship Inquiry">Internship Inquiry</option>
                  <option value="Training Programs">Training Programs</option>
                  <option value="Campus Collaboration">Campus Collaboration</option>
                  <option value="Workshop Request">Workshop Request</option>
                  <option value="Hiring Partnership">Hiring Partnership</option>
                  <option value="Certificate Verification">Certificate Verification</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Message</label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell us how we can help..."
                value={formData.message}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:border-[#0F4CBA] text-sm text-slate-800"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 rounded-2xl bg-[#0F4CBA] hover:bg-[#0c3d96] text-white font-bold text-base shadow-md hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-75 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-4.5 h-4.5" strokeWidth={1.75} />
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* 5. QUICK ACTION SECTION */}
      <section className="py-20 bg-white border-y border-slate-200/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            
            {/* Action 1: Apply for Internship */}
            <Link href="/internship" className="group p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#0F4CBA] hover:shadow-md transition-all text-left space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[#0F4CBA] group-hover:text-[#F4B400] transition-colors shadow-sm">
                <Briefcase className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <h4 className="text-sm font-bold text-blue-950">Apply for Internship</h4>
            </Link>

            {/* Action 2: Request College Partnership */}
            <button 
              onClick={() => scrollToForm("College / TPO", "Campus Collaboration")}
              className="group p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#0F4CBA] hover:shadow-md transition-all text-left space-y-4"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[#0F4CBA] group-hover:text-[#F4B400] transition-colors shadow-sm">
                <Building2 className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <h4 className="text-sm font-bold text-blue-950">Request College Partnership</h4>
            </button>

            {/* Action 3: Verify Certificate */}
            <Link href="/#verify" className="group p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#0F4CBA] hover:shadow-md transition-all text-left space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[#0F4CBA] group-hover:text-[#F4B400] transition-colors shadow-sm">
                <BadgeCheck className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <h4 className="text-sm font-bold text-blue-950">Verify Certificate</h4>
            </Link>

            {/* Action 4: Career Opportunities */}
            <Link href="/latest-jobs" className="group p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#0F4CBA] hover:shadow-md transition-all text-left space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[#0F4CBA] group-hover:text-[#F4B400] transition-colors shadow-sm">
                <BriefcaseBusiness className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <h4 className="text-sm font-bold text-blue-950">Career Opportunities</h4>
            </Link>

            {/* Action 5: Explore Programs */}
            <Link href="/programs" className="group p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#0F4CBA] hover:shadow-md transition-all text-left space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[#0F4CBA] group-hover:text-[#F4B400] transition-colors shadow-sm">
                <BookOpen className="w-5 h-5" strokeWidth={1.75} />
              </div>
              <h4 className="text-sm font-bold text-blue-950">Explore Programs</h4>
            </Link>

          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-left">
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-bold text-[#0F4CBA] uppercase tracking-widest">Frequently Asked Questions</span>
          <h2 className="text-3xl font-black text-blue-950 tracking-tight">FAQ Section</h2>
        </div>

        <div className="space-y-4 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={index} className="border-b border-slate-100 last:border-0 py-4.5">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="flex justify-between items-center w-full text-left font-bold text-base md:text-lg text-slate-800 hover:text-[#0F4CBA] transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#0F4CBA]' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-slate-500 text-sm leading-relaxed font-normal">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. BOTTOM CTA */}
      <section className="py-24 bg-white border-t border-slate-200/50 relative">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-50/60 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-blue-950">
            Ready to Build Your Future?
          </h2>
          <p className="text-slate-600 text-lg md:text-xl max-w-xl mx-auto leading-relaxed font-normal">
            Join thousands of students and institutions growing with TechieHelp Institute of AI.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/programs">
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#0F4CBA] hover:bg-[#0c3d96] text-white font-bold text-base shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all">
                Explore Programs
              </button>
            </Link>
            <button 
              onClick={() => scrollToForm("Student", "General Inquiry")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-[#0F4CBA] text-[#0F4CBA] font-bold text-base shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* 8. FOOTER MESSAGE */}
      <div className="py-12 text-center space-y-1.5 border-t border-slate-100 bg-slate-50/50">
        <p className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
          Building AI Leaders
        </p>
        <p className="text-[10px] text-slate-400 tracking-widest font-semibold">
          Training • Internships • Certifications
        </p>
      </div>

      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setShowSuccessModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center border border-slate-100 z-10"
            >
              <button 
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
              </div>
              
              <h3 className="text-2xl font-black text-blue-950 mb-2">Request Sent!</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                Thank you for contacting TechieHelp Institute of AI. Our team has received your request and will get back to you within 24 hours.
              </p>
              
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-3.5 rounded-xl bg-[#0F4CBA] hover:bg-[#0c3d96] text-white font-bold text-sm shadow-md transition-all active:scale-[0.98]"
              >
                Continue
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
