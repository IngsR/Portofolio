import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Cpu,
  FileText,
  GitCommit,
  GraduationCap,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { memo, useMemo } from "react";
import portfolioData from "../../../data/portfolio.json";
import { EncryptedText } from "../../../design/components/encrypted-text";
import { FlipWords } from "../../../design/components/flip-words";
import { MagneticButton } from "../../../design/components/magnetic-button";
import { MovingBorder } from "../../../design/components/moving-border";
import { TextGenerateEffect } from "../../../design/components/text-generate-effect";
import { UserProfile } from "../../../types";
import { CinematicViewportFx } from "../cinematic-viewport-fx";
import { ProfilePhotoCard } from "../cards/profile-photo-card";
import { AVAILABILITY_TEXT, HERO_BIO, HERO_ROLES } from "../hero.data";
import { HeroPageProps } from "../types";

/**
 * IntroSection — kartu perkenalan sinematik dengan visual mewah di light mode
 * dan ambient motion yang ringan di mobile.
 */
export const IntroSection = memo<HeroPageProps & { onOpenCV: () => void }>(
  function IntroSection({ onNavigate, onOpenCV }) {
    const userProfile = portfolioData.userProfile as unknown as UserProfile;

    const roles = useMemo(() => [...HERO_ROLES], []);

    /** Strip statistik singkat dengan ikon berkarakter */
    const stats = useMemo(
      () => [
        {
          label: "Proyek Selesai",
          shortLabel: "Proyek",
          value: `${userProfile.stats.projectsCompleted}+`,
          icon: (
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
          ),
        },
        {
          label: "Pengalaman Kerja",
          shortLabel: "Pengalaman",
          value: `${userProfile.stats.yearsExperience} Bulan`,
          icon: (
            <Briefcase className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
          ),
        },
        {
          label: "Commit per Tahun",
          shortLabel: "Commit",
          value: userProfile.stats.codeCommits,
          icon: (
            <GitCommit className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          ),
        },
      ],
      [userProfile.stats],
    );

    return (
      <section className="relative overflow-hidden rounded-3xl border border-slate-200/90 dark:border-white/10 bg-gradient-to-b from-white via-[#fdfdfe] to-[#f8f9fc] dark:from-[#0d0d10] dark:via-[#09090b] dark:to-[#08080a] backdrop-blur-md p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.03)] transition-all">
        {/* Cinematic Viewport FX — anamorphic lens flare + viewfinder HUD (desktop only for perf) */}
        <div className="hidden sm:block">
          <CinematicViewportFx />
        </div>

        {/* Cinematic ambient aurora lighting on desktop — pure CSS (tidak ada
            JS per frame seperti motion.div). Berjalan di GPU compositor di
            semua browser termasuk Firefox tanpa jank. */}
        <div
          aria-hidden
          className="pointer-events-none hidden md:block absolute -top-28 -right-28 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-300/35 via-sky-200/30 to-purple-200/20 blur-3xl dark:from-indigo-500/15 dark:via-sky-500/10 dark:to-purple-500/10 aurora-orb-1"
        />
        <div
          aria-hidden
          className="pointer-events-none hidden md:block absolute -bottom-36 -left-20 h-72 w-72 rounded-full bg-gradient-to-tr from-emerald-200/30 via-teal-200/20 to-transparent blur-3xl dark:from-emerald-500/10 dark:via-teal-500/5 dark:to-transparent aurora-orb-2"
        />
        {/* Lightweight static gradient on mobile (zero CPU/GPU overhead) */}
        <div
          aria-hidden
          className="pointer-events-none block md:hidden absolute -top-16 -right-16 h-48 w-48 rounded-full bg-sky-200/30 blur-2xl dark:bg-sky-500/10"
        />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Kolom kiri: ringkasan 60 detik pertama */}
          <div className="lg:col-span-7 space-y-2 sm:space-y-3">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-50/80 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{AVAILABILITY_TEXT}</span>
              </div>

            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.08]">
                <EncryptedText
                  text={userProfile.name}
                  className="font-black tracking-tight text-slate-950 dark:text-white"
                  revealDelay={40}
                />
              </h1>
              {/* min-h dikunci (1 baris mobile / desktop) agar pergantian kata
                FlipWords tidak menggeser layout halaman naik-turun */}
              <div className="min-h-[1.9rem] sm:min-h-[2.5rem] flex items-center text-lg sm:text-3xl font-extrabold gap-2 tracking-tight">
                <FlipWords
                  words={roles}
                  className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500 dark:from-indigo-400 dark:via-sky-300 dark:to-emerald-400"
                />
              </div>
            </div>

            <TextGenerateEffect
              words={HERO_BIO}
              className="text-black dark:text-slate-300 text-base sm:text-lg max-w-4xl font-medium"
              wordClassName="text-black dark:text-slate-300 font-medium"
              duration={0.4}
              delay={0.06}
            />

            {/* Highlight singkat */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-start gap-2.5 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/95 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 shadow-xs">
                <MapPin className="w-4 h-4 text-indigo-500 dark:text-indigo-400 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <span className="font-bold block text-slate-900 dark:text-white text-xs sm:text-sm">
                    Kesiapan Kerja:
                  </span>
                  <span className="text-slate-600 dark:text-slate-400 text-[11px] sm:text-xs leading-relaxed block">
                    On-Site (WFO) Seluruh Indonesia &amp; Remote
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/95 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 shadow-xs">
                <GraduationCap className="w-4 h-4 text-sky-500 dark:text-sky-400 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <span className="font-bold block text-slate-900 dark:text-white text-xs sm:text-sm">
                    Pendidikan Akademis:
                  </span>
                  <span className="text-slate-600 dark:text-slate-400 text-[11px] sm:text-xs leading-relaxed block">
                    S1 Teknik Informatika - UPI &ldquo;YPTK&rdquo; (IPK 3.26)
                  </span>
                </div>
              </div>
            </div>

            {/* Strip statistik — grid 3 kolom, ritme angka nyata di bawah bio */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl sm:rounded-2xl bg-white/95 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 p-2 sm:p-3 text-left shadow-xs hover:border-slate-300 dark:hover:border-white/20 transition-all duration-200"
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate">
                      <span className="sm:hidden">{stat.shortLabel}</span>
                      <span className="hidden sm:inline">{stat.label}</span>
                    </span>
                    <span className="shrink-0">{stat.icon}</span>
                  </div>
                  <span className="block text-sm sm:text-xl font-black tracking-tight text-slate-950 dark:text-white truncate">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA — layout seimbang & proporsional */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 pt-2">
              {/* Baris 1 mobile: Portofolio hitam & WhatsApp berdampingan seimbang 50:50 */}
              <div className="grid grid-cols-2 gap-2.5 w-full sm:w-auto sm:flex sm:items-center sm:gap-3">
                {/* Portofolio */}
                <MagneticButton strength={0.25} className="w-full sm:w-auto">
                  <a
                    id="hero-view-portfolio-btn"
                    href="/portfolio"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate?.("portfolio");
                    }}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs font-bold bg-slate-950 text-white dark:bg-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>Portofolio</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </MagneticButton>

                {/* WhatsApp */}
                <MagneticButton strength={0.25} className="w-full sm:w-auto">
                  <a
                    id="hero-whatsapp-btn"
                    href={userProfile.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-full border border-emerald-600/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>WhatsApp</span>
                  </a>
                </MagneticButton>
              </div>

              {/* Tombol CV: Kapsul proporsional (w-fit auto-width, tidak pernah melebar penuh) */}
              <div className="w-full flex justify-center sm:w-auto">
                <MovingBorder
                  containerClassName="h-auto w-fit rounded-full shrink-0 shadow-xs"
                  onClick={onOpenCV}
                  className="px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-semibold flex items-center gap-2 rounded-full whitespace-nowrap"
                  duration={3500}
                >
                  <FileText className="w-3.5 h-3.5 shrink-0 text-slate-600 dark:text-slate-300" />
                  <span>Curriculum Vitae</span>
                </MovingBorder>
              </div>
            </div>
          </div>

          {/* Kolom kanan: kartu foto profil + floating HUD chips di desktop */}
          <div className="lg:col-span-5 flex justify-center relative">
            {/* Desktop-only floating chips — pure CSS bounce animation */}
            <div
              className="hidden xl:flex absolute -top-3 -left-6 z-20 items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/95 dark:bg-[#121216]/95 border border-slate-200/90 dark:border-white/15 shadow-[0_8px_20px_-4px_rgba(15,23,42,0.1)] dark:shadow-black/60 backdrop-blur-md text-[11px] font-bold text-slate-800 dark:text-white pointer-events-none float-chip-1"
            >
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Next.js 15 &amp; React 19</span>
            </div>

            <div
              className="hidden xl:flex absolute -bottom-2 -right-5 z-20 items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/95 dark:bg-[#121216]/95 border border-slate-200/90 dark:border-white/15 shadow-[0_8px_20px_-4px_rgba(15,23,42,0.1)] dark:shadow-black/60 backdrop-blur-md text-[11px] font-bold text-slate-800 dark:text-white pointer-events-none float-chip-2"
            >
              <Cpu className="w-3.5 h-3.5 text-indigo-500" />
              <span>Fullstack &amp; Architecture</span>
            </div>

            <ProfilePhotoCard userProfile={userProfile} />
          </div>
        </div>
      </section>
    );
  },
);
