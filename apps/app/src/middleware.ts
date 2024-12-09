import { afterLoginUrl, authRoutes, protectedRoutes } from '@/config';
import { deleteSessionTokenCookie, validateSessionToken } from '@/lib/auth';
import appConfig from '@repo/config';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const redirectToSignIn = (req: NextRequest) => {
  return NextResponse.redirect(new URL(authRoutes.signIn, req.url));
};

const redirectToDashboard = (req: NextRequest) => {
  return NextResponse.redirect(new URL(afterLoginUrl, req.url));
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtectedRoute = protectedRoutes.includes(pathname);
  const isAuthRoute = Object.values(authRoutes).includes(pathname);

  const sessionCookie = req.cookies.get(appConfig.auth.sessionCookie.name);

  // If user is logged in and trying to access auth routes, redirect to dashboard
  if (isAuthRoute && sessionCookie) {
    try {
      const session = await validateSessionToken(sessionCookie.value);
      if (session) {
        return redirectToDashboard(req);
      }
    } catch (error) {
      // If session validation fails, continue with normal flow
      console.error('Error verifying session:', error);
    }
  }

  // If not a protected route, allow access
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Handle protected routes
  if (!sessionCookie) {
    return redirectToSignIn(req);
  }

  let res = NextResponse.next();

  try {
    // const requestHeaders = new Headers(req.headers);
    // requestHeaders.set('Cookie', `${sessionConfig.name}=${sessionCookie.value}`);
    // const result = await fetch(`${env.SERVER_BASE_URL}${apiRoutes.auth.session}`, {
    //   headers: requestHeaders,
    // });
    // const session = await result.json();
    // if (!session.success) {
    //   throw new Error('Invalid session');
    // }
    // return NextResponse.next({
    //   request: {
    //     headers: requestHeaders,
    //   },
    // });
    const session = await validateSessionToken(sessionCookie.value);

    if (!session) {
      throw new Error('Invalid session');
    }
  } catch (error) {
    console.error('Error verifying session:', error);
    await deleteSessionTokenCookie();
    return redirectToSignIn(req);
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
