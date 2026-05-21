"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";

type YesNo = "Yes" | "No";

type FormValues = {
  monthlyRent: string;
  securityDeposit: string;
  firstMonthDue: YesNo;
  lastMonthRequired: YesNo;
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

type Calculation = {
  apartmentCosts: number;
  fees: number;
  setupCosts: number;
  emergencyBuffer: number;
  firstMonthRent: number;
  lastMonthRent: number;
  totalMoveInCost: number;
  savingsGap: number;
  savingsSurplus: number;
  shares: {
    apartmentCosts: number;
    fees: number;
    setupCosts: number;
    emergencyBuffer: number;
  };
};

const defaults: FormValues = {
  monthlyRent: "1800",
  securityDeposit: "1800",
  firstMonthDue: "Yes",
  lastMonthRequired: "No",
  applicationFee: "75",
  adminFee: "200",
  petFee: "0",
  movingCost: "400",
  utilitySetup: "200",
  internetSetup: "100",
  rentersInsurance: "20",
  furnitureBasics: "800",
  emergencyBuffer: "500",
  currentSavings: "5000",
};

const relatedTools = [
  { title: "Rent Readiness Score", href: "/rent-readiness-score/" },
  { title: "Rent Affordability Calculator", href: "/rent-referencing-calculator" },
  { title: "Co-signer Income Calculator", href: "/guarantor-income-calculator" },
  { title: "Roommate Affordability Calculator", href: "/joint-tenant-affordability-calculator" },
  { title: "Rent Split Calculator", href: "/rent-split-calculator" },
];

const faqs = [
  {
    question: "What costs should I expect before moving into an apartment?",
    answer:
      "Common costs include a security deposit, first month's rent, application fees, admin or holding fees, moving costs, utility setup, internet setup, household basics, and a cash buffer.",
  },
  {
    question: "Is the security deposit always equal to one month's rent?",
    answer:
      "No. Some apartments use one month's rent as an example, but the amount can vary by property, lease terms, landlord, property manager, and local rules.",
  },
  {
    question: "Should I include furniture in my move-in budget?",
    answer:
      "Yes, if you expect to buy basics soon after move-in. You can include only essential items now and delay non-essential purchases.",
  },
  {
    question: "Are application fees refundable?",
    answer:
      "It depends on the property and fee type. Ask the property manager which fees are refundable, credited, or non-refundable before applying.",
  },
  {
    question: "Do you save my cost estimate?",
    answer:
      "No. This tool runs in your browser and does not save your move-in cost inputs to an account.",
  },
];

function toAmount(value: string) {
  if (value.trim() === "") return 0;
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : 0;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(value)));
}

function formatPercent(value: number) {
  if (!Number.isFinite(value)) return "0%";
  return `${Math.round(value * 100)}%`;
}

function calculate(values: FormValues): Calculation {
  const monthlyRent = toAmount(values.monthlyRent);
  const securityDeposit = toAmount(values.securityDeposit);
  const firstMonthRent = values.firstMonthDue === "Yes" ? monthlyRent : 0;
  const lastMonthRent = values.lastMonthRequired === "Yes" ? monthlyRent : 0;
  const apartmentCosts = securityDeposit + firstMonthRent + lastMonthRent;
  const fees =
    toAmount(values.applicationFee) + toAmount(values.adminFee) + toAmount(values.petFee);
  const setupCosts =
    toAmount(values.movingCost) +
    toAmount(values.utilitySetup) +
    toAmount(values.internetSetup) +
    toAmount(values.rentersInsurance) +
    toAmount(values.furnitureBasics);
  const emergencyBuffer = toAmount(values.emergencyBuffer);
  const totalMoveInCost = apartmentCosts + fees + setupCosts + emergencyBuffer;
  const currentSavings = toAmount(values.currentSavings);
  const savingsGap = Math.max(totalMoveInCost - currentSavings, 0);
  const savingsSurplus = Math.max(currentSavings - totalMoveInCost, 0);
  const share = (amount: number) => (totalMoveInCost > 0 ? amount / totalMoveInCost : 0);

  return {
    apartmentCosts,
    fees,
    setupCosts,
    emergencyBuffer,
    firstMonthRent,
    lastMonthRent,
    totalMoveInCost,
    savingsGap,
    savingsSurplus,
    shares: {
      apartmentCosts: share(apartmentCosts),
      fees: share(fees),
      setupCosts: share(setupCosts),
      emergencyBuffer: share(emergencyBuffer),
    },
  };
}

