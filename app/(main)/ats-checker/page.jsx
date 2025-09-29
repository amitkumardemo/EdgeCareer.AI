"use client";

import ATSChecker from "./_components/ats-checker";

export default function ATSCheckerPage() {
  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">ATS Resume Checker</h1>
      <ATSChecker />
    </main>
  );
}
