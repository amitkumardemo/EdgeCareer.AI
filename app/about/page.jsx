import Header from "@/components/header";
import AboutClient from "./AboutClient";

export const metadata = {
  title: "About Us | TechieHelp Institute of AI",
  description: "Learn more about TechieHelp Institute of AI. Read our story, mission, values, and how we empower students across India with industry-focused training and internships.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <AboutClient />
    </>
  );
}
