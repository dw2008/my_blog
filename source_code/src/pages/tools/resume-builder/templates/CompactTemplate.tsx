import React from 'react';
import { ResumeData } from '../types';

export function CompactTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, education, experience, projects, skills } = data;

  return (
    <div className="bg-white p-8 font-sans text-[10pt] leading-snug text-gray-800 min-h-[11in] print:p-6 print:shadow-none">
      {/* Header */}
      <div className="text-center mb-4 pb-2 border-b border-gray-300">
        <h1 className="text-2xl font-bold text-gray-900">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap justify-center gap-x-3 mt-1 text-xs text-gray-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.location && <span>| {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>| {personalInfo.linkedin}</span>}
          {personalInfo.website && <span>| {personalInfo.website}</span>}
        </div>
      </div>

      {/* Two-column body */}
      <div className="flex gap-6">
        {/* Left column: Skills + Education */}
        <div className="w-[38%] shrink-0">
          {skills.length > 0 && (
            <section className="mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700 border-b border-gray-200 pb-0.5 mb-2">
                Skills
              </h2>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill, i) => (
                  <span key={i} className="text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700 border-b border-gray-200 pb-0.5 mb-2">
                Education
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <p className="font-semibold text-gray-800 text-xs">{edu.school}</p>
                  <p className="text-xs text-gray-600">
                    {edu.degree} in {edu.field}
                  </p>
                  <p className="text-xs text-gray-500">{edu.graduationDate}</p>
                  {edu.gpa && <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>}
                  {edu.coursework && (
                    <p className="text-xs text-gray-400 mt-0.5">{edu.coursework}</p>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right column: Experience + Projects */}
        <div className="flex-1">
          {experience.length > 0 && (
            <section className="mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700 border-b border-gray-200 pb-0.5 mb-2">
                Experience
              </h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-2">
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-xs text-gray-800">{exp.position}</span>
                    <span className="text-xs text-gray-400">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 italic">{exp.company}</p>
                  {exp.description && (
                    <ul className="mt-0.5 list-disc ml-4 text-xs text-gray-600 space-y-0.5">
                      {exp.description.split('\n').map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700 border-b border-gray-200 pb-0.5 mb-2">
                Projects
              </h2>
              {projects.map((proj) => (
                <div key={proj.id} className="mb-2">
                  <span className="font-semibold text-xs text-gray-800">{proj.name}</span>
                  {proj.technologies && (
                    <span className="text-xs text-gray-400 ml-1">({proj.technologies})</span>
                  )}
                  {proj.link && <p className="text-xs text-blue-600">{proj.link}</p>}
                  {proj.description && (
                    <ul className="mt-0.5 list-disc ml-4 text-xs text-gray-600 space-y-0.5">
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
      </div>
    </div>
  );
}
