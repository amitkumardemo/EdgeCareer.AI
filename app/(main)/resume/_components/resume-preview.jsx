"use client";

export default function ResumePreview({ formData }) {
  const { contactInfo = {}, summary, skills, experience = [], education = [], projects = [], achievements, positions, whyIFit } = formData || {};

  return (
    <div id="resume-preview" className="bg-white text-black p-8 shadow-lg" style={{ 
      width: '210mm', 
      minHeight: '297mm',
      maxHeight: '297mm',
      fontSize: '11px',
      lineHeight: '1.4',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div className="border-b-2 border-gray-800 pb-3 mb-4">
        <h1 className="font-bold text-gray-900 mb-2" style={{ fontSize: '24px' }}>
          {contactInfo.name || "YOUR NAME"}
        </h1>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-gray-700" style={{ fontSize: '10px' }}>
          {contactInfo.email && (
            <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-1 hover:text-blue-600 no-underline">
              {contactInfo.email}
            </a>
          )}
          {contactInfo.mobile && (
            <span className="flex items-center gap-1">
              {contactInfo.mobile}
            </span>
          )}
          {contactInfo.linkedin && (
            <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 no-underline">
              LinkedIn
            </a>
          )}
          {contactInfo.github && (
            <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 no-underline">
              GitHub
            </a>
          )}
          {contactInfo.portfolio && (
            <a href={contactInfo.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 no-underline">
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
              <h2 className="font-bold text-gray-900 border-b border-gray-400 pb-1 mb-1" style={{ fontSize: '12px' }}>
                SUMMARY
              </h2>
              <p className="text-gray-800 whitespace-pre-wrap" style={{ fontSize: '10px', lineHeight: '1.3' }}>
                {summary}
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
                      <p className="text-gray-700 mt-1 whitespace-pre-wrap" style={{ fontSize: '9px', lineHeight: '1.2' }}>{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills && (
            <div>
              <h2 className="font-bold text-gray-900 border-b border-gray-400 pb-1 mb-1" style={{ fontSize: '12px' }}>
                SKILLS
              </h2>
              <div className="text-gray-800 whitespace-pre-wrap" style={{ fontSize: '10px', lineHeight: '1.3' }}>
                {skills}
              </div>
            </div>
          )}

          {/* Achievements */}
          {achievements && (
            <div>
              <h2 className="font-bold text-gray-900 border-b border-gray-400 pb-1 mb-1" style={{ fontSize: '12px' }}>
                ACHIEVEMENTS
              </h2>
              <div className="text-gray-800 whitespace-pre-wrap" style={{ fontSize: '10px', lineHeight: '1.3' }}>
                {achievements}
              </div>
            </div>
          )}

          {/* Positions of Responsibility */}
          {positions && (
            <div>
              <h2 className="font-bold text-gray-900 border-b border-gray-400 pb-1 mb-1" style={{ fontSize: '12px' }}>
                LEADERSHIP
              </h2>
              <div className="text-gray-800 whitespace-pre-wrap" style={{ fontSize: '10px', lineHeight: '1.3' }}>
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
              <h2 className="font-bold text-gray-900 border-b border-gray-400 pb-1 mb-2" style={{ fontSize: '12px' }}>
                EXPERIENCE
              </h2>
              <div className="space-y-2">
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
                      <div className="text-gray-700 mt-1 whitespace-pre-wrap" style={{ fontSize: '9px', lineHeight: '1.2' }}>
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
              <h2 className="font-bold text-gray-900 border-b border-gray-400 pb-1 mb-2" style={{ fontSize: '12px' }}>
                PROJECTS
              </h2>
              <div className="space-y-2">
                {projects.map((project, index) => (
                  <div key={index} style={{ fontSize: '10px' }}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <div className="font-semibold text-gray-900">{project.title}</div>
                        {project.organization && (
                          <div className="text-gray-700">{project.organization}</div>
                        )}
                      </div>
                      {(project.startDate || project.endDate) && (
                        <div className="text-gray-600 text-right" style={{ fontSize: '9px' }}>
                          {project.current ? `${project.startDate} - Present` : `${project.startDate} - ${project.endDate}`}
                        </div>
                      )}
                    </div>
                    {project.description && (
                      <div className="text-gray-700 mt-1 whitespace-pre-wrap" style={{ fontSize: '9px', lineHeight: '1.2' }}>
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
    </div>
  );
}
