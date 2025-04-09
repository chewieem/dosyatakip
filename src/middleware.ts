import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/firebase';

export async function middleware(request: NextRequest) {
  // Korumalı rotalar
  const protectedPaths = ['/dashboard'];
  const path = request.nextUrl.pathname;

  // Eğer korumalı bir rota ise ve kullanıcı giriş yapmamışsa
  if (protectedPaths.some(prefix => path.startsWith(prefix))) {
    // Firebase'den token kontrolü
    const token = request.cookies.get('token');
    
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*']
};
