import { ArrowUpDown, Award, Grid, Layers, Search, X } from "lucide-react";
import React, { useCallback, useMemo, useRef, useState } from "react";
import portfolioData from "../../data/portfolio.json";
import {
  isDetailOpenStore,
  isPreviewOpenStore,
  selectedCertForDetailStore,
  selectedPreviewItemStore,
  selectedProjectForDetailStore,
} from "../../store/portfolio";
import { CertificationItem, ProjectItem } from "../../types";
import { DetailModalIsland, PreviewModalIsland } from "../modal/modal-islands";
import { AnimatedTabs } from "../ui/animated-tabs";
import { LazyMount } from "../ui/lazy-mount";
import { Certificate } from "./certificate";
import { Project } from "./project";

const { certifications: certificationsData } = portfolioData as {
  certifications: CertificationItem[];
};

interface PortfolioSectionProps {
  projects: ProjectItem[];
  onOpenMarkdown: (project: ProjectItem) => void;
  onOpenCreateModal: () => void;
}

type PortfolioFilterType = "all" | "projects" | "certificates";
type SortOption = "relevance" | "date" | "title";

const FILTER_KEYWORDS = [
  "Next.js",
  "REST API",
  "TypeScript",
  "React",
  "Zod",
  "SSR / SSG",
  "Tailwind CSS",
] as const;

const FILTER_CATEGORIES = [
  "Semua",
  "Next.js & Performance",
  "Angular & Reactive Architecture",
  "Astro & Geospatial UI",
  "React & Next.js UI",
  "Design System & Monorepo",
  "Dashboard & Data Grid",
  "Mobile Frontend",
  "Lainnya",
] as const;

const isListedCategory = (category: string) =>
  FILTER_CATEGORIES.some(
    (filterCategory) =>
      filterCategory !== "Semua" &&
      filterCategory !== "Lainnya" &&
      filterCategory === category,
  );

