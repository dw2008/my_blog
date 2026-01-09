import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  return res.status(200).json({
    message: 'API is working',
    method: req.method,
    env: {
      hasClientId: !!process.env.GITHUB_CLIENT_ID,
      hasClientSecret: !!process.env.GITHUB_CLIENT_SECRET,
      hasToken: !!process.env.GITHUB_TOKEN,
      hasCallbackUrl: !!process.env.GITHUB_CALLBACK_URL,
      hasOwner: !!process.env.GITHUB_OWNER,
      hasRepo: !!process.env.GITHUB_REPO,
      hasUsername: !!process.env.ALLOWED_ADMIN_GITHUB_USERNAME,
      hasSecret: !!process.env.SESSION_SECRET,
    }
  });
}
