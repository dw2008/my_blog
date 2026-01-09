import { clearSessionCookie } from '../_lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const isProduction = process.env.NODE_ENV === 'production';
  const clearCookie = clearSessionCookie(isProduction);

  res.setHeader('Set-Cookie', clearCookie);
  return res.status(200).json({ success: true });
}
