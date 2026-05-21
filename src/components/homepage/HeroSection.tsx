'use client';

import Link from 'next/link';
import QuickScoreForm from './QuickScoreForm';

const trustPills = [
  { icon: 'check', label: '100% free to use' },
  { icon: 'check', label: 'No sign-up required' },
  { icon: 'lock', label: 'Private estimate' },
  { icon: 'bolt', label: 'Instant results' },
];

function PillIcon({ type }: { type: string }) {
  if (type === 'lock')
    return (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
        <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="#2563EB" strokeWidth="1.5" />
        <path d="M5 7V5a3 3 0 016 0v2" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  if (type === 'bolt')
    return (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
        <path d="M9 1L3 9h4l-1 6 6-8H8l1-6z" stroke="#2563EB" strokeWidth="1.3" fill="none" strokeLinejoin="round" />
      </svg>
    );
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke="#2563EB" strokeWidth="1.5" />
      <path d="M5 8l2 2 4-4" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section
      style={{
        background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)',
        padding: '64px 24px 56px',
      }}
    >
      <div className="hero-grid" style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="hero-left">
          <p style={s.eyebrow}>US-FOCUSED RENT READINESS TOOLS</p>

          <h1 style={s.h1}>
            Get your Rent Readiness Score before you apply
          </h1>

          <p style={s.sub}>
            Estimate your apartment affordability, move-in costs, co-signer support,
            and next best step before you submit a rental application.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 28 }}>
            <Link href="/rent-readiness-score/" style={s.primaryBtn}>Start My Check</Link>
            <a href="#how-it-works" style={s.secondaryBtn}>See How It Works</a>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {trustPills.map((p) => (
              <span key={p.label} style={s.pill}>
                <PillIcon type={p.icon} />
                {p.label}
              </span>
            ))}
          </div>

          <p style={s.support}>
            Built for US renters. Uses common apartment affordability examples. Results are estimates only.
          </p>
        </div>

        <div className="hero-right">
          <QuickScoreForm />
        </div>
      </div>

      <style>{`
        .hero-grid {
          display: flex;
          gap: 48px;
          align-items: flex-start;
          flex-wrap: wrap;
        }
        .hero-left { flex: 1 1 420px; min-width: 300px; }
        .hero-right { flex: 1 1 520px; min-width: 320px; max-width: 600px; }

        @media (max-width: 960px) {
          .hero-grid { gap: 36px; }
          .hero-right { max-width: 100%; }
        }
        @media (max-width: 640px) {
          .hero-left,
          .hero-right { min-width: 0; }
        }
      `}</style>
    </section>
  );
}

const s: Record<string, React.CSSProperties> = {
  eyebrow: {
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 1.5,
    color: '#2563EB',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  h1: {
    fontSize: 'clamp(30px, 4.2vw, 50px)',
    fontWeight: 800,
    lineHeight: 1.1,
    color: '#0F172A',
    marginBottom: 20,
    letterSpacing: 0,
  },
  sub: {
    fontSize: 17,
    lineHeight: 1.65,
    color: '#64748B',
    marginBottom: 32,
    maxWidth: 480,
  },
  primaryBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    background: '#2563EB',
    color: '#fff',
    padding: '14px 30px',
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 600,
    textDecoration: 'none',
    boxShadow: '0 2px 8px rgba(37,99,235,0.25)',
    transition: 'background 0.2s',
  },
  secondaryBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    background: '#fff',
    color: '#2563EB',
    padding: '14px 28px',
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 600,
    textDecoration: 'none',
    border: '1.5px solid #DBEAFE',
    transition: 'background 0.2s',
  },
  pill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    background: '#fff',
    border: '1px solid #E2E8F0',
    borderRadius: 100,
    padding: '7px 14px',
    fontSize: 13,
    color: '#334155',
    fontWeight: 500,
  },
  support: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 1.5,
  },
};
