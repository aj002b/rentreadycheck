import type { Metadata } from "next";
import Link from "next/link";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { PublicPageHero, PublicPageShell } from "@/components/PublicPage";
import { RelatedTools } from "@/components/RelatedTools";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about RentReadyCheck, a free US-focused rent calculator site for affordability, co-signer income, move-in costs, and roommate rent planning.",
};

export default function AboutPage() {
  return (
    <PublicPageShell>
      <PublicPageHero title="About RentReadyCheck">
        <p>
          RentReadyCheck is a free rent calculator website that helps renters
          estimate apartment affordability, co-signer income, roommate income,
          move-in costs, and rent splits.
        </p>
      </PublicPageHero>
      <section className="prose prose-slate max-w-none space-y-8">
        <div>
          <h2>What the site helps with</h2>
          <p>
            The calculators help estimate rent affordability, co-signer income,
            roommate affordability, upfront move-in costs, and fair rent splits.
            A good place to begin is the{" "}
            <Link href="/rent-referencing-calculator">rent affordability calculator</Link>.
            The site is focused on renters in the United States.
          </p>
        </div>
        <div>
          <h2>What the site does not do</h2>
          <p>
            RentReadyCheck does not provide financial, legal, or housing advice.
            It does not decide whether a landlord or property manager will accept
            an application.
          </p>
        </div>
        <AdPlaceholder />
        <div>
          <h2>Why the tools are estimates</h2>
          <p>
            Landlords and property managers can use different rules. Income is
            only one part of the picture, and individual circumstances matter.
          </p>
        </div>
        <div>
          <h2>Always confirm requirements</h2>
          <p>
            Before applying, ask the landlord or property manager which income
            rule, co-signer requirements, security deposit amount, and documents
            they require.
          </p>
        </div>
      </section>
      <DisclaimerBox />
      <RelatedTools />
    </PublicPageShell>
  );
}
