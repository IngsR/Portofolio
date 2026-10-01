import { AnimatePresence, motion } from "motion/react";
import { memo, useState } from "react";
import { About } from "./components/about/about";
import { Contact } from "./components/contact/contact";
import { Hero } from "./components/hero";
import { Footer } from "./components/layout/footer";
import { Navbar } from "./components/layout/navbar";
import { Cv } from "./components/modal/cv";
import { MarkdownEditor } from "./components/modal/markdown-editor";
import { Portfolio } from "./components/portfolio/portfolio";
import { useModal, useProjects, useTheme } from "./hooks";
import { PageId } from "./types";

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

  // Reusable Reactive State Hooks
  const { isDark, setTheme } = useTheme();
  const { projects, featuredProjects, saveProject } = useProjects();
  const {
    isCVOpen,
    openCV,
    closeCV,
    isCreateModalOpen,
    openCreateModal,
    closeCreateModal,
    isDetailOpen,
    isPreviewOpen,
  } = useModal();

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
          setIsDark={setTheme}
          onOpenCV={openCV}
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
                onOpenCV={openCV}
              />
            )}

            {/* 2. Portofolio (Portfolio) */}
            {activePage === "portfolio" && (
              <PortfolioPage
                projects={projects}
                onOpenCreateModal={openCreateModal}
              />
            )}

            {/* 3. Tentang Saya (About Me) */}
            {activePage === "about" && <AboutPage onOpenCV={openCV} />}

            {/* 4. Kontak (Contact Form & Details) */}
            {activePage === "contact" && <Contact />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <div className="print:hidden">
        <FooterPage setActivePage={setActivePage} onOpenCV={openCV} />
      </div>

      {/* Markdown Editor & Project Authoring Modal */}
      <MarkdownEditor
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        onSaveProject={saveProject}
      />

      {/* Printable / Preview CV Modal */}
      <Cv isOpen={isCVOpen} onClose={closeCV} />
    </div>
  );
}

