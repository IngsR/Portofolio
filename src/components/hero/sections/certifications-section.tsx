"use client";
import { ArrowRight } from "lucide-react";
import { memo } from "react";
import { LazyMount } from "../../../design/components/lazy-mount";
import {
  isDetailOpenStore,
  isPreviewOpenStore,
  selectedCertForDetailStore,
  selectedPreviewItemStore,
  selectedProjectForDetailStore,
} from "../../../store/portfolio";
import { CertificationItem } from "../../../types";
import { Certificate } from "../../portfolio/certificate";
import { CertificationsSectionProps } from "../types";

/**
 * Handler modal berupa helper modul (bukan state lokal), jadi section ini
 * tetap bebas state dan tidak ikut re-render saat modal dibuka/ditutup.
 */
const handleOpenCertDetail = (cert: CertificationItem) => {
  selectedCertForDetailStore.set(cert);
  selectedProjectForDetailStore.set(null);
  isDetailOpenStore.set(true);
};

const handleOpenCertPreview = (cert: CertificationItem) => {
  selectedPreviewItemStore.set(cert);
  isPreviewOpenStore.set(true);
};

/**
 * CertificationsSection — sertifikat pilihan di Beranda.
 *
 * Grid dibungkus LazyMount (content-visibility) seperti sebelumnya, dan kartu
 * tetap memakai komponen `Certificate` yang dipakai bersama halaman lain.
 */
export const CertificationsSection = memo<CertificationsSectionProps>(
  function CertificationsSection({ certificates, onNavigate }) {
    return (
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
          <div>
            <h2 className="ornament-underline text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white mt-1">
              Sertifikasi
            </h2>
          </div>

          <a href="/about" onClick={(e) => { e.preventDefault(); onNavigate?.("about"); }} className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white hover:opacity-80 flex items-center gap-1.5 px-4 py-2 rounded-full border-slate-200 dark:border-white/10"><span>Lihat Semua Sertifikat ({certificates.length})</span><ArrowRight className="w-4 h-4" /></a>
        </div>

        <LazyMount estimatedHeight={certificates.length * 460}>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-4.5">
            {certificates.map((cert) => (
              <Certificate
                key={cert.id}
                certificate={cert}
                onOpenDetail={handleOpenCertDetail}
                onOpenPreview={handleOpenCertPreview}
              />
            ))}
          </div>
        </LazyMount>
      </section>
    );
  },
);
