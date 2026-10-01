import { describe, expect, it } from "vitest";
import { annualGrossIncome, formatHourly, formatUSD, getRule, rentRules } from "@/lib/incomeRent";
import { incomeRentPages } from "@/lib/incomeRentPages";
import { publicRoutes } from "@/lib/siteConfig";

describe("annualGrossIncome", () => {
  it("returns a yearly salary unchanged", () => {
    expect(annualGrossIncome({ payType: "yearly", amount: 50000 })).toBe(50000);
  });

  it("assumes 40 hours and 52 paid weeks for hourly pay", () => {
    expect(annualGrossIncome({ payType: "hourly", amount: 20 })).toBe(41600);
  });

  it("uses custom hours and weeks", () => {
    expect(annualGrossIncome({ payType: "hourly", amount: 20, hoursPerWeek: 30, paidWeeks: 50 })).toBe(30000);
  });

  it("returns 0 for zero, negative or invalid amounts", () => {
    expect(annualGrossIncome({ payType: "yearly", amount: 0 })).toBe(0);
    expect(annualGrossIncome({ payType: "hourly", amount: -5 })).toBe(0);
    expect(annualGrossIncome({ payType: "yearly", amount: Number.NaN })).toBe(0);
  });
});

describe("rent rules", () => {
  const monthly = 50000 / 12;

  it("gives the published $50,000 figures", () => {
    expect(formatUSD(getRule("30%").maxRent(monthly))).toBe("$1,250");
    expect(formatUSD(getRule("3x").maxRent(monthly))).toBe("$1,389");
    expect(formatUSD(getRule("2.5x").maxRent(monthly))).toBe("$1,667");
  });

  it("gives the published $20 an hour figures", () => {
    const hourlyMonthly = annualGrossIncome({ payType: "hourly", amount: 20 }) / 12;
    expect(formatUSD(getRule("30%").maxRent(hourlyMonthly))).toBe("$1,040");
    expect(formatUSD(getRule("3x").maxRent(hourlyMonthly))).toBe("$1,156");
    expect(formatUSD(getRule("2.5x").maxRent(hourlyMonthly))).toBe("$1,387");
  });

  it("is ordered from lowest to highest rent", () => {
    const rents = rentRules.map((rule) => rule.maxRent(monthly));
    expect(rents).toEqual([...rents].sort((a, b) => a - b));
  });

  it("income needed is the inverse of max rent", () => {
    for (const rule of rentRules) {
      expect(rule.incomeNeeded(rule.maxRent(monthly))).toBeCloseTo(50000, 6);
    }
    expect(getRule("3x").incomeNeeded(1500)).toBe(54000);
    expect(getRule("2.5x").incomeNeeded(1500)).toBe(45000);
  });
});

describe("formatting", () => {
  it("formats whole dollars", () => {
    expect(formatUSD(1388.89)).toBe("$1,389");
  });

  it("shows cents on hourly pay only when needed", () => {
    expect(formatHourly(20)).toBe("$20");
    expect(formatHourly(20.5)).toBe("$20.50");
  });
});

describe("income rent pages", () => {
  it("have unique slugs, titles and descriptions", () => {
    for (const key of ["slug", "title", "description"] as const) {
      const values = incomeRentPages.map((page) => page[key]);
      expect(new Set(values).size).toBe(values.length);
    }
  });

  it("are all listed in the sitemap routes", () => {
    const paths = publicRoutes.map((route) => route.path as string);
    for (const page of incomeRentPages) {
      expect(paths).toContain(`/${page.slug}`);
    }
  });

  it("only compare against pages that exist", () => {
    const slugs = incomeRentPages.map((page) => page.slug);
    for (const page of incomeRentPages) {
      for (const slug of page.compareSlugs) {
        expect(slugs).toContain(slug);
      }
    }
  });

  it("quote intro and description figures that match the math", () => {
    for (const page of incomeRentPages) {
      const monthlyGross = annualGrossIncome({ payType: page.payType, amount: page.amount }) / 12;
      for (const rule of rentRules) {
        const figure = formatUSD(rule.maxRent(monthlyGross));
        expect(page.intro).toContain(figure);
        expect(page.description).toContain(figure);
      }
    }
  });
});
