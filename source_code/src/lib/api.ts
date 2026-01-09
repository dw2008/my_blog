import type { Post } from '../types';

export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch('/api/posts/list');

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  const data = await response.json();
  return data.posts;
}

export async function fetchPost(slug: string): Promise<Post> {
  const response = await fetch(`/api/posts/get?slug=${slug}`);

  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }

  const data = await response.json();
  return data.post;
}

export async function createPost(post: Post): Promise<{ success: boolean; slug: string }> {
  const response = await fetch('/api/posts/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create post');
  }

  return await response.json();
}

export async function updatePost(post: Post): Promise<{ success: boolean; slug: string }> {
  const response = await fetch('/api/posts/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update post');
  }

  return await response.json();
}

export async function deletePost(slug: string): Promise<{ success: boolean }> {
  const response = await fetch(`/api/posts/delete?slug=${slug}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete post');
  }

  return await response.json();
}
