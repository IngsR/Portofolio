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
  Sparkles,
  Terminal,
} from "lucide-react";
import React, { useState } from "react";
import {
  certificationsData,
  educationData,
  skillCategories,
  userProfile,
} from "../data/portfolioData";
import { CertificationItem, PageId, ProjectItem } from "../types";
import { CertificateCard } from "./CertificateCard";
import { DetailModal } from "./DetailModal";

interface HeroSectionProps {
  setActivePage: (page: PageId) => void;
  featuredProjects: ProjectItem[];
  onOpenProjectMarkdown: (project: ProjectItem) => void;
  onOpenCV: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
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
        return <Code2 className="w-5 h-5 text-sky-600 dark:text-sky-400" />;
      case "Server":
        return <Server className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case "Terminal":
        return <Terminal className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      default:
        return <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
    }
  };

  // 3 Sertifikat pilihan di Home (Problem Solving Intermediate HackerRank, AI Principles Huawei, HCIP Datacom Huawei)
  const homeCertificates: CertificationItem[] = [
    certificationsData.find((c) => c.id === "cert-5") || certificationsData[4],
    certificationsData.find((c) => c.id === "cert-2") || certificationsData[1],
    certificationsData.find((c) => c.id === "cert-3") || certificationsData[2],
  ].filter(Boolean) as CertificationItem[];

  // Pendidikan Sarjana S1
  const sarjanaEducation = educationData.filter(
    (edu) => edu.id === "edu-1" || edu.degree.toLowerCase().includes("sarjana")
  );

  return (
    <div className="space-y-16 py-6 sm:py-8">
      {/* 1. HERO PERKENALAN FRONTEND ENGINEER + CARD FOTO PROFILE & KONTAK */}
      <section className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#0c0c0d] p-6 sm:p-10 lg:p-12 shadow-sm transition-all">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Brief Introduction for 60s HR Scan */}
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
              Lulusan S1 Teknik Informatika UPI &ldquo;YPTK&rdquo; Padang, dengan spesialisasi pada{" "}
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
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-view-portfolio-btn"
                onClick={() => {
                  setActivePage("portfolio");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-950 text-white dark:bg-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all flex items-center gap-2 shadow-sm"
              >
                <span>Lihat Portofolio</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                id="hero-whatsapp-btn"
                href={userProfile.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full border border-emerald-600/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold tracking-wider transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Hubungi via WhatsApp</span>
              </a>

              <button
                id="hero-cv-btn"
                onClick={onOpenCV}
                className="px-5 py-3 rounded-full border border-slate-300 dark:border-white/15 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 text-xs font-semibold tracking-wider transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Curriculum Vitae</span>
              </button>
            </div>
          </div>

          {/* Right Column: Profile Photo Card with COMPLETE CONTACTS */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] p-5 sm:p-6 space-y-5 shadow-sm">
              {/* Photo Container */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-white/10 group">
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
                        <div class="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-3xl font-black tracking-tight mb-3">IR</div>
                        <p class="font-bold text-sm tracking-wide">Ikhwan Ramadhan</p>
                        <p class="text-xs text-slate-400 mt-1">Frontend Engineer</p>
                      `;
                      parent.appendChild(fallback);
                    }
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute bottom-2 left-2 right-2 bg-slate-950/85 backdrop-blur-md rounded-full px-3 py-2 text-white text-[11px] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse"></span>
                    <span className="font-semibold truncate">
                      {userProfile.name}
                    </span>
                  </div>
                  <span className="text-slate-300 text-[10px] shrink-0 font-medium">
                    Frontend Engineer
                  </span>
                </div>
              </div>

              {/* Explicit Contact Badges inside Profile Photo Card */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Tautan Kontak Profil HR:
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
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 text-slate-800 dark:text-slate-200 transition-all group/link shadow-xs"
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
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-rose-500/50 hover:bg-rose-50/50 dark:hover:bg-rose-950/30 text-slate-800 dark:text-slate-200 transition-all group/link shadow-xs"
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
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-slate-500/50 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 transition-all group/link shadow-xs"
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
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 text-slate-800 dark:text-slate-200 transition-all group/link shadow-xs"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <div className="p-1.5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                        <MessageCircle className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-semibold truncate">No. WA</span>
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

      {/* 2. 3 PROYEK UNGGULAN DENGAN DESKRIPSI TEKNIS FRONTEND (PROBLEM & SOLUTION) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
          <div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              01 / PROYEK PILIHAN
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white mt-1">
              3 Proyek Pilihan & Solusi Teknis
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.slice(0, 3).map((project) => (
            <div
              key={project.id}
              onClick={() => handleOpenProjectDetail(project)}
              className="group rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#0c0c0d] p-5 sm:p-6 flex flex-col justify-between hover:border-slate-400 dark:hover:border-white/30 hover:shadow-lg transition-all shadow-sm cursor-pointer"
            >
              <div className="space-y-4">
                {/* Category & Live Indicator */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/5">
                    {project.category}
                  </span>
                  {project.demoUrl && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Live Demo
                    </span>
                  )}
                </div>

                {/* Screenshot Image */}
                <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 dark:border-white/10">
                  <img
                    src={project.image}
                    alt={project.title}
                    width={640}
                    height={280}
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
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Title */}
                <h3 className="font-bold text-base sm:text-lg text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                  {project.title}
                </h3>

                {/* Frontend Problem & Solution Box */}
                <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-white/[0.03] p-3.5 rounded-2xl border border-slate-200/60 dark:border-white/5">
                  <div>
                    <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 mb-0.5">
                      🎯 Masalah:
                    </span>
                    <p className="text-[12px] leading-relaxed text-slate-700 dark:text-slate-300">
                      {project.problem || project.shortDescription}
                    </p>
                  </div>

                  {project.solution && (
                    <div className="pt-2 border-t border-slate-200/60 dark:border-white/5">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mb-0.5">
                        💡 Solusi Teknis:
                      </span>
                      <p className="text-[12px] leading-relaxed text-slate-700 dark:text-slate-300">
                        {project.solution}
                      </p>
                    </div>
                  )}
                </div>

                {/* Tech Tags (Capsule Style) */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[10px] font-medium rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons Footer with Capsule Buttons */}
              <div
                className="pt-4 mt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => handleOpenProjectDetail(project)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-bold hover:bg-slate-100 dark:hover:bg-white/10 text-xs transition-all"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Detail Teknis</span>
                </button>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
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
                      className="px-3.5 py-1.5 rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center gap-1 shadow-sm"
                      title="Buka Live Demo"
                    >
                      <span>Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TENTANG SAYA (RINGKASAN FRONTEND POSITIONING) */}
      <section className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#0c0c0d] p-6 sm:p-10 shadow-sm space-y-6">
        <div className="space-y-2 border-b border-slate-200 dark:border-white/10 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            02 / PROFIL SINGKAT
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
              Keahlian utama saya bertumpu pada <strong className="text-slate-950 dark:text-white font-bold">React.js dan TypeScript</strong> dengan dua framework utama: <strong className="text-slate-950 dark:text-white font-bold">Next.js</strong> (App Router, SSR/SSG/ISR, Dynamic Open Graph &amp; Technical SEO) dan <strong className="text-slate-950 dark:text-white font-bold">Angular</strong> (Component Architecture, Reactive Programming dengan RxJS &amp; Signals). Saya juga memanfaatkan <strong className="text-slate-950 dark:text-white font-bold">Astro &amp; Vite</strong> untuk proyek antarmuka ringan. Siap berkontribusi profesional secara <strong className="text-slate-950 dark:text-white font-bold">On-Site (WFO) di seluruh Indonesia</strong> maupun <strong className="text-slate-950 dark:text-white font-bold">Remote / Hybrid</strong>.
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

      {/* 4. SERTIFIKAT (3 SERTIFIKAT PILIHAN) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
          <div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              03 / KREDENSIAL TERVERIFIKASI
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white mt-1">
              Sertifikasi Utama (3 Sertifikat Pilihan)
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {homeCertificates.map((cert) => (
            <CertificateCard
              key={cert.id}
              certificate={cert}
              onOpenDetail={handleOpenCertDetail}
            />
          ))}
        </div>
      </section>

      {/* 5. PENDIDIKAN (SARJANA S1) */}
      <section className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#0c0c0d] p-6 sm:p-10 shadow-sm space-y-6">
        <div className="space-y-2 border-b border-slate-200 dark:border-white/10 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            04 / PENDIDIKAN AKADEMIS
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

      {/* 6. SKILL (KEAHLIAN & STACK TEKNIS FRONTEND) */}
      <section className="space-y-6">
        <div className="space-y-2 border-b border-slate-200 dark:border-white/10 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            05 / KEAHLIAN & TEKNOLOGI
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white">
            Keahlian & Technical Stack Frontend
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              className="p-5 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c0c0d] space-y-4 hover:border-slate-400 dark:hover:border-white/30 transition-all shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {cat.title}
                </span>
                <div className="p-2 rounded-full bg-slate-100 dark:bg-white/5">
                  {getSkillCategoryIcon(cat.iconName)}
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {cat.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Core Stack:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {cat.coreStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-white/5"
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
            Terbuka untuk posisi <strong className="text-white">Frontend Engineer</strong> baik On-Site (WFO) di seluruh Indonesia maupun Remote / Hybrid. Silakan akses CV atau hubungi via kanal resmi berikut:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          {/* CV Button */}
          <button
            onClick={onOpenCV}
            className="flex items-center justify-between px-5 py-3.5 rounded-full bg-white text-slate-950 hover:bg-slate-100 transition-all font-bold text-xs shadow-sm group"
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-slate-950" />
              <span>Curriculum Vitae</span>
            </div>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* LinkedIn Link */}
          <a
            href="https://www.linkedin.com/in/ikhwn-rdn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-5 py-3.5 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-all font-bold text-xs shadow-sm group"
          >
            <div className="flex items-center gap-2.5 truncate">
              <Linkedin className="w-4 h-4 shrink-0" />
              <span className="truncate">LinkedIn</span>
            </div>
            <ArrowUpRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* GitHub Link */}
          <a
            href="https://github.com/IngsR"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-5 py-3.5 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-all font-bold text-xs border border-white/10 shadow-sm group"
          >
            <div className="flex items-center gap-2.5 truncate">
              <Github className="w-4 h-4 shrink-0" />
              <span className="truncate">GitHub</span>
            </div>
            <ArrowUpRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Email Link */}
          <a
            href={`mailto:${userProfile.email}`}
            className="flex items-center justify-between px-5 py-3.5 rounded-full bg-rose-600 text-white hover:bg-rose-500 transition-all font-bold text-xs shadow-sm group"
          >
            <div className="flex items-center gap-2.5 truncate">
              <Mail className="w-4 h-4 shrink-0" />
              <span className="truncate">Email</span>
            </div>
            <ArrowUpRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* WhatsApp Link */}
          <a
            href={userProfile.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-5 py-3.5 rounded-full bg-emerald-600 text-white hover:bg-emerald-500 transition-all font-bold text-xs shadow-sm group"
          >
            <div className="flex items-center gap-2.5 truncate">
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span className="truncate">No. WA</span>
            </div>
            <ArrowUpRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </section>

      {/* Pop up Detail Modal (Project / Certificate) */}
      <DetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        project={selectedProjectForDetail}
        certificate={selectedCertForDetail}
        onOpenMarkdown={onOpenProjectMarkdown}
      />
    </div>
  );
};
