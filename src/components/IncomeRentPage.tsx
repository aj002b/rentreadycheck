import Link from "next/link";
import type { ReactNode } from "react";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { FAQJsonLd } from "@/components/FAQJsonLd";
import { FAQSection } from "@/components/FAQSection";
import { IncomeRentCalculator } from "@/components/calculators/IncomeRentCalculator";
import {
  annualGrossIncome,
  DEFAULT_HOURS_PER_WEEK,
  DEFAULT_PAID_WEEKS,
  formatHourly,
  formatUSD,
  getRule,
  rentRules,
} from "@/lib/incomeRent";
import { getIncomeRentPage, type IncomeRentPage } from "@/lib/incomeRentPages";
import type { FAQItem } from "@/lib/site";
import { estimateDisclaimer } from "@/lib/site";

const relatedLinks = [
  { href: "/rent-to-income-ratio-explained/", label: "The 3x rent rule explained" },
  { href: "/what-is-30-times-rent/", label: "What is 30 times rent?" },
  { href: "/what-is-36-times-rent/", label: "What is 36 times rent?" },
  { href: "/do-i-need-a-cosigner-for-an-apartment/", label: "Do I need a co-signer?" },
  { href: "/how-much-should-i-save-before-moving-out/", label: "How much to save before moving" },
  { href: "/security-deposit-basics/", label: "Security deposit basics" },
];

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="premium-card p-5 sm:p-6 md:p-8">
      <h2 id={id} className="text-2xl font-extrabold tracking-[-0.02em] text-[#0f1f3a]">
        {title}
      </h2>
      <div className="mt-4 space-y-4 leading-7 text-[#334765]">{children}</div>
    </section>
  );
}

