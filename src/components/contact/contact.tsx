import confetti from "canvas-confetti";
import {
  ArrowUpRight,
  Briefcase,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Copy,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import portfolioData from "../../data/portfolio.json";
import { ContactMessage } from "../../types";
import { isContactCategory, isContactMessage } from "../../utils/guard";
import { motion, AnimatePresence } from "motion/react";
import { CardSpotlight } from "../ui/card-spotlight";
import { MagneticButton } from "../ui/magnetic-button";

const { userProfile, contactFaq } = portfolioData;

export const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [category, setCategory] =
    useState<ContactMessage["category"]>("Web Development");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [savedMessages, setSavedMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("portfolio_contact_messages");
      if (!stored) {
        return;
      }

      const parsed: unknown = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        setSavedMessages(parsed.filter(isContactMessage));
      }
    } catch {
      setSavedMessages([]);
    }
  }, []);

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "Github":
        return <Github className="w-4 h-4" />;
      case "Linkedin":
        return <Linkedin className="w-4 h-4" />;
      case "Phone":
        return <Phone className="w-4 h-4" />;
      case "Mail":
        return <Mail className="w-4 h-4" />;
      default:
        return <ArrowUpRight className="w-4 h-4" />;
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(userProfile.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      setEmailCopied(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newMsg: ContactMessage = {
        id: `msg-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim() || "Peluang Kerja / Proyek",
        category,
        message: message.trim(),
        createdAt: new Date().toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setSavedMessages((currentMessages) => {
        const updated = [newMsg, ...currentMessages];
        try {
          localStorage.setItem(
            "portfolio_contact_messages",
            JSON.stringify(updated),
          );
        } catch (err) {
          console.error(err);
        }
        return updated;
      });

      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 70,
          spread: 50,
          origin: { y: 0.7 },
        });
      } catch (err) {
        // Safe fallback
      }

      // Reset form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 600);
  };

  return (
    <div className="space-y-12 py-6 sm:py-8">
      {/* Header */}
      <div className="space-y-2.5 pb-6 border-b border-slate-200/90 dark:border-white/10">
        <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/40 px-2.5 py-1 rounded-full inline-block">
          Kontak &amp; Informasi Terhubung
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 dark:text-white font-display">
          Mari Berkolaborasi
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-none font-light">
          Terbuka untuk peluang full-time, WFO, relokasi, kolaborasi, dan
          project web development.
        </p>
      </div>

      {/* Main Grid: Direct Contact Channels & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Contact Info Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* WhatsApp Direct Card */}
          <CardSpotlight
            tilt={true}
            radius={280}
            color="rgba(16, 185, 129, 0.12)"
            className="p-6 rounded-2xl bg-gradient-to-b from-emerald-50/70 to-emerald-100/30 dark:from-emerald-950/30 dark:to-emerald-950/10 border border-emerald-500/40 text-emerald-950 dark:text-emerald-100 space-y-4 shadow-[0_2px_12px_-2px_rgba(16,185,129,0.12)] hover:border-emerald-500 hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-sm">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-950 dark:text-white">
                  WhatsApp Langsung
                </h3>
                <p className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                  Respon cepat & santai
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-light">
              Ingin berdiskusi cepat mengenai tawaran pekerjaan, interview, atau
              penawaran proyek? Klik tautan di bawah untuk chat langsung.
            </p>

            <a
              href={userProfile.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold tracking-wider transition-all shadow-md shadow-emerald-600/20"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat WhatsApp ({userProfile.phone})</span>
            </a>
          </CardSpotlight>

          {/* Direct Email Card */}
          <CardSpotlight
            tilt={true}
            radius={280}
            className="p-6 rounded-2xl bg-white dark:bg-[#0d0d0f] border border-slate-200/90 dark:border-white/10 space-y-4 shadow-[0_2px_10px_-2px_rgba(15,23,42,0.06)] hover:border-blue-500/40 hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 dark:bg-white/5 dark:text-white border border-blue-200/60 dark:border-white/10">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-950 dark:text-white">
                  Email Resmi
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Untuk undangan kerja & surat resmi
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5">
              <span className="text-xs font-semibold text-slate-900 dark:text-white truncate mr-2">
                {userProfile.email}
              </span>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-all font-medium"
                  title="Salin Email"
                >
                  {emailCopied ? (
                    <Check className="w-3.5 h-3.5 inline text-emerald-500 mr-1" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 inline mr-1" />
                  )}
                  <span>{emailCopied ? "Tersalin" : "Salin"}</span>
                </button>

                <a
                  href={`mailto:${userProfile.email}`}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-all text-slate-800 dark:text-slate-200"
                  title="Buka Email"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </CardSpotlight>

          {/* Location & Work Preference */}
          <CardSpotlight
            tilt={true}
            radius={280}
            className="p-6 rounded-2xl bg-white dark:bg-[#0d0d0f] border border-slate-200/90 dark:border-white/10 space-y-4 shadow-[0_2px_10px_-2px_rgba(15,23,42,0.06)] hover:border-slate-400 dark:hover:border-white/20 transition-all"
          >
            <h3 className="font-bold text-base text-slate-950 dark:text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Kesiapan & Lokasi</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" />
                <div>
                  <strong className="text-slate-900 dark:text-white block">
                    Status Kerja & Lokasi:
                  </strong>
                  <span className="text-slate-600 dark:text-slate-400">
                    Siap On-Site / WFO di Seluruh Indonesia & Hybrid / Remote
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 mt-0.5 text-emerald-500 shrink-0" />
                <div>
                  <strong className="text-slate-900 dark:text-white block">
                    Waktu Respon:
                  </strong>
                  <span className="text-slate-600 dark:text-slate-400">
                    Biasanya merespon dalam hitungan jam (08:00 - 21:00 WIB)
                  </span>
                </div>
              </div>
            </div>
          </CardSpotlight>

          {/* Social Links Cards */}
          <CardSpotlight
            tilt={true}
            radius={280}
            className="p-6 rounded-2xl bg-white dark:bg-[#0d0d0f] border border-slate-200/90 dark:border-white/10 space-y-3 shadow-[0_2px_10px_-2px_rgba(15,23,42,0.06)]"
          >
            <h3 className="font-bold text-base text-slate-950 dark:text-white">
              Tautan Profesional
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {userProfile.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Buka ${social.name}`}
                  className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/80 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-xs font-medium text-slate-800 dark:text-slate-200 transition-all hover:border-blue-500/40"
                >
                  <span className={`shrink-0 ${social.colorClass}`}>
                    {getSocialIcon(social.icon)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{social.name}</span>
                    <span className="block truncate text-[11px] text-slate-500 dark:text-slate-400">
                      {social.username}
                    </span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </a>
              ))}
            </div>
          </CardSpotlight>
        </div>

        {/* Form Container (7 cols) */}
        <div className="lg:col-span-7 h-full">
          <div className="h-full p-6 sm:p-8 bg-white dark:bg-[#0c0c0e] border border-slate-200/90 dark:border-white/10 rounded-3xl space-y-6 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.06)] flex flex-col">
            <div className="border-b border-slate-100 dark:border-white/10 pb-4">
              <h2 className="font-bold text-xl text-slate-950 dark:text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Kirim Pesan Langsung</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Tinggalkan detail pesan atau pertanyaan Anda di bawah ini
              </p>
            </div>

            {submitted && (
              <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/30 text-slate-950 dark:text-white space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Pesan Berhasil Terkirim!</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-emerald-200/80 leading-relaxed font-light">
                  Terima kasih telah menghubungi. Pesan Anda telah tersimpan dan
                  saya akan segera merespon via email Anda.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 underline mt-1 block"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-4 lg:flex lg:flex-1 lg:flex-col"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Nama Lengkap / Instansi *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso / PT Maju Jaya"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50/80 dark:bg-white/[0.04] border border-slate-200/90 dark:border-white/10 text-slate-950 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Alamat Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="nama@perusahaan.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50/80 dark:bg-white/[0.04] border border-slate-200/90 dark:border-white/10 text-slate-950 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Kategori Keperluan
                  </label>
                  <select
                    value={category}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (isContactCategory(value)) {
                        setCategory(value);
                      }
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50/80 dark:bg-white/[0.04] border border-slate-200/90 dark:border-white/10 text-slate-950 dark:text-white text-xs focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer"
                  >
                    <option value="Kerja Sama">
                      Peluang Kerja Junior Fullstack Web Engineer (WFO / Hybrid / Remote)
                    </option>
                    <option value="Web Development">
                      Pengembangan Web End-to-End (Next.js &amp; REST API)
                    </option>
                    <option value="Konsultasi">
                      Diskusi Teknis / Arsitektur Web &amp; Deployment
                    </option>
                    <option value="Lainnya">Keperluan Lainnya</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Subjek
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Diskusi Lowongan Software Engineer"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50/80 dark:bg-white/[0.04] border border-slate-200/90 dark:border-white/10 text-slate-950 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1 lg:flex lg:flex-1 lg:flex-col">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Isi Pesan *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tuliskan pesan, rincian tawaran, atau kebutuhan proyek Anda..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full min-h-[160px] lg:flex-1 px-4 py-2.5 rounded-xl bg-slate-50/80 dark:bg-white/[0.04] border border-slate-200/90 dark:border-white/10 text-slate-950 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all leading-relaxed resize-y"
                />
              </div>

              <div className="pt-2">
                <MagneticButton>
                  <button
                    id="contact-submit-button"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950 disabled:opacity-50 text-xs font-bold uppercase tracking-wider hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>
                      {isSubmitting ? "Mengirim Pesan..." : "Kirim Pesan"}
                    </span>
                  </button>
                </MagneticButton>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ Section with Smooth Animated Expansion */}
      <section className="p-6 sm:p-8 bg-white dark:bg-[#0c0c0e] border border-slate-200/90 dark:border-white/10 rounded-3xl space-y-6 shadow-[0_2px_12px_-2px_rgba(15,23,42,0.05)]">
        <div className="space-y-1 pb-4 border-b border-slate-100 dark:border-white/10">
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-full inline-block">
            Tanya Jawab
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950 dark:text-white pt-1">
            Pertanyaan yang Sering Diajukan
          </h2>
        </div>

        <div className="space-y-2 divide-y divide-slate-100 dark:divide-white/10">
          {contactFaq.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className={index !== 0 ? "pt-3.5" : ""}>
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between text-left py-2 text-sm sm:text-base font-bold tracking-tight text-slate-950 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 shrink-0 ml-2 ${
                      isOpen
                        ? "rotate-180 text-blue-600 dark:text-blue-400"
                        : "text-slate-400"
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 pt-1 pb-3 leading-relaxed font-light">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
