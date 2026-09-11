"use client";
import { motion, useMotionValue, useSpring } from "motion/react";
import React, { useRef } from "react";
import { cn } from "../utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export const MagneticButton = ({
  children,
  className,
  strength = 0.3,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  // Cache pusat tombol: diukur SEKALI saat mouseenter, bukan tiap mousemove.
  // getBoundingClientRect() per mousemove memaksa synchronous layout (thrash)
  // — sumber jank klasik pada tombol magnetik.
  const centerRef = useRef<{ x: number; y: number } | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseEnter = () => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    centerRef.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const center = centerRef.current;
    if (!center) return;
    x.set((e.clientX - center.x) * strength);
    y.set((e.clientY - center.y) * strength);
  };

  const handleMouseLeave = () => {
    centerRef.current = null;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.div>
  );
};
