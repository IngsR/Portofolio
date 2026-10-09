import { ArrowUpDown, Award, Grid, Layers, Search, X } from "lucide-react";
import React, {
  useCallback,
  useDeferredValue,
  useMemo,
  useRef,
  useState,
} from "react";
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
            {copy.eyebrow}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 dark:text-white">
            {getDictionary(locale).portfolio.navigation.portfolio}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
            {copy.description}
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
            label: `${copy.all} (${projects.length + certifications.length})`,
            icon: <Grid className="w-3 h-3" />,
          },
          {
            id: "projects",
            label: `${copy.projects} (${projects.length})`,
            icon: <Layers className="w-3 h-3" />,
          },
          {
            id: "certificates",
            label: `${copy.certificates} (${certifications.length})`,
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
            placeholder={copy.search}
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
              title={copy.clearSearch}
              aria-label={copy.clearSearch}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Keyword Tags */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-medium text-slate-400 dark:text-slate-600 uppercase tracking-wider mr-0.5">
            {copy.filter}
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
              {showAllKeywords ? copy.hide : copy.more}
            </button>
          )}
        </div>

        {/* Category Pills & Sort */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex flex-1 min-w-0 flex-wrap items-center gap-1.5">
            {allCategories.map((category, index) => {
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
                  {categoryLabels[index]}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 self-start shrink-0">
            <span className="text-[10px] text-slate-400 dark:text-slate-600 uppercase tracking-wider flex items-center gap-1">
              <ArrowUpDown className="w-3 h-3" />
              {copy.sort}
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
              <option value="relevance">{copy.relevance}</option>
              <option value="date">{copy.newest}</option>
              <option value="title">{copy.titleSort}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Counter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 px-1 py-2 border-y border-slate-100 dark:border-white/5">
        <div>
          <span>
            {copy.showing}{" "}
            <strong className="text-slate-950 dark:text-white">
              {totalItemsCount}
            </strong>{" "}
            {copy.items}
            {filterType === "all" &&
              ` (${filteredProjects.length} ${copy.projectCount}, ${filteredCerts.length} ${copy.certificateCount})`}
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
            {copy.reset}
          </button>
        )}
      </div>

      {/* Content Rendering */}
      {totalItemsCount === 0 ? (
        <div className="py-16 text-center rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] space-y-4">
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
              className="px-5 py-2.5 rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-xs font-bold hover:opacity-90 transition-all shadow-sm"
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