export const Portfolio: React.FC<PortfolioSectionProps> = ({
  projects,
  onOpenMarkdown,
  onOpenCreateModal,
}) => {
  // Main view filter: 'all' (Tampilkan Semua), 'projects' (Project), 'certificates' (Sertifikasi & Lisensi)
  const [filterType, setFilterType] = useState<PortfolioFilterType>("all");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "Semua",
  ]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [showAllKeywords, setShowAllKeywords] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Modal state hidup di island terpisah (DetailModalIsland/PreviewModalIsland)
  // yang subscribe store sendiri — buka/tutup modal tidak me-render ulang
  // halaman ini beserta seluruh grid card.

  // Handler stabil (useCallback) agar memo() pada card Project/Certificate
  // efektif: perubahan state filter/search tidak me-render ulang card mana pun
  // yang datanya tidak berubah.
  const handleOpenProjectPreview = useCallback((project: ProjectItem) => {
    selectedPreviewItemStore.set(project);
    isPreviewOpenStore.set(true);
  }, []);

  const handleOpenCertPreview = useCallback((cert: CertificationItem) => {
    selectedPreviewItemStore.set(cert);
    isPreviewOpenStore.set(true);
  }, []);

  // Categories based on active filter
  const allCategories = FILTER_CATEGORIES;

  const keywordGroups = useMemo(() => {
    const projectTags = projects
      .flatMap((project) => project.tags || [])
      .map((tag) => tag.trim())
      .filter(Boolean);
    const availableTags = new Set(projectTags);

    const knownKeywords = FILTER_KEYWORDS.filter((keyword) =>
      availableTags.has(keyword),
    );
    const otherKeywords = Array.from(
      new Set(
        projectTags.filter(
          (tag) =>
            !FILTER_KEYWORDS.some(
              (knownKeyword) =>
                knownKeyword.toLowerCase() === tag.toLowerCase(),
            ),
        ),
      ),
    );

    return { knownKeywords, otherKeywords };
  }, [projects]);

  const visibleKeywords = showAllKeywords
    ? [...keywordGroups.knownKeywords, ...keywordGroups.otherKeywords]
    : keywordGroups.knownKeywords;

  // Filtered and Sorted Projects
  const filteredProjects = useMemo(() => {
    if (filterType === "certificates") return [];

    const q = searchQuery.toLowerCase().trim();
    const tokens = q.split(/\s+/).filter(Boolean);

    const matches = projects.filter((project) => {
      // Category filter
      const matchCategory =
        selectedCategories.includes("Semua") ||
        selectedCategories.some((selectedCategory) =>
          selectedCategory === "Lainnya"
            ? !isListedCategory(project.category)
            : selectedCategory === project.category,
        );
      if (!matchCategory) return false;

      const projectTags = new Set(
        (project.tags || [])
          .map((tag) => tag.trim().toLowerCase())
          .filter(Boolean),
      );
      if (
        selectedKeywords.some(
          (keyword) => !projectTags.has(keyword.toLowerCase()),
        )
      ) {
        return false;
      }

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
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === "date") {
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
  }, [
    projects,
    filterType,
    selectedCategories,
    selectedKeywords,
    searchQuery,
    sortBy,
  ]);

  // Filtered Certificates
  const filteredCerts = useMemo(() => {
    if (filterType === "projects") return [];

    const q = searchQuery.toLowerCase().trim();
    const tokens = q.split(/\s+/).filter(Boolean);

    const matches = certificationsData.filter((cert) => {
      const certificateCategory = cert.category || "Sertifikasi";
      const matchCategory =
        selectedCategories.includes("Semua") ||
        selectedCategories.some((selectedCategory) =>
          selectedCategory === "Lainnya"
            ? !isListedCategory(certificateCategory)
            : selectedCategory === certificateCategory,
        );
      if (!matchCategory) return false;

      if (tokens.length === 0) return true;

      const titleLower = cert.title.toLowerCase();
      const issuerLower = cert.issuer.toLowerCase();
      const descLower = (cert.description || "").toLowerCase();
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
  }, [filterType, selectedCategories, searchQuery]);

  const totalItemsCount = filteredProjects.length + filteredCerts.length;

  const handleOpenProjectDetail = useCallback((proj: ProjectItem) => {
    selectedProjectForDetailStore.set(proj);
    selectedCertForDetailStore.set(null);
    isDetailOpenStore.set(true);
  }, []);

  const handleOpenCertDetail = useCallback((cert: CertificationItem) => {
    selectedCertForDetailStore.set(cert);
    selectedProjectForDetailStore.set(null);
    isDetailOpenStore.set(true);
  }, []);

  // Identitas stabil untuk prop onOpenMarkdown card (menjaga memo() efektif)
  const handleOpenMarkdown = useCallback(
    (project: ProjectItem) => onOpenMarkdown(project),
    [onOpenMarkdown],
  );

  const handleKeywordClick = useCallback((keyword: string) => {
    setSelectedKeywords((current) =>
      current.includes(keyword)
        ? current.filter((item) => item !== keyword)
        : [...current, keyword],
    );
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilterType("all");
    setSelectedCategories(["Semua"]);
    setSelectedKeywords([]);
    setShowAllKeywords(false);
    setSearchQuery("");
    setSortBy("relevance");
    searchInputRef.current?.focus();
  }, []);

  return (
    <div className="space-y-8 py-6 sm:py-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-white/[0.08]">
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Karya Teknis
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 dark:text-white">
            Portofolio
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
            Rekayasa antarmuka web modern, arsitektur Next.js &amp; Angular,
            Technical SEO &amp; sistem produksi yang saya rancang dan bangun.
          </p>
        </div>
      </div>

      {/* Main Filter Tabs */}
      <AnimatedTabs
        activeTab={filterType}
        onTabChange={(id) => {
          const type = id as PortfolioFilterType;
          setFilterType(type);
          setSelectedCategories(["Semua"]);
          setSelectedKeywords([]);
        }}
        tabs={[
          {
            id: "all",
            label: `Semua (${projects.length + certificationsData.length})`,
            icon: <Grid className="w-3 h-3" />,
          },
          {
            id: "projects",
            label: `Project (${projects.length})`,
            icon: <Layers className="w-3 h-3" />,
          },
          {
            id: "certificates",
            label: `Sertifikasi (${certificationsData.length})`,
            icon: <Award className="w-3 h-3" />,
          },
        ]}
      />

      {/* Filter and Search Controls */}
      <div className="space-y-4">
        {/* Search Input Bar */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>

          <input
            ref={searchInputRef}
            id="portfolio-search-input"
            type="text"
            placeholder="Cari judul, tech stack, atau sertifikasi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-2.5 rounded-xl bg-white dark:bg-[#0d0d0f] border border-slate-200 dark:border-white/10 text-slate-950 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 text-sm focus:outline-none focus:border-slate-400 dark:focus:border-white/25 transition-all"
          />

          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                searchInputRef.current?.focus();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors"
              title="Hapus pencarian"
              aria-label="Hapus pencarian"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Keyword Tags */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-medium text-slate-400 dark:text-slate-600 uppercase tracking-wider mr-0.5">
            Filter:
          </span>
          {visibleKeywords.map((kw) => {
            const isActive = selectedKeywords.includes(kw);
            return (
              <button
                key={kw}
                onClick={() => handleKeywordClick(kw)}
                className={`inline-flex items-center px-2.5 py-1 text-[11px] rounded-full transition-all border font-medium ${
                  isActive
                    ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950 border-transparent"
                    : "bg-white dark:bg-transparent border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-400 hover:border-slate-400 dark:hover:border-white/25 hover:text-slate-950 dark:hover:text-white"
                }`}
              >
                #{kw}
              </button>
            );
          })}
          {keywordGroups.otherKeywords.length > 0 && (
            <button
              type="button"
              onClick={() => setShowAllKeywords((v) => !v)}
              className="inline-flex px-2.5 py-1 text-[11px] rounded-full border border-dashed border-slate-300 dark:border-white/10 text-slate-500 dark:text-slate-500 hover:text-slate-950 dark:hover:text-white transition-all"
            >
              {showAllKeywords ? "Sembunyikan" : "Lainnya"}
            </button>
          )}
        </div>

        {/* Category Pills & Sort */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex flex-1 min-w-0 flex-wrap items-center gap-1.5">
            {allCategories.map((category) => {
              const isSelected = selectedCategories.includes(category);
              return (
                <button
                  key={category}
                  onClick={() => {
                    if (category === "Semua") {
                      setSelectedCategories(["Semua"]);
                      return;
                    }
                    setSelectedCategories((current) => {
                      const withoutAll = current.filter(
                        (item) => item !== "Semua",
                      );
                      const next = withoutAll.includes(category)
                        ? withoutAll.filter((item) => item !== category)
                        : [...withoutAll, category];
                      return next.length > 0 ? next : ["Semua"];
                    });
                  }}
                  className={`px-3 py-1 text-[11px] rounded-full transition-all whitespace-nowrap border font-medium ${
                    isSelected
                      ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950 border-transparent"
                      : "border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-white/25 hover:text-slate-950 dark:hover:text-white bg-white dark:bg-transparent"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 self-start shrink-0">
            <span className="text-[10px] text-slate-400 dark:text-slate-600 uppercase tracking-wider flex items-center gap-1">
              <ArrowUpDown className="w-3 h-3" />
              Urut:
            </span>
            <select
              value={sortBy}
              onChange={(e) => {
                const value = e.target.value;
                if (
                  value === "relevance" ||
                  value === "date" ||
                  value === "title"
                )
                  setSortBy(value);
              }}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#0d0d0f] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-slate-400 cursor-pointer"
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
            Menampilkan{" "}
            <strong className="text-slate-950 dark:text-white">
              {totalItemsCount}
            </strong>{" "}
            karya & sertifikat
            {filterType === "all" &&
              ` (${filteredProjects.length} project, ${filteredCerts.length} sertifikat)`}
          </span>
        </div>

        {(selectedCategories.some((category) => category !== "Semua") ||
          selectedKeywords.length > 0 ||
          searchQuery ||
          filterType !== "all" ||
          sortBy !== "relevance") && (
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
              Tidak ditemukan item dengan kriteria pencarian atau kategori yang
              dipilih.
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
              {filterType === "all" && (
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                      Project ({filteredProjects.length})
                    </h2>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Aplikasi Web & Studi Kasus Fullstack
                  </span>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
                {filteredProjects.map((project) => (
                  <Project
                    key={project.id}
                    project={project}
                    onOpenDetail={handleOpenProjectDetail}
                    onOpenMarkdown={handleOpenMarkdown}
                    onOpenPreview={handleOpenProjectPreview}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Certifications Section (Rendered if filter is 'all' or 'certificates') */}
          {filteredCerts.length > 0 && (
            <LazyMount estimatedHeight={filteredCerts.length * 480}>
              <div className="space-y-5">
                {filterType === "all" && (
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                        Sertifikasi({filteredCerts.length})
                      </h2>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Validasi Kompetensi Teknis
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
                  {filteredCerts.map((cert) => (
                    <Certificate
                      key={cert.id}
                      certificate={cert}
                      onOpenDetail={handleOpenCertDetail}
                      onOpenPreview={handleOpenCertPreview}
                    />
                  ))}
                </div>
              </div>
            </LazyMount>
          )}
        </div>
      )}

      {/* Item Detail & Quick Preview Modal — island terisolasi */}
      <DetailModalIsland onOpenMarkdown={handleOpenMarkdown} />
      <PreviewModalIsland />
    </div>
  );
};
