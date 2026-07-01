import Header from "@/components/header";
import RefundPolicyClient from "./RefundPolicyClient";
import Script from "next/script";

export const metadata = {
  title: "Refund Policy | TechieHelp Institute of AI",
  description: "Read the official Refund Policy of TechieHelp Institute of AI regarding training programs, internships, certifications, workshops, payments, and digital services.",
  keywords: [
    "TechieHelp refund policy",
    "TechieHelp Institute of AI payments",
    "cancellation policy",
    "internship fee refund",
  ],
};

export default function RefundPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://techiehelpinstituteofai.in/" },
          { "@type": "ListItem", "position": 2, "name": "Legal", "item": "https://techiehelpinstituteofai.in/privacy" },
          { "@type": "ListItem", "position": 3, "name": "Refund Policy", "item": "https://techiehelpinstituteofai.in/refund-policy" }
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
        "@id": "https://techiehelpinstituteofai.in/refund-policy",
        "url": "https://techiehelpinstituteofai.in/refund-policy",
        "name": "Refund Policy | TechieHelp Institute of AI",
        "description": "Read the official Refund Policy of TechieHelp Institute of AI regarding training programs, internships, certifications, workshops, payments, and digital services."
      }
    ]
  };

  return (
    <>
      <Script
        id="refund-policy-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <RefundPolicyClient />
    </>
  );
}
