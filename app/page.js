import Header from "@/components/header";
import LandingPage from "./LandingPage";
import { db } from "@/lib/prisma";

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

export default async function Home() {
  const latestJobs = await db.job.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      employmentType: true,
      salary: true,
      skills: true,
      applyBefore: true,
      company: { select: { name: true, logoUrl: true } },
      location: { select: { name: true } },
    }
  });

  return (
    <>
      <Header />
      <LandingPage latestJobs={latestJobs} />
    </>
  );
}
