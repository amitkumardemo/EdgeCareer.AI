import Header from "@/components/header";
import SEOPageTemplate from "@/components/SEOPageTemplate";

const pageDetails = {
  title: "Web Development Training Jodhpur",
  subtitle: "Build modern, highly performant web applications using the MERN Stack and Next.js under veteran Jodhpur developers.",
  description: "TechieHelp Institute of AI Jodhpur delivers the premier Full Stack Web Development training. Master HTML5, CSS3, Tailwind CSS, JavaScript (ES6+), React.js, Next.js, Node.js, Express, and MongoDB. Learn database optimization and code deployment.",
  duration: "6 Months",
  mode: "Classroom / Hybrid in Jodhpur",
  features: [
    "Build and deploy 5+ full-stack projects",
    "Master frontend optimization, rendering, and SEO",
    "Continuous mentoring by senior engineering leads",
    "Comprehensive placement preparation: resume audits and mock rounds",
    "Verified MERN Stack Developer certification"
  ],
  curriculum: [
    { title: "Module 1: Frontend Basics (HTML, CSS, JS)", desc: "Build responsive static layouts using semantic elements, custom CSS variables, and modern Tailwind configurations." },
    { title: "Module 2: Advanced JavaScript & React", desc: "Master asynchronous code execution, standard state hooks, custom component lifecycles, and state management libraries." },
    { title: "Module 3: Next.js & Server Rendering", desc: "Build highly optimized pages using App Router, static generation, API routes, and SEO-friendly metadata setups." },
    { title: "Module 4: Backend API Development", desc: "Construct REST APIs using Express.js, manage routes, and connect MongoDB databases using Prisma ORM." },
    { title: "Module 5: DevOps & Cloud Hosting", desc: "Configure GitHub Actions workflows, implement testing scripts, and host apps on Vercel/Render/AWS." }
  ],
  reviews: [
    { name: "Vishal Jangid", rating: 5, text: "Excellent web development training. The MERN stack modules are very detailed and project-focused.", role: "Frontend Developer Intern" },
    { name: "Meena Choudhary", rating: 5, text: "Learning Next.js and API integrations changed the way I build apps. TechieHelp provides the best coding exposure.", role: "Full Stack Engineer" },
    { name: "Suresh Soni", rating: 5, text: "The mock interview preparation and resume reviews helped me land my first job as a software developer.", role: "Junior Software Engineer" }
  ],
  faqs: [
    { q: "What stack will I learn in this Web Development course?", a: "You will learn the full MERN Stack (MongoDB, Express, React, Node.js) along with Next.js, Tailwind CSS, and Git." },
    { q: "Do you offer offline classroom training in Jodhpur?", a: "Yes, our web development batches are conducted offline at our Jodhpur campus, combined with lab support." },
    { q: "Will I build real projects during this program?", a: "Yes. You will build and deploy multiple responsive applications, including SaaS dashboards, e-commerce applications, and database integrations." },
    { q: "Does this program include placement assistance?", a: "Yes. We offer dedicated career counseling, resume optimization, and direct placement opportunities in top corporate firms." }
  ],
  canonical: "https://techiehelpinstituteofai.in/web-development-training-jodhpur"
};

// SEO metadata
export const metadata = {
  title: "Web Development Training in Jodhpur | TechieHelp Institute of AI",
  description: pageDetails.description,
  keywords: [
    "Web Development Training in Jodhpur",
    "Best Web Development Internship Jodhpur",
    "MERN Stack Course in Jodhpur",
    "NextJS developer training Jodhpur",
    "TechieHelp web development program"
  ],
  alternates: {
    canonical: pageDetails.canonical
  }
};

export default function WebDevPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "@id": `${pageDetails.canonical}#course`,
        "name": "Full Stack Web Development (MERN & Next.js) Training Program",
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
        "name": "Web Development Training",
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
