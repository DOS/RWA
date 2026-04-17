"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";
import { LangSwitcher } from "@/components/lang-switcher";
import { AuthButton } from "@/components/auth-button";

export default function HomePage() {
  const { t } = useI18n();

  const portals = [
    {
      title: t("issuerPortal"),
      description: t("issuerDesc"),
      href: "/issuer",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      title: t("investorPortal"),
      description: t("investorDesc"),
      href: "/investor",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
    },
    {
      title: t("complianceDashboard"),
      description: t("complianceDesc"),
      href: "/compliance",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="DOS" className="h-8" />
            <h1 className="text-lg font-semibold text-gray-900">{t("title")}</h1>
          </div>
          <div className="flex items-center gap-3">
            <LangSwitcher />
            <AuthButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
        <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            DOS Chain (7979)
          </span>
          <span>|</span>
          <span>ERC-3643 Compliant</span>
          <span>|</span>
          <span>AI-Powered</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {portals.map((portal) => (
          <Link
            key={portal.href}
            href={portal.href}
            className="group rounded-xl border border-gray-200 bg-white p-8 hover:border-red-300 hover:shadow-md transition-all duration-200"
          >
            <div className="text-red-600 mb-4">{portal.icon}</div>
            <h2 className="text-xl font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
              {portal.title}
            </h2>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              {portal.description}
            </p>
            <div className="mt-4 text-sm text-red-600 flex items-center gap-1">
              {t("enter")}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {[
          { value: "7979", label: "Chain ID" },
          { value: "1s", label: t("statBlockTime") },
          { value: "Gasless", label: t("statGasCost") },
          { value: "ERC-3643", label: t("statStandard") },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl font-bold text-gray-900">{s.value}</p>
            <p className="mt-1 text-sm text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* About */}
      <section className="mt-24 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
          {t("aboutTitle")}
        </h2>
        <p className="text-gray-500 text-center max-w-3xl mx-auto leading-relaxed">
          {t("aboutDesc")}
        </p>
      </section>

      {/* Features */}
      <section className="mt-24 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          {t("featuresTitle")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", title: t("featureAiTitle"), desc: t("featureAiDesc") },
            { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: t("featureComplianceTitle"), desc: t("featureComplianceDesc") },
            { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: t("featureSpeedTitle"), desc: t("featureSpeedDesc") },
            { icon: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2", title: t("featureIdentityTitle"), desc: t("featureIdentityDesc") },
            { icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z", title: t("featureGlobalTitle"), desc: t("featureGlobalDesc") },
            { icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", title: t("featureOnpremTitle"), desc: t("featureOnpremDesc") },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={f.icon} />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-gray-900">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Stack */}
      <section className="mt-24 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          {t("techTitle")}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "ERC-3643 (T-REX)", desc: t("techErc3643"), url: "https://erc3643.org" },
            { name: "ONCHAINID", desc: t("techOnchainid"), url: "https://github.com/onchain-id/solidity" },
            { name: "Avalanche L1", desc: t("techAvalanche"), url: "https://www.avax.network" },
            { name: "Qwen AI", desc: t("techQwen"), url: "https://huggingface.co/Qwen" },
            { name: "DOS.Me ID", desc: t("techDosme"), url: "https://id.dos.me" },
            { name: "DOS Chain", desc: t("techDoschain"), url: "https://doscan.io" },
            { name: "ICTT Bridge", desc: t("techIctt"), url: "https://github.com/ava-labs/icm-contracts" },
            { name: "ERC-4337", desc: t("techAa"), url: "https://eips.ethereum.org/EIPS/eip-4337" },
          ].map((tech) => (
            <a
              key={tech.name}
              href={tech.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-gray-200 bg-white p-4 hover:border-red-300 hover:shadow-sm transition-all"
            >
              <p className="text-sm font-semibold text-gray-900 hover:text-red-600 transition-colors">{tech.name}</p>
              <p className="mt-1 text-xs text-gray-500">{tech.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mt-24 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          {t("howTitle")}
        </h2>
        <div className="space-y-0">
          {[
            { step: "01", title: t("howStep1Title"), desc: t("howStep1Desc") },
            { step: "02", title: t("howStep2Title"), desc: t("howStep2Desc") },
            { step: "03", title: t("howStep3Title"), desc: t("howStep3Desc") },
            { step: "04", title: t("howStep4Title"), desc: t("howStep4Desc") },
          ].map((h, i) => (
            <div key={h.step} className="flex gap-6 items-start">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
                  {h.step}
                </div>
                {i < 3 && <div className="w-px h-12 bg-gray-200" />}
              </div>
              <div className="pb-8">
                <h3 className="text-base font-semibold text-gray-900">{h.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{h.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-24 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          {t("faqTitle")}
        </h2>
        <div className="space-y-4">
          {[
            { q: t("faq1Q"), a: t("faq1A") },
            { q: t("faq2Q"), a: t("faq2A") },
            { q: t("faq3Q"), a: t("faq3A") },
            { q: t("faq4Q"), a: t("faq4A") },
            { q: t("faq5Q"), a: t("faq5A") },
            { q: t("faq6Q"), a: t("faq6A") },
          ].map((faq) => (
            <details key={faq.q} className="group rounded-xl border border-gray-200 bg-white">
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer text-sm font-medium text-gray-900 hover:text-red-600">
                {faq.q}
                <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-sm text-gray-500 leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Partners / Ecosystem */}
      <section className="mt-24 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {t("ecosystemTitle")}
        </h2>
        <p className="text-gray-500 mb-8">{t("ecosystemDesc")}</p>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
          {["Avalanche", "Shinhan", "DTCC", "ERC-3643 Association", "Qwen AI", "DOS.Me", "DOScan"].map((p) => (
            <span key={p} className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 font-medium">
              {p}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-24 max-w-3xl mx-auto text-center rounded-2xl bg-gradient-to-br from-red-600 to-red-700 p-12">
        <h2 className="text-2xl font-bold text-white mb-3">
          {t("ctaTitle")}
        </h2>
        <p className="text-red-100 mb-6 text-sm">{t("ctaDesc")}</p>
        <Link
          href="/issuer"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          {t("ctaButton")}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </section>

      <footer className="mt-24 text-center text-xs text-gray-400 pb-8">
        <p>DOS Chain - Avalanche L1 - Chain ID 7979</p>
        <p className="mt-1">{t("footerBuilt")}</p>
      </footer>
      </main>
    </div>
  );
}
