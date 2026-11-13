"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { analyticsPreferencesEvent, useAnalyticsConsent } from "@/lib/analyticsConsent";
import { setGoogleAnalyticsConsent } from "@/lib/googleAnalytics";

export function AnalyticsSettingsButton() {
  return (
    <button type="button" className="app-footer__link"
      onClick={() => window.dispatchEvent(new Event(analyticsPreferencesEvent))}>
      Privacy settings
    </button>
  );
}

export function CookieNotice() {
  const consent = useAnalyticsConsent();
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const open = () => setOpened(true);
    window.addEventListener(analyticsPreferencesEvent, open);
    return () => window.removeEventListener(analyticsPreferencesEvent, open);
  }, []);

  function choose(choice: "granted" | "denied") {
    setGoogleAnalyticsConsent(choice);
    setOpened(false);
  }

  if (consent !== null && !opened) return null;

  return (
    <section aria-label="Analytics preferences" className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 sm:px-6 sm:pb-4">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 rounded-xl border border-rule bg-surface px-4 py-3 shadow-card sm:gap-4 sm:py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="hidden font-bold text-ink sm:block">Your analytics choice</p>
          <p className="max-w-3xl text-xs leading-5 text-ink-2 sm:mt-1 sm:text-sm sm:leading-6">
            <span className="hidden sm:inline">
              Your calculator amounts stay in your browser. We use cookie-free Vercel Analytics for visits.{" "}
            </span>
            With your permission, Google Analytics uses cookies to measure pages and calculator use.{" "}
            <Link href="/privacy-policy/" className="text-link">Privacy Policy</Link>.
            <span className="hidden sm:inline"> You can change your choice in Privacy settings.</span>
          </p>
        </div>
        <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          <button type="button" onClick={() => choose("denied")} className="btn-secondary min-h-[44px] px-3 py-2 text-sm sm:min-h-[46px] sm:px-5 sm:py-3 sm:text-[15px]">No thanks</button>
          <button type="button" onClick={() => choose("granted")} className="btn-secondary min-h-[44px] px-3 py-2 text-sm sm:min-h-[46px] sm:px-5 sm:py-3 sm:text-[15px]">Allow Google Analytics</button>
        </div>
      </div>
    </section>
  );
}
