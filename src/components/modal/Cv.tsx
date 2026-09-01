import {
  Check,
  Download,
  ExternalLink,
  FileDown,
  FileText,
  Github,
  Globe,
  Languages,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Printer,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import cvDataJson from "../../data/cv.json";
import { CVContent, CVLanguage } from "../../types";
import { exportCVToDocx, exportCVToPdf } from "../../utils/cv";

const cvData = cvDataJson as Record<CVLanguage, CVContent>;

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Cv: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  const [lang, setLang] = useState<CVLanguage>("id");
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isExportingDocx, setIsExportingDocx] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Auto clear success toast
  useEffect(() => {
    if (successToast) {
      const timer = setTimeout(() => setSuccessToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successToast]);

  const currentCV: CVContent = cvData[lang] || cvData.id;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadDocx = async () => {
    try {
      setIsExportingDocx(true);
      await exportCVToDocx(currentCV, lang);
      setSuccessToast(
        lang === "id"
          ? "File Word (.docx) berhasil diunduh!"
          : "Word document (.docx) successfully downloaded!"
      );
    } catch (err) {
      console.error("Failed to export DOCX:", err);
    } finally {
      setIsExportingDocx(false);
    }
  };

  const handleDownloadPdf = async () => {
    try {
      setIsExportingPdf(true);
      await exportCVToPdf(currentCV, lang);
      setSuccessToast(
        lang === "id"
          ? "File PDF berhasil diunduh!"
          : "PDF file successfully downloaded!"
      );
    } catch (err) {
      console.error("Failed to export PDF:", err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="cv-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150 print:static print:p-0 print:m-0 print:bg-transparent dark:print:bg-transparent print:backdrop-blur-none">
      <div
        className="cv-modal-container relative w-full max-w-4xl max-h-[94vh] flex flex-col bg-white dark:bg-[#0c0c0d] rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden print:static print:max-h-none print:max-w-none print:w-full print:rounded-none print:border-none print:shadow-none print:bg-transparent dark:print:bg-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Toolbar — Hidden on Print */}
        <div className="p-3.5 sm:px-6 border-b border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-white/[0.03] flex flex-wrap items-center justify-between gap-3 print:hidden">
          {/* Title & Document Badge */}
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm">
              <FileText className="w-4 h-4" />
            </span>
            <div>
              <h2 className="font-bold text-xs sm:text-sm text-slate-950 dark:text-white leading-tight">
                {currentCV.labels.modalTitle}
              </h2>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {currentCV.labels.modalSubtitle}
              </span>
            </div>
          </div>

          {/* Action Controls: Language Toggle & Download Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Language Selector (Segmented Switch: ID / EN) */}
            <div className="flex items-center p-1 bg-slate-200/80 dark:bg-white/10 rounded-xl border border-slate-300/60 dark:border-white/10 shadow-inner">
              <button
                type="button"
                onClick={() => setLang("id")}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  lang === "id"
                    ? "bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
                }`}
                title="Bahasa Indonesia"
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  lang === "en"
                    ? "bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
                }`}
                title="English"
              >
                EN
              </button>
            </div>

            {/* Download PDF Button */}
            <button
              onClick={handleDownloadPdf}
              disabled={isExportingPdf}
              className="flex items-center gap-1.5 px-3 py-2 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              title={currentCV.labels.downloadPdf}
            >
              {isExportingPdf ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <FileDown className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">PDF</span>
            </button>

            {/* Download DOCX (Word) Button */}
            <button
              onClick={handleDownloadDocx}
              disabled={isExportingDocx}
              className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              title={currentCV.labels.downloadDocx}
            >
              {isExportingDocx ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">DOCX</span>
            </button>

            {/* Print / Save PDF via Browser */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 text-xs font-bold rounded-xl shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              title={currentCV.labels.printButton}
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{currentCV.labels.printButton}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors ml-1"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success notification banner */}
        {successToast && (
          <div className="bg-emerald-600 text-white text-xs font-semibold px-4 py-2 flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200 print:hidden">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>{successToast}</span>
            </div>
            <button
              onClick={() => setSuccessToast(null)}
              className="text-white/80 hover:text-white"
            >
              &times;
            </button>
          </div>
        )}

        {/* Printable CV Document Content */}
        <div
          id="cv-printable-document"
          className="flex-1 overflow-y-auto p-6 sm:p-10 bg-white text-slate-950 space-y-4 sm:space-y-5 font-sans print:p-0 print:space-y-2.5 print:overflow-visible selection:bg-slate-200"
        >
          {/* ── Header: Name + Title + Contacts ── */}
          <div className="border-b border-slate-300 pb-3 print:pb-2 space-y-1.5 print:space-y-0.5 cv-section">
            <div>
              <h1 className="text-3xl sm:text-4xl print:text-2xl font-black tracking-tight text-slate-950">
                {currentCV.header.name}
              </h1>
              <p className="text-base sm:text-lg print:text-xs font-bold text-slate-800 mt-0.5">
                {currentCV.header.title}
              </p>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap items-center gap-y-1.5 gap-x-5 print:gap-y-0.5 print:gap-x-3 text-sm print:text-[11px] text-slate-950 font-medium">
              <a
                href={`mailto:${currentCV.header.email}`}
                className="flex items-center gap-1.5 hover:underline"
              >
                <Mail className="w-4 h-4 print:w-3 print:h-3 text-slate-950" />
                <span>{currentCV.header.email}</span>
              </a>
              <a
                href={`tel:${currentCV.header.phone}`}
                className="flex items-center gap-1.5 hover:underline"
              >
                <Phone className="w-4 h-4 print:w-3 print:h-3 text-slate-950" />
                <span>{currentCV.header.phone}</span>
              </a>
              <a
                href={`https://${currentCV.header.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:underline"
              >
                <Github className="w-4 h-4 print:w-3 print:h-3 text-slate-950" />
                <span>{currentCV.header.github}</span>
              </a>
              <a
                href={`https://${currentCV.header.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:underline"
              >
                <Linkedin className="w-4 h-4 print:w-3 print:h-3 text-slate-950" />
                <span>{currentCV.header.linkedin}</span>
              </a>
              <a
                href={`https://${currentCV.header.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:underline"
              >
                <Globe className="w-4 h-4 print:w-3 print:h-3 text-slate-950" />
                <span>{currentCV.header.website}</span>
              </a>
              <span className="flex items-center gap-1.5 text-slate-950 font-medium">
                <MapPin className="w-4 h-4 print:w-3 print:h-3 text-slate-950 shrink-0" />
                <span>{currentCV.header.location}</span>
              </span>
              <span className="text-slate-950 font-medium">
                {currentCV.header.birthInfo}
              </span>
            </div>
          </div>

          {/* ── Profile summary ── */}
          <p className="text-sm print:text-[11.5px] print:leading-snug text-slate-950 leading-relaxed border-b border-slate-300 pb-3 print:pb-2 cv-section">
            {currentCV.summary}
          </p>

          {/* ── 1. PENGALAMAN MAGANG (INTERNSHIP EXPERIENCE) ── */}
          <div className="space-y-2.5 print:space-y-1.5 cv-section">
            <h2 className="text-sm print:text-xs font-extrabold text-slate-950 uppercase tracking-wider border-b-2 border-slate-900 pb-0.5">
              {currentCV.labels.internship}
            </h2>

            <div className="space-y-3 print:space-y-2">
              {currentCV.internship.map((exp) => (
                <div key={exp.id} className="space-y-0.5 text-sm print:text-[11px]">
                  <div className="flex items-baseline justify-between">
                    <strong
                      style={{ fontWeight: 800 }}
                      className="text-base print:text-xs font-extrabold text-slate-950"
                    >
                      {exp.role}
                    </strong>
                    <span className="text-slate-950 font-semibold shrink-0 ml-2 text-sm print:text-[10.5px]">
                      {exp.period}
                    </span>
                  </div>
                  <div className="text-slate-950 font-medium text-xs print:text-[10.5px]">
                    {exp.company} &bull; {exp.location} ({exp.type})
                  </div>
                  {exp.link && (
                    <div className="text-xs print:text-[10px] font-medium text-slate-800 flex items-center gap-1">
                      <strong className="font-bold text-slate-950">
                        {currentCV.labels.liveDemoLabel}:
                      </strong>
                      <a
                        href={`https://${exp.link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:underline font-mono inline-flex items-center gap-0.5"
                      >
                        <span>{exp.link}</span>
                        <ExternalLink className="w-3 h-3 print:hidden" />
                      </a>
                    </div>
                  )}
                  <ol className="space-y-0.5 text-slate-950 pt-0.5 text-xs print:text-[10.5px]">
                    {exp.achievements.map((ach, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-1.5 leading-snug"
                      >
                        <span className="text-slate-950 font-bold shrink-0">
                          {i + 1}.
                        </span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ol>
                  <div className="flex flex-wrap gap-1 pt-0.5 text-xs print:text-[10px] text-slate-950">
                    <strong
                      style={{ fontWeight: 800 }}
                      className="text-slate-950 font-extrabold"
                    >
                      {currentCV.labels.techStackLabel}:
                    </strong>{" "}
                    <span>{exp.techStack.join(", ")}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── 2. PENDIDIKAN (EDUCATION) ── */}
          <div className="space-y-1.5 print:space-y-1 cv-section">
            <h2 className="text-sm print:text-xs font-extrabold text-slate-950 uppercase tracking-wider border-b-2 border-slate-900 pb-0.5">
              {currentCV.labels.education}
            </h2>
            {currentCV.education.map((edu) => (
              <div key={edu.id} className="space-y-0 text-sm print:text-[11px]">
                <div className="flex items-baseline justify-between">
                  <strong
                    style={{ fontWeight: 800 }}
                    className="block text-sm print:text-xs font-extrabold text-slate-950"
                  >
                    {edu.degree}
                  </strong>
                  <span className="text-slate-950 text-xs print:text-[10.5px]">{edu.period}</span>
                </div>
                <div className="text-slate-950 font-medium text-xs print:text-[10.5px]">
                  {edu.institution}
                </div>
              </div>
            ))}
          </div>

          {/* ── 3. PORTOFOLIO PROYEK UNGGULAN (FEATURED PORTFOLIO PROJECTS) ── */}
          <div className="space-y-2.5 print:space-y-1.5 cv-section">
            <h2 className="text-sm print:text-xs font-extrabold text-slate-950 uppercase tracking-wider border-b-2 border-slate-900 pb-0.5">
              {currentCV.labels.projects}
            </h2>

            <div className="space-y-3 print:space-y-2">
              {currentCV.projects.map((proj) => (
                <div key={proj.id} className="space-y-1 text-sm print:text-[11px]">
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <strong
                        style={{ fontWeight: 800 }}
                        className="text-base print:text-xs font-extrabold text-slate-950"
                      >
                        {proj.title}
                      </strong>
                      <span className="text-xs font-semibold text-slate-700">
                        ({proj.role})
                      </span>
                    </div>
                    {proj.period && (
                      <span className="text-slate-950 font-semibold shrink-0 text-sm print:text-[10.5px]">
                        {proj.period}
                      </span>
                    )}
                  </div>

                  {proj.link && (
                    <div className="text-xs print:text-[10px] font-medium text-slate-800 flex items-center gap-1">
                      <strong className="font-bold text-slate-950">
                        {currentCV.labels.liveDemoLabel}:
                      </strong>
                      <a
                        href={`https://${proj.link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:underline font-mono inline-flex items-center gap-0.5"
                      >
                        <span>{proj.link}</span>
                        <ExternalLink className="w-3 h-3 print:hidden" />
                      </a>
                    </div>
                  )}

                  <p className="text-xs print:text-[10.5px] text-slate-950 leading-relaxed font-normal">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-0.5 text-xs print:text-[10px] text-slate-950">
                    <strong
                      style={{ fontWeight: 800 }}
                      className="text-slate-950 font-extrabold"
                    >
                      {currentCV.labels.techStackLabel}:
                    </strong>{" "}
                    <span>{proj.techStack.join(", ")}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── 4. SERTIFIKASI & KREDENSIAL ── */}
          <div className="space-y-1.5 print:space-y-1 cv-section">
            <h2 className="text-sm print:text-xs font-extrabold text-slate-950 uppercase tracking-wider border-b-2 border-slate-900 pb-0.5">
              {currentCV.labels.certifications}
            </h2>
            <div className="grid grid-cols-1 print:grid-cols-2 gap-2 print:gap-x-4 print:gap-y-1 text-sm print:text-[10.5px]">
              {Object.entries(currentCV.certificationsByIssuer).map(
                ([issuer, certs]) => (
                  <div key={issuer} className="space-y-0.5">
                    <div className="text-xs print:text-[10.5px] font-bold text-slate-800 uppercase tracking-wider">
                      {issuer}
                    </div>
                    {certs.map((cert) => (
                      <div
                        key={cert.id}
                        className="flex items-baseline justify-between gap-2 pl-1.5 font-normal text-slate-950 text-xs print:text-[10px]"
                      >
                        <span className="font-normal text-slate-950">
                          {cert.title}
                        </span>
                        <span className="font-normal text-slate-950 shrink-0">
                          {cert.issueDate}
                        </span>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>

          {/* ── 5. TECHNICAL SKILLS (FRONTEND FOCUS) ── */}
          <div className="space-y-1.5 print:space-y-1 text-sm print:text-[10.5px] cv-section">
            <h2 className="text-sm print:text-xs font-extrabold text-slate-950 uppercase tracking-wider border-b-2 border-slate-900 pb-0.5">
              {currentCV.labels.technicalSkills}
            </h2>
            <div className="space-y-0.5 text-slate-950 leading-tight text-xs print:text-[10.5px]">
              {currentCV.skills.map((s, idx) => (
                <div key={idx}>
                  <strong className="font-bold text-slate-950">
                    {s.category}:
                  </strong>{" "}
                  <span>{s.items}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
