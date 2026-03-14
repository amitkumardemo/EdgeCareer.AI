"use client";

import { Mail, Phone, Linkedin, Github, Globe } from "lucide-react";

export default function ResumePreview({ formData, data, isPublicView = false }) {
  // Support both formData and data props for flexibility
  const resumeData = data || formData || {};
  const { contactInfo = {}, summary, skills, experience = [], education = [], projects = [], achievements, positions, whyIFit } = resumeData;

  return (
    <div id="resume-preview" className="bg-white text-black p-8 shadow-lg" style={{
      width: '210mm',
      height: '297mm',
      maxHeight: '297mm',
      fontSize: '11.5px',
      lineHeight: '1.5',
      overflow: 'hidden',
      pageBreakAfter: 'avoid',
      pageBreakBefore: 'avoid',
      pageBreakInside: 'avoid',
      boxSizing: 'border-box'
    }}>
      {/* Header */}
      <div className="border-b-2 border-gray-800 pb-3 mb-5">
        <h1 className="font-bold text-gray-900 mb-2 uppercase tracking-wide" style={{ fontSize: '28px', letterSpacing: '-0.5px' }}>
          {contactInfo.name || "YOUR NAME"}
        </h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-gray-700" style={{ fontSize: '11px' }}>
          {contactInfo.email && (
            <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-1 hover:text-blue-600 no-underline">
              <Mail style={{ width: '12px', height: '12px', color: '#374151' }} />
              {contactInfo.email}
            </a>
          )}
          {contactInfo.mobile && (
            <span className="flex items-center gap-1">
              <Phone style={{ width: '12px', height: '12px', color: '#374151' }} />
              {contactInfo.mobile}
            </span>
          )}
          {contactInfo.linkedin && (
            <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 no-underline">
              <Linkedin style={{ width: '12px', height: '12px', color: '#374151' }} />
              LinkedIn
            </a>
          )}
          {contactInfo.github && (
            <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 no-underline">
              <Github style={{ width: '12px', height: '12px', color: '#374151' }} />
              GitHub
            </a>
          )}
          {contactInfo.portfolio && (
            <a href={contactInfo.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 no-underline">
              <Globe style={{ width: '12px', height: '12px', color: '#374151' }} />
              Portfolio
            </a>
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
              <h2 className="font-bold text-gray-900 border-b-2 border-gray-300 pb-1 mb-2 uppercase tracking-wider" style={{ fontSize: '14px' }}>
                SUMMARY
              </h2>
              <p className="text-gray-800 whitespace-pre-wrap text-justify" style={{ fontSize: '11px', lineHeight: '1.6' }}>
                {summary}
              </p>
            </div>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <div>
              <h2 className="font-bold text-gray-900 border-b-2 border-gray-300 pb-1 mb-2 uppercase tracking-wider" style={{ fontSize: '14px' }}>
                EDUCATION
              </h2>
              <div className="space-y-3">
                {education.map((edu, index) => (
                  <div key={index} style={{ fontSize: '11px' }}>
                    <div className="font-bold text-gray-900">{edu.title}</div>
                    <div className="text-gray-700 font-medium">{edu.organization}</div>
                    <div className="text-gray-600 font-medium" style={{ fontSize: '10px' }}>
                      {edu.current ? `${edu.startDate} - Present` : `${edu.startDate} - ${edu.endDate}`}
                    </div>
                    {edu.description && (
                      <p className="text-gray-700 mt-1 whitespace-pre-wrap" style={{ fontSize: '10.5px', lineHeight: '1.5' }}>{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills && (
            <div>
              <h2 className="font-bold text-gray-900 border-b-2 border-gray-300 pb-1 mb-2 uppercase tracking-wider" style={{ fontSize: '14px' }}>
                SKILLS
              </h2>
              <div className="text-gray-800 whitespace-pre-wrap text-justify" style={{ fontSize: '11px', lineHeight: '1.6' }}>
                {skills}
              </div>
            </div>
          )}

          {/* Achievements */}
          {achievements && (
            <div>
              <h2 className="font-bold text-gray-900 border-b-2 border-gray-300 pb-1 mb-2 uppercase tracking-wider" style={{ fontSize: '14px' }}>
                ACHIEVEMENTS
              </h2>
              <div className="text-gray-800 whitespace-pre-wrap text-justify" style={{ fontSize: '11px', lineHeight: '1.6' }}>
                {achievements}
              </div>
            </div>
          )}

          {/* Positions of Responsibility */}
          {positions && (
            <div>
              <h2 className="font-bold text-gray-900 border-b-2 border-gray-300 pb-1 mb-2 uppercase tracking-wider" style={{ fontSize: '14px' }}>
                LEADERSHIP
              </h2>
              <div className="text-gray-800 whitespace-pre-wrap text-justify" style={{ fontSize: '11px', lineHeight: '1.6' }}>
                {positions}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-3">
          {/* Experience */}
          {experience && experience.length > 0 && (
            <div>
              <h2 className="font-bold text-gray-900 border-b-2 border-gray-300 pb-1 mb-3 uppercase tracking-wider" style={{ fontSize: '14px' }}>
                EXPERIENCE
              </h2>
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <div key={index} style={{ fontSize: '11px' }}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <div className="font-bold text-gray-900 text-lg" style={{ fontSize: '12.5px' }}>{exp.title}</div>
                        <div className="text-gray-700 font-medium">{exp.organization}</div>
                      </div>
                      <div className="text-gray-600 text-right font-medium" style={{ fontSize: '10px' }}>
                        {exp.current ? `${exp.startDate} - Present` : `${exp.startDate} - ${exp.endDate}`}
                      </div>
                    </div>
                    {exp.description && (
                      <div className="text-gray-700 mt-1 whitespace-pre-wrap text-justify" style={{ fontSize: '10.5px', lineHeight: '1.5' }}>
                        {exp.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <div>
              <h2 className="font-bold text-gray-900 border-b-2 border-gray-300 pb-1 mb-3 uppercase tracking-wider" style={{ fontSize: '14px' }}>
                PROJECTS
              </h2>
              <div className="space-y-3">
                {projects.map((project, index) => (
                  <div key={index} style={{ fontSize: '11px' }}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <div className="font-bold text-gray-900" style={{ fontSize: '12px' }}>{project.title}</div>
                        {project.organization && (
                          <div className="text-gray-700 font-medium">{project.organization}</div>
                        )}
                      </div>
                      {(project.startDate || project.endDate) && (
                        <div className="text-gray-600 text-right font-medium" style={{ fontSize: '10px' }}>
                          {project.current ? `${project.startDate} - Present` : `${project.startDate} - ${project.endDate}`}
                        </div>
                      )}
                    </div>
                    {project.description && (
                      <div className="text-gray-700 mt-1 whitespace-pre-wrap text-justify" style={{ fontSize: '10.5px', lineHeight: '1.5' }}>
                        {project.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Why I Fit This Role */}
          {whyIFit && (
            <div>
              <h2 className="font-bold text-gray-900 border-b border-gray-400 pb-1 mb-1" style={{ fontSize: '12px' }}>
                WHY I FIT THIS ROLE
              </h2>
              <div className="text-gray-800 whitespace-pre-wrap" style={{ fontSize: '10px', lineHeight: '1.3' }}>
                {whyIFit}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer - Only shown in public view */}
      {isPublicView && (
        <div className="mt-4 pt-3 border-t border-gray-300 text-center">
          <p className="text-gray-600" style={{ fontSize: '9px' }}>
            Powered by TechieHelp Institute of AI
          </p>
        </div>
      )}
    </div>
  );
}
