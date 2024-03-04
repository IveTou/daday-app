import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from '@auth0/nextjs-auth0/edge';
//import { jwtDecode } from "jwt-decode";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const session = await getSession(request, response);

  /* if (session?.idToken) {
    const decoded = jwtDecode(session?.idToken);
    console.log('decoded sub', decoded.sub)
    console.log('session', session.user.email, session.user.sub)
  } */

  if (session?.user || request.nextUrl.pathname.endsWith('/')) {
    return NextResponse.next();
  }
 
  if (!session?.user && !request.nextUrl.pathname.startsWith('/api/auth/login')) {
    return NextResponse.redirect(new URL('/api/auth/login', request.url))
  }
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}