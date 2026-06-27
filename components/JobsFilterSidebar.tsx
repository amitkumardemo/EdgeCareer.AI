"use client";
import { Filter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function JobsFilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentType = searchParams.get("type") || "";
  const currentMode = searchParams.get("mode") || "";

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      if (params.get(key) === value) {
        params.delete(key); // toggle off
      } else {
        params.set(key, value);
      }
    } else {
      params.delete(key);
    }
    router.replace(`/jobs?${params.toString()}`, { scroll: false });
  };

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
        <div className="flex items-center gap-2 mb-6 text-slate-800 font-semibold border-b pb-4">
          <Filter size={20} />
          <h2>Filters</h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-slate-800 mb-3">Employment Type</h3>
            <div className="space-y-2">
              {["Full Time", "Part Time", "Internship", "Contract"].map((t) => (
                <label key={t} className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    name="type" 
                    value={t} 
                    checked={currentType === t} 
                    onChange={() => updateParam("type", t)}
                    className="w-4 h-4 text-[#0F4CBA] rounded border-gray-300 focus:ring-[#0F4CBA]" 
                  />
                  <span className="text-sm text-gray-600 group-hover:text-slate-800 transition-colors">{t}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-slate-800 mb-3">Work Mode</h3>
            <div className="space-y-2">
              {["Remote", "Hybrid", "Onsite"].map((m) => (
                <label key={m} className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    name="mode"
                    value={m}
                    checked={currentMode === m}
                    onChange={() => updateParam("mode", m)}
                    className="w-4 h-4 text-[#0F4CBA] rounded border-gray-300 focus:ring-[#0F4CBA]" 
                  />
                  <span className="text-sm text-gray-600 group-hover:text-slate-800 transition-colors">{m}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
