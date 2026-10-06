import { siteConfig } from "@/lib/siteConfig";

const campaignKeys = ["utm_source", "utm_medium", "utm_campaign"];

export function analyticsUrl(rawUrl: string): string | null {
  try {
    const url = new URL(rawUrl);
    const campaign = new URLSearchParams();
    for (const key of campaignKeys) {
      const value = url.searchParams.get(key);
      if (value && /^[a-zA-Z0-9_-]{1,80}$/.test(value)) campaign.set(key, value);
    }
    url.search = campaign.toString();
    url.hash = "";
    return url.toString();
  } catch {
    return null;
  }
}

export function toolShareUrl(currentUrl: string): string {
  const current = new URL(currentUrl);
  const url = new URL(current.pathname, siteConfig.domain);
  url.searchParams.set("utm_source", "share");
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", "tool_share");
  return url.toString();
}
