"use client";
import { motion } from "motion/react";
import React, { memo } from "react";

/**
 * CinematicViewportFx
 *
 * Efek visual & motion terinspirasi dari ahli video editing & sinematografi profesional:
 * 1. Anamorphic Lens Flare SVG: streak horizontal cahaya prisma khas lensa film Panavision / ARRI
 * 2. Viewfinder Reticles & HUD: sudut framing kamera sinema (┌ ┐ └ ┘) dengan status REC & 24 FPS
 * 3. Color Grade Atmospheric Aura: pencahayaan lembut yang nyaman di mata ("nyaman di mata")
 * 4. 100% GPU-accelerated: bebas frame-drop di mobile dengan komputasi transform native
 */
export const CinematicViewportFx = memo(function CinematicViewportFx() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl select-none"
      aria-hidden="true"
    >
      {/* 1. Anamorphic Lens Flare Beam (Horizontal Prism Light Streak) */}
      <motion.div
        animate={{
          x: ["-15%", "15%", "-15%"],
          opacity: [0.45, 0.75, 0.45],
          scaleY: [0.9, 1.15, 0.9],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-10 sm:-top-8 left-1/2 -translate-x-1/2 w-[160%] sm:w-[130%] h-32 sm:h-40"
      >
        <svg
          viewBox="0 0 1200 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full preserve-3d"
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
              <stop offset="25%" stopColor="#6366f1" stopOpacity="0.15" />
              <stop offset="45%" stopColor="#38bdf8" stopOpacity="0.55" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="55%" stopColor="#38bdf8" stopOpacity="0.55" />
              <stop offset="75%" stopColor="#a855f7" stopOpacity="0.15" />
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
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="20%" stopColor="#38bdf8" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#6366f1" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Diffused Lens Flare Ribbon */}
          <path
            d="M0 80 Q 600 55 1200 80 Q 600 105 0 80 Z"
            fill="url(#anamorphic-streak)"
            className="dark:opacity-40 opacity-25 mix-blend-screen"
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
            className="dark:opacity-75 opacity-40 mix-blend-screen"
          />

          {/* Central Lens Iris Flare Core */}
          <ellipse
            cx="600"
            cy="80"
            rx="90"
            ry="24"
            fill="url(#prism-core)"
            className="dark:opacity-50 opacity-30 mix-blend-screen"
          />
        </svg>
      </motion.div>

      {/* 2. Director Viewfinder HUD Reticles (Sudut Kamera Sinema ┌ ┐ └ ┘) */}
      <div className="absolute inset-0 p-3 sm:p-5 flex flex-col justify-between">
        {/* Top Viewfinder Bar */}
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
            <span className="hidden sm:inline font-mono text-[9px] font-semibold tracking-widest text-slate-500/70 dark:text-white/40 uppercase">
              CAM 01 • 2.39:1
            </span>
          </div>

          {/* Center Aspect Ratio Framing Cue */}
          <div className="hidden md:flex items-center gap-3">
            <span className="w-6 h-[1px] bg-slate-300/60 dark:bg-white/15" />
            <span className="font-mono text-[9px] tracking-wider text-slate-400 dark:text-white/30 uppercase">
              CINEMATIC MASTER
            </span>
            <span className="w-6 h-[1px] bg-slate-300/60 dark:bg-white/15" />
          </div>

          {/* Top-Right Corner: ┐ with Filmic REC Indicator */}
          <div className="flex items-start gap-2">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-900/5 dark:bg-white/5 border border-slate-200/50 dark:border-white/10">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-600" />
              </span>
              <span className="font-mono text-[9px] font-bold tracking-wider text-rose-600 dark:text-rose-400">
                REC 24.00 FPS
              </span>
            </div>
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

        {/* Bottom Viewfinder Bar */}
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
            <span className="hidden sm:inline font-mono text-[8.5px] font-semibold tracking-wider text-slate-500/70 dark:text-white/40">
              ARRI LOG-C • RAW
            </span>
          </div>

          {/* Center Crosshair Tick */}
          <div className="hidden sm:flex items-center gap-1 text-slate-300 dark:text-white/20">
            <span className="font-mono text-[10px] select-none">+</span>
          </div>

          {/* Bottom-Right Corner: ┘ */}
          <div className="flex items-end gap-1.5">
            <span className="hidden sm:inline font-mono text-[8.5px] font-semibold tracking-wider text-slate-500/70 dark:text-white/40">
              SHUTTER 180° • 50MM T1.3
            </span>
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

      {/* 3. Subtle Film Grain / Atmospheric Depth Wash */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-indigo-500/[0.02] dark:to-indigo-500/[0.04] pointer-events-none" />
    </div>
  );
});
