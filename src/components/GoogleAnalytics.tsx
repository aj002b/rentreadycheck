"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getAnalyticsConsent, useAnalyticsConsent } from "@/lib/analyticsConsent";
import { disableGoogleAnalytics, trackGooglePageView } from "@/lib/googleAnalytics";

export function GoogleAnalytics() {
  const pathname = usePathname();
  const consent = useAnalyticsConsent();
  useEffect(() => {
    if (consent === "granted") trackGooglePageView();
    else if (getAnalyticsConsent() !== "granted") disableGoogleAnalytics();
  }, [pathname, consent]);
  return null;
}
