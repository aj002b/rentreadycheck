"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const storageKey = "rentreadycheck-cookie-notice";

export function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsVisible(localStorage.getItem(storageKey) !== "dismissed");
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  function dismissNotice() {
    localStorage.setItem(storageKey, "dismissed");
    setIsVisible(false);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 rounded-xl border border-rule bg-surface px-4 py-4 shadow-card md:flex-row md:items-center md:justify-between">
        <div className="flex gap-3">
          <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 1.75l5 2v3.6c0 3.05-1.95 5.72-5 6.9-3.05-1.18-5-3.85-5-6.9v-3.6l5-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M5.8 8.05l1.35 1.35 3.05-3.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <p className="max-w-3xl text-sm leading-6 text-ink-2">
            RentReadyCheck never sends the amounts you enter. We use cookie-free,
            anonymous analytics to see which pages and tools are used; read the{" "}
            <Link href="/privacy-policy" className="text-link">
              Privacy Policy
            </Link>{" "}
            for details.
          </p>
        </div>
        <button
          type="button"
          onClick={dismissNotice}
          className="btn-primary shrink-0"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
