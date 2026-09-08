"use client";
import {
  BriefcaseBusiness,
  FileText,
  Github,
  House,
  Mail,
  Moon,
  Sun,
  UserRound,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import portfolioData from "../../data/portfolio.json";
import { PageId } from "../../types";

const { userProfile } = portfolioData;

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
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Keep navbar visible near top
      if (currentScrollY < 80) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollYRef.current + 10) {
        // Scrolling down
        setIsVisible(false);
      } else if (currentScrollY < lastScrollYRef.current - 10) {
        // Scrolling up
        setIsVisible(true);
      }
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: {
    id: PageId;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: "home",
      label: "Beranda",
      icon: <House className="h-4 w-4" />,
    },
    {
      id: "portfolio",
      label: "Portofolio",
      icon: <BriefcaseBusiness className="h-4 w-4" />,
    },
    {
      id: "about",
      label: "Tentang",
      icon: <UserRound className="h-4 w-4" />,
    },
    {
      id: "contact",
      label: "Kontak",
      icon: <Mail className="h-4 w-4" />,
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
    <>
      {/* TOP HEADER BAR (Clean, spacious, no squished buttons on mobile) */}
      <header
        className={`
          fixed z-50 w-full px-3 transition-all duration-300 ease-in-out sm:px-6 lg:px-12
          top-2.5 sm:top-4 lg:top-5
          ${
            isVisible
              ? "translate-y-0 opacity-100 pointer-events-auto"
              : "-translate-y-24 opacity-0 pointer-events-none"
          }
        `}
      >
        <div className="mx-auto w-full max-w-7xl">
          <div
            className="
              relative
              flex
              items-center
              justify-between
              gap-2
              rounded-2xl
              sm:rounded-full
              border
              border-slate-300
              bg-white
              px-3
              py-2.5
              shadow-xl
              shadow-slate-950/10
              backdrop-blur-xl
              transition-all
              dark:border-white/15
              dark:bg-[#0c0c0e]/95
              dark:shadow-2xl
              dark:shadow-black/70
              sm:gap-3
              sm:px-5
              sm:py-2.5
            "
          >
            {/* Brand Logo & Name */}
            <button
              type="button"
              onClick={() => handleNavClick("home")}
              className="group flex shrink-0 items-center gap-2.5 text-left focus:outline-none"
            >
              <div className="relative">
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
                    rounded-xl
                    object-cover
                    border
                    border-slate-200/90
                    shadow-xs
                    transition-transform
                    group-hover:scale-105
                    dark:border-white/15
                    sm:h-9
                    sm:w-9
                  "
                />
                <span
                  className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-black animate-pulse"
                  title="Terbuka untuk On-Site / Remote"
                />
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold tracking-tight text-slate-950 sm:text-sm dark:text-white">
                  <span>Ikhwan Ramadhan</span>
                </div>
                <p className="hidden sm:block text-[10.5px] font-mono text-slate-500 dark:text-slate-400">
                  {userProfile.title}
                </p>
                <span className="sm:hidden text-[9px] font-mono font-medium text-emerald-600 dark:text-emerald-400 block leading-none">
                  Siap Kerja WFO/Hybrid
                </span>
              </div>
            </button>

            {/* Desktop Navigation Tabs (Aceternity Floating Pills) */}
            <nav
              className="
                hidden
                items-center
                gap-1
                rounded-full
                border
                border-slate-200/80
                bg-slate-100/70
                p-1
                dark:border-white/10
                dark:bg-white/[0.04]
                md:flex
              "
              aria-label="Navigasi utama desktop"
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
                      px-4
                      py-1.5
                      text-xs
                      font-semibold
                      transition-all
                      duration-200
                      ${
                        isActive
                          ? "bg-white text-slate-950 shadow-sm dark:bg-white dark:text-slate-950"
                          : "text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/5"
                      }
                    `}
                  >
                    {item.icon}
                    <span>{item.label === "Tentang" ? "Tentang Saya" : item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Actions: Clean & Accessible */}
            <div className="flex items-center justify-end gap-1.5 sm:gap-2">
              {/* WhatsApp Direct Link */}
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
                  gap-1.5
                  rounded-full
                  border
                  border-emerald-500/30
                  bg-emerald-500/10
                  px-2.5
                  py-1.5
                  text-emerald-700
                  transition-all
                  hover:bg-emerald-500/20
                  active:scale-95
                  dark:border-emerald-400/25
                  dark:bg-emerald-500/10
                  dark:text-emerald-300
                  sm:px-3
                "
              >
                <WhatsAppIcon className="h-3.5 w-3.5" />
                <span className="text-[11px] font-bold">Chat</span>
              </a>

              {/* GitHub Account Link (Desktop only to prevent clutter on mobile) */}
              <a
                href={
                  userProfile.socials.find((s) => s.name === "GitHub")?.url ||
                  "https://github.com/IngsR"
                }
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Profil GitHub"
                title="Lihat Profil GitHub"
                className="
                  hidden
                  sm:flex
                  shrink-0
                  items-center
                  justify-center
                  gap-1.5
                  rounded-full
                  border
                  border-slate-200/90
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  text-slate-700
                  transition-all
                  hover:bg-slate-100
                  hover:text-slate-950
                  dark:border-white/10
                  dark:text-slate-300
                  dark:hover:bg-white/10
                  dark:hover:text-white
                "
              >
                <Github className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>

              {/* CV Button */}
              <button
                type="button"
                onClick={onOpenCV}
                aria-label="Buka CV"
                title="Buka Curriculum Vitae"
                className="
                  flex
                  shrink-0
                  items-center
                  gap-1.5
                  rounded-full
                  bg-slate-950
                  text-white
                  px-3
                  py-1.5
                  text-xs
                  font-bold
                  shadow-sm
                  transition-all
                  hover:bg-slate-800
                  active:scale-95
                  dark:bg-white
                  dark:text-slate-950
                  dark:hover:bg-slate-100
                "
              >
                <FileText className="h-3.5 w-3.5" />
                <span>CV</span>
              </button>

              {/* Theme Toggle Button */}
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
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-slate-200/90
                  text-slate-600
                  transition-all
                  hover:bg-slate-100
                  hover:text-slate-950
                  active:scale-90
                  dark:border-white/10
                  dark:text-slate-300
                  dark:hover:bg-white/10
                  dark:hover:text-white
                "
              >
                {isDark ? (
                  <Sun className="h-4 w-4 text-amber-400" />
                ) : (
                  <Moon className="h-4 w-4 text-slate-700" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE BOTTOM FLOATING DOCK (Purposeful, Tactile, With Soul) */}
      <nav
        className="
          fixed
          bottom-4
          left-1/2
          -translate-x-1/2
          z-50
          w-[calc(100%-2rem)]
          max-w-sm
          md:hidden
          transition-all
          duration-300
        "
        aria-label="Navigasi mobile floating dock"
      >
        <div
          className="
            flex
            items-center
            justify-between
            gap-1.5
            p-2
            rounded-2xl
            bg-white
            dark:bg-[#111113]
            border
            border-slate-300
            dark:border-white/20
            shadow-[0_16px_40px_-4px_rgba(15,23,42,0.25)]
            dark:shadow-[0_16px_40px_-4px_rgba(0,0,0,0.8)]
            backdrop-blur-2xl
          "
        >
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                  relative
                  flex
                  items-center
                  justify-center
                  gap-1.5
                  py-3
                  rounded-xl
                  text-xs
                  font-bold
                  transition-all
                  duration-200
                  active:scale-95
                  ${
                    isActive
                      ? "flex-1 bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-sm px-4"
                      : "px-4 text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/8"
                  }
                `}
              >
                <span className="shrink-0">
                  <span className="block [&>svg]:h-5 [&>svg]:w-5">{item.icon}</span>
                </span>
                {isActive && (
                  <span className="truncate text-[11px] tracking-tight animate-in fade-in zoom-in-95 duration-150">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
