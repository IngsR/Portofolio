"use client";
import { Code2, Cpu, Layers, Server, Terminal } from "lucide-react";
import { memo } from "react";
import { SkillCategory } from "../../../types";

/**
 * SkillCard — kartu satu kategori keahlian di Beranda.
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
  Terminal,
  Cpu: Cpu,
};

const COLOR_BY_NAME: Record<string, string> = {
  Layout: "text-sky-600 dark:text-sky-400",
  Server: "text-indigo-600 dark:text-indigo-400",
  Terminal: "text-purple-600 dark:text-purple-400",
  Cpu: "text-emerald-600 dark:text-emerald-400",
};

const DEFAULT_COLOR = "text-blue-600 dark:text-blue-400";

export const SkillCard = memo<{ category: SkillCategory }>(function SkillCard({
  category,
}) {
  const Icon = ICON_BY_NAME[category.iconName] ?? Layers;
  const iconColor = COLOR_BY_NAME[category.iconName] ?? DEFAULT_COLOR;

  return (
    <div className="p-3.5 sm:p-4 lg:p-5 rounded-2xl sm:rounded-3xl border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c0c0d] flex-col justify-between space-y-3 sm:space-y-4 hover:border-slate-400 dark:hover:border-white/30 transition-all shadow-sm">
      <div className="space-y-2 sm:space-y-2.5">
        <div className="flex items-center justify-between gap-1.5">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 truncate">
            {category.title}
          </span>
          <div className="p-1.5 sm:p-2 rounded-xl bg-slate-100 dark:bg-white/5 shrink-0">
            <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${iconColor}`} />
          </div>
        </div>

        <p className="text-[10.5px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 sm:line-clamp-3">
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
              className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[8.5px] sm:text-[10px] lg:text-[11px] font-semibold rounded-full bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-slate-200 border-slate-200/60 dark:border-white/5 truncate max-w-[100px] sm:max-w-none"
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
