"use client";

import Link from "next/link";
import { trackRentReadyEvent } from "@/lib/analytics";

type CalculatorCardProps = {
  title: string;
  description: string;
  href: string;
  bestFor?: string;
  ctaLabel?: string;
};

export function CalculatorCard({
  title,
  description,
  href,
  bestFor,
  ctaLabel,
}: CalculatorCardProps) {
  const isCalculator = href.includes("calculator");
  const label = ctaLabel ?? (isCalculator ? "Open calculator" : "Open tool");

  return (
    <Link
      href={href}
      onClick={() => {
        trackRentReadyEvent("calculator_card_click", {
          calculator_name: title,
        });
      }}
      className="premium-card group flex h-full flex-col gap-2 p-5 transition hover:border-accent"
    >
      <h3 className="text-[1.08rem] font-bold leading-snug text-ink group-hover:text-accent">
        {title}
      </h3>
      <p className="text-sm leading-6 text-muted">{description}</p>
      {bestFor ? (
        <p className="text-sm leading-6 text-muted">
          <span className="font-semibold text-ink">Best for:</span> {bestFor}
        </p>
      ) : null}
      <span className="mt-auto pt-2 text-sm font-semibold text-accent">{label} →</span>
    </Link>
  );
}
