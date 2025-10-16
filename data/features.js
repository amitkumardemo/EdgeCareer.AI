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

export const features = [
  {
    icon: <LayoutDashboard className="w-6 h-6 mb-4 text-gray-400" />,
    title: "1. Industry Dashboard",
    description: "Get personalized insights and analytics about your career progress and industry trends.",
    button: { text: "Get Started", link: "/dashboard" },
  },
  {
    icon: <Target className="w-6 h-6 mb-4 text-gray-400" />,
    title: "2. Roadmap Generator",
    description: "Create personalized career roadmaps with AI-powered guidance and milestone tracking.",
    button: { text: "Generate Roadmap", link: "/roadmap" },
  },
  {
    icon: <BookOpen className="w-6 h-6 mb-4 text-gray-400" />,
    title: "3. Course Recommendation",
    description: "Get AI-driven course recommendations to bridge skill gaps and advance your career.",
    button: { text: "Find Best Courses", link: "/course-recommendation" },
  },
  {
    icon: <Building className="w-6 h-6 mb-4 text-gray-400" />,
    title: "4. Internships",
    description: "Discover and prepare for internships that align with your career goals and skill development.",
    button: { text: "Find Best Internship", link: "/internships" },
  },
  {
    icon: <MessageSquare className="w-6 h-6 mb-4 text-gray-400" />,
    title: "5. Interview Preparation",
    description: "Practice with AI-driven mock interviews and get constructive feedback to excel.",
    button: { text: "Practice Now", link: "/interview" },
  },
  {
    icon: <FileText className="w-6 h-6 mb-4 text-gray-400" />,
    title: "6. Resume Building",
    description: "Create ATS-optimized resumes that get noticed by recruiters and hiring managers.",
    button: { text: "Build Your Resume", link: "/resume" },
  },
  {
    icon: <PenTool className="w-6 h-6 mb-4 text-gray-400" />,
    title: "7. Cover Letter Generation",
    description: "Generate compelling cover letters tailored to specific job applications.",
    button: { text: "Generate Cover Letter", link: "/ai-cover-letter" },
  },
  {
    icon: <CheckCircle className="w-6 h-6 mb-4 text-gray-400" />,
    title: "8. ATS Score",
    description: "Upload your resume to get detailed ATS compatibility feedback and improvement suggestions.",
    button: { text: "Check ATS Score", link: "/ats-checker" },
  },
  {
    icon: <Search className="w-6 h-6 mb-4 text-gray-400" />,
    title: "9. Job Matching",
    description: "Find perfect job opportunities that match your profile and career aspirations.",
    button: { text: "Find Jobs", link: "/job-matches" },
  },
];

export default features;
