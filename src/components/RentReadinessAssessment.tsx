"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  calculateReadinessScore,
  type CosignerOption,
  type CreditConfidence,
  type MoveInTimeframe,
  type ReadinessScoreInput,
  type ReadinessScoreResult,
  type RoommateOption,
} from "@/lib/readinessScore";

type FormValues = {
  monthlyRent: string;
  annualIncome: string;
  savings: string;
  monthlyDebt: string;
  cosigner: CosignerOption;
  roommate: RoommateOption;
  creditConfidence: CreditConfidence;
  moveInTimeframe: MoveInTimeframe;
};

const defaults: FormValues = {
  monthlyRent: "1800",
  annualIncome: "72000",
  savings: "5000",
  monthlyDebt: "250",
  cosigner: "No" as CosignerOption,
  roommate: "No" as RoommateOption,
  creditConfidence: "Average" as CreditConfidence,
  moveInTimeframe: "1-3 months" as MoveInTimeframe,
};

const relatedTools = [
  {
    title: "Rent Affordability Calculator",
    description: "Compare income with a monthly apartment target.",
    href: "/rent-referencing-calculator",
  },
  {
    title: "Co-signer Income Calculator",
    description: "Estimate what support income may look like.",
    href: "/guarantor-income-calculator",
  },
  {
    title: "Roommate Affordability Calculator",
    description: "See how shared rent can change affordability.",
    href: "/joint-tenant-affordability-calculator",
  },
  {
    title: "Move-In Cost Calculator",
    description: "Plan security deposit, first month, and setup costs.",
    href: "/move-in-cost-calculator",
  },
  {
    title: "Rent Split Calculator",
    description: "Split apartment rent clearly with a roommate.",
    href: "/rent-split-calculator",
  },
];

const estimateCards = [
  {
    title: "Income strength",
    copy: "Compares gross monthly income with monthly rent using common 2.5x and 3x examples.",
  },
  {
    title: "Savings buffer",
    copy: "Looks at whether savings may cover security deposit, first month's rent, and setup costs.",
  },
  {
    title: "Debt pressure",
    copy: "Considers how monthly debt may affect flexibility.",
  },
  {
    title: "Application support",
    copy: "Considers co-signer support, roommate options, credit confidence, and timing.",
  },
];

function toNumber(value: string) {
  if (value.trim() === "") return Number.NaN;
  return Number(value);
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(value)));
}

