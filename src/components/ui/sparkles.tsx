"use client";
import { motion } from "motion/react";
import React from "react";
import { cn } from "./utils";

interface SparklesProps {
  children?: React.ReactNode;
  className?: string;
  sparkleCount?: number;
  minSize?: number;
  maxSize?: number;
  colors?: string[];
}

const random = (min: number, max: number) => Math.random() * (max - min) + min;

const generateSparkle = (colors: string[]) => ({
  id: Math.random(),
  x: `${random(0, 100)}%`,
  y: `${random(0, 100)}%`,
  size: random(4, 10),
  color: colors[Math.floor(Math.random() * colors.length)],
  delay: random(0, 1),
  duration: random(0.8, 1.6),
});

export const Sparkles = ({
  children,
  className,
  sparkleCount = 6,
  minSize = 3,
  maxSize = 8,
  colors = ["#34d399", "#6ee7b7", "#a7f3d0"],
}: SparklesProps) => {
  const sparkles = Array.from({ length: sparkleCount }, () =>
    generateSparkle(colors),
  );

  return (
    <span className={cn("relative inline-block", className)}>
      {sparkles.map((s) => (
        <motion.span
          key={s.id}
          className="pointer-events-none absolute"
          style={{ left: s.x, top: s.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: random(1, 3),
          }}
        >
          <svg
            width={s.size}
            height={s.size}
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
              fill={s.color}
            />
          </svg>
        </motion.span>
      ))}
      {children}
    </span>
  );
};
