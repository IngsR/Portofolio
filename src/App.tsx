import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { CVModal } from "./components/CVModal";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { MarkdownEditorModal } from "./components/MarkdownEditorModal";
import { MarkdownViewerModal } from "./components/MarkdownViewerModal";
import { Navbar } from "./components/Navbar";
import { PortfolioSection } from "./components/PortfolioSection";
import { initialProjects } from "./data/portfolioData";
import { PageId, ProjectItem } from "./types";
import { isProjectItem } from "./utils/guards";

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
            setProjects(validProjects);
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
  const handleSaveProject = (newProject: ProjectItem) => {
    const updated = [newProject, ...projects];
    setProjects(updated);
    try {
      localStorage.setItem("portfolio_projects_list", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  const featuredProjects =
    projects.filter((p) => p.featured).length > 0
      ? projects.filter((p) => p.featured)
      : projects.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-[#050505] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Top Navigation */}
      <div className="print:hidden">
        <Navbar
          activePage={activePage}
          setActivePage={setActivePage}
          isDark={isDark}
          setIsDark={setIsDark}
          onOpenCV={() => setIsCVModalOpen(true)}
        />
      </div>

      {/* Main Page Content Container with Smooth Page Transitions */}
      <main className="flex-1 max-w-[1800px] w-full mx-auto px-4 sm:px-6 lg:px-12 pb-24 md:pb-0 overflow-hidden print:hidden">
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
              <HeroSection
                setActivePage={setActivePage}
                featuredProjects={featuredProjects}
                onOpenProjectMarkdown={(proj) =>
                  setSelectedProjectForMarkdown(proj)
                }
                onOpenCV={() => setIsCVModalOpen(true)}
              />
            )}

            {/* 2. Portofolio (Portfolio & Markdown Case Studies) */}
            {activePage === "portfolio" && (
              <PortfolioSection
                projects={projects}
                onOpenMarkdown={(proj) => setSelectedProjectForMarkdown(proj)}
                onOpenCreateModal={() => setIsCreateModalOpen(true)}
              />
            )}

            {/* 3. Tentang Saya (About Me) */}
            {activePage === "about" && (
              <AboutSection onOpenCV={() => setIsCVModalOpen(true)} />
            )}

            {/* 4. Kontak (Contact Form & Details) */}
            {activePage === "contact" && <ContactSection />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <div className="print:hidden">
        <Footer
          setActivePage={setActivePage}
          onOpenCV={() => setIsCVModalOpen(true)}
        />
      </div>

      {/* Markdown Case Study Viewer Modal */}
      <MarkdownViewerModal
        project={selectedProjectForMarkdown}
        onClose={() => setSelectedProjectForMarkdown(null)}
      />

      {/* Markdown Editor & Project Authoring Modal */}
      <MarkdownEditorModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSaveProject={handleSaveProject}
      />

      {/* Printable / Preview CV Modal */}
      <CVModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />
    </div>
  );
}
