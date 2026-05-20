import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

const links = [
  { label: "Guides", href: "/guides" },
  { label: "About", href: "/about" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer id="about" className="app-footer">
      <div className="app-footer__inner">
        <div className="app-footer__top">
          <div className="app-footer__brand">
            <p className="app-footer__name">{siteConfig.name}</p>
            <p className="app-footer__copy">
              Free US rent readiness tools to estimate affordability, co-signer support,
              move-in costs, and roommate rent planning before you apply.
            </p>
          </div>

          <nav className="app-footer__links" aria-label="Footer navigation">
            {links.map((link) => (
              <Link key={link.label} href={link.href} className="app-footer__link">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="app-footer__bottom">
          <p>
            Copyright {new Date().getFullYear()} {siteConfig.name}. All estimates are for
            informational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
