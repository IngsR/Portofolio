"use client";
import React, { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  X,
  ExternalLink,
  Github,
  Calendar,
  Layers,
  Award,
  Maximize2,
  ShieldCheck,
  FileText,
} from "lucide-react";
import { ProjectItem, CertificationItem } from "../../types";
import { formatDomainName, formatShortDomain } from "../../utils/format";

interface CardPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: ProjectItem | null;
  certificate?: CertificationItem | null;
  onOpenDetail?: (item: ProjectItem | CertificationItem) => void;
}

export const CardPreviewModal: React.FC<CardPreviewModalProps> = ({
  isOpen,
  onClose,
  project,
  certificate,
  onOpenDetail,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || (!project && !certificate)) return null;

  const isProject = !!project;
  const title = isProject ? project.title : certificate?.title;
  const image = isProject
    ? (project.imageFull ?? project.image)
    : certificate?.image;
  const fallbackImage = isProject
    ? project.fallbackImage
    : certificate?.fallbackImage;
  const category = isProject ? project.category : certificate?.category;
  const period = isProject
    ? project.period || project.publishedDate
    : certificate?.period || certificate?.issueDate;
  const description = isProject
    ? project.shortDescription
    : certificate?.description;
  const domain = isProject ? formatDomainName(project.demoUrl) : null;
  const shortDomain = isProject ? formatShortDomain(project.demoUrl) : null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
        />

        {/* Modal Card with Aceternity Depth */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-white dark:bg-[#0f0f12] rounded-3xl border border-slate-200/90 dark:border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden my-auto z-10 flex flex-col"
        >
          {/* Top Bar with Category & Close */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                {isProject ? (
                  <Layers className="w-3.5 h-3.5" />
                ) : (
                  <Award className="w-3.5 h-3.5" />
                )}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                {category}
              </span>
              {period && (
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  • <Calendar className="w-3 h-3" /> {period}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Tutup Preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* High-Res Image Preview Box */}
          <div className="relative w-full aspect-[16/10] bg-slate-950 flex items-center justify-center overflow-hidden group">
            <img
              src={image}
              alt={title}
              onError={(e) => {
                const target = e.currentTarget;
                if (fallbackImage && target.src !== fallbackImage) {
                  target.src = fallbackImage;
                }
              }}
              className="w-full h-full object-contain select-none transition-transform duration-300 group-hover:scale-[1.02]"
              referrerPolicy="no-referrer"
            />
            {/* Ambient image vignette */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Image Overlay Pills */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[11px] font-medium flex items-center gap-1.5">
                {isProject ? (
                  <>
                    <Maximize2 className="w-3 h-3 text-blue-400" />
                    Preview Karya
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    Kredensial Resmi
                  </>
                )}
              </span>

              {domain && (
                <span className="px-2.5 py-1 rounded-lg bg-emerald-600/90 backdrop-blur-md text-[11px] font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  {shortDomain}
                </span>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="p-5 sm:p-6 space-y-4">
            <div className="space-y-1.5">
              <h3 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white tracking-tight">
                {title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Tags for Project */}
            {isProject && project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/5 text-slate-700 dark:text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-white/10">
              <div className="flex items-center gap-2">
                {onOpenDetail && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenDetail(project || certificate!);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-900 dark:text-white text-xs font-bold transition-all"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Lihat Rincian Lengkap</span>
                  </button>
                )}

                {image && (
                  <a
                    href={image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white text-xs font-semibold transition-all"
                    title="Buka Gambar Asli"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Ukuran Penuh</span>
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2">
                {isProject && project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Repositori GitHub ${project.title}`}
                    title="Buka Repositori GitHub"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 dark:border-white/20 bg-slate-100/90 dark:bg-white/[0.08] text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/90 dark:hover:bg-white/[0.16] hover:border-slate-400 dark:hover:border-white/30 text-xs font-semibold transition-all"
                  >
                    <Github className="w-4 h-4 shrink-0 text-slate-900 dark:text-white" />
                    <span>GitHub</span>
                  </a>
                )}

                {isProject && project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 text-xs font-bold transition-all shadow-sm"
                  >
                    <span>Buka Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
