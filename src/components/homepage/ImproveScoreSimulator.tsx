'use client';

import { useState, useMemo, useCallback } from 'react';
import { calculateHomePreviewScore } from './QuickScoreForm';

const BASELINE = {
  monthlyRent: 1800,
  annualIncome: 72000,
  savings: 4800,
  monthlyDebt: 250,
  hasCosigner: false,
  hasRoommate: false,
};

const PREVIEW = {
  monthlyRent: 1700,
  savings: 5100,
  monthlyDebt: 250,
  hasCosigner: true,
  hasRoommate: false,
};

export default function ImproveScoreSimulator() {
  const [rent, setRent] = useState(PREVIEW.monthlyRent);
  const [savings, setSavings] = useState(PREVIEW.savings);
  const [debt, setDebt] = useState(PREVIEW.monthlyDebt);
  const [cosigner, setCosigner] = useState(PREVIEW.hasCosigner);
  const [roommate, setRoommate] = useState(PREVIEW.hasRoommate);

  const newResult = useMemo(
    () =>
      calculateHomePreviewScore({
        monthlyRent: rent,
        annualIncome: BASELINE.annualIncome,
        savings,
        monthlyDebt: debt,
        hasCosigner: cosigner,
        hasRoommate: roommate,
      }),
    [rent, savings, debt, cosigner, roommate]
  );

  const baseResult = useMemo(() => calculateHomePreviewScore(BASELINE), []);
  const change = newResult.score - baseResult.score;
  const position = newResult.score >= 85 ? 'Great Position' : newResult.label;

  const reset = useCallback(() => {
    setRent(BASELINE.monthlyRent);
    setSavings(BASELINE.savings);
    setDebt(BASELINE.monthlyDebt);
    setCosigner(false);
    setRoommate(false);
  }, []);

  const sliderBg = (val: number, min: number, max: number) => {
    const pct = ((val - min) / (max - min)) * 100;
    return `linear-gradient(to right, #2563EB 0%, #06B6D4 ${pct}%, #334155 ${pct}%, #334155 100%)`;
  };

  return (
    <section
      id="improve-my-score"
      style={{
        background: '#0B1220',
        padding: '68px 24px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 34 }}>
          <h2
            style={{
              fontSize: 'clamp(26px, 3.5vw, 38px)',
              fontWeight: 700,
              color: '#fff',
              margin: '0 0 12px',
            }}
          >
            See how small changes could improve your score
          </h2>
          <p
            style={{
              fontSize: 15,
              color: '#CBD5E1',
              maxWidth: 600,
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Try adjusting rent, savings, debt, co-signer support, or roommate options
            to preview how your estimate may change.
          </p>
        </div>

        <div className="sim-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.45fr) minmax(280px, 0.75fr)', gap: 28, alignItems: 'stretch' }}>
          {/* Controls */}
          <div className="sim-controls" style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            {[
              { label: 'Monthly rent', val: rent, set: setRent, min: 600, max: 4000, prefix: '$' },
              { label: 'Savings', val: savings, set: setSavings, min: 0, max: 25000, prefix: '$' },
              { label: 'Monthly debt', val: debt, set: setDebt, min: 0, max: 2000, prefix: '$' },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#CBD5E1' }}>{s.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>
                    {s.prefix}
                    {s.val.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  step={50}
                  value={s.val}
                  onChange={(e) => s.set(Number(e.target.value))}
                  style={{ background: sliderBg(s.val, s.min, s.max) }}
                  aria-label={s.label}
                />
              </div>
            ))}

            {/* Toggles */}
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              {[
                { label: 'Add a co-signer?', pts: '+8 pts', val: cosigner, set: setCosigner },
                { label: 'Rent with a roommate?', pts: '+10 pts', val: roommate, set: setRoommate },
              ].map((t) => (
                <button
                  type="button"
                  key={t.label}
                  onClick={() => t.set(!t.val)}
                  aria-pressed={t.val}
                  style={{
                    flex: '1 1 180px',
                    padding: '14px 18px',
                    borderRadius: 14,
                    border: `1.5px solid ${t.val ? '#2563EB' : '#475569'}`,
                    background: t.val ? 'rgba(37,99,235,0.12)' : 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'border-color 0.15s, background 0.15s',
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{t.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#67E8F9' }}>{t.pts}</span>
                </button>
              ))}
            </div>

            {/* Reset */}
            <button
              type="button"
              onClick={reset}
              style={{
                alignSelf: 'flex-start',
                padding: '10px 20px',
                borderRadius: 10,
                border: '1px solid #475569',
                background: 'transparent',
                color: '#94A3B8',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'color 0.15s, border-color 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.borderColor = '#64748B';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#94A3B8';
                e.currentTarget.style.borderColor = '#475569';
              }}
            >
              Reset Changes
            </button>
          </div>

          {/* Result panel */}
          <div
            className="sim-result"
            style={{
              background: '#111827',
              borderRadius: 20,
              padding: 24,
              border: '1px solid #334155',
            }}
          >
            <p style={{ color: '#94A3B8', fontSize: 12, fontWeight: 800, letterSpacing: 1.2, margin: '0 0 8px', textTransform: 'uppercase' }}>
              Result Preview
            </p>
            <div style={{ display: 'grid', gap: 14 }}>
              <ScoreLine label="Current score" value={baseResult.score} muted />
              <ScoreLine label="New score" value={newResult.score} />
              <div>
                <div style={{ height: 10, background: '#334155', borderRadius: 999, overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${newResult.score}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #2563EB 0%, #06B6D4 100%)',
                      borderRadius: 999,
                      transition: 'width 180ms ease',
                    }}
                  />
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #334155', marginTop: 20, paddingTop: 18 }}>
              <p style={{ color: '#94A3B8', fontSize: 12, margin: '0 0 4px' }}>Score change</p>
              <p style={{ color: change >= 0 ? '#67E8F9' : '#CBD5E1', fontSize: 32, fontWeight: 800, lineHeight: 1, margin: 0 }}>
                {change > 0 ? '+' : ''}
                {change}
              </p>
            </div>

            <p style={{ fontSize: 16, fontWeight: 800, color: '#fff', margin: '18px 0 0' }}>
              {position}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .sim-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function ScoreLine({ label, value, muted = false }: { label: string; value: number; muted?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 18 }}>
      <span style={{ color: muted ? '#94A3B8' : '#CBD5E1', fontSize: 13, fontWeight: 700 }}>{label}</span>
      <strong style={{ color: muted ? '#94A3B8' : '#FFFFFF', fontSize: 34, fontWeight: 800, lineHeight: 1 }}>
        {value}
      </strong>
    </div>
  );
}
