import React from 'react';
import { ResumeData } from '../types';

export function ModernTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, education, experience, projects, skills } = data;

  return (
    <div className="bg-white flex text-[11pt] leading-relaxed min-h-[11in] print:shadow-none">
      {/* Sidebar */}
      <div className="w-[200px] shrink-0 bg-slate-800 text-white p-6 print:bg-slate-800 print:text-white">
        <h1 className="text-xl font-bold leading-tight mb-4">
          {personalInfo.fullName || 'Your Name'}
        </h1>

        <div className="space-y-4 text-sm">
          <div>
            <h3 className="text-teal-400 font-semibold uppercase text-xs tracking-wider mb-2">Contact</h3>
            <div className="space-y-1 text-slate-300">
              {personalInfo.email && <p className="break-all">{personalInfo.email}</p>}
              {personalInfo.phone && <p>{personalInfo.phone}</p>}
              {personalInfo.location && <p>{personalInfo.location}</p>}
              {personalInfo.linkedin && <p className="break-all">{personalInfo.linkedin}</p>}
              {personalInfo.website && <p className="break-all">{personalInfo.website}</p>}
            </div>
          </div>

          {skills.length > 0 && (
            <div>
              <h3 className="text-teal-400 font-semibold uppercase text-xs tracking-wider mb-2">Skills</h3>
              <div className="space-y-1 text-slate-300">
                {skills.map((skill, i) => (
                  <p key={i}>{skill}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 text-gray-800">
        {/* Education */}
        {education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-teal-700 mb-3 pb-1 border-b-2 border-teal-200">
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold">{edu.school}</h3>
                  <span className="text-sm text-gray-500">{edu.graduationDate}</span>
                </div>
                <p className="text-gray-600">
                  {edu.degree} in {edu.field}
                  {edu.gpa && <span className="ml-2">| GPA: {edu.gpa}</span>}
                </p>
                {edu.coursework && (
                  <p className="text-sm text-gray-500 mt-1">Coursework: {edu.coursework}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-teal-700 mb-3 pb-1 border-b-2 border-teal-200">
              Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold">{exp.position}</h3>
                  <span className="text-sm text-gray-500">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                <p className="text-gray-500 italic">{exp.company}</p>
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
          <section>
            <h2 className="text-lg font-bold text-teal-700 mb-3 pb-1 border-b-2 border-teal-200">
              Projects
            </h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3">
                <h3 className="font-semibold">
                  {proj.name}
                  {proj.technologies && (
                    <span className="font-normal text-sm text-gray-500 ml-2">
                      | {proj.technologies}
                    </span>
                  )}
                </h3>
                {proj.link && <p className="text-sm text-teal-600">{proj.link}</p>}
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
      </div>
    </div>
  );
}
