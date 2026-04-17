"use client";

import { AuthButton } from "@/components/auth-button";
import { TokenCard } from "@/components/token-card";
import { AIChat } from "@/components/ai-chat";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";
import { LangSwitcher } from "@/components/lang-switcher";

const demoTokens = [
  {
    name: "SCB Corporate Bond 2026 Series A",
    symbol: "SCB26A",
    faceValue: "1,000 USD",
    couponRate: "8.5%",
    maturity: "Dec 2026",
    holders: 142,
    issuer: "Saigon Commercial Bank",
    address: "0x27202027046E614E159329d9cdf8c35a197CC7b5",
  },
  {
    name: "SGB Government Bond 2026",
    symbol: "SGB26",
    faceValue: "10,000 USD",
    couponRate: "7.2%",
    maturity: "Jun 2026",
    holders: 89,
    issuer: "State General Treasury",
    address: "0x27202027046E614E159329d9cdf8c35a197CC7b5",
  },
];

export default function InvestorPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.svg" alt="DOS" className="h-8" />
            </Link>
            <span className="text-gray-300">|</span>
            <h1 className="text-lg font-semibold text-gray-900">
              {t("investorPortal")}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <LangSwitcher />
            <AuthButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Marketplace */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {t("marketplace")}
              </h2>
              <p className="mt-1 text-gray-500">
                {t("marketplaceDesc")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {demoTokens.map((token) => (
                <TokenCard key={token.symbol} {...token} />
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
              <p className="text-sm text-gray-400">
                {t("moreSecurities")}
              </p>
            </div>
          </div>

          {/* AI Chat */}
          <div>
            <AIChat />
          </div>
        </div>
      </main>
    </div>
  );
}
