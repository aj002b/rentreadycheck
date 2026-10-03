import Link from 'next/link';

const guides = [
  {
    title: 'What is the 3x rent rule?',
    desc: 'Learn why most property managers want your income to be at least three times your rent.',
    href: '/rent-to-income-ratio-explained',
  },
  {
    title: 'Do I need a co-signer?',
    desc: 'When a co-signer can strengthen your rental application and how it works.',
    href: '/do-i-need-a-cosigner-for-an-apartment',
  },
  {
    title: 'How much should I save before moving?',
    desc: 'A breakdown of move-in costs including security deposits, first month\'s rent, and more.',
    href: '/how-much-should-i-save-before-moving-out',
  },
  {
    title: 'Can I rent with bad credit?',
    desc: 'Options and strategies for renters with lower credit scores.',
    href: '/can-i-rent-with-bad-credit',
  },
  {
    title: 'Rental application fees',
    desc: 'What to expect when paying for rental application processing.',
    href: '/rental-application-fees-explained',
  },
  {
    title: 'Security deposit basics',
    desc: 'How much to set aside and what to know about getting your deposit back.',
    href: '/security-deposit-basics',
  },
];

export default function GuidesPreview() {
  return (
    <section id="guides" className="home-section">
      <div className="site-container">
        <div className="home-section__head">
          <h2>Helpful guides for US renters</h2>
        </div>

        <div className="home-rows">
          {guides.map((g) => (
            <Link key={g.title} href={g.href}>
              <h3>{g.title}</h3>
              <span className="home-rows__cta">Read →</span>
              <p>{g.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
