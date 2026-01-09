import type { VercelRequest, VercelResponse } from '@vercel/node';
import { validateSession } from '../_lib/auth';
import { getFile, createOrUpdateFile } from '../_lib/github';
import matter from 'gray-matter';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validate authentication
  const { valid } = await validateSession(req);

  if (!valid) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { title, excerpt, date, category, readTime, slug, imageUrl, content } = req.body;

  // Validate required fields
  if (!title || !excerpt || !date || !category || !readTime || !slug || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Validate category
  if (!['tech', 'pokemon', 'life'].includes(category)) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  try {
    // Get existing file to retrieve SHA
    const existing = await getFile(`posts/${slug}.md`);

    if (!existing) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Generate markdown with frontmatter
    const markdown = matter.stringify(content, {
      title,
      excerpt,
      date,
      category,
      readTime,
      slug,
      ...(imageUrl && { imageUrl }),
    });

    // Update file in GitHub
    await createOrUpdateFile(
      `posts/${slug}.md`,
      markdown,
      `Update post: ${title}`,
      existing.sha
    );

    return res.status(200).json({ success: true, slug });
  } catch (error) {
    console.error('Error updating post:', error);
    return res.status(500).json({ error: 'Failed to update post' });
  }
}
