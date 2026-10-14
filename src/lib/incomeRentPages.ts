import {
  annualGrossIncome,
  formatHourly,
  formatUSD,
  getRule,
  type PayType,
} from "@/lib/incomeRent";

// "How much rent can I afford on X?" pages. Amounts were chosen using Google
// autocomplete as a demand signal (not search volume). The first two pages
// were written by hand; the rest are built from the amounts below. Add new
// amounts here and to publicRoutes.
export type IncomeRentPage = {
  slug: string;
  payType: PayType;
  amount: number;
  // Human label used in headings, e.g. "$50,000 a year".
  label: string;
  title: string;
  description: string;
  intro: string;
  // A rent the reader is likely weighing, used for the worked FAQ example.
  exampleRent: number;
  // Second roommate's annual gross income in the roommate example.
  roommateIncome: number;
  roommateLabel: string;
  // Pages to suggest under "Compare other incomes".
  compareSlugs: string[];
};

type IncomeRentPageBase = Omit<IncomeRentPage, "compareSlugs">;

const handWrittenPages: IncomeRentPageBase[] = [
  {
    slug: "how-much-rent-can-i-afford-on-50000-a-year",
    payType: "yearly",
    amount: 50000,
    label: "$50,000 a year",
    title: "How Much Rent Can I Afford on $50K a Year? | RentReadyCheck",
    description:
      "On a $50,000 salary, landlord 3x and 2.5x checks point to about $1,389–$1,667 a month in rent, and the 30% guideline to $1,250 for rent plus utilities. Based on gross income, with move-in costs and roommate examples.",
    intro:
      "A $50,000 salary is about $4,167 a month before tax. Landlord income checks of 3x and 2.5x rent point to about $1,389 to $1,667 a month, while the 30% budgeting guideline points to about $1,250 a month for total housing costs, including utilities. Here's how each rule works, what the upfront costs could look like, and how a roommate changes the picture.",
    exampleRent: 1500,
    roommateIncome: 35000,
    roommateLabel: "$35,000 a year",
  },
  {
    slug: "how-much-rent-can-i-afford-making-20-an-hour",
    payType: "hourly",
    amount: 20,
    label: "$20 an hour",
    title: "How Much Rent Can I Afford Making $20 an Hour? | RentReadyCheck",
    description:
      "At $20 an hour full time (40 hours, 52 weeks), landlord 3x and 2.5x checks point to about $1,156–$1,387 a month in rent, and the 30% guideline to $1,040 for rent plus utilities. Includes part-time examples.",
    intro:
      "At $20 an hour, 40 hours a week for 52 weeks, you earn about $41,600 a year, or $3,467 a month before tax. Landlord income checks of 3x and 2.5x rent point to about $1,156 to $1,387 a month, while the 30% budgeting guideline points to about $1,040 a month for total housing costs, including utilities. Your hours matter a lot, so this page also shows part-time examples and lets you change the hours and weeks.",
    exampleRent: 1200,
    roommateIncome: 18 * 40 * 52,
    roommateLabel: "$18 an hour full time",
  },
];

const yearlyAmounts = [30000, 35000, 40000, 45000, 60000, 70000, 75000, 80000, 100000];
const hourlyAmounts = [15, 17, 18, 22, 25, 30];

function createIncomeRentPage(payType: PayType, amount: number): IncomeRentPageBase {
  const annual = annualGrossIncome({ payType, amount });
  const monthly = annual / 12;
  const thirty = formatUSD(getRule("30%").maxRent(monthly));
  const threeX = formatUSD(getRule("3x").maxRent(monthly));
  const twoHalf = formatUSD(getRule("2.5x").maxRent(monthly));
  // A listing just above the 3x figure, so the worked example is a real decision.
  const exampleRent = Math.ceil(getRule("3x").maxRent(monthly) / 100) * 100;
  const rules = `Landlord income checks of 3x and 2.5x rent point to about ${threeX} to ${twoHalf} a month, while the 30% budgeting guideline points to about ${thirty} a month for total housing costs, including utilities.`;

  if (payType === "hourly") {
    const rate = formatHourly(amount);
    const roommateRate = amount - 2;
    return {
      slug: `how-much-rent-can-i-afford-making-${amount}-an-hour`,
      payType,
      amount,
      label: `${rate} an hour`,
      title: `How Much Rent Can I Afford Making ${rate} an Hour? | RentReadyCheck`,
      description: `At ${rate} an hour full time (40 hours, 52 weeks), landlord 3x and 2.5x checks point to about ${threeX}–${twoHalf} a month in rent, and the 30% guideline to ${thirty} for rent plus utilities. Includes part-time examples.`,
      intro: `At ${rate} an hour, 40 hours a week for 52 weeks, you earn about ${formatUSD(annual)} a year, or ${formatUSD(monthly)} a month before tax. ${rules} Your hours matter a lot, so this page also shows part-time examples and lets you change the hours and weeks.`,
      exampleRent,
      roommateIncome: annualGrossIncome({ payType, amount: roommateRate }),
      roommateLabel: `${formatHourly(roommateRate)} an hour full time`,
    };
  }

  const salary = formatUSD(amount);
  const roommateIncome = Math.round((amount * 0.7) / 5000) * 5000;
  return {
    slug: `how-much-rent-can-i-afford-on-${amount}-a-year`,
    payType,
    amount,
    label: `${salary} a year`,
    title: `How Much Rent Can I Afford on $${amount / 1000}K a Year? | RentReadyCheck`,
    description: `On a ${salary} salary, landlord 3x and 2.5x checks point to about ${threeX}–${twoHalf} a month in rent, and the 30% guideline to ${thirty} for rent plus utilities. Based on gross income, with move-in costs and roommate examples.`,
    intro: `A ${salary} salary is about ${formatUSD(monthly)} a month before tax. ${rules} Here's how each rule works, what the upfront costs could look like, and how a roommate changes the picture.`,
    exampleRent,
    roommateIncome,
    roommateLabel: `${formatUSD(roommateIncome)} a year`,
  };
}

const basePages: IncomeRentPageBase[] = [
  ...handWrittenPages,
  ...yearlyAmounts.map((amount) => createIncomeRentPage("yearly", amount)),
  ...hourlyAmounts.map((amount) => createIncomeRentPage("hourly", amount)),
].sort((a, b) => (a.payType === b.payType ? a.amount - b.amount : a.payType === "yearly" ? -1 : 1));

function annualFor(page: IncomeRentPageBase): number {
  return annualGrossIncome({ payType: page.payType, amount: page.amount });
}

// The income page of the given pay type closest to an annual gross income.
export function nearestIncomeRentSlug(payType: PayType, annual: number): string {
  return basePages
    .filter((page) => page.payType === payType)
    .reduce((best, page) =>
      Math.abs(annualFor(page) - annual) < Math.abs(annualFor(best) - annual) ? page : best,
    ).slug;
}

// Each page compares against the next amount down and up, plus the closest
// page of the other pay type.
export const incomeRentPages: IncomeRentPage[] = basePages.map((page) => {
  const sameType = basePages.filter((item) => item.payType === page.payType);
  const index = sameType.indexOf(page);
  const neighbours = [sameType[index - 1], sameType[index + 1]].filter(Boolean);
  const otherType = nearestIncomeRentSlug(page.payType === "yearly" ? "hourly" : "yearly", annualFor(page));

  return { ...page, compareSlugs: [...neighbours.map((item) => item.slug), otherType] };
});

export function getIncomeRentPage(slug: string): IncomeRentPage | undefined {
  return incomeRentPages.find((page) => page.slug === slug);
}
