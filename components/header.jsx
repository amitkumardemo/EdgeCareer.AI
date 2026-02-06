import React from "react";
import { Button } from "./ui/button";
import { BUTTONS_MENUS } from "@/lib/constants";
import {
  PenBox,
  LayoutDashboard,
  FileText,
  GraduationCap,
  ChevronDown,
  StarsIcon,
  MoonIcon,
  SunIcon,
  Route,
  BriefcaseBusiness,
  Flame,
} from "lucide-react";

import Link from "next/link";
import { SignedIn } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { checkUser } from "@/lib/checkUser";
import { useTheme } from "next-themes";
import ThemSwitch from "./theme-switch";
import { getUserStreak } from "@/actions/streak";
import AuthButtons from "./AuthButtons";


export default async function Header() {
  await checkUser();
  const streakData = await getUserStreak();

  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <Image
            src={"/skill.png"}
            alt="EdgeCareer Logo"
            width={200}
            height={60}
            className="h-12 py-1 w-auto object-contain"
          />
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <SignedIn>
            {/* Streak Counter */}
            {streakData.streak > 0 && (
              <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                <Flame className="h-4 w-4" />
                <span className="hidden sm:inline">{streakData.streak} day{streakData.streak !== 1 ? 's' : ''}</span>
                <span className="sm:hidden">{streakData.streak}</span>
              </div>
            )}
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="hidden md:inline-flex items-center gap-2"
              >
                <LayoutDashboard className="h-4 w-4" />
                {BUTTONS_MENUS.DASHBOARD_INSIGHTS}
              </Button>
              <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                <LayoutDashboard className="h-4 w-4" />
              </Button>
            </Link>

            {/* Growth Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2">
                  <StarsIcon className="h-4 w-4" />
                  <span className="hidden md:block">{BUTTONS_MENUS.GROWTH_TOOLS}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/resume" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    {BUTTONS_MENUS.BUILD_RESUME}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/ai-cover-letter"
                    className="flex items-center gap-2"
                  >
                    <PenBox className="h-4 w-4" />
                    {BUTTONS_MENUS.COVER_LETTER}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/interview" className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    {BUTTONS_MENUS.INTERVIEW_PREP}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/roadmap" className="flex items-center gap-2">
                    <Route className="h-4 w-4" />
                    Roadmap Generator
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/internships" className="flex items-center gap-2">
                    <BriefcaseBusiness className="h-4 w-4" />
                    Find Internships
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>

          <AuthButtons />
          <ThemSwitch />
        </div>
      </nav>
    </header>
  );
}
