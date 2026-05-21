import type { Metadata } from "next";
import { FAQJsonLd } from "@/components/FAQJsonLd";
import { MoveInCostCalculator } from "@/components/calculators/MoveInCostCalculator";
import type { FAQItem } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Move-In Cost Calculator for Apartment Renters | RentReadyCheck",
  },
  description:
    "Estimate apartment move-in costs including security deposit, first month's rent, fees, moving costs, utilities, furniture, and savings gap.",
};

const faqs: FAQItem[] = [
  {
    question: "What costs should I expect before moving into an apartment?",
    answer:
      "Common costs include a security deposit, first month's rent, application fees, admin or holding fees, moving costs, utility setup, internet setup, household basics, and a cash buffer.",
  },
  {
    question: "Is the security deposit always equal to one month's rent?",
    answer:
      "No. Some apartments use one month's rent as an example, but the amount can vary by property, lease terms, landlord, property manager, and local rules.",
  },
  {
    question: "Should I include furniture in my move-in budget?",
    answer:
      "Yes, if you expect to buy basics soon after move-in. You can include only essential items now and delay non-essential purchases.",
  },
  {
    question: "Are application fees refundable?",
    answer:
      "It depends on the property and fee type. Ask the property manager which fees are refundable, credited, or non-refundable before applying.",
  },
  {
    question: "Do you save my cost estimate?",
    answer:
      "No. This tool runs in your browser and does not save your move-in cost inputs to an account.",
  },
];

export default function MoveInCostPage() {
  return (
    <>
      <FAQJsonLd items={faqs} />
      <MoveInCostCalculator />
    </>
  );
}
