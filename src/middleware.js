import { NextResponse } from 'next/server';

export function middleware(req) {
  const isLoggedIn = req.cookies.get('auth');

  // Protect home page
  if (!isLoggedIn && req.nextUrl.pathname.startsWith('/home')) {
    return NextResponse.redirect(new URL('/sso', req.url));
  }
}
