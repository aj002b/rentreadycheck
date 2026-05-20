"use client";

import { AdPlaceholder } from "@/components/AdPlaceholder";
import {
  CalculatorLayout,
  FormSection,
  HowEstimateWorks,
} from "@/components/CalculatorLayout";
import { CountrySelector } from "@/components/CountrySelector";
import { InputField } from "@/components/InputField";
import { AnimatedStatCard } from "@/components/Motion";
import { ResultCard } from "@/components/ResultCard";
import { SelectField } from "@/components/SelectField";
import {
  calculateDifference,
  formatCurrencyByCountry,
  hasNegativeValue,
  normalizeRentToMonthly,
  safeNumber,
} from "@/lib/calculations";
import {
  defaultCountryCode,
  getCountryConfig,
  type CountryCode,
} from "@/lib/countries";
import { getCountryFromQueryParam, getDetectedCountry } from "@/lib/detectCountry";
import { useEffect, useState } from "react";

export function GuarantorIncomeCalculator() {
  const [countryCode, setCountryCode] = useState<CountryCode>(defaultCountryCode);
  const [rentAmount, setRentAmount] = useState("");
  const [supportPersonIncome, setSupportPersonIncome] = useState("");
  const [applicantIncome, setApplicantIncome] = useState("");
  const [threshold, setThreshold] = useState("3");

  const country = getCountryConfig(countryCode);
  const monthlyRent = normalizeRentToMonthly(safeNumber(rentAmount), "monthly");
  const supportIncome = safeNumber(supportPersonIncome);
  const applicant = safeNumber(applicantIncome);
  const selectedThreshold = safeNumber(threshold);
  const currency = (value: number) => formatCurrencyByCountry(value, country.code);
  const negativeInput = hasNegativeValue([rentAmount, supportPersonIncome, applicantIncome]);
  const supportPersonLabel = "co-signer";

  useEffect(() => {
    const queryCountry = getCountryFromQueryParam(
      new URLSearchParams(window.location.search).get("country"),
    );

    handleCountryChange(queryCountry ?? getDetectedCountry());
  }, []);

  function handleCountryChange(nextCountryCode: CountryCode) {
    setCountryCode(nextCountryCode);
    setThreshold("3");
  }

  const thresholdOptions = [
    { label: "2.5x monthly rent", value: "2.5" },
    { label: "3x monthly rent", value: "3" },
    { label: "3.5x monthly rent", value: "3.5" },
  ];

  const required = monthlyRent * selectedThreshold * 12;
  const difference = calculateDifference(supportIncome, required);

  let title = `Add rent and ${supportPersonLabel} income`;
  let description = `Enter rent and ${supportPersonLabel} income to compare against an example threshold.`;
  let tone: "positive" | "warning" | "neutral" = "neutral";
  let badgeLabel = "Add details";

  if (negativeInput) {
    title = "Please check the numbers";
    description = "Rent and income fields cannot be negative.";
    tone = "warning";
    badgeLabel = "Check numbers";
  } else if (monthlyRent <= 0) {
    title = "Enter the rent amount";
    description = `The rent is needed before the ${supportPersonLabel} threshold can be estimated.`;
  } else if (supportIncome <= 0) {
    title = `Enter ${supportPersonLabel} income`;
    description = `Add the ${supportPersonLabel} annual income to see how it compares.`;
  } else if (difference >= 0) {
    title = `${supportPersonLabel[0].toUpperCase()}${supportPersonLabel.slice(1)} may meet this example threshold`;
    description = `The ${supportPersonLabel} income is at or above the selected example threshold.`;
    tone = "positive";
    badgeLabel = "Strong signal";
  } else if (Math.abs(difference) <= required * 0.1) {
    title = `${supportPersonLabel[0].toUpperCase()}${supportPersonLabel.slice(1)} may be borderline`;
    description = `The ${supportPersonLabel} income is close to the selected example threshold.`;
    tone = "neutral";
    badgeLabel = "Borderline signal";
  } else {
    title = `${supportPersonLabel[0].toUpperCase()}${supportPersonLabel.slice(1)} may not meet this example threshold`;
    description = `The ${supportPersonLabel} income is below the selected example threshold.`;
    tone = "warning";
    badgeLabel = "May need support";
  }

  return (
    <CalculatorLayout
      form={
        <section className="form-card space-y-4 p-4 sm:p-5">
          <FormSection
            step="Step 1"
            title="Apartment location"
            description="United States examples use co-signer income compared with monthly rent."
            columns="grid-cols-1"
          >
            <CountrySelector country={country} onChange={handleCountryChange} />
          </FormSection>

          <FormSection
            step="Step 2"
            title="Rent details"
            description="Add the rent amount so the example requirement can be estimated."
          >
            <InputField id="rent-amount" label="Monthly rent" value={rentAmount} onChange={setRentAmount} prefix={country.currencySymbol} required />
          </FormSection>

          <FormSection
            step="Step 3"
            title="Applicant income"
            description="Optional comparison only. This does not replace the co-signer estimate."
            columns="grid-cols-1"
          >
            <InputField id="applicant-income" label="Applicant annual income" value={applicantIncome} onChange={setApplicantIncome} prefix={country.currencySymbol} helpText="Optional comparison only." />
          </FormSection>

          <FormSection
            step="Step 4"
            title="Co-signer support"
            description={`Compare the ${supportPersonLabel} income with a selected example threshold.`}
          >
            <InputField id="support-person-income" label={`${supportPersonLabel[0].toUpperCase()}${supportPersonLabel.slice(1)} annual income`} value={supportPersonIncome} onChange={setSupportPersonIncome} prefix={country.currencySymbol} required />
            <SelectField id="threshold" label="Example threshold" value={threshold} onChange={setThreshold} options={thresholdOptions} />
          </FormSection>
        </section>
      }
      result={
        <>
          <ResultCard title={title} description={description} tone={tone} badgeLabel={badgeLabel}>
            {monthlyRent > 0 && supportIncome > 0 && !negativeInput ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <Metric label="Monthly rent estimate" value={currency(monthlyRent)} />
                <Metric label={`Required ${supportPersonLabel} income`} value={currency(required)} />
                <Metric label={`${supportPersonLabel} income`} value={currency(supportIncome)} />
                <Metric label="Difference" value={`${difference >= 0 ? "Above" : "Below"} by ${currency(Math.abs(difference))}`} />
                {applicantIncome ? <Metric label="Applicant income comparison" value={`${currency(applicant)} vs ${currency(required)}`} /> : null}
              </div>
            ) : null}
          </ResultCard>
          <HowEstimateWorks>
            This tool uses common US co-signer income examples such as 2.5x rent
            or 3x rent. The landlord or property manager may still request their
            own documents and credit review.
          </HowEstimateWorks>
        </>
      }
    >
      <AdPlaceholder />
    </CalculatorLayout>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <AnimatedStatCard label={label} value={value} />;
}
