// Shared math for the "how much rent can I afford on X" pages and calculator.
// All figures use gross (pre-tax) income.

export type PayType = "yearly" | "hourly";

export const DEFAULT_HOURS_PER_WEEK = 40;
export const DEFAULT_PAID_WEEKS = 52;

export function annualGrossIncome({
  payType,
  amount,
  hoursPerWeek = DEFAULT_HOURS_PER_WEEK,
  paidWeeks = DEFAULT_PAID_WEEKS,
}: {
  payType: PayType;
  amount: number;
  hoursPerWeek?: number;
  paidWeeks?: number;
}): number {
  if (!(amount > 0)) {
    return 0;
  }

  if (payType === "yearly") {
    return amount;
  }

  return amount * Math.max(hoursPerWeek, 0) * Math.max(paidWeeks, 0);
}

export type RentRule = {
  id: "3x" | "2.5x" | "30%";
  name: string;
  formula: string;
  maxRent: (monthlyGross: number) => number;
  incomeNeeded: (monthlyRent: number) => number;
};

// Ordered strictest (lowest rent) to most lenient.
export const rentRules: RentRule[] = [
  {
    id: "30%",
    name: "30% of gross income",
    formula: "Monthly gross income × 0.30",
    maxRent: (monthlyGross) => monthlyGross * 0.3,
    incomeNeeded: (monthlyRent) => (monthlyRent / 0.3) * 12,
  },
  {
    id: "3x",
    name: "3x monthly rent",
    formula: "Monthly gross income ÷ 3",
    maxRent: (monthlyGross) => monthlyGross / 3,
    incomeNeeded: (monthlyRent) => monthlyRent * 36,
  },
  {
    id: "2.5x",
    name: "2.5x monthly rent",
    formula: "Monthly gross income ÷ 2.5",
    maxRent: (monthlyGross) => monthlyGross / 2.5,
    incomeNeeded: (monthlyRent) => monthlyRent * 30,
  },
];

export function getRule(id: RentRule["id"]): RentRule {
  return rentRules.find((rule) => rule.id === id) as RentRule;
}

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatUSD(value: number): string {
  return usd.format(Math.round(value));
}

export function formatHourly(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}
