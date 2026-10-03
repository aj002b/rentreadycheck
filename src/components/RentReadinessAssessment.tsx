"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ScoreGauge, scoreLevel } from "@/components/ScoreGauge";
import {
  calculateReadinessScore,
  getScoreImprovements,
  quickScoreAssumptions,
  type CosignerOption,
  type CreditConfidence,
  type MoveInTimeframe,
  type ReadinessScoreInput,
  type ReadinessScoreResult,
  type RoommateOption,
} from "@/lib/readinessScore";
import { rentReadinessFaqs } from "@/lib/rentReadinessFaqs";

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
  roommate: quickScoreAssumptions.roommate as RoommateOption,
  creditConfidence: quickScoreAssumptions.creditConfidence as CreditConfidence,
  moveInTimeframe: quickScoreAssumptions.moveInTimeframe as MoveInTimeframe,
};

const relatedTools = [
  {
    title: "Rent Affordability Calculator",
    description: "Compare income with a monthly apartment target.",
    cta: "Check affordability",
    href: "/rent-referencing-calculator",
  },
  {
    title: "Co-signer Income Calculator",
    description: "Estimate what support income may look like.",
    cta: "Estimate support",
    href: "/guarantor-income-calculator",
  },
  {
    title: "Roommate Affordability Calculator",
    description: "See how shared rent can change affordability.",
    cta: "Check roommate income",
    href: "/joint-tenant-affordability-calculator",
  },
  {
    title: "Move-In Cost Calculator",
    description: "Plan security deposit, first month, and setup costs.",
    cta: "Estimate move-in costs",
    href: "/move-in-cost-calculator",
  },
  {
    title: "Rent Split Calculator",
    description: "Split apartment rent clearly with a roommate.",
    cta: "Split rent",
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
      <label className="mb-2 block text-sm font-bold text-ink-2">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-muted">
          $
        </span>
        <input
          className={`field-control min-h-12 pl-8 text-base font-bold ${
            error ? "border-rule-strong bg-paper" : ""
          }`}
          inputMode="numeric"
          min="0"
          type="number"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-label={label}
          aria-invalid={Boolean(error)}
        />
      </div>
      {error ? (
        <p className="mt-2 text-sm font-semibold text-accent-dark">{error}</p>
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
      <p className="mb-2 text-sm font-bold text-ink-2">{label}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`min-h-11 rounded-xl border px-3 py-2 text-left text-sm font-bold transition ${
              value === option
                ? "border-accent bg-accent-soft text-accent-dark"
                : "border-rule bg-white text-ink-2 hover:border-rule-strong"
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
      className="premium-card-strong overflow-hidden p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm font-semibold text-muted">
          Rent Readiness Score
        </p>
        <span
          className="status-chip"
          style={{ background: scoreLevel(result.score).soft, color: scoreLevel(result.score).text }}
        >
          {result.label}
        </span>
      </div>

      <div className="mt-4">
        <ScoreGauge score={result.score} label={result.label} size="lg" />
        <p className="sr-only">
          Score {result.score} out of 100, {result.label}
        </p>
      </div>

      <div className="mt-5 rounded-xl border border-rule bg-white p-4">
        <p className="text-sm font-bold text-muted">
          Your Rent Twin
        </p>
        <h2 className="mt-2 text-2xl font-bold text-ink">
          {result.rentTwin.title}
        </h2>
        <p className="mt-2 leading-7 text-muted">
          {result.rentTwin.explanation}
        </p>
      </div>

      <div className="mt-4 rounded-xl border border-rule bg-accent-soft p-4">
        <p className="text-sm font-bold text-accent-dark">
          Top next step
        </p>
        <p className="mt-2 text-lg font-bold leading-7 text-ink">
          {result.topNextStep}
        </p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {keyNumbers.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-rule bg-white p-3.5"
          >
            <p className="text-xs font-bold text-muted">
              {item.label}
            </p>
            <p className="mt-1 text-xl font-bold text-ink">
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
    <aside className="premium-card-strong p-5 sm:p-6">
      <p className="text-sm font-bold text-accent">
        Live summary
      </p>
      <h2 className="mt-2 text-2xl font-bold text-ink">
        Complete the form to see your Rent Readiness Score.
      </h2>
      <p className="mt-3 leading-7 text-muted">
        Calculate your estimate to see your score, Rent Twin, watch-outs, and
        next best step.
      </p>
      <div className="mt-5 rounded-xl border border-dashed border-rule bg-white p-4">
        <div className="h-3 rounded-full bg-rule" />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="h-14 rounded-xl bg-accent-soft" />
          <div className="h-14 rounded-xl bg-accent-soft" />
        </div>
      </div>
    </aside>
  );
}

function CategoryBreakdown({
  result,
  input,
}: {
  result: ReadinessScoreResult;
  input: ReadinessScoreInput;
}) {
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
      metric: `Co-signer: ${input.cosigner}`,
      note: result.categories.support.note,
    },
    {
      title: "Flexibility",
      points: result.categories.flexibility.points,
      max: result.categories.flexibility.max,
      metric: `Roommate: ${input.roommate}`,
      note: `${result.categories.flexibility.note} Credit: ${input.creditConfidence}. Timing: ${input.moveInTimeframe}.`,
    },
  ];

  return (
    <section className="site-container py-10">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-bold text-ink">
          Category breakdown
        </h2>
        <p className="mt-3 leading-7 text-muted">
          Each category shows where your estimate looks stronger and where a
          small change may help.
        </p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {categories.map((category) => (
          <article
            key={category.title}
            className="flex min-h-[200px] flex-col rounded-xl border border-rule bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-bold leading-6 text-ink">
                {category.title}
              </h3>
              <span className="rounded-full bg-accent-soft px-3 py-1 text-sm font-bold text-accent-dark">
                {category.points}/{category.max}
              </span>
            </div>
            <p className="mt-4 text-lg font-bold text-accent">
              {category.metric}
            </p>
            <p className="mt-2 leading-6 text-muted">{category.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function StrengthsAndWatchOuts({ result }: { result: ReadinessScoreResult }) {
  return (
    <section className="site-container grid gap-5 py-6 lg:grid-cols-2">
      <article className="rounded-xl border border-rule bg-white p-5">
        <h2 className="text-2xl font-bold text-ink">
          Strengths
        </h2>
        <ul className="mt-4 space-y-2.5">
          {result.strengths.map((strength) => (
            <li key={strength} className="flex gap-3 leading-7 text-ink-2">
              <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
              <span>{strength}</span>
            </li>
          ))}
        </ul>
      </article>

      <article className="rounded-xl border border-rule bg-white p-5">
        <h2 className="text-2xl font-bold text-ink">
          Watch-outs
        </h2>
        <ul className="mt-4 space-y-2.5">
          {result.watchOuts.map((watchOut) => (
            <li key={watchOut} className="flex gap-3 leading-7 text-ink-2">
              <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
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
    <section className="site-container py-6">
      <article className="rounded-xl border border-rule bg-surface p-5 sm:p-6">
        <p className="text-sm font-bold text-accent">
          Your next best step
        </p>
        <h2 className="mt-2 max-w-3xl text-2xl font-bold text-ink sm:text-3xl">
          {result.topNextStep}
        </h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {result.supportingActions.map((action) => (
            <div
              key={action}
              className="rounded-xl border border-rule bg-white p-4 font-bold leading-7 text-ink-2"
            >
              {action}
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

function ScoreImprovements({
  result,
  input,
}: {
  result: ReadinessScoreResult;
  input: ReadinessScoreInput;
}) {
  const improvements = getScoreImprovements(input);

  if (improvements.length === 0) {
    return null;
  }

  return (
    <section className="site-container py-6" aria-labelledby="score-improvements-heading">
      <article className="rounded-xl border border-rule bg-white p-5 sm:p-6">
        <h2
          id="score-improvements-heading"
          className="text-2xl font-bold text-ink"
        >
          What could raise your score
        </h2>
        <p className="mt-2 max-w-3xl leading-7 text-muted">
          Based on your answers. Each line changes one thing and shows your
          score now and after.
        </p>
        <ul className="mt-5 divide-y divide-rule border-y border-rule">
          {improvements.map((item) => (
            <li
              key={item.id}
              className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
            >
              <div className="min-w-0">
                <p className="font-bold leading-6 text-ink">{item.action}</p>
                <p className="mt-1 text-sm leading-6 text-muted">{item.detail}</p>
              </div>
              <p className="flex shrink-0 items-center gap-2 font-bold text-ink">
                <span className="text-muted">{result.score}</span>
                <span aria-hidden="true">→</span>
                <span className="sr-only">to</span>
                <span className="text-xl">{item.newScore}</span>
                <span className="rounded-full bg-accent-soft px-2.5 py-1 text-sm text-accent-dark">
                  +{item.gain}
                </span>
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-6 text-muted">
          These show how the estimate changes, not whether an application
          will be accepted. Landlord requirements vary.
        </p>
      </article>
    </section>
  );
}

function HowEstimated() {
  return (
    <section className="site-container py-10">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-bold text-ink">
          How your score is estimated
        </h2>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {estimateCards.map((card) => (
          <article
            key={card.title}
            className="rounded-xl border border-rule bg-white p-4"
          >
            <h3 className="text-lg font-bold text-ink">{card.title}</h3>
            <p className="mt-2 leading-6 text-muted">{card.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function RelatedTools() {
  return (
    <section className="site-container py-8">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-bold text-ink">
          Related tools
        </h2>
        <p className="mt-3 leading-7 text-muted">
          Use these calculators to compare a specific part of your rental plan.
        </p>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {relatedTools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group flex min-h-[150px] flex-col rounded-xl border border-rule bg-white p-4 text-left no-underline transition hover:-translate-y-0.5 hover:border-rule-strong"
          >
            <h3 className="text-lg font-bold leading-6 text-ink group-hover:text-accent-dark">
              {tool.title}
            </h3>
            <p className="mt-2 leading-6 text-muted">{tool.description}</p>
            <span className="mt-auto inline-flex pt-4 text-sm font-bold text-accent">
              {tool.cta}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function RentReadinessFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="site-container py-8">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-bold text-ink">
          Rent Readiness Score FAQ
        </h2>
      </div>
      <div className="mt-5 overflow-hidden rounded-xl border border-rule bg-white">
        {rentReadinessFaqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const panelId = `rent-readiness-faq-${index}`;

          return (
            <div
              key={faq.question}
              className={index === 0 ? "" : "border-t border-rule"}
            >
              <h3>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-bold text-ink transition hover:bg-paper sm:px-6"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span>{faq.question}</span>
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent"
                    aria-hidden="true"
                  >
                    {isOpen ? "-" : "+"}
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                hidden={!isOpen}
                className="px-5 pb-5 leading-7 text-muted sm:px-6"
              >
                {faq.answer}
              </div>
            </div>
          );
        })}
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
      <section className="bg-hero py-10 md:py-14">
        <div className="site-container">
          <div className="max-w-4xl">
            <p className="text-sm font-medium text-muted">
              Rent Readiness Score
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-[1.06] tracking-[-0.035em] text-ink md:text-[3.25rem]">
              Check your rent readiness before you apply
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-ink-2">
              Answer a few questions to estimate your apartment affordability,
              move-in savings buffer, debt pressure, co-signer support, and next
              best step.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
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
            <a href="#score-form" className="btn-primary mt-7">
              Start the check
            </a>
          </div>
        </div>
      </section>

      <section id="score-form" className="site-container scroll-mt-24 py-8 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.6fr)_minmax(340px,0.4fr)] lg:items-start">
          <form
            className="form-card p-5 sm:p-6"
            onSubmit={(event) => {
              event.preventDefault();
              calculate();
            }}
            noValidate
          >
            <div>
              <p className="text-sm font-bold text-accent">
                Guided assessment
              </p>
              <h2 className="mt-2 text-3xl font-bold text-ink">
                Start with the basics
              </h2>
              <p className="mt-2 leading-7 text-muted">
                Use rough numbers. This estimate is designed to help you
                understand your position before applying.
              </p>
            </div>

            <div className="mt-6 space-y-5">
              <div className="rounded-xl border border-rule bg-white p-4 sm:p-5">
                <h3 className="text-xl font-bold text-ink">
                  Apartment target
                </h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
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

              <div className="rounded-xl border border-rule bg-white p-4 sm:p-5">
                <h3 className="text-xl font-bold text-ink">
                  Income and debt
                </h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
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

              <div className="rounded-xl border border-rule bg-white p-4 sm:p-5">
                <h3 className="text-xl font-bold text-ink">
                  Move-in readiness
                </h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
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
                      "1–3 months",
                      "3+ months",
                      "Just exploring",
                    ] as const}
                    value={values.moveInTimeframe}
                    onChange={(value) => update("moveInTimeframe", value)}
                  />
                </div>
              </div>

              <div className="rounded-xl border border-rule bg-white p-4 sm:p-5">
                <h3 className="text-xl font-bold text-ink">
                  Application support
                </h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
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

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
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
          <CategoryBreakdown result={result} input={input} />
          <StrengthsAndWatchOuts result={result} />
          <NextSteps result={result} />
          <ScoreImprovements result={result} input={input} />
        </>
      ) : null}

      <RelatedTools />
      <RentReadinessFaq />
      <HowEstimated />

      <section className="site-container pb-12 pt-4">
        <aside className="rounded-xl border border-rule bg-accent-soft p-5 leading-7 text-ink-2">
          <strong className="text-ink">Estimate disclaimer: </strong>
          This is an estimate only. Rental decisions can depend on landlord or
          property manager rules, credit history, background checks, employment
          verification, savings, application history, co-signers, local laws,
          and other factors. RentReadyCheck is not financial or legal advice.
        </aside>
      </section>
    </>
  );
}
