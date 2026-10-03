'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { ScoreGauge, scoreLevel } from '@/components/ScoreGauge';
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
  const level = scoreLevel(result.score);

  const moneyFields = [
    { id: 'quick-rent', label: 'Monthly rent', val: rent, set: setRent },
    { id: 'quick-income', label: 'Annual income', val: income, set: setIncome },
    { id: 'quick-savings', label: 'Savings', val: savings, set: setSavings },
    { id: 'quick-debt', label: 'Monthly debt', val: debt, set: setDebt },
  ];

  return (
    <div id="readiness-score" className="quick-score">
      <h2>Get your score in 30 seconds</h2>
      <p className="quick-score__intro">
        Change any number and your estimate updates straight away.
      </p>

      <div className="quick-score__grid">
        <div>
          <div className="quick-score__fields">
            {moneyFields.map((f) => (
              <div key={f.id}>
                <label htmlFor={f.id}>{f.label}</label>
                <div className="quick-score__money">
                  <span>$</span>
                  <input
                    id={f.id}
                    type="text"
                    inputMode="numeric"
                    value={f.val}
                    onChange={(e) => f.set(e.target.value.replace(/[^0-9]/g, ''))}
                    className="field-control"
                  />
                </div>
              </div>
            ))}
            <div>
              <label htmlFor="quick-cosigner">Co-signer?</label>
              <select
                id="quick-cosigner"
                value={cosigner}
                onChange={(e) => setCosigner(e.target.value)}
                className="field-control"
              >
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>
          </div>

          <div className="quick-score__actions">
            <Link href="/rent-readiness-score/#score-form" className="btn-primary">
              Get my full assessment
            </Link>
            <p className="quick-score__fine">No account. No saved personal data.</p>
            <p className="quick-score__fine">
              Estimate only. Rental decisions vary by landlord, property manager, credit history, and application details.
            </p>
          </div>
        </div>

        <div className="quick-score__result">
          <div className="quick-score__result-head">
            <p>Rent Readiness Score</p>
            {hasBasics ? (
              <span className="status-chip" style={{ background: level.soft, color: level.text }}>
                {result.label}
              </span>
            ) : null}
          </div>

          <ScoreGauge score={hasBasics ? result.score : null} label={result.label} />
          <p className="sr-only" aria-live="polite" aria-atomic="true">
            {hasBasics ? `Score ${result.score} out of 100, ${result.label}` : ''}
          </p>

          {hasBasics ? (
            <>
              <dl className="quick-score__rows">
                <div>
                  <dt>Income vs rent</dt>
                  <dd>{result.rentMultiple.toFixed(1)}x rent</dd>
                </div>
                <div>
                  <dt>Move-in savings</dt>
                  <dd>
                    {result.savingsGap > 0
                      ? `$${Math.round(result.savingsGap).toLocaleString('en-US')} short`
                      : 'Covered'}
                  </dd>
                </div>
                <div>
                  <dt>Rent Twin</dt>
                  <dd>{result.rentTwin.title}</dd>
                </div>
              </dl>
              <div className="quick-score__next">
                <span>Top next step</span>
                <strong>{result.topNextStep}</strong>
              </div>
            </>
          ) : (
            <p className="quick-score__fine" style={{ marginTop: 16 }}>
              Enter your monthly rent and annual income to see your score.
            </p>
          )}
          <p className="quick-score__fine" style={{ marginTop: 14 }}>
            Quick estimate assuming no roommate, average credit and a move in 1–3 months.{' '}
            <Link href="/rent-readiness-score/#score-form" className="text-link">
              Change these in the full assessment
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
