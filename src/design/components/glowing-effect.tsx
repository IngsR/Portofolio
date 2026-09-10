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
 * - Semua perubahan visual ditulis langsung ke CSS custom property via ref
 * - rAF batching: DOM update maks 1x per frame walau mousemove terjadi lebih sering
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

  const flush = useCallback(() => {
    rafRef.current = null;
    const glow = glowRef.current;
    if (!glow) return;
    const { x, y } = coordsRef.current;
    glow.style.background = `radial-gradient(${spread}px circle at ${x}px ${y}px, rgba(255,255,255,0.12), transparent 70%)`;
  }, [spread]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      coordsRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(flush);
      }
    },
    [disabled, flush],
  );

  const handleMouseEnter = useCallback(() => {
    if (disabled) return;
    const glow = glowRef.current;
    if (glow) glow.style.opacity = "1";
  }, [disabled]);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
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
          }}
        />
      )}
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
