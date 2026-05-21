import type { FAQItem } from "@/lib/site";

export type SEOLandingPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  primaryLink: {
    href: string;
    label: string;
  };
  highlights: Array<{
    label: string;
    value: string;
  }>;
  comparisonRows?: Array<{
    label: string;
    value: string;
    note: string;
  }>;
  sections: Array<{
    heading: string;
    body: string;
  }>;
  relatedLinks?: Array<{
    href: string;
    label: string;
  }>;
  faqs: FAQItem[];
};

function formatWholeNumber(value: number): string {
  return new Intl.NumberFormat("en", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function createRentAmountPage(amount: number): SEOLandingPage {
  const formattedAmount = formatWholeNumber(amount);
  const canadaMonthlyAt30 = amount / 0.3;
  const canadaAnnualAt30 = canadaMonthlyAt30 * 12;
  const annualAt35 = (amount / 0.35) * 12;

  return {
    slug: `how-much-income-to-rent-${amount}`,
    title: `How Much Income Do You Need to Rent ${formattedAmount}? | RentReadyCheck`,
    description: `Estimate how much income may be needed for ${formattedAmount} monthly rent using UK, US, Canada, Australia, and generic rent-to-income examples.`,
    h1: `How Much Income Do You Need to Rent ${formattedAmount}?`,
    intro: `A ${formattedAmount} monthly rent can point to different income estimates depending on the country and affordability method. These examples give a quick rough guide, then the calculator can check your own numbers.`,
    primaryLink: {
      href: `/rent-referencing-calculator?rent=${amount}`,
      label: "Check affordability",
    },
    highlights: [
      {
        label: "UK-style 30x rent",
        value: `${formatWholeNumber(amount * 30)} annual income`,
      },
      {
        label: "UK-style 36x rent",
        value: `${formatWholeNumber(amount * 36)} annual income`,
      },
      {
        label: "US-style 3x rent",
        value: `${formatWholeNumber(amount * 3 * 12)} annual income`,
      },
    ],
    comparisonRows: [
      {
        label: "UK 30x monthly rent",
        value: `${formattedAmount} x 30 = ${formatWholeNumber(amount * 30)} annual income`,
        note: "A common UK-style example threshold.",
      },
      {
        label: "UK 36x monthly rent",
        value: `${formattedAmount} x 36 = ${formatWholeNumber(amount * 36)} annual income`,
        note: "A stricter UK-style example threshold.",
      },
      {
        label: "US 2.5x monthly rent",
        value: `${formattedAmount} x 2.5 x 12 = ${formatWholeNumber(amount * 2.5 * 12)} annual income`,
        note: "A possible monthly income multiple example.",
      },
      {
        label: "US 3x monthly rent",
        value: `${formattedAmount} x 3 x 12 = ${formatWholeNumber(amount * 3 * 12)} annual income`,
        note: "A common US-style example threshold.",
      },
      {
        label: "Canada 30% rent-to-income",
        value: `${formatWholeNumber(canadaMonthlyAt30)} monthly income, about ${formatWholeNumber(canadaAnnualAt30)} annually`,
        note: "Uses rent as 30% of gross monthly income.",
      },
      {
        label: "Canada / generic 35%",
        value: `About ${formatWholeNumber(annualAt35)} annual income`,
        note: "A rough possible signal, not an approval rule.",
      },
      {
        label: "Australia 30% estimate",
        value: `About ${formatWholeNumber(canadaAnnualAt30)} annual income`,
        note: "For weekly Australian rent, use the calculator's weekly option.",
      },
      {
        label: "Other / Rest of world",
        value: `About ${formatWholeNumber(canadaAnnualAt30)} annually at 30%`,
        note: "Generic budgeting estimate only.",
      },
    ],
    sections: [
      {
        heading: `Quick answer for ${formattedAmount} monthly rent`,
        body: `As a rough guide, ${formattedAmount} monthly rent equals ${formatWholeNumber(amount * 30)} annual income at a 30x monthly rent example and ${formatWholeNumber(amount * 36)} at a 36x example. With a US-style 3x monthly rent check, the annual income example is also ${formatWholeNumber(amount * 3 * 12)}.`,
      },
      {
        heading: "Why the estimate changes by country",
        body:
          "The UK often uses annual income compared with monthly rent, the United States often uses monthly income multiples, and Canada, Australia, and the Rest of World option use rent-to-income percentages.",
      },
      {
        heading: "What to check before applying",
        body:
          "Income is only part of a rental application. Savings, employment status, credit history, landlord or property manager requirements, and guarantor or co-signer support can all affect the conversation.",
      },
    ],
    relatedLinks: [
      { href: "/rent-to-income-ratio-explained", label: "Rent-to-income ratio explained" },
      { href: "/guarantor-income-calculator", label: "Guarantor/co-signer calculator" },
      { href: "/move-in-cost-calculator", label: "Move-in cost calculator" },
    ],
    faqs: [
      {
        question: `Is ${formattedAmount} rent affordable?`,
        answer:
          "It depends on income, country, debts, savings, and the landlord or property manager's rules. These examples are rough affordability signals only.",
      },
      {
        question: `How much annual income is 30x ${formattedAmount} rent?`,
        answer: `A 30x monthly rent example is ${formatWholeNumber(amount * 30)} annual income because ${formattedAmount} multiplied by 30 equals ${formatWholeNumber(amount * 30)}.`,
      },
      {
        question: "Can joint tenants combine income?",
        answer:
          "Often they may be able to, but requirements vary by country, tenancy setup, landlord, letting agent, and property manager.",
      },
      {
        question: "Does this guarantee rental approval?",
        answer:
          "No. This is only an estimate. Actual rental decisions can depend on credit history, employment status, landlord requirements, property manager rules, savings, guarantors or co-signers, and other factors.",
      },
    ],
  };
}

export const seoLandingPages: SEOLandingPage[] = [
  {
    slug: "uk-rent-affordability-calculator",
    title: "UK Rent Affordability Calculator | RentReadyCheck",
    description:
      "Estimate UK rent affordability using example 30x and 36x monthly rent checks, guarantor support, and joint tenant income.",
    h1: "UK Rent Affordability Calculator",
    intro:
      "Use this guide to understand common UK-style rent affordability examples before you apply. The main calculator can preselect the United Kingdom and compare income with 30x and 36x monthly rent checks.",
    primaryLink: {
      href: "/rent-referencing-calculator?country=uk",
      label: "Open UK calculator",
    },
    highlights: [
      { label: "Common example", value: "30x monthly rent" },
      { label: "Stronger example", value: "36x monthly rent" },
      { label: "Support wording", value: "Guarantor" },
    ],
    comparisonRows: [
      {
        label: "1,200 monthly rent at 30x",
        value: "36,000 annual income",
        note: "1,200 x 30.",
      },
      {
        label: "1,200 monthly rent at 36x",
        value: "43,200 annual income",
        note: "1,200 x 36.",
      },
      {
        label: "Joint tenant example",
        value: "Two incomes can be compared together in the calculator",
        note: "Actual referencing rules vary by landlord and agent.",
      },
    ],
    sections: [
      {
        heading: "How UK rent affordability is often estimated",
        body:
          "UK affordability checks are often discussed as annual income compared with monthly rent. For example, 1,200 monthly rent would be 36,000 annual income at 30x rent and 43,200 annual income at 36x rent.",
      },
      {
        heading: "When a guarantor may be requested",
        body:
          "A landlord or letting agent may ask for a guarantor if applicant income is below an example threshold, employment is new or irregular, or the referencing provider wants extra reassurance.",
      },
      {
        heading: "How joint tenant income may be combined",
        body:
          "Couples, friends, or flatmates may be able to combine income when applying together. The joint tenant calculator can estimate the combined signal before you apply.",
      },
      {
        heading: "What else can affect UK referencing",
        body:
          "Income is only one part of referencing. Credit history, employment status, landlord requirements, savings, previous references, right-to-rent checks, and individual circumstances may also matter.",
      },
    ],
    relatedLinks: [
      { href: "/what-is-30-times-rent", label: "What is 30x rent?" },
      { href: "/what-is-36-times-rent", label: "What is 36x rent?" },
      { href: "/guarantor-income-calculator?country=uk", label: "Guarantor calculator" },
      { href: "/move-in-cost-calculator?country=uk", label: "Move-in cost calculator" },
    ],
    faqs: [
      {
        question: "How much do I need to earn to rent in the UK?",
        answer:
          "As a rough example, some UK-style checks compare annual income with 30x to 36x monthly rent. Requirements vary by landlord, letting agent, referencing provider, and circumstances.",
      },
      {
        question: "Do all UK landlords use 30x or 36x rent?",
        answer:
          "No. These are common examples, not universal rules. Some landlords or referencing companies may use different checks or consider other evidence.",
      },
      {
        question: "Does the UK calculator guarantee approval?",
        answer:
          "No. It is only an estimate. Actual rental decisions can depend on credit history, employment status, landlord requirements, savings, guarantors, and other factors.",
      },
    ],
  },
  {
    slug: "us-rent-affordability-calculator",
    title: "US Rent Affordability Calculator | RentReadyCheck",
    description:
      "Estimate US rent affordability using example monthly income multiples such as 2.5x to 3x rent.",
    h1: "US Rent Affordability Calculator",
    intro:
      "US rental applications often discuss affordability as gross monthly income compared with monthly rent. This guide explains common 2.5x to 3x rent examples and links to the country-aware calculator.",
    primaryLink: {
      href: "/rent-referencing-calculator?country=us",
      label: "Open US calculator",
    },
    highlights: [
      { label: "Possible example", value: "2.5x monthly rent" },
      { label: "Common example", value: "3x monthly rent" },
      { label: "Support wording", value: "Co-signer" },
    ],
    comparisonRows: [
      {
        label: "1,500 rent at 2.5x",
        value: "3,750 monthly income, or 45,000 annually",
        note: "A possible US-style income multiple example.",
      },
      {
        label: "1,500 rent at 3x",
        value: "4,500 monthly income, or 54,000 annually",
        note: "A common US-style income multiple example.",
      },
      {
        label: "Co-signer support",
        value: "May be assessed separately",
        note: "Rules vary by landlord and property manager.",
      },
    ],
    sections: [
      {
        heading: "How US rent affordability is often estimated",
        body:
          "Many US landlords use monthly income examples, such as gross monthly income being 2.5x or 3x the monthly rent. For 1,500 monthly rent, a 3x example would suggest 4,500 gross monthly income.",
      },
      {
        heading: "When a co-signer may help",
        body:
          "A co-signer may be requested if applicant income, credit history, rental history, or employment profile does not meet a landlord or property manager's requirements.",
      },
      {
        heading: "Why local rules still matter",
        body:
          "US rental practices can vary by state, city, landlord, and property manager. Fees, screening rules, credit requirements, and income checks are not identical everywhere.",
      },
    ],
    relatedLinks: [
      { href: "/how-much-income-to-rent-1500", label: "Income for 1,500 rent" },
      { href: "/guarantor-income-calculator?country=us", label: "Co-signer calculator" },
      { href: "/move-in-cost-calculator?country=us", label: "Move-in cost calculator" },
    ],
    faqs: [
      {
        question: "What does 3x rent mean in the US?",
        answer:
          "A 3x rent example means gross monthly income is three times the monthly rent. For 1,200 rent, that would be about 3,600 gross monthly income.",
      },
      {
        question: "Do all US landlords require 3x rent?",
        answer:
          "No. Some may use 2.5x, 3x, another rule, or a broader screening process that includes credit history and rental history.",
      },
      {
        question: "Is a US co-signer always accepted?",
        answer:
          "No. Co-signer rules vary by landlord and property manager, and the co-signer may need to meet separate income, credit, or residency requirements.",
      },
    ],
  },
  {
    slug: "canada-rent-affordability-calculator",
    title: "Canada Rent Affordability Calculator | RentReadyCheck",
    description:
      "Estimate Canadian rent affordability using rent-to-income examples such as 30%, 35%, and 40% of gross income.",
    h1: "Canada Rent Affordability Calculator",
    intro:
      "Canadian rent affordability is often discussed as rent compared with gross income. This guide explains common rent-to-income examples and links to the country-aware calculator.",
    primaryLink: {
      href: "/rent-referencing-calculator?country=ca",
      label: "Open Canada calculator",
    },
    highlights: [
      { label: "Strong example", value: "Rent at or below 30%" },
      { label: "Possible example", value: "Rent at or below 35%" },
      { label: "Borderline example", value: "Rent at or below 40%" },
    ],
    comparisonRows: [
      {
        label: "1,800 rent at 30%",
        value: "6,000 monthly income, or 72,000 annually",
        note: "A stronger rent-to-income example.",
      },
      {
        label: "1,800 rent at 35%",
        value: "About 5,143 monthly income, or about 61,714 annually",
        note: "A possible rent-to-income example.",
      },
      {
        label: "1,800 rent at 40%",
        value: "4,500 monthly income, or 54,000 annually",
        note: "A rough borderline example.",
      },
    ],
    sections: [
      {
        heading: "How Canadian affordability is often discussed",
        body:
          "A common way to sense-check rent in Canada is to compare monthly rent with gross monthly income. Lower rent-to-income percentages generally leave more room for other costs.",
      },
      {
        heading: "Guarantor or co-signer wording",
        body:
          "Depending on the province, landlord, and application, support may be described as a guarantor, co-signer, or another form of additional assurance.",
      },
      {
        heading: "What else may affect a Canadian rental application",
        body:
          "Income, credit history, employment, references, savings, local rules, and landlord requirements can all influence rental decisions.",
      },
    ],
    relatedLinks: [
      { href: "/guarantor-income-calculator?country=ca", label: "Guarantor/co-signer calculator" },
      { href: "/can-flatmates-combine-income-for-rent", label: "Combining tenant income" },
      { href: "/rent-split-calculator?country=ca", label: "Rent split calculator" },
    ],
    faqs: [
      {
        question: "What percentage of income should rent be in Canada?",
        answer:
          "Rent affordability is often discussed with examples such as 30%, 35%, or 40% of gross income, but actual decisions vary by landlord and province.",
      },
      {
        question: "Can Canadian renters combine income?",
        answer:
          "Often, joint applicants may combine income, but the exact approach depends on the landlord, property manager, and rental agreement.",
      },
      {
        question: "Does this calculator replace professional advice?",
        answer:
          "No. It is a general estimate only and is not financial, legal, tax, housing, or rental approval advice.",
      },
    ],
  },
  {
    slug: "australia-rent-affordability-calculator",
    title: "Australia Rent Affordability Calculator | RentReadyCheck",
    description:
      "Estimate Australian rent affordability using weekly or monthly rent and rent-to-income examples such as 25%, 30%, and 35%.",
    h1: "Australia Rent Affordability Calculator",
    intro:
      "Australian rent is often advertised weekly, so RentReadyCheck supports weekly or monthly rent and converts it into a monthly estimate for rent-to-income calculations.",
    primaryLink: {
      href: "/rent-referencing-calculator?country=au&frequency=weekly",
      label: "Open Australia calculator",
    },
    highlights: [
      { label: "Strong example", value: "Rent at or below 25%" },
      { label: "Possible example", value: "Rent at or below 30%" },
      { label: "Frequency", value: "Weekly or monthly rent" },
    ],
    comparisonRows: [
      {
        label: "550 weekly rent",
        value: "About 2,383 monthly rent",
        note: "Weekly rent x 52 / 12.",
      },
      {
        label: "At 30% rent-to-income",
        value: "About 7,944 monthly income",
        note: "Roughly 95,333 annual income.",
      },
      {
        label: "Move-in wording",
        value: "Bond and rent in advance",
        note: "Rules can vary by state, territory, and property manager.",
      },
    ],
    sections: [
      {
        heading: "How Australian rent affordability is estimated here",
        body:
          "This calculator compares rent with gross income using examples such as 25%, 30%, and 35%. If rent is entered weekly, it is converted to a monthly estimate using weekly rent multiplied by 52 and divided by 12.",
      },
      {
        heading: "Bond and move-in costs",
        body:
          "In Australia, upfront costs may include bond, rent in advance, moving costs, furniture, utilities, and other setup costs. These can affect whether a move feels realistic even if rent looks affordable.",
      },
      {
        heading: "Why state and property rules matter",
        body:
          "Rental applications and upfront cost rules can vary by state, territory, property manager, and individual circumstances. Always confirm requirements before applying.",
      },
    ],
    relatedLinks: [
      { href: "/move-in-cost-calculator?country=au", label: "Bond and move-in costs" },
      { href: "/rent-split-calculator?country=au", label: "Split rent with housemates" },
      { href: "/how-much-should-i-save-before-moving-out", label: "Savings before moving out" },
    ],
    faqs: [
      {
        question: "Can I enter weekly rent for Australia?",
        answer:
          "Yes. The Australia setting supports weekly or monthly rent. Weekly rent is converted to a monthly estimate for affordability calculations.",
      },
      {
        question: "What rent-to-income percentage is used for Australia?",
        answer:
          "RentReadyCheck uses example signals such as 25%, 30%, and 35% of gross income. These are rough examples only, not approval rules.",
      },
      {
        question: "Does Australian rent affordability vary by state?",
        answer:
          "Yes. Rental practices, upfront costs, and application requirements can vary by state, territory, property manager, and individual situation.",
      },
    ],
  },
  {
    slug: "rent-affordability-calculator-rest-of-world",
    title: "Rent Affordability Calculator for Other Countries | RentReadyCheck",
    description:
      "Use a generic rent-to-income estimate when your country is not listed, with clear limitations and disclaimers.",
    h1: "Rent Affordability Calculator for Other Countries",
    intro:
      "If your country is not listed yet, the Other / Rest of world setting gives a generic rent-to-income estimate. It is useful for budgeting, but it does not reflect local rental laws or official application rules.",
    primaryLink: {
      href: "/rent-referencing-calculator?country=row",
      label: "Open Rest of world calculator",
    },
    highlights: [
      { label: "Generic strong signal", value: "Rent at or below 30%" },
      { label: "Generic possible signal", value: "Rent at or below 35%" },
      { label: "Generic borderline signal", value: "Rent at or below 40%" },
    ],
    comparisonRows: [
      {
        label: "1,200 monthly rent at 30%",
        value: "About 4,000 gross monthly income",
        note: "Generic budgeting estimate only.",
      },
      {
        label: "1,200 monthly rent at 35%",
        value: "About 3,429 gross monthly income",
        note: "May feel tighter after other costs.",
      },
      {
        label: "1,200 monthly rent at 40%",
        value: "About 3,000 gross monthly income",
        note: "A borderline rough guide, not an application rule.",
      },
    ],
    sections: [
      {
        heading: "How the Rest of world estimate works",
        body:
          "RentReadyCheck compares rent with gross monthly income using generic 30%, 35%, and 40% rent-to-income examples. This can help you sense-check a budget when your country is not listed.",
      },
      {
        heading: "What this page cannot tell you",
        body:
          "This page does not describe local laws, official rental rules, deposit limits, tenant protections, or application requirements in your country. Always check local guidance and the landlord or property manager's requirements.",
      },
      {
        heading: "Useful next checks",
        body:
          "After checking rent-to-income, it can help to estimate upfront move-in costs and whether a guarantor or co-signer might be part of the application conversation.",
      },
    ],
    relatedLinks: [
      { href: "/rent-to-income-ratio-explained", label: "Rent-to-income ratio explained" },
      { href: "/guarantor-income-calculator?country=row", label: "Guarantor/co-signer calculator" },
      { href: "/move-in-cost-calculator?country=row", label: "Move-in cost calculator" },
    ],
    faqs: [
      {
        question: "Is the Rest of world estimate country-specific?",
        answer:
          "No. It is a generic budgeting estimate only. It may not reflect rental rules, affordability checks, deposit rules, or application requirements in your country.",
      },
      {
        question: "What percentage does the generic estimate use?",
        answer:
          "It uses rough rent-to-income examples such as 30%, 35%, and 40% of gross monthly income.",
      },
      {
        question: "Should I rely on this before applying?",
        answer:
          "Use it as a starting point only. Confirm requirements with the landlord, property manager, agent, or a relevant local professional before making decisions.",
      },
    ],
  },
  createRentAmountPage(800),
  createRentAmountPage(1000),
  createRentAmountPage(1200),
  createRentAmountPage(1500),
  createRentAmountPage(2000),
  {
    slug: "rent-to-income-ratio-explained",
    title: "What Is the 3x Rent Rule? | RentReadyCheck",
    description:
      "Understand the 3x rent rule, how US apartment affordability is often estimated, and why income is only one part of a rental application.",
    h1: "What is the 3x rent rule?",
    intro:
      "The 3x rent rule is a common US affordability example that compares gross monthly income with monthly rent. It is useful for planning, but it is not a universal approval rule.",
    primaryLink: {
      href: "/rent-referencing-calculator?country=us",
      label: "Check rent affordability",
    },
    highlights: [
      { label: "Formula", value: "Monthly rent x 3" },
      { label: "Common example", value: "3x gross monthly income" },
      { label: "Useful for", value: "Planning before applying" },
    ],
    comparisonRows: [
      {
        label: "1,200 monthly rent",
        value: "3,600 gross monthly income",
        note: "1,200 x 3.",
      },
      {
        label: "1,500 monthly rent",
        value: "4,500 gross monthly income",
        note: "1,500 x 3.",
      },
      {
        label: "2,000 monthly rent",
        value: "6,000 gross monthly income",
        note: "2,000 x 3.",
      },
    ],
    sections: [
      {
        heading: "How to calculate the 3x rent rule",
        body:
          "Multiply the monthly rent by 3. If the apartment is 1,500 per month, a 3x example points to 4,500 in gross monthly income, or about 54,000 per year.",
      },
      {
        heading: "Why it is only a rough guide",
        body:
          "Not every US landlord uses 3x rent. Some use 2.5x, some use a different threshold, and some look more broadly at credit, savings, rental history, employment, and background checks.",
      },
      {
        heading: "What else can affect an application",
        body:
          "Income is only one part of the application. A property manager may also review credit history, debt load, job stability, move-in funds, past rentals, roommate income, and whether a co-signer is available.",
      },
    ],
    relatedLinks: [
      { href: "/do-i-need-a-cosigner-for-an-apartment", label: "Do I need a co-signer?" },
      { href: "/can-i-rent-with-bad-credit", label: "Renting with bad credit" },
      { href: "/how-much-should-i-save-before-moving-out", label: "Savings before moving" },
    ],
    faqs: [
      {
        question: "What does 3x rent mean?",
        answer:
          "It means gross monthly income is three times the monthly rent. For 1,200 rent, the 3x example is 3,600 gross monthly income.",
      },
      {
        question: "Do all apartments require 3x rent?",
        answer:
          "No. Requirements vary by landlord, property manager, city, property type, and the rest of the application.",
      },
      {
        question: "Does meeting 3x rent guarantee approval?",
        answer:
          "No. It is only an affordability example. Actual decisions can depend on credit history, employment, rental history, background checks, savings, co-signer support, and property rules.",
      },
    ],
  },
  {
    slug: "do-i-need-a-cosigner-for-an-apartment",
    title: "Do I Need a Co-Signer for an Apartment? | RentReadyCheck",
    description:
      "Learn when a US apartment application may involve a co-signer, what property managers may review, and how to prepare before applying.",
    h1: "Do I need a co-signer for an apartment?",
    intro:
      "A co-signer may help some renters strengthen an apartment application, but it depends on the property manager's screening rules and the full application picture.",
    primaryLink: {
      href: "/guarantor-income-calculator?country=us",
      label: "Estimate co-signer income",
    },
    highlights: [
      { label: "May help with", value: "Income, credit, or rental history gaps" },
      { label: "Still reviewed", value: "Applicant and co-signer profile" },
      { label: "Best next step", value: "Ask the property manager early" },
    ],
    comparisonRows: [
      {
        label: "Income is close but short",
        value: "A co-signer may be requested",
        note: "Some properties use gross monthly income multiples such as 2.5x or 3x rent.",
      },
      {
        label: "Limited rental history",
        value: "Extra support may help",
        note: "A steady co-signer can sometimes add reassurance.",
      },
      {
        label: "Property does not accept co-signers",
        value: "You may need another option",
        note: "Policies vary by landlord, building, and property manager.",
      },
    ],
    sections: [
      {
        heading: "When a co-signer may come up",
        body:
          "A property manager may mention a co-signer if your income is below their example threshold, your credit file is thin, your rental history is limited, or your employment situation is new or variable.",
      },
      {
        heading: "What a co-signer may need to show",
        body:
          "The co-signer may need to complete a separate application and provide income, credit, identification, and contact details. Some properties also use higher income expectations for co-signers because they are backing the lease.",
      },
      {
        heading: "What to ask before applying",
        body:
          "Ask whether the property accepts co-signers, what documents are required, whether the co-signer needs to live in the United States, and whether fees apply before you spend money on an application.",
      },
      {
        heading: "Other ways to strengthen an application",
        body:
          "If a co-signer is not available, a larger move-in buffer, clearer income documentation, a roommate, or a less expensive apartment may improve the overall affordability picture.",
      },
    ],
    relatedLinks: [
      { href: "/can-i-rent-with-bad-credit", label: "Renting with bad credit" },
      { href: "/rent-to-income-ratio-explained", label: "Rent-to-income ratio" },
      { href: "/rental-application-fees-explained", label: "Application fees" },
    ],
    faqs: [
      {
        question: "Does a co-signer guarantee apartment approval?",
        answer:
          "No. A co-signer can be helpful, but approval decisions can still depend on income, credit, background checks, rental history, property rules, and other screening factors.",
      },
      {
        question: "Is a co-signer always allowed?",
        answer:
          "No. Some landlords and property managers allow co-signers, some require them in certain cases, and others do not accept them.",
      },
      {
        question: "Should I ask about co-signer rules before applying?",
        answer:
          "Yes. Asking first can help you avoid paying application fees for a property where your support option does not fit the screening policy.",
      },
    ],
  },
  {
    slug: "can-i-rent-with-bad-credit",
    title: "Can I Rent with Bad Credit? | RentReadyCheck",
    description:
      "Learn how bad credit may affect a US rental application and what other factors property managers may consider.",
    h1: "Can I rent with bad credit?",
    intro:
      "Bad credit does not automatically mean you cannot rent. It can make an application harder, but property managers may also look at income, savings, rental history, employment, background checks, co-signer support, and move-in funds.",
    primaryLink: {
      href: "/rent-readiness-score",
      label: "Check Rent Readiness Score",
    },
    highlights: [
      { label: "Credit is", value: "One screening factor" },
      { label: "May also matter", value: "Income, savings, and history" },
      { label: "Possible support", value: "Co-signer or roommate" },
    ],
    comparisonRows: [
      {
        label: "Low credit score",
        value: "May need extra context",
        note: "Property managers may still review income, savings, and rental history.",
      },
      {
        label: "Strong move-in funds",
        value: "May improve the picture",
        note: "A larger buffer can show more room for rent and upfront costs.",
      },
      {
        label: "Roommate application",
        value: "May improve affordability",
        note: "Combined household income can make rent easier to support.",
      },
    ],
    sections: [
      {
        heading: "Bad credit is not the whole application",
        body:
          "Credit history can matter, but many rental applications include more than one signal. A property manager may also consider income, employment stability, rental history, background checks, references, savings, and available move-in funds.",
      },
      {
        heading: "How a co-signer may help",
        body:
          "A co-signer may help if the property accepts co-signers and the co-signer meets the property's screening requirements. This does not guarantee approval, but it can give the property manager another source of support to review.",
      },
      {
        heading: "Why savings and move-in buffer matter",
        body:
          "A stronger savings buffer may help you cover the security deposit, first month's rent, application fees, moving costs, and unexpected setup costs. It may also make your budget look less stretched.",
      },
      {
        heading: "Consider a roommate or lower rent target",
        body:
          "Applying with a roommate can improve affordability if the property considers combined income. A lower rent target can also reduce pressure on your budget and may make income requirements easier to meet.",
      },
      {
        heading: "Estimate your position before applying",
        body:
          "The Rent Readiness Score can help you estimate where you stand before paying application fees. It is a planning tool only, not an approval promise or professional advice.",
      },
    ],
    relatedLinks: [
      { href: "/do-i-need-a-cosigner-for-an-apartment", label: "Do I need a co-signer?" },
      { href: "/how-much-should-i-save-before-moving-out", label: "Savings before moving" },
      { href: "/security-deposit-basics", label: "Security deposit basics" },
    ],
    faqs: [
      {
        question: "Can I be approved for an apartment with bad credit?",
        answer:
          "It is possible, but never guaranteed. Policies vary, and the application may also include income, employment, rental history, background checks, savings, and co-signer support.",
      },
      {
        question: "Will a co-signer fix bad credit?",
        answer:
          "Not automatically. A co-signer may strengthen an application at properties that accept co-signers, but the property manager can still review the full application.",
      },
      {
        question: "Can a roommate help if my credit is weak?",
        answer:
          "Sometimes. A roommate may improve affordability if the property considers combined income, but screening rules and lease responsibility can vary.",
      },
    ],
  },
  {
    slug: "rental-application-fees-explained",
    title: "Rental Application Fees Explained | RentReadyCheck",
    description:
      "Understand common US rental application fees, what they may cover, and what to ask before paying.",
    h1: "Rental application fees explained",
    intro:
      "Rental application fees are common in many US markets. They may cover screening costs such as credit, background, income, and rental history checks, but rules and amounts vary by state, city, landlord, and property manager.",
    primaryLink: {
      href: "/move-in-cost-calculator?country=us",
      label: "Estimate move-in costs",
    },
    highlights: [
      { label: "Common use", value: "Screening and processing" },
      { label: "Ask before paying", value: "Amount, refund policy, and timing" },
      { label: "Budget with", value: "Move-in costs and deposits" },
    ],
    comparisonRows: [
      {
        label: "Application fee",
        value: "Often paid before screening",
        note: "Ask what it covers and whether it is refundable.",
      },
      {
        label: "Per-applicant fee",
        value: "May apply to each adult",
        note: "Roommate applications can multiply the total cost.",
      },
      {
        label: "Other upfront costs",
        value: "Deposit, first rent, and move-in charges",
        note: "Application fees are only one part of the cash needed.",
      },
    ],
    sections: [
      {
        heading: "What an application fee may cover",
        body:
          "A rental application fee may help cover credit checks, background checks, income verification, rental history review, and administrative processing. The exact process varies by property.",
      },
      {
        heading: "Questions to ask first",
        body:
          "Before paying, ask the exact fee amount, whether each adult applicant pays, whether the fee is refundable, what screening criteria are used, and how long the application review usually takes.",
      },
      {
        heading: "Why fees can vary by location",
        body:
          "US rental fee rules can vary by state and city. Some places limit fees or require disclosures, while others leave more to the landlord or property manager's policy.",
      },
      {
        heading: "Plan for total move-in cash",
        body:
          "Application fees should be budgeted alongside the security deposit, first month's rent, moving costs, utility setup, furniture, and a practical emergency buffer.",
      },
    ],
    relatedLinks: [
      { href: "/security-deposit-basics", label: "Security deposit basics" },
      { href: "/how-much-should-i-save-before-moving-out", label: "Savings before moving" },
      { href: "/can-i-rent-with-bad-credit", label: "Renting with bad credit" },
    ],
    faqs: [
      {
        question: "Are rental application fees refundable?",
        answer:
          "Sometimes, but often they are not. Ask the landlord or property manager about the refund policy before paying.",
      },
      {
        question: "Does paying an application fee mean I will get the apartment?",
        answer:
          "No. An application fee usually starts or supports the screening process. It is not an approval promise.",
      },
      {
        question: "Can application fee rules vary by state?",
        answer:
          "Yes. State and local rules can vary. This guide is general information only and is not legal or financial advice.",
      },
    ],
  },
  {
    slug: "security-deposit-basics",
    title: "Security Deposit Basics for Renters | RentReadyCheck",
    description:
      "Learn the basics of US security deposits, what they may cover, and how to plan for move-in costs.",
    h1: "Security deposit basics",
    intro:
      "A security deposit is money a landlord may collect before move-in to help cover certain unpaid rent, damage, or lease-related costs. The amount, timing, and return rules can vary by state, city, and lease.",
    primaryLink: {
      href: "/move-in-cost-calculator?country=us",
      label: "Estimate deposit and move-in costs",
    },
    highlights: [
      { label: "Usually paid", value: "Before or at move-in" },
      { label: "Plan alongside", value: "First rent and moving costs" },
      { label: "Rules vary", value: "State, city, and lease" },
    ],
    comparisonRows: [
      {
        label: "Security deposit",
        value: "Often tied to monthly rent",
        note: "The exact amount depends on local rules and property policy.",
      },
      {
        label: "First month's rent",
        value: "Often due before keys",
        note: "Some leases may also involve prorated rent.",
      },
      {
        label: "Move-in buffer",
        value: "Helpful if possible",
        note: "Furniture, utilities, and moving supplies can add up quickly.",
      },
    ],
    sections: [
      {
        heading: "What a security deposit is for",
        body:
          "A security deposit may be used according to the lease and local rules for certain costs such as unpaid rent, damage beyond normal wear, cleaning, or other lease-related amounts.",
      },
      {
        heading: "What to confirm before paying",
        body:
          "Ask how much is due, when it is due, how it should be paid, whether any amount is refundable, and what move-in condition documentation the property expects.",
      },
      {
        heading: "Document the apartment condition",
        body:
          "At move-in, photos, videos, and a written checklist can help create a clear record of the apartment's condition. Keep copies of receipts, messages, and the signed lease.",
      },
      {
        heading: "Budget beyond the deposit",
        body:
          "The security deposit is only one part of moving. First month's rent, application fees, moving costs, utility setup, furniture, and an emergency buffer can all affect the cash you need.",
      },
    ],
    relatedLinks: [
      { href: "/rental-application-fees-explained", label: "Application fees" },
      { href: "/how-much-should-i-save-before-moving-out", label: "Savings before moving" },
      { href: "/rent-to-income-ratio-explained", label: "Rent-to-income ratio" },
    ],
    faqs: [
      {
        question: "Is a security deposit the same as rent?",
        answer:
          "No. Rent pays for occupying the apartment. A security deposit is separate money held under the lease and local rules.",
      },
      {
        question: "How much is a typical security deposit?",
        answer:
          "It varies. Some properties use an amount related to monthly rent, but state and local rules, lease terms, and property policy can affect the amount.",
      },
      {
        question: "Is this legal advice about deposits?",
        answer:
          "No. This is general renter education only. For legal questions, check your lease, local rules, or a qualified local professional.",
      },
    ],
  },
  {
    slug: "what-is-30-times-rent",
    title: "What Is 30 Times Rent? | RentReadyCheck",
    description:
      "Learn what 30 times rent means, how to calculate it, and when it may be used as an example rent affordability check.",
    h1: "What is 30 times rent?",
    intro:
      "30 times rent is a simple affordability example that compares annual income with monthly rent. It is commonly discussed in the UK, but it is only one possible way to estimate affordability.",
    primaryLink: {
      href: "/rent-referencing-calculator",
      label: "Check affordability",
    },
    highlights: [
      { label: "Formula", value: "Monthly rent x 30" },
      { label: "Example", value: "1,200 rent = 36,000 income" },
      { label: "Best used as", value: "A rough starting point" },
    ],
    sections: [
      {
        heading: "How 30 times rent works",
        body:
          "To calculate a 30x rent example, multiply the monthly rent by 30. If the rent is 1,200 per month, 1,200 x 30 equals 36,000 annual income.",
      },
      {
        heading: "Is 30x rent used everywhere?",
        body:
          "No. Some UK landlords or letting agents may discuss 30x monthly rent, but other markets use different approaches. The United States often uses monthly income multiples, while Canada and Australia often discuss rent-to-income percentages.",
      },
      {
        heading: "When 30x rent may not be enough",
        body:
          "Some landlords or referencing providers may use a higher example such as 36x rent, especially if they want more income headroom. Credit history, job type, savings, and guarantor or co-signer support can also matter.",
      },
    ],
    faqs: [
      {
        question: "How do I calculate 30 times rent?",
        answer:
          "Multiply the monthly rent by 30. For example, 1,000 monthly rent multiplied by 30 equals 30,000 annual income.",
      },
      {
        question: "Is 30x rent the same as 3x monthly rent?",
        answer:
          "Not exactly. 30x monthly rent compares annual income with monthly rent. A 3x monthly income rule compares gross monthly income with monthly rent and is closer to 36x annual income.",
      },
      {
        question: "Does 30x rent guarantee approval?",
        answer:
          "No. It is only an example benchmark. Actual rental decisions can depend on many other factors.",
      },
    ],
  },
  {
    slug: "what-is-36-times-rent",
    title: "What Is 36 Times Rent? | RentReadyCheck",
    description:
      "Understand 36 times rent, how it compares with 30x rent, and why some rental checks use a higher income benchmark.",
    h1: "What is 36 times rent?",
    intro:
      "36 times rent is an affordability example that compares annual income with monthly rent. It roughly lines up with rent being one third of gross monthly income.",
    primaryLink: {
      href: "/rent-referencing-calculator",
      label: "Check affordability",
    },
    highlights: [
      { label: "Formula", value: "Monthly rent x 36" },
      { label: "Example", value: "1,200 rent = 43,200 income" },
      { label: "Similar to", value: "3x gross monthly income" },
    ],
    sections: [
      {
        heading: "How 36 times rent works",
        body:
          "To calculate a 36x rent example, multiply the monthly rent by 36. If rent is 1,200 per month, 1,200 x 36 equals 43,200 annual income.",
      },
      {
        heading: "Why 36x rent can feel stricter",
        body:
          "36x rent is higher than 30x rent, so it asks for more income for the same property. Some landlords, letting agents, or referencing providers may prefer this because it suggests more headroom after rent.",
      },
      {
        heading: "How this compares globally",
        body:
          "In the United States, people may describe a similar idea as needing gross monthly income around 3x the rent. In Canada and Australia, the conversation may focus more on rent as a percentage of gross income.",
      },
    ],
    faqs: [
      {
        question: "What is 36 times 1,000 rent?",
        answer:
          "36 times 1,000 monthly rent is 36,000 annual income.",
      },
      {
        question: "Is 36x rent stricter than 30x rent?",
        answer:
          "Yes. 36x rent requires a higher annual income than 30x rent for the same monthly rent.",
      },
      {
        question: "Can a guarantor help with 36x rent?",
        answer:
          "Sometimes. A landlord or property manager may ask for a guarantor or co-signer if applicant income is below an example threshold.",
      },
    ],
  },
  {
    slug: "how-much-does-a-guarantor-need-to-earn",
    title: "How Much Does a Guarantor Need to Earn? | RentReadyCheck",
    description:
      "Estimate how much a guarantor or co-signer may need to earn, with country differences for UK, US, Canada, and Australia rental applications.",
    h1: "How much does a guarantor or co-signer need to earn?",
    intro:
      "A guarantor or co-signer income requirement depends on the country, rent amount, and landlord or property manager. This page explains the common examples and links to the calculator.",
    primaryLink: {
      href: "/guarantor-income-calculator",
      label: "Estimate support",
    },
    highlights: [
      { label: "UK example", value: "Often 36x monthly rent" },
      { label: "US example", value: "Often 2.5x to 3.5x rent" },
      { label: "Canada/Australia", value: "Often rent-to-income examples" },
    ],
    sections: [
      {
        heading: "Why guarantor income rules vary",
        body:
          "A guarantor or co-signer is usually there to provide extra reassurance if the applicant's income, employment, or rental history does not meet the landlord's expectations. Because this creates extra risk for the support person, requirements can be stricter.",
      },
      {
        heading: "Common income examples",
        body:
          "In the UK, a guarantor example may use 36x monthly rent. In the United States, a co-signer example may use a monthly income multiple such as 3x rent. Canada and Australia may discuss rent compared with gross income.",
      },
      {
        heading: "What to check before asking someone",
        body:
          "Before asking someone to act as a guarantor or co-signer, confirm whether the landlord or property manager requires income evidence, credit checks, residency status, or a signed legal agreement.",
      },
    ],
    faqs: [
      {
        question: "Is a guarantor the same as a co-signer?",
        answer:
          "The wording and legal effect can vary by country and agreement. In general, both may involve someone supporting the rental application and taking on responsibility if rent is not paid.",
      },
      {
        question: "Can a retired person be a guarantor?",
        answer:
          "Possibly, but it depends on the landlord or property manager's requirements. They may consider pension income, savings, credit history, and local rules.",
      },
      {
        question: "Does the calculator guarantee a guarantor will be accepted?",
        answer:
          "No. It gives a rough estimate only. The final decision depends on the landlord, property manager, referencing provider, and individual circumstances.",
      },
    ],
  },
  {
    slug: "can-flatmates-combine-income-for-rent",
    title: "Can Flatmates Combine Income for Rent? | RentReadyCheck",
    description:
      "Learn when flatmates, housemates, or joint tenants may be able to combine income for a rental affordability check.",
    h1: "Can flatmates combine income for rent?",
    intro:
      "Flatmates, housemates, and joint tenants can often be assessed together, but the exact approach depends on the country, landlord, property manager, and tenancy setup.",
    primaryLink: {
      href: "/joint-tenant-affordability-calculator",
      label: "Check joint income",
    },
    highlights: [
      { label: "Common approach", value: "Combined household income" },
      { label: "Main risk", value: "One tenant leaving" },
      { label: "Useful tool", value: "Joint tenant calculator" },
    ],
    sections: [
      {
        heading: "How combined income may be assessed",
        body:
          "Some landlords and property managers look at the combined income of everyone applying together. This can help when no single tenant earns enough alone, but the household income appears stronger together.",
      },
      {
        heading: "Why the tenancy type matters",
        body:
          "If tenants are jointly responsible for the rent, the landlord may care about whether the group can cover the full rent. If tenants rent separate rooms on separate agreements, each person may be assessed differently.",
      },
      {
        heading: "What if one flatmate earns much more?",
        body:
          "A higher earner can improve combined income, but it can also raise fairness questions when splitting rent. The rent split calculator can compare equal, income-based, and room-size splits.",
      },
    ],
    faqs: [
      {
        question: "Do all tenants need to meet the income requirement separately?",
        answer:
          "Not always. Some applications use combined income, while others may assess each tenant separately or ask for guarantors or co-signers.",
      },
      {
        question: "Can students combine income?",
        answer:
          "Sometimes, but student applications may be handled differently and may require guarantors, proof of funding, or upfront rent depending on local practice.",
      },
      {
        question: "Should flatmates split rent equally?",
        answer:
          "Equal splits are simple, but income-based or room-size splits may feel fairer in some households. The best approach is the one everyone understands and agrees to in writing.",
      },
    ],
  },
  {
    slug: "how-much-should-i-save-before-moving-out",
    title: "How Much Should I Save Before Moving Out? | RentReadyCheck",
    description:
      "Estimate how much to save before moving out in the US, including security deposit, first month's rent, application fees, moving costs, furniture, utilities, and a safety buffer.",
    h1: "How much should I save before moving out?",
    intro:
      "Before moving out, it helps to estimate upfront costs as well as monthly rent. A realistic US savings target usually includes the security deposit, first month's rent, application fees, moving costs, utility setup, furniture, and an emergency buffer.",
    primaryLink: {
      href: "/move-in-cost-calculator",
      label: "Estimate costs",
    },
    highlights: [
      { label: "Common costs", value: "Security deposit" },
      { label: "Also plan for", value: "First rent and application fees" },
      { label: "Helpful buffer", value: "Emergency savings if possible" },
    ],
    comparisonRows: [
      {
        label: "Security deposit",
        value: "Often tied to monthly rent",
        note: "The amount can vary by property and local rules.",
      },
      {
        label: "First month's rent",
        value: "Often due before move-in",
        note: "Some leases may also include prorated rent.",
      },
      {
        label: "Setup buffer",
        value: "Moving, utilities, and basics",
        note: "Small purchases can add up quickly in the first week.",
      },
    ],
    sections: [
      {
        heading: "Costs to plan before moving",
        body:
          "Typical upfront costs can include the security deposit, first month's rent, application fees, moving supplies, movers or truck rental, utility setup, furniture, groceries, and other household basics.",
      },
      {
        heading: "Why move-in costs vary by property",
        body:
          "Move-in costs can vary by state, city, landlord, property manager, and lease. Some properties charge separate application or administrative fees, while others bundle more costs into the deposit and first rent payment.",
      },
      {
        heading: "Build a realistic savings target",
        body:
          "A good starting point is to estimate required upfront costs, then add a buffer for unexpected purchases or delayed income. The move-in cost calculator can help you list each cost in one place.",
      },
      {
        heading: "Check affordability before paying fees",
        body:
          "If rent already feels tight, compare monthly rent with gross income and regular expenses before paying application fees. A roommate, lower rent target, or larger savings buffer may make the move more manageable.",
      },
    ],
    relatedLinks: [
      { href: "/security-deposit-basics", label: "Security deposit basics" },
      { href: "/rental-application-fees-explained", label: "Application fees" },
      { href: "/rent-to-income-ratio-explained", label: "3x rent rule" },
    ],
    faqs: [
      {
        question: "Should I save more than the deposit?",
        answer:
          "Usually yes. The security deposit is only one part of moving. First rent, application fees, moving costs, furniture, utilities, and emergency savings can all matter.",
      },
      {
        question: "How much emergency savings should renters have?",
        answer:
          "There is no single rule that fits everyone. Many people aim for a buffer that could cover at least a few unexpected bills, but the right amount depends on income stability and personal circumstances.",
      },
      {
        question: "Does RentReadyCheck store my moving cost inputs?",
        answer:
          "No. Calculator inputs are processed in your browser and the site does not intentionally store them.",
      },
    ],
  },
];

export function getSEOLandingPage(slug: string): SEOLandingPage {
  const page = seoLandingPages.find((item) => item.slug === slug);

  if (!page) {
    throw new Error(`SEO landing page not found: ${slug}`);
  }

  return page;
}
