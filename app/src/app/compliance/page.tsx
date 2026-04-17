"use client";

import { AuthButton } from "@/components/auth-button";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";
import { LangSwitcher } from "@/components/lang-switcher";

const tokenCompliance = [
  {
    name: "SCB26A",
    status: "compliant",
    investors: 142,
    maxInvestors: 500,
    countries: 3,
    lastAudit: "2026-04-10",
  },
  {
    name: "SGB26",
    status: "compliant",
    investors: 89,
    maxInvestors: 1000,
    countries: 1,
    lastAudit: "2026-04-12",
  },
];

const transferAudit = [
  {
    from: "0x1234...abcd",
    to: "0x5678...ef01",
    amount: "10,000",
    token: "SCB26A",
    status: "approved",
    time: "2026-04-13 09:23",
  },
  {
    from: "0xaaaa...bbbb",
    to: "0xcccc...dddd",
    amount: "50,000",
    token: "SGB26",
    status: "approved",
    time: "2026-04-13 08:15",
  },
  {
    from: "0x9999...1111",
    to: "0x2222...3333",
    amount: "5,000",
    token: "SCB26A",
    status: "blocked",
    time: "2026-04-13 07:42",
  },
  {
    from: "0x4444...5555",
    to: "0x6666...7777",
    amount: "25,000",
    token: "SGB26",
    status: "approved",
    time: "2026-04-12 22:10",
  },
];

function StatusBadge({ status }: { status: string }) {
  if (status === "compliant" || status === "approved") {
    return (
      <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 border border-green-200">
        {status}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700 border border-red-200">
      {status}
    </span>
  );
}

export default function CompliancePage() {
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
              {t("complianceDashboard")}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <LangSwitcher />
            <AuthButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Token Compliance Status */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {t("tokenCompliance")}
          </h2>
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("token")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("status")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("investorsMax")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("countries")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("lastAudit")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tokenCompliance.map((token) => (
                  <tr key={token.name} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900 font-medium">
                      {token.name}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={token.status} />
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {token.investors} / {token.maxInvestors}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {token.countries}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {token.lastAudit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Transfer Audit Trail */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {t("transferAudit")}
          </h2>
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("from")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("to")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("amount")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("token")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("status")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("time")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transferAudit.map((tx, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-700 font-mono text-xs">
                      {tx.from}
                    </td>
                    <td className="px-6 py-4 text-gray-700 font-mono text-xs">
                      {tx.to}
                    </td>
                    <td className="px-6 py-4 text-gray-900">{tx.amount}</td>
                    <td className="px-6 py-4 text-gray-700">{tx.token}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={tx.status} />
                    </td>
                    <td className="px-6 py-4 text-gray-500">{tx.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