function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`;
}

function buildInput(values: FormValues): ReadinessScoreInput {
  return {
    monthlyRent: toNumber(values.monthlyRent),
    annualIncome: toNumber(values.annualIncome),
    savings: toNumber(values.savings),
    monthlyDebt: toNumber(values.monthlyDebt),
    cosigner: values.cosigner,
    roommate: values.roommate,
    creditConfidence: values.creditConfidence,
    moveInTimeframe: values.moveInTimeframe,
  };
}

function validate(input: ReadinessScoreInput) {
  const errors: Partial<Record<keyof ReadinessScoreInput, string>> = {};

  if (!Number.isFinite(input.monthlyRent) || input.monthlyRent <= 0) {
    errors.monthlyRent = "Enter a monthly rent greater than $0.";
  }

  if (!Number.isFinite(input.annualIncome) || input.annualIncome <= 0) {
    errors.annualIncome = "Enter annual income greater than $0.";
  }

  if (!Number.isFinite(input.savings) || input.savings < 0) {
    errors.savings = "Savings cannot be negative.";
  }

  if (!Number.isFinite(input.monthlyDebt) || input.monthlyDebt < 0) {
    errors.monthlyDebt = "Monthly debt cannot be negative.";
  }

  return errors;
}

function Field({
  label,
  value,
  onChange,
  error,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-[#263a5c]">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#7b8ca8]">
          $
        </span>
        <input
          className={`field-control min-h-12 pl-8 text-base font-bold ${
            error ? "border-[#93c5fd] bg-[#f8fbff]" : ""
          }`}
          inputMode="numeric"
          min="0"
          type="number"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
        />
      </div>
      {error ? (
        <p className="mt-2 text-sm font-semibold text-[#1d4ed8]">{error}</p>
      ) : null}
    </div>
  );
}

function OptionGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-bold text-[#263a5c]">{label}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`min-h-11 rounded-2xl border px-3 py-2 text-left text-sm font-bold transition ${
              value === option
                ? "border-[#2563eb] bg-[#eff6ff] text-[#1d4ed8] shadow-[0_10px_22px_rgba(37,99,235,0.12)]"
                : "border-[#d8e5f7] bg-white text-[#334765] hover:border-[#93c5fd]"
            }`}
            aria-pressed={value === option}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function ProgressBar({ score }: { score: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm font-bold text-[#334765]">
        <span>Readiness progress</span>
        <span>{score}%</span>
      </div>
      <div className="h-4 overflow-hidden rounded-full bg-[#e2e8f0]">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,#2563eb_0%,#14b8a6_100%)] transition-[width] duration-200"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

function ResultDashboard({ result }: { result: ReadinessScoreResult }) {
  const keyNumbers = [
    { label: "Income multiple", value: `${result.rentMultiple.toFixed(1)}x` },
    { label: "Rent-to-income", value: formatPercent(result.rentToIncomePercent) },
    {
      label: "Estimated move-in need",
      value: formatCurrency(result.estimatedMoveInNeed),
    },
    {
      label: result.savingsGap > 0 ? "Savings gap" : "Savings surplus",
      value: formatCurrency(
        result.savingsGap > 0 ? result.savingsGap : result.savingsSurplus,
      ),
    },
  ];

  return (
    <section
      aria-live="polite"
      className="premium-card-strong overflow-hidden p-6 sm:p-7"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-[#2563eb]">
            Rent Readiness Score
          </p>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-6xl font-black leading-none tracking-[-0.04em] text-[#0f1f3a]">
              {result.score}
            </span>
            <span className="pb-2 text-xl font-extrabold text-[#53657f]">
              /100
            </span>
          </div>
        </div>
        <span className="rounded-full border border-[#bdd3f5] bg-white px-4 py-2 text-sm font-black text-[#1d4ed8]">
          {result.label}
        </span>
      </div>

      <div className="mt-6">
        <ProgressBar score={result.score} />
      </div>

      <div className="mt-6 rounded-[22px] border border-[#d8e5f7] bg-white p-5">
        <p className="text-sm font-black uppercase tracking-[0.14em] text-[#7b8ca8]">
          Your Rent Twin
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.02em] text-[#0f1f3a]">
          {result.rentTwin.title}
        </h2>
        <p className="mt-2 leading-7 text-[#53657f]">
          {result.rentTwin.explanation}
        </p>
      </div>

      <div className="mt-5 rounded-[22px] border border-[#bfdbfe] bg-[#eff6ff] p-5">
        <p className="text-sm font-black uppercase tracking-[0.14em] text-[#1d4ed8]">
          Top next step
        </p>
        <p className="mt-2 text-lg font-black leading-7 text-[#0f1f3a]">
          {result.topNextStep}
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {keyNumbers.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-[#d8e5f7] bg-white p-4"
          >
            <p className="text-xs font-black uppercase tracking-[0.12em] text-[#7b8ca8]">
              {item.label}
            </p>
            <p className="mt-1 text-xl font-black text-[#0f1f3a]">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function EmptyResultCard() {
  return (
    <aside className="premium-card-strong p-6 sm:p-7">
      <p className="text-sm font-black uppercase tracking-[0.16em] text-[#2563eb]">
        Live summary
      </p>
      <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[#0f1f3a]">
        Your score dashboard will appear here
      </h2>
      <p className="mt-3 leading-7 text-[#53657f]">
        Complete the guided assessment and calculate your estimate to see your
        score, Rent Twin, watch-outs, and next best step.
      </p>
      <div className="mt-6 rounded-[22px] border border-dashed border-[#bdd3f5] bg-white p-5">
        <div className="h-4 rounded-full bg-[#e2e8f0]" />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="h-20 rounded-2xl bg-[#f1f7ff]" />
          <div className="h-20 rounded-2xl bg-[#f1f7ff]" />
        </div>
      </div>
    </aside>
  );
}

function CategoryBreakdown({ result }: { result: ReadinessScoreResult }) {
  const categories = [
    {
      title: "Income strength",
      points: result.categories.income.points,
      max: result.categories.income.max,
      metric: `${result.rentMultiple.toFixed(1)}x income multiple`,
      note: result.categories.income.note,
    },
    {
      title: "Savings buffer",
      points: result.categories.savings.points,
      max: result.categories.savings.max,
      metric:
        result.savingsGap > 0
          ? `${formatCurrency(result.savingsGap)} gap`
          : `${formatCurrency(result.savingsSurplus)} surplus`,
      note: `Estimated move-in need: ${formatCurrency(result.estimatedMoveInNeed)}. ${result.categories.savings.note}`,
    },
    {
      title: "Debt pressure",
      points: result.categories.debt.points,
      max: result.categories.debt.max,
      metric: `${formatPercent(result.debtRatio)} debt ratio`,
      note: result.categories.debt.note,
    },
    {
      title: "Application support",
      points: result.categories.support.points,
      max: result.categories.support.max,
      metric: `${result.categories.support.points}/10 support points`,
      note: result.categories.support.note,
    },
    {
      title: "Flexibility",
      points: result.categories.flexibility.points,
      max: result.categories.flexibility.max,
      metric: `${result.categories.flexibility.points}/10 flexibility points`,
      note: result.categories.flexibility.note,
    },
  ];

  return (
    <section className="site-container py-12">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-black tracking-[-0.03em] text-[#0f1f3a]">
          Category breakdown
        </h2>
        <p className="mt-3 leading-7 text-[#53657f]">
          Each category shows where your estimate looks stronger and where a
          small change may help.
        </p>
      </div>
      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {categories.map((category) => (
          <article
            key={category.title}
            className="flex min-h-[230px] flex-col rounded-[24px] border border-[#d8e5f7] bg-white p-5 shadow-[0_14px_34px_rgba(15,31,58,0.06)]"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-black leading-6 text-[#0f1f3a]">
                {category.title}
              </h3>
              <span className="rounded-full bg-[#eff6ff] px-3 py-1 text-sm font-black text-[#1d4ed8]">
                {category.points}/{category.max}
              </span>
            </div>
            <p className="mt-5 text-xl font-black text-[#2563eb]">
              {category.metric}
            </p>
            <p className="mt-3 leading-7 text-[#53657f]">{category.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function StrengthsAndWatchOuts({ result }: { result: ReadinessScoreResult }) {
  return (
    <section className="site-container grid gap-5 py-8 lg:grid-cols-2">
      <article className="rounded-[26px] border border-[#d8e5f7] bg-white p-6 shadow-[0_14px_34px_rgba(15,31,58,0.06)]">
        <h2 className="text-2xl font-black tracking-[-0.02em] text-[#0f1f3a]">
          Strengths
        </h2>
        <ul className="mt-5 space-y-3">
          {result.strengths.map((strength) => (
            <li key={strength} className="flex gap-3 leading-7 text-[#334765]">
              <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#2563eb]" />
              <span>{strength}</span>
            </li>
          ))}
        </ul>
      </article>

      <article className="rounded-[26px] border border-[#d8e5f7] bg-white p-6 shadow-[0_14px_34px_rgba(15,31,58,0.06)]">
        <h2 className="text-2xl font-black tracking-[-0.02em] text-[#0f1f3a]">
          Watch-outs
        </h2>
        <ul className="mt-5 space-y-3">
          {result.watchOuts.map((watchOut) => (
            <li key={watchOut} className="flex gap-3 leading-7 text-[#334765]">
              <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#38bdf8]" />
              <span>{watchOut}</span>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}

function NextSteps({ result }: { result: ReadinessScoreResult }) {
  return (
    <section className="site-container py-8">
      <article className="rounded-[28px] border border-[#bdd3f5] bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_58%,#f0f9ff_100%)] p-6 shadow-[0_22px_55px_rgba(37,99,235,0.11)] sm:p-8">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#2563eb]">
          Your next best step
        </p>
        <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-[-0.03em] text-[#0f1f3a]">
          {result.topNextStep}
        </h2>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {result.supportingActions.map((action) => (
            <div
              key={action}
              className="rounded-2xl border border-[#d8e5f7] bg-white p-4 font-bold leading-7 text-[#334765]"
            >
              {action}
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

function HowEstimated() {
  return (
    <section className="site-container py-12">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-black tracking-[-0.03em] text-[#0f1f3a]">
          How your score is estimated
        </h2>
      </div>
      <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {estimateCards.map((card) => (
          <article
            key={card.title}
            className="rounded-[24px] border border-[#d8e5f7] bg-white p-5 shadow-[0_14px_34px_rgba(15,31,58,0.06)]"
          >
            <h3 className="text-lg font-black text-[#0f1f3a]">{card.title}</h3>
            <p className="mt-3 leading-7 text-[#53657f]">{card.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function RelatedTools() {
  return (
    <section className="site-container py-12">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-black tracking-[-0.03em] text-[#0f1f3a]">
          Related tools
        </h2>
        <p className="mt-3 leading-7 text-[#53657f]">
          Use these calculators to compare a specific part of your rental plan.
        </p>
      </div>
      <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {relatedTools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group rounded-[24px] border border-[#d8e5f7] bg-white p-5 text-left no-underline shadow-[0_14px_34px_rgba(15,31,58,0.06)] transition hover:-translate-y-0.5 hover:border-[#93c5fd]"
          >
            <h3 className="text-lg font-black leading-6 text-[#0f1f3a] group-hover:text-[#1d4ed8]">
              {tool.title}
            </h3>
            <p className="mt-3 leading-7 text-[#53657f]">{tool.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function RentReadinessAssessment() {
  const [values, setValues] = useState(defaults);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ReadinessScoreInput, string>>
  >({});

  const input = useMemo(() => buildInput(values), [values]);
  const currentErrors = useMemo(() => validate(input), [input]);
  const result = useMemo(
    () =>
      Object.keys(currentErrors).length === 0
        ? calculateReadinessScore(input)
        : null,
    [currentErrors, input],
  );

  const update = <Key extends keyof FormValues>(key: Key, value: FormValues[Key]) => {
    const nextValues = { ...values, [key]: value };
    setValues(nextValues);
    if (hasCalculated) {
      setErrors(validate(buildInput(nextValues)));
    }
  };

  const calculate = () => {
    setErrors(currentErrors);
    if (Object.keys(currentErrors).length === 0) {
      setHasCalculated(true);
    }
  };

  const reset = () => {
    setValues(defaults);
    setHasCalculated(false);
    setErrors({});
  };

  return (
    <>
      <section className="bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] py-14 sm:py-18">
        <div className="site-container">
          <div className="max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#2563eb]">
              RENT READINESS SCORE
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-[-0.04em] text-[#0f1f3a] sm:text-6xl">
              Check your rent readiness before you apply
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#53657f]">
              Answer a few questions to estimate your apartment affordability,
              move-in savings buffer, debt pressure, co-signer support, and next
              best step.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {[
                "Free estimate",
                "No sign-up required",
                "Inputs stay in your browser",
                "Built for US renters",
              ].map((item) => (
                <span key={item} className="trust-pill">
                  {item}
                </span>
              ))}
            </div>
            <a href="#score-form" className="btn-primary mt-8">
              Start the check
            </a>
          </div>
        </div>
      </section>

      <section id="score-form" className="site-container scroll-mt-24 py-12">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:items-start">
          <form
            className="form-card p-5 sm:p-7"
            onSubmit={(event) => {
              event.preventDefault();
              calculate();
            }}
            noValidate
          >
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#2563eb]">
                Guided assessment
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] text-[#0f1f3a]">
                Start with the basics
              </h2>
              <p className="mt-3 leading-7 text-[#53657f]">
                Use rough numbers. This estimate is designed to help you
                understand your position before applying.
              </p>
            </div>

            <div className="mt-7 space-y-6">
              <div className="rounded-[24px] border border-[#d8e5f7] bg-white p-5">
                <h3 className="text-xl font-black text-[#0f1f3a]">
                  Apartment target
                </h3>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <Field
                    label="Monthly rent"
                    value={values.monthlyRent}
                    onChange={(value) => update("monthlyRent", value)}
                    error={errors.monthlyRent}
                  />
                  <OptionGroup
                    label="Renting with roommate?"
                    options={["No", "Yes", "Not sure"] as const}
                    value={values.roommate}
                    onChange={(value) => update("roommate", value)}
                  />
                </div>
              </div>

              <div className="rounded-[24px] border border-[#d8e5f7] bg-white p-5">
                <h3 className="text-xl font-black text-[#0f1f3a]">
                  Income and debt
                </h3>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <Field
                    label="Annual income"
                    value={values.annualIncome}
                    onChange={(value) => update("annualIncome", value)}
                    error={errors.annualIncome}
                  />
                  <Field
                    label="Monthly debt payments"
                    value={values.monthlyDebt}
                    onChange={(value) => update("monthlyDebt", value)}
                    error={errors.monthlyDebt}
                  />
                </div>
              </div>

              <div className="rounded-[24px] border border-[#d8e5f7] bg-white p-5">
                <h3 className="text-xl font-black text-[#0f1f3a]">
                  Move-in readiness
                </h3>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <Field
                    label="Savings available for move-in"
                    value={values.savings}
                    onChange={(value) => update("savings", value)}
                    error={errors.savings}
                  />
                  <OptionGroup
                    label="Move-in timeframe"
                    options={[
                      "This month",
                      "1-3 months",
                      "3+ months",
                      "Just exploring",
                    ] as const}
                    value={values.moveInTimeframe}
                    onChange={(value) => update("moveInTimeframe", value)}
                  />
                </div>
              </div>

              <div className="rounded-[24px] border border-[#d8e5f7] bg-white p-5">
                <h3 className="text-xl font-black text-[#0f1f3a]">
                  Application support
                </h3>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <OptionGroup
                    label="Co-signer available?"
                    options={["No", "Yes", "Not sure"] as const}
                    value={values.cosigner}
                    onChange={(value) => update("cosigner", value)}
                  />
                  <OptionGroup
                    label="Credit confidence"
                    options={[
                      "Strong",
                      "Average",
                      "Limited or rebuilding",
                      "Prefer not to say",
                    ] as const}
                    value={values.creditConfidence}
                    onChange={(value) => update("creditConfidence", value)}
                  />
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button type="submit" className="btn-primary min-h-12 sm:flex-1">
                Calculate My Score
              </button>
              <button
                type="button"
                className="btn-secondary min-h-12 sm:w-36"
                onClick={reset}
              >
                Reset
              </button>
            </div>
          </form>

          <div className="lg:sticky lg:top-24">
            {hasCalculated && result ? (
              <ResultDashboard result={result} />
            ) : (
              <EmptyResultCard />
            )}
          </div>
        </div>
      </section>

      {hasCalculated && result ? (
        <>
          <CategoryBreakdown result={result} />
          <StrengthsAndWatchOuts result={result} />
          <NextSteps result={result} />
        </>
      ) : null}

      <HowEstimated />
      <RelatedTools />

      <section className="site-container pb-16">
        <aside className="rounded-[24px] border border-[#bdd3f5] bg-[#eff6ff] p-5 leading-7 text-[#334765]">
          <strong className="text-[#0f1f3a]">Estimate disclaimer: </strong>
          This is an estimate only. Rental decisions can depend on landlord or
          property manager rules, credit history, background checks, employment
          verification, savings, application history, co-signers, local laws,
          and other factors. RentReadyCheck is not financial or legal advice.
        </aside>
      </section>
    </>
  );
}
