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
  const annualAt25x = amount * 2.5 * 12;
  const annualAt3x = amount * 3 * 12;
  const annualAt35x = amount * 3.5 * 12;

  return {
    slug: `how-much-income-to-rent-${amount}`,
    title: `How Much Income Do You Need to Rent ${formattedAmount}? | RentReadyCheck`,
    description: `Estimate how much income US apartment renters may need for ${formattedAmount} monthly rent using common 2.5x, 3x, and 3.5x examples.`,
    h1: `How much income do you need to rent ${formattedAmount}?`,
    intro: `A ${formattedAmount} monthly rent can point to different income targets depending on the apartment, property manager, and full rental application. These examples give a rough US planning guide before you run your own numbers.`,
    primaryLink: {
      href: `/rent-referencing-calculator?rent=${amount}`,
      label: "Check rent affordability",
    },
    highlights: [
      {
        label: "2.5x rent example",
        value: `${formatWholeNumber(annualAt25x)} annual income`,
      },
      {
        label: "3x rent example",
        value: `${formatWholeNumber(annualAt3x)} annual income`,
      },
      {
        label: "3.5x rent example",
        value: `${formatWholeNumber(annualAt35x)} annual income`,
      },
    ],
    comparisonRows: [
      {
        label: "2.5x monthly rent",
        value: `${formattedAmount} x 2.5 x 12 = ${formatWholeNumber(annualAt25x)} annual income`,
        note: "A possible apartment affordability example.",
      },
      {
        label: "3x monthly rent",
        value: `${formattedAmount} x 3 x 12 = ${formatWholeNumber(annualAt3x)} annual income`,
        note: "A common US apartment affordability example.",
      },
      {
        label: "3.5x monthly rent",
        value: `${formattedAmount} x 3.5 x 12 = ${formatWholeNumber(annualAt35x)} annual income`,
        note: "A stricter planning example.",
      },
    ],
    sections: [
      {
        heading: `Quick answer for ${formattedAmount} monthly rent`,
        body: `As a rough guide, ${formattedAmount} monthly rent points to ${formatWholeNumber(annualAt25x)} annual income at 2.5x rent, ${formatWholeNumber(annualAt3x)} at 3x rent, and ${formatWholeNumber(annualAt35x)} at 3.5x rent.`,
      },
      {
        heading: "Why the estimate can vary",
        body:
          "Apartment screening policies can vary by property manager, location, building, and application details. Income is one signal, but credit history, savings, rental history, debt pressure, and a co-signer can also matter.",
      },
      {
        heading: "What to check before applying",
        body:
          "Before paying application fees, compare the rent with gross monthly income, estimate move-in costs, and decide whether a roommate or co-signer may be part of your plan.",
      },
    ],
    relatedLinks: [
      { href: "/rent-to-income-ratio-explained", label: "3x rent rule" },
      { href: "/do-i-need-a-cosigner-for-an-apartment", label: "Do I need a co-signer?" },
      { href: "/move-in-cost-calculator", label: "Move-in cost calculator" },
    ],
    faqs: [
      {
        question: `Is ${formattedAmount} rent affordable?`,
        answer:
          "It depends on income, debts, savings, credit history, move-in costs, and the property manager's screening policy. These examples are planning signals only.",
      },
      {
        question: `How much annual income is 3x ${formattedAmount} rent?`,
        answer: `A 3x monthly rent example is ${formatWholeNumber(annualAt3x)} annual income because ${formattedAmount} multiplied by 3 and then by 12 equals ${formatWholeNumber(annualAt3x)}.`,
      },
      {
        question: "Can roommates combine income?",
        answer:
          "Many apartment applications may consider household income, but the exact approach depends on the property manager and lease setup.",
      },
      {
        question: "Does this guarantee rental approval?",
        answer:
          "No. This is only an estimate. Actual rental decisions can depend on the full application and property rules.",
      },
    ],
  };
}

