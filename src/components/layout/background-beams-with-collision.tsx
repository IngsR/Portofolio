"use client";

import React, { useMemo } from "react";
import { cn } from "../../design/utils";

export interface BackgroundBeamsWithCollisionProps {
  children?: React.ReactNode;
  className?: string;
}

interface OmitCollision {
  x: number;
  height: number;
  width: number;
  duration: number;
  delay: number;
  minBreak?: string;
}

const BEAMS: OmitCollision[] = [
  { x: 24, height: 96, width: 2, duration: 5.0, delay: 0.3 },
  { x: 120, height: 120, width: 2, duration: 6.5, delay: 1.8 },
  { x: 230, height: 80, width: 2, duration: 4.5, delay: 3.2 },
  { x: 340, height: 112, width: 3, duration: 7.0, delay: 0.9 },
  { x: 460, height: 96, width: 2, duration: 5.8, delay: 2.4, minBreak: "sm" },
  { x: 580, height: 128, width: 2, duration: 6.2, delay: 0.6, minBreak: "sm" },
  { x: 700, height: 96, width: 2, duration: 5.2, delay: 3.8, minBreak: "md" },
  { x: 840, height: 112, width: 3, duration: 7.4, delay: 1.1, minBreak: "md" },
  { x: 990, height: 96, width: 2, duration: 4.8, delay: 2.0, minBreak: "lg" },
  { x: 1140, height: 128, width: 2, duration: 6.8, delay: 0.4, minBreak: "lg" },
  { x: 1300, height: 96, width: 2, duration: 5.6, delay: 3.5, minBreak: "lg" },
  { x: 1460, height: 112, width: 3, duration: 7.0, delay: 1.7, minBreak: "xl" },
  { x: 1640, height: 96, width: 2, duration: 5.0, delay: 2.9, minBreak: "xl" },
  { x: 1820, height: 128, width: 2, duration: 6.4, delay: 0.8, minBreak: "2xl" },
];

const BREAK_CLASS: Record<string, string> = {
  sm: "hidden sm:block",
  md: "hidden md:block",
  lg: "hidden lg:block",
  xl: "hidden xl:block",
  "2xl": "hidden 2xl:block",
};

const Beam: React.FC<{ beam: OmitCollision }> = React.memo(({ beam }) => {
  const breakClass = beam.minBreak ? BREAK_CLASS[beam.minBreak] : "";

  return (
    <div
      aria-hidden="true"
      className={cn("absolute top-0 rounded-full pointer-events-none", breakClass)}
      style={{
        left: beam.x,
        width: beam.width,
        height: beam.height,
        animation: `beamFall ${beam.duration}s linear ${beam.delay}s infinite`,
        background: "linear-gradient(to top, rgba(99,102,241,0.85), rgba(168,85,247,0.55), transparent)",
        boxShadow: "0 0 6px 1px rgba(99,102,241,0.35)",
        willChange: "transform",
        contain: "strict",
      }}
    />
  );
});

export const BackgroundBeamsWithCollision: React.FC<BackgroundBeamsWithCollisionProps> = ({
  children,
  className,
}) => {
  return (
    <div
      aria-hidden="true"
      className={cn("fixed inset-0 pointer-events-none z-0 overflow-hidden w-full h-full", className)}
      style={{ contain: "strict" }}
    >
      {BEAMS.map((beam, i) => (
        <Beam key={i} beam={beam} />
      ))}
      {children}
    </div>
  );
};

export default BackgroundBeamsWithCollision;
