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
    <section id="how-it-works" style={{ background: '#FFFFFF', padding: '34px 24px 56px' }}>
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          border: '1px solid #DBEAFE',
          borderRadius: 22,
          background: '#F8FAFC',
          padding: '24px',
        }}
      >
        <div className="hiw-strip">
          <h2 style={{ color: '#0F172A', fontSize: 22, fontWeight: 800, lineHeight: 1.2, margin: 0 }}>
            How RentReadyCheck works
          </h2>

          <div className="hiw-steps">
            {steps.map((step, index) => (
              <div key={step.title} style={{ display: 'flex', gap: 12, minWidth: 0 }}>
                <span
                  style={{
                    alignItems: 'center',
                    background: '#2563EB',
                    borderRadius: 999,
                    color: '#FFFFFF',
                    display: 'inline-flex',
                    flex: '0 0 28px',
                    fontSize: 13,
                    fontWeight: 800,
                    height: 28,
                    justifyContent: 'center',
                    marginTop: 2,
                    width: 28,
                  }}
                >
                  {index + 1}
                </span>
                <div>
                  <h3 style={{ color: '#0F172A', fontSize: 14, fontWeight: 800, margin: '0 0 4px' }}>
                    {step.title}
                  </h3>
                  <p style={{ color: '#64748B', fontSize: 13, lineHeight: 1.45, margin: 0 }}>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hiw-strip {
          align-items: center;
          display: grid;
          gap: 22px;
          grid-template-columns: 230px 1fr;
        }

        .hiw-steps {
          display: grid;
          gap: 18px;
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        @media (max-width: 900px) {
          .hiw-strip {
            align-items: start;
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .hiw-steps {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
