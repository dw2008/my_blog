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

export interface SessionPayload {
  username: string;
  iat: number;
  exp: number;
}
