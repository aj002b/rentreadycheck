import QuickScoreForm from './QuickScoreForm';

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
          <h1>Get your Rent Readiness Score before you apply</h1>

          <p className="home-hero__sub">
            Estimate your apartment affordability, move-in costs, co-signer support,
            and next best step before you submit a rental application.
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
        </div>

        <QuickScoreForm />
      </div>
    </section>
  );
}
