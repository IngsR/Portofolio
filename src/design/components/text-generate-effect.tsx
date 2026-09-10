"use client";
import { useEffect, useRef } from "react";
import { cn } from "../utils";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
  wordClassName?: string;
  duration?: number;
  delay?: number;
  filter?: boolean;
}

/**
 * TextGenerateEffect dioptimalkan — pure CSS animation, bukan motion.span per kata.
 * - Tidak ada JS per frame sama sekali
 * - IntersectionObserver: animasi dimulai hanya saat masuk viewport
 * - CSS custom property --delay per kata, satu @keyframes untuk semua
 * - Filter blur juga dihandle CSS (compositor layer, bukan layout)
 */
export const TextGenerateEffect = ({
  words,
  className,
  wordClassName,
  duration = 0.4,
  delay = 0.05,
  filter = true,
}: TextGenerateEffectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsArray = words.split(" ");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // Semua span mulai invisible
    const spans = el.querySelectorAll<HTMLSpanElement>(".tge-word");
    if (typeof IntersectionObserver === "undefined") {
      spans.forEach((s) => s.classList.add("tge-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          spans.forEach((s) => s.classList.add("tge-visible"));
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={cn("font-normal", className)}>
      <div className="leading-relaxed tracking-wide">
        {wordsArray.map((word, i) => (
          <span
            key={word + i}
            className={cn("tge-word inline-block mr-1", wordClassName)}
            style={
              {
                "--tge-duration": `${duration}s`,
                "--tge-delay": `${(i * delay).toFixed(3)}s`,
                "--tge-filter": filter ? "blur(6px)" : "none",
              } as React.CSSProperties
            }
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};
