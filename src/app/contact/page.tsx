import type { Metadata } from "next";
import Link from "next/link";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { PublicPageHero, PublicPageShell } from "@/components/PublicPage";
import { RelatedTools } from "@/components/RelatedTools";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact RentReadyCheck for website questions. The site cannot provide individual financial, legal, tax, or housing advice.",
};

export default function ContactPage() {
  return (
    <PublicPageShell>
      <PublicPageHero eyebrow={`Last updated: ${siteConfig.lastUpdated}`} title="Contact">
        <p>
          Have a question about RentReadyCheck or spotted something on the site
          that needs attention? You can use the placeholder contact email below.
        </p>
      </PublicPageHero>

      <section className="rounded-[1.25rem] border border-[#d8e5f7] bg-white p-6 shadow-[0_16px_38px_rgba(15,31,58,0.08)]">
        <h2 className="text-2xl font-bold text-[#0f1f3a]">Email</h2>
        <p className="mt-3 text-lg font-semibold text-[#2563eb]">
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
        </p>
        <p className="mt-4 max-w-3xl leading-7 text-[#53657f]">
          RentReadyCheck cannot provide individual financial, legal, tax,
          or housing advice. For questions about a specific rental application,
          please speak directly with the landlord, property manager, or a
          qualified adviser.
        </p>
      </section>

      <DisclaimerBox>
        The calculators on this site are rough estimate tools only. They do not
        decide rental applications and should not be treated as financial,
        legal, tax, or housing advice.
      </DisclaimerBox>

      <section className="prose prose-slate max-w-none">
        <h2>Useful next step</h2>
        <p>
          If your question is about how the site handles calculator inputs, read the{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </p>
      </section>

      <RelatedTools />
    </PublicPageShell>
  );
}
