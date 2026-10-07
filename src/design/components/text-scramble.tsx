"use client";
import React, { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*";

interface TextScrambleProps {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
}

export const TextScramble: React.FC<TextScrambleProps> = ({
  text,
  className,
  duration = 2500,
  delay = 300,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Initial state before delay
    setDisplayText("");
    setIsDone(false);

    let startTimestamp: number | null = null;
    let frameId: number;
    let timeout: NodeJS.Timeout;

    timeout = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);

        // Linear progression
        const revealedCount = Math.floor(progress * text.length);

        let result = "";
        for (let i = 0; i < text.length; i++) {
          if (i < revealedCount) {
            result += text[i];
          } else if (text[i] === " " || text[i] === "\n") {
            result += text[i]; // keep spaces and line breaks intact
          } else {
            // Pick a random char for unrevealed positions
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }

        setDisplayText(result);

        if (progress < 1) {
          frameId = requestAnimationFrame(animate);
        } else {
          setDisplayText(text);
          setIsDone(true);
        }
      };

      frameId = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [text, duration, delay]);

  return (
    <span className={`relative inline-block w-full ${className || ""}`} style={{ whiteSpace: "pre-wrap" }}>
      <span className="invisible opacity-0 select-none pointer-events-none" aria-hidden="true">
        {text}
      </span>
      <span className="absolute inset-0 left-0 top-0 h-full w-full">
        {displayText}
        {!isDone && displayText.length > 0 && (
          <span className="opacity-50 animate-pulse inline-block w-[3px] h-[1em] bg-current align-text-bottom ml-1" />
        )}
      </span>
    </span>
  );
};
