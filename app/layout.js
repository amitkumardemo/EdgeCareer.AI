import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { dark } from "@clerk/themes";
import Script from "next/script";
import Footer from "@/components/Footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TechieHelp Institute of AI - Your AI-Powered Career Tutor",
  description:
    "Build one-page, ATS-optimized resumes using AI with TechieHelp Institute of AI. Your AI-powered career tutor for job search, resume optimization, mock interviews, and career growth.",
  keywords:
    "TechieHelp Institute of AI, AI career assistant, job search, resume optimization, mock interviews, industry insights, career growth, AI interview prep, job application tools, ATS resume builder",
  authors: [{ name: "TechieHelp Institute of AI" }],
  openGraph: {
    title: "TechieHelp Institute of AI - Your AI-Powered Career Tutor",
    description:
      "Build one-page, ATS-optimized resumes using AI with TechieHelp Institute of AI.",
    url: "https://techiehelpinstitute.com", // Assuming domain, or keep dynamic if unknown, but better to set a placeholder
    siteName: "TechieHelp Institute of AI",
    images: [
      {
        url: "https://techiehelpinstitute.com/og-image.png", // Placeholder for new OG image
        width: 1200,
        height: 630,
        alt: "TechieHelp Institute of AI",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechieHelp Institute of AI - Your AI-Powered Career Tutor",
    description:
      "Build one-page, ATS-optimized resumes using AI with TechieHelp Institute of AI.",
    images: ["https://techiehelpinstitute.com/og-image.png"], // Placeholder
  },
  icons: {
    icon: "/icons/favicon.ico",
    shortcut: "/icons/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" suppressHydrationWarning className="dark">
        <head>
          <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js" strategy="beforeInteractive" />
          <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js" strategy="beforeInteractive" />
          <link rel="icon" href="/skill.png" sizes="any" />
          {/* SEO Meta Tags */}
          <meta name="description" content={metadata.description} />
          <meta
            name="keywords"
            content="AI career assistant, job search, resume optimization, mock interviews, industry insights, career growth, AI interview prep, job application tools"
          />
          <meta name="author" content="EdgeCareer" />
          <meta name="robots" content="index, follow" />

          {/* Open Graph Meta Tags */}
          <meta property="og:title" content={metadata.title} />
          <meta property="og:description" content={metadata.description} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://edgecareer.com" />
          <meta property="og:image" content="https://edgecareer.com/og-image.png" />

          {/* Twitter Card Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={metadata.title} />
          <meta name="twitter:description" content={metadata.description} />
          <meta name="twitter:image" content="https://edgecareer.com/og-image.png" />
        </head>
        <body className={`${inter.className}`} >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />

            <footer className="bg-muted/50 py-10">
              <div className="container mx-auto px-4 text-center text-gray-200">
                <Footer />
              </div>
            </footer>
            <Script
              id="schema-markup"
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Organization",
                  name: "TechieHelp Institute of AI",
                  url: "https://techiehelpinstitute.com",
                  logo: "https://techiehelpinstitute.com/skill.png",
                  sameAs: [
                    "https://twitter.com/techiehelp",
                    "https://linkedin.com/company/techiehelp",
                  ],
                  contactPoint: {
                    "@type": "ContactPoint",
                    telephone: "+1-555-555-5555",
                    contactType: "customer service",
                  },
                }),
              }}
            />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
