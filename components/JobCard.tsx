"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Bookmark, MapPin, Briefcase, IndianRupee, Clock, Share2 } from "lucide-react";
import { Job, Company } from "@prisma/client";

interface JobCardProps {
  job: Job & { company: Company };
}

export default function JobCard({ job }: JobCardProps) {
  // Use new flat slug structure: /jobs/[slug]
  const jobUrl = `/jobs/${job.slug}`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all relative group"
    >
      <div className="flex justify-between items-start gap-4">
        {/* Company Logo */}
        <div className="w-16 h-16 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 border overflow-hidden">
          {job.company.logoUrl ? (
            <img src={job.company.logoUrl} alt={job.company.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-xl font-bold text-gray-400">{job.company.name.charAt(0)}</span>
          )}
        </div>

        {/* Details */}
        <div className="flex-1">
          <Link href={jobUrl} className="block group-hover:text-[#0F4CBA] transition-colors">
            <h3 className="text-lg font-semibold text-slate-800 leading-tight mb-1">{job.title}</h3>
          </Link>
          <Link href={`/company/${job.company.slug}`} className="text-sm text-[#0F4CBA] hover:underline font-medium">
            {job.company.name}
          </Link>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm text-gray-500">
            {job.locationId && (
              <div className="flex items-center gap-1">
                <MapPin size={16} /> <span>{job.locationId}</span>
              </div>
            )}
            {job.experience && (
              <div className="flex items-center gap-1">
                <Briefcase size={16} /> <span>{job.experience}</span>
              </div>
            )}
            {job.salary && (
              <div className="flex items-center gap-1">
                <IndianRupee size={16} /> <span>{job.salary}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Clock size={16} /> <span suppressHydrationWarning>{new Date(job.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {job.employmentType && (
              <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                {job.employmentType}
              </span>
            )}
            {job.workMode && (
              <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-full">
                {job.workMode}
              </span>
            )}
            {job.isUrgent && (
              <span className="px-2.5 py-1 bg-red-50 text-red-600 text-xs font-medium rounded-full">
                Urgent Hiring
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <button className="p-2 text-gray-400 hover:text-[#F4B400] transition-colors rounded-full hover:bg-gray-50">
            <Bookmark size={20} />
          </button>
          <button className="p-2 text-gray-400 hover:text-[#0F4CBA] transition-colors rounded-full hover:bg-gray-50">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="text-xs text-gray-400 font-medium">
          {job.views > 100 ? `🔥 ${job.views} views` : `Be among the first to apply`}
        </div>
        <Link 
          href={jobUrl}
          className="bg-[#0F4CBA] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-700 hover:shadow-md transition-all active:scale-95"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}
