"use client";
import React, { useCallback, useMemo } from "react";
import portfolioData from "../../data/portfolio.json";
import type {
  CertificationItem,
  EducationItem,
  PageId,
  ProjectItem,
  SkillCategory,
} from "../../types";
import { isHeroSectionVisible } from "./hero.data";
import { AboutSection } from "./sections/about-section";
import { CertificationsSection } from "./sections/certifications-section";
import { ContactSection } from "./sections/contact-section";
import { EducationSection } from "./sections/education-section";
import { FeaturedProjectsSection } from "./sections/featured-projects-section";
import { IntroSection } from "./sections/intro-section";
import { SkillsSection } from "./sections/skills-section";
import type { HeroSectionProps } from "./types";
import { useTranslations } from "../../i18n";
import {
  getLocalizedCertification,
  getLocalizedEducation,
  getLocalizedProject,
  getLocalizedSkillCategory,
} from "../../utils/format";

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
 * Hero - komposisi halaman Beranda.
 *
 * Berkas ini menyusun section: tiap unit punya file sendiri di `./hero/`.
 * Setiap kartu langsung bernavigasi ke halaman detail sinematik.
 */
export const Hero: React.FC<HeroSectionProps> = ({
  setActivePage,
  featuredProjects,
  onOpenCV,
}) => {
  const { locale } = useTranslations();
  const localizedCertifications = useMemo(
    () =>
      certificationsData.map((item) => getLocalizedCertification(item, locale)),
    [locale],
  );
  const localizedSkills = useMemo(
    () =>
      skillCategories.map((item) => getLocalizedSkillCategory(item, locale)),
    [locale],
  );
  /** Navigasi halaman + scroll instan ke atas */
  const handleNavigate = useCallback(
    (page: PageId) => {
      setActivePage(page);
      window.scrollTo({ top: 0, behavior: "auto" });
    },
    [setActivePage],
  );

  // Sertifikat pilihan di Beranda - Memoized
  const homeCertificates = useMemo(
    () =>
      [
        localizedCertifications.find((c) => c.id === "cert-5") ||
          localizedCertifications[4]!,
        localizedCertifications.find((c) => c.id === "cert-2") ||
          localizedCertifications[1]!,
        localizedCertifications.find((c) => c.id === "cert-3") ||
          localizedCertifications[2]!,
        localizedCertifications.find((c) => c.id === "cert-4") ||
          localizedCertifications[3]!,
      ].filter(Boolean) as CertificationItem[],
    [localizedCertifications],
  );

  // Proyek pilihan di Beranda - Memoized
  const homeFeaturedProjects = useMemo(() => {
    const list = [...(featuredProjects || [])];
    const ingstore = (portfolioData.projects as ProjectItem[]).find(
      (p) => p.id === "proj-4",
    );
    if (ingstore && !list.some((p) => p.id === "proj-4")) {
      list.push(getLocalizedProject(ingstore, locale));
    }
    return list.filter((p) => p.featured || p.id === "proj-4").slice(0, 4);
  }, [featuredProjects, locale]);

  // Pendidikan Sarjana S1 - Memoized
  const sarjanaEducation = useMemo(
    () =>
      educationData.filter(
        (edu) =>
          edu.id === "edu-1" || edu.degree.toLowerCase().includes("sarjana"),
      ),
    [locale],
  );

  return (
    <div className="space-y-16 py-6 sm:py-8">
      {/* 1. Perkenalan singkat + kartu foto profil */}
      {isHeroSectionVisible("intro") && (
        <IntroSection onNavigate={handleNavigate} onOpenCV={onOpenCV} />
      )}

      {/* 2. Pendidikan (Sarjana S1) */}
      {isHeroSectionVisible("education") && (
        <EducationSection
          items={sarjanaEducation.map((item) =>
            getLocalizedEducation(item, locale),
          )}
        />
      )}

      {/* 3. Proyek unggulan */}
      {isHeroSectionVisible("projects") && (
        <FeaturedProjectsSection
          totalProjects={featuredProjects.length}
          projects={homeFeaturedProjects}
          onNavigate={handleNavigate}
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
        <SkillsSection categories={localizedSkills} />
      )}

      {/* 7. Ajakan kontak penutup */}
      {isHeroSectionVisible("contact") && <ContactSection />}
    </div>
  );
};
