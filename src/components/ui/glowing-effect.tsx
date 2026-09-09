"use client";
import { motion } from "motion/react";
import React, { useRef, useState } from "react";
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
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty("--x", `${x}px`);
    containerRef.current.style.setProperty("--y", `${y}px`);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", containerClassName)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!disabled && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] transition-opacity duration-500"
          animate={{
            opacity: isHovered ? 1 : 0,
            background: isHovered
              ? `radial-gradient(${spread}px circle at var(--x, 0px) var(--y, 0px), rgba(255,255,255,0.12), transparent 70%)`
              : "transparent",
          }}
          style={{
            filter: `blur(${blur}px)`,
          }}
          transition={{ duration: 0.3 }}
        />
      )}
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
