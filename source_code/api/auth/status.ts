import { validateSession } from '../_lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { valid, username } = await validateSession(req);

  return res.status(200).json({
    authenticated: valid,
    ...(valid && { username }),
  });
}
