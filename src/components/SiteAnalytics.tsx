"use client";

import { Analytics } from "@vercel/analytics/next";
import type { BeforeSendEvent } from "@vercel/analytics";
import { analyticsUrl } from "@/lib/trafficUrls";

function beforeSend(event: BeforeSendEvent) {
  const url = analyticsUrl(event.url);
  return url ? { ...event, url } : null;
}

export function SiteAnalytics() {
  return <Analytics beforeSend={beforeSend} />;
}
