"use client";

import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { ArrowRight, FileText, Video, BarChart3, Briefcase, Stars } from "lucide-react";
import Image from "next/image";

const FEATURES = [
  {
    icon: FileText,
    title: "AI Resume Builder",
    desc: "Generate ATS-optimized, job-ready resumes in minutes using cutting-edge AI.",
  },
  {
    icon: Video,
    title: "AI Mock Interviews",
    desc: "Practice with real-time AI feedback and master any interview with confidence.",
  },
  {
    icon: BarChart3,
    title: "Placement & Internship Portal",
    desc: "Work on live industry projects, earn verified credentials, and apply for internships.",
  },
  {
    icon: Briefcase,
    title: "Placement Preparation",
    desc: "Access AI coding practice, LinkedIn optimization, and step-by-step career roadmaps.",
  },
];

// Password strength helper
const getStrength = (pwd) => {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
};
const strengthMeta = [
  { label: "", color: "transparent" },
  { label: "Weak", color: "#ef4444" },
  { label: "Fair", color: "#f59e0b" },
  { label: "Good", color: "#3b82f6" },
  { label: "Strong", color: "#22c55e" },
];

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUpWithEmail, signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signUpWithEmail(email, password, name);
      toast.success("Account created successfully!");
      router.push("/onboarding");
    } catch (error) {
      toast.error(error.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("Successfully signed up with Google!");
      router.push("/onboarding");
    } catch (error) {
      toast.error(error.message || "Failed to sign up with Google");
    }
  };

  const strength = getStrength(password);
  const { label: sLabel, color: sColor } = strengthMeta[strength];

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-50">
      {/* ── LEFT: Brand & Platform Vision ── */}
      <div className="hidden lg:flex flex-col justify-center flex-1 px-14 py-16 bg-gradient-to-br from-blue-50/80 via-white to-amber-50/80 border-r border-slate-200/60">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 mb-12 group">
          <Image src="/thp logo.png" alt="TechieHelp Logo" width={400} height={120} className="h-20 sm:h-28 w-auto object-contain" priority />
        </Link>

        {/* Badge */}
        <div className="mb-3">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-600 mb-4 bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-full">
            <Stars className="h-3.5 w-3.5 text-amber-500" /> AI-Powered Career Platform
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl xl:text-5xl font-extrabold text-blue-950 leading-[1.15] tracking-tight mb-5">
          Build Your Future<br />
          <span className="bg-gradient-to-r from-blue-950 via-blue-900 to-amber-500 bg-clip-text text-transparent">
            with AI Career Tools
          </span>
        </h1>
        <p className="text-slate-600 text-base leading-relaxed mb-10 max-w-md">
          TechieHelp helps students and institutions bridge the gap between academic learning and industry expectations with project-based internships and smart placement preparation.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 gap-4 max-w-md">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3 group">
              <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                <Icon className="h-4 w-4 text-blue-950" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{title}</p>
                <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-10 flex items-center gap-6 border-t border-slate-200/60 pt-8">
          <div className="text-center">
            <p className="text-2xl font-extrabold text-slate-900">5000+</p>
            <p className="text-xs text-slate-500 mt-0.5">Students Trained</p>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div className="text-center">
            <p className="text-2xl font-extrabold text-slate-900">95%</p>
            <p className="text-xs text-slate-500 mt-0.5">Completion Rate</p>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div className="text-center">
            <p className="text-2xl font-extrabold text-slate-900">Free</p>
            <p className="text-xs text-slate-500 mt-0.5">To Get Started</p>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Sign-Up Form ── */}
      <div className="flex flex-col items-center justify-center flex-1 px-6 py-16 bg-white min-h-screen">
        {/* Mobile logo */}
        <div className="flex flex-col items-center mb-8 lg:hidden">
          <Image src="/thp logo.png" alt="TechieHelp Logo" width={300} height={90} className="h-16 sm:h-20 w-auto object-contain mb-2" />
        </div>

        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Create your free account</h2>
            <p className="text-sm text-slate-500 mt-1">Start your AI-powered career journey today — no credit card needed.</p>
          </div>

          {/* Google */}
          <Button
            variant="outline"
            onClick={handleGoogleSignIn}
            className="w-full h-11 border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium mb-5 transition-all shadow-sm"
          >
            <FcGoogle className="mr-2 h-5 w-5" />
            Sign Up with Google
          </Button>

          {/* Divider */}
          <div className="relative flex items-center gap-3 mb-5">
            <span className="flex-1 border-t border-slate-200" />
            <span className="text-[11px] text-slate-400 uppercase tracking-widest">or</span>
            <span className="flex-1 border-t border-slate-200" />
          </div>

          {/* Form */}
          <form onSubmit={handleEmailSignUp} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Rahul Sharma"
                className="bg-white border-slate-200 h-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-950 focus:ring-1 focus:ring-blue-950"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="bg-white border-slate-200 h-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-950 focus:ring-1 focus:ring-blue-950"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Min 8 characters"
                className="bg-white border-slate-200 h-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-950 focus:ring-1 focus:ring-blue-950"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* Strength bar */}
              {password.length > 0 && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{ background: i <= strength ? sColor : "rgba(15,23,42,0.08)" }}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold" style={{ color: sColor }}>{sLabel}</span>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-11 text-sm font-bold mt-1 bg-blue-950 text-white hover:bg-blue-900 shadow-lg shadow-blue-950/10 hover:scale-[1.01] active:scale-95 transition-all"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  Create Account <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-slate-500 mt-6">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-amber-500 hover:text-amber-600 font-semibold hover:underline underline-offset-4">
              Sign In
            </Link>
          </p>

          {/* Trust row */}
          <div className="flex items-center justify-center gap-5 mt-8 pt-6 border-t border-slate-100">
            {["🔒 Secure", "🛡️ Protected", "✅ Free to Start"].map((t) => (
              <span key={t} className="text-[11px] text-slate-400">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
