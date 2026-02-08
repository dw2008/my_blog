import React from 'react';
import { ResumeData } from '../types';

export function CleanTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, education, experience, projects, skills } = data;

  return (
    <div className="bg-white p-10 font-sans text-[11pt] leading-relaxed text-gray-800 min-h-[11in] print:p-8 print:shadow-none">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2 text-sm text-slate-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </div>

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-lg font-semibold text-slate-700 border-b border-slate-300 pb-1 mb-3">
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-slate-800">{edu.school}</h3>
                <span className="text-sm text-slate-500">{edu.graduationDate}</span>
              </div>
              <p className="text-slate-600">
                {edu.degree} in {edu.field}
                {edu.gpa && <span className="ml-2">| GPA: {edu.gpa}</span>}
              </p>
              {edu.coursework && (
                <p className="text-sm text-slate-500 mt-1">
                  <span className="font-medium">Coursework:</span> {edu.coursework}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-lg font-semibold text-slate-700 border-b border-slate-300 pb-1 mb-3">
            Experience
          </h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-slate-800">{exp.position}</h3>
                <span className="text-sm text-slate-500">
                  {exp.startDate} — {exp.endDate}
                </span>
              </div>
              <p className="text-slate-600 italic">{exp.company}</p>
              {exp.description && (
                <ul className="mt-1 list-disc list-inside text-sm text-slate-600 space-y-0.5">
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
        <section className="mb-5">
          <h2 className="text-lg font-semibold text-slate-700 border-b border-slate-300 pb-1 mb-3">
            Projects
          </h2>
          {projects.map((proj) => (
            <div key={proj.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-slate-800">
                  {proj.name}
                  {proj.technologies && (
                    <span className="font-normal text-sm text-slate-500 ml-2">
                      | {proj.technologies}
                    </span>
                  )}
                </h3>
              </div>
              {proj.link && <p className="text-sm text-blue-600">{proj.link}</p>}
              {proj.description && (
                <ul className="mt-1 list-disc list-inside text-sm text-slate-600 space-y-0.5">
                  {proj.description.split('\n').map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-slate-700 border-b border-slate-300 pb-1 mb-3">
            Skills
          </h2>
          <p className="text-sm text-slate-600">{skills.join(' \u2022 ')}</p>
        </section>
      )}
    </div>
  );
}
