"use client";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "./utils";

interface FlipWordsProps {
  words: string[];
  duration?: number;
  className?: string;
}

export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: FlipWordsProps) => {
  const [currentWord, setCurrentWord] = useState(words[0] ?? "");
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    const next = words[words.indexOf(currentWord) + 1] ?? words[0] ?? "";
    setCurrentWord(next);
    setIsAnimating(true);
  };

  useEffect(() => {
    if (!isAnimating) {
      const timer = setTimeout(startAnimation, duration);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, currentWord, duration]);

  return (
    <div className="relative inline-flex items-center">
      <AnimatePresence
        onExitComplete={() => setIsAnimating(false)}
        mode="popLayout"
      >
        <motion.div
          key={currentWord}
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{
            opacity: 0,
            y: -10,
            filter: "blur(4px)",
          }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 14,
          }}
          className={cn("z-10 inline-block text-left", className)}
        >
          {currentWord.split(" ").map((w, wi) => (
            <motion.span
              key={w + wi}
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: wi * 0.08, duration: 0.22 }}
              className="inline-block whitespace-nowrap mr-1.5"
            >
              {w}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
