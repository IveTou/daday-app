import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { Session, getSession } from '@auth0/nextjs-auth0/edge';

export async function middleware(request: NextRequest) {
  const session = await getSession(request, NextResponse.next());

  const userSession = await getUserProfileBySession(session, request)
  const isProfileTrue = Boolean(request.nextUrl.searchParams.get('profile'))

  if (request.nextUrl.pathname.endsWith('/')) {
    return NextResponse.next();
  }

  if (!session?.user && !request.nextUrl.pathname.startsWith('/api/auth/login')) {
    return NextResponse.redirect(new URL('/api/auth/login', request.url))
  }

  if(session?.user && userSession && !isProfileTrue) {
    return NextResponse.redirect(new URL('?profile=true', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}

const getUserProfileBySession = async (session?: Session | null, request?: NextRequest) => {
  if(session?.user.sub && request) {
    const apiResponse = await fetch(`${request.nextUrl.origin}/api/profile?id=${session?.user.sub}`)
    const userData = await apiResponse.json()

    return userData
  }

  return
}
