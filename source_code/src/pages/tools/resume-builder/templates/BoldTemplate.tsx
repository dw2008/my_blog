import React from 'react';
import { ResumeData } from '../types';

export function BoldTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, education, experience, projects, skills } = data;

  return (
    <div className="bg-white p-10 font-sans text-[11pt] leading-relaxed text-gray-800 min-h-[11in] print:p-8 print:shadow-none">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-black text-indigo-900 tracking-tight">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-500 font-medium">
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
          <div className="bg-indigo-700 text-white px-3 py-1.5 font-bold text-sm uppercase tracking-wider mb-3">
            Education
          </div>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3 pl-1">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-gray-900">{edu.school}</h3>
                <span className="text-sm text-gray-500 font-semibold">{edu.graduationDate}</span>
              </div>
              <p className="text-gray-600">
                {edu.degree} in {edu.field}
                {edu.gpa && <span className="font-semibold ml-2">GPA: {edu.gpa}</span>}
              </p>
              {edu.coursework && (
                <p className="text-sm text-gray-500 mt-0.5">
                  <span className="font-bold">Coursework:</span> {edu.coursework}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-5">
          <div className="bg-indigo-700 text-white px-3 py-1.5 font-bold text-sm uppercase tracking-wider mb-3">
            Experience
          </div>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-3 pl-1">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-gray-900">{exp.position}</h3>
                <span className="text-sm text-gray-500 font-semibold">
                  {exp.startDate} — {exp.endDate}
                </span>
              </div>
              <p className="text-gray-500 italic font-medium">{exp.company}</p>
              {exp.description && (
                <ul className="mt-1 list-disc list-inside text-sm text-gray-600 space-y-0.5">
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
          <div className="bg-indigo-700 text-white px-3 py-1.5 font-bold text-sm uppercase tracking-wider mb-3">
            Projects
          </div>
          {projects.map((proj) => (
            <div key={proj.id} className="mb-3 pl-1">
              <h3 className="font-bold text-gray-900">
                {proj.name}
                {proj.technologies && (
                  <span className="font-normal text-sm text-gray-500 ml-2">{proj.technologies}</span>
                )}
              </h3>
              {proj.link && <p className="text-sm text-indigo-600 font-medium">{proj.link}</p>}
              {proj.description && (
                <ul className="mt-1 list-disc list-inside text-sm text-gray-600 space-y-0.5">
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
          <div className="bg-indigo-700 text-white px-3 py-1.5 font-bold text-sm uppercase tracking-wider mb-3">
            Skills
          </div>
          <p className="text-sm text-gray-700 font-medium pl-1">{skills.join(' \u2022 ')}</p>
        </section>
      )}
    </div>
  );
}
