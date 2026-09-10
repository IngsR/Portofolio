"use client";
import React, { useCallback, useRef } from "react";
import { cn } from "../utils";

interface CardSpotlightProps {
  children: React.ReactNode;
  className?: string;
  radius?: number;
  color?: string;
  tilt?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

/**
 * CardSpotlight yang dioptimalkan untuk scroll 60fps:
 * - getBoundingClientRect() hanya dipanggil SEKALI per hover (di mouseenter),
 *   bukan di setiap mousemove → tidak ada layout thrash beruntun.
 * - Semua penulisan CSS variable di-batch lewat requestAnimationFrame,
 *   maksimal 1x per frame walau mousemove terjadi jauh lebih sering.
 * - "will-change-transform" dihilangkan dari default: puluhan card dengan
 *   layer komposit permanen justru memakan memori GPU & memicu frame drop.
 */
export const CardSpotlight = ({
  children,
  className,
  radius = 320,
  color,
  tilt = true,
  onClick,
}: CardSpotlightProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
  const rafRef = useRef<number | null>(null);
  const coordsRef = useRef({ x: 0, y: 0 });

  // Tulis CSS variables maksimal 1x per frame (rAF batching)
  const flush = useCallback(() => {
    rafRef.current = null;
    const el = divRef.current;
    if (!el) return;
    const { x, y } = coordsRef.current;
    el.style.setProperty("--x", `${x}px`);
    el.style.setProperty("--y", `${y}px`);

    if (tilt) {
      const rect = rectRef.current;
      if (rect && rect.width > 0 && rect.height > 0) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4; // subtle max 4 deg
        const rotateY = ((x - centerX) / centerX) * 4;
        el.style.setProperty("--rotate-x", `${rotateX}deg`);
        el.style.setProperty("--rotate-y", `${rotateY}deg`);
      }
    }
  }, [tilt]);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Cache posisi card SEKALI saat masuk hover (satu-satunya layout read)
    rectRef.current = null;
    const el = divRef.current;
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
    el?.style.setProperty("--opacity", "1");
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(flush);
    }
  }, [flush]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = rectRef.current;
    if (!rect) return;
    coordsRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(flush);
    }
  }, [flush]);

  const handleMouseLeave = useCallback(() => {
    // Batalkan frame yang masih pending saat keluar hover
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    const el = divRef.current;
    if (!el) return;
    el.style.setProperty("--opacity", "0");
    if (tilt) {
      el.style.setProperty("--rotate-x", "0deg");
      el.style.setProperty("--rotate-y", "0deg");
    }
  }, [tilt]);

  return (
    <div
      style={{
        perspective: "1000px",
      }}
      className="relative"
    >
      <div
        ref={divRef}
        style={{
          transform: tilt
            ? "rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg))"
            : undefined,
          transition: "transform 0.15s ease-out, box-shadow 0.3s ease, border-color 0.3s ease",
        } as React.CSSProperties}
        className={cn(
          "relative overflow-hidden rounded-2xl border",
          "border-slate-200/90 dark:border-white/10",
          "bg-white dark:bg-[#0c0c0d]",
          "shadow-[0_2px_8px_-2px_rgba(15,23,42,0.05),0_10px_25px_-5px_rgba(15,23,42,0.05)]",
          "dark:shadow-none",
          "hover:shadow-[0_16px_36px_-6px_rgba(37,99,235,0.12),0_4px_12px_rgba(15,23,42,0.04)]",
          "hover:border-blue-500/40 dark:hover:border-white/30",
          className,
        )}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        {/* Dynamic Spotlight: Luminous blue-slate in light, white in dark */}
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 rounded-[inherit]"
          style={{
            opacity: "var(--opacity, 0)",
            background: color
              ? `radial-gradient(${radius}px circle at var(--x, 0px) var(--y, 0px), ${color}, transparent 70%)`
              : `radial-gradient(${radius}px circle at var(--x, 0px) var(--y, 0px), var(--spotlight-color, rgba(59, 130, 246, 0.09)), transparent 70%)`,
          } as React.CSSProperties}
        />
        <div className="relative z-10 h-full w-full">{children}</div>
      </div>
    </div>
  );
};
