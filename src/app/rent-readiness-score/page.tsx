import type { Metadata } from "next";
import { RentReadinessAssessment } from "@/components/RentReadinessAssessment";

export const metadata: Metadata = {
  title: {
    absolute: "Rent Readiness Score for US Renters | RentReadyCheck",
  },
  description:
    "Estimate your Rent Readiness Score before applying for an apartment. Check rent affordability, savings, debt pressure, co-signer support, and next steps.",
};

export default function RentReadinessScorePage() {
  return <RentReadinessAssessment />;
}
