'use client';

import { useAuth } from '@/lib/auth-context';
import { useI18n } from '@/lib/i18n-context';

interface LoginPromptProps {
  children: React.ReactNode;
  action?: string;
}

/**
 * Wraps a protected action. If user is not logged in, shows login prompt
 * instead of executing the action. Pages remain visible to everyone.
 */
export function LoginPrompt({ children, action }: LoginPromptProps) {
  const { user, login } = useAuth();
  const { t } = useI18n();

  if (user) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div className="pointer-events-none opacity-50">{children}</div>
      <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl backdrop-blur-sm">
        <div className="text-center p-6">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-red-50 flex items-center justify-center">
            <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-900 mb-1">
            {t('loginRequired')}
          </p>
          {action && <p className="text-xs text-gray-500 mb-3">{action}</p>}
          <button
            onClick={() => login()}
            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            {t('loginDosMe')}
          </button>
        </div>
      </div>
    </div>
  );
}
