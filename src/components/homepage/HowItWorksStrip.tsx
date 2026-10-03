const steps = [
  {
    title: 'Enter the basics',
    text: 'Monthly rent, income, savings, debt, and co-signer support.',
  },
  {
    title: 'Review your score',
    text: 'See your Rent Readiness Score, Rent Twin, strengths, and watch-outs.',
  },
  {
    title: 'Plan your next step',
    text: 'Use rent, budget, savings, and roommate tools before applying.',
  },
];

export default function HowItWorksStrip() {
  return (
    <section id="how-it-works" className="home-section">
      <div className="site-container">
        <div className="home-section__head">
          <h2>How RentReadyCheck works</h2>
          <p>A quick estimate to help you understand your rent readiness before applying.</p>
        </div>

        <ol className="home-steps">
          {steps.map((step) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
