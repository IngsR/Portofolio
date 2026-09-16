import { AnimatePresence, motion } from "motion/react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { About } from "./components/about/about";
import { Contact } from "./components/contact/contact";
import { Hero } from "./components/hero";
import { Footer } from "./components/layout/footer";
import { Navbar } from "./components/layout/navbar";
import { Cv } from "./components/modal/cv";
import { MarkdownEditor } from "./components/modal/markdown-editor";
import { MarkdownViewer } from "./components/modal/markdown-viewer";
import { Portfolio } from "./components/portfolio/portfolio";
import portfolioDataJson from "./data/portfolio.json";
import { PageId, ProjectItem } from "./types";
import { isProjectItem } from "./utils/guard";

const initialProjects = portfolioDataJson.projects as ProjectItem[];

// Halaman di-memo: perubahan state modal/tema di App TIDAK me-render ulang
// isi halaman (Hero/Portfolio/About/Contact beserta puluhan card di dalamnya).
const HeroPage = memo(Hero);
const PortfolioPage = memo(Portfolio);
const AboutPage = memo(About);
const ContactPage = memo(Contact);
const FooterPage = memo(Footer);

export default function App({
  initialPage = "home",
}: {
  initialPage?: PageId;
}) {
  // Navigation State
  const [activePage, setActivePage] = useState<PageId>(initialPage);

  // Dark Mode State (Light mode is the default for optimal readability for all ages)
  const [isDark, setIsDark] = useState(false);
  const [isThemeInitialized, setIsThemeInitialized] = useState(false);

  // Projects State (with persistence)
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);

  // Modal States
  const [selectedProjectForMarkdown, setSelectedProjectForMarkdown] =
    useState<ProjectItem | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  // Callback stabil — memo() pada halaman/card tetap efektif walau App re-render.
  const handleOpenCV = useCallback(() => setIsCVModalOpen(true), []);
  const handleOpenMarkdown = useCallback(
    (proj: ProjectItem) => setSelectedProjectForMarkdown(proj),
    [],
  );
  const handleOpenCreateModal = useCallback(
    () => setIsCreateModalOpen(true),
    [],
  );

  // Restore browser-only preferences after the server-rendered HTML hydrates.
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio_theme");
    setIsDark(savedTheme === "dark");
    setIsThemeInitialized(true);

    try {
      const savedProjects = localStorage.getItem("portfolio_projects_list");
      if (savedProjects) {
        const parsed = JSON.parse(savedProjects);
        if (Array.isArray(parsed)) {
          const validProjects = parsed.filter(isProjectItem);
          if (validProjects.length > 0) {
            const customProjects = validProjects.filter(
              (p: ProjectItem) => !initialProjects.some((bp) => bp.id === p.id),
            );
            setProjects([...customProjects, ...initialProjects]);
          }
        }
      }
    } catch {
      // Keep the build-time project data when persisted data is invalid.
    }
  }, []);

  // Sync dark class on document element
  useEffect(() => {
    if (!isThemeInitialized) {
      return;
    }

    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("portfolio_theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("portfolio_theme", "light");
    }
  }, [isDark, isThemeInitialized]);

  // Handle saving new project created via markdown editor
  const handleSaveProject = useCallback((newProject: ProjectItem) => {
    setProjects((current) => {
      const updated = [newProject, ...current];
      try {
        localStorage.setItem(
          "portfolio_projects_list",
          JSON.stringify(updated),
        );
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  }, []);

  // Memoized: hanya dihitung ulang sekali (data statis)
  const featuredProjects = useMemo(
    () => initialProjects.filter((p) => p.featured || p.id === "proj-4"),
    [],
  );

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-950 dark:text-slate-100 transition-colors duration-200 relative">
      {/* Subtle background ambient mesh */}
      <div
        className="fixed inset-0 light-ambient-mesh dark:opacity-0 opacity-100 pointer-events-none z-0 transition-opacity duration-300"
        aria-hidden="true"
      />
      {/* Top Navigation */}
      <div className="print:hidden">
        <Navbar
          activePage={activePage}
          setActivePage={setActivePage}
          isDark={isDark}
          setIsDark={setIsDark}
          onOpenCV={handleOpenCV}
        />
      </div>

      {/* Main Page Content Container with Smooth Page Transitions */}
      <main className="flex-1 max-w-7xl 2xl:max-w-[1500px] w-full mx-auto px-4 sm:px-6 lg:px-10 pt-3 md:pt-24 pb-28 md:pb-12 overflow-hidden print:hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            {/* 1. Beranda (Home) */}
            {activePage === "home" && (
              <HeroPage
                setActivePage={setActivePage}
                featuredProjects={featuredProjects}
                onOpenProjectMarkdown={handleOpenMarkdown}
                onOpenCV={handleOpenCV}
              />
            )}

            {/* 2. Portofolio (Portfolio & Markdown Case Studies) */}
            {activePage === "portfolio" && (
              <PortfolioPage
                projects={projects}
                onOpenMarkdown={handleOpenMarkdown}
                onOpenCreateModal={handleOpenCreateModal}
              />
            )}

            {/* 3. Tentang Saya (About Me) */}
            {activePage === "about" && <AboutPage onOpenCV={handleOpenCV} />}

            {/* 4. Kontak (Contact Form & Details) */}
            {activePage === "contact" && <Contact />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <div className="print:hidden">
        <FooterPage setActivePage={setActivePage} onOpenCV={handleOpenCV} />
      </div>

      {/* Markdown Case Study Viewer Modal */}
      <MarkdownViewer
        project={selectedProjectForMarkdown}
        onClose={() => setSelectedProjectForMarkdown(null)}
      />

      {/* Markdown Editor & Project Authoring Modal */}
      <MarkdownEditor
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSaveProject={handleSaveProject}
      />

      {/* Printable / Preview CV Modal */}
      <Cv isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />
    </div>
  );
}
