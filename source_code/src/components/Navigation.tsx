import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
export function Navigation() {
  const location = useLocation();
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-stone-900 font-semibold bg-stone-100' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50';
  };
  return <nav className="w-full border-b border-stone-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/blog" className="flex items-center gap-2 group">
            <div className="bg-stone-900 text-white p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-300">
              <Sparkles size={18} />
            </div>
            <span className="font-bold text-lg tracking-tight text-stone-900">
              Daniel's Corner
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link to="/blog" className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${isActive('/blog')}`}>
              Blog
            </Link>
            <Link to="/me" className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${isActive('/me')}`}>
              Me
            </Link>
          </div>
        </div>
      </div>
    </nav>;
}