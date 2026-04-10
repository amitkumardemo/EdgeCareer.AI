import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";
import { AuthProvider } from "@/context/auth-context";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://techiehelpinstituteofai.in"),
  title: {
    default: "TechieHelp Institute of AI - Your AI-Powered Career Tutor",
    template: "%s | TechieHelp Institute of AI"
  },
  description: "Build one-page, ATS-optimized resumes using AI with TechieHelp Institute of AI. Your AI-powered career tutor for job search, resume optimization, mock interviews, and career growth.",
  keywords: ["TechieHelp Institute of AI", "AI career assistant", "job search", "resume optimization", "mock interviews", "industry insights", "career growth", "AI interview prep", "job application tools", "ATS resume builder"],
  authors: [{ name: "TechieHelp Institute of AI" }],
  creator: "EdgeCareer",
  openGraph: {
    title: "TechieHelp Institute of AI - Your AI-Powered Career Tutor",
    description: "Build one-page, ATS-optimized resumes using AI with TechieHelp Institute of AI.",
    url: "https://techiehelpinstituteofai.in",
    siteName: "TechieHelp Institute of AI",
    images: [
      {
        url: "/og-image.png", // Next.js will auto-resolve this against metadataBase
        width: 1200,
        height: 630,
        alt: "TechieHelp Institute of AI Platform",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechieHelp Institute of AI - Your AI-Powered Career Tutor",
    description: "Build one-page, ATS-optimized resumes using AI with TechieHelp Institute of AI.",
    images: ["/og-image.png"],
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
      </head>
      <body className={`${inter.className}`} >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />
            <Script
              id="schema-markup"
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Organization",
                  name: "TechieHelp Institute of AI",
                  url: "https://techiehelpinstituteofai.in",
                  logo: "https://techiehelpinstituteofai.in/skill.png",
                  sameAs: [
                    "https://www.linkedin.com/company/techiehelp",
                    "https://www.instagram.com/techiehelp_ai"
                  ],
                  contactPoint: {
                    "@type": "ContactPoint",
                    telephone: "+91-111-111-1111", // Placeholder, can be updated later
                    contactType: "customer service",
                  },
                }),
              }}
            />
            <Analytics />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
