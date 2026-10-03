"use client";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  Code2,
  Cpu,
  ExternalLink,
  Github,
  Layers,
  Moon,
  Share2,
  ShieldCheck,
  Sun,
  Tag,
  Target,
  User,
  Zap,
} from "lucide-react";
import React, { useState } from "react";
import { useTheme } from "../../hooks/use-theme";
import type { CertificationItem, ProjectItem } from "../../types";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Beralih ke Mode Terang" : "Beralih ke Mode Gelap"}
      title={isDark ? "Beralih ke Mode Terang" : "Beralih ke Mode Gelap"}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/90 dark:bg-white/[0.06] border border-slate-200/90 dark:border-white/10 text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-950 active:scale-90 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white shadow-xs"
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-amber-400" />
      ) : (
        <Moon className="h-4 w-4 text-slate-700" />
      )}
    </button>
  );
};


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
  if (l.includes("penerbit")) {
    return {
      icon: customIcon || <Building2 className="w-5 h-5" />,
      badge:
        "bg-indigo-50 text-indigo-600 border-indigo-200/70 dark:bg-indigo-500/15 dark:text-indigo-400 dark:border-indigo-500/30",
    };
  }
  if (l.includes("kredensial") || l.includes("nomor")) {
    return {
      icon: customIcon || <ShieldCheck className="w-5 h-5" />,
      badge:
        "bg-sky-50 text-sky-600 border-sky-200/70 dark:bg-sky-500/15 dark:text-sky-400 dark:border-sky-500/30",
    };
  }
  if (l.includes("berlaku") || l.includes("status")) {
    return {
      icon: customIcon || <CheckCircle2 className="w-5 h-5" />,
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

export interface UniversalDetailViewProps {
  project?: ProjectItem | null;
  certificate?: CertificationItem | null;
  relatedProjects?: ProjectItem[];
  relatedCertificates?: CertificationItem[];
  backHref?: string;
  backLabel?: string;
  onBack?: () => void;
}

/**
 * UniversalDetailView — Komponen detail sinematik yang reusable
 * untuk Proyek Portofolio maupun Kredensial Sertifikasi.
 */
export const UniversalDetailView: React.FC<UniversalDetailViewProps> = ({
  project,
  certificate,
  relatedProjects = [],
  relatedCertificates = [],
  backHref,
  backLabel,
  onBack,
}) => {
  const isProject = !!project;
  const item = project || certificate;

  const [copied, setCopied] = useState(false);

  if (!item) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center p-8 text-center">
        <p className="text-slate-500 dark:text-slate-400">
          Data detail tidak ditemukan.
        </p>
      </div>
    );
  }

  const handleShare = () => {
    if (typeof window === "undefined") return;
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // Field mapping
  const title = isProject ? project!.title : certificate!.title;
  const category = isProject
    ? project!.category
    : certificate!.category || "Sertifikasi Resmi";
  const period = isProject
    ? project!.period || project!.publishedDate
    : certificate!.period || certificate!.issueDate;
  const description = isProject
    ? project!.shortDescription
    : certificate!.description ||
      `Kredensial sertifikasi profesional resmi yang diterbitkan oleh ${certificate!.issuer}.`;
  const image = isProject
    ? project!.imageFull || project!.image
    : certificate!.image;
  const fallbackImage = isProject
    ? project!.fallbackImage
    : certificate!.fallbackImage;

  // Resolved back navigation
  const resolvedBackHref = backHref || (isProject ? "/" : "/portfolio");
  const resolvedBackLabel =
    backLabel || (isProject ? "Kembali ke Beranda" : "Kembali ke Portofolio");

  // Certificate metrics helper
  const certificateMetrics = !isProject && certificate
    ? [
        {
          label: "Penerbit Kredensial",
          value: certificate.issuer,
          icon: <Building2 className="w-5 h-5" />,
        },
        {
          label: "Nomor / ID Kredensial",
          value: certificate.badgeCode || "Terverifikasi",
          icon: <ShieldCheck className="w-5 h-5 text-indigo-500" />,
        },
        {
          label: "Masa Berlaku",
          value: certificate.period || "Aktif / Seumur Hidup",
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
        },
      ]
    : [];

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Background cinematic aura & ambient glow */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-indigo-500/15 via-sky-500/10 to-transparent blur-[120px] rounded-full dark:from-indigo-500/20 dark:via-sky-500/15" />
        <div className="absolute top-[35%] -left-32 w-[450px] h-[450px] bg-emerald-500/10 blur-[100px] rounded-full dark:bg-emerald-500/10" />
      </div>

      <div className="relative z-10 max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-24">
        {/* Navigation & Breadcrumbs Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200/80 dark:border-white/10">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 dark:bg-white/[0.06] border border-slate-200/90 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-slate-100 hover:border-slate-400 dark:hover:border-white/30 backdrop-blur-md transition-all duration-200 shadow-xs hover:shadow-sm"
              title={resolvedBackLabel}
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-slate-700 dark:text-slate-300" />
              <span>{resolvedBackLabel}</span>
            </button>
          ) : (
            <a
              href={resolvedBackHref}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 dark:bg-white/[0.06] border border-slate-200/90 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-slate-100 hover:border-slate-400 dark:hover:border-white/30 backdrop-blur-md transition-all duration-200 shadow-xs hover:shadow-sm"
              title={resolvedBackLabel}
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-slate-700 dark:text-slate-300" />
              <span>{resolvedBackLabel}</span>
            </a>
          )}

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/90 dark:bg-white/[0.06] border border-slate-200/90 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors shadow-xs"
              title="Salin tautan"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? "Tautan Disalin! ✓" : "Bagikan"}</span>
            </button>

            {isProject && project?.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/90 dark:bg-white/[0.06] border border-slate-200/90 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors shadow-xs"
              >
                <Github className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Source Code</span>
              </a>
            )}

            {isProject && project?.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-md active:scale-95"
              >
                <span>Live Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}

            {!isProject && certificate?.credentialUrl && (
              <a
                href={certificate.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-md active:scale-95"
              >
                <span>Verifikasi Penerbit</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Hero Header Section */}
        <div className="space-y-6">
          {/* Period & Category */}
          <div className="flex flex-wrap items-center gap-2">
            {period && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-slate-300 text-xs font-medium">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>{period}</span>
              </span>
            )}
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {isProject ? category : certificate?.category || "Sertifikasi"}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.12]">
            {title}
          </h1>

          {/* Lead Summary */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-4xl leading-relaxed">
            {description}
          </p>

          {/* Meta Information Grid (4 Cards) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white/95 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 shadow-xs">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px] font-semibold uppercase tracking-wider mb-1">
                {isProject ? (
                  <User className="w-3.5 h-3.5 text-indigo-500" />
                ) : (
                  <Building2 className="w-3.5 h-3.5 text-indigo-500" />
                )}
                <span>{isProject ? "Peran" : "Penerbit"}</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                {isProject
                  ? project?.role || "Web Developer"
                  : certificate?.issuer}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/95 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 shadow-xs">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px] font-semibold uppercase tracking-wider mb-1">
                <Calendar className="w-3.5 h-3.5 text-sky-500" />
                <span>{isProject ? "Tanggal Rilis" : "Tanggal Terbit"}</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                {isProject ? project?.publishedDate : certificate?.issueDate}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/95 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 shadow-xs">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px] font-semibold uppercase tracking-wider mb-1">
                {isProject ? (
                  <Tag className="w-3.5 h-3.5 text-purple-500" />
                ) : (
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-500" />
                )}
                <span>{isProject ? "Kategori" : "ID Kredensial"}</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate font-mono">
                {isProject
                  ? project?.category
                  : certificate?.badgeCode || "TERVERIFIKASI"}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/95 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 shadow-xs">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px] font-semibold uppercase tracking-wider mb-1">
                <Layers className="w-3.5 h-3.5 text-emerald-500" />
                <span>Status</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>
                  {isProject ? "Terverifikasi Produksi" : "Resmi & Berlaku"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Media Showcase Frame */}
        {image && (
          <div className="mt-10 relative group rounded-3xl overflow-hidden border border-slate-300/80 dark:border-white/15 bg-slate-950 shadow-2xl shadow-slate-950/20 dark:shadow-black/70">
            <div
              className={`relative w-full overflow-hidden ${
                isProject
                  ? "aspect-[16/9] sm:aspect-[21/10]"
                  : "aspect-[16/11] sm:aspect-[16/10] bg-white flex items-center justify-center p-3 sm:p-6"
              }`}
            >
              <img
                src={image}
                alt={title}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (fallbackImage && target.src !== fallbackImage) {
                    target.src = fallbackImage;
                  }
                }}
                className={`w-full h-full ${
                  isProject
                    ? "object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                    : "object-contain object-center rounded-xl select-none"
                }`}
              />

              {isProject && (
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              )}

              {/* Floating Quick Action */}
              {isProject && project?.demoUrl && (
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

              {!isProject && certificate?.credentialUrl && (
                <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
                  <a
                    href={certificate.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950 font-bold text-xs sm:text-sm shadow-xl hover:opacity-90 backdrop-blur-md transition-all hover:scale-105"
                  >
                    <span>Verifikasi Kredensial Asli</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Metrics Strip */}
        {isProject && project?.metrics && project.metrics.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
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
          </div>
        )}

        {!isProject && certificateMetrics.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {certificateMetrics.map((metric, idx) => {
              const theme = getMetricTheme(metric.label, idx, metric.icon);
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
                      className="block text-sm sm:text-base font-extrabold text-slate-950 dark:text-white mt-0.5 tracking-tight truncate"
                      title={metric.value}
                    >
                      {metric.value}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Unified Cinematic Case Study & Verification */}
        <div className="mt-10 space-y-10">
          {isProject ? (
            <>
              {/* Problem & Solution for Projects */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-white/[0.02] border border-slate-200/90 dark:border-white/10 shadow-sm space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                    <Target className="w-3.5 h-3.5" />
                    <span>Latar Belakang &amp; Kebutuhan</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white">
                    Konteks &amp; Kebutuhan Sistem
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {project?.problem ||
                      "Setiap sistem dirancang untuk memenuhi spesifikasi kebutuhan fungsional dan teknis yang jelas — mulai dari efisiensi alur data, responsivitas antarmuka, hingga kemudahan pemeliharaan jangka panjang."}
                  </p>
                </div>

                <div className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-white/[0.02] border border-slate-200/90 dark:border-white/10 shadow-sm space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Keputusan Rekayasa</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white">
                    Pendekatan &amp; Solusi Teknis
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {project?.solution ||
                      "Pendekatan teknis disesuaikan dengan karakteristik arsitektur sistem: pemilihan strategi rendering, modularitas komponen, validasi data tipe-ketat, serta integrasi deployment yang andal."}
                  </p>
                </div>
              </div>

              {/* Tech Stack tags */}
              {project?.tags && (
                <div className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-white/[0.02] border border-slate-200/90 dark:border-white/10 shadow-sm space-y-4">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-indigo-500" />
                    <h3 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white">
                      Teknologi &amp; Stack Rekayasa
                    </h3>
                  </div>
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
            </>
          ) : (
            <>
              {/* Certificate Curriculum & Competency breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-white/[0.02] border border-slate-200/90 dark:border-white/10 shadow-sm space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                    <Award className="w-3.5 h-3.5" />
                    <span>Standar Kurikulum</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white">
                    Deskripsi &amp; Cakupan Materi
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {certificate?.description ||
                      "Sertifikasi ini mencakup materi teknis yang diuji secara terstruktur — bukan sekadar menonton video, tapi memahami konsep dan bisa menerapkannya di konteks nyata."}
                  </p>
                </div>

                <div className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-white/[0.02] border border-slate-200/90 dark:border-white/10 shadow-sm space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Kredibilitas Penerbit</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white">
                    {certificate?.issuer}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    Diterbitkan secara resmi dengan identitas kredensial{" "}
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      {certificate?.badgeCode || "Terverifikasi"}
                    </span>
                    . Sertifikasi ini menjadi bukti kompetensi teknis yang dapat diverifikasi oleh HRD dan tim engineering.
                  </p>
                </div>
              </div>

              {/* Skills tags for certificate */}
              {certificate?.skills && certificate.skills.length > 0 && (
                <div className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-white/[0.02] border border-slate-200/90 dark:border-white/10 shadow-sm space-y-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-indigo-500" />
                    <h3 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white">
                      Keahlian &amp; Topik yang Dikuasai
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {certificate.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:border-emerald-400 dark:hover:border-emerald-500/50 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Verification & Official Document Preview directly visible */}
              <div className="p-6 sm:p-10 rounded-3xl bg-white/95 dark:bg-[#0c0c0e] border border-slate-200/90 dark:border-white/10 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/10 pb-5">
                  <div>
                    <h3 className="text-xl font-bold text-slate-950 dark:text-white">
                      Verifikasi Resmi &amp; Bukti Sertifikat
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      Kredensial dapat divalidasi langsung melalui portal resmi penerbit
                    </p>
                  </div>

                  {certificate?.credentialUrl && (
                    <a
                      href={certificate.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-md shrink-0"
                    >
                      <span>Buka Halaman Verifikasi</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {certificate?.image && (
                  <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-white p-2 sm:p-4 flex items-center justify-center">
                    <img
                      src={certificate.image}
                      alt={title}
                      className="w-full max-h-[600px] object-contain rounded-lg"
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Related Items Showcase Footer */}
        {isProject && relatedProjects.length > 0 && (
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
                  className="group block p-3 sm:p-4 rounded-2xl bg-white/90 dark:bg-[#0c0c0e]/80 border border-slate-200/90 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30 transition-all hover:-translate-y-1 shadow-xs hover:shadow-md"
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

        {!isProject && relatedCertificates.length > 0 && (
          <div className="mt-20 pt-12 border-t border-slate-200 dark:border-white/10 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                  Sertifikasi &amp; Kredensial Lainnya
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Sertifikat dan pencapaian lainnya yang pernah saya selesaikan
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
              {relatedCertificates.slice(0, 3).map((rel) => (
                <a
                  key={rel.id}
                  href={`/certificate/${rel.id}`}
                  className="group block p-3 sm:p-4 rounded-2xl bg-white/90 dark:bg-[#0c0c0e]/80 border border-slate-200/90 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30 transition-all hover:-translate-y-1 shadow-xs hover:shadow-md"
                >
                  <div className="aspect-[16/11] rounded-xl overflow-hidden mb-2.5 bg-white border border-slate-200/80 dark:border-white/10 p-1.5 sm:p-2 flex items-center justify-center">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      loading="lazy"
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    {rel.issuer}
                  </span>
                  <h4 className="text-[11px] sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 mt-0.5 leading-snug">
                    {rel.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-snug">
                    {rel.description || rel.category}
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
