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
import { canHover } from "../../utils/hover";
import { CardSpotlight } from "../../design/components/card-spotlight";
import { useTranslations } from "../../i18n";
import { getLocalePath } from "../../utils/locale";
import { formatShortDate } from "../../utils/format";

interface CertificateCardProps {
  certificate: CertificationItem;
  onOpenDetail?: (cert: CertificationItem) => void;
}

export const Certificate = memo<CertificateCardProps>(function Certificate({
  certificate,
  onOpenDetail,
}) {
  const { locale } = useTranslations();
  // Baca nilai hover capability dari module-level singleton - tidak ada useState/useEffect
  const hoverable = canHover();

  const cardClassName = `atelier-surface frame-motion group flex flex-col justify-between rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-4.5 cursor-pointer relative${
    hoverable
      ? " hover:border-[#36454f]/40 dark:hover:border-white/30 hover:-translate-y-1 transition-transform transition-colors duration-200"
      : ""
  }`;

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a, button")) return;
    if (certificate?.id) {
      if (typeof window !== "undefined") {
        import("astro:transitions/client")
          .then(({ navigate }) =>
            navigate(getLocalePath(`/certificate/${certificate.id}`, locale)),
          )
          .catch(() => {
            window.location.href = getLocalePath(
              `/certificate/${certificate.id}`,
              locale,
            );
          });
      }
      return;
    }
    if (onOpenDetail) onOpenDetail(certificate);
  };

  const card = hoverable ? (
    <CardSpotlight
      onClick={handleCardClick}
      className={cardClassName}
      radius={300}
      tilt={true}
    >
      <CertificateContent
        certificate={certificate}
        locale={locale}
        onOpenDetail={onOpenDetail}
      />
    </CardSpotlight>
  ) : (
    <div className={cardClassName} onClick={handleCardClick}>
      <CertificateContent
        certificate={certificate}
        locale={locale}
        onOpenDetail={onOpenDetail}
      />
    </div>
  );

  return card;
});

