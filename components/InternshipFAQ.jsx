"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is TechieHelp Institute of AI Internship Program?",
    answer: "TechieHelp Institute of AI offers structural, project-based internship and training cohorts. Our goal is to provide hands-on industry exposure on technologies like Web Development, Full Stack Development, AI & ML, Cyber Security, and Data Science."
  },
  {
    question: "Who is eligible to apply for this internship?",
    answer: "Engineering, MCA, BCA, BSc CS, and general technology students looking to complete their summer training or academic internship requirements are eligible to apply. Basic programming knowledge in JavaScript, Python, or Java is helpful."
  },
  {
    question: "Are the internship certificates MSME and ISO certified?",
    answer: "Yes, TechieHelp is an educational training center registered with MSME. Our certificates are ISO 9001:2015 certified, making them internationally recognized and fully accepted for academic credit at colleges across India."
  },
  {
    question: "What does the premium learning platform look like?",
    answer: "You get FREE access to the TechieHelp Institute of AI platform where you can track attendance, submit daily tasks, view LMS modules, practice coding, and view certificates—experience a real corporate environment!"
  },
  {
    question: "Will I get placement support after the internship?",
    answer: "Yes, our Advanced and Elite plans offer dedicated placement support, including ATS resume audits, LinkedIn profile optimization, career roadmap guidance, and mock interviews with software engineers."
  },
  {
    question: "How can I verify my certificate?",
    answer: "Every certificate issued by TechieHelp Institute of AI comes with a unique Verification ID. Anyone (including recruiters and college authorities) can verify it instantly at verify.techiehelp.info or via our website."
  }
];

export default function InternshipFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 relative z-10">
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 text-xs font-bold text-orange-400 uppercase tracking-widest">
          <HelpCircle className="w-4 h-4 text-orange-400" />
          <span>FAQ Section</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter drop-shadow-2xl">
          Frequently Asked <span className="text-cyan-gradient font-bold">Questions</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Find answers to common questions about our internship structure, certificates, LMS access, and placement support.
        </p>
      </div>

      <div className="space-y-4 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-6 md:p-10 shadow-2xl backdrop-blur-xl">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className="border-b border-gray-200 dark:border-white/5 last:border-0 py-5"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left font-bold text-lg md:text-xl text-gray-900 dark:text-white hover:text-orange-400 dark:hover:text-orange-400 transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown className={`w-6 h-6 text-gray-400 transition-transform duration-355 ${isOpen ? 'rotate-180 text-orange-400' : ''}`} />
              </button>
              
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-600 dark:text-gray-405 text-sm md:text-base leading-relaxed font-medium mt-4">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
