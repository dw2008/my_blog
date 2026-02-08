import React from 'react';
import { ResumeData } from '../types';

export function AcademicTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, education, experience, projects, skills } = data;

  return (
    <div className="bg-white p-10 text-[10.5pt] leading-snug text-gray-900 min-h-[11in] print:p-8 print:shadow-none" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="text-sm text-gray-600 mt-1">
          {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin, personalInfo.website]
            .filter(Boolean)
            .join(' \u2022 ')}
        </div>
      </div>

      {/* Education — prominent */}
      {education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wide border-b-2 border-gray-900 pb-0.5 mb-2">
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between">
                <span className="font-bold">{edu.school}</span>
                <span className="text-sm">{edu.graduationDate}</span>
              </div>
              <p>
                <span className="italic">{edu.degree} in {edu.field}</span>
                {edu.gpa && <span className="ml-2">| GPA: {edu.gpa}</span>}
              </p>
              {edu.coursework && (
                <p className="text-sm text-gray-700 mt-0.5">
                  <span className="font-semibold">Relevant Coursework:</span> {edu.coursework}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wide border-b-2 border-gray-900 pb-0.5 mb-2">
            Technical Skills
          </h2>
          <p className="text-sm">{skills.join(', ')}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wide border-b-2 border-gray-900 pb-0.5 mb-2">
            Experience
          </h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-2">
              <div className="flex justify-between">
                <span className="font-bold">{exp.position}</span>
                <span className="text-sm">
                  {exp.startDate} — {exp.endDate}
                </span>
              </div>
              <p className="italic text-gray-700">{exp.company}</p>
              {exp.description && (
                <ul className="mt-0.5 list-disc ml-5 text-sm space-y-0.5">
                  {exp.description.split('\n').map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wide border-b-2 border-gray-900 pb-0.5 mb-2">
            Projects
          </h2>
          {projects.map((proj) => (
            <div key={proj.id} className="mb-2">
              <span className="font-bold">{proj.name}</span>
              {proj.technologies && (
                <span className="text-sm text-gray-600 ml-1">({proj.technologies})</span>
              )}
              {proj.link && <span className="text-sm text-gray-500 ml-2">[{proj.link}]</span>}
              {proj.description && (
                <ul className="mt-0.5 list-disc ml-5 text-sm space-y-0.5">
                  {proj.description.split('\n').map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
