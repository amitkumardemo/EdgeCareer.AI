import React from "react";
import Header from "@/components/header";
import CampusPartnershipClient from "./CampusPartnershipClient";

export const metadata = {
  title: "Campus Partnership Program | TechieHelp Institute of AI",
  description: "Partner with TechieHelp Institute of AI to provide students with practical skills, industry exposure, professional certifications, internships, workshops, and career opportunities.",
  keywords: [
    "Campus Partnership Program",
    "TechieHelp Campus Partnership",
    "College Collaborations",
    "TPO Collaborations India",
    "Skill Development for Colleges",
    "Coursera for Campus alternative",
    "Microsoft Learn for Educators alternative",
    "Student Placement Readiness",
    "MoU for Internship Programs",
    "TechieHelp Institute of AI"
  ],
};

export default function CampusPartnershipPage() {
  return (
    <>
      <Header />
      <CampusPartnershipClient />
    </>
  );
}
