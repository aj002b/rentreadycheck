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
import { useCalculatorResultTracking } from "@/lib/analytics";
import {
  calculateDifference,
  calculateRentToIncomePercentage,
  formatCurrencyByCountry,
  formatPercentage,
  getCountryAffordabilityResult,
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

export function JointTenantCalculator() {
  const [countryCode, setCountryCode] = useState<CountryCode>(defaultCountryCode);
  const [rentAmount, setRentAmount] = useState("");
  const [tenant1, setTenant1] = useState("");
  const [tenant2, setTenant2] = useState("");
  const [tenant3, setTenant3] = useState("");
  const [tenant4, setTenant4] = useState("");
  const [threshold, setThreshold] = useState("3");

  const country = getCountryConfig(countryCode);
  const rent = safeNumber(rentAmount);
  const monthlyRent = normalizeRentToMonthly(rent, "monthly");
  const incomes = [tenant1, tenant2, tenant3, tenant4].map(safeNumber);
  const combinedIncome = incomes.reduce((sum, income) => sum + income, 0);
  const activeTenants = incomes.filter((income) => income > 0).length || 2;
  const currency = (value: number) => formatCurrencyByCountry(value, country.code);
  const rentPercentage = calculateRentToIncomePercentage(monthlyRent, combinedIncome);
  const negativeInput = hasNegativeValue([rentAmount, tenant1, tenant2, tenant3, tenant4]);

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

  const selectedThreshold = safeNumber(threshold);
  const required = monthlyRent * selectedThreshold * 12;
  const difference = calculateDifference(combinedIncome, required);

  let result = getCountryAffordabilityResult(
    country,
    rent,
    "monthly",
    combinedIncome,
  );

  if (negativeInput) {
    result = {
      title: "Please check the numbers",
      description: "Rent and income fields cannot be negative.",
      tone: "warning",
    };
  } else if (rent <= 0) {
    result = {
      title: "Enter the rent amount",
      description: "The monthly rent is needed to estimate the roommate threshold.",
      tone: "neutral",
    };
  } else if (safeNumber(tenant1) <= 0 || safeNumber(tenant2) <= 0) {
    result = {
      title: "Enter at least two roommate incomes",
      description: "Roommate 1 and Roommate 2 are required for this estimate.",
      tone: "neutral",
    };
  }

  const hasResult =
    monthlyRent > 0 &&
    safeNumber(tenant1) > 0 &&
    safeNumber(tenant2) > 0 &&
    !negativeInput;

  useCalculatorResultTracking({
    calculatorName: "Joint Tenant Calculator",
    selectedCountry: country.code,
    resultSignal: result.title,
    enabled: hasResult,
  });

  return (
    <CalculatorLayout
      form={
        <section className="form-card space-y-4 p-4 sm:p-5">
          <FormSection
            step="Step 1"
            title="Apartment location"
            description="United States examples use gross monthly income compared with monthly rent."
            columns="grid-cols-1"
          >
            <CountrySelector
              country={country}
              onChange={handleCountryChange}
              calculatorName="Joint Tenant Calculator"
            />
          </FormSection>

          <FormSection
            step="Step 2"
            title="Rent details"
            description="Add the rent and choose the example threshold you want to compare."
          >
            <InputField id="rent-amount" label="Monthly rent" value={rentAmount} onChange={setRentAmount} prefix={country.currencySymbol} required />
            <SelectField id="threshold" label="Example threshold" value={threshold} onChange={setThreshold} options={thresholdOptions} />
          </FormSection>

          <FormSection
            step="Step 3"
            title="Roommate income"
            description="Add annual income for each person applying together."
          >
            <InputField id="tenant-1" label="Roommate 1 annual income" value={tenant1} onChange={setTenant1} prefix={country.currencySymbol} required />
            <InputField id="tenant-2" label="Roommate 2 annual income" value={tenant2} onChange={setTenant2} prefix={country.currencySymbol} required />
            <InputField id="tenant-3" label="Roommate 3 annual income" value={tenant3} onChange={setTenant3} prefix={country.currencySymbol} />
            <InputField id="tenant-4" label="Roommate 4 annual income" value={tenant4} onChange={setTenant4} prefix={country.currencySymbol} />
          </FormSection>
        </section>
      }
      result={
        <>
          <ResultCard title={result.title} description={result.description} tone={result.tone} badgeLabel={result.title}>
            {hasResult ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <Metric label="Combined income" value={currency(combinedIncome)} />
                <Metric label="Required income" value={currency(required)} />
                <Metric label="Difference" value={`${difference >= 0 ? "Above" : "Below"} by ${currency(Math.abs(difference))}`} />
                <Metric label="Equal monthly share" value={currency(monthlyRent / activeTenants)} />
                <Metric label="Rent as gross income" value={formatPercentage(rentPercentage)} />
              </div>
            ) : null}
          </ResultCard>
          <HowEstimateWorks>
            This tool combines roommate income and compares it with common US
            apartment affordability examples such as 2.5x rent or 3x rent.
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
