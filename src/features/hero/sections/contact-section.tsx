"use client";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { memo } from "react";
import portfolioData from "../../../data/portfolio.json";
import { UserProfile } from "../../../types";
import { useTranslations } from "../../../i18n";
import { getDictionary } from "../../../data/locales";
import { getLocalizedUserProfile } from "../../../utils/format";

export const ContactSection = memo(function ContactSection() {
  const { locale } = useTranslations();
  const copy = getDictionary(locale).hero.sections;
  const userProfile = getLocalizedUserProfile(
    portfolioData.userProfile as unknown as UserProfile,
    locale,
  );

  return (
    <section className="atelier-surface frame-motion corner-bracket flex flex-col gap-6 rounded-2xl sm:rounded-3xl border border-[#36454f]/15 dark:border-white/10 p-6 sm:p-8 text-[#141f26] sm:flex-row sm:items-center sm:justify-between dark:text-slate-100 relative overflow-hidden shadow-xs">
      <div className="max-w-2xl space-y-2">
        <span className="folio-num">
          {locale === "en"
            ? "07 / Professional Correspondence & Inquiries"
            : "07 / Kontak & Komunikasi Profesional"}
        </span>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#141f26] font-serif dark:text-white">
          {copy.contactHeading}
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-[#24333d] dark:text-slate-300">
          {copy.contactDescription}
        </p>
      </div>

      <div className="flex shrink-0 flex-col gap-2.5 sm:min-w-48">
        <a
          href={userProfile.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 text-sm font-bold shadow-xs transition-all hover:scale-[1.02] active:scale-95"
        >
          <MessageCircle className="h-4 w-4" />
          <span>{copy.contactWhatsapp}</span>
          <ArrowUpRight className="h-4 w-4" />
        </a>
        <a
          href={`mailto:${userProfile.email}`}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-[#36454f]/25 dark:border-white/20 bg-white/70 dark:bg-white/5 hover:bg-[#273641] hover:text-white dark:hover:bg-white dark:hover:text-slate-950 text-[#141f26] dark:text-white px-5 py-2.5 text-sm font-bold shadow-xs transition-all active:scale-95"
        >
          <Mail className="h-4 w-4" />
          <span>{copy.contactEmail}</span>
        </a>
      </div>
    </section>
  );
});
