export type FAQItem = {
  question: string;
  answer: string;
};

export const estimateDisclaimer =
  "Estimate only. Rental decisions vary by landlord, property manager, credit history, and application details.";

export const tools = [
  {
    title: "Rent Affordability Calculator",
    href: "/rent-referencing-calculator",
    description: "Compare monthly rent with gross monthly income before you apply.",
    bestFor: "Checking common 2.5x rent and 3x rent examples.",
    ctaLabel: "Check your score",
  },
  {
    title: "Co-signer Income Calculator",
    href: "/guarantor-income-calculator",
    description: "Estimate whether a co-signer may help your rental application.",
    bestFor: "Renters who may need extra application support.",
    ctaLabel: "Estimate co-signer support",
  },
  {
    title: "Roommate Affordability Calculator",
    href: "/joint-tenant-affordability-calculator",
    description: "Combine incomes for roommates applying for an apartment together.",
    bestFor: "Roommates comparing household income with monthly rent.",
    ctaLabel: "Check roommate income",
  },
  {
    title: "Move-In Cost Calculator",
    href: "/move-in-cost-calculator",
    description: "Estimate security deposit, first month's rent, and setup costs.",
    bestFor: "Planning cash needed before move-in day.",
    ctaLabel: "Estimate costs",
  },
  {
    title: "Rent Split Calculator for Roommates",
    href: "/rent-split-calculator",
    description: "Split rent equally, by income, or by room size.",
    bestFor: "Roommates comparing fair monthly rent shares.",
    ctaLabel: "Split rent",
  },
] as const;
