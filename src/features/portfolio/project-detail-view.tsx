import {
  Activity,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Code2,
  Cpu,
  ExternalLink,
  Github,
  Layers,
  Share2,
  Tag,
  Target,
  User,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import React, { useState } from "react";
import { useSmoothScroll } from "../../hooks";
import type { ProjectItem } from "../../types";

const getMetricTheme = (
  label: string,
  idx: number,
  customIcon?: React.ReactNode,
) => {
  const l = label.toLowerCase();
  if (l.includes("akurasi") || l.includes("model") || l.includes("accuracy")) {
    return {
      icon: customIcon || <Activity className="w-5 h-5" />,
      badge:
        "bg-indigo-50 text-indigo-600 border-indigo-200/70 dark:bg-indigo-500/15 dark:text-indigo-400 dark:border-indigo-500/30",
    };
  }
  if (
    l.includes("engine") ||
    l.includes("frontend") ||
    l.includes("architecture") ||
    l.includes("arsitektur") ||
    l.includes("core")
  ) {
    return {
      icon: customIcon || <Layers className="w-5 h-5" />,
      badge:
        "bg-sky-50 text-sky-600 border-sky-200/70 dark:bg-sky-500/15 dark:text-sky-400 dark:border-sky-500/30",
    };
  }
  if (
    l.includes("inference") ||
    l.includes("runtime") ||
    l.includes("speed") ||
    l.includes("vitals") ||
    l.includes("performance") ||
    l.includes("ux") ||
    l.includes("interactive")
  ) {
    return {
      icon: customIcon || <Zap className="w-5 h-5" />,
      badge:
        "bg-emerald-50 text-emerald-600 border-emerald-200/70 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/30",
    };
  }

  const palettes = [
    {
      icon: customIcon || <Cpu className="w-5 h-5" />,
      badge:
        "bg-indigo-50 text-indigo-600 border-indigo-200/70 dark:bg-indigo-500/15 dark:text-indigo-400 dark:border-indigo-500/30",
    },
    {
      icon: customIcon || <Code2 className="w-5 h-5" />,
      badge:
        "bg-sky-50 text-sky-600 border-sky-200/70 dark:bg-sky-500/15 dark:text-sky-400 dark:border-sky-500/30",
    },
    {
      icon: customIcon || <Layers className="w-5 h-5" />,
      badge:
        "bg-emerald-50 text-emerald-600 border-emerald-200/70 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/30",
    },
  ];
  return palettes[idx % palettes.length] || palettes[0]!;
};

interface ProjectDetailViewProps {
  project: ProjectItem;
  relatedProjects?: ProjectItem[];
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  relatedProjects = [],
}) => {
  const [copied, setCopied] = useState(false);

  // Buttery cinematic smooth scroll
  useSmoothScroll({ enabled: true });

  const handleShare = () => {
    if (typeof window === "undefined") return;
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="relative z-10 max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-24">
        {/* Navigation & Breadcrumbs Bar */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200/80 dark:border-white/10"
        >
          <a
            href="/"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 dark:bg-white/[0.06] border border-slate-200/90 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-slate-100 hover:border-slate-400 dark:hover:border-white/30 backdrop-blur-md transition-all duration-200 shadow-xs hover:shadow-sm"
            title="Kembali ke Beranda"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-slate-700 dark:text-slate-300" />
            <span>Kembali ke Beranda</span>
          </a>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-xs font-medium hover:bg-slate-100 dark:hover:bg-white/10 transition-colors shadow-xs"
              title="Salin tautan proyek"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? "Tautan Disalin! ✓" : "Bagikan"}</span>
            </button>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-xs font-medium hover:bg-slate-100 dark:hover:bg-white/10 transition-colors shadow-xs"
              >
                <Github className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Source Code</span>
              </a>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-md active:scale-95"
              >
                <span>Live Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </motion.div>

        {/* Hero Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6"
        >
          {/* Period & Category */}
          <div className="flex flex-wrap items-center gap-2">
            {project.period && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-slate-300 text-xs font-medium">
                <Calendar className="w-3 h-3 text-slate-400" />
                {project.period}
              </span>
            )}
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {project.category}
            </span>
          </div>

          {/* Project Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.1]">
            {project.title}
          </h1>

          {/* Short Lead Summary */}
          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-4xl leading-relaxed">
            {project.shortDescription}
          </p>

          {/* Meta Information Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
            <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px] font-semibold uppercase tracking-wider mb-1">
                <User className="w-3.5 h-3.5" />
                <span>Peran</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                {project.role || "Web Developer"}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px] font-semibold uppercase tracking-wider mb-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Tanggal Rilis</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                {project.publishedDate}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px] font-semibold uppercase tracking-wider mb-1">
                <Tag className="w-3.5 h-3.5" />
                <span>Kategori Utama</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                {project.category}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px] font-semibold uppercase tracking-wider mb-1">
                <Layers className="w-3.5 h-3.5" />
                <span>Status Deployment</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Terverifikasi Produksi</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Cinematic Media Showcase Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 relative group rounded-3xl overflow-hidden border border-slate-300/80 dark:border-white/15 bg-slate-950 shadow-2xl shadow-slate-950/20 dark:shadow-black/70"
        >
          <div className="relative aspect-[16/9] sm:aspect-[21/10] w-full overflow-hidden">
            <img
              src={project.imageFull || project.image}
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
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
            {/* Cinematic subtle vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

            {/* Floating Quick Action in media frame */}
            {project.demoUrl && (
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/95 text-slate-950 font-bold text-xs sm:text-sm shadow-xl hover:bg-white backdrop-blur-md transition-all hover:scale-105"
                >
                  <span>Kunjungi Situs Langsung</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </motion.div>

        {/* Engineering Metrics Highlights Strip */}
        {project.metrics && project.metrics.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {project.metrics.map((metric, idx) => {
              const theme = getMetricTheme(metric.label, idx);
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/95 dark:bg-[#111116] border border-slate-200/90 dark:border-white/10 shadow-[0_2px_12px_-3px_rgba(15,23,42,0.06)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] flex items-center gap-4 transition-all duration-200 hover:border-slate-300 dark:hover:border-white/20"
                >
                  <div
                    className={`p-3 rounded-xl border shrink-0 ${theme.badge}`}
                  >
                    {theme.icon}
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 truncate">
                      {metric.label}
                    </span>
                    <span
                      className="block text-sm sm:text-base font-black text-slate-950 dark:text-white mt-0.5 tracking-tight truncate"
                      title={metric.value}
                    >
                      {metric.value}
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* Unified Cinematic Case Study */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-10 space-y-10"
        >
          {/* Problem & Solution Split Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Context & Requirements Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-white/[0.02] border border-slate-200/90 dark:border-white/10 shadow-sm space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                <Target className="w-3.5 h-3.5" />
                <span>Latar Belakang &amp; Kebutuhan</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white">
                Konteks &amp; Kebutuhan Sistem
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {project.problem ||
                  "Setiap sistem dirancang untuk memenuhi spesifikasi kebutuhan fungsional dan teknis yang jelas - mulai dari efisiensi alur data, responsivitas antarmuka, hingga kemudahan pemeliharaan jangka panjang."}
              </p>
            </div>

            {/* Architectural Decisions & Solutions Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-white/[0.02] border border-slate-200/90 dark:border-white/10 shadow-sm space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Keputusan Rekayasa</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white">
                Pendekatan &amp; Solusi Teknis
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {project.solution ||
                  "Pendekatan teknis disesuaikan dengan karakteristik arsitektur sistem: pemilihan strategi rendering, modularitas komponen, validasi data tipe-ketat, serta integrasi deployment yang andal."}
              </p>
            </div>
          </div>

          {/* Technologies & Tags Showcase */}
          {project.tags && project.tags.length > 0 && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-white/[0.02] border border-slate-200/90 dark:border-white/10 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-indigo-500" />
                <h3 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white">
                  Teknologi &amp; Stack Rekayasa
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Alat, pustaka, dan pola arsitektur yang digunakan dalam proyek
                ini:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Related Projects Showcase Footer */}
        {relatedProjects.length > 0 && (
          <div className="mt-20 pt-12 border-t border-slate-200 dark:border-white/10 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                  Jelajahi Proyek Lainnya
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Proyek-proyek lain yang mungkin menarik buat kamu lihat
                </p>
              </div>
              <a
                href="/portfolio"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <span>Lihat Semua</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {relatedProjects.slice(0, 3).map((rel) => (
                <a
                  key={rel.id}
                  href={`/project/${rel.slug}`}
                  className="group block p-3 sm:p-4 rounded-2xl bg-white/80 dark:bg-[#0c0c0e]/80 border border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30 transition-all hover:-translate-y-1 shadow-xs"
                >
                  <div className="aspect-[16/10] rounded-xl overflow-hidden mb-2.5 bg-slate-900">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {rel.category}
                  </span>
                  <h4 className="text-[11px] sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 mt-0.5 leading-snug">
                    {rel.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-snug">
                    {rel.shortDescription}
                  </p>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
