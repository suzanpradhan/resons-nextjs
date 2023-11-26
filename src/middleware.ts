import { NextResponse } from 'next/server';

export async function middleware(req: any) {
  const cookieToken = req.cookies.get('token');
  // const isSiteAuth = req.cookies.get('authenticated');

  // if (req?.nextUrl?.pathname === '/signup') {
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }

  if (!cookieToken?.value) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/library', '/settings', '/notification', '/postCreate', '/profile'],
};
