"use client";
import { Search, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function JobsSearchForm({ defaultQuery, defaultLocation }: { defaultQuery: string, defaultLocation: string }) {
  const router = useRouter();
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const updateSearch = (form: HTMLFormElement) => {
    const fd = new FormData(form);
    const params = new URLSearchParams(window.location.search);
    
    const q = fd.get("q") as string;
    const loc = fd.get("location") as string;
    
    if (q) params.set("q", q); else params.delete("q");
    if (loc) params.set("location", loc); else params.delete("location");
    
    router.replace(`/jobs?${params.toString()}`, { scroll: false });
  };

  const onChange = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      updateSearch(form);
    }, 400); // 400ms debounce
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    updateSearch(e.currentTarget);
  };

  return (
    <form onChange={onChange} onSubmit={onSubmit} className="bg-white p-2 rounded-3xl md:rounded-full flex flex-col md:flex-row items-center gap-2 max-w-4xl mx-auto shadow-lg w-full">
      <div className="flex-1 flex items-center px-4 w-full border-b md:border-b-0 md:border-r border-gray-200 py-3 md:py-0">
        <Search className="text-gray-400 mr-2 shrink-0" size={20} />
        <input 
          type="text" 
          name="q"
          defaultValue={defaultQuery}
          placeholder="Job title, skills, or company" 
          className="w-full text-slate-800 focus:outline-none placeholder:text-gray-400 bg-transparent"
        />
      </div>
      <div className="flex-1 flex items-center px-4 w-full py-3 md:py-0">
        <MapPin className="text-gray-400 mr-2 shrink-0" size={20} />
        <input 
          type="text" 
          name="location"
          defaultValue={defaultLocation}
          placeholder="City, state, or 'Remote'" 
          className="w-full text-slate-800 focus:outline-none placeholder:text-gray-400 bg-transparent"
        />
      </div>
      <button type="submit" className="w-full md:w-auto bg-[#F4B400] text-slate-900 font-bold px-8 py-3.5 rounded-2xl md:rounded-full hover:bg-amber-400 transition-colors">
        Search
      </button>
    </form>
  );
}
