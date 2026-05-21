import type { Metadata } from "next";
import { SEOLandingPageView } from "@/components/SEOLandingPage";
import { getSEOLandingPage } from "@/lib/seoLandingPages";

const page = getSEOLandingPage("do-i-need-a-cosigner-for-an-apartment");

export const metadata: Metadata = {
  title: {
    absolute: page.title,
  },
  description: page.description,
};

export default function DoINeedACosignerForAnApartmentPage() {
  return <SEOLandingPageView page={page} />;
}
