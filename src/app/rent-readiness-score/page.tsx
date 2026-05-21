import type { Metadata } from "next";
import { FAQJsonLd } from "@/components/FAQJsonLd";
import { RentReadinessAssessment } from "@/components/RentReadinessAssessment";
import { rentReadinessFaqs } from "@/lib/rentReadinessFaqs";

export const metadata: Metadata = {
  title: {
    absolute: "Rent Readiness Score for US Renters | RentReadyCheck",
  },
  description:
    "Estimate your Rent Readiness Score before applying for an apartment. Check rent affordability, savings, debt pressure, co-signer support, and next steps.",
};

export default function RentReadinessScorePage() {
  return (
    <>
      <FAQJsonLd items={rentReadinessFaqs} />
      <RentReadinessAssessment />
    </>
  );
}
