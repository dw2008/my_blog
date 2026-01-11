import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { createPost, updatePost } from '../../lib/api';
import type { Post } from '../../types';

interface PostEditorProps {
  mode: 'create' | 'edit';
  initialData?: Post;
}

export function PostEditor({ mode, initialData }: PostEditorProps) {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    excerpt: initialData?.excerpt || '',
    category: initialData?.category || 'tech',
    date: initialData?.date || new Date().toISOString().split('T')[0],
    readTime: initialData?.readTime || '',
    imageUrl: initialData?.imageUrl || '',
    content: initialData?.content || '',
  });

  // Auto-generate slug from title
  useEffect(() => {
    if (mode === 'create' && formData.title && !formData.slug) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      if (mode === 'create') {
        await createPost(formData as Post);
      } else {
        await updatePost(formData as Post);
      }

      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  const handleTabKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      // Insert tab character (or spaces) at cursor position
      const newContent = formData.content.substring(0, start) + '  ' + formData.content.substring(end);
      setFormData({ ...formData, content: newContent });

      // Move cursor after the inserted tab
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };

  const processContent = (content: string) => {
    // Split content by code blocks to avoid processing inside them
    const codeBlockRegex = /(```[\s\S]*?```|`[^`]+`)/g;
    const parts: string[] = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Process text before code block
      const beforeCode = content.slice(lastIndex, match.index);
      parts.push(processText(beforeCode));
      // Keep code block unchanged
      parts.push(match[0]);
      lastIndex = match.index + match[0].length;
    }

    // Process remaining text after last code block
    parts.push(processText(content.slice(lastIndex)));

    return parts.join('');
  };

  const processText = (text: string) => {
    // Replace multiple consecutive newlines with HTML breaks to preserve spacing
    return text.replace(/\n{2,}/g, (match) => {
      const numBreaks = match.length - 1;
      return '\n' + '<br>\n'.repeat(numBreaks);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-stone-900">
          {mode === 'create' ? 'Create New Post' : 'Edit Post'}
        </h1>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="px-4 py-2 text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : mode === 'create' ? 'Create Post' : 'Update Post'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">
        {/* Left Column - Form Fields */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-stone-200 p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-900 mb-2">
                Title <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter post title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-900 mb-2">
                Slug <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                placeholder="post-slug"
                pattern="[a-z0-9-]+"
              />
              <p className="text-xs text-stone-600 mt-1">Only lowercase letters, numbers, and hyphens</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-900 mb-2">
                Excerpt <span className="text-red-600">*</span>
              </label>
              <textarea
                required
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Short description of the post"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-900 mb-2">
                  Category <span className="text-red-600">*</span>
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="tech">Tech</option>
                  <option value="pokemon">Pokemon</option>
                  <option value="life">Life</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-900 mb-2">
                  Date <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-900 mb-2">
                Read Time <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="5 min"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-900 mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-900 mb-2">
                Content (Markdown) <span className="text-red-600">*</span>
              </label>
              <textarea
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                onKeyDown={handleTabKey}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                rows={20}
                placeholder="Write your post content in markdown..."
              />
            </div>
          </div>
        </div>

        {/* Right Column - Preview */}
        <div className="sticky top-8 h-fit">
          <div className="bg-white rounded-lg border border-stone-200 p-6">
            <h3 className="text-lg font-semibold text-stone-900 mb-4">Preview</h3>
            <div className="border-t border-stone-200 pt-4">
              {formData.imageUrl && (
                <img
                  src={formData.imageUrl}
                  alt={formData.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h1 className="text-2xl font-bold text-stone-900 mb-2">{formData.title || 'Untitled'}</h1>
              <p className="text-stone-600 mb-4">{formData.excerpt}</p>
              <div className="flex items-center gap-3 text-sm text-stone-600 mb-6">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                  {formData.category}
                </span>
                <span>{formData.date}</span>
                <span>{formData.readTime}</span>
              </div>
              <div className="prose prose-stone max-w-none">
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw, rehypeHighlight]}
                  remarkPlugins={[remarkGfm, remarkBreaks]}
                  components={{
                    a: ({ node, ...props }) => (
                      <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800" />
                    ),
                    p: ({ node, ...props }) => (
                      <p {...props} style={{ whiteSpace: 'pre-wrap' }} className="my-4" />
                    ),
                  }}
                >
                  {processContent(formData.content)}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
