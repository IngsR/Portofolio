import { FileText, Github, Globe, Linkedin, Mail, Phone, Printer, X } from "lucide-react";
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

  // Group certifications by issuer
  const certsByIssuer = certificationsData.reduce<
    Record<string, typeof certificationsData>
  >((acc, cert) => {
    acc[cert.issuer] ??= [];
    acc[cert.issuer]!.push(cert);
    return acc;
  }, {});

  return (
    <div className="cv-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150 print:static print:p-0 print:m-0 print:bg-transparent dark:print:bg-transparent print:backdrop-blur-none">
      <div
        className="cv-modal-container relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-[#0c0c0d] rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden print:static print:max-h-none print:max-w-none print:w-full print:rounded-none print:border-none print:shadow-none print:bg-transparent dark:print:bg-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Toolbar — Hidden on Print */}
        <div className="p-4 sm:px-6 border-b border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.02] flex items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950">
              <FileText className="w-4 h-4" />
            </span>
            <div>
              <h2 className="font-bold text-xs sm:text-sm text-slate-950 dark:text-white">
                Curriculum Vitae — {userProfile.name}
              </h2>
              <span className="text-[10px] text-slate-500">
                Pratinjau Dokumen &amp; Siap Cetak PDF
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
        <div
          id="cv-printable-document"
          className="flex-1 overflow-y-auto p-6 sm:p-10 bg-white text-slate-950 space-y-4 sm:space-y-5 font-sans print:p-0 print:space-y-4 print:overflow-visible"
        >
          {/* ── Header: Name + Title + Contacts ── */}
          <div className="border-b border-slate-300 pb-3 space-y-2 cv-section">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
                {userProfile.name}
              </h1>
              <p className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                {userProfile.title}
              </p>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap items-center gap-y-1.5 gap-x-5 text-sm text-slate-950 font-medium">
              <a href={`mailto:${userProfile.email}`} className="flex items-center gap-1.5 hover:underline">
                <Mail className="w-4 h-4 text-slate-950" />
                <span>{userProfile.email}</span>
              </a>
              <a href={`tel:${userProfile.phone}`} className="flex items-center gap-1.5 hover:underline">
                <Phone className="w-4 h-4 text-slate-950" />
                <span>{userProfile.phone}</span>
              </a>
              <a href="https://github.com/IngsR" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline">
                <Github className="w-4 h-4 text-slate-950" />
                <span>github.com/IngsR</span>
              </a>
              <a href="https://www.linkedin.com/in/ikhwn-rdn" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline">
                <Linkedin className="w-4 h-4 text-slate-950" />
                <span>linkedin.com/in/ikhwn-rdn</span>
              </a>
              <a href="https://ikhwann.my.id" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline">
                <Globe className="w-4 h-4 text-slate-950" />
                <span>ikhwann.my.id</span>
              </a>
              <span className="text-slate-950 font-medium">
                Padang, 18 November 2003
              </span>
            </div>
          </div>

          {/* ── Profile summary — no heading, flows naturally after contact ── */}
          <p className="text-sm text-slate-950 leading-relaxed border-b border-slate-300 pb-3.5 cv-section">
            {userProfile.shortBio}
          </p>

          {/* ── EXPERIENCE ── */}
          <div className="space-y-3 cv-section">
            <h2 className="text-sm font-extrabold text-slate-950 uppercase tracking-wider border-b-2 border-slate-900 pb-1">
              PENGALAMAN
            </h2>

            <div className="space-y-3.5">
              {experienceData.map((exp) => (
                <div key={exp.id} className="space-y-1 text-sm">
                  <div className="flex items-baseline justify-between">
                    <strong style={{ fontWeight: 800 }} className="text-base font-extrabold text-slate-950">
                      {exp.role}
                    </strong>
                    <span className="text-slate-950 font-semibold shrink-0 ml-2 text-sm">
                      {exp.period}
                    </span>
                  </div>
                  <div className="text-slate-950 font-medium text-sm">
                    {exp.company} &bull; {exp.location} ({exp.type})
                  </div>
                  <ul className="space-y-0.5 text-slate-950 pt-0.5 text-sm">
                    {exp.achievements.map((ach, i) => (
                      <li key={i} className="flex items-start gap-1.5 leading-relaxed">
                        <span className="text-slate-950 font-bold mt-px">•</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1 pt-0.5 text-sm text-slate-950">
                    <strong style={{ fontWeight: 800 }} className="text-slate-950 font-extrabold">Tech Stack:</strong>{" "}
                    <span>{exp.techStack.join(", ")}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── EDUCATION ── */}
          <div className="space-y-2 cv-section">
            <h2 className="text-sm font-extrabold text-slate-950 uppercase tracking-wider border-b-2 border-slate-900 pb-1">
              PENDIDIKAN
            </h2>
            {educationData.map((edu) => (
              <div key={edu.id} className="space-y-0.5 text-sm">
                <strong style={{ fontWeight: 800 }} className="block text-base font-extrabold text-slate-950">{edu.degree}</strong>
                <div className="text-slate-950 font-medium">{edu.institution}</div>
                <div className="text-slate-950">{edu.period}</div>
              </div>
            ))}
          </div>

          {/* ── CERTIFICATIONS & CREDENTIALS ── */}
          <div className="space-y-2.5 cv-section">
            <h2 className="text-sm font-extrabold text-slate-950 uppercase tracking-wider border-b-2 border-slate-900 pb-1">
              CERTIFICATIONS &amp; CREDENTIALS
            </h2>
            <div className="space-y-2.5 text-sm">
              {Object.entries(certsByIssuer).map(([issuer, certs]) => (
                <div key={issuer} className="space-y-1">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    {issuer}
                  </div>
                  {certs.map((cert) => (
                    <div key={cert.id} className="flex items-baseline justify-between gap-2 pl-1.5 font-normal text-slate-950 text-sm">
                      <span className="font-normal text-slate-950">{cert.title}</span>
                      <span className="font-normal text-slate-950 shrink-0">{cert.issueDate}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* ── TECHNICAL SKILLS ── */}
          <div className="space-y-2 text-sm cv-section">
            <h2 className="text-sm font-extrabold text-slate-950 uppercase tracking-wider border-b-2 border-slate-900 pb-1">
              TECHNICAL SKILLS
            </h2>
            <div className="space-y-1 text-slate-950 leading-relaxed text-sm">
              <div>
                <span className="font-normal text-slate-950">Frontend:</span>{" "}
                <span>React, TypeScript, JavaScript, Next.js, Tailwind CSS, shadcn/ui, Zod</span>
              </div>
              <div>
                <span className="font-normal text-slate-950">Backend:</span>{" "}
                <span>Node.js, NestJS, Express, REST API, OpenAPI, Auth.js, JWT</span>
              </div>
              <div>
                <span className="font-normal text-slate-950">Database:</span>{" "}
                <span>PostgreSQL, SQL, Drizzle ORM, Prisma, TypeORM</span>
              </div>
              <div>
                <span className="font-normal text-slate-950">DevOps:</span>{" "}
                <span>Docker, Linux, Git, GitHub, Vercel</span>
              </div>
              <div>
                <span className="font-normal text-slate-950">Data &amp; ML:</span>{" "}
                <span>Python, NumPy, Pandas, Scikit-learn, TensorFlow, LSTM, Streamlit, Folium</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
