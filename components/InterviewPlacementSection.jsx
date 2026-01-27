"use client";

import DisplayCards from "@/components/ui/display-cards";
import { Users, FileText, Award, TrendingUp, Building } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InterviewPlacementSection() {
  const cards = [
    {
      icon: <Users className="size-4 text-blue-300" />,
      title: "AI Mock Interviews",
      description: "Practice with AI-powered interviews",
      date: "Available now",
      className: "[grid-area:stack] hover:-translate-y-12 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/30 opacity-90 hover:before:opacity-0 before:transition-opacity before:duration-700",
    },
    {
      icon: <FileText className="size-4 text-green-300" />,
      title: "ATS Resume Builder",
      description: "Optimize resumes for ATS systems",
      date: "Available now",
      className: "[grid-area:stack] translate-x-12 translate-y-8 hover:-translate-y-4 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/30 opacity-90 hover:before:opacity-0 before:transition-opacity before:duration-700",
    },
    {
      icon: <Award className="size-4 text-purple-300" />,
      title: "Cover Letter Generator",
      description: "AI-generated personalized cover letters",
      date: "Available now",
      className: "[grid-area:stack] translate-x-24 translate-y-16 hover:translate-y-4 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/30 opacity-90 hover:before:opacity-0 before:transition-opacity before:duration-700",
    },
    {
      icon: <TrendingUp className="size-4 text-orange-300" />,
      title: "Interview Analytics",
      description: "Track performance and improvement",
      date: "Available now",
      className: "[grid-area:stack] translate-x-36 translate-y-24 hover:translate-y-12 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/30 opacity-90 hover:before:opacity-0 before:transition-opacity before:duration-700",
    },
    {
      icon: <Building className="size-4 text-red-300" />,
      title: "Company-wise Prep",
      description: "Tailored preparation for specific companies",
      date: "Available now",
      className: "[grid-area:stack] translate-x-48 translate-y-32 hover:translate-y-20 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/30 opacity-90 hover:before:opacity-0 before:transition-opacity before:duration-700",
    },
  ];

  return (
    <section className="w-full py-12 md:py-16 pb-20 md:pb-8 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side: Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Interview & Placement Readiness
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto lg:mx-0">
              AI-powered tools to prepare, practice, and succeed in interviews.
            </p>
            <ul className="space-y-2 mb-6 text-left max-w-md mx-auto lg:mx-0">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                <span>AI Mock Interviews</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                <span>ATS Resume Builder</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                <span>Cover Letter Generator</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                <span>Interview Performance Analytics</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                <span>Company-wise Preparation</span>
              </li>
            </ul>
            <Button size="lg" className="px-8">
              Enroll Now
            </Button>
          </div>

          {/* Right Side: Animation */}
          <div className="flex justify-center lg:justify-center">
            <div className="flex items-center justify-center min-h-[300px] w-full">
              <DisplayCards cards={cards} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
