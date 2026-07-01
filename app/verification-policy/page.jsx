import Header from "@/components/header";
import VerificationPolicyClient from "./VerificationPolicyClient";
import Script from "next/script";

export const metadata = {
  title: "Certificate Verification Policy | TechieHelp Institute of AI",
  description: "Learn how TechieHelp Institute of AI verifies internship certificates, training certifications, professional credentials, and digital records through its official verification system.",
  keywords: [
    "TechieHelp certificate verification policy",
    "internship certificate verification",
    "credential validation guidelines",
    "certificate authenticity"
  ],
};

export default function VerificationPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://techiehelpinstituteofai.in/" },
          { "@type": "ListItem", "position": 2, "name": "Legal", "item": "https://techiehelpinstituteofai.in/privacy" },
          { "@type": "ListItem", "position": 3, "name": "Certificate Verification Policy", "item": "https://techiehelpinstituteofai.in/verification-policy" }
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
        "@id": "https://techiehelpinstituteofai.in/verification-policy",
        "url": "https://techiehelpinstituteofai.in/verification-policy",
        "name": "Certificate Verification Policy | TechieHelp Institute of AI",
        "description": "Learn how TechieHelp Institute of AI verifies internship certificates, training certifications, professional credentials, and digital records through its official verification system."
      }
    ]
  };

  return (
    <>
      <Script
        id="verification-policy-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <VerificationPolicyClient />
    </>
  );
}
