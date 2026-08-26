import { ArrowUpRight, Calendar, FileText, Github } from "lucide-react";
import React from "react";
import { ProjectItem } from "../types";

interface ProjectCardProps {
  project: ProjectItem;
  onOpenDetail: (project: ProjectItem) => void;
  onOpenMarkdown?: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenDetail,
  onOpenMarkdown,
}) => {
  return (
    <div
      className="group flex flex-col bg-white dark:bg-[#0f0f11] border border-slate-200/80 dark:border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden hover:border-slate-400 dark:hover:border-white/30 hover:shadow-lg transition-all duration-200 shadow-sm cursor-pointer"
      onClick={() => onOpenDetail(project)}
    >
      {/* Screenshot / Cover Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-[#141416] p-2 sm:p-2.5 flex items-center justify-center border-b border-slate-100 dark:border-white/10">
        <img
          src={project.image}
          alt={project.title}
          onError={(e) => {
            const target = e.currentTarget;
            if (project.fallbackImage && target.src !== project.fallbackImage) {
              target.src = project.fallbackImage;
            }
          }}
          className="w-full h-full object-contain object-center rounded-xl bg-white dark:bg-black/20"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Clean Category Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 pointer-events-none">
          <span className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-slate-950/85 text-white dark:bg-white/90 dark:text-slate-950 backdrop-blur-md shadow-xs">
            {project.category}
          </span>
        </div>

        {/* Live Indicator if demo available */}
        {project.demoUrl && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-lg bg-emerald-600/90 text-white backdrop-blur-md shadow-xs pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>Online</span>
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {project.period || project.publishedDate}
            </span>
            <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
              {project.role || "Full-Stack"}
            </span>
          </div>

          <h3 className="font-bold text-base sm:text-lg text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 tracking-tight leading-snug transition-colors">
            {project.title}
          </h3>

          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* Metrics Highlight */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-3 gap-2 py-2 px-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 text-center">
            {project.metrics.map((metric, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {metric.value}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags
            .filter((tag) => tag.trim())
            .slice(0, 4)
            .map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] rounded-md text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 font-medium"
              >
                {tag}
              </span>
            ))}
          {project.tags.filter((tag) => tag.trim()).length > 4 && (
            <span className="px-1.5 py-0.5 text-[10px] text-slate-400 font-medium">
              +{project.tags.filter((tag) => tag.trim()).length - 4}
            </span>
          )}
        </div>

        {/* Action Buttons Row */}
        <div
          className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-2"
          onClick={(e) => e.stopPropagation()} // Prevent card double triggering
        >
          <button
            onClick={() => onOpenDetail(project)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 text-xs font-semibold transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Detail Lengkap</span>
          </button>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
                title="Repositori GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-sm"
                title="Buka Live Demo"
              >
                <span>Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
