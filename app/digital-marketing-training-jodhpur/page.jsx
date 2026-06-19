import Header from "@/components/header";
import SEOPageTemplate from "@/components/SEOPageTemplate";

const pageDetails = {
  title: "Digital Marketing Training Jodhpur",
  subtitle: "Master search engine optimization (SEO), social media algorithms, conversion funnels, and Google Analytics under marketing experts.",
  description: "TechieHelp Institute of AI Jodhpur delivers an analytical Digital Marketing training program. Master on-page/off-page SEO, social media growth methodologies, PPC search engine campaigns, conversion rate optimization (CRO), and web metrics tracking.",
  duration: "3 Months",
  mode: "Classroom / Hybrid in Jodhpur",
  features: [
    "Manage and optimize ₹10,000+ in real ad campaign budgets",
    "Master SEO keyword targeting, backlinking, and index mapping",
    "Analyze website traffic metrics using Google Search Console and GA4",
    "Continuous mentoring and campaign auditing by industry experts",
    "Verified Digital Marketer certification and active placement support"
  ],
  curriculum: [
    { title: "Module 1: SEO Foundations (Search Engine Optimization)", desc: "Master keyword mapping, technical audits, on-page optimization, backlink building, and index crawling." },
    { title: "Module 2: Pay-Per-Click Advertising (PPC)", desc: "Build targeted search campaigns, design high-converting ad copy, and structure keyword bidding models." },
    { title: "Module 3: Social Media Growth & Algorithms", desc: "Understand social media dynamics (LinkedIn, Instagram, YouTube), draft content roadmaps, and monitor user engagement metrics." },
    { title: "Module 4: Web Analytics & Tracking (GA4)", desc: "Configure Google Analytics tracking tags, define custom events, and analyze conversion rate optimization (CRO)." },
    { title: "Module 5: Email Marketing & Funnels", desc: "Design lead generation magnets, construct email automation flows, and optimize funnel conversion rates." }
  ],
  reviews: [
    { name: "Akash Solanki", rating: 5, text: "Excellent digital marketing training. The focus on SEO methodologies and Google Search Console analysis was incredibly useful.", role: "SEO Specialist Intern" },
    { name: "Kiran Kanwar", rating: 5, text: "The mentors helped me run real budget ad campaigns. Learning key metrics like ROAS and CPC was very practical.", role: "PPC Executive" },
    { name: "Sameer Khan", rating: 5, text: "Best marketing classes in Jodhpur. The practical training in conversion funnels and web audits helped me secure my internship.", role: "Digital Marketer" }
  ],
  faqs: [
    { q: "Do I need coding skills for digital marketing?", a: "No coding skills are required. A basic understanding of web structures is helpful for technical SEO, which we cover from scratch." },
    { q: "Will I get to run real ad campaigns?", a: "Yes, you will gain hands-on experience in managing and optimizing real budget ad campaigns on search engines and social platforms." },
    { q: "What tools are covered in this course?", a: "You will master Google Analytics (GA4), Google Search Console, Ahrefs/Semrush, Meta Ads Manager, Google Ads, and Mailchimp." },
    { q: "Does TechieHelp provide placement support?", a: "Yes. All students receive dedicated career training, portfolio reviews, and direct placement opportunities in top corporate firms." }
  ],
  canonical: "https://techiehelpinstituteofai.in/digital-marketing-training-jodhpur"
};

// SEO metadata
export const metadata = {
  title: "Digital Marketing Training in Jodhpur | TechieHelp Institute of AI",
  description: pageDetails.description,
  keywords: [
    "Digital Marketing Internship in Jodhpur",
    "Best SEO Training Jodhpur",
    "Digital Marketing Course in Jodhpur",
    "PPC Google Ads training Jodhpur",
    "TechieHelp digital marketing program"
  ],
  alternates: {
    canonical: pageDetails.canonical
  }
};

export default function DigitalMarketingPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "@id": `${pageDetails.canonical}#course`,
        "name": "Digital Marketing Training Program",
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
        "name": "Digital Marketing Training",
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
