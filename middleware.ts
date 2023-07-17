import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const locale = request.nextUrl.locale;
  if (request.nextUrl.pathname === '/news-feed') {
    return NextResponse.redirect(
      new URL(`${locale}/news-feed/home`, request.url)
    );
  }
  if (
    request.nextUrl.pathname === '/' &&
    request.cookies.get('user')?.value === 'true'
  ) {
    return NextResponse.redirect(
      new URL(`${locale}/news-feed/home`, request.url)
    );
  }

  if (
    request.nextUrl.pathname.includes('/news-feed') &&
    request.cookies.get('user')?.value === 'false'
  ) {
    return NextResponse.redirect(
      new URL(`${locale}/`, process.env.NEXT_PUBLIC_BASE_URL)
    );
  }

  return NextResponse.next();
}
