import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://ikhwann.my.id",
  output: "server",
  integrations: [react(), sitemap()],
  adapter: vercel({
    isr: {
      expiration: 60 * 60,
    },
  }),
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        ignored: ["**/.vercel/**", "**/.astro/**", "**/dist/**"],
      },
    },
  },
});
