"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  FileText,
  History,
  BarChart3,
  MessageSquare,
  Upload,
} from "lucide-react";

export default function ATSNav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/ats-checker",
      label: "Analyze",
      icon: Upload,
    },
    {
      href: "/ats-checker/history",
      label: "History",
      icon: History,
    },
    {
      href: "/ats-checker/analytics",
      label: "Analytics",
      icon: BarChart3,
    },
    {
      href: "/ats-checker/insights",
      label: "Insights",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="border-b border-white/10 mb-10 overflow-hidden rounded-3xl bg-white/5 backdrop-blur-2xl">
      <div className="flex gap-1 p-1 overflow-x-auto scrollbar-hide">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || 
            (item.href !== "/ats-checker" && pathname.startsWith(item.href));
          
          return (
            <Link key={item.href} href={item.href} className="flex-1">
              <Button 
                variant="ghost"
                className={`w-full gap-3 h-12 rounded-2xl transition-all duration-500 font-black text-xs uppercase tracking-widest ${
                  isActive 
                    ? "bg-emerald-500/20 text-emerald-400 shadow-[inset_0_0_20px_rgba(16,185,129,0.1)] border border-emerald-500/20" 
                    : "text-muted-foreground hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "animate-pulse" : ""}`} />
                <span>{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
