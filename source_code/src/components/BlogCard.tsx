import React from 'react';
import { Calendar, ArrowRight, Image as ImageIcon } from 'lucide-react';
export type Category = 'tech' | 'pokemon' | 'life';
interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: Category;
  readTime: string;
  slug: string;
  imageUrl?: string;
}
export function BlogCard({
  title,
  excerpt,
  date,
  category,
  readTime,
  imageUrl
}: BlogCardProps) {
  const getCategoryStyles = (cat: Category) => {
    switch (cat) {
      case 'tech':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pokemon':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };
  return <article className="group flex flex-col h-full bg-white rounded-3xl border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Image Area */}
      <div className="w-full aspect-video bg-stone-100 relative overflow-hidden">
        {imageUrl ? <img src={imageUrl} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" /> : <div className="w-full h-full flex items-center justify-center text-stone-300">
            <ImageIcon size={48} />
          </div>}
      </div>

      <div className="p-6 sm:p-8 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryStyles(category)}`}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </span>
          <span className="text-stone-400 text-xs flex items-center gap-1">
            <Calendar size={12} />
            {date}
          </span>
        </div>

        <h3 className="text-xl font-bold text-stone-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {title}
        </h3>

        <p className="text-stone-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
          {excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-stone-50 mt-auto">
          <span className="text-xs text-stone-400 font-medium">
            {readTime} read
          </span>
          <span className="text-stone-900 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
            Read more <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </article>;
}