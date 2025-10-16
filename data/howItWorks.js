import {
  LayoutDashboard,
  Target,
  BookOpen,
  Building,
  MessageSquare,
  FileText,
  PenTool,
  CheckCircle,
  Search
} from "lucide-react";

export const howItWorks = [
  {
    title: "1. Industry Dashboard",
    description: "Get personalized insights and analytics about your career progress and industry trends.",
    icon: <LayoutDashboard className="w-8 h-8 text-primary" />,
    link: "/dashboard"
  },
  {
    title: "2. Roadmap Generator",
    description: "Create personalized career roadmaps with AI-powered guidance and milestone tracking.",
    icon: <Target className="w-8 h-8 text-primary" />,
    link: "/roadmap"
  },
  {
    title: "3. Course Recommendation",
    description: "Get AI-driven course recommendations to bridge skill gaps and advance your career.",
    icon: <BookOpen className="w-8 h-8 text-primary" />,
    link: "/course-recommendation"
  },
  {
    title: "4. Internships",
    description: "Discover and prepare for internships that align with your career goals and skill development.",
    icon: <Building className="w-8 h-8 text-primary" />,
    link: "/internships"
  },
  {
    title: "5. Interview Preparation",
    description: "Practice with AI-driven mock interviews and get constructive feedback to excel.",
    icon: <MessageSquare className="w-8 h-8 text-primary" />,
    link: "/interview"
  },
  {
    title: "6. Resume Building",
    description: "Create ATS-optimized resumes that get noticed by recruiters and hiring managers.",
    icon: <FileText className="w-8 h-8 text-primary" />,
    link: "/resume"
  },
  {
    title: "7. Cover Letter Generation",
    description: "Generate compelling cover letters tailored to specific job applications.",
    icon: <PenTool className="w-8 h-8 text-primary" />,
    link: "/ai-cover-letter"
  },
  {
    title: "8. ATS Score",
    description: "Upload your resume to get detailed ATS compatibility feedback and improvement suggestions.",
    icon: <CheckCircle className="w-8 h-8 text-primary" />,
    link: "/ats-checker"
  },
  {
    title: "9. Job Matching",
    description: "Find perfect job opportunities that match your profile and career aspirations.",
    icon: <Search className="w-8 h-8 text-primary" />,
    link: "/job-matches"
  },
];
