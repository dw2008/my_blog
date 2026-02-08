import React, { useRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Download, Upload, FileText, Printer } from 'lucide-react';
import { ResumeData, TemplateName } from '../types';
import { TEMPLATES } from '../templates';

interface ImportExportProps {
  data: ResumeData;
  onImport: (data: ResumeData) => void;
  template: TemplateName;
}

function isValidResumeData(obj: unknown): obj is ResumeData {
  if (typeof obj !== 'object' || obj === null) return false;
  const o = obj as Record<string, unknown>;
  return (
    typeof o.personalInfo === 'object' &&
    Array.isArray(o.education) &&
    Array.isArray(o.experience) &&
    Array.isArray(o.projects) &&
    Array.isArray(o.skills)
  );
}

function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function safeName(fullName: string) {
  return (fullName || 'resume')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+$/, '');
}

export function ImportExport({ data, onImport, template }: ImportExportProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportJSON = () => {
    downloadFile(JSON.stringify(data, null, 2), 'resume.json', 'application/json');
  };

  const handleDownloadHTML = () => {
    const { component: TemplateComponent } = TEMPLATES[template];
    const resumeHTML = renderToStaticMarkup(
      React.createElement(TemplateComponent, { data })
    );

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.personalInfo.fullName || 'Resume'}</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <style>
    @page { margin: 0; }
    @media print {
      body { margin: 0; padding: 0; }
      #resume { box-shadow: none !important; }
    }
  </style>
</head>
<body class="bg-gray-100 flex justify-center py-8 print:bg-white print:py-0">
  <div id="resume" style="width:8.5in;min-height:11in" class="bg-white shadow-lg mx-auto print:shadow-none">
    ${resumeHTML}
  </div>
</body>
</html>`;

    downloadFile(html, `${safeName(data.personalInfo.fullName)}-resume.html`, 'text/html');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        if (isValidResumeData(parsed)) {
          onImport(parsed);
        } else {
          alert('Invalid resume JSON format.');
        }
      } catch {
        alert('Could not parse JSON file.');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const btnClass =
    'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-600 bg-white border border-stone-200 rounded-lg hover:border-stone-400 transition-colors';

  return (
    <div className="flex items-center gap-2">
      <button onClick={handlePrint} className={btnClass}>
        <Printer className="w-3.5 h-3.5" />
        PDF
      </button>
      <button onClick={handleDownloadHTML} className={btnClass}>
        <FileText className="w-3.5 h-3.5" />
        HTML
      </button>
      <button onClick={handleExportJSON} className={btnClass}>
        <Download className="w-3.5 h-3.5" />
        JSON
      </button>
      <button onClick={() => fileInputRef.current?.click()} className={btnClass}>
        <Upload className="w-3.5 h-3.5" />
        Import
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        className="hidden"
      />
    </div>
  );
}
