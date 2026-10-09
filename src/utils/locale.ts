import type { Locale, PageId } from "../types";

const pagePaths: Record<PageId, string> = {
  home: "/",
  portfolio: "/portfolio",
  about: "/about",
  contact: "/contact",
};

/** Locale yang dipakai pengunjung saat pertama kali membuka situs. */
export const DEFAULT_LOCALE: Locale = "en";

/** Kunci localStorage untuk menyimpan pilihan bahasa pengunjung. */
export const LOCALE_STORAGE_KEY = "portfolio_locale";

export function getLocaleFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "id";
}

export function getLocalePath(pathname: string, locale: Locale): string {
  const cleanPath = pathname.replace(/\/+$/, "") || "/";
  const pathWithoutLocale =
    cleanPath === "/en" ? "/" : cleanPath.replace(/^\/en(?=\/)/, "");

  if (locale === "id") return pathWithoutLocale;
  return pathWithoutLocale === "/" ? "/en" : `/en${pathWithoutLocale}`;
}

export function getLanguageSwitchPath(
  pathname: string,
  currentLocale: Locale,
  activePage: PageId,
): string {
  const pagePath = pagePaths[activePage];
  const sourcePath =
    pathname === "/" || pathname === "/en" ? pagePath : pathname;
  return getLocalePath(sourcePath, currentLocale === "id" ? "en" : "id");
}

/**
 * Membaca preferensi bahasa tersimpan. Mengembalikan null bila pengunjung
 * belum pernah memilih bahasa secara eksplisit.
 */
export function getStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    return saved === "id" || saved === "en" ? saved : null;
  } catch {
    return null;
  }
}

/** Menyimpan pilihan bahasa pengunjung secara permanen. */
export function setStoredLocale(locale: Locale): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Abaikan bila diblokir browser
  }
}

/**
 * Preferensi bahasa efektif: pilihan pengunjung bila ada, selain itu
 * bahasa default (Inggris).
 */
export function getPreferredLocale(): Locale {
  return getStoredLocale() ?? DEFAULT_LOCALE;
}

/**
 * Menentukan URL yang seharusnya dibuka untuk sebuah path, sesuai preferensi
 * bahasa pengunjung. Mengembalikan null bila path sudah tepat (tidak perlu
 * redirect).
 *
 * Hanya path halaman utama yang dialihkan. Halaman detail mempertahankan
 * URL-nya agar tidak memutus pratinjau tautan maupun riwayat back/forward.
 */
export function resolvePreferredLocaleRedirect(
  pathname: string,
): string | null {
  const cleanPath = pathname.replace(/\/+$/, "") || "/";
  const locale = getLocaleFromPath(cleanPath);

  if (locale === getPreferredLocale()) return null;

  const pathWithoutLocale =
    cleanPath === "/en" ? "/" : cleanPath.replace(/^\/en(?=\/)/, "");

  // Hanya alihkan route halaman utama, bukan detail proyek/sertifikat.
  if (!(pathWithoutLocale in pagePaths) && pathWithoutLocale !== "/") {
    return null;
  }

  const target = getLocalePath(cleanPath, getPreferredLocale());
  return target === cleanPath ? null : target;
}
