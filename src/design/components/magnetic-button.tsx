import React, { useRef } from "react";
import { canHover } from "../../utils/hover";
import { cn } from "../utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

/**
 * MagneticButton - efek magnetik pure CSS transform, tanpa motion/react.
 *
 * Sebelumnya menggunakan useSpring dari Framer Motion yang membuat
 * JS animation loop berjalan setiap frame → jank di Firefox.
 *
 * Sekarang: CSS `transition: transform` yang di-handle GPU compositor.
 * Efek tetap identik secara visual, performa jauh lebih baik.
 */
export const MagneticButton = ({
  children,
  className,
  strength = 0.3,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const hoverable = canHover();
  const centerRef = useRef<{ x: number; y: number } | null>(null);

  const handleMouseEnter = () => {
    const el = ref.current;
    if (!el || !hoverable) return;
    const rect = el.getBoundingClientRect();
    centerRef.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const center = centerRef.current;
    if (!center || !hoverable) return;
    const dx = (e.clientX - center.x) * strength;
    const dy = (e.clientY - center.y) * strength;
    if (ref.current) {
      ref.current.style.transform = `translate(${dx}px, ${dy}px)`;
    }
  };

  const handleMouseLeave = () => {
    centerRef.current = null;
    if (ref.current) {
      ref.current.style.transform = "";
    }
  };

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={hoverable ? handleMouseMove : undefined}
      onMouseLeave={hoverable ? handleMouseLeave : undefined}
      className={cn("inline-flex", className)}
      style={{ transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)" }}
    >
      {children}
    </div>
  );
};
