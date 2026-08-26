import { ArrowUp, ExternalLink, FileText } from "lucide-react";
import React from "react";
import { userProfile } from "../data/portfolioData";
import { PageId } from "../types";

interface FooterProps {
  setActivePage: (page: PageId) => void;
  onOpenCV: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage, onOpenCV }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c0c0d] transition-colors duration-200 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand & Bio (6 cols) */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.jpg"
                alt="Logo Ikhwan Ramadhan"
                width={32}
                height={32}
                loading="lazy"
                decoding="async"
                className="w-8 h-8 rounded-xl object-cover shadow-sm"
              />
              <div>
                <div className="font-bold text-base text-slate-950 dark:text-white">
                  {userProfile.name}
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Full-Stack Developer
                </div>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md font-normal">
              {userProfile.tagline}
            </p>

            <div className="flex flex-wrap gap-4 pt-1 text-xs text-slate-600 dark:text-slate-400">
              {userProfile.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-950 dark:hover:text-white flex items-center gap-1 font-medium transition-colors"
                >
                  <span>{s.name}</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Menu Navigasi
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => {
                    setActivePage("home");
                    scrollToTop();
                  }}
                  className="hover:text-slate-950 dark:hover:text-white transition-colors"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage("portfolio");
                    scrollToTop();
                  }}
                  className="hover:text-slate-950 dark:hover:text-white transition-colors"
                >
                  Full-Stack Dev & Portofolio
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage("about");
                    scrollToTop();
                  }}
                  className="hover:text-slate-950 dark:hover:text-white transition-colors"
                >
                  Tentang Saya
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage("contact");
                    scrollToTop();
                  }}
                  className="hover:text-slate-950 dark:hover:text-white transition-colors"
                >
                  Kontak & Pesan
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Contact & CV (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Kontak Cepat
            </h4>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <div>
                <span className="block text-slate-400 text-[11px]">Email:</span>
                <a
                  href={`mailto:${userProfile.email}`}
                  className="font-medium text-slate-900 dark:text-white hover:underline"
                >
                  {userProfile.email}
                </a>
              </div>
              <div>
                <span className="block text-slate-400 text-[11px]">
                  WhatsApp:
                </span>
                <a
                  href={userProfile.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  {userProfile.phone}
                </a>
              </div>
              <div className="pt-2">
                <button
                  onClick={onOpenCV}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-xs font-semibold text-slate-900 dark:text-white transition-all"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Curriculum Vitae</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {userProfile.name}. All rights
            reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors"
          >
            <span>Kembali ke atas</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
