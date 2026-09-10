"use client";
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { cn } from "../utils";

interface EncryptedTextProps {
  text: string;
  className?: string;
  duration?: number;
  chars?: string;
  revealDelay?: number;
}

const DEFAULT_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

export const EncryptedText = ({
  text,
  className,
  duration = 1200,
  chars = DEFAULT_CHARS,
  revealDelay = 30,
}: EncryptedTextProps) => {
  const [displayText, setDisplayText] = useState(
    text
      .split("")
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join(""),
  );
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const revealedChars: boolean[] = new Array(text.length).fill(false);
    let revealCount = 0;
    let shuffleInterval: ReturnType<typeof setInterval>;
    let revealInterval: ReturnType<typeof setInterval>;

    // Shuffle animation
    shuffleInterval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, i) => {
            if (revealedChars[i] || char === " ") return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join(""),
      );
    }, 50);

    // Reveal one char at a time
    revealInterval = setInterval(() => {
      if (revealCount >= text.length) {
        clearInterval(shuffleInterval);
        clearInterval(revealInterval);
        setIsRevealed(true);
        setDisplayText(text);
        return;
      }
      revealedChars[revealCount] = true;
      revealCount++;
    }, revealDelay);

    return () => {
      clearInterval(shuffleInterval);
      clearInterval(revealInterval);
    };
  }, [text, chars, revealDelay]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn("font-mono", className)}
    >
      {displayText}
    </motion.span>
  );
};
