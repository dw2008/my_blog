import type { VercelRequest, VercelResponse } from '@vercel/node';
import { validateSession } from '../_lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { valid, username } = await validateSession(req);

  return res.status(200).json({
    authenticated: valid,
    ...(valid && { username }),
  });
}
