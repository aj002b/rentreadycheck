import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IncomeRentPageView } from "@/components/IncomeRentPage";
import { SEOLandingPageView } from "@/components/SEOLandingPage";
import { getIncomeRentPage, incomeRentPages } from "@/lib/incomeRentPages";
import { rentAmountPages } from "@/lib/seoLandingPages";

// Generates one static page per entry in incomeRentPages ("rent on this
// income") and rentAmountPages ("income for this rent"). Named routes
// elsewhere in src/app take precedence over this catch-all segment.
export const dynamicParams = false;

type Props = { params: Promise<{ incomePage: string }> };

function findPage(slug: string) {
  return getIncomeRentPage(slug) ?? rentAmountPages.find((page) => page.slug === slug);
}

export function generateStaticParams() {
  return [...incomeRentPages, ...rentAmountPages].map((page) => ({ incomePage: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = findPage((await params).incomePage);

  if (!page) {
    return {};
  }

  return {
    title: { absolute: page.title },
    description: page.description,
  };
}

export default async function IncomeRentRoute({ params }: Props) {
  const page = findPage((await params).incomePage);

  if (!page) {
    notFound();
  }

  return "payType" in page ? <IncomeRentPageView page={page} /> : <SEOLandingPageView page={page} />;
}
