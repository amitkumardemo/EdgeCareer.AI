import Header from "@/components/header";
import SEOPageTemplate from "@/components/SEOPageTemplate";

const pageDetails = {
  title: "App Development Training Jodhpur",
  subtitle: "Build modern, cross-platform Android and iOS mobile applications using Flutter and React Native under expert mentorship.",
  description: "TechieHelp Institute of AI Jodhpur delivers the ultimate mobile App Development training. Learn widget engineering, state management, offline storage, API integration, and play/app store deployment using Flutter, Dart, React Native, and Firebase.",
  duration: "4 Months",
  mode: "Classroom / Hybrid in Jodhpur",
  features: [
    "Compile and publish 3+ live Android and iOS apps",
    "Master cross-platform framework parameters (Flutter, Dart, React Native)",
    "Implement push notifications, maps, and device sensors",
    "1-on-1 guidance on app store optimization (ASO) and deployment",
    "Professional Mobile App Developer certificate and placement referrals"
  ],
  curriculum: [
    { title: "Module 1: Foundations of Mobile Architecture", desc: "Understand Android & iOS environments, Dart/JS programming, and IDE setup (Android Studio, Xcode)." },
    { title: "Module 2: Flutter Layouts & State Management", desc: "Build responsive widgets, handle state with Provider/Bloc, and configure local storage." },
    { title: "Module 3: REST API Integration & Databases", desc: "Connect mobile frontends to REST APIs and set up Firebase database syncing." },
    { title: "Module 4: React Native Development", desc: "Learn Expo, component design, native device feature permissions, and custom bridge hooks." },
    { title: "Module 5: App Store & Play Store Deployment", desc: "Learn release signing, configuring build parameters, App Store optimization (ASO), and beta testing." }
  ],
  reviews: [
    { name: "Rohit Gehlot", rating: 5, text: "Excellent app training. I published my first Android app to the Play Store during the cohort. Practical and engaging!", role: "Flutter Developer Intern" },
    { name: "Anjali Rajpurohit", rating: 5, text: "The mentors helped me understand app performance profiling and local storage sync. Best classes in Jodhpur.", role: "Mobile Engineer" },
    { name: "Manish Panchal", rating: 5, text: "Strong focus on industry-relevant tools. The push notification and camera integration modules were very helpful.", role: "App Developer" }
  ],
  faqs: [
    { q: "Which programming languages are covered in this course?", a: "We cover Dart (for Flutter) and JavaScript/TypeScript (for React Native)." },
    { q: "Do I need a Mac to learn iOS development?", a: "While a Mac is required to run iOS simulators and compile iOS code locally, you can write and compile cross-platform code on Windows for Android devices." },
    { q: "Will I build working apps?", a: "Yes, you will design, code, and deploy multiple production-grade mobile applications." },
    { q: "Is placement support included?", a: "Yes. All students receive dedicated placement training, portfolio reviews, and referrals to top tech firms in Rajasthan and beyond." }
  ],
  canonical: "https://techiehelpinstituteofai.in/app-development-training-jodhpur"
};

// SEO metadata
export const metadata = {
  title: "App Development Training in Jodhpur | TechieHelp Institute of AI",
  description: pageDetails.description,
  keywords: [
    "App Development Training in Jodhpur",
    "Best Flutter Internship Jodhpur",
    "Mobile App Course in Jodhpur",
    "React Native training Jodhpur",
    "TechieHelp app development program"
  ],
  alternates: {
    canonical: pageDetails.canonical
  }
};

export default function AppDevPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "@id": `${pageDetails.canonical}#course`,
        "name": "Mobile App Development (Flutter & React Native) Training Program",
        "description": pageDetails.description,
        "provider": {
          "@type": "EducationalOrganization",
          "name": "TechieHelp Institute of AI",
          "sameAs": "https://techiehelpinstituteofai.in"
        }
      },
      {
        "@type": "FAQPage",
        "@id": `${pageDetails.canonical}#faq`,
        "mainEntity": pageDetails.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://techiehelpinstituteofai.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Programs",
        "item": "https://techiehelpinstituteofai.in/skill-development-programs"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "App Development Training",
        "item": pageDetails.canonical
      }
    ]
  };

  return (
    <>
      <Header />
      <SEOPageTemplate 
        {...pageDetails} 
        schema={schema}
        breadcrumbSchema={breadcrumbSchema}
      />
    </>
  );
}
