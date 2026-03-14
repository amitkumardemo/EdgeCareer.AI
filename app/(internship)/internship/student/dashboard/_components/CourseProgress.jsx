"use client";

import Link from "next/link";
import { ChevronRight, BookOpen, CalendarDays, Award } from "lucide-react";
import { motion } from "framer-motion";

export function CourseProgress({ selectedApp, progress }) {
  if (!selectedApp) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-[#0f172a] border border-white/5 border-dashed rounded-3xl p-10 text-center mb-8"
      >
        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <BookOpen className="h-8 w-8 text-gray-600" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">No Active Internship</h2>
        <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
          Apply to an open batch to begin your internship journey and start building your career.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/internship/student/apply">
            <Button className="bg-slate-900 border border-white/10 hover:bg-slate-800 text-white rounded-xl h-12 px-8 font-bold">
              Browse Open Batches <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/internships">
            <Button className="bg-white hover:bg-white/90 text-black rounded-xl h-12 px-8 font-black shadow-lg shadow-white/5">
              Apply Now
            </Button>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gradient-to-br from-primary/10 via-[#0f172a] to-[#020617] border border-primary/20 rounded-3xl p-8 mb-8 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-colors" />
      
      <div className="flex flex-col lg:flex-row justify-between gap-8 mb-8">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
            Active Internship
          </div>
          <h2 className="text-3xl font-black text-white leading-tight mb-2 group-hover:text-primary transition-colors">
            {selectedApp.batch?.program?.title}
          </h2>
          <div className="flex items-center gap-4 text-gray-500 text-sm font-medium">
            <span>{selectedApp.batch?.name}</span>
            <span className="w-1 h-1 bg-gray-700 rounded-full" />
            <span>Started {new Date(selectedApp.batch?.startDate).toLocaleDateString("en-IN")}</span>
          </div>
        </div>

        <div className="flex gap-8 items-center justify-between sm:justify-start">
          {[
            { label: "Overall Progress", value: `${progress?.progressPct}%` },
            { label: "Total Tasks", value: `${progress?.tasksCompleted}/${progress?.totalTasks}` },
            { label: "Attendance", value: `${progress?.attendancePct}%` }
          ].map((item, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl font-black text-white tracking-tighter">{item.value}</p>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between text-xs font-bold text-gray-400 mb-2.5 uppercase tracking-wide">
            <span>Course Completion</span>
            <span className="text-white">{progress?.progressPct}% Completed</span>
          </div>
          <div className="h-3 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-primary via-indigo-400 to-blue-400 rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(79,70,229,0.4)]"
              style={{ width: `${progress?.progressPct}%` }}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/internship/student/tasks">
            <Button className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-xl px-6 h-10 text-xs font-bold">
              <BookOpen className="mr-2 h-4 w-4" /> View All Tasks
            </Button>
          </Link>
          <Link href="/internship/student/attendance">
            <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 text-gray-300 rounded-xl px-6 h-10 text-xs font-bold">
              <CalendarDays className="mr-2 h-4 w-4" /> Attendance Log
            </Button>
          </Link>
          {!progress?.completed && progress?.progressPct === 100 && (
            <Link href="/internship/student/certificate">
              <Button className="bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 rounded-xl px-6 h-10 text-xs font-bold shadow-lg shadow-green-500/10">
                <Award className="mr-2 h-4 w-4" /> Get Certificate
              </Button>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Sub-component for buttons since standard Button might not be available in local scope
function Button({ children, className, variant = "solid", ...props }) {
  const base = "inline-flex items-center justify-center transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    solid: "",
    outline: "border",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
