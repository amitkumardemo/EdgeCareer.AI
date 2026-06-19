"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, Clock, ArrowRight, Sparkles, BookOpen, Layers } from "lucide-react";

export default function BlogArchiveClient({ blogs }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  // Filtered blogs
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const categories = ["All", "AI", "Internships", "Placement"];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pt-28 md:pt-36 pb-20 selection:bg-cyan-150 transition-colors duration-300">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-12 md:py-20 px-6 max-w-7xl mx-auto overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] opacity-[0.06] bg-cyan-500 rounded-full blur-[100px] pointer-events-none -z-10" />
        
        <div className="space-y-6 max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-cyan-200 dark:border-cyan-800 bg-white dark:bg-slate-900 shadow-sm text-xs font-bold text-cyan-800 dark:text-cyan-400">
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>Career Insights & Guides</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-blue-950 dark:text-white">
            TechieHelp <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-cyan-200">Knowledge Hub</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            Master Artificial Intelligence, Full-Stack Web Development, Cyber Security, and Placement Strategies. Follow detailed roadmaps and tutorials built by industry engineering mentors.
          </p>
        </div>
      </section>

      {/* 2. SEARCH & FILTER SECTION */}
      <section className="px-6 max-w-7xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-3xl bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/60 shadow-sm">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search articles, roadmaps, tutorials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-slate-900 dark:text-white transition-all text-sm"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-[#0F4CBA] text-white shadow-md shadow-blue-500/10"
                    : "bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                }`}
              >
                {cat === "All" ? "All Topics" : cat}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* 3. BLOGS GRID */}
      <section className="px-6 max-w-7xl mx-auto">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20 bg-white/40 dark:bg-slate-900/20 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
            <Layers className="w-12 h-12 text-slate-350 dark:text-slate-650 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No Articles Found</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Try modifying your search queries or category filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {currentBlogs.map((blog, index) => (
                <motion.article
                  key={blog.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group flex flex-col justify-between p-5 rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-850 hover:border-slate-200 dark:hover:border-slate-700/80 shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="space-y-4">
                    {/* Image Placeholder/Thumbnail */}
                    <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider bg-white/90 dark:bg-slate-900/90 text-cyan-800 dark:text-cyan-400 uppercase shadow-sm">
                        {blog.category}
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{blog.publishedAt}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{blog.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-blue-950 dark:text-white leading-snug group-hover:text-[#0F4CBA] dark:group-hover:text-blue-400 transition-colors">
                      <Link href={`/blog/${blog.slug}`}>
                        {blog.title}
                      </Link>
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {blog.description}
                    </p>
                  </div>

                  {/* Footer (Author & CTA) */}
                  <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between">
                    {/* Author */}
                    <div className="flex items-center gap-2">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100">
                        <Image
                          src={blog.author.avatar}
                          alt={blog.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 leading-none">{blog.author.name}</div>
                        <div className="text-[9px] text-slate-400 dark:text-slate-500 mt-0.5">Author</div>
                      </div>
                    </div>

                    {/* Read CTA */}
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:gap-1.5 transition-all"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* 4. PAGINATION */}
      {totalPages > 1 && (
        <section className="px-6 max-w-7xl mx-auto mt-16 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 disabled:opacity-50 disabled:pointer-events-none hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            Previous
          </button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                  currentPage === i + 1
                    ? "bg-[#0F4CBA] text-white"
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 disabled:opacity-50 disabled:pointer-events-none hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            Next
          </button>
        </section>
      )}

    </div>
  );
}
