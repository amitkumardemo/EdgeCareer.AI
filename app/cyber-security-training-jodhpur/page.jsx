import Header from "@/components/header";
import SEOPageTemplate from "@/components/SEOPageTemplate";

const pageDetails = {
  title: "Cyber Security Training Jodhpur",
  subtitle: "Master ethical hacking, network defense, penetration testing, and security auditing under industry cyber experts.",
  description: "TechieHelp Institute of AI Jodhpur delivers comprehensive Cyber Security training. Gain practical command over Kali Linux, Metasploit, Nmap, Wireshark, and OWASP Top 10 vulnerabilities. Learn how to protect digital assets and patch security loopholes.",
  duration: "4 Months",
  mode: "Classroom / Hybrid in Jodhpur",
  features: [
    "Practical training in simulated sandbox lab environments",
    "Identify and patch real security vulnerabilities",
    "Prepare for global security certifications (CEH, Security+)",
    "Comprehensive career coaching: resume audits and mock rounds",
    "Verified Cyber Security Specialist certification and placement support"
  ],
  curriculum: [
    { title: "Module 1: Computer Networking & Linux Basics", desc: "Understand TCP/IP protocols, subnetting, system administration, and command-line execution in Linux." },
    { title: "Module 2: Information Gathering & Scanning", desc: "Learn active/passive reconnaissance, system port scanning, vulnerability mapping, and packet analysis using Wireshark." },
    { title: "Module 3: Penetration Testing & Vulnerability Assessment", desc: "Exploit systems using Metasploit, audit web application security, and map the OWASP Top 10 guidelines." },
    { title: "Module 4: System Hardening & Network Defense", desc: "Configure firewalls, set up intrusion detection systems (IDS/IPS), and establish identity management policies." },
    { title: "Module 5: Security Auditing & Compliance", desc: "Perform compliance checks, draft security policy templates, and analyze incident response logs." }
  ],
  reviews: [
    { name: "Vikram Rathore", rating: 5, text: "Excellent cyber security course in Jodhpur. The ethical hacking labs and Kali Linux modules were highly practical.", role: "Security Analyst Intern" },
    { name: "Sunita Kanwar", rating: 5, text: "The focus on OWASP Top 10 web vulnerabilities helped me secure a bug bounty internship. Great mentors!", role: "Vulnerability Auditor" },
    { name: "Pankaj Sharma", rating: 5, text: "TechieHelp provides Jodhpur's best labs. The practical training in network defense was extremely helpful.", role: "Cyber Security Associate" }
  ],
  faqs: [
    { q: "Is coding required to learn Cyber Security?", a: "A basic understanding of scripting (like Python or Bash) is helpful, but you don't need to be an expert developer to start." },
    { q: "Are labs offline or online?", a: "We provide structured security labs that you can access both offline at our Jodhpur center and online." },
    { q: "Will I learn ethical hacking?", a: "Yes, our program focuses on ethical hacking methodologies to test and secure systems against malicious attacks." },
    { q: "Do you offer placement assistance?", a: "Yes, we support our candidates with resume reviews, interview preparation, and placements at top IT firms." }
  ],
  canonical: "https://techiehelpinstituteofai.in/cyber-security-training-jodhpur"
};

// SEO metadata
export const metadata = {
  title: "Cyber Security Training in Jodhpur | TechieHelp Institute of AI",
  description: pageDetails.description,
  keywords: [
    "Cyber Security Training in Jodhpur",
    "Best Ethical Hacking Internship Jodhpur",
    "Cyber Security Course Jodhpur",
    "Network security training Jodhpur",
    "TechieHelp cyber security program"
  ],
  alternates: {
    canonical: pageDetails.canonical
  }
};

export default function CyberSecurityPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "@id": `${pageDetails.canonical}#course`,
        "name": "Cyber Security & Ethical Hacking Training Program",
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
        "name": "Cyber Security Training",
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
