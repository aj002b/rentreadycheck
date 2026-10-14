import type { Metadata } from "next";
import { FAQJsonLd } from "@/components/FAQJsonLd";
import { RentReadinessAssessment } from "@/components/RentReadinessAssessment";
import { WebApplicationJsonLd } from "@/components/WebApplicationJsonLd";
import { rentReadinessFaqs } from "@/lib/rentReadinessFaqs";

export const metadata: Metadata = {
  title: {
    absolute: "Rental Score Calculator: Rent Readiness Score | RentReadyCheck",
  },
  description:
    "Free rental score calculator. Estimate your Rent Readiness Score before applying for an apartment: rent affordability, savings, debt pressure, co-signer support, and next steps.",
};

export default function RentReadinessScorePage() {
  return (
    <>
      <FAQJsonLd items={rentReadinessFaqs} />
      <WebApplicationJsonLd
        name="Rent Readiness Score"
        description="Score how ready you are to apply for an apartment from rent, income, savings, debt and co-signer support."
        path="/rent-readiness-score/"
      />
      <RentReadinessAssessment />
    </>
  );
}
