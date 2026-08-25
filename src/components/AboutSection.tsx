import React, { useState } from 'react';
import { 
  userProfile, 
  skillCategories, 
  experienceData, 
  educationData, 
  certificationsData 
} from '../data/portfolioData';
import { CertificationItem } from '../types';
import { DetailModal } from './DetailModal';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  FileText, 
  Code2,
  Terminal,
  Server,
  Layout,
  Cpu,
  ArrowUpRight,
  MapPin,
  Mail,
  MessageCircle,
  CheckCircle2,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface AboutSectionProps {
  onOpenCV: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenCV,
}) => {
  const [activeTab, setActiveTab] = useState<'experience' | 'skills' | 'education'>('experience');
  const [selectedCertForModal, setSelectedCertForModal] = useState<CertificationItem | null>(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  const handleOpenCertModal = (cert: CertificationItem) => {
    setSelectedCertForModal(cert);
    setIsCertModalOpen(true);
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout':
        return <Layout className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'Server':
        return <Server className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'Terminal':
        return <Terminal className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-rose-600 dark:text-rose-400" />;
      default:
        return <Code2 className="w-4 h-4 text-slate-800 dark:text-slate-200" />;
    }
  };

  return (
    <div className="space-y-12 py-6 sm:py-8">
      
      {/* Header Profile Story */}
      <section className="bg-white dark:bg-[#0c0c0d] border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12 space-y-8 shadow-sm">
        
        {/* Top Profile Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-white/10">
          
          <div className="flex items-center gap-5">
            {/* Avatar container */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-white/10 shrink-0">
              <img
                src={userProfile.avatarUrl}
                alt={userProfile.name}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.about-avatar-fallback')) {
                    const fallback = document.createElement('div');
                    fallback.className = 'about-avatar-fallback w-full h-full flex items-center justify-center bg-slate-950 text-white font-black text-2xl tracking-tighter';
                    fallback.textContent = 'IR';
                    parent.appendChild(fallback);
                  }
                }}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Profil Profesional & Latar Belakang
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-950 dark:text-white">
                {userProfile.name}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">
                {userProfile.title}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenCV}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-xs font-bold uppercase tracking-wider hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-sm"
            >
              <FileText className="w-4 h-4" />
              <span>Lihat CV Lengkap</span>
            </button>

            <a
              href={userProfile.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-emerald-600/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-bold tracking-wider hover:bg-emerald-500/20 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`mailto:${userProfile.email}`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/15 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          </div>
        </div>

        {/* Bio Narrative Paragraphs */}
        <div className="space-y-4 text-sm sm:text-base lg:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-5xl font-normal">
          {userProfile.fullBio.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Summary Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5 space-y-1.5">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Kesiapan Kerja</span>
            <h4 className="font-bold text-sm text-slate-950 dark:text-white">
              On-Site / WFO & Remote
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-normal">
              Siap bekerja on-site / WFO di seluruh Indonesia, serta sistem kerja Hybrid / Remote.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5 space-y-1.5">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Pendidikan Terakhir</span>
            <h4 className="font-bold text-sm text-slate-950 dark:text-white">
              S1 Teknik Informatika
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-normal">
              Lulusan Universitas Putra Indonesia &ldquo;YPTK&rdquo; Padang dengan fokus Rekayasa Perangkat Lunak & Time Series Forecasting.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5 space-y-1.5">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Fokus Keahlian</span>
            <h4 className="font-bold text-sm text-slate-950 dark:text-white">
              Full-Stack & Systems
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-normal">
              Next.js, TypeScript, PostgreSQL, Drizzle ORM, REST API, Docker, Linux Debian, dan Python Data Science.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs Navigation for Experience / Skills / Education */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('experience')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'experience'
                ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 font-bold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Pengalaman Kerja & Proyek</span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'skills'
                ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 font-bold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Keahlian Teknis & Tools</span>
          </button>

          <button
            onClick={() => setActiveTab('education')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'education'
                ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 font-bold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Pendidikan & Sertifikasi</span>
          </button>
        </div>

        {/* Tab 1: Experience */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-slate-200 dark:before:bg-white/10">
              {experienceData.map((exp) => (
                <div key={exp.id} className="relative space-y-3">
                  {/* Timeline Dot */}
                  <div className="absolute -left-6 sm:-left-8 top-1.5 w-3 h-3 rounded-full bg-slate-950 dark:bg-white border-2 border-white dark:border-slate-900" />

                  <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0c0c0d] border border-slate-200/80 dark:border-white/10 space-y-4 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-white/10 pb-4">
                      <div>
                        <h3 className="font-bold text-lg text-slate-950 dark:text-white">
                          {exp.role}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                          {exp.company} • {exp.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
                        <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200 font-medium">
                          {exp.period}
                        </span>
                        <span className="px-3 py-1 rounded-lg border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-semibold">
                          {exp.type}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm lg:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                      {exp.description}
                    </p>

                    <div className="space-y-2 pt-1">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Pencapaian Utama:
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-normal">
                        {exp.achievements.map((ach, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {exp.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 text-[10px] rounded-md text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 font-medium"
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

        {/* Tab 2: Skills */}
        {activeTab === 'skills' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((cat, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0c0c0d] border border-slate-200/80 dark:border-white/10 space-y-5 shadow-sm"
              >
                <div className="flex items-center gap-3 border-b border-slate-100 dark:border-white/10 pb-4">
                  <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/5">
                    {getCategoryIcon(cat.iconName)}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-950 dark:text-white">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5 pt-1">
                  {cat.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-slate-900 dark:text-white flex items-center gap-1.5">
                          {skill.name}
                          {skill.isPrimary && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-950 text-white dark:bg-white dark:text-slate-950 font-bold">
                              Utama
                            </span>
                          )}
                        </span>
                        <span className="text-slate-400 dark:text-slate-500 text-[11px]">
                          {skill.experience}
                        </span>
                      </div>
                      
                      {/* Skill progress bar */}
                      <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                        <div
                          className="h-full bg-slate-950 dark:bg-white transition-all duration-500"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Education & Certifications */}
        {activeTab === 'education' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Education */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-950 dark:text-white font-bold text-lg pb-2 border-b border-slate-200 dark:border-white/10">
                <GraduationCap className="w-5 h-5" />
                <h2>Riwayat Pendidikan</h2>
              </div>

              {educationData.map((edu) => (
                <div
                  key={edu.id}
                  className="p-6 rounded-3xl bg-white dark:bg-[#0c0c0d] border border-slate-200/80 dark:border-white/10 space-y-2.5 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-base text-slate-950 dark:text-white">
                      {edu.degree}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-md text-xs bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200 font-semibold">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {edu.institution}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal pt-1">
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-950 dark:text-white font-bold text-lg pb-2 border-b border-slate-200 dark:border-white/10">
                <Award className="w-5 h-5" />
                <h2>Sertifikasi & Kredensial</h2>
              </div>

              <div className="space-y-3">
                {certificationsData.map((cert) => (
                  <div
                    key={cert.id}
                    onClick={() => handleOpenCertModal(cert)}
                    className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0c0c0d] border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:border-slate-400 dark:hover:border-white/30 cursor-pointer transition-all group"
                  >
                    <div className="flex items-start sm:items-center gap-3.5">
                      {/* Certificate Screenshot Thumbnail */}
                      <div className="relative w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-white/10 shrink-0">
                        <img
                          src={cert.image}
                          alt={cert.title}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (cert.fallbackImage && target.src !== cert.fallbackImage) {
                              target.src = cert.fallbackImage;
                            }
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                            {cert.category || 'Kredensial'}
                          </span>
                          {cert.badgeCode && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-bold">
                              {cert.badgeCode}
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-sm sm:text-base text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {cert.title}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                          {cert.issuer} • {cert.period || cert.issueDate}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenCertModal(cert);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-white text-xs font-semibold transition-all"
                        title="Lihat Screenshot & Detail"
                      >
                        <span>Lihat Screenshot</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Pop up modal for certificate detail */}
      <DetailModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        certificate={selectedCertForModal}
      />

    </div>
  );
};
