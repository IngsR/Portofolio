import {
  FileText,
  Github,
  Mail,
  MapPin,
  Phone,
  Printer,
  X,
} from "lucide-react";
import React, { useEffect } from "react";
import {
  certificationsData,
  educationData,
  experienceData,
  userProfile,
} from "../data/portfolioData";

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-[#0c0c0d] rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Toolbar */}
        <div className="p-4 sm:px-6 border-b border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.02] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950">
              <FileText className="w-4 h-4" />
            </span>
            <div>
              <h2 className="font-bold text-xs sm:text-sm text-slate-950 dark:text-white">
                Curriculum Vitae — {userProfile.name}
              </h2>
              <span className="text-[10px] text-slate-500">
                Pratinjau Dokumen & Siap Cetak PDF
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-xs font-bold rounded-xl hover:opacity-90 shadow-sm transition-opacity"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Simpan PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable CV Document Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-white text-slate-950 space-y-8 font-sans">
          {/* Top Header */}
          <div className="border-b border-slate-200 pb-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
                {userProfile.name}
              </h1>
              <p className="text-sm font-bold text-black">
                {userProfile.title}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-800" />
                {userProfile.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-800" />
                {userProfile.phone}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-800" />
                {userProfile.location} (Siap On-Site / Remote)
              </span>
              <span className="flex items-center gap-1">
                <Github className="w-3.5 h-3.5 text-slate-800" />
                github.com/IngsR
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-2 font-normal">
              {userProfile.shortBio}
            </p>
          </div>

          {/* Experience Section */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1.5">
              PENGALAMAN KERJA
            </h2>

            <div className="space-y-4">
              {experienceData.map((exp) => (
                <div key={exp.id} className="space-y-1.5 text-xs">
                  <div className="flex items-baseline justify-between">
                    <strong className="text-sm font-bold text-slate-950">
                      {exp.role}
                    </strong>
                    <span className="text-slate-500 font-medium">
                      {exp.period}
                    </span>
                  </div>
                  <div className="text-slate-600 font-medium">
                    {exp.company} • {exp.location} ({exp.type})
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {exp.description}
                  </p>
                  <ul className="space-y-1 text-slate-700 pt-1">
                    {exp.achievements.map((ach, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1 pt-1 text-[11px] text-slate-600">
                    <strong className="text-slate-800">Tech Stack:</strong>{" "}
                    {exp.techStack.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1.5">
                RIWAYAT PENDIDIKAN
              </h2>
              {educationData.map((edu) => (
                <div key={edu.id} className="space-y-1 text-xs">
                  <div className="font-bold text-slate-950">{edu.degree}</div>
                  <div className="text-slate-600">
                    {edu.institution} ({edu.period})
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1.5">
                SERTIFIKASI & KOMPETENSI
              </h2>
              <div className="space-y-2.5 text-xs">
                {certificationsData.map((cert) => (
                  <div key={cert.id} className="space-y-0.5">
                    <div className="font-bold text-slate-950">{cert.title}</div>
                    <div className="text-slate-500 text-[11px]">
                      {cert.issuer} • {cert.period || cert.issueDate}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Technical Skills Summary */}
          <div className="space-y-2 text-xs pt-2">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1.5">
              SPESIFIKASI KEAHLIAN TEKNIS
            </h2>
            <div className="space-y-1.5 text-slate-700 text-xs">
              <div>
                <strong className="text-slate-950">Full-Stack & Web:</strong>{" "}
                React, TypeScript, JavaScript (ES6+), Next.js, Tailwind CSS,
                shadcn/ui, NestJS, Express.
              </div>
              <div>
                <strong className="text-slate-950">Database & SQL:</strong>{" "}
                PostgreSQL, SQL Engineering, Drizzle ORM, Prisma, TypeORM,
                Turborepo, Auth.js (NextAuth), JWT.
              </div>
              <div>
                <strong className="text-slate-950">DevOps & Server OS:</strong>{" "}
                Docker Containerization, OS Linux (Debian & Ubuntu Server),
                Git/GitHub Workflow, REST API & OpenAPI.
              </div>
              <div>
                <strong className="text-slate-950">Data Science:</strong> Python
                (NumPy, Pandas, Scikit-learn), Time Series Forecasting (LSTM),
                TensorFlow, Streamlit, Folium Geospatial.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
