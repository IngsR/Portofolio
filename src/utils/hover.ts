"use client";

/**
 * Deteksi kemampuan hover sekali per module (singleton), lalu dibagikan ke
 * seluruh card di halaman — tidak ada useState/useEffect/listener per card.
 *
 * - SSR / sebelum hydrate: `false` (aman, tanpa akses window)
 * - Setelah device berubah (mis. tablet mode), cache ikut diperbarui
 *
 * Dipakai bersama oleh Certificate & kartu proyek Hero.
 */
const getCanHover = (() => {
  let cached: boolean | null = null;
  let mediaQuery: MediaQueryList | null = null;

  const read = () => {
    if (typeof window === "undefined") return false;
    if (!mediaQuery) {
      mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
      mediaQuery.addEventListener("change", (event) => {
        cached = event.matches;
      });
    }
    return mediaQuery.matches;
  };

  return () => {
    if (cached !== null) return cached;
    cached = read();
    return cached;
  };
})();

export const canHover = () => getCanHover();
