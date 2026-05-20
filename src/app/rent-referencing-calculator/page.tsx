import type { Metadata } from "next";
import Link from "next/link";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { FAQJsonLd } from "@/components/FAQJsonLd";
import { FAQSection } from "@/components/FAQSection";
import { PublicPageHero, PublicPageShell } from "@/components/PublicPage";
import { RelatedTools } from "@/components/RelatedTools";
import { RentReferencingCalculator } from "@/components/calculators/RentReferencingCalculator";
import type { FAQItem } from "@/lib/site";

export const metadata: Metadata = {
  title: "Rent Affordability Calculator",
  description:
    "Estimate US apartment affordability using common gross monthly income examples such as 2.5x rent and 3x rent.",
};

const faqs: FAQItem[] = [
  { question: "How much income do I need to rent an apartment?", answer: "Many US landlords and property managers use gross monthly income examples such as 2.5x rent or 3x rent, but each application can be different." },
  { question: "Do all landlords use the same affordability rule?", answer: "No. Requirements can vary by landlord, property manager, state, apartment, and individual application." },
  { question: "Can roommates combine income?", answer: "Many applications consider household income, but individual circumstances can still matter." },
  { question: "How much does a co-signer need to earn?", answer: "That depends on the apartment and property manager. The co-signer calculator lets you compare common US examples." },
  { question: "Does this calculator decide my application?", answer: "No. Rental decisions can also consider credit history, employment status, savings, rental history, co-signers, and application details." },
  { question: "What if I am self-employed?", answer: "You may be asked for extra evidence such as accounts, tax records, bank statements, contracts, or proof of ongoing income." },
  { question: "What if I have savings but low income?", answer: "Savings may help in some cases, but not every landlord or property manager treats savings the same way. Ask what evidence they accept before applying." },
];

export default function RentReferencingPage() {
  return (
    <>
      <FAQJsonLd items={faqs} />
      <PublicPageShell>
        <PublicPageHero title="Rent Affordability Calculator">
          <p>
            Estimate whether your income may fit common US apartment
            affordability examples, including gross monthly income around 2.5x
            rent or 3x rent. You can also estimate whether a co-signer may help.
          </p>
        </PublicPageHero>

        <RentReferencingCalculator />

        <section className="prose prose-slate max-w-none space-y-8">
          <div>
            <h2>What is a rent affordability check?</h2>
            <p>
              A rent affordability check is part of many rental applications. It
              helps a landlord or property manager decide whether the rent looks
              affordable compared with your income. It is only one part of
              an application, so an income benchmark does not decide the final
              application result.
            </p>
          </div>
          <div>
            <h2>How US apartments can compare rent and income</h2>
            <p>
              Many US apartment applications discuss rent as a multiple of gross
              monthly income. A common example is monthly income around 3x rent,
              while some apartments may use 2.5x rent or ask for other details.
            </p>
          </div>
          <AdPlaceholder />
          <div>
            <h2>What if you are applying with other people?</h2>
            <p>
              If you are applying with a partner, friend, or roommate, combined
              income may be considered. Try the{" "}
              <Link href="/joint-tenant-affordability-calculator">roommate affordability calculator</Link>{" "}
              to compare household income with common US examples.
            </p>
          </div>
          <div>
            <h2>When might you need a co-signer?</h2>
            <p>
              A co-signer may be requested if income is below an example
              threshold, if employment is new or irregular, or if the landlord
              wants extra reassurance. The{" "}
              <Link href="/guarantor-income-calculator">co-signer income calculator</Link>{" "}
              can help estimate support income.
            </p>
          </div>
          <div>
            <h2>What else can affect rental decisions?</h2>
            <p>
              Rental decisions may consider credit history, employment status,
              previous landlord references, savings, local documents, and the
              landlord or property manager&apos;s own requirements. If you are budgeting
              for a move, the{" "}
              <Link href="/move-in-cost-calculator">move-in cost calculator</Link>{" "}
              can estimate upfront costs too.
            </p>
          </div>
        </section>

        <FAQSection items={faqs} />
        <DisclaimerBox />
        <RelatedTools currentPath="/rent-referencing-calculator" />
      </PublicPageShell>
    </>
  );
}
