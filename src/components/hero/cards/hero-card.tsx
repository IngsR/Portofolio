"use client";
import { ExternalLink, Github } from "lucide-react";
import React, { memo } from "react";
import { CardSpotlight } from "../../../design/components/card-spotlight";
import { CertificationItem, ProjectItem } from "../../../types";
import {
  formatDomainName,
  formatShortDate,
  formatShortDomain,
} from "../../../utils/format";
import { canHover } from "../../../utils/hover";

/**
 * HeroCard — satu implementasi kartu untuk proyek & sertifikat di Beranda.
 *
 * `variant` mengatur tata letak isi kartu, sedangkan shell (border, radius,
 * hover, spotlight/tilt) dibagi bersama. Semua animasi layout lama
 * dipertahankan: spotlight + tilt saat perangkat mendukung hover, dan
 * card statis di perangkat sentuh (tanpa listener per kartu).
 */
export type HeroCardVariant = "project" | "certificate";

interface HeroCardProps {
  variant: HeroCardVariant;
  project?: ProjectItem | undefined;
  certificate?: CertificationItem | undefined;
  onOpenDetail?: () => void;
}

const BASE_CLASS =
  "group flex-col justify-between bg-gradient-to-b from-white via-white/95 to-slate-50/90 dark:from-[#0f0f13]/90 dark:via-[#0c0c0f]/80 dark:to-[#09090b]/85 backdrop-blur-md border border-slate-200/90 dark:border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] cursor-pointer";

const PROJECT_HOVER =
  " hover:border-indigo-500/40 dark:hover:border-white/30 hover:shadow-[0_20px_35px_-8px_rgba(15,23,42,0.12)] hover:-translate-y-1 transition-[border-color,box-shadow,transform] duration-300";

const CERT_HOVER =
  " hover:border-emerald-500/40 dark:hover:border-white/30 hover:shadow-[0_20px_35px_-8px_rgba(15,23,42,0.12)] hover:-translate-y-1 transition-[border-color,box-shadow,transform] duration-300";

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
  const hoverable = canHover();
  const cardClassName = `${BASE_CLASS}${
    hoverable ? (variant === "project" ? PROJECT_HOVER : CERT_HOVER) : ""
  }`;

  const content =
    variant === "project" && project ? (
      <ProjectCardBody
        project={project}
      />
    ) : certificate ? (
      <CertificateCardBody
        certificate={certificate}
      />
    ) : null;

  if (!content) return null;

  const handleCardClick = () => {
    if (variant === "project" && project?.slug) {
      window.location.href = `/project/${project.slug}`;
      return;
    }
    if (variant === "certificate" && certificate?.id) {
      window.location.href = `/certificate/${certificate.id}`;
      return;
    }
    if (onOpenDetail) onOpenDetail();
  };

  // Perangkat hover: spotlight mengikuti kursor + tilt halus.
  // Perangkat sentuh: kartu datar, tanpa efek berat (hemat frame saat scroll).
  if (hoverable) {
    return (
      <CardSpotlight
        className={cardClassName}
        radius={320}
        tilt={true}
        onClick={handleCardClick}
      >
        {content}
      </CardSpotlight>
    );
  }

  return (
    <div className={cardClassName} onClick={handleCardClick}>
      {content}
    </div>
  );
});

