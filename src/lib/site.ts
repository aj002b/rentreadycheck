export type FAQItem = {
  question: string;
  answer: string;
};

export const estimateDisclaimer =
  "This is only an estimate. Actual rental decisions can depend on credit history, employment status, landlord requirements, property manager rules, savings, guarantors or co-signers, and other factors.";

export const tools = [
  {
    title: "Rent Affordability Calculator",
    href: "/rent-referencing-calculator",
    description: "Check if your income may be enough before you apply.",
    bestFor: "A quick country-aware rent affordability estimate.",
    ctaLabel: "Check affordability",
  },
  {
    title: "Guarantor / Co-signer Calculator",
    href: "/guarantor-income-calculator",
    description: "Estimate how much a guarantor or co-signer may need to earn.",
    bestFor: "Checking whether extra support may meet an example threshold.",
    ctaLabel: "Estimate support",
  },
  {
    title: "Joint Tenant Calculator",
    href: "/joint-tenant-affordability-calculator",
    description: "Combine incomes for couples, friends, or flatmates.",
    bestFor: "Couples, friends, or flatmates applying together.",
    ctaLabel: "Check joint income",
  },
  {
    title: "Move-In Cost Calculator",
    href: "/move-in-cost-calculator",
    description: "Estimate deposit, first month's rent, and upfront costs.",
    bestFor: "Planning cash needed before move-in day.",
    ctaLabel: "Estimate move-in costs",
  },
  {
    title: "Rent Split Calculator",
    href: "/rent-split-calculator",
    description: "Split rent equally, by income, or by room size.",
    bestFor: "Housemates comparing fair monthly rent shares.",
    ctaLabel: "Split rent",
  },
] as const;
