import { getResume } from "@/actions/resume";
import NewResumeBuilder from "./_components/new-resume-builder";

export default async function ResumePage() {
  const resume = await getResume();

  return (
    <div className="container mx-auto py-6">
      <NewResumeBuilder initialContent={resume?.content} />
    </div>
  );
}
