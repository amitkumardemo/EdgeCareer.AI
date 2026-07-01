import Header from "@/components/header";
import CertificateVerify from "@/components/certificateVerification";
import Script from "next/script";

export const metadata = {
  title: "Official Certificate Verification | TechieHelp Institute of AI",
  description: "Secure verification portal for TechieHelp Institute of AI professional credentials. Verify internship and training certificates in real-time.",
  keywords: [
    "certificate verification",
    "TechieHelp Institute of AI certificates",
    "internship certificate check",
    "credential validation"
  ],
};

export default function VerifyCertificatePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://techiehelpinstituteofai.in/" },
          { "@type": "ListItem", "position": 2, "name": "Verify Certificate", "item": "https://techiehelpinstituteofai.in/verify-certificate" }
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
        "@id": "https://techiehelpinstituteofai.in/verify-certificate",
        "url": "https://techiehelpinstituteofai.in/verify-certificate",
        "name": "TechieHelp Certificate Verification",
        "description": "Secure verification portal for TechieHelp professional credentials."
      }
    ]
  };

  return (
    <>
      <Script
        id="verify-cert-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <CertificateVerify />
    </>
  );
}
