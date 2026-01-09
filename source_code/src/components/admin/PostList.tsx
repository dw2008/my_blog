import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2 } from 'lucide-react';
import { fetchPosts, deletePost } from '../../lib/api';
import type { Post } from '../../types';

export function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);

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

  const handleDelete = async (slug: string) => {
    if (!window.confirm('Are you sure you want to delete this post? This cannot be undone.')) {
      return;
    }

    setDeleteSlug(slug);

    try {
      await deletePost(slug);
      setPosts(posts.filter(p => p.slug !== slug));
    } catch (err) {
      alert('Failed to delete post');
      console.error(err);
    } finally {
      setDeleteSlug(null);
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
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-stone-600">Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-800">{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-stone-200 p-12 text-center">
        <p className="text-stone-600 text-lg">No posts yet. Create your first post to get started!</p>
        <Link
          to="/admin/create"
          className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Post
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-stone-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-stone-50 border-b border-stone-200">
          <tr>
            <th className="text-left px-6 py-4 text-sm font-semibold text-stone-900">Title</th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-stone-900">Category</th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-stone-900">Date</th>
            <th className="text-right px-6 py-4 text-sm font-semibold text-stone-900">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-200">
          {posts.map((post) => (
            <tr key={post.slug} className="hover:bg-stone-50 transition-colors">
              <td className="px-6 py-4">
                <div className="font-medium text-stone-900">{post.title}</div>
                <div className="text-sm text-stone-600 mt-1">{post.excerpt}</div>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                  {post.category}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-stone-600">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    to={`/admin/edit/${post.slug}`}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit post"
                  >
                    <Edit2 size={18} />
                  </Link>
                  <button
                    onClick={() => handleDelete(post.slug)}
                    disabled={deleteSlug === post.slug}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    title="Delete post"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
