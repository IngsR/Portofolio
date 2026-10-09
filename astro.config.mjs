import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { createLogger } from "vite";

const customLogger = createLogger();
const originalWarn = customLogger.warn;
customLogger.warn = (msg, options) => {
  if (
    msg.includes("vite:react-babel") ||
    msg.includes("optimizeDeps.esbuildOptions") ||
    msg.includes("`esbuild` option was specified") ||
    msg.includes("Rolldown to optimize the dependencies")
  ) {
    return;
  }
  originalWarn(msg, options);
};

export default defineConfig({
  site: "https://ikhwann.my.id",
  output: "static",
  trailingSlash: "never",
  i18n: {
    // English adalah bahasa default; halaman Indonesia memakai prefix /id
    // secara opsional melalui pilihan pengunjung (lihat utils/locale.ts).
    defaultLocale: "en",
    locales: ["en", "id"],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    react(),
    sitemap({
      // Sitemap XML di-generate otomatis saat build dari halaman yang
      // benar-benar ada (yang di-prerender), lengkap dengan <lastmod>.
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => !page.includes("/cv"),
    }),
  ],
  vite: {
    customLogger,
    plugins: [tailwindcss()],
    build: {
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        onwarn(warning, warn) {
          if (
            warning.message?.includes("vite:react-babel") ||
            warning.message?.includes("esbuild") ||
            warning.message?.includes("rolldown")
          ) {
            return;
          }
          warn(warning);
        },
      },
    },
    server: {
      watch: {
        ignored: ["**/.vercel/**", "**/.astro/**", "**/dist/**"],
      },
    },
  },
});
