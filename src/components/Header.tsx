"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/siteConfig";

const navItems = [
  { label: "Readiness Score", href: "/rent-readiness-score/" },
  { label: "Guides", href: "/guides" },
  { label: "About", href: "/about" },
];

const toolItems = [
  { title: "Rent Affordability Calculator", href: "/rent-referencing-calculator" },
  { title: "Co-signer Income Calculator", href: "/guarantor-income-calculator" },
  { title: "Roommate Affordability Calculator", href: "/joint-tenant-affordability-calculator" },
  { title: "Move-In Cost Calculator", href: "/move-in-cost-calculator" },
  { title: "Rent Split Calculator", href: "/rent-split-calculator" },
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
          <Link href={navItems[0].href} className="app-header__link">
            {navItems[0].label}
          </Link>
          <div className="group relative">
            <button type="button" className="app-header__link">
              Tools
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="pointer-events-none absolute left-1/2 top-[calc(100%+16px)] z-50 grid min-w-[260px] -translate-x-1/2 translate-y-1.5 gap-0.5 rounded-xl border border-slate-200 bg-white p-2.5 opacity-0 shadow-[0_18px_40px_rgba(15,23,42,0.12)] transition group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
              {toolItems.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 no-underline hover:bg-blue-50 hover:text-blue-700 focus-visible:bg-blue-50 focus-visible:text-blue-700"
                >
                  {tool.title}
                </Link>
              ))}
            </div>
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
          <Link href={navItems[0].href} className="app-header__mobile-link" onClick={() => setOpen(false)}>
            {navItems[0].label}
          </Link>
          <div className="border-b border-slate-100 py-3">
            <p className="m-0 mb-1.5 text-[15px] font-bold text-slate-900">Tools</p>
            {toolItems.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="block py-2 pl-4 text-sm font-medium text-slate-700 no-underline"
                onClick={() => setOpen(false)}
              >
                {tool.title}
              </Link>
            ))}
          </div>
          {navItems.slice(1).map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="app-header__mobile-link"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/rent-readiness-score/#score-form" className="app-header__mobile-cta" onClick={() => setOpen(false)}>
            Start My Check
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
