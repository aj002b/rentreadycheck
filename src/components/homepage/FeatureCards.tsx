'use client';

import Link from 'next/link';

const cards = [
  {
    title: 'Rent Readiness Score & Rent Twin',
    desc: 'Get your score, see your renter type, and understand your strengths and watch-outs.',
    cta: 'Check your score',
    href: '/rent-readiness-score/',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="12" stroke="#2563EB" strokeWidth="2" />
        <path d="M10 14l2.5 2.5L18 11" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Improve My Score Simulator',
    desc: 'See how small changes can improve your rent readiness estimate.',
    cta: 'Improve my score',
    href: '/#improve-score',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="8" width="22" height="14" rx="3" stroke="#2563EB" strokeWidth="2" />
        <path d="M9 15l3-3 3 3 4-4" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Pre-Move Budget Builder',
    desc: 'Plan security deposit, first month\'s rent, moving costs, utilities, and setup expenses.',
    cta: 'Build my budget',
    href: '/move-in-cost-calculator',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="6" width="20" height="16" rx="3" stroke="#2563EB" strokeWidth="2" />
        <path d="M4 11h20" stroke="#2563EB" strokeWidth="2" />
        <circle cx="9" cy="17" r="1.5" fill="#2563EB" />
      </svg>
    ),
  },
  {
    title: 'Savings & Deposit Planner',
    desc: 'Set a move-in goal, track your savings gap, and estimate when you may be ready.',
    cta: 'Start planning',
    href: '/how-much-should-i-save-before-moving-out',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="#2563EB" strokeWidth="2" />
        <path d="M14 8v6l4 3" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function FeatureCards() {
  return (
    <section id="calculators" style={{ background: '#F8FAFC', padding: '68px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2
          style={{
            fontSize: 'clamp(26px, 3.5vw, 38px)',
            fontWeight: 700,
            color: '#0F172A',
            textAlign: 'center',
            margin: '0 0 48px',
          }}
        >
          Everything you need to get rent ready
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 24,
          }}
        >
          {cards.map((c) => (
            <Link
                href={c.href}
                key={c.title}
                style={{
                  background: '#fff',
                  borderRadius: 20,
                  padding: '24px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: 230,
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
                  width: 46,
                  height: 46,
                  borderRadius: 14,
                  background: '#EFF6FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 18,
                }}
              >
                {c.icon}
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
