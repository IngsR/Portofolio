"use client";
import { ExternalLink } from "lucide-react";
import { memo, useState } from "react";
import {
  GithubBrandIcon,
  GmailBrandIcon,
  LinkedInBrandIcon,
  WhatsAppBrandIcon,
} from "../../../design/components/brand-icons";
import { UserProfile } from "../../../types";
import { useTranslations } from "../../../i18n";
import { HeroContactLink } from "../types";


const buildContactLinks = (userProfile: UserProfile): HeroContactLink[] => [
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "in/ikhwn-rdn",
    href: "https://www.linkedin.com/in/ikhwn-rdn",
    icon: <LinkedInBrandIcon className="w-3.5 h-3.5" />,
    iconClass: "bg-blue-600 text-white",
    hoverClass:
      "hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/30",
    valueClass:
      "group-hover/link:text-blue-600 dark:group-hover/link:text-blue-400",
  },
  {
    id: "email",
    label: "Email",
    value: userProfile.email,
    href: `mailto:${userProfile.email}`,
    icon: <GmailBrandIcon className="w-3.5 h-3.5" />,
    iconClass: "bg-rose-600 text-white",
    hoverClass:
      "hover:border-rose-500/50 hover:bg-rose-50/50 dark:hover:bg-rose-950/30",
    valueClass:
      "group-hover/link:text-rose-600 dark:group-hover/link:text-rose-400",
  },
  {
    id: "github",
    label: "GitHub",
    value: "github.com/IngsR",
    href: "https://github.com/IngsR",
    icon: <GithubBrandIcon className="w-3.5 h-3.5 text-white" />,
    iconClass: "bg-[#273641] text-white dark:bg-white/15 dark:text-white",
    hoverClass:
      "hover:border-slate-500/50 hover:bg-slate-100 dark:hover:bg-white/10",
    valueClass:
      "group-hover/link:text-slate-950 dark:group-hover/link:text-white",
  },
  {
    id: "whatsapp",
    label: "No. WhatsApp",
    value: userProfile.phone,
    href: userProfile.whatsappUrl,
    icon: <WhatsAppBrandIcon className="w-3.5 h-3.5" />,
    iconClass: "bg-emerald-600 text-white",
    hoverClass:
      "hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30",
    valueClass: "text-emerald-600 dark:text-emerald-400 font-semibold",
  },
];

const ContactRow = memo<{ link: HeroContactLink }>(function ContactRow({
  link,
}) {
  const isExternal = link.id !== "email";

  return (
    <a
      href={link.href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`flex items-center justify-between px-3 py-1.5 sm:px-3.5 sm:py-2.5 rounded-full bg-transparent border border-[#36454f]/15 dark:border-white/10 text-[#1c2932] dark:text-slate-200 transition-all group/link hover:shadow-xs ${link.hoverClass}`}
    >
      <div className="flex items-center gap-2.5 truncate">
        <div
          className={`p-1.5 rounded-full flex items-center justify-center ${link.iconClass}`}
        >
          {link.icon}
        </div>
        <span className="font-semibold truncate">{link.label}</span>
      </div>
      <span
        className={`text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate max-w-[150px] ${link.valueClass}`}
      >
        {link.value}
        <ExternalLink className="w-3 h-3 shrink-0" />
      </span>
    </a>
  );
});

/** Kartu inisial - tampil hanya jika foto profil gagal dimuat seluruhnya */
const AvatarFallback = memo<{ name: string; role: string }>(
  function AvatarFallback({ name, role }) {
    const initials = name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();

    return (
      <div className="avatar-fallback w-full h-full flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950 text-white p-6 text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 border-white/20 flex items-center justify-center text-2xl sm:text-3xl font-black tracking-tight mb-3">
          {initials}
        </div>
        <p className="font-bold text-sm tracking-wide">{name}</p>
        <p className="text-xs text-slate-400 mt-1">{role}</p>
      </div>
    );
  },
);

/** Foto profil: coba src utama, lalu /profile.png, terakhir kartu inisial */
const ProfilePhoto = memo<{ userProfile: UserProfile }>(function ProfilePhoto({
  userProfile,
}) {
  const [step, setStep] = useState<"primary" | "fallback" | "failed">(
    "primary",
  );
  const sources = ["/Ikhwan.webp", "/profile.png"];
  const source = step === "failed" ? null : sources[step === "primary" ? 0 : 1];

  return (
    <div className="passe-partout corner-bracket rounded-2xl w-full">
      <div
        className="relative w-full rounded-xl overflow-hidden bg-slate-900/10 dark:bg-black/40"
        style={{ aspectRatio: "640/786" }}
      >
        {source ? (
          <img
            key={source}
            src={source}
            alt={userProfile.name}
            width={640}
            height={786}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            onError={() =>
              setStep((current) =>
                current === "primary" ? "fallback" : "failed",
              )
            }
            className="absolute inset-0 w-full h-full object-cover object-center select-none transition-transform duration-700 ease-out hover:scale-[1.02]"
            draggable={false}
          />
        ) : (
          <AvatarFallback name={userProfile.name} role="Junior Web Developer" />
        )}

        {/* Plakat Identitas Studio Terukir di Bawah Foto */}
        <div className="absolute bottom-3 left-3 right-3 bg-[#273641]/95 dark:bg-[#1a252d]/95 rounded-xl px-3.5 py-2 text-white flex items-center justify-between border border-white/15 shadow-lg pointer-events-none z-10">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="font-bold text-xs text-white truncate tracking-tight">
              {userProfile.name}
            </span>
          </div>
          <span className="text-[10px] font-mono font-medium text-slate-300 dark:text-slate-300 shrink-0 ml-2 uppercase tracking-wider">
            Web Developer
          </span>
        </div>
      </div>
    </div>
  );
});

export const ProfilePhotoCard = memo<{ userProfile: UserProfile }>(
  function ProfilePhotoCard({ userProfile }) {
    const contactLinks = buildContactLinks(userProfile);
    const { locale } = useTranslations();

    return (
      <div className="w-full sm:max-w-sm space-y-4">
        {/* Gallery Passe-Partout Frame */}
        <ProfilePhoto userProfile={userProfile} />

        {/* Atelier Contact Ledger */}
        <div className="atelier-surface rounded-2xl p-3.5 space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <span className="folio-num">
              {locale === "en" ? "00 / Direct Channels" : "00 / Saluran Kontak"}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[9.5px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {locale === "en" ? "Active" : "Aktif"}
            </span>
          </div>

          <div className="space-y-1.5 text-xs">
            {contactLinks.map((link) => (
              <ContactRow key={link.id} link={link} />
            ))}
          </div>
        </div>
      </div>
    );
  },
);
