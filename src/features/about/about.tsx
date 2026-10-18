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
import { CardPreviewModal } from "../../components/modal/card-preview-modal";
import { Detail } from "../../components/modal/detail";
import portfolioData from "../../data/portfolio.json";
import { AnimatedTabs } from "../../design/components/animated-tabs";
import { CardSpotlight } from "../../design/components/card-spotlight";
import { TracingBeam } from "../../design/components/tracing-beam";
import {
  CertificationItem,
  EducationItem,
  ExperienceItem,
  SkillCategory,
} from "../../types";
import { Certificate } from "../portfolio/certificate";
import { useTranslations } from "../../i18n";
import { getDictionary } from "../../data/locales";
import {
  getLocalizedCertification,
  getLocalizedEducation,
  getLocalizedExperience,
  getLocalizedSkillCategory,
  getLocalizedUserProfile,
} from "../../utils/format";

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
  const { locale } = useTranslations();
  const copy = getDictionary(locale).about;
  const localizedProfile = getLocalizedUserProfile(userProfile, locale);
  const localizedExperience = experienceData.map((item) =>
    getLocalizedExperience(item, locale),
  );
  const localizedEducation = educationData.map((item) =>
    getLocalizedEducation(item, locale),
  );
  const localizedCertifications = certificationsData.map((item) =>
    getLocalizedCertification(item, locale),
  );
  const localizedSkills = skillCategories.map((item) =>
    getLocalizedSkillCategory(item, locale),
  );
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
      <section className="atelier-surface frame-motion corner-bracket space-y-6 rounded-2xl sm:rounded-3xl border border-[#36454f]/15 dark:border-white/[0.08] p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-xs">
        {/* Profile Header */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-[#36454f]/10 dark:border-white/[0.08] pb-6 lg:flex-row lg:items-center">
          {/* Identity */}
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="passe-partout relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-[#36454f]/15 bg-slate-900 dark:border-white/10 sm:h-20 sm:w-20 lg:h-24 lg:w-24">
              <img
                src="/logo.webp"
                alt="Logo Ikhwan Ramadhan"
                width={96}
                height={96}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-1">
              <span className="folio-num">
                {copy.profileLabel}
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[#141f26] dark:text-white font-serif font-black">
                {localizedProfile.name}
              </h1>
              <p className="text-sm sm:text-base font-medium text-[#273641] dark:text-slate-300">
                {localizedProfile.title}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex w-full flex-wrap items-center gap-2.5 lg:w-auto">
            {/* CV */}
            <button
              type="button"
              onClick={onOpenCV}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#36454f]/25 dark:border-white/20 bg-white/70 dark:bg-white/5 px-4 py-2 text-xs font-bold text-[#141f26] dark:text-white transition-all hover:bg-[#273641] hover:text-white dark:hover:bg-white dark:hover:text-slate-950 sm:px-5 shadow-xs"
            >
              <FileText className="h-4 w-4" />
              <span>{copy.cv}</span>
            </button>

            {/* WhatsApp */}
            <a
              href={localizedProfile.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 text-xs font-bold transition-all sm:px-5 shadow-xs"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${localizedProfile.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#36454f]/25 dark:border-white/20 bg-white/70 dark:bg-white/5 px-4 py-2 text-xs font-bold text-[#141f26] dark:text-white hover:bg-[#273641] hover:text-white dark:hover:bg-white dark:hover:text-slate-950 transition-all sm:px-5 shadow-xs"
            >
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </a>
          </div>
        </div>

        {/* Bio + Bento Highlights */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 lg:items-start">
          {/* Bio */}
          <div className="space-y-4 text-base leading-relaxed text-[#24333d] dark:text-slate-200 sm:text-lg sm:leading-[1.75] lg:col-span-7">
            {localizedProfile.fullBio.map((paragraph, index) => (
              <p key={index} className="text-pretty">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Summary Highlights */}
          <div className="grid grid-cols-1 gap-3.5 sm:gap-4 md:grid-cols-3 lg:col-span-5 lg:grid-cols-1">
            {/* 1. Kesiapan Kerja */}
            <div className="atelier-surface rounded-2xl border border-[#36454f]/15 dark:border-white/10 p-4 sm:p-5 flex flex-col justify-between space-y-2 hover:-translate-y-0.5 transition-all shadow-xs">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                  {copy.availability}
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-[#141f26] dark:text-white">
                {copy.availabilityTitle}
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed text-[#24333d] dark:text-slate-300">
                {copy.availabilityDescription}
              </p>
            </div>

            {/* 2. Pendidikan Terakhir */}
            <div className="atelier-surface rounded-2xl border border-[#36454f]/15 dark:border-white/10 p-4 sm:p-5 flex flex-col justify-between space-y-2 hover:-translate-y-0.5 transition-all shadow-xs">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-[#273641] dark:text-blue-400">
                  {copy.education}
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-[#141f26] dark:text-white">
                {copy.highlights.educationTitle}
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed text-[#24333d] dark:text-slate-300">
                {copy.highlights.educationDescription}
              </p>
            </div>

            {/* 3. Fokus Keahlian */}
            <div className="atelier-surface rounded-2xl border border-[#36454f]/15 dark:border-white/10 p-4 sm:p-5 flex flex-col justify-between space-y-2 hover:-translate-y-0.5 transition-all shadow-xs">
              <div className="flex items-center gap-2">
                <Cpu className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-[#273641] dark:text-purple-400">
                  {copy.expertise}
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-[#141f26] dark:text-white">
                {copy.highlights.expertiseTitle}
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed text-[#24333d] dark:text-slate-300">
                {copy.highlights.expertiseDescription}
              </p>
            </div>
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
              label: copy.tabs.experience,
              icon: <Briefcase className="h-3.5 w-3.5 shrink-0" />,
            },
            {
              id: "skills",
              label: copy.tabs.skills,
              icon: <Cpu className="h-3.5 w-3.5 shrink-0" />,
            },
            {
              id: "education",
              label: copy.tabs.education,
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
            {localizedExperience.map((exp) => (
              <div key={exp.id} className="relative space-y-3">
                <div className="atelier-surface corner-bracket space-y-4 rounded-2xl border border-[#36454f]/15 p-5 sm:p-8 dark:border-white/10 shadow-xs relative overflow-hidden">
                  <div className="flex flex-col justify-between gap-3 border-b border-[#36454f]/10 pb-4 dark:border-white/10 sm:flex-row sm:items-center">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#141f26] dark:text-white font-serif">
                        {exp.role}
                      </h3>

                      <p className="text-xs sm:text-sm font-semibold text-[#354551] dark:text-slate-300">
                        {exp.company} • {exp.location}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-start text-xs">
                      <span className="rounded-full bg-[#E7EAEF]/80 px-3 py-1 font-mono text-xs font-semibold text-[#141f26] dark:bg-white/10 dark:text-slate-200 border border-[#36454f]/15 dark:border-white/10">
                        {exp.period}
                      </span>

                      <span className="rounded-full border border-[#36454f]/25 px-3 py-1 font-mono text-xs font-bold text-[#273641] dark:border-white/20 dark:text-white bg-white/70 dark:bg-white/5">
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  <p className="text-[15px] leading-relaxed text-[#24333d] dark:text-slate-200 sm:text-base lg:text-[17px] lg:leading-[1.75]">
                    {exp.description}
                  </p>

                  <div className="space-y-2 pt-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#485966] dark:text-slate-400">
                      {copy.achievements}
                    </h4>

                    <ul className="space-y-2 text-[15px] leading-relaxed text-[#24333d] dark:text-slate-200 sm:text-base">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">✓</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-[#36454f]/15 bg-[#E7EAEF]/80 px-2.5 py-1 text-[10.5px] font-mono font-medium text-[#141f26] dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
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
            <h2 className="ornament-underline text-2xl font-black tracking-tight text-[#141f26] dark:text-white sm:text-3xl font-serif">
              {copy.skillsTitle}
            </h2>

            <p className="text-sm text-[#354551] dark:text-slate-300">
              {copy.skillsDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {localizedSkills.map((category) => (
              <CardSpotlight
                key={category.title}
                tilt={true}
                radius={280}
                className="atelier-surface corner-bracket space-y-5 rounded-2xl border border-[#36454f]/15 p-5 sm:p-6 shadow-xs relative overflow-hidden dark:border-white/10 hover:border-[#36454f]/35 dark:hover:border-white/30"
              >
                <div className="flex items-start gap-3 border-b border-[#36454f]/10 pb-4 dark:border-white/10">
                  <div className="shrink-0 rounded-2xl border border-[#36454f]/15 bg-[#E7EAEF]/80 p-2.5 dark:border-white/10 dark:bg-white/5">
                    {getCategoryIcon(category.iconName)}
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-bold tracking-wide text-[#141f26] dark:text-white">
                      {category.title}
                    </h3>

                    <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#354551] dark:text-slate-300">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-bold tracking-[0.16em] uppercase text-emerald-800 dark:text-emerald-400">
                      {copy.coreStack}
                    </h4>

                    <div className="flex flex-wrap gap-2">
                      {category.coreStack.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full border border-emerald-600/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-mono font-semibold text-emerald-800 dark:text-emerald-300"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#485966] dark:text-slate-400">
                      {category.alsoUsedLabel || copy.alsoUsed}
                    </h4>

                    <div className="flex flex-wrap gap-2">
                      {category.alsoUsed.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full border border-[#36454f]/15 bg-[#E7EAEF]/80 px-2.5 py-1 text-xs font-mono font-medium text-[#24333d] dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300"
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
            <div className="flex items-center gap-2 border-b border-[#36454f]/15 pb-2 text-lg font-bold text-[#141f26] dark:border-white/10 dark:text-white">
              <GraduationCap className="h-5 w-5" />

              <h2 className="ornament-underline font-serif">{copy.educationHistory}</h2>
            </div>

            {localizedEducation.map((education) => (
              <div
                key={education.id}
                className="atelier-surface corner-bracket space-y-2.5 rounded-2xl border border-[#36454f]/15 p-5 sm:p-6 shadow-xs relative overflow-hidden dark:border-white/10"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-[#141f26] dark:text-white font-serif">
                    {education.degree}
                  </h3>

                  <span className="rounded-full bg-[#E7EAEF]/80 px-3 py-1 font-mono text-xs font-semibold text-[#141f26] dark:bg-white/10 dark:text-slate-200 border border-[#36454f]/15 dark:border-white/10 shrink-0">
                    {education.period}
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-[#273641] dark:text-slate-300">
                  {education.institution}
                </p>

                {education.gpa && (
                  <span className="inline-flex items-center rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-0.5 text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300">
                    IPK {education.gpa}
                  </span>
                )}

                <p className="pt-1.5 text-[15px] sm:text-base leading-relaxed text-[#24333d] dark:text-slate-300">
                  {education.details}
                </p>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[#36454f]/15 pb-2 text-lg font-bold text-[#141f26] dark:border-white/10 dark:text-white">
              <Award className="h-5 w-5" />
              <h2 className="ornament-underline font-serif">{copy.certificationsTitle}</h2>
            </div>

            {/* Grid 2 kolom sejak mobile agar kartu sertifikasi rapi 2 baris */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {localizedCertifications.map((cert) => (
                <Certificate
                  key={cert.id}
                  certificate={cert}
                  onOpenDetail={handleOpenCertModal}
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
