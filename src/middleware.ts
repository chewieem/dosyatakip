import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/firebase';

export async function middleware(request: NextRequest) {
  // Public paths that don't require authentication
  const publicPaths = ['/login'];
  const path = request.nextUrl.pathname;

  // Check if the current path is public
  const isPublicPath = publicPaths.includes(path);

  // Get the token from cookies
  const session = request.cookies.get('session');

  if (isPublicPath) {
    // If user is on a public path and has a valid session, redirect to dashboard
    if (session?.value) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // If user doesn't have a session and tries to access protected route
  if (!session?.value) {
    const url = new URL('/login', request.url);
    url.searchParams.set('from', path);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/dashboard',
    '/dashboard/:path*'
  ]
};
