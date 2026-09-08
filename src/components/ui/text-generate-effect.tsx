"use client";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "./utils";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
  wordClassName?: string;
  duration?: number;
  delay?: number;
  filter?: boolean;
}

export const TextGenerateEffect = ({
  words,
  className,
  wordClassName,
  duration = 0.5,
  delay = 0.08,
  filter = true,
}: TextGenerateEffectProps) => {
  const [scope, setScope] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setScope(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const wordsArray = words.split(" ");

  return (
    <div ref={ref} className={cn("font-normal", className)}>
      <div className="leading-relaxed tracking-wide">
        {wordsArray.map((word, i) => (
          <motion.span
            key={word + i}
            initial={{ opacity: 0, filter: filter ? "blur(8px)" : "none" }}
            animate={scope ? { opacity: 1, filter: "blur(0px)" } : {}}
            transition={{ duration, delay: i * delay }}
            className={cn("inline-block mr-1", wordClassName)}
          >
            {word}
          </motion.span>
        ))}
      </div>
    </div>
  );
};
