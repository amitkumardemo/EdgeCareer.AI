import ATSChecker from "./_components/ats-checker";
import ATSNav from "./_components/ats-nav";
import ATSLoading from "./loading";
import { Suspense } from "react";

export const metadata = {
  title: "Free AI ATS Resume Checker & Scanner",
  description: "Check your resume ATS score instantly. Our AI ATS Resume Scanner analyzes your resume keywords against job descriptions to ensure you pass Applicant Tracking Systems seamlessly.",
  keywords: ["ATS Resume Checker", "ATS Resume Scanner", "Free ATS Checker", "ATS Score", "Resume Keyword Optimization", "Check ATS Score Online"],
};

export default function ATSCheckerPage() {
  return (
    <Suspense fallback={<ATSLoading />}>
      <ATSContent />
    </Suspense>
  );
}

async function ATSContent() {
  // Add a small delay for premium experience
  await new Promise(resolve => setTimeout(resolve, 1500));

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-4">
        <ATSNav />
      </div>
      <ATSChecker />
    </div>
  );
}
