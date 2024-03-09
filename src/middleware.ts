import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from '@auth0/nextjs-auth0/edge';
import { json } from 'stream/consumers';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const session = await getSession(request, response);

  if(session?.user) {
    const userId = session?.user.sub
    const apiResponse = await fetch(`http://localhost:3000/api/profile?id=${userId}`)
    const userData = await apiResponse.json()

    //TODO: handle Profile made routes
  }


  if (request.nextUrl.pathname.endsWith('/')) {
    return NextResponse.next();
  }

  if (!session?.user && !request.nextUrl.pathname.startsWith('/api/auth/login')) {
    return NextResponse.redirect(new URL('/api/auth/login', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
