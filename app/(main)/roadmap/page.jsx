"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import RoadmapGenerator from "./_components/roadmap-generator";
import {
  Target,
  TrendingUp,
  Users,
  BookOpen,
  Award,
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
  Sparkles,
  Zap,
  Trophy
} from "lucide-react";

export default function RoadmapPage() {
  const [showGenerator, setShowGenerator] = useState(false);

  const stats = [
    { icon: Users, label: "Active Learners", value: "10,000+", color: "text-blue-400" },
    { icon: Target, label: "Roadmaps Generated", value: "50,000+", color: "text-emerald-400" },
    { icon: Award, label: "Success Rate", value: "95%", color: "text-purple-400" },
    { icon: Clock, label: "Avg. Completion", value: "6 months", color: "text-orange-400" }
  ];

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Personalization",
      description: "Get customized roadmaps based on your current skills, target role, and timeline preferences."
    },
    {
      icon: TrendingUp,
      title: "Industry-Relevant Skills",
      description: "Stay ahead with roadmaps that include the latest technologies and industry trends."
    },
    {
      icon: BookOpen,
      title: "Structured Learning Path",
      description: "Follow a clear, step-by-step progression from beginner to expert level."
    },
    {
      icon: Trophy,
      title: "Achievement Tracking",
      description: "Monitor your progress and celebrate milestones along your career journey."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Frontend Developer",
      company: "TechCorp",
      content: "The AI roadmap helped me transition from marketing to tech in just 8 months. The personalized guidance was incredible!",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "Data Scientist",
      company: "DataFlow Inc",
      content: "The structured approach and resource recommendations saved me countless hours of research. Highly recommended!",
      rating: 5
    },
    {
      name: "Priya Patel",
      role: "Product Manager",
      company: "InnovateLabs",
      content: "From complete beginner to PM in 6 months. The roadmap was my roadmap to success!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden px-4">
        {/* Deep Mesh Gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[140px] -mr-40 -mt-40 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[140px] -ml-40 -mb-40" />

        <div className="relative max-w-7xl mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Badge variant="outline" className="mb-8 px-6 py-2 rounded-full border-blue-500/30 bg-blue-500/5 text-blue-400 font-bold uppercase tracking-widest text-[10px]">
               🚀 AI-Powered Career Acceleration
            </Badge>
            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.95] lg:leading-[0.9]">
              Your Career
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 drop-shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                Roadmap Awaits
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
              Transform your career with personalized AI-generated roadmaps. From beginner to expert,
              get a clear path to your dream job with industry-leading guidance and resources.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24"
          >
            <Button
              size="lg"
              onClick={() => setShowGenerator(true)}
              className="h-16 px-12 rounded-[24px] bg-white text-black text-lg font-black hover:bg-blue-400 transition-all shadow-[0_20px_40px_-15px_rgba(255,255,255,0.2)] group"
            >
              <Target className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
              Generate My Roadmap
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-16 px-10 rounded-[24px] border-white/10 bg-white/5 backdrop-blur-xl text-lg font-black hover:bg-white/10 transition-all text-white"
            >
              <BookOpen className="mr-3 h-5 w-5" />
              View Examples
            </Button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-2xl hover:border-white/20 hover:scale-[1.05] transition-all duration-500 group"
              >
                <stat.icon className={`h-8 w-8 mx-auto mb-4 ${stat.color} group-hover:scale-110 transition-transform`} />
                <div className="text-4xl font-black mb-1">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-black">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-white/[0.02] border-y border-white/5 relative px-4">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Why Choose Our Roadmap Generator?</h2>
            <p className="text-muted-foreground uppercase tracking-[0.4em] font-bold text-xs">
              Experience the future of career development with cutting-edge AI technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-white/10 bg-white/5 backdrop-blur-2xl hover:border-blue-500/30 hover:bg-white/[0.08] transition-all duration-500 group rounded-[40px] overflow-hidden">
                  <CardContent className="p-10 text-center flex flex-col justify-between h-full">
                    <div className="relative mb-8">
                       <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                       <feature.icon className="h-12 w-12 mx-auto relative z-10 text-blue-400 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black mb-4 tracking-tight">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 relative px-4">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Success Stories</h2>
            <p className="text-muted-foreground uppercase tracking-[0.4em] font-bold text-xs">
              Real people, real results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-white/5 border-white/10 backdrop-blur-2xl rounded-[40px] hover:border-emerald-500/30 transition-all duration-500 shadow-2xl">
                  <CardContent className="p-10">
                    <div className="flex mb-8 gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-emerald-400 fill-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                      ))}
                    </div>
                    <p className="text-lg font-medium mb-10 leading-relaxed italic text-white/90 font-medium">"{testimonial.content}"</p>
                    <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg">
                         {testimonial.name[0]}
                      </div>
                      <div>
                        <div className="font-black text-lg tracking-tight">{testimonial.name}</div>
                        <div className="text-[10px] uppercase tracking-widest font-bold text-blue-400">
                          {testimonial.role} at {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 overflow-hidden">
        <div className="max-w-4xl mx-auto relative group">
          <Card className="border-none bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 backdrop-blur-3xl rounded-[48px] overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-white/[0.02]" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700" />
            
            <CardContent className="p-16 lg:p-24 text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter text-white">
                  Ready to Transform Your Career?
                </h2>
                <p className="text-xl text-blue-100/70 mb-12 max-w-2xl mx-auto font-medium">
                  Join thousands of professionals who have accelerated their careers with our AI-powered roadmap generator.
                </p>
                <Button
                  size="lg"
                  onClick={() => setShowGenerator(true)}
                  className="h-20 px-16 rounded-[32px] bg-white text-blue-600 text-2xl font-black hover:bg-gray-100 transition-all shadow-[0_30px_60px_-15px_rgba(59,130,246,0.3)] hover:scale-105 active:scale-95 group"
                >
                  <Zap className="mr-3 h-8 w-8 text-blue-600 group-hover:rotate-12 transition-transform" />
                  Start Your Journey Now
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Generator Modal */}
      {showGenerator && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-2xl z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={() => setShowGenerator(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="bg-zinc-950 border border-white/10 rounded-[40px] shadow-[0_0_80px_rgba(0,0,0,1)] max-w-5xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-20 p-10 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-blue-500/10 rounded-2xl">
                    <Target className="h-6 w-6 text-blue-400" />
                 </div>
                 <h2 className="text-3xl font-black tracking-tight uppercase tracking-widest">Generate Your Roadmap</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowGenerator(false)}
                className="rounded-full h-12 w-12 hover:bg-white/10 text-muted-foreground hover:text-white"
              >
                ✕
              </Button>
            </div>
            <div className="p-10">
              <RoadmapGenerator />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
