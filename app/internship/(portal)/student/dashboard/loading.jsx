import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[#030712] pb-20 pt-8">
      <div className="container mx-auto px-4 max-w-7xl space-y-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between p-6 bg-slate-900/40 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-slate-800 rounded-full"></div>
            <div className="space-y-3">
              <div className="h-5 w-48 bg-slate-800 rounded-md"></div>
              <div className="h-4 w-32 bg-slate-800/80 rounded-md"></div>
            </div>
          </div>
          <div className="hidden md:flex h-10 w-28 bg-slate-800 rounded-lg"></div>
        </div>
        
        {/* Metric Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-slate-900/40 rounded-xl border border-slate-800 p-4 space-y-4">
              <div className="flex justify-between">
                <div className="h-4 w-20 bg-slate-800 rounded-md"></div>
                <div className="h-8 w-8 bg-slate-800 rounded-full"></div>
              </div>
              <div className="h-6 w-16 bg-slate-800 rounded-md mt-4"></div>
            </div>
          ))}
        </div>
        
        {/* Main Workspace Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
             <div className="h-64 bg-slate-900/40 rounded-2xl border border-slate-800 p-6 space-y-4">
               <div className="h-6 w-40 bg-slate-800 rounded-md"></div>
               <div className="h-10 border border-slate-800 rounded-xl bg-slate-900"></div>
             </div>
             <div className="h-96 bg-slate-900/40 rounded-2xl border border-slate-800 p-6 space-y-6">
                <div className="flex justify-between mb-4">
                  <div className="h-6 w-32 bg-slate-800 rounded-md"></div>
                  <div className="h-6 w-20 bg-slate-800 rounded-md"></div>
                </div>
                {[1,2,3,4].map(j => <div key={j} className="h-12 bg-slate-800/50 rounded-lg"></div>)}
             </div>
          </div>
          <div className="lg:col-span-4 space-y-6">
             <div className="h-[400px] bg-slate-900/40 rounded-2xl border border-slate-800 p-6 space-y-4">
               <div className="h-6 w-32 bg-slate-800 rounded-md"></div>
               {[1,2,3,4,5].map(j => <div key={j} className="h-14 bg-slate-800/50 rounded-lg"></div>)}
             </div>
             <div className="h-[300px] bg-slate-900/40 rounded-2xl border border-slate-800 p-6 space-y-4">
               <div className="h-6 w-24 bg-slate-800 rounded-md"></div>
               <div className="h-12 bg-slate-800/50 rounded-lg"></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
