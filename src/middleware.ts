import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/firebase';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const session = request.cookies.get('session');

  // Login sayfasındaysa ve session varsa dashboard'a yönlendir
  if (path === '/login' && session?.value) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Dashboard sayfasındaysa ve session yoksa login'e yönlendir
  if (path.startsWith('/dashboard') && !session?.value) {
    return NextResponse.redirect(new URL('/login', request.url));
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
