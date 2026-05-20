import type { Metadata } from "next";
import Link from "next/link";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { PublicPageHero, PublicPageShell } from "@/components/PublicPage";
import { RelatedTools } from "@/components/RelatedTools";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Read the RentReadyCheck disclaimer covering estimates, rental affordability calculators, and advice limitations.",
};

export default function DisclaimerPage() {
  return (
    <PublicPageShell>
      <PublicPageHero title="Disclaimer">
        <p>
          RentReadyCheck provides rough calculator estimates only. The website
          does not decide rental applications and does not provide financial,
          legal, tax, or housing advice.
        </p>
      </PublicPageHero>
      <section className="prose prose-slate max-w-none space-y-8">
        <div>
          <h2>Calculators are estimates only</h2>
          <p>
            The tools use simple example rules such as income multiples of monthly
            rent and rent-to-income percentages. They are designed to help renters
            understand possible affordability questions, not to make decisions for
            a landlord or property manager.
          </p>
        </div>
        <div>
          <h2>No guarantee of approval</h2>
          <p>
            A calculator result does not decide a rental application. Rental
            rules and affordability checks vary by state, landlord, property
            manager, apartment, and individual circumstances.
            Actual decisions can also depend on credit history, employment status,
            savings, co-signers, and application details.
          </p>
        </div>
        <AdPlaceholder />
        <div>
          <h2>Not financial or legal advice</h2>
          <p>
            Nothing on this site is financial advice, legal advice, tax advice,
            or housing advice. You should speak to
            relevant professionals or agencies if you need advice for your
            circumstances.
          </p>
        </div>
        <div>
          <h2>Check directly before applying</h2>
          <p>
            Always check the exact requirements with the landlord or property
            manager. You can use the{" "}
            <Link href="/rent-referencing-calculator">rent affordability calculator</Link>{" "}
            as a starting point, but the final decision belongs to the people
            assessing the application.
          </p>
        </div>
      </section>
      <RelatedTools />
    </PublicPageShell>
  );
}
