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
      className={`atelier-surface frame-motion corner-bracket relative overflow-hidden p-4 sm:p-5 lg:p-5.5 rounded-2xl sm:rounded-3xl border border-[#36454f]/15 dark:border-white/10 flex flex-col justify-between space-y-4 hover:-translate-y-1 transition-all duration-200 shadow-xs ${borderAccent}`}
    >
      {/* Garis aksen atas - identitas warna per kartu */}
      <span
        className={`absolute inset-x-0 top-0 h-1 bg-current opacity-80 ${accent}`}
      />

      <div className="space-y-2.5">
        <div className="flex items-start justify-between gap-2 pt-1">
          <h3
            className="text-sm sm:text-base font-bold tracking-tight text-[#141f26] dark:text-white leading-snug break-words min-w-0"
          >
            {category.title}
          </h3>
          <div className="p-2 rounded-xl bg-[#E7EAEF]/80 dark:bg-white/5 border border-[#36454f]/15 dark:border-white/10 shrink-0">
            <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${accent}`} />
          </div>
        </div>

        <p className="text-xs text-[#24333d] dark:text-slate-300 leading-relaxed line-clamp-3">
          {category.description}
        </p>
      </div>

      <div className="space-y-2 pt-3 border-t border-[#36454f]/10 dark:border-white/10">
        <span className="text-[9.5px] sm:text-[10px] font-mono font-bold text-[#485966] dark:text-slate-400 uppercase tracking-wider block">
          Core Stack:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {category.coreStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-[9.5px] sm:text-[10.5px] font-mono font-semibold rounded-full bg-[#E7EAEF]/80 dark:bg-white/5 text-[#141f26] dark:text-slate-200 border border-[#36454f]/15 dark:border-white/10 hover:border-[#141f26] dark:hover:border-white transition-colors"
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
