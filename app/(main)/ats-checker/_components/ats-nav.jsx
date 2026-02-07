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
    <div className="border-b mb-6">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || 
            (item.href !== "/ats-checker" && pathname.startsWith(item.href));
          
          return (
            <Link key={item.href} href={item.href}>
              <Button 
                variant={isActive ? "default" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
