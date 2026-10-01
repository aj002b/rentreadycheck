import { describe, expect, it } from "vitest";
import {
  calculateQuickReadinessScore,
  calculateReadinessScore,
  getReadinessLabel,
  getScoreImprovements,
  quickScoreAssumptions,
  type ReadinessScoreInput,
} from "@/lib/readinessScore";

const base: ReadinessScoreInput = {
  monthlyRent: 1800,
  annualIncome: 72000,
  savings: 5400,
  monthlyDebt: 250,
  cosigner: "No",
  roommate: "No",
  creditConfidence: "Average",
  moveInTimeframe: "1–3 months",
};

const score = (overrides: Partial<ReadinessScoreInput>) =>
  calculateReadinessScore({ ...base, ...overrides });

describe("getReadinessLabel", () => {
  it("changes label at 50, 70 and 85", () => {
    expect(getReadinessLabel(49)).toBe("High Support Needed");
    expect(getReadinessLabel(50)).toBe("Needs Preparation");
    expect(getReadinessLabel(70)).toBe("Nearly There");
    expect(getReadinessLabel(85)).toBe("Rent Ready");
  });
});

describe("calculateReadinessScore categories", () => {
  it("awards income points by rent multiple", () => {
    const income = (annualIncome: number) => score({ annualIncome }).categories.income.points;
    expect(income(1800 * 3 * 12)).toBe(40);
    expect(income(1800 * 2.5 * 12)).toBe(32);
    expect(income(1800 * 2 * 12)).toBe(22);
    expect(income(1800 * 1.5 * 12)).toBe(12);
    expect(income(1800 * 1.4 * 12)).toBe(5);
  });

  it("awards savings points against three months of rent", () => {
    const savings = (amount: number) => score({ savings: amount }).categories.savings.points;
    expect(savings(5400)).toBe(25);
    expect(savings(5399)).toBe(18);
    expect(savings(3600)).toBe(18);
    expect(savings(1800)).toBe(10);
    expect(savings(1799)).toBe(4);
  });

  it("awards debt points by share of gross monthly income", () => {
    const debt = (monthlyDebt: number) => score({ monthlyDebt }).categories.debt.points;
    expect(debt(600)).toBe(15);
    expect(debt(1200)).toBe(11);
    expect(debt(1800)).toBe(7);
    expect(debt(1801)).toBe(3);
  });

  it("awards support points for a co-signer", () => {
    expect(score({ cosigner: "Yes" }).categories.support.points).toBe(10);
    expect(score({ cosigner: "Not sure" }).categories.support.points).toBe(5);
    expect(score({ cosigner: "No" }).categories.support.points).toBe(0);
  });

  it("sums categories into the total and never exceeds 100", () => {
    const result = score({});
    const total = Object.values(result.categories).reduce((sum, c) => sum + c.points, 0);
    expect(result.score).toBe(total);

    const best = score({
      cosigner: "Yes",
      roommate: "Yes",
      creditConfidence: "Strong",
      moveInTimeframe: "3+ months",
    });
    expect(best.score).toBe(100);
  });
});

describe("calculateReadinessScore outputs", () => {
  it("reports the savings gap and rounds the next step up to $100", () => {
    const result = score({ savings: 4850 });
    expect(result.savingsGap).toBe(550);
    expect(result.topNextStep).toBe("Save $600 more before applying.");
  });

  it("suggests a rent near one third of gross monthly income when income is weakest", () => {
    const result = score({ annualIncome: 36000, cosigner: "Yes", roommate: "Yes" });
    expect(result.weakestCategory).toBe("income");
    expect(result.suggestedRentTarget).toBe(1000);
  });

  it("targets the real shortfall instead of always suggesting a co-signer", () => {
    // Regression: with no co-signer the support category scored 0 and was
    // always "weakest", so every result said to ask about a co-signer.
    expect(score({ savings: 0 }).topNextStep).toBe("Save $5,400 more before applying.");
    expect(score({ annualIncome: 40000 }).topNextStep).toBe(
      "Consider apartments closer to $1,100/month.",
    );
    expect(score({ monthlyDebt: 2500 }).topNextStep).toBe(
      "Reduce monthly debt pressure where possible.",
    );
  });

  it("suggests preparing documents when income, savings and debt are all strong", () => {
    const result = score({ savings: 9000, monthlyDebt: 0 });
    expect(result.topNextStep).toBe("Gather your application documents before applying.");
  });

  it("never makes a co-signer the top next step", () => {
    for (const annualIncome of [20000, 40000, 60000, 90000]) {
      for (const savings of [0, 2000, 6000]) {
        for (const monthlyDebt of [0, 800, 2500]) {
          const result = score({ annualIncome, savings, monthlyDebt });
          expect(result.topNextStep.toLowerCase()).not.toContain("co-signer");
        }
      }
    }
  });

  it("handles zero and invalid input without NaN", () => {
    const result = calculateReadinessScore({
      ...base,
      monthlyRent: 0,
      annualIncome: Number.NaN,
      savings: -100,
      monthlyDebt: 0,
    });
    expect(Number.isFinite(result.score)).toBe(true);
    expect(result.score).toBeGreaterThanOrEqual(0);
  });
});

