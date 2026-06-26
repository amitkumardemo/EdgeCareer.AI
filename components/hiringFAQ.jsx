"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What kind of roles are available at TechieHelp?",
    answer: "We offer part-time and project-based roles tailored for students and early-stage professionals looking to gain hands-on experience in tech, design, and marketing."
  },
  {
    question: "Do you offer full-time positions?",
    answer: "Currently, we do not offer full-time roles. Our focus is on providing flexible, project-based opportunities that allow students to learn and earn without disrupting their academics."
  },
  {
    question: "Will I get paid for my work?",
    answer: "Yes, you will receive payment based on project delivery and performance, rather than a fixed monthly salary. The compensation depends on the complexity and scope of the tasks you complete."
  },
  {
    question: "Are these remote opportunities?",
    answer: "Yes, our project-based roles offer flexible working hours and are mostly remote, allowing you to collaborate with our team from anywhere."
  },
  {
    question: "What benefits do I get from joining?",
    answer: "You will work on real projects, receive an internship certificate, get a Letter of Recommendation (LOR), and have the chance to be featured on our website and LinkedIn."
  }
];

export default function HiringFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 relative z-10 my-20">
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-xs font-bold text-blue-500 uppercase tracking-widest">
          <HelpCircle className="w-4 h-4 text-blue-500" />
          <span>Hiring FAQ</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter drop-shadow-2xl">
          Frequently Asked <span className="text-blue-500 font-bold">Questions</span>
        </h2>
        <p className="text-slate-600 dark:text-gray-400 max-w-xl mx-auto">
          Find answers to common questions about working with TechieHelp and our project-based roles.
        </p>
      </div>

      <div className="space-y-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-6 md:p-10 shadow-2xl backdrop-blur-xl">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className="border-b border-slate-200 dark:border-white/5 last:border-0 py-5"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left font-bold text-lg md:text-xl text-slate-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-500' : ''}`} />
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
                    <p className="text-slate-600 dark:text-gray-400 text-sm md:text-base leading-relaxed font-medium mt-4">
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
