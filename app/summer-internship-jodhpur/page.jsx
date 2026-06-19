import Header from "@/components/header";
import SEOPageTemplate from "@/components/SEOPageTemplate";

const pageDetails = {
  title: "Summer Internship Jodhpur",
  subtitle: "Make your summer count: work on industry-level projects, learn from software engineers, and earn professional certificates in Jodhpur.",
  description: "TechieHelp Institute of AI Jodhpur announces the Summer Internship Jodhpur cohort. Designed specifically for engineering, BCA, MCA, and tech graduates, this program provides hands-on coding training, database design, and real-world project deployments.",
  duration: "45 Days to 2 Months",
  mode: "Classroom / Hybrid in Jodhpur",
  features: [
    "Project-focused summer curriculum mapping to top tech stacks",
    "Design and deploy 2+ full-featured web or mobile apps",
    "Mentoring by Amit Kumar and experienced developer leads",
    "ATS resume checking and mock interview assessments",
    "Verified Summer Internship certificate and reference credentials"
  ],
  curriculum: [
    { title: "Module 1: Language Fundamentals & Tools", desc: "Gain training in Python, Java, or JavaScript, and master version control systems using Git and GitHub." },
    { title: "Module 2: Database Design & API Building", desc: "Structure relational schemas (SQL) and non-relational tables (NoSQL) and construct REST endpoint routes." },
    { title: "Module 3: Frontend Layouts & Styling", desc: "Build modular interfaces using React.js or Flutter widgets, incorporating Tailwind CSS styling." },
    { title: "Module 4: Deploying Live Applications", desc: "Host databases online, connect frontends, configure cloud servers, and manage server domains." },
    { title: "Module 5: Resume Audits & Interview Basics", desc: "Analyze resumes with our ATS scanner, write project descriptions, and practice mock interviews." }
  ],
  reviews: [
    { name: "Punit Soni", rating: 5, text: "The summer training at TechieHelp Jodhpur was very helpful. Building and hosting my own portfolio projects was amazing.", role: "Summer Intern" },
    { name: "Divya Rajpurohit", rating: 5, text: "Best summer internship in Jodhpur. The focus on database integration and API routes was highly educational.", role: "Web Development Intern" },
    { name: "Manav Sen", rating: 5, text: "Excellent guidance. The mentors help you configure everything locally and deploy it online step-by-step.", role: "Software Intern" }
  ],
  faqs: [
    { q: "Who can enroll in this summer internship program?", a: "Engineering, MCA, BCA, BSc CS, and general technology students looking to complete their summer training requirements are eligible." },
    { q: "Is this training recognized by colleges in Rajasthan?", a: "Yes, TechieHelp is an educational training center, and our summer internship certificates are fully accepted for academic credit." },
    { q: "Do you offer offline classes in Jodhpur?", a: "Yes. Our summer training batches are held offline at our Jodhpur campus, with access to laboratory equipment." },
    { q: "Will I get help with placement?", a: "Yes. All students receive dedicated placement training, including resume optimization, portfolio reviews, and mock assessments." }
  ],
  canonical: "https://techiehelpinstituteofai.in/summer-internship-jodhpur"
};

// SEO metadata
export const metadata = {
  title: "Summer Internship in Jodhpur | TechieHelp Institute of AI",
  description: pageDetails.description,
  keywords: [
    "Summer Internship Jodhpur",
    "Best summer training Jodhpur",
    "Engineering summer internship Jodhpur",
    "BCA MCA summer training Jodhpur",
    "TechieHelp summer internship programs"
  ],
  alternates: {
    canonical: pageDetails.canonical
  }
};

export default function SummerInternshipPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "@id": `${pageDetails.canonical}#course`,
        "name": "Summer Internship and Training Program",
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
        "name": "Summer Internship Jodhpur",
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
