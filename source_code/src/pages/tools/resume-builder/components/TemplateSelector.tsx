import React from 'react';
import { TemplateName } from '../types';
import { TEMPLATES, TEMPLATE_NAMES } from '../templates';

interface TemplateSelectorProps {
  selected: TemplateName;
  onSelect: (name: TemplateName) => void;
}

export function TemplateSelector({ selected, onSelect }: TemplateSelectorProps) {
  return (
    <div className="flex gap-2 overflow-x-auto py-1 scrollbar-thin">
      {TEMPLATE_NAMES.map((key) => {
        const t = TEMPLATES[key];
        const isSelected = key === selected;
        return (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isSelected
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-400'
            }`}
          >
            <span className={`w-2.5 h-2.5 rounded-full ${t.color}`} />
            {t.name}
          </button>
        );
      })}
    </div>
  );
}
