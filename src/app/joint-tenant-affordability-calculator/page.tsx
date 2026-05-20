import type { Metadata } from "next";
import Link from "next/link";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { FAQJsonLd } from "@/components/FAQJsonLd";
import { FAQSection } from "@/components/FAQSection";
import { PublicPageHero, PublicPageShell } from "@/components/PublicPage";
import { RelatedTools } from "@/components/RelatedTools";
import { JointTenantCalculator } from "@/components/calculators/JointTenantCalculator";
import type { FAQItem } from "@/lib/site";

export const metadata: Metadata = {
  title: "Roommate Affordability Calculator",
  description:
    "Combine incomes for roommates applying for a US apartment together.",
};

const faqs: FAQItem[] = [
  { question: "Can roommates combine income?", answer: "Many landlords and property managers look at household income, but the exact approach can vary." },
  { question: "What if one roommate earns much more?", answer: "The combined total may still help, although some landlords may look more closely at individual stability and co-signer support." },
  { question: "Do all roommates need co-signers?", answer: "Not always. A landlord may ask for one co-signer, multiple co-signers, or none depending on the application." },
  { question: "What if one roommate leaves?", answer: "Roommates can sometimes share responsibility for rent. Understand the lease before signing." },
  { question: "Does this calculator decide my application?", answer: "No. It is a rough estimate and does not replace checks by a landlord or property manager." },
];

export default function JointTenantPage() {
  return (
    <>
      <FAQJsonLd items={faqs} />
      <PublicPageShell>
        <PublicPageHero title="Roommate Affordability Calculator">
          <p>
            Combine annual incomes for roommates and compare them with common
            US apartment affordability examples.
          </p>
        </PublicPageHero>
        <JointTenantCalculator />
        <section className="prose prose-slate max-w-none space-y-8">
          <div>
            <h2>Can roommates combine income?</h2>
            <p>
              In many apartment applications, combined income is used as a rough
              affordability check. This can help roommates apply
              together, but the landlord or property manager may still consider
              each applicant&apos;s wider circumstances.
            </p>
          </div>
          <div>
            <h2>What if one roommate earns much more?</h2>
            <p>
              Uneven incomes are common. If the rent itself needs to be split fairly,
              the <Link href="/rent-split-calculator">rent split calculator</Link>{" "}
              can compare equal, income-based, and room-size splits.
            </p>
          </div>
          <AdPlaceholder />
          <div>
            <h2>What if one roommate leaves?</h2>
            <p>
              Roommates may have shared responsibilities under the lease. This
              calculator only estimates income against rent; it does not explain your
              legal obligations or lease terms.
            </p>
          </div>
          <div>
            <h2>Do all roommates need co-signers?</h2>
            <p>
              Some landlords ask for extra support when combined income is low or one
              applicant has a more complex situation. The{" "}
              <Link href="/guarantor-income-calculator">co-signer income calculator</Link>{" "}
              can estimate an example co-signer income threshold.
            </p>
          </div>
        </section>
        <FAQSection items={faqs} />
        <DisclaimerBox />
        <RelatedTools currentPath="/joint-tenant-affordability-calculator" />
      </PublicPageShell>
    </>
  );
}
