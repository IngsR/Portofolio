"use client";
import React, { useCallback, useRef } from "react";
import { cn } from "../utils";

interface GlowingEffectProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  glowClassName?: string;
  disabled?: boolean;
  blur?: number;
  spread?: number;
}

/**
 * GlowingEffect dioptimalkan — zero React re-render saat hover:
 * - Tidak pakai useState/setState sama sekali
 * - getBoundingClientRect() diukur SEKALI saat mouseenter (bukan tiap
 *   mousemove) → menghilangkan layout thrash / forced reflow
 * - rAF batching: DOM update maks 1x per frame walau mousemove terjadi lebih sering
 * - Update lewat CSS custom property (--gx/--gy), bukan rebuild string background
 * - CSS transition menangani fade in/out, bukan JS/motion
 */
export const GlowingEffect = ({
  children,
  className,
  containerClassName,
  disabled = false,
  blur = 20,
  spread = 80,
}: GlowingEffectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const coordsRef = useRef({ x: 0, y: 0 });
  // Cache rect: diukur SEKALI saat mouseenter, bukan tiap mousemove.
  // getBoundingClientRect() per mousemove = forced synchronous layout
  // (layout thrash) dan inilah penyebab utama scroll terasa berat di hero.
  const rectRef = useRef<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  const flush = useCallback(() => {
    rafRef.current = null;
    const glow = glowRef.current;
    if (!glow) return;
    const { x, y } = coordsRef.current;
    // Pakai CSS custom property (bukan string background panjang) agar browser
    // hanya invalidate paint layer, tanpa re-parse style string tiap frame.
    glow.style.setProperty("--gx", `${x}px`);
    glow.style.setProperty("--gy", `${y}px`);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      const rect = rectRef.current;
      if (!rect) return;
      coordsRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(flush);
      }
    },
    [disabled, flush],
  );

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      // Ukur posisi container sekali saja di sini (satu-satunya layout read).
      const el = containerRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        rectRef.current = {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
        };
        coordsRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      }
      const glow = glowRef.current;
      if (glow) {
        glow.style.opacity = "1";
        if (rafRef.current === null) {
          rafRef.current = requestAnimationFrame(flush);
        }
      }
    },
    [disabled, flush],
  );

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    rectRef.current = null;
    const glow = glowRef.current;
    if (glow) glow.style.opacity = "0";
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", containerClassName)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!disabled && (
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
          style={{
            opacity: 0,
            filter: `blur(${blur}px)`,
            transition: "opacity 0.3s ease",
            background: `radial-gradient(${spread}px circle at var(--gx, 0px) var(--gy, 0px), rgba(255,255,255,0.12), transparent 70%)`,
          }}
        />
      )}
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
