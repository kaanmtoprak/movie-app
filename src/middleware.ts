// Middleware disabled - using cookie-based locale detection in i18n.ts instead
// This prevents unwanted redirects when using localePrefix: 'never'

import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Just pass through - no redirects
  return NextResponse.next();
}

export const config = {
  // Match all pathnames except API routes and static files
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
