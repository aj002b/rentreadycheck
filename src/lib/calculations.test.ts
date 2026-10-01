import { describe, expect, it } from "vitest";
import {
  calculateRentPercentage,
  getCountryAffordabilityResult,
  getRoommateThresholdResult,
  hasNegativeValue,
  safeNumber,
  splitRentByWeights,
} from "@/lib/calculations";
import { getCountryConfig } from "@/lib/countries";

describe("safeNumber", () => {
  it("parses numeric strings and passes numbers through", () => {
    expect(safeNumber("1500")).toBe(1500);
    expect(safeNumber(42)).toBe(42);
  });

  it("returns 0 for empty, missing or non-numeric input", () => {
    expect(safeNumber("")).toBe(0);
    expect(safeNumber(undefined)).toBe(0);
    expect(safeNumber(null)).toBe(0);
    expect(safeNumber("abc")).toBe(0);
  });
});

describe("hasNegativeValue", () => {
  it("detects a negative among strings and numbers", () => {
    expect(hasNegativeValue(["100", "-1"])).toBe(true);
    expect(hasNegativeValue(["100", 0, ""])).toBe(false);
  });
});

describe("calculateRentPercentage", () => {
  it("returns rent as a percentage of gross monthly income", () => {
    expect(calculateRentPercentage(1500, 60000)).toBe(30);
  });

  it("returns 0 when income is zero", () => {
    expect(calculateRentPercentage(1500, 0)).toBe(0);
  });
});

describe("getCountryAffordabilityResult (US)", () => {
  const us = getCountryConfig("US");
  const title = (rent: number, income: number, support = 0) =>
    getCountryAffordabilityResult(us, rent, "monthly", income, support).title;

  it("is a strong signal at exactly 3x rent", () => {
    expect(title(2000, 72000)).toBe("Strong signal");
  });

  it("is a possible signal between 2.5x and 3x", () => {
    expect(title(2000, 60000)).toBe("Possible signal");
    expect(title(2000, 71999)).toBe("Possible signal");
  });

  it("suggests a co-signer may help when only the co-signer meets 3x", () => {
    expect(title(2000, 40000, 72000)).toBe("Co-signer may help");
  });

  it("falls back to may need support below 2.5x with no co-signer", () => {
    expect(title(2000, 59999)).toBe("May need support");
  });
});

describe("getRoommateThresholdResult", () => {
  it("follows the selected threshold instead of a fixed 3x", () => {
    // Regression: $72k on $2,000 rent used to read "Strong signal" at 3.5x
    // while the figures showed it $12,000 short.
    expect(getRoommateThresholdResult(2000, 72000, 3.5).title).toBe("Possible signal");
    expect(getRoommateThresholdResult(2000, 72000, 3).title).toBe("Strong signal");
    expect(getRoommateThresholdResult(2000, 72000, 2.5).title).toBe("Strong signal");
  });

  it("is a strong signal at exactly the selected threshold", () => {
    expect(getRoommateThresholdResult(2000, 84000, 3.5).title).toBe("Strong signal");
    expect(getRoommateThresholdResult(2000, 83999, 3.5).title).toBe("Possible signal");
  });

  it("needs support below 2.5x whatever threshold is selected", () => {
    expect(getRoommateThresholdResult(2000, 59999, 3).title).toBe("May need support");
    expect(getRoommateThresholdResult(2000, 59999, 2.5).title).toBe("May need support");
  });

  it("names the selected threshold in the description", () => {
    expect(getRoommateThresholdResult(2000, 50000, 3.5).description).toContain("3.5x monthly rent");
  });
});

describe("splitRentByWeights", () => {
  const sum = (values: number[]) => values.reduce((total, value) => total + value, 0);

  it("splits evenly when the rent divides cleanly", () => {
    expect(splitRentByWeights(1800, [1, 1])).toEqual([900, 900]);
  });

  it("always adds up to the rent when it does not divide cleanly", () => {
    // Regression: three equal shares of $1,000 displayed as $333 each ($999).
    const shares = splitRentByWeights(1000, [1, 1, 1]);
    expect(shares).toEqual([334, 333, 333]);
    expect(sum(shares)).toBe(1000);
  });

  it("splits in proportion to income or room weights", () => {
    expect(splitRentByWeights(2000, [60000, 40000])).toEqual([1200, 800]);
    const shares = splitRentByWeights(2150, [1.5, 1.25, 1]);
    expect(sum(shares)).toBe(2150);
    expect(shares[0]).toBeGreaterThan(shares[1]);
    expect(shares[1]).toBeGreaterThan(shares[2]);
  });

  it("adds up for every rent and group size", () => {
    for (const rent of [999, 1000, 1234, 2501, 3333]) {
      for (const weights of [[1, 1], [1, 1, 1], [1, 1, 1, 1], [3, 2, 2], [52000, 48000, 31000, 75500]]) {
        expect(sum(splitRentByWeights(rent, weights))).toBe(rent);
      }
    }
  });

  it("returns zero shares for no rent or no weights", () => {
    expect(splitRentByWeights(0, [1, 1])).toEqual([0, 0]);
    expect(splitRentByWeights(1500, [0, 0])).toEqual([0, 0]);
  });
});
