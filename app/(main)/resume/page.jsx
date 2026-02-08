import { getResume } from "@/actions/resume";
import { getUserResumes, getResumeAnalytics } from "@/actions/resume-analytics";
import DualModeResumeBuilder from "./_components/dual-mode-resume-builder";
import { ResumeHistory } from "./_components/resume-history";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Brain, Download, Share2 } from "lucide-react";

export default async function ResumePage({ searchParams }) {
  const params = await searchParams;
  const resumeId = params?.id;
  
  const resume = await getResume(resumeId);
  const allResumes = await getUserResumes();
  const analytics = await getResumeAnalytics();

  return (
    <div className="container mx-auto py-6 space-y-8">
      <DualModeResumeBuilder 
        initialContent={resume?.content} 
        initialName={resume?.name}
        resumeId={resume?.id}
      />
      
      {/* Resume Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Resumes
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalResumesCreated}</div>
            <p className="text-xs text-muted-foreground">
              All resumes built
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Manual / AI
            </CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.manualResumesCount || 0} / {analytics.aiResumesCount || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Built manually vs AI
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Downloads
            </CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalResumesDownloaded}</div>
            <p className="text-xs text-muted-foreground">
              PDF downloads
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Shares
            </CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalResumesShared}</div>
            <p className="text-xs text-muted-foreground">
              Resume shares
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Resume History Section */}
      <div className="mt-8">
        <ResumeHistory resumes={allResumes} />
      </div>
    </div>
  );
}
