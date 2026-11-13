import type { Metadata } from "next";
import { SEOLandingPageView } from "@/components/SEOLandingPage";
import { getSEOLandingPage } from "@/lib/seoLandingPages";

const page = getSEOLandingPage("can-roommates-combine-income-for-rent");

export const metadata: Metadata = {
  title: {
    absolute: page.title,
  },
  description: page.description,
};

export default function CanFlatmatesCombineIncomeForRentPage() {
  return <SEOLandingPageView page={page} />;
}
