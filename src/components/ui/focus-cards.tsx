"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "./utils";

interface FocusCardsProps<T> {
  cards: T[];
  renderCard: (card: T, focused: boolean) => React.ReactNode;
  className?: string;
}

export function FocusCards<T>({
  cards,
  renderCard,
  className,
}: FocusCardsProps<T>) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4",
        className,
      )}
    >
      {cards.map((card, i) => (
        <motion.div
          key={i}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          animate={{
            opacity: hovered !== null && hovered !== i ? 0.55 : 1,
            scale: hovered === i ? 1.01 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="cursor-pointer"
        >
          {renderCard(card, hovered === i)}
        </motion.div>
      ))}
    </div>
  );
}
