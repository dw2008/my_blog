import React, { useState } from 'react';
import { ResumeData, TemplateName } from './resume-builder/types';
import { DEFAULT_DATA } from './resume-builder/defaultData';
import { ResumeForm } from './resume-builder/components/ResumeForm';
import { ResumePreview } from './resume-builder/components/ResumePreview';
import { TemplateSelector } from './resume-builder/components/TemplateSelector';
import { ImportExport } from './resume-builder/components/ImportExport';

export function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>(DEFAULT_DATA);
  const [template, setTemplate] = useState<TemplateName>('clean');

  return (
    <div className="resume-builder min-h-screen bg-stone-50/50">
      {/* App Header */}
      <div className="resume-builder-header border-b border-stone-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-[1600px] mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <h1 className="text-lg font-bold text-stone-800 shrink-0">Resume Builder</h1>
            <div className="flex-1 min-w-0">
              <TemplateSelector selected={template} onSelect={setTemplate} />
            </div>
            <ImportExport data={resumeData} onImport={setResumeData} template={template} />
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="max-w-[1600px] mx-auto flex relative">
        {/* Form panel — sticky, scrolls internally */}
        <div className="resume-builder-form w-[420px] shrink-0 border-r border-stone-200 bg-stone-50 overflow-y-auto p-4 sticky top-[57px] self-start" style={{ maxHeight: 'calc(100vh - 57px)' }}>
          <ResumeForm data={resumeData} onChange={setResumeData} />
        </div>

        {/* Preview panel — full height, page scrolls */}
        <div className="resume-builder-preview flex-1 p-6 bg-stone-100">
          <ResumePreview data={resumeData} template={template} />
        </div>
      </div>
    </div>
  );
}
