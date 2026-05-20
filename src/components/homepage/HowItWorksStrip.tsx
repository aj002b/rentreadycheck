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
    <section id="how-it-works" style={{ background: '#FFFFFF', padding: '40px 24px 60px' }}>
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          border: '1px solid #DBEAFE',
          borderRadius: 24,
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FBFF 100%)',
          padding: '28px',
          boxShadow: '0 18px 45px rgba(37,99,235,0.09)',
        }}
      >
        <div style={{ marginBottom: 22 }}>
          <h2 style={{ color: '#0F172A', fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 850, lineHeight: 1.15, margin: '0 0 8px' }}>
            How RentReadyCheck works
          </h2>
          <p style={{ color: '#64748B', fontSize: 15, lineHeight: 1.6, margin: 0 }}>
            A quick estimate to help you understand your rent readiness before applying.
          </p>
        </div>

        <div className="hiw-steps">
          {steps.map((step, index) => (
            <div
              key={step.title}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: 18,
                boxShadow: '0 8px 24px rgba(15,23,42,0.04)',
                display: 'flex',
                gap: 14,
                minWidth: 0,
                padding: 18,
              }}
            >
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
                    width: 30,
                  }}
                >
                  {index + 1}
                </span>
                <div>
                  <h3 style={{ color: '#0F172A', fontSize: 15, fontWeight: 850, margin: '0 0 5px' }}>
                    {step.title}
                  </h3>
                  <p style={{ color: '#64748B', fontSize: 13, lineHeight: 1.45, margin: 0 }}>{step.text}</p>
                </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hiw-steps {
          display: grid;
          gap: 16px;
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        @media (max-width: 900px) {
          .hiw-steps {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
