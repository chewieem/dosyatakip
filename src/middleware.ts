import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Korumalı rotalar
  const protectedPaths = ['/dashboard'];
  const path = request.nextUrl.pathname;

  // Login sayfasındaysa ve giriş yapmışsa dashboard'a yönlendir
  if (path === '/login') {
    const session = request.cookies.get('session');
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // Eğer korumalı bir rota ise ve kullanıcı giriş yapmamışsa
  if (protectedPaths.some(prefix => path.startsWith(prefix))) {
    const session = request.cookies.get('session');
    
    if (!session) {
      const url = new URL('/login', request.url);
      url.searchParams.set('from', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*']
};
