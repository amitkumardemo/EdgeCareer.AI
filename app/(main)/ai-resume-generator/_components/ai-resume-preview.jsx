"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useRef } from "react";

export default function AIResumePreview({ resumeData }) {
  const previewRef = useRef(null);

  const handleDownload = async () => {
    if (!previewRef.current) return;

    try {
      // Dynamic import for html2canvas and jspdf
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const element = previewRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resumeData.contactInfo?.name || 'Resume'}_ATS_Optimized.pdf`);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download resume. Please try again.');
    }
  };

  if (!resumeData) return null;

  const { contactInfo, summary, skills, experience = [], education = [], projects = [] } = resumeData;

  return (
    <div className="space-y-4">
      {/* Download Button */}
      <div className="flex justify-end">
        <Button onClick={handleDownload} size="sm">
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
      </div>

      {/* Resume Preview */}
      <div 
        ref={previewRef}
        className="bg-white text-black p-8 shadow-lg border overflow-auto" 
        style={{ 
          width: '210mm', 
          minHeight: '297mm',
          maxHeight: '297mm',
          fontSize: '11px',
          lineHeight: '1.4'
        }}
      >
        {/* Header */}
        <div className="border-b-2 border-gray-800 pb-3 mb-4">
          <h1 className="font-bold text-gray-900 mb-2" style={{ fontSize: '24px' }}>
            {contactInfo?.name || "YOUR NAME"}
          </h1>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-gray-700" style={{ fontSize: '10px' }}>
            {contactInfo?.email && (
              <span>{contactInfo.email}</span>
            )}
            {contactInfo?.mobile && (
              <span>{contactInfo.mobile}</span>
            )}
            {contactInfo?.linkedin && (
              <span>LinkedIn: {contactInfo.linkedin}</span>
            )}
            {contactInfo?.github && (
              <span>GitHub: {contactInfo.github}</span>
            )}
            {contactInfo?.portfolio && (
              <span>Portfolio: {contactInfo.portfolio}</span>
            )}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-3 gap-4">
          {/* Left Column */}
          <div className="col-span-1 space-y-3">
            {/* Professional Summary */}
            {summary && (
              <div>
                <h2 className="font-bold text-gray-900 border-b border-gray-400 pb-1 mb-1" style={{ fontSize: '12px' }}>
                  SUMMARY
                </h2>
                <p className="text-gray-800 whitespace-pre-wrap" style={{ fontSize: '10px', lineHeight: '1.3' }}>
                  {summary}
                </p>
              </div>
            )}

            {/* Skills */}
            {skills && (
              <div>
                <h2 className="font-bold text-gray-900 border-b border-gray-400 pb-1 mb-1" style={{ fontSize: '12px' }}>
                  SKILLS
                </h2>
                <p className="text-gray-800 whitespace-pre-wrap" style={{ fontSize: '10px', lineHeight: '1.3' }}>
                  {skills}
                </p>
              </div>
            )}

            {/* Education */}
            {education && education.length > 0 && (
              <div>
                <h2 className="font-bold text-gray-900 border-b border-gray-400 pb-1 mb-1" style={{ fontSize: '12px' }}>
                  EDUCATION
                </h2>
                <div className="space-y-2">
                  {education.map((edu, index) => (
                    <div key={index} style={{ fontSize: '10px' }}>
                      <div className="font-semibold text-gray-900">{edu.title}</div>
                      <div className="text-gray-700">{edu.organization}</div>
                      <div className="text-gray-600" style={{ fontSize: '9px' }}>
                        {edu.current ? `${edu.startDate} - Present` : `${edu.startDate} - ${edu.endDate}`}
                      </div>
                      {edu.description && (
                        <p className="text-gray-700 mt-1 whitespace-pre-wrap" style={{ fontSize: '9px', lineHeight: '1.2' }}>
                          {edu.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="col-span-2 space-y-3">
            {/* Experience */}
            {experience && experience.length > 0 && (
              <div>
                <h2 className="font-bold text-gray-900 border-b border-gray-400 pb-1 mb-2" style={{ fontSize: '12px' }}>
                  EXPERIENCE
                </h2>
                <div className="space-y-3">
                  {experience.map((exp, index) => (
                    <div key={index} style={{ fontSize: '10px' }}>
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <div className="font-semibold text-gray-900">{exp.title}</div>
                          <div className="text-gray-700">{exp.organization}</div>
                        </div>
                        <div className="text-gray-600 text-right" style={{ fontSize: '9px' }}>
                          {exp.current ? `${exp.startDate} - Present` : `${exp.startDate} - ${exp.endDate}`}
                        </div>
                      </div>
                      {exp.description && (
                        <div 
                          className="text-gray-800 whitespace-pre-wrap mt-1" 
                          style={{ fontSize: '10px', lineHeight: '1.3' }}
                          dangerouslySetInnerHTML={{ __html: exp.description.replace(/\n/g, '<br/>') }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
              <div>
                <h2 className="font-bold text-gray-900 border-b border-gray-400 pb-1 mb-2" style={{ fontSize: '12px' }}>
                  PROJECTS
                </h2>
                <div className="space-y-3">
                  {projects.map((project, index) => (
                    <div key={index} style={{ fontSize: '10px' }}>
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <div className="font-semibold text-gray-900">{project.title}</div>
                          {project.organization && (
                            <div className="text-gray-700">{project.organization}</div>
                          )}
                        </div>
                        {project.startDate && (
                          <div className="text-gray-600 text-right" style={{ fontSize: '9px' }}>
                            {project.current ? `${project.startDate} - Present` : `${project.startDate} - ${project.endDate}`}
                          </div>
                        )}
                      </div>
                      {project.description && (
                        <div 
                          className="text-gray-800 whitespace-pre-wrap mt-1" 
                          style={{ fontSize: '10px', lineHeight: '1.3' }}
                          dangerouslySetInnerHTML={{ __html: project.description.replace(/\n/g, '<br/>') }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
