"use client";
import { memo } from "react";
import { SkillCategory } from "../../../types";
import { SkillCard } from "../cards/skill-card";
import { useTranslations } from "../../../i18n";
import { getDictionary } from "../../../data/locales";

/**
 * SkillsSection - grid keahlian & stack teknis di Beranda.
 * 4 kartu: 1 kolom di HP (nyaman dibaca), 2 kolom di tablet, 4 kolom di
 * desktop agar keempat kartu seimbang dan tidak ada yang "menggantung".
 */
export const SkillsSection = memo<{ categories: SkillCategory[] }>(
  function SkillsSection({ categories }) {
    const { locale } = useTranslations();
    if (categories.length === 0) return null;

    return (
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#36454f]/15 dark:border-white/10 pb-4">
          <div className="space-y-1">
            <span className="folio-num">
              {locale === "en"
                ? "06 / Technical Skills & Competencies"
                : "06 / Keterampilan Teknis & Kompetensi"}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#141f26] dark:text-white font-serif">
              {getDictionary(locale).hero.sections.skills}
            </h2>
          </div>
          <span className="text-xs font-mono font-medium text-[#485966] dark:text-slate-400">
            {locale === "en" ? "Primary Software Stacks" : "Teknologi & Stack Utama"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {categories.map((category) => (
            <SkillCard key={category.title} category={category} />
          ))}
        </div>
      </section>
    );
  },
);