describe("calculateQuickReadinessScore", () => {
  const quick = {
    monthlyRent: 1800,
    annualIncome: 72000,
    savings: 4800,
    monthlyDebt: 250,
    hasCosigner: false,
  };

  it("matches the full assessment for the same answers", () => {
    // Regression: the homepage used its own formula and showed 82 here,
    // while the full assessment showed 76.
    const full = calculateReadinessScore({
      ...quickScoreAssumptions,
      monthlyRent: quick.monthlyRent,
      annualIncome: quick.annualIncome,
      savings: quick.savings,
      monthlyDebt: quick.monthlyDebt,
      cosigner: "No",
    });
    const result = calculateQuickReadinessScore(quick);
    expect(result.score).toBe(full.score);
    expect(result.score).toBe(76);
    expect(result.label).toBe(full.label);
    expect(result.topNextStep).toBe(full.topNextStep);
  });

  it("applies co-signer and roommate toggles with the full assessment's points", () => {
    const baseScore = calculateQuickReadinessScore(quick).score;
    expect(calculateQuickReadinessScore({ ...quick, hasCosigner: true }).score).toBe(baseScore + 10);
    expect(calculateQuickReadinessScore({ ...quick, hasRoommate: true }).score).toBe(baseScore + 4);
  });
});

describe("getScoreImprovements", () => {
  const find = (overrides: Partial<ReadinessScoreInput>, id: string) =>
    getScoreImprovements({ ...base, ...overrides }).find((item) => item.id === id);

  it("shows the savings needed to reach the next step, with the new score", () => {
    const item = find({ savings: 5000 }, "savings-next");
    expect(item?.action).toBe("Save $400 more");
    expect(item?.gain).toBe(7);
    expect(item?.newScore).toBe(score({ savings: 5000 }).score + 7);
  });

  it("offers both the next milestone and the full buffer when they differ", () => {
    const items = getScoreImprovements({ ...base, savings: 0 });
    expect(items.find((item) => item.id === "savings-next")?.action).toBe("Save $1,800 more");
    expect(items.find((item) => item.id === "savings-full")?.action).toBe("Save $5,400 more");
  });

  it("suggests a rent that reaches the next income step and re-scores savings too", () => {
    const item = find({ annualIncome: 40000, savings: 5000 }, "rent");
    expect(item?.action).toBe("Look at apartments around $1,650/month");
    // Income 12 -> 22 points, and $5,000 now covers three months of $1,650.
    expect(item?.gain).toBe(17);
  });

  it("suggests a debt payment that reaches the next debt step", () => {
    const item = find({ monthlyDebt: 2500 }, "debt");
    expect(item?.action).toBe("Lower monthly debt payments to $1,800 or less");
    expect(item?.gain).toBe(4);
  });

  it("leaves out changes that are already maxed", () => {
    const items = getScoreImprovements({ ...base, savings: 9000, monthlyDebt: 0, cosigner: "Yes" });
    expect(items).toEqual([]);
  });

  it("qualifies the co-signer option and only offers it without one", () => {
    const item = find({}, "cosigner");
    expect(item?.gain).toBe(10);
    expect(item?.detail).toContain("where the landlord accepts co-signers");
    expect(find({ cosigner: "Yes" }, "cosigner")).toBeUndefined();
  });

  it("every suggestion's new score matches a full re-score and is higher", () => {
    for (const annualIncome of [25000, 40000, 60000, 90000]) {
      for (const savings of [0, 2000, 4000, 6000]) {
        for (const monthlyDebt of [0, 600, 1500, 3000]) {
          const input = { ...base, annualIncome, savings, monthlyDebt };
          const baseScore = calculateReadinessScore(input).score;
          for (const item of getScoreImprovements(input)) {
            expect(item.gain).toBeGreaterThan(0);
            expect(item.newScore).toBe(baseScore + item.gain);
            expect(item.newScore).toBeLessThanOrEqual(100);
          }
        }
      }
    }
  });

  it("returns nothing for missing rent or income", () => {
    expect(getScoreImprovements({ ...base, monthlyRent: 0 })).toEqual([]);
    expect(getScoreImprovements({ ...base, annualIncome: 0 })).toEqual([]);
  });
});
