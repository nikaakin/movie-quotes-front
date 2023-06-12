import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const locale = request.nextUrl.locale;
  if (request.nextUrl.pathname === '/news-feed') {
    return NextResponse.redirect(
      new URL(`${locale}/news-feed/home`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/news-feed',
};
