import { NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const protectedPaths = ['/checkout'];
  const needsAuth = protectedPaths.some((path) => pathname.startsWith(path));

  if (!needsAuth) return NextResponse.next();

  const token = request.cookies.get('auth_token')?.value;

  if (!token) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const session = await verifyToken(token);

  if (!session) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/checkout/:path*'],
};
