"use client";

import { useId, useState } from "react";
import { InputField } from "@/components/InputField";
import { SelectField } from "@/components/SelectField";
import {
  annualGrossIncome,
  DEFAULT_HOURS_PER_WEEK,
  DEFAULT_PAID_WEEKS,
  formatUSD,
  rentRules,
  type PayType,
} from "@/lib/incomeRent";
import { safeNumber } from "@/lib/calculations";

const payTypeOptions = [
  { label: "Yearly salary", value: "yearly" },
  { label: "Hourly pay", value: "hourly" },
];

export function IncomeRentCalculator({
  initialPayType,
  initialAmount,
  initialRent,
}: {
  initialPayType: PayType;
  initialAmount: number;
  initialRent: number;
}) {
  const [payType, setPayType] = useState<PayType>(initialPayType);
  const [amount, setAmount] = useState(String(initialAmount));
  const [hours, setHours] = useState(String(DEFAULT_HOURS_PER_WEEK));
  const [weeks, setWeeks] = useState(String(DEFAULT_PAID_WEEKS));
  const [rent, setRent] = useState(String(initialRent));
  const resultsId = useId();

  const amountValue = safeNumber(amount);
  const hoursValue = safeNumber(hours);
  const weeksValue = safeNumber(weeks);
  const rentValue = safeNumber(rent);

  const amountError =
    amount !== "" && amountValue <= 0 ? "Enter an amount above $0." : "";
  const hoursError =
    payType === "hourly" && (hoursValue <= 0 || hoursValue > 100)
      ? "Enter hours between 1 and 100."
      : "";
  const weeksError =
    payType === "hourly" && (weeksValue <= 0 || weeksValue > 52)
      ? "Enter weeks between 1 and 52."
      : "";
  const rentError = rent !== "" && rentValue < 0 ? "Rent cannot be negative." : "";

  const annual =
    amountError || hoursError || weeksError
      ? 0
      : annualGrossIncome({
          payType,
          amount: amountValue,
          hoursPerWeek: hoursValue,
          paidWeeks: weeksValue,
        });
  const monthly = annual / 12;
  const hasIncome = annual > 0;
  const hasRent = hasIncome && rentValue > 0 && !rentError;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
      <form
        className="form-card space-y-4 p-4 sm:p-5"
        onSubmit={(event) => event.preventDefault()}
        aria-describedby={`${resultsId}-note`}
      >
        <SelectField
          id="pay-type"
          label="How are you paid?"
          value={payType}
          onChange={(value) => {
            const next = value as PayType;
            // Convert the amount so switching doesn't turn $20/hr into a $20 salary.
            const hoursPerYear = (safeNumber(hours) || DEFAULT_HOURS_PER_WEEK) * (safeNumber(weeks) || DEFAULT_PAID_WEEKS);
            if (next !== payType && amountValue > 0) {
              setAmount(
                next === "yearly"
                  ? String(Math.round(amountValue * hoursPerYear))
                  : String(Math.round((amountValue / hoursPerYear) * 100) / 100),
              );
            }
            setPayType(next);
          }}
          options={payTypeOptions}
        />
        <InputField
          id="pay-amount"
          label={payType === "yearly" ? "Yearly salary (before tax)" : "Hourly pay (before tax)"}
          value={amount}
          onChange={setAmount}
          prefix="$"
          required
          error={amountError}
        />
        {payType === "hourly" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField
              id="hours-per-week"
              label="Hours per week"
              value={hours}
              onChange={setHours}
              helpText="40 = full time"
              error={hoursError}
            />
            <InputField
              id="paid-weeks"
              label="Paid weeks per year"
              value={weeks}
              onChange={setWeeks}
              helpText="Lower this for unpaid time off"
              error={weeksError}
            />
          </div>
        ) : null}
        <InputField
          id="rent-considering"
          label="Rent you're considering (optional)"
          value={rent}
          onChange={setRent}
          prefix="$"
          helpText="Monthly rent for a specific apartment"
          error={rentError}
        />
        <p id={`${resultsId}-note`} className="text-xs leading-5 text-[#53657f]">
          Uses gross income before tax. Results update as you type.
        </p>
      </form>

      <section
        aria-labelledby={`${resultsId}-heading`}
        className="premium-card space-y-4 p-4 sm:p-5"
      >
        <h3 id={`${resultsId}-heading`} className="text-lg font-extrabold text-[#0f1f3a]">
          Your estimate
        </h3>
        <p className="sr-only" aria-live="polite">
          {hasIncome
            ? rentRules
                .map((rule) => `${rule.name}: ${formatUSD(rule.maxRent(monthly))} a month`)
                .join(". ")
            : ""}
        </p>
        {hasIncome ? (
          <>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border border-[#d8e5f7] bg-[#f8fbff] p-3">
                <dt className="font-bold text-[#53657f]">Gross per year</dt>
                <dd className="mt-1 text-lg font-extrabold text-[#0f1f3a]">{formatUSD(annual)}</dd>
              </div>
              <div className="rounded-xl border border-[#d8e5f7] bg-[#f8fbff] p-3">
                <dt className="font-bold text-[#53657f]">Gross per month</dt>
                <dd className="mt-1 text-lg font-extrabold text-[#0f1f3a]">{formatUSD(monthly)}</dd>
              </div>
            </dl>
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Maximum monthly rent under each rule</caption>
              <thead>
                <tr className="border-b border-[#d8e5f7] text-[#53657f]">
                  <th scope="col" className="py-2 font-bold">Rule</th>
                  <th scope="col" className="py-2 text-right font-bold">Max rent / month</th>
                  {hasRent ? (
                    <th scope="col" className="py-2 text-right font-bold">Your rent</th>
                  ) : null}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e6eef9]">
                {rentRules.map((rule) => {
                  const max = rule.maxRent(monthly);
                  const fits = rentValue <= Math.round(max);
                  return (
                    <tr key={rule.id}>
                      <th scope="row" className="py-2.5 font-bold text-[#0f1f3a]">{rule.name}</th>
                      <td className="py-2.5 text-right font-extrabold text-[#0f1f3a]">{formatUSD(max)}</td>
                      {hasRent ? (
                        <td className={`py-2.5 text-right font-bold ${fits ? "text-[#15803d]" : "text-[#b84735]"}`}>
                          {fits ? "Within" : "Above"}
                        </td>
                      ) : null}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {hasRent ? (
              <p className="rounded-xl bg-[#eff6ff] p-3 text-sm leading-6 text-[#334765]">
                {formatUSD(rentValue)} rent is{" "}
                <strong>{((rentValue / monthly) * 100).toFixed(1)}%</strong> of your gross monthly
                income. A 3x example would look for about{" "}
                <strong>{formatUSD(rentValue * 36)}</strong> a year; 2.5x would look for about{" "}
                <strong>{formatUSD(rentValue * 30)}</strong>.
              </p>
            ) : null}
          </>
        ) : (
          <p className="text-sm leading-6 text-[#53657f]">
            Enter your pay to see estimates.
          </p>
        )}
        <p className="text-xs leading-5 text-[#53657f]">
          The 30% guideline is for total housing costs, such as rent plus utilities, so the
          rent that fits it is lower if you pay utilities separately. Rules of thumb only.
          Landlords set their own requirements and may also look at credit, debt, rental
          history and local rules.
        </p>
      </section>
    </div>
  );
}
