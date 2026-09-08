"use client";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { cn } from "./utils";

interface TooltipItem {
  id: number | string;
  name: string;
  designation?: string;
  image?: string;
}

interface AnimatedTooltipProps {
  items: TooltipItem[];
  className?: string;
}

export const AnimatedTooltip = ({ items, className }: AnimatedTooltipProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | string | null>(null);

  return (
    <div className={cn("flex flex-row items-center gap-2 flex-wrap", className)}>
      {items.map((item) => (
        <div
          key={item.id}
          className="relative group"
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence mode="popLayout">
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: -4,
                  scale: 1,
                  transition: { type: "spring", stiffness: 260, damping: 10 },
                }}
                exit={{ opacity: 0, y: 2, scale: 0.6 }}
                className="absolute -top-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center justify-center rounded-md bg-slate-950 dark:bg-white px-2.5 py-1 text-xs shadow-xl"
              >
                <div className="relative z-30 whitespace-nowrap text-[10px] font-semibold text-white dark:text-slate-950">
                  {item.name}
                </div>
                {item.designation && (
                  <div className="text-[9px] text-slate-300 dark:text-slate-600">
                    {item.designation}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative inline-flex items-center justify-center rounded-full px-2.5 py-1 text-[10px] font-semibold bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-slate-700 dark:text-slate-300 cursor-default transition-colors hover:border-slate-400 dark:hover:border-white/25">
            {item.image && (
              <img src={item.image} alt={item.name} className="w-3 h-3 mr-1 rounded-full object-cover" />
            )}
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );
};
