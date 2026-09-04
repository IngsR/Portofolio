import { ArrowUpRight, Calendar, FileText, Github } from "lucide-react";
import React, { memo } from "react";
import { ProjectItem } from "../../types";
import { formatDomainName, formatShortDomain } from "../../utils/format";

interface ProjectCardProps {
  project: ProjectItem;
  onOpenDetail: (project: ProjectItem) => void;
  onOpenMarkdown?: (project: ProjectItem) => void;
}

export const Project = memo<ProjectCardProps>(function Project({
  project,
  onOpenDetail,
  onOpenMarkdown,
}) {
  const domain = formatDomainName(project.demoUrl);
  const shortDomain = formatShortDomain(project.demoUrl);

  return (
    <div
      className="group flex flex-col bg-white dark:bg-[#0f0f11] border border-slate-200/80 dark:border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden hover:border-slate-400 dark:hover:border-white/30 hover:shadow-lg transition-all duration-200 shadow-sm cursor-pointer"
      onClick={() => onOpenDetail(project)}
    >
      {/* Screenshot / Cover Container - LOCKED ASPECT RATIO */}
      <div className="relative aspect-[16/10] w-full overflow-hidden shrink-0 bg-slate-100 dark:bg-[#141416] p-1.5 sm:p-2.5 flex items-center justify-center border-b border-slate-100 dark:border-white/10">
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
          className="w-full h-full object-cover sm:object-contain object-center rounded-lg sm:rounded-xl bg-white dark:bg-black/20 select-none group-hover:brightness-90 transition-[filter] duration-150"
          referrerPolicy="no-referrer"
        />

        {/* Clean Category Badge */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex items-center gap-1.5 pointer-events-none max-w-[55%]">
          <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[11px] font-semibold rounded-md sm:rounded-lg bg-slate-950/85 text-white dark:bg-white/90 dark:text-slate-950 backdrop-blur-md shadow-xs truncate">
            {project.category}
          </span>
        </div>

        {/* Live Domain Indicator if available */}
        {domain && (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[8px] sm:text-[10px] font-mono font-medium rounded-md sm:rounded-lg bg-emerald-700/90 text-white backdrop-blur-md shadow-xs pointer-events-none max-w-[45%] truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse shrink-0" />
            <span className="truncate">{domain}</span>
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-3.5 sm:p-5 lg:p-6 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
        <div className="space-y-1.5 sm:space-y-2.5">
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium flex items-center gap-1">
              <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              {project.period || project.publishedDate}
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-slate-600 dark:text-slate-300">
              {project.role || "Junior Frontend Engineer"}
            </span>
          </div>

          <h3
            className="font-bold text-xs sm:text-base lg:text-[16px] text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 tracking-tight leading-snug transition-colors line-clamp-1 truncate"
            title={project.title}
          >
            {project.title}
          </h3>

          <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* Metrics Highlight - desktop only to prevent mobile card from stretching */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="hidden sm:grid grid-cols-3 gap-1 sm:gap-2 py-1.5 sm:py-2 px-1.5 sm:px-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 text-center">
            {project.metrics.map((metric, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-[10px] sm:text-xs font-bold text-slate-900 dark:text-white truncate">
                  {metric.value}
                </span>
                <span className="text-[8px] sm:text-[10px] text-slate-500 dark:text-slate-400 truncate">
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
                className="px-2 py-0.5 text-[9px] sm:text-[10px] rounded-full text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 font-medium"
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
                className="hidden sm:inline-flex px-2 py-0.5 text-[10px] rounded-full text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 font-medium"
              >
                {tag}
              </span>
            ))}
          {project.tags.filter((tag) => tag.trim()).length > 2 && (
            <span className="sm:hidden px-1.5 py-0.5 text-[9px] text-slate-400 font-medium rounded-full bg-slate-100 dark:bg-white/5">
              +{project.tags.filter((tag) => tag.trim()).length - 2}
            </span>
          )}
        </div>

        {/* Action Buttons Row - Detail icon only on mobile to prevent domain overflow */}
        <div
          className="pt-2.5 sm:pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-1.5 min-w-0"
          onClick={(e) => e.stopPropagation()} // Prevent card double triggering
        >
          <button
            onClick={() => onOpenDetail(project)}
            className="flex items-center justify-center gap-1 p-1.5 sm:px-3.5 sm:py-1.5 rounded-full border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 text-[10px] sm:text-xs font-semibold transition-all shrink-0"
            title="Detail Proyek"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Detail</span>
          </button>

          <div className="flex items-center gap-1 sm:gap-2 min-w-0 shrink">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 sm:p-2 rounded-full text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all shrink-0"
                title="Repositori GitHub"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-[9px] sm:text-xs font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-sm min-w-0 shrink overflow-hidden flex items-center gap-1"
                title={`Buka ${domain}`}
              >
                <span className="truncate text-[8.5px] sm:text-[11px] font-mono leading-none">{shortDomain}</span>
                <ArrowUpRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 shrink-0" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
