import { getAnalyticsConsent, saveAnalyticsConsent, type AnalyticsConsent } from "@/lib/analyticsConsent";
import { analyticsUrl } from "@/lib/trafficUrls";

// Public web-stream identifier, not a credential.
export const googleAnalyticsId = "G-DL5BRPJLFV";
const disableKey = `ga-disable-${googleAnalyticsId}` as const;
const scriptId = "rentreadycheck-google-analytics";
type GoogleWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  [disableKey]?: boolean;
};
let configured = false;
let lastPageView = "";
const deniedConsent = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
};

function canMeasure() {
  return typeof window !== "undefined"
    && window.location.hostname === "rentreadycheck.com"
    && getAnalyticsConsent() === "granted";
}

function pageContext() {
  return {
    page_location: analyticsUrl(window.location.href) ?? window.location.origin,
    page_referrer: document.referrer ? analyticsUrl(document.referrer) ?? "" : "",
    page_title: document.title,
  };
}

function initialise() {
  if (!canMeasure()) return false;
  const target = window as GoogleWindow;
  const wasDisabled = target[disableKey];
  target[disableKey] = false;
  if (configured) {
    if (wasDisabled) {
      target.gtag?.("consent", "update", { ...deniedConsent, analytics_storage: "granted" });
    }
    return true;
  }
  target.dataLayer ??= [];
  target.gtag ??= function () {
    // Google's command queue expects an Arguments object.
    // eslint-disable-next-line prefer-rest-params
    target.dataLayer!.push(arguments);
  };
  target.gtag("consent", "default", deniedConsent);
  target.gtag("consent", "update", { ...deniedConsent, analytics_storage: "granted" });
  target.gtag("js", new Date());
  target.gtag("set", pageContext());
  target.gtag("config", googleAnalyticsId, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_domain: window.location.hostname,
    cookie_flags: "SameSite=Lax;Secure",
  });
  if (!document.getElementById(scriptId)) {
    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
    document.head.appendChild(script);
  }
  configured = true;
  return true;
}

export function disableGoogleAnalytics() {
  if (typeof window === "undefined") return;
  const target = window as GoogleWindow;
  target[disableKey] = true;
  target.gtag?.("consent", "update", deniedConsent);
  lastPageView = "";
  // Only remove cookies belonging to this site's Google Analytics stream.
  for (const name of ["_ga", `_ga_${googleAnalyticsId.slice(2)}`]) {
    for (const domain of ["", `; Domain=${window.location.hostname}`]) {
      document.cookie = `${name}=; Max-Age=0; Path=/${domain}; SameSite=Lax; Secure`;
    }
  }
}

export function setGoogleAnalyticsConsent(choice: Exclude<AnalyticsConsent, null>) {
  if (choice === "denied") disableGoogleAnalytics();
  saveAnalyticsConsent(choice);
  if (choice === "granted" && configured) {
    const target = window as GoogleWindow;
    target[disableKey] = false;
    target.gtag?.("consent", "update", { ...deniedConsent, analytics_storage: "granted" });
  }
}

export function trackGooglePageView() {
  if (!initialise()) return;
  const target = window as GoogleWindow;
  const context = pageContext();
  if (lastPageView === context.page_location) return;
  lastPageView = context.page_location;
  // Keep automatic engagement events on the same sanitised URL as manual events.
  target.gtag?.("set", context);
  target.gtag?.("event", "page_view", { ...context, send_to: googleAnalyticsId });
}

export function trackGoogleAnalyticsEvent(eventName: string, properties: {
  calculator_name?: string;
  share_method?: string;
} = {}) {
  // Result categories and entered financial values are never forwarded to Google.
  if (!["calculator_used", "calculator_card_click", "tool_share"].includes(eventName)) return;
  if (!canMeasure()) return;
  trackGooglePageView();
  const parameters: Record<string, string> = {
    ...pageContext(),
    page_path: window.location.pathname,
    send_to: googleAnalyticsId,
  };
  if (properties.calculator_name) parameters.calculator_name = properties.calculator_name;
  if (properties.share_method === "native" || properties.share_method === "copy") {
    parameters.share_method = properties.share_method;
  }
  (window as GoogleWindow).gtag?.("event", eventName, parameters);
}
