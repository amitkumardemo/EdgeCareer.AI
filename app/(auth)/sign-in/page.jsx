"use client";

import { useState, Suspense } from "react";
import { useAuth } from "@/context/auth-context";
import { getUserRole, logLoginActivity } from "@/actions/auth";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { ArrowRight, FileText, Mic, BarChart3, Briefcase, CheckCircle2, Stars } from "lucide-react";
import Image from "next/image";

const FEATURES = [
  {
    icon: FileText,
    title: "AI Resume Builder",
    desc: "Generate ATS-optimized, job-ready resumes in minutes using cutting-edge AI.",
  },
  {
    icon: Mic,
    title: "AI Mock Interviews",
    desc: "Practice with real-time AI feedback and master any interview with confidence.",
  },
  {
    icon: BarChart3,
    title: "Career Readiness Dashboard",
    desc: "Track your skill growth, streak, and placement readiness in one smart dashboard.",
  },
  {
    icon: Briefcase,
    title: "Placement & Internship Portal",
    desc: "Discover curated internships and latest job openings matched to your profile.",
  },
];

function SignInContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signInWithEmail, signInWithGoogle } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url") || "/dashboard";

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const credential = await signInWithEmail(email, password);
      // Set session cookie immediately before navigation so middleware sees it
      const token = await credential.user.getIdToken();
      const userData = await getUserRole(credential.user.uid);
      
      document.cookie = `__session=${token}; path=/; max-age=3600; SameSite=Lax`;
      if (userData?.role) {
        document.cookie = `__user_role=${userData.role}; path=/; max-age=3600; SameSite=Lax`;
      } else {
        document.cookie = "__user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }

      await logLoginActivity(userData?.id);

      // Determine redirect URL based on role
      let finalRedirect = redirectUrl;
      if (redirectUrl === "/dashboard" || redirectUrl === "/internship") {
        if (userData?.role === "ADMIN") finalRedirect = "/internship/admin/dashboard";
        else if (userData?.role === "TPO") finalRedirect = "/internship/college/dashboard";
        else if (userData?.role === "STUDENT") {
          finalRedirect = userData?.onboardingCompleted ? "/internship/student/dashboard" : "/onboarding";
        }
      }

      toast.success("Successfully signed in!");
      router.push(finalRedirect);
    } catch (error) {
      toast.error(error.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const credential = await signInWithGoogle();
      // Set session cookie immediately before navigation so middleware sees it
      const token = await credential.user.getIdToken();
      const userData = await getUserRole(credential.user.uid);

      document.cookie = `__session=${token}; path=/; max-age=3600; SameSite=Lax`;
      if (userData?.role) {
        document.cookie = `__user_role=${userData.role}; path=/; max-age=3600; SameSite=Lax`;
      } else {
        document.cookie = "__user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }

      await logLoginActivity(userData?.id);

      // Determine redirect URL based on role
      let finalRedirect = redirectUrl;
      if (redirectUrl === "/dashboard" || redirectUrl === "/internship") {
        if (userData?.role === "ADMIN") finalRedirect = "/internship/admin/dashboard";
        else if (userData?.role === "TPO") finalRedirect = "/internship/college/dashboard";
        else if (userData?.role === "STUDENT") {
          finalRedirect = userData?.onboardingCompleted ? "/internship/student/dashboard" : "/onboarding";
        }
      }

      toast.success("Successfully signed in with Google!");
      router.push(finalRedirect);
    } catch (error) {
      toast.error(error.message || "Failed to sign in with Google");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">
      {/* ── LEFT: Brand & Platform Vision ── */}
      <div className="hidden lg:flex flex-col justify-center flex-1 px-14 py-16 bg-gradient-to-br from-[#0a0f1e] via-[#0d1226] to-[#070d1a] border-r border-white/5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 mb-12 group">
          <Image src="/skill.png" alt="TechieHelp Institute of AI" width={44} height={44} className="object-contain" />
          <span className="text-white font-bold text-lg leading-tight">
            TechieHelp<br />
            <span className="text-primary text-sm font-semibold">Institute of AI</span>
          </span>
        </Link>

        {/* Headline */}
        <div className="mb-3">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary/80 mb-4 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
            <Stars className="h-3.5 w-3.5" /> AI-Powered Career Platform
          </span>
        </div>
        <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-[1.15] tracking-tight mb-5">
          Your All-in-One<br />
          <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            AI Career Launchpad
          </span>
        </h1>
        <p className="text-gray-400 text-base leading-relaxed mb-10 max-w-md">
          TechieHelp Institute of AI helps students and freshers crack placements with smart AI tools — from resume building to mock interviews, all in one place.
        </p>

        {/* Feature list */}
        <div className="grid grid-cols-1 gap-4 max-w-md">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3 group">
              <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof */}
        <div className="mt-10 flex items-center gap-6 border-t border-white/5 pt-8">
          <div className="text-center">
            <p className="text-2xl font-extrabold text-white">10K+</p>
            <p className="text-xs text-gray-500 mt-0.5">Students Placed</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
            <p className="text-2xl font-extrabold text-white">95%</p>
            <p className="text-xs text-gray-500 mt-0.5">ATS Pass Rate</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
            <p className="text-2xl font-extrabold text-white">500+</p>
            <p className="text-xs text-gray-500 mt-0.5">Partner Companies</p>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Sign-In Form ── */}
      <div className="flex flex-col items-center justify-center flex-1 px-6 py-16 bg-[#030712] min-h-screen">
        {/* Mobile logo */}
        <div className="flex flex-col items-center mb-8 lg:hidden">
          <Image src="/skill.png" alt="TechieHelp Logo" width={50} height={50} className="object-contain mb-2" />
          <span className="text-white font-bold text-base">TechieHelp Institute of AI</span>
        </div>

        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white tracking-tight">Sign in to your account</h2>
            <p className="text-sm text-gray-500 mt-1">Welcome back — continue your career journey.</p>
          </div>

          {/* Google */}
          <Button
            variant="outline"
            onClick={handleGoogleSignIn}
            className="w-full h-11 border-white/15 bg-white/4 hover:bg-white/8 text-white text-sm font-medium mb-5 transition-all"
          >
            <FcGoogle className="mr-2 h-5 w-5" />
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="relative flex items-center gap-3 mb-5">
            <span className="flex-1 border-t border-white/8" />
            <span className="text-[11px] text-gray-600 uppercase tracking-widest">or</span>
            <span className="flex-1 border-t border-white/8" />
          </div>

          {/* Form */}
          <form onSubmit={handleEmailSignIn} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="bg-white/5 border-white/10 h-10 text-sm text-white placeholder:text-gray-600 focus:border-primary focus:ring-1 focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-white/5 border-white/10 h-10 text-sm text-white placeholder:text-gray-600 focus:border-primary focus:ring-1 focus:ring-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 text-sm font-bold mt-1 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing In...
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  Sign In <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-gray-600 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-primary font-semibold hover:underline underline-offset-4">
              Sign Up Free
            </Link>
          </p>

          {/* Trust row */}
          <div className="flex items-center justify-center gap-5 mt-8 pt-6 border-t border-white/5">
            {["🔒 Secure", "🛡️ Protected", "✅ Trusted"].map((t) => (
              <span key={t} className="text-[11px] text-gray-700">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen w-full flex items-center justify-center bg-[#030712]">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SignInContent />
    </Suspense>
  );
}
