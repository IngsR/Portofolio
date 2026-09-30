import Lenis from "lenis";
import { useEffect, useRef } from "react";

/**
 * Hook untuk mengaktifkan smooth scrolling sinematik berbasis Lenis.
 * Menghadirkan inersia scrolling mewah yang halus ala web studio terkemuka (Awwwards/Apple).
 */
export function useSmoothScroll(options?: {
  enabled?: boolean;
  isPaused?: boolean;
}) {
  const { enabled = true, isPaused = false } = options || {};
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !enabled) return;

    // Hormati preferensi aksesibilitas pengguna
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);

  // Pause / resume scroll saat modal aktif
  useEffect(() => {
    if (!lenisRef.current) return;
    if (isPaused) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [isPaused]);

  return lenisRef;
}
