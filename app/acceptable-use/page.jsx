import Header from "@/components/header";
import AUPClient from "./AUPClient";
import Script from "next/script";

export const metadata = {
  title: "Acceptable Use Policy | TechieHelp Institute of AI",
  description: "Read the official Acceptable Use Policy of TechieHelp Institute of AI to understand the rules, responsibilities, prohibited activities, and standards for using our website, training programs, internships, and digital services.",
  keywords: [
    "TechieHelp acceptable use policy",
    "AUP",
    "terms of use",
    "prohibited activities",
    "user guidelines"
  ],
};

export default function AUPPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://techiehelpinstituteofai.in/" },
          { "@type": "ListItem", "position": 2, "name": "Legal", "item": "https://techiehelpinstituteofai.in/privacy" },
          { "@type": "ListItem", "position": 3, "name": "Acceptable Use Policy", "item": "https://techiehelpinstituteofai.in/acceptable-use" }
        ]
      },
      {
        "@type": "Organization",
        "name": "TechieHelp Institute of AI",
        "url": "https://techiehelpinstituteofai.in",
        "logo": "https://techiehelpinstituteofai.in/thp%20logo.png"
      },
      {
        "@type": "WebPage",
        "@id": "https://techiehelpinstituteofai.in/acceptable-use",
        "url": "https://techiehelpinstituteofai.in/acceptable-use",
        "name": "Acceptable Use Policy | TechieHelp Institute of AI",
        "description": "Read the official Acceptable Use Policy of TechieHelp Institute of AI to understand the rules, responsibilities, prohibited activities, and standards for using our website, training programs, internships, and digital services."
      }
    ]
  };

  return (
    <>
      <Script
        id="aup-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <AUPClient />
    </>
  );
}
