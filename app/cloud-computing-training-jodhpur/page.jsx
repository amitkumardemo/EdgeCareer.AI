import Header from "@/components/header";
import SEOPageTemplate from "@/components/SEOPageTemplate";

const pageDetails = {
  title: "Cloud Computing Training Jodhpur",
  subtitle: "Master AWS, Microsoft Azure, Docker containerization, Kubernetes scaling, and CI/CD pipelines under DevOps mentors.",
  description: "TechieHelp Institute of AI Jodhpur delivers the leading Cloud Computing & DevOps training program. Learn cloud infrastructure provisioning, serverless execution, container management, and release pipelines. Prepare for industry-recognized cloud certifications.",
  duration: "4 Months",
  mode: "Classroom / Hybrid in Jodhpur",
  features: [
    "Practical training in deploying applications to AWS and Azure",
    "Configure 3+ live CI/CD pipeline automation workflows",
    "Master Docker containers and Kubernetes cluster scaling",
    "Prepare for AWS Cloud Practitioner and SysOps certifications",
    "Verified Cloud & DevOps Engineer certification and placement support"
  ],
  curriculum: [
    { title: "Module 1: Cloud Core & Infrastructure Foundations", desc: "Understand virtualization, networking components (VPC, Subnet, DNS), and virtual machine instances." },
    { title: "Module 2: Amazon Web Services (AWS) Deep Dive", desc: "Configure EC2 compute instances, S3 cloud storage buckets, RDS databases, IAM users, and Lambda serverless setups." },
    { title: "Module 3: Containerization with Docker", desc: "Write Dockerfiles, build container images, manage network configs, and compile container files." },
    { title: "Module 4: Orchestration with Kubernetes", desc: "Set up Kubernetes pods, scale services, deploy configurations, and manage cluster resources." },
    { title: "Module 5: DevOps Pipelines & Monitoring", desc: "Design CI/CD workflows using GitHub Actions, and track cloud infrastructure using Prometheus and Grafana." }
  ],
  reviews: [
    { name: "Mahendra Choudhary", rating: 5, text: "The DevOps and AWS lab tasks are very detailed. Hosting my React app with automated pipelines was an amazing experience.", role: "Cloud Intern" },
    { name: "Jyoti Sen", rating: 5, text: "Best cloud computing training in Jodhpur. The focus on Docker containers and Kubernetes clusters was highly educational.", role: "DevOps Engineer" },
    { name: "Harish Borana", rating: 5, text: "Excellent guidance. The certification mock tests and resume formatting helped me pass recruiter screenings.", role: "Junior SysOps Engineer" }
  ],
  faqs: [
    { q: "Which cloud provider is prioritized in this course?", a: "We primarily focus on Amazon Web Services (AWS), along with core foundations in Microsoft Azure." },
    { q: "Are cloud lab fees included in the course?", a: "Yes, we provide lab sandbox environments, and guide you on using the free-tier options safely to avoid unexpected costs." },
    { q: "Is this course suitable for beginners?", a: "Yes, we start from basic networking and system administration foundations, making it suitable for beginners." },
    { q: "Do you assist with placement?", a: "Yes. All students receive dedicated placement training, interview preparation, and direct recruitment pathways through partner firms." }
  ],
  canonical: "https://techiehelpinstituteofai.in/cloud-computing-training-jodhpur"
};

// SEO metadata
export const metadata = {
  title: "Cloud Computing Training in Jodhpur | TechieHelp Institute of AI",
  description: pageDetails.description,
  keywords: [
    "Cloud Computing Training in Jodhpur",
    "Best DevOps Internship Jodhpur",
    "AWS Training Course in Jodhpur",
    "Docker Kubernetes training Jodhpur",
    "TechieHelp cloud computing program"
  ],
  alternates: {
    canonical: pageDetails.canonical
  }
};

export default function CloudComputingPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "@id": `${pageDetails.canonical}#course`,
        "name": "Cloud Computing & DevOps Training Program",
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
        "name": "Cloud Computing Training",
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
