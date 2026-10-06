import Link from "next/link";

export function CalculationSources({ housingCosts = false }: { housingCosts?: boolean }) {
  return (
    <aside className="rounded-xl border border-rule bg-paper p-5 text-sm leading-6 text-muted">
      <h2 className="font-bold text-ink">Sources and calculation method</h2>
      <p className="mt-2">
        Income multiples are examples of screening policies, not approval rules. See{" "}
        <a className="text-link" href="https://www.apartments.com/rental-manager/resources/screening/landlords-guide-tenant-screening">Apartments.com&apos;s tenant screening guide</a>.
        {housingCosts ? <> The 30% housing-cost comparison includes utilities, following <a className="text-link" href="https://www.huduser.gov/portal/datasets/cp/CHAS/bg_chas.html">HUD&apos;s cost-burden definition</a>.</> : null}
      </p>
      <p className="mt-2">
        <Link href="/how-we-calculate/" className="text-link">Read our formulas and score methodology</Link>. Content reviewed 7 October 2026.
      </p>
    </aside>
  );
}
