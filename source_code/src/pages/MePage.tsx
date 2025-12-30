import React, { useMemo } from 'react';
import { MapPin, Coffee, Heart, Github, Twitter, Linkedin } from 'lucide-react';
export function MePage() {
  return <div className="min-h-screen bg-stone-50/50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Intro Section */}
        <div className="mb-24">
          <div className="space-y-6 text-center md:text-left max-w-3xl mx-auto">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-2">
              Hello there! 👋
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight">
              I'm Daniel, a developer who loves{' '}
              <span className="text-yellow-600 relative inline-block">
                pixels
                <svg className="absolute w-full h-2 bottom-1 left-0 text-yellow-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>{' '}
              and <span className="text-blue-600">Pokemon</span>.
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed">
              I build accessible, pixel-perfect interfaces by day and hunt for
              shiny Pokemon by night. I believe the best code is clean, and the
              best designs are kind.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
              <div className="flex items-center gap-2 text-stone-600 bg-white px-4 py-2 rounded-xl border border-stone-100 shadow-sm">
                <MapPin size={18} className="text-red-400" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-2 text-stone-600 bg-white px-4 py-2 rounded-xl border border-stone-100 shadow-sm">
                <Coffee size={18} className="text-amber-700" />
                <span>Latte enthusiast</span>
              </div>
            </div>

            <div className="flex justify-center md:justify-start gap-4 pt-6">
              <SocialLink icon={<Github size={20} />} href="#" label="GitHub" />
              <SocialLink icon={<Twitter size={20} />} href="#" label="Twitter" />
              <SocialLink icon={<Linkedin size={20} />} href="#" label="LinkedIn" />
            </div>
          </div>
        </div>

        {/* Bio Content */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm">
            <h2 className="text-2xl font-bold text-stone-900 mb-4 flex items-center gap-2">
              <Heart className="text-red-400 fill-red-400" size={20} />
              What I Love
            </h2>
            <ul className="space-y-3 text-stone-600">
              <li className="flex items-start gap-2">
                <span className="text-xl">🎨</span>
                <span>Designing interfaces that feel human and organic</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-xl">⚡️</span>
                <span>
                  Optimizing React performance (useMemo is my best friend)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-xl">🎮</span>
                <span>Competitive Pokemon battling (VGC format)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-xl">📸</span>
                <span>Analog photography and developing my own film</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
            <h2 className="text-2xl font-bold text-stone-900 mb-4">
              Currently Reading
            </h2>
            <div className="flex gap-4 items-start">
              <div className="w-20 h-28 bg-blue-200 rounded-md shadow-sm flex-shrink-0 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=200" alt="Book cover" className="w-full h-full object-cover opacity-80 mix-blend-multiply" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900">
                  The Design of Everyday Things
                </h3>
                <p className="text-stone-500 text-sm mb-2">Don Norman</p>
                <p className="text-stone-600 text-sm">
                  Re-reading this classic. It's amazing how much still applies
                  to modern digital product design.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Past Reads Section */}
        <div className="mt-16 pt-12 border-t border-stone-200">
          <h3 className="text-lg font-bold text-stone-900 mb-6 flex items-center gap-2">
            <span className="text-stone-400">📚</span> Past Reads
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[{
            title: 'Clean Code',
            author: 'Robert C. Martin',
            color: 'bg-red-100'
          }, {
            title: 'Refactoring UI',
            author: 'Adam Wathan',
            color: 'bg-indigo-100'
          }, {
            title: 'Atomic Habits',
            author: 'James Clear',
            color: 'bg-amber-100'
          }, {
            title: 'Deep Work',
            author: 'Cal Newport',
            color: 'bg-emerald-100'
          }].map((book, i) => <div key={i} className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-stone-100">
                <div className={`w-12 h-16 ${book.color} rounded shadow-sm flex-shrink-0 group-hover:-translate-y-1 transition-transform duration-300`}></div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-stone-800 truncate" title={book.title}>
                    {book.title}
                  </h4>
                  <p className="text-xs text-stone-500 truncate">
                    {book.author}
                  </p>
                </div>
              </div>)}
          </div>
        </div>
      </main>
    </div>;
}
function SocialLink({
  icon,
  href,
  label
}: {
  icon: React.ReactNode;
  href: string;
  label: string;
}) {
  return <a href={href} className="p-3 bg-white rounded-full text-stone-600 hover:text-blue-600 hover:bg-blue-50 border border-stone-100 shadow-sm hover:shadow-md transition-all duration-200" aria-label={label}>
      {icon}
    </a>;
}