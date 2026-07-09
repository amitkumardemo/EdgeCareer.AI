import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-100px)] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 rounded-full blur-xl bg-blue-500/20 animate-pulse"></div>
          <Loader2 className="h-10 w-10 animate-spin text-blue-600 relative z-10" />
        </div>
        <p className="text-sm font-medium text-slate-500 animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
