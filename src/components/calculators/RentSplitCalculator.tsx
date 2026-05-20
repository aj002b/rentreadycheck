"use client";

import { AdPlaceholder } from "@/components/AdPlaceholder";
import {
  CalculatorLayout,
  FormSection,
  HowEstimateWorks,
} from "@/components/CalculatorLayout";
import { CountrySelector } from "@/components/CountrySelector";
import { InputField } from "@/components/InputField";
import { ResultCard } from "@/components/ResultCard";
import { SelectField } from "@/components/SelectField";
import { useCalculatorResultTracking } from "@/lib/analytics";
import {
  formatCurrencyByCountry,
  formatPercentage,
  hasNegativeValue,
  safeNumber,
} from "@/lib/calculations";
import {
  defaultCountryCode,
  getCountryConfig,
  type CountryCode,
} from "@/lib/countries";
import { getCountryFromQueryParam, getDetectedCountry } from "@/lib/detectCountry";
import { useEffect, useState } from "react";

type SplitMethod = "equal" | "income" | "room";

export function RentSplitCalculator() {
  const [countryCode, setCountryCode] = useState<CountryCode>(defaultCountryCode);
  const [monthlyRent, setMonthlyRent] = useState("");
  const [splitMethod, setSplitMethod] = useState<SplitMethod>("equal");
  const [tenantCount, setTenantCount] = useState("2");
  const [names, setNames] = useState(["", "", "", ""]);
  const [incomes, setIncomes] = useState(["", "", "", ""]);
  const [roomScores, setRoomScores] = useState(["1", "1", "1", "1"]);

  useEffect(() => {
    const queryCountry = getCountryFromQueryParam(
      new URLSearchParams(window.location.search).get("country"),
    );

    setCountryCode(queryCountry ?? getDetectedCountry());
  }, []);

  const country = getCountryConfig(countryCode);
  const rent = safeNumber(monthlyRent);
  const count = safeNumber(tenantCount);
  const activeNames = names.slice(0, count);
  const activeIncomes = incomes.slice(0, count).map(safeNumber);
  const activeScores = roomScores.slice(0, count).map(safeNumber);
  const currency = (value: number) => formatCurrencyByCountry(value, country.code);
  const negativeInput = hasNegativeValue([monthlyRent, ...activeIncomes, ...activeScores]);
  const totalWeight =
    splitMethod === "income"
      ? activeIncomes.reduce((sum, income) => sum + income, 0)
      : splitMethod === "room"
        ? activeScores.reduce((sum, score) => sum + score, 0)
        : count;

  const rows = Array.from({ length: count }, (_, index) => {
    const weight =
      splitMethod === "income"
        ? activeIncomes[index]
        : splitMethod === "room"
          ? activeScores[index]
          : 1;
    const percentage = totalWeight > 0 ? (weight / totalWeight) * 100 : 0;
    return {
      name: activeNames[index] || `Roommate ${index + 1}`,
      share: totalWeight > 0 ? rent * (percentage / 100) : 0,
      percentage,
    };
  });

  const missingRequiredWeights =
    (splitMethod === "income" && activeIncomes.some((income) => income <= 0)) ||
    (splitMethod === "room" && activeScores.some((score) => score <= 0));

  let title = "Enter rent to split";
  let description = "Add monthly rent and choose a split method to estimate each roommate's share.";
  let tone: "positive" | "warning" | "neutral" = "neutral";

  if (negativeInput) {
    title = "Please check the numbers";
    description = "Rent, income, and room score fields cannot be negative.";
    tone = "warning";
  } else if (rent <= 0) {
    title = "Enter the monthly rent";
  } else if (missingRequiredWeights) {
    title = splitMethod === "income" ? "Add each roommate's income" : "Add each room score";
    description =
      splitMethod === "income"
        ? "Income-based splits need an income for every roommate."
        : "Room-size splits need a positive room score for every roommate.";
    tone = "warning";
  } else {
    title = "Estimated rent split";
    description =
      splitMethod === "equal"
        ? "Each roommate pays the same monthly share."
        : splitMethod === "income"
          ? "Each roommate pays a share based on their share of total income."
          : "Each roommate pays a share based on the room size scores.";
    tone = "positive";
  }

  const hasResult = rent > 0 && !negativeInput && !missingRequiredWeights;

  useCalculatorResultTracking({
    calculatorName: "Rent Split Calculator",
    selectedCountry: country.code,
    resultSignal: hasResult ? "Estimated split" : title,
    enabled: hasResult,
  });

  function updateList(
    setter: (value: string[]) => void,
    current: string[],
    index: number,
    value: string,
  ) {
    const next = [...current];
    next[index] = value;
    setter(next);
  }

  return (
    <CalculatorLayout
      form={
        <section className="form-card space-y-4 p-4 sm:p-5">
          <FormSection
            step="Step 1"
            title="Apartment location"
            description="United States dollars are used in the split table."
            columns="grid-cols-1"
          >
            <CountrySelector
              country={country}
              onChange={setCountryCode}
              calculatorName="Rent Split Calculator"
            />
          </FormSection>

          <FormSection
            step="Step 2"
            title="Rent details"
            description="Add the monthly rent and choose how many people are sharing."
          >
            <InputField id="monthly-rent" label="Monthly rent" value={monthlyRent} onChange={setMonthlyRent} prefix={country.currencySymbol} required />
            <SelectField id="tenant-count" label="Number of roommates" value={tenantCount} onChange={setTenantCount} options={[{ label: "2 roommates", value: "2" }, { label: "3 roommates", value: "3" }, { label: "4 roommates", value: "4" }]} />
          </FormSection>

          <FormSection
            step="Step 3"
            title="Split method"
            description="Choose whether to split equally, by income, or by room size."
            columns="grid-cols-1"
          >
            <SelectField id="split-method" label="Split method" value={splitMethod} onChange={(value) => setSplitMethod(value as SplitMethod)} options={[{ label: "Equal split", value: "equal" }, { label: "Income-based split", value: "income" }, { label: "Room-size split", value: "room" }]} />
          </FormSection>

          <FormSection
            step="Step 4"
            title="Roommate details"
            description="Names are optional. Income or room scores are only needed for those split methods."
            columns="md:grid-cols-2"
          >
            {Array.from({ length: count }, (_, index) => (
              <div key={index} className="rounded-2xl border border-[#d8e5f7] bg-white p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
                <InputField id={`tenant-name-${index}`} label={`Roommate ${index + 1} name`} value={names[index]} onChange={(value) => updateList(setNames, names, index, value)} placeholder={`Roommate ${index + 1}`} type="text" />
                {splitMethod === "income" ? (
                  <div className="mt-4">
                    <InputField id={`tenant-income-${index}`} label="Annual income" value={incomes[index]} onChange={(value) => updateList(setIncomes, incomes, index, value)} prefix={country.currencySymbol} required />
                  </div>
                ) : null}
                {splitMethod === "room" ? (
                  <div className="mt-4">
                    <InputField id={`room-score-${index}`} label="Room size score" value={roomScores[index]} onChange={(value) => updateList(setRoomScores, roomScores, index, value)} helpText="Example: small 1, medium 1.25, large 1.5" required />
                  </div>
                ) : null}
              </div>
            ))}
          </FormSection>
        </section>
      }
      result={
        <>
          <ResultCard title={title} description={description} tone={tone} badgeLabel={hasResult ? "Estimated split" : "Add details"}>
            {hasResult ? (
              <div className="overflow-x-auto rounded-2xl border border-[#d8e5f7] bg-white/82 shadow-[0_8px_18px_rgba(15,31,58,0.035)]">
                <table className="w-full min-w-[420px] text-left text-sm">
                  <thead className="border-b border-[#d8e5f7] text-[#53657f]">
                    <tr>
                      <th className="px-4 py-3">Roommate</th>
                      <th className="px-4 py-3">Monthly share</th>
                      <th className="px-4 py-3">Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={row.name} className="border-b border-[#edf4f1] last:border-0">
                        <td className="px-4 py-3 font-bold text-[#0f1f3a]">{row.name}</td>
                        <td className="px-4 py-3">{currency(row.share)}</td>
                        <td className="px-4 py-3">{formatPercentage(row.percentage)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </ResultCard>
          <HowEstimateWorks>
            The split method controls whether shares are equal, income-weighted,
            or based on room size scores.
          </HowEstimateWorks>
        </>
      }
    >
      <AdPlaceholder />
    </CalculatorLayout>
  );
}
