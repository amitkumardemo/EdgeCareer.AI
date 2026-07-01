import Header from "@/components/header";
import CookiePolicyClient from "./CookiePolicyClient";
import Script from "next/script";

export const metadata = {
  title: "Cookie Policy | TechieHelp Institute of AI",
  description: "Read the official Cookie Policy of TechieHelp Institute of AI to understand how cookies are used to improve website functionality, security, analytics, and user experience.",
  keywords: [
    "TechieHelp cookie policy",
    "cookies",
    "tracking technologies",
    "website analytics",
    "privacy"
  ],
};

export default function CookiePolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://techiehelpinstituteofai.in/" },
          { "@type": "ListItem", "position": 2, "name": "Legal", "item": "https://techiehelpinstituteofai.in/privacy" },
          { "@type": "ListItem", "position": 3, "name": "Cookie Policy", "item": "https://techiehelpinstituteofai.in/cookie-policy" }
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
        "@id": "https://techiehelpinstituteofai.in/cookie-policy",
        "url": "https://techiehelpinstituteofai.in/cookie-policy",
        "name": "Cookie Policy | TechieHelp Institute of AI",
        "description": "Read the official Cookie Policy of TechieHelp Institute of AI to understand how cookies are used to improve website functionality, security, analytics, and user experience."
      }
    ]
  };

  return (
    <>
      <Script
        id="cookie-policy-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <CookiePolicyClient />
    </>
  );
}
