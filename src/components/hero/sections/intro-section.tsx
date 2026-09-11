"use client";
import {
  ArrowRight,
  FileText,
  GraduationCap,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { memo } from "react";
import portfolioData from "../../../data/portfolio.json";
import { EncryptedText } from "../../../design/components/encrypted-text";
import { FlipWords } from "../../../design/components/flip-words";
import { MagneticButton } from "../../../design/components/magnetic-button";
import { MovingBorder } from "../../../design/components/moving-border";
import { Sparkles } from "../../../design/components/sparkles";
import { TextGenerateEffect } from "../../../design/components/text-generate-effect";
import { UserProfile } from "../../../types";
import { AVAILABILITY_TEXT, HERO_BIO, HERO_ROLES } from "../hero.data";
import { HeroPageProps } from "../types";
import { ProfilePhotoCard } from "../cards/profile-photo-card";

/**
 * IntroSection — kartu perkenalan (kiri: nama, peran, bio, CTA; kanan: foto).
 *
 * Layout & animasi dipertahankan apa adanya:
 * - EncryptedText untuk nama, FlipWords untuk peran (min-h dikunci agar
 *   pergantian kata tidak menggeser halaman)
 * - TextGenerateEffect untuk bio, Sparkles untuk pill ketersediaan
 * - MagneticButton + MovingBorder untuk tombol aksi
 */
export const IntroSection = memo<HeroPageProps & { onOpenCV: () => void }>(
  function IntroSection({ onNavigate, onOpenCV }) {
    const userProfile = portfolioData.userProfile as unknown as UserProfile;

    return (
      <section className="rounded-3xl border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#0c0c0d] p-6 sm:p-10 lg:p-12 shadow-sm transition-all">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Kolom kiri: ringkasan 60 detik pertama */}
          <div className="lg:col-span-7 space-y-2 sm:space-y-3">
            <Sparkles sparkleCount={4}>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border-emerald-500/30 bg-emerald-50/80 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{AVAILABILITY_TEXT}</span>
              </div>
            </Sparkles>

            <div className="space-y-1">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl tracking-tighter text-black dark:text-white font-caveat font-bold">
                <EncryptedText
                  text={userProfile.name}
                  className="font-caveat font-bold"
                  revealDelay={40}
                />
              </h1>
              {/* min-h dikunci (1 baris mobile / desktop) agar pergantian kata
                FlipWords tidak menggeser layout halaman naik-turun */}
              <div className="min-h-[1.9rem] sm:min-h-[2.5rem] flex items-center">
                <p className="text-lg sm:text-3xl font-extrabold text-black dark:text-slate-100 flex items-center gap-2 tracking-tight font-script">
                  <FlipWords
                    words={[...HERO_ROLES]}
                    className="font-script text-black dark:text-slate-100"
                  />
                </p>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-start gap-2.5 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border-slate-200/60 dark:border-white/5">
                <MapPin className="w-4 h-4 text-slate-500 dark:text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold block text-slate-900 dark:text-white">
                    Kesiapan Kerja:
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">
                    On-Site (WFO) Seluruh Indonesia &amp; Remote
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border-slate-200/60 dark:border-white/5">
                <GraduationCap className="w-4 h-4 text-slate-500 dark:text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold block text-slate-900 dark:text-white">
                    Pendidikan Akademis:
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">
                    S1 Teknik Informatika - UPI &ldquo;YPTK&rdquo;
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-nowrap justify-center sm:justify-start items-center gap-3 pt-2">
              <MagneticButton strength={0.25}>
                <button
                  id="hero-view-portfolio-btn"
                  onClick={() => onNavigate?.("portfolio")}
                  className="flex-1 sm:flex-none px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs font-bold sm:uppercase sm:tracking-wider bg-slate-950 text-white dark:bg-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-sm"
                >
                  <span>Lihat Portofolio</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                </button>
              </MagneticButton>

              <MagneticButton strength={0.25}>
                <a
                  id="hero-whatsapp-btn"
                  href={userProfile.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-3 sm:px-5 py-2.5 sm:py-3 rounded-full border-emerald-600/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold sm:tracking-wider transition-all flex items-center justify-center gap-1.5 sm:gap-2"
                >
                  <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="sm:hidden">WhatsApp</span>
                  <span className="hidden sm:inline">Hubungi via WhatsApp</span>
                </a>
              </MagneticButton>

              <MovingBorder
                containerClassName="h-auto rounded-full"
                onClick={onOpenCV}
                className="px-3 sm:px-5 py-2.5 sm:py-3 text-xs font-semibold sm:tracking-wider flex items-center gap-1.5 sm:gap-2 rounded-full"
                duration={3000}
              >
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>Curriculum Vitae</span>
              </MovingBorder>
            </div>
          </div>

          {/* Kolom kanan: kartu foto profil + tautan kontak */}
          <div className="lg:col-span-5 flex justify-center">
            <ProfilePhotoCard userProfile={userProfile} />
          </div>
        </div>
      </section>
    );
  },
);
