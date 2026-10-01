import { describe, expect, it } from "vitest";
import {
  calculateRentPercentage,
  getCountryAffordabilityResult,
  getRoommateThresholdResult,
  hasNegativeValue,
  safeNumber,
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
