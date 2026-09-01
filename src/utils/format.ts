/**
 * Utility formatters for UI display
 */

/**
 * Extracts a clean, readable domain name from a URL for display in UI cards and buttons.
 * E.g.
 * "https://smpn24padang.sch.id" -> "smpn24padang.sch.id"
 * "https://prediksi.ikhwann.my.id" -> "prediksi.ikhwann.my.id"
 * "https://github.com/IngsR/Angular-Property" -> "github.com/IngsR/Angular-Property"
 * "https://ing-store.vercel.app" -> "ing-store.vercel.app"
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
