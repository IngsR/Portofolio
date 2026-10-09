"use client";
import { ArrowRight } from "lucide-react";
import { memo } from "react";
import { ProjectItem } from "../../../types";
import { HeroCard } from "../cards/hero-card";
import { HeroPageProps } from "../types";
import { useTranslations } from "../../../i18n";
import { getDictionary } from "../../../data/locales";

/**
 * FeaturedProjectsSection - 4 proyek unggulan di Beranda.
 *
 * Grid 2 kolom di mobile & 4 kolom di desktop, tinggi kartu seragam
 * (rasio 16/10 + judul 1 baris) seperti sebelumnya.
 */
export const FeaturedProjectsSection = memo<
  HeroPageProps & {
    totalProjects: number;
    projects: ProjectItem[];
  }
>(function FeaturedProjectsSection({ totalProjects, projects, onNavigate }) {
  const { locale } = useTranslations();
  const copy = getDictionary(locale).hero.sections;
  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
        <div>
          <h2 className="ornament-underline text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white mt-1">
            {copy.portfolio}
          </h2>
        </div>

        <a
          href={locale === "en" ? "/en/portfolio" : "/portfolio"}
          onClick={(e) => {
            e.preventDefault();
            onNavigate?.("portfolio");
          }}
          className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white hover:opacity-80 flex items-center gap-1.5 px-4 py-2 rounded-full border-slate-200 dark:border-white/10"
        >
          <span>
            {copy.featuredProjects} ({totalProjects})
          </span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-4.5">
        {projects.map((project) => (
          <HeroCard key={project.id} variant="project" project={project} />
        ))}
      </div>
    </section>
  );
});
