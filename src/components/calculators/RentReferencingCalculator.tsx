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
  calculateIncomeMultiple,
  calculateMonthlyIncomeFromAnnualIncome,
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

function Stat({ label, value }: { label: string; value: string }) {
  return <AnimatedStatCard label={label} value={value} />;
}

export function RentReferencingCalculator() {
  const [countryCode, setCountryCode] = useState<CountryCode>(defaultCountryCode);
  const [rentAmount, setRentAmount] = useState("");
  const [income1, setIncome1] = useState("");
  const [income2, setIncome2] = useState("");
  const [income3, setIncome3] = useState("");
  const [income4, setIncome4] = useState("");
  const [debtPayments, setDebtPayments] = useState("");
  const [hasSupportPerson, setHasSupportPerson] = useState("no");
  const [supportPersonIncome, setSupportPersonIncome] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const countryParam = params.get("country");
    const queryCountry = getCountryFromQueryParam(countryParam);
    const queryRent = params.get("rent");
    const queryIncome = params.get("income");

    if (queryCountry) {
      setCountryCode(queryCountry);
    } else {
      setCountryCode(getDetectedCountry());
    }

    if (queryRent && safeNumber(queryRent) >= 0) {
      setRentAmount(queryRent);
    }

    if (queryIncome && safeNumber(queryIncome) >= 0) {
      setIncome1(queryIncome);
    }
  }, []);

  const country = getCountryConfig(countryCode);
  const rent = safeNumber(rentAmount);
  const monthlyRent = normalizeRentToMonthly(rent, "monthly");
  const applicantIncomes = [income1, income2, income3, income4].map(safeNumber);
  const combinedIncome = applicantIncomes.reduce((sum, income) => sum + income, 0);
  const supportIncome = safeNumber(supportPersonIncome);
  const monthlyDebt = safeNumber(debtPayments);
  const grossMonthlyIncome = calculateMonthlyIncomeFromAnnualIncome(combinedIncome);
  const remainingAfterRent = grossMonthlyIncome - monthlyRent - monthlyDebt;
  const rentPercentage = calculateRentToIncomePercentage(monthlyRent, combinedIncome);
  const incomeMultiple = calculateIncomeMultiple(monthlyRent, combinedIncome);
  const supportPersonLabel = "co-signer";
  const negativeInput = hasNegativeValue([
    rentAmount,
    income1,
    income2,
    income3,
    income4,
    debtPayments,
    supportPersonIncome,
  ]);

  let result = getCountryAffordabilityResult(
    country,
    rent,
    "monthly",
    combinedIncome,
    hasSupportPerson === "yes" ? supportIncome : 0,
  );

  if (negativeInput) {
    result = {
      title: "Please check the numbers",
      description: "Rent, income, and cost fields cannot be negative.",
      tone: "warning",
    };
  } else if (rent <= 0) {
    result = {
      title: "Enter the rent amount",
      description: "Add the advertised rent to calculate example affordability signals.",
      tone: "neutral",
    };
  } else if (combinedIncome <= 0) {
    result = {
      title: "Enter applicant income",
      description:
        "Add at least one applicant's annual income so the calculator can compare it with common US apartment examples.",
      tone: "neutral",
    };
  }

  const showStats = rent > 0 && combinedIncome > 0 && !negativeInput;
  const required3x = monthlyRent * 3 * 12;
  const currency = (value: number) => formatCurrencyByCountry(value, country.code);

  useCalculatorResultTracking({
    calculatorName: "Rent Affordability Calculator",
    selectedCountry: country.code,
    resultSignal: result.title,
    enabled: showStats,
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
              onChange={setCountryCode}
              calculatorName="Rent Affordability Calculator"
            />
          </FormSection>

          <FormSection
            step="Step 2"
            title="Rent details"
            description="Add the advertised rent. Debt payments are shown for budgeting only."
          >
            <InputField
              id="rent-amount"
              label="Monthly rent"
              value={rentAmount}
              onChange={setRentAmount}
              prefix={country.currencySymbol}
              required
            />
            <InputField
              id="debt-payments"
              label="Monthly debt payments"
              value={debtPayments}
              onChange={setDebtPayments}
              prefix={country.currencySymbol}
              helpText="Optional budgeting note only. This does not change the example affordability result."
            />
          </FormSection>

          <FormSection
            step="Step 3"
            title="Applicant income"
            description="Add annual income for the renters on the apartment application."
          >
            <InputField id="income-1" label="Applicant 1 annual income" value={income1} onChange={setIncome1} prefix={country.currencySymbol} required />
            <InputField id="income-2" label="Applicant 2 annual income" value={income2} onChange={setIncome2} prefix={country.currencySymbol} />
            <InputField id="income-3" label="Applicant 3 annual income" value={income3} onChange={setIncome3} prefix={country.currencySymbol} />
            <InputField id="income-4" label="Applicant 4 annual income" value={income4} onChange={setIncome4} prefix={country.currencySymbol} />
          </FormSection>

          <FormSection
            step="Step 4"
            title="Co-signer support"
            description={`Optional. Add this only if a ${supportPersonLabel} is part of the application.`}
          >
            <SelectField
              id="has-support-person"
              label={`Has ${supportPersonLabel}?`}
              value={hasSupportPerson}
              onChange={setHasSupportPerson}
              options={[
                { label: "No", value: "no" },
                { label: "Yes", value: "yes" },
              ]}
            />
            <InputField
              id="support-person-income"
              label={`${supportPersonLabel[0].toUpperCase()}${supportPersonLabel.slice(1)} annual income`}
              value={supportPersonIncome}
              onChange={setSupportPersonIncome}
              prefix={country.currencySymbol}
              helpText={`Optional. Used only if a ${supportPersonLabel} is available.`}
            />
          </FormSection>
        </section>
      }
      result={
        <>
          <ResultCard title={result.title} description={result.description} tone={result.tone} badgeLabel={result.title}>
            {showStats ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <Stat label="Apartment location" value={country.name} />
                <Stat label="Monthly rent estimate" value={currency(monthlyRent)} />
                <Stat label="Your combined income" value={currency(combinedIncome)} />
                <Stat label="Gross monthly income" value={currency(grossMonthlyIncome)} />
                <Stat label="Rent as gross income" value={formatPercentage(rentPercentage)} />
                <Stat label="Income multiple" value={`${incomeMultiple.toFixed(2)}x monthly rent`} />
                <Stat label="Required income at 3x" value={currency(required3x)} />
                {supportPersonIncome ? <Stat label={`${supportPersonLabel} income`} value={currency(supportIncome)} /> : null}
                <Stat label="After rent and debt" value={currency(remainingAfterRent)} />
              </div>
            ) : null}
          </ResultCard>
          <HowEstimateWorks>
            Uses common US apartment affordability examples, including gross
            monthly income around 2.5x rent or 3x rent. A co-signer can be part
            of the estimate when available.
          </HowEstimateWorks>
        </>
      }
    >
      <AdPlaceholder />
    </CalculatorLayout>
  );
}
