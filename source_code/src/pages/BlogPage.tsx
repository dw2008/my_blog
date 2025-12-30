import React, { Component } from 'react';
import { BlogCard, Category } from '../components/BlogCard';
const POSTS = [{
  id: 1,
  title: 'Why React Server Components are actually fun',
  excerpt: "I was skeptical at first, but after building a few small projects, I'm starting to see the light. Here's my journey into the server-side.",
  date: 'Oct 24, 2023',
  category: 'tech' as Category,
  readTime: '5 min',
  slug: 'react-server-components',
  imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop'
}, {
  id: 2,
  title: 'My quest to catch a shiny Charizard',
  excerpt: "4,000 resets later and I'm starting to question my sanity. But the sparkles... they call to me. A tale of persistence and RNG.",
  date: 'Nov 02, 2023',
  category: 'pokemon' as Category,
  readTime: '8 min',
  slug: 'shiny-charizard',
  imageUrl: 'https://images.unsplash.com/photo-1613771404721-1f92d799e49f?q=80&w=2069&auto=format&fit=crop'
}, {
  id: 3,
  title: 'CSS Grid: The mental model that clicked',
  excerpt: 'Flexbox was my best friend until I met Grid. Understanding the difference between 1D and 2D layouts changed how I write CSS forever.',
  date: 'Nov 15, 2023',
  category: 'tech' as Category,
  readTime: '6 min',
  slug: 'css-grid-mental-model',
  imageUrl: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070&auto=format&fit=crop'
}, {
  id: 4,
  title: 'Ranking the Eeveelutions by huggability',
  excerpt: "Sure, Vaporeon is cool in battle, but have you considered Flareon's fluff factor? A scientific analysis of the best Eevee evolutions.",
  date: 'Nov 28, 2023',
  category: 'pokemon' as Category,
  readTime: '4 min',
  slug: 'eeveelutions-ranked',
  imageUrl: 'https://images.unsplash.com/photo-1542779283-429940ce8336?q=80&w=2070&auto=format&fit=crop'
}, {
  id: 5,
  title: 'Switching to a mechanical keyboard',
  excerpt: "My coworkers hate me, but my fingers have never been happier. The click-clack lifestyle is not just a hobby, it's a personality trait.",
  date: 'Dec 05, 2023',
  category: 'tech' as Category,
  readTime: '7 min',
  slug: 'mechanical-keyboards',
  imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=2071&auto=format&fit=crop'
}, {
  id: 6,
  title: 'Finding balance in a digital world',
  excerpt: 'Sometimes you just need to touch grass. Or in my case, go for a walk without my phone. Reflections on disconnecting.',
  date: 'Dec 12, 2023',
  category: 'life' as Category,
  readTime: '3 min',
  slug: 'digital-balance',
  imageUrl: 'https://images.unsplash.com/photo-1501854140884-074cf2b21d25?q=80&w=2062&auto=format&fit=crop'
}];
export function BlogPage() {
  return <div className="min-h-screen bg-stone-50/50">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="mb-12 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-4 tracking-tight">
            Thoughts & <span className="text-blue-600">Adventures</span>
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl">
            A collection of technical deep dives, Pokémon obsessions, and
            everything in between. Grab a coffee and stay a while.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {POSTS.map(post => <BlogCard key={post.id} title={post.title} excerpt={post.excerpt} date={post.date} category={post.category} readTime={post.readTime} slug={post.slug} imageUrl={post.imageUrl} />)}
        </div>
      </main>
    </div>;
}