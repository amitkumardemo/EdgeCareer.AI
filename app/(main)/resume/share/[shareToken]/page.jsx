import { getSharedResume } from "@/actions/resume-analytics";
import SharedResumeView from "./_components/shared-resume-view";
import { notFound } from "next/navigation";

export default async function SharedResumePage({ params }) {
  const { shareToken } = await params;
  
  try {
    const resume = await getSharedResume(shareToken);
    return <SharedResumeView resume={resume} />;
  } catch (error) {
    notFound();
  }
}
