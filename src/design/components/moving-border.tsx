"use client";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { canHover } from "../../utils/hover";
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

export const MovingBorder = ({
  children,
  duration = 2000,
  rx,
  ry,
  className,
  containerClassName,
  borderClassName,
  as: Component = "button",
  ...otherProps
}: MovingBorderProps) => {
  const pathRef = useRef<SVGRectElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Use a spring for smoother movement if needed, but here direct is fine
  const smoothX = useSpring(x, { damping: 20, stiffness: 300 });
  const smoothY = useSpring(y, { damping: 20, stiffness: 300 });

  // Animasi berjalan HANYA di perangkat ber-hover (mouse). Di layar sentuh
  // animasi ini memboroskan frame budget saat scroll, jadi cukup dimatikan —
  // tanpa animasi pun border tombol tetap tampil utuh seperti biasa.
  const [isVisible, setIsVisible] = useState(false);
  const hoverable = canHover();
  const isAnimating = isVisible && hoverable;
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!canHover()) return;
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => setIsVisible(entries[0]?.isIntersecting ?? false),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useAnimationFrame((time) => {
    if (!isAnimating) return;
    if (!pathRef.current) return;

    const length = pathRef.current.getTotalLength?.() ?? 0;
    if (length) {
      const progress = (time % duration) / duration;
      const pt = pathRef.current.getPointAtLength(progress * length);
      x.set(pt.x);
      y.set(pt.y);
    }
  });

  return (
    <Component
      ref={containerRef}
      className={cn(
        "relative h-10 overflow-hidden rounded-full border border-transparent p-[1px] text-sm",
        "cursor-pointer select-none",
        containerClassName,
      )}
      {...otherProps}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ borderRadius: "inherit" }}
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="absolute h-full w-full"
          width="100%"
          height="100%"
        >
          <rect
            fill="none"
            width="100%"
            height="100%"
            rx={rx}
            ry={ry}
            ref={pathRef as React.RefObject<SVGRectElement>}
          />
        </svg>
        <motion.div
          className="absolute"
          style={{
            x: smoothX,
            y: smoothY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          <motion.div
            className={cn(
              "h-10 w-10 rounded-full bg-[radial-gradient(circle_at_center,#64748b_0%,transparent_60%)] opacity-[0.8] dark:bg-[radial-gradient(circle_at_center,#e2e8f0_0%,transparent_60%)]",
              borderClassName,
            )}
          />
        </motion.div>
      </div>

      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 dark:border-white/10 dark:bg-slate-950 dark:text-white antialiased text-xs font-semibold",
          "cursor-pointer",
          className,
        )}
      >
        {children}
      </div>
    </Component>
  );
};
