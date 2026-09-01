import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
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
  output: "server",
  trailingSlash: "never",
  integrations: [react()],
  adapter: vercel({
    isr: {
      expiration: 60 * 60,
      bypassToken: process.env.ISR_BYPASS_TOKEN,
    },
  }),
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
