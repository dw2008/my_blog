import { getFile } from '../_lib/github.js';
import matter from 'gray-matter';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Slug is required' });
  }

  try {
    const fileData = await getFile(`posts/${slug}.md`);

    if (!fileData) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const { data, content } = matter(fileData.content);

    return res.status(200).json({
      post: {
        title: data.title || '',
        excerpt: data.excerpt || '',
        date: data.date || '',
        category: data.category || 'tech',
        readTime: data.readTime || '',
        slug: data.slug || slug,
        imageUrl: data.imageUrl,
        content,
      },
    });
  } catch (error) {
    console.error('Error fetching post:', error);
    return res.status(500).json({ error: 'Failed to fetch post' });
  }
}
