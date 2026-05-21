'use client';

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
    <section id="calculators" style={{ background: '#F8FAFC', padding: '64px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2
          style={{
            fontSize: 'clamp(26px, 3.5vw, 38px)',
            fontWeight: 700,
            color: '#0F172A',
            textAlign: 'center',
            margin: '0 0 12px',
          }}
        >
          RentReadyCheck tools
        </h2>
        <p
          style={{
            color: '#53657F',
            fontSize: 16,
            lineHeight: 1.7,
            margin: '0 auto 34px',
            maxWidth: 780,
            textAlign: 'center',
          }}
        >
          Use these free tools to estimate rent affordability, co-signer support,
          move-in costs, and roommate rent planning before you apply.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 18,
          }}
        >
          {cards.map((c, index) => (
            <Link
                href={c.href}
                key={c.title}
                style={{
                  background: '#fff',
                  borderRadius: 22,
                  padding: '22px',
                  border: '1px solid #D8E5F7',
                  boxShadow: '0 14px 34px rgba(15,31,58,0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: 216,
                  textDecoration: 'none',
                  transition: 'box-shadow 0.2s, transform 0.2s',
                }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                <div
                  style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background: '#EFF6FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                  color: '#2563EB',
                  fontSize: 15,
                  fontWeight: 800,
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </div>

              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0F172A', margin: '0 0 10px' }}>
                {c.title}
              </h3>

              <p style={{ fontSize: 14, color: '#64748B', margin: '0 0 20px', lineHeight: 1.6, flex: 1 }}>
                {c.desc}
              </p>

              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#2563EB',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  minHeight: 34,
                }}
              >
                {c.cta}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
