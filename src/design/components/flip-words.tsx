"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "../utils";

interface FlipWordsProps {
  words: string[];
  duration?: number;
  className?: string;
}

/**
 * FlipWords — pergantian kata dengan animasi flip.
 *
 * Dioptimalkan (KISS):
 * - Satu kata aktif dalam DOM (bukan dua versi yang saling tumpang tindih
 *   saat exit) → beban paint/GPU saat animasi jauh lebih ringan.
 * - Efek flip ditulis lewat CSS class (keyframes di global.css), bukan
 *   motion.js; tidak ada spring yang dihitung per frame.
 * - Reflow pemilihan kata dibaca dari ref saat pergantian, bukan lewat
 *   dependency state.
 */
export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: FlipWordsProps) => {
  const [index, setIndex] = useState(0);
  const wordsRef = useRef(words);
  wordsRef.current = words;

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % wordsRef.current.length);
    }, duration);
    return () => clearInterval(id);
  }, [duration]);

  const currentWord = words[index] ?? words[0] ?? "";

  if (!currentWord) return null;

  return (
    <div className="relative inline-flex items-center">
      <div
        key={index}
        className={cn(
          "flip-word z-10 inline-block text-left whitespace-nowrap",
          className,
        )}
      >
        {currentWord}
      </div>
    </div>
  );
};
