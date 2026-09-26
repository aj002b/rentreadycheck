import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IncomeRentPageView } from "@/components/IncomeRentPage";
import { getIncomeRentPage, incomeRentPages } from "@/lib/incomeRentPages";

// Generates one static page per entry in incomeRentPages. Named routes
// elsewhere in src/app take precedence over this catch-all segment.
export const dynamicParams = false;

type Props = { params: Promise<{ incomePage: string }> };

export function generateStaticParams() {
  return incomeRentPages.map((page) => ({ incomePage: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getIncomeRentPage((await params).incomePage);

  if (!page) {
    return {};
  }

  return {
    title: { absolute: page.title },
    description: page.description,
  };
}

export default async function IncomeRentRoute({ params }: Props) {
  const page = getIncomeRentPage((await params).incomePage);

  if (!page) {
    notFound();
  }

  return <IncomeRentPageView page={page} />;
}
