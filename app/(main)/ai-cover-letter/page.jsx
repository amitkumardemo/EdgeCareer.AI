import { getCoverLetters } from "@/actions/cover-letter";
import CoverLetterView from "./_components/cover-letter-view";
import CoverLetterLoading from "./loading";
import { Suspense } from "react";

export default function CoverLetterPage() {
  return (
    <Suspense fallback={<CoverLetterLoading />}>
      <CoverLetterContent />
    </Suspense>
  );
}

async function CoverLetterContent() {
  // Add a small delay to ensure the premium loading animation is visible
  const [coverLetters] = await Promise.all([
    getCoverLetters(),
    new Promise((resolve) => setTimeout(resolve, 1500)),
  ]);

  return <CoverLetterView coverLetters={coverLetters} />;
}
