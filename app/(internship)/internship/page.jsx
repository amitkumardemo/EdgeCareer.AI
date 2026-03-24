import { getFirebaseUser } from "@/lib/auth-utils";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export const metadata = {
  title: "Premium AI Internship Program | TechieHelp",
  description: "Apply for our high-impact AI and Software Engineering internship programs. Gain real-world experience, work on live projects, and earn a professional internship certificate.",
  keywords: ["AI Internship", "Software Engineering Internship", "TechieHelp Internship", "Machine Learning Intern", "Web Development Internship", "Internship Certificate"],
};

export default async function InternshipRootPage() {
  const firebaseUser = await getFirebaseUser();
  if (!firebaseUser) redirect("/sign-in?redirect_url=/internship");

  // Check onboarding status
  const { isOnboarded } = await getUserOnboardingStatus();
  if (!isOnboarded) {
    redirect("/onboarding");
  }

  const user = await prisma.user.findUnique({
    where: { uid: firebaseUser.uid },
    select: { role: true },
  });

  if (user?.role === "ADMIN") redirect("/internship/admin/dashboard");
  if (user?.role === "TPO") redirect("/internship/college/dashboard");
  redirect("/internship/student/dashboard");
}
