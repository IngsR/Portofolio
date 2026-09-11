"use client";
import { GraduationCap } from "lucide-react";
import { memo } from "react";
import { EducationItem } from "../../../types";

/**
 * EducationSection — riwayat pendidikan S1 di Beranda.
 * Struktur kartu (badge periode + IPK) identik dengan tampilan sebelumnya.
 */
export const EducationSection = memo<{ items: EducationItem[] }>(
  function EducationSection({ items }) {
    if (items.length === 0) return null;

    return (
      <section className="rounded-3xl border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#0c0c0d] p-6 sm:p-10 shadow-sm space-y-6">
        <div className="space-y-2 border-b border-slate-200 dark:border-white/10 pb-4">
          <h2 className="ornament-underline text-xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white">
            Pendidikan Perguruan Tinggi (S1)
          </h2>
        </div>

        <div className="space-y-4">
          {items.map((edu) => (
            <div
              key={edu.id}
              className="p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border-slate-200/80 dark:border-white/10 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-slate-950 dark:text-white">
                      {edu.degree}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {edu.institution}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 w-fit">
                    {edu.period}
                  </span>
                  {edu.gpa && (
                    <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 w-fit">
                      IPK {edu.gpa}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {edu.details}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  },
);
