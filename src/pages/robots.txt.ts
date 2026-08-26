import type { APIRoute } from "astro";

const sitemapUrl = "https://ikhwann.my.id/sitemap-index.xml";

export const GET: APIRoute = () =>
  new Response(
    ["User-agent: *", "Allow: /", `Sitemap: ${sitemapUrl}`, ""].join("\n"),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    },
  );
