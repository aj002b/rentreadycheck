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
      <div className="mx-auto flex max-w-5xl flex-col gap-3 rounded-2xl border border-[#d8e5f7] bg-white/95 px-4 py-4 font-sans shadow-[0_18px_48px_rgba(15,31,58,0.16)] backdrop-blur md:flex-row md:items-center md:justify-between">
        <div className="flex gap-3">
          <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#bfdbfe] bg-[#eff6ff] text-[#2563eb]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 1.75l5 2v3.6c0 3.05-1.95 5.72-5 6.9-3.05-1.18-5-3.85-5-6.9v-3.6l5-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M5.8 8.05l1.35 1.35 3.05-3.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <p className="max-w-3xl text-sm leading-6 text-[#334155]">
            RentReadyCheck does not intentionally store calculator inputs. We may
            add analytics or advertising cookies in the future; read the{" "}
            <Link href="/privacy-policy" className="font-bold text-[#2563eb] underline underline-offset-2">
              Privacy Policy
            </Link>{" "}
            for details.
          </p>
        </div>
        <button
          type="button"
          onClick={dismissNotice}
          className="min-h-10 shrink-0 rounded-xl bg-[#2563eb] px-5 py-2 text-sm font-bold text-white shadow-[0_10px_22px_rgba(37,99,235,0.25)] transition hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
