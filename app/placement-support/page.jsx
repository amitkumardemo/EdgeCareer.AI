import React from "react";
import Header from "@/components/header";
import PlacementSupportClient from "./PlacementSupportClient";

export const metadata = {
  title: "Comprehensive Placement Support & Employability Readiness | TechieHelp Institute of AI",
  description: "TechieHelp Institute of AI provides comprehensive placement support through resume building, interview preparation, mock interviews, LinkedIn optimization, career guidance, and internship opportunities to help students launch successful careers.",
  keywords: [
    "Placement Support",
    "Placement Preparation",
    "Mock Interviews",
    "Resume Building Support",
    "LinkedIn Profile Optimization",
    "Career Guidance for Students",
    "Employability Readiness Training",
    "TechieHelp Institute of AI",
    "TechieHelp Placements"
  ],
};

export default function PlacementSupportPage() {
  return (
    <>
      <Header />
      <PlacementSupportClient />
    </>
  );
}
