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
import { MagneticButton } from "../../../design/components/magnetic-button";
import { UserProfile } from "../../../types";
import { ProfilePhotoCard } from "../cards/profile-photo-card";
// Konten diambil langsung dari portfolio.json — tidak ada duplikasi di hero.data.ts
import { HeroPageProps } from "../types";

/**
 * IntroSection — ringkasan profil utama.
 */
export const IntroSection = memo<HeroPageProps & { onOpenCV: () => void }>(
  function IntroSection({ onNavigate, onOpenCV }) {
    const userProfile = portfolioData.userProfile as unknown as UserProfile;

    const heroBio = userProfile.shortBio;
    const availabilityText = userProfile.workPreference;
    const roles = [
      userProfile.title,
      "Frontend & Backend",
      "Next.js & React Developer",
      "REST API & Database",
    ];

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
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-colors sm:p-10 lg:p-12 dark:border-[#41494f] dark:bg-[#2b3034]">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Kolom kiri: ringkasan 60 detik pertama */}
          <div className="lg:col-span-7 space-y-2 sm:space-y-3">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-50/80 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{availabilityText}</span>
            </div>

            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.08]">
                {userProfile.name}
              </h1>
              <div
                className="hero-role-cycle text-lg font-bold text-[#426b82] dark:text-[#8caec2] sm:text-2xl"
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

            <p className="hero-bio-write text-slate-800 dark:text-slate-300 text-base sm:text-lg max-w-4xl font-medium leading-relaxed">
              {heroBio}
            </p>

            {/* Highlight singkat */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-start gap-2.5 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/95 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 shadow-xs">
                <MapPin className="w-4 h-4 text-indigo-500 dark:text-indigo-400 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <span className="font-bold block text-slate-900 dark:text-white text-xs sm:text-sm">
                    Kesiapan Kerja:
                  </span>
                  <span className="text-slate-600 dark:text-slate-400 text-[11px] sm:text-xs leading-relaxed block">
                    Terbuka untuk kerja On-Site / WFO dan Hybrid
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

              {/* CV action shares the same restrained magnetic interaction as the other hero actions. */}
              <div className="w-full flex justify-center sm:w-auto">
                <MagneticButton strength={0.25} className="w-fit">
                  <button
                    type="button"
                    onClick={onOpenCV}
                    className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-slate-300 bg-[#faf7f0] text-slate-800 text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors hover:bg-[#f0e9dd] dark:border-[#59666e] dark:bg-[#363e43] dark:text-slate-100 dark:hover:bg-[#3d464c]"
                  >
                    <FileText className="w-3.5 h-3.5 shrink-0" />
                    <span>Curriculum Vitae</span>
                  </button>
                </MagneticButton>
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
