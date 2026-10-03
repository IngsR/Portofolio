"use client";
import { ExternalLink } from "lucide-react";
import { memo } from "react";
import {
  GithubBrandIcon,
  GmailBrandIcon,
  LinkedInBrandIcon,
  WhatsAppBrandIcon,
} from "../../../design/components/brand-icons";
import { UserProfile } from "../../../types";
import { QuickActions } from "../cards/quick-actions";
import portfolioData from "../../../data/portfolio.json";

/**
 * ContactSection — bagian penutup Beranda: kartu identitas + kanal kontak
 * cepat (CV, LinkedIn, WhatsApp, Email, GitHub).
 *
 * Blok gelap `bg-slate-950` dipertahankan agar kontras dengan section lain.
 */
export const ContactSection = memo<{ onOpenCV: () => void }>(
  function ContactSection({ onOpenCV }) {
    const userProfile = portfolioData.userProfile as unknown as UserProfile;

    return (
      <section className="rounded-3xl border-slate-800 bg-slate-950 p-6 sm:p-10 text-white space-y-6 shadow-xl">
        <div className="space-y-2 border-b border-white/10 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            06 / KONTAK &amp; AKSI CEPAT HR
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Mari Berdiskusi &amp; Bekerja Sama
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Terbuka untuk posisi{" "}
            <strong className="text-white">Junior Web Developer</strong> baik
            On-Site (WFO) di seluruh Indonesia maupun Remote / Hybrid. Lihat CV
            atau hubungi saya lewat kanal berikut.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2 items-stretch">
          <IdentityCard userProfile={userProfile} />
          <QuickActions userProfile={userProfile} onOpenCV={onOpenCV} />
        </div>
      </section>
    );
  },
);

/** Kartu identitas: avatar + status + daftar kanal kontak */
const IdentityCard = memo<{ userProfile: UserProfile }>(function IdentityCard({
  userProfile,
}) {
  return (
    <div className="lg:col-span-5 rounded-2xl sm:rounded-3xl border-white/10 bg-white/[0.04] p-4 sm:p-6 flex-col justify-between space-y-4">
      <div className="flex items-center gap-3.5 sm:gap-4">
        <div className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-800 border-white/15 shrink-0">
          <img
            src={userProfile.avatarUrl}
            alt={userProfile.name}
            width={80}
            height={80}
            className="w-full h-full object-cover object-center"
          />
          <span className="absolute bottom-1 right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400 border-2 border-slate-950"></span>
        </div>
        <div className="min-w-0 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Siap WFO / Remote</span>
          </div>
          <h3 className="font-black text-base sm:text-lg text-white truncate">
            {userProfile.name}
          </h3>
          <p className="text-xs text-slate-300 font-medium truncate">
            Junior Web Developer
          </p>
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
        <ContactDetailRow
          href={`mailto:${userProfile.email}`}
          icon={
            <GmailBrandIcon className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          }
          label="Email:"
          value={userProfile.email}
        />
        <ContactDetailRow
          href="https://github.com/IngsR"
          external
          icon={
            <GithubBrandIcon className="w-3.5 h-3.5 text-slate-300 shrink-0" />
          }
          label="GitHub:"
          value="github.com/IngsR"
        />
        <ContactDetailRow
          href={userProfile.whatsappUrl}
          external
          icon={
            <WhatsAppBrandIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          }
          label="No. WhatsApp:"
          value={userProfile.phone}
          valueClass="text-emerald-300 font-semibold"
        />
        <ContactDetailRow
          href="https://www.linkedin.com/in/ikhwn-rdn"
          external
          icon={
            <LinkedInBrandIcon className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          }
          label="LinkedIn:"
          value="in/ikhwn-rdn"
        />
      </div>
    </div>
  );
});

const ContactDetailRow = memo<{
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  external?: boolean;
  valueClass?: string;
}>(function ContactDetailRow({
  href,
  icon,
  label,
  value,
  external = false,
  valueClass = "text-white",
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border-white/10 text-slate-200 transition-colors group"
    >
      <div className="flex items-center gap-2 min-w-0">
        {icon}
        <span className="text-slate-400 text-[11px] shrink-0">{label}</span>
        <span className={`font-mono text-[11px] truncate ${valueClass}`}>
          {value}
        </span>
      </div>
      <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-white shrink-0 ml-1" />
    </a>
  );
});
