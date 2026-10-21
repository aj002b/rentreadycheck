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
    <section aria-label="Analytics preferences" className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 rounded-xl border border-rule bg-surface px-4 py-4 shadow-card md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-bold text-ink">Your analytics choice</p>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-ink-2">
            Your calculator amounts stay in your browser. We use cookie-free Vercel Analytics for visits.
            With your permission, Google Analytics uses cookies to measure pages and calculator use.{" "}
            <Link href="/privacy-policy/" className="text-link">Privacy Policy</Link>.
            You can change your choice in Privacy settings.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button type="button" onClick={() => choose("denied")} className="btn-secondary">No thanks</button>
          <button type="button" onClick={() => choose("granted")} className="btn-secondary">Allow Google Analytics</button>
        </div>
      </div>
    </section>
  );
}
