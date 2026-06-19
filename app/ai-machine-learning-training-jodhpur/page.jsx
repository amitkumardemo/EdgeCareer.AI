import Header from "@/components/header";
import SEOPageTemplate from "@/components/SEOPageTemplate";

const pageDetails = {
  title: "AI & Machine Learning Training Jodhpur",
  subtitle: "Build industry-ready skills in Neural Networks, Deep Learning, Computer Vision, and NLP under Jodhpur's leading AI experts.",
  description: "TechieHelp Institute of AI Jodhpur offers the premier AI & Machine Learning training cohort. Learn Python, Scikit-learn, TensorFlow, and PyTorch while working on actual enterprise-level data pipelines. This program includes a guaranteed internship referral, professional certification, and placement training.",
  duration: "6 Months",
  mode: "Classroom / Hybrid in Jodhpur",
  features: [
    "1-on-1 Mentoring by Founder Amit Kumar",
    "Hands-on work on 5+ Live Production Projects",
    "Industrial Stack: PyTorch, TensorFlow, Keras, HuggingFace",
    "Resume Optimization & Mock Interview rounds",
    "Verified Course Certificate & Internship Offer Letter"
  ],
  curriculum: [
    { title: "Module 1: Foundations of Python & Maths", desc: "Understand linear algebra, probability, data structures, and Numpy/Pandas operations." },
    { title: "Module 2: Classical Machine Learning", desc: "Supervised and unsupervised learning, regression models, classification models, decision trees, and clustering." },
    { title: "Module 3: Neural Networks & Deep Learning", desc: "Structure Multi-Layer Perceptrons, compile loss functions, backpropagation, and utilize CNNs/RNNs." },
    { title: "Module 4: NLP & Computer Vision", desc: "Text preprocessing, word embeddings, transformer architectures, object detection, and segmentation." },
    { title: "Module 5: Generative AI & Cloud Deployment", desc: "Master API integration for LLMs, prompt engineering, fine-tuning, and model hosting on AWS/GCP." }
  ],
  reviews: [
    { name: "Rahul Bhati", rating: 5, text: "The AI Training in Jodhpur at TechieHelp was a turning point. Working on live datasets helped me clear interviews easily.", role: "ML Engineer Intern" },
    { name: "Priya Sharma", rating: 5, text: "Excellent mentors. Learned complex deep learning math through practical visual exercises. Strongly recommended!", role: "Data Science Associate" },
    { name: "Deepak Solanki", rating: 5, text: "Best internship structure in Jodhpur. I got to build real predictive modules that are now live in production.", role: "AI Intern" }
  ],
  faqs: [
    { q: "Is there any programming prerequisite for the AI & ML course?", a: "No, we cover programming fundamentals in Python from scratch. However, a basic understanding of computer logic is helpful." },
    { q: "Do you offer placement assistance?", a: "Yes. All students receive dedicated placement training, including portfolio reviews, resume audits with our AI Resume Tool, and referrals to partner tech firms." },
    { q: "Is this training program certified?", a: "Yes, you will receive a verified course completion certificate and an official internship experience letter from TechieHelp Institute of AI." },
    { q: "Are classroom batches available in Jodhpur?", a: "Yes, we conduct offline classroom sessions at our Jodhpur institute, as well as hybrid options for remote learners." }
  ],
  canonical: "https://techiehelpinstituteofai.in/ai-machine-learning-training-jodhpur"
};

// SEO metadata
export const metadata = {
  title: "AI & Machine Learning Training in Jodhpur | TechieHelp Institute of AI",
  description: pageDetails.description,
  keywords: [
    "AI Training in Jodhpur",
    "Machine Learning Internship in Jodhpur",
    "Best AI Course Jodhpur",
    "TechieHelp AI training",
    "Jodhpur artificial intelligence training",
    "Amit Kumar AI tutor Jodhpur"
  ],
  alternates: {
    canonical: pageDetails.canonical
  }
};

export default function AIMLPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "@id": `${pageDetails.canonical}#course`,
        "name": "Artificial Intelligence & Machine Learning Training Program",
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
        "name": "AI & Machine Learning Training",
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
