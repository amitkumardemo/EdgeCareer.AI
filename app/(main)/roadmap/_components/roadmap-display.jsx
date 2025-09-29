"use client";

import { motion } from "framer-motion";
import { CheckCircle, Circle, BookOpen, Code, Users, ArrowDown } from "lucide-react";

const iconMap = {
  learn: BookOpen,
  code: Code,
  network: Users,
  default: Circle,
};

const colors = [
  "from-blue-500 to-blue-600",
  "from-green-500 to-green-600",
  "from-purple-500 to-purple-600",
  "from-orange-500 to-orange-600",
  "from-pink-500 to-pink-600",
  "from-indigo-500 to-indigo-600",
];

export default function RoadmapDisplay({ roadmap }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center">{roadmap.title}</h2>
      <div className="relative max-w-4xl mx-auto">
        {roadmap.steps.map((step, index) => {
          const Icon = iconMap[step.category] || iconMap.default;
          const colorClass = colors[index % colors.length];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.3 }}
              className="flex items-center mb-12"
            >
              <div className="flex flex-col items-center mr-8">
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-r ${colorClass} rounded-full flex items-center justify-center text-white shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon size={32} />
                </motion.div>
                {index < roadmap.steps.length - 1 && (
                  <motion.div
                    className="w-1 h-20 bg-gradient-to-b from-gray-300 to-gray-500 mt-4 rounded-full"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: index * 0.3 + 0.5, duration: 0.5 }}
                  ></motion.div>
                )}
              </div>
              <motion.div
                className={`flex-1 bg-gradient-to-r ${colorClass} p-6 rounded-xl shadow-xl text-white`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="mb-4 opacity-90">{step.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm opacity-80">
                  <span className="bg-white/20 px-3 py-1 rounded-full">Duration: {step.duration}</span>
                  {step.prerequisites.length > 0 && (
                    <span className="bg-white/20 px-3 py-1 rounded-full">Prerequisites: {step.prerequisites.join(", ")}</span>
                  )}
                </div>
                {step.resources.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Resources:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {step.resources.map((resource, idx) => (
                        <li key={idx} className="text-sm">{resource}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {step.videoLink && (
                  <div className="mt-4">
                    <a
                      href={step.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      Watch Video Tutorial
                    </a>
                  </div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
      {roadmap.selfGrowthTips && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: roadmap.steps.length * 0.3 + 0.5 }}
          className="mt-12 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-8 rounded-xl shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Self-Growth Tips</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-3 text-blue-600">How to Complete the Roadmap</h4>
              <p className="text-muted-foreground">{roadmap.selfGrowthTips.howToComplete}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-3 text-green-600">Stay Motivated</h4>
              <p className="text-muted-foreground">{roadmap.selfGrowthTips.motivationTips}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
