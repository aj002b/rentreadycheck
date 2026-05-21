import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const baseUrl = "https://rentreadycheck.com";

const routes = [
  { path: "/", priority: 1 },
  { path: "/rent-readiness-score", priority: 0.9 },
  { path: "/rent-referencing-calculator", priority: 0.8 },
  { path: "/guarantor-income-calculator", priority: 0.8 },
  { path: "/joint-tenant-affordability-calculator", priority: 0.8 },
  { path: "/move-in-cost-calculator", priority: 0.8 },
  { path: "/rent-split-calculator", priority: 0.8 },
  { path: "/guides", priority: 0.75 },
  { path: "/uk-rent-affordability-calculator", priority: 0.75 },
  { path: "/us-rent-affordability-calculator", priority: 0.75 },
  { path: "/canada-rent-affordability-calculator", priority: 0.75 },
  { path: "/australia-rent-affordability-calculator", priority: 0.75 },
  { path: "/rent-affordability-calculator-rest-of-world", priority: 0.75 },
  { path: "/how-much-income-to-rent-800", priority: 0.65 },
  { path: "/how-much-income-to-rent-1000", priority: 0.65 },
  { path: "/how-much-income-to-rent-1200", priority: 0.65 },
  { path: "/how-much-income-to-rent-1500", priority: 0.65 },
  { path: "/how-much-income-to-rent-2000", priority: 0.65 },
  { path: "/rent-to-income-ratio-explained", priority: 0.65 },
  { path: "/what-is-30-times-rent", priority: 0.65 },
  { path: "/what-is-36-times-rent", priority: 0.65 },
  { path: "/how-much-does-a-guarantor-need-to-earn", priority: 0.65 },
  { path: "/can-flatmates-combine-income-for-rent", priority: 0.65 },
  { path: "/how-much-should-i-save-before-moving-out", priority: 0.65 },
  { path: "/about", priority: 0.5 },
  { path: "/disclaimer", priority: 0.5 },
  { path: "/privacy-policy", priority: 0.5 },
  { path: "/contact", priority: 0.5 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route.path === "/" ? "" : route.path}`,
    lastModified: new Date("2026-05-01"),
    changeFrequency: route.path === "/" ? "weekly" : "monthly",
    priority: route.priority,
  }));
}
