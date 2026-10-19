import { useEffect, useMemo, useRef, useState } from "react";

export type ScrollDirection = "up" | "down";

interface UseScrollDirectionOptions {
  threshold?: number;
  initialDirection?: ScrollDirection;
  topThreshold?: number;
}

/**
 * Hook untuk mendeteksi arah scroll pengguna (up/down) dengan rAF coalescing
 * tanpa memicu reflow atau re-render berlebihan. Cocok untuk floating cinematic navbar.
 */
export function useScrollDirection(options?: UseScrollDirectionOptions) {
  const { threshold = 10, initialDirection = "up", topThreshold = 80 } =
    options || {};

  const [scrollDirection, setScrollDirection] =
    useState<ScrollDirection>(initialDirection);
  const [isAtTop, setIsAtTop] = useState(true);

  const lastScrollYRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const update = () => {
      rafRef.current = null;
      const currentScrollY = window.scrollY;
      const last = lastScrollYRef.current;
      const diff = currentScrollY - last;

      setIsAtTop((prev) => {
        const next = currentScrollY < topThreshold;
        return prev !== next ? next : prev;
      });

      if (Math.abs(diff) >= threshold) {
        const nextDirection: ScrollDirection = diff > 0 ? "down" : "up";
        setScrollDirection((prev) =>
          prev !== nextDirection ? nextDirection : prev,
        );
      }

      lastScrollYRef.current = currentScrollY;
    };

    const handleScroll = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [threshold, topThreshold]);

  return useMemo(
    () => ({ scrollDirection, isAtTop }),
    [scrollDirection, isAtTop],
  );
}
