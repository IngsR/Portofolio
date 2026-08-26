import type { APIRoute } from "astro";

export const prerender = true;

const siteUrl = "https://ikhwann.my.id";
const sitemapUrl = `${siteUrl}/sitemap-index.xml`;

export const GET: APIRoute = () =>
  new Response(
    [
      "User-agent: *",
      "Allow: /",
      "",
      "User-agent: Googlebot",
      "Allow: /",
      "",
      "User-agent: Bingbot",
      "Allow: /",
      "",
      "User-agent: DuckDuckBot",
      "Allow: /",
      "",
      `Host: ${siteUrl}`,
      `Sitemap: ${sitemapUrl}`,
      "",
    ].join("\n"),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    },
  );
