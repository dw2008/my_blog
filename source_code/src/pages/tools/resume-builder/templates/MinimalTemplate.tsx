import React from 'react';
import { ResumeData } from '../types';

export function MinimalTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, education, experience, projects, skills } = data;

  return (
    <div className="bg-white p-12 font-light text-[11pt] leading-loose text-gray-700 min-h-[11in] print:p-8 print:shadow-none">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extralight text-gray-900 tracking-wide">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-x-6 mt-2 text-sm text-gray-400">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
        <div className="mt-3 border-t border-gray-100" />
      </div>

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <span className="text-gray-800">{edu.school}</span>
                <span className="text-sm text-gray-400">{edu.graduationDate}</span>
              </div>
              <p className="text-sm text-gray-500">
                {edu.degree} in {edu.field}
                {edu.gpa && <span> — {edu.gpa} GPA</span>}
              </p>
              {edu.coursework && (
                <p className="text-xs text-gray-400 mt-1">{edu.coursework}</p>
              )}
            </div>
          ))}
          <div className="mt-4 border-t border-gray-100" />
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <span className="text-gray-800">{exp.position}</span>
                <span className="text-sm text-gray-400">
                  {exp.startDate} — {exp.endDate}
                </span>
              </div>
              <p className="text-sm text-gray-500">{exp.company}</p>
              {exp.description && (
                <div className="mt-1 text-sm text-gray-500 space-y-0.5">
                  {exp.description.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="mt-4 border-t border-gray-100" />
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">Projects</h2>
          {projects.map((proj) => (
            <div key={proj.id} className="mb-3">
              <span className="text-gray-800">{proj.name}</span>
              {proj.technologies && (
                <span className="text-xs text-gray-400 ml-2">{proj.technologies}</span>
              )}
              {proj.link && <p className="text-xs text-gray-400">{proj.link}</p>}
              {proj.description && (
                <div className="mt-1 text-sm text-gray-500 space-y-0.5">
                  {proj.description.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="mt-4 border-t border-gray-100" />
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">Skills</h2>
          <p className="text-sm text-gray-500">{skills.join('  /  ')}</p>
        </section>
      )}
    </div>
  );
}
