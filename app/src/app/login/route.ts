import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

/**
 * Server-side login redirect.
 * Generates CSRF state, sets cookie, redirects to id.dos.me.
 * Works without client-side JS — just a plain <a href="/auth/login">.
 */
export async function GET(request: NextRequest) {
  const returnPath = request.nextUrl.searchParams.get('return_path') || '/';
  const state = randomUUID();

  const redirectUri = new URL(`${request.nextUrl.origin}/auth/sso`);
  redirectUri.searchParams.set('state', state);
  redirectUri.searchParams.set('return_path', returnPath);

  const loginUrl = new URL('https://id.dos.me/login');
  loginUrl.searchParams.set('redirect', redirectUri.toString());

  const response = NextResponse.redirect(loginUrl);
  response.cookies.set('sso_state', state, {
    path: '/',
    secure: true,
    sameSite: 'lax',
    maxAge: 600,
  });

  return response;
}
