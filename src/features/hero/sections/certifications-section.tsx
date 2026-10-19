"use client";
import { ArrowRight } from "lucide-react";
import { memo } from "react";
import { LazyMount } from "../../../design/components/lazy-mount";
import { Certificate } from "../../portfolio/certificate";
import { CertificationsSectionProps } from "../types";
import { useTranslations } from "../../../i18n";
import { getDictionary } from "../../../data/locales";

/**
 * CertificationsSection - sertifikat pilihan di Beranda.
 *
 * Grid dibungkus LazyMount (content-visibility), dan kartu
 * langsung membuka halaman detail sinematik saat diklik.
 */
export const CertificationsSection = memo<CertificationsSectionProps>(
  function CertificationsSection({ certificates, onNavigate }) {
    const { locale } = useTranslations();
    const copy = getDictionary(locale).hero.sections;
    return (
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#36454f]/15 dark:border-white/10 pb-4">
          <div className="space-y-1">
            <span className="folio-num">
              {locale === "en"
                ? "05 / Certifications & Formal Accreditations"
                : "05 / Sertifikasi & Kredensial Resmi"}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#141f26] dark:text-white font-serif">
              {copy.certifications}
            </h2>
          </div>

          <a
            href={locale === "en" ? "/en/about" : "/about"}
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.("about");
            }}
            className="text-xs font-mono font-bold uppercase tracking-wider text-[#141f26] dark:text-white hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 px-4 py-2 rounded-full border border-[#36454f]/20 dark:border-white/15 bg-white/60 dark:bg-white/5 transition-all shadow-xs shrink-0 self-start sm:self-auto"
          >
            <span>
              {copy.allCertificates} ({certificates.length})
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <LazyMount estimatedHeight={420}>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-4.5">
            {certificates.map((cert) => (
              <Certificate key={cert.id} certificate={cert} />
            ))}
          </div>
        </LazyMount>
      </section>
    );
  },
);
