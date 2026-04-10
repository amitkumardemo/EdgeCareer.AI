import { Loader2 } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#030712]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        <p className="text-slate-400 font-medium animate-pulse text-sm">Loading TechieHelp...</p>
      </div>
    </div>
  );
}
