import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req: any) {
  // const cookieToken = req.cookies.get('token');

  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;

  // const isSiteAuth = req.cookies.get('authenticated');

  // if (req?.nextUrl?.pathname === '/signup') {
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }

  // if (!cookieToken?.value) {
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }


  if (req.nextUrl.pathname.startsWith('/_next/')) {
    return;
  }

  if (token) {
    if (pathname === '/login') {
      return NextResponse.redirect(new URL('/', req.nextUrl.origin));
    }
    return;
  } else {
    if (pathname === '/login') {
      return;
    }
    return NextResponse.redirect(new URL('/login' + "?callback=" + req.url, req.nextUrl.origin));
  }
}

export const config = {
  matcher: ['/settings', '/notification', '/postCreate', '/profile', '/login', '/post'],
};
