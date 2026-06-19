import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Script from "next/script";
import Footer from "@/components/Footer";
import { Providers } from "@/components/providers";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://techiehelpinstituteofai.in"),
  title: {
    default: "TechieHelp Institute of AI | Best AI Training & Internship Platform in Jodhpur",
    template: "%s | TechieHelp Institute of AI"
  },
  description: "TechieHelp Institute of AI offers AI & ML, Data Science, Web Development, Cyber Security, Cloud Computing, and Digital Marketing training with internships, certifications, live projects, and placement support in Jodhpur.",
  keywords: [
    "TechieHelp Institute of AI", 
    "AI Training in Jodhpur", 
    "Best Internship in Jodhpur", 
    "Machine Learning Internship in Jodhpur", 
    "Data Science Internship in Jodhpur", 
    "Web Development Training in Jodhpur", 
    "Cyber Security Training in Jodhpur", 
    "Cloud Computing Training in Jodhpur", 
    "Digital Marketing Internship in Jodhpur", 
    "AI Course in Jodhpur", 
    "Summer Internship Jodhpur", 
    "Training and Internship Institute Jodhpur"
  ],
  authors: [{ name: "TechieHelp Institute of AI" }],
  creator: "Amit Kumar",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "google-site-verification-placeholder-code",
  },
  openGraph: {
    title: "TechieHelp Institute of AI",
    description: "TechieHelp Institute of AI offers AI & ML, Data Science, Web Development, Cyber Security, Cloud Computing, and Digital Marketing training with internships, certifications, live projects, and placement support in Jodhpur.",
    url: "https://techiehelpinstituteofai.in",
    siteName: "TechieHelp Institute of AI",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "TechieHelp Institute of AI Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechieHelp Institute of AI",
    description: "TechieHelp Institute of AI offers AI & ML, Data Science, Web Development, Cyber Security, Cloud Computing, and Digital Marketing training with internships, certifications, live projects, and placement support in Jodhpur.",
    images: ["/logo.png"],
    creator: "@techiehelp",
  },
  icons: {
    icon: "/skill.png",
    shortcut: "/skill.png",
    apple: "/skill.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js" strategy="afterInteractive" />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className={`${inter.className}`} >
        <Providers>
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster richColors />
          <Script
            id="schema-markup"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": ["Organization", "EducationalOrganization"],
                    "@id": "https://techiehelpinstituteofai.in/#organization",
                    "name": "TechieHelp Institute of AI",
                    "url": "https://techiehelpinstituteofai.in",
                    "logo": "https://techiehelpinstituteofai.in/logo.png",
                    "description": "TechieHelp Institute of AI is an industry-focused learning platform dedicated to helping students build in-demand skills, gain real-world experience through internships, and earn professional certifications in Jodhpur, Rajasthan.",
                    "telephone": "+91-7673825079",
                    "email": "ceo@techiehelp.in",
                    "sameAs": [
                      "https://www.linkedin.com/company/techiehelp",
                      "https://youtube.com/techiehelp",
                      "https://instagram.com/techiehelp_ai",
                      "https://github.com/amitkumardemo",
                      "https://facebook.com/techiehelp",
                      "https://x.com/techiehelp"
                    ],
                    "founder": {
                      "@type": "Person",
                      "name": "Amit Kumar",
                      "jobTitle": "Founder & CEO",
                      "sameAs": [
                        "https://www.linkedin.com/in/amit-kumar-founder-of-techiehelp"
                      ]
                    },
                    "contactPoint": {
                      "@type": "ContactPoint",
                      "telephone": "+91-7673825079",
                      "contactType": "customer service",
                      "email": "ceo@techiehelp.in"
                    },
                    "knowsAbout": [
                      "Artificial Intelligence",
                      "Machine Learning",
                      "Data Science",
                      "Software Development",
                      "Cyber Security",
                      "Cloud Computing",
                      "Digital Marketing",
                      "Career Coaching",
                      "Resume Optimization",
                      "ATS Checking",
                      "Technical Interview Prep"
                    ]
                  },
                  {
                    "@type": "WebSite",
                    "@id": "https://techiehelpinstituteofai.in/#website",
                    "url": "https://techiehelpinstituteofai.in",
                    "name": "TechieHelp Institute of AI",
                    "description": "Best AI Training & Internship Platform in Jodhpur",
                    "publisher": {
                      "@id": "https://techiehelpinstituteofai.in/#organization"
                    }
                  }
                ]
              }),
            }}
          />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
