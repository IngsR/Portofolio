"use client";
import { memo } from "react";
import { SUMMARY_CARD_CLASSES, SUMMARY_TEXT_CLASSES } from "../hero.data";
import { useTranslations } from "../../../i18n";
import { getDictionary } from "../../../data/locales";

/**
 * AboutSection - ringkasan identitas singkat di Beranda.
 * Dua kolom di desktop: narasi (8) + kartu fokus teknis (4).
 */
export const AboutSection = memo(function AboutSection() {
  const { locale } = useTranslations();
  const copy = getDictionary(locale).hero.aboutSummary;
  const labels = getDictionary(locale).hero.sections;
  return (
    <section className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#0c0c0d]/75 backdrop-blur-md p-6 sm:p-10 shadow-sm space-y-6">
      <div className="space-y-2 border-b border-slate-200 dark:border-white/10 pb-4">
        <h2 className="ornament-underline text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white">
          {labels.about}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-4 text-black dark:text-slate-300 text-[15px] sm:text-base leading-relaxed font-medium">
          <p>{copy.paragraphOne}</p>
          <p>{copy.paragraphTwo}</p>
        </div>

        <div className="lg:col-span-4 grid grid-cols-2 gap-3 text-xs">
          {copy.cards.map((card, index) => {
            const cardClass = SUMMARY_CARD_CLASSES[index] ?? "";
            const textClass =
              SUMMARY_TEXT_CLASSES[index] ?? SUMMARY_TEXT_CLASSES[0];

            return (
              <div
                key={card.title}
                className={`p-4 rounded-2xl border space-y-1 hover:shadow-md hover:-translate-y-0.5 transition-all ${cardClass}`}
              >
                <span className={`font-bold block ${textClass?.title ?? ""}`}>
                  {card.title}
                </span>
                <span className={textClass?.subtitle ?? ""}>
                  {card.subtitle}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
