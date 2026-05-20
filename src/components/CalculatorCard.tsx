import Link from "next/link";

type CalculatorCardProps = {
  title: string;
  description: string;
  href: string;
  badge?: string;
  bestFor?: string;
  ctaLabel?: string;
};

export function CalculatorCard({
  title,
  description,
  href,
  badge,
  bestFor,
  ctaLabel,
}: CalculatorCardProps) {
  const isCalculator = href.includes("calculator");
  const label = ctaLabel ?? (isCalculator ? "Open calculator" : "Open tool");

  return (
    <Link
      href={href}
      className="premium-card group relative flex h-full min-h-[14.25rem] overflow-hidden p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[#93c5fd] hover:shadow-[0_18px_42px_rgba(37,99,235,0.16)] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-4 sm:p-6"
    >
      <span className="absolute right-4 top-4 h-12 w-12 rounded-full bg-[#dbeafe]/80 blur-xl transition group-hover:bg-[#bfdbfe]" />
      <div className="relative flex min-h-full w-full flex-col gap-4">
        <div className="flex items-start gap-4">
          {badge ? (
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#bdd3f5] bg-[#eff6ff] text-sm font-extrabold text-[#2563eb] transition group-hover:border-[#2563eb] group-hover:bg-[#dbeafe]">
              {badge}
            </span>
          ) : null}
          <div className="min-w-0">
            <h3 className="text-[1.05rem] font-extrabold leading-snug tracking-[-0.018em] text-[#0f1f3a]">
              {title}
            </h3>
          </div>
        </div>
        <p className="text-sm leading-6 text-[#53657f]">
          {description}
        </p>
        {bestFor ? (
          <p className="rounded-xl border border-[#d8e5f7] bg-white/70 px-3 py-2 text-sm leading-5 text-[#53657f]">
            <span className="font-extrabold text-[#0f1f3a]">Best for:</span>{" "}
            {bestFor}
          </p>
        ) : null}
        <div className="mt-auto pt-1">
          <span className="inline-flex h-10 min-w-40 items-center justify-center rounded-full border border-[#bdd3f5] bg-[#eff6ff] px-5 text-center text-sm font-extrabold text-[#1d4ed8] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] transition group-hover:border-[#2563eb] group-hover:bg-[#dbeafe] group-hover:text-[#1e40af] group-focus-visible:border-[#2563eb]">
            {label}
          </span>
        </div>
      </div>
    </Link>
  );
}
