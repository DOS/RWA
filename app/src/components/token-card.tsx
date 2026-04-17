"use client";

import { useI18n } from "@/lib/i18n-context";

interface TokenCardProps {
  name: string;
  symbol: string;
  faceValue: string;
  couponRate: string;
  maturity: string;
  holders: number;
  issuer: string;
  address: string;
  isERC3643?: boolean;
}

export function TokenCard({
  name,
  symbol,
  faceValue,
  couponRate,
  maturity,
  holders,
  issuer,
  address,
  isERC3643 = true,
}: TokenCardProps) {
  const { t } = useI18n();

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 hover:border-gray-300 hover:shadow-md transition-all h-full">
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-gray-900 leading-tight">{name}</h3>
          <p className="text-sm text-gray-500">{symbol}</p>
        </div>
        {isERC3643 && (
          <span className="shrink-0 inline-flex items-center rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-600 border border-red-200 whitespace-nowrap">
            ERC-3643
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-400">{t("faceValue")}</p>
          <p className="text-gray-900 font-medium">{faceValue}</p>
        </div>
        <div>
          <p className="text-gray-400">{t("couponRate")}</p>
          <p className="text-green-600 font-medium">{couponRate}</p>
        </div>
        <div>
          <p className="text-gray-400">{t("maturity")}</p>
          <p className="text-gray-900 font-medium">{maturity}</p>
        </div>
        <div>
          <p className="text-gray-400">{t("holders")}</p>
          <p className="text-gray-900 font-medium">{holders}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 flex-1">
        <p className="text-xs text-gray-400">
          {t("issuerLabel")}: <span className="text-gray-500">{issuer}</span>
        </p>
      </div>

      <a
        href={`https://doscan.io/token/${address}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 w-full rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 transition-colors inline-block text-center"
      >
        {t("viewDetails")}
      </a>
    </div>
  );
}
