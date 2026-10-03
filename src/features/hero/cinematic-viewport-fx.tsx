"use client";
import { memo } from "react";

/**
 * CinematicViewportFx
 *
 * Lapisan dekoratif ringan: sudut bingkai + lens flare halus.
 * Animasi pure CSS agar berjalan di compositor GPU tanpa frame drop.
 */
export const CinematicViewportFx = memo(function CinematicViewportFx() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl select-none"
      aria-hidden="true"
    >
      {/* 1. Anamorphic Lens Flare Beam — pure CSS animation, no motion/react */}
      <div className="cinematic-flare-beam absolute -top-10 sm:-top-8 left-1/2 -translate-x-1/2 w-[160%] sm:w-[130%] h-32 sm:h-40">
        <svg
          viewBox="0 0 1200 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            {/* Anamorphic Blue Streak Gradient */}
            <linearGradient
              id="anamorphic-streak"
              x1="0%"
              y1="50%"
              x2="100%"
              y2="50%"
            >
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
              <stop offset="25%" stopColor="#6366f1" stopOpacity="0.12" />
              <stop offset="45%" stopColor="#38bdf8" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.7" />
              <stop offset="55%" stopColor="#38bdf8" stopOpacity="0.45" />
              <stop offset="75%" stopColor="#a855f7" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>

            {/* Core Prism Glow */}
            <radialGradient
              id="prism-core"
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%"
            >
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
              <stop offset="20%" stopColor="#38bdf8" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#6366f1" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Diffused Lens Flare Ribbon — opacity dikurangi, tanpa mix-blend-mode */}
          <path
            d="M0 80 Q 600 55 1200 80 Q 600 105 0 80 Z"
            fill="url(#anamorphic-streak)"
            className="dark:opacity-35 opacity-20"
          />

          {/* Ultra Thin Sharp Anamorphic Streak Line */}
          <line
            x1="50"
            y1="80"
            x2="1150"
            y2="80"
            stroke="url(#anamorphic-streak)"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="dark:opacity-60 opacity-35"
          />

          {/* Central Lens Iris Flare Core */}
          <ellipse
            cx="600"
            cy="80"
            rx="90"
            ry="24"
            fill="url(#prism-core)"
            className="dark:opacity-40 opacity-25"
          />
        </svg>
      </div>

      {/* 2. Sudut bingkai ┌ ┐ └ ┘ */}
      <div className="absolute inset-0 p-3 sm:p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          {/* Top-Left Corner: ┌ */}
          <div className="flex items-start gap-1.5">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className="text-slate-400/60 dark:text-white/30"
            >
              <path
                d="M1 17V1H17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Top-Right Corner: ┐ */}
          <div className="flex items-start gap-2">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className="text-slate-400/60 dark:text-white/30"
            >
              <path
                d="M17 17V1H1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <div className="flex items-end justify-between">
          {/* Bottom-Left Corner: └ */}
          <div className="flex items-end gap-1.5">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className="text-slate-400/60 dark:text-white/30"
            >
              <path
                d="M1 1V17H17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Bottom-Right Corner: ┘ */}
          <div className="flex items-end gap-1.5">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className="text-slate-400/60 dark:text-white/30"
            >
              <path
                d="M17 1V17H1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 3. Wash gradient tipis untuk kedalaman atmosfer */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-indigo-500/[0.02] dark:to-indigo-500/[0.04] pointer-events-none" />
    </div>
  );
});
