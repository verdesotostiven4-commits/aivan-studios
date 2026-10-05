import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://aivan-studios.vercel.app";
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/panel"] }],
    sitemap: `${base.replace(/\/$/, "")}/sitemap.xml`,
  };
}
