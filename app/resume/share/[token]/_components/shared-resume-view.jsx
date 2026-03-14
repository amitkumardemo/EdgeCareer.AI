"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ResumePreview from "@/app/(main)/resume/_components/resume-preview";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function SharedResumeView({ resume }) {
  // Parse content if it's a string, otherwise use it as is
  const formData = typeof resume.content === 'string' ? JSON.parse(resume.content) : resume.content;
  const contactInfo = formData.contactInfo || {};
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const html2pdf = (await import("html2pdf.js/dist/html2pdf.min.js")).default;
      const element = document.getElementById("resume-preview");

      if (!element) {
        toast.error("Resume preview not found");
        return;
      }

      const opt = {
        margin: [0, 0],
        filename: `${contactInfo.name || 'Shared'}_Resume.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      };

      await html2pdf().set(opt).from(element).save();
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden print:shadow-none print:rounded-none max-w-[210mm] mx-auto">
      {/* Controls Bar */}
      <div className="bg-gray-50 border-b p-4 flex justify-between items-center print:hidden">
        <Badge variant="outline" className="text-gray-600">
          Read-Only View
        </Badge>
        <Button onClick={generatePDF} size="sm" variant="outline" className="gap-2" disabled={isGenerating}>
          {isGenerating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          Download PDF
        </Button>
      </div>

      {/* Resume Preview */}
      <div className="p-0">
        <ResumePreview formData={formData} isPublicView={true} />
      </div>
    </div>
  );
}
