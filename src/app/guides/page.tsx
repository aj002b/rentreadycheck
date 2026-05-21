import type { Metadata } from "next";
import Link from "next/link";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { PublicPageHero, PublicPageShell } from "@/components/PublicPage";
import { estimateDisclaimer } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Helpful Guides for US Renters | RentReadyCheck",
  },
  description:
    "Browse RentReadyCheck guides for US renters on apartment affordability, co-signers, move-in costs, application fees, security deposits, and roommate rent planning.",
};

const guideCards = [
  {
    title: "What is the 3x rent rule?",
    href: "/rent-to-income-ratio-explained",
    description: "Understand how gross monthly income can be compared with monthly rent.",
  },
  {
    title: "Do I need a co-signer?",
    href: "/do-i-need-a-cosigner-for-an-apartment",
    description: "Learn when extra support may help an apartment application.",
  },
  {
    title: "How much should I save before moving?",
    href: "/how-much-should-i-save-before-moving-out",
    description: "Plan your security deposit, first month's rent, moving costs, and setup buffer.",
  },
  {
    title: "Can I rent with bad credit?",
    href: "/can-i-rent-with-bad-credit",
    description: "See why credit history is only one part of a rental application.",
  },
  {
    title: "Rental application fees",
    href: "/rental-application-fees-explained",
    description: "Estimate application fees alongside other move-in costs.",
  },
  {
    title: "Security deposit basics",
    href: "/security-deposit-basics",
    description: "Plan for the security deposit and first rent payment before move-in.",
  },
] as const;

const calculatorLinks = [
  { href: "/rent-referencing-calculator", label: "Rent Affordability Calculator" },
  { href: "/guarantor-income-calculator", label: "Co-signer Income Calculator" },
  { href: "/joint-tenant-affordability-calculator", label: "Roommate Affordability Calculator" },
  { href: "/move-in-cost-calculator", label: "Move-In Cost Calculator" },
  { href: "/rent-split-calculator", label: "Rent Split Calculator" },
] as const;

export default function GuidesPage() {
  return (
    <PublicPageShell>
      <PublicPageHero eyebrow="Guide library" title="Helpful guides for US renters">
        <p>
          Practical guides and calculators for apartment affordability, co-signer
          support, move-in costs, security deposits, and roommate rent planning.
        </p>
      </PublicPageHero>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {guideCards.map((guide) => (
          <Link key={guide.href + guide.title} href={guide.href} className="premium-card flex h-full flex-col p-5 transition hover:-translate-y-0.5 hover:border-[#93c5fd]">
            <h2 className="text-xl font-extrabold tracking-[-0.02em] text-[#0f1f3a]">
              {guide.title}
            </h2>
            <p className="mt-3 flex-1 text-sm leading-6 text-[#53657f]">
              {guide.description}
            </p>
            <span className="mt-5 text-sm font-extrabold text-[#2563eb]">
              Read guide
            </span>
          </Link>
        ))}
      </section>

      <section className="rounded-[1.25rem] border border-[#d8e5f7] bg-white p-5 shadow-[0_16px_38px_rgba(15,31,58,0.08)]">
        <h2 className="text-2xl font-black tracking-[-0.03em] text-[#0f1f3a]">
          Calculators
        </h2>
        <div className="mt-5 flex flex-wrap gap-3">
          {calculatorLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-[#bdd3f5] bg-[#eff6ff] px-4 py-2 text-sm font-extrabold text-[#1d4ed8] transition hover:border-[#2563eb] hover:bg-[#dbeafe]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>

      <DisclaimerBox>{estimateDisclaimer}</DisclaimerBox>
    </PublicPageShell>
  );
}
