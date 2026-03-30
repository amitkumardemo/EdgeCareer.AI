"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard, FileText, Users, BookOpen, CalendarDays,
  Award, Megaphone, BarChart3, GraduationCap, Settings, Menu, X, LogOut, Building2,
  CalendarClock, ClipboardList, Plane
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";

const ADMIN_LINKS = [
  { href: "/dashboard", label: "Main Dashboard", icon: LayoutDashboard },
  { href: "/internship/admin/dashboard", label: "Admin Dashboard", icon: LayoutDashboard },
  { href: "/internship/admin/applications", label: "Applications", icon: FileText },
  { href: "/internship/admin/batches", label: "Batches", icon: BookOpen },
  { href: "/internship/admin/students", label: "Students", icon: Users },
  { href: "/internship/admin/tasks", label: "Tasks", icon: GraduationCap },
  { href: "/internship/admin/lms", label: "LMS Modules", icon: BookOpen },
  { href: "/internship/admin/evaluations", label: "Evaluations", icon: FileText },
  { href: "/internship/admin/attendance", label: "Attendance", icon: CalendarDays },
  { href: "/internship/admin/certificates", label: "Certificates", icon: Award },
  { href: "/internship/admin/announcements", label: "Announcements", icon: Megaphone },
  { href: "/internship/admin/reports", label: "Reports", icon: BarChart3 },
  { href: "/internship/admin/leave", label: "Leave Requests", icon: CalendarClock },
];

const STUDENT_LINKS = [
  { href: "/internship/student/dashboard", label: "My Dashboard", icon: LayoutDashboard },
  { href: "/internship/student/apply", label: "Apply", icon: FileText },
  { href: "/internship/student/lms", label: "Course LMS", icon: BookOpen },
  { href: "/internship/student/evaluation", label: "My Performance", icon: FileText },
  { href: "/internship/student/status", label: "My Status", icon: Award },
  { href: "/internship/student/tasks", label: "My Tasks", icon: BookOpen },
  { href: "/internship/student/attendance", label: "Attendance", icon: CalendarDays },
  { href: "/internship/student/leaderboard", label: "Leaderboard", icon: BarChart3 },
  { href: "/internship/student/notifications", label: "Notifications", icon: Megaphone },
  { href: "/internship/student/leave", label: "Apply Leave", icon: Plane },
];

const COLLEGE_LINKS = [
  { href: "/internship/college/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/internship/college/students", label: "Students", icon: Users },
  { href: "/internship/college/progress", label: "Progress", icon: BarChart3 },
  { href: "/internship/college/reports", label: "Reports", icon: FileText },
];

export default function InternshipSidebar({ user }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  const role = user?.role || "STUDENT";
  const links = role === "ADMIN" ? ADMIN_LINKS : role === "TPO" ? COLLEGE_LINKS : STUDENT_LINKS;
  const portalLabel = role === "ADMIN" ? "Admin Portal" : role === "TPO" ? "College Portal" : "Intern Portal";

  const handleLogout = async () => {
    await logout();
    router.push("/?logged_out=true");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2.5 mb-1">
          <Image src="/skill.png" alt="TechieHelp" width={32} height={32} className="object-contain" />
          <div>
            <p className="text-xs font-bold text-white leading-tight">TechieHelp</p>
            <p className="text-[10px] text-primary font-medium">Institute of AI</p>
          </div>
        </Link>
        <span className="text-[10px] text-gray-600 uppercase tracking-widest font-semibold">{portalLabel}</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-0.5">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 group ${
                active
                  ? "bg-primary/15 text-primary border border-primary/25 translate-x-1 shadow-[4px_0_15px_-5px_rgba(37,99,235,0.3)]"
                  : "text-gray-500 hover:text-white hover:bg-white/5 hover:translate-x-1"
              }`}
            >
              <Icon className={`h-4 w-4 flex-shrink-0 transition-transform duration-300 ${active ? "scale-110" : "group-hover:scale-110 group-hover:rotate-3"}`} />
              <span className="transition-all duration-300 group-hover:tracking-wide">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User + logout */}
      <div className="px-3 py-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-white truncate">{user?.name || "User"}</p>
            <p className="text-[10px] text-gray-600 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-red-400 hover:bg-red-400/5 transition-all"
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-white/5 border border-white/10 rounded-lg text-white"
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-[#08090f] border-r border-white/5 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
