import type { MetadataRoute } from "next";
import { publicRoutes, siteConfig } from "@/lib/siteConfig";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // trailingSlash is on, so list the slash-terminated URLs to avoid redirects.
  return publicRoutes.map((route) => ({
    url: `${siteConfig.domain}${route.path === "/" ? "/" : `${route.path}/`}`,
    lastModified: new Date(route.lastModified),
    changeFrequency: route.path === "/" ? "weekly" : "monthly",
    priority: route.priority,
  }));
}