function validate(values: FormValues) {
  const errors: Partial<Record<keyof FormValues, string>> = {};

  for (const key of Object.keys(values) as Array<keyof FormValues>) {
    if (key === "firstMonthDue" || key === "lastMonthRequired") continue;
    if (toAmount(values[key]) < 0) {
      errors[key] = "Enter $0 or more.";
    }
  }

  if (toAmount(values.monthlyRent) <= 0) {
    errors.monthlyRent = "Enter a monthly rent greater than $0.";
  }

  return errors;
}

function buildTips(values: FormValues, result: Calculation) {
  const tips: string[] = [];

  if (result.savingsGap > 0) {
    tips.push(`Save ${formatCurrency(result.savingsGap)} more before move-in.`);
  } else {
    tips.push("You may have a move-in cash buffer based on these estimates.");
  }

  if (result.setupCosts >= toAmount(values.monthlyRent)) {
    tips.push("Consider delaying non-essential furniture purchases.");
  }

  if (values.lastMonthRequired === "Yes") {
    tips.push("Ask whether last month's rent is required before signing.");
  }

  if (toAmount(values.petFee) > 0) {
    tips.push("Confirm whether pet fees are refundable or non-refundable.");
  }

  if (tips.length < 3) {
    tips.push("Confirm fee timing with the landlord or property manager.");
  }

  return tips.slice(0, 4);
}

