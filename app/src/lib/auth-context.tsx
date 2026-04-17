'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { createClient } from '@/lib/supabase';
import type { User, AuthChangeEvent, Session } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  loading: boolean;
  login: (returnPath?: string) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState>({
  user: null,
  loading: true,
  login: () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then((result: { data: { user: User | null } }) => {
      setUser(result.data?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = (returnPath?: string) => {
    const currentPath = returnPath || window.location.pathname;
    const state = crypto.randomUUID();

    // Store state in cookie for CSRF verification
    document.cookie = `sso_state=${state}; path=/; max-age=600; SameSite=Lax; Secure`;

    const redirectUri = new URL(`${window.location.origin}/auth/sso`);
    redirectUri.searchParams.set('state', state);
    if (currentPath && currentPath !== '/') {
      redirectUri.searchParams.set('return_path', currentPath);
    }

    const loginUrl = new URL('https://id.dos.me/login');
    loginUrl.searchParams.set('redirect', redirectUri.toString());

    window.location.href = loginUrl.toString();
  };

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
