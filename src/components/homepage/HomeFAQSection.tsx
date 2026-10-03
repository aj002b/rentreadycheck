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
    <section id="faq" className="home-section">
      <div className="site-container">
        <div className="home-section__head">
          <h2>Frequently asked questions</h2>
        </div>

        <div className="faq-list">
          {items.map((item, i) => (
            <div key={i} className="faq-list__item">
              <button
                className="faq-list__button"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <span
                  className="faq-list__icon"
                  aria-hidden="true"
                  style={{ transform: open === i ? 'rotate(45deg)' : 'none' }}
                >
                  +
                </span>
              </button>
              {open === i && <div className="faq-list__answer">{item.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
