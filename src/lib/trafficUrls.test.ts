import { describe, expect, it } from "vitest";
import { analyticsUrl, toolShareUrl } from "./trafficUrls";

describe("traffic URL privacy", () => {
  it("removes financial inputs, names and fragments from analytics URLs", () => {
    expect(analyticsUrl("https://rentreadycheck.com/rent-referencing-calculator/?rent=1500&income=54000&name=Test+Person&email=test@example.com#results"))
      .toBe("https://rentreadycheck.com/rent-referencing-calculator/");
  });

  it("retains campaign labels while removing calculator parameters", () => {
    expect(analyticsUrl("https://rentreadycheck.com/?utm_source=instagram&utm_medium=social&utm_campaign=move_in_01&income=54000"))
      .toBe("https://rentreadycheck.com/?utm_source=instagram&utm_medium=social&utm_campaign=move_in_01");
  });

  it("drops malformed URLs and free-text campaign values", () => {
    expect(analyticsUrl("not a URL")).toBeNull();
    expect(analyticsUrl("https://rentreadycheck.com/?utm_source=test%40example.com"))
      .toBe("https://rentreadycheck.com/");
  });

  it("shares the production tool without any entered values or preview hostname", () => {
    expect(toolShareUrl("http://localhost:3000/rent-referencing-calculator/?rent=1500&income=54000#results"))
      .toBe("https://rentreadycheck.com/rent-referencing-calculator/?utm_source=share&utm_medium=referral&utm_campaign=tool_share");
  });
});
