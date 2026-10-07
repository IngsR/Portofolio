"use client";
import { Code2, Cpu, Layers, Server, ShieldCheck } from "lucide-react";
import { memo } from "react";
import { SkillCategory } from "../../../types";

/**
 * SkillCard - kartu satu kategori keahlian di Beranda.
 *
 * Hanya warna ikon yang di-mapping dari JSON (kelas Tailwind literal, jadi
 * tetap terdeteksi compiler), sedangkan elemen ikon dibuat di sini agar
 * berkas data tetap bebas JSX.
 */
const ICON_BY_NAME: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Layout: Code2,
  Server,
  Shield: ShieldCheck,
  Cpu: Cpu,
};

/** Aksen warna per kartu: ikon + judul + garis atas (4 kartu = 4 identitas) */
const ACCENT_BY_NAME: Record<string, string> = {
  Layout: "text-sky-600 dark:text-sky-400",
  Server: "text-indigo-600 dark:text-indigo-400",
  Shield: "text-emerald-600 dark:text-emerald-400",
  Cpu: "text-amber-600 dark:text-amber-400",
};

const BORDER_ACCENT_BY_NAME: Record<string, string> = {
  Layout: "hover:border-sky-400/80 dark:hover:border-sky-400/50",
  Server: "hover:border-indigo-400/80 dark:hover:border-indigo-400/50",
  Shield: "hover:border-emerald-400/80 dark:hover:border-emerald-400/50",
  Cpu: "hover:border-amber-400/80 dark:hover:border-amber-400/50",
};

const DEFAULT_ACCENT = "text-blue-600 dark:text-blue-400";
const DEFAULT_BORDER_ACCENT =
  "hover:border-blue-400/80 dark:hover:border-blue-400/50";

export const SkillCard = memo<{ category: SkillCategory }>(function SkillCard({
  category,
}) {
  const Icon = ICON_BY_NAME[category.iconName] ?? Layers;
  const accent = ACCENT_BY_NAME[category.iconName] ?? DEFAULT_ACCENT;
  const borderAccent =
    BORDER_ACCENT_BY_NAME[category.iconName] ?? DEFAULT_BORDER_ACCENT;

  return (
    <div
      className={`relative overflow-hidden p-3.5 sm:p-4 lg:p-5 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#0c0c0d]/75 backdrop-blur-md flex flex-col justify-between space-y-3 sm:space-y-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${borderAccent}`}
    >
      {/* Garis aksen atas - identitas warna per kartu */}
      <span
        className={`absolute inset-x-0 top-0 h-0.5 bg-current opacity-70 ${accent}`}
      />

      <div className="space-y-2 sm:space-y-2.5">
        <div className="flex items-start justify-between gap-2">
          {/* Judul: teks natural tanpa uppercase berlebihan */}
          <h3
            className={`text-xs sm:text-sm font-bold tracking-tight leading-snug break-words min-w-0 ${accent}`}
          >
            {category.title}
          </h3>
          <div className="p-1.5 sm:p-2 rounded-xl bg-slate-100 dark:bg-white/5 shrink-0">
            <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${accent}`} />
          </div>
        </div>

        <p className="text-[10.5px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
          {category.description}
        </p>
      </div>

      <div className="space-y-1.5 sm:space-y-2 pt-2 border-t border-slate-100 dark:border-white/5">
        <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Core Stack:
        </span>
        <div className="flex flex-wrap gap-1 sm:gap-1.5">
          {category.coreStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[8.5px] sm:text-[10px] lg:text-[11px] font-semibold rounded-full bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-white/5 hover:border-current transition-colors"
              title={tech}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});
