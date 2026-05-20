import type { Metadata } from "next";
import Link from "next/link";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { FAQJsonLd } from "@/components/FAQJsonLd";
import { FAQSection } from "@/components/FAQSection";
import { PublicPageHero, PublicPageShell } from "@/components/PublicPage";
import { RelatedTools } from "@/components/RelatedTools";
import { GuarantorIncomeCalculator } from "@/components/calculators/GuarantorIncomeCalculator";
import type { FAQItem } from "@/lib/site";

export const metadata: Metadata = {
  title: "Co-signer Income Calculator",
  description:
    "Estimate whether a co-signer may help with a US apartment rental application.",
};

const faqs: FAQItem[] = [
  { question: "What is a co-signer?", answer: "A co-signer is someone who may agree to support the rental agreement if the renter cannot meet certain obligations, depending on the agreement." },
  { question: "Why do landlords ask for extra support?", answer: "They may ask when income is low, income is irregular, rental history is limited, or the application needs extra reassurance." },
  { question: "Do co-signers need to earn more than renters?", answer: "Sometimes they may be assessed against a higher or stricter example threshold, but requirements vary widely." },
  { question: "Is one threshold always enough?", answer: "No. This calculator uses examples only. Actual requirements can vary by landlord, property manager, apartment, and individual circumstances." },
  { question: "Can a co-signer live in another state?", answer: "Some landlords or property managers require a local co-signer. Ask what they accept before applying." },
];

export default function GuarantorPage() {
  return (
    <>
      <FAQJsonLd items={faqs} />
      <PublicPageShell>
        <PublicPageHero title="Co-signer Income Calculator">
          <p>
            Estimate whether a co-signer&apos;s annual income may meet a common
            US apartment affordability threshold.
          </p>
        </PublicPageHero>
        <GuarantorIncomeCalculator />
        <section className="prose prose-slate max-w-none space-y-8">
          <div>
            <h2>What a co-signer is</h2>
            <p>
              A co-signer is usually a person who agrees to support
              the rental agreement if the renter cannot meet certain obligations.
              The exact commitment depends on the agreement and the property manager.
            </p>
          </div>
          <div>
            <h2>Why landlords ask for extra support</h2>
            <p>
              Extra support is often requested where the renter&apos;s income is below
              an example benchmark, where income is irregular, or where the
              applicant has limited rental history. You can compare renter income
              first with the{" "}
              <Link href="/rent-referencing-calculator">rent affordability calculator</Link>.
            </p>
          </div>
          <AdPlaceholder />
          <div>
            <h2>Why support-person income requirements may be higher</h2>
            <p>
              A support person may not be living in the property but may still be
              expected to help if needed. That is why some checks use a stricter
              example income threshold.
            </p>
          </div>
          <div>
            <h2>Common situations where support may be needed</h2>
            <p>
              Support is common for students, renters with a new job, renters
              with self-employed income, and people moving without much local
              rental history. If you are applying with roommates, the{" "}
              <Link href="/joint-tenant-affordability-calculator">roommate affordability calculator</Link>{" "}
              may also help.
            </p>
          </div>
        </section>
        <FAQSection items={faqs} />
        <DisclaimerBox />
        <RelatedTools currentPath="/guarantor-income-calculator" />
      </PublicPageShell>
    </>
  );
}
