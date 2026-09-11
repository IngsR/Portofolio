"use client";
import { ExternalLink } from "lucide-react";
import { memo, useState } from "react";
import {
  GithubBrandIcon,
  GmailBrandIcon,
  LinkedInBrandIcon,
  WhatsAppBrandIcon,
} from "../../../design/components/brand-icons";
import { GlowingEffect } from "../../../design/components/glowing-effect";
import { UserProfile } from "../../../types";
import { HeroContactLink } from "../types";

/**
 * ProfilePhotoCard — foto profil + tautan kontak di kartu perkenalan.
 *
 * Perilaku lama dipertahankan: efek glow mengikuti kursor (GlowingEffect),
 * rasio foto 640/786, fallback /profile.png lalu kartu inisial bila keduanya
 * gagal dimuat. Fallback kini React state (bukan manipulasi DOM manual),
 * sehingga tidak ada `innerHTML` dan tetap satu alur render.
 */

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
    icon: <GithubBrandIcon className="w-3.5 h-3.5" />,
    iconClass: "bg-slate-900 text-white",
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
      className={`flex items-center justify-between px-3 py-1.5 sm:px-3.5 sm:py-2.5 rounded-full bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 transition-all group/link shadow-xs ${link.hoverClass}`}
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

/** Kartu inisial — tampil hanya jika foto profil gagal dimuat seluruhnya */
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
    <div
      className="relative w-full rounded-2xl overflow-hidden bg-white dark:bg-[#0d0d10] border-slate-200/80 dark:border-white/10"
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
          className="absolute inset-0 w-full h-full object-cover object-center select-none"
          draggable={false}
        />
      ) : (
        <AvatarFallback name={userProfile.name} role="Junior Web Developer" />
      )}

      {/* Bar identitas di bawah foto */}
      <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-slate-950/85 dark:bg-black/85 backdrop-blur-md rounded-xl px-3 py-1.5 sm:py-2 text-white text-[10px] sm:text-[11px] flex items-center justify-between border-white/10 shadow-sm pointer-events-none">
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse"></span>
          <span className="font-semibold truncate">{userProfile.name}</span>
        </div>
        <span className="text-slate-300 text-[9px] sm:text-[10px] shrink-0 font-medium ml-2">
          Web Developer
        </span>
      </div>
    </div>
  );
});

export const ProfilePhotoCard = memo<{ userProfile: UserProfile }>(
  function ProfilePhotoCard({ userProfile }) {
    const contactLinks = buildContactLinks(userProfile);

    return (
      <GlowingEffect
        containerClassName="w-full sm:max-w-sm rounded-2xl sm:rounded-3xl"
        spread={120}
      >
        <div className="w-full sm:max-w-sm rounded-2xl sm:rounded-3xl border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#0d0d10] p-4 sm:p-5 space-y-4 shadow-[0_2px_12px_-2px_rgba(15,23,42,0.06)]">
          <ProfilePhoto userProfile={userProfile} />

          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Tautan Kontak Profil:
              </span>
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full">
                Resmi &amp; Aktif
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2 text-xs">
              {contactLinks.map((link) => (
                <ContactRow key={link.id} link={link} />
              ))}
            </div>
          </div>
        </div>
      </GlowingEffect>
    );
  },
);
