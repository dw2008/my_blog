import React from 'react';
import { ResumeData, TemplateName } from '../types';
import { TEMPLATES } from '../templates';

interface ResumePreviewProps {
  data: ResumeData;
  template: TemplateName;
}

export function ResumePreview({ data, template }: ResumePreviewProps) {
  const { component: TemplateComponent } = TEMPLATES[template];

  return (
    <div className="resume-preview-container w-[8.5in] min-h-[11in] bg-white shadow-lg rounded-lg overflow-hidden border border-stone-200 mx-auto">
      <TemplateComponent data={data} />
    </div>
  );
}
