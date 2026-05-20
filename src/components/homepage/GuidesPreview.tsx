'use client';

const guides = [
  {
    title: 'What is the 3x rent rule?',
    desc: 'Learn why most property managers want your income to be at least three times your rent.',
    href: '/rent-to-income-ratio-explained',
  },
  {
    title: 'Do I need a co-signer?',
    desc: 'When a co-signer can strengthen your rental application and how it works.',
    href: '/guides',
  },
  {
    title: 'How much should I save before moving?',
    desc: 'A breakdown of move-in costs including security deposits, first month\'s rent, and more.',
    href: '/how-much-should-i-save-before-moving-out',
  },
  {
    title: 'Can I rent with bad credit?',
    desc: 'Options and strategies for renters with lower credit scores.',
    href: '/disclaimer',
  },
  {
    title: 'Rental application fees',
    desc: 'What to expect when paying for rental application processing.',
    href: '/move-in-cost-calculator',
  },
  {
    title: 'Security deposit basics',
    desc: 'How much to set aside and what to know about getting your deposit back.',
    href: '/move-in-cost-calculator',
  },
];

export default function GuidesPreview() {
  return (
    <section id="guides" style={{ padding: '72px 24px' }}>
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
          Helpful guides for US renters
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 18,
          }}
        >
          {guides.map((g) => (
            <a
              key={g.title}
              href={g.href}
              style={{
                background: '#fff',
                borderRadius: 16,
                padding: '22px 24px',
                border: '1px solid #E2E8F0',
                textDecoration: 'none',
                display: 'flex',
                gap: 14,
                alignItems: 'flex-start',
                transition: 'box-shadow 0.2s, border-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
                e.currentTarget.style.borderColor = '#DBEAFE';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#E2E8F0';
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: '#EFF6FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M3 4a1.5 1.5 0 011.5-1.5H8L10 4l2-1.5h3.5A1.5 1.5 0 0117 4v12a1.5 1.5 0 01-1.5 1.5H4.5A1.5 1.5 0 013 16V4z"
                    stroke="#2563EB"
                    strokeWidth="1.5"
                  />
                  <path d="M10 4v13" stroke="#2563EB" strokeWidth="1.5" />
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', margin: '0 0 4px' }}>
                  {g.title}
                </h3>
                <p style={{ fontSize: 13, color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                  {g.desc}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
