"use client";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { memo } from "react";
import { GithubBrandIcon } from "../../../design/components/brand-icons";
import { ProjectItem } from "../../../types";
import { HeroCard } from "../cards/hero-card";
import { HeroPageProps } from "../types";
import { useTranslations } from "../../../i18n";
import { getDictionary } from "../../../data/locales";
import { getLocalePath } from "../../../utils/locale";
import { formatDomainName, formatShortDomain, getProjectLiveButtonLabel } from "../../../utils/format";

/**
 * FeaturedProjectsSection - Karya Rekayasa Pilihan di Beranda.
 *
 * Menggantikan grid 4-kolom yang sempit dengan komposisi kuratorial:
 * 1. Flagship Centerpiece: Proyek pertama (SMPN 24 Padang) tampil megah 1 baris penuh.
 * 2. Curated Gallery: Proyek berikutnya tersusun bernapas dalam grid 2-kolom mobile / 3-kolom desktop.
 */
export const FeaturedProjectsSection = memo<
  HeroPageProps & {
    totalProjects: number;
    projects: ProjectItem[];
  }
>(function FeaturedProjectsSection({ totalProjects, projects, onNavigate }) {
  const { locale } = useTranslations();
  const copy = getDictionary(locale).hero.sections;

  const flagship = projects[0];
  const galleryProjects = projects.slice(1);

  return (
    <section className="space-y-6 sm:space-y-8">
      {/* Editorial Folio Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#36454f]/15 dark:border-white/10 pb-4">
        <div className="space-y-1.5">
          <span className="folio-num block">
            {locale === "en"
              ? "03 / Selected Technical Projects"
              : "03 / Proyek Unggulan & Studi Kasus"}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#141f26] dark:text-white font-serif">
            {copy.portfolio}
          </h2>
        </div>

        <a
          href={locale === "en" ? "/en/portfolio" : "/portfolio"}
          onClick={(e) => {
            e.preventDefault();
            onNavigate?.("portfolio");
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#36454f]/25 dark:border-white/15 bg-transparent text-xs font-bold uppercase tracking-wider text-[#141f26] dark:text-white hover:bg-[#36454f]/5 dark:hover:bg-white/10 transition-all shadow-xs self-start sm:self-auto"
        >
          <span>
            {copy.featuredProjects} ({totalProjects})
          </span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* 1. Flagship Architectural Centerpiece (1 Baris Penuh di Mobile & Desktop) */}
      {flagship && (
        <div className="atelier-surface corner-bracket rounded-2xl sm:rounded-3xl p-4 sm:p-7 lg:p-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-center">
            {/* Visual Cinematic Preview */}
            <div className="lg:col-span-7">
              <a
                href={getLocalePath(`/project/${flagship.slug}`, locale)}
                className="group block relative aspect-[16/10] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900 shadow-md border border-[#36454f]/15 dark:border-white/10"
              >
                <img
                  src={flagship.imageFull || flagship.image}
                  alt={flagship.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 select-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-[#273641]/95 px-2.5 py-1 sm:px-3 rounded-full text-white text-[9.5px] sm:text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm border border-white/10">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Flagship 01</span>
                </div>
                {flagship.demoUrl && (
                  <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 bg-emerald-950/95 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 sm:px-3 rounded-full text-[9px] sm:text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{formatShortDomain(flagship.demoUrl)}</span>
                  </div>
                )}
              </a>
            </div>

            {/* Editorial Information Column */}
            <div className="lg:col-span-5 space-y-3.5 sm:space-y-4">
              <div className="space-y-1">
                <span className="text-[10.5px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#485966] dark:text-slate-400 block">
                  {flagship.category}
                </span>
                <h3 className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-[#141f26] dark:text-white tracking-tight leading-snug">
                  <a
                    href={getLocalePath(`/project/${flagship.slug}`, locale)}
                    className="hover:text-[#273641] dark:hover:text-blue-400 transition-colors"
                  >
                    {flagship.title}
                  </a>
                </h3>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl border border-[#36454f]/10 dark:border-white/10 bg-[#f3ede6]/50 dark:bg-white/[0.03]">
                <span className="text-[10.5px] sm:text-[11px] font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wide block mb-1">
                  💡 {locale === "en" ? "Engineering Solution:" : "Solusi Rekayasa:"}
                </span>
                <p className="text-xs sm:text-sm text-[#24333d] dark:text-slate-200 leading-relaxed font-medium">
                  {flagship.solution || flagship.shortDescription}
                </p>
              </div>

              {/* Stack Tags */}
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {flagship.tags?.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[10.5px] font-mono font-semibold rounded-full bg-[#f3ede6]/80 dark:bg-white/5 border border-[#36454f]/15 dark:border-white/10 text-[#141f26] dark:text-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-2 border-t border-[#36454f]/10 dark:border-white/10">
                <a
                  href={getLocalePath(`/project/${flagship.slug}`, locale)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#273641] text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-bold hover:bg-[#141f26] dark:hover:bg-white transition-all shadow-sm"
                >
                  <span>{locale === "en" ? "Explore Case Study" : "Buka Studi Kasus"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                {flagship.demoUrl && (
                  <a
                    href={flagship.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#36454f]/25 dark:border-white/15 bg-white/70 dark:bg-white/5 text-xs font-bold text-[#141f26] dark:text-white hover:bg-[#273641] hover:text-white dark:hover:bg-white dark:hover:text-slate-950 transition-all shadow-xs"
                  >
                    <span>{getProjectLiveButtonLabel(flagship, locale)}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                {flagship.githubUrl && (
                  <a
                    href={flagship.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center p-2 rounded-full border border-[#36454f]/25 dark:border-white/15 bg-white/70 dark:bg-white/5 text-[#141f26] dark:text-white hover:bg-[#273641] hover:text-white dark:hover:bg-white dark:hover:text-slate-950 transition-all shadow-xs"
                    title="GitHub Repository"
                  >
                    <GithubBrandIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Secondary Curated Gallery Grid (2 Kolom di Mobile, 4 Kolom Simetris di Desktop) */}
      {galleryProjects.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-6">
          {galleryProjects.map((project) => (
            <HeroCard key={project.id} variant="project" project={project} />
          ))}
        </div>
      )}
    </section>
  );
});