function DataTable({
  caption,
  headers,
  rows,
}: {
  caption: string;
  headers: string[];
  rows: Array<Array<ReactNode>>;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#d8e5f7]">
      <table className="w-full text-left text-[13px] sm:text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-[#f8fbff] text-[#334765]">
          <tr>
            {headers.map((header, index) => (
              <th
                key={header}
                scope="col"
                className={`px-3 py-3 font-extrabold sm:px-4 ${index > 0 ? "text-right" : ""}`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#e6eef9] bg-white">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, index) =>
                index === 0 ? (
                  <th key={index} scope="row" className="px-3 py-3 font-bold text-[#0f1f3a] sm:px-4">
                    {cell}
                  </th>
                ) : (
                  <td key={index} className="px-3 py-3 text-right text-[#334765] sm:px-4">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function buildFaqs(page: IncomeRentPage, annual: number, monthly: number): FAQItem[] {
  const thirty = getRule("30%").maxRent(monthly);
  const threeX = getRule("3x").maxRent(monthly);
  const twoHalf = getRule("2.5x").maxRent(monthly);
  const rent = page.exampleRent;
  const share = (rent / monthly) * 100;
  const within = rentRules.filter((rule) => rent <= Math.round(rule.maxRent(monthly)));
  const withinText = within.length
    ? `It is within the ${within.map((rule) => rule.id).join(" and ")} example${within.length > 1 ? "s" : ""}`
    : "It is above all three examples";
  const above = rentRules.filter((rule) => !within.includes(rule));
  const aboveText = above.length
    ? ` and above the ${above.map((rule) => rule.id).join(" and ")} example${above.length > 1 ? "s" : ""}`
    : "";

  const faqs: FAQItem[] = [
    {
      question: `How much rent can I afford ${page.payType === "hourly" ? "making" : "on"} ${page.label}?`,
      answer: `${
        page.payType === "hourly"
          ? `At 40 hours a week for 52 weeks, ${page.label} is about ${formatUSD(annual)} a year, or ${formatUSD(monthly)} a month before tax.`
          : `${page.label} is about ${formatUSD(monthly)} a month before tax.`
      } Common rules of thumb point to about ${formatUSD(thirty)} (30% of gross income), ${formatUSD(threeX)} (3x rent) or ${formatUSD(twoHalf)} (2.5x rent) a month. Landlord requirements vary, and your debts, savings and local rents matter too.`,
    },
    {
      question: `Is ${page.label} enough for ${formatUSD(rent)} rent?`,
      answer: `${formatUSD(rent)} is ${share.toFixed(1)}% of ${formatUSD(monthly)} gross monthly income. ${withinText}${aboveText}. A landlord using 3x would look for about ${formatUSD(rent * 36)} a year. Whether an application is accepted depends on the landlord, your credit, debts and rental history.`,
    },
    {
      question: "Do these numbers use take-home pay?",
      answer:
        "No. They use gross income before tax, because landlords usually compare rent with gross income. Your take-home pay after taxes and deductions is lower, so the same rent takes a bigger share of what actually reaches your bank account. Check your pay stub when you build your budget.",
    },
  ];

  if (page.payType === "hourly") {
    const halfTime = annualGrossIncome({ payType: "hourly", amount: page.amount, hoursPerWeek: 30 }) / 12;
    faqs.push({
      question: `What if I work part time at ${formatHourly(page.amount)} an hour?`,
      answer: `At 30 hours a week, ${formatHourly(page.amount)} an hour is about ${formatUSD(halfTime)} a month before tax, which points to about ${formatUSD(halfTime / 3)} a month under 3x or ${formatUSD(halfTime * 0.3)} under the 30% rule. Change the hours in the calculator above to match your schedule. If your hours vary, landlords may look at an average from recent pay stubs.`,
    });
  } else {
    faqs.push({
      question: "What if part of my pay is a bonus or commission?",
      answer:
        "Landlords handle variable pay differently. Some count only base salary, while others may average bonuses or commission over a year or two if you can document them. If you're unsure, run the calculator with your base salary alone to see a more cautious figure.",
    });
  }

  faqs.push({
    question: "Will I need a co-signer?",
    answer:
      "It depends on the landlord. Some ask for a co-signer (sometimes called a guarantor) when income is below their threshold, credit history is limited, or you're a first-time renter. Others may accept a larger deposit or proof of savings instead. Ask the landlord or property manager what they accept.",
  });

  return faqs;
}

export function IncomeRentPageView({ page }: { page: IncomeRentPage }) {
  const annual = annualGrossIncome({ payType: page.payType, amount: page.amount });
  const monthly = annual / 12;
  const threeX = getRule("3x").maxRent(monthly);
  const thirty = getRule("30%").maxRent(monthly);
  const twoHalf = getRule("2.5x").maxRent(monthly);
  const faqs = buildFaqs(page, annual, monthly);
  const path = `/${page.slug}/`;
  const h1 = `How much rent can I afford ${page.payType === "hourly" ? "making" : "on"} ${page.label}?`;

  const combined = annual + page.roommateIncome;
  const combinedMax = combined / 12 / 3;
  const yourShare = annual / combined;
  const doubleMax = (annual * 2) / 12 / 3;

  const compare = page.compareSlugs
    .map((slug) => getIncomeRentPage(slug))
    .filter((item): item is IncomeRentPage => Boolean(item));

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides/" },
          { name: h1, href: path },
        ]}
      />
      <FAQJsonLd items={faqs} />

      <div className="site-container space-y-8 py-8 sm:space-y-10 sm:py-10">
        <nav aria-label="Breadcrumb" className="text-sm text-[#53657f]">
          <ol className="flex flex-wrap gap-1.5">
            <li><Link href="/" className="inline-block py-1 hover:underline">Home</Link> /</li>
            <li><Link href="/guides/" className="inline-block py-1 hover:underline">Guides</Link> /</li>
            <li aria-current="page" className="py-1 font-bold text-[#334765]">{page.label}</li>
          </ol>
        </nav>

        <section className="rounded-3xl border border-[#d8e5f7] bg-[linear-gradient(135deg,#ffffff_0%,#eef6ff_100%)] p-5 shadow-[0_24px_60px_rgba(37,99,235,0.12)] sm:p-6 md:p-8">
          <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#2563eb]">
            Rent affordability by income
          </p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-[-0.035em] text-[#0f1f3a] sm:text-4xl md:text-5xl">
            {h1}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#334765]">{page.intro}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { label: "30% of gross income", value: thirty, note: "Budgeting guideline" },
              { label: "3x monthly rent", value: threeX, note: "Common landlord check" },
              { label: "2.5x monthly rent", value: twoHalf, note: "More lenient check" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-[#d8e5f7] bg-white p-4">
                <p className="text-sm font-bold text-[#53657f]">{item.label}</p>
                <p className="mt-1 text-2xl font-extrabold text-[#0f1f3a]">
                  {formatUSD(item.value)}
                  <span className="text-base font-bold text-[#53657f]"> /mo</span>
                </p>
                <p className="mt-1 text-xs text-[#53657f]">{item.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 rounded-xl border border-[#fde68a] bg-[#fffbeb] p-3 text-sm leading-6 text-[#713f12]">
            <strong>Before tax:</strong> all figures use gross income, which is what landlords
            usually check.
            {page.payType === "hourly"
              ? ` Hourly figures assume ${DEFAULT_HOURS_PER_WEEK} hours a week and ${DEFAULT_PAID_WEEKS} paid weeks a year. You can change both in the calculator.`
              : ""}
          </p>
        </section>

        <section aria-labelledby="calculator-heading" className="space-y-4">
          <div>
            <h2 id="calculator-heading" className="text-2xl font-extrabold tracking-[-0.02em] text-[#0f1f3a]">
              Try your own numbers
            </h2>
            <p className="mt-2 leading-7 text-[#53657f]">
              Pre-filled with {page.label}. Change your pay
              {page.payType === "hourly" ? ", hours or weeks" : ""}, or add a rent you&apos;re
              looking at to see how it compares.
            </p>
          </div>
          <IncomeRentCalculator
            initialPayType={page.payType}
            initialAmount={page.amount}
            initialRent={page.exampleRent}
          />
        </section>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="min-w-0 space-y-8">
            <Section id="rules" title={`What each rule says for ${page.label}`}>
              <p>
                The three rules give different answers because they measure different things.
                The 30% rule is a budgeting guideline: US housing agencies generally describe
                households spending more than 30% of income on housing as cost-burdened. The 3x
                and 2.5x rules are screening checks some landlords and property managers use when
                reviewing applications.
              </p>
              <DataTable
                caption={`Maximum rent for ${page.label} under each rule`}
                headers={["Rule", "How it's worked out", "Max rent / month", "Per year"]}
                rows={rentRules.map((rule) => [
                  rule.name,
                  rule.formula,
                  <strong key="m">{formatUSD(rule.maxRent(monthly))}</strong>,
                  formatUSD(rule.maxRent(monthly) * 12),
                ])}
              />
              <p>
                If you&apos;re choosing a budget, the lower end is the safer starting point. If
                you&apos;re checking whether a listing is realistic, look for the landlord&apos;s
                own income requirement, which is often in the listing or application.
              </p>
            </Section>

            {page.payType === "hourly" ? (
              <Section id="hours" title={`How your hours change the answer at ${formatHourly(page.amount)} an hour`}>
                <p>
                  Hourly pay makes rent affordability depend on your schedule. Here&apos;s the
                  same {formatHourly(page.amount)} rate at different weekly hours, all assuming{" "}
                  {DEFAULT_PAID_WEEKS} paid weeks a year.
                </p>
                <DataTable
                  caption={`Rent estimates at ${formatHourly(page.amount)} an hour by weekly hours`}
                  headers={["Hours / week", "Gross / month", "30% rule", "3x rule"]}
                  rows={[20, 30, 40].map((hours) => {
                    const m = annualGrossIncome({ payType: "hourly", amount: page.amount, hoursPerWeek: hours }) / 12;
                    return [
                      hours === 40 ? "40 (full time)" : String(hours),
                      formatUSD(m),
                      formatUSD(m * 0.3),
                      formatUSD(m / 3),
                    ];
                  })}
                />
                <p>
                  Overtime can help your budget, but landlords may not count it if it isn&apos;t
                  regular. If you take unpaid time off, lower the paid weeks in the calculator.
                  Each unpaid week takes about {formatUSD((page.amount * DEFAULT_HOURS_PER_WEEK) / 12 / 3)}{" "}
                  off the monthly 3x figure.
                </p>
              </Section>
            ) : (
              <Section id="paychecks" title={`What ${page.label} looks like per paycheck`}>
                <p>
                  Landlords often ask for recent pay stubs, so it helps to know what your gross
                  pay looks like on each one.
                </p>
                <DataTable
                  caption={`Gross pay per paycheck on ${page.label}`}
                  headers={["Pay schedule", "Gross per paycheck", "3x rent as share of one paycheck"]}
                  rows={[
                    ["Every two weeks (26 a year)", annual / 26],
                    ["Twice a month (24 a year)", annual / 24],
                    ["Monthly (12 a year)", monthly],
                  ].map(([label, pay]) => [
                    label as string,
                    formatUSD(pay as number),
                    `${Math.round((threeX / (pay as number)) * 100)}%`,
                  ])}
                />
                <p>
                  Each extra $5,000 a year in salary adds about {formatUSD(5000 / 12 / 3)} a month
                  to the 3x figure and {formatUSD((5000 / 12) * 0.3)} to the 30% figure.
                </p>
              </Section>
            )}

            <Section id="move-in" title="Upfront costs to plan for">
              <p>
                Before you get the keys, you&apos;ll usually pay more than one month&apos;s rent.
                Security deposit rules vary by state and landlord, so the example below assumes
                a deposit equal to one month&apos;s rent.
              </p>
              <DataTable
                caption="Example upfront costs at different rent levels"
                headers={["Rent level", "First month", "Deposit (1 month)", "Subtotal"]}
                rows={[
                  [`30% rule (${formatUSD(thirty)})`, formatUSD(thirty), formatUSD(thirty), <strong key="a">{formatUSD(thirty * 2)}</strong>],
                  [`3x rule (${formatUSD(threeX)})`, formatUSD(threeX), formatUSD(threeX), <strong key="b">{formatUSD(threeX * 2)}</strong>],
                ]}
              />
              <p>
                On top of that, budget for application fees, moving costs, utility and internet
                setup, renters insurance and basic furniture. Some landlords also ask for last
                month&apos;s rent or pet deposits upfront. The{" "}
                <Link href="/move-in-cost-calculator/" className="inline-block py-1.5 font-bold text-[#2563eb] hover:underline">
                  move-in cost calculator
                </Link>{" "}
                adds these up for you.
              </p>
            </Section>

            <Section id="roommates" title="How a roommate changes the numbers">
              <p>
                Some landlords look at combined income on a shared lease; others check each
                tenant separately. These examples use combined gross income and the 3x rule.
              </p>
              <DataTable
                caption="Roommate examples using the 3x rule"
                headers={["Your roommate earns", "Combined income", "Max rent (3x)", "Your share"]}
                rows={[
                  [
                    `${page.label} (same as you)`,
                    formatUSD(annual * 2),
                    formatUSD(doubleMax),
                    <span key="s1">{formatUSD(doubleMax / 2)}<br />(50/50)</span>,
                  ],
                  [
                    page.roommateLabel,
                    formatUSD(combined),
                    formatUSD(combinedMax),
                    <span key="s2">
                      {formatUSD(combinedMax / 2)} (50/50)
                      <br />
                      {formatUSD(combinedMax * yourShare)} (by income)
                    </span>,
                  ],
                ]}
              />
              <p>
                Splitting by income means each person pays the same share of their pay. Use
                the{" "}
                <Link href="/joint-tenant-affordability-calculator/" className="inline-block py-1.5 font-bold text-[#2563eb] hover:underline">
                  roommate affordability calculator
                </Link>{" "}
                or the{" "}
                <Link href="/rent-split-calculator/" className="inline-block py-1.5 font-bold text-[#2563eb] hover:underline">
                  rent split calculator
                </Link>{" "}
                for your exact numbers.
              </p>
            </Section>

            <Section id="beyond-income" title="What else affects your application">
              <p>Income is only one part of a rental application. Landlords may also consider:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li><strong>Credit history:</strong> some set a minimum score; others look at the full report.</li>
                <li><strong>Existing debt:</strong> car, student loan and card payments reduce what&apos;s left for rent, even if the income rule looks fine.</li>
                <li><strong>Rental history and references</strong> from previous landlords.</li>
                <li><strong>Employment:</strong> how long you&apos;ve been in your job, or proof of an offer letter.</li>
                <li><strong>Savings:</strong> some landlords accept extra savings or a larger deposit when income is borderline.</li>
                <li><strong>Location:</strong> rents and typical requirements differ a lot between cities and states.</li>
              </ul>
              <p>
                If your income is below a landlord&apos;s requirement, options can include a
                co-signer, a roommate, or a lower-rent place. Read{" "}
                <Link href="/do-i-need-a-cosigner-for-an-apartment/" className="inline-block py-1.5 font-bold text-[#2563eb] hover:underline">
                  do I need a co-signer?
                </Link>{" "}
                for more.
              </p>
            </Section>
          </div>

          <aside className="space-y-5">
            <DisclaimerBox>{estimateDisclaimer}</DisclaimerBox>
            {compare.length ? (
              <nav aria-labelledby="compare-heading" className="rounded-2xl border border-[#d8e5f7] bg-white p-5">
                <h2 id="compare-heading" className="text-lg font-extrabold text-[#0f1f3a]">
                  Compare other incomes
                </h2>
                <ul className="mt-2 space-y-0.5">
                  {compare.map((item) => (
                    <li key={item.slug}>
                      <Link href={`/${item.slug}/`} className="inline-block py-1.5 font-bold text-[#2563eb] hover:underline">
                        Rent on {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
            <nav aria-labelledby="related-heading" className="rounded-2xl border border-[#d8e5f7] bg-white p-5">
              <h2 id="related-heading" className="text-lg font-extrabold text-[#0f1f3a]">
                Related guides
              </h2>
              <ul className="mt-2 space-y-0.5">
                {relatedLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="inline-block py-1.5 font-bold text-[#2563eb] hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>

        <FAQSection items={faqs} />
      </div>
    </>
  );
}
