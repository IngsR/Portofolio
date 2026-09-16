"use client";
import { memo } from "react";
import {
  HERO_SUMMARY_CARDS,
  SUMMARY_CARD_CLASSES,
  SUMMARY_TEXT_CLASSES,
} from "../hero.data";

/**
 * AboutSection — ringkasan identitas singkat di Beranda.
 * Dua kolom di desktop: narasi (8) + kartu fokus teknis (4).
 */
export const AboutSection = memo(function AboutSection() {
  return (
    <section className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#0c0c0d]/75 backdrop-blur-md p-6 sm:p-10 shadow-sm space-y-6">
      <div className="space-y-2 border-b border-slate-200 dark:border-white/10 pb-4">
        <h2 className="ornament-underline text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white">
          Tentang Saya
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-4 text-black dark:text-slate-300 text-[15px] sm:text-base leading-relaxed font-medium">
          <p>
            Saya{" "}
            <strong className="text-slate-950 dark:text-white font-bold">
              Ikhwan Ramadhan
            </strong>
            , lulusan S1 Teknik Informatika Universitas Putra Indonesia
            &ldquo;YPTK&rdquo; Padang dengan konsentrasi{" "}
            <strong className="text-slate-950 dark:text-white font-bold">
              Data Science
            </strong>
            . Ketertarikan saya berkembang dari eksplorasi data dan AI/ML hingga
            pengembangan aplikasi web yang lebih dekat dengan proses membangun
            produk secara langsung.
          </p>
          <p>
            Bagi saya, development bukan sekadar membuat sesuatu berjalan,
            tetapi juga memahami{" "}
            <strong className="text-slate-950 dark:text-white font-bold">
              mengapa sesuatu tidak berjalan
            </strong>
            , mencari penyebabnya, dan menemukan cara yang lebih baik untuk
            menyelesaikannya. Karena itu, saya terus mengeksplorasi teknologi
            dan pendekatan baru melalui berbagai project yang saya kerjakan.
          </p>
        </div>

        <div className="lg:col-span-4 grid-cols-2 gap-3 text-xs">
          {HERO_SUMMARY_CARDS.map((card, index) => {
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
