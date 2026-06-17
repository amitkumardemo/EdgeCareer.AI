import Header from "@/components/header";
import LandingPage from "./LandingPage";

export const metadata = {
  title: "TechieHelp Institute of AI - AI-Powered Resume Builder & Internships",
  description: "Accelerate your career with TechieHelp Institute of AI. Build one-page ATS-friendly resumes, scan ATS compatibility score, practice AI mock interviews, follow DSA roadmaps, and land real-world software development internships.",
  keywords: [
    "TechieHelp Institute of AI",
    "TechieHelp AI",
    "Amit Kumar TechieHelp",
    "AI Resume Builder",
    "Free ATS Resume Checker",
    "Next.js Mock Interview",
    "Software Developer Internships",
    "Placement Preparation Tool",
    "Data Science Training India",
    "Web Development Internships",
    "College Placement Dashboard",
    "ATS Scanner Free Online",
    "DSA hint solver"
  ],
};

export default function Home() {
  return (
    <>
      <Header />
      <LandingPage />
    </>
  );
}
