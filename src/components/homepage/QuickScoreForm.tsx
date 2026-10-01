'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { calculateQuickReadinessScore } from '@/lib/readinessScore';

export default function QuickScoreForm() {
  const [rent, setRent] = useState('1800');
  const [income, setIncome] = useState('72000');
  const [savings, setSavings] = useState('5000');
  const [debt, setDebt] = useState('250');
  const [cosigner, setCosigner] = useState('No');

  // The score updates as you type, so there is no separate calculate step.
  const values = useMemo(
    () => ({
      monthlyRent: Number(rent) || 0,
      annualIncome: Number(income) || 0,
      savings: Number(savings) || 0,
      monthlyDebt: Number(debt) || 0,
      hasCosigner: cosigner === 'Yes',
    }),
    [rent, income, savings, debt, cosigner],
  );
  const hasBasics = values.monthlyRent > 0 && values.annualIncome > 0;
  const result = useMemo(() => calculateQuickReadinessScore(values), [values]);

  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 600,
    color: '#334155',
    marginBottom: 6,
    display: 'block',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px 10px 28px',
    borderRadius: 10,
    border: '1px solid #CBD5E1',
    fontSize: 14,
    color: '#0F172A',
    boxSizing: 'border-box',
    background: '#fff',
    transition: 'border-color 0.15s',
  };

  return (
    <div id="readiness-score">
      <div
        style={{
          background: '#fff',
          border: '1px solid #DBEAFE',
          borderRadius: 24,
          padding: '28px',
          boxShadow: '0 22px 55px rgba(37, 99, 235, 0.12)',
        }}
      >
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0F172A', margin: '0 0 8px', lineHeight: 1.2 }}>
            Get your score in 30 seconds
          </h2>
          <p style={{ fontSize: 14, color: '#64748B', margin: 0, lineHeight: 1.55 }}>
            Change any number and your estimate updates straight away.
          </p>
        </div>

        <div className="qs-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(275px, 1fr) minmax(250px, 0.78fr)', gap: 22, alignItems: 'start' }}>
          <div>
            <div
              className="qs-fields"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: 14,
                marginBottom: 16,
              }}
            >
              {[
                { label: 'Monthly rent', val: rent, set: setRent },
                { label: 'Annual income', val: income, set: setIncome },
                { label: 'Savings', val: savings, set: setSavings },
                { label: 'Monthly debt', val: debt, set: setDebt },
              ].map((f) => (
                <div key={f.label}>
                  <label style={labelStyle}>{f.label}</label>
                  <div style={{ position: 'relative' }}>
                    <span
                      style={{
                        position: 'absolute',
                        left: 12,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: 14,
                        color: '#64748B',
                        pointerEvents: 'none',
                      }}
                    >
                      $
                    </span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={f.val}
                      onChange={(e) => f.set(e.target.value.replace(/[^0-9]/g, ''))}
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#2563EB')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#CBD5E1')}
                      aria-label={f.label}
                    />
                  </div>
                </div>
              ))}
              <div>
                <label style={labelStyle}>Co-signer?</label>
                <select
                  value={cosigner}
                  onChange={(e) => setCosigner(e.target.value)}
                  style={{ ...inputStyle, paddingLeft: 12, appearance: 'auto' }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#2563EB')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#CBD5E1')}
                  aria-label="Co-signer?"
                >
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                gap: 10,
              }}
            >
              <Link
                href="/rent-readiness-score/#score-form"
                style={{
                  background: '#2563EB',
                  color: '#fff',
                  minHeight: 48,
                  padding: '13px 28px',
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(37,99,235,0.25)',
                }}
              >
                Get my full assessment
              </Link>
              <p style={{ fontSize: 12, color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                No account. No saved personal data.
              </p>
              <p style={{ fontSize: 12, color: '#475569', margin: 0, lineHeight: 1.45 }}>
                Estimate only. Rental decisions vary by landlord, property manager, credit history, and application details.
              </p>
            </div>
          </div>

          <div>
            <div
              style={{
                background: '#F8FAFC',
                border: '1px solid #DBEAFE',
                borderRadius: 18,
                padding: 18,
                minWidth: 0,
              }}
            >
              <div style={{ display: 'grid', gap: 12, marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
                  <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.2, color: '#2563EB', margin: '0 0 4px', textTransform: 'uppercase' }}>
                    Rent Readiness Score
                  </p>
                  {hasBasics ? <span style={statusStyle}>{result.label}</span> : null}
                </div>
                <p
                  aria-live="polite"
                  aria-atomic="true"
                  style={{ fontSize: 38, fontWeight: 850, color: '#0F172A', margin: 0, lineHeight: 1, letterSpacing: 0, whiteSpace: 'nowrap' }}
                >
                  {hasBasics ? result.score : '–'}
                  <span style={{ fontSize: 22, color: '#64748B', fontWeight: 800 }}>/100</span>
                </p>
              </div>

              <div
                style={{
                  height: 10,
                  borderRadius: 999,
                  background: '#E2E8F0',
                  overflow: 'hidden',
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    width: `${hasBasics ? result.score : 0}%`,
                    height: '100%',
                    borderRadius: 999,
                    background: 'linear-gradient(90deg, #2563EB 0%, #0EA5E9 100%)',
                    transition: 'width 180ms ease',
                  }}
                />
              </div>

              {hasBasics ? (
                <div style={{ display: 'grid', gap: 10 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10 }}>
                    <div style={previewRowStyle}>
                      <span style={previewLabelStyle}>Income vs rent</span>
                      <strong style={previewValueStyle}>{result.rentMultiple.toFixed(1)}x rent</strong>
                    </div>
                    <div style={previewRowStyle}>
                      <span style={previewLabelStyle}>Move-in savings</span>
                      <strong style={previewValueStyle}>
                        {result.savingsGap > 0
                          ? `$${Math.round(result.savingsGap).toLocaleString('en-US')} short`
                          : 'Covered'}
                      </strong>
                    </div>
                  </div>
                  <div style={previewRowStyle}>
                    <span style={previewLabelStyle}>Rent Twin</span>
                    <strong style={previewValueStyle}>{result.rentTwin.title}</strong>
                  </div>
                  <div style={previewRowStyle}>
                    <span style={previewLabelStyle}>Top next step</span>
                    <strong style={previewValueStyle}>{result.topNextStep}</strong>
                  </div>
                </div>
              ) : (
                <p style={{ fontSize: 14, color: '#475569', margin: 0, lineHeight: 1.5 }}>
                  Enter your monthly rent and annual income to see your score.
                </p>
              )}
              <p style={{ fontSize: 12, color: '#475569', margin: '12px 0 0', lineHeight: 1.5 }}>
                Quick estimate assuming no roommate, average credit and a move in 1–3 months.{' '}
                <Link href="/rent-readiness-score/#score-form" style={{ color: '#1D4ED8', fontWeight: 700 }}>
                  Change these in the full assessment
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .qs-grid {
            grid-template-columns: 1fr !important;
          }
          .qs-fields {
            grid-template-columns: 1fr !important;
          }
          .qs-grid input,
          .qs-grid select,
          .qs-grid button {
            min-height: 44px;
          }
        }
        @media (max-width: 420px) {
          #readiness-score > div {
            padding: 22px !important;
          }
        }
      `}</style>
    </div>
  );
}

const statusStyle: React.CSSProperties = {
  background: '#EFF6FF',
  border: '1px solid #BFDBFE',
  borderRadius: 999,
  color: '#1D4ED8',
  fontSize: 12,
  fontWeight: 800,
  padding: '6px 10px',
  whiteSpace: 'nowrap',
  alignSelf: 'start',
};

const previewRowStyle: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid #E2E8F0',
  borderRadius: 14,
  padding: '12px 14px',
};

const previewLabelStyle: React.CSSProperties = {
  color: '#64748B',
  display: 'block',
  fontSize: 11,
  fontWeight: 800,
  letterSpacing: 1,
  marginBottom: 3,
  textTransform: 'uppercase',
};

const previewValueStyle: React.CSSProperties = {
  color: '#0F172A',
  display: 'block',
  fontSize: 13,
  lineHeight: 1.4,
};