const CertificateContent = memo<{
  certificate: CertificationItem;
  locale: "id" | "en";
  onOpenDetail: ((cert: CertificationItem) => void) | undefined;
}>(function CertificateContent({ certificate, locale }) {
  return (
    <>
      <div className="space-y-2.5 sm:space-y-3">
        {/* Certificate Screenshot Preview Box with passe-partout */}
        <div className="passe-partout relative w-full aspect-[16/11] rounded-xl sm:rounded-2xl overflow-hidden shrink-0 bg-transparent dark:bg-black/30 p-2 sm:p-3 border border-[#36454f]/15 dark:border-white/10 flex items-center justify-center">
          <img
            src={certificate.image}
            alt={`${locale === "en" ? "Certificate" : "Sertifikat"} ${certificate.title}`}
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
            className="w-full h-full object-contain object-center rounded-lg select-none group-hover:scale-[1.02] transition-transform duration-300"
            referrerPolicy="no-referrer"
          />

          <div className="hidden sm:flex absolute top-2 left-2 sm:top-3 sm:left-3 items-center gap-1 bg-black/90 px-2 py-0.5 rounded-md sm:rounded-lg text-white text-[10px] font-semibold pointer-events-none shadow-xs border border-white/10">
            <Eye className="w-3 h-3 text-blue-400" />
            <span className="truncate">
              {locale === "en" ? "Original credential" : "Kredensial Asli"}
            </span>
          </div>

          <div className="hidden sm:block absolute top-2 right-2 sm:top-3 sm:right-3 pointer-events-none">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-300 bg-emerald-950/95 border border-emerald-500/30 px-2 py-0.5 rounded-full shadow-xs">
              <ShieldCheck className="w-3 h-3" />
              <span>{locale === "en" ? "Official" : "Resmi"}</span>
            </span>
          </div>

          {/* Bottom Badge Bar */}
          <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 flex items-center justify-between text-white text-[8.5px] sm:text-[10px] pointer-events-none">
            <span className="font-mono text-[9.5px] bg-black/90 px-2 py-0.5 rounded text-slate-200 truncate max-w-[60%] border border-white/10">
              {certificate.badgeCode || "VERIFIED"}
            </span>
            <span className="flex items-center gap-1 text-[9.5px] font-medium opacity-90 group-hover:opacity-100 bg-slate-900/95 px-2 py-0.5 rounded shrink-0 border border-white/10">
              <Maximize2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span>{locale === "en" ? "Enlarge" : "Perbesar"}</span>
            </span>
          </div>
        </div>

        {/* Category & Badge Header */}
        <div className="flex items-center justify-between gap-1.5 pt-0.5">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#273641] dark:text-blue-400 truncate max-w-[60%]">
            {certificate.category ||
              (locale === "en" ? "Certification" : "Sertifikasi")}
          </span>
          <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-[#485966] dark:text-slate-400 font-medium shrink-0">
            <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#485966]" />
            <span>
              {formatShortDate(
                certificate.period || certificate.issueDate,
                locale,
              )}
            </span>
          </div>
        </div>

        {/* Certificate Title */}
        <h3
          className="font-bold text-xs sm:text-sm lg:text-[14px] text-[#141f26] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 leading-snug transition-colors line-clamp-1"
          title={certificate.title}
        >
          {certificate.title}
        </h3>

        {/* Issuer */}
        <div className="text-[11px] sm:text-xs text-[#354551] dark:text-slate-300 font-medium truncate">
          <span className="text-[#485966] dark:text-slate-400">
            {locale === "en" ? "Issuer: " : "Penerbit: "}
          </span>
          <span className="font-semibold text-[#141f26] dark:text-white">
            {certificate.issuer}
          </span>
        </div>

        {/* Description snippet */}
        {certificate.description && (
          <p className="text-[11px] sm:text-xs text-[#24333d] dark:text-slate-300 line-clamp-2 leading-relaxed bg-[#E7EAEF]/40 dark:bg-white/[0.03] p-2 rounded-lg border border-[#36454f]/10 dark:border-white/5">
            {certificate.description}
          </p>
        )}

        {/* Verified Skills tags */}
        {certificate.skills && certificate.skills.length > 0 && (
          <div className="flex flex-wrap items-center gap-1 pt-0.5">
            {certificate.skills[0] && (
              <span
                className="px-2 py-0.5 text-[9px] sm:text-[10px] font-medium rounded-full bg-[#E7EAEF]/80 dark:bg-white/5 text-[#24333d] dark:text-slate-200 border border-[#36454f]/10 dark:border-white/5 truncate max-w-[110px] sm:max-w-[125px]"
                title={certificate.skills[0]}
              >
                {certificate.skills[0]}
              </span>
            )}

            {certificate.skills[1] && (
              <span
                className="hidden sm:inline-flex px-2 py-0.5 text-[9.5px] font-medium rounded-full bg-[#E7EAEF]/80 dark:bg-white/5 text-[#24333d] dark:text-slate-200 border border-[#36454f]/10 dark:border-white/5 truncate max-w-[125px]"
                title={certificate.skills[1]}
              >
                {certificate.skills[1]}
              </span>
            )}

            {certificate.skills.length > 1 && (
              <span className="sm:hidden px-1.5 py-0.5 text-[9px] font-semibold rounded-full bg-[#E7EAEF]/80 dark:bg-white/5 text-[#354551] dark:text-slate-300 shrink-0">
                +{certificate.skills.length - 1}
              </span>
            )}

            {certificate.skills.length > 2 && (
              <span className="hidden sm:inline-flex px-1.5 py-0.5 text-[9px] font-semibold rounded-full bg-[#E7EAEF]/80 dark:bg-white/5 text-[#354551] dark:text-slate-300 shrink-0">
                +{certificate.skills.length - 2}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer Action */}
      <div
        className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-[#36454f]/10 dark:border-white/10 flex items-center justify-between gap-1.5 sm:gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <a
          href={getLocalePath(`/certificate/${certificate.id}`, locale)}
          className="flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#36454f]/25 dark:border-white/20 bg-white/70 dark:bg-white/5 text-[#141f26] dark:text-white hover:bg-[#273641] hover:text-white dark:hover:bg-white dark:hover:text-slate-950 text-xs font-bold transition-all shrink-0 shadow-xs"
          title={
            locale === "en"
              ? "View certificate details"
              : "Lihat detail sertifikat"
          }
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Detail</span>
        </a>

        {certificate.credentialUrl && (
          <a
            href={certificate.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#273641] text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-bold hover:bg-[#141f26] dark:hover:bg-white transition-all shadow-sm shrink-0"
          >
            <span>{locale === "en" ? "Verify" : "Verifikasi"}</span>
            <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </a>
        )}
      </div>
    </>
  );
});

