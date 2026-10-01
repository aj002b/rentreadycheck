import type { CountryCode, CountryConfig, RentFrequency } from "@/lib/countries";
import { getCountryConfig } from "@/lib/countries";

export const AFFORDABILITY_MULTIPLIERS = [30, 36, 40] as const;
export type AffordabilityMultiplier = (typeof AFFORDABILITY_MULTIPLIERS)[number];

export function safeNumber(value: string | number | undefined | null): number {
  const numberValue = typeof value === "number" ? value : Number(value);
  return Number.isFinite(numberValue) ? numberValue : 0;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCurrencyByCountry(
  value: number,
  countryCode: CountryCode,
): string {
  const country = getCountryConfig(countryCode);

  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: country.currencyCode,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercentage(value: number): string {
  if (!Number.isFinite(value)) {
    return "0.0%";
  }

  return `${value.toFixed(1)}%`;
}

export function calculateRequiredIncome(
  monthlyRent: number,
  multiplier: number,
): number {
  return monthlyRent * multiplier;
}

export function calculateAnnualMultiplierRequirement(
  monthlyRent: number,
  multiplier: number,
): number {
  return monthlyRent * multiplier;
}

export function calculateMonthlyIncomeFromAnnualIncome(
  annualIncome: number,
): number {
  return annualIncome / 12;
}

export function calculateIncomeMultiple(
  monthlyRent: number,
  annualIncome: number,
): number {
  if (monthlyRent <= 0) {
    return 0;
  }

  return calculateMonthlyIncomeFromAnnualIncome(annualIncome) / monthlyRent;
}

export function calculateRentToIncomePercentage(
  monthlyRent: number,
  annualIncome: number,
): number {
  return calculateRentPercentage(monthlyRent, annualIncome);
}

export function normalizeRentToMonthly(
  rentAmount: number,
  rentFrequency: RentFrequency,
): number {
  return rentFrequency === "weekly" ? (rentAmount * 52) / 12 : rentAmount;
}

export function getCountryAffordabilityResult(
  country: CountryConfig,
  rentAmount: number,
  rentFrequency: RentFrequency,
  annualIncome: number,
  supportPersonIncome = 0,
) {
  const monthlyRent = normalizeRentToMonthly(rentAmount, rentFrequency);
  const rentPercentage = calculateRentToIncomePercentage(monthlyRent, annualIncome);
  const incomeMultiple = calculateIncomeMultiple(monthlyRent, annualIncome);
  const supportPersonMultiple = calculateIncomeMultiple(
    monthlyRent,
    supportPersonIncome,
  );

  if (country.code === "UK") {
    const required30 = calculateAnnualMultiplierRequirement(monthlyRent, 30);
    const required36 = calculateAnnualMultiplierRequirement(monthlyRent, 36);

    if (annualIncome >= required36) {
      return {
        title: "Strong signal",
        description:
          "Your combined income is above an example 36x monthly rent benchmark.",
        tone: "positive" as const,
      };
    }

    if (annualIncome >= required30) {
      return {
        title: "Possible signal",
        description:
          "Your combined income is above an example 30x monthly rent benchmark, but below 36x.",
        tone: "neutral" as const,
      };
    }

    if (supportPersonIncome >= required36) {
      return {
        title: "Guarantor may help",
        description:
          "Applicant income is below the example threshold, but the guarantor income may meet a common benchmark.",
        tone: "warning" as const,
      };
    }
  }

  if (country.code === "US") {
    if (incomeMultiple >= 3) {
      return {
        title: "Strong signal",
        description:
          "Gross monthly income is at least 3x the monthly rent in this example.",
        tone: "positive" as const,
      };
    }

    if (incomeMultiple >= 2.5) {
      return {
        title: "Possible signal",
        description:
          "Gross monthly income is at least 2.5x the monthly rent, but below 3x.",
        tone: "neutral" as const,
      };
    }

    if (supportPersonMultiple >= 3) {
      return {
        title: "Co-signer may help",
        description:
          "Applicant income is below the example threshold, but a co-signer may meet a 3x monthly rent example.",
        tone: "warning" as const,
      };
    }
  }

  if (country.code === "CA") {
    if (rentPercentage <= 30) {
      return {
        title: "Strong signal",
        description:
          "Rent is at or below 30% of gross monthly income in this example.",
        tone: "positive" as const,
      };
    }

    if (rentPercentage <= 35) {
      return {
        title: "Possible signal",
        description:
          "Rent is above 30% but at or below 35% of gross monthly income.",
        tone: "neutral" as const,
      };
    }

    if (rentPercentage <= 40) {
      return {
        title: "Borderline signal",
        description:
          "Rent is above 35% but at or below 40% of gross monthly income.",
        tone: "warning" as const,
      };
    }
  }

  if (country.code === "ROW") {
    if (rentPercentage <= 30) {
      return {
        title: "Strong signal",
        description:
          "Rent is at or below 30% of gross monthly income in this generic estimate.",
        tone: "positive" as const,
      };
    }

    if (rentPercentage <= 35) {
      return {
        title: "Possible signal",
        description:
          "Rent is above 30% but at or below 35% of gross monthly income in this generic estimate.",
        tone: "neutral" as const,
      };
    }

    if (rentPercentage <= 40) {
      return {
        title: "Borderline signal",
        description:
          "Rent is above 35% but at or below 40% of gross monthly income in this generic estimate.",
        tone: "warning" as const,
      };
    }
  }

  if (country.code === "AU") {
    if (rentPercentage <= 25) {
      return {
        title: "Strong signal",
        description:
          "Rent is at or below 25% of gross monthly income in this example.",
        tone: "positive" as const,
      };
    }

    if (rentPercentage <= 30) {
      return {
        title: "Possible signal",
        description:
          "Rent is above 25% but at or below 30% of gross monthly income.",
        tone: "neutral" as const,
      };
    }

    if (rentPercentage <= 35) {
      return {
        title: "Borderline signal",
        description:
          "Rent is above 30% but at or below 35% of gross monthly income.",
        tone: "warning" as const,
      };
    }
  }

  return {
    title: "May need support",
    description:
      "Based on these rough examples, income may be below common affordability signals for the selected country.",
    tone: "warning" as const,
  };
}

export function calculateRentPercentage(
  monthlyRent: number,
  annualIncome: number,
): number {
  if (annualIncome <= 0) {
    return 0;
  }

  return (monthlyRent / (annualIncome / 12)) * 100;
}

export function calculateDifference(actual: number, required: number): number {
  return actual - required;
}

export function hasNegativeValue(values: Array<string | number>): boolean {
  return values.some((value) => safeNumber(value) < 0);
}

export type SignalResult = {
  title: string;
  description: string;
  tone: "positive" | "neutral" | "warning";
};

const LOWEST_ROOMMATE_THRESHOLD = 2.5;

// Roommate result for the threshold the user picked (e.g. 3 = 3x monthly rent).
export function getRoommateThresholdResult(
  monthlyRent: number,
  combinedAnnualIncome: number,
  selectedThreshold: number,
): SignalResult {
  const thresholdLabel = `${selectedThreshold}x monthly rent`;

  if (combinedAnnualIncome >= monthlyRent * selectedThreshold * 12) {
    return {
      title: "Strong signal",
      description: `Combined gross income meets the selected ${thresholdLabel} example.`,
      tone: "positive",
    };
  }

  if (
    selectedThreshold > LOWEST_ROOMMATE_THRESHOLD &&
    combinedAnnualIncome >= monthlyRent * LOWEST_ROOMMATE_THRESHOLD * 12
  ) {
    return {
      title: "Possible signal",
      description: `Combined income is below the selected ${thresholdLabel} example, but meets a lower 2.5x example some property managers use.`,
      tone: "neutral",
    };
  }

  return {
    title: "May need support",
    description: `Combined income is below the selected ${thresholdLabel} example. A co-signer, lower rent, or another roommate may help.`,
    tone: "warning",
  };
}
