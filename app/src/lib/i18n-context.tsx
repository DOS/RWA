"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
import { translations, type Locale, type TranslationKey } from "./i18n";

const I18nContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: TranslationKey) => string;
}>({
  locale: "vi",
  setLocale: () => {},
  t: (key) => translations.vi[key],
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("vi");
  const t = (key: TranslationKey) => translations[locale][key];
  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
