import Header from "@/components/header";
import SEOPageTemplate from "@/components/SEOPageTemplate";

const pageDetails = {
  title: "Data Science Training Jodhpur",
  subtitle: "Master data pipelines, statistical modeling, database querying, and dashboard reporting under Jodhpur's leading data mentors.",
  description: "TechieHelp Institute of AI Jodhpur delivers an industry-focused Data Science training program. Gain structural command over Python, SQL, Tableau, Pandas, and machine learning models. Learn how to transform raw datasets into clean interactive dashboards.",
  duration: "6 Months",
  mode: "Classroom / Hybrid in Jodhpur",
  features: [
    "Practical training in SQL and Big Data pipelines",
    "Design 4+ live interactive reporting dashboards",
    "Personalized reviews and feedback by industry mentors",
    "Complete interview prep, resume audits, and mock rounds",
    "Industry-approved completion certificate and verified LoR"
  ],
  curriculum: [
    { title: "Module 1: Mathematical Foundations & Python", desc: "Acquire training in linear regression, probability distributions, data wrangling, and Numpy operations." },
    { title: "Module 2: SQL & Database Administration", desc: "Write complex relational queries, design data schemas, and manage database scaling." },
    { title: "Module 3: Exploratory Data Analysis & Visualization", desc: "Build interactive visual reports using Tableau, PowerBI, Matplotlib, and Seaborn." },
    { title: "Module 4: Machine Learning for Data Science", desc: "Build predictive regression algorithms, classification trees, and clustering setups in Scikit-learn." },
    { title: "Module 5: Big Data & Cloud Analytics", desc: "Process huge datasets using Apache Spark and host pipelines on AWS environments." }
  ],
  reviews: [
    { name: "Kunal Mathur", rating: 5, text: "Excellent curriculum. The focus on SQL queries and visual dashboards helped me crack my data analyst assessment.", role: "Data Analyst at TechieHelp" },
    { name: "Neha Vyas", rating: 5, text: "The mentors are highly experienced. They don't just teach syntax, they teach data-driven thinking.", role: "Business Intelligence Intern" },
    { name: "Anil Gehlot", rating: 5, text: "Working on actual databases during the training provided the practical experience I needed to stand out.", role: "Data Scientist Associate" }
  ],
  faqs: [
    { q: "What tools will I learn in this Data Science course?", a: "You will master Python, SQL, Pandas, NumPy, Scikit-learn, Tableau, PowerBI, and Apache Spark." },
    { q: "Is this training program suitable for non-technical graduates?", a: "Yes, the program starts from database and coding fundamentals, making it highly accessible for graduates from any stream." },
    { q: "Will I work on real projects?", a: "Absolutely. You will build actual business intelligence pipelines and prediction models using real-world enterprise databases." },
    { q: "How does TechieHelp support placements?", a: "We provide resume customization, mock interview preparation, and direct recruitment pathways through partner organizations." }
  ],
  canonical: "https://techiehelpinstituteofai.in/data-science-training-jodhpur"
};

// SEO metadata
export const metadata = {
  title: "Data Science Training in Jodhpur | TechieHelp Institute of AI",
  description: pageDetails.description,
  keywords: [
    "Data Science Internship in Jodhpur",
    "Best Data Science Training Jodhpur",
    "Data Analyst Course in Jodhpur",
    "SQL database training Jodhpur",
    "TechieHelp Data Science program"
  ],
  alternates: {
    canonical: pageDetails.canonical
  }
};

export default function DataSciencePage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "@id": `${pageDetails.canonical}#course`,
        "name": "Data Science Training Program",
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
        "name": "Data Science Training",
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
