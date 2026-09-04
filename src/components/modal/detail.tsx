import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Code2,
  ExternalLink,
  Github,
  Layers,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect } from "react";
import { CertificationItem, ProjectItem } from "../../types";
import { formatDomainName } from "../../utils/format";

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: ProjectItem | null;
  certificate?: CertificationItem | null;
  onOpenMarkdown?: (project: ProjectItem) => void;
}

export const Detail: React.FC<DetailModalProps> = ({
  isOpen,
  onClose,
  project,
  certificate,
  onOpenMarkdown,
}) => {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
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
  const itemTitle = isProject ? project.title : certificate?.title;
  const itemCategory = isProject
    ? project.category
    : certificate?.category || "Sertifikasi";
  const itemPeriod = isProject
    ? project.period || project.publishedDate
    : certificate?.period || certificate?.issueDate;
  const itemRoleOrIssuer = isProject
    ? project.role || "Junior Frontend Engineer"
    : certificate?.issuer;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
        />

        {/* Modal Container (GPU Accelerated, No Shadow Flickering) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          style={{
            transform: "translateZ(0)",
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
          }}
          className="relative w-full max-w-3xl bg-white dark:bg-[#0f0f11] rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col z-10 transform-gpu"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02]">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950">
                {isProject ? (
                  <Layers className="w-4 h-4" />
                ) : (
                  <Award className="w-4 h-4" />
                )}
              </span>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {isProject
                    ? "Detail Proyek Rekayasa"
                    : "Kredensial & Sertifikasi"}
                </span>
                <span className="mx-2 text-slate-300 dark:text-slate-700">
                  •
                </span>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {itemCategory}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Tutup Pop up"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Modal Content */}
          <div className="p-4 sm:p-6 sm:px-8 space-y-6 overflow-y-auto flex-1">
            {/* Title & Metadata */}
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 dark:text-white leading-tight">
                {itemTitle}
              </h2>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-1.5 font-medium">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>{itemRoleOrIssuer}</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{itemPeriod}</span>
                </div>
                {certificate?.badgeCode && (
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 text-[11px] font-mono font-bold text-slate-800 dark:text-slate-200">
                    <span>ID: {certificate.badgeCode}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Project Image Preview (with fallback) */}
            {isProject && project && (
              <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-white/10 group">
                <img
                  src={project.image}
                  alt={project.title}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (
                      project.fallbackImage &&
                      target.src !== project.fallbackImage
                    ) {
                      target.src = project.fallbackImage;
                    }
                  }}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg font-medium text-[11px]">
                    Foto / Tangkapan Layar Proyek
                  </span>
                  {project.demoUrl && (
                    <span className="flex items-center gap-1 bg-emerald-600/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      Tersedia Online
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Certificate Screenshot Preview */}
            {!isProject && certificate && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>Tangkapan Layar & Bukti Dokumen Sertifikat</span>
                  </span>
                  {certificate.image && (
                    <a
                      href={certificate.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>Buka Ukuran Penuh</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <div className="relative w-full aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-white/10 shadow-md">
                  <img
                    src={certificate.image}
                    alt={`Screenshot ${certificate.title}`}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (
                        certificate.fallbackImage &&
                        target.src !== certificate.fallbackImage
                      ) {
                        target.src = certificate.fallbackImage;
                      }
                    }}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg font-mono font-bold text-xs">
                      {certificate.badgeCode || "VERIFIED CREDENTIAL"}
                    </span>
                    <span className="bg-emerald-600/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Dokumen Terverifikasi
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Metrics / Highlights (If Project) */}
            {isProject && project?.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                {project.metrics.map((metric, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 space-y-0.5"
                  >
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 block">
                      {metric.label}
                    </span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Description Narrative */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{isProject ? "Apa yang Saya Bangun & Selesaikan" : "Deskripsi & Ringkasan"}</span>
              </h4>

              {isProject && project ? (
                <div className="space-y-3">
                  {/* Problem Statement */}
                  {project.problem && (
                    <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-500/5 border border-amber-200/70 dark:border-amber-500/15">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-1">Masalah yang Diselesaikan</span>
                      <p className="text-sm text-amber-900 dark:text-amber-200/90 leading-relaxed">{project.problem}</p>
                    </div>
                  )}

                  {/* Solution */}
                  {project.solution && (
                    <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200/70 dark:border-emerald-500/15">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1">Solusi Teknis yang Dibangun</span>
                      <p className="text-sm text-emerald-900 dark:text-emerald-200/90 leading-relaxed">{project.solution}</p>
                    </div>
                  )}

                  {/* Short Summary fallback */}
                  {!project.problem && !project.solution && (
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{project.shortDescription}</p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  {certificate?.description}
                </p>
              )}
            </div>

            {/* Tech Stack / Verified Skills Tags */}
            <div className="space-y-2.5 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                <span>
                  {isProject
                    ? "Teknologi & Tools yang Digunakan"
                    : "Kompetensi & Keahlian yang Tervalidasi"}
                </span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {(isProject ? project.tags : certificate?.skills || []).map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-white/5"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.02] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {isProject && project && onOpenMarkdown && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenMarkdown(project);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white hover:bg-slate-200/50 dark:hover:bg-white/10 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Buka Dokumentasi Penuh (.md)</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2.5 ml-auto">
              {isProject && project?.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              )}

              {isProject && project?.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 sm:px-5 py-2.5 rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm max-w-[220px] sm:max-w-none"
                  title={`Buka ${formatDomainName(project.demoUrl)}`}
                >
                  <span className="truncate font-mono">{formatDomainName(project.demoUrl)}</span>
                  <ExternalLink className="w-4 h-4 shrink-0" />
                </a>
              )}

              {!isProject && certificate?.credentialUrl && (
                <a
                  href={certificate.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <span>Lihat Kredensial / Bukti</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
