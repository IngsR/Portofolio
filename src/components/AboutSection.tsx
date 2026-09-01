import {
  ArrowUpRight,
  Award,
  Briefcase,
  Code2,
  Cpu,
  FileText,
  GraduationCap,
  Layout,
  Mail,
  MessageCircle,
  Server,
  Terminal,
} from "lucide-react";
import React, { useState } from "react";

import {
  certificationsData,
  educationData,
  experienceData,
  skillCategories,
  userProfile,
} from "../data/portfolioData";

import { CertificationItem } from "../types";
import { DetailModal } from "./DetailModal";

interface AboutSectionProps {
  onOpenCV: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenCV }) => {
  const [activeTab, setActiveTab] = useState<
    "experience" | "skills" | "education"
  >("experience");

  const [selectedCertForModal, setSelectedCertForModal] =
    useState<CertificationItem | null>(null);

  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  const handleOpenCertModal = (cert: CertificationItem) => {
    setSelectedCertForModal(cert);
    setIsCertModalOpen(true);
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Layout":
        return <Layout className="h-4 w-4 text-blue-600 dark:text-blue-400" />;

      case "Server":
        return (
          <Server className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        );

      case "Terminal":
        return (
          <Terminal className="h-4 w-4 text-purple-600 dark:text-purple-400" />
        );

      case "Cpu":
        return <Cpu className="h-4 w-4 text-rose-600 dark:text-rose-400" />;

      default:
        return <Code2 className="h-4 w-4 text-slate-800 dark:text-slate-200" />;
    }
  };

  return (
    <div className="space-y-10 py-4 sm:space-y-12 sm:py-6">
      {/* =====================================================
          HEADER PROFILE
      ====================================================== */}
      <section className="space-y-7 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0c0c0d] sm:space-y-8 sm:p-8 lg:p-10">
        {/* Profile Header */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-slate-200 pb-7 dark:border-white/10 lg:flex-row lg:items-center lg:pb-8">
          {/* Identity */}
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 dark:border-white/10 sm:h-20 sm:w-20 lg:h-24 lg:w-24">
              <img
                src="/logo.jpg"
                alt="Logo Ikhwan Ramadhan"
                width={96}
                height={96}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 sm:text-xs">
                Profil Profesional & Latar Belakang
              </span>

              <h1 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl lg:text-4xl">
                {userProfile.name}
              </h1>

              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 sm:text-sm">
                {userProfile.title}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex w-full flex-wrap items-center gap-2.5 lg:w-auto">
            {/* CV */}
            <button
              type="button"
              onClick={onOpenCV}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 sm:px-5"
            >
              <FileText className="h-4 w-4" />
              <span>Lihat CV Lengkap</span>
            </button>

            {/* WhatsApp */}
            <a
              href={userProfile.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-xs font-bold text-emerald-700 transition-all hover:bg-emerald-500/20 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-300 dark:hover:bg-emerald-400/20 sm:px-5"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${userProfile.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-800 transition-all hover:bg-slate-100 dark:border-white/15 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:bg-white/[0.08]"
            >
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </a>
          </div>
        </div>

        {/* Bio */}
        <div className="max-w-7xl space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300 sm:text-base lg:text-lg">
          {userProfile.fullBio.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-3 sm:gap-4">
          {/* Kesiapan */}
          <div className="space-y-1.5 rounded-2xl border border-slate-200/70 bg-slate-50 p-4 dark:border-white/5 dark:bg-white/[0.02] sm:p-5">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Kesiapan Kerja
            </span>

            <h4 className="text-sm font-bold text-slate-950 dark:text-white">
              On-Site / WFO & Remote
            </h4>

            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              Siap bekerja on-site / WFO di seluruh Indonesia, serta sistem
              kerja Hybrid / Remote.
            </p>
          </div>

          {/* Pendidikan */}
          <div className="space-y-1.5 rounded-2xl border border-slate-200/70 bg-slate-50 p-4 dark:border-white/5 dark:bg-white/[0.02] sm:p-5">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Pendidikan Terakhir
            </span>

            <h4 className="text-sm font-bold text-slate-950 dark:text-white">
              S1 Teknik Informatika
            </h4>

            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              Lulusan Universitas Putra Indonesia &ldquo;YPTK&rdquo; Padang
              dengan pendalaman Rekayasa Perangkat Lunak, DSA, basis data
              relasional, arsitektur sistem web, Deep Learning/LSTM Time Series,
              dan Sistem Temu Balik Informasi.
            </p>
          </div>

          {/* Fokus */}
          <div className="space-y-1.5 rounded-2xl border border-slate-200/70 bg-slate-50 p-4 dark:border-white/5 dark:bg-white/[0.02] sm:p-5">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Fokus Keahlian
            </span>

            <h4 className="text-sm font-bold text-slate-950 dark:text-white">
              Frontend Engineering
            </h4>

            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              Next.js, Angular, React.js, TypeScript, Technical SEO, Rendering SSR/SSG/CDN, Reactive Programming (RxJS/Signals), Tailwind CSS, dan shadcn/ui.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          TAB NAVIGATION
      ====================================================== */}
      <section className="w-full">
        <div
          className="
            mx-auto
            grid
            w-full
            max-w-5xl
            grid-cols-3
            items-center
            gap-1.5
            rounded-full
            border
            border-slate-300/80
            bg-slate-100/90
            p-1.5
            shadow-sm
            backdrop-blur-sm
            dark:border-white/15
            dark:bg-white/[0.06]
            sm:gap-2.5
            sm:p-2
          "
        >
          {/* =================================================
              EXPERIENCE
          ================================================== */}
          <button
            type="button"
            onClick={() => setActiveTab("experience")}
            aria-pressed={activeTab === "experience"}
            className={`
              group
              flex
              w-full
              min-w-0
              items-center
              justify-center
              gap-2
              rounded-full
              border
              px-2.5
              py-2.5
              text-xs
              font-bold
              leading-none
              transition-all
              duration-200
              active:scale-[0.98]
              sm:gap-2.5
              sm:px-5
              sm:py-3.5
              sm:text-sm
              ${
                activeTab === "experience"
                  ? "border-slate-950 bg-slate-950 text-white shadow-md dark:border-white dark:bg-white dark:text-slate-950"
                  : "border-transparent bg-transparent text-slate-700 hover:border-slate-300/60 hover:bg-white/80 hover:text-slate-950 dark:text-slate-300 dark:hover:border-white/20 dark:hover:bg-white/[0.10] dark:hover:text-white"
              }
            `}
          >
            <Briefcase
              strokeWidth={2.2}
              className={`
                h-5
                w-5
                shrink-0
                transition-transform
                duration-200
                group-hover:scale-110
                sm:h-5.5
                sm:w-5.5
                lg:h-6
                lg:w-6
                ${
                  activeTab === "experience"
                    ? "text-white dark:text-slate-950"
                    : "text-slate-600 dark:text-slate-400 group-hover:text-slate-950 dark:group-hover:text-white"
                }
              `}
            />

            {/* Mobile */}
            <span className="truncate font-bold sm:hidden">Pengalaman</span>

            {/* Desktop */}
            <span className="hidden truncate font-bold sm:inline">
              Pengalaman Kerja & Proyek
            </span>
          </button>

          {/* =================================================
              SKILLS
          ================================================== */}
          <button
            type="button"
            onClick={() => setActiveTab("skills")}
            aria-pressed={activeTab === "skills"}
            className={`
              group
              flex
              w-full
              min-w-0
              items-center
              justify-center
              gap-2
              rounded-full
              border
              px-2.5
              py-2.5
              text-xs
              font-bold
              leading-none
              transition-all
              duration-200
              active:scale-[0.98]
              sm:gap-2.5
              sm:px-5
              sm:py-3.5
              sm:text-sm
              ${
                activeTab === "skills"
                  ? "border-slate-950 bg-slate-950 text-white shadow-md dark:border-white dark:bg-white dark:text-slate-950"
                  : "border-transparent bg-transparent text-slate-700 hover:border-slate-300/60 hover:bg-white/80 hover:text-slate-950 dark:text-slate-300 dark:hover:border-white/20 dark:hover:bg-white/[0.10] dark:hover:text-white"
              }
            `}
          >
            <Cpu
              strokeWidth={2.2}
              className={`
                h-5
                w-5
                shrink-0
                transition-transform
                duration-200
                group-hover:scale-110
                sm:h-5.5
                sm:w-5.5
                lg:h-6
                lg:w-6
                ${
                  activeTab === "skills"
                    ? "text-white dark:text-slate-950"
                    : "text-slate-600 dark:text-slate-400 group-hover:text-slate-950 dark:group-hover:text-white"
                }
              `}
            />

            {/* Mobile */}
            <span className="truncate font-bold sm:hidden">Keahlian</span>

            {/* Desktop */}
            <span className="hidden truncate font-bold sm:inline">
              Keahlian Teknis & Tools
            </span>
          </button>

          {/* =================================================
              EDUCATION
          ================================================== */}
          <button
            type="button"
            onClick={() => setActiveTab("education")}
            aria-pressed={activeTab === "education"}
            className={`
              group
              flex
              w-full
              min-w-0
              items-center
              justify-center
              gap-2
              rounded-full
              border
              px-2.5
              py-2.5
              text-xs
              font-bold
              leading-none
              transition-all
              duration-200
              active:scale-[0.98]
              sm:gap-2.5
              sm:px-5
              sm:py-3.5
              sm:text-sm
              ${
                activeTab === "education"
                  ? "border-slate-950 bg-slate-950 text-white shadow-md dark:border-white dark:bg-white dark:text-slate-950"
                  : "border-transparent bg-transparent text-slate-700 hover:border-slate-300/60 hover:bg-white/80 hover:text-slate-950 dark:text-slate-300 dark:hover:border-white/20 dark:hover:bg-white/[0.10] dark:hover:text-white"
              }
            `}
          >
            <GraduationCap
              strokeWidth={2.2}
              className={`
                h-5
                w-5
                shrink-0
                transition-transform
                duration-200
                group-hover:scale-110
                sm:h-5.5
                sm:w-5.5
                lg:h-6
                lg:w-6
                ${
                  activeTab === "education"
                    ? "text-white dark:text-slate-950"
                    : "text-slate-600 dark:text-slate-400 group-hover:text-slate-950 dark:group-hover:text-white"
                }
              `}
            />

            {/* Mobile */}
            <span className="truncate font-bold sm:hidden">Pendidikan</span>

            {/* Desktop */}
            <span className="hidden truncate font-bold sm:inline">
              Pendidikan & Sertifikasi
            </span>
          </button>
        </div>
      </section>

      {/* =====================================================
          EXPERIENCE
      ====================================================== */}
      {activeTab === "experience" && (
        <div className="space-y-6">
          <div className="relative space-y-6 pl-6 before:absolute before:bottom-2 before:left-2 before:top-2 before:w-px before:bg-slate-200 dark:before:bg-white/10 sm:pl-8 sm:before:left-3">
            {experienceData.map((exp) => (
              <div key={exp.id} className="relative space-y-3">
                <div className="absolute -left-6 top-1.5 h-3 w-3 rounded-full border-2 border-white bg-slate-950 dark:border-slate-900 dark:bg-white sm:-left-8" />

                <div className="space-y-4 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0c0c0d] sm:p-8">
                  <div className="flex flex-col justify-between gap-3 border-b border-slate-100 pb-4 dark:border-white/10 sm:flex-row sm:items-center">
                    <div>
                      <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                        {exp.role}
                      </h3>

                      <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                        {exp.company} • {exp.location}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-start text-xs">
                      <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-800 dark:bg-white/10 dark:text-slate-200">
                        {exp.period}
                      </span>

                      <span className="rounded-full border border-slate-200 px-3 py-1 font-semibold text-slate-900 dark:border-white/10 dark:text-white">
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300 sm:text-sm lg:text-base">
                    {exp.description}
                  </p>

                  <div className="space-y-2 pt-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Pencapaian Utama
                    </h4>

                    <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="font-bold text-emerald-500">✓</span>

                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-slate-200/60 bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-700 dark:border-white/5 dark:bg-white/5 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================
          SKILLS
      ====================================================== */}
      {activeTab === "skills" && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl">
              Teknologi yang Saya Gunakan
            </h2>

            <p className="text-sm text-slate-600 dark:text-slate-400">
              Stack yang paling sering saya gunakan, beserta tools yang
              digunakan sesuai kebutuhan project.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {skillCategories.map((category) => (
              <div
                key={category.title}
                className="space-y-5 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0c0c0d] sm:p-6"
              >
                <div className="flex items-start gap-3 border-b border-slate-100 pb-4 dark:border-white/10">
                  <div className="shrink-0 rounded-2xl border border-slate-200/60 bg-slate-100 p-2.5 dark:border-white/5 dark:bg-white/5">
                    {getCategoryIcon(category.iconName)}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold tracking-wide text-slate-950 dark:text-white">
                      {category.title}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-bold tracking-[0.16em] text-emerald-700 dark:text-emerald-400">
                      CORE STACK
                    </h4>

                    <div className="flex flex-wrap gap-2">
                      {category.coreStack.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full border border-emerald-600/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-300"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-[10px] font-bold tracking-[0.16em] text-slate-500 dark:text-slate-400">
                      {category.alsoUsedLabel || "ALSO USED"}
                    </h4>

                    <div className="flex flex-wrap gap-2">
                      {category.alsoUsed.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full border border-slate-300 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================
          EDUCATION & CERTIFICATIONS
      ====================================================== */}
      {activeTab === "education" && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Education */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-lg font-bold text-slate-950 dark:border-white/10 dark:text-white">
              <GraduationCap className="h-5 w-5" />

              <h2>Riwayat Pendidikan</h2>
            </div>

            {educationData.map((education) => (
              <div
                key={education.id}
                className="space-y-2.5 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0c0c0d] sm:p-6"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-slate-950 dark:text-white">
                    {education.degree}
                  </h3>

                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-800 dark:bg-white/10 dark:text-slate-200">
                    {education.period}
                  </span>
                </div>

                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {education.institution}
                </p>

                <p className="pt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {education.details}
                </p>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-lg font-bold text-slate-950 dark:border-white/10 dark:text-white">
              <Award className="h-5 w-5" />

              <h2>Sertifikasi & Kredensial</h2>
            </div>

            <div className="space-y-3">
              {certificationsData.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => handleOpenCertModal(cert)}
                  className="group flex cursor-pointer flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-slate-400 dark:border-white/10 dark:bg-[#0c0c0d] dark:hover:border-white/30 sm:flex-row sm:items-center sm:rounded-3xl sm:p-5"
                >
                  {/* Certificate Info */}
                  <div className="flex items-start gap-3.5 sm:items-center">
                    <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-900 dark:border-white/10 sm:h-14 sm:w-20">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        width={80}
                        height={56}
                        loading="lazy"
                        decoding="async"
                        onError={(event) => {
                          const target = event.currentTarget;

                          if (
                            cert.fallbackImage &&
                            target.src !== cert.fallbackImage
                          ) {
                            target.src = cert.fallbackImage;
                          }
                        }}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />

                      <div className="absolute inset-0 bg-black/20" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                          {cert.category || "Kredensial"}
                        </span>

                        {cert.badgeCode && (
                          <span className="rounded-full bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-700 dark:bg-white/10 dark:text-slate-300">
                            {cert.badgeCode}
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-bold text-slate-950 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 sm:text-base">
                        {cert.title}
                      </h3>

                      <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                        {cert.issuer} • {cert.period || cert.issueDate}
                      </p>
                    </div>
                  </div>

                  {/* Screenshot Button */}
                  <div className="flex shrink-0 items-center self-end sm:self-center">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleOpenCertModal(cert);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-900 transition-all hover:border-slate-300 hover:bg-slate-100 dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:hover:border-white/20 dark:hover:bg-white/10"
                      title="Lihat Screenshot & Detail"
                    >
                      <span>Lihat Screenshot</span>

                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          CERTIFICATE MODAL
      ====================================================== */}
      <DetailModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        certificate={selectedCertForModal}
      />
    </div>
  );
};
