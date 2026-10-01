import React, { memo } from "react";
import { cn } from "../utils";

interface MovingBorderProps {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
  as?: React.ElementType;
  [key: string]: unknown;
}

/**
 * MovingBorder — Kapsul dengan moving border beam berbasis CSS conic-gradient GPU.
 *
 * Menggantikan useAnimationFrame + getPointAtLength SVG loop yang membebani
 * CPU dan memicu jank / patah-patah di Firefox.
 * Berjalan murni di GPU compositor dengan 0% CPU footprint.
 */
export const MovingBorder = memo(function MovingBorder({
  children,
  duration = 3000,
  className,
  containerClassName,
  borderClassName,
  as: Component = "button",
  ...otherProps
}: MovingBorderProps) {
  return (
    <Component
      className={cn(
        "relative inline-flex p-[1px] overflow-hidden rounded-full cursor-pointer select-none group focus:outline-none",
        containerClassName,
      )}
      {...otherProps}
    >
      {/* Animated Conic Gradient Beam — murni GPU compositor tanpa JS animation loop */}
      <span
        className={cn(
          "absolute inset-[-1000%] animate-[spin_3s_linear_infinite] opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none",
          borderClassName,
        )}
        style={{
          animationDuration: `${duration}ms`,
          background:
            "conic-gradient(from 90deg at 50% 50%, #94a3b8 0%, #38bdf8 25%, #6366f1 50%, #a855f7 75%, #94a3b8 100%)",
        }}
        aria-hidden="true"
      />

      {/* Inner Capsule Body */}
      <span
        className={cn(
          "relative inline-flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-[#0c0c0e] text-slate-800 dark:text-slate-100 antialiased transition-colors group-hover:bg-slate-50 dark:group-hover:bg-[#141418]",
          className,
        )}
      >
        {children}
      </span>
    </Component>
  );
});
