"use client";
import { ExternalLink } from "lucide-react";
import React, { memo } from "react";
import { GithubBrandIcon } from "../../../design/components/brand-icons";
import { CertificationItem, ProjectItem } from "../../../types";
import {
  formatDomainName,
  formatShortDate,
  formatShortDomain,
  getProjectLiveButtonLabel,
} from "../../../utils/format";
import { useTranslations } from "../../../i18n";
import { getLocalePath } from "../../../utils/locale";

export type HeroCardVariant = "project" | "certificate";

interface HeroCardProps {
  variant: HeroCardVariant;
  project?: ProjectItem | undefined;
  certificate?: CertificationItem | undefined;
  onOpenDetail?: () => void;
}

const BASE_CLASS =
  "atelier-surface frame-motion group flex flex-col justify-between rounded-xl sm:rounded-3xl overflow-hidden cursor-pointer relative";

const PROJECT_HOVER =
  " hover:border-[#36454f]/40 dark:hover:border-white/30 hover:-translate-y-1";

const CERT_HOVER =
  " hover:border-[#36454f]/40 dark:hover:border-white/30 hover:-translate-y-1";

/** Gambar dengan nilai fallback (dipakai proyek & sertifikat) */
const CardImage: React.FC<{
  src: string | undefined;
  fallbackSrc: string | undefined;
  alt: string;
  className: string;
  width?: number;
  height?: number;
}> = memo(function CardImage({
  src,
  fallbackSrc,
  alt,
  className,
  width,
  height,
}) {
  return (
    <img
      src={src ?? ""}
      alt={alt}
      {...(width ? { width } : {})}
      {...(height ? { height } : {})}
      loading="lazy"
      decoding="async"
      onError={(e) => {
        const target = e.currentTarget;
        if (fallbackSrc && target.src !== fallbackSrc) {
          target.src = fallbackSrc;
        }
      }}
      className={className}
      referrerPolicy="no-referrer"
      draggable={false}
    />
  );
});

export const HeroCard = memo<HeroCardProps>(function HeroCard({
  variant,
  project,
  certificate,
  onOpenDetail,
}) {
  const { locale } = useTranslations();
  const cardClassName = `${BASE_CLASS} ${variant === "project" ? PROJECT_HOVER : CERT_HOVER}`;

  const content =
    variant === "project" && project ? (
      <ProjectCardBody project={project} locale={locale} />
    ) : certificate ? (
      <CertificateCardBody certificate={certificate} locale={locale} />
    ) : null;

  if (!content) return null;

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a, button")) return;
    if (variant === "project" && project?.slug) {
      if (typeof window !== "undefined") {
        import("astro:transitions/client")
          .then(({ navigate }) =>
            navigate(getLocalePath(`/project/${project.slug}`, locale)),
          )
          .catch(() => {
            window.location.href = getLocalePath(
              `/project/${project.slug}`,
              locale,
            );
          });
      }
      return;
    }
    if (variant === "certificate" && certificate?.id) {
      if (typeof window !== "undefined") {
        import("astro:transitions/client")
          .then(({ navigate }) =>
            navigate(getLocalePath(`/certificate/${certificate.id}`, locale)),
          )
          .catch(() => {
            window.location.href = getLocalePath(
              `/certificate/${certificate.id}`,
              locale,
            );
          });
      }
      return;
    }
    if (onOpenDetail) onOpenDetail();
  };

  return (
    <div className={cardClassName} onClick={handleCardClick}>
      {content}
    </div>
  );
});

