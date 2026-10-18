import {
  ArrowUpDown,
  Award,
  Check,
  ChevronDown,
  Filter,
  Grid,
  Layers,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import React, {
  useCallback,
  useDeferredValue,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import portfolioData from "../../data/portfolio.json";
import { CertificationItem, ProjectItem } from "../../types";
import { AnimatedTabs } from "../../design/components/animated-tabs";
import { LazyMount } from "../../design/components/lazy-mount";
import { Certificate } from "./certificate";
import { Project } from "./project";
import { useTranslations } from "../../i18n";
import { getDictionary } from "../../data/locales";
import { getLocalizedCertification } from "../../utils/format";

const { certifications: certificationsData } = portfolioData as {
  certifications: CertificationItem[];
};

interface PortfolioSectionProps {
  projects: ProjectItem[];
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

const FILTER_CATEGORIES: string[] = [
  "Semua",
  "Fullstack Web App",
  "Web Platform",
  "Web Application",
  "React & Next.js UI",
  "Mobile Frontend",
  "Lainnya",
] as const;

const isListedCategory = (category: string) =>
  FILTER_CATEGORIES.slice(1, -1).includes(category);

export const Portfolio: React.FC<PortfolioSectionProps> = ({
  projects,
  onOpenCreateModal,
}) => {
  const { locale } = useTranslations();
  const copy = getDictionary(locale).portfolio.page;
  const categoryLabels = copy.categories;
  const certifications = useMemo(
    () =>
      certificationsData.map((item) => getLocalizedCertification(item, locale)),
    [locale],
  );
  // Main view filter: 'all' (Tampilkan Semua), 'projects' (Project), 'certificates' (Sertifikasi & Lisensi)
  const [filterType, setFilterType] = useState<PortfolioFilterType>("all");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "Semua",
  ]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [showAllKeywords, setShowAllKeywords] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const deferredSearchQuery = useDeferredValue(searchQuery);

  // Keep filter keys language-independent; only the visible labels are translated.
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

  // Search index: semua field lower-case dihitung SEKALI per perubahan
  // `projects`. Tanpa ini, setiap ketikan mengulang toLowerCase() pada
  // markdownContent (string panjang) puluhan kali → penyebab lag mengetik.
  const searchIndex = useMemo(
    () =>
      new Map(
        projects.map((project) => [
          project.id,
          {
            title: project.title.toLowerCase(),
            desc: project.shortDescription.toLowerCase(),
            tags: (project.tags || []).map((t) => t.toLowerCase()),
            md: project.markdownContent.toLowerCase(),
            category: project.category.toLowerCase(),
            tagSet: new Set(
              (project.tags || [])
                .map((tag) => tag.trim().toLowerCase())
                .filter(Boolean),
            ),
          },
        ]),
      ),
    [projects],
  );

  // Filtered and Sorted Projects
  const filteredProjects = useMemo(() => {
    if (filterType === "certificates") return [];

    const q = deferredSearchQuery.toLowerCase().trim();
    const tokens = q.split(/\s+/).filter(Boolean);
    const keywordSet = new Set(
      selectedKeywords.map((keyword) => keyword.toLowerCase()),
    );

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

      const index = searchIndex.get(project.id);

      if (
        keywordSet.size > 0 &&
        (!index ||
          [...keywordSet].some((keyword) => !index.tagSet.has(keyword)))
      ) {
        return false;
      }

      // Search tokens
      if (tokens.length === 0 || !index) return true;

      return tokens.every((token) => {
        return (
          index.title.includes(token) ||
          index.desc.includes(token) ||
          index.tags.some((t) => t.includes(token)) ||
          index.md.includes(token) ||
          index.category.includes(token)
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
    searchIndex,
    filterType,
    selectedCategories,
    selectedKeywords,
    deferredSearchQuery,
    sortBy,
  ]);

  // Filtered Certificates
  const filteredCerts = useMemo(() => {
    if (filterType === "projects") return [];

    const q = deferredSearchQuery.toLowerCase().trim();
    const tokens = q.split(/\s+/).filter(Boolean);

    const matches = certifications.filter((cert) => {
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
  }, [certifications, filterType, selectedCategories, deferredSearchQuery]);

  const totalItemsCount = filteredProjects.length + filteredCerts.length;

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
    setIsFilterDrawerOpen(false);
    setSearchQuery("");
    setSortBy("relevance");
    searchInputRef.current?.focus();
  }, []);

  const isAnyFilterActive = useMemo(
    () =>
      selectedCategories.some((category) => category !== "Semua") ||
      selectedKeywords.length > 0 ||
      Boolean(searchQuery) ||
      filterType !== "all" ||
      sortBy !== "relevance",
    [selectedCategories, selectedKeywords, searchQuery, filterType, sortBy],
  );

  return (
    <div className="space-y-6 sm:space-y-8 py-6 sm:py-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#36454f]/15 dark:border-white/[0.08]">
        <div className="space-y-2">
          <span className="folio-num">
            {locale === "en"
              ? "03 / Technical Portfolio & Project Index"
              : "03 / Arsip Portofolio & Proyek Teknis"}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#141f26] dark:text-white font-serif">
            {getDictionary(locale).portfolio.navigation.portfolio}
          </h1>
          <p className="text-sm sm:text-base text-[#24333d] dark:text-slate-300 max-w-xl leading-relaxed">
            {copy.description}
          </p>
        </div>
      </div>

      {/* ── ATELIER CONTROL DESK: REFACTORED FOR BALANCED 3-DEVICE RATIOS ── */}
      <div className="space-y-3.5">
        {/* Tier 1: Scope Switcher + Search & Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Scope Segmented Switcher (Mobile: full width balanced 3-col, Tablet/Desktop: fit) */}
          <div className="w-full md:w-auto">
            <AnimatedTabs
              activeTab={filterType}
              onTabChange={(id) => {
                const type = id as PortfolioFilterType;
                setFilterType(type);
                setSelectedCategories(["Semua"]);
                setSelectedKeywords([]);
              }}
              className="w-full md:w-fit"
              tabs={[
                {
                  id: "all",
                  label: `${copy.all} (${projects.length + certifications.length})`,
                  icon: <Grid className="w-3.5 h-3.5 shrink-0" />,
                },
                {
                  id: "projects",
                  label: `${copy.projects} (${projects.length})`,
                  icon: <Layers className="w-3.5 h-3.5 shrink-0" />,
                },
                {
                  id: "certificates",
                  label: `${copy.certificates} (${certifications.length})`,
                  icon: <Award className="w-3.5 h-3.5 shrink-0" />,
                },
              ]}
            />
          </div>

          {/* Quick Search & Filter Toolbar */}
          <div className="flex items-center gap-2 w-full md:w-auto flex-1 md:max-w-md lg:max-w-lg justify-end">
            {/* Search Input Box */}
            <div className="relative flex-1 min-w-[160px]">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#485966] dark:text-slate-400">
                <Search className="w-3.5 h-3.5" />
              </div>

              <input
                ref={searchInputRef}
                id="portfolio-search-input"
                type="text"
                placeholder={copy.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 rounded-xl atelier-surface border border-[#36454f]/15 dark:border-white/10 text-[#141f26] dark:text-white placeholder:text-[#485966] dark:placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:border-[#273641] dark:focus:border-white/25 transition-all shadow-xs"
              />

              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    searchInputRef.current?.focus();
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#485966] hover:text-[#141f26] dark:hover:text-white transition-colors"
                  title={copy.clearSearch}
                  aria-label={copy.clearSearch}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <div className="hidden sm:flex absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none items-center justify-center h-4.5 px-1.5 rounded border border-[#36454f]/15 dark:border-white/10 text-[9px] font-mono text-[#485966] dark:text-slate-500">
                  /
                </div>
              )}
            </div>

            {/* Tech Stack Toggle Button with Badge Indicator */}
            <button
              type="button"
              onClick={() => setIsFilterDrawerOpen((v) => !v)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all shrink-0 select-none ${
                isFilterDrawerOpen || selectedKeywords.length > 0
                  ? "bg-[#273641] text-white dark:bg-white/15 dark:text-white dark:border-white/25 shadow-xs"
                  : "atelier-surface border-[#36454f]/15 dark:border-white/10 text-[#24333d] dark:text-slate-300 hover:border-[#141f26] dark:hover:border-white hover:text-[#141f26] dark:hover:text-white"
              }`}
              title="Filter Stack Teknologi"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Stack</span>
              {selectedKeywords.length > 0 && (
                <span className="inline-flex items-center justify-center min-w-4 h-4 px-1 rounded-full text-[10px] font-mono font-bold bg-white text-[#273641] dark:bg-white dark:text-slate-900">
                  {selectedKeywords.length}
                </span>
              )}
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ${
                  isFilterDrawerOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Sort Selector */}
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "relevance" || value === "date" || value === "title")
                    setSortBy(value);
                }}
                className="pl-2.5 pr-7 py-2 rounded-xl atelier-surface border border-[#36454f]/15 dark:border-white/10 text-[#24333d] dark:text-white text-xs font-semibold focus:outline-none focus:border-[#273641] dark:focus:border-white/25 cursor-pointer shadow-xs appearance-none"
                aria-label={copy.sort}
              >
                <option value="relevance">{copy.relevance}</option>
                <option value="date">{copy.newest}</option>
                <option value="title">{copy.titleSort}</option>
              </select>
              <ArrowUpDown className="w-3 h-3 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#485966] dark:text-slate-400" />
            </div>
          </div>
        </div>

        {/* Tier 2: Category Scroll Bar (Smooth, Touch-friendly, zero clutter) */}
        <div className="relative flex items-center">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 w-full">
            {allCategories.map((category, idx) => {
              const isSelected = selectedCategories.includes(category);
              const label = categoryLabels[idx] || category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    if (category === "Semua") {
                      setSelectedCategories(["Semua"]);
                      return;
                    }
                    setSelectedCategories((current) => {
                      const withoutAll = current.filter((item) => item !== "Semua");
                      const next = withoutAll.includes(category)
                        ? withoutAll.filter((item) => item !== category)
                        : [...withoutAll, category];
                      return next.length > 0 ? next : ["Semua"];
                    });
                  }}
                  className={`px-3 py-1.5 text-xs rounded-full transition-all whitespace-nowrap shrink-0 border font-medium active:scale-95 ${
                    isSelected
                      ? "bg-[#273641] text-white dark:bg-white/15 dark:text-white dark:border-white/25 font-bold border-transparent shadow-xs"
                      : "atelier-surface border-[#36454f]/15 dark:border-white/10 text-[#24333d] dark:text-slate-300 hover:border-[#141f26] dark:hover:border-white hover:text-[#141f26] dark:hover:text-white"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tier 3: Tech Stack Animated Drawer */}
        <AnimatePresence>
          {isFilterDrawerOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="p-3.5 sm:p-4 rounded-2xl atelier-surface border border-[#36454f]/15 dark:border-white/10 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="folio-num">Tech Stack Filter</span>
                    <span className="hidden sm:inline text-[11px] text-[#485966] dark:text-slate-400">
                      — {locale === "en" ? "Filter by frameworks, libraries & tools" : "Filter berdasarkan teknologi yang digunakan"}
                    </span>
                  </div>
                  {selectedKeywords.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setSelectedKeywords([])}
                      className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline"
                    >
                      {locale === "en" ? "Clear tags" : "Hapus tag"}
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {visibleKeywords.map((kw) => {
                    const isActive = selectedKeywords.includes(kw);
                    return (
                      <button
                        key={kw}
                        type="button"
                        onClick={() => handleKeywordClick(kw)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono rounded-full transition-all border font-medium active:scale-95 ${
                          isActive
                            ? "bg-[#273641] text-white dark:bg-white/15 dark:text-white dark:border-white/25 font-bold border-transparent shadow-xs"
                            : "bg-[#E7EAEF]/80 dark:bg-white/5 border-[#36454f]/15 dark:border-white/10 text-[#24333d] dark:text-slate-300 hover:border-[#141f26] dark:hover:border-white hover:text-[#141f26] dark:hover:text-white"
                        }`}
                      >
                        {isActive && <Check className="w-3 h-3 stroke-[3]" />}
                        <span>#{kw}</span>
                      </button>
                    );
                  })}
                  {keywordGroups.otherKeywords.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowAllKeywords((v) => !v)}
                      className="inline-flex px-2.5 py-1 text-[11px] font-mono rounded-full border border-dashed border-[#36454f]/25 dark:border-white/15 text-[#485966] dark:text-slate-400 hover:text-[#141f26] dark:hover:text-white transition-all"
                    >
                      {showAllKeywords ? copy.hide : `+${keywordGroups.otherKeywords.length} ${copy.more}`}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tier 4: Communicative Feedback Strip & Active Chips */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1 pb-2 border-b border-[#36454f]/10 dark:border-white/[0.08]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[#354551] dark:text-slate-300 font-medium">
              {copy.showing}{" "}
              <strong className="text-[#141f26] dark:text-white font-black text-sm">
                {totalItemsCount}
              </strong>{" "}
              {copy.items}
              {filterType === "all" &&
                ` (${filteredProjects.length} ${copy.projectCount}, ${filteredCerts.length} ${copy.certificateCount})`}
            </span>

            {/* Active Search Chip */}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#273641]/10 text-[#273641] dark:bg-white/10 dark:text-white border border-[#36454f]/15 dark:border-white/15">
                <span>"{searchQuery}"</span>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="hover:opacity-75 focus:outline-none"
                  title="Hapus pencarian"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Active Category Chips */}
            {selectedCategories
              .filter((c) => c !== "Semua")
              .map((category) => {
                const idx = allCategories.indexOf(category);
                const label = categoryLabels[idx] || category;
                return (
                  <span
                    key={category}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#273641]/10 text-[#273641] dark:bg-white/10 dark:text-white border border-[#36454f]/15 dark:border-white/15"
                  >
                    <span>{label}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategories((current) => {
                          const next = current.filter((c) => c !== category);
                          return next.length > 0 ? next : ["Semua"];
                        });
                      }}
                      className="hover:opacity-75 focus:outline-none"
                      title={`Hapus kategori ${label}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                );
              })}

            {/* Active Tag Chips */}
            {selectedKeywords.map((kw) => (
              <span
                key={kw}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-[#273641]/10 text-[#273641] dark:bg-white/10 dark:text-white border border-[#36454f]/15 dark:border-white/15"
              >
                <span>#{kw}</span>
                <button
                  type="button"
                  onClick={() => handleKeywordClick(kw)}
                  className="hover:opacity-75 focus:outline-none"
                  title={`Hapus #${kw}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          {/* Reset All Filters Action */}
          {isAnyFilterActive && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline shrink-0"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{copy.reset}</span>
            </button>
          )}
        </div>
      </div>

      {/* Content Rendering */}
      {totalItemsCount === 0 ? (
        <div className="py-16 text-center rounded-2xl border border-[#36454f]/15 dark:border-white/10 bg-transparent space-y-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-950 dark:text-white">
              {copy.noResults}
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              {copy.noResultsDescription}
            </p>
          </div>

          <div>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl bg-[#273641] text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-bold hover:bg-[#1a252d] dark:hover:bg-white transition-all shadow-sm"
            >
              {copy.resetFilter}
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
                      {copy.projects} ({filteredProjects.length})
                    </h2>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {copy.caseStudies}
                  </span>
                </div>
              )}

              <LazyMount estimatedHeight={filteredProjects.length * 460}>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
                  {filteredProjects.map((project) => (
                    <Project key={project.id} project={project} />
                  ))}
                </div>
              </LazyMount>
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
                        {copy.certificates} ({filteredCerts.length})
                      </h2>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {copy.certificationSubtitle}
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
                  {filteredCerts.map((cert) => (
                    <Certificate key={cert.id} certificate={cert} />
                  ))}
                </div>
              </div>
            </LazyMount>
          )}
        </div>
      )}
    </div>
  );
};

