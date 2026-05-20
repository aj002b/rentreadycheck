'use client';

import { useState } from 'react';

const items = [
  {
    q: 'Can this website tell me if my rental application will be accepted?',
    a: 'No. RentReadyCheck provides estimates based on common apartment affordability guidelines used in the US. It cannot predict or determine whether any specific landlord or property manager will accept your application. Many factors, including credit history, references, and local policies, are part of the decision.',
  },
  {
    q: 'What income examples does this use?',
    a: 'Our tools use common US renter affordability benchmarks such as the 2.5x and 3x monthly rent income guidelines. These are widely referenced by property managers but are not universal rules.',
  },
  {
    q: 'Can roommates combine income?',
    a: 'In many rental situations, roommates can combine their income on a shared lease. Our Roommate Affordability Calculator lets you estimate combined affordability. Each property manager may have different policies.',
  },
  {
    q: 'When might I need a co-signer?',
    a: 'A co-signer may help if your income is below the property manager\'s threshold, if you have limited rental history, or if your credit score is lower than preferred. Our Co-signer Income Calculator can help you estimate what may be needed.',
  },
  {
    q: 'Are these calculators financial or legal advice?',
    a: 'No. All tools on RentReadyCheck provide general estimates only. They are not financial advice, legal advice, or a credit assessment. Always consult a qualified professional for decisions about your finances or rental agreements.',
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" style={{ background: '#F8FAFC', padding: '80px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <h2
          style={{
            fontSize: 'clamp(26px, 3.5vw, 38px)',
            fontWeight: 700,
            color: '#0F172A',
            textAlign: 'center',
            margin: '0 0 48px',
          }}
        >
          Frequently asked questions
        </h2>

        <div>
          {items.map((item, i) => (
            <div key={i} style={{ borderBottom: '1px solid #E2E8F0' }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                style={{
                  width: '100%',
                  padding: '20px 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textAlign: 'left',
                  gap: 16,
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 600, color: '#0F172A', lineHeight: 1.4 }}>
                  {item.q}
                </span>
                <span
                  style={{
                    fontSize: 22,
                    color: '#2563EB',
                    fontWeight: 300,
                    flexShrink: 0,
                    transition: 'transform 0.2s',
                    transform: open === i ? 'rotate(45deg)' : 'none',
                    lineHeight: 1,
                  }}
                >
                  +
                </span>
              </button>
              {open === i && (
                <div
                  style={{
                    padding: '0 0 20px',
                    fontSize: 14,
                    color: '#64748B',
                    lineHeight: 1.7,
                  }}
                >
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
