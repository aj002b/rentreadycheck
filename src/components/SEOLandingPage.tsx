import Link from "next/link";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { FAQJsonLd } from "@/components/FAQJsonLd";
import { FAQSection } from "@/components/FAQSection";
import { RelatedTools } from "@/components/RelatedTools";
import { RentReferencingCalculator } from "@/components/calculators/RentReferencingCalculator";
import { MoveInCostCalculator } from "@/components/calculators/MoveInCostCalculator";
import { CalculationSources } from "@/components/CalculationSources";
import type { SEOLandingPage } from "@/lib/seoLandingPages";
import { estimateDisclaimer } from "@/lib/site";

export function SEOLandingPageView({ page }: { page: SEOLandingPage }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: page.h1, href: `/${page.slug}` },
        ]}
      />
      <FAQJsonLd items={page.faqs} />
      <div className="site-container space-y-12 pb-14">
        <section className="page-band grid gap-8 py-10 md:grid-cols-[1fr_0.62fr] md:items-center md:gap-12 md:py-14">
          <div>
            <p className="text-sm font-medium text-muted">Rent guide</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-[1.06] tracking-[-0.035em] text-ink md:text-[3.25rem]">
              {page.h1}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-ink-2">
              {page.intro}
            </p>
            <div className="mt-6">
              <Link href={page.primaryLink.href} className="btn-primary">
                {page.primaryLink.label}
              </Link>
            </div>
          </div>
          <div className="form-card p-6">
            <h2 className="text-lg font-bold text-ink">Quick examples</h2>
            <dl className="mt-3">
              {page.highlights.map((item) => (
                <div key={item.label} className="border-t border-rule py-3 last:pb-0">
                  <dt className="text-sm text-muted">{item.label}</dt>
                  <dd className="mt-0.5 font-bold text-ink">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {page.rentAmount !== undefined ? (
          <section id="calculator" className="scroll-mt-24 space-y-5" aria-labelledby="calculator-heading">
            <h2 id="calculator-heading" className="text-2xl font-bold text-ink">Check your income against this rent</h2>
            <p className="text-ink-2">The rent is filled in as an example. Enter your annual income before tax to see your own comparison.</p>
            <RentReferencingCalculator initialRent={String(page.rentAmount)} />
          </section>
        ) : null}
        {page.moveInExample ? (
          <section id="calculator" className="scroll-mt-24 space-y-5" aria-labelledby="calculator-heading">
            <h2 id="calculator-heading" className="text-2xl font-bold text-ink">Edit the example to build your savings target</h2>
            <p className="text-ink-2">These are hypothetical costs. Replace them with your listing, moving quotes, and the savings buffer you want to keep.</p>
            <MoveInCostCalculator defaults={{ monthlyRent: "1200", securityDeposit: "1200", movingCost: "300", utilitySetup: "150", furnitureBasics: "400", emergencyBuffer: "1000" }} />
            <a className="text-link" href="/renter-move-in-checklist.txt" download>Download the move-in planning checklist</a>
          </section>
        ) : null}

        <section className="grid gap-10 lg:grid-cols-[1fr_19rem] lg:gap-16">
          <article className="min-w-0">
            <div className="prose prose-slate max-w-none">
              {page.comparisonRows?.length ? (
                <section className="not-prose premium-card mb-10 overflow-hidden">
                  <div className="border-b border-rule px-4 py-4 md:px-5">
                    <h2 className="text-xl font-bold text-ink">
                      Example comparison
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      These figures are rough examples only. Use the full
                      calculator for your own rent, income, and situation.
                    </p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[42rem] text-left text-sm">
                      <thead className="text-muted">
                        <tr>
                          <th className="px-4 py-3 font-semibold md:px-5">
                            Example
                          </th>
                          <th className="px-4 py-3 font-semibold md:px-5">
                            Estimate
                          </th>
                          <th className="px-4 py-3 font-semibold md:px-5">
                            Note
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-rule border-t border-rule [font-variant-numeric:tabular-nums]">
                        {page.comparisonRows.map((row) => (
                          <tr key={row.label}>
                            <td className="px-4 py-3 font-semibold text-ink md:px-5">
                              {row.label}
                            </td>
                            <td className="px-4 py-3 text-ink-2 md:px-5">
                              {row.value}
                            </td>
                            <td className="px-4 py-3 text-muted md:px-5">
                              {row.note}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              ) : null}
              {page.sections.map((section) => (
                <section key={section.heading} className="not-prose mb-9 last:mb-0">
                  <h2 className="text-2xl font-bold text-ink">
                    {section.heading}
                  </h2>
                  <p className="mt-3 max-w-[66ch] leading-7 text-ink-2">{section.body}</p>
                </section>
              ))}
            </div>
            <div className="mt-10 rounded-xl bg-accent-soft p-5">
              <h2 className="text-xl font-bold text-ink">
                Helpful next step
              </h2>
              <p className="mt-2 leading-7 text-ink-2">
                For your own numbers, use the{" "}
                <Link
                  href={page.primaryLink.href}
                  className="text-link"
                >
                  relevant RentReadyCheck calculator
                </Link>
                . It can show rough estimates and keeps everything in
                your browser.
              </p>
            </div>
            {page.relatedLinks?.length ? (
              <div className="mt-8">
                <h2 className="text-lg font-bold text-ink">
                  Related guides
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {page.relatedLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="chip-link"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </article>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <DisclaimerBox>{estimateDisclaimer}</DisclaimerBox>
            <AdPlaceholder />
          </aside>
        </section>

        {page.rentAmount !== undefined ? <CalculationSources housingCosts /> : null}
        {page.moveInExample ? <p className="text-sm text-muted">The worked budget is an illustrative example created by RentReadyCheck. <Link href="/how-we-calculate/" className="text-link">See how move-in totals are calculated</Link>. Reviewed 7 October 2026.</p> : null}
        <FAQSection items={page.faqs} />
        <RelatedTools />
      </div>
    </>
  );
}
