import type { ReactNode } from "react";
import { lastUpdatedLabel } from "@/lib/siteConfig";

export function PublicPageShell({ children }: { children: ReactNode }) {
  return (
    <div className="site-container space-y-12 pb-14">
      {children}
    </div>
  );
}

export function PublicPageHero({
  eyebrow,
  path,
  title,
  children,
}: {
  /** Text above the title. Defaults to the route's "Last updated" date. */
  eyebrow?: string;
  /** Route path, used to look up the "Last updated" date in publicRoutes. */
  path?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="page-band py-10 md:py-14">
      <p className="text-sm font-medium text-muted">
        {eyebrow ?? (path ? lastUpdatedLabel(path) : null)}
      </p>
      <h1 className="mt-3 max-w-4xl text-4xl font-extrabold leading-[1.06] tracking-[-0.035em] text-ink md:text-[3.25rem]">
        {title}
      </h1>
      <div className="mt-4 max-w-3xl text-lg leading-8 text-ink-2">
        {children}
      </div>
    </section>
  );
}
