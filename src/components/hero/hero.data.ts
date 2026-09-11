import type {
  HeroSectionId,
  HeroSummaryCard,
  HeroSummaryTextClasses,
} from "./types";

/**
 * Hero — konfigurasi statis & helper tampilan.
 *
 * Semua nilai di berkas ini murni data (tanpa state React), termasuk daftar
 * show/hide hero, sehingga komponen section tetap ringan dan mudah diubah
 * terpisah tanpa menyentuh layout.
 */

/**
 * Switch tampilan section Beranda. Bernilai `true` semua secara default
 * (tampilan/susunan layout lama dipertahankan utuh). Ubah ke `false` untuk
 * menyembunyikan section tertentu tanpa menghapus kodenya.
 */
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

/** Peran yang dirotasi oleh FlipWords di kartu perkenalan */
export const HERO_ROLES: readonly string[] = [
  "Junior Web Developer",
  "Frontend & Backend",
  "Next.js & React Developer",
  "REST API & Database",
];

export const AVAILABILITY_TEXT =
  "Siap On-Site (WFO) Seluruh Indonesia / Relokasi & Remote";

export const HERO_BIO =
  "Fresh graduate S1 Teknik Informatika dengan konsentrasi Data Science yang berfokus pada pengembangan aplikasi web. Saya banyak belajar melalui project, eksperimen, dan trial and error, menemukan masalah, memperbaiki, lalu memahami cara membuatnya lebih baik. Saat ini saya terus berkembang sebagai Junior Web Developer dan terbuka untuk kesempatan kerja, berkontribusi, serta berkembang bersama tim.";

/** Ringkasan fokus teknis di section "Tentang Saya" pada Beranda */
export const HERO_SUMMARY_CARDS: HeroSummaryCard[] = [
  { title: "Next.js", subtitle: "App Router, SSR, SSG, ISR" },
  { title: "REST API & Testing", subtitle: "Validasi, integrasi, test" },
  { title: "Security Basics", subtitle: "OWASP Top 10 awareness" },
  { title: "Delivery Workflow", subtitle: "Git, CI/CD, serverless" },
];

/**
 * iconName (JSON) -> kelas warna ikon di kartu Keahlian Beranda.
 * Ikonnya sendiri dirender oleh SkillCard, jadi berkas ini tetap bebas JSX.
 */
export const SKILL_CATEGORY_ICONS: Record<string, string> = {
  Layout: "text-sky-600 dark:text-sky-400",
  Server: "text-indigo-600 dark:text-indigo-400",
  Terminal: "text-purple-600 dark:text-purple-400",
  Cpu: "text-emerald-600 dark:text-emerald-400",
};

export const DEFAULT_SKILL_CATEGORY_COLOR = "text-blue-600 dark:text-blue-400";

/** Kelas kartu ringkasan fokus teknis (warna mengikuti urutan data) */
export const SUMMARY_CARD_CLASSES = [
  "bg-blue-50/80 dark:bg-blue-500/5 border-blue-200/80 dark:border-blue-500/20 shadow-[0_2px_8px_-2px_rgba(59,130,246,0.1)]",
  "bg-emerald-50/80 dark:bg-emerald-500/5 border-emerald-200/80 dark:border-emerald-500/20 shadow-[0_2px_8px_-2px_rgba(16,185,129,0.1)]",
  "bg-purple-50/80 dark:bg-purple-500/5 border-purple-200/80 dark:border-purple-500/20 shadow-[0_2px_8px_-2px_rgba(168,85,247,0.1)]",
  "bg-amber-50/80 dark:bg-amber-500/5 border-amber-200/80 dark:border-amber-500/20 shadow-[0_2px_8px_-2px_rgba(245,158,11,0.1)]",
];

export const SUMMARY_TEXT_CLASSES: HeroSummaryTextClasses[] = [
  {
    title: "text-blue-700 dark:text-blue-400",
    subtitle: "text-blue-600/80 dark:text-blue-300/70",
  },
  {
    title: "text-emerald-700 dark:text-emerald-400",
    subtitle: "text-emerald-600/80 dark:text-emerald-300/70",
  },
  {
    title: "text-purple-700 dark:text-purple-400",
    subtitle: "text-purple-600/80 dark:text-purple-300/70",
  },
  {
    title: "text-amber-700 dark:text-amber-400",
    subtitle: "text-amber-600/80 dark:text-amber-300/70",
  },
];
