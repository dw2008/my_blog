import type { VercelRequest, VercelResponse } from '@vercel/node';
import { validateSession } from '../_lib/auth';
import { getFile, deleteFile } from '../_lib/github';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validate authentication
  const { valid } = await validateSession(req);

  if (!valid) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Slug is required' });
  }

  try {
    // Get existing file to retrieve SHA
    const existing = await getFile(`posts/${slug}.md`);

    if (!existing) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Delete file from GitHub
    await deleteFile(
      `posts/${slug}.md`,
      `Delete post: ${slug}`,
      existing.sha
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    return res.status(500).json({ error: 'Failed to delete post' });
  }
}
