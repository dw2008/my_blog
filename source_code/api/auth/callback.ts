import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as cookie from 'cookie';
import { generateSessionToken, createSessionCookie } from '../_lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code, state } = req.query;

  if (!code || !state || typeof code !== 'string' || typeof state !== 'string') {
    return res.redirect('/admin?error=invalid_request');
  }

  // Verify state matches cookie (CSRF protection)
  const cookies = cookie.parse(req.headers.cookie || '');
  const storedState = cookies.oauth_state;

  if (!storedState || storedState !== state) {
    return res.redirect('/admin?error=state_mismatch');
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      return res.redirect('/admin?error=token_exchange_failed');
    }

    // Fetch user profile
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    const userData = await userResponse.json();

    if (!userData.login) {
      return res.redirect('/admin?error=user_fetch_failed');
    }

    // Verify username matches allowed admin
    const allowedUsername = process.env.ALLOWED_ADMIN_GITHUB_USERNAME;
    if (userData.login !== allowedUsername) {
      return res.redirect('/admin?error=unauthorized');
    }

    // Generate session token
    const sessionToken = await generateSessionToken(userData.login);

    // Set session cookie
    const isProduction = process.env.NODE_ENV === 'production';
    const sessionCookie = createSessionCookie(sessionToken, isProduction);

    // Clear oauth_state cookie
    const clearStateCookie = cookie.serialize('oauth_state', '', {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    });

    res.setHeader('Set-Cookie', [sessionCookie, clearStateCookie]);
    res.redirect('/admin');
  } catch (error) {
    console.error('OAuth callback error:', error);
    return res.redirect('/admin?error=server_error');
  }
}
