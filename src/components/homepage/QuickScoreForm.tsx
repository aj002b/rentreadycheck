'use client';

import { useState, useCallback, useMemo } from 'react';

type HomeScoreResult = {
  score: number;
  label: string;
  rentTwin: string;
  nextStep: string;
};

function clampScore(score: number) {
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function getHomeScoreLabel(score: number) {
  if (score >= 85) return 'Rent Ready';
  if (score >= 70) return 'Nearly There';
  if (score >= 50) return 'Needs Preparation';
  return 'High Support Needed';
}

export function getHomeRentTwin(score: number) {
  if (score >= 85) return 'The Prepared Renter';
  if (score >= 70) return 'Nearly There Renter';
  if (score >= 50) return 'The Savings Builder';
  return 'High Support Needed Renter';
}

export function calculateHomePreviewScore(input: {
  monthlyRent: number;
  annualIncome: number;
  savings: number;
  monthlyDebt: number;
  hasCosigner: boolean;
  hasRoommate?: boolean;
}): HomeScoreResult {
  const grossMonthlyIncome = input.annualIncome / 12;
  const rentMultiple = input.monthlyRent > 0 ? grossMonthlyIncome / input.monthlyRent : 0;
  const estimatedMoveInNeed = input.monthlyRent * 3;
  const savingsRatio = estimatedMoveInNeed > 0 ? input.savings / estimatedMoveInNeed : 0;
  const debtRatio = grossMonthlyIncome > 0 ? input.monthlyDebt / grossMonthlyIncome : 1;

  const incomePoints = Math.min(38, Math.max(0, (rentMultiple / 3.2) * 38));
  const savingsPoints = Math.min(28, Math.max(0, savingsRatio * 28));
  const debtPoints = Math.max(0, 22 - debtRatio * 80);
  const cosignerPoints = input.hasCosigner ? 8 : 0;
  const roommatePoints = input.hasRoommate ? 10 : 0;

  const score = clampScore(incomePoints + savingsPoints + debtPoints + cosignerPoints + roommatePoints);
  const savingsGap = Math.max(0, Math.ceil((estimatedMoveInNeed - input.savings) / 100) * 100);

  let nextStep = 'Compare apartments before applying.';
  if (score < 85 && savingsGap > 0) {
    nextStep = `Save $${savingsGap.toLocaleString()} more before applying.`;
  } else if (rentMultiple < 3) {
    nextStep = 'Consider a lower monthly rent target before applying.';
  } else if (debtRatio > 0.15) {
    nextStep = 'Lower monthly debt payments before applying.';
  }

  return {
    score,
    label: getHomeScoreLabel(score),
    rentTwin: getHomeRentTwin(score),
    nextStep,
  };
}

export default function QuickScoreForm() {
  const [rent, setRent] = useState('1800');
  const [income, setIncome] = useState('72000');
  const [savings, setSavings] = useState('4800');
  const [debt, setDebt] = useState('250');
  const [cosigner, setCosigner] = useState('No');
  const [submittedValues, setSubmittedValues] = useState({
    monthlyRent: 1800,
    annualIncome: 72000,
    savings: 4800,
    monthlyDebt: 250,
    hasCosigner: false,
  });

  const result = useMemo(() => calculateHomePreviewScore(submittedValues), [submittedValues]);

  const handleCalculate = useCallback(() => {
    setSubmittedValues({
      monthlyRent: Number(rent) || 0,
      annualIncome: Number(income) || 0,
      savings: Number(savings) || 0,
      monthlyDebt: Number(debt) || 0,
      hasCosigner: cosigner === 'Yes',
    });
  }, [rent, income, savings, debt, cosigner]);

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
    outline: 'none',
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
            Enter a few details to see a quick readiness estimate.
          </p>
        </div>

        <div className="qs-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(220px, 0.9fr)', gap: 22, alignItems: 'start' }}>
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
                        color: '#94A3B8',
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
              <button
                type="button"
                onClick={handleCalculate}
                style={{
                  background: '#2563EB',
                  color: '#fff',
                  padding: '13px 28px',
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  boxShadow: '0 2px 8px rgba(37,99,235,0.25)',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#1D4ED8')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#2563EB')}
              >
                Calculate My Score
              </button>
              <p style={{ fontSize: 12, color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                No account. No saved personal data.
              </p>
              <p style={{ fontSize: 11, color: '#94A3B8', margin: 0, lineHeight: 1.45 }}>
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
                padding: 20,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start', marginBottom: 14 }}>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.2, color: '#2563EB', margin: '0 0 4px', textTransform: 'uppercase' }}>
                    Rent Readiness Score
                  </p>
                  <p style={{ fontSize: 34, fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1 }}>
                    {result.score} <span style={{ fontSize: 16, color: '#64748B', fontWeight: 700 }}>/ 100</span>
                  </p>
                </div>
                <span style={statusStyle}>{result.label}</span>
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
                    width: `${result.score}%`,
                    height: '100%',
                    borderRadius: 999,
                    background: 'linear-gradient(90deg, #2563EB 0%, #0EA5E9 100%)',
                    transition: 'width 180ms ease',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gap: 10 }}>
                <div style={previewRowStyle}>
                  <span style={previewLabelStyle}>Rent Twin</span>
                  <strong style={previewValueStyle}>{result.rentTwin}</strong>
                </div>
                <div style={previewRowStyle}>
                  <span style={previewLabelStyle}>Top next step</span>
                  <strong style={previewValueStyle}>{result.nextStep}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
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
