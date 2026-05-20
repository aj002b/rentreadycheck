import type { Metadata } from "next";
import { FAQJsonLd } from "@/components/FAQJsonLd";
import FeatureCards from "@/components/homepage/FeatureCards";
import GuidesPreview from "@/components/homepage/GuidesPreview";
import HomeFAQSection from "@/components/homepage/HomeFAQSection";
import HeroSection from "@/components/homepage/HeroSection";
import HowItWorksStrip from "@/components/homepage/HowItWorksStrip";
import ImproveScoreSimulator from "@/components/homepage/ImproveScoreSimulator";

export const metadata: Metadata = {
  title: {
    absolute: "Rent Readiness Score for US Renters | RentReadyCheck",
  },
  description:
    "Get a free Rent Readiness Score, estimate apartment affordability, plan move-in costs, and see how to improve before applying.",
  openGraph: {
    title: "Rent Readiness Score for US Renters | RentReadyCheck",
    description:
      "Get a free Rent Readiness Score, estimate apartment affordability, plan move-in costs, and see how to improve before applying.",
    type: "website",
  },
};

const faqs = [
  {
    question: "Can this website tell me if my rental application will be accepted?",
    answer:
      "No. RentReadyCheck provides estimates based on common apartment affordability guidelines used in the US. It cannot predict or determine whether any specific landlord or property manager will accept your application. Many factors, including credit history, references, and local policies, are part of the decision.",
  },
  {
    question: "What income examples does this use?",
    answer:
      "Our tools use common US renter affordability benchmarks such as the 2.5x and 3x monthly rent income guidelines. These are widely referenced by property managers but are not universal rules.",
  },
  {
    question: "Can roommates combine income?",
    answer:
      "In many rental situations, roommates can combine their income on a shared lease. Our Roommate Affordability Calculator lets you estimate combined affordability. Each property manager may have different policies.",
  },
  {
    question: "When might I need a co-signer?",
    answer:
      "A co-signer may help if your income is below the property manager's threshold, if you have limited rental history, or if your credit score is lower than preferred. Our Co-signer Income Calculator can help you estimate what may be needed.",
  },
  {
    question: "Are these calculators financial or legal advice?",
    answer:
      "No. All tools on RentReadyCheck provide general estimates only. They are not financial advice, legal advice, or a credit assessment. Always consult a qualified professional for decisions about your finances or rental agreements.",
  },
];

export default function HomePage() {
  return (
    <>
      <FAQJsonLd items={faqs} />
      <HeroSection />
      <HowItWorksStrip />
      <FeatureCards />
      <ImproveScoreSimulator />
      <GuidesPreview />
      <HomeFAQSection />
    </>
  );
}
