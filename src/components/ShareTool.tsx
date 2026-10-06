"use client";

import { useState } from "react";
import { trackRentReadyEvent } from "@/lib/analytics";
import { toolShareUrl } from "@/lib/trafficUrls";

export function ShareTool() {
  const [status, setStatus] = useState("");
  const [manualUrl, setManualUrl] = useState("");

  async function copyLink() {
    const url = toolShareUrl(window.location.href);
    setStatus("");
    setManualUrl("");
    try {
      await navigator.clipboard.writeText(url);
      trackRentReadyEvent("tool_share", { share_method: "copy" });
      setStatus("Link copied. You can paste it into a message.");
    } catch {
      setManualUrl(url);
      setStatus("Copy the tool link below.");
    }
  }

  async function share() {
    // Share the public tool, never income, savings, names, or query inputs.
    const url = toolShareUrl(window.location.href);
    const title = document.title;
    setStatus("");
    setManualUrl("");

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        trackRentReadyEvent("tool_share", { share_method: "native" });
        setStatus("Tool shared.");
        return;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
      }
    }

    await copyLink();
  }

  return (
    <div className="rounded-xl border border-rule bg-white p-4">
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={share} className="chip-link">Share this tool</button>
        <button type="button" onClick={copyLink} className="chip-link">Copy tool link</button>
      </div>
      <p className="mt-2 text-xs leading-5 text-muted">The link includes the tool only, without your inputs.</p>
      <p role="status" className="mt-1 text-sm text-ink-2">{status}</p>
      {manualUrl ? (
        <input aria-label="Tool link to copy" className="field-control mt-2" readOnly value={manualUrl} onFocus={(event) => event.currentTarget.select()} />
      ) : null}
    </div>
  );
}
