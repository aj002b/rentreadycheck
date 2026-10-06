import QuickScoreForm from './QuickScoreForm';
import Link from 'next/link';

const assurances = [
  '100% free to use',
  'No sign-up required',
  'Private estimate',
  'Instant results',
];

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section className="home-hero">
      <div className="site-container home-hero__grid">
        <div className="home-hero__copy">
          <h1>Work out what rent you can afford before you apply</h1>

          <p className="home-hero__sub">
            Compare rent with your income, plan your move-in costs, and find a fair
            rent split with roommates. Start with a quick Rent Readiness Score.
          </p>

          <ul className="home-hero__assure">
            {assurances.map((label) => (
              <li key={label} className="trust-pill">
                <CheckIcon />
                {label}
              </li>
            ))}
          </ul>

          <p className="home-hero__note">
            Built for US renters. Uses common apartment affordability examples. Results are estimates only.
          </p>
          <nav aria-label="Popular rent calculators" className="mt-6 flex flex-wrap gap-3">
            <Link href="/rent-referencing-calculator/" className="chip-link">Check affordability</Link>
            <Link href="/move-in-cost-calculator/" className="chip-link">Plan move-in costs</Link>
            <Link href="/rent-split-calculator/" className="chip-link">Split rent fairly</Link>
          </nav>
        </div>

        <QuickScoreForm />
      </div>
    </section>
  );
}
