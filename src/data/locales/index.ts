import enAbout from "./en/about.json";
import enContact from "./en/contact.json";
import enHero from "./en/hero.json";
import enPortfolio from "./en/portfolio.json";
import idAbout from "./id/about.json";
import idContact from "./id/contact.json";
import idHero from "./id/hero.json";
import idPortfolio from "./id/portfolio.json";
import type { Locale } from "../../types";

export { type Locale } from "../../types";
export const locales = ["id", "en"] as const satisfies readonly Locale[];

export const dictionaries = {
  id: {
    hero: idHero,
    about: idAbout,
    contact: idContact,
    portfolio: idPortfolio,
  },
  en: {
    hero: enHero,
    about: enAbout,
    contact: enContact,
    portfolio: enPortfolio,
  },
} as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
