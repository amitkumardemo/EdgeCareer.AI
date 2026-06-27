"use client";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

export default function ShareJobButton({ title }: { title: string }) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <button onClick={handleShare} className="w-full bg-white border-2 border-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all flex justify-center items-center gap-2">
      <Share2 className="w-4 h-4" /> Copy Share Link
    </button>
  );
}
