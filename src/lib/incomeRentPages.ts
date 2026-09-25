import type { PayType } from "@/lib/incomeRent";

// "How much rent can I afford on X?" pages. Amounts were chosen from
// Google autocomplete demand; add new entries here and to publicRoutes.
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

export const incomeRentPages: IncomeRentPage[] = [
  {
    slug: "how-much-rent-can-i-afford-on-50000-a-year",
    payType: "yearly",
    amount: 50000,
    label: "$50,000 a year",
    title: "How Much Rent Can I Afford on $50K a Year? | RentReadyCheck",
    description:
      "On a $50,000 salary, common rules point to about $1,250–$1,667 a month in rent, based on gross income before tax. See 3x, 2.5x and 30% results, move-in costs and roommate examples.",
    intro:
      "A $50,000 salary is about $4,167 a month before tax. Depending on which rule of thumb you use, that points to rent of roughly $1,250 to $1,667 a month. Here's how each rule works, what the upfront costs could look like, and how a roommate changes the picture.",
    exampleRent: 1500,
    roommateIncome: 35000,
    roommateLabel: "$35,000 a year",
    compareSlugs: ["how-much-rent-can-i-afford-making-20-an-hour"],
  },
  {
    slug: "how-much-rent-can-i-afford-making-20-an-hour",
    payType: "hourly",
    amount: 20,
    label: "$20 an hour",
    title: "How Much Rent Can I Afford Making $20 an Hour? | RentReadyCheck",
    description:
      "At $20 an hour full time (40 hours, 52 weeks), common rules point to about $1,040–$1,387 a month in rent, based on gross pay before tax. See part-time examples, move-in costs and roommate splits.",
    intro:
      "At $20 an hour, 40 hours a week for 52 weeks, you earn about $41,600 a year, or $3,467 a month before tax. That points to rent of roughly $1,040 to $1,387 a month, depending on the rule. Your hours matter a lot, so this page also shows part-time examples and lets you change the hours and weeks.",
    exampleRent: 1200,
    roommateIncome: 18 * 40 * 52,
    roommateLabel: "$18 an hour full time",
    compareSlugs: ["how-much-rent-can-i-afford-on-50000-a-year"],
  },
];

export function getIncomeRentPage(slug: string): IncomeRentPage | undefined {
  return incomeRentPages.find((page) => page.slug === slug);
}
