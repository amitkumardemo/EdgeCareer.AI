"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ResumePreview from "@/app/(main)/resume/_components/resume-preview";
import { toast } from "sonner";

export default function SharedResumeView({ resume }) {
  const formData = JSON.parse(resume.content);

  const generatePDF = async () => {
    try {
      const html2pdf = (await import("html2pdf.js/dist/html2pdf.min.js")).default;
      const element = document.getElementById("resume-preview");
      
      if (!element) {
        toast.error("Resume preview not found");
        return;
      }
      
      const opt = {
        margin: [10, 10],
        filename: `${formData.contactInfo?.name || 'Shared'}_Resume.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          logging: false,
          windowHeight: element.scrollHeight,
          height: element.scrollHeight
        },
        jsPDF: { 
          unit: "mm", 
          format: "a4", 
          orientation: "portrait",
          compress: true
        },
        pagebreak: { 
          mode: ['avoid-all', 'css', 'legacy'],
          avoid: ['div', 'p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
        }
      };

      await html2pdf().set(opt).from(element).save();
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {formData.contactInfo?.name || resume.user?.name}'s Resume
          </h1>
          <p className="text-gray-600">
            Created with{" "}
            <a
              href="https://techiehelpinstituteofai.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium"
            >
              TechieHelp Institute of AI
            </a>
          </p>
          <div className="flex justify-center gap-3 mt-4">
            <Badge variant="outline">Read-Only View</Badge>
            <Button onClick={generatePDF} size="sm" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Resume Preview */}
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <ResumePreview formData={formData} isPublicView={true} />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">
            Want to create your own professional resume?
          </p>
          <a
            href="/resume"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Your Resume with TechieHelp AI
          </a>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Powered by TechieHelp Institute of AI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
