import { verifyToken } from './auth';

export async function getSessionFromCookie(cookieStore) {
  const token = cookieStore.get('auth_token')?.value;
  if (!token) return null;
  return verifyToken(token);
}
