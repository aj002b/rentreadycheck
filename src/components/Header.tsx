"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/siteConfig";

const navItems = [
  { label: "Readiness Score", href: "/rent-readiness-score/" },
  { label: "Guides", href: "/guides" },
  { label: "About", href: "/about" },
];

const calculatorLinks = [
  { label: "Rent Affordability Calculator", href: "/rent-referencing-calculator" },
  { label: "Co-signer Income Calculator", href: "/guarantor-income-calculator" },
  { label: "Roommate Affordability Calculator", href: "/joint-tenant-affordability-calculator" },
  { label: "Move-In Cost Calculator", href: "/move-in-cost-calculator" },
  { label: "Rent Split Calculator", href: "/rent-split-calculator" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <Link href="/" className="app-header__logo" onClick={() => setOpen(false)}>
          {siteConfig.name}
        </Link>

        <nav className="app-header__nav" aria-label="Main navigation">
          <Link href="/rent-readiness-score/" className="app-header__link">
            Readiness Score
          </Link>
          <div
            className="app-header__dropdown"
            onMouseEnter={() => setToolsOpen(true)}
            onMouseLeave={() => setToolsOpen(false)}
          >
            <button
              type="button"
              className="app-header__dropdown-button"
              aria-expanded={toolsOpen}
              aria-controls="calculator-menu"
              onClick={() => setToolsOpen((value) => !value)}
            >
              Tools
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {toolsOpen ? (
              <div id="calculator-menu" className="app-header__dropdown-menu">
                {calculatorLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="app-header__dropdown-link"
                    onClick={() => setToolsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          {navItems.slice(1).map((item) => (
            <Link key={item.label} href={item.href} className="app-header__link">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/rent-readiness-score/#score-form" className="app-header__cta">
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
          <div className="app-header__mobile-tools" aria-label="Calculator links">
            <p className="app-header__mobile-tools-label">Tools</p>
            {calculatorLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="app-header__mobile-tool-link"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link href="/rent-readiness-score/#score-form" className="app-header__mobile-cta" onClick={() => setOpen(false)}>
            Start My Check
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
