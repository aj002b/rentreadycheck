import type { CountryCode } from "@/lib/countries";

export function getCountryFromQueryParam(value: string | null): CountryCode | null {
  const normalized = value?.trim().toLowerCase();

  if (!normalized) {
    return null;
  }

  return ["us", "usa", "united-states"].includes(normalized) ? "US" : null;
}

export function getCountryFromLocale(locale: string): CountryCode {
  const region = locale
    .split("-")
    .at(-1)
    ?.trim()
    .toUpperCase();

  return region === "US" ? "US" : "US";
}

export function getDetectedCountry(): CountryCode {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return "US";
  }

  const browserLanguages =
    navigator.languages && navigator.languages.length > 0
      ? navigator.languages
      : [navigator.language];

  return getCountryFromLocale(browserLanguages[0] ?? "en-US");
}
