import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  FileText,
  GitCommit,
  GraduationCap,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { memo, useMemo } from "react";
import portfolioData from "../../../data/portfolio.json";
import { UserProfile } from "../../../types";
import { ProfilePhotoCard } from "../cards/profile-photo-card";
import { useTranslations } from "../../../i18n";
import { getDictionary } from "../../../data/locales";
import { getLocalizedUserProfile } from "../../../utils/format";
// Konten diambil langsung dari portfolio.json - tidak ada duplikasi di hero.data.ts
import { HeroPageProps } from "../types";

/**
 * IntroSection - ringkasan profil utama.
 */
export const IntroSection = memo<HeroPageProps & { onOpenCV: () => void }>(
  function IntroSection({ onNavigate, onOpenCV }) {
    const { locale } = useTranslations();
    const copy = getDictionary(locale).hero.intro;
    const userProfile = getLocalizedUserProfile(
      portfolioData.userProfile as unknown as UserProfile,
      locale,
    );

    const heroBio = userProfile.shortBio;
    const availabilityText = userProfile.workPreference;
    const roles = [userProfile.title, ...copy.roles];

    /** Strip statistik singkat dengan ikon berkarakter */
    const stats = useMemo(
      () => [
        {
          label: copy.stats.projects,
          shortLabel: copy.stats.projectsShort,
          valNumber: `${userProfile.stats.projectsCompleted}+`,
          valUnit: "",
          icon: (
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
          ),
        },
        {
          label: copy.stats.experience,
          shortLabel: copy.stats.experienceShort,
          valNumber: `${userProfile.stats.yearsExperience}`,
          valUnit: locale === "en" ? "months" : "Bulan",
          icon: (
            <Briefcase className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
          ),
        },
        {
          label: copy.stats.commits,
          shortLabel: copy.stats.commitsShort || "Commit",
          valNumber: userProfile.stats.codeCommits,
          valUnit: "",
          icon: (
            <GitCommit className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          ),
        },
      ],
      [copy.stats, locale, userProfile.stats],
    );

    return (
      <section className="relative pt-0 sm:pt-2 pb-4 sm:pb-6">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Kolom kiri: ringkasan 60 detik pertama */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-600/25 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold backdrop-blur-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="tracking-tight">
                {locale === "en" ? copy.availability : availabilityText}
              </span>
            </div>

            <div className="space-y-1.5">
              <span className="folio-num block">
                {locale === "en"
                  ? "01 / Professional Profile & Overview"
                  : "01 / Profil & Ringkasan Profesional"}
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#141f26] dark:text-white leading-[1.05]">
                {userProfile.name}
              </h1>
              <div
                className="hero-role-cycle text-lg font-bold text-[#273641] dark:text-[#8caec2] sm:text-2xl pt-0.5"
                aria-label={roles.join(", ")}
              >
                {roles.map((role, index) => (
                  <span
                    key={role}
                    aria-hidden="true"
                    className="hero-role"
                    style={{ animationDelay: `${index * 2}s` }}
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-[#24333d] dark:text-slate-200 text-base sm:text-lg max-w-2xl font-medium leading-[1.7]">
              {heroBio}
            </p>

            {/* Highlight singkat — open row list dengan kontras tinggi */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-[#354551] dark:text-slate-300 pt-0.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <div className="min-w-0">
                  <span className="font-bold text-[#141f26] dark:text-white">{copy.workLabel}:</span>
                  {" "}
                  <span className="text-[#354551] dark:text-slate-300 font-medium">{copy.workValue}</span>
                </div>
              </div>
              <div className="hidden sm:block text-[#36454f]/25 dark:text-white/20">•</div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                <div className="min-w-0">
                  <span className="font-bold text-[#141f26] dark:text-white">{copy.educationLabel}:</span>
                  {" "}
                  <span className="text-[#354551] dark:text-slate-300 font-medium">{copy.educationValue}</span>
                </div>
              </div>
            </div>

            {/* Stat Monolith Ribbon — Terukir Elegan dengan Tonal Lift */}
            <div className="atelier-surface rounded-2xl p-2.5 sm:p-5 grid grid-cols-3 divide-x divide-[#36454f]/15 dark:divide-white/10 sm:flex sm:items-center sm:justify-start sm:divide-x-0 sm:gap-10">
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex items-center sm:gap-10 px-1.5 first:pl-0 sm:px-0 min-w-0">
                  {i > 0 && (
                    <div className="hidden sm:block h-10 w-px bg-[#36454f]/15 dark:bg-white/10" />
                  )}
                  <div className="stat-monolith w-full">
                    <div className="flex items-center gap-1 sm:gap-1.5 mb-1 justify-start">
                      {stat.icon}
                      <span className="text-[9px] sm:text-[11px] font-bold text-[#485966] dark:text-slate-400 uppercase tracking-wider truncate">
                        <span className="sm:hidden">{stat.shortLabel}</span>
                        <span className="hidden sm:inline">{stat.label}</span>
                      </span>
                    </div>
                    <div className="flex items-baseline gap-0.5 sm:gap-1 truncate">
                      <span className="stat-monolith-val">
                        {stat.valNumber}
                      </span>
                      {stat.valUnit && (
                        <span className="text-[10px] sm:text-xs font-semibold text-[#485966] dark:text-slate-400 leading-none truncate">
                          {stat.valUnit}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA - layout seimbang & proporsional */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 pt-2">
              {/* Baris 1 mobile: Portofolio hitam & WhatsApp berdampingan seimbang 50:50 */}
              <div className="grid grid-cols-2 gap-2.5 w-full sm:w-auto sm:flex sm:items-center sm:gap-3">
                {/* Portofolio */}
                <a
                  id="hero-view-portfolio-btn"
                  href={locale === "en" ? "/en/portfolio" : "/portfolio"}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate?.("portfolio");
                  }}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs font-bold bg-[#273641] text-white dark:bg-slate-100 dark:text-slate-900 hover:bg-[#1a252d] dark:hover:bg-white transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>{copy.portfolioButton}</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </a>

                {/* WhatsApp */}
                <a
                  id="hero-whatsapp-btn"
                  href={userProfile.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-full border border-emerald-600/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* CV action */}
              <div className="w-full flex justify-center sm:w-auto">
                <button
                  type="button"
                  onClick={onOpenCV}
                  className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-[#36454f]/25 bg-transparent text-[#1c2932] text-xs font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 hover:border-[#36454f]/45 hover:bg-[#36454f]/[0.05] dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
                >
                  <FileText className="w-3.5 h-3.5 shrink-0" />
                  <span>{copy.cvButton}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Kolom kanan: kartu foto profil */}
          <div className="lg:col-span-5 flex justify-center relative">
            <ProfilePhotoCard userProfile={userProfile} />
          </div>
        </div>
      </section>
    );
  },
);
