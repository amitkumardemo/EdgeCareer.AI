import Header from "@/components/header";
import Internship from "@/components/internship";

export const metadata = {
  title: "AI Solutions & Software Development Training | TechieHelp Institute of AI",
  description: "Explore advanced hands-on training in AI automation, calling agents, and custom CRM systems. Start building production-level AI software with TechieHelp Institute of AI.",
  keywords: [
    "AI Training",
    "Software Development Training",
    "TechieHelp Institute of AI",
    "Summer Internship Program",
    "Coding Projects"
  ],
};

export default function PublicInternshipPage() {
  return (
    <>
      <Header />
      <Internship />
    </>
  );
}
