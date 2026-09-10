"use client";
import React, { useEffect, useRef, useState } from "react";
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

/**
 * EncryptedText dioptimalkan:
 * - IntersectionObserver: animasi hanya mulai saat elemen masuk viewport
 * - Cleanup interval lebih ketat (tidak ada interval leak)
 * - Langsung tampilkan teks asli jika sudah pernah revealed (no repeated animation)
 */
export const EncryptedText = ({
  text,
  className,
  duration = 1200,
  chars = DEFAULT_CHARS,
  revealDelay = 30,
}: EncryptedTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const [revealed, setRevealed] = useState(false);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Jika sudah revealed sebelumnya, tampilkan teks langsung
    if (revealed) return;

    const el = spanRef.current;
    if (!el) return;

    let shuffleId: ReturnType<typeof setInterval> | null = null;
    let revealId: ReturnType<typeof setInterval> | null = null;

    const startAnimation = () => {
      const revealedChars: boolean[] = new Array(text.length).fill(false);
      let revealCount = 0;

      shuffleId = setInterval(() => {
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

      revealId = setInterval(() => {
        if (revealCount >= text.length) {
          if (shuffleId) clearInterval(shuffleId);
          if (revealId) clearInterval(revealId);
          setRevealed(true);
          setDisplayText(text);
          return;
        }
        revealedChars[revealCount] = true;
        revealCount++;
      }, revealDelay);
    };

    if (typeof IntersectionObserver === "undefined") {
      startAnimation();
      return () => {
        if (shuffleId) clearInterval(shuffleId);
        if (revealId) clearInterval(revealId);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          observer.disconnect();
          startAnimation();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (shuffleId) clearInterval(shuffleId);
      if (revealId) clearInterval(revealId);
    };
  }, [text, chars, revealDelay, revealed]);

  return (
    <span
      ref={spanRef}
      className={cn("font-mono", className)}
      style={{ opacity: 1 }}
    >
      {displayText}
    </span>
  );
};
