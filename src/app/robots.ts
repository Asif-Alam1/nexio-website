import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: allow all crawlers
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // AI search/retrieval crawlers — ALLOW (these serve real-time AI search results)
      {
        userAgent: "ChatGPT-User",
        allow: ["/", "/llms.txt", "/llms-full.txt", "/blog/"],
        disallow: ["/api/"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: ["/", "/llms.txt", "/llms-full.txt", "/blog/"],
        disallow: ["/api/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: ["/", "/llms.txt", "/llms-full.txt", "/blog/"],
        disallow: ["/api/"],
      },
      {
        userAgent: "Perplexity-User",
        allow: ["/", "/llms.txt", "/llms-full.txt", "/blog/"],
        disallow: ["/api/"],
      },
      {
        userAgent: "Claude-User",
        allow: ["/", "/llms.txt", "/llms-full.txt", "/blog/"],
        disallow: ["/api/"],
      },
      {
        userAgent: "Applebot",
        allow: ["/", "/llms.txt", "/llms-full.txt", "/blog/"],
        disallow: ["/api/"],
      },
      {
        userAgent: "YouBot",
        allow: ["/", "/llms.txt", "/llms-full.txt", "/blog/"],
        disallow: ["/api/"],
      },
      {
        userAgent: "Amazonbot",
        allow: ["/", "/llms.txt", "/llms-full.txt", "/blog/"],
        disallow: ["/api/"],
      },
      {
        userAgent: "Meta-ExternalAgent",
        allow: ["/", "/llms.txt", "/llms-full.txt", "/blog/"],
        disallow: ["/api/"],
      },
      {
        userAgent: "cohere-ai",
        allow: ["/", "/llms.txt", "/llms-full.txt", "/blog/"],
        disallow: ["/api/"],
      },
      // Google AI — allow for AI Overviews
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      // AI training crawlers — allow blog + llms files so future model versions learn about us
      {
        userAgent: "GPTBot",
        allow: ["/blog/", "/llms.txt", "/llms-full.txt", "/llms-ar.txt"],
        disallow: ["/", "/api/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: ["/blog/", "/llms.txt", "/llms-full.txt", "/llms-ar.txt"],
        disallow: ["/", "/api/"],
      },
      {
        userAgent: "anthropic-ai",
        allow: ["/blog/", "/llms.txt", "/llms-full.txt", "/llms-ar.txt"],
        disallow: ["/", "/api/"],
      },
      // Generic training scrapers — still block (low quality, no LLM benefit)
      {
        userAgent: "CCBot",
        disallow: "/",
      },
      {
        userAgent: "Bytespider",
        disallow: "/",
      },
    ],
    sitemap: "https://nexiolabs.co/sitemap.xml",
  };
}
