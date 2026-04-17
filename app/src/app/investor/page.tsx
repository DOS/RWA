"use client";

import { useEffect, useState } from "react";
import { AuthButton } from "@/components/auth-button";
import { TokenCard } from "@/components/token-card";
import { AIChat } from "@/components/ai-chat";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";
import { LangSwitcher } from "@/components/lang-switcher";

type OnChainToken = {
  address: string;
  name: string;
  symbol: string;
  totalSupply: string;
  decimals: number;
};

export default function InvestorPage() {
  const { t } = useI18n();
  const [tokens, setTokens] = useState<OnChainToken[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/list-tokens")
      .then((r) => r.json())
      .then((data) => setTokens(data.tokens || []))
      .catch(() => setTokens([]))
      .finally(() => setLoading(false));
  }, []);

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
            {loading ? (
              <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
                <div className="animate-spin mx-auto rounded-full h-8 w-8 border-b-2 border-red-600" />
                <p className="mt-3 text-sm text-gray-400">Loading tokens...</p>
              </div>
            ) : tokens.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tokens.map((token) => (
                  <TokenCard
                    key={token.address}
                    name={token.name}
                    symbol={token.symbol}
                    faceValue={`${Number(token.totalSupply).toLocaleString()} units`}
                    couponRate="N/A"
                    maturity="N/A"
                    holders={0}
                    issuer="Shinhan Securities Vietnam"
                    address={token.address}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
                <p className="text-sm text-gray-400">
                  {t("moreSecurities")}
                </p>
              </div>
            )}
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
