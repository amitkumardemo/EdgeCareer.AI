import Header from "@/components/header";
import TermsClient from "./TermsClient";
import Script from "next/script";

export const metadata = {
  title: "Terms & Conditions | TechieHelp Institute of AI",
  description: "Read the official Terms & Conditions of TechieHelp Institute of AI regarding training programs, internships, certifications, placement support, payments, and use of our platform.",
};

export default function TermsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://techiehelpinstituteofai.in/" },
          { "@type": "ListItem", "position": 2, "name": "Legal" },
          { "@type": "ListItem", "position": 3, "name": "Terms & Conditions", "item": "https://techiehelpinstituteofai.in/terms" }
        ]
      },
      {
        "@type": "Organization",
        "name": "TechieHelp Institute of AI",
        "url": "https://techiehelpinstituteofai.in",
        "logo": "https://techiehelpinstituteofai.in/thp%20logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91 7673825079",
          "contactType": "customer support",
          "email": "techiehelpinstituteofai@gmail.com"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://techiehelpinstituteofai.in/terms",
        "url": "https://techiehelpinstituteofai.in/terms",
        "name": "Terms & Conditions | TechieHelp Institute of AI",
        "description": "Read the official Terms & Conditions of TechieHelp Institute of AI regarding training programs, internships, certifications, placement support, payments, and use of our platform."
      }
    ]
  };

  return (
    <>
      <Script
        id="terms-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <TermsClient />
    </>
  );
}
