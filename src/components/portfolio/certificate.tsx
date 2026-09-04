import {
  Calendar,
  ExternalLink,
  Eye,
  FileText,
  Maximize2,
  ShieldCheck,
} from "lucide-react";
import React, { memo } from "react";
import { CertificationItem } from "../../types";

interface CertificateCardProps {
  certificate: CertificationItem;
  onOpenDetail: (cert: CertificationItem) => void;
}

export const Certificate = memo<CertificateCardProps>(function Certificate({
  certificate,
  onOpenDetail,
}) {
  return (
    <div
      onClick={() => onOpenDetail(certificate)}
      className="group flex flex-col justify-between bg-white dark:bg-[#0f0f11] border border-slate-200 dark:border-white/10 rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-4 hover:border-slate-400 dark:hover:border-white/30 hover:shadow-lg transition-all duration-150 shadow-sm cursor-pointer will-change-transform"
    >
      <div className="space-y-2.5 sm:space-y-3">
        {/* Certificate Screenshot Preview Box - LOCKED ASPECT RATIO */}
        <div className="relative w-full aspect-[16/11] rounded-xl sm:rounded-2xl overflow-hidden shrink-0 bg-slate-100 dark:bg-[#141416] p-1.5 sm:p-3 border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:border-slate-400 dark:group-hover:border-white/30 transition-all">
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
            className="w-full h-full object-contain object-center rounded-lg bg-white shadow-xs select-none"
            referrerPolicy="no-referrer"
          />

          {/* Screenshot badge */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex items-center gap-1 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-md sm:rounded-lg text-white text-[8.5px] sm:text-[10px] font-semibold pointer-events-none shadow-xs">
            <Eye className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-400" />
            <span className="truncate">Kredensial Asli</span>
          </div>

          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 pointer-events-none">
            <span className="inline-flex items-center gap-1 text-[8.5px] sm:text-[10px] font-bold text-emerald-300 bg-emerald-950/85 backdrop-blur-md border border-emerald-500/30 px-2 py-0.5 rounded-full shadow-xs">
              <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span>Resmi</span>
            </span>
          </div>

          {/* Bottom Badge Bar */}
          <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 flex items-center justify-between text-white text-[8.5px] sm:text-[10px] pointer-events-none">
            <span className="font-mono text-[8px] sm:text-[9.5px] bg-black/70 backdrop-blur-md px-1.5 py-0.5 rounded text-slate-200 truncate max-w-[60%]">
              {certificate.badgeCode || "VERIFIED"}
            </span>
            <span className="flex items-center gap-1 text-[8px] sm:text-[9.5px] font-medium opacity-90 group-hover:opacity-100 bg-slate-900/80 backdrop-blur-md px-1.5 py-0.5 rounded shrink-0">
              <Maximize2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span>Perbesar</span>
            </span>
          </div>
        </div>

        {/* Category & Badge Header */}
        <div className="flex items-center justify-between gap-1.5 pt-0.5">
          <span className="text-[9.5px] sm:text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 truncate max-w-[60%]">
            {certificate.category || "Sertifikasi"}
          </span>
          <div className="flex items-center gap-1 text-[9.5px] sm:text-[11px] text-slate-600 dark:text-slate-400 font-medium shrink-0">
            <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-400" />
            <span>{certificate.period || certificate.issueDate}</span>
          </div>
        </div>

        {/* Certificate Title - 1 Baris (truncate) untuk Estetika Sempurna */}
        <h3
          className="font-bold text-xs sm:text-sm lg:text-[14px] text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 leading-tight transition-colors truncate"
          title={certificate.title}
        >
          {certificate.title}
        </h3>

        {/* Issuer */}
        <div className="text-[10px] sm:text-xs text-slate-700 dark:text-slate-300 font-medium truncate">
          <span className="text-slate-500 dark:text-slate-400">Penerbit: </span>
          <span className="font-semibold text-slate-900 dark:text-white">
            {certificate.issuer}
          </span>
        </div>

        {/* Description snippet */}
        {certificate.description && (
          <p className="text-[10px] sm:text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {certificate.description}
          </p>
        )}

        {/* Verified Skills tags - 1 tag di mobile, 2 tag di desktop */}
        {certificate.skills && certificate.skills.length > 0 && (
          <div className="flex flex-wrap items-center gap-1 pt-0.5">
            {/* Tag pertama: tampil di semua layar */}
            {certificate.skills[0] && (
              <span
                className="px-2 py-0.5 text-[8.5px] sm:text-[9.5px] font-medium rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/5 truncate max-w-[110px] sm:max-w-[125px]"
                title={certificate.skills[0]}
              >
                {certificate.skills[0]}
              </span>
            )}

            {/* Tag kedua: hanya tampil di desktop (sm ke atas) */}
            {certificate.skills[1] && (
              <span
                className="hidden sm:inline-flex px-2 py-0.5 text-[9.5px] font-medium rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/5 truncate max-w-[125px]"
                title={certificate.skills[1]}
              >
                {certificate.skills[1]}
              </span>
            )}

            {/* Badge sisa tag untuk Mobile (jika > 1) */}
            {certificate.skills.length > 1 && (
              <span className="sm:hidden px-1.5 py-0.5 text-[8.5px] font-semibold rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 shrink-0">
                +{certificate.skills.length - 1}
              </span>
            )}

            {/* Badge sisa tag untuk Desktop (jika > 2) */}
            {certificate.skills.length > 2 && (
              <span className="hidden sm:inline-flex px-1.5 py-0.5 text-[9px] font-semibold rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 shrink-0">
                +{certificate.skills.length - 2}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer Action */}
      <div
        className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-1.5 sm:gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => onOpenDetail(certificate)}
          className="flex items-center justify-center gap-1 p-1.5 sm:px-4 sm:py-2 rounded-full border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 text-[10px] sm:text-xs font-bold transition-all shrink-0"
          title="Detail Sertifikat"
        >
          <FileText className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Detail</span>
        </button>

        {certificate.credentialUrl && (
          <a
            href={certificate.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-[10px] sm:text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-sm shrink-0"
          >
            <span>Verifikasi</span>
            <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
});
