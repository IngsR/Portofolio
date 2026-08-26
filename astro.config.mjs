import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://ikhwann.my.id",
  output: "server",
  integrations: [
    react(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        // Homepage — highest priority, crawl daily
        if (item.url === "https://ikhwann.my.id/") {
          item.priority = 1.0;
          item.changefreq = "daily";
        }
        // Portfolio — frequently updated projects
        if (item.url.includes("/portfolio")) {
          item.priority = 0.9;
          item.changefreq = "weekly";
        }
        // About — relatively static
        if (item.url.includes("/about")) {
          item.priority = 0.8;
          item.changefreq = "monthly";
        }
        // Contact — rarely changes
        if (item.url.includes("/contact")) {
          item.priority = 0.6;
          item.changefreq = "monthly";
        }
        return item;
      },
      // Include SSR pages that won't be auto-discovered
      customPages: ["https://ikhwann.my.id/portfolio"],
    }),
  ],
  adapter: vercel({
    isr: {
      expiration: 60 * 60,
      bypassToken: process.env.ISR_BYPASS_TOKEN,
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
