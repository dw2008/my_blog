import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as crypto from 'crypto';
import * as cookie from 'cookie';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Generate random state for CSRF protection
  const state = crypto.randomBytes(32).toString('hex');

  // Store state in temporary cookie
  const isProduction = process.env.NODE_ENV === 'production';
  res.setHeader('Set-Cookie', cookie.serialize('oauth_state', state, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: 600, // 10 minutes
    path: '/',
  }));

  // Build OAuth URL
  const githubOAuthUrl = new URL('https://github.com/login/oauth/authorize');
  githubOAuthUrl.searchParams.set('client_id', process.env.GITHUB_CLIENT_ID!);
  githubOAuthUrl.searchParams.set('redirect_uri', process.env.GITHUB_CALLBACK_URL!);
  githubOAuthUrl.searchParams.set('state', state);
  githubOAuthUrl.searchParams.set('scope', 'user:email');

  // Redirect to GitHub
  res.redirect(302, githubOAuthUrl.toString());
}
