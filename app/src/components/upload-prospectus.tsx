"use client";

import { useState, useRef } from "react";
import {
  processDocument,
  checkCompliance,
  type DocumentResult,
  type ComplianceReport,
} from "@/lib/ai-client";
import { useI18n } from "@/lib/i18n-context";

type Step = "upload" | "review" | "compliance" | "deploy";
type DeployState = "ready" | "deploying" | "deployed";

export function UploadProspectus() {
  const { t } = useI18n();
  const [step, setStep] = useState<Step>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<DocumentResult | null>(
    null
  );
  const [complianceReport, setComplianceReport] =
    useState<ComplianceReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [deployState, setDeployState] = useState<DeployState>("ready");
  const [deployStep, setDeployStep] = useState(0);
  const [deployResult, setDeployResult] = useState<Record<string, string> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const steps: { key: Step; label: string }[] = [
    { key: "upload", label: t("uploadPdf") },
    { key: "review", label: t("reviewData") },
    { key: "compliance", label: t("compliance") },
    { key: "deploy", label: t("deploy") },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === step);

  // Map AI-extracted JSON keys to Vietnamese labels
  const fieldLabels: Record<string, string> = {
    name: "Tên trái phiếu",
    tokenName: "Tên token",
    type: "Loại",
    symbol: "Mã",
    tokenSymbol: "Mã token",
    faceValue: "Mệnh giá",
    currency: "Đồng tiền",
    couponRate: "Lãi suất coupon",
    paymentFrequency: "Kỳ trả lãi",
    maturityDate: "Ngày đáo hạn",
    minDenomination: "Mệnh giá tối thiểu",
    totalSupply: "Tổng số lượng",
    issuer: "Tổ chức phát hành",
    isin: "Mã ISIN",
    restrictions: "Hạn chế",
    maxInvestors: "Số NĐT tối đa",
    lockUpDays: "Thời gian khóa (ngày)",
    description: "Mô tả",
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const result = await processDocument(file);
      setExtractedData(result);
      setStep("review");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : t("processError")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleComplianceCheck = async () => {
    if (!extractedData) return;
    setLoading(true);
    setError(null);
    try {
      const report = await checkCompliance(extractedData as unknown as Parameters<typeof checkCompliance>[0]);
      setComplianceReport(report);
      setStep("compliance");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : t("complianceError")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep("upload");
    setFile(null);
    setExtractedData(null);
    setComplianceReport(null);
    setError(null);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      {/* Back / Reset */}
      {step !== "upload" && (
        <button
          onClick={handleReset}
          className="mb-4 text-sm text-gray-500 hover:text-red-600 flex items-center gap-1"
        >
          &larr; {t("back")}
        </button>
      )}

      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((s, i) => (
          <div key={s.key} className="flex items-center">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  i <= currentStepIndex
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`ml-2 text-sm ${
                  i <= currentStepIndex ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`mx-4 h-px w-16 ${
                  i < currentStepIndex ? "bg-red-600" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Step 1: Upload */}
      {step === "upload" && (
        <div>
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer ${
              dragOver ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-red-300"
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              const droppedFile = e.dataTransfer.files[0];
              if (droppedFile?.type === "application/pdf") setFile(droppedFile);
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="mt-4 text-sm text-gray-500">
              {file ? file.name : t("uploadPrompt")}
            </p>
            <p className="mt-1 text-xs text-gray-400">
              {file ? `${(file.size / 1024).toFixed(0)} KB` : t("dragDrop")}
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="mt-6 w-full rounded-lg bg-red-600 px-4 py-3 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? t("processing") : t("analyzeDoc")}
          </button>

          <div className="mt-4 text-center text-sm text-gray-500">
            <p className="mb-2">{t("orUseSample")}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { file: "sample-compliant.pdf", label: t("sampleCorporateBond"), color: "text-green-600" },
                { file: "sample-govt-bond.pdf", label: t("sampleGovtBond"), color: "text-green-600" },
                { file: "sample-realestate-fund.pdf", label: t("sampleReitFund"), color: "text-green-600" },
                { file: "sample-non-compliant-vi.pdf", label: t("sampleNonCompliant"), color: "text-red-600" },
              ].map((s) => (
                <button
                  key={s.file}
                  type="button"
                  onClick={async (e) => {
                    e.stopPropagation();
                    const res = await fetch(`/samples/${s.file}`);
                    const blob = await res.blob();
                    setFile(new File([blob], s.file, { type: "application/pdf" }));
                  }}
                  className={`${s.color} hover:underline font-medium px-2 py-1 rounded border border-gray-200 hover:bg-gray-50 text-xs`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Review Extracted Data */}
      {step === "review" && extractedData && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t("aiExtracted")}
          </h3>
          <p className="text-sm text-gray-500 mb-4">{t("editableHint")}</p>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(extractedData).map(([key, value]) => (
              <div
                key={key}
                className="rounded-lg bg-gray-50 border border-gray-200 p-3"
              >
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  {fieldLabels[key] || key.replace(/([A-Z])/g, " $1").trim()}
                </p>
                {typeof value === "string" || typeof value === "number" ? (
                  <input
                    type="text"
                    value={String(value)}
                    onChange={(e) => {
                      setExtractedData({
                        ...extractedData,
                        [key]: e.target.value,
                      });
                    }}
                    className="mt-1 w-full text-sm text-gray-900 font-medium bg-transparent border-b border-transparent hover:border-gray-300 focus:border-red-500 focus:outline-none transition-colors"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900 font-medium">
                    {String(value)}
                  </p>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={handleComplianceCheck}
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-red-600 px-4 py-3 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? t("checkingCompliance") : t("runCompliance")}
          </button>
        </div>
      )}

      {/* Step 3: Compliance Report */}
      {step === "compliance" && complianceReport && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {t("complianceReport")}
            </h3>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                complianceReport.status === "compliant"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : complianceReport.status === "non_compliant"
                    ? "bg-red-50 text-red-700 border border-red-200"
                    : "bg-yellow-50 text-yellow-700 border border-yellow-200"
              }`}
            >
              {complianceReport.status.replace("_", " ").toUpperCase()}
            </span>
          </div>

          <div className="space-y-2 mb-4">
            {complianceReport.checks.map((check, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg bg-gray-50 p-3"
              >
                <span
                  className={`text-lg ${check.passed ? "text-green-600" : "text-red-600"}`}
                >
                  {check.passed ? "\u2713" : "\u2717"}
                </span>
                <div>
                  <p className="text-sm text-gray-900 font-medium">{check.name}</p>
                  <p className="text-xs text-gray-500">{check.details}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-500 mb-6">
            {complianceReport.summary}
          </p>

          <button
            onClick={() => setStep("deploy")}
            disabled={complianceReport.status === "non_compliant"}
            className="w-full rounded-lg bg-red-600 px-4 py-3 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {t("proceedDeploy")}
          </button>
        </div>
      )}

      {/* Step 4: Deploy */}
      {step === "deploy" && deployState === "ready" && extractedData && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t("readyDeploy")}
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            {t("deployDesc")}
          </p>

          <div className="rounded-lg bg-gray-50 border border-gray-200 p-4 mb-6 text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Token</span>
              <span className="font-medium text-gray-900">{String(extractedData.name || extractedData.tokenName)} ({String(extractedData.symbol || extractedData.tokenSymbol)})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Factory</span>
              <span className="font-mono text-xs text-gray-700">0x7979...3643</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">{t("network")}</span>
              <span className="text-gray-900">DOS Chain (7979)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">{t("estimatedGas")}</span>
              <span className="text-gray-900">~2.5M gas</span>
            </div>
          </div>

          <button
            onClick={async () => {
              setDeployState("deploying");
              setDeployStep(0);
              setError(null);
              try {
                // Animate steps while waiting for tx
                const stepTimers = [1, 2, 3].map((s, i) =>
                  setTimeout(() => setDeployStep(s), (i + 1) * 800)
                );

                const tokenName = String(extractedData?.name || extractedData?.tokenName || "");
                const tokenSymbol = String(extractedData?.symbol || extractedData?.tokenSymbol || "");
                const totalSupply = extractedData?.totalSupply;

                const res = await fetch("/api/deploy-token", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ name: tokenName, symbol: tokenSymbol, totalSupply }),
                });

                stepTimers.forEach(clearTimeout);

                if (!res.ok) {
                  const err = await res.json();
                  throw new Error(err.error || `Deploy failed: ${res.status}`);
                }

                const result = await res.json();
                setDeployStep(4);
                await new Promise((r) => setTimeout(r, 500));
                setDeployStep(5);
                setDeployResult(result);
                setDeployState("deployed");
              } catch (err) {
                setError(err instanceof Error ? err.message : "Deploy failed");
                setDeployState("ready");
              }
            }}
            className="w-full rounded-lg bg-red-600 px-8 py-3 text-sm font-medium text-white hover:bg-red-700 transition-colors"
          >
            {t("deployToken")}
          </button>
        </div>
      )}

      {step === "deploy" && deployState === "deploying" && (
        <div className="py-8">
          <div className="flex items-center justify-center mb-6">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 text-center mb-6">
            {t("deploying")}
          </h3>
          <div className="space-y-3 max-w-md mx-auto">
            {[
              { step: 1, label: t("deployStep1") },
              { step: 2, label: t("deployStep2") },
              { step: 3, label: t("deployStep3") },
              { step: 4, label: t("deployStep4") },
              { step: 5, label: t("deployStep5") },
            ].map((s) => (
              <div key={s.step} className="flex items-center gap-3">
                <span className={`text-lg ${deployStep >= s.step ? "text-green-600" : "text-gray-300"}`}>
                  {deployStep >= s.step ? "\u2713" : "\u25CB"}
                </span>
                <span className={`text-sm ${deployStep >= s.step ? "text-gray-900" : "text-gray-400"}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === "deploy" && deployState === "deployed" && deployResult && (
        <div className="py-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mb-4">
            <span className="text-3xl text-green-600">{"\u2713"}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
            {t("deploySuccess")}
          </h3>
          <p className="text-sm text-gray-500 text-center mb-6">
            {String(extractedData?.name || extractedData?.tokenName)} ({String(extractedData?.symbol || extractedData?.tokenSymbol)})
          </p>

          <div className="rounded-lg bg-gray-50 border border-gray-200 p-4 mb-6 text-sm space-y-2">
            {[
              { label: "Token Contract", value: deployResult.token },
              { label: "Identity Registry", value: deployResult.identityRegistry },
              { label: "Compliance", value: deployResult.modularCompliance },
              { label: "TREXFactory", value: deployResult.factory },
              { label: "Tx Hash", value: deployResult.txHash, isTx: true },
            ].map((row) => (
              <div key={row.label} className="flex justify-between items-center">
                <span className="text-gray-500">{row.label}</span>
                <a
                  href={`https://doscan.io/${row.isTx ? "tx" : "address"}/${row.value}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-red-600 hover:underline"
                >
                  {row.value ? `${row.value.slice(0, 6)}...${row.value.slice(-4)}` : "-"}
                </a>
              </div>
            ))}
          </div>

          <a
            href={`https://doscan.io/address/${deployResult.token}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center rounded-lg bg-red-600 px-8 py-3 text-sm font-medium text-white hover:bg-red-700 transition-colors"
          >
            {t("viewOnDoscan")}
          </a>
        </div>
      )}
    </div>
  );
}
