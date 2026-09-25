export const siteConfig = {
  name: "RentReadyCheck",
  domain:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://rentreadycheck.com",
  contactEmail: "hello@rentreadycheck.com",
  lastUpdated: "May 2026",
  ogImage: {
    url: "/og-image.png",
    width: 1200,
    height: 630,
    alt: "RentReadyCheck – free rent affordability calculators for US renters",
  },
  description:
    "Check if you're ready to rent before you apply, with US-focused apartment affordability, co-signer, move-in cost, and roommate calculators.",
};

// Every indexable route. Drives the sitemap, so add new pages here.
export const publicRoutes = [
  { path: "/", priority: 1 },
  { path: "/rent-readiness-score", priority: 0.9 },
  { path: "/rent-referencing-calculator", priority: 0.8 },
  { path: "/us-rent-affordability-calculator", priority: 0.8 },
  { path: "/guarantor-income-calculator", priority: 0.8 },
  { path: "/joint-tenant-affordability-calculator", priority: 0.8 },
  { path: "/move-in-cost-calculator", priority: 0.8 },
  { path: "/rent-split-calculator", priority: 0.8 },
  { path: "/guides", priority: 0.75 },
  { path: "/how-much-income-to-rent-800", priority: 0.65 },
  { path: "/how-much-income-to-rent-1000", priority: 0.65 },
  { path: "/how-much-income-to-rent-1200", priority: 0.65 },
  { path: "/how-much-income-to-rent-1500", priority: 0.65 },
  { path: "/how-much-income-to-rent-2000", priority: 0.65 },
  { path: "/rent-to-income-ratio-explained", priority: 0.65 },
  { path: "/what-is-30-times-rent", priority: 0.65 },
  { path: "/what-is-36-times-rent", priority: 0.65 },
  { path: "/do-i-need-a-cosigner-for-an-apartment", priority: 0.65 },
  { path: "/how-much-does-a-guarantor-need-to-earn", priority: 0.65 },
  { path: "/can-flatmates-combine-income-for-rent", priority: 0.65 },
  { path: "/can-i-rent-with-bad-credit", priority: 0.65 },
  { path: "/rental-application-fees-explained", priority: 0.65 },
  { path: "/security-deposit-basics", priority: 0.65 },
  { path: "/how-much-should-i-save-before-moving-out", priority: 0.65 },
  { path: "/about", priority: 0.5 },
  { path: "/disclaimer", priority: 0.5 },
  { path: "/privacy-policy", priority: 0.5 },
  { path: "/contact", priority: 0.5 },
] as const;
