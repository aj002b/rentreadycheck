import type { Metadata } from "next";
import Link from "next/link";
import { PublicPageHero, PublicPageShell } from "@/components/PublicPage";

export const metadata: Metadata = {
  title: "How Our Rent Calculators and Readiness Score Work",
  description: "See RentReadyCheck's income formulas, moving-cost assumptions, rent split methods, and the weights used in its planning score.",
};

export default function MethodologyPage() {
  return (
    <PublicPageShell>
      <PublicPageHero title="How we calculate your estimates">
        <p>Our calculators use the numbers you enter and the formulas below. The Rent Readiness Score is our own planning model; it is not a credit score or a prediction of rental approval.</p>
      </PublicPageHero>
      <div className="space-y-10 leading-7 text-ink-2">
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-ink">Income and rent comparisons</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Gross monthly income = annual income ÷ 12.</li>
            <li>Hourly annual income = hourly pay × hours per week × paid weeks per year. The hourly examples start with 40 hours and 52 paid weeks; you can change them.</li>
            <li>At 3x monthly rent, required monthly income = rent × 3, and required annual income = rent × 36. The 2.5x and 3.5x examples use the same calculation with those multiples.</li>
            <li>The 30% housing-cost comparison = gross monthly income × 0.30. It covers rent and utilities together, so separately paid utilities reduce the amount available for rent.</li>
          </ul>
          <p>Screening requirements belong to the property manager. The <a href="https://www.apartments.com/rental-manager/resources/screening/landlords-guide-tenant-screening" className="text-link">Apartments.com tenant screening guide</a> describes a three-times-rent income example. <a href="https://www.huduser.gov/portal/datasets/cp/CHAS/bg_chas.html" className="text-link">HUD&apos;s cost-burden definition</a> includes utilities in housing costs. Neither source validates our readiness score.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-ink">Move-in costs and savings</h2>
          <p>The move-in calculator adds the deposit, first rent payment if selected, last month&apos;s rent if selected, entered fees, moving and setup costs, and the emergency buffer you choose. Savings gap = the larger of total costs minus current savings, or zero. A surplus is current savings minus costs, when positive.</p>
          <p>There is no assumed deposit amount in the standalone calculator. The worked moving-out guide uses clearly labeled example costs. Confirm actual amounts, payment dates, and local requirements before relying on a budget.</p>
          <p>The readiness score uses a separate, simpler savings comparison of three months&apos; rent. That is an assumption in our model, not a quote for your move or a requirement from a landlord. Use the <Link href="/move-in-cost-calculator/" className="text-link">detailed move-in calculator</Link> for actual line items.</p>
          <a href="/renter-move-in-checklist.txt" download className="text-link">Download the move-in planning checklist</a>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-ink">Roommate rent splits</h2>
          <p>Equal splits divide rent by the number of roommates. Income-based splits allocate rent according to each person&apos;s share of combined income. Room-size splits use each room&apos;s share of the total scores you enter. Whole-dollar shares are rounded and adjusted so they add up to the rounded rent total. The method is an option for discussion; roommates choose their agreement.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-ink">How the Rent Readiness Score is weighted</h2>
          <p>The score adds five categories and is capped at 100. Income and savings points use the highest threshold met. These weights and thresholds are choices made for this site. The score has not been calibrated against landlord decisions.</p>
          <div className="overflow-x-auto rounded-xl border border-rule">
            <table className="w-full min-w-[34rem] text-left text-sm">
              <caption className="sr-only">Readiness score categories and point thresholds</caption>
              <thead className="bg-paper"><tr><th scope="col" className="p-4">Category</th><th scope="col" className="p-4">Maximum</th><th scope="col" className="p-4">Points awarded</th></tr></thead>
              <tbody className="divide-y divide-rule">
                <tr><th scope="row" className="p-4">Income vs rent</th><td className="p-4">40</td><td className="p-4">Monthly income / rent: 3x or more = 40; 2.5x = 32; 2x = 22; 1.5x = 12; below 1.5x = 5.</td></tr>
                <tr><th scope="row" className="p-4">Savings</th><td className="p-4">25</td><td className="p-4">At least three months&apos; rent = 25; two months = 18; one month = 10; below one month = 4.</td></tr>
                <tr><th scope="row" className="p-4">Monthly debt</th><td className="p-4">15</td><td className="p-4">Debt / gross monthly income: up to 10% = 15; up to 20% = 11; up to 30% = 7; above 30% = 3.</td></tr>
                <tr><th scope="row" className="p-4">Co-signer support</th><td className="p-4">10</td><td className="p-4">Yes = 10; not sure = 5; no = 0.</td></tr>
                <tr><th scope="row" className="p-4">Other planning factors</th><td className="p-4">10</td><td className="p-4">Roommate: yes = 4, not sure = 2, no = 0. Self-reported credit: strong = 4, average = 2, prefer not to say = 1, limited or rebuilding = 0. Timeframe: 3+ months or exploring = 2, 1–3 months = 1, this month = 0.</td></tr>
              </tbody>
            </table>
          </div>
          <p>Labels are “Rent Ready” at 85–100, “Nearly There” at 70–84, “Needs Preparation” at 50–69, and “High Support Needed” below 50. A high score does not establish approval or that rent fits your take-home budget.</p>
          <p>The homepage quick score assumes no roommate, average credit confidence, and a move in 1–3 months. Change those in the <Link href="/rent-readiness-score/" className="text-link">full assessment</Link>.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-ink">Who maintains the calculations</h2>
          <p>RentReadyCheck is maintained by the developer behind <a href="https://github.com/aj002b/rentreadycheck" className="text-link">the public aj002b/rentreadycheck project</a>. Calculation logic and automated tests can be inspected there. Send corrections to <a href="mailto:hello@rentreadycheck.com" className="text-link">hello@rentreadycheck.com</a>, including the tool, example inputs, and expected result.</p>
          <p>Reviewed 7 October 2026. Monetary examples generally round to whole dollars; calculations use unrounded figures where available.</p>
        </section>
      </div>
    </PublicPageShell>
  );
}
