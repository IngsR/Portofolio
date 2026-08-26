import {
  ArrowRight,
  Binary,
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  FileText,
  Github,
  GraduationCap,
  Layers,
  MapPin,
  MessageCircle,
  Server,
  Terminal,
} from "lucide-react";
import React, { useState } from "react";
import { engineeringMindsetSkills, userProfile } from "../data/portfolioData";
import { PageId, ProjectItem } from "../types";
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
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleOpenDetail = (project: ProjectItem) => {
    setSelectedProjectForDetail(project);
    setIsDetailOpen(true);
  };

  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case "Layers":
        return <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case "Layout":
        return <Code2 className="w-4 h-4 text-sky-600 dark:text-sky-400" />;
      case "Server":
        return (
          <Server className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
        );
      case "Database":
        return (
          <Database className="w-4 h-4 text-amber-600 dark:text-amber-400" />
        );
      case "Terminal":
        return (
          <Terminal className="w-4 h-4 text-purple-600 dark:text-purple-400" />
        );
      case "Binary":
        return (
          <Binary className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        );
      case "Cpu":
        return <Cpu className="w-4 h-4 text-rose-600 dark:text-rose-400" />;
      default:
        return (
          <Layers className="w-4 h-4 text-slate-800 dark:text-slate-200" />
        );
    }
  };

  return (
    <div className="space-y-16 py-6 sm:py-8">
      {/* Top Hero Section Card */}
      <section className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#0c0c0d] p-6 sm:p-10 lg:p-12 shadow-sm transition-all">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Information & Bio */}
          <div className="lg:col-span-7 space-y-6">
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-50/80 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>
                Siap On-Site / WFO di Seluruh Indonesia & Hybrid / Remote
              </span>
            </div>

            {/* Main Name & Title */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 dark:text-white">
                {userProfile.name}
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-slate-700 dark:text-slate-300">
                {userProfile.title}
              </p>
            </div>

            {/* Bio Narrative */}
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg lg:text-2xl leading-relaxed font-normal max-w-6xl">
              Lulusan S1 Teknik Informatika Universitas Putra Indonesia
              &ldquo;YPTK&rdquo; Padang yang berdedikasi membangun aplikasi web
              modern berskala penuh dengan fondasi{" "}
              <span className="font-semibold text-slate-900 dark:text-white">
                React, TypeScript, dan JavaScript
              </span>
              , lalu memperkuatnya dengan perancangan basis data{" "}
              <span className="font-semibold text-slate-900 dark:text-white">
                PostgreSQL & REST API
              </span>
              , pengelolaan lingkungan server{" "}
              <span className="font-semibold text-slate-900 dark:text-white">
                Linux Debian & Docker
              </span>
              , serta pemodelan{" "}
              <span className="font-semibold text-slate-900 dark:text-white">
                Time Series Forecasting
              </span>
              .
            </p>

            {/* Quick Specs / Availability Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
                <MapPin className="w-4 h-4 text-slate-500 dark:text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold block text-slate-900 dark:text-white">
                    Kesiapan Kerja:
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">
                    On-Site / WFO di Seluruh Indonesia & Remote
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5">
                <GraduationCap className="w-4 h-4 text-slate-500 dark:text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold block text-slate-900 dark:text-white">
                    Latar Belakang Pendidikan:
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">
                    S1 Teknik Informatika — UPI &ldquo;YPTK&rdquo;
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-view-portfolio-btn"
                onClick={() => {
                  setActivePage("portfolio");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider bg-slate-950 text-white dark:bg-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all flex items-center gap-2 shadow-sm"
              >
                <span>Lihat Portofolio</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                id="hero-whatsapp-btn"
                href={userProfile.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-2xl border border-emerald-600/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold tracking-wider transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Hubungi via WhatsApp</span>
              </a>

              <button
                id="hero-cv-btn"
                onClick={onOpenCV}
                className="px-5 py-3 rounded-2xl border border-slate-300 dark:border-white/15 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 text-xs font-semibold tracking-wider transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Curriculum Vitae</span>
              </button>
            </div>

            {/* Social Links Row */}
            <div className="flex items-center gap-4 pt-3 border-t border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400">
              <span className="text-slate-400 dark:text-slate-500 font-medium">
                Tautan Profil:
              </span>
              <div className="flex items-center gap-3 font-medium">
                {userProfile.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-950 dark:hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>{social.name}</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Profile Photo Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] p-5 sm:p-6 space-y-5 shadow-sm">
              {/* Photo Container */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-white/10 group">
                <img
                  src={userProfile.avatarUrl}
                  alt={userProfile.name}
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
                        <p class="text-xs text-slate-400 mt-1">Logo profil tidak dapat dimuat.</p>
                      `;
                      parent.appendChild(fallback);
                    }
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute bottom-2 left-2 right-2 bg-slate-950/80 backdrop-blur-md rounded-xl p-2.5 text-white text-[11px] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                    <span className="font-semibold truncate">
                      Ikhwan Ramadhan
                    </span>
                  </div>
                  <span className="text-slate-300 text-[10px] shrink-0 font-medium">
                    Full-Stack Dev
                  </span>
                </div>
              </div>

              {/* Direct Quick Info Under Photo */}
              <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-white/5">
                  <span className="text-slate-400 font-medium">Email:</span>
                  <a
                    href={`mailto:${userProfile.email}`}
                    className="font-semibold text-slate-900 dark:text-white hover:underline truncate max-w-[200px]"
                  >
                    {userProfile.email}
                  </a>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-white/5">
                  <span className="text-slate-400 font-medium">WhatsApp:</span>
                  <a
                    href={userProfile.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    {userProfile.phone}
                  </a>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400 font-medium">
                    Pendidikan:
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">
                    S1 Teknik Informatika
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REFACTORED SECTION: Keahlian Rekayasa Perangkat Lunak */}
      <section className="space-y-6">
        <div className="space-y-2 border-b border-slate-200 dark:border-white/10 pb-5">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Prinsip Kerja & Fondasi Rekayasa
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white">
            Keahlian Rekayasa Perangkat Lunak
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-slate-600 dark:text-slate-400 max-w-6xl leading-relaxed font-normal">
            Saya tidak terlalu menikmati software yang hanya selesai dibuat.
            Saya lebih tertarik pada proses di baliknya—mencari masalah, mencoba
            pendekatan, menemukan bagian yang kurang tepat, lalu membuatnya
            lebih masuk akal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {engineeringMindsetSkills.map((skill) => (
            <div
              key={skill.id}
              className="group p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c0c0d] hover:border-slate-400 dark:hover:border-white/30 hover:shadow-lg transition-all duration-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                {/* 1. Category kecil */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    {skill.category}
                  </span>
                  <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 text-slate-700 dark:text-slate-300">
                    {getSkillIcon(skill.iconName)}
                  </div>
                </div>

                {/* 2. Judul kemampuan */}
                <h3 className="font-bold text-base text-slate-950 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {skill.title}
                </h3>

                {/* 3. Narasi 1–2 kalimat */}
                <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {skill.narrative}
                </p>
              </div>

              {/* 4. Teknologi utama sebagai tag kecil & 5. Indikator Proyek Nyata */}
              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-white/5">
                <div className="flex flex-wrap gap-1.5">
                  {skill.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Diimplementasikan pada Proyek Nyata</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects Showcase */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
          <div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Karya Rekayasa Pilihan
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white mt-1">
              Proyek Unggulan Full-Stack & Sistem
            </h2>
          </div>

          <button
            onClick={() => {
              setActivePage("portfolio");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white hover:opacity-80 flex items-center gap-1.5"
          >
            <span>Lihat Semua Proyek ({featuredProjects.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.slice(0, 3).map((project) => (
            <div
              key={project.id}
              onClick={() => handleOpenDetail(project)}
              className="group rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#0c0c0d] p-5 sm:p-6 flex flex-col justify-between hover:border-slate-400 dark:hover:border-white/30 hover:shadow-lg transition-all shadow-sm cursor-pointer"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    {project.category}
                  </span>
                  {project.demoUrl && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Live Demo
                    </span>
                  )}
                </div>

                <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 dark:border-white/10">
                  <img
                    src={project.image}
                    alt={project.title}
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

                <h3 className="font-bold text-base sm:text-lg text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {project.shortDescription}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className="pt-4 mt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => handleOpenDetail(project)}
                  className="flex items-center gap-1 text-xs text-slate-950 dark:text-white font-bold hover:underline"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Detail Lengkap</span>
                </button>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
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
                      className="p-1.5 rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                      title="Buka Live Demo"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pop up Detail Modal */}
      <DetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        project={selectedProjectForDetail}
        onOpenMarkdown={onOpenProjectMarkdown}
      />
    </div>
  );
};
