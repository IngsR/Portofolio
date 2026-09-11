import type { ReactElement, ReactNode } from "react";
import type { CertificationItem, PageId, ProjectItem } from "../../types";

/**
 * Kontrak tipe untuk seluruh unit Hero.
 *
 * Semua section Hero hanya berkomunikasi lewat props yang didefinisikan di
 * sini, sehingga tiap berkas bisa dibaca & diubah tanpa menyentuh yang lain
 * (satu arah: Hero.tsx -> section -> card).
 */

/** Section yang bisa dikonfigurasi tampil/sembunyi lewat hero.config.ts */
export type HeroSectionId =
  | "intro"
  | "education"
  | "projects"
  | "about"
  | "certifications"
  | "skills"
  | "contact";

/** Props bersama: aksi navigasi halaman dipakai section/CTA di Beranda. */
export interface HeroPageProps {
  /** setActivePage dari App (dipakai root Hero saja) */
  setActivePage?: (page: PageId) => void;
  /** Pindah halaman + scroll ke atas dengan animasi (dipakai CTA section) */
  onNavigate?: (page: PageId) => void;
}

/** Props Hero (root) — lihat src/app.tsx */
export interface HeroSectionProps {
  setActivePage: (page: PageId) => void;
  featuredProjects: ProjectItem[];
  onOpenProjectMarkdown: (project: ProjectItem) => void;
  onOpenCV: () => void;
}

/** Props unit kartu ringkasan fokus teknis (section Tentang Saya) */
export interface HeroSummaryCard {
  title: string;
  subtitle: string;
}

/** Baris highlight singkat di kartu perkenalan */
export interface HeroHighlight {
  icon: ReactNode;
  label: string;
  value: string;
}

/** Warna kartu ringkasan fokus teknis */
export interface HeroSummaryTextClasses {
  title: string;
  subtitle: string;
}

/** Satu baris tautan kontak di kartu foto profil */
export interface HeroContactLink {
  id: "linkedin" | "email" | "github" | "whatsapp";
  label: string;
  value: string;
  href: string;
  icon: ReactElement;
  /** Kelas warna ikon + hover per kanal (statis, tidak diubah runtime) */
  iconClass: string;
  hoverClass: string;
  valueClass: string;
}

/** Props section Sertifikasi di Beranda */
export interface CertificationsSectionProps extends HeroPageProps {
  certificates: CertificationItem[];
}

export type { CertificationItem, PageId, ProjectItem };
