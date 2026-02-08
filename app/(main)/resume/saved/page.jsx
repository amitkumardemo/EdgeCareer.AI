import { getAllResumes } from "@/actions/resume";
import SavedResumesView from "./_components/saved-resumes-view";

export default async function SavedResumesPage() {
  const resumes = await getAllResumes();

  return (
    <div className="container mx-auto py-6">
      <SavedResumesView resumes={resumes} />
    </div>
  );
}
