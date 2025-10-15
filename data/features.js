import {
  BrainCircuit,
  Briefcase,
  LineChart,
  ScrollText,
  FileText,
  ShieldCheck,
  Edit3,
  Mic,
  BarChart3,
  Upload,
  Users,
  BriefcaseBusiness
} from "lucide-react";

export const features = [
  {
    icon: <BrainCircuit className="w-6 h-6 mb-4 text-gray-400" />,
    title: "Step 1: AI-Powered Career Guidance",
    description:
      "Start by creating your profile and getting AI-driven career path recommendations tailored to your skills and goals.",
    button: { text: "Get Started", link: "/dashboard" },
  },
  {
    icon: <ScrollText className="w-6 h-6 mb-4 text-gray-400" />,
    title: "Step 2: Build Smart Resume & Cover Letter",
    description: "Create ATS-optimized resumes and compelling cover letters that get noticed by recruiters.",
    button: { text: "Build Your Resume", link: "/resume" },
  },
  {
    icon: <ShieldCheck className="w-6 h-6 mb-4 text-gray-400" />,
    title: "Step 3: Optimize with ATS Score Check",
    description: "Upload your resume to get detailed feedback and improve your chances of getting past ATS filters.",
    button: { text: "Check ATS Score", link: "/ats-checker" },
  },
  {
    icon: <Upload className="w-6 h-6 mb-4 text-gray-400" />,
    title: "Step 4: Skill Enhancement Courses",
    description: "Get personalized course recommendations to bridge skill gaps and advance your career.",
    button: { text: "Find Best Courses", link: "/course-recommendation" },
  },
  {
    icon: <Mic className="w-6 h-6 mb-4 text-gray-400" />,
    title: "Step 5: Practice with Mock Interviews",
    description: "Hone your interview skills with AI-driven mock interviews and get constructive feedback.",
    button: { text: "Practice Now", link: "/interview" },
  },
  {
    icon: <BarChart3 className="w-6 h-6 mb-4 text-gray-400" />,
    title: "Step 6: Generate Career Roadmap",
    description: "Create personalized career roadmaps with AI-powered guidance, skill development plans, and milestone tracking.",
    button: { text: "Generate Roadmap", link: "/roadmap" },
  },
  {
    icon: <Upload className="w-6 h-6 mb-4 text-gray-400" />,
    title: "Step 7: Find Perfect Job Matches",
    description: "Get AI-recommended job opportunities that match your profile and career aspirations.",
    button: { text: "Find Jobs", link: "/latest-jobs" },
  },
  {
    icon: <Users className="w-6 h-6 mb-4 text-gray-400" />,
    title: "Step 8: Secure Your Dream Internship",
    description: "Discover and prepare for internships that align with your career goals and skill development.",
    button: { text: "Find Best Internship", link: "/internships" },
  },
];

export default features;
