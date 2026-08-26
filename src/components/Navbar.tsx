import {
  ContactRound,
  FileUser,
  FolderKanban,
  Home,
  Mail,
  MessageCircle,
  Moon,
  Sun,
} from "lucide-react";
import React from "react";
import { userProfile } from "../data/portfolioData";
import { PageId } from "../types";

interface NavbarProps {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  onOpenCV: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  isDark,
  setIsDark,
  onOpenCV,
}) => {
  const navItems: { id: PageId; label: string; icon: React.ReactNode }[] = [
    {
      id: "home",
      label: "Beranda",
      icon: <Home className="w-6 h-6 md:w-3.5 md:h-3.5" />,
    },
    {
      id: "portfolio",
      label: "Portofolio",
      icon: <FolderKanban className="w-6 h-6 md:w-3.5 md:h-3.5" />,
    },
    {
      id: "about",
      label: "Tentang Saya",
      icon: <ContactRound className="w-6 h-6 md:w-3.5 md:h-3.5" />,
    },
    {
      id: "contact",
      label: "Kontak",
      icon: <Mail className="w-6 h-6 md:w-3.5 md:h-3.5" />,
    },
  ];

  const handleNavClick = (id: PageId) => {
    setActivePage(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed bottom-3 top-auto md:sticky md:bottom-auto md:top-5 z-50 w-full px-3 sm:px-6 lg:px-12 pointer-events-none transition-all duration-300">
      <div className="w-fit md:w-full max-w-7xl mx-auto pointer-events-auto">
        {/* Floating Acrylic Island */}
        <div className="relative backdrop-blur-xl bg-slate-950 dark:bg-white border border-slate-800 dark:border-slate-200 rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-950/25 dark:shadow-slate-950/20 px-1.5 sm:px-5 py-2 sm:py-3 flex items-center justify-between gap-1.5 sm:gap-2.5 transition-all duration-200">
          {/* Brand Logo & Name */}
          <button
            onClick={() => handleNavClick("home")}
            className="hidden md:flex items-center gap-2.5 text-left group focus:outline-none shrink-0"
          >
            <img
              src="/logo.jpg"
              alt="Logo Ikhwan Ramadhan"
              width={36}
              height={36}
              loading="eager"
              decoding="async"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform"
            />
            <div>
              <div className="font-bold text-xs sm:text-sm tracking-tight text-white dark:text-slate-950 flex items-center gap-1.5">
                <span>{userProfile.name}</span>
                <span
                  className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                  title="Terbuka untuk On-Site / Remote"
                />
              </div>
              <p className="text-[10px] text-slate-200 dark:text-slate-700 font-medium">
                Full-Stack Developer
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/10 dark:bg-slate-950/10 p-1 rounded-2xl border border-white/15 dark:border-slate-950/15">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-emerald-300 dark:text-emerald-700 bg-white/15 dark:bg-slate-950/10 font-bold after:absolute after:-bottom-0.5 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-emerald-400 dark:after:bg-emerald-600"
                      : "text-slate-300 dark:text-slate-700 hover:text-white dark:hover:text-slate-950 hover:bg-white/10 dark:hover:bg-slate-950/10"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Icon Navigation */}
          <nav className="flex md:hidden items-center justify-center gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                aria-label={item.label}
                title={item.label}
                className={`relative p-2.5 rounded-xl transition-all shrink-0 ${
                  activePage === item.id
                    ? "text-emerald-300 dark:text-emerald-700 bg-white/15 dark:bg-slate-950/10 after:absolute after:-bottom-0.5 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:rounded-full after:bg-emerald-400 dark:after:bg-emerald-600"
                    : "text-slate-300 dark:text-slate-700 hover:bg-white/10 dark:hover:bg-slate-950/10"
                }`}
              >
                {item.icon}
              </button>
            ))}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end border-l border-white/20 dark:border-slate-950/20 pl-1.5 sm:pl-2.5 ml-0.5 sm:ml-1">
            {/* WhatsApp Chat Button */}
            <a
              href={userProfile.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hubungi via WhatsApp"
              title="Hubungi via WhatsApp"
              className="flex items-center gap-1.5 p-2 lg:px-3 lg:py-1.5 text-xs font-semibold rounded-xl border border-emerald-400/40 bg-emerald-500/15 dark:bg-emerald-950/20 text-emerald-200 dark:text-emerald-700 hover:bg-emerald-500/25 dark:hover:bg-emerald-950/35 transition-all shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">WhatsApp</span>
            </a>

            {/* Curriculum Vitae Button */}
            <button
              onClick={onOpenCV}
              aria-label="Buka CV"
              title="Buka CV"
              className="flex items-center gap-1 p-2 md:px-2.5 md:py-1.5 text-xs font-bold rounded-xl bg-white text-slate-950 dark:bg-slate-950 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shadow-sm"
            >
              <FileUser className="w-4 h-4" />
              <span className="hidden md:inline">CV</span>
            </button>

            {/* Light / Dark Mode Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={() => setIsDark(!isDark)}
              aria-label={
                isDark ? "Beralih ke Mode Terang" : "Beralih ke Mode Gelap"
              }
              title={
                isDark
                  ? "Beralih ke Mode Terang (Light Mode)"
                  : "Beralih ke Mode Gelap (Dark Mode)"
              }
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-white/25 dark:border-slate-950/15 text-slate-200 dark:text-slate-700 hover:bg-white/10 dark:hover:bg-slate-950/10 transition-all text-xs font-semibold"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="hidden sm:inline text-[11px]">Terang</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-200 dark:text-slate-700 shrink-0" />
                  <span className="hidden sm:inline text-[11px]">Gelap</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
