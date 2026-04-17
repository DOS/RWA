'use client';
import { useAuth } from '@/lib/auth-context';
import { useI18n } from '@/lib/i18n-context';
import { usePathname } from 'next/navigation';

export function AuthButton() {
  const { user, loading, logout } = useAuth();
  const { t } = useI18n();
  const pathname = usePathname();

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">{user.email || 'DOS.Me User'}</p>
          <p className="text-xs text-gray-400">DOS.Me ID</p>
        </div>
        <button
          onClick={logout}
          className="px-3 py-1.5 text-xs text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          {t("logout")}
        </button>
      </div>
    );
  }

  // Direct link to id.dos.me — works without JS hydration
  // State cookie will be set by the /auth/login route handler
  const loginHref = `/login?return_path=${encodeURIComponent(pathname)}`;

  return (
    <a
      href={loginHref}
      className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
    >
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
      </svg>
      {t("loginDosMe")}
    </a>
  );
}
