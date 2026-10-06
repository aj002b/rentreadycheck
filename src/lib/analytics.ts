"use client";

import { track } from "@vercel/analytics";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CountryCode } from "@/lib/countries";

type AnalyticsProperties = {
  calculator_name?: string;
  selected_country?: CountryCode | string;
  page_path?: string;
  result_signal?: string;
  share_method?: "native" | "copy";
};

export function getPagePath() {
  if (typeof window === "undefined") {
    return "";
  }

  return window.location.pathname;
}

// One use event per mounted calculator, only after an input change or submission
// and a valid estimate is visible. Prefilled examples do not count as usage.
export function useCalculatorEngagementTracking(calculatorName: string, resultReady: boolean) {
  const [interacted, setInteracted] = useState(false);
  const tracked = useRef(false);
  const markInteraction = useCallback(() => setInteracted(true), []);

  useEffect(() => {
    if (!calculatorName || !interacted || !resultReady || tracked.current) return;
    const timer = window.setTimeout(() => {
      trackRentReadyEvent("calculator_used", { calculator_name: calculatorName });
      tracked.current = true;
    }, 600);
    return () => window.clearTimeout(timer);
  }, [calculatorName, interacted, resultReady]);

  return markInteraction;
}

export function trackRentReadyEvent(
  eventName: string,
  properties: AnalyticsProperties = {},
) {
  track(eventName, {
    ...properties,
    page_path: properties.page_path ?? getPagePath(),
  });
}

export function useCalculatorResultTracking({
  calculatorName,
  selectedCountry,
  resultSignal,
  enabled,
}: {
  calculatorName: string;
  selectedCountry: CountryCode | string;
  resultSignal: string;
  enabled: boolean;
}) {
  const lastTrackedKey = useRef("");

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const trackingKey = `${calculatorName}:${selectedCountry}:${resultSignal}`;

    if (lastTrackedKey.current === trackingKey) {
      return;
    }

    lastTrackedKey.current = trackingKey;
    trackRentReadyEvent("calculator_result_view", {
      calculator_name: calculatorName,
      selected_country: selectedCountry,
      result_signal: resultSignal,
    });
  }, [calculatorName, enabled, resultSignal, selectedCountry]);
}
