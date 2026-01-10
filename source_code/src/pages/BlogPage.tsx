import { useState, useEffect } from 'react';
import { BlogCard } from '../components/BlogCard';
import { fetchPosts } from '../lib/api';
import type { Post } from '../types';

export function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await fetchPosts();
      setPosts(data);
    } catch (err) {
      setError('Failed to load posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return <div className="min-h-screen bg-stone-50/50">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="mb-12 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-4 tracking-tight">
            <span className="text-blue-600">My Thoughts</span>
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl">
            A collection of technical deep-dives, Pokémon discussions, and
            everything in between. Thanks for stopping by!
          </p>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-stone-600">Loading posts...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-stone-600 text-lg">No posts yet. Check back soon!</p>
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {posts.map(post => (
              <BlogCard
                key={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                category={post.category}
                readTime={post.readTime}
                slug={post.slug}
                imageUrl={post.imageUrl}
              />
            ))}
          </div>
        )}
      </main>
    </div>;
}