function CurrencyInput({
  label,
  name,
  value,
  error,
  onChange,
}: {
  label: string;
  name: keyof FormValues;
  value: string;
  error?: string;
  onChange: (name: keyof FormValues, value: string) => void;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-bold text-[#0f1f3a]">
        {label}
      </label>
      <div className="relative mt-2">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#53657f]">
          $
        </span>
        <input
          id={name}
          name={name}
          type="number"
          min="0"
          inputMode="decimal"
          value={value}
          onChange={(event) => onChange(name, event.target.value)}
          className={`field-control pl-8 ${error ? "!border-[#b84735]" : ""}`}
        />
      </div>
      {error ? <p className="mt-1.5 text-xs font-semibold text-[#b84735]">{error}</p> : null}
    </div>
  );
}

function YesNoGroup({
  label,
  value,
  onChange,
}: {
  label: string;
  value: YesNo;
  onChange: (value: YesNo) => void;
}) {
  return (
    <div>
      <p className="text-sm font-bold text-[#0f1f3a]">{label}</p>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {(["Yes", "No"] as const).map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={value === option}
            onClick={() => onChange(option)}
            className={`min-h-11 rounded-xl border px-4 text-sm font-black transition ${
              value === option
                ? "border-[#2563eb] bg-[#eff6ff] text-[#1d4ed8]"
                : "border-[#d8e5f7] bg-white text-[#334765] hover:border-[#93c5fd]"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function FormGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[22px] border border-[#d8e5f7] bg-[#f8fbff] p-4 sm:p-5">
      <h3 className="text-lg font-black tracking-[-0.01em] text-[#0f1f3a]">{title}</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}

function EmptyResult() {
  return (
    <aside className="premium-card-strong p-5 sm:p-6">
      <p className="text-sm font-black uppercase tracking-[0.16em] text-[#2563eb]">
        Move-in estimate
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-[#0f1f3a]">
        Enter your expected costs to estimate your move-in cash need.
      </h2>
      <p className="mt-3 leading-7 text-[#53657f]">
        Calculate your estimate to see total cash needed, savings gap or surplus,
        and the largest cost categories.
      </p>
      <div className="mt-5 rounded-[20px] border border-dashed border-[#bdd3f5] bg-white p-4">
        <div className="h-3 rounded-full bg-[#e2e8f0]" />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="h-14 rounded-2xl bg-[#f1f7ff]" />
          <div className="h-14 rounded-2xl bg-[#f1f7ff]" />
        </div>
      </div>
    </aside>
  );
}

function ResultDashboard({ result }: { result: Calculation }) {
  const rows = [
    { label: "Apartment costs", value: result.apartmentCosts, share: result.shares.apartmentCosts },
    { label: "Fees", value: result.fees, share: result.shares.fees },
    { label: "Moving and setup", value: result.setupCosts, share: result.shares.setupCosts },
    { label: "Emergency buffer", value: result.emergencyBuffer, share: result.shares.emergencyBuffer },
  ];

  return (
    <section aria-live="polite" className="premium-card-strong p-5 sm:p-6">
      <p className="text-sm font-black uppercase tracking-[0.16em] text-[#2563eb]">
        Estimated move-in cash needed
      </p>
      <div className="mt-2 text-5xl font-black leading-none tracking-[-0.04em] text-[#0f1f3a] sm:text-6xl">
        {formatCurrency(result.totalMoveInCost)}
      </div>
      <div className="mt-5 rounded-[20px] border border-[#bfdbfe] bg-[#eff6ff] p-4">
        <p className="text-sm font-black uppercase tracking-[0.14em] text-[#1d4ed8]">
          Savings status
        </p>
        <p className="mt-2 text-xl font-black text-[#0f1f3a]">
          {result.savingsGap > 0
            ? `You may need ${formatCurrency(result.savingsGap)} more.`
            : `You may have a surplus of ${formatCurrency(result.savingsSurplus)}.`}
        </p>
      </div>
      <div className="mt-5 space-y-4">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="flex items-center justify-between gap-3 text-sm font-bold text-[#334765]">
              <span>{row.label}</span>
              <span>{formatCurrency(row.value)}</span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-[#e2e8f0]">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#2563eb,#38bdf8)]"
                style={{ width: formatPercent(row.share) }}
              />
            </div>
            <p className="mt-1 text-xs font-bold text-[#7b8ca8]">
              {formatPercent(row.share)} of estimate
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CostBreakdown({ values, result }: { values: FormValues; result: Calculation }) {
  const rows = [
    { label: "Security deposit", value: toAmount(values.securityDeposit) },
    { label: "First month's rent", value: result.firstMonthRent },
    { label: "Last month's rent", value: result.lastMonthRent },
    { label: "Application fee", value: toAmount(values.applicationFee) },
    { label: "Admin/holding fee", value: toAmount(values.adminFee) },
    { label: "Pet fee", value: toAmount(values.petFee) },
    { label: "Moving truck or movers", value: toAmount(values.movingCost) },
    { label: "Utility setup", value: toAmount(values.utilitySetup) },
    { label: "Internet setup", value: toAmount(values.internetSetup) },
    { label: "Renters insurance estimate", value: toAmount(values.rentersInsurance) },
    { label: "Furniture and household basics", value: toAmount(values.furnitureBasics) },
    { label: "Emergency buffer", value: toAmount(values.emergencyBuffer) },
  ];

  return (
    <section className="site-container py-10">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-black tracking-[-0.03em] text-[#0f1f3a]">
          Cost breakdown
        </h2>
        <p className="mt-3 leading-7 text-[#53657f]">
          Scan each estimate and adjust the form if a cost does not apply.
        </p>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-4 rounded-[18px] border border-[#d8e5f7] bg-white p-4 shadow-[0_10px_24px_rgba(15,31,58,0.05)]"
          >
            <span className="font-bold text-[#334765]">{row.label}</span>
            <span className="text-lg font-black text-[#0f1f3a]">{formatCurrency(row.value)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Tips({ tips }: { tips: string[] }) {
  return (
    <section className="site-container py-6">
      <article className="rounded-[26px] border border-[#bdd3f5] bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_58%,#f0f9ff_100%)] p-5 shadow-[0_22px_55px_rgba(37,99,235,0.11)] sm:p-6">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#2563eb]">
          Personalized tips
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-[#0f1f3a]">
          Next checks before move-in day
        </h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {tips.map((tip) => (
            <div key={tip} className="rounded-2xl border border-[#d8e5f7] bg-white p-4 font-bold text-[#334765]">
              {tip}
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

function Education() {
  const cards = [
    {
      title: "Security deposit",
      copy: "Often due before move-in and may vary by property and local rules.",
    },
    {
      title: "First month's rent",
      copy: "Many rentals require the first month's rent before keys are released.",
    },
    {
      title: "Application and admin fees",
      copy: "Some apartments charge application, screening, admin, or holding fees.",
    },
    {
      title: "Utilities and setup",
      copy: "Electricity, gas, water, internet, renters insurance, and household basics can add up quickly.",
    },
  ];

  return (
    <section className="site-container py-10">
      <h2 className="text-3xl font-black tracking-[-0.03em] text-[#0f1f3a]">
        Common move-in costs to check
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <article
            key={card.title}
            className="rounded-[22px] border border-[#d8e5f7] bg-white p-4 shadow-[0_14px_34px_rgba(15,31,58,0.06)]"
          >
            <h3 className="text-lg font-black text-[#0f1f3a]">{card.title}</h3>
            <p className="mt-2 leading-6 text-[#53657f]">{card.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function RelatedTools() {
  return (
    <section className="site-container py-8">
      <h2 className="text-3xl font-black tracking-[-0.03em] text-[#0f1f3a]">
        Related tools
      </h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {relatedTools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="rounded-[22px] border border-[#d8e5f7] bg-white p-4 font-black text-[#0f1f3a] no-underline shadow-[0_14px_34px_rgba(15,31,58,0.06)] transition hover:-translate-y-0.5 hover:border-[#93c5fd] hover:text-[#1d4ed8]"
          >
            {tool.title}
          </Link>
        ))}
      </div>
    </section>
  );
}

function MoveInFaq() {
  return (
    <section className="site-container py-8">
      <h2 className="text-3xl font-black tracking-[-0.03em] text-[#0f1f3a]">
        Move-In Cost Calculator FAQ
      </h2>
      <div className="mt-5 space-y-3">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-2xl border border-[#d8e5f7] bg-white shadow-[0_8px_24px_rgba(15,31,58,0.04)] open:bg-[#f8fbff]"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 text-base font-extrabold text-[#0f1f3a] [&::-webkit-details-marker]:hidden">
              <span>{faq.question}</span>
              <span className="text-[#2563eb]" aria-hidden="true">+</span>
            </summary>
            <p className="border-t border-[#e3edfb] px-5 pb-5 pt-3 leading-7 text-[#53657f]">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function MoveInCostCalculator() {
  const [values, setValues] = useState(defaults);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});

  const result = useMemo(() => calculate(values), [values]);
  const currentErrors = useMemo(() => validate(values), [values]);
  const tips = useMemo(() => buildTips(values, result), [values, result]);

  const update = (name: keyof FormValues, value: string) => {
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);
    if (hasCalculated) {
      setErrors(validate(nextValues));
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

  const showResult = hasCalculated && Object.keys(errors).length === 0;

  return (
    <>
      <section className="bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] py-10 sm:py-12 lg:py-14">
        <div className="site-container">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#2563eb]">
            MOVE-IN COST CALCULATOR
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight tracking-[-0.04em] text-[#0f1f3a] sm:text-5xl lg:text-6xl">
            Estimate your apartment move-in costs
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#334765]">
            Add rent, deposits, fees, moving costs, utilities, and setup expenses
            to estimate how much cash you may need before move-in day.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {["Free estimate", "No sign-up required", "Built for US renters", "Inputs stay in your browser"].map((item) => (
              <span key={item} className="trust-pill">{item}</span>
            ))}
          </div>
          <a href="#move-in-cost-form" className="btn-primary mt-7">
            Estimate my costs
          </a>
        </div>
      </section>

      <section id="move-in-cost-form" className="site-container scroll-mt-24 py-8 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.6fr)_minmax(340px,0.4fr)] lg:items-start">
          <form onSubmit={submit} className="form-card p-5 sm:p-6">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#2563eb]">
              Build your move-in estimate
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] text-[#0f1f3a]">
              Build your move-in estimate
            </h2>
            <p className="mt-2 leading-7 text-[#53657f]">
              Use rough numbers. You can include only the costs that apply to your
              rental situation.
            </p>

            {Object.keys(errors).length > 0 ? (
              <div className="mt-5 rounded-2xl border border-[#f1c0b6] bg-[#fff7f5] p-4 text-sm font-bold text-[#923923]">
                Please check the highlighted fields before calculating.
              </div>
            ) : null}

            <div className="mt-6 space-y-5">
              <FormGroup title="Apartment costs">
                <CurrencyInput label="Monthly rent" name="monthlyRent" value={values.monthlyRent} error={errors.monthlyRent} onChange={update} />
                <CurrencyInput label="Security deposit" name="securityDeposit" value={values.securityDeposit} error={errors.securityDeposit} onChange={update} />
                <YesNoGroup label="First month's rent due before move-in?" value={values.firstMonthDue} onChange={(value) => update("firstMonthDue", value)} />
                <YesNoGroup label="Last month's rent required?" value={values.lastMonthRequired} onChange={(value) => update("lastMonthRequired", value)} />
              </FormGroup>

              <FormGroup title="Application and lease fees">
                <CurrencyInput label="Application fee" name="applicationFee" value={values.applicationFee} error={errors.applicationFee} onChange={update} />
                <CurrencyInput label="Admin or holding fee" name="adminFee" value={values.adminFee} error={errors.adminFee} onChange={update} />
                <CurrencyInput label="Pet deposit or pet fee" name="petFee" value={values.petFee} error={errors.petFee} onChange={update} />
              </FormGroup>

              <FormGroup title="Moving and setup">
                <CurrencyInput label="Moving truck or movers" name="movingCost" value={values.movingCost} error={errors.movingCost} onChange={update} />
                <CurrencyInput label="Utility setup" name="utilitySetup" value={values.utilitySetup} error={errors.utilitySetup} onChange={update} />
                <CurrencyInput label="Internet setup" name="internetSetup" value={values.internetSetup} error={errors.internetSetup} onChange={update} />
                <CurrencyInput label="Renters insurance estimate" name="rentersInsurance" value={values.rentersInsurance} error={errors.rentersInsurance} onChange={update} />
                <CurrencyInput label="Furniture and household basics" name="furnitureBasics" value={values.furnitureBasics} error={errors.furnitureBasics} onChange={update} />
              </FormGroup>

              <FormGroup title="Safety buffer">
                <CurrencyInput label="Emergency buffer" name="emergencyBuffer" value={values.emergencyBuffer} error={errors.emergencyBuffer} onChange={update} />
                <CurrencyInput label="Current savings" name="currentSavings" value={values.currentSavings} error={errors.currentSavings} onChange={update} />
              </FormGroup>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button type="submit" className="btn-primary min-h-12 sm:flex-1">
                Calculate Move-In Costs
              </button>
              <button type="button" className="btn-secondary min-h-12 sm:w-36" onClick={reset}>
                Reset
              </button>
            </div>
          </form>

          <div className="lg:sticky lg:top-24">
            {showResult ? <ResultDashboard result={result} /> : <EmptyResult />}
          </div>
        </div>
      </section>

      {showResult ? (
        <>
          <CostBreakdown values={values} result={result} />
          <Tips tips={tips} />
        </>
      ) : null}

      <Education />
      <RelatedTools />
      <MoveInFaq />
      <section className="site-container pb-12 pt-4">
        <aside className="rounded-[22px] border border-[#d8e5f7] bg-white p-5 text-sm leading-7 text-[#53657f] shadow-[0_12px_28px_rgba(15,31,58,0.06)]">
          <strong className="text-[#0f1f3a]">Estimate disclaimer:</strong> This is
          an estimate only. Actual move-in costs can vary by landlord, property
          manager, lease terms, local rules, utility providers, moving distance,
          pets, insurance, and other factors. RentReadyCheck is not financial or
          legal advice.
        </aside>
      </section>
    </>
  );
}
