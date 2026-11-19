import React from "react";
import CampusInnovationClubClient from "./CampusInnovationClubClient";

export const metadata = {
  title: "TechieHelp Campus Innovation Club | Student Technology, AI & Entrepreneurship Hub",
  description:
    "Join or establish a TechieHelp Campus Innovation Club at your college. An institutional ecosystem powered by TechieHelp offering weekly AI workshops, bootcamps, coding hackathons, student leadership, internships, and placement preparation.",
  keywords: [
    "TechieHelp Campus Innovation Club",
    "Campus Innovation Club",
    "College Innovation Hub",
    "Student Technology Community",
    "College MoU Technical Partnership",
    "AI Workshops for Colleges",
    "Campus Coding Hackathon India",
    "Student Leadership Council",
    "TechieHelp College Partnership",
    "Student Internship Opportunities"
  ],
  alternates: {
    canonical: "https://techiehelpinstituteofai.in/campus-innovation-club"
  },
  openGraph: {
    title: "TechieHelp Campus Innovation Club | Transform Your Campus Into an Innovation Hub",
    description:
      "Partner with TechieHelp to establish an official student-led innovation community on your campus. Weekly tech challenges, AI bootcamps, hackathons, and internship pathways.",
    url: "https://techiehelpinstituteofai.in/campus-innovation-club",
    siteName: "TechieHelp Institute of AI",
    images: [
      {
        url: "/campus_collaboration.png",
        width: 1200,
        height: 630,
        alt: "TechieHelp Campus Innovation Club"
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "TechieHelp Campus Innovation Club",
    description:
      "Transform your campus into a hub of innovation. Official college partnerships, weekly tech activities, student leadership, and internships.",
    images: ["/campus_collaboration.png"],
    creator: "@techiehelp"
  }
};

export default function CampusInnovationClubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "TechieHelp Campus Innovation Club",
    "url": "https://techiehelpinstituteofai.in/campus-innovation-club",
    "logo": "https://techiehelpinstituteofai.in/logo.png",
    "description":
      "Official institutional technology, AI, and career development community established in colleges via formal MoUs with TechieHelp.",
    "parentOrganization": {
      "@type": "Organization",
      "name": "TechieHelp",
      "url": "https://www.techiehelp.in"
    },
    "offers": {
      "@type": "Offer",
      "category": "Institutional Partnership & Student Upskilling"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CampusInnovationClubClient />
    </>
  );
}

