"use client";

import { AuthButton } from "@/components/auth-button";
import { UploadProspectus } from "@/components/upload-prospectus";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";
import { LangSwitcher } from "@/components/lang-switcher";

export default function IssuerPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.svg" alt="DOS" className="h-8" />
            </Link>
            <span className="text-gray-300">|</span>
            <h1 className="text-lg font-semibold text-gray-900">{t("issuerPortal")}</h1>
          </div>
          <div className="flex items-center gap-3">
            <LangSwitcher />
            <AuthButton />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {t("issueTokens")}
          </h2>
          <p className="mt-2 text-gray-500">
            {t("issueDesc")}
          </p>
        </div>

        <UploadProspectus />

        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-2xl font-bold text-gray-900">2</p>
            <p className="text-sm text-gray-500">{t("tokensIssued")}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-2xl font-bold text-gray-900">50B VND</p>
            <p className="text-sm text-gray-500">{t("totalValueLocked")}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-2xl font-bold text-gray-900">231</p>
            <p className="text-sm text-gray-500">{t("activeInvestors")}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
