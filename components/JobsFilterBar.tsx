"use client";

import { Search, MapPin, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState, useEffect } from "react";

export default function JobsFilterBar({ defaultQuery, defaultLocation }: { defaultQuery: string, defaultLocation: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const [query, setQuery] = useState(defaultQuery);
  const [location, setLocation] = useState(defaultLocation);
  
  const currentType = searchParams.get("type") || "";
  const currentMode = searchParams.get("mode") || "";

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    // Also include text and location if they exist in local state
    if (query) params.set("q", query); else params.delete("q");
    if (location) params.set("location", location); else params.delete("location");
    
    router.replace(`/jobs?${params.toString()}`, { scroll: false });
  };

  const handleTextSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (query) params.set("q", query); else params.delete("q");
    if (location) params.set("location", location); else params.delete("location");
    router.replace(`/jobs?${params.toString()}`, { scroll: false });
  };

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "q") setQuery(value);
    if (name === "location") setLocation(value);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      handleTextSearch();
    }, 400);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mx-auto max-w-5xl mt-8">
      {/* Top Row: Search Input & Filters Button */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-100 transition-all">
          <Search className="text-slate-400 mr-2 shrink-0 w-5 h-5" />
          <input 
            type="text" 
            name="q"
            value={query}
            onChange={onTextChange}
            placeholder="Search opportunities by title, tags, company..." 
            className="w-full text-slate-800 focus:outline-none placeholder:text-slate-400 bg-transparent text-sm font-medium"
          />
        </div>
        <button 
          onClick={handleTextSearch}
          className="bg-[#a855f7] hover:bg-purple-600 text-white font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shrink-0 shadow-sm shadow-purple-500/20"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Bottom Row: Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        
        {/* Working Arrangement */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Working Arrangement</label>
          <div className="relative">
            <select 
              value={currentMode}
              onChange={(e) => updateFilters("mode", e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold rounded-lg px-4 py-2.5 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all cursor-pointer"
            >
              <option value="">All Arrangements</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Onsite">Onsite</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Location / Region */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Location / Region</label>
          <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-lg focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-100 transition-all">
            <MapPin className="text-slate-400 ml-3 w-4 h-4 shrink-0" />
            <input 
              type="text" 
              name="location"
              value={location}
              onChange={onTextChange}
              placeholder="All Locations" 
              className="w-full text-slate-700 focus:outline-none placeholder:text-slate-700 bg-transparent text-sm font-bold px-2 py-2.5"
            />
          </div>
        </div>

        {/* Employment Type */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Employment Type</label>
          <div className="relative">
            <select 
              value={currentType}
              onChange={(e) => updateFilters("type", e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold rounded-lg px-4 py-2.5 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all cursor-pointer"
            >
              <option value="">All Types</option>
              <option value="Full Time">Full Time</option>
              <option value="Internship">Internship</option>
              <option value="Part Time">Part Time</option>
              <option value="Contract">Contract</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

      </div>
    </div>
  );
}
