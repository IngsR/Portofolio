"use client";
import { memo } from "react";
import { useTranslations } from "../../../i18n";
import { getDictionary } from "../../../data/locales";
import { getLocalePath } from "../../../utils/locale";

/**
 * AboutSection - ringkasan identitas singkat di Beranda.
 * Open layout: tanpa card shell, konten langsung di atas halaman.
 * Dua kolom di desktop: narasi (8) + kartu fokus teknis (4).
 */
export const AboutSection = memo(function AboutSection() {
  const { locale } = useTranslations();
  const copy = getDictionary(locale).hero.aboutSummary;
  const labels = getDictionary(locale).hero.sections;

  return (
    <section className="space-y-8">
      {/* Editorial Folio Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#36454f]/15 dark:border-white/10 pb-4">
        <div className="space-y-1">
          <span className="folio-num">
            {locale === "en"
              ? "04 / Background & Engineering Approach"
              : "04 / Latar Belakang & Pendekatan Teknis"}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#141f26] dark:text-white font-serif">
            {labels.about}
          </h2>
        </div>
        <span className="text-xs font-mono font-medium text-[#485966] dark:text-slate-400">
          {locale === "en"
            ? "Foundational Disciplines & Technical Principles"
            : "Disiplin Dasar & Prinsip Rekayasa"}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Narrative editorial prose */}
        <div className="lg:col-span-7 space-y-5 text-[#24333d] dark:text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
          <p className="first-letter:text-4xl first-letter:font-serif first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:text-[#141f26] dark:first-letter:text-white">
            {copy.paragraphOne}
          </p>
          <p className="text-[15px] sm:text-base text-[#354551] dark:text-slate-300 leading-relaxed border-l-2 border-[#273641]/30 dark:border-white/20 pl-4 py-1">
            {copy.paragraphTwo}
          </p>
          <div className="pt-2">
            <a
              href={getLocalePath("/about", locale)}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#141f26] dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
            >
              <span>{locale === "en" ? "Explore full career story & philosophy" : "Eksplorasi perjalanan karir & filosofi lengkap"}</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

        {/* Engineering Focus Ledger */}
        <div className="lg:col-span-5 atelier-surface corner-bracket p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#36454f]/15 dark:border-white/10 relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#36454f]/10 dark:border-white/10">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#141f26] dark:text-white">
              {locale === "en" ? "Technical Stack & Focus" : "Fokus & Tumpukan Teknis"}
            </h3>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>

          <div className="divide-y divide-[#36454f]/10 dark:divide-white/10">
            {copy.cards.map((card, index) => (
              <div
                key={card.title}
                className="py-3.5 first:pt-0 last:pb-0 flex items-start gap-3.5 group"
              >
                <span className="text-xs font-mono font-bold text-[#273641] dark:text-blue-400 opacity-60 group-hover:opacity-100 transition-opacity pt-0.5">
                  0{index + 1}
                </span>
                <div className="space-y-0.5 min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-[#141f26] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-xs text-[#354551] dark:text-slate-300 leading-normal">
                    {card.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
