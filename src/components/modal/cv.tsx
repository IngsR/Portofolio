import { ExternalLink, FileText, Globe, Printer, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useTranslations } from "../../i18n";

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const cvFiles = {
  id: "/CV/IkhwanRamadhanCV.pdf",
  en: "/CV/IkhwanRmadhanCVeng.pdf",
} as const;

type CVLang = keyof typeof cvFiles;

export const Cv: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  const { locale } = useTranslations();
  const cvFrame = useRef<HTMLIFrameElement>(null);
  const [lang, setLang] = useState<CVLang>(locale);
  const copy =
    locale === "en"
      ? {
          preview: "Curriculum vitae preview",
          document: "PDF document preview • Ikhwan Ramadhan",
          documentMobile: "PDF Preview • Ikhwan Ramadhan",
          openTab: "Open in a new browser tab",
          openTabLabel: "Open new tab",
          openTabMobile: "Open",
          openFullscreen: "Open Fullscreen PDF",
          versionId: "Indonesian Version",
          versionEn: "English Version",
          print: "Print from browser",
          close: "Close CV preview",
          unsupported: "Your browser cannot display this PDF. Open the",
          documentLink: "CV document",
        }
      : {
          preview: "Pratinjau curriculum vitae",
          document: "Pratinjau Dokumen PDF • Ikhwan Ramadhan",
          documentMobile: "Pratinjau PDF • Ikhwan Ramadhan",
          openTab: "Buka di tab browser baru",
          openTabLabel: "Buka Tab Baru",
          openTabMobile: "Buka",
          openFullscreen: "Buka PDF Layar Penuh",
          versionId: "Versi Indonesia",
          versionEn: "Versi Bahasa Inggris",
          print: "Cetak dari browser",
          close: "Tutup pratinjau CV",
          unsupported: "Browser Anda tidak dapat menampilkan PDF. Buka",
          documentLink: "dokumen CV",
        };

  const cvUrl = cvFiles[lang];

  useEffect(() => {
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) window.addEventListener("keydown", closeWithEscape);
    return () => window.removeEventListener("keydown", closeWithEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    try {
      cvFrame.current?.contentWindow?.print();
    } catch {
      window.open(cvUrl, "_blank");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-1.5 backdrop-blur-md sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={copy.preview}
      onClick={onClose}
    >
      <section
        className="flex h-[95vh] sm:h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0c0c0d]"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-center justify-between gap-2 border-b border-[#36454f]/15 bg-transparent px-3 py-2 sm:px-6 sm:py-3.5 dark:border-white/10 dark:bg-white/[0.02]">
          {/* Document Title & Subtitle */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-2.5">
            <span className="shrink-0 rounded-lg sm:rounded-xl border border-[#36454f]/20 bg-transparent p-1.5 sm:p-2 text-[#1c2932] shadow-xs dark:border-white/10 dark:bg-white/10 dark:text-white">
              <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </span>
            <div className="min-w-0">
              <h2 className="text-xs sm:text-sm font-bold text-[#1c2932] dark:text-white whitespace-nowrap">
                Curriculum Vitae
              </h2>
              <p className="text-[10px] sm:text-xs text-[#485966] dark:text-slate-400 truncate whitespace-nowrap leading-tight">
                <span className="sm:hidden">{copy.documentMobile}</span>
                <span className="hidden sm:inline">{copy.document}</span>
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            {/* Language Toggle */}
            <div className="flex items-center rounded-lg sm:rounded-xl border border-[#36454f]/20 bg-transparent p-0.5 sm:p-1 dark:border-white/10 dark:bg-white/[0.04]">
              <Globe className="hidden sm:block ml-1.5 h-3.5 w-3.5 shrink-0 text-[#485966] dark:text-slate-400" />
              <button
                type="button"
                onClick={() => setLang("id")}
                className={`rounded-md sm:rounded-lg px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold transition-all ${
                  lang === "id"
                    ? "border border-[#36454f]/25 bg-[#273641] text-white shadow-xs dark:border-white/20 dark:bg-white/20 dark:text-white"
                    : "text-[#485966] hover:text-[#1c2932] dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`rounded-md sm:rounded-lg px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold transition-all ${
                  lang === "en"
                    ? "border border-[#36454f]/25 bg-[#273641] text-white shadow-xs dark:border-white/20 dark:bg-white/20 dark:text-white"
                    : "text-[#485966] hover:text-[#1c2932] dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                EN
              </button>
            </div>

            {/* Open in new tab button */}
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 sm:gap-1.5 rounded-lg sm:rounded-xl border border-[#36454f]/25 bg-transparent px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold text-[#1c2932] transition-colors hover:bg-[#36454f]/5 dark:border-white/15 dark:bg-transparent dark:text-slate-200 dark:hover:bg-white/10"
              title={copy.openTab}
            >
              <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span className="hidden sm:inline">{copy.openTabLabel}</span>
              <span className="sm:hidden">{copy.openTabMobile}</span>
            </a>

            {/* Print button (desktop only) */}
            <button
              type="button"
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-[#36454f]/25 bg-[#273641] px-3 py-1.5 text-xs font-bold text-white shadow-xs transition-colors hover:bg-[#1a252d] dark:border-white/15 dark:bg-white/15 dark:text-white dark:hover:bg-white/25"
              title={copy.print}
            >
              <Printer className="h-3.5 w-3.5 shrink-0" />
              <span>{locale === "en" ? "Print" : "Cetak"}</span>
            </button>

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg sm:rounded-xl text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
              aria-label={copy.close}
            >
              <X className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
            </button>
          </div>
        </header>

        {/* PDF viewer frame */}
        <iframe
          ref={cvFrame}
          src={cvUrl}
          title="CV Ikhwan Ramadhan"
          className="min-h-0 flex-1 bg-slate-100 dark:bg-slate-900"
        >
          <p className="p-4 text-xs text-slate-500">
            {copy.unsupported} <a href={cvUrl} className="underline">{copy.documentLink}</a>.
          </p>
        </iframe>

        {/* Mobile bottom bar for native fullscreen reading */}
        <div className="flex sm:hidden items-center justify-between border-t border-[#36454f]/10 dark:border-white/10 bg-slate-50 dark:bg-[#111113] px-3 py-1.5 text-[11px]">
          <span className="text-slate-500 dark:text-slate-400 font-mono text-[10px]">
            {lang === "id" ? copy.versionId : copy.versionEn}
          </span>
          <a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-bold text-[#273641] dark:text-white hover:underline text-[10.5px]"
          >
            <span>{copy.openFullscreen}</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </section>
    </div>
  );
};
