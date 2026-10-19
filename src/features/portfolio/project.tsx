import { ArrowUpRight, Calendar, FileText, Github } from "lucide-react";
import React, { memo } from "react";
import { ProjectItem } from "../../types";
import { formatDomainName, formatShortDomain, getProjectLiveButtonLabel } from "../../utils/format";
import { canHover } from "../../utils/hover";
import { CardSpotlight } from "../../design/components/card-spotlight";
import { useTranslations } from "../../i18n";
import { getLocalePath } from "../../utils/locale";

interface ProjectCardProps {
  project: ProjectItem;
  onOpenDetail?: (project: ProjectItem) => void;
}

const CARD_BASE =
  "atelier-surface frame-motion corner-bracket group flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer relative shadow-xs border border-[#36454f]/15 dark:border-white/10";
const CARD_HOVER =
  " hover:border-[#36454f]/40 dark:hover:border-white/30 hover:-translate-y-1 transition-transform transition-colors duration-200";

export const Project = memo<ProjectCardProps>(function Project({
  project,
  onOpenDetail,
}) {
  const { locale } = useTranslations();
  const domain = formatDomainName(project.demoUrl);
  const shortDomain = formatShortDomain(project.demoUrl);
  const hoverable = canHover();
  const cardClassName = CARD_BASE + (hoverable ? CARD_HOVER : "");

  const content = (
    <>
      <div className="passe-partout relative aspect-[16/10] w-full overflow-hidden shrink-0 bg-slate-900/10 dark:bg-slate-900 p-1.5 sm:p-2.5 flex items-center justify-center border-b border-[#36454f]/15 dark:border-white/10">
        <img
          src={project.image}
          alt={project.title}
          width={640}
          height={400}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            const target = e.currentTarget;
            if (project.fallbackImage && target.src !== project.fallbackImage) {
              target.src = project.fallbackImage;
            }
          }}
          className="w-full h-full object-cover sm:object-contain object-center rounded-lg sm:rounded-xl select-none group-hover:scale-[1.02] transition-transform duration-300"
          referrerPolicy="no-referrer"
        />

        {/* Live Domain Indicator if available */}
        {domain && (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex items-center gap-1.5 px-2.5 py-1 text-[9px] sm:text-[10px] font-mono font-bold rounded-full bg-emerald-800/95 text-white shadow-xs pointer-events-none max-w-[45%] truncate border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse shrink-0" />
            <span className="truncate">{domain}</span>
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 lg:p-6 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2 text-[10px] sm:text-xs text-[#485966] dark:text-slate-400">
          <span className="font-medium flex items-center gap-1 min-w-0">
            <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#485966] shrink-0" />
            <span className="truncate">{project.period || project.publishedDate}</span>
          </span>
          <span className="text-[10px] sm:text-[11px] font-semibold text-[#273641] dark:text-slate-300 truncate text-right min-w-0">
            {project.role || "Junior Web Developer"}
          </span>
        </div>

          <h3
            className="font-bold text-sm sm:text-base lg:text-[16px] text-[#141f26] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 tracking-tight leading-snug transition-colors line-clamp-1"
            title={project.title}
          >
            {project.title}
          </h3>

          <p className="text-xs text-[#24333d] dark:text-slate-300 line-clamp-2 leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* Metrics Highlight */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="hidden sm:grid grid-cols-3 gap-1 sm:gap-2 py-2 px-2.5 rounded-xl bg-[#E7EAEF]/50 dark:bg-white/[0.03] border border-[#36454f]/10 dark:border-white/5 text-center">
            {project.metrics.map((metric, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-[10px] sm:text-xs font-bold text-[#141f26] dark:text-white truncate">
                  {metric.value}
                </span>
                <span className="text-[8.5px] sm:text-[9.5px] text-[#485966] dark:text-slate-400 truncate">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1 pt-0.5">
          {project.tags
            .filter((tag) => tag.trim())
            .slice(0, 2)
            .map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-[9.5px] sm:text-[10px] font-mono font-medium rounded-full text-[#141f26] dark:text-slate-200 bg-[#E7EAEF]/80 dark:bg-white/5 border border-[#36454f]/10 dark:border-white/5"
              >
                {tag}
              </span>
            ))}
          {project.tags
            .filter((tag) => tag.trim())
            .slice(2, 4)
            .map((tag) => (
              <span
                key={tag}
                className="hidden sm:inline-flex px-2.5 py-0.5 text-[10px] font-mono font-medium rounded-full text-[#141f26] dark:text-slate-200 bg-[#E7EAEF]/80 dark:bg-white/5 border border-[#36454f]/10 dark:border-white/5"
              >
                {tag}
              </span>
            ))}
          {project.tags.filter((tag) => tag.trim()).length > 2 && (
            <span className="sm:hidden px-1.5 py-0.5 text-[9px] font-mono text-[#485966] dark:text-slate-400 font-semibold rounded-full bg-[#E7EAEF]/80 dark:bg-white/5">
              +{project.tags.filter((tag) => tag.trim()).length - 2}
            </span>
          )}
        </div>

        {/* Action Buttons Row */}
        <div
          className="pt-2.5 sm:pt-4 border-t border-[#36454f]/10 dark:border-white/10 flex items-center justify-between gap-1.5 min-w-0"
          onClick={(e) => e.stopPropagation()}
        >
          <a
            href={getLocalePath(`/project/${project.slug}`, locale)}
            className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full border border-[#36454f]/25 dark:border-white/20 bg-white/70 dark:bg-white/5 text-[#141f26] dark:text-white hover:bg-[#273641] hover:text-white dark:hover:bg-white dark:hover:text-slate-950 text-xs font-bold transition-all shrink-0 shadow-xs"
            title={
              locale === "en" ? "Open project details" : "Buka detail proyek"
            }
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Detail</span>
          </a>

          <div className="flex items-center gap-1 sm:gap-2 min-w-0 shrink">
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
                className="flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-[#36454f]/20 dark:border-white/20 bg-transparent text-[#24333d] dark:text-slate-200 hover:text-[#141f26] dark:hover:text-white hover:bg-[#36454f]/10 dark:hover:bg-white/10 text-[10px] sm:text-xs font-semibold transition-all shadow-xs shrink-0 active:scale-95"
              >
                <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-[#141f26] dark:text-white" />
                <span className="hidden sm:inline font-medium">GitHub</span>
              </a>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#273641] text-white dark:bg-slate-100 dark:text-slate-900 text-[9.5px] sm:text-xs font-semibold hover:bg-[#141f26] dark:hover:bg-white transition-all shadow-sm min-w-0 shrink overflow-hidden flex items-center gap-1"
                title={getProjectLiveButtonLabel(project, locale)}
              >
                <span className="truncate text-[9px] sm:text-[11px] font-mono leading-none">
                  {shortDomain}
                </span>
                <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a, button")) return;
    if (project?.slug) {
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
    if (onOpenDetail) onOpenDetail(project);
  };

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

