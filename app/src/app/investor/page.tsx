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

const demoTokens = [
  {
    name: "Shinhan Corp Bond 2026-A",
    symbol: "SCB26A",
    faceValue: "1,000 USD",
    couponRate: "8.5%",
    maturity: "Dec 2026",
    holders: 142,
    issuer: "Shinhan Securities Vietnam",
    address: "0x27202027046E614E159329d9cdf8c35a197CC7b5",
  },
  {
    name: "State Government Bond 2026",
    symbol: "SGB26",
    faceValue: "10,000 USD",
    couponRate: "7.2%",
    maturity: "Jun 2026",
    holders: 89,
    issuer: "State Treasury of Vietnam",
    address: "0x91117325e1DbcB79F1A507f744571EC14FcF1500",
  },
];

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {demoTokens.map((token) => (
                <TokenCard key={`demo-${token.address}`} {...token} />
              ))}
              {tokens
                .filter((t) => !demoTokens.some((d) => d.address.toLowerCase() === t.address.toLowerCase()))
                .map((token) => (
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

            {loading && (
              <p className="mt-4 text-center text-xs text-gray-400">
                {t("loadingMore")}
              </p>
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
