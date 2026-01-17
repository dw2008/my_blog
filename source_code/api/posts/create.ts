import { validateSession } from '../_lib/auth.js';
import { getFile, createOrUpdateFile } from '../_lib/github.js';
import matter from 'gray-matter';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validate authentication
  const { valid } = await validateSession(req);

  if (!valid) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { title, excerpt, date, category, readTime, slug, imageUrl, content, status = 'draft' } = req.body;

  // Validate required fields
  if (!title || !excerpt || !date || !category || !readTime || !slug || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Validate slug format
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return res.status(400).json({ error: 'Invalid slug format. Use only lowercase letters, numbers, and hyphens.' });
  }

  // Validate category
  if (!['tech', 'pokemon', 'life'].includes(category)) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  // Validate status
  if (!['draft', 'published', 'archived'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status. Must be draft, published, or archived.' });
  }

  try {
    // Check if slug already exists
    const existing = await getFile(`posts/${slug}.md`);

    if (existing) {
      return res.status(409).json({ error: 'Post with this slug already exists' });
    }

    // Generate markdown with frontmatter
    const markdown = matter.stringify(content, {
      title,
      excerpt,
      date,
      category,
      readTime,
      slug,
      status,
      ...(imageUrl && { imageUrl }),
    });

    // Commit to GitHub
    await createOrUpdateFile(
      `posts/${slug}.md`,
      markdown,
      `Add post: ${title}`
    );

    return res.status(201).json({ success: true, slug });
  } catch (error) {
    console.error('Error creating post:', error);
    return res.status(500).json({ error: 'Failed to create post' });
  }
}
