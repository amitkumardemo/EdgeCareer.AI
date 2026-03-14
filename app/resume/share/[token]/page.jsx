import { getSharedResume } from "@/actions/resume-analytics";
import SharedResumeView from "./_components/shared-resume-view";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export async function generateMetadata({ params }) {
    const token = (await params).token;
    const resume = await getSharedResume(token).catch(() => null);

    if (!resume) {
        return {
            title: "Resume Not Found",
        };
    }

    return {
        title: `${resume.user?.name || "Candidate"}'s Resume - TechieHelp Institute of AI`,
        description: `View this professional resume powered by TechieHelp Institute of AI.`,
    };
}

export default async function SharedResumePage({ params }) {
    const token = (await params).token;

    let resume;
    try {
        resume = await getSharedResume(token);
    } catch (error) {
        notFound();
    }

    if (!resume) {
        notFound();
    }

    // Parse content if it's a string
    let formData;
    try {
        formData = typeof resume.content === 'string' ? JSON.parse(resume.content) : resume.content;
    } catch (e) {
        formData = {};
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                            TechieHelp Institute of AI
                        </span>
                    </div>
                    <Link href="/">
                        <Button size="sm">
                            Build Your Own Resume <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 py-8 container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-6 text-center">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {formData.contactInfo?.name || "Candidate"}'s Resume
                        </h1>
                        <p className="text-muted-foreground text-sm mt-1">
                            Shared via TechieHelp Institute of AI Platform
                        </p>
                    </div>

                    <SharedResumeView resume={resume} />

                    <div className="mt-8 text-center text-sm text-gray-500 pb-8">
                        <p>
                            Want a resume like this?{" "}
                            <Link href="/" className="text-primary hover:underline font-medium">
                                Create yours for free with AI
                            </Link>
                        </p>
                        <p className="mt-2">
                            Powered by TechieHelp Institute of AI
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
