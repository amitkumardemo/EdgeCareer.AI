import Header from "@/components/header";
import LandingPage from "./LandingPage";

export const metadata = {
  title: "TechieHelp Institute of AI | Best AI Training & Internship Platform in Jodhpur",
  description: "TechieHelp Institute of AI offers AI & ML, Data Science, Web Development, Cyber Security, Cloud Computing, and Digital Marketing training with internships, certifications, live projects, and placement support in Jodhpur.",
  keywords: [
    "TechieHelp Institute of AI",
    "AI Training in Jodhpur",
    "Best Internship in Jodhpur",
    "Machine Learning Internship in Jodhpur",
    "Data Science Internship in Jodhpur",
    "Web Development Training in Jodhpur",
    "Cyber Security Training in Jodhpur",
    "Cloud Computing Training in Jodhpur",
    "Digital Marketing Internship in Jodhpur",
    "AI Course in Jodhpur",
    "Summer Internship Jodhpur",
    "Training and Internship Institute Jodhpur"
  ],
};

export default function Home() {
  return (
    <>
      <Header />
      <LandingPage />
    </>
  );
}