export const seoLandingPages: SEOLandingPage[] = [
  {
    slug: "us-rent-affordability-calculator",
    title: "Rent Affordability Calculator for US Renters | RentReadyCheck",
    description:
      "Estimate apartment affordability using common US gross monthly income examples such as 2.5x rent and 3x rent.",
    h1: "Rent Affordability Calculator",
    intro:
      "US apartment applications often compare gross monthly income with monthly rent. This guide explains common 2.5x to 3x rent examples and links to the full rent affordability calculator.",
    primaryLink: {
      href: "/rent-referencing-calculator",
      label: "Open rent affordability calculator",
    },
    highlights: [
      { label: "Possible example", value: "2.5x monthly rent" },
      { label: "Common example", value: "3x monthly rent" },
      { label: "Support option", value: "Co-signer" },
    ],
    comparisonRows: [
      {
        label: "1,500 rent at 2.5x",
        value: "3,750 monthly income, or 45,000 annually",
        note: "A possible income multiple example.",
      },
      {
        label: "1,500 rent at 3x",
        value: "4,500 monthly income, or 54,000 annually",
        note: "A common apartment screening example.",
      },
      {
        label: "Co-signer support",
        value: "May be assessed separately",
        note: "Rules vary by landlord and property manager.",
      },
    ],
    sections: [
      {
        heading: "How apartment affordability is often estimated",
        body:
          "Many property managers use monthly income examples, such as gross monthly income being 2.5x or 3x the monthly rent. For 1,500 monthly rent, a 3x example points to 4,500 gross monthly income.",
      },
      {
        heading: "When a co-signer may help",
        body:
          "A co-signer may be requested if applicant income, credit history, rental history, or employment profile does not meet a landlord or property manager's requirements.",
      },
      {
        heading: "Why local rules still matter",
        body:
          "Rental practices can vary by state, city, landlord, and property manager. Fees, screening rules, credit requirements, and income checks are not identical everywhere.",
      },
    ],
    relatedLinks: [
      { href: "/how-much-income-to-rent-1500", label: "Income for 1,500 rent" },
      { href: "/do-i-need-a-cosigner-for-an-apartment", label: "Co-signer guide" },
      { href: "/move-in-cost-calculator", label: "Move-in cost calculator" },
    ],
    faqs: [
      {
        question: "What does 3x rent mean?",
        answer:
          "A 3x rent example means gross monthly income is three times the monthly rent. For 1,200 rent, that would be about 3,600 gross monthly income.",
      },
      {
        question: "Do all apartments require 3x rent?",
        answer:
          "No. Some may use 2.5x, 3x, another benchmark, or a broader screening process that includes credit history and rental history.",
      },
      {
        question: "Is a co-signer always accepted?",
        answer:
          "No. Co-signer rules vary by landlord and property manager, and the co-signer may need to meet separate income, credit, or residency requirements.",
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
      href: "/rent-referencing-calculator",
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
          "Not every landlord uses 3x rent. Some use 2.5x, some use a different threshold, and some look more broadly at credit, savings, rental history, employment, and background checks.",
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
      href: "/guarantor-income-calculator",
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
      href: "/move-in-cost-calculator",
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
          "Rental fee rules can vary by state and city. Some places limit fees or require disclosures, while others leave more to the landlord or property manager's policy.",
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
      href: "/move-in-cost-calculator",
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
    title: "What Is 2.5x Monthly Rent? | RentReadyCheck",
    description:
      "Learn how a 2.5x monthly rent example works for apartment affordability planning.",
    h1: "What is 2.5x monthly rent?",
    intro:
      "Some apartments use a 2.5x monthly rent example when comparing rent with gross monthly income. This is only one planning benchmark, not an approval promise.",
    primaryLink: {
      href: "/rent-referencing-calculator",
      label: "Check affordability",
    },
    highlights: [
      { label: "Formula", value: "Monthly rent x 2.5" },
      { label: "Example", value: "1,200 rent = 3,000 monthly income" },
      { label: "Best used as", value: "A rough starting point" },
    ],
    sections: [
      {
        heading: "How 2.5x monthly rent works",
        body:
          "To calculate a 2.5x rent example, multiply the monthly rent by 2.5. If the rent is 1,200 per month, 1,200 x 2.5 equals 3,000 gross monthly income.",
      },
      {
        heading: "Is 2.5x rent used everywhere?",
        body:
          "No. Some property managers may use 2.5x, some may use 3x, and others may review the full application more broadly.",
      },
      {
        heading: "When income alone may not be enough",
        body:
          "Credit history, job stability, savings, rental history, debt pressure, and co-signer support can also affect the application conversation.",
      },
    ],
    faqs: [
      {
        question: "How do I calculate 2.5x monthly rent?",
        answer:
          "Multiply the monthly rent by 2.5. For example, 1,000 monthly rent multiplied by 2.5 equals 2,500 gross monthly income.",
      },
      {
        question: "Is 2.5x rent the same as 3x rent?",
        answer:
          "No. A 3x example asks for more income than a 2.5x example for the same apartment.",
      },
      {
        question: "Does 2.5x rent guarantee approval?",
        answer:
          "No. It is only an example benchmark. Actual rental decisions can depend on many other factors.",
      },
    ],
  },
  {
    slug: "what-is-36-times-rent",
    title: "What Is 3x Monthly Rent? | RentReadyCheck",
    description:
      "Understand 3x monthly rent, how to calculate it, and why it is often used as an apartment affordability example.",
    h1: "What is 3x monthly rent?",
    intro:
      "3x monthly rent is an affordability example that compares gross monthly income with monthly rent. It is common in apartment screening conversations, but it is not a universal rule.",
    primaryLink: {
      href: "/rent-referencing-calculator",
      label: "Check affordability",
    },
    highlights: [
      { label: "Formula", value: "Monthly rent x 3" },
      { label: "Example", value: "1,200 rent = 3,600 monthly income" },
      { label: "Annual view", value: "Monthly rent x 36" },
    ],
    sections: [
      {
        heading: "How 3x monthly rent works",
        body:
          "To calculate a 3x rent example, multiply the monthly rent by 3. If rent is 1,200 per month, 1,200 x 3 equals 3,600 gross monthly income.",
      },
      {
        heading: "Why 3x rent can feel stricter",
        body:
          "3x rent asks for more income than a 2.5x example for the same apartment. Some property managers may prefer it because it suggests more room after rent.",
      },
      {
        heading: "What else to compare",
        body:
          "A renter should also plan for debt payments, savings, move-in costs, credit history, and whether roommate or co-signer support is part of the application.",
      },
    ],
    faqs: [
      {
        question: "What is 3 times 1,000 rent?",
        answer:
          "3 times 1,000 monthly rent is 3,000 gross monthly income, or about 36,000 annual income.",
      },
      {
        question: "Is 3x rent stricter than 2.5x rent?",
        answer:
          "Yes. 3x rent requires a higher income than 2.5x rent for the same monthly rent.",
      },
      {
        question: "Can a co-signer help with 3x rent?",
        answer:
          "Sometimes. A landlord or property manager may ask for a co-signer if applicant income is below an example threshold.",
      },
    ],
  },
  {
    slug: "how-much-does-a-guarantor-need-to-earn",
    title: "How Much Does a Co-Signer Need to Earn? | RentReadyCheck",
    description:
      "Estimate how much a co-signer may need to earn for a US apartment rental application.",
    h1: "How much does a co-signer need to earn?",
    intro:
      "A co-signer income requirement depends on the rent amount, property manager, and full rental application. This page explains common US examples and links to the calculator.",
    primaryLink: {
      href: "/guarantor-income-calculator",
      label: "Estimate co-signer income",
    },
    highlights: [
      { label: "Possible example", value: "2.5x monthly rent" },
      { label: "Common example", value: "3x monthly rent" },
      { label: "Stricter example", value: "3.5x monthly rent" },
    ],
    sections: [
      {
        heading: "Why co-signer income rules vary",
        body:
          "A co-signer is usually there to provide extra reassurance if the applicant's income, employment, credit history, or rental history does not meet the property's expectations. Because this creates extra risk for the support person, requirements can be stricter.",
      },
      {
        heading: "Common income examples",
        body:
          "Some properties may compare co-signer income with monthly rent using examples such as 2.5x, 3x, or 3.5x rent. The exact documents and thresholds vary by property manager.",
      },
      {
        heading: "What to check before asking someone",
        body:
          "Before asking someone to co-sign, confirm whether the landlord or property manager requires income evidence, credit checks, residency details, or a signed legal agreement.",
      },
    ],
    faqs: [
      {
        question: "Is a co-signer always accepted?",
        answer:
          "No. Each landlord or property manager decides whether co-signers are accepted and what screening requirements apply.",
      },
      {
        question: "Can a retired person be a co-signer?",
        answer:
          "Possibly, but it depends on the property manager's requirements. They may consider retirement income, savings, credit history, and other details.",
      },
      {
        question: "Does the calculator guarantee a co-signer will be accepted?",
        answer:
          "No. It gives a rough estimate only. The final decision depends on the landlord, property manager, and full application.",
      },
    ],
  },
  {
    slug: "can-flatmates-combine-income-for-rent",
    title: "Can Roommates Combine Income for Rent? | RentReadyCheck",
    description:
      "Learn when roommates may be able to combine income for a rental affordability check.",
    h1: "Can roommates combine income for rent?",
    intro:
      "Roommates can often be assessed together, but the exact approach depends on the landlord, property manager, lease setup, and full application.",
    primaryLink: {
      href: "/joint-tenant-affordability-calculator",
      label: "Check roommate income",
    },
    highlights: [
      { label: "Common approach", value: "Combined household income" },
      { label: "Main risk", value: "One roommate leaving" },
      { label: "Useful tool", value: "Roommate calculator" },
    ],
    sections: [
      {
        heading: "How combined income may be assessed",
        body:
          "Some landlords and property managers look at the combined income of everyone applying together. This can help when no single renter earns enough alone, but the household income appears stronger together.",
      },
      {
        heading: "Why the lease setup matters",
        body:
          "If roommates are sharing responsibility for the rent, the landlord may care about whether the group can cover the full amount. If renters have separate agreements, each person may be assessed differently.",
      },
      {
        heading: "What if one roommate earns much more?",
        body:
          "A higher earner can improve combined income, but it can also raise fairness questions when splitting rent. The rent split calculator can compare equal, income-based, and room-size splits.",
      },
    ],
    faqs: [
      {
        question: "Do all roommates need to meet the income requirement separately?",
        answer:
          "Not always. Some applications use combined income, while others may assess each renter separately or ask for co-signers.",
      },
      {
        question: "Can students combine income?",
        answer:
          "Sometimes, but student applications may be handled differently and may require co-signers, proof of funding, or extra move-in funds depending on the property.",
      },
      {
        question: "Should roommates split rent equally?",
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
