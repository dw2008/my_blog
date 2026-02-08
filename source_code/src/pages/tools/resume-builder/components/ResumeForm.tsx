import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { ResumeData, Education, Experience, Project } from '../types';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

function Section({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
      >
        {title}
        {open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>
      {open && <div className="px-4 pb-4 space-y-3">{children}</div>}
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-stone-500">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full px-3 py-1.5 text-sm border border-stone-200 rounded-lg bg-stone-50 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 transition-shadow"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-stone-500">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="mt-1 w-full px-3 py-1.5 text-sm border border-stone-200 rounded-lg bg-stone-50 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 transition-shadow resize-y"
      />
    </label>
  );
}

function genId() {
  return crypto.randomUUID();
}

export function ResumeForm({ data, onChange }: ResumeFormProps) {
  const updatePersonal = (field: string, value: string) => {
    onChange({ ...data, personalInfo: { ...data.personalInfo, [field]: value } });
  };

  const updateEducation = (index: number, updated: Education) => {
    const list = [...data.education];
    list[index] = updated;
    onChange({ ...data, education: list });
  };

  const addEducation = () => {
    onChange({
      ...data,
      education: [
        ...data.education,
        { id: genId(), school: '', degree: '', field: '', graduationDate: '', gpa: '', coursework: '' },
      ],
    });
  };

  const removeEducation = (index: number) => {
    onChange({ ...data, education: data.education.filter((_, i) => i !== index) });
  };

  const updateExperience = (index: number, updated: Experience) => {
    const list = [...data.experience];
    list[index] = updated;
    onChange({ ...data, experience: list });
  };

  const addExperience = () => {
    onChange({
      ...data,
      experience: [
        ...data.experience,
        { id: genId(), company: '', position: '', startDate: '', endDate: '', description: '' },
      ],
    });
  };

  const removeExperience = (index: number) => {
    onChange({ ...data, experience: data.experience.filter((_, i) => i !== index) });
  };

  const updateProject = (index: number, updated: Project) => {
    const list = [...data.projects];
    list[index] = updated;
    onChange({ ...data, projects: list });
  };

  const addProject = () => {
    onChange({
      ...data,
      projects: [
        ...data.projects,
        { id: genId(), name: '', technologies: '', description: '', link: '' },
      ],
    });
  };

  const removeProject = (index: number) => {
    onChange({ ...data, projects: data.projects.filter((_, i) => i !== index) });
  };

  const updateSkills = (value: string) => {
    onChange({ ...data, skills: value.split(',').map((s) => s.trim()).filter(Boolean) });
  };

  return (
    <div className="space-y-3">
      {/* Personal Info */}
      <Section title="Personal Information">
        <Input label="Full Name" value={data.personalInfo.fullName} onChange={(v) => updatePersonal('fullName', v)} />
        <Input label="Email" value={data.personalInfo.email} onChange={(v) => updatePersonal('email', v)} />
        <Input label="Phone" value={data.personalInfo.phone} onChange={(v) => updatePersonal('phone', v)} />
        <Input label="Location" value={data.personalInfo.location} onChange={(v) => updatePersonal('location', v)} />
        <Input label="LinkedIn" value={data.personalInfo.linkedin} onChange={(v) => updatePersonal('linkedin', v)} placeholder="linkedin.com/in/..." />
        <Input label="Website" value={data.personalInfo.website} onChange={(v) => updatePersonal('website', v)} placeholder="yoursite.com" />
      </Section>

      {/* Education */}
      <Section title="Education">
        {data.education.map((edu, i) => (
          <div key={edu.id} className="space-y-2 pb-3 border-b border-stone-100 last:border-0 last:pb-0">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-stone-400">#{i + 1}</span>
              <button type="button" onClick={() => removeEducation(i)} className="text-stone-400 hover:text-red-500 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <Input label="School" value={edu.school} onChange={(v) => updateEducation(i, { ...edu, school: v })} />
            <Input label="Degree" value={edu.degree} onChange={(v) => updateEducation(i, { ...edu, degree: v })} placeholder="Bachelor of Science" />
            <Input label="Field of Study" value={edu.field} onChange={(v) => updateEducation(i, { ...edu, field: v })} />
            <Input label="Graduation Date" value={edu.graduationDate} onChange={(v) => updateEducation(i, { ...edu, graduationDate: v })} placeholder="May 2027" />
            <Input label="GPA" value={edu.gpa} onChange={(v) => updateEducation(i, { ...edu, gpa: v })} />
            <Input label="Relevant Coursework" value={edu.coursework} onChange={(v) => updateEducation(i, { ...edu, coursework: v })} placeholder="Comma-separated" />
          </div>
        ))}
        <button type="button" onClick={addEducation} className="flex items-center gap-1 text-xs font-medium text-stone-500 hover:text-stone-700 transition-colors">
          <Plus className="w-3.5 h-3.5" /> Add Education
        </button>
      </Section>

      {/* Experience */}
      <Section title="Experience">
        {data.experience.map((exp, i) => (
          <div key={exp.id} className="space-y-2 pb-3 border-b border-stone-100 last:border-0 last:pb-0">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-stone-400">#{i + 1}</span>
              <button type="button" onClick={() => removeExperience(i)} className="text-stone-400 hover:text-red-500 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <Input label="Company" value={exp.company} onChange={(v) => updateExperience(i, { ...exp, company: v })} />
            <Input label="Position" value={exp.position} onChange={(v) => updateExperience(i, { ...exp, position: v })} />
            <Input label="Start Date" value={exp.startDate} onChange={(v) => updateExperience(i, { ...exp, startDate: v })} placeholder="Sep 2023" />
            <Input label="End Date" value={exp.endDate} onChange={(v) => updateExperience(i, { ...exp, endDate: v })} placeholder="Present" />
            <TextArea label="Description" value={exp.description} onChange={(v) => updateExperience(i, { ...exp, description: v })} placeholder="One bullet point per line" />
          </div>
        ))}
        <button type="button" onClick={addExperience} className="flex items-center gap-1 text-xs font-medium text-stone-500 hover:text-stone-700 transition-colors">
          <Plus className="w-3.5 h-3.5" /> Add Experience
        </button>
      </Section>

      {/* Projects */}
      <Section title="Projects">
        {data.projects.map((proj, i) => (
          <div key={proj.id} className="space-y-2 pb-3 border-b border-stone-100 last:border-0 last:pb-0">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-stone-400">#{i + 1}</span>
              <button type="button" onClick={() => removeProject(i)} className="text-stone-400 hover:text-red-500 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <Input label="Project Name" value={proj.name} onChange={(v) => updateProject(i, { ...proj, name: v })} />
            <Input label="Technologies" value={proj.technologies} onChange={(v) => updateProject(i, { ...proj, technologies: v })} placeholder="React, Node.js, etc." />
            <Input label="Link" value={proj.link} onChange={(v) => updateProject(i, { ...proj, link: v })} placeholder="github.com/..." />
            <TextArea label="Description" value={proj.description} onChange={(v) => updateProject(i, { ...proj, description: v })} placeholder="One bullet point per line" />
          </div>
        ))}
        <button type="button" onClick={addProject} className="flex items-center gap-1 text-xs font-medium text-stone-500 hover:text-stone-700 transition-colors">
          <Plus className="w-3.5 h-3.5" /> Add Project
        </button>
      </Section>

      {/* Skills */}
      <Section title="Skills">
        <TextArea
          label="Skills (comma-separated)"
          value={data.skills.join(', ')}
          onChange={updateSkills}
          placeholder="Python, JavaScript, React, ..."
        />
      </Section>
    </div>
  );
}
