"use client";
import React, { useCallback, useMemo } from "react";
import portfolioData from "../../data/portfolio.json";
import {
  isDetailOpenStore,
  isPreviewOpenStore,
  selectedCertForDetailStore,
  selectedPreviewItemStore,
  selectedProjectForDetailStore,
} from "../../store/portfolio";
import type {
  CertificationItem,
  EducationItem,
  PageId,
  ProjectItem,
  SkillCategory,
} from "../../types";
import { DetailModalIsland, PreviewModalIsland } from "../modal/modal-islands";
import { isHeroSectionVisible } from "./hero.data";
import { AboutSection } from "./sections/about-section";
import { CertificationsSection } from "./sections/certifications-section";
import { ContactSection } from "./sections/contact-section";
import { EducationSection } from "./sections/education-section";
import { FeaturedProjectsSection } from "./sections/featured-projects-section";
import { IntroSection } from "./sections/intro-section";
import { SkillsSection } from "./sections/skills-section";
import type { HeroSectionProps } from "./types";

const {
  education: educationData,
  certifications: certificationsData,
  skillCategories,
} = portfolioData as {
  education: EducationItem[];
  certifications: CertificationItem[];
  skillCategories: SkillCategory[];
};

/**
 * Hero — komposisi halaman Beranda.
 *
 * Berkas ini hanya menyusun section (tanpa markup besar): tiap unit punya
 * file sendiri di `./hero/`, sehingga layout & animasi tetap utuh tapi
 * jauh lebih mudah dibaca dan dikembangkan.
 *
 * State modal hidup di island terpisah (DetailModalIsland/PreviewModalIsland)
 * yang subscribe store sendiri — membuka/menutup modal TIDAK me-render ulang
 * halaman ini beserta seluruh kartu di dalamnya.
 */
export const Hero: React.FC<HeroSectionProps> = ({
  setActivePage,
  featuredProjects,
  onOpenProjectMarkdown,
  onOpenCV,
}) => {
  /** Navigasi halaman + scroll ke atas dengan animasi (dipakai CTA) */
  const handleNavigate = useCallback(
    (page: PageId) => {
      setActivePage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [setActivePage],
  );

  // Handler modal: helper stabil (tanpa state lokal di halaman ini)
  const handleOpenProjectDetail = useCallback((project: ProjectItem) => {
    selectedProjectForDetailStore.set(project);
    selectedCertForDetailStore.set(null);
    isDetailOpenStore.set(true);
  }, []);

  const handleOpenProjectPreview = useCallback((project: ProjectItem) => {
    selectedPreviewItemStore.set(project);
    isPreviewOpenStore.set(true);
  }, []);

  // Sertifikat pilihan di Beranda — Memoized
  const homeCertificates = useMemo(
    () =>
      [
        certificationsData.find((c) => c.id === "cert-5") ||
          certificationsData[4]!,
        certificationsData.find((c) => c.id === "cert-2") ||
          certificationsData[1]!,
        certificationsData.find((c) => c.id === "cert-3") ||
          certificationsData[2]!,
        certificationsData.find((c) => c.id === "cert-4") ||
          certificationsData[3]!,
      ].filter(Boolean) as CertificationItem[],
    [],
  );

  // Proyek pilihan di Beranda — Memoized
  const homeFeaturedProjects = useMemo(() => {
    const list = [...(featuredProjects || [])];
    const ingstore = (portfolioData.projects as ProjectItem[]).find(
      (p) => p.id === "proj-4",
    );
    if (ingstore && !list.some((p) => p.id === "proj-4")) {
      list.push(ingstore);
    }
    return list.filter((p) => p.featured || p.id === "proj-4").slice(0, 4);
  }, [featuredProjects]);

  // Pendidikan Sarjana S1 — Memoized
  const sarjanaEducation = useMemo(
    () =>
      educationData.filter(
        (edu) =>
          edu.id === "edu-1" || edu.degree.toLowerCase().includes("sarjana"),
      ),
    [],
  );

  return (
    <div className="space-y-16 py-6 sm:py-8">
      {/* 1. Perkenalan singkat + kartu foto profil */}
      {isHeroSectionVisible("intro") && (
        <IntroSection onNavigate={handleNavigate} onOpenCV={onOpenCV} />
      )}

      {/* 2. Pendidikan (Sarjana S1) */}
      {isHeroSectionVisible("education") && (
        <EducationSection items={sarjanaEducation} />
      )}

      {/* 3. Proyek unggulan */}
      {isHeroSectionVisible("projects") && (
        <FeaturedProjectsSection
          totalProjects={featuredProjects.length}
          projects={homeFeaturedProjects}
          onNavigate={handleNavigate}
          onOpenProjectDetail={handleOpenProjectDetail}
          onOpenProjectPreview={handleOpenProjectPreview}
        />
      )}

      {/* 4. Tentang saya (ringkasan identitas) */}
      {isHeroSectionVisible("about") && <AboutSection />}

      {/* 5. Sertifikasi pilihan */}
      {isHeroSectionVisible("certifications") && (
        <CertificationsSection
          certificates={homeCertificates}
          onNavigate={handleNavigate}
        />
      )}

      {/* 6. Keahlian & stack teknis */}
      {isHeroSectionVisible("skills") && (
        <SkillsSection categories={skillCategories} />
      )}

      {/* 7. Kontak & aksi cepat HR */}
      {isHeroSectionVisible("contact") && (
        <ContactSection onOpenCV={onOpenCV} />
      )}

      {/* Pop up Detail Modal (Project / Certificate) — island terisolasi */}
      <DetailModalIsland onOpenMarkdown={onOpenProjectMarkdown} />

      {/* Quick Certificate Preview Modal — island terisolasi */}
      <PreviewModalIsland />
    </div>
  );
};
