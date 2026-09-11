"use client";
import { memo } from "react";
import { SkillCategory } from "../../../types";
import { SkillCard } from "../cards/skill-card";

/**
 * SkillsSection — grid keahlian & stack teknis di Beranda.
 * 2 kolom di mobile (2 baris) dan 4 kolom di desktop, seperti sebelumnya.
 */
export const SkillsSection = memo<{ categories: SkillCategory[] }>(
  function SkillsSection({ categories }) {
    if (categories.length === 0) return null;

    return (
      <section className="space-y-6">
        <div className="space-y-1.5 sm:space-y-2 border-b border-slate-200 dark:border-white/10 pb-3 sm:pb-4">
          <h2 className="ornament-underline text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-slate-950 dark:text-white">
            Keahlian
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {categories.map((category) => (
            <SkillCard key={category.title} category={category} />
          ))}
        </div>
      </section>
    );
  },
);
