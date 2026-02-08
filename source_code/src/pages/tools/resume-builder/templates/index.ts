import React from 'react';
import { ResumeData, TemplateName } from '../types';
import { ClassicTemplate } from './ClassicTemplate';
import { ModernTemplate } from './ModernTemplate';
import { MinimalTemplate } from './MinimalTemplate';
import { AcademicTemplate } from './AcademicTemplate';
import { CleanTemplate } from './CleanTemplate';
import { BoldTemplate } from './BoldTemplate';
import { CompactTemplate } from './CompactTemplate';
import { CreativeTemplate } from './CreativeTemplate';

export const TEMPLATES: Record<
  TemplateName,
  { name: string; component: React.FC<{ data: ResumeData }>; color: string }
> = {
  clean: { name: 'Clean', component: CleanTemplate, color: 'bg-slate-500' },
  classic: { name: 'Classic', component: ClassicTemplate, color: 'bg-blue-900' },
  modern: { name: 'Modern', component: ModernTemplate, color: 'bg-teal-600' },
  minimal: { name: 'Minimal', component: MinimalTemplate, color: 'bg-gray-400' },
  academic: { name: 'Academic', component: AcademicTemplate, color: 'bg-gray-800' },
  bold: { name: 'Bold', component: BoldTemplate, color: 'bg-indigo-700' },
  compact: { name: 'Compact', component: CompactTemplate, color: 'bg-stone-600' },
  creative: { name: 'Creative', component: CreativeTemplate, color: 'bg-violet-600' },
};

export const TEMPLATE_NAMES = Object.keys(TEMPLATES) as TemplateName[];
