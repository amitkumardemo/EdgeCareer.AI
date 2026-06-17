import React from "react";
import Header from "@/components/header";
import WorkshopsSeminarsClient from "./WorkshopsSeminarsClient";

export const metadata = {
  title: "AI & Technology Workshops & Seminars | TechieHelp Institute of AI",
  description: "Empower students with industry-focused AI & technology workshops. TechieHelp Institute of AI conducts hands-on bootcamps, seminars, and expert sessions to help institutions stay ahead.",
  keywords: [
    "AI Workshops for Colleges",
    "Technology Seminars India",
    "Generative AI Bootcamps",
    "Machine Learning Workshops",
    "Cyber Security Seminars",
    "Data Science Training for Students",
    "TechieHelp Workshops",
    "College Guest Lectures AI",
    "Faculty Development Programs AI",
    "TechieHelp Institute of AI"
  ],
};

export default function WorkshopsSeminarsPage() {
  return (
    <>
      <Header />
      <WorkshopsSeminarsClient />
    </>
  );
}
