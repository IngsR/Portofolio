import {
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
import portfolioData from "../../data/portfolio.json";
import {
  CertificationItem,
  EducationItem,
  ExperienceItem,
  SkillCategory,
} from "../../types";
import { Certificate } from "../portfolio/certificate";
import { Detail } from "../modal/detail";
import { CardPreviewModal } from "../modal/card-preview-modal";
import { AnimatedTabs } from "../../design/components/animated-tabs";
import { TracingBeam } from "../../design/components/tracing-beam";
import { CardSpotlight } from "../../design/components/card-spotlight";

const {
  userProfile,
  experience: experienceData,
  education: educationData,
  certifications: certificationsData,
  skillCategories,
} = portfolioData as {
  userProfile: typeof portfolioData.userProfile;
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  skillCategories: SkillCategory[];
};

interface AboutSectionProps {
  onOpenCV: () => void;
}

export const About: React.FC<AboutSectionProps> = ({ onOpenCV }) => {
  const [activeTab, setActiveTab] = useState<
    "experience" | "skills" | "education"
  >("experience");

  const [selectedCertForModal, setSelectedCertForModal] =
    useState<CertificationItem | null>(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  // Quick Certificate Preview Modal State
  const [selectedCertForPreview, setSelectedCertForPreview] =
    useState<CertificationItem | null>(null);
  const [isCertPreviewOpen, setIsCertPreviewOpen] = useState(false);

  const handleOpenCertModal = (cert: CertificationItem) => {
    setSelectedCertForModal(cert);
    setIsCertModalOpen(true);
  };

  const handleOpenCertPreview = (cert: CertificationItem) => {
    setSelectedCertForPreview(cert);
    setIsCertPreviewOpen(true);
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
    <div className="about-page space-y-10 py-4 sm:space-y-12 sm:py-6">
      {/* HEADER PROFILE */}
      <section className="space-y-6 rounded-3xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0c0c0d] p-5 shadow-sm sm:p-8 lg:p-10">
        {/* Profile Header */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-slate-100 dark:border-white/[0.08] pb-6 lg:flex-row lg:items-center">
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
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Profil Profesional
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl tracking-tight text-slate-950 dark:text-white font-caveat font-bold">
                {userProfile.name}
              </h1>
              <p className="text-sm sm:text-base font-script text-slate-700 dark:text-slate-300">
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
        <div className="max-w-4xl space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {userProfile.fullBio.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Summary Highlights (Mobile-First Bento Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 pt-2">
          {/* 1. Kesiapan Kerja */}
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#0f0f12] p-4 sm:p-5 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.06)] hover:shadow-md hover:border-emerald-500/40 active:scale-[0.99] transition-all flex flex-col justify-between space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10.5px] font-bold font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Kesiapan Kerja
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-slate-950 dark:text-white">
              On-Site / WFO &amp; Remote
            </h4>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              Siap bekerja on-site / WFO di seluruh Indonesia, serta sistem
              kerja Hybrid / Remote.
            </p>
          </div>

          {/* 2. Pendidikan Terakhir */}
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#0f0f12] p-4 sm:p-5 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.06)] hover:shadow-md hover:border-blue-500/40 active:scale-[0.99] transition-all flex flex-col justify-between space-y-2.5">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
              <span className="text-[10.5px] font-bold font-mono uppercase tracking-wider text-blue-700 dark:text-blue-400">
                Pendidikan Terakhir
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-slate-950 dark:text-white">
              S1 Teknik Informatika
            </h4>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              Fresh Graduate S1 TI UPI &ldquo;YPTK&rdquo; Padang — RPL, DSA,
              basis data relasional, arsitektur sistem web, dan Deep Learning.
            </p>
          </div>

          {/* 3. Fokus Keahlian */}
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#0f0f12] p-4 sm:p-5 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.06)] hover:shadow-md hover:border-purple-500/40 active:scale-[0.99] transition-all flex flex-col justify-between space-y-2.5">
            <div className="flex items-center gap-2">
              <Cpu className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
              <span className="text-[10.5px] font-bold font-mono uppercase tracking-wider text-purple-700 dark:text-purple-400">
                Fokus Keahlian
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-slate-950 dark:text-white">
              Junior Fullstack Web Engineer
            </h4>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              Next.js (App Router), REST API, Zod, testing, OWASP Top 10, Git
              workflow tim, CI/CD, deployment serverless.
            </p>
          </div>
        </div>
      </section>

      {/* TAB NAVIGATION */}
      <section className="w-full">
        <AnimatedTabs
          className="tab-nav-art mx-auto"
          activeTab={activeTab}
          onTabChange={(id) =>
            setActiveTab(id as "experience" | "skills" | "education")
          }
          tabs={[
            {
              id: "experience",
              label: "Pengalaman Kerja",
              icon: <Briefcase className="h-3.5 w-3.5 shrink-0" />,
            },
            {
              id: "skills",
              label: "Keahlian Teknis",
              icon: <Cpu className="h-3.5 w-3.5 shrink-0" />,
            },
            {
              id: "education",
              label: "Pendidikan & Sertifikasi",
              icon: <GraduationCap className="h-3.5 w-3.5 shrink-0" />,
            },
          ]}
        />
      </section>

      {/* =====================================================
          EXPERIENCE
      ====================================================== */}
      {activeTab === "experience" && (
        <TracingBeam className="px-0 sm:px-4">
          <div className="space-y-6">
            {experienceData.map((exp) => (
              <div key={exp.id} className="relative space-y-3">
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
        </TracingBeam>
      )}

      {/* =====================================================
          SKILLS
      ====================================================== */}
      {activeTab === "skills" && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="ornament-underline text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl">
              Teknologi yang Saya Gunakan
            </h2>

            <p className="text-sm text-slate-600 dark:text-slate-400">
              Stack yang paling sering saya gunakan, beserta tools yang
              digunakan sesuai kebutuhan project.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {skillCategories.map((category) => (
              <CardSpotlight
                key={category.title}
                tilt={true}
                radius={280}
                className="space-y-5 rounded-3xl border border-slate-200/90 bg-white p-5 shadow-[0_2px_10px_-2px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-[#0c0c0d] sm:p-6 hover:border-blue-500/40"
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
              </CardSpotlight>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================
          EDUCATION & CERTIFICATIONS
      ====================================================== */}
      {activeTab === "education" && (
        <div className="space-y-8">
          {/* Education */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-lg font-bold text-slate-950 dark:border-white/10 dark:text-white">
              <GraduationCap className="h-5 w-5" />

              <h2 className="ornament-underline">Riwayat Pendidikan</h2>
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
              <h2 className="ornament-underline">Sertifikasi &amp; Kredensial</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificationsData.map((cert) => (
                <Certificate
                  key={cert.id}
                  certificate={cert}
                  onOpenDetail={handleOpenCertModal}
                  onOpenPreview={handleOpenCertPreview}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          CERTIFICATE DETAIL MODAL
      ====================================================== */}
      <Detail
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        certificate={selectedCertForModal}
      />

      {/* =====================================================
          QUICK CARD PREVIEW MODAL
      ====================================================== */}
      <CardPreviewModal
        isOpen={isCertPreviewOpen}
        onClose={() => setIsCertPreviewOpen(false)}
        certificate={selectedCertForPreview}
        onOpenDetail={(item) => handleOpenCertModal(item as CertificationItem)}
      />
    </div>
  );
};
