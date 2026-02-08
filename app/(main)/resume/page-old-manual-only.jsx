import { getResume } from "@/actions/resume";
import NewResumeBuilder from "./_components/new-resume-builder";

export default async function ResumePage({ searchParams }) {
  const params = await searchParams;
  const resumeId = params?.id;
  
  const resume = await getResume(resumeId);

  return (
    <div className="container mx-auto py-6">
      <NewResumeBuilder 
        initialContent={resume?.content} 
        initialName={resume?.name}
        resumeId={resume?.id}
      />
    </div>
  );
}
