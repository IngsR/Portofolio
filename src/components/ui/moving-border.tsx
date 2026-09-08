"use client";
import { motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "./utils";

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
  const progressRef = useRef(0);
  const animRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const [borderPos, setBorderPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const animate = (time: number) => {
      if (!startTimeRef.current) startTimeRef.current = time;
      const elapsed = time - startTimeRef.current;
      progressRef.current = (elapsed % duration) / duration;

      if (pathRef.current) {
        const length = pathRef.current.getTotalLength?.() ?? 0;
        if (length) {
          const pt = pathRef.current.getPointAtLength(progressRef.current * length);
          setBorderPos({ x: pt.x, y: pt.y });
        }
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [duration]);

  return (
    <Component
      className={cn(
        "relative h-10 overflow-hidden rounded-full border border-transparent p-[1px] text-sm",
        containerClassName
      )}
      {...otherProps}
    >
      <div className="absolute inset-0" style={{ borderRadius: "inherit" }}>
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
        <div
          className="absolute"
          style={{
            left: `${borderPos.x}px`,
            top: `${borderPos.y}px`,
            transform: "translate(-50%,-50%)",
          }}
        >
          <motion.div
            className={cn(
              "h-10 w-10 rounded-full bg-[radial-gradient(circle_at_center,#64748b_0%,transparent_60%)] opacity-[0.8] dark:bg-[radial-gradient(circle_at_center,#e2e8f0_0%,transparent_60%)]",
              borderClassName
            )}
          />
        </div>
      </div>

      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 dark:border-white/10 dark:bg-slate-950 dark:text-white antialiased text-xs font-semibold",
          className
        )}
      >
        {children}
      </div>
    </Component>
  );
};
