"use client";
import { ArrowUpRight, FileText } from "lucide-react";
import { memo } from "react";
import {
  GithubBrandIcon,
  GmailBrandIcon,
  LinkedInBrandIcon,
  WhatsAppBrandIcon,
} from "../../../design/components/brand-icons";
import { UserProfile } from "../../../types";

/**
 * Tombol aksi cepat (CV, LinkedIn, WhatsApp, Email, GitHub) di section kontak
 * Beranda. Tampilan `p-4 rounded-2xl` dan efek ikon panah tetap sama.
 */
interface QuickAction {
  id: string;
  label: string;
  hint: string;
  href?: string;
  cardClass: string;
  icon: React.ReactNode;
}

const buildQuickActions = (userProfile: UserProfile): QuickAction[] => [
  {
    id: "cv",
    label: "Curriculum Vitae",
    hint: "Lihat CV PDF, lalu cetak langsung dari browser bila diperlukan",
    cardClass: "bg-white text-slate-950 hover:bg-slate-100 sm:col-span-2",
    icon: <FileText className="w-5 h-5 text-slate-950" />,
  },
  {
    id: "linkedin",
    label: "LinkedIn Profile",
    hint: "linkedin.com/in/ikhwn-rdn",
    href: "https://www.linkedin.com/in/ikhwn-rdn",
    cardClass: "bg-blue-600 text-white hover:bg-blue-500",
    icon: <LinkedInBrandIcon className="w-5 h-5" />,
  },
  {
    id: "whatsapp",
    label: "WhatsApp & Fast Response",
    hint: userProfile.phone,
    href: userProfile.whatsappUrl,
    cardClass: "bg-emerald-600 text-white hover:bg-emerald-500",
    icon: <WhatsAppBrandIcon className="w-5 h-5" />,
  },
  {
    id: "email",
    label: "Kirim Pesan Email Resmi",
    hint: userProfile.email,
    href: `mailto:${userProfile.email}`,
    cardClass: "bg-rose-600 text-white hover:bg-rose-500",
    icon: <GmailBrandIcon className="w-5 h-5" />,
  },
  {
    id: "github",
    label: "Repositori Portofolio GitHub",
    hint: "github.com/IngsR",
    href: "https://github.com/IngsR",
    cardClass: "bg-slate-900 border-white/15 text-white hover:bg-slate-800",
    icon: <GithubBrandIcon className="w-5 h-5" />,
  },
];

const QuickActionCard = memo<{
  action: QuickAction;
  hintClass: string;
  onOpenCV: () => void;
}>(function QuickActionCard({ action, hintClass, onOpenCV }) {
  const inner = (
    <>
      <div className="flex items-center gap-3 min-w-0">
        <div className="p-2.5 rounded-xl shrink-0 bg-white/15">
          {action.icon}
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-xs font-black uppercase tracking-wider block truncate">
            {action.label}
          </span>
          <span className={`text-[11px] truncate block ${hintClass}`}>
            {action.hint}
          </span>
        </div>
      </div>
      <ArrowUpRightIcon />
    </>
  );

  const className = `flex items-center justify-between gap-3 p-4 rounded-2xl transition-all text-left shadow-sm group min-w-0 w-full ${action.cardClass}`;

  if (action.id === "cv") {
    return (
      <button onClick={onOpenCV} className={className}>
        {inner}
      </button>
    );
  }

  return (
    <a
      href={action.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {inner}
    </a>
  );
});

const ArrowUpRightIcon = () => (
  <ArrowUpRight className="w-5 h-5 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ml-2" />
);

export const QuickActions = memo<{
  userProfile: UserProfile;
  onOpenCV: () => void;
}>(function QuickActions({ userProfile, onOpenCV }) {
  const actions = buildQuickActions(userProfile);

  return (
    <div className="lg:col-span-7 grid-cols-1 sm:grid-cols-2 gap-3 min-w-0">
      {actions.map((action) => (
        <QuickActionCard
          key={action.id}
          action={action}
          hintClass={
            action.id === "cv"
              ? "text-slate-600"
              : action.id === "linkedin"
                ? "text-blue-100 font-mono"
                : action.id === "whatsapp"
                  ? "text-emerald-100 font-mono"
                  : action.id === "email"
                    ? "text-rose-100 font-mono"
                    : "text-slate-300 font-mono"
          }
          onOpenCV={onOpenCV}
        />
      ))}
    </div>
  );
});
