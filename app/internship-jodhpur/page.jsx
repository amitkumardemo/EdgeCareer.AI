import Header from "@/components/header";
import SEOPageTemplate from "@/components/SEOPageTemplate";

const pageDetails = {
  title: "Internship Opportunities Jodhpur",
  subtitle: "Secure real-world developer experience, get mentored by senior engineers, and build verified portfolio projects in Jodhpur.",
  description: "TechieHelp Institute of AI Jodhpur offers Jodhpur's best internship programs for computer science and engineering students. Work on production-grade code pipelines, receive weekly code reviews, and earn official experience letters and letters of recommendation.",
  duration: "3 to 6 Months",
  mode: "Classroom / Hybrid in Jodhpur",
  features: [
    "Work directly on active customer-facing production modules",
    "Acquire guidance on Git workflows, testing, and cloud hosting",
    "Continuous feedback and review sessions by senior developers",
    "Dedicated placement support: resume optimization and mock interviews",
    "Official experience certification and verified recommendation letters"
  ],
  curriculum: [
    { title: "Step 1: Technical Onboarding & Stack Review", desc: "Understand team repositories, configure local developer environments, and review core tech stack templates." },
    { title: "Step 2: Micro-task Allocations & Code Reviews", desc: "Work on minor bugs, optimize database queries, write testing scripts, and learn Git workflows." },
    { title: "Step 3: Feature Development & DB Integrations", desc: "Design and implement API endpoints, build UI components, and integrate database migrations." },
    { title: "Step 4: Performance Profiling & Deployment", desc: "Optimize application speed, clean up console statements, and deploy modules to cloud servers." },
    { title: "Step 5: Portfolio Review & Placement Prep", desc: "Document code contributions, draft resume summaries, and complete mock interview evaluations." }
  ],
  reviews: [
    { name: "Gourav Gehlot", rating: 5, text: "The MERN stack internship at TechieHelp Jodhpur was very professional. I learned how to coordinate in teams using Git.", role: "Software Engineer Intern" },
    { name: "Anita Choudhary", rating: 5, text: "Working on actual server databases and deployment pipelines helped me understand true developer workflows.", role: "Backend Developer Intern" },
    { name: "Vinay Goyal", rating: 5, text: "The placement preparation and resume optimization reviews helped me stand out to recruiters during my job search.", role: "Full Stack Engineer" }
  ],
  faqs: [
    { q: "Who is eligible to apply for these internships?", a: "Engineering, MCA, BCA, and BSc computer science students, as well as self-taught developers looking for industry experience are eligible." },
    { q: "Are these internships offline in Jodhpur?", a: "Yes, we offer offline classroom internships at our Jodhpur branch, along with flexible hybrid options." },
    { q: "Will I get an official experience letter?", a: "Yes. All candidates who complete their tasks and reviews successfully receive an experience certificate and a verified recommendation letter." },
    { q: "Is there any placement assistance?", a: "Absolutely. We provide comprehensive training for technical coding tests, resume audits, and direct referrals to hiring partners." }
  ],
  canonical: "https://techiehelpinstituteofai.in/internship-jodhpur"
};

// SEO metadata
export const metadata = {
  title: "Best Internship in Jodhpur | TechieHelp Institute of AI",
  description: pageDetails.description,
  keywords: [
    "Best Internship in Jodhpur",
    "Training and Internship Institute Jodhpur",
    "Software Developer Internship Jodhpur",
    "MERN stack internship Jodhpur",
    "TechieHelp internship programs"
  ],
  alternates: {
    canonical: pageDetails.canonical
  }
};

export default function InternshipPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": `${pageDetails.canonical}#org`,
        "name": "TechieHelp Institute of AI",
        "description": pageDetails.description,
        "url": "https://techiehelpinstituteofai.in"
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
        "name": "Internship Jodhpur",
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
