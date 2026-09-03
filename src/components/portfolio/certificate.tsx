import {
  Calendar,
  ExternalLink,
  Eye,
  FileText,
  Maximize2,
  ShieldCheck,
} from "lucide-react";
import React from "react";
import { CertificationItem } from "../../types";

interface CertificateCardProps {
  certificate: CertificationItem;
  onOpenDetail: (cert: CertificationItem) => void;
}

export const Certificate: React.FC<CertificateCardProps> = ({
  certificate,
  onOpenDetail,
}) => {
  return (
    <div
      onClick={() => onOpenDetail(certificate)}
      className="group flex flex-col justify-between bg-white dark:bg-[#0f0f11] border border-slate-200 dark:border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 hover:border-slate-400 dark:hover:border-white/30 hover:shadow-xl transition-all duration-200 shadow-sm cursor-pointer"
    >
      <div className="space-y-4">
        {/* Certificate Screenshot Preview Box */}
        <div className="relative w-full aspect-[16/11] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 dark:bg-[#141416] p-2 sm:p-3 border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:border-slate-400 dark:group-hover:border-white/30 transition-all">
          <img
            src={certificate.image}
            alt={`Sertifikat ${certificate.title}`}
            width={640}
            height={440}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const target = e.currentTarget;
              if (
                certificate.fallbackImage &&
                target.src !== certificate.fallbackImage
              ) {
                target.src = certificate.fallbackImage;
              }
            }}
            className="w-full h-full object-contain object-center rounded-lg bg-white shadow-xs"
            referrerPolicy="no-referrer"
          />

          {/* Screenshot badge */}
          <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg text-white text-[11px] font-semibold pointer-events-none shadow-xs">
            <Eye className="w-3.5 h-3.5 text-blue-400" />
            <span>Kredensial Asli</span>
          </div>

          <div className="absolute top-3.5 right-3.5 pointer-events-none">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-950/85 backdrop-blur-md border border-emerald-500/30 px-2.5 py-1 rounded-full shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Resmi</span>
            </span>
          </div>

          {/* Bottom Badge Bar */}
          <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white text-xs pointer-events-none">
            <span className="font-mono text-[11px] bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-slate-200">
              {certificate.badgeCode || "VERIFIED"}
            </span>
            <span className="flex items-center gap-1 text-[11px] font-medium opacity-90 group-hover:opacity-100 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded">
              <Maximize2 className="w-3 h-3" />
              <span>Perbesar</span>
            </span>
          </div>
        </div>

        {/* Category & Badge Header */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            {certificate.category || "Sertifikasi"}
          </span>
          <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 font-medium">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{certificate.period || certificate.issueDate}</span>
          </div>
        </div>

        {/* Certificate Title */}
        <h3 className="font-bold text-base sm:text-lg text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 leading-snug transition-colors">
          {certificate.title}
        </h3>

        {/* Issuer */}
        <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
          <span className="text-slate-500 dark:text-slate-400">Penerbit: </span>
          <span className="font-semibold text-slate-900 dark:text-white">
            {certificate.issuer}
          </span>
        </div>

        {/* Description snippet */}
        {certificate.description && (
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {certificate.description}
          </p>
        )}

        {/* Verified Skills tags */}
        {certificate.skills && certificate.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {certificate.skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/5"
              >
                {skill}
              </span>
            ))}
            {certificate.skills.length > 4 && (
              <span className="px-2.5 py-1 text-xs text-slate-500 dark:text-slate-400 font-medium rounded-full bg-slate-100 dark:bg-white/5">
                +{certificate.skills.length - 4}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer Action */}
      <div
        className="pt-4 mt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => onOpenDetail(certificate)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 text-xs font-bold transition-all"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Lihat Screenshot & Detail</span>
        </button>

        {certificate.credentialUrl && (
          <a
            href={certificate.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-sm"
          >
            <span>Verifikasi Asli</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
};
