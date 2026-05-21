import type { Metadata } from "next";
import Link from "next/link";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { FAQJsonLd } from "@/components/FAQJsonLd";
import { FAQSection } from "@/components/FAQSection";
import { PublicPageHero, PublicPageShell } from "@/components/PublicPage";
import { MoveInCostCalculator } from "@/components/calculators/MoveInCostCalculator";
import type { FAQItem } from "@/lib/site";

export const metadata: Metadata = {
  title: "Move-In Cost Calculator for Apartment Renters | RentReadyCheck",
  description:
    "Estimate apartment move-in costs including security deposit, first month’s rent, fees, moving costs, utilities, furniture, and savings gap.",
};

const faqs: FAQItem[] = [
  { question: "What costs do renters usually pay before moving in?", answer: "Common upfront costs include a security deposit, first month's rent, application fee, moving costs, furniture, utilities, and renters insurance." },
  { question: "How is a security deposit calculated?", answer: "Security deposits may be a fixed amount or based on monthly rent depending on the apartment and local rules." },
  { question: "Is first rent always paid upfront?", answer: "Often yes, but timing can vary. Confirm with the landlord or property manager before budgeting." },
  { question: "Can application fees be deducted from move-in costs?", answer: "Sometimes a fee is put toward rent or security deposit, but treatment can vary. Ask how it will be handled." },
  { question: "Does this include every moving cost?", answer: "No. It is a planning estimate, so you may still need to add storage, cleaning, insurance, travel, or other personal costs." },
];

const relatedTools = [
  { label: "Rent Readiness Score", href: "/rent-readiness-score/" },
  { label: "Rent Affordability Calculator", href: "/rent-referencing-calculator" },
  { label: "Co-signer Income Calculator", href: "/guarantor-income-calculator" },
  { label: "Roommate Affordability Calculator", href: "/joint-tenant-affordability-calculator" },
  { label: "Rent Split Calculator", href: "/rent-split-calculator" },
];

export default function MoveInCostPage() {
  return (
    <>
      <FAQJsonLd items={faqs} />
      <PublicPageShell>
        <PublicPageHero
          eyebrow="MOVE-IN COST CALCULATOR"
          title="Estimate your apartment move-in costs"
        >
          <p>
            Add rent, deposits, fees, moving costs, utilities, and setup expenses
            to estimate how much cash you may need before move-in day.
          </p>
          <Link href="#move-in-cost-form" className="btn-primary mt-6">
            Estimate my costs
          </Link>
        </PublicPageHero>
        <MoveInCostCalculator />
        <section className="prose prose-slate max-w-none space-y-8">
          <div>
            <h2>What costs do renters pay before moving in?</h2>
            <p>
              Before move-in, renters often need enough cash for the security deposit,
              first rent payment, application fee, and practical moving
              costs. If affordability is your first question, start with the{" "}
              <Link href="/rent-referencing-calculator">rent affordability calculator</Link>.
            </p>
          </div>
          <div>
            <h2>How security deposits are calculated</h2>
            <p>
              Upfront security deposits may be fixed amounts or based on monthly
              rent. This calculator lets you choose the deposit type so the estimate
              better matches the apartment listing.
            </p>
          </div>
          <AdPlaceholder />
          <div>
            <h2>Why upfront costs can be higher than expected</h2>
            <p>
              A property that looks affordable month to month may still need a large
              amount upfront. Moving costs, basic furniture, utilities, and
              overlap between homes can all add pressure.
            </p>
          </div>
          <div>
            <h2>Planning with roommates</h2>
            <p>
              If you are moving with other people, decide early how you will divide
              rent and shared costs. The{" "}
              <Link href="/rent-split-calculator">rent split calculator</Link> can
              help compare fair options.
            </p>
          </div>
        </section>
        <FAQSection items={faqs} />
        <DisclaimerBox />
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0f1f3a]">Related tools</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-2xl border border-[#d8e5f7] bg-white p-4 text-sm font-extrabold text-[#0f1f3a] shadow-[0_12px_28px_rgba(15,31,58,0.07)] transition hover:-translate-y-0.5 hover:border-[#93c5fd] hover:text-[#2563eb]"
              >
                {tool.label}
              </Link>
            ))}
          </div>
        </section>
      </PublicPageShell>
    </>
  );
}
