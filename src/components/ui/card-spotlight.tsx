"use client";
import React, { useRef, useState } from "react";
import { cn } from "./utils";

interface CardSpotlightProps {
  children: React.ReactNode;
  className?: string;
  radius?: number;
  color?: string;
  tilt?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const CardSpotlight = ({
  children,
  className,
  radius = 320,
  color,
  tilt = true,
  onClick,
}: CardSpotlightProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [tiltStyle, setTiltStyle] = useState({ rotateX: 0, rotateY: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });

    if (tilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4; // subtle max 4 deg
      const rotateY = ((x - centerX) / centerX) * 4;
      setTiltStyle({ rotateX, rotateY });
    }
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    if (tilt) {
      setTiltStyle({ rotateX: 0, rotateY: 0 });
    }
  };

  return (
    <div
      style={{
        perspective: 1000,
      }}
      className="relative"
    >
      <div
        ref={divRef}
        style={{
          transform: tilt
            ? `rotateX(${tiltStyle.rotateX}deg) rotateY(${tiltStyle.rotateY}deg)`
            : undefined,
          transition: opacity === 0 ? "transform 0.5s ease-out" : "transform 0.1s ease-out",
        }}
        className={cn(
          "relative overflow-hidden rounded-2xl border transition-all duration-300 will-change-transform",
          "border-slate-200/90 dark:border-white/10",
          "bg-white dark:bg-[#0c0c0d]",
          "shadow-[0_2px_8px_-2px_rgba(15,23,42,0.05),0_10px_25px_-5px_rgba(15,23,42,0.05)]",
          "dark:shadow-none",
          "hover:shadow-[0_16px_36px_-6px_rgba(37,99,235,0.12),0_4px_12px_rgba(15,23,42,0.04)]",
          "hover:border-blue-500/40 dark:hover:border-white/30",
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setOpacity(1)}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        {/* Dynamic Spotlight: Luminous blue-slate in light, white in dark */}
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 rounded-[inherit]"
          style={{
            opacity,
            background: color
              ? `radial-gradient(${radius}px circle at ${position.x}px ${position.y}px, ${color}, transparent 70%)`
              : `radial-gradient(${radius}px circle at ${position.x}px ${position.y}px, var(--spotlight-color, rgba(59, 130, 246, 0.09)), transparent 70%)`,
          }}
        />
        <div className="relative z-10 h-full w-full">{children}</div>
      </div>
    </div>
  );
};
