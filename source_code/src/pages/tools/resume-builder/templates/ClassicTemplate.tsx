import React from 'react';
import { ResumeData } from '../types';

export function ClassicTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, education, experience, projects, skills } = data;

  return (
    <div className="bg-white p-10 text-[11pt] leading-relaxed text-gray-900 min-h-[11in] print:p-8 print:shadow-none" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Header */}
      <div className="text-center mb-4 pb-4 border-b-2 border-navy-800" style={{ borderColor: '#1e3a5f' }}>
        <h1 className="text-3xl font-bold tracking-wide" style={{ color: '#1e3a5f' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-2 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.location && <span>| {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>| {personalInfo.linkedin}</span>}
          {personalInfo.website && <span>| {personalInfo.website}</span>}
        </div>
      </div>

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-base font-bold uppercase tracking-widest mb-2 pb-1 border-b" style={{ color: '#1e3a5f', borderColor: '#1e3a5f' }}>
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between">
                <span className="font-bold">{edu.school}</span>
                <span className="text-sm text-gray-500 italic">{edu.graduationDate}</span>
              </div>
              <p className="italic text-gray-700">
                {edu.degree} in {edu.field}
                {edu.gpa && <span> — GPA: {edu.gpa}</span>}
              </p>
              {edu.coursework && (
                <p className="text-sm text-gray-600 mt-0.5">
                  Relevant Coursework: {edu.coursework}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-base font-bold uppercase tracking-widest mb-2 pb-1 border-b" style={{ color: '#1e3a5f', borderColor: '#1e3a5f' }}>
            Experience
          </h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between">
                <span className="font-bold">{exp.position}</span>
                <span className="text-sm text-gray-500 italic">
                  {exp.startDate} — {exp.endDate}
                </span>
              </div>
              <p className="italic text-gray-600">{exp.company}</p>
              {exp.description && (
                <ul className="mt-1 list-disc ml-5 text-sm text-gray-700 space-y-0.5">
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
          <h2 className="text-base font-bold uppercase tracking-widest mb-2 pb-1 border-b" style={{ color: '#1e3a5f', borderColor: '#1e3a5f' }}>
            Projects
          </h2>
          {projects.map((proj) => (
            <div key={proj.id} className="mb-3">
              <span className="font-bold">{proj.name}</span>
              {proj.technologies && (
                <span className="text-sm text-gray-500 ml-1">({proj.technologies})</span>
              )}
              {proj.link && <span className="text-sm text-blue-700 ml-2">{proj.link}</span>}
              {proj.description && (
                <ul className="mt-1 list-disc ml-5 text-sm text-gray-700 space-y-0.5">
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
          <h2 className="text-base font-bold uppercase tracking-widest mb-2 pb-1 border-b" style={{ color: '#1e3a5f', borderColor: '#1e3a5f' }}>
            Skills
          </h2>
          <p className="text-sm text-gray-700">{skills.join(', ')}</p>
        </section>
      )}
    </div>
  );
}
