import {
  BrainCircuit,
  ScrollText,
  ShieldCheck,
  Upload,
  Mic,
  BarChart3,
  BriefcaseBusiness,
  Users
} from "lucide-react";

export const howItWorks = [
  {
    title: "Step 1: AI-Powered Career Guidance",
    description: "Start by creating your profile and getting AI-driven career path recommendations tailored to your skills and goals.",
    icon: <BrainCircuit className="w-8 h-8 text-primary" />,
  },
  {
    title: "Step 2: Build Smart Resume & Cover Letter",
    description: "Create ATS-optimized resumes and compelling cover letters that get noticed by recruiters.",
    icon: <ScrollText className="w-8 h-8 text-primary" />,
  },
  {
    title: "Step 3: Optimize with ATS Score Check",
    description: "Upload your resume to get detailed feedback and improve your chances of getting past ATS filters.",
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
  },
  {
    title: "Step 4: Skill Enhancement Courses",
    description: "Get personalized course recommendations to bridge skill gaps and advance your career.",
    icon: <Upload className="w-8 h-8 text-primary" />,
  },
  {
    title: "Step 5: Practice with Mock Interviews",
    description: "Hone your interview skills with AI-driven mock interviews and get constructive feedback.",
    icon: <Mic className="w-8 h-8 text-primary" />,
  },
  {
    title: "Step 6: Generate Career Roadmap",
    description: "Create personalized career roadmaps with AI-powered guidance, skill development plans, and milestone tracking.",
    icon: <BarChart3 className="w-8 h-8 text-primary" />,
  },
  {
    title: "Step 7: Find Perfect Job Matches",
    description: "Get AI-recommended job opportunities that match your profile and career aspirations.",
    icon: <BriefcaseBusiness className="w-8 h-8 text-primary" />,
  },
  {
    title: "Step 8: Secure Your Dream Internship",
    description: "Discover and prepare for internships that align with your career goals and skill development.",
    icon: <Users className="w-8 h-8 text-primary" />,
  },
];
