import React from 'react';
import { ResumeData } from '../types';

export function CreativeTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, education, experience, projects, skills } = data;

  return (
    <div className="bg-white text-[11pt] leading-relaxed text-gray-800 min-h-[11in] print:shadow-none">
      {/* Colored Header Band */}
      <div className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white p-8 print:bg-violet-600 print:text-white">
        <h1 className="text-3xl font-bold tracking-tight">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-violet-100">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </div>

      <div className="p-8">
        {/* Skills as tags */}
        {skills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-violet-700 mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-violet-50 text-violet-700 rounded-full text-sm font-medium border border-violet-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-violet-700 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center text-xs">
                &#x1F393;
              </span>
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3 pl-8">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-gray-900">{edu.school}</h3>
                  <span className="text-sm text-gray-400">{edu.graduationDate}</span>
                </div>
                <p className="text-gray-600">
                  {edu.degree} in {edu.field}
                  {edu.gpa && <span className="ml-2 text-violet-600 font-medium">GPA: {edu.gpa}</span>}
                </p>
                {edu.coursework && (
                  <p className="text-sm text-gray-500 mt-0.5">{edu.coursework}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-violet-700 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center text-xs">
                &#x1F4BC;
              </span>
              Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-3 pl-8 border-l-2 border-violet-200">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                  <span className="text-sm text-gray-400">
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
            <h2 className="text-lg font-bold text-violet-700 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center text-xs">
                &#x1F680;
              </span>
              Projects
            </h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-3 pl-8 border-l-2 border-fuchsia-200">
                <h3 className="font-semibold text-gray-900">
                  {proj.name}
                  {proj.technologies && (
                    <span className="font-normal text-sm text-fuchsia-500 ml-2">
                      {proj.technologies}
                    </span>
                  )}
                </h3>
                {proj.link && <p className="text-sm text-violet-600">{proj.link}</p>}
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
