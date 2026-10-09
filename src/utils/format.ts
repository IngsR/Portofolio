import type {
  CertificationItem,
  EducationItem,
  ExperienceItem,
  Locale,
  ProjectItem,
  SkillCategory,
  UserProfile,
} from "../types";
import { getDictionary } from "../data/locales";

/**
 * Utility formatters for UI display
 */

/**
 * Extracts a clean, readable domain name from a URL for display in UI cards and buttons.
 * E.g.
 * "https://smpn24padang.sch.id" -> "smpn24padang.sch.id"
 * "https://prediksi.ikhwann.my.id" -> "prediksi.ikhwann.my.id"
 * "https://github.com/IngsR/Angular-Property" -> "github.com/IngsR/Angular-Property"
 * "https://cars.ikhwann.my.id" -> "ing-store.vercel.app"
 */
export function formatDomainName(url?: string): string {
  if (!url) return "";
  try {
    const trimmed = url.trim();
    // Remove protocol and trailing slash
    return trimmed
      .replace(/^https?:\/\//i, "")
      .replace(/^www\./i, "")
      .replace(/\/+$/, "");
  } catch {
    return url;
  }
}

/**
 * Returns a short display domain for compact mobile views
 */
export function formatShortDomain(url?: string): string {
  if (!url) return "";
  const full = formatDomainName(url);
  // If it's a deep GitHub repository link, return owner/repo for concise display
  if (full.startsWith("github.com/")) {
    return full.replace("github.com/", "");
  }
  return full;
}

/**
 * Tanggal ringkas ala kartu proyek/sertifikat.
 * E.g. "2024-03-11" -> "11 Mar 2024" (tetap aman untuk format bebas selain itu).
 */
export function formatShortDate(value?: string, locale: Locale = "id"): string {
  if (!value) return "";
  if (/^\d{4}$/.test(value)) return value;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  if (/^[^\d]+\s+\d{4}$/.test(value)) {
    return date.toLocaleDateString(locale === "en" ? "en-US" : "id-ID", {
      month: "short",
      year: "numeric",
    });
  }

  return date.toLocaleDateString(locale === "en" ? "en-US" : "id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function getLocalizedProject(
  project: ProjectItem,
  locale: Locale,
): ProjectItem {
  const translations = project.translations?.[locale];
  const categoryMap: Record<string, string> =
    getDictionary(locale).portfolio.projectCategories;
  const localizedCategory = categoryMap[project.category] ?? project.category;

  if (!translations) {
    return localizedCategory === project.category
      ? project
      : { ...project, category: localizedCategory };
  }

  return {
    ...project,
    title: translations.title ?? project.title,
    shortDescription: translations.shortDescription ?? project.shortDescription,
    category: translations.category ?? localizedCategory,
    markdownContent: translations.markdownContent ?? project.markdownContent,
    ...(translations.metrics && project.metrics
      ? {
          metrics: project.metrics.map((metric, index) => ({
            label: translations.metrics?.[index]?.label ?? metric.label,
            value: translations.metrics?.[index]?.value ?? metric.value,
          })),
        }
      : {}),
    ...(translations.period !== undefined
      ? { period: translations.period }
      : {}),
    ...(translations.role !== undefined ? { role: translations.role } : {}),
    ...(translations.problem !== undefined
      ? { problem: translations.problem }
      : locale === "en" && translations.shortDescription
        ? { problem: translations.shortDescription }
        : {}),
    ...(translations.solution !== undefined
      ? { solution: translations.solution }
      : locale === "en" && translations.shortDescription
        ? { solution: translations.shortDescription }
        : {}),
  };
}

export function getLocalizedCertification(
  certificate: CertificationItem,
  locale: Locale,
): CertificationItem {
  const translations = certificate.translations?.[locale];
  if (!translations) return certificate;

  return {
    ...certificate,
    title: translations.title ?? certificate.title,
    issuer: translations.issuer ?? certificate.issuer,
    issueDate: translations.issueDate ?? certificate.issueDate,
    ...(translations.period !== undefined
      ? { period: translations.period }
      : {}),
    ...(translations.category !== undefined
      ? { category: translations.category }
      : {}),
    ...(translations.description !== undefined
      ? { description: translations.description }
      : {}),
  };
}

export function getLocalizedUserProfile(
  profile: UserProfile,
  locale: Locale,
): UserProfile {
  if (locale === "id") return profile;

  const translation = getDictionary(locale).hero.profile;
  return {
    ...profile,
    tagline: translation.tagline,
    shortBio: translation.shortBio,
    fullBio: [...translation.fullBio],
    workPreference: translation.workPreference,
    statusText: translation.statusText,
  };
}

export function getLocalizedExperience(
  item: ExperienceItem,
  locale: Locale,
): ExperienceItem {
  const translation = item.translations?.[locale];
  if (!translation) return item;
  return {
    ...item,
    role: translation.role ?? item.role,
    period: translation.period ?? item.period,
    type: translation.type ?? item.type,
    ...(translation.description !== undefined
      ? { description: translation.description }
      : {}),
    achievements: translation.achievements ?? item.achievements,
  };
}

export function getLocalizedEducation(
  item: EducationItem,
  locale: Locale,
): EducationItem {
  const translation = item.translations?.[locale];
  if (!translation) return item;
  return {
    ...item,
    degree: translation.degree ?? item.degree,
    period: translation.period ?? item.period,
    ...(translation.details !== undefined
      ? { details: translation.details }
      : {}),
  };
}

export function getLocalizedSkillCategory(
  item: SkillCategory,
  locale: Locale,
): SkillCategory {
  const translation = item.translations?.[locale];
  if (!translation) return item;
  return {
    ...item,
    title: translation.title ?? item.title,
    description: translation.description ?? item.description,
    ...(translation.alsoUsedLabel !== undefined
      ? { alsoUsedLabel: translation.alsoUsedLabel }
      : {}),
  };
}

/**
 * Nomor telepon Indonesia -> tautan wa.me tanpa simbol.
 * E.g. "+62 812-3456-7890" -> "https://wa.me/6281234567890"
 */
export function toWhatsAppUrl(phone?: string): string {
  if (!phone) return "";
  const digits = phone.replace(/[^\d]/g, "").replace(/^0/, "62");
  return digits ? `https://wa.me/${digits}` : "";
}
