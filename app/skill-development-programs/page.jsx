import React from "react";
import Header from "@/components/header";
import SkillDevelopmentClient from "./SkillDevelopmentClient";

export const metadata = {
  title: "Industry-Ready Skill Development Programs | TechieHelp Institute of AI",
  description: "TechieHelp Institute of AI offers industry-focused skill development programs designed to bridge the gap between academics and real-world careers through practical learning, projects, internships, and certifications.",
  keywords: [
    "Skill Development Programs",
    "TechieHelp Skill Development",
    "AI & ML Training India",
    "Full Stack Web Development Program",
    "Data Science Career Track",
    "College Student Up-skilling",
    "Professional Certifications for Students",
    "TechieHelp Institute of AI",
    "Placement Preparation Programs"
  ],
};

export default function SkillDevelopmentPage() {
  return (
    <>
      <Header />
      <SkillDevelopmentClient />
    </>
  );
}
