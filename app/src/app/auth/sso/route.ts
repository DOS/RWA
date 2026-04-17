import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

const API_BASE = 'https://api.dos.me';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const rawReturnPath = searchParams.get('return_path') || '/';
  const returnPath = rawReturnPath.startsWith('%') ? decodeURIComponent(rawReturnPath) : rawReturnPath;

  if (!code) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Verify CSRF state
  const storedState = request.cookies.get('sso_state')?.value;
  if (storedState && state !== storedState) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Exchange code for tokens (server-to-server)
  const redirectUri = `${request.nextUrl.origin}/auth/sso`;
  try {
    const res = await fetch(`${API_BASE}/sso/exchange`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, redirect_uri: redirectUri }),
    });

    if (!res.ok) {
      return NextResponse.redirect(
        `https://id.dos.me/login?redirect=${encodeURIComponent(redirectUri)}`
      );
    }

    const data = await res.json();
    const tokens = data.data || data;

    if (!tokens.access_token) {
      return NextResponse.redirect(new URL('/?error=no_token', request.url));
    }

    // Set Supabase session via httpOnly cookies
    const response = NextResponse.redirect(new URL(returnPath, request.url));

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll: () => request.cookies.getAll(),
          setAll: (cookiesToSet) =>
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)),
        },
      }
    );

    await supabase.auth.setSession({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    });

    // Clear state cookie
    response.cookies.set('sso_state', '', { path: '/', maxAge: 0 });
    return response;
  } catch {
    return NextResponse.redirect(new URL('/', request.url));
  }
}
