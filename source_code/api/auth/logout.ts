import type { VercelRequest, VercelResponse } from '@vercel/node';
import { clearSessionCookie } from '../_lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const isProduction = process.env.NODE_ENV === 'production';
  const clearCookie = clearSessionCookie(isProduction);

  res.setHeader('Set-Cookie', clearCookie);
  return res.status(200).json({ success: true });
}
