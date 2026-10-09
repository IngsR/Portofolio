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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
          <div>
            <h2 className="ornament-underline text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white mt-1">
              {copy.certifications}
            </h2>
          </div>

          <a
            href={locale === "en" ? "/en/about" : "/about"}
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.("about");
            }}
            className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white hover:opacity-80 flex items-center gap-1.5 px-4 py-2 rounded-full border-slate-200 dark:border-white/10"
          >
            <span>
              {copy.allCertificates} ({certificates.length})
            </span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <LazyMount estimatedHeight={certificates.length * 460}>
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
