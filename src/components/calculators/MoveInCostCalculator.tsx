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

type DepositType = "fixed" | "months";

export function MoveInCostCalculator() {
  const [countryCode, setCountryCode] = useState<CountryCode>(defaultCountryCode);
  const [rentAmount, setRentAmount] = useState("");
  const [depositType, setDepositType] = useState<DepositType>("months");
  const [depositValue, setDepositValue] = useState("1");
  const [firstRentRequired, setFirstRentRequired] = useState("yes");
  const [feeAmount, setFeeAmount] = useState("");
  const [movingCost, setMovingCost] = useState("");
  const [furniture, setFurniture] = useState("");
  const [utilities, setUtilities] = useState("");
  const [otherCosts, setOtherCosts] = useState("");

  useEffect(() => {
    const queryCountry = getCountryFromQueryParam(
      new URLSearchParams(window.location.search).get("country"),
    );

    setCountryCode(queryCountry ?? getDetectedCountry());
  }, []);

  const country = getCountryConfig(countryCode);
  const rent = safeNumber(rentAmount);
  const monthlyRent = normalizeRentToMonthly(rent, "monthly");
  const currency = (value: number) => formatCurrencyByCountry(value, country.code);
  const feeLabel = "Application fee";
  const setupCostLabel = "Utilities setup";
  const deposit =
    depositType === "fixed"
      ? safeNumber(depositValue)
      : monthlyRent * safeNumber(depositValue);
  const firstRent = firstRentRequired === "yes" ? monthlyRent : 0;
  const extras =
    safeNumber(feeAmount) +
    safeNumber(movingCost) +
    safeNumber(furniture) +
    safeNumber(utilities) +
    safeNumber(otherCosts);
  const total = deposit + firstRent + extras;
  const negativeInput = hasNegativeValue([
    rentAmount,
    depositValue,
    feeAmount,
    movingCost,
    furniture,
    utilities,
    otherCosts,
  ]);

  const title =
    monthlyRent > 0 && !negativeInput
      ? `Estimated upfront cost: ${currency(total)}`
      : negativeInput
        ? "Please check the numbers"
        : "Enter the rent amount";
  const description =
    monthlyRent > 0 && !negativeInput
      ? "This adds the selected security deposit, first rent payment if needed, and your optional moving costs."
      : negativeInput
        ? "Rent and cost fields cannot be negative."
        : "Add the rent amount to estimate security deposit and first upfront costs.";

  const hasResult = monthlyRent > 0 && !negativeInput;

  useCalculatorResultTracking({
    calculatorName: "Move-In Cost Calculator",
    selectedCountry: country.code,
    resultSignal: hasResult ? "Estimated total" : title,
    enabled: hasResult,
  });

  return (
    <CalculatorLayout
      form={
        <section className="form-card space-y-4 p-4 sm:p-5">
          <FormSection
            step="Step 1"
            title="Apartment location"
            description="United States examples use monthly rent, security deposit, and application fee wording."
            columns="grid-cols-1"
          >
            <CountrySelector
              country={country}
              onChange={setCountryCode}
              calculatorName="Move-In Cost Calculator"
            />
          </FormSection>

          <FormSection
            step="Step 2"
            title="Rent details"
            description="Add the rent and whether the first rent payment is due upfront."
          >
            <InputField id="rent-amount" label="Monthly rent" value={rentAmount} onChange={setRentAmount} prefix={country.currencySymbol} required />
            <SelectField id="first-rent" label="First rent payment required?" value={firstRentRequired} onChange={setFirstRentRequired} options={[{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]} />
          </FormSection>

          <FormSection
            step="Step 3"
            title="Security deposit"
            description="Choose the security deposit style that matches the apartment listing."
          >
            <SelectField id="deposit-type" label="Security deposit type" value={depositType} onChange={(value) => setDepositType(value as DepositType)} options={[{ label: "Fixed amount", value: "fixed" }, { label: "Months of rent", value: "months" }]} />
            <InputField id="deposit-value" label={depositType === "fixed" ? "Security deposit amount" : "Security deposit months"} value={depositValue} onChange={setDepositValue} prefix={depositType === "fixed" ? country.currencySymbol : undefined} required />
          </FormSection>

          <FormSection
            step="Step 4"
            title="Other upfront costs"
            description="Add any extra costs you want included in the move-in estimate."
          >
            <InputField id="fee-amount" label={`${feeLabel} amount`} value={feeAmount} onChange={setFeeAmount} prefix={country.currencySymbol} />
            <InputField id="moving-cost" label="Moving cost" value={movingCost} onChange={setMovingCost} prefix={country.currencySymbol} />
            <InputField id="furniture" label="Furniture cost" value={furniture} onChange={setFurniture} prefix={country.currencySymbol} />
            <InputField id="utilities" label={setupCostLabel} value={utilities} onChange={setUtilities} prefix={country.currencySymbol} />
            <InputField id="other-costs" label="Other costs" value={otherCosts} onChange={setOtherCosts} prefix={country.currencySymbol} />
          </FormSection>
        </section>
      }
      result={
        <>
          <ResultCard title={title} description={description} tone={negativeInput ? "warning" : "neutral"} badgeLabel={hasResult ? "Estimated total" : "Add details"}>
            {hasResult ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <Metric label="Monthly rent estimate" value={currency(monthlyRent)} />
                <Metric label="Security deposit" value={currency(deposit)} />
                <Metric label="First rent payment" value={currency(firstRent)} />
                <Metric label={feeLabel} value={currency(safeNumber(feeAmount))} />
                <Metric label="Moving cost" value={currency(safeNumber(movingCost))} />
                <Metric label="Furniture" value={currency(safeNumber(furniture))} />
                <Metric label={setupCostLabel} value={currency(safeNumber(utilities))} />
                <Metric label="Other costs" value={currency(safeNumber(otherCosts))} />
              </div>
            ) : null}
          </ResultCard>
          <HowEstimateWorks>
            Move-in costs vary by landlord, property manager, apartment, and
            application details. This US-focused estimate includes common items
            like security deposit, first month's rent, application fees, moving
            costs, utilities, and setup expenses.
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
