import Link from 'next/link';

const cards = [
  {
    title: 'Rent Readiness Score',
    desc: 'Get your score, Rent Twin, watch-outs, and next best step before applying.',
    cta: 'Start my check',
    href: '/rent-readiness-score/',
  },
  {
    title: 'Rent Affordability Calculator',
    desc: 'Compare rent with monthly income using common US apartment affordability examples.',
    cta: 'Check affordability',
    href: '/rent-referencing-calculator',
  },
  {
    title: 'Co-signer Income Calculator',
    desc: 'Estimate what extra support income may look like for a rental application.',
    cta: 'Estimate support',
    href: '/guarantor-income-calculator',
  },
  {
    title: 'Roommate Affordability Calculator',
    desc: 'See how shared rent and combined income may change affordability.',
    cta: 'Check roommate income',
    href: '/joint-tenant-affordability-calculator',
  },
  {
    title: 'Move-In Cost Calculator',
    desc: 'Estimate security deposit, first month’s rent, moving costs, and setup expenses.',
    cta: 'Estimate move-in costs',
    href: '/move-in-cost-calculator',
  },
  {
    title: 'Rent Split Calculator',
    desc: 'Split apartment rent fairly with roommates by amount, room, or income.',
    cta: 'Split rent',
    href: '/rent-split-calculator',
  },
];

export default function FeatureCards() {
  return (
    <section id="calculators" className="home-section">
      <div className="site-container">
        <div className="home-section__head">
          <h2>RentReadyCheck tools</h2>
          <p>
            Use these free tools to estimate rent affordability, co-signer support,
            move-in costs, and roommate rent planning before you apply.
          </p>
        </div>

        <div className="home-rows">
          {cards.map((c) => (
            <Link href={c.href} key={c.title}>
              <h3>{c.title}</h3>
              <span className="home-rows__cta">{c.cta} →</span>
              <p>{c.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
