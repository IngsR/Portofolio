/**
 * Utility formatters for UI display
 */

/**
 * Extracts a clean, readable domain name from a URL for display in UI cards and buttons.
 * E.g.
 * "https://smpn24padang.sch.id" -> "smpn24padang.sch.id"
 * "https://prediksi.ikhwann.my.id" -> "prediksi.ikhwann.my.id"
 * "https://github.com/IngsR/Angular-Property" -> "github.com/IngsR/Angular-Property"
 * "https://cars.ikhwann.my.id" -> "ing-store.vercel.app"
 */
export function formatDomainName(url?: string): string {
  if (!url) return "";
  try {
    const trimmed = url.trim();
    // Remove protocol and trailing slash
    return trimmed
      .replace(/^https?:\/\//i, "")
      .replace(/^www\./i, "")
      .replace(/\/+$/, "");
  } catch {
    return url;
  }
}

/**
 * Returns a short display domain for compact mobile views
 */
export function formatShortDomain(url?: string): string {
  if (!url) return "";
  const full = formatDomainName(url);
  // If it's a deep GitHub repository link, return owner/repo for concise display
  if (full.startsWith("github.com/")) {
    return full.replace("github.com/", "");
  }
  return full;
}

/**
 * Tanggal ringkas ala kartu proyek/sertifikat.
 * E.g. "2024-03-11" -> "11 Mar 2024" (tetap aman untuk format bebas selain itu).
 */
export function formatShortDate(value?: string): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Nomor telepon Indonesia -> tautan wa.me tanpa simbol.
 * E.g. "+62 812-3456-7890" -> "https://wa.me/6281234567890"
 */
export function toWhatsAppUrl(phone?: string): string {
  if (!phone) return "";
  const digits = phone.replace(/[^\d]/g, "").replace(/^0/, "62");
  return digits ? `https://wa.me/${digits}` : "";
}