const ProjectCardBody = memo<{
  project: ProjectItem;
}>(function ProjectCardBody({ project }) {
  return (
    <>
      <div className="space-y-2 sm:space-y-3 p-3 sm:p-4 lg:p-4">
        {/* Kategori + indikator domain live */}
        <div className="flex items-center justify-between gap-1.5">
          <span className="text-[9px] sm:text-[10px] font-bold text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 border-slate-200/60 dark:border-white/5 truncate max-w-[55%]">
            {project.category}
          </span>
          {project.demoUrl && (
            <span className="inline-flex items-center gap-1 text-[8px] sm:text-[9.5px] text-emerald-700 dark:text-emerald-300 font-mono font-medium bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/20 px-1.5 py-0.5 rounded-full max-w-[45%] truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
              <span className="truncate">
                {formatShortDomain(project.demoUrl)}
              </span>
            </span>
          )}
        </div>

        {/* Screenshot — rasio dikunci agar grid tidak bergeser */}
        <div className="relative aspect-[16/10] w-full rounded-xl sm:rounded-2xl overflow-hidden shrink-0 bg-slate-900 border-slate-200/80 dark:border-white/10">
          <CardImage
            src={project.imageFull ?? project.image}
            fallbackSrc={project.fallbackImage}
            alt={project.title}
            className="w-full h-full object-cover group-hover:brightness-90 transition-[filter] duration-150 select-none"
          />
        </div>

        {/* Judul — 1 baris (truncate) supaya tinggi kartu seragam */}
        <h3
          className="font-bold text-xs sm:text-sm lg:text-[14px] text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight truncate"
          title={project.title}
        >
          {project.title}
        </h3>

        {/* Ringkasan solusi */}
        <div className="text-xs bg-slate-50 dark:bg-white/[0.03] p-2 sm:p-2.5 rounded-xl border-slate-200/60 dark:border-white/5">
          <span className="font-bold text-[10px] sm:text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mb-0.5">
            💡 Solusi:
          </span>
          <p className="text-[10px] sm:text-[11px] leading-relaxed text-slate-700 dark:text-slate-300 line-clamp-2">
            {project.solution || project.shortDescription}
          </p>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap items-center gap-1 pt-0.5">
          {project.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[8.5px] sm:text-[9.5px] font-medium rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-200/60 dark:border-white/5 truncate max-w-[120px]"
              title={tag}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 2 && (
            <span className="px-1.5 py-0.5 text-[8.5px] sm:text-[9px] font-semibold rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 shrink-0">
              +{project.tags.length - 2}
            </span>
          )}
        </div>
      </div>

      {/* Footer aksi — ikon saja di mobile agar domain tidak meluber */}
      <div
        className="px-3 sm:px-4 lg:px-4 pb-3 sm:pb-4 pt-2 sm:pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-1.5 min-w-0"
        onClick={(e) => e.stopPropagation()}
      >
        <a
          href={`/project/${project.slug}`}
          className="flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full border border-slate-200 dark:border-white/15 bg-slate-100/90 dark:bg-white/[0.06] text-slate-900 dark:text-white font-bold hover:bg-slate-950 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 text-[10px] sm:text-xs transition-all shrink-0 shadow-xs"
          title="Buka Halaman Detail Mewah"
        >
          <DetailIcon />
          <span>Detail</span>
        </a>

        <div className="flex items-center gap-1 sm:gap-1.5 min-w-0 shrink">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Repositori GitHub ${project.title}`}
              title="Buka Repositori GitHub"
              className="flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-slate-300 dark:border-white/20 bg-slate-100/90 dark:bg-white/[0.08] text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/90 dark:hover:bg-white/[0.16] hover:border-slate-400 dark:hover:border-white/30 text-[10px] sm:text-xs font-semibold transition-all shadow-xs shrink-0 active:scale-95"
            >
              <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-slate-900 dark:text-white" />
              <span className="hidden sm:inline font-medium">GitHub</span>
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-[9px] sm:text-[10px] font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center gap-1 shadow-sm min-w-0 shrink overflow-hidden"
              title={`Buka ${formatDomainName(project.demoUrl)}`}
            >
              <span className="truncate text-[8.5px] sm:text-[9.5px] font-mono leading-none">
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
}>(function CertificateCardBody({ certificate }) {
  return (
    <>
      <div className="space-y-2 sm:space-y-3 p-3">
        {/* Gambar sertifikat — rasio dikunci */}
        <div className="relative w-full aspect-[16/11] rounded-xl sm:rounded-2xl overflow-hidden shrink-0 bg-slate-100 dark:bg-[#141416] p-1.5 sm:p-2 border-slate-200 dark:border-white/10 flex items-center justify-center">
          <CardImage
            src={certificate.image}
            fallbackSrc={certificate.fallbackImage}
            alt={`Sertifikat ${certificate.title}`}
            className="w-full h-full object-contain object-center rounded-lg bg-white shadow-xs select-none group-hover:brightness-95 transition-[filter] duration-200"
          />
        </div>

        <div className="flex items-center justify-between gap-1.5">
          <span className="text-[9.5px] sm:text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 truncate max-w-[60%]">
            {certificate.category || "Sertifikasi"}
          </span>
          <span className="text-[9.5px] sm:text-[11px] text-slate-600 dark:text-slate-400 font-medium shrink-0">
            {formatShortDate(certificate.period || certificate.issueDate)}
          </span>
        </div>

        <h3
          className="font-bold text-xs sm:text-sm lg:text-[14px] text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 leading-tight transition-colors truncate"
          title={certificate.title}
        >
          {certificate.title}
        </h3>

        <div className="text-[10px] sm:text-xs text-slate-700 dark:text-slate-300 font-medium truncate">
          <span className="text-slate-500 dark:text-slate-400">Penerbit: </span>
          <span className="font-semibold text-slate-900 dark:text-white">
            {certificate.issuer}
          </span>
        </div>
      </div>

      <div
        className="px-3 pb-3 pt-2 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-1.5"
        onClick={(e) => e.stopPropagation()}
      >
        <a
          href={`/certificate/${certificate.id}`}
          className="flex items-center justify-center gap-1.5 p-1.5 sm:px-3 sm:py-1 rounded-full border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-bold hover:bg-slate-950 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 text-[10px] sm:text-xs transition-all shrink-0 shadow-xs"
          title="Detail Sertifikat Sinematik"
        >
          <DetailIcon />
          <span>Detail</span>
        </a>

        {certificate.credentialUrl && (
          <a
            href={certificate.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-[10px] sm:text-xs font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center gap-1 shadow-sm shrink-0"
          >
            <span>Verifikasi</span>
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
