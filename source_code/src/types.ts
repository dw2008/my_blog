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
}

export type Category = 'tech' | 'pokemon' | 'life';
