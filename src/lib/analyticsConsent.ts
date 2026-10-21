import { useSyncExternalStore } from "react";

export const analyticsConsentKey = "rentreadycheck-analytics-consent-v1";
export const analyticsPreferencesEvent = "rentreadycheck:analytics-preferences";
const changeEvent = "rentreadycheck:analytics-consent";
export type AnalyticsConsent = "granted" | "denied" | null;
let sessionChoice: AnalyticsConsent | undefined;

export function getAnalyticsConsent(): AnalyticsConsent {
  if (typeof window === "undefined") return null;
  if (sessionChoice !== undefined) return sessionChoice;
  try {
    const stored = window.localStorage.getItem(analyticsConsentKey);
    return stored === "granted" || stored === "denied" ? stored : null;
  } catch {
    return null;
  }
}

export function saveAnalyticsConsent(choice: Exclude<AnalyticsConsent, null>) {
  sessionChoice = choice;
  try {
    window.localStorage.setItem(analyticsConsentKey, choice);
  } catch {
    // The choice still applies for this tab when storage is unavailable.
  }
  window.dispatchEvent(new Event(changeEvent));
}

function subscribe(listener: () => void) {
  function onStorage(event: StorageEvent) {
    if (event.key === analyticsConsentKey || event.key === null) {
      sessionChoice = undefined;
      listener();
    }
  }
  window.addEventListener(changeEvent, listener);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(changeEvent, listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useAnalyticsConsent() {
  return useSyncExternalStore<AnalyticsConsent | undefined>(subscribe, getAnalyticsConsent, () => undefined);
}
