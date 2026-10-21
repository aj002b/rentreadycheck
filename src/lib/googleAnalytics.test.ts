import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";

describe("optional Google Analytics", () => {
  let analytics: typeof import("./googleAnalytics");
  let consent: typeof import("./analyticsConsent");
  let storage: Map<string, string>;
  let scripts: Map<string, { id: string; src: string }>;
  let deletedCookies: string[];
  let location: URL;

  function commands() {
    const data = (window as unknown as { dataLayer?: ArrayLike<unknown>[] }).dataLayer ?? [];
    return data.map((command) => Array.from(command));
  }
  function events(name: string) {
    return commands().filter((command) => command[0] === "event" && command[1] === name);
  }

  beforeEach(async () => {
    vi.resetModules();
    storage = new Map();
    scripts = new Map();
    deletedCookies = [];
    location = new URL("https://rentreadycheck.com/rent-readiness-score/?rent=1800&income=72000&name=Example&utm_source=search#results");
    const target = new EventTarget();
    vi.stubGlobal("window", {
      location,
      localStorage: {
        getItem: (key: string) => storage.get(key) ?? null,
        setItem: (key: string, value: string) => storage.set(key, value),
      },
      dispatchEvent: target.dispatchEvent.bind(target),
      addEventListener: target.addEventListener.bind(target),
      removeEventListener: target.removeEventListener.bind(target),
    });
    vi.stubGlobal("document", {
      title: "Rent Readiness Score | RentReadyCheck",
      referrer: "https://example.com/article?email=someone@example.com#personal",
      getElementById: (id: string) => scripts.get(id) ?? null,
      createElement: () => ({ id: "", src: "", async: false }),
      head: { appendChild: (script: { id: string; src: string }) => scripts.set(script.id, script) },
      set cookie(value: string) { deletedCookies.push(value); },
    });
    analytics = await import("./googleAnalytics");
    consent = await import("./analyticsConsent");
  });
  afterEach(() => vi.unstubAllGlobals());

  it("does not load Google or queue events before permission, including legacy notice dismissal", () => {
    storage.set("rentreadycheck-cookie-notice", "dismissed");
    analytics.trackGooglePageView();
    analytics.trackGoogleAnalyticsEvent("calculator_used", { calculator_name: "Rent Readiness Score" });
    expect(consent.getAnalyticsConsent()).toBeNull();
    expect(scripts.size).toBe(0);
    expect(commands()).toEqual([]);
  });

  it("remembers a rejection and keeps collection off", () => {
    analytics.setGoogleAnalyticsConsent("denied");
    analytics.trackGooglePageView();
    expect(storage.get(consent.analyticsConsentKey)).toBe("denied");
    expect(scripts.size).toBe(0);
    expect(events("page_view")).toEqual([]);
  });

  it("loads one tag only after consent, with advertising off and sanitised page/referrer URLs", () => {
    analytics.setGoogleAnalyticsConsent("granted");
    analytics.trackGooglePageView();
    analytics.trackGooglePageView();
    expect(scripts.size).toBe(1);
    expect([...scripts.values()][0].src).toBe(`https://www.googletagmanager.com/gtag/js?id=${analytics.googleAnalyticsId}`);
    expect(commands()[0]).toEqual(["consent", "default", expect.objectContaining({ analytics_storage: "denied", ad_storage: "denied" })]);
    expect(commands().find((command) => command[0] === "config")?.[2]).toMatchObject({
      send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false,
    });
    expect(events("page_view")).toHaveLength(1);
    expect(events("page_view")[0][2]).toMatchObject({
      page_location: "https://rentreadycheck.com/rent-readiness-score/?utm_source=search",
      page_referrer: "https://example.com/article",
    });
    expect(JSON.stringify(commands())).not.toMatch(/72000|1800|someone@example|#personal|name=Example/);
  });

  it("measures route changes once without treating changes to entered-value query strings as views", () => {
    analytics.setGoogleAnalyticsConsent("granted");
    analytics.trackGooglePageView();
    location.searchParams.set("income", "90000");
    analytics.trackGooglePageView();
    expect(events("page_view")).toHaveLength(1);
    location.pathname = "/rent-split-calculator/";
    analytics.trackGooglePageView();
    analytics.trackGooglePageView();
    expect(events("page_view")).toHaveLength(2);
    expect(events("page_view")[1][2]).toMatchObject({ page_location: "https://rentreadycheck.com/rent-split-calculator/?utm_source=search" });
  });

  it("forwards active use without result categories, financial fields or arbitrary events", () => {
    analytics.setGoogleAnalyticsConsent("granted");
    analytics.trackGoogleAnalyticsEvent("calculator_used", {
      calculator_name: "Rent Readiness Score", income: 72000, result_signal: "Strong signal",
    } as { calculator_name: string });
    analytics.trackGoogleAnalyticsEvent("calculator_result_view");
    analytics.trackGoogleAnalyticsEvent("income_entered");
    expect(events("calculator_used")).toHaveLength(1);
    expect(events("calculator_used")[0][2]).toMatchObject({ calculator_name: "Rent Readiness Score", page_path: "/rent-readiness-score/" });
    expect(events("calculator_used")[0][2]).not.toHaveProperty("income");
    expect(events("calculator_used")[0][2]).not.toHaveProperty("result_signal");
    expect(events("calculator_result_view")).toEqual([]);
    expect(events("income_entered")).toEqual([]);
  });

  it("stops immediately on withdrawal, clears only GA cookies and supports allowing again", () => {
    analytics.setGoogleAnalyticsConsent("granted");
    analytics.trackGooglePageView();
    analytics.setGoogleAnalyticsConsent("denied");
    const countAfterWithdrawal = commands().length;
    analytics.trackGoogleAnalyticsEvent("calculator_used");
    analytics.trackGooglePageView();
    expect(commands()).toHaveLength(countAfterWithdrawal);
    expect((window as unknown as Record<string, unknown>)[`ga-disable-${analytics.googleAnalyticsId}`]).toBe(true);
    expect(deletedCookies).toHaveLength(4);
    expect(deletedCookies.every((cookie) => cookie.startsWith("_ga=") || cookie.startsWith("_ga_DL5BRPJLFV="))).toBe(true);
    analytics.setGoogleAnalyticsConsent("granted");
    analytics.trackGooglePageView();
    expect(scripts.size).toBe(1);
    expect(events("page_view")).toHaveLength(2);
    expect((window as unknown as Record<string, unknown>)[`ga-disable-${analytics.googleAnalyticsId}`]).toBe(false);
  });

  it("does not send preview or local testing traffic to the production property", () => {
    location.hostname = "localhost";
    analytics.setGoogleAnalyticsConsent("granted");
    analytics.trackGooglePageView();
    analytics.trackGoogleAnalyticsEvent("calculator_used");
    expect(scripts.size).toBe(0);
    expect(commands()).toEqual([]);
  });

  it("works for the current tab when browser storage is blocked", () => {
    vi.spyOn(window.localStorage, "setItem").mockImplementation(() => { throw new Error("Storage blocked"); });
    analytics.setGoogleAnalyticsConsent("granted");
    analytics.trackGooglePageView();
    expect(consent.getAnalyticsConsent()).toBe("granted");
    expect(events("page_view")).toHaveLength(1);
    analytics.setGoogleAnalyticsConsent("denied");
    expect(consent.getAnalyticsConsent()).toBe("denied");
  });
});
