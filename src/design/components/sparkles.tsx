"use client";
import React, { useEffect, useMemo, useRef } from "react";
import { cn } from "../utils";

interface SparklesProps {
  children?: React.ReactNode;
  className?: string;
  sparkleCount?: number;
  colors?: string[];
}

/**
 * Angka pseudo-acak deterministik dari seed — nilai sama di server & client,
 * jadi markup SSR identik dengan render pertama client (tidak ada hydration
 * mismatch) tanpa perlu menunggu useEffect.
 */
const seededValue = (seed: number, min: number, max: number) => {
  const hash = Math.sin(seed * 12.9898) * 43758.5453;
  const fraction = hash - Math.floor(hash);
  return min + fraction * (max - min);
};

const generateSparkle = (seed: number, colors: string[]) => ({
  id: seed,
  x: `${seededValue(seed, 5, 95).toFixed(2)}%`,
  y: `${seededValue(seed + 1, 5, 95).toFixed(2)}%`,
  size: Number(seededValue(seed + 2, 4, 9).toFixed(2)),
  color:
    colors[Math.floor(seededValue(seed + 3, 0, colors.length)) % colors.length],
  // durasi & delay sebagai CSS custom property agar tidak ada JS per frame
  duration: `${seededValue(seed + 4, 0.9, 1.6).toFixed(2)}s`,
  delay: `${seededValue(seed + 5, 0, 1).toFixed(2)}s`,
});

/**
 * Sparkles — animasi pure CSS (keyframes), bukan motion.js per span.
 * - Posisi/ukuran deterministik → SSR & client identik (tanpa hydration error)
 * - IntersectionObserver: animasi PAUSE saat tidak di viewport
 * - Zero JS per frame, zero rAF, zero motion dependency
 */
export const Sparkles = ({
  children,
  className,
  sparkleCount = 4,
  colors = ["#34d399", "#6ee7b7", "#a7f3d0"],
}: SparklesProps) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const sparkles = useMemo(
    () =>
      Array.from({ length: sparkleCount }, (_, index) =>
        generateSparkle(index + 1, colors),
      ),
    // colors: hanya re-generate saat sparkleCount berubah untuk stabilitas
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sparkleCount],
  );

  // Pause animasi saat off-screen menggunakan animation-play-state CSS
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const spans = el.querySelectorAll<HTMLSpanElement>(".sparkle-item");
    const observer = new IntersectionObserver(
      ([entry]) => {
        const state = entry?.isIntersecting ? "running" : "paused";
        spans.forEach((s) => (s.style.animationPlayState = state));
      },
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={containerRef} className={cn("relative inline-block", className)}>
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="sparkle-item pointer-events-none absolute"
          style={
            {
              left: s.x,
              top: s.y,
              "--sparkle-duration": s.duration,
              "--sparkle-delay": s.delay,
              animation: `sparkle-pulse var(--sparkle-duration) var(--sparkle-delay) infinite`,
            } as React.CSSProperties
          }
        >
          <svg
            width={s.size}
            height={s.size}
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
              fill={s.color}
            />
          </svg>
        </span>
      ))}
      {children}
    </span>
  );
};
