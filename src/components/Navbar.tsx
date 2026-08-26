import {
  BriefcaseBusiness,
  FileText,
  House,
  Mail,
  Moon,
  Sun,
  UserRound,
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

/* WhatsApp Icon */
const WhatsAppIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.075-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982 1-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.887 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.304-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.478-8.413" />
  </svg>
);

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  isDark,
  setIsDark,
  onOpenCV,
}) => {
  const navItems: {
    id: PageId;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: "home",
      label: "Beranda",
      icon: <House className="h-6 w-6 md:h-3.5 md:w-3.5" />,
    },
    {
      id: "portfolio",
      label: "Portofolio",
      icon: <BriefcaseBusiness className="h-6 w-6 md:h-3.5 md:w-3.5" />,
    },
    {
      id: "about",
      label: "Tentang Saya",
      icon: <UserRound className="h-6 w-6 md:h-3.5 md:w-3.5" />,
    },
    {
      id: "contact",
      label: "Kontak",
      icon: <Mail className="h-6 w-6 md:h-3.5 md:w-3.5" />,
    },
  ];

  const handleNavClick = (id: PageId) => {
    setActivePage(id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <header className="pointer-events-none fixed bottom-3 top-auto z-50 w-full px-3 transition-all duration-300 sm:px-6 lg:top-5 lg:px-12 md:sticky md:bottom-auto">
      <div className="pointer-events-auto mx-auto w-fit max-w-7xl md:w-full">
        <div
          className="
            relative
            flex
            items-center
            justify-between
            gap-2
            rounded-full
            border
            border-slate-800
            bg-slate-950
            px-2
            py-2
            shadow-xl
            shadow-slate-950/25
            backdrop-blur-xl
            transition-all
            duration-200
            dark:border-slate-200
            dark:bg-white
            dark:shadow-slate-950/20
            sm:gap-3
            sm:px-4
            sm:py-2.5
          "
        >
          {/* Brand */}
          <button
            type="button"
            onClick={() => handleNavClick("home")}
            className="group hidden shrink-0 items-center gap-2.5 text-left focus:outline-none md:flex"
          >
            <img
              src="/logo.jpg"
              alt="Logo Ikhwan Ramadhan"
              width={36}
              height={36}
              loading="eager"
              decoding="async"
              className="
                h-8
                w-8
                rounded-2xl
                object-cover
                shadow-sm
                transition-transform
                group-hover:scale-105
                sm:h-9
                sm:w-9
              "
            />

            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold tracking-tight text-white sm:text-sm dark:text-slate-950">
                <span>{userProfile.name}</span>

                <span
                  className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                  title="Terbuka untuk On-Site / Remote"
                />
              </div>

              <p className="text-[10px] font-medium text-slate-300 dark:text-slate-700">
                Full-Stack Developer
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav
            className="
              hidden
              items-center
              gap-0.5
              rounded-full
              border
              border-white/15
              bg-white/[0.07]
              p-1
              dark:border-slate-950/10
              dark:bg-slate-950/[0.06]
              md:flex
            "
            aria-label="Navigasi utama"
          >
            {navItems.map((item) => {
              const isActive = activePage === item.id;

              return (
                <button
                  type="button"
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    relative
                    flex
                    items-center
                    gap-1.5
                    rounded-full
                    px-3.5
                    py-1.5
                    text-xs
                    font-semibold
                    transition-all
                    duration-200
                    ${
                      isActive
                        ? "bg-white/15 font-bold text-emerald-300 dark:bg-slate-950/10 dark:text-emerald-700"
                        : "text-slate-300 hover:bg-white/10 hover:text-white dark:text-slate-700 dark:hover:bg-slate-950/10 dark:hover:text-slate-950"
                    }
                  `}
                >
                  {item.icon}

                  <span>{item.label}</span>

                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-emerald-400 dark:bg-emerald-600" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile Navigation */}
          <nav
            className="flex items-center justify-center gap-0.5 md:hidden"
            aria-label="Navigasi mobile"
          >
            {navItems.map((item) => {
              const isActive = activePage === item.id;

              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  aria-label={item.label}
                  title={item.label}
                  className={`
                    relative
                    shrink-0
                    rounded-full
                    p-2.5
                    transition-all
                    ${
                      isActive
                        ? "bg-white/15 text-emerald-300 dark:bg-slate-950/10 dark:text-emerald-700"
                        : "text-slate-300 hover:bg-white/10 dark:text-slate-700 dark:hover:bg-slate-950/10"
                    }
                  `}
                >
                  {item.icon}

                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-emerald-400 dark:bg-emerald-600" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions */}
          <div
            className="
              ml-1
              flex
              w-full
              items-center
              justify-end
              gap-1.5
              border-l
              border-white/20
              pl-2
              dark:border-slate-950/15
              sm:ml-2
              sm:w-auto
              sm:gap-2
              sm:pl-3
            "
          >
            {/* WhatsApp */}
            <a
              href={userProfile.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hubungi via WhatsApp"
              title="Hubungi via WhatsApp"
              className="
                flex
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-emerald-400/30
                bg-emerald-500/10
                p-2
                text-emerald-400
                transition-all
                hover:border-emerald-400/50
                hover:bg-emerald-500/20
                hover:text-emerald-300
                dark:border-emerald-600/20
                dark:bg-emerald-500/10
                dark:text-emerald-600
                dark:hover:bg-emerald-500/15
              "
            >
              <WhatsAppIcon className="h-[17px] w-[17px]" />

              <span className="hidden pl-0.5 lg:inline text-xs font-semibold">
                WhatsApp
              </span>
            </a>

            {/* CV */}
            <button
              type="button"
              onClick={onOpenCV}
              aria-label="Buka CV"
              title="Buka CV"
              className="
                flex
                shrink-0
                items-center
                gap-1
                rounded-full
                bg-white
                p-2
                text-slate-950
                shadow-sm
                transition-all
                hover:bg-slate-100
                dark:bg-slate-950
                dark:text-white
                dark:hover:bg-slate-800
                md:px-2.5
                md:py-1.5
              "
            >
              <FileText className="h-4 w-4" />

              <span className="hidden text-xs font-bold md:inline">
                Curriculum Vitae
              </span>
            </button>

            {/* Theme */}
            <button
              type="button"
              id="theme-toggle-btn"
              onClick={() => setIsDark(!isDark)}
              aria-label={
                isDark ? "Beralih ke Mode Terang" : "Beralih ke Mode Gelap"
              }
              title={
                isDark ? "Beralih ke Mode Terang" : "Beralih ke Mode Gelap"
              }
              className="
                flex
                items-center
                justify-center
                rounded-full
                border
                border-white/20
                p-2
                text-slate-300
                transition-all
                hover:bg-white/10
                hover:text-white
                dark:border-slate-950/10
                dark:text-slate-700
                dark:hover:bg-slate-950/10
              "
            >
              {isDark ? (
                <Sun className="h-[17px] w-[17px] text-amber-400" />
              ) : (
                <Moon className="h-[17px] w-[17px]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
