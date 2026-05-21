"use client";

import { CalculatorLayout, FormSection } from "@/components/CalculatorLayout";
import { InputField } from "@/components/InputField";
import { AnimatedStatCard } from "@/components/Motion";
import { SelectField } from "@/components/SelectField";
import { useMemo, useState } from "react";

type MoveInInputs = {
  monthlyRent: string;
  securityDeposit: string;
  firstMonthDue: "yes" | "no";
  lastMonthRequired: "yes" | "no";
  applicationFee: string;
  adminFee: string;
  petFee: string;
  movingCost: string;
  utilitySetup: string;
  internetSetup: string;
  rentersInsurance: string;
  furnitureBasics: string;
  emergencyBuffer: string;
  currentSavings: string;
};

const initialInputs: MoveInInputs = {
  monthlyRent: "",
  securityDeposit: "",
  firstMonthDue: "yes",
  lastMonthRequired: "no",
  applicationFee: "",
  adminFee: "",
  petFee: "",
  movingCost: "",
  utilitySetup: "",
  internetSetup: "",
  rentersInsurance: "",
  furnitureBasics: "",
  emergencyBuffer: "",
  currentSavings: "",
};

const yesNoOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function toNumber(value: string) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : 0;
}

export function MoveInCostCalculator() {
  const [inputs, setInputs] = useState<MoveInInputs>(initialInputs);
  const [hasCalculated, setHasCalculated] = useState(false);

  const result = useMemo(() => {
    const monthlyRent = toNumber(inputs.monthlyRent);
    const securityDeposit = toNumber(inputs.securityDeposit);
    const applicationFee = toNumber(inputs.applicationFee);
    const adminFee = toNumber(inputs.adminFee);
    const petFee = toNumber(inputs.petFee);
    const movingCost = toNumber(inputs.movingCost);
    const utilitySetup = toNumber(inputs.utilitySetup);
    const internetSetup = toNumber(inputs.internetSetup);
    const rentersInsurance = toNumber(inputs.rentersInsurance);
    const furnitureBasics = toNumber(inputs.furnitureBasics);
    const emergencyBuffer = toNumber(inputs.emergencyBuffer);
    const currentSavings = toNumber(inputs.currentSavings);
    const rentDue = inputs.firstMonthDue === "yes" ? monthlyRent : 0;
    const lastMonthCost = inputs.lastMonthRequired === "yes" ? monthlyRent : 0;
    const apartmentCosts = securityDeposit + rentDue + lastMonthCost;
    const fees = applicationFee + adminFee + petFee;
    const setupCosts =
      movingCost +
      utilitySetup +
      internetSetup +
      rentersInsurance +
      furnitureBasics;
    const totalMoveInCost =
      apartmentCosts + fees + setupCosts + emergencyBuffer;
    const savingsGap = Math.max(totalMoveInCost - currentSavings, 0);
    const savingsSurplus = Math.max(currentSavings - totalMoveInCost, 0);

    return {
      monthlyRent,
      securityDeposit,
      rentDue,
      lastMonthCost,
      applicationFee,
      adminFee,
      petFee,
      movingCost,
      utilitySetup,
      internetSetup,
      rentersInsurance,
      furnitureBasics,
      emergencyBuffer,
      currentSavings,
      apartmentCosts,
      fees,
      setupCosts,
      totalMoveInCost,
      savingsGap,
      savingsSurplus,
    };
  }, [inputs]);

  function updateInput<K extends keyof MoveInInputs>(
    key: K,
    value: MoveInInputs[K],
  ) {
    setInputs((current) => ({ ...current, [key]: value }));
  }

  function handleReset() {
    setInputs(initialInputs);
    setHasCalculated(false);
  }

  const savingsLabel = result.savingsGap > 0 ? "Savings gap" : "Savings surplus";
  const savingsValue =
    result.savingsGap > 0 ? result.savingsGap : result.savingsSurplus;

  return (
    <CalculatorLayout
      form={
        <form
          id="move-in-cost-form"
          className="form-card space-y-4 p-4 sm:p-5"
          onSubmit={(event) => {
            event.preventDefault();
            setHasCalculated(true);
          }}
        >
          <FormSection
            step="Step 1"
            title="Apartment costs"
            description="Add the rent and deposits the landlord or property manager expects before lease start."
          >
            <InputField
              id="monthly-rent"
              label="Monthly rent"
              value={inputs.monthlyRent}
              onChange={(value) => updateInput("monthlyRent", value)}
              prefix="$"
              required
            />
            <InputField
              id="security-deposit"
              label="Security deposit"
              value={inputs.securityDeposit}
              onChange={(value) => updateInput("securityDeposit", value)}
              prefix="$"
            />
            <SelectField
              id="first-month-due"
              label="First month’s rent due before move-in?"
              value={inputs.firstMonthDue}
              onChange={(value) =>
                updateInput("firstMonthDue", value as MoveInInputs["firstMonthDue"])
              }
              options={yesNoOptions}
            />
            <SelectField
              id="last-month-required"
              label="Last month’s rent required?"
              value={inputs.lastMonthRequired}
              onChange={(value) =>
                updateInput(
                  "lastMonthRequired",
                  value as MoveInInputs["lastMonthRequired"],
                )
              }
              options={yesNoOptions}
            />
          </FormSection>

          <FormSection
            step="Step 2"
            title="Fees"
            description="Include common application and holding costs from the apartment listing."
          >
            <InputField
              id="application-fee"
              label="Application fee"
              value={inputs.applicationFee}
              onChange={(value) => updateInput("applicationFee", value)}
              prefix="$"
            />
            <InputField
              id="admin-fee"
              label="Admin or holding fee"
              value={inputs.adminFee}
              onChange={(value) => updateInput("adminFee", value)}
              prefix="$"
            />
            <InputField
              id="pet-fee"
              label="Pet deposit or pet fee"
              value={inputs.petFee}
              onChange={(value) => updateInput("petFee", value)}
              prefix="$"
            />
          </FormSection>

          <FormSection
            step="Step 3"
            title="Moving and setup"
            description="Add the practical costs of getting into the apartment and making it livable."
          >
            <InputField
              id="moving-cost"
              label="Moving truck or movers"
              value={inputs.movingCost}
              onChange={(value) => updateInput("movingCost", value)}
              prefix="$"
            />
            <InputField
              id="utility-setup"
              label="Utility setup"
              value={inputs.utilitySetup}
              onChange={(value) => updateInput("utilitySetup", value)}
              prefix="$"
            />
            <InputField
              id="internet-setup"
              label="Internet setup"
              value={inputs.internetSetup}
              onChange={(value) => updateInput("internetSetup", value)}
              prefix="$"
            />
            <InputField
              id="renters-insurance"
              label="Renters insurance estimate"
              value={inputs.rentersInsurance}
              onChange={(value) => updateInput("rentersInsurance", value)}
              prefix="$"
            />
            <InputField
              id="furniture-basics"
              label="Furniture and household basics"
              value={inputs.furnitureBasics}
              onChange={(value) => updateInput("furnitureBasics", value)}
              prefix="$"
            />
          </FormSection>

          <FormSection
            step="Step 4"
            title="Savings plan"
            description="Compare the move-in estimate with the cash you have set aside."
          >
            <InputField
              id="emergency-buffer"
              label="Emergency buffer"
              value={inputs.emergencyBuffer}
              onChange={(value) => updateInput("emergencyBuffer", value)}
              prefix="$"
            />
            <InputField
              id="current-savings"
              label="Current savings"
              value={inputs.currentSavings}
              onChange={(value) => updateInput("currentSavings", value)}
              prefix="$"
            />
          </FormSection>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button type="submit" className="btn-primary">
              Calculate Move-In Costs
            </button>
            <button type="button" className="btn-secondary" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>
      }
      result={
        <section className="space-y-4">
          <div className="rounded-2xl border border-[#bfdbfe] bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-5 shadow-[0_20px_45px_rgba(37,99,235,0.14)]">
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#2563eb]">
              Result dashboard
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-[-0.02em] text-[#0f1f3a]">
              Estimated move-in cash needed
            </h2>
            <p className="mt-2 text-4xl font-black tracking-[-0.04em] text-[#1d4ed8]">
              {currency.format(result.totalMoveInCost)}
            </p>
            <div className="mt-4 rounded-2xl border border-[#d8e5f7] bg-white p-4">
              <p className="text-sm font-bold text-[#53657f]">{savingsLabel}</p>
              <p
                className={`mt-1 text-2xl font-black ${
                  result.savingsGap > 0 ? "text-[#b84735]" : "text-[#15803d]"
                }`}
              >
                {currency.format(savingsValue)}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#53657f]">
                {hasCalculated
                  ? getSavingsMessage(result.savingsGap)
                  : "Add your details and calculate to compare estimated move-in costs with current savings."}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <AnimatedStatCard
              label="Apartment costs"
              value={currency.format(result.apartmentCosts)}
            />
            <AnimatedStatCard label="Fees" value={currency.format(result.fees)} />
            <AnimatedStatCard
              label="Moving and setup"
              value={currency.format(result.setupCosts)}
            />
            <AnimatedStatCard
              label="Emergency buffer"
              value={currency.format(result.emergencyBuffer)}
            />
          </div>

          <div className="rounded-2xl border border-[#d8e5f7] bg-white p-5 shadow-[0_12px_28px_rgba(15,31,58,0.07)]">
            <h3 className="text-lg font-extrabold text-[#0f1f3a]">
              Detailed breakdown
            </h3>
            <dl className="mt-4 space-y-3 text-sm">
              <BreakdownRow label="Security deposit" value={result.securityDeposit} />
              <BreakdownRow label="First month’s rent" value={result.rentDue} />
              <BreakdownRow label="Last month’s rent" value={result.lastMonthCost} />
              <BreakdownRow label="Application fee" value={result.applicationFee} />
              <BreakdownRow label="Admin or holding fee" value={result.adminFee} />
              <BreakdownRow label="Pet deposit or pet fee" value={result.petFee} />
              <BreakdownRow label="Moving truck or movers" value={result.movingCost} />
              <BreakdownRow label="Utility setup" value={result.utilitySetup} />
              <BreakdownRow label="Internet setup" value={result.internetSetup} />
              <BreakdownRow
                label="Renters insurance estimate"
                value={result.rentersInsurance}
              />
              <BreakdownRow
                label="Furniture and household basics"
                value={result.furnitureBasics}
              />
              <BreakdownRow label="Emergency buffer" value={result.emergencyBuffer} />
              <BreakdownRow label="Current savings" value={result.currentSavings} />
            </dl>
          </div>

          <div className="rounded-2xl border border-[#d8e5f7] bg-white p-5 shadow-[0_12px_28px_rgba(15,31,58,0.07)]">
            <h3 className="text-lg font-extrabold text-[#0f1f3a]">
              Personalized tips
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[#53657f]">
              {getTips(result).map((tip) => (
                <li key={tip} className="rounded-xl bg-[#f8fbff] p-3">
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </section>
      }
    />
  );
}

function BreakdownRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#eef3fb] pb-3 last:border-b-0 last:pb-0">
      <dt className="font-semibold text-[#53657f]">{label}</dt>
      <dd className="shrink-0 font-extrabold text-[#0f1f3a]">
        {currency.format(value)}
      </dd>
    </div>
  );
}

function getSavingsMessage(savingsGap: number) {
  if (savingsGap > 0) {
    return "This estimate is above current savings. Consider adding a buffer before signing the lease.";
  }

  return "Current savings cover this estimate. Keep a separate cushion for timing changes, utility deposits, and move-in week surprises.";
}

function getTips(result: {
  savingsGap: number;
  emergencyBuffer: number;
  furnitureBasics: number;
  fees: number;
  currentSavings: number;
}) {
  const tips = [
    "Ask the property manager for a written list of all amounts due before keys are released.",
  ];

  if (result.savingsGap > 0) {
    tips.push(
      "Prioritize the security deposit, lease payments due upfront, and application fee before optional setup purchases.",
    );
  } else if (result.currentSavings > 0) {
    tips.push(
      "Keep the surplus separate from regular spending until every lease and utility payment has cleared.",
    );
  }

  if (result.emergencyBuffer === 0) {
    tips.push(
      "Add an emergency buffer for cleaning supplies, parking, utility deposits, and small apartment essentials.",
    );
  }

  if (result.furnitureBasics > 0) {
    tips.push(
      "Separate must-have household basics from items that can wait until after move-in day.",
    );
  }

  if (result.fees > 0) {
    tips.push(
      "Confirm whether any application, admin, holding, or pet fee is refundable before paying.",
    );
  }

  return tips;
}
