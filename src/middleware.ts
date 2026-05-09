import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware is a simplified version for the demo
// In a real app, you would use Firebase Admin SDK to verify session cookies
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // For the demo, we allow all access but simulate role-based redirects
  // In production, you would check auth state here
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
