import { useEffect } from "react";

/**
 * useSmoothScroll — CSS-native smooth scroll, tanpa Lenis.
 *
 * Lenis menggunakan rAF loop yang berjalan setiap frame bahkan saat scroll diam,
 * dan di Firefox tidak bisa pipeline dengan native scroll compositor → jank.
 *
 * Solusi: `scroll-behavior: smooth` via CSS sudah cukup untuk navigasi halaman,
 * dan untuk inersia scroll, browser modern (Chrome, Firefox, Safari) sudah
 * memiliki smooth scroll native yang diakselerasi GPU tanpa JS overhead.
 *
 * isPaused: saat modal aktif, matikan scroll pada body via overflow:hidden.
 */
export function useSmoothScroll(options?: {
  enabled?: boolean;
  isPaused?: boolean;
}) {
  const { isPaused = false } = options || {};

  useEffect(() => {
    if (isPaused) {
      // Simpan scroll position sebelum lock agar tidak loncat saat modal tutup
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      return () => {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isPaused]);
}
