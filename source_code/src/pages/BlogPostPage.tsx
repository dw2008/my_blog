import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { fetchPost } from '../lib/api';
import type { Post } from '../types';

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      loadPost(slug);
    }
  }, [slug]);

  const loadPost = async (slug: string) => {
    try {
      const data = await fetchPost(slug);
      setPost(data);
    } catch (err) {
      setError('Failed to load post');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tech':
        return 'bg-blue-100 text-blue-800';
      case 'pokemon':
        return 'bg-yellow-100 text-yellow-800';
      case 'life':
        return 'bg-stone-200 text-stone-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50/50">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-stone-600">Loading post...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-stone-50/50">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800">{error || 'Post not found'}</p>
            <Link
              to="/blog"
              className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft size={16} />
              Back to blog
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50/50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Back button */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to blog
        </Link>

        {/* Post header */}
        <article className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
          {post.imageUrl && (
            <div className="w-full aspect-video overflow-hidden">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8 sm:p-12">
            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}>
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </span>
              <span className="text-stone-500 text-sm flex items-center gap-2">
                <Calendar size={14} />
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="text-stone-500 text-sm flex items-center gap-2">
                <Clock size={14} />
                {post.readTime} read
              </span>
            </div>

            {/* Title and excerpt */}
            <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-4 tracking-tight">
              {post.title}
            </h1>
            <p className="text-xl text-stone-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Content */}
            <div className="prose prose-stone prose-lg max-w-none">
              <ReactMarkdown>{post.content || ''}</ReactMarkdown>
            </div>
          </div>
        </article>

        {/* Back button at bottom */}
        <div className="mt-12 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-stone-200 rounded-lg text-stone-700 hover:bg-stone-50 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to all posts
          </Link>
        </div>
      </main>
    </div>
  );
}
