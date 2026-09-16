"use client";

import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../../design/utils";

export interface BackgroundBeamsWithCollisionProps {
  children?: React.ReactNode;
  className?: string;
}

// ─── Pure-CSS beam definitions ────────────────────────────────────────────────
// Each beam is rendered as a plain <div> animated entirely via CSS @keyframes.
// NO Framer Motion per beam → no JS animation loop, no WAAPI overhead per
// element.  Collision polling runs in ONE shared rAF loop instead of N separate
// setIntervals.
interface BeamDef {
  x: number;          // left position (px)
  height: number;     // beam length (px)
  width: number;      // beam width (px)
  duration: number;   // fall duration (s)
  delay: number;      // initial delay (s)
  minBreak?: string;  // Tailwind responsive hidden class (e.g. "sm" -> "hidden sm:block")
}

const BEAMS: BeamDef[] = [
  // ── Always visible ──────────────────────────────────────────────────────────
  { x: 24,   height: 96,  width: 2,   duration: 5.0, delay: 0.3 },
  { x: 120,  height: 120, width: 2,   duration: 6.5, delay: 1.8 },
  { x: 230,  height: 80,  width: 2,   duration: 4.5, delay: 3.2 },
  { x: 340,  height: 112, width: 3,   duration: 7.0, delay: 0.9 },
  // ── sm+ ─────────────────────────────────────────────────────────────────────
  { x: 460,  height: 96,  width: 2,   duration: 5.8, delay: 2.4,  minBreak: "sm" },
  { x: 580,  height: 128, width: 2,   duration: 6.2, delay: 0.6,  minBreak: "sm" },
  // ── md+ ─────────────────────────────────────────────────────────────────────
  { x: 700,  height: 96,  width: 2,   duration: 5.2, delay: 3.8,  minBreak: "md" },
  { x: 840,  height: 112, width: 3,   duration: 7.4, delay: 1.1,  minBreak: "md" },
  // ── lg+ ─────────────────────────────────────────────────────────────────────
  { x: 990,  height: 96,  width: 2,   duration: 4.8, delay: 2.0,  minBreak: "lg" },
  { x: 1140, height: 128, width: 2,   duration: 6.8, delay: 0.4,  minBreak: "lg" },
  { x: 1300, height: 96,  width: 2,   duration: 5.6, delay: 3.5,  minBreak: "lg" },
  // ── xl+ ─────────────────────────────────────────────────────────────────────
  { x: 1460, height: 112, width: 3,   duration: 7.0, delay: 1.7,  minBreak: "xl" },
  { x: 1640, height: 96,  width: 2,   duration: 5.0, delay: 2.9,  minBreak: "xl" },
  // ── 2xl+ ────────────────────────────────────────────────────────────────────
  { x: 1820, height: 128, width: 2,   duration: 6.4, delay: 0.8,  minBreak: "2xl" },
];

// Map breakpoint → Tailwind hidden class pair
const BREAK_CLASS: Record<string, string> = {
  sm:  "hidden sm:block",
  md:  "hidden md:block",
  lg:  "hidden lg:block",
  xl:  "hidden xl:block",
  "2xl": "hidden 2xl:block",
};

// ─── Explosion particle data (memoised once per component) ────────────────────
function makeParticles(n: number) {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    dx: Math.floor(Math.random() * 100 - 50),
    dy: Math.floor(Math.random() * -55 - 10),
    dur: parseFloat((Math.random() * 1.0 + 0.4).toFixed(2)),
  }));
}

