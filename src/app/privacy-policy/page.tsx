import type { Metadata } from "next";
import Link from "next/link";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { PublicPageHero, PublicPageShell } from "@/components/PublicPage";
import { RelatedTools } from "@/components/RelatedTools";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the RentReadyCheck privacy policy, including how calculator inputs are handled and how anonymous usage analytics are collected.",
};

export default function PrivacyPolicyPage() {
  return (
    <PublicPageShell>
      <PublicPageHero eyebrow={`Last updated: ${siteConfig.lastUpdated}`} title="Privacy Policy">
        <p>
          RentReadyCheck is an informational calculator website for renters.
          This page explains how the site is intended to handle calculator inputs
          and privacy-related questions.
        </p>
      </PublicPageHero>

      <section className="prose prose-slate max-w-none space-y-8">
        <div>
          <h2>No account required</h2>
          <p>
            Users do not need to create an account, log in, or provide a profile to
            use RentReadyCheck. The calculators are designed to be simple estimate
            tools that work directly in the browser.
          </p>
        </div>
        <div>
          <h2>Calculator inputs</h2>
          <p>
            Calculator inputs are processed in the browser. RentReadyCheck does not
            intentionally store calculator inputs, and the site does not use a
            database for calculator results.
          </p>
        </div>
        <AdPlaceholder />
        <div>
          <h2>Analytics</h2>
          <p>
            The site uses{" "}
            <a href="https://vercel.com/docs/analytics/privacy-policy" rel="noopener noreferrer" target="_blank">
              Vercel Web Analytics
            </a>{" "}
            to understand how many people visit and which pages and tools are used.
            It records page views and general details such as referring site, country,
            browser, and device type. Vercel Web Analytics does not use cookies.
          </p>
          <p>
            When a calculator shows a result, the site also records an anonymous event
            with the calculator name, the page, and the result category (for example
            &ldquo;Strong signal&rdquo;). The amounts you type in, such as rent,
            income, savings, or debt, are never sent.
          </p>
          <p>
            The site does not currently use advertising cookies. If that changes, this
            policy will be updated first.
          </p>
        </div>
        <div>
          <h2>Privacy questions</h2>
          <p>
            Users can contact the site owner with privacy questions through the{" "}
            <Link href="/contact">Contact page</Link>. Please do not send sensitive
            financial, legal, or rental application documents unless specifically requested
            by an appropriate professional or agency.
          </p>
        </div>
      </section>

      <RelatedTools />
    </PublicPageShell>
  );
}
