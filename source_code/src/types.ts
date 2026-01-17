export interface Post {
  id?: number;
  title: string;
  excerpt: string;
  date: string;
  category: 'tech' | 'pokemon' | 'life';
  readTime: string;
  slug: string;
  imageUrl?: string;
  content?: string;
  status?: 'draft' | 'published' | 'archived';
}

export type Category = 'tech' | 'pokemon' | 'life';
export type PostStatus = 'draft' | 'published' | 'archived';
