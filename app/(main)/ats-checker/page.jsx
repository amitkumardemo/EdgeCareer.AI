import ATSChecker from "./_components/ats-checker";
import ATSNav from "./_components/ats-nav";
import ATSLoading from "./loading";
import { Suspense } from "react";

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