// ─── Explosion (only shown on collision; kept lightweight) ────────────────────
const Explosion: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  style,
  className,
  ...props
}) => {
  // Memoised so particles don't re-randomise on every parent re-render.
  const particles = useMemo(() => makeParticles(12), []);

  return (
    <div
      {...props}
      style={style}
      className={cn("absolute pointer-events-none z-10 h-2 w-2", className)}
    >
      {/* Glow flash */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.4 }}
        animate={{ opacity: 1, scaleX: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute -inset-x-8 top-0 m-auto h-2.5 w-16 rounded-full
          bg-gradient-to-r from-transparent via-indigo-500/45 to-transparent
          dark:via-indigo-400/55 blur-sm pointer-events-none"
      />
      {/* Particles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{ x: p.dx, y: p.dy, opacity: 0 }}
          transition={{ duration: p.dur, ease: "easeOut" }}
          className="absolute h-1.5 w-1.5 rounded-full
            bg-gradient-to-b from-indigo-500 to-purple-500
            dark:from-indigo-400 dark:to-purple-400 pointer-events-none"
        />
      ))}
    </div>
  );
};

// ─── Beam (pure CSS animation) + single collision check via rAF ──────────────
interface BeamProps {
  beam: BeamDef;
  containerRef: React.RefObject<HTMLDivElement | null>;
  parentRef: React.RefObject<HTMLDivElement | null>;
}

const Beam: React.FC<BeamProps> = ({ beam, containerRef, parentRef }) => {
  const beamRef = useRef<HTMLDivElement>(null);
  const [explosion, setExplosion] = useState<{
    x: number;
    y: number;
    key: number;
  } | null>(null);
  const rafRef = useRef<number>(0);
  const cooldownRef = useRef(false);
  const cycleRef = useRef(0);

  useEffect(() => {
    let mounted = true;
    let lastCheck = 0;

    const tick = (ts: number) => {
      if (!mounted) return;

      // Throttle: check at most once every 100 ms (~10 fps) — cheap enough
      // for collision detection while beams animate at 60 fps via CSS.
      if (ts - lastCheck >= 100 && !cooldownRef.current) {
        lastCheck = ts;

        if (
          beamRef.current &&
          containerRef.current &&
          parentRef.current
        ) {
          const beamRect = beamRef.current.getBoundingClientRect();
          // Skip if hidden by responsive Tailwind class
          if (beamRect.width > 0) {
            const floorRect = containerRef.current.getBoundingClientRect();

            if (beamRect.bottom >= floorRect.top) {
              const parentRect = parentRef.current.getBoundingClientRect();
              cooldownRef.current = true;
              setExplosion({
                x: beamRect.left - parentRect.left + beamRect.width / 2,
                y: beamRect.bottom - parentRect.top,
                key: ++cycleRef.current,
              });

              setTimeout(() => {
                if (mounted) {
                  setExplosion(null);
                  cooldownRef.current = false;
                }
              }, 1800);
            }
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      mounted = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef, parentRef]);

  const breakClass = beam.minBreak ? BREAK_CLASS[beam.minBreak] : "";

  return (
    <>
      <div
        ref={beamRef}
        aria-hidden="true"
        className={cn("absolute top-0 rounded-full pointer-events-none", breakClass)}
        style={{
          left: beam.x,
          width: beam.width,
          height: beam.height,
          // Pure CSS animation — zero JS per-frame
          animation: `beamFall ${beam.duration}s linear ${beam.delay}s infinite`,
          // gradient + glow via inline style so no extra Tailwind classes compile
          background:
            "linear-gradient(to top, rgba(99,102,241,0.85), rgba(168,85,247,0.55), transparent)",
          boxShadow: "0 0 6px 1px rgba(99,102,241,0.35)",
          willChange: "transform",
          contain: "strict",
        }}
      />
      <AnimatePresence>
        {explosion && (
          <Explosion
            key={explosion.key}
            style={{
              left: explosion.x,
              top: explosion.y,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

// ─── Root component ───────────────────────────────────────────────────────────
export const BackgroundBeamsWithCollision: React.FC<
  BackgroundBeamsWithCollisionProps
> = ({ children, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={parentRef}
      aria-hidden="true"
      className={cn(
        "fixed inset-0 pointer-events-none z-0 overflow-hidden w-full h-full",
        className,
      )}
      // Isolate stacking context; prevent the fixed layer from affecting
      // parent compositing.
      style={{ contain: "strict" }}
    >
      {BEAMS.map((beam) => (
        <Beam
          key={beam.x}
          beam={beam}
          containerRef={containerRef}
          parentRef={parentRef}
        />
      ))}

      {children}

      {/* Invisible collision floor at the viewport bottom */}
      <div
        ref={containerRef}
        className="absolute bottom-0 inset-x-0 h-px pointer-events-none opacity-0"
      />
    </div>
  );
};

export default BackgroundBeamsWithCollision;
