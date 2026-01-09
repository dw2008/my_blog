export default function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // Check required environment variables
    if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CALLBACK_URL) {
      console.error('Missing required environment variables');
      return res.status(500).json({
        error: 'Server configuration error',
        details: 'Missing GITHUB_CLIENT_ID or GITHUB_CALLBACK_URL'
      });
    }

    // Generate random state for CSRF protection
    const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // Store state in cookie
    const isProduction = process.env.NODE_ENV === 'production';
    const cookie = `oauth_state=${state}; HttpOnly; ${isProduction ? 'Secure;' : ''} SameSite=Lax; Max-Age=600; Path=/`;
    res.setHeader('Set-Cookie', cookie);

    // Build OAuth URL
    const githubOAuthUrl = new URL('https://github.com/login/oauth/authorize');
    githubOAuthUrl.searchParams.set('client_id', process.env.GITHUB_CLIENT_ID);
    githubOAuthUrl.searchParams.set('redirect_uri', process.env.GITHUB_CALLBACK_URL);
    githubOAuthUrl.searchParams.set('state', state);
    githubOAuthUrl.searchParams.set('scope', 'user:email');

    // Redirect to GitHub
    res.redirect(302, githubOAuthUrl.toString());
  } catch (error) {
    console.error('Error in github auth handler:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
  }
}
