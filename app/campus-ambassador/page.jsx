import React from "react";
import Header from "@/components/header";
import CampusAmbassadorClient from "./CampusAmbassadorClient";

export const metadata = {
  title: "Campus Ambassador Program 2026 | TechieHelp Institute of AI",
  description: "Become the Face of TechieHelp Institute of AI on your campus. Lead student communities, organize tech workshops, gain hands-on leadership skills, earn certificates & merchandise, and unlock priority internship opportunities.",
  keywords: [
    "Campus Ambassador Program",
    "TechieHelp Campus Ambassador",
    "Student Leader Program",
    "Microsoft Student Ambassadors alternative",
    "GitHub Campus Experts alternative",
    "GDSC alternative India",
    "College Student Representative",
    "Student Community Builder",
    "Leadership Certificate",
    "TechieHelp Institute of AI"
  ],
};

export default function CampusAmbassadorPage() {
  return (
    <>
      <Header />
      <CampusAmbassadorClient />
    </>
  );
}
