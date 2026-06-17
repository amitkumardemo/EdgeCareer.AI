import React from "react";
import Header from "@/components/header";
import InstitutionalCollaborationsClient from "./InstitutionalCollaborationsClient";

export const metadata = {
  title: "Institutional Collaborations & Academic Partnerships | TechieHelp Institute of AI",
  description: "TechieHelp Institute of AI collaborates with colleges, universities, training institutions, student communities, and industry partners to deliver skill development, internships, workshops, certifications, and innovation-driven learning experiences.",
  keywords: [
    "Institutional Collaborations",
    "Academic Partnerships",
    "College Collaborations",
    "University MoUs",
    "TPO Partnerships",
    "TechieHelp Collaborations",
    "Student Communities Partnerships",
    "TechieHelp Institute of AI"
  ],
};

export default function InstitutionalCollaborationsPage() {
  return (
    <>
      <Header />
      <InstitutionalCollaborationsClient />
    </>
  );
}
