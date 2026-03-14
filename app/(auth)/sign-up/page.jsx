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
import { ArrowRight, FileText, Mic, BarChart3, Briefcase, Stars } from "lucide-react";
import Image from "next/image";

const FEATURES = [
  {
    icon: FileText,
    title: "AI Resume Builder & ATS Checker",
    desc: "Build job-winning resumes and check ATS scores in real time.",
  },
  {
    icon: Mic,
    title: "AI Mock Interviews",
    desc: "Practice technical and HR interviews with intelligent AI feedback.",
  },
  {
    icon: BarChart3,
    title: "Skill & Career Analytics",
    desc: "See exactly where you stand and what you need to land your dream role.",
  },
  {
    icon: Briefcase,
    title: "Internship & Job Portal",
    desc: "Explore real internships and jobs curated for your domain and skills.",
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
    <div className="min-h-screen w-full flex flex-col lg:flex-row">
      {/* ── LEFT: Brand & Platform Vision ── */}
      <div className="hidden lg:flex flex-col justify-center flex-1 px-14 py-16 bg-gradient-to-br from-[#0a0f1e] via-[#0d1226] to-[#070d1a] border-r border-white/5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 mb-12">
          <Image src="/skill.png" alt="TechieHelp Institute of AI" width={44} height={44} className="object-contain" />
          <span className="text-white font-bold text-lg leading-tight">
            TechieHelp<br />
            <span className="text-primary text-sm font-semibold">Institute of AI</span>
          </span>
        </Link>

        {/* Badge */}
        <div className="mb-3">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary/80 mb-4 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
            <Stars className="h-3.5 w-3.5" /> India's #1 AI Career Platform
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-[1.15] tracking-tight mb-5">
          Build Your Future<br />
          <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            with AI Career Tools
          </span>
        </h1>
        <p className="text-gray-400 text-base leading-relaxed mb-10 max-w-md">
          We help engineering students, freshers and job seekers prepare smarter — with AI-powered tools for resumes, mock interviews, skill analytics, and job placement support.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 gap-4 max-w-md">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
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

        {/* Stats */}
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
            <p className="text-2xl font-extrabold text-white">Free</p>
            <p className="text-xs text-gray-500 mt-0.5">To Get Started</p>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Sign-Up Form ── */}
      <div className="flex flex-col items-center justify-center flex-1 px-6 py-16 bg-[#030712] min-h-screen">
        {/* Mobile logo */}
        <div className="flex flex-col items-center mb-8 lg:hidden">
          <Image src="/skill.png" alt="TechieHelp Logo" width={50} height={50} className="object-contain mb-2" />
          <span className="text-white font-bold text-base">TechieHelp Institute of AI</span>
        </div>

        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white tracking-tight">Create your free account</h2>
            <p className="text-sm text-gray-500 mt-1">Start your AI-powered career journey today — no credit card needed.</p>
          </div>

          {/* Google */}
          <Button
            variant="outline"
            onClick={handleGoogleSignIn}
            className="w-full h-11 border-white/15 bg-white/4 hover:bg-white/8 text-white text-sm font-medium mb-5 transition-all"
          >
            <FcGoogle className="mr-2 h-5 w-5" />
            Sign Up with Google
          </Button>

          {/* Divider */}
          <div className="relative flex items-center gap-3 mb-5">
            <span className="flex-1 border-t border-white/8" />
            <span className="text-[11px] text-gray-600 uppercase tracking-widest">or</span>
            <span className="flex-1 border-t border-white/8" />
          </div>

          {/* Form */}
          <form onSubmit={handleEmailSignUp} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Rahul Sharma"
                className="bg-white/5 border-white/10 h-10 text-sm text-white placeholder:text-gray-600 focus:border-primary focus:ring-1 focus:ring-primary"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
                placeholder="Min 8 characters"
                className="bg-white/5 border-white/10 h-10 text-sm text-white placeholder:text-gray-600 focus:border-primary focus:ring-1 focus:ring-primary"
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
                        style={{ background: i <= strength ? sColor : "rgba(255,255,255,0.07)" }}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold" style={{ color: sColor }}>{sLabel}</span>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-11 text-sm font-bold mt-1 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all"
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
          <p className="text-center text-xs text-gray-600 mt-6">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-primary font-semibold hover:underline underline-offset-4">
              Sign In
            </Link>
          </p>

          {/* Trust row */}
          <div className="flex items-center justify-center gap-5 mt-8 pt-6 border-t border-white/5">
            {["🔒 Secure", "🛡️ Protected", "✅ Free to Start"].map((t) => (
              <span key={t} className="text-[11px] text-gray-700">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
