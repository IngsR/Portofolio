import { ArrowUp, ExternalLink, FileText } from "lucide-react";
import React from "react";
import portfolioData from "../../data/portfolio.json";
import { PageId } from "../../types";

const { userProfile } = portfolioData;

interface FooterProps {
  setActivePage: (page: PageId) => void;
  onOpenCV: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage, onOpenCV }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigationItems: [PageId, string][] = [
    ["home", "Beranda"],
    ["portfolio", "Portofolio"],
    ["about", "Tentang Saya"],
    ["contact", "Kontak"],
  ];

  return (
    <footer className="relative mt-12 border-t border-slate-200 dark:border-white/[0.06] bg-white dark:bg-[#080809] text-slate-800 dark:text-slate-200 transition-colors duration-200 sm:mt-16">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 xl:px-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-10 py-10 sm:py-12 lg:grid-cols-12 lg:gap-x-12">
          {/* Brand Column */}
          <div className="space-y-5 lg:col-span-5">
            <div className="flex items-center gap-3">
              <img
                src="/logo.webp"
                alt="Logo Ikhwan Ramadhan"
                width={40}
                height={40}
                loading="lazy"
                decoding="async"
                className="h-9 w-9 shrink-0 rounded-xl object-cover border border-slate-200/80 dark:border-white/10"
              />
              <div className="min-w-0">
                <h3 className="truncate text-sm font-bold leading-tight text-slate-950 dark:text-white">
                  {userProfile.name}
                </h3>
                <p className="mt-0.5 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  {userProfile.title}
                </p>
              </div>
            </div>

            <p className="max-w-sm text-[13px] leading-relaxed text-slate-600 dark:text-slate-400">
              {userProfile.tagline}
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              {userProfile.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 transition-colors hover:text-slate-900 dark:hover:text-white"
                >
                  <span>{social.name}</span>
                  <ExternalLink className="h-2.5 w-2.5 opacity-60" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Column */}
          <div className="space-y-4 lg:col-span-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
              Navigasi
            </h4>
            <div className="flex flex-col gap-1.5">
              {navigationItems.map(([page, label]) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => {
                    setActivePage(page);
                    scrollToTop();
                  }}
                  className="text-left text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors hover:text-slate-950 dark:hover:text-white w-fit"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Column */}
          <div className="space-y-4 lg:col-span-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
              Kontak Cepat
            </h4>
            <div className="space-y-3">
              <div>
                <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">
                  Email
                </p>
                <a
                  href={`mailto:${userProfile.email}`}
                  className="text-sm font-semibold text-slate-900 dark:text-white transition-colors hover:text-slate-600 dark:hover:text-slate-300"
                >
                  {userProfile.email}
                </a>
              </div>

              <div>
                <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">
                  WhatsApp
                </p>
                <a
                  href={userProfile.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 transition-colors hover:underline"
                >
                  {userProfile.phone}
                </a>
              </div>

              <button
                type="button"
                onClick={onOpenCV}
                className="mt-1 inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] px-4 py-2 text-xs font-semibold text-slate-900 dark:text-white shadow-xs transition-all hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-50 dark:hover:bg-white/[0.06]"
              >
                <FileText className="h-3.5 w-3.5 shrink-0" />
                <span>Curriculum Vitae</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-start gap-3 border-t border-slate-200 dark:border-white/[0.06] py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-slate-500 dark:text-slate-500">
            © {new Date().getFullYear()} {userProfile.name}. All rights
            reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400 transition-colors hover:text-slate-900 dark:hover:text-white"
          >
            <span>Kembali ke atas</span>
            <ArrowUp className="h-3 w-3 shrink-0" />
          </button>
        </div>
      </div>
    </footer>
  );
};
