"use client";
import { GraduationCap } from "lucide-react";
import { memo } from "react";
import { EducationItem } from "../../../types";
import { useTranslations } from "../../../i18n";
import { getDictionary } from "../../../data/locales";

/**
 * EducationSection - riwayat pendidikan S1 di Beranda.
 * Open layout: tanpa card shell, konten langsung di atas halaman.
 */
export const EducationSection = memo<{ items: EducationItem[] }>(
  function EducationSection({ items }) {
    const { locale } = useTranslations();
    if (items.length === 0) return null;

    return (
      <section className="space-y-6">
        {/* Folio Editorial Header */}
        <div className="space-y-1.5 border-b border-[#36454f]/15 dark:border-white/10 pb-4">
          <span className="folio-num block">
            {locale === "en"
              ? "02 / Academic Background & Education"
              : "02 / Latar Belakang Pendidikan"}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#141f26] dark:text-white font-serif">
            {getDictionary(locale).hero.sections.education}
          </h2>
        </div>

        <div className="space-y-5">
          {items.map((edu) => (
            <div
              key={edu.id}
              className="atelier-surface corner-bracket rounded-3xl p-6 sm:p-8 space-y-4"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#36454f]/10 dark:border-white/10 pb-4">
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border border-[#36454f]/15 dark:border-white/20 flex items-center justify-center p-1.5 shrink-0 shadow-sm overflow-hidden">
                    {edu.institution.toLowerCase().includes("yptk") || edu.institution.toLowerCase().includes("putra indonesia") ? (
                      <img
                        src="/upi-yptk.svg"
                        alt={edu.institution}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full rounded-xl bg-[#273641] text-white dark:bg-slate-100 dark:text-slate-900 flex items-center justify-center">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-extrabold text-lg sm:text-xl text-[#141f26] dark:text-white tracking-tight">
                      {edu.degree}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#354551] dark:text-slate-300">
                      {edu.institution}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-[#36454f]/10 text-[#273641] dark:bg-white/10 dark:text-white border border-[#36454f]/15 dark:border-white/15">
                    {edu.period}
                  </span>
                  {edu.gpa && (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-600/10 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-600/25">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {locale === "en" ? "GPA" : "IPK"} {edu.gpa}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#24333d] dark:text-slate-200 leading-[1.7] font-medium max-w-4xl">
                {edu.details}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  },
);
