import type { PayType } from "@/lib/incomeRent";

// "How much rent can I afford on X?" pages. Amounts were chosen using Google
// autocomplete as a demand signal (not search volume); add new entries here
// and to publicRoutes.
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
      "On a $50,000 salary, landlord 3x and 2.5x checks point to about $1,389–$1,667 a month in rent, and the 30% guideline to $1,250 for rent plus utilities. Based on gross income, with move-in costs and roommate examples.",
    intro:
      "A $50,000 salary is about $4,167 a month before tax. Landlord income checks of 3x and 2.5x rent point to about $1,389 to $1,667 a month, while the 30% budgeting guideline points to about $1,250 a month for total housing costs, including utilities. Here's how each rule works, what the upfront costs could look like, and how a roommate changes the picture.",
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
      "At $20 an hour full time (40 hours, 52 weeks), landlord 3x and 2.5x checks point to about $1,156–$1,387 a month in rent, and the 30% guideline to $1,040 for rent plus utilities. Includes part-time examples.",
    intro:
      "At $20 an hour, 40 hours a week for 52 weeks, you earn about $41,600 a year, or $3,467 a month before tax. Landlord income checks of 3x and 2.5x rent point to about $1,156 to $1,387 a month, while the 30% budgeting guideline points to about $1,040 a month for total housing costs, including utilities. Your hours matter a lot, so this page also shows part-time examples and lets you change the hours and weeks.",
    exampleRent: 1200,
    roommateIncome: 18 * 40 * 52,
    roommateLabel: "$18 an hour full time",
    compareSlugs: ["how-much-rent-can-i-afford-on-50000-a-year"],
  },
];

export function getIncomeRentPage(slug: string): IncomeRentPage | undefined {
  return incomeRentPages.find((page) => page.slug === slug);
}
