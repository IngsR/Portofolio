import type { HeroSectionId, HeroSummaryCard, HeroSummaryTextClasses } from "./types";

/**
 * hero.data.ts — UI config saja.
 *
 * Konten teks profil (bio, roles, availability) diambil langsung dari
 * `data/portfolio.json` di masing-masing section yang membutuhkannya.
 * File ini hanya menyimpan konstanta yang sifatnya tampilan/layout:
 * toggle section, palet warna, kelas CSS.
 */

/** Toggle show/hide tiap section Beranda tanpa menghapus kodenya. */
export const HERO_SECTION_VISIBILITY: Record<HeroSectionId, boolean> = {
  intro: true,
  education: true,
  projects: true,
  about: true,
  certifications: true,
  skills: true,
  contact: true,
};

export const isHeroSectionVisible = (section: HeroSectionId) =>
  HERO_SECTION_VISIBILITY[section] !== false;

/**
 * Kartu ringkasan fokus teknis di section "Tentang Saya".
 * Ini UI config (label + subtitle tetap), bukan data profil dari JSON.
 */
export const HERO_SUMMARY_CARDS: HeroSummaryCard[] = [
  { title: "Next.js", subtitle: "App Router, SSR, SSG, Server Actions" },
  { title: "React & TypeScript", subtitle: "Komponen, hooks, type-safe" },
  { title: "REST API & Database", subtitle: "Route Handlers, Zod, Prisma" },
  { title: "Git & Deployment", subtitle: "Branch, PR, Vercel, CI/CD" },
];

/**
 * iconName (dari JSON) → kelas warna ikon di kartu Keahlian.
 * Ikonnya sendiri dirender oleh SkillCard — file ini bebas JSX.
 */
export const SKILL_CATEGORY_ICONS: Record<string, string> = {
  Layout: "text-sky-600 dark:text-sky-400",
  Server: "text-indigo-600 dark:text-indigo-400",
  Shield: "text-emerald-600 dark:text-emerald-400",
  Cpu: "text-amber-600 dark:text-amber-400",
  Terminal: "text-purple-600 dark:text-purple-400",
};

export const DEFAULT_SKILL_CATEGORY_COLOR = "text-blue-600 dark:text-blue-400";

/** Palet warna per-kartu ringkasan (urutan sesuai HERO_SUMMARY_CARDS) */
export const SUMMARY_CARD_CLASSES = [
  "bg-blue-50/80 dark:bg-blue-500/5 border-blue-200/80 dark:border-blue-500/20 shadow-[0_2px_8px_-2px_rgba(59,130,246,0.1)]",
  "bg-emerald-50/80 dark:bg-emerald-500/5 border-emerald-200/80 dark:border-emerald-500/20 shadow-[0_2px_8px_-2px_rgba(16,185,129,0.1)]",
  "bg-purple-50/80 dark:bg-purple-500/5 border-purple-200/80 dark:border-purple-500/20 shadow-[0_2px_8px_-2px_rgba(168,85,247,0.1)]",
  "bg-amber-50/80 dark:bg-amber-500/5 border-amber-200/80 dark:border-amber-500/20 shadow-[0_2px_8px_-2px_rgba(245,158,11,0.1)]",
];

export const SUMMARY_TEXT_CLASSES: HeroSummaryTextClasses[] = [
  { title: "text-blue-700 dark:text-blue-400", subtitle: "text-blue-600/80 dark:text-blue-300/70" },
  { title: "text-emerald-700 dark:text-emerald-400", subtitle: "text-emerald-600/80 dark:text-emerald-300/70" },
  { title: "text-purple-700 dark:text-purple-400", subtitle: "text-purple-600/80 dark:text-purple-300/70" },
  { title: "text-amber-700 dark:text-amber-400", subtitle: "text-amber-600/80 dark:text-amber-300/70" },
];
