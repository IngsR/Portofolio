"use client";
import { motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "./utils";

interface GlowingEffectProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  glowClassName?: string;
  disabled?: boolean;
  blur?: number;
  spread?: number;
}

export const GlowingEffect = ({
  children,
  className,
  containerClassName,
  disabled = false,
  blur = 20,
  spread = 80,
}: GlowingEffectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (disabled) return;
    const el = containerRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseenter", () => setIsHovered(true));
    el.addEventListener("mouseleave", () => setIsHovered(false));
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, [disabled]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", containerClassName)}
    >
      {!disabled && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] transition-opacity duration-500"
          style={{
            background: isHovered
              ? `radial-gradient(${spread}px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.12), transparent 70%)`
              : "transparent",
            filter: `blur(${blur}px)`,
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
