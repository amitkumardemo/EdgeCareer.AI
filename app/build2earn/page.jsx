import React from "react";
import Header from "@/components/header";
import Build2EarnClient from "./Build2EarnClient";

export const metadata = {
  title: "Build2Earn — 3-Month Practical Career Program for College Students | TechieHelp",
  description: "Build2Earn is a practical 3-month career program for 1st & 2nd year college students covering LinkedIn, GitHub, portfolio building, real projects, AI productivity, freelancing, and open source.",
  keywords: [
    "Build2Earn",
    "TechieHelp Institute of AI",
    "College Career Program",
    "LinkedIn Profile Optimization for Students",
    "GitHub Portfolio for College Students",
    "3 Month Practical Internship",
    "Web Development Program",
    "AI Training for College Students",
    "Data Science Training",
    "Jodhpur Internship Program"
  ]
};

export default function Build2EarnPage() {
  return (
    <>
      <Header />
      <Build2EarnClient />
    </>
  );
}
