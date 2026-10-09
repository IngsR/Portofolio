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
    <section className="flex flex-col gap-6 rounded-2xl border border-slate-300 bg-[#faf7f0] p-6 text-slate-900 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-8 dark:border-[#41494f] dark:bg-[#2b3034] dark:text-slate-100">
      <div className="max-w-2xl space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#536967] dark:text-[#9dbbb2]">
          {copy.nextStep}
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl dark:text-white">
          {copy.contactHeading}
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          {copy.contactDescription}
        </p>
      </div>

      <div className="flex shrink-0 flex-col gap-2 sm:min-w-44">
        <a
          href={userProfile.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 dark:bg-emerald-700 dark:hover:bg-emerald-600"
        >
          <MessageCircle className="h-4 w-4" />
          <span>{copy.contactWhatsapp}</span>
          <ArrowUpRight className="h-4 w-4" />
        </a>
        <a
          href={`mailto:${userProfile.email}`}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-[#eee7dc] dark:border-[#59666e] dark:text-slate-200 dark:hover:bg-[#363e43]"
        >
          <Mail className="h-4 w-4" />
          <span>{copy.contactEmail}</span>
        </a>
      </div>
    </section>
  );
});
