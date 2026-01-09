import { SignJWT, jwtVerify } from 'jose';
import { parse, serialize } from 'cookie';

const SECRET = new TextEncoder().encode(process.env.SESSION_SECRET || 'fallback-secret-key');

export async function generateSessionToken(username) {
  const token = await new SignJWT({ username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET);

  return token;
}

export async function verifySessionToken(token) {
  try {
    const { payload } = await jwtVerify(token, SECRET);

    // Validate payload structure
    if (typeof payload.username !== 'string') {
      return null;
    }

    return payload;
  } catch (error) {
    return null;
  }
}

export async function validateSession(req) {
  const cookies = parse(req.headers.cookie || '');
  const sessionToken = cookies.session;

  if (!sessionToken) {
    return { valid: false };
  }

  const session = await verifySessionToken(sessionToken);

  if (!session) {
    return { valid: false };
  }

  // Check if user is the allowed admin
  const allowedUsername = process.env.ALLOWED_ADMIN_GITHUB_USERNAME;
  if (session.username !== allowedUsername) {
    return { valid: false };
  }

  return { valid: true, username: session.username };
}

export function createSessionCookie(token, isProduction) {
  return serialize('session', token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  });
}

export function clearSessionCookie(isProduction) {
  return serialize('session', '', {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
}
