import { listFiles, getFile } from '../_lib/github.js';
import matter from 'gray-matter';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // List all markdown files in posts directory
    const files = await listFiles('posts');

    // Fetch and parse each file
    const posts: Post[] = [];

    for (const file of files) {
      const fileData = await getFile(file.path);

      if (fileData) {
        const { data } = matter(fileData.content);

        posts.push({
          title: data.title || '',
          excerpt: data.excerpt || '',
          date: data.date || '',
          category: data.category || 'tech',
          readTime: data.readTime || '',
          slug: data.slug || '',
          imageUrl: data.imageUrl,
        });
      }
    }

    // Sort by date descending
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return res.status(200).json({ posts });
  } catch (error) {
    console.error('Error listing posts:', error);
    return res.status(500).json({ error: 'Failed to list posts' });
  }
}
