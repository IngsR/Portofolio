import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Cpu,
  ExternalLink,
  FileText,
  Github,
  GraduationCap,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Server,
  Terminal,
} from "lucide-react";
import React, { useState } from "react";
import portfolioData from "../data/portfolio.json";
import {
  CertificationItem,
  EducationItem,
  PageId,
  ProjectItem,
  SkillCategory,
} from "../types";
import { formatDomainName, formatShortDomain } from "../utils/format";
import { Detail } from "./modal/detail";
import { Certificate } from "./portfolio/certificate";

const {
  userProfile,
  education: educationData,
  certifications: certificationsData,
  skillCategories,
} = portfolioData as {
  userProfile: typeof portfolioData.userProfile;
  education: EducationItem[];
  certifications: CertificationItem[];
  skillCategories: SkillCategory[];
};

interface HeroSectionProps {
  setActivePage: (page: PageId) => void;
  featuredProjects: ProjectItem[];
  onOpenProjectMarkdown: (project: ProjectItem) => void;
  onOpenCV: () => void;
}

export const Hero: React.FC<HeroSectionProps> = ({
  setActivePage,
  featuredProjects,
  onOpenProjectMarkdown,
  onOpenCV,
}) => {
  const [selectedProjectForDetail, setSelectedProjectForDetail] =
    useState<ProjectItem | null>(null);
  const [selectedCertForDetail, setSelectedCertForDetail] =
    useState<CertificationItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleOpenProjectDetail = (project: ProjectItem) => {
    setSelectedProjectForDetail(project);
    setSelectedCertForDetail(null);
    setIsDetailOpen(true);
  };

  const handleOpenCertDetail = (cert: CertificationItem) => {
    setSelectedCertForDetail(cert);
    setSelectedProjectForDetail(null);
    setIsDetailOpen(true);
  };

  const getSkillCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Layout":
        return <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600 dark:text-sky-400" />;
      case "Server":
        return <Server className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />;
      case "Terminal":
        return <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />;
      case "Cpu":
        return <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" />;
      default:
        return <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />;
    }
  };

  // Sertifikat pilihan di Home (Problem Solving Intermediate, AI Principles Huawei, HCIP Datacom Huawei, Problem Solving Basic)
  const homeCertificates: CertificationItem[] = [
    certificationsData.find((c) => c.id === "cert-5") || certificationsData[4]!,
    certificationsData.find((c) => c.id === "cert-2") || certificationsData[1]!,
    certificationsData.find((c) => c.id === "cert-3") || certificationsData[2]!,
    certificationsData.find((c) => c.id === "cert-4") || certificationsData[3]!,
  ].filter(Boolean) as CertificationItem[];

  // Proyek pilihan di Beranda: pastikan 4 proyek pilihan utama termasuk Ingstore selalu tampil
  const homeFeaturedProjects: ProjectItem[] = (() => {
    const list = [...(featuredProjects || [])];
    const ingstore = (portfolioData.projects as ProjectItem[]).find(
      (p) => p.id === "proj-4"
    );
    if (ingstore && !list.some((p) => p.id === "proj-4")) {
      list.push(ingstore);
    }
    return list.filter((p) => p.featured || p.id === "proj-4").slice(0, 4);
  })();

  // Pendidikan Sarjana S1
  const sarjanaEducation = educationData.filter(
    (edu) => edu.id === "edu-1" || edu.degree.toLowerCase().includes("sarjana")
  );

  return (
    <div className="space-y-16 py-6 sm:py-8">
      {/* 1. HERO PERKENALAN FRONTEND ENGINEER + CARD FOTO PROFILE & KONTAK */}
      <section className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#0c0c0d] p-6 sm:p-10 lg:p-12 shadow-sm transition-all">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Brief Introduction for 60s Scan */}
          <div className="lg:col-span-7 space-y-6">
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-50/80 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>
                Siap On-Site (WFO) Seluruh Indonesia / Relokasi & Remote
              </span>
            </div>

            {/* Main Name & Title */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 dark:text-white">
                {userProfile.name}
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-slate-700 dark:text-slate-300">
                {userProfile.title} | Next.js & Angular
              </p>
            </div>

            {/* Bio Narrative */}
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed font-normal max-w-4xl">
              Fresh Graduate S1 Teknik Informatika UPI &ldquo;YPTK&rdquo; Padang, dengan spesialisasi pada{" "}
              <span className="font-semibold text-slate-900 dark:text-white">
                Frontend Engineering
              </span>
              . Menguasai{" "}
              <span className="font-semibold text-slate-900 dark:text-white">
                React.js dan TypeScript
              </span>{" "}
              dengan dua framework utama{" "}
              <span className="font-semibold text-slate-900 dark:text-white">
                Next.js dan Angular
              </span>
              , serta memahami strategi rendering (SSR, SSG, CDN), Technical SEO, Open Graph, dan Reactive Programming (RxJS &amp; Signals).
            </p>

            {/* Quick Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-start gap-2.5 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
                <MapPin className="w-4 h-4 text-slate-500 dark:text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold block text-slate-900 dark:text-white">
                    Kesiapan Kerja:
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">
                    On-Site (WFO) Seluruh Indonesia & Remote
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
                <GraduationCap className="w-4 h-4 text-slate-500 dark:text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold block text-slate-900 dark:text-white">
                    Pendidikan Akademis:
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">
                    S1 Teknik Informatika — UPI &ldquo;YPTK&rdquo;
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons with Capsule (rounded-full) Style */}
            <div className="flex flex-nowrap justify-center sm:justify-start items-center gap-2 sm:gap-3 pt-2">
              <button
                id="hero-view-portfolio-btn"
                onClick={() => {
                  setActivePage("portfolio");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex-1 sm:flex-none px-3 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs font-bold sm:uppercase sm:tracking-wider bg-slate-950 text-white dark:bg-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-sm"
              >
                <span>Lihat Portofolio</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              </button>

              <a
                id="hero-whatsapp-btn"
                href={userProfile.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-3 sm:px-5 py-2.5 sm:py-3 rounded-full border border-emerald-600/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold sm:tracking-wider transition-all flex items-center justify-center gap-1.5 sm:gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="sm:hidden">WhatsApp</span>
                <span className="hidden sm:inline">Hubungi via WhatsApp</span>
              </a>

              <button
                id="hero-cv-btn"
                onClick={onOpenCV}
                className="flex-1 sm:flex-none px-3 sm:px-5 py-2.5 sm:py-3 rounded-full border border-slate-300 dark:border-white/15 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 text-xs font-semibold sm:tracking-wider transition-all flex items-center justify-center gap-1.5 sm:gap-2"
              >
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>Curriculum Vitae</span>
              </button>
            </div>
          </div>

          {/* Right Column: Profile Photo Card with COMPLETE CONTACTS */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full sm:max-w-sm rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] p-4 sm:p-6 space-y-4 sm:space-y-5 shadow-sm">
              {/* Photo Container - Ukuran Pas & Proporsional (w-60 h-60 di mobile, w-72 di tablet, w-full di desktop) */}
              <div className="relative aspect-square w-60 h-60 sm:w-72 sm:h-72 lg:w-full lg:h-auto mx-auto rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-white/10 group">
                <img
                  src={userProfile.avatarUrl}
                  alt={userProfile.name}
                  width={400}
                  height={400}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector(".avatar-fallback")) {
                      const fallback = document.createElement("div");
                      fallback.className =
                        "avatar-fallback w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950 text-white p-6 text-center";
                      fallback.innerHTML = `
                        <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-2xl sm:text-3xl font-black tracking-tight mb-3">IR</div>
                        <p class="font-bold text-sm tracking-wide">Ikhwan Ramadhan</p>
                        <p class="text-xs text-slate-400 mt-1">Junior Frontend Engineer</p>
                      `;
                      parent.appendChild(fallback);
                    }
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute bottom-2 left-2 right-2 bg-slate-950/85 backdrop-blur-md rounded-full px-3 py-1.5 sm:py-2 text-white text-[10px] sm:text-[11px] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse"></span>
                    <span className="font-semibold truncate">
                      {userProfile.name}
                    </span>
                  </div>
                  <span className="text-slate-300 text-[9px] sm:text-[10px] shrink-0 font-medium ml-1">
                    Junior Frontend Engineer
                  </span>
                </div>
              </div>

              {/* Explicit Contact Badges inside Profile Photo Card */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Tautan Kontak Profil:
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full">
                    Resmi & Aktif
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2 text-xs">
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/ikhwn-rdn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-1.5 sm:px-3.5 sm:py-2.5 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 text-slate-800 dark:text-slate-200 transition-all group/link shadow-xs"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <div className="p-1.5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                        <Linkedin className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-semibold truncate">LinkedIn</span>
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 group-hover/link:text-blue-600 dark:group-hover/link:text-blue-400">
                      in/ikhwn-rdn
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${userProfile.email}`}
                    className="flex items-center justify-between px-3 py-1.5 sm:px-3.5 sm:py-2.5 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-rose-500/50 hover:bg-rose-50/50 dark:hover:bg-rose-950/30 text-slate-800 dark:text-slate-200 transition-all group/link shadow-xs"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <div className="p-1.5 rounded-full bg-rose-600 text-white flex items-center justify-center">
                        <Mail className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-semibold truncate">Email</span>
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 group-hover/link:text-rose-600 dark:group-hover/link:text-rose-400 truncate max-w-[150px]">
                      {userProfile.email}
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </span>
                  </a>

                  {/* GitHub */}
                  <a
                    href="https://github.com/IngsR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-1.5 sm:px-3.5 sm:py-2.5 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-slate-500/50 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 transition-all group/link shadow-xs"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <div className="p-1.5 rounded-full bg-slate-900 text-white flex items-center justify-center">
                        <Github className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-semibold truncate">GitHub</span>
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 group-hover/link:text-slate-950 dark:group-hover/link:text-white">
                      github.com/IngsR
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={userProfile.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-1.5 sm:px-3.5 sm:py-2.5 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 text-slate-800 dark:text-slate-200 transition-all group/link shadow-xs"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <div className="p-1.5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                        <MessageCircle className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-semibold truncate">No. WhatsApp</span>
                    </div>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      {userProfile.phone}
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PENDIDIKAN (SARJANA S1) */}
      <section className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#0c0c0d] p-6 sm:p-10 shadow-sm space-y-6">
        <div className="space-y-2 border-b border-slate-200 dark:border-white/10 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            01 / PENDIDIKAN AKADEMIS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white">
            Pendidikan Perguruan Tinggi (S1)
          </h2>
        </div>

        <div className="space-y-4">
          {sarjanaEducation.map((edu) => (
            <div
              key={edu.id}
              className="p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-slate-950 dark:text-white">
                      {edu.degree}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {edu.institution}
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 w-fit">
                  {edu.period}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {edu.details}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. 3 PROYEK UNGGULAN DENGAN DESKRIPSI TEKNIS FRONTEND (PROBLEM & SOLUTION) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
          <div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              02 / PROYEK PILIHAN
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white mt-1">
              Proyek Pilihan & Solusi Teknis
            </h2>
          </div>

          <button
            onClick={() => {
              setActivePage("portfolio");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white hover:opacity-80 flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 dark:border-white/10"
          >
            <span>Lihat Semua Proyek ({featuredProjects.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-4.5">
          {homeFeaturedProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleOpenProjectDetail(project)}
              className="group rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#0c0c0d] p-3 sm:p-4 lg:p-4 flex flex-col justify-between hover:border-slate-400 dark:hover:border-white/30 hover:shadow-lg transition-all shadow-sm cursor-pointer overflow-hidden"
            >
              <div className="space-y-2 sm:space-y-3">
                {/* Category & Live Domain Indicator */}
                <div className="flex items-center justify-between gap-1.5">
                  <span className="text-[9px] sm:text-[10px] font-bold text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 truncate max-w-[55%]">
                    {project.category}
                  </span>
                  {project.demoUrl && (
                    <span className="inline-flex items-center gap-1 text-[8px] sm:text-[9.5px] text-emerald-700 dark:text-emerald-300 font-mono font-medium bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 px-1.5 py-0.5 rounded-full max-w-[45%] truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                      <span className="truncate">{formatShortDomain(project.demoUrl)}</span>
                    </span>
                  )}
                </div>

                {/* Screenshot Image - LOCKED ASPECT RATIO */}
                <div className="relative aspect-[16/10] w-full rounded-xl sm:rounded-2xl overflow-hidden shrink-0 bg-slate-900 border border-slate-200/80 dark:border-white/10">
                  <img
                    src={project.image}
                    alt={project.title}
                    width={640}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (
                        project.fallbackImage &&
                        target.src !== project.fallbackImage
                      ) {
                        target.src = project.fallbackImage;
                      }
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300 select-none"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Judul Project - Dipastikan 1 Baris (truncate) untuk Estetika Sempurna */}
                <h3
                  className="font-bold text-xs sm:text-sm lg:text-[14px] text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight truncate"
                  title={project.title}
                >
                  {project.title}
                </h3>

                {/* Solusi Preview Box (Masalah dihilangkan sesuai permintaan, card tetap persegi dan proporsional) */}
                <div className="text-xs bg-slate-50 dark:bg-white/[0.03] p-2 sm:p-2.5 rounded-xl border border-slate-200/60 dark:border-white/5">
                  <span className="font-bold text-[10px] sm:text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mb-0.5">
                    💡 Solusi:
                  </span>
                  <p className="text-[10px] sm:text-[11px] leading-relaxed text-slate-700 dark:text-slate-300 line-clamp-2">
                    {project.solution || project.shortDescription}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap items-center gap-1 pt-0.5">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[8.5px] sm:text-[9.5px] font-medium rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/5 truncate max-w-[120px]"
                      title={tag}
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 2 && (
                    <span className="px-1.5 py-0.5 text-[8.5px] sm:text-[9px] font-semibold rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 shrink-0">
                      +{project.tags.length - 2}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons Footer - Detail icon only on mobile & compact desktop to prevent domain overflow */}
              <div
                className="pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-1.5 min-w-0"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => handleOpenProjectDetail(project)}
                  className="flex items-center justify-center gap-1 p-1.5 sm:px-2.5 sm:py-1 rounded-full border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-bold hover:bg-slate-100 dark:hover:bg-white/10 text-[10px] sm:text-xs transition-all shrink-0"
                  title="Detail Teknis"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span className="hidden xl:inline">Detail</span>
                </button>

                <div className="flex items-center gap-1 sm:gap-1.5 min-w-0 shrink">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 sm:p-2 rounded-full border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors shrink-0"
                      title="Lihat Repositori GitHub"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-[9px] sm:text-[10px] font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center gap-1 shadow-sm min-w-0 shrink overflow-hidden"
                      title={`Buka ${formatDomainName(project.demoUrl)}`}
                    >
                      <span className="truncate text-[8.5px] sm:text-[9.5px] font-mono leading-none">
                        {formatShortDomain(project.demoUrl)}
                      </span>
                      <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TENTANG SAYA (RINGKASAN FRONTEND POSITIONING) */}
      <section className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#0c0c0d] p-6 sm:p-10 shadow-sm space-y-6">
        <div className="space-y-2 border-b border-slate-200 dark:border-white/10 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            03 / PROFIL SINGKAT
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white">
            Tentang Saya
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              Saya <strong className="text-slate-950 dark:text-white font-bold">Ikhwan Ramadhan</strong>, lulusan S1 Teknik Informatika Universitas Putra Indonesia &ldquo;YPTK&rdquo; Padang, dengan fokus keahlian pada <strong className="text-slate-950 dark:text-white font-bold">Frontend Engineering</strong>.
            </p>
            <p>
              Dua framework utama yang saya kuasai adalah <strong className="text-slate-950 dark:text-white font-bold">Next.js</strong> (App Router, SSR/SSG/ISR, Technical SEO, Dynamic Open Graph) dan <strong className="text-slate-950 dark:text-white font-bold">Angular</strong> (Standalone Component Architecture, Reactive Programming dengan RxJS &amp; Signals). Untuk proyek antarmuka yang lebih ringan dan spesifik, saya menggunakan <strong className="text-slate-950 dark:text-white font-bold">Astro</strong> sesuai kebutuhan. Siap berkontribusi secara profesional <strong className="text-slate-950 dark:text-white font-bold"> baik On-Site (WFO) di seluruh Indonesia</strong> maupun <strong className="text-slate-950 dark:text-white font-bold">Hybrid/Remote</strong>.
            </p>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-500/5 border border-blue-200/70 dark:border-blue-500/15 space-y-1">
              <span className="font-bold text-blue-700 dark:text-blue-400 block">Next.js & React</span>
              <span className="text-blue-600/80 dark:text-blue-300/70">SSR, SSG, App Router</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 space-y-1">
              <span className="font-bold text-slate-950 dark:text-white block">Angular & RxJS</span>
              <span className="text-slate-500 dark:text-slate-400">Signals, Reactive State</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 space-y-1">
              <span className="font-bold text-slate-950 dark:text-white block">Technical SEO</span>
              <span className="text-slate-500 dark:text-slate-400">Open Graph, Schema</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 space-y-1">
              <span className="font-bold text-slate-950 dark:text-white block">Tooling & Styling</span>
              <span className="text-slate-500 dark:text-slate-400">Tailwind, Astro, Vite</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SERTIFIKAT (3 SERTIFIKAT PILIHAN) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
          <div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              04 / KREDENSIAL TERVERIFIKASI
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white mt-1">
              Sertifikasi Utama Pilihan
            </h2>
          </div>

          <button
            onClick={() => {
              setActivePage("about");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white hover:opacity-80 flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 dark:border-white/10"
          >
            <span>Lihat Semua Sertifikat ({certificationsData.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-4.5">
          {homeCertificates.map((cert) => (
            <Certificate
              key={cert.id}
              certificate={cert}
              onOpenDetail={handleOpenCertDetail}
            />
          ))}
        </div>
      </section>

      {/* 6. SKILL (KEAHLIAN & STACK TEKNIS FRONTEND) */}
      <section className="space-y-6">
        <div className="space-y-1.5 sm:space-y-2 border-b border-slate-200 dark:border-white/10 pb-3 sm:pb-4">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            05 / KEAHLIAN & TEKNOLOGI
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-slate-950 dark:text-white">
            Keahlian & Technical Stack Frontend
          </h2>
        </div>

        {/* Grid 2 baris (2 kolom) di mobile, 4 kolom di desktop */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              className="p-3.5 sm:p-4 lg:p-5 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c0c0d] flex flex-col justify-between space-y-3 sm:space-y-4 hover:border-slate-400 dark:hover:border-white/30 transition-all shadow-sm"
            >
              <div className="space-y-2 sm:space-y-2.5">
                <div className="flex items-center justify-between gap-1.5">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 truncate">
                    {cat.title}
                  </span>
                  <div className="p-1.5 sm:p-2 rounded-xl bg-slate-100 dark:bg-white/5 shrink-0">
                    {getSkillCategoryIcon(cat.iconName)}
                  </div>
                </div>

                <p className="text-[10.5px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 sm:line-clamp-3">
                  {cat.description}
                </p>
              </div>

              <div className="space-y-1.5 sm:space-y-2 pt-2 border-t border-slate-100 dark:border-white/5">
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Core Stack:
                </span>
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {cat.coreStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[8.5px] sm:text-[10px] lg:text-[11px] font-semibold rounded-full bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-white/5 truncate max-w-[100px] sm:max-w-none"
                      title={tech}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CONTACT / TAUTAN KONTAK & AKSI CEPAT */}
      <section className="rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-10 text-white space-y-6 shadow-xl">
        <div className="space-y-2 border-b border-white/10 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            06 / KONTAK & AKSI CEPAT HR
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Mari Berdiskusi & Bekerja Sama
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Terbuka untuk posisi <strong className="text-white">Junior Frontend Engineer</strong> baik On-Site (WFO) di seluruh Indonesia maupun Remote / Hybrid. Silakan akses CV atau hubungi via kanal resmi berikut:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2 items-stretch">
          {/* Profile Photo Card with Complete Contact Details */}
          <div className="lg:col-span-5 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.04] p-4 sm:p-6 flex flex-col justify-between space-y-4">
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-800 border border-white/15 shrink-0">
                <img
                  src={userProfile.avatarUrl}
                  alt={userProfile.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover object-center"
                />
                <span className="absolute bottom-1 right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400 border-2 border-slate-950"></span>
              </div>
              <div className="min-w-0 space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Siap WFO / Remote</span>
                </div>
                <h3 className="font-black text-base sm:text-lg text-white truncate">
                  {userProfile.name}
                </h3>
                <p className="text-xs text-slate-300 font-medium truncate">
                  Junior Frontend Engineer (Next.js &amp; Angular)
                </p>
              </div>
            </div>

            {/* Complete Contact Details */}
            <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
              <a
                href={`mailto:${userProfile.email}`}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-slate-200 transition-colors group"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Mail className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span className="text-slate-400 text-[11px] shrink-0">Email:</span>
                  <span className="font-mono text-[11px] truncate text-white">{userProfile.email}</span>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-white shrink-0 ml-1" />
              </a>

              <a
                href="https://github.com/IngsR"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-slate-200 transition-colors group"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Github className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                  <span className="text-slate-400 text-[11px] shrink-0">GitHub:</span>
                  <span className="font-mono text-[11px] truncate text-white">github.com/IngsR</span>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-white shrink-0 ml-1" />
              </a>

              <a
                href={userProfile.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-slate-200 transition-colors group"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-slate-400 text-[11px] shrink-0">No. WhatsApp:</span>
                  <span className="font-mono text-[11px] font-semibold text-emerald-300 truncate">{userProfile.phone}</span>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-white shrink-0 ml-1" />
              </a>

              <a
                href="https://www.linkedin.com/in/ikhwn-rdn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-slate-200 transition-colors group"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Linkedin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span className="text-slate-400 text-[11px] shrink-0">LinkedIn:</span>
                  <span className="font-mono text-[11px] truncate text-white">in/ikhwn-rdn</span>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-white shrink-0 ml-1" />
              </a>
            </div>
          </div>

          {/* Action Buttons with Rich Details */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* CV Button */}
            <button
              onClick={onOpenCV}
              className="flex items-center justify-between p-4 rounded-2xl bg-white text-slate-950 hover:bg-slate-100 transition-all text-left shadow-sm group sm:col-span-2"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-950 shrink-0">
                  <FileText className="w-5 h-5 text-slate-950" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-black uppercase tracking-wider block">
                    Curriculum Vitae
                  </span>
                  <span className="text-[11px] text-slate-600 truncate block">
                    Akses ringkasan keahlian teknis, pendidikan S1, &amp; pengalaman lengkap
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ml-2" />
            </button>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/ikhwn-rdn"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-2xl bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-sm group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2.5 rounded-xl bg-white/15 shrink-0">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-black uppercase tracking-wider block">
                    LinkedIn Profile
                  </span>
                  <span className="text-[11px] text-blue-100 font-mono truncate block">
                    linkedin.com/in/ikhwn-rdn
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ml-2" />
            </a>

            {/* WhatsApp */}
            <a
              href={userProfile.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-2xl bg-emerald-600 text-white hover:bg-emerald-500 transition-all shadow-sm group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2.5 rounded-xl bg-white/15 shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-black uppercase tracking-wider block">
                    WhatsApp &amp; Fast Response
                  </span>
                  <span className="text-[11px] text-emerald-100 font-mono truncate block">
                    {userProfile.phone}
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ml-2" />
            </a>

            {/* Email */}
            <a
              href={`mailto:${userProfile.email}`}
              className="flex items-center justify-between p-4 rounded-2xl bg-rose-600 text-white hover:bg-rose-500 transition-all shadow-sm group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2.5 rounded-xl bg-white/15 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-black uppercase tracking-wider block">
                    Kirim Pesan Email Resmi
                  </span>
                  <span className="text-[11px] text-rose-100 font-mono truncate block">
                    {userProfile.email}
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ml-2" />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/IngsR"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-white/15 text-white hover:bg-slate-800 transition-all shadow-sm group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2.5 rounded-xl bg-white/10 shrink-0">
                  <Github className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-black uppercase tracking-wider block">
                    Repositori Portofolio GitHub
                  </span>
                  <span className="text-[11px] text-slate-300 font-mono truncate block">
                    github.com/IngsR
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Pop up Detail Modal (Project / Certificate) */}
      <Detail
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        project={selectedProjectForDetail}
        certificate={selectedCertForDetail}
        onOpenMarkdown={onOpenProjectMarkdown}
      />
    </div>
  );
};
