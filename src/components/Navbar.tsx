import React, { useState } from 'react';
import { PageId } from '../types';
import { userProfile } from '../data/portfolioData';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  FileText, 
  MessageCircle,
  Briefcase,
  Layers,
  User,
  Mail,
  Home
} from 'lucide-react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Beranda', icon: <Home className="w-3.5 h-3.5" /> },
    { id: 'portfolio', label: 'Portofolio', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'about', label: 'Tentang Saya', icon: <User className="w-3.5 h-3.5" /> },
    { id: 'contact', label: 'Kontak', icon: <Mail className="w-3.5 h-3.5" /> },
  ];

  const handleNavClick = (id: PageId) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-3 sm:top-5 z-50 w-full px-3 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300">
      <div className="max-w-5xl mx-auto pointer-events-auto">
        
        {/* Floating Acrylic Island */}
        <div className="relative backdrop-blur-xl bg-white/85 dark:bg-[#0c0c0d]/85 border border-slate-200/80 dark:border-white/10 rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-900/5 dark:shadow-black/40 px-3.5 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between transition-all duration-200">
          
          {/* Brand Logo & Name */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none shrink-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 dark:from-white dark:to-slate-200 text-white dark:text-slate-950 flex items-center justify-center font-black text-xs sm:text-sm tracking-tight shadow-sm group-hover:scale-105 transition-transform">
              IR
            </div>
            <div>
              <div className="font-bold text-xs sm:text-sm tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>{userProfile.name}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Terbuka untuk On-Site / Remote" />
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                Full-Stack Developer
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-white/[0.04] p-1 rounded-2xl border border-slate-200/50 dark:border-white/5">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-slate-950 dark:text-white bg-white dark:bg-white/15 shadow-sm font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2">
            
            {/* WhatsApp Chat Button */}
            <a
              href={userProfile.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Hubungi via WhatsApp"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-emerald-600/30 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">WhatsApp</span>
            </a>

            {/* Curriculum Vitae Button */}
            <button
              onClick={onOpenCV}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>CV</span>
            </button>

            {/* Light / Dark Mode Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={() => setIsDark(!isDark)}
              aria-label={isDark ? "Beralih ke Mode Terang" : "Beralih ke Mode Gelap"}
              title={isDark ? "Beralih ke Mode Terang (Light Mode)" : "Beralih ke Mode Gelap (Dark Mode)"}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-all text-xs font-semibold"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="hidden sm:inline text-[11px]">Terang</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-700 shrink-0" />
                  <span className="hidden sm:inline text-[11px]">Gelap</span>
                </>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu Navigasi"
              className="md:hidden p-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu (Acrylic Glass) */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-3 bg-white/95 dark:bg-[#0c0c0d]/95 backdrop-blur-2xl rounded-2xl border border-slate-200 dark:border-white/10 shadow-2xl space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="grid grid-cols-1 gap-1">
              {navItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-2.5 w-full text-left py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 mt-2 border-t border-slate-200 dark:border-white/10 grid grid-cols-2 gap-2">
              <a
                href={userProfile.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCV();
                }}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-xs font-bold"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Lihat CV</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
