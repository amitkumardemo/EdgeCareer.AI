"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Trophy, CheckCircle2, Bookmark, MapPin } from "lucide-react";
import { Job, Company } from "@prisma/client";

interface JobCardProps {
  job: Job & { company: Company };
}

export default function JobCard({ job }: JobCardProps) {
  // Use new flat slug structure: /jobs/[slug]
  const jobUrl = `/jobs/${job.slug}`;

  // Helper to get category text and styles
  const getCategoryTag = () => {
    if (job.employmentType === "Internship") {
      return { text: "INTERNSHIPS", bg: "bg-purple-100", textCol: "text-purple-700" };
    }
    if (job.employmentType === "Full Time" || job.employmentType === "Contract") {
      return { text: "JOBS", bg: "bg-blue-100", textCol: "text-blue-700" };
    }
    return { text: "EVENTS", bg: "bg-amber-100", textCol: "text-amber-700" };
  };

  const tag = getCategoryTag();

  return (
    <Link href={jobUrl} className="block group">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all relative h-full flex flex-col"
      >
        {/* Top Row: Logo & Pill */}
        <div className="flex justify-between items-start mb-4">
          <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
            {job.company.logoUrl ? (
              <img src={job.company.logoUrl} alt={job.company.name} className="w-10 h-10 object-contain" />
            ) : (
              <span className="text-xl font-bold text-slate-400">{job.company.name.charAt(0)}</span>
            )}
          </div>
          <div className={`px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase ${tag.bg} ${tag.textCol}`}>
            {tag.text}
          </div>
        </div>

        {/* Title & Company */}
        <div className="mb-6 flex-1">
          <h3 className="text-lg font-bold text-slate-900 leading-tight mb-2 group-hover:text-[#a855f7] transition-colors line-clamp-2">
            {job.title}
          </h3>
          <p className="text-sm font-semibold text-slate-500">
            {job.company.name}
          </p>
        </div>

        {/* Badges/Tags Row */}
        <div className="flex flex-wrap items-center gap-2 mt-auto">
          {/* Example Badges based on data */}
          {job.salary && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-green-200 bg-green-50 text-[11px] font-bold text-green-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Paid (Competitive)
            </div>
          )}
          
          {job.workMode && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-slate-200 bg-slate-100 text-[11px] font-bold text-slate-700">
              <MapPin className="w-3.5 h-3.5" />
              {job.workMode}
            </div>
          )}

          {job.isUrgent && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-red-200 bg-red-50 text-[11px] font-bold text-red-700">
              <Trophy className="w-3.5 h-3.5" />
              Official Swags
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
