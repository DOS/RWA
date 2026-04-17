"use client";
import { useI18n } from "@/lib/i18n-context";

export function LangSwitcher() {
  const { locale, setLocale } = useI18n();
  return (
    <div className="flex items-center gap-1 text-sm">
      <button
        onClick={() => setLocale("vi")}
        className={`px-2 py-1 rounded ${locale === "vi" ? "bg-red-600 text-white" : "text-gray-500 hover:text-gray-700"}`}
      >
        VI
      </button>
      <button
        onClick={() => setLocale("en")}
        className={`px-2 py-1 rounded ${locale === "en" ? "bg-red-600 text-white" : "text-gray-500 hover:text-gray-700"}`}
      >
        EN
      </button>
    </div>
  );
}