const ProjectCardBody = memo<{
  project: ProjectItem;
  locale: "id" | "en";
}>(function ProjectCardBody({ project, locale }) {
  return (
    <>
      <div className="space-y-2 sm:space-y-3 p-2.5 sm:p-4 lg:p-4">
        {/* Kategori + indikator domain live */}
        <div className="flex items-center justify-between gap-1">
          <span className="text-[9px] sm:text-[11px] font-bold text-[#141f26] dark:text-slate-100 px-1.5 sm:px-2.5 py-0.5 rounded-full bg-[#E7EAEF]/80 dark:bg-white/10 border border-[#36454f]/15 dark:border-white/10 truncate max-w-[52%]">
            {project.category}
          </span>
          {project.demoUrl && (
            <span className="inline-flex items-center gap-1 text-[8px] sm:text-[10px] text-emerald-800 dark:text-emerald-200 font-mono font-semibold bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/25 px-1.5 sm:px-2 py-0.5 rounded-full max-w-[48%] truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
              <span className="truncate">
                {formatShortDomain(project.demoUrl)}
              </span>
            </span>
          )}
        </div>

        {/* Screenshot dengan passe-partout */}
        <div className="passe-partout relative aspect-[16/10] w-full rounded-lg sm:rounded-2xl overflow-hidden shrink-0 bg-slate-900/10 dark:bg-slate-900 border border-[#36454f]/15 dark:border-white/10">
          <CardImage
            src={project.imageFull ?? project.image}
            fallbackSrc={project.fallbackImage}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300 select-none"
          />
        </div>

        {/* Judul */}
        <h3
          className="font-bold text-[11.5px] sm:text-sm lg:text-[14px] text-[#141f26] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-1"
          title={project.title}
        >
          {project.title}
        </h3>

        {/* Ringkasan solusi */}
        <div className="bg-[#E7EAEF]/40 dark:bg-white/[0.03] p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-[#36454f]/10 dark:border-white/5">
          <span className="font-bold text-[9.5px] sm:text-[11.5px] text-emerald-800 dark:text-emerald-300 flex items-center gap-1 mb-0.5">
            💡 {locale === "en" ? "Solution:" : "Solusi:"}
          </span>
          <p className="text-[10px] sm:text-xs leading-relaxed text-[#24333d] dark:text-slate-200 line-clamp-2">
            {project.solution || project.shortDescription}
          </p>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap items-center gap-1 pt-0.5">
          {project.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-1.5 sm:px-2 py-0.5 text-[8.5px] sm:text-[10px] font-mono font-medium rounded-full bg-[#E7EAEF]/80 dark:bg-white/5 text-[#24333d] dark:text-slate-200 border border-[#36454f]/10 dark:border-white/5 truncate max-w-[85px] sm:max-w-[120px]"
              title={tag}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 2 && (
            <span className="px-1 sm:px-1.5 py-0.5 text-[8px] sm:text-[10px] font-semibold rounded-full bg-[#E7EAEF]/80 dark:bg-white/5 text-[#354551] dark:text-slate-300 shrink-0">
              +{project.tags.length - 2}
            </span>
          )}
        </div>
      </div>

      {/* Footer aksi */}
      <div
        className="px-2 sm:px-4 lg:px-4 pb-2.5 sm:pb-4 pt-2 sm:pt-3 border-t border-[#36454f]/10 dark:border-white/10 flex items-center justify-between gap-1 min-w-0"
        onClick={(e) => e.stopPropagation()}
      >
        <a
          href={getLocalePath(`/project/${project.slug}`, locale)}
          className="flex items-center justify-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-[#36454f]/25 dark:border-white/20 bg-white/70 dark:bg-white/5 text-[#141f26] dark:text-white font-bold hover:bg-[#273641] hover:text-white dark:hover:bg-white dark:hover:text-slate-950 text-[9.5px] sm:text-xs transition-all shrink-0 shadow-xs"
          title={
            locale === "en" ? "Open project details" : "Buka detail proyek"
          }
        >
          <DetailIcon />
          <span>Detail</span>
        </a>

        <div className="flex items-center gap-1 min-w-0 shrink">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Repositori GitHub ${project.title}`}
              title={
                locale === "en"
                  ? "Open GitHub repository"
                  : "Buka repositori GitHub"
              }
              className="flex items-center justify-center p-1 sm:px-2.5 sm:py-1.5 rounded-full border border-[#36454f]/20 dark:border-white/20 bg-transparent text-[#24333d] dark:text-slate-200 hover:text-[#141f26] dark:hover:text-white hover:bg-[#36454f]/10 dark:hover:bg-white/10 text-[9.5px] sm:text-xs font-semibold transition-all shadow-xs shrink-0 active:scale-95"
            >
              <GithubBrandIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-[#141f26] dark:text-white" />
              <span className="hidden sm:inline font-medium">GitHub</span>
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-full bg-[#273641] text-white dark:bg-slate-100 dark:text-slate-900 text-[8.5px] sm:text-[10px] font-semibold hover:bg-[#141f26] dark:hover:bg-white transition-colors flex items-center gap-0.5 sm:gap-1 shadow-sm min-w-0 shrink overflow-hidden"
              title={getProjectLiveButtonLabel(project, locale)}
            >
              <span className="truncate text-[8.5px] sm:text-[10px] font-mono leading-none">
                {formatShortDomain(project.demoUrl)}
              </span>
              <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
            </a>
          )}
        </div>
      </div>
    </>
  );
});

const CertificateCardBody = memo<{
  certificate: CertificationItem;
  locale: "id" | "en";
}>(function CertificateCardBody({ certificate, locale }) {
  return (
    <>
      <div className="space-y-2.5 sm:space-y-3 p-3.5 sm:p-4">
        {/* Gambar sertifikat dengan passe-partout */}
        <div className="passe-partout relative w-full aspect-[16/11] rounded-xl sm:rounded-2xl overflow-hidden shrink-0 bg-transparent dark:bg-black/20 p-2 sm:p-2.5 border border-[#36454f]/15 dark:border-white/10 flex items-center justify-center">
          <CardImage
            src={certificate.image}
            fallbackSrc={certificate.fallbackImage}
            alt={`${locale === "en" ? "Certificate" : "Sertifikat"} ${certificate.title}`}
            className="w-full h-full object-contain object-center rounded-lg select-none group-hover:scale-[1.02] transition-transform duration-300"
          />
        </div>

        <div className="flex items-center justify-between gap-1.5">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#273641] dark:text-blue-400 truncate max-w-[60%]">
            {certificate.category ||
              (locale === "en" ? "Certification" : "Sertifikasi")}
          </span>
          <span className="text-[10px] sm:text-[11px] text-[#485966] dark:text-slate-400 font-medium shrink-0">
            {formatShortDate(
              certificate.period || certificate.issueDate,
              locale,
            )}
          </span>
        </div>

        <h3
          className="font-bold text-xs sm:text-sm lg:text-[14px] text-[#141f26] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 leading-snug transition-colors line-clamp-1"
          title={certificate.title}
        >
          {certificate.title}
        </h3>

        <div className="text-[11px] sm:text-xs text-[#354551] dark:text-slate-300 font-medium truncate">
          <span className="text-[#485966] dark:text-slate-400">
            {locale === "en" ? "Issuer: " : "Penerbit: "}
          </span>
          <span className="font-semibold text-[#141f26] dark:text-white">
            {certificate.issuer}
          </span>
        </div>
      </div>

      <div
        className="px-3 sm:px-4 pb-3 sm:pb-4 pt-2.5 sm:pt-3 border-t border-[#36454f]/10 dark:border-white/10 flex items-center justify-between gap-1.5"
        onClick={(e) => e.stopPropagation()}
      >
        <a
          href={getLocalePath(`/certificate/${certificate.id}`, locale)}
          className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full border border-[#36454f]/25 dark:border-white/20 bg-white/70 dark:bg-white/5 text-[#141f26] dark:text-white font-bold hover:bg-[#273641] hover:text-white dark:hover:bg-white dark:hover:text-slate-950 text-[10.5px] sm:text-xs transition-all shrink-0 shadow-xs"
          title={
            locale === "en"
              ? "View certificate details"
              : "Lihat detail sertifikat"
          }
        >
          <DetailIcon />
          <span>Detail</span>
        </a>

        {certificate.credentialUrl && (
          <a
            href={certificate.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-full bg-[#273641] text-white dark:bg-slate-100 dark:text-slate-900 text-[10px] sm:text-xs font-semibold hover:bg-[#141f26] dark:hover:bg-white transition-colors flex items-center gap-1.5 shadow-sm shrink-0"
          >
            <span>{locale === "en" ? "Verify" : "Verifikasi"}</span>
            <ExternalLink className="w-3 h-3 shrink-0" />
          </a>
        )}
      </div>
    </>
  );
});

const DetailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-3.5 h-3.5"
    aria-hidden="true"
  >
    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
    <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z" />
    <path d="M9 13h6M9 17h3" />
  </svg>
);
