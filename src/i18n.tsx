import { createContext, useContext, type ReactNode } from "react";
import { getDictionary } from "./data/locales";
import type { Locale } from "./types";

const I18nContext = createContext<Locale>("id");

export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return <I18nContext.Provider value={locale}>{children}</I18nContext.Provider>;
}

export function useTranslations() {
  const locale = useContext(I18nContext);
  return { locale, dictionary: getDictionary(locale) };
}
