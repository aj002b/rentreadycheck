"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/siteConfig";

const navItems = [
  { label: "Readiness Score", href: "/rent-readiness-score" },
  { label: "Calculators", href: "/rent-referencing-calculator" },
  { label: "Move-In Budget", href: "/move-in-cost-calculator" },
  { label: "Guides", href: "/guides" },
  { label: "About", href: "/about" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <Link href="/" className="app-header__logo" onClick={() => setOpen(false)}>
          {siteConfig.name}
        </Link>

        <nav className="app-header__nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="app-header__link">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/rent-readiness-score" className="app-header__cta">
          Start My Check
        </Link>

        <button
          type="button"
          className="app-header__menu-button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {open ? (
        <nav className="app-header__mobile-menu" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="app-header__mobile-link"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/rent-readiness-score" className="app-header__mobile-cta" onClick={() => setOpen(false)}>
            Start My Check
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
