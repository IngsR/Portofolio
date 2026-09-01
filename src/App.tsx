import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { About } from "./components/about/About";
import { Contact } from "./components/contact/Contact";
import { Hero } from "./components/Hero";
import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { Cv } from "./components/modal/Cv";
import { MarkdownEditor } from "./components/modal/MarkdownEditor";
import { MarkdownViewer } from "./components/modal/MarkdownViewer";
import { Portfolio } from "./components/portfolio/Portfolio";
import portfolioDataJson from "./data/portfolio.json";
import { PageId, ProjectItem } from "./types";
import { isProjectItem } from "./utils/guard";

const initialProjects = portfolioDataJson.projects as ProjectItem[];

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
      <main className="flex-1 max-w-7xl 2xl:max-w-[1500px] w-full mx-auto px-4 sm:px-6 lg:px-10 pb-28 md:pb-12 overflow-hidden print:hidden">
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
              <Hero
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
              <Portfolio
                projects={projects}
                onOpenMarkdown={(proj) => setSelectedProjectForMarkdown(proj)}
                onOpenCreateModal={() => setIsCreateModalOpen(true)}
              />
            )}

            {/* 3. Tentang Saya (About Me) */}
            {activePage === "about" && (
              <About onOpenCV={() => setIsCVModalOpen(true)} />
            )}

            {/* 4. Kontak (Contact Form & Details) */}
            {activePage === "contact" && <Contact />}
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
