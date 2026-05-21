export const siteConfig = {
  name: "RentReadyCheck",
  domain:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://rentreadycheck.com",
  contactEmail: "hello@rentreadycheck.com",
  lastUpdated: "May 2026",
  description:
    "Check if you're ready to rent before you apply, with country-aware calculators and a generic rent-to-income estimate when your country is not listed.",
};

export const publicRoutes = [
  "/",
  "/rent-readiness-score",
  "/rent-referencing-calculator",
  "/guarantor-income-calculator",
  "/joint-tenant-affordability-calculator",
  "/move-in-cost-calculator",
  "/rent-split-calculator",
  "/about",
  "/disclaimer",
  "/privacy-policy",
  "/contact",
] as const;
