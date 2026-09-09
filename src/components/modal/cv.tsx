import { ExternalLink, FileText, Globe, Printer, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

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
  const cvFrame = useRef<HTMLIFrameElement>(null);
  const [lang, setLang] = useState<CVLang>("id");

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-2 backdrop-blur-md sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Pratinjau curriculum vitae"
      onClick={onClose}
    >
      <section
        className="flex h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0c0c0d]"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/[0.03] sm:px-6">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="rounded-xl bg-slate-900 p-2 text-white dark:bg-white dark:text-slate-950">
              <FileText className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <h2 className="truncate text-sm font-bold text-slate-950 dark:text-white">
                Curriculum Vitae
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pratinjau Dokumen PDF • Ikhwan Ramadhan
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 dark:border-white/10 dark:bg-white/[0.04]">
              <Globe className="ml-1.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
              <button
                type="button"
                onClick={() => setLang("id")}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                  lang === "id"
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
                    : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                  lang === "en"
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
                    : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                EN
              </button>
            </div>

            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-100 dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
              title="Buka di tab browser baru"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Buka Tab Baru</span>
            </a>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-950"
              title="Cetak dari browser"
            >
              <Printer className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Cetak</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-2 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-950 dark:hover:bg-white/10 dark:hover:text-white"
              aria-label="Tutup pratinjau CV"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </header>
        <iframe
          ref={cvFrame}
          src={cvUrl}
          title="CV Ikhwan Ramadhan"
          className="min-h-0 flex-1 bg-slate-100"
        >
          <p>
            Browser Anda tidak dapat menampilkan PDF. Buka{" "}
            <a href={cvUrl}>dokumen CV</a>.
          </p>
        </iframe>
      </section>
    </div>
  );
};
