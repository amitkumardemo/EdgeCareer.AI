"use client";

import ATSChecker from "./_components/ats-checker";
import ATSNav from "./_components/ats-nav";

export default function ATSCheckerPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-4">
        <ATSNav />
      </div>
      <ATSChecker />
    </div>
  );
}
