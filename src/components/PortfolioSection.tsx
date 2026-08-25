import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectItem, CertificationItem } from '../types';
import { certificationsData } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';
import { CertificateCard } from './CertificateCard';
import { DetailModal } from './DetailModal';
import { 
  Search, 
  PlusCircle, 
  X, 
  Layers,
  Award,
  ArrowUpDown,
  FolderGit2,
  Sparkles,
  Grid
} from 'lucide-react';

interface PortfolioSectionProps {
  projects: ProjectItem[];
  onOpenMarkdown: (project: ProjectItem) => void;
  onOpenCreateModal: () => void;
}

const POPULAR_KEYWORDS = [
  'Next.js',
  'TypeScript',
  'PostgreSQL',
  'Drizzle ORM',
  'NestJS',
  'Time Series Forecasting',
  'Python',
  'Docker',
  'Linux Debian',
  'Prisma',
  'REST API'
];

type PortfolioFilterType = 'all' | 'projects' | 'certificates';
type SortOption = 'relevance' | 'date' | 'title';

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  projects,
  onOpenMarkdown,
  onOpenCreateModal,
}) => {
  // Main view filter: 'all' (Tampilkan Semua), 'projects' (Project), 'certificates' (Sertifikasi & Lisensi)
  const [filterType, setFilterType] = useState<PortfolioFilterType>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Modal State for Project / Certificate Detail Pop-up
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState<ProjectItem | null>(null);
  const [selectedCertificateForDetail, setSelectedCertificateForDetail] = useState<CertificationItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Categories based on active filter
  const allCategories = useMemo(() => {
    const projectCats = projects.map((p) => p.category).filter(Boolean);
    const certCats = certificationsData.map((c) => c.category || 'Sertifikasi').filter(Boolean);
    
    if (filterType === 'projects') {
      return ['Semua', ...Array.from(new Set(projectCats))];
    }
    if (filterType === 'certificates') {
      return ['Semua', ...Array.from(new Set(certCats))];
    }
    return ['Semua', ...Array.from(new Set([...projectCats, ...certCats]))];
  }, [projects, filterType]);

  // Filtered and Sorted Projects
  const filteredProjects = useMemo(() => {
    if (filterType === 'certificates') return [];

    const q = searchQuery.toLowerCase().trim();
    const tokens = q.split(/\s+/).filter(Boolean);

    const matches = projects.filter((project) => {
      // Category filter
      const matchCategory =
        selectedCategory === 'Semua' || project.category === selectedCategory;
      if (!matchCategory) return false;

      // Search tokens
      if (tokens.length === 0) return true;

      const titleLower = project.title.toLowerCase();
      const descLower = project.shortDescription.toLowerCase();
      const tagsLower = project.tags.map((t) => t.toLowerCase());
      const mdLower = project.markdownContent.toLowerCase();
      const categoryLower = project.category.toLowerCase();

      return tokens.every((token) => {
        return (
          titleLower.includes(token) ||
          descLower.includes(token) ||
          tagsLower.some((t) => t.includes(token)) ||
          mdLower.includes(token) ||
          categoryLower.includes(token)
        );
      });
    });

    return [...matches].sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'date') {
        return b.id.localeCompare(a.id);
      }
      if (q) {
        let scoreA = 0;
        let scoreB = 0;
        if (a.title.toLowerCase().includes(q)) scoreA += 50;
        if (b.title.toLowerCase().includes(q)) scoreB += 50;
        return scoreB - scoreA;
      }
      return 0;
    });
  }, [projects, filterType, selectedCategory, searchQuery, sortBy]);

  // Filtered Certificates
  const filteredCerts = useMemo(() => {
    if (filterType === 'projects') return [];

    const q = searchQuery.toLowerCase().trim();
    const tokens = q.split(/\s+/).filter(Boolean);

    const matches = certificationsData.filter((cert) => {
      const matchCategory =
        selectedCategory === 'Semua' || cert.category === selectedCategory;
      if (!matchCategory) return false;

      if (tokens.length === 0) return true;

      const titleLower = cert.title.toLowerCase();
      const issuerLower = cert.issuer.toLowerCase();
      const descLower = (cert.description || '').toLowerCase();
      const skillsLower = (cert.skills || []).map((s) => s.toLowerCase());

      return tokens.every((token) => {
        return (
          titleLower.includes(token) ||
          issuerLower.includes(token) ||
          descLower.includes(token) ||
          skillsLower.some((s) => s.includes(token))
        );
      });
    });

    return matches;
  }, [filterType, selectedCategory, searchQuery]);

  const totalItemsCount = filteredProjects.length + filteredCerts.length;

  const handleOpenProjectDetail = (proj: ProjectItem) => {
    setSelectedProjectForDetail(proj);
    setSelectedCertificateForDetail(null);
    setIsDetailModalOpen(true);
  };

  const handleOpenCertDetail = (cert: CertificationItem) => {
    setSelectedCertificateForDetail(cert);
    setSelectedProjectForDetail(null);
    setIsDetailModalOpen(true);
  };

  const handleKeywordClick = (keyword: string) => {
    if (searchQuery.toLowerCase() === keyword.toLowerCase()) {
      setSearchQuery('');
    } else {
      setSearchQuery(keyword);
      searchInputRef.current?.focus();
    }
  };

  const handleResetFilters = () => {
    setFilterType('all');
    setSelectedCategory('Semua');
    setSearchQuery('');
    setSortBy('relevance');
    searchInputRef.current?.focus();
  };

  return (
    <div className="space-y-8 py-6 sm:py-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-white/10">
        <div className="space-y-1.5">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 dark:text-white">
            Portofolio
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl font-light">
            Koleksi lengkap project full-stack web, perancangan basis data, REST API, dan sertifikasi kredensial teknis.
          </p>
        </div>
      </div>

      {/* Main Filter Buttons (Semua, Project, Sertifikasi & Lisensi) */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 dark:border-white/10 pb-4">
        
        {/* Tombol Tampilkan Semua */}
        <button
          id="filter-all-btn"
          onClick={() => {
            setFilterType('all');
            setSelectedCategory('Semua');
          }}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
            filterType === 'all'
              ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-sm'
              : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
          }`}
        >
          <Grid className="w-3.5 h-3.5" />
          <span>Semua ({projects.length + certificationsData.length})</span>
        </button>

        {/* Tombol Project */}
        <button
          id="filter-projects-btn"
          onClick={() => {
            setFilterType('projects');
            setSelectedCategory('Semua');
          }}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
            filterType === 'projects'
              ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-sm'
              : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Project ({projects.length})</span>
        </button>

        {/* Tombol Sertifikasi & Lisensi */}
        <button
          id="filter-certificates-btn"
          onClick={() => {
            setFilterType('certificates');
            setSelectedCategory('Semua');
          }}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
            filterType === 'certificates'
              ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-sm'
              : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Sertifikasi & Lisensi ({certificationsData.length})</span>
        </button>
      </div>

      {/* Filter and Search Controls */}
      <div className="space-y-4">
        
        {/* Search Input Bar */}
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>

          <input
            ref={searchInputRef}
            id="portfolio-search-input"
            type="text"
            placeholder="Cari berdasarkan judul, tech stack (Next.js, PostgreSQL, Docker, dll), atau sertifikasi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-24 py-3 rounded-2xl bg-white dark:bg-[#0f0f11] border border-slate-200 dark:border-white/10 text-slate-950 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:border-slate-500 dark:focus:border-white/40 transition-all shadow-sm"
          />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  searchInputRef.current?.focus();
                }}
                className="p-1 text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors"
                title="Hapus pencarian"
                aria-label="Hapus pencarian"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Keyword Suggestion Tags */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-xs text-slate-400 mr-1">
            Kata kunci:
          </span>
          {POPULAR_KEYWORDS.map((kw) => {
            const isActive = searchQuery.toLowerCase() === kw.toLowerCase();
            return (
              <button
                key={kw}
                onClick={() => handleKeywordClick(kw)}
                className={`px-2.5 py-1 text-xs rounded-lg transition-all border ${
                  isActive
                    ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 border-transparent font-semibold'
                    : 'bg-white dark:bg-[#0f0f11] border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                #{kw}
              </button>
            );
          })}
        </div>

        {/* Category Pills & Sort Dropdown */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
          
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {allCategories.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs rounded-xl transition-all whitespace-nowrap border ${
                    isSelected
                      ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 border-transparent font-bold shadow-sm'
                      : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white bg-white dark:bg-[#0f0f11]'
                  }`}
                >
                  <span>{category}</span>
                </button>
              );
            })}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-start lg:self-auto shrink-0 text-xs">
            <span className="text-slate-400 flex items-center gap-1">
              <ArrowUpDown className="w-3 h-3" />
              <span>Urutkan:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#0f0f11] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-slate-500 cursor-pointer"
            >
              <option value="relevance">Relevansi</option>
              <option value="date">Terbaru</option>
              <option value="title">Judul (A-Z)</option>
            </select>
          </div>

        </div>

      </div>

      {/* Results Counter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 px-1 py-2 border-y border-slate-100 dark:border-white/5">
        <div>
          <span>
            Menampilkan <strong className="text-slate-950 dark:text-white">{totalItemsCount}</strong> karya & sertifikat
            {filterType === 'all' && ` (${filteredProjects.length} project, ${filteredCerts.length} sertifikat)`}
          </span>
        </div>

        {(selectedCategory !== 'Semua' || searchQuery || filterType !== 'all' || sortBy !== 'relevance') && (
          <button
            onClick={handleResetFilters}
            className="text-slate-950 dark:text-white hover:underline font-semibold text-xs"
          >
            Reset Semua Filter
          </button>
        )}
      </div>

      {/* Content Rendering */}
      {totalItemsCount === 0 ? (
        <div className="py-16 text-center rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] space-y-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-950 dark:text-white">
              Tidak ada hasil yang sesuai
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Tidak ditemukan item dengan kriteria pencarian atau kategori yang dipilih.
            </p>
          </div>

          <div>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-xs font-bold hover:opacity-90 transition-all shadow-sm"
            >
              Reset Filter
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-12">
          
          {/* Projects Section (Rendered if filter is 'all' or 'projects') */}
          {filteredProjects.length > 0 && (
            <div className="space-y-5">
              {filterType === 'all' && (
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                      Project ({filteredProjects.length})
                    </h2>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Aplikasi & Sistem Produksi
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onOpenDetail={handleOpenProjectDetail}
                    onOpenMarkdown={onOpenMarkdown}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Certifications Section (Rendered if filter is 'all' or 'certificates') */}
          {filteredCerts.length > 0 && (
            <div className="space-y-5">
              {filterType === 'all' && (
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                      Sertifikasi & Lisensi ({filteredCerts.length})
                    </h2>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Validasi Kompetensi Teknis Resmi
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCerts.map((cert) => (
                  <CertificateCard
                    key={cert.id}
                    certificate={cert}
                    onOpenDetail={handleOpenCertDetail}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* Item Detail Pop-up Modal */}
      <DetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        project={selectedProjectForDetail}
        certificate={selectedCertificateForDetail}
        onOpenMarkdown={onOpenMarkdown}
      />

    </div>
  );
};
