import { lazy, memo, Suspense, useMemo, useState } from "react";
import { Footer } from "./components/layout/footer";
import { Navbar } from "./components/layout/navbar";
import { Hero } from "./features/hero/hero";
import { useModal, useProjects, useTheme } from "./hooks";
import { PageId } from "./types";
import type { Locale } from "./types";
import { I18nProvider } from "./i18n";
import { getLocalizedProject } from "./utils/format";

// Initial visible components are kept static for fast LCP
const HeroPage = memo(Hero);
const FooterPage = memo(Footer);

// Lazy load non-critical sections and modals
const PortfolioPage = memo(
  lazy(() =>
    import("./features/portfolio/portfolio").then((m) => ({
      default: m.Portfolio,
    })),
  ),
);
const AboutPage = memo(
  lazy(() =>
    import("./features/about/about").then((m) => ({ default: m.About })),
  ),
);
const ContactPage = memo(
  lazy(() =>
    import("./features/contact/contact").then((m) => ({ default: m.Contact })),
  ),
);
const Cv = lazy(() =>
  import("./components/modal/cv").then((m) => ({ default: m.Cv })),
);
const MarkdownEditor = lazy(() =>
  import("./components/modal/markdown-editor").then((m) => ({
    default: m.MarkdownEditor,
  })),
);

export default function App({
  initialPage = "home",
  locale = "id",
}: {
  initialPage?: PageId;
  locale?: Locale;
}) {
  // Navigation State
  const [activePage, setActivePage] = useState<PageId>(initialPage);

  // Reusable Reactive State Hooks
  const { isDark, setTheme } = useTheme();
  const { projects, featuredProjects, saveProject } = useProjects();
  const displayProjects = useMemo(
    () =>
      locale === "id"
        ? projects
        : projects.map((project) => getLocalizedProject(project, locale)),
    [locale, projects],
  );
  const displayFeaturedProjects = useMemo(
    () =>
      locale === "id"
        ? featuredProjects
        : featuredProjects.map((project) =>
            getLocalizedProject(project, locale),
          ),
    [featuredProjects, locale],
  );
  const {
    isCVOpen,
    openCV,
    closeCV,
    isCreateModalOpen,
    openCreateModal,
    closeCreateModal,
  } = useModal();

  return (
    <I18nProvider locale={locale}>
      <div className="min-h-screen flex flex-col bg-transparent text-slate-950 dark:text-slate-100 transition-colors duration-200 relative">
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
          <div key={activePage} className="w-full">
            <Suspense
              fallback={
                <div className="min-h-[50vh] flex items-center justify-center text-slate-500 animate-pulse">
                  {locale === "en" ? "Loading..." : "Memuat..."}
                </div>
              }
            >
              {/* 1. Beranda (Home) */}
              {activePage === "home" && (
                <HeroPage
                  setActivePage={setActivePage}
                  featuredProjects={displayFeaturedProjects}
                  onOpenCV={openCV}
                />
              )}

              {/* 2. Portofolio (Portfolio) */}
              {activePage === "portfolio" && (
                <PortfolioPage
                  projects={displayProjects}
                  onOpenCreateModal={openCreateModal}
                />
              )}

              {/* 3. Tentang Saya (About Me) */}
              {activePage === "about" && <AboutPage onOpenCV={openCV} />}

              {/* 4. Kontak (Contact Form & Details) */}
              {activePage === "contact" && <ContactPage />}
            </Suspense>
          </div>
        </main>

        {/* Footer */}
        <div className="print:hidden">
          <FooterPage setActivePage={setActivePage} onOpenCV={openCV} />
        </div>

        <Suspense fallback={null}>
          {/* Markdown Editor & Project Authoring Modal */}
          <MarkdownEditor
            isOpen={isCreateModalOpen}
            onClose={closeCreateModal}
            onSaveProject={saveProject}
          />

          {/* Printable / Preview CV Modal */}
          <Cv isOpen={isCVOpen} onClose={closeCV} />
        </Suspense>
      </div>
    </I18nProvider>
  );
}